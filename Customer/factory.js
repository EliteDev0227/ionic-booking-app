import db from './../../../../../models';
import NRP from 'node-redis-pubsub';

const nrp = new NRP({
    scope: 'client'
}); // emit events

import Crypto from 'crypto';
import Axios from 'axios';
import Querystring from 'querystring';

import {
    isNumeric
} from './../../../../../helpers';

import moment from 'moment';
import {
    extendMoment
} from 'moment-range';

const periods = extendMoment(moment);

/* ---------------------------------------
| PAYMENT                                |
--------------------------------------- */
async function paymentGetway() {

    const instance = Axios.create({
        baseURL: process.env.PAYMENT_GETWAY_URL_SANDBOX
    });

    instance.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

    return instance;

}

/* ---------------------------------------
| HELPERS                                |
--------------------------------------- */

// async
async function validate(data) {

    // Validate beach
    const beach = await checkBeach(data);

    if (!beach || beach && beach.status !== 'published') throw {
        name: 'DatabaseBookingError',
        message: 'DB.BEACH_NOT_FOUND'
    }

    // Validate customer
    const customer = await checkCustomer(data, ['id', 'name', 'photo']);

    if (!customer) throw {
        name: 'DatabaseBookingError',
        message: 'DB.CUSTOMER_NOT_FOUND'
    }

    if (!customer.photo && beach.settings.photo_required) throw {
        name: 'DatabaseBookingError',
        message: 'CUSTOMER_NO_PHOTO'
    }
    // Validate waiter (if any)
    if (data.waiter_id && data.waiter_id !== '') {

        const waiter = await checkEmployee(data.waiter_id, data.beach_id);

        if (!waiter) {

            const message = 'DB.WAITER_NOT_FOUND',
                name = 'DatabaseBookingError';

            throw {
                name,
                message
            };

        }

    }

    // Validate broker
    const broker = await checkEmployee(data.broker_id, data.beach_id);

    if (!broker) {

        const message = 'DB.BROKER_NOT_FOUND',
            name = 'DatabaseBookingError';

        throw {
            name,
            message
        };

    }

    // Validate seat position
    const seat = await checkSeat(data);

    if (!seat) throw {
        name: 'SeatPositionException',
        message: 'VALIDATION.GRID.INDEX'
    }

    // Return needed data
    return {
        customer,
        beach
    };

}

async function guardAgainst(data) {

    // Get all reservations by customer
    const _reservations = await reservations(data.phone);

    console.log('_reservations', _reservations);

    // Check daily limit
    if (_reservations && _reservations.length) {

        const inPending = _reservations.some(item => item.status === 'pending');
        const booked = _reservations.some(item => item.status === 'booked');
        const active = _reservations.some(item => item.status === 'active');

        if (inPending) throw {
            name: 'BookingInPendingException',
            message: 'VALIDATION.BOOKING.IN_PENDING'
        }

        if (booked) throw {
            name: 'BookingInBookedException',
            message: 'VALIDATION.BOOKING.IN_BOOKED'
        }

        if (active) throw {
            name: 'BookingActiveException',
            message: 'VALIDATION.BOOKING.ACTIVE'
        }
    } else {
        let customer = await db.customer.findOne({
            where: {
                id: data.user.id
            },
            raw: true
        });

        console.log('-------------customer-------------', customer, data.user);

        if (customer) {
            let guest = await db.share.findOne({
                where: {
                    phone_number: customer.phone
                }
            });

            if (!guest) {
                guest = await db.give_reservation.findOne({
                    where: {
                        phone_number: customer.phone
                    }
                });
            }

            if (guest) {
                if (guest.status == 'pending') {
                    throw {
                        name: 'BookingFriendPendingException',
                        message: 'VALIDATION.BOOKING.FRIEND_PENDING'
                    }
                } else {
                    throw {
                        name: 'BookingFriendAcceptedException',
                        message: 'VALIDATION.BOOKING.FRIEND_ACCEPTED'
                    }
                }
            }
        }
    }

}

function allowRateReview(customer_id, beach_id) {

    return new Promise(async (resolve) => {

        let check = await db.can_rate_review.findOne({
            where: {
                customer_id,
                beach_id
            },
            attributes: ['id'],
            raw: true
        });

        if (!check) {

            db.can_rate_review.create({
                customer_id,
                beach_id,
                rate: false,
                review: false
            }).then(function () {
                resolve();
            });

        } else {
            resolve();
        }

    });

}

async function shouldCancel(reservation) {

    if (reservation['status'] === 'canceled') throw {
        name: 'BookingCancelException',
        message: 'VALIDATION.BOOKING.ALREADY_CANCELED'
    }

    // if ( reservation.time_limit && parseInt(reservation.time_limit) > 0 ) {

    //     const minutesDiff = moment().tz(reservation['timezone']).diff(moment(reservation['created_at']), 'minutes');

    //     if ( minutesDiff > reservation['time_limit'] ) throw {
    //         name         : 'BookingCancelException',
    //         message      : 'VALIDATION.BOOKING.CANCEL',
    //         replacements : [reservation['time_limit']]
    //     }

    // }

    let {
        beach_id,
        created_by,
        created_for_id,
        broker_id,
        cancel_limit
    } = reservation;

    // Find customer's id
    created_by = created_by !== broker_id ? created_by : created_for_id;

    const customer = await checkCustomer({
        created_by
    }, ['booking_cancel_limit']);

    if (customer) {

        let booking_cancel_limit = customer['booking_cancel_limit'];

        if (!booking_cancel_limit) {

            let booking_cancel_limit = {};
            booking_cancel_limit[beach_id] = {};

            booking_cancel_limit[beach_id][moment.tz(moment.now(), reservation['timezone']).format('YYYY-MM-DD')] = 1;

            await db.customer.update({
                booking_cancel_limit
            }, {
                where: {
                    id: created_by
                }
            });

            return (cancel_limit - 1) + 1; // remainig attempts

        } else {

            if (!booking_cancel_limit[beach_id]) {

                booking_cancel_limit[beach_id] = {};
                booking_cancel_limit[beach_id][moment.tz(moment.now(), reservation['timezone']).format('YYYY-MM-DD')] = 1;

                await db.customer.update({
                    booking_cancel_limit
                }, {
                    where: {
                        id: created_by
                    }
                });

                return (cancel_limit - 1) + 1; // remainig attempts

            } else {

                if (booking_cancel_limit[beach_id][moment.tz(moment.now(), reservation['timezone']).format('YYYY-MM-DD')] &&
                    booking_cancel_limit[beach_id][moment.tz(moment.now(), reservation['timezone']).format('YYYY-MM-DD')] < cancel_limit) {

                    booking_cancel_limit[beach_id][moment.tz(moment.now(), reservation['timezone']).format('YYYY-MM-DD')] = booking_cancel_limit[beach_id][moment.tz(moment.now(), reservation['timezone']).format('YYYY-MM-DD')] + 1;
                    await db.customer.update({
                        booking_cancel_limit
                    }, {
                        where: {
                            id: created_by
                        }
                    });

                    return (cancel_limit - booking_cancel_limit[beach_id][moment.tz(moment.now(), reservation['timezone']).format('YYYY-MM-DD')]) + 1; // remainig attempts

                } else throw {

                    name: 'BookingCancelException',
                    message: 'VALIDATION.BOOKING.CANCEL_LIMIT_EXCEEDED',
                    replacements: [reservation['time_limit']]

                }

            }

        }

    }

}

// sync
function checkParams(data) {

    // Check start date
    if (data.start_date && data.start_date !== '') {

        let now = moment().format('YYYY-MM-DD');
        now = moment(now).format('x');

        if (now > moment(data.start_date).format('x')) throw {
            name: 'InvalidArgumentException',
            message: 'VALIDATION.BOOKING.DATE_RANGE_TODAY'
        }

    }

    // Check end date
    if (data.end_date && data.end_date !== '') {

        if (moment(data.start_date).format('x') > moment(data.end_date).format('x')) throw {
            name: 'InvalidArgumentException',
            message: 'VALIDATION.BOOKING.DATE_RANGE_START'
        }

    }

    // Validate seat types
    let knownSeats = ['umbrella', 'baldaquin', 'sunbed'];

    if (knownSeats.indexOf((data.seat.type || 'null')) === -1) throw {
        name: 'InvalidArgumentException',
        message: 'VALIDATION.BOOKING.UNKNOWN_SEAT_TYPE'
    }

    // Validate zones
    let knownZones = ['front', 'middle', 'back'];

    if (data.seat.type !== 'sunbed' && knownZones.indexOf((data.seat.zone || 'null')) === -1) throw {
        name: 'InvalidArgumentException',
        message: 'VALIDATION.BOOKING.UNKNOWN_SEAT_ZONE'
    }

    // Validate seat position
    if (data.seat.type !== 'sunbed' && typeof data.seat.position === 'undefined') throw {
        name: 'InvalidArgumentException',
        message: 'VALIDATION.BOOKING.POSITION'
    }

    if (data.seat.type !== 'sunbed' && (typeof data.seat.position.x === 'undefined' || !isNumeric(data.seat.position.x))) throw {
        name: 'InvalidArgumentException',
        message: 'VALIDATION.BOOKING.SEAT_POSITION_X'
    }

    if (data.seat.type !== 'sunbed' && (typeof data.seat.position.y === 'undefined' || !isNumeric(data.seat.position.y))) throw {
        name: 'InvalidArgumentException',
        message: 'VALIDATION.BOOKING.SEAT_POSITION_Y'
    }

    // Ensure valid format data types within slots property
    if (data.seat.type === 'umbrella') {

        // Check slots
        if (typeof data.seat.slots === 'undefined') throw {
            name: 'InvalidArgumentException',
            message: 'VALIDATION.BOOKING.NO_SLOTS'
        }

        if (typeof data.seat.slots.a === 'undefined' || typeof data.seat.slots.b === 'undefined') throw {
            name: 'InvalidArgumentException',
            message: 'VALIDATION.BOOKING.NO_SLOT_ZONE'
        }

        if (!Array.isArray(data.seat.slots.a) || !Array.isArray(data.seat.slots.b)) throw {
            name: 'InvalidArgumentException',
            message: 'VALIDATION.BOOKING.BAD_SLOT_ZONE'
        }

        let a_valid_slots = data.seat.slots.a.every(item => isNumeric(item));
        let b_valid_slots = data.seat.slots.b.every(item => isNumeric(item));

        if (!a_valid_slots || !b_valid_slots) throw {
            name: 'InvalidArgumentException',
            message: 'VALIDATION.BOOKING.BAD_SLOT_ITEM'
        }

        if (typeof data.seat.new_slots !== 'undefined') {

            // Check new slots
            if ((typeof data.seat.new_slots.a !== 'undefined' && !Array.isArray(data.seat.new_slots.a)) ||
                (typeof data.seat.new_slots.b !== 'undefined' && !Array.isArray(data.seat.new_slots.b))) throw {
                name: 'InvalidArgumentException',
                message: 'VALIDATION.BOOKING.BAD_SLOT_ZONE_NEW'
            }

            if (typeof data.seat.new_slots.a !== 'undefined') {

                let a_valid_new_slots = data.seat.new_slots.a.every(item => isNumeric(item));

                if (!a_valid_new_slots) throw {
                    name: 'InvalidArgumentException',
                    message: 'VALIDATION.BOOKING.BAD_SLOT_ITEM_NEW'
                }

            }

            if (typeof data.seat.new_slots.b !== 'undefined') {

                let b_valid_new_slots = data.seat.new_slots.b.every(item => isNumeric(item));

                if (!b_valid_new_slots) throw {
                    name: 'InvalidArgumentException',
                    message: 'VALIDATION.BOOKING.BAD_SLOT_ITEM_NEW'
                }

            }

        }

    }

}

function gridStatus(seat, grids, status) {
    console.log("GRID STATUS", {
        seat,
        grids,
        status
    });

    let promises = [];

    for (let i = grids.length; i--;) {

        let item = grids[i];

        let {
            id,
            grid
        } = item;

        // find seat
        let grid_item = grid[seat.zone].filter(el => el.coords.x === seat.position.x && el.coords.y === seat.position.y)[0];
        let grid_item_idx = grid[seat.zone].indexOf(grid_item);

        // Fetch available status items
        let statusMap = db._client['grid']['status'];

        let seatsNumMap = db._client['grid']['umbrella']['seatsNum'];

        if (grid_item.type === 'umbrella') {

            let slots_key = seat.new_slots ? 'new_slots' : 'slots';

            let slots_a = seat[slots_key].a;
            let slots_b = seat[slots_key].b;

            let slots_a_clone = slots_a.slice();
            let slots_b_clone = slots_b.slice();

            if (status === 'booked' || status === 'paid') {

                // Check if someone else already booked selected slots before him
                if (slots_a.length) {

                    for (let i = grid_item.status.a.length; i--;) {

                        if ((grid_item.status.a[i] === 'booked' || grid_item.status.a[i] === 'locked' || grid_item.status.a[i] === 'paid') && typeof slots_a[i] !== 'undefined') {
                            slots_a.splice(i, 1);
                        }

                    }

                }

                if (slots_b.length) {

                    for (let i = grid_item.status.b.length; i--;) {

                        if ((grid_item.status.b[i] === 'booked' || grid_item.status.b[i] === 'locked' || grid_item.status.b[i] === 'paid') && typeof slots_b[i] !== 'undefined') {
                            slots_b.splice(i, 1);
                        }

                    }

                }

                if ((slots_a_clone.length && slots_a_clone.length !== slots_a.length) ||
                    (slots_b_clone.length && slots_b_clone.length !== slots_b.length)) {

                    throw {
                        name: 'BookingSlotsUnavailableException',
                        message: 'VALIDATION.BOOKING.SLOTS_UNAVAILABLE'
                    };

                }

            }

            let sides = [];

            if (slots_a.length) {

                sides.push('A');

                slots_a.forEach(slot_idx => {
                    grid_item.status.a[slot_idx] = status;
                });

            }

            if (slots_b.length) {

                sides.push('B');

                slots_b.forEach(slot_idx => {
                    grid_item.status.b[slot_idx] = status;
                });

            }

            // Build seat's status icon
            let status_icon_left = grid_item.status.a.map(slotStatus => {
                return (slotStatus === 'paid' || slotStatus === 'pending') ? statusMap['booked'] : statusMap[slotStatus];
            });

            let status_icon_right = grid_item.status.b.map(slotStatus => {
                return (slotStatus === 'paid' || slotStatus === 'pending') ? statusMap['booked'] : statusMap[slotStatus];
            });

            let icon = status_icon_left.concat(status_icon_right).join('');
            let seats_num = seatsNumMap[grid_item.seats];
            let status_icon = db._client['grid']['icons'][grid_item.type][seats_num]['icon_' + icon];

            if (status === 'booked' || status === 'pending' || status === 'paid') {

                // Update grid status icon (the public one)
                grid_item.status_icon = status_icon.replace(/3/g, 2);

                // Freeze seat
                if (seat.is_freezed) {
                    grid_item.is_freezed = true;
                }

                // Add customer to grid item
                if (!grid_item.customer) {
                    grid_item.customer = [];
                }

                let customer = {
                    id: seat.created_by,
                    side: sides.join(''),
                    status_icon
                };

                // if ( seat.is_freezed ) {
                //     customer.status_icon = grid_item.status_icon.replace(/1/g, 2);
                // }

                grid_item.customer.push(customer);

                // Add reservation_id to grid item
                if (!grid_item.reservations) {
                    grid_item.reservations = [];
                }

                grid_item.reservations.push(seat.reservation_id);

                // Update seat's status icon
                if (grid_item.customer.length > 1) {

                    let customer_1_icon_status,
                        customer_2_icon_status,
                        new_customer_1_icon_status,
                        new_customer_2_icon_status;

                    // Customer 1: convert its status to number

                    customer_1_icon_status = grid_item.status[grid_item.customer[0]['side'].toLowerCase()].map(slotStatus => {
                        return (slotStatus === 'paid' || slotStatus === 'pending') ? statusMap['booked'] : statusMap[slotStatus];
                    }).join('');

                    // Customer 2: convert its status to number

                    customer_2_icon_status = grid_item.status[grid_item.customer[1]['side'].toLowerCase()].map(slotStatus => {
                        return (slotStatus === 'paid' || slotStatus === 'pending') ? statusMap['booked'] : statusMap[slotStatus];
                    }).join('');

                    // Customer 1: build icon

                    if (grid_item.customer[0]['side'] === 'A') {
                        new_customer_1_icon_status = `${customer_1_icon_status}${customer_2_icon_status.replace(/3/g, 2)}`;
                    } else if (grid_item.customer[0]['side'] === 'B') {
                        new_customer_1_icon_status = `${customer_2_icon_status.replace(/3/g, 2)}${customer_1_icon_status}`;
                    }

                    // Customer 2: build icon

                    if (grid_item.customer[1]['side'] === 'A') {
                        new_customer_2_icon_status = `${customer_2_icon_status}${customer_1_icon_status.replace(/3/g, 2)}`;
                    } else if (grid_item.customer[1]['side'] === 'B') {
                        new_customer_2_icon_status = `${customer_2_icon_status.replace(/3/g, 2)}${customer_1_icon_status}`;
                    }

                    grid_item.customer[0]['status_icon'] = db._client['grid']['icons'][grid_item.type][seats_num]['icon_' + new_customer_1_icon_status];
                    grid_item.customer[1]['status_icon'] = db._client['grid']['icons'][grid_item.type][seats_num]['icon_' + new_customer_2_icon_status];

                }

            } else if (status === 'available') {

                // Remove reservation_id from grid
                if (grid_item.reservations) {

                    if (grid_item.reservations.length > 1) {

                        for (let i = grid_item.reservations.length; i--;) {

                            if (grid_item.reservations[i] === seat.reservation_id) {

                                grid_item.reservations.splice(i, 1);
                                break;

                            }

                        }

                    } else {

                        delete grid_item.reservations;

                    }

                }

                // Unfreeze seat
                if (grid_item.is_freezed) delete grid_item.is_freezed;

                // Remove customer from grid
                if (grid_item.customer) {

                    if (grid_item.customer.length > 1) {

                        // Delete customer from the grid item
                        for (let i = grid_item.customer.length; i--;) {

                            if (grid_item.customer[i]['id'] === seat.created_by) {

                                grid_item.customer.splice(i, 1);
                                break;

                            }

                        }

                        // Update grid status icon (the public one)
                        let status_icon_left = grid_item.status.a.map(slotStatus => {
                            return slotStatus === 'paid' ? statusMap['booked'] : statusMap[slotStatus];
                        });

                        let status_icon_right = grid_item.status.b.map(slotStatus => {
                            return slotStatus === 'paid' ? statusMap['booked'] : statusMap[slotStatus];
                        });

                        let icon = status_icon_left.concat(status_icon_right).join('');
                        icon = icon.replace(/3/g, 2);

                        grid_item.status_icon = db._client['grid']['icons'][grid_item.type][seats_num]['icon_' + icon];

                        // Update the remaining customer's status icon
                        grid_item.customer[0]['status_icon'] = grid_item.status_icon.replace(/2/g, 3);

                    } else {

                        delete grid_item.customer;

                        // Restore seat's status icon to the default one (available)
                        grid_item.status_icon = status_icon;

                    }

                } else {

                    // Restore seat's status icon to the default one (available)
                    grid_item.status_icon = status_icon;

                }

            } else if (status === 'locked') {

                // Update grid status icon (the public one)
                grid_item.status_icon = status_icon.replace(/3/g, 2);

                // Update status for foreign customer (if any)
                if (grid_item.customer && grid_item.customer.length) {

                    const party_status_icon = icon.replace(/5/g, 2);
                    grid_item.customer[0]['status_icon'] = db._client['grid']['icons'][grid_item.type][seats_num]['icon_' + party_status_icon];

                    // Attach current customer to the new seat
                    let status_icon = icon.replace(/3/g, 2).replace(/5/g, 3);
                    status_icon = db._client['grid']['icons'][grid_item.type][seats_num]['icon_' + status_icon];

                    let customer = {
                        id: seat.created_by,
                        side: sides.join(''),
                        status_icon
                    };

                    grid_item.customer.push(customer);

                } else {

                    // Attach current customer to the new seat
                    let status_icon = icon.replace(/5/g, 3);
                    status_icon = db._client['grid']['icons'][grid_item.type][seats_num]['icon_' + status_icon];

                    grid_item.customer = [{
                        id: seat.created_by,
                        side: sides.join(''),
                        status_icon
                    }];

                }

            }

        } else {

            // Update seat's status icon
            let icon = (status === 'paid' || status === 'pending') ? statusMap['booked'] : statusMap[status];
            let status_icon = db._client['grid']['icons'][grid_item.type]['icon_' + icon];

            if (status === 'booked' || status === 'pending' || status === 'paid') {

                // Add customer to grid item
                if (!grid_item.customer) {
                    grid_item.customer = [];
                }

                grid_item.customer.push({
                    id: seat.created_by,
                    status_icon
                });

                // Add reservation_id to grid item
                if (!grid_item.reservations) {
                    grid_item.reservations = [];
                }

                grid_item.reservations.push(seat.reservation_id);

                if (grid_item.status !== 'available') throw {
                    name: 'BookingUnavailableException',
                    message: 'VALIDATION.BOOKING.SEAT_UNAVAILABLE'
                };

                // Update grid status icon (the public one)
                grid_item.status_icon = status_icon.replace(/3/g, 2);
                grid_item.status = status;

            } else if (status === 'available') {

                delete grid_item.customer;
                delete grid_item.reservations;

                // Restore seat's status icon to the default one (available)
                grid_item.status_icon = status_icon;
                grid_item.status = 'available';

                // Update extra_sunbeds
                promises.push(db.calendar.update({
                    $inc: {
                        extra_sunbeds: grid_item.extra_seats
                    }
                }, {
                    where: {
                        id
                    },
                    transaction: seat.transaction
                }));

            } else if (status === 'locked') {

                // Update grid status icon (the public one)
                grid_item.status_icon = status_icon;
                grid_item.status = status;

                status_icon = status_icon.replace(/2/g, 3);

                // Add reservation_id to grid item
                grid_item.reservations = [seat.reservation_id];

                // Attach current customer to the new seat
                grid_item.customer = [{
                    id: seat.created_by,
                    status_icon
                }];

            }

        }

        // Update grid item
        grid[seat.zone][grid_item_idx] = grid_item;

        promises.push(db.calendar.update({
            grid
        }, {
            where: {
                id
            },
            transaction: seat.transaction
        }));
        // promises.push(db.calendar.update({grid}, {where: {id}}));

    }

    return promises;

}

function sunbedsCount(data, grids, status) {

    let promises = [];

    grids.forEach((item) => {

        let {
            id,
            extra_sunbeds
        } = item;

        if (status === 'booked' || status === 'paid') {

            if (data.old_count && data.old_count !== data.count) {

                if (data.count > data.old_count) {
                    extra_sunbeds = extra_sunbeds - (data.count - data.old_count);
                } else if (data.count < data.old_count) {
                    extra_sunbeds = extra_sunbeds + (data.old_count - data.count);
                }

            } else {

                if (!data.old_count || (data.old_count && data.old_count !== data.count)) {

                    if (data.count > 0) {

                        if (extra_sunbeds >= data.count) {

                            extra_sunbeds = extra_sunbeds - data.count;

                            if (data.minus) {
                                extra_sunbeds = extra_sunbeds - data.minus;
                            }

                            if (data.plus) {
                                extra_sunbeds = extra_sunbeds + data.plus;
                            }

                        }

                    } else {

                        if (data.minus) {
                            extra_sunbeds = extra_sunbeds - data.minus;
                        }

                        if (data.plus) {
                            extra_sunbeds = extra_sunbeds + data.plus;
                        }

                    }

                }

            }

        } else {

            // Release sunbeds
            if (data.count > 0) {

                extra_sunbeds = extra_sunbeds + data.count;

                if (data.minus) {
                    extra_sunbeds = extra_sunbeds - data.minus;
                }

                if (data.plus) {
                    extra_sunbeds = extra_sunbeds + data.plus;
                }

            }

        }

        // promises.push(db.calendar.update({extra_sunbeds}, {where: {id}}));
        promises.push(db.calendar.update({
            extra_sunbeds
        }, {
            where: {
                id
            },
            transaction: data.transaction
        }));

    });

    return promises;

}

function minutesLeft(reservation) {

    const minutesDiff = moment().tz(reservation.timezone).diff(moment.tz(reservation.created_at, reservation.timezone), 'minutes');
    const minutesLeft = (reservation.time_limit - minutesDiff) < 0 ? 0 : (reservation.time_limit - minutesDiff);

    return minutesLeft;

}

function expireReservations(reservations) {

    return new Promise((resolve, reject) => {

        db.sequelize.transaction().then(function (transaction) {

            return db.Sequelize.Promise.each(reservations, function (reservation) {

                let {
                    id,
                    beach_id,
                    created_by,
                    created_for_id,
                    broker_id,
                    waiter_id,
                    start_date,
                    end_date,
                    seat
                } = reservation;

                /* ---------------------------------------
                | STATS                                  |
                | - background action                    |
                --------------------------------------- */
                const period = reservationPeriod(start_date, end_date);

                let seat_type = seat.type;
                if (seat_type === 'umbrella') seat_type = 'sunbed';

                let count = 0; // number of seats that were booked

                switch (seat.type) {

                    case 'sunbed':
                        count = seat.count;
                        break;
                    case 'umbrella':
                        count = seat.slots['a'].length + seat.slots['b'].length + seat.extra_seats;
                        break;
                    case 'baldaquin':
                        count = 1
                        break;

                }

                const payload = {
                    status: 'expired',
                    count: count,
                    beach_id: beach_id,
                    seat_type: seat_type,
                    dates: period
                };

                // Track seats (add expired)
                let action = payload.dates.length > 1 ? 'addBulk' : 'add';
                db.stats_seat[action](payload);

                // Track seats (remove booked)
                payload.status = 'booked';

                action = payload.dates.length > 1 ? 'removeBulk' : 'remove';
                db.stats_seat[action](payload);

                /* ---------------------------------------
                | EXPIRE RESERVATION                     |
                --------------------------------------- */
                return db.booking.update({
                    status: 'expired'
                }, {
                    where: {
                        id
                    }
                }).then(function () {

                    seat.created_by = created_for_id || created_by;
                    seat.reservation_id = id;

                    const notificationData = {

                        broker: {
                            id: id,
                            broker_id: broker_id,
                            entity: 'reservation',
                            action: 'expire'
                        },

                        waiter: {
                            id: id,
                            waiter_id: waiter_id || '',
                            beach_id: beach_id,
                            entity: 'reservation',
                            action: 'expire'
                        }

                    };

                    nrp.emit('notification', notificationData);

                    cleanInvitations(id).catch((error) => {
                        throw error;
                    });

                    return updateGrids({
                            beach_id,
                            start_date,
                            end_date,
                            seat,
                            transaction
                        }, 'available')
                        .catch(error => reject(error));

                }).catch(error => {
                    reject(error);
                });

            }).then(function () {

                transaction.commit();
                resolve();

            }).catch(error => {

                transaction.rollback();
                reject(error);

            });

        }).then(function () {

            console.log('-------------------------------------------------------------');
            console.log('TRANSACTION FINISHED FOR JOB: ', 'expire-reservations');
            console.log('-------------------------------------------------------------');

            resolve();

        });

    });

}

function releaseReservations(reservations) {

    return new Promise((resolve, reject) => {

        db.sequelize.transaction().then(function (transaction) {

            return db.Sequelize.Promise.each(reservations, function (reservation) {

                let {
                    id,
                    beach_id,
                    created_by,
                    broker_id,
                    created_for_id,
                    start_date,
                    end_date,
                    seat,
                    new_status,
                    status
                } = reservation;

                /* ---------------------------------------
                | STATS                                  |
                | - background action                    |
                --------------------------------------- */
                const period = reservationPeriod(start_date, end_date);

                let seat_type = seat.type;
                if (seat_type === 'umbrella') seat_type = 'sunbed';

                let count = 0; // number of seats that were booked

                switch (seat.type) {

                    case 'sunbed':
                        count = seat.count;
                        break;
                    case 'umbrella':
                        count = seat.slots['a'].length + seat.slots['b'].length + seat.extra_seats;
                        break;
                    case 'baldaquin':
                        count = 1;
                        break;

                }

                const payload = {
                    status: new_status,
                    count: count,
                    beach_id: beach_id,
                    seat_type: seat_type,
                    dates: period
                };

                /* ---------------------------------------
                | RELEASE PROCESS                        |
                --------------------------------------- */
                const customer_id = created_for_id || created_by;

                if (new_status !== 'skip') {

                    return db.booking.update({
                        status: new_status,
                        waiter_id: null
                    }, {
                        where: {
                            id
                        }
                    }).then(function () {

                        if (new_status === 'canceled' || new_status === 'completed') {

                            // Track seats (add to new status - new_status)
                            let action = payload.dates.length > 1 ? 'addBulk' : 'add';
                            db.stats_seat[action](payload);

                            // Track seats (remove from last status - status)
                            payload.status = status === 'active' ? 'occupied' : status;

                            action = payload.dates.length > 1 ? 'removeBulk' : 'remove';
                            db.stats_seat[action](payload);

                            return updateGrids({
                                beach_id,
                                start_date,
                                end_date,
                                seat,
                                transaction
                            }, 'available').then(function () {

                                if (customer_id !== broker_id) {

                                    return resetCustomerBookingCancelLimit(beach_id, customer_id);

                                } else {

                                    resolve();

                                }

                            });

                        } else {

                            if (customer_id !== broker_id) {

                                return resetCustomerBookingCancelLimit(beach_id, customer_id);

                            } else {

                                resolve();

                            }

                        }

                    });

                } else {

                    // console.log('old_status: ', status);
                    // console.log('new_status: ', new_status);

                    return db.booking.update({
                        waiter_id: null
                    }, {
                        where: {
                            id
                        }
                    }).then(function () {

                        // if ( status === 'active' ) {

                        //     // Track seats (add to completed)
                        //     let action = payload.dates.length > 1 ? 'addBulk' : 'add';
                        //     payload.status = 'completed';
                        //     db.stats_seat[action](payload);

                        //     // Track seats (remove from occupied)
                        //     payload.status = 'occupied';

                        //     action = payload.dates.length > 1 ? 'removeBulk' : 'remove';
                        //     db.stats_seat[action](payload);

                        // }

                        if (status === 'canceled') {

                            if (customer_id !== broker_id) {

                                return resetCustomerBookingCancelLimit(beach_id, customer_id);

                            } else {

                                resolve();

                            }

                        } else {

                            resolve();

                        }

                    });

                }

            }).then(function () {

                transaction.commit();
                resolve();

            }).catch(error => {

                transaction.rollback();
                reject(error);

            });

        }).then(function () {

            console.log('-------------------------------------------------------------');
            console.log('TRANSACTION FINISHED FOR JOB: ', 'release-reservations');
            console.log('-------------------------------------------------------------');

            resolve();

        });

    });

}

function reservationPeriod(start_date, end_date) {

    const start = moment(start_date).format('YYYY-MM-DD');
    const end = moment(end_date).format('YYYY-MM-DD');

    const reservation_range = periods.range(start, end);
    let reservation_period = Array.from(reservation_range.by('day')).map(day => day.format('YYYY-MM-DD'));

    return reservation_period;

}

/* ---------------------------------------
| PRIVATE METHODS                        |
--------------------------------------- */
function deleteGridDay(beach_id, date) {

    return new Promise((resolve) => {

        try {

            db.calendar.deleteDay(beach_id, date)
                .then(() => resolve())
                .catch(() => resolve());

        } catch (error) {
            resolve();
        }

    });

}

function resetCustomerBookingCancelLimit(beach_id, customer_id) {

    return new Promise((resolve) => {

        try {

            db.customer.findOne({
                    where: {
                        id: customer_id
                    },
                    raw: true,
                    attributes: ['booking_cancel_limit']
                })
                .then(customer => {

                    if (customer) {

                        let booking_cancel_limit = customer['booking_cancel_limit'];

                        if (booking_cancel_limit[beach_id]) {

                            delete booking_cancel_limit[beach_id];

                            if (!Object.keys(booking_cancel_limit).length) {
                                booking_cancel_limit = null;
                            }

                            db.customer.update({
                                    booking_cancel_limit
                                }, {
                                    where: {
                                        id: customer_id
                                    }
                                })
                                .then(() => resolve())
                                .catch(() => resolve());

                        } else {
                            resolve();
                        }

                    } else {
                        resolve();
                    }

                })
                .catch(() => resolve());

        } catch (error) {
            resolve();
        }

    });

}

async function setupLoialityPoints(customer_id, beach_id, beach_name) {

    const check = await db.loiality_points.findOne({
        where: {
            customer_id,
            beach_id
        },
        raw: true
    });

    if (!check) {

        const result = await db.loiality_points.registerCustomer(beach_id, customer_id, beach_name);
        return result;

    }

    return true;

}

async function reservations(phone) {

    phone = `${phone}`.replace(/\s+/, '');

    const items = await db.booking.byPhone(phone);

    return items.length ? items : false;

}

async function checkCustomer({
    created_by
}, attrs = ['id']) {

    try {

        const customer = await db.customer.findOne({
            where: {
                id: created_by
            },
            attributes: attrs,
            raw: true
        });

        return customer;

    } catch (error) {}

}

async function checkEmployee(id, beach_id) {

    try {

        const employee = await db.app_user.findOne({
            where: {
                id,
                beach_id
            },
            attributes: ['id'],
            raw: true
        });

        return employee;

    } catch (error) {}

}

async function checkBeach({
    beach_id
}) {

    try {

        let beach = await db.beach.findOne({
            where: {
                id: beach_id
            },
            attributes: ['id', 'status', 'name'],
            raw: true
        });

        beach.settings = await db.beach_setting.findOne({
            where: {
                beach_id
            },
            attributes: ['photo_required'],
            raw: true
        });

        return beach;

    } catch (error) {}

}

async function checkSeat(data) {

    if (data.seat.type !== 'sunbed') {

        let beachGrid = await db.beach_grid.findOne({
            attributes: ['grid'],
            where: {
                beach_id: data.beach_id
            },
            raw: true
        });

        const givenY = Number(data.seat.position.y);
        const givenX = Number(data.seat.position.x);

        if (beachGrid) {

            let {
                grid
            } = beachGrid;

            let seats = grid[data.seat.zone];

            let foundSeat = seats.filter(seat => seat.coords.y === givenY && seat.coords.x === givenX)[0];

            if (!foundSeat) {
                return false;
            }

        }

        return true;

    }

    return true;

}

async function checkReservation(id) {

    try {

        const reservation = await db.booking.findOne({
            raw: true,
            where: {
                id
            },
            attributes: [
                'id',
                'status',
                'start_date',
                'end_date',
                'created_at',
                'created_by',
                'broker_id',
                'created_for_phone',
                'created_for_id',
                'waiter_id',
                'released_days',
                'timezone',
                'seat',
                'seat_type',
                'beach_id',
                'time_limit',
                'cancel_limit',
                'amount',
                'old_amount',
                'payment_method',
                'number',
                'phone'
            ]
        });

        return reservation;

    } catch (error) {}

}

async function getBeachSettings(beach_id, attrs = []) {

    try {

        const settings = await db.beach_setting.findOne({
            where: {
                beach_id
            },
            attributes: attrs,
            raw: true
        });

        return settings;

    } catch (error) {}

}

async function checkPhone(phone) {

    try {

        phone = phone.replace(/\s+/g, '');

        const customerByPhone = await db.customer.findOne({
            attributes: ['id'],
            where: {
                phone
            },
            raw: true
        });

        return customerByPhone;

    } catch (error) {}

}

async function updateGrids(data, status = 'booked') {
    console.log("UPDATE GRIDS", {
        data,
        status
    });
    let start = new Date(data.start_date);
    let end = new Date(data.end_date);

    if (!data.end_date) end = start;

    let result, promises, grids;

    if (data.days) {

        grids = await db.calendar.findAll({

            where: {
                beach_id: data.beach_id,
                created_at: data.days
            },

            transaction: data.transaction,
            lock: data.transaction.LOCK.UPDATE,
            raw: true

        });

    } else {

        grids = await db.calendar.findAll({

            where: {
                beach_id: data.beach_id,
                created_at: {
                    $between: [moment(start).format('YYYY-MM-DD'), moment(end).format('YYYY-MM-DD')]
                }
            },

            transaction: data.transaction,
            lock: data.transaction.LOCK.UPDATE,
            raw: true

        });

    }
    console.log("Grid Data", grids);
    if (data.seat.type !== 'sunbed') {

        console.log('----------------1----------------');

        // Pass along transaction object
        data.seat.transaction = data.transaction;

        promises = gridStatus(data.seat, grids, status);
        result = await db.Sequelize.Promise.all(promises);

        if ( /*data.seat.type === 'umbrella' &&*/ data.seat.extra_seats > 0) {

            console.log('-------------------------', data.seat, '---------------------------');

            promises = sunbedsCount({
                count: data.seat.extra_seats,
                transaction: data.transaction
            }, grids, status);
            result = await db.Sequelize.Promise.all(promises);

        }

    } else {

        console.log('----------------2----------------');

        promises = sunbedsCount({
            count: data.seat.count,
            transaction: data.transaction
        }, grids, status);
        result = await db.Sequelize.Promise.all(promises);

    }

    return result;

}

async function gridChangeCustomer(reservation, new_customer_id) {

    const start = moment(reservation['start_date']).format('YYYY-MM-DD');
    const end = moment(reservation['end_date']).format('YYYY-MM-DD');

    const booking_range = periods.range(start, end);
    const booking_period = Array.from(booking_range.by('day')).map(day => day.format('YYYY-MM-DD'));

    if (reservation['released_days'].length) {

        for (let i = booking_period.length; i--;) {

            if (reservation['released_days'].indexOf(booking_period[i]) !== -1) {
                booking_period.splice(i, 1);
            }

        }

    }

    // Begin transaction
    const transaction = await db.sequelize.transaction();

    let grids = await db.calendar.findAll({

        where: {
            beach_id: reservation.beach_id,
            created_at: booking_period
        },
        transaction: transaction,
        lock: transaction.LOCK.UPDATE,
        raw: true
    });

    // Get customer
    let new_customer = await db.customer.findOne({
        where: {
            id: new_customer_id
        },
        raw: true
    });

    let promises = [];

    for (let i = grids.length; i--;) {

        const grid_id = grids[i]['id'];
        let grid = grids[i]['grid'];

        // find seat
        let grid_item = grid[reservation.seat.zone].filter(el => el.coords.x === reservation.seat.position.x && el.coords.y === reservation.seat.position.y)[0];
        let grid_item_idx = grid[reservation.seat.zone].indexOf(grid_item);

        let old_customer_id = reservation.created_by;

        if (reservation.created_by === reservation.broker_id) {
            old_customer_id = reservation.created_for_id;
        }

        // Change customer in grid
        grid_item.customer = grid_item.customer.map(customer => {

            if (customer.id === old_customer_id) {
                customer.id = new_customer_id;
                customer.name = new_customer.name;
            }

            return customer;

        });

        // Update grid item
        grid[reservation.seat.zone][grid_item_idx] = grid_item;

        promises.push(db.calendar.update({
            grid
        }, {
            where: {
                id: grid_id
            },
            transaction
        }));

    }

    try {

        await db.Sequelize.Promise.all(promises);
        await transaction.commit();

    } catch (error) {

        transaction.rollback();
        throw error;

    }

}

async function resetUpdateGrids(data) {

    let start = new Date(data.start_date);
    let end = new Date(data.end_date);

    if (!data.end_date) end = start;

    let oldGrids, newGrids;

    if (data['released_days'].length) {

        const booking_range = periods.range(moment(start).format('YYYY-MM-DD'), moment(end).format('YYYY-MM-DD'));
        const booking_period = Array.from(booking_range.by('day')).map(day => day.format('YYYY-MM-DD'));

        for (let i = booking_period.length; i--;) {

            let day = booking_period[i];

            if (data['released_days'].indexOf(day) !== -1) {
                booking_period.splice(i, 1);
            }

        }

        oldGrids = await db.calendar.findAll({

            where: {
                beach_id: data.beach_id,
                created_at: booking_period
            },

            transaction: data.transaction,
            lock: data.transaction.LOCK.UPDATE,
            raw: true

        });

        newGrids = oldGrids.slice();

    } else {

        oldGrids = await db.calendar.findAll({

            where: {
                beach_id: data.beach_id,
                created_at: {
                    $between: [moment(start).format('YYYY-MM-DD'), moment(end).format('YYYY-MM-DD')]
                }
            },

            transaction: data.transaction,
            lock: data.transaction.LOCK.UPDATE,
            raw: true

        });

        newGrids = oldGrids.slice();

    }

    let result, promises;

    if (data.old_seat.type === 'sunbed') {

        if (data.new_seat.type === 'sunbed') {

            // sunbed >> sunbed

            // Update seats count
            promises = sunbedsCount({
                count: data.new_seat['count'],
                old_count: data.old_seat['count'],
                transaction: data.transaction
            }, oldGrids, 'booked');
            result = await db.Sequelize.Promise.all(promises);

        } else {

            // sunbed >> baldaquin | umbrella

            // Update seats count
            promises = sunbedsCount({
                count: data.old_seat['count'],
                minus: data.new_seat['extra_seats'],
                transaction: data.transaction
            }, oldGrids, 'available');
            await db.Sequelize.Promise.all(promises);

            // Pass along transaction object
            data.new_seat.transaction = data.transaction;

            // Update seats status
            promises = gridStatus(data.new_seat, newGrids, 'booked');
            result = await db.Sequelize.Promise.all(promises);

            return result;

        }

    } else {

        if (data.new_seat.type === 'sunbed') {

            // baldaquin | umbrella >> sunbed

            // Pass along transaction object
            data.old_seat.transaction = data.transaction;

            // Update seats status
            promises = gridStatus(data.old_seat, oldGrids, 'available');
            await db.Sequelize.Promise.all(promises);

            // Update seats count
            promises = sunbedsCount({
                count: data.new_seat['count'],
                plus: data.old_seat['extra_seats'],
                transaction: data.transaction
            }, newGrids, 'booked');
            result = await db.Sequelize.Promise.all(promises);

        } else {

            // baldaquin | umbrella >> << baldaquin | umbrella

            // Pass along transaction object
            data.old_seat.transaction = data.transaction;
            data.new_seat.transaction = data.transaction;

            // Update seats status
            promises = gridStatus(data.old_seat, oldGrids, 'available');
            await db.Sequelize.Promise.all(promises);

            promises = gridStatus(data.new_seat, newGrids, 'booked');
            await db.Sequelize.Promise.all(promises);

            // Update seats count
            if (data.new_seat.type === 'baldaquin' && data.old_seat.type === 'umbrella' && data.old_seat['extra_seats'] > 0) {

                promises = sunbedsCount({
                    count: data.old_seat['extra_seats'],
                    transaction: data.transaction
                }, newGrids, 'available');
                result = await db.Sequelize.Promise.all(promises);

            } else if (data.old_seat.type === 'baldaquin' && data.new_seat.type === 'umbrella' && data.new_seat['extra_seats'] > 0) {

                promises = sunbedsCount({
                    count: data.new_seat['extra_seats'],
                    transaction: data.transaction
                }, newGrids, 'booked');
                result = await db.Sequelize.Promise.all(promises);

            } else if (data.new_seat.type === 'umbrella' && data.old_seat.type === 'umbrella') {

                promises = sunbedsCount({
                    count: data.new_seat['extra_seats'],
                    plus: data.old_seat['extra_seats'],
                    transaction: data.transaction
                }, newGrids, 'booked');
                result = await db.Sequelize.Promise.all(promises);

            }

        }

    }

    return result;

}

async function lockGrids(data) {

    let start = new Date(data.start_date);
    let end = new Date(data.end_date);

    if (!data.end_date) end = start;

    let oldGrids, newGrids;

    if (data['released_days'].length) {

        const booking_range = periods.range(moment(start).format('YYYY-MM-DD'), moment(end).format('YYYY-MM-DD'));
        const booking_period = Array.from(booking_range.by('day')).map(day => day.format('YYYY-MM-DD'));

        for (let i = booking_period.length; i--;) {

            let day = booking_period[i];

            if (data['released_days'].indexOf(day) !== -1) {
                booking_period.splice(i, 1);
            }

        }

        oldGrids = await db.calendar.findAll({

            // raw   : true,
            // where : {
            //     beach_id   : data.beach_id,
            //     created_at : booking_period
            // }

            where: {
                beach_id: data.beach_id,
                created_at: booking_period
            },

            transaction: data.transaction,
            lock: data.transaction.LOCK.UPDATE,
            raw: true

        });

        newGrids = oldGrids.slice();

    } else {

        oldGrids = await db.calendar.findAll({

            // raw   : true,
            // where : {
            //     beach_id   : data.beach_id,
            //     created_at : {$between: [moment(start).format('YYYY-MM-DD'), moment(end).format('YYYY-MM-DD')]}
            // }

            where: {
                beach_id: data.beach_id,
                created_at: {
                    $between: [moment(start).format('YYYY-MM-DD'), moment(end).format('YYYY-MM-DD')]
                }
            },

            transaction: data.transaction,
            lock: data.transaction.LOCK.UPDATE,
            raw: true

        });

        newGrids = oldGrids.slice();

    }

    let result, promises;

    if (data.old_seat.type === 'sunbed') {

        if (data.new_seat.type !== 'sunbed') {

            // To identify customer within grid
            data.new_seat.created_by = data.created_by;

            // Pass along transaction object
            data.new_seat.transaction = data.transaction;

            // from sunbed to baldaquin || umbrella : update seats status
            promises = gridStatus(data.new_seat, newGrids, 'locked');
            await db.Sequelize.Promise.all(promises);

            // Update seats count
            if (data.new_seat.type === 'baldaquin' && data.old_seat.type === 'umbrella' && data.old_seat['extra_seats'] > 0) {

                promises = sunbedsCount({
                    count: data.old_seat['extra_seats'],
                    transaction: data.transaction
                }, newGrids, 'available');
                result = await db.Sequelize.Promise.all(promises);

            } else if (data.old_seat.type === 'baldaquin' && data.new_seat.type === 'umbrella' && data.new_seat['extra_seats'] > 0) {

                promises = sunbedsCount({
                    count: data.new_seat['extra_seats'],
                    transaction: data.transaction
                }, newGrids, 'booked');
                result = await db.Sequelize.Promise.all(promises);

            } else if (data.new_seat.type === 'umbrella' && data.old_seat.type === 'umbrella') {

                promises = sunbedsCount({
                    count: data.new_seat['extra_seats'],
                    plus: data.old_seat['extra_seats'],
                    transaction: data.transaction
                }, newGrids, 'booked');
                result = await db.Sequelize.Promise.all(promises);

            }

        }

    } else {

        if (data.new_seat.type !== 'sunbed') {

            // To identify customer within grid
            data.new_seat.created_by = data.created_by;

            // Pass along transaction object
            data.new_seat.transaction = data.transaction;

            // from baldaquin || umbrella >> << baldaquin || umbrella : update seats status
            promises = gridStatus(data.new_seat, newGrids, 'locked');
            await db.Sequelize.Promise.all(promises);

            // Update seats count
            if (data.new_seat.type === 'baldaquin' && data.old_seat.type === 'umbrella' && data.old_seat['extra_seats'] > 0) {

                promises = sunbedsCount({
                    count: data.old_seat['extra_seats'],
                    transaction: data.transaction
                }, newGrids, 'available');
                result = await db.Sequelize.Promise.all(promises);

            } else if (data.old_seat.type === 'baldaquin' && data.new_seat.type === 'umbrella' && data.new_seat['extra_seats'] > 0) {

                promises = sunbedsCount({
                    count: data.new_seat['extra_seats'],
                    transaction: data.transaction
                }, newGrids, 'booked');
                result = await db.Sequelize.Promise.all(promises);

            } else if (data.new_seat.type === 'umbrella' && data.old_seat.type === 'umbrella') {

                if (data.new_seat['extra_seats'] > 0) {

                    promises = sunbedsCount({
                        count: data.new_seat['extra_seats'],
                        plus: data.old_seat['extra_seats'],
                        transaction: data.transaction
                    }, newGrids, 'booked');
                    result = await db.Sequelize.Promise.all(promises);

                }

            }

        }

    }

    return result;

}

async function makeReservation(data) {

    let {
        beach_id,
        created_by,
        seat,
        phone,
        start_date,
        end_date,
        amount,
        payment_method,
        virtual_cash,
        name,
        beach_name
    } = data;

    if (!end_date) end_date = start_date;

    // Cast string to numeric
    if (seat.type !== 'sunbed') {

        seat.position.y = Number(seat.position.y);
        seat.position.x = Number(seat.position.x);

    } else {
        seat.count = Number(seat.count);
    }

    amount = parseFloat(amount, 10);

    if (seat.extra_seats) {
        seat.extra_seats = Number(seat.extra_seats);
    }

    if (seat.slots) {

        if (seat.slots.a) seat.slots.a = seat.slots.a.map(item => Number(item));
        if (seat.slots.b) seat.slots.b = seat.slots.b.map(item => Number(item));

    }

    let notificationData = {

        broker: {
            id: '',
            broker_id: '',
            entity: 'reservation',
            action: 'create'
        }

    };

    try {

        await guardAgainst(data);

        let attributeList = ['timezone', 'booking_time_limit', 'cancel_daily_limit', 'working_hours', 'currency'];

        if (seat.type === 'umbrella') {
            attributeList.push('umbrella');
        }

        const settings = await db.beach_setting.findOne({
            where: {
                beach_id
            },
            attributes: attributeList,
            raw: true
        });

        const timezone = settings['timezone'] || 'Europe/Bucharest';
        const time_limit = settings['booking_time_limit'];
        const cancel_limit = settings['cancel_daily_limit'];
        const working_hours = settings['working_hours'];
        const currency = settings['currency'];

        let seat_number = seat.type === 'sunbed' ? 0 : seat.number;
        let seat_number_sides = seat.type === 'sunbed' ? 0 : seat.number;

        if (seat.type === 'umbrella') {

            let sides = [];

            if (seat.slots['a'].length) sides.push('A');
            if (seat.slots['b'].length) sides.push('B');

            if (sides.length) {
                seat_number_sides = `${seat_number_sides} ${sides.join('')}`;
            }

        }

        return db.sequelize.transaction().then(function (transaction) {

                return db.beach.reservationCount(data.beach_id).then(beach => {

                    let number = beach[0][0][0].reservation_count;
                    let seat_type = seat.type;

                    // One time only - this will be set to false when customer changes his position while in "booked" state
                    seat.allow_change_in_booking_state = true;

                    let bookingData = {
                        number,
                        beach_id,
                        created_by,
                        seat,
                        seat_number,
                        seat_number_sides,
                        seat_type,
                        phone,
                        start_date,
                        end_date,
                        working_hours,
                        timezone,
                        time_limit,
                        cancel_limit,
                        amount,
                        payment_method,
                        virtual_cash,
                        currency,
                        name,
                        status: 'pending'
                    };

                    if (payment_method === 'online') {

                        bookingData.amount = 0;
                        bookingData.old_amount = amount;

                        // Loialty points cannot be used when paying with card
                        if (virtual_cash) {
                            bookingData.virtual_cash = false;
                        }

                    }

                    if (data.waiter_id !== '') bookingData.waiter_id = data.waiter_id;
                    if (data.broker_id !== '') bookingData.broker_id = data.broker_id;



                    return db.booking.create(bookingData, {
                            transaction
                        }).then(async (result) => {

                            // Setup the loiality points for current beach
                            await setupLoialityPoints(created_by, beach_id, beach_name);

                            seat.created_by = created_by; // needed to add customer field in calendar
                            seat.reservation_id = result.id; // keep track of this reservation on current seat

                            // Send as factory response (these will be emitted to the broker/waiter app)
                            notificationData.broker.id = result.id;
                            notificationData.broker.broker_id = bookingData.broker_id;

                            if (moment.tz(start_date, timezone).format('YYYY-MM-DD') == moment.tz(moment.now(), timezone).format('YYYY-MM-DD')) {

                                const waiterNotification = {
                                    id: result.id,
                                    beach_id: bookingData.beach_id,
                                    waiter_id: data.waiter_id || '',
                                    entity: 'reservation',
                                    action: 'create'
                                };

                                if (bookingData.seat_type === 'sunbed') {
                                    waiterNotification.waiter_id = ''; // send to all waiters from current beach
                                }

                                notificationData.waiter = waiterNotification;

                            }

                            const slots_status = payment_method === 'offline' ? 'pending' : 'paid';

                            if (seat.type === 'umbrella' && settings.umbrella && 'person-num' in settings.umbrella &&
                                Object.keys(settings.umbrella['person-num']).length) {

                                switch (seat.seats_num) {

                                    case 2:

                                        if ('one' in settings.umbrella['person-num'] && 'occupy-all-seats' in settings.umbrella['person-num']['one'] &&
                                            settings.umbrella['person-num']['one']['occupy-all-seats'] === true) {
                                            seat.is_freezed = true;
                                        }

                                        break;

                                        // case 4:

                                        //     if ( 'two' in settings.umbrella['person-num'] && 'occupy-all-seats' in settings.umbrella['person-num']['two'] 
                                        //     && settings.umbrella['person-num']['two']['occupy-all-seats'] === true ) {
                                        //         seat.is_freezed = 'two-customers';
                                        //     }

                                        //     break;

                                }

                            }
                            console.log("UPDATE GRID PARAMS", {
                                slots_status,
                                beach_id,
                                start_date,
                                end_date,
                                seat,
                                transaction
                            });
                            return updateGrids({
                                beach_id,
                                start_date,
                                end_date,
                                seat,
                                transaction
                            }, slots_status).then(function () {

                                // Allow customer to rate & review
                                return allowRateReview(created_by, beach_id);

                            }).catch((error) => {
                                throw error;
                            });

                        }).then(function () {

                            transaction.commit().then(function () {

                                /* ---------------------------------------
                                | STATS                                  |
                                | - background action                    |
                                --------------------------------------- */
                                const period = reservationPeriod(start_date, end_date);

                                let seat_type = seat.type;
                                if (seat_type === 'umbrella') seat_type = 'sunbed';

                                // Add days (if it's the case)
                                db.stats_seat.save({
                                    beach_id: beach_id,
                                    dates: period,
                                    seat_type: seat_type
                                }).then(function () {

                                    let count = 0; // number of seats that were booked

                                    switch (seat.type) {

                                        case 'sunbed':
                                            count = seat.count;
                                            break;
                                        case 'umbrella':
                                            count = seat.slots['a'].length + seat.slots['b'].length + seat.extra_seats;
                                            break;
                                        case 'baldaquin':
                                            count = 1;
                                            break;

                                    }

                                    const payload = {
                                        status: 'booked',
                                        count: count,
                                        beach_id: beach_id,
                                        seat_type: seat_type,
                                        dates: period
                                    };

                                    // Track seats
                                    const action = payload.dates.length > 1 ? 'addBulk' : 'add';
                                    db.stats_seat[action](payload);

                                });

                            });

                        })
                        .then(function () {
                            return notificationData;
                        })
                        .catch(function (error) {

                            transaction.rollback();
                            throw error;

                        });

                });

            })
            .then(function (data) {
                return data;
            })
            .catch(function (error) {
                throw error;
            });

    } catch (error) {

        if (error.name === 'BookingDailyLimitException' ||
            error.name === 'BookingInPendingException' ||
            error.name === 'BookingActiveException' ||
            error.name === 'SeatPositionException' ||
            error.name === 'SlotsUnavailableException' ||
            error.name === 'InvalidArgumentException' ||
            error.name === 'BookingInPendingException' ||
            error.name === 'BookingInBookedException' ||
            error.name === 'BookingFriendPendingException' ||
            error.name === 'BookingFriendAcceptedException'
        ) {
            throw error;
        }

        throw {
            name: 'DatabaseError',
            message: 'SERVER.DATA_BASE_ERROR'
        };

    }

}

async function change(data, reservation) {

    let {
        id,
        seat,
        amount,
        old_amount
    } = data;

    // Cast string to numeric
    if (seat.type !== 'sunbed') {

        seat.number = Number(seat.number);
        seat.position.y = Number(seat.position.y);
        seat.position.x = Number(seat.position.x);

    } else {
        seat.count = Number(seat.count);
    }

    amount = Number(amount);
    old_amount = Number(old_amount);

    if (seat.extra_seats) {
        seat.extra_seats = Number(seat.extra_seats);
    }

    if (seat.slots) {

        if (seat.slots.a) seat.slots.a = seat.slots.a.map(item => Number(item));
        if (seat.slots.b) seat.slots.b = seat.slots.b.map(item => Number(item));

    }

    if (seat.new_slots) {

        if (seat.new_slots.a) seat.new_slots.a = seat.new_slots.a.map(item => Number(item));
        if (seat.new_slots.b) seat.new_slots.b = seat.new_slots.b.map(item => Number(item));

    }

    // Send as factory response (these will be emitted to the broker app)
    const notificationData = {

        broker: {
            id: reservation.id,
            broker_id: reservation.broker_id,
            entity: 'reservation',
            action: 'update'
        }

    };

    if (seat.type === 'sunbed') {
        notificationData.sunbeds = seat.count;
    }

    try {

        if (reservation.status !== 'active') {

            let minutesDiff = moment().tz(reservation.timezone).diff(moment.tz(reservation.created_at, reservation.timezone), 'minutes');
            let expired = minutesDiff > reservation.time_limit;

            if (expired) {

                throw {
                    name: 'BookingExpired',
                    message: 'VALIDATION.BOOKING.EXPIRED'
                };

            }

        }

        if (reservation.seat.allow_change_in_booking_state === false) throw {
            name: 'BookingChangeException',
            message: 'VALIDATION.BOOKING.CHANGE'
        }

        // Allow customer to change his position only one time
        if (reservation.status === 'booked') {

            let seat_number = seat.type === 'sunbed' ? 0 : seat.number;
            let seat_number_sides = seat.type === 'sunbed' ? 0 : seat.number;

            if (seat.type === 'umbrella') {

                if (seat.new_slots) {

                    let sides = [];

                    if (seat.new_slots['a'].length) sides.push('A');
                    if (seat.new_slots['b'].length) sides.push('B');

                    if (sides.length) {
                        seat_number_sides = `${seat_number_sides} ${sides.join('')}`;
                    }

                }

            }

            let transaction = await db.sequelize.transaction();

            seat.reservation_id = reservation['id']; // needed to add reservation in calendar
            seat.created_by = reservation['created_by']; // needed to add customer field in calendar

            reservation.seat.reservation_id = reservation['id']; // needed to remove reservation from calendar
            reservation.seat.created_by = reservation['created_by']; // needed to remove customer field from calendar

            try {

                await resetUpdateGrids({
                    beach_id: reservation['beach_id'],
                    start_date: reservation['start_date'],
                    end_date: reservation['end_date'],
                    released_days: reservation['released_days'],
                    old_seat: reservation['seat'],
                    new_seat: seat,
                    transaction
                });

                try {

                    if (seat.type === 'umbrella') {

                        // Update slots
                        seat.slots = seat.new_slots;

                    }

                    delete seat.transaction;
                    delete seat.reservation_id;
                    delete seat.created_by;

                    seat.allow_change_in_booking_state = false;

                    await db.booking.update({
                        amount,
                        old_amount,
                        seat,
                        seat_number,
                        seat_number_sides
                    }, {
                        where: {
                            id
                        }
                    });
                    await transaction.commit();

                    if (moment.tz(reservation['start_date'], reservation['timezone']).format('YYYY-MM-DD') <= moment.tz(moment.now(), reservation['timezone']).format('YYYY-MM-DD')) {

                        const waiterNotification = {
                            id: reservation.id,
                            waiter_id: reservation.waiter_id || '',
                            beach_id: reservation.beach_id,
                            entity: 'reservation',
                            action: 'update'
                        };

                        notificationData.waiter = waiterNotification;

                    }

                    return notificationData;

                } catch (error) {
                    throw error;
                }

            } catch (error) {

                transaction.rollback();
                throw error;

            }

        } else if (reservation.status === 'active') {

            if (seat.type !== 'sunbed') {

                let seat_number = seat.type === 'sunbed' ? 0 : seat.number;
                let seat_number_sides = seat.type === 'sunbed' ? 0 : seat.number;

                if (seat.type === 'umbrella') {

                    if (seat.new_slots) {

                        let sides = [];

                        if (seat.new_slots['a'].length) sides.push('A');
                        if (seat.new_slots['b'].length) sides.push('B');

                        if (sides.length) {
                            seat_number_sides = `${seat_number_sides} ${sides.join('')}`;
                        }

                    } else {
                        seat_number_sides = seat.seat_number_sides;
                    }

                }

                try {

                    reservation.seat.new_position = seat.position;
                    reservation.seat.new_slots = seat.new_slots;
                    reservation.seat.new_number = seat_number;
                    reservation.seat.new_number_sides = seat_number_sides;
                    reservation.seat.new_zone = seat.zone;
                    reservation.seat.new_extra_seats = seat.extra_seats;
                    reservation.seat.new_type = seat.type;

                    await db.booking.update({
                        amount,
                        old_amount,
                        status: 'change-request',
                        seat: reservation.seat,
                        read: false
                    }, {
                        where: {
                            id
                        }
                    });

                } catch (error) {
                    throw error;
                }

                // Lock new seats and wait for broker approval
                let transaction = await db.sequelize.transaction();

                seat.created_by = reservation['created_by']; // needed to add customer field in calendar

                try {

                    seat.reservation_id = id; // keep track of this reservation on new seat

                    await lockGrids({
                        beach_id: reservation['beach_id'],
                        start_date: reservation['start_date'],
                        end_date: reservation['end_date'],
                        released_days: reservation['released_days'],
                        created_by: reservation['created_by'],
                        old_seat: reservation['seat'],
                        new_seat: seat,
                        transaction
                    });

                    await transaction.commit();

                    if (moment.tz(reservation['start_date'], reservation['timezone']).format('YYYY-MM-DD') <= moment.tz(moment.now(), reservation['timezone']).format('YYYY-MM-DD')) {

                        const waiterNotification = {
                            id: reservation.id,
                            waiter_id: reservation.waiter_id || '',
                            beach_id: reservation.beach_id,
                            entity: 'reservation',
                            action: 'update'
                        };

                        notificationData.waiter = waiterNotification;

                    }

                    return notificationData;

                } catch (error) {

                    transaction.rollback();
                    throw error;

                }

            } else {

                try {

                    // Lock new seats and wait for broker approval
                    let transaction = await db.sequelize.transaction();

                    await resetUpdateGrids({
                        beach_id: reservation['beach_id'],
                        start_date: reservation['start_date'],
                        end_date: reservation['end_date'],
                        released_days: reservation['released_days'],
                        old_seat: reservation['seat'],
                        new_seat: seat,
                        transaction
                    });

                    try {

                        reservation.seat.new_count = seat.count;

                        await db.booking.update({
                            amount,
                            old_amount,
                            status: 'change-request',
                            seat: reservation.seat,
                            read: false
                        }, {
                            where: {
                                id
                            }
                        });
                        await transaction.commit();

                        return notificationData;

                    } catch (error) {
                        throw error;
                    }

                } catch (error) {

                    transaction.rollback();
                    throw error;

                }

            }

        } else if (reservation.status === 'change-request') {

            throw {
                name: 'BookingLockedException',
                message: 'VALIDATION.BOOKING.LOCKED'
            }

        } else {

            throw {
                name: 'BookingExpired',
                message: 'VALIDATION.BOOKING.EXPIRED'
            };

        }

    } catch (error) {

        if (error.name === 'BookingExpired' ||
            error.name === 'BookingLockedException' ||
            error.name === 'BookingSlotsUnavailableException' ||
            error.name === 'BookingChangeException') {
            throw error;
        }

        throw {
            name: 'DatabaseError',
            message: 'SERVER.DATA_BASE_ERROR'
        };

    }

}

async function earnLoialityPoints(reservation, days_released, settings) {

    let pointsEarned = 0;

    if ((settings.partial_day_release_percent_to_points > 0 && settings.hour_release_points !== '') ||
        settings.day_release_percent_to_points > 0) {

        const releaseDate = moment.tz(moment.now(), reservation['timezone']);
        const releasedToday = days_released.includes(releaseDate.format('YYYY-MM-DD'));

        const grids = await calendar(reservation['beach_id'], days_released);

        if (reservation['seat_type'] !== 'sunbed') {

            // Seat with released date
            const seatsList = grids
                .map(item => {
                    return {
                        date: moment(item.created_at).format('YYYY-MM-DD'),
                        seat: item['grid'][reservation.seat.zone].filter(seat => seat.coords.y === reservation.seat.position['y'] && seat.coords.x === reservation.seat.position['x'])[0]
                    };
                });

            // Seat price (per day)
            const seatsPriceList = seatsList
                .map(item => {
                    return {
                        date: item.date,
                        price: parseFloat(item.seat.price)
                    };
                });

            if (reservation['seat_type'] === 'umbrella') {

                const bookedTotalSeats = reservation.seat.slots['a'].length + reservation.seat.slots['b'].length + reservation.seat.extra_seats;

                seatsPriceList.forEach(priceData => {

                    const amountInDay = (priceData.price * bookedTotalSeats);

                    if (releasedToday && releaseDate.format('YYYY-MM-DD') === priceData.date) {

                        if (settings.partial_day_release_percent_to_points > 0 && settings.hour_release_points !== '') {

                            const releaseHour = releaseDate.format('HH:mm');

                            if (releaseHour <= settings.hour_release_points) {

                                pointsEarned += amountInDay * settings.partial_day_release_percent_to_points / 100;

                            }

                        }

                    } else {

                        if (settings.day_release_percent_to_points > 0) {
                            pointsEarned += amountInDay * settings.day_release_percent_to_points / 100;
                        }

                    }

                });

            } else if (reservation['seat_type'] === 'baldaquin') {

                seatsPriceList.forEach(priceData => {

                    if (releasedToday && releaseDate.format('YYYY-MM-DD') === priceData.date) {

                        if (settings.partial_day_release_percent_to_points > 0 && settings.hour_release_points !== '') {

                            const releaseHour = releaseDate.format('HH:mm');

                            if (releaseHour <= settings.hour_release_points) {

                                pointsEarned += priceData.price * settings.partial_day_release_percent_to_points / 100;

                            }

                        }

                    } else {

                        if (settings.day_release_percent_to_points > 0) {
                            pointsEarned += priceData.price * settings.day_release_percent_to_points / 100;
                        }

                    }

                });

            }

        } else {

            // Seats count
            const bookedTotalSeats = reservation.seat.count;

            // Price list (only released)
            const seatsPriceList = grids
                .map(item => {
                    return {
                        date: moment(item.created_at).format('YYYY-MM-DD'),
                        price: item['sunbed_price']
                    };
                });

            seatsPriceList.forEach(priceData => {

                const amountInDay = (priceData.price * bookedTotalSeats);

                if (releasedToday && releaseDate.format('YYYY-MM-DD') === priceData.date) {

                    if (settings.partial_day_release_percent_to_points > 0 && settings.hour_release_points !== '') {

                        const releaseHour = releaseDate.format('HH:mm');

                        if (releaseHour <= settings.hour_release_points) {

                            pointsEarned += amountInDay * settings.partial_day_release_percent_to_points / 100;

                        }

                    }

                } else {

                    if (settings.day_release_percent_to_points > 0) {
                        pointsEarned += amountInDay * settings.day_release_percent_to_points / 100;
                    }

                }

            });

        }

    }

    return pointsEarned > 0 ? Number(pointsEarned.toFixed(2)) : pointsEarned;

}

async function loialityPointsToCustomer(beach_id, customer_id, points) {

    try {
        await db.loiality_points.give(beach_id, customer_id, points);
    } catch (error) {}

}

async function calendar(beach_id, days) {

    const grids = await db.calendar.by_days(beach_id, days);
    return grids;

}

async function pay() {

    const POST_DATA = {
        'MERCHANT': 'SMRBESBX',
        'ORDER_HASH': '',
        'SECRET_KEY': '2^#O42|6N1(y0+S8~O*8',
        'ORDER_TIMEOUT': '',
        'BACK_REF': '',
        'TIMEOUT_URL': '',
        'TESTORDER': 'TRUE',
        'AUTOMODE': '',
        'LANGUAGE': 'RO',
        'ORDER_REF': '',
        'ORDER_DATE': moment.tz('Europe/Bucharest').format('YYYY-MM-DD HH-mm-ss'),
        'ORDER_PNAME[]': 'Rezervare Ammos Beach',
        'ORDER_PCODE[]': '',
        'ORDER_PINFO[]': 'Umbrela #12 / randul 3 / 4 locuri',
        'ORDER_PRICE[]': '40',
        'ORDER_PRICE_TYPE[]': 'GROSS',
        'ORDER_QTY[]': '1',
        'ORDER_VAT[]': '0',
        'PRICES_CURRENCY': 'RON',
        'PAY_METHOD': 'CCVISAMC',
        'ORDER_SHIPPING': '',
        'DISCOUNT': '',
        'BILL_FNAME': 'Pop',
        'BILL_LNAME': 'Nicolae',
        'BILL_PHONE': '0700000000',
        'BILL_COUNTRYCODE': 'RO'
    };

    let hashString = '';

    const fields = Object.keys(POST_DATA);

    for (let i = 0; i < fields.length; i++) {

        const FIELD_VALUE = POST_DATA[fields[i]];

        hashString += FIELD_VALUE.length > 0 ?
            `${checkLength(FIELD_VALUE)}${FIELD_VALUE}` :
            0

    }

    function checkLength(someString) {

        const escapedStr = encodeURI(someString);

        let count = 0;

        if (escapedStr.indexOf("%") != -1) {

            count = escapedStr.split("%").length - 1;

            if (count == 0) count++; // perverse case; can't happen with real UTF-8

            const tmp = escapedStr.length - (count * 3);

            count = count + tmp;

        } else {
            count = escapedStr.length;
        }

        return count;

    }

    const HMAC = Crypto.createHmac('md5', POST_DATA['SECRET_KEY']);
    HMAC.update(hashString);

    const DIGEST = HMAC.digest('hex');

    console.log('=============================================================');
    console.log('||||||||||||||||||| RESERVATION HASH DATA |||||||||||||||||||');
    console.log('=============================================================');
    console.log(DIGEST);

    console.log('=============================================================');
    console.log('||||||||||||||||||| RESERVATION FORM DATA |||||||||||||||||||');
    console.log('=============================================================');
    console.log(Querystring.stringify(POST_DATA));

    console.log('=============================================================');
    console.log('|||||||||||||||||||||| TRYING TO PAY  |||||||||||||||||||||||');
    console.log('=============================================================');

    try {

        POST_DATA['ORDER_HASH'] = DIGEST;
        const status = await paymentGetway('/order/lu.php', Querystring.stringify(POST_DATA));
        console.log(status);

    } catch (error) {
        console.log(JSON.stringify(error, null, 4));
    }

}

async function cleanInvitations(id) {

    console.log('Cleaning invitations and transfers', id);

    let share = await db.share.findOne({
        where: {
            reservation_id: id
        }
    });
    if (share) {
        db.share.remove(share.id).catch((error) => {
            throw error;
        });
    }

    let give = await db.give_reservation.findOne({
        where: {
            reservation_id: id
        }
    });
    if (give) {
        db.give_reservation.remove(give.id).catch((error) => {
            throw error;
        });
    }

    return true;

}

/* ---------------------------------------
| PUBLIC METHODS                         |
--------------------------------------- */
export const get = async ({
    phone
}, res) => {

    // Validate customer
    const customer = await checkPhone(phone);

    if (!customer) throw {
        name: 'DatabaseBookingError',
        message: 'DB.CUSTOMER_NOT_FOUND'
    }

    let share_id;
    let share_status = '';
    let share_friend = '';
    let give_id;
    let give_status = '';
    let give_friend = '';

    // Look into share table
    let guest = await db.share.findOne({
        where: {
            phone_number: phone
        }
    });

    if (!guest) {
        guest = await db.give_reservation.findOne({
            where: {
                phone_number: phone
            }
        });

        if (guest) {
            give_id = guest.id;
            give_status = guest.status;
        }
    } else {
        share_id = guest.id;
        share_status = guest.status;
    }

    console.log('guest', guest);

    let items = [];
    if (guest) {
        items = await db.booking.itemsById(guest.reservation_id, ['pending', 'booked', 'active', 'change-request', 'booked-transferred', 'active-transferred']);
    }

    if (items.length == 0) { // means there is no active order
        items = await db.booking.items(phone, ['pending', 'booked', 'active', 'change-request', 'booked-transferred', 'active-transferred']);
    }

    console.log('items', items);

    let blocked = await db.beach_block_users.findAll({
        where: {
            blocked: false,
        }
    });

    blocked = blocked.map(item => item.booking_id);

    items = items.map(item => {

        // if ( item.payment_method === 'offline' ) {

        //     let minutes_left = minutesLeft(item);

        //     // Add time left (in the response) in minutes
        //     if ( minutes_left > 0 ) item.minutes_left = minutes_left;

        //     // Add expiration flag
        //     if ( item.status === 'booked' && minutes_left === 0 ) {
        //         item.status = 'expired';
        //     }

        // }

        // If this reservation is transferred, add owner
        if (item.status === 'booked-transferred' || item.status === 'active-transferred') {

            item.im_the_owner = phone === item.phone;

            if (item.im_the_owner) {
                item.transferred_to = item.created_for_phone;
            }

        }

        // Add status text (for example, change active to occupied)
        switch (item.status) {

            case 'pending':
                item.status_text = res.__('BOOKING_STATUS.PENDING');
                break;

            case 'booked':
                item.status_text = res.__('BOOKING_STATUS.BOOKED');
                break;

            case 'active':
                item.status_text = res.__('BOOKING_STATUS.ACTIVE');
                break;

            case 'expired':
                item.status_text = res.__('BOOKING_STATUS.EXPIRED');
                break;

            case 'change-request':
                item.status_text = res.__('BOOKING_STATUS.CHANGE_REQUEST');
                break;

            case 'booked-transferred':
            case 'active-transferred':
                item.status_text = res.__('BOOKING_STATUS.TRANSFERRED');
                break;

        }

        item.acceptable = (blocked.indexOf(item.id) === -1);

        if (item.created_by === item.broker_id) item.acceptable = false;

        delete item.created_at;
        delete item.timezone;
        delete item.time_limit;
        delete item.created_for_id;
        delete item.created_by;

        return item;

    });

    // Add period to items
    items = items.map(item => {

        const start = moment(item['start_date']).format('YYYY-MM-DD');
        const end = moment(item['end_date']).format('YYYY-MM-DD');

        const booking_range = periods.range(start, end);
        const booking_period = Array.from(booking_range.by('day')).map(day => day.format('YYYY-MM-DD'));

        item.period = booking_period;

        item.share_id = share_id;
        item.share_status = share_status;
        item.give_id = give_id;
        item.give_status = give_status;

        return item;

    });

    console.log('items', items);

    // Find guests
    items = await Promise.all(items.map(async (item) => {
        let guests = await db.share.findAll({
            where: {
                reservation_id: item.id,
                //phone_number: {$ne: phone}
            },
            raw: true
        });

        item.guests = guests;

        return item;
    }));

    // Find give
    items = await Promise.all(items.map(async (item) => {
        let give = await db.give_reservation.findOne({
            where: {
                reservation_id: item.id,
                //phone_number: {$ne: phone}
            },
            raw: true
        });

        item.give = give;
        console.log('item', item);

        return item;
    }));

    return items;

};

export const create = async (data) => {

    // console.log('=============================================================');
    // console.log('||||||||||||||||||| RESERVATION POST DATA |||||||||||||||||||');
    // console.log('=============================================================');
    // console.log(data);
    // console.log('=============================================================');

    try {

        // await pay();

        checkParams(data);

        let {
            customer,
            beach
        } = await validate(data);

        // Remove extra information (if it's the case)
        if (data.seat.type !== 'umbrella') {

            //delete data.seat.extra_seats;
            delete data.seat.new_slots;
            delete data.seat.slots;

        }

        if (data.seat.type !== 'sunbed') {
            delete data.seat.count;
        }

        // Add customer's name to reservation data
        data.name = customer.name;

        // Add beach's name to reservation data
        data.beach_name = beach.name;

        // Make reservation
        const reservation = await makeReservation(data);

        return {
            message: 'VALIDATION.BOOKING.BOOKED',
            reservation
        };

    } catch (error) {
        console.log(error);
        throw error;
    }

};

export const update = async (data) => {

    checkParams(data);

    // Validate reservation id
    const reservation = await checkReservation(data.id);

    if (!reservation) throw {
        name: 'DatabaseBookingError',
        message: 'DB.RESERVATION_NOT_FOUND'
    }

    if (moment(data.start_date) != moment(reservation.start_date)) {
        data.start_date = reservation.start_date;
    }

    if (moment(data.end_date) != moment(reservation.end_date)) {
        data.end_date = reservation.end_date;
    }

    // Remove extra information (if it's the case)
    if (data.seat.type !== 'umbrella') {

        delete data.seat.extra_seats;
        delete data.seat.new_slots;
        delete data.seat.slots;

    }

    if (data.seat.type === 'umbrella' && Object.keys(data.seat.new_slots).length === 0) {
        delete data.seat.new_slots;
    }

    if (data.seat.type !== 'sunbed') {
        delete data.seat.count;
    }

    try {

        const changed = await change(data, reservation);

        return {
            message: 'VALIDATION.BOOKING.UPDATE',
            reservation: changed
        };

    } catch (error) {
        throw error;
    }

};

export const cancel = async ({
    id
}) => {

    // Validate reservation id
    const reservation = await checkReservation(id);

    if (!reservation) throw {
        name: 'DatabaseBookingError',
        message: 'DB.RESERVATION_NOT_FOUND'
    }

    let notificationData = {

        broker: {
            id: '',
            broker_id: '',
            entity: 'reservation',
            action: 'cancel'
        }

    };

    try {

        let remaining_attempts = await shouldCancel(reservation);

        return db.sequelize.transaction().then(function (transaction) {

            console.log('HERE...');


            // await db.booking.destroy({where: {id}});
            return db.booking.update({
                status: 'canceled',
                read: true
            }, {
                where: {
                    id
                }
            }).then(() => {

                // Update grids
                const {
                    beach_id,
                    start_date,
                    end_date,
                    seat,
                    created_by,
                    broker_id,
                    created_for_id
                } = reservation;

                console.log('----------------', seat, '-----------------');

                // To remove customer from grid item's customer array
                if (created_by !== broker_id) {
                    seat.created_by = created_by;
                } else {
                    seat.created_by = created_for_id;
                }

                return updateGrids({
                    beach_id,
                    start_date,
                    end_date,
                    seat,
                    transaction
                }, 'available').catch((error) => {
                    throw error;
                });

            }).then(() => {

                transaction.commit().then(function () {

                    /* ---------------------------------------
                    | STATS                                  |
                    | - background action                    |
                    --------------------------------------- */
                    const period = reservationPeriod(reservation.start_date, reservation.end_date);

                    let seat_type = reservation.seat.type;
                    if (seat_type === 'umbrella') seat_type = 'sunbed';

                    let count = 0; // number of seats that were booked

                    switch (reservation.seat.type) {

                        case 'sunbed':
                            count = reservation.seat.count;
                            break;
                        case 'umbrella':
                            count = reservation.seat.slots['a'].length + reservation.seat.slots['b'].length + reservation.seat.extra_seats;
                            break;
                        case 'baldaquin':
                            count = 1;
                            break;

                    }

                    const payload = {
                        status: 'canceled',
                        count: count,
                        beach_id: reservation.beach_id,
                        seat_type: seat_type,
                        dates: period
                    };

                    // Track seats (add canceled)
                    let action = payload.dates.length > 1 ? 'addBulk' : 'add';
                    db.stats_seat[action](payload);

                    // Track seats (remove booked)
                    payload.status = 'booked';

                    action = payload.dates.length > 1 ? 'removeBulk' : 'remove';
                    db.stats_seat[action](payload);

                });

                cleanInvitations(reservation.id).catch((error) => {
                    throw error;
                });

                // Send as factory response (these will be emitted to the broker/waiter app)
                notificationData.broker.id = reservation.id;
                notificationData.broker.broker_id = reservation.broker_id;

                if (remaining_attempts > 0) {

                    const waiterNotification = {
                        id: reservation.id,
                        waiter_id: reservation.waiter_id || '',
                        beach_id: reservation.beach_id,
                        entity: 'reservation',
                        action: 'cancel'
                    };

                    notificationData.waiter = waiterNotification;

                }

                return db.beach_block_users.destroy({
                        where: {
                            booking_id: reservation.id
                        }
                    })
                    .then(() => {
                        return {
                            attempts: remaining_attempts,
                            message: remaining_attempts === 0 ? 'VALIDATION.BOOKING.CANCELED_NO_ATTEMPTS' : 'VALIDATION.BOOKING.CANCELED',
                            reservation: notificationData
                        };
                    })
                    .catch((error) => {
                        console.log(error);
                        return {
                            attempts: remaining_attempts,
                            message: remaining_attempts === 0 ? 'VALIDATION.BOOKING.CANCELED_NO_ATTEMPTS' : 'VALIDATION.BOOKING.CANCELED',
                            reservation: notificationData
                        };
                    });
            }).catch(error => {

                transaction.rollback();
                throw error;

            });

        });

    } catch (error) {
        throw error;
    }

};

export const release = async ({
    id,
    days
}) => {

    if (!days.length) throw {
        name: 'ReleaseDaysEmptyException',
        message: 'VALIDATION.BOOKING.RELEASE_DAYS_EMPTY'
    }

    days = days.filter(day => day.disabled === true).map(day => day.date);

    // Validate reservation id
    const reservation = await checkReservation(id);

    if (!reservation) throw {
        name: 'DatabaseBookingError',
        message: 'DB.RESERVATION_NOT_FOUND'
    }

    // Only active reservations can be released
    if (reservation['status'] !== 'active' && reservation['payment_method'] === 'offline') throw {
        name: 'BookingReleaseException',
        message: 'VALIDATION.BOOKING.RELEASE'
    }

    // Make sure dates are within reservation period before releasing
    const start = moment(reservation['start_date']).format('YYYY-MM-DD');
    const end = moment(reservation['end_date']).format('YYYY-MM-DD');

    const booking_range = periods.range(start, end);
    const booking_period = Array.from(booking_range.by('day')).map(day => day.format('YYYY-MM-DD'));

    const daysCheck = days.every(date => moment(date).within(booking_range));

    if (!daysCheck) throw {
        name: 'BookingReleaseException',
        message: 'VALIDATION.BOOKING.DATE_RELEASE'
    }

    if (reservation['released_days'].length) {

        for (let i = days.length; i--;) {

            let day = days[i];

            if (reservation['released_days'].indexOf(day) !== -1) {
                days.splice(i, 1);
            }

        }

    }

    if (days.length) {

        const daysImmutable = JSON.parse(JSON.stringify(days)); // used by stats below

        const {
            beach_id,
            seat,
            created_by,
            broker_id,
            created_for_id
        } = reservation;
        const releasedToday = days.includes(moment.tz(moment.now(), reservation['timezone']).format('YYYY-MM-DD'));

        const beachSettings = await getBeachSettings(beach_id, [
            'hour_release_points',
            'partial_day_release_percent_to_points',
            'day_release_percent_to_points'
        ]);

        // Loiality points (background action)
        const loialityPoints = await earnLoialityPoints(reservation, days, beachSettings);

        if (loialityPoints > 0) {
            await loialityPointsToCustomer(beach_id, created_by, loialityPoints);
        }

        // To remove customer from grid item's customer array
        if (created_by !== broker_id) {
            seat.created_by = created_by;
        } else {
            seat.created_by = created_for_id;
        }

        seat.reservation_id = reservation.id; // needed to remove reservation from calendar

        let notificationData = {

            broker: {
                id: reservation.id,
                broker_id: reservation.broker_id,
                entity: 'reservation',
                action: 'release'
            },

            waiter: {
                id: reservation.id,
                beach_id: reservation.beach_id,
                waiter_id: reservation.waiter_id || '',
                entity: 'reservation',
                action: 'release'
            }

        };

        if (reservation.seat_type === 'sunbed') {
            notificationData.waiter.waiter_id = ''; // send to all waiters from current beach
        }

        try {

            let transaction = await db.sequelize.transaction();

            try {

                await updateGrids({
                    beach_id,
                    days,
                    seat,
                    transaction
                }, 'available');
                await transaction.commit();

                cleanInvitations(reservation.id).catch((error) => {
                    throw error;
                });

            } catch (error) {

                transaction.rollback();
                throw error;

            }

            try {

                days = reservation['released_days'].concat(days);

                const fields = {
                    released_days: days
                };
                let responseMessage = 'VALIDATION.BOOKING.UPDATE';

                // Release the whole period (if it's the case)
                if (booking_period.length === days.length) {

                    if (releasedToday) {
                        fields.read = false;
                    }

                    fields.status = 'completed';
                    notificationData.waiter.action = 'complete';

                    responseMessage = 'VALIDATION.BOOKING.RELEASED';

                } else {

                    if (!releasedToday) {
                        delete notificationData.waiter;
                    } else {
                        fields.read = false;
                    }

                }

                await db.booking.update(fields, {
                    where: {
                        id
                    }
                });

                /* ---------------------------------------
                | STATS                                  |
                | - background action                    |
                --------------------------------------- */
                let seat_type = seat.type;
                if (seat_type === 'umbrella') seat_type = 'sunbed';

                let count = 0; // number of seats that were occupied

                switch (seat.type) {

                    case 'sunbed':
                        count = seat.count;
                        break;
                    case 'umbrella':
                        count = seat.slots['a'].length + seat.slots['b'].length + seat.extra_seats;
                        break;
                    case 'baldaquin':
                        count = 1;
                        break;

                }

                const payload = {
                    status: 'released',
                    count: count,
                    beach_id: beach_id,
                    seat_type: seat_type,
                    dates: daysImmutable
                };

                // Track seats (add released)
                let action = payload.dates.length > 1 ? 'addBulk' : 'add';
                db.stats_seat[action](payload);

                // Track seats (remove occupied)
                payload.status = 'occupied';

                action = payload.dates.length > 1 ? 'removeBulk' : 'remove';
                db.stats_seat[action](payload);

                await db.beach_block_users.destroy({
                    where: {
                        booking_id: reservation.id
                    }
                })

                return {
                    message: responseMessage,
                    reservation: notificationData
                };

            } catch (error) {
                throw error;
            }

        } catch (error) {
            throw error;
        }

    } else {

        return {
            message: 'VALIDATION.BOOKING.UPDATE'
        };

    }

};

export const transfer_cancel = async ({
    id,
    customer_id
}) => {

    // Validate reservation id
    const reservation = await checkReservation(id);

    if (!reservation) throw {
        name: 'DatabaseBookingError',
        message: 'DB.RESERVATION_NOT_FOUND'
    }

    // Validate customer
    const customer = await checkCustomer({
        created_by: customer_id
    }, ['id', 'phone']);

    if (!customer) throw {
        name: 'DatabaseBookingError',
        message: 'DB.CUSTOMER_NOT_FOUND'
    }

    let cancel_by = {
        sender: false,
        receiver: false
    };

    if ((reservation.created_by === customer_id) || (reservation.created_for_id !== '' && reservation.created_for_id === customer_id)) {

        cancel_by.sender = true;

    } else {

        if (reservation.created_for_phone !== '' && reservation.created_for_phone === customer.phone) {
            cancel_by.receiver = true;
        }

    }

    // If neither sender or receiver is involved in this reservation, bail out!
    if (!cancel_by.sender && !cancel_by.receiver) throw {

        name: 'DatabaseBookingError',
        message: 'DB.RESERVATION_TRANSFER_CANCEL'

    }


    if (reservation.status === 'booked-transferred') {

        // Check if reservation has expired
        if (minutesLeft(reservation) === 0) {

            if (reservation.created_by !== reservation.broker_id) {

                await db.booking.update({
                    created_for_phone: null
                }, {
                    where: {
                        id
                    }
                });

            } else {

                // Get old customer's phone to put it back on the created_for_phone field (because this reservation was made by reception)
                const old_customer = await checkCustomer({
                    created_by: reservation.created_for_id
                }, ['phone']);

                await db.booking.update({
                    created_for_phone: old_customer.phone
                }, {
                    where: {
                        id
                    }
                });

            }

        } else {

            if (reservation.created_by !== reservation.broker_id) {

                await db.booking.update({
                    created_for_phone: null
                }, {
                    where: {
                        id
                    }
                });

            } else {

                // Get old customer's phone to put it back on the created_for_phone field (because this reservation was made by reception)
                const old_customer = await checkCustomer({
                    created_by: reservation.created_for_id
                }, ['phone']);

                await db.booking.update({
                    created_for_phone: old_customer.phone
                }, {
                    where: {
                        id
                    }
                });

            }

        }

    } else {

        if (reservation.created_by !== reservation.broker_id) {

            await db.booking.update({
                created_for_phone: null
            }, {
                where: {
                    id
                }
            });

        } else {

            // Get old customer's phone to put it back on the created_for_phone field (because this reservation was made by reception)
            const old_customer = await checkCustomer({
                created_by: reservation.created_for_id
            }, ['phone']);

            await db.booking.update({
                created_for_phone: old_customer.phone
            }, {
                where: {
                    id
                }
            });

        }

    }

    return true;

};

export const transfer_approve = async ({
    id,
    customer_id
}) => {

    // Validate reservation id
    const reservation = await checkReservation(id);

    if (!reservation) throw {
        name: 'DatabaseBookingError',
        message: 'DB.RESERVATION_NOT_FOUND'
    }

    // Validate customer
    const customer = await checkCustomer({
        created_by: customer_id
    }, ['id', 'phone', 'name']);

    if (!customer) throw {
        name: 'DatabaseBookingError',
        message: 'DB.CUSTOMER_NOT_FOUND'
    }

    if (reservation.created_for_phone !== '' && reservation.created_for_phone !== customer.phone) throw {

        name: 'DatabaseBookingError',
        message: 'DB.RESERVATION_TRANSFER_CANCEL'

    }

    // Approve transfer
    let status = reservation.status.split('-')[0];

    if (reservation.status === 'booked-transferred') {

        // Check if reservation has expired
        if (minutesLeft(reservation) === 0) {

            if (reservation.created_by !== reservation.broker_id) {

                await db.booking.update({
                    created_for_phone: null
                }, {
                    where: {
                        id
                    }
                });

            } else {

                // Get old customer's phone to put it back on the created_for_phone field (because this reservation was made by reception)
                const old_customer = await checkCustomer({
                    created_by: reservation.created_for_id
                }, ['phone']);

                await db.booking.update({
                    created_for_phone: old_customer.phone
                }, {
                    where: {
                        id
                    }
                });

            }

            expireReservations([reservation]); // background action

            throw {
                name: 'DatabaseBookingError',
                message: 'DB.RESERVATION_TRANSFER_EXPIRED'
            };

        } else {

            if (reservation.seat_type !== 'sunbed') {

                try {

                    await gridChangeCustomer(reservation, customer.id);

                    let data_to_update = {
                        status
                    };

                    if (reservation.created_by === reservation.broker_id) {

                        data_to_update.created_for_id = customer.id;
                        data_to_update.created_for_name = customer.name;
                        data_to_update.created_for_phone = customer.phone;

                    } else {

                        data_to_update.created_by = customer.id;
                        data_to_update.name = customer.name;
                        data_to_update.phone = customer.phone;
                        data_to_update.created_for_phone = null;

                    }

                    await db.booking.update(data_to_update, {
                        where: {
                            id
                        }
                    });

                } catch (error) {

                    throw {
                        name: 'DatabaseBookingError',
                        message: 'SERVER.DATA_BASE_ERROR'
                    };

                }

            }

        }

    } else {

        if (reservation.seat_type !== 'sunbed') {

            try {

                await gridChangeCustomer(reservation, customer.id);

                let data_to_update = {
                    status
                };

                if (reservation.created_by === reservation.broker_id) {

                    data_to_update.created_for_id = customer.id;
                    data_to_update.created_for_name = customer.name;
                    data_to_update.created_for_phone = customer.phone;

                } else {

                    data_to_update.created_by = customer.id;
                    data_to_update.name = customer.name;
                    data_to_update.phone = customer.phone;
                    data_to_update.created_for_phone = null;

                }

                await db.booking.update(data_to_update, {
                    where: {
                        id
                    }
                });

            } catch (error) {

                throw {
                    name: 'DatabaseBookingError',
                    message: 'SERVER.DATA_BASE_ERROR'
                };

            }

        }

    }

    return {
        reservation_no: reservation.number,
        message: 'VALIDATION.BOOKING.TRANSFER_APPROVED'
    };

};

/* ---------------------------------------
| USED BY: /jobs/expire-reservations.js  |
--------------------------------------- */
export const expire = (reservations) => {
    return expireReservations(reservations);
};

/* ---------------------------------------
| USED BY: /jobs/release-reservations.js  |
--------------------------------------- */
export const toRelease = (reservations) => {
    return releaseReservations(reservations);
};


export const share = async ({
    id,
    phone
}) => {

    // Validate reservation id
    const reservation = await checkReservation(id);

    if (!reservation) throw {
        name: 'DatabaseBookingError',
        message: 'DB.RESERVATION_NOT_FOUND'
    }

    if (reservation.status !== 'booked' && reservation.status !== 'active') throw {
        name: 'DatabaseBookingError',
        message: 'DB.RESERVATION_TRANSFER_STATUS'
    };

    phone = '+' + phone.replace(/\D+/g, '');
    const newCustomer = await checkPhone(phone);

    if (newCustomer) {

        // Let's see if new customer has booked something before transferring the reservation to him
        const reservations = await db.booking.findAll({
            where: {
                $or: [{
                        created_by: newCustomer.id
                    },
                    {
                        created_for_id: newCustomer.id
                    }
                ],
                $and: [{
                    status: ['pending', 'booked', 'active']
                }]
            },
            attributes: ['id'],
            raw: true
        });

        if (reservations.length) throw {
            name: 'DatabaseBookingError',
            message: 'DB.RESERVATION_TRANSFER_OVERWRITE'
        };

    }

    // If phone number exist in share table in this reservation
    let exists = await db.share.findOne({
        where: {
            reservation_id: id,
            phone_number: phone
        },
        attributes: ['id', 'phone_number', 'status'],
        raw: true
    });

    if (exists) {
        throw {
            name: 'DatabaseBookingError',
            message: 'VALIDATION.BOOKING.ALREADY_INVITED'
        }
    } else { // if exists in give table
        exists = await db.give_reservation.findOne({
            where: {
                phone_number: phone
            },
            attributes: ['id', 'phone_number', 'status'],
            raw: true
        });

        if (exists) {
            throw {
                name: 'DatabaseBookingError',
                message: 'VALIDATION.BOOKING.ALREADY_INVITED'
            }
        }
    }

    let share_data = {
        reservation_id: id,
        phone_number: phone,
        shared_at: moment().format('YYYY-MM-DD'),
        status: 'pending'
    };

    await db.share.create(share_data);

    let guests = await db.share.findAll({
        where: {
            $and: [{
                reservation_id: id
            }]
        },
        attributes: ['id', 'phone_number', 'status'],
        raw: true
    });

    return guests;
};

export const unshare = async ({
    id,
    share_id
}) => {

    // Validate reservation id
    const reservation = await checkReservation(id);

    if (!reservation) throw {
        name: 'DatabaseBookingError',
        message: 'DB.RESERVATION_NOT_FOUND'
    }

    if (reservation.status !== 'booked' && reservation.status !== 'active') throw {
        name: 'DatabaseBookingError',
        message: 'DB.RESERVATION_TRANSFER_STATUS'
    };

    await db.share.remove(share_id);

    const guests = await db.share.findAll({
        where: {
            $and: [{
                reservation_id: id
            }]
        },
        attributes: ['id', 'phone_number', 'status'],
        raw: true
    });

    console.log('guests', guests);

    return guests;
};

export const accept_invitation = async ({
    id,
    user
}) => {

    // Validate reservation id
    const reservation = await checkReservation(id);

    if (!reservation) throw {
        name: 'DatabaseBookingError',
        message: 'DB.RESERVATION_NOT_FOUND'
    }

    if (reservation.status !== 'booked' && reservation.status !== 'active') throw {
        name: 'DatabaseBookingError',
        message: 'DB.RESERVATION_TRANSFER_STATUS'
    };

    let customer = await db.customer.findOne({
        where: {
            id: user.id
        },
        raw: true
    });

    let share_data = {
        status: 'accepted'
    };
    await db.share.update(share_data, {
        where: {
            reservation_id: id,
            phone_number: customer.phone
        }
    });

    return {
        message: 'VALIDATION.BOOKING.ACCEPTED'
    };
};

export const reject_invitation = async ({
    id,
    share_id
}) => {

    // Validate reservation id
    const reservation = await checkReservation(id);

    if (!reservation) throw {
        name: 'DatabaseBookingError',
        message: 'DB.RESERVATION_NOT_FOUND'
    }

    if (reservation.status !== 'booked' && reservation.status !== 'active') throw {
        name: 'DatabaseBookingError',
        message: 'DB.RESERVATION_TRANSFER_STATUS'
    };

    await db.share.remove(share_id);

    return {
        message: 'VALIDATION.BOOKING.REJECTED'
    };
};

export const quit_invitation = async ({
    id,
    share_id
}) => {

    // Validate reservation id
    const reservation = await checkReservation(id);

    if (!reservation) throw {
        name: 'DatabaseBookingError',
        message: 'DB.RESERVATION_NOT_FOUND'
    }

    if (reservation.status !== 'booked' && reservation.status !== 'active') throw {
        name: 'DatabaseBookingError',
        message: 'DB.RESERVATION_TRANSFER_STATUS'
    };

    await db.share.remove(share_id);

    return {
        message: 'VALIDATION.BOOKING.REJECTED'
    };
};


export const transfer = async ({
    id,
    phone
}) => {

    // Validate reservation id
    const reservation = await checkReservation(id);

    if (!reservation) throw {
        name: 'DatabaseBookingError',
        message: 'DB.RESERVATION_NOT_FOUND'
    }

    if (reservation.status !== 'booked' && reservation.status !== 'active') throw {
        name: 'DatabaseBookingError',
        message: 'DB.RESERVATION_TRANSFER_STATUS'
    };

    phone = '+' + phone.replace(/\D+/g, '');
    const newCustomer = await checkPhone(phone);

    if (newCustomer) {

        // Let's see if new customer has booked something before transferring the reservation to him
        const reservations = await db.booking.findAll({
            where: {
                $or: [{
                        created_by: newCustomer.id
                    },
                    {
                        created_for_id: newCustomer.id
                    }
                ],
                $and: [{
                    status: ['pending', 'booked', 'active']
                }]
            },
            attributes: ['id'],
            raw: true
        });

        if (reservations.length) throw {
            name: 'DatabaseBookingError',
            message: 'DB.RESERVATION_TRANSFER_OVERWRITE'
        };

    }

    let exists = await db.give_reservation.findOne({
        where: {
            reservation_id: id,
            phone_number: phone
        },
        attributes: ['id', 'phone_number', 'status'],
        raw: true
    });

    if (exists) {
        throw {
            name: 'DatabaseBookingError',
            message: 'VALIDATION.BOOKING.ALREADY_INVITED'
        }
    } else { // if exists in share table
        exists = await db.share.findOne({
            where: {
                phone_number: phone
            },
            attributes: ['id', 'phone_number', 'status'],
            raw: true
        });

        if (exists) {
            throw {
                name: 'DatabaseBookingError',
                message: 'VALIDATION.BOOKING.ALREADY_INVITED'
            }
        }
    }

    let transfer_data = {
        reservation_id: id,
        phone_number: phone,
        gave_at: moment().format('YYYY-MM-DD'),
        status: 'pending'
    };

    let give_id = await db.give_reservation.create(transfer_data);

    let guest = give_id;

    return guest;
};

export const cancel_transfer = async ({
    id,
    give_id
}) => {

    // Validate reservation id
    const reservation = await checkReservation(id);

    if (!reservation) throw {
        name: 'DatabaseBookingError',
        message: 'DB.RESERVATION_NOT_FOUND'
    }

    if (reservation.status !== 'booked' && reservation.status !== 'active') throw {
        name: 'DatabaseBookingError',
        message: 'DB.RESERVATION_TRANSFER_STATUS'
    };

    // Remove from give table
    await db.give_reservation.remove(give_id);

    const guest = {};

    return guest;
};

export const accept_transfer = async ({
    id,
    give_id
}) => {

    // Validate reservation id
    const reservation = await checkReservation(id);

    if (!reservation) throw {
        name: 'DatabaseBookingError',
        message: 'DB.RESERVATION_NOT_FOUND'
    }

    if (reservation.status !== 'booked' && reservation.status !== 'active') throw {
        name: 'DatabaseBookingError',
        message: 'DB.RESERVATION_TRANSFER_STATUS'
    };

    // Get give row
    let give = await db.give_reservation.findOne({
        where: {
            id: give_id
        },
        raw: true
    });

    // Get give row
    let customer = await checkPhone(give.phone_number);

    // Remove from give table
    await db.give_reservation.remove(give_id);

    // Update booking
    let booking_data = {
        created_by: customer.id,
        phone: give.phone_number
    };
    await db.booking.update(booking_data, {
        where: {
            id
        }
    });

    // Update calendar
    await gridChangeCustomer(reservation, customer.id);

    return {
        message: 'VALIDATION.BOOKING.ACCEPTED'
    };
};

export const reject_transfer = async ({
    id,
    give_id
}) => {

    // Validate reservation id
    const reservation = await checkReservation(id);

    if (!reservation) throw {
        name: 'DatabaseBookingError',
        message: 'DB.RESERVATION_NOT_FOUND'
    }

    if (reservation.status !== 'booked' && reservation.status !== 'active') throw {
        name: 'DatabaseBookingError',
        message: 'DB.RESERVATION_TRANSFER_STATUS'
    };

    await db.give_reservation.remove(give_id);

    return {
        message: 'VALIDATION.BOOKING.REJECTED'
    };
};