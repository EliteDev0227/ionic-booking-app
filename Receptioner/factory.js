import db from './../../../../../models';
import {
    isObject,
    isNumeric,
    capitalizeFirstLetter
} from './../../../../../helpers';

import moment from 'moment';
import {
    extendMoment
} from 'moment-range';
import {
    stat
} from 'fs';

const periods = extendMoment(moment);

/* ---------------------------------------
| HELPERS                                |
--------------------------------------- */

// background actions
function readReservation(id) {
    db.booking.update({
        read: true
    }, {
        where: {
            id
        }
    });
}

// async
async function validate(data) {

    // Validate beach
    const beach = await checkBeach(data.beach_id);

    if (!beach || beach && beach.status !== 'published') throw {
        name: 'DatabaseBookingError',
        message: 'DB.BEACH_NOT_FOUND'
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

    if (data.created_for_id && data.created_for_id !== '') {

        // Validate customer
        const customer = await checkCustomer(data.created_for_id);

        if (!customer) throw {
            name: 'DatabaseBookingError',
            message: 'DB.CUSTOMER_NOT_FOUND'
        }

        const reservations = await reservationsByCustomerId(customer.id);

        if (reservations && reservations.length) throw {
            name: 'DatabaseBookingError',
            message: 'VALIDATION.BOOKING.CREATE_FOR_ID'
        }

    } else if (data.phone && data.phone !== '') {

        const reservations = await reservationsByCustomerPhone(data.phone);

        if (reservations && reservations.length) throw {
            name: 'DatabaseBookingError',
            message: 'VALIDATION.BOOKING.CREATE_FOR_PHONE'
        }

    }

    // Validate seat position
    const seat = await checkSeat(data);

    if (!seat) throw {
        name: 'SeatPositionException',
        message: 'VALIDATION.GRID.INDEX'
    }

    // Return beach's name (used when we make a reservation - booking > name will be populated with beach's name)
    return {
        beach_name: beach.name
    };

}

async function countFreeSunbeds(date, beach_id) {

    if (!(date.start && date.end)) {

        date.start = moment().format('YYYY-MM-DD');
        date.end = moment().format('YYYY-MM-DD');

    }
    if (date.startDate && date.endDate) {
        date.start = date.startDate;
        date.end = date.endDate;
    }

    let count = 0,
        price = 0;

    try {
        // Build period
        let days = [];

        if (date.start === date.end) {

            days = [date.start];

        } else {

            let range = periods.range(date.start, date.end);
            days = Array.from(range.by('day')).map(day => day.format('YYYY-MM-DD'));

        }

        // Get available seats within period
        let grids = await db.calendar.extra_seats(beach_id, days);



        if (grids.length) {

            count = grids.map(item => item.sunbeds);
            count = Math.min(...count);

            price = grids.map(item => item.price);
            if (price && price.length) {

            }
            price = price.reduce((a, b) => a + b, 0);
            price = (price / grids.length);

            // price = (price / grids.length).toFixed(1);

            // if ( price.split('.')[1] == 0 ) {
            //     price = Number(price).toFixed(0);
            // }

            // price = Number(price);

        }
    } catch (e) {

    }

    return {
        count,
        price
    };

}

// sync
function checkParams(data) {
    return;
    // Check start date
    if (data.start_date && data.start_date !== '') {

        let now = moment().format('YYYY-MM-DD');
        now = moment(now).format('x');

        if (now > moment(data.start_date).format('x')) throw {
            name: 'InvalidArgumentException',
            message: 'BROKER.VALIDATION.GRID.DATE_RANGE_TODAY'
        }

    }

    // Check end date
    if (data.end_date && data.end_date !== '') {

        if (moment(data.start_date).format('x') > moment(data.end_date).format('x')) throw {
            name: 'InvalidArgumentException',
            message: 'BROKER.VALIDATION.GRID.DATE_RANGE_START'
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

        let a_valid_slots = (!data.seat.slots.a) ? [] : data.seat.slots.a.every(item => isNumeric(item));
        let b_valid_slots = (!data.seat.slots.b) ? [] : data.seat.slots.b.every(item => isNumeric(item));

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

function gridStatus(seat, grids, status, protocol = false, discount = false) {
    console.log(">>> BOOKING UPDATE::: grid Status called ", {
        seat,
        grids,
        status
    });
    let promises = [];

    for (let i = grids.length; i--;) {

        let item = grids[i];

        let {
            id,
            grid,
            extra_sunbeds
        } = item;

        // find seat
        let grid_item = grid[seat.zone].filter(el => el.index == seat.index)[0];
        console.log("GRID STATUS::", grid_item);
        let grid_item_idx = grid[seat.zone].indexOf(grid_item);


        let statusMap = grid_item.status;
        let slots = seat.slots;
        if (grid_item.type !== 'static') {
            if (status == 'booked' || status == 'occupied' || status == 'paid') {
                Object.keys(statusMap).map((side) => {
                    let slot = statusMap[side];
                    if (slot && slot.length) {
                        for (let j = 0; j < slot.length; j++) {
                            if (slots[side] && slots[side][j]) {
                                if (slot[j] !== 'available') {
                                    console.log(">>> BOOKING UPDATE::: Seat not available error:::", JSON.stringify({
                                        slots,
                                        grid_item,
                                        status,
                                        statusMap
                                    }));
                                    throw {
                                        name: 'BookingSlotsUnavailableException',
                                        message: 'VALIDATION.BOOKING.SLOTS_UNAVAILABLE'
                                    };
                                } else {
                                    slot[j] = status;
                                }
                            }

                        }
                    }
                });
                if (!grid_item.reservations) {
                    grid_item.reservations = [];
                }
                grid_item.reservations.push(seat.reservation_id);
            } else if (status == 'available') {
                Object.keys(statusMap).map((side) => {
                    let slot = statusMap[side];
                    if (slot && slot.length) {
                        for (let j = 0; j < slot.length; j++) {
                            if (slots[side] && slots[side][j]) {
                                slot[j] = status;
                            }

                        }
                    }
                });
                let ind = grid_item.reservations.indexOf(seat.reservation_id);
                if (ind > -1) {
                    grid_item.reservations.splice(ind, 1);
                }
            }
        }

        grid[seat.zone][grid_item_idx] = grid_item;
        console.log(">>> BOOKING UPDATE::: grid item UPDATED:::", JSON.stringify({
            status,
            grid_item,
            slots
        }));

        /*
                // Fetch available status items
                let statusMap = db._client['grid']['status'];

        let seatsNumMap = db._client['grid']['umbrella']['seatsNum'];
                if (grid_item.type === 'umbrella') {

                   
                    if (!grid_item.protocol) {
                        grid_item.protocol = {
                            
                        }
                        Object.keys(grid_item.status).map((slot) => {
                            grid_item.protocol[slot] = new Array(grid_item.status[slot].length).map(() => false);
                        });
                    }
                    if (!grid_item.discount) {
                        grid_item.discount = {
                            
                        }
                        Object.keys(grid_item.status).map((slot) => {
                            grid_item.discount[slot] = new Array(grid_item.status[slot].length).map(() => false);
                        });
                    }

                    
                    let slots_key = seat.new_slots ? 'new_slots' : 'slots';
                    /*let slots_ = {};
                    let slots_clone = {};
                    Object.keys(seat[slots_key]).map((slot) => {
                        slots_[slot] = seat[slots_key][slot];
                    });
        let slots_a = seat[slots_key].a;
        let slots_b = seat[slots_key].b;

        let slots_a_clone = slots_a.slice();
        let slots_b_clone = slots_b.slice();

        if (status === 'booked' || status === 'paid') {

            // Check if someone else already booked selected slots before him
            if (slots_a.length) {

                for (let i = grid_item.status.a.length; i--;) {

                    if (grid_item.status.a[i] !== 'available' && typeof slots_a[i] !== 'undefined') {
                        slots_a.splice(i, 1);
                    }

                }

            }

            if (slots_b.length) {

                for (let i = grid_item.status.b.length; i--;) {

                    if (grid_item.status.b[i] !== 'available' && typeof slots_b[i] !== 'undefined') {
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
                grid_item.protocol.a[slot_idx] = protocol && (status !== 'available');
                grid_item.discount.a[slot_idx] = discount && (status !== 'available');
            });

        }

        if (slots_b.length) {

            sides.push('B');

            slots_b.forEach(slot_idx => {
                grid_item.status.b[slot_idx] = status;
                grid_item.protocol.b[slot_idx] = protocol && (status !== 'available');
                grid_item.discount.b[slot_idx] = discount && (status !== 'available');
            });

        }

        // Build seat's status icon
        let status_icon_left = grid_item.status.a.map(slotStatus => {
            return (slotStatus === 'paid' || slotStatus === 'occupied') ? statusMap['booked'] : statusMap[slotStatus];
        });

        let status_icon_right = grid_item.status.b.map(slotStatus => {
            return (slotStatus === 'paid' || slotStatus === 'occupied') ? statusMap['booked'] : statusMap[slotStatus];
        });

        let icon = status_icon_left.concat(status_icon_right).join('');
        let seats_num = seatsNumMap[grid_item.seats];
        let status_icon = db._client['grid']['icons'][grid_item.type][seats_num]['icon_' + icon];

        if (status === 'booked' || status === 'paid' || status === 'occupied') {



            // Freeze seat
            if (seat.is_freezed) {
                grid_item.is_freezed = true;
            }

            // Add customer to grid item
            if (seat.created_by) {

                if (!grid_item.customer) {
                    grid_item.customer = [];
                }

                let customer = {
                    id: seat.created_by,
                    side: sides.join(''),
                    status_icon
                };

                grid_item.customer.push(customer);

            }

            // Add reservation_id to grid item
            if (!grid_item.reservations) {
                grid_item.reservations = [];
            }

            grid_item.reservations.push(seat.reservation_id);
            



        } else if (status === 'available') {
           
            // Remove reservation_id from grid
            if (grid_item.reservations) {

                if (!seat.keep_reservation_id) {

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

                    if (seat.created_by) {
                        delete grid_item.customer;
                    }

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
        let icon = status === 'paid' ? statusMap['booked'] : statusMap[status];
        let status_icon = db._client['grid']['icons'][grid_item.type]['icon_' + icon];

        if (status !== 'available') {

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

            // Update grid status icon (the public one)
            grid_item.status_icon = status_icon.replace(/3/g, 2);
            grid_item.status = status;
            grid_item.protocol = grid_item.protocol || protocol;
            grid_item.discount = grid_item.discount || discount;

            // Update customer's status icon
            grid_item.customer[0].status_icon = status_icon.replace(/2/g, 3);

        } else {

            delete grid_item.customer;
            delete grid_item.reservations;

            // Restore seat's status icon to the default one (available)
            grid_item.status_icon = status_icon;
            grid_item.status = 'available';
            grid_item.protocol = false;
            grid_item.discount = false;
        }

    }
    */
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

        if (status === 'booked') {

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
            extra_sunbeds = extra_sunbeds + data.count;

            if (data.minus) {
                extra_sunbeds = extra_sunbeds - data.minus;
            }

            if (data.plus) {
                extra_sunbeds = extra_sunbeds + data.plus;
            }

        }




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

    if (reservation.time_limit == 0) {
        const minutesDiff = moment(reservation.end_date).diff(moment().tz(reservation.timezone), 'minutes');
        const minutesLeft = minutesDiff < 0 ? 0 : minutesDiff;
        return minutesLeft;
    } else {
        const minutesDiff = moment().tz(reservation.timezone).diff(moment(reservation.start_date), 'minutes');
        const minutesLeft = (reservation.time_limit - minutesDiff) < 0 ? 0 : (reservation.time_limit - minutesDiff);

        return minutesLeft;
    }


}

function reservationPeriod(paramObj, exclude_released_days = true) {
    let {
        start_date,
        end_date,
        startDate,
        endDate,
        released_days
    } = paramObj;

    const start = startDate || moment(start_date).format('YYYY-MM-DD');
    const end = endDate || moment(end_date).format('YYYY-MM-DD');


    const reservation_range = periods.range(start, end);
    let reservation_period = Array.from(reservation_range.by('day')).map(day => day.format('YYYY-MM-DD'));

    if (released_days && released_days.length && exclude_released_days) {

        for (let i = reservation_period.length; i--;) {

            let day = reservation_period[i];

            if (released_days.indexOf(day) !== -1) {
                reservation_period.splice(i, 1);
            }

        }

    }

    return reservation_period;

}

/* ---------------------------------------
| PRIVATE METHODS                        |
--------------------------------------- */
async function setupLoialityPoints(customer_id, beach_id, beach_name) {

    try {

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

    } catch (error) {}

}

async function loialityPointsToCustomer(beach_id, customer_id, points) {

    try {
        await db.loiality_points.give(beach_id, customer_id, points);
    } catch (error) {}

}

async function loialityPointsFromCustomer(beach_id, customer_id, points) {

    try {
        await db.loiality_points.remove(beach_id, customer_id, points);
    } catch (error) {}

}

async function earnLoialityPoints(reservation, days_released, settings) {

    let pointsEarned = 0;

    if ((settings.partial_day_release_percent_to_points > 0 && settings.hour_release_points !== '') ||
        settings.day_release_percent_to_points > 0) {

        const releaseDate = moment.tz(moment.now(), reservation.timezone);
        const releasedToday = days_released.includes(releaseDate.format('YYYY-MM-DD'));

        const grids = await calendar(reservation['beach_id'], days_released);

        if (reservation['seat_type'] !== 'sunbed') {

            // Seat with released date
            const seatsList = grids
                .map(item => {
                    return {
                        date: moment(item.created_at).format('YYYY-MM-DD'),
                        seat: item['grid'][reservation.seat.zone].filter(seat => seat.index === reservation.seat.index)[0]
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

async function checkCustomer(id) {

    try {

        const customer = await db.customer.findOne({
            where: {
                id
            },
            attributes: ['id', 'phone'],
            raw: true
        });

        return customer;

    } catch (error) {}

}

async function checkBeach(beach_id) {

    try {

        const beach = await db.beach.findOne({
            where: {
                id: beach_id
            },
            attributes: ['id', 'status', 'name'],
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

        // const givenY = Number(data.seat.position.y);
        // const givenX = Number(data.seat.position.x);
        
        const givenIndex = Number(data.seat.index);
        if (beachGrid) {

            let {
                grid
            } = beachGrid;

            let seats = grid[data.seat.zone];

            let foundSeat = seats.filter(seat => seat.index == givenIndex)[0];

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
                'waiter_id',
                'broker_id',
                'phone',
                'created_for_phone',
                'created_for_id',
                'created_for_name',
                'name',
                'released_days',
                'timezone',
                'seat',
                'seat_type',
                'seat_number_sides',
                'beach_id',
                'time_limit',
                'cancel_limit',
                'amount',
                'old_amount',
                'payment_method',
                'read',
                'virtual_cash',
                'protocol',
                'discount',
                'discount_per',
                'avg_price',
                'extra_price'
            ]
        });

        return reservation;

    } catch (error) {}

}

async function checkPhone(phone) {

    try {

        phone = `+${phone.replace(/\s+/g, '')}`;

        const customerByPhone = await db.customer.findOne({
            attributes: ['id', 'name', 'phone'],
            where: {
                phone
            },
            raw: true
        });

        return customerByPhone;

    } catch (error) {}

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

async function reservationsByCustomerPhone(phone) {

    phone = `${phone}`.replace(/\s+/, '');

    let results = await db.booking.findAll({
        where: {
            created_for_phone: phone,
            status: ['booked', 'active']
        },
        raw: true,
        attributes: ['id']
    });

    return results.length ? results : false;

}

async function reservationsByCustomerId(created_for_id) {

    let results = await db.booking.findAll({
        where: {
            created_for_id,
            status: ['booked', 'active']
        },
        raw: true,
        attributes: ['id']
    });

    return results.length ? results : false;

}

async function searchReservations(phone, beach_id, res) {

    // Check beach_id param
    if (!beach_id || beach_id && beach_id === '' || beach_id !== '' && beach_id.length > 100) throw {
        name: 'InvalidArgumentException',
        message: 'VALIDATION.GRID.BEACH_ID'
    };

    // Check phone param
    if (!phone || phone && phone === '' || phone !== '' && !Number.isInteger(parseInt(phone))) throw {
        name: 'InvalidArgumentException',
        message: 'VALIDATION.BOOKING.PHONE_PARAM'
    };

    phone = `+${phone}`.replace(/\s+/, '');

    // Validate beach
    const beach = await checkBeach(beach_id);

    if (!beach) throw {
        name: 'DatabaseBookingError',
        message: 'DB.BEACH_NOT_FOUND'
    }

    let results = await db.booking.findAll({
        where: {
            phone,
            beach_id
        },
        raw: true,
        attributes: [
            'id',
            'status',
            'number',
            'start_date',
            'end_date',
            'released_days',
            'seat',
            'seat_type',
            'seat_number_sides',
            'amount',
            'old_amount',
            'currency',
            'payment_method',
            'name',
            'created_for_name',
            'phone',
            'created_for_phone',
            'time_limit',
            'timezone',
            'created_at',
            'read'
        ]
    });

    if (results.length) {

        // Continue with mapping the results
        results = results.map(item => {

            let minutes_left = minutesLeft(item);

            // Add time left (in the response) in minutes
            if (minutes_left > 0) item.minutes_left = minutes_left;

            // Add expiration flag
            if (item.status === 'booked' && minutes_left === 0) {
                item.status = 'expired';
            }

            // Add period
            const period = reservationPeriod(item, false);
            item.period = {
                start: period[0],
                end: period.length > 1 ? period[period.length - 1] : period[0]
            };

            item.period.start = moment(item.period.start).format('DD.MM');
            item.period.end = moment(item.period.end).format('DD.MM');

            // Add time
            item.time = moment.tz(item.created_at, item.timezone).format('HH.mm A');

            // Format released days (if any)
            if (item.released_days && Array.isArray(item.released_days) && item.released_days.length) {
                item.released_days = item.released_days.map(day => moment(day).format('DD.MM'));
            }

            // Add BY and FOR
            item.by = `${item.name}`;
            if (item.phone && item.phone !== '') item.by = `${item.by} / ${item.phone}`;

            item.for = `${item.created_for_name}`;
            if (item.created_for_phone && item.created_for_phone !== '') item.for = `${item.for} / ${item.created_for_phone}`;

            // Modify seat
            if (item.seat_type !== 'baldaquin') {

                let _seat = {
                    sunbeds: 0
                };

                // Add sunbeds count, extra sunbeds (if any) side, number and type
                if (item.seat_type === 'umbrella') {

                    _seat.sunbeds = item.seat.slots['a'].length + item.seat.slots['b'].length;
                    _seat.sides = item.seat_number_sides;
                    _seat.number = item.seat.number;
                    _seat.extra_sunbeds = item.seat.extra_seats;
                    _seat.type = item.seat_type;

                    if (item.status === 'change-request') {
                        _seat.new_sunbeds = item.seat.new_slots['a'].length + item.seat.new_slots['b'].length;
                        _seat.new_extra_sunbeds = item.seat.new_extra_seats;
                        _seat.new_number = item.seat.new_number;
                        _seat.new_sides = item.seat.new_number_sides.replace(/\s+/, '');
                        _seat.new_zone = item.seat.new_zone;
                    }

                } else if (item.seat_type === 'sunbed') {
                    _seat.sunbeds = item.seat.count;
                    _seat.type = item.seat_type;
                }

                item.seat = _seat;

            } else {

                let _seat = {
                    number: item.seat.number,
                    type: item.seat_type
                };

                if (item.status === 'change-request') {
                    _seat.new_number = item.seat.new_number;
                    _seat.new_zone = item.seat.new_zone;
                }

                item.seat = _seat;

            }

            // Add clicked flag
            item.clicked = false;

            // Add status text (for example, change active to occupied)
            switch (item.status) {

                case 'pending':
                    item.status_text = res.__('BOOKING_STATUS.PENDING');
                    break;

                case 'booked':

                    item.status_text = `${res.__('BOOKING_STATUS.BOOKED')}`;

                    if (item.payment_method === 'online') {
                        item.status_text = `${res.__('BOOKING_STATUS.PAID')} ONLINE`;
                    }

                    break;

                case 'active':
                    item.status_text = res.__('BOOKING_STATUS.ACTIVE');
                    break;

                case 'expired':
                    item.status_text = res.__('BOOKING_STATUS.EXPIRED');
                    break;

                case 'change-request':

                    if (item.seat_type !== 'sunbed') {
                        item.status_text = res.__('BOOKING_STATUS.CHANGE_REQUEST');
                    } else {
                        item.status_text = res.__('BOOKING_STATUS.CHANGE_REQUEST_SUNBED');
                    }

                    break;

                case 'canceled':
                    item.status_text = res.__('BOOKING_STATUS.CANCELED');
                    break;

                case 'completed':
                    item.status_text = `${res.__('BOOKING_STATUS.COMPLETED')}`;
                    break;

                case 'unanounced':
                    item.status_text = res.__('BOOKING_STATUS.UNANOUNCED');
                    break;

            }

            // Keep active status text in case reservation is in change-request state so we can fallback to its default status
            item.active_status_text = res.__('BOOKING_STATUS.ACTIVE');

            // Delete unnecessary data

            if (item.seat_type === 'sunbed') {
                delete item.seat_number;
                delete item.seat_number_sides;
            }

            delete item.created_at;
            delete item.timezone;
            delete item.time_limit;
            delete item.seat_type;
            delete item.name;
            delete item.created_for_name;
            delete item.phone;
            delete item.created_for_phone;
            delete item.seat_number_sides;
            delete item.start_date;
            delete item.end_date;

            return item;

        });

    }

    return results;

}

async function updateGrids(data, status = 'booked') {

    try {
        let start = new Date(data.startDate || data.start_date);
        let end = new Date(data.endDate || data.end_date);

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

        if (data.seat.type !== 'sunbed') {

            // Pass along transaction object
            data.seat.transaction = data.transaction;
            console.log(">>>> BOOKING PROCESS:: Update Grid Status called");
            promises = gridStatus(data.seat, grids, status, data.protocol, data.discount);
            result = await db.Sequelize.Promise.all(promises);
            console.log(">>>> BOOKING PROCESS:: Update Grid Status Completed");
            if (data.seat.type === 'umbrella' && data.seat.extra_seats > 0) {

                promises = sunbedsCount({
                    count: data.seat.extra_seats,
                    transaction: data.transaction
                }, grids, status);
                result = await db.Sequelize.Promise.all(promises);

            }

        } else {

            promises = sunbedsCount({
                count: data.seat.count,
                transaction: data.transaction
            }, grids, status);
            result = await db.Sequelize.Promise.all(promises);

        }
        return result;
    } catch (e) {
        console.log(">>>> BOOKING PROCESS:: Update Grid Error", e);
    }
    console.log(">>>> BOOKING PROCESS:: Update Grid Finished");

}

async function resetUpdateGrids(data) {
    console.log(">>> BOOKING UPDATE::: reset update grids function called", data);
    let gridFindObj;
    try {
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
            console.log(">>> BOOKING UPDATE::: fetch all from calendar");
            gridFindObj = {

                where: {
                    beach_id: data.beach_id,
                    created_at: booking_period
                },

                transaction: data.transaction,
                lock: data.transaction.LOCK.UPDATE,
                raw: true

            };
            oldGrids = await db.calendar.findAll(gridFindObj);

            newGrids = oldGrids.slice();

        } else {
            console.log(">>> BOOKING UPDATE::: fetch all from calendar");
            gridFindObj = {

                where: {
                    beach_id: data.beach_id,
                    created_at: {
                        $between: [moment(start).format('YYYY-MM-DD'), moment(end).format('YYYY-MM-DD')]
                    }
                },

                transaction: data.transaction,
                lock: data.transaction.LOCK.UPDATE,
                raw: true

            };
            oldGrids = await db.calendar.findAll(gridFindObj);

            newGrids = oldGrids.slice();

        }
        console.log(">>> BOOKING UPDATE::: done fetching from calendar");
        let result, promises;





        // baldaquin | umbrella >> << baldaquin | umbrella

        // Pass along transaction object
        data.old_seat.transaction = data.transaction;
        data.new_seat.transaction = data.transaction;
        if (data.new_seat.new_slots) {
            data.new_seat.slots = data.new_seat.new_slots;
        }

        // Update seats status
        console.log(">>> BOOKING UPDATE::: UPDATE OLD GRIDs");
        promises = gridStatus(data.old_seat, oldGrids, 'available');
        await db.Sequelize.Promise.all(promises);
        newGrids = await db.calendar.findAll(gridFindObj);
        console.log(">>> BOOKING UPDATE::: UPDATE NEW GRIDs");
        promises = gridStatus(data.new_seat, newGrids, data.status, data.protocol, data.discount);
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





        return result;
    } catch (e) {
        console.log(">>> BOOKING UPDATE::: reset update grids catch", e);
    }

}

async function seatStatus(reservation, status) {

    const start = moment(reservation.start_date).format('YYYY-MM-DD');
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

    let promises = [];

    for (let i = grids.length; i--;) {

        const grid_id = grids[i]['id'];
        let grid = grids[i]['grid'];

        // find seat
        let grid_item = grid[reservation.seat.zone].filter(el => el.index === reservation.seat.index)[0];
        let grid_item_idx = grid[reservation.seat.zone].indexOf(grid_item);


        let rSeats = reservation.seat.slots;
        let sides = Object.keys(rSeats);
        for (let j = 0; j < sides.length; j++) {
            let side = sides[j];
            let rList = rSeats[side];
            for (let k = 0; k < rList.length; k++) {
                if (rList[k]) {
                    grid_item.status[side][k] = status;
                }
            }
        }

        /*if (reservation.seat.type === 'umbrella') {

            // Change seat status
            if (reservation.seat.slots.a.length) {

                reservation.seat.slots.a.forEach(slot_idx => {
                    grid_item.status.a[slot_idx] = status;
                });

            }

            if (reservation.seat.slots.b.length) {

                reservation.seat.slots.b.forEach(slot_idx => {
                    grid_item.status.b[slot_idx] = status;
                });

            }

        } else {
            grid_item.status = status;
        } */

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

async function unlockGrids(data, confirm_change_request) {

    let start = new Date(data.start_date);
    let end = new Date(data.end_date);

    if (!data.end_date) end = start;

    // Get the grids
    let grids;

    if (data['released_days'].length) {

        const booking_range = periods.range(moment(start).format('YYYY-MM-DD'), moment(end).format('YYYY-MM-DD'));
        const booking_period = Array.from(booking_range.by('day')).map(day => day.format('YYYY-MM-DD'));

        for (let i = booking_period.length; i--;) {

            let day = booking_period[i];

            if (data['released_days'].indexOf(day) !== -1) {
                booking_period.splice(i, 1);
            }

        }

        grids = await db.calendar.findAll({

            where: {
                beach_id: data.beach_id,
                created_at: booking_period
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

    let result, promises;

    if (data.old_seat.type === 'sunbed') {

        if (data.new_seat.type !== 'sunbed') {

            // To identify customer within grid
            data.new_seat.created_by = data.created_by;

            // Pass along transaction object
            data.new_seat.transaction = data.transaction;

            // from sunbed to baldaquin || umbrella : update seats status
            promises = gridStatus(data.new_seat, newGrids, 'locked', data.protocol, data.discount);
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

            /* ---------------------------
            | UPDATE GRIDS               |
            --------------------------- */

            if (false === confirm_change_request) {

                // To identify customer within grid
                data.new_seat.created_by = data.created_by;

                // Pass along transaction object
                data.new_seat.transaction = data.transaction;

                // Cancel request : unlock seats
                promises = gridStatus(data.new_seat, grids, 'available', data.protocol, data.discount);
                result = await db.Sequelize.Promise.all(promises);

            } else {

                // To identify customer within grid
                data.new_seat.created_by = data.created_by;
                data.old_seat.created_by = data.created_by;

                // Pass along transaction object
                data.new_seat.transaction = data.transaction;
                data.old_seat.transaction = data.transaction;

                // Approve request

                promises = gridStatus(data.old_seat, grids, 'available');
                await db.Sequelize.Promise.all(promises);

                // Keep the reservation id within new seat (bug fix - check gridStatus function)
                data.new_seat.keep_reservation_id = true;

                promises = gridStatus(data.new_seat, grids, 'available');
                await db.Sequelize.Promise.all(promises);

                promises = gridStatus(data.new_seat, grids, 'occupied', data.protocol, data.discount);
                result = await db.Sequelize.Promise.all(promises);

            }

            /* ---------------------------
            | UPDATE SEATS COUNT         |
            --------------------------- */

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

                if (false === confirm_change_request) {

                    if (data.old_seat['extra_seats'] === 0 && data.new_seat['extra_seats'] > 0) {

                        promises = sunbedsCount({
                            count: 0,
                            plus: data.new_seat['extra_seats'],
                            transaction: data.transaction
                        }, grids, 'available');
                        result = await db.Sequelize.Promise.all(promises);

                    } else if (data.old_seat['extra_seats'] > 0 && data.new_seat['extra_seats'] > 0) {

                        promises = sunbedsCount({
                            count: data.new_seat['extra_seats'],
                            minus: data.old_seat['extra_seats'],
                            transaction: data.transaction
                        }, grids, 'available');
                        result = await db.Sequelize.Promise.all(promises);

                    }

                }

            }

        }

    }

    return result;

}

async function makeReservation(data) {
    console.log(">>>> BOOKING PROCESS:: Make reservtion is caleld", data);

    let {
        beach_id,
        broker_id,
        waiter_id,
        seat,
        status,
        phone,
        start_date,
        startDate,
        endDate,
        end_date,
        amount,
        protocol,
        discount,
        discount_per,
        avg_price,
        extra_price
    } = data;
    if (!discount_per) {
        discount_per = 0;
    }


    let created_by = broker_id,
        created_for_id = data.created_for_id,
        name = data.beach_name,
        created_for_name = data.created_for_name;

    try {
        if (typeof created_for_id === 'undefined' || created_for_id === '') created_for_id = broker_id;
        if (typeof created_for_name === 'undefined' || created_for_name === '') created_for_name = name;

        if (!end_date) end_date = start_date;

        // Cast string to numeric
        if (seat.type !== 'sunbed') {

           // seat.position.y = Number(seat.position.y);
           //  seat.position.x = Number(seat.position.x);

        } else {
            seat.count = Number(seat.count);
        }

        amount = parseFloat(amount, 10);

        if (seat.extra_seats && seat.extra_seats !== '') {
            seat.extra_seats = Number(seat.extra_seats);
        }

        if (seat.slots) {

            Object.keys(seat.slots).map((slot) => {
                if (seat.slots[slot]) seat.slots[slot] = seat.slots[slot].map(item => Number(item));
            });

        }
    } catch (e) {

    }



    let notificationData = {

        broker: {
            id: '',
            broker_id: '',
            entity: 'reservation',
            action: 'add'
        }

    };

    try {
        // Check extra seats
        if ((seat.type == 'umbrella' && seat.extra_seats) || seat.type === 'sunbed') {

            const givenSeats = seat.type === 'sunbed' ? seat.count : seat.extra_seats;
            const freeExtraSeats = await countFreeSunbeds({
                start: start_date,
                end: end_date,
                startDate,
                endDate
            }, beach_id);


            if (freeExtraSeats.count === 0) throw {
                name: 'ExtraSeatsException',
                message: 'VALIDATION.BOOKING.NO_EXTRA_SEATS'
            };

            if ((freeExtraSeats.count - givenSeats) < 0) throw {
                name: 'ExtraSeatsException',
                message: 'VALIDATION.BOOKING.UPDATED_EXTRA_SEATS',
                available_seats: freeExtraSeats.count
            };
        }


        const attributeList = ['timezone', 'booking_time_limit', 'cancel_daily_limit', 'working_hours', 'currency'];

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

            Object.keys(seat.slots).map((slot) => {
                if (seat.slots[slot].length) sides.push(slot.toUpperCase());
            });
            if (sides.length) {
                seat_number_sides = `${seat_number_sides} ${sides.join('')}`;
            }

        }
        console.log(">>>> BOOKING PROCESS:: Transaction started");


        return db.sequelize.transaction().then(function (transaction) {

                return db.beach.reservationCount(data.beach_id).then(beach => {

                    let number = beach[0][0][0].reservation_count;
                    let seat_type = seat.type;
                    let read = true;

                    // One time only - this will be set to false when customer changes his position while in "booked" state
                    seat.allow_change_in_booking_state = true;

                    let bookingData = {
                        number,
                        beach_id,
                        created_by,
                        created_for_id,
                        broker_id,
                        waiter_id,
                        seat,
                        seat_number,
                        seat_number_sides,
                        seat_type,
                        start_date,
                        end_date,
                        working_hours,
                        timezone,
                        time_limit,
                        cancel_limit,
                        amount,
                        currency,
                        status,
                        name,
                        created_for_name,
                        read,
                        protocol,
                        discount,
                        discount_per,
                        avg_price,
                        extra_price
                    };

                    if (phone !== '') bookingData.created_for_phone = phone;

                    return db.booking.create(bookingData, {
                            transaction
                        }).then((result) => {

                            // Reception attached this reservation to a customer - we use that customer to add him into the grid
                            if (created_for_id !== broker_id) {

                                seat.created_by = created_for_id;

                                // Allow customer to rate & review (background action)
                                allowRateReview(created_for_id, beach_id);

                                // Setup the loiality points for current beach (background action)
                                setupLoialityPoints(created_for_id, beach_id, data.beach_name);

                            }

                            seat.reservation_id = result.id; // keep track of this reservation on current seat
                            notificationData.broker.id = result.id;
                            notificationData.broker.broker_id = bookingData.broker_id;

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

                            if (data.created_for_id) {
                                notificationData.customer = {
                                    id: result.id,
                                    beach_id: bookingData.beach_id,
                                    customer_id: data.created_for_id || '',
                                    entity: 'reservation',
                                    action: 'create'
                                }
                            }

                            if ((seat.type === 'umbrella' || seat.type === 'baldaquin') && settings.umbrella && 'person-num' in settings.umbrella &&
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

                            /* ---------------------------------------
                            | STATS                                  |
                            | - background action                    |
                            --------------------------------------- */

                            const period = reservationPeriod({
                                start_date,
                                startDate,
                                endDate,
                                end_date
                            }, false);

                            let seat_type = seat.type;
                            if (seat_type === 'umbrella' || seat_type === 'baldaquin') seat_type = 'sunbed';

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
                                    case 'baldaquin':
                                        count = 0;
                                        try {
                                            Object.keys(seat.slots).map((slot) => {
                                                count += seat.slots[slot];
                                            });
                                        } catch (e) {
                                            console.log(">>> BOOKING PROCESS:::", JSON.stringify(seat.slots));
                                        }

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
                            console.log(">>>> BOOKING PROCESS:: Update Grid Started", seat);

                            return updateGrids({
                                beach_id,
                                start_date,
                                startDate,
                                endDate,
                                end_date,
                                seat,
                                transaction,
                                protocol,
                                discount
                            }, status);


                        }).then(function () {

                            transaction.commit();

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
            .then(function (notificationData) {
                return notificationData;
            })
            .catch(function (error) {

                throw error;

            });

    } catch (error) {

        if (error.name === 'BookingInPendingException' ||
            error.name === 'SeatPositionException' ||
            error.name === 'SlotsUnavailableException' ||
            error.name === 'InvalidArgumentException' ||
            error.name === 'ExtraSeatsException') {
            throw error;
        }

        throw {
            name: 'DatabaseError',
            message: 'SERVER.DATA_BASE_ERROR'
        };

    }

}

async function updateSeat(data, reservation) {

    let {
        id,
        seat,
        amount,
        old_amount,
        created_for_name,
        created_for_phone,
        waiter_id
    } = data;
    console.log(">>> BOOKING UPDATE::: update seat params", data);

    // Cast string to numeric
    if (seat.type !== 'sunbed') {

       // seat.position.y = Number(seat.position.y);
       // seat.position.x = Number(seat.position.x);

    } else {
        seat.count = Number(seat.count);
    }

    amount = Number(amount);
    old_amount = Number(old_amount);

    if (seat.extra_seats) {
        seat.extra_seats = Number(seat.extra_seats);
    }

    if (seat.slots) {
        Object.keys(seat.slots).map((sideName) => {
            if (seat.slots[sideName]) {
                seat.slots[sideName] = seat.slots[sideName].map(item => Number(item));
            }
        });
    }

    if (seat.new_slots) {
        Object.keys(seat.new_slots).map((sideName) => {
            if (seat.new_slots[sideName]) {
                seat.new_slots[sideName] = seat.new_slots[sideName].map(item => Number(item));
            }
        });

    }

    try {

        if (reservation.status !== 'active') {

            let minutesDiff = moment().tz(reservation.timezone).diff(moment.tz(reservation.created_at, reservation.timezone), 'minutes');
            let expired = minutesDiff > reservation.time_limit;

            if (false && expired) {

                throw {
                    name: 'BookingExpired',
                    message: 'VALIDATION.BOOKING.EXPIRED'
                };

            }

        }

        if (reservation.status === 'booked' || reservation.status === 'active') {

            let seat_number = seat.type === 'sunbed' ? 0 : seat.number;
            let seat_number_sides = seat.type === 'sunbed' ? 0 : seat.number;

            if (seat.type === 'umbrella') {

                if (seat.new_slots) {

                    let sides = [];
                    Object.keys(seat.new_slots).map((sideName) => {
                        if (seat.new_slots[sideName].length) {
                            sides.push(sideName.toUpperCase());
                        }
                    });

                    if (sides.length) {
                        seat_number_sides = `${seat_number_sides} ${sides.join('')}`;
                    }

                }

            }

            let transaction = await db.sequelize.transaction();

            let created_by = reservation['created_by'];

            if (reservation['created_for_id'] !== null && reservation['created_for_id'] !== reservation['broker_id']) {
                created_by = reservation['created_for_id'];
            }

            seat.reservation_id = reservation['id']; // needed to add reservation in calendar
            seat.created_by = created_by; // needed to add customer field in calendar

            reservation.seat.reservation_id = reservation['id']; // needed to remove reservation from calendar
            reservation.seat.created_by = created_by; // needed to remove customer field from calendar

            try {

                let status = reservation['status'] === 'active' ? 'occupied' : reservation['status'];

                if (reservation['status'] === 'booked' && reservation['payment_method'] === 'online') {
                    status = 'paid';
                }
                console.log(">>> BOOKING UPDATE::: reset grid is called", reservation);

                await resetUpdateGrids({
                    beach_id: reservation['beach_id'],
                    start_date: reservation.start_date,
                    end_date: reservation['end_date'],
                    released_days: reservation['released_days'],
                    status: status,
                    old_seat: reservation['seat'],
                    new_seat: seat,
                    discount: reservation['discount'],
                    protocol: reservation['protocol'],
                    transaction
                });
                console.log(">>> BOOKING UPDATE::: reset grd process done");

                try {

                    // Update slots
                    seat.slots = seat.new_slots;

                    delete seat.transaction;
                    delete seat.reservation_id;
                    delete seat.created_by;

                    // if ( reservation['status'] === 'booked' && reservation['payment_method'] === 'online' ) {

                    //     old_amount = amount + old_amount;
                    //     amount     = 0;

                    // }

                    let dataToUpdate = {
                        amount,
                        old_amount,
                        seat,
                        seat_number,
                        seat_number_sides,
                        waiter_id
                    };

                    if (created_for_phone && created_for_phone !== '') dataToUpdate.created_for_phone = created_for_phone;
                    if (created_for_name && created_for_name !== '') dataToUpdate.created_for_name = created_for_name;

                    console.log(">>> BOOKING UPDATE::: update booking table", dataToUpdate);

                    await db.booking.update(dataToUpdate, {
                        where: {
                            id
                        }
                    });
                    await transaction.commit();
                    console.log(">>> BOOKING UPDATE::: Update booking is done");

                    /* ---------------------------------------
                    | STATS                                  |
                    | - background action                    |
                    --------------------------------------- */
                    const period = reservationPeriod({
                        start_date: reservation.start_date,
                        end_date: reservation.end_date,
                        startDate: data.startDate,
                        endDate: data.endDate
                    }, false);
                    console.log(">>> BOOKING UPDATE::: reservation period fetched", period);

                    let seat_type = seat.type;
                    if (seat_type === 'umbrella') seat_type = 'sunbed';

                    let old_count = 0; // number of seats that were occupied || booked
                    let new_count = 0;

                    switch (seat.type) {

                        case 'sunbed':
                            new_count = seat.count;
                            old_count = reservation.seat.count;
                            break;

                        case 'umbrella':
                            let u_new_count = seat.extra_seats;
                            Object.keys(seat.slots).map((sideName) => {
                                u_new_count += seat.slots[sideName].length;
                            });
                            new_count = u_new_count;
                            let u_old_count = reservation.seat.extra_seats;
                            Object.keys(reservation.seat.slots).map((sideName) => {
                                u_old_count += reservation.seat.slots[sideName].length;
                            });
                            old_count = u_old_count;
                            break;

                    }

                    const payload = {
                        status: 'booked',
                        count: 0,
                        beach_id: reservation.beach_id,
                        seat_type: seat_type,
                        dates: period
                    };

                    if (reservation.status === 'active') {
                        payload.status = 'occupied';
                    }

                    if (old_count !== new_count) {

                        if (new_count > old_count) {
                            payload.count = new_count - old_count;
                        } else if (old_count > new_count) {
                            payload.count = old_count - new_count;
                        }

                        if (payload.count > 0) {

                            // Track seats (add booked || occupied)
                            if (new_count > old_count) {

                                let action = payload.dates.length > 1 ? 'addBulk' : 'add';
                                db.stats_seat[action](payload);

                            }

                            // Track seats (remove booked || occupied)
                            if (new_count < old_count) {

                                let action = payload.dates.length > 1 ? 'removeBulk' : 'remove';
                                db.stats_seat[action](payload);

                            }

                        }

                    }

                } catch (error) {
                    throw error;
                }

            } catch (error) {

                transaction.rollback();
                throw error;

            }

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

async function changeSunbeds(reservation, change) {

    return db.sequelize.transaction().then(function (transaction) {

        const {
            beach_id,
            start_date,
            end_date,
            seat,
            released_days,
            status,
            amount,
            old_amount
        } = reservation;

        const old_seat = JSON.parse(JSON.stringify(seat));
        const new_seat = JSON.parse(JSON.stringify(seat));

        const dataToUpdate = {

            status: 'active',
            seat: old_seat

        };

        if (!change) {

            new_seat.count = 0;

            delete new_seat.new_count;
            delete old_seat.new_count;

            if (parseFloat(amount) > 0) {
                dataToUpdate.amount = 0;
            }

        }

        if (change && parseFloat(amount) > 0) {

            dataToUpdate.amount = 0;
            dataToUpdate.old_amount = parseFloat(old_amount) + parseFloat(amount);
            dataToUpdate.seat.count = new_seat.new_count;

            delete dataToUpdate.seat.new_count;

        }

        return db.booking.update(dataToUpdate, {
            where: {
                id: reservation.id
            }
        }).then(() => {

            return new Promise(async (resolve, reject) => {

                // Update grids: if no change, rollback

                if (!change) {

                    await resetUpdateGrids({
                        beach_id,
                        start_date,
                        end_date,
                        released_days,
                        old_seat,
                        new_seat,
                        transaction
                    });

                }

                resolve();

            });

        }).then(() => {

            transaction.commit();

            // Dont wait for the commit, return silently
            return 'VALIDATION.BOOKING.UPDATE';

        }).catch(error => {

            transaction.rollback();
            throw error;

        });

    });

}

async function changePosition(reservation, change) {

    return db.sequelize.transaction().then(function (transaction) {

        // Update grids
        const {
            beach_id,
            waiter_id,
            start_date,
            end_date,
            seat,
            seat_number_sides,
            created_by,
            released_days,
            status,
            protocol,
            discount
        } = reservation;

        let old_seat = {
            type: seat.type,
            zone: seat.zone,
            number: seat.number,
            slots: seat.slots,
            position: seat.position,
            extra_seats: seat.extra_seats,
            reservation_id: reservation.id
        };

        let new_seat = {
            type: seat.new_type,
            zone: seat.new_zone,
            number: seat.new_number,
            number_sides: seat.new_number_sides,
            slots: seat.new_slots,
            position: seat.new_position,
            extra_seats: seat.new_extra_seats
        };

        let dataToUpdate = {

            status: 'active',
            seat: change ? new_seat : old_seat,
            seat_number: change ? new_seat.number : old_seat.number,
            seat_number_sides: change ? new_seat.number_sides : seat_number_sides,
            waiter_id: waiter_id

        };

        if (!change) {
            delete dataToUpdate.seat.reservation_id;
        }

        return db.booking.update(dataToUpdate, {
            where: {
                id: reservation.id
            }
        }).then(() => {

            new_seat.reservation_id = reservation.id;

            return unlockGrids({
                created_by, // to eventually remove customer from grid (from new position - after confirmation is canceled)
                beach_id,
                start_date,
                end_date,
                released_days,
                old_seat,
                new_seat,
                transaction,
                status,
                protocol,
                discount
            }, change);

        }).then(() => {

            transaction.commit();

            // Dont wait for the commit, return silently
            return 'VALIDATION.BOOKING.UPDATE';

        }).catch(error => {

            transaction.rollback();
            throw error;

        });

    });

}

async function setCustomer(data) {

    /* ---------------------------------------
    | POST data validation                   |
    --------------------------------------- */

    // Check "created_for_phone" param
    if (data.created_for_phone && data.created_for_phone !== '') {

        data.created_for_phone = data.created_for_phone.replace(/\s+/g, '').replace('+', '');

        if (!Number.isInteger(Number(data.created_for_phone))) throw {
            name: 'InvalidArgumentException',
            message: 'VALIDATION.BOOKING.PHONE_PARAM'
        };

        data.created_for_phone = `+${data.created_for_phone}`;

    }

    // Sanitize "created_for_name" param
    // if ( data.created_for_name && data.created_for_name !== '' ) {

    //     data.created_for_name = data.created_for_name.split(' ')
    //         .map(name => capitalizeFirstLetter(name.replace(/\s+/g, ''))).join(' ');

    // }

    /* ---------------------------------------
    | Database validation                    |
    --------------------------------------- */

    // Validate reservation (required field)
    const reservation = await checkReservation(data.reservation_id);

    if (!reservation) throw {
        name: 'DatabaseBookingError',
        message: 'DB.RESERVATION_NOT_FOUND'
    };

    // Validate customer
    // if ( data.created_for_id && data.created_for_id !== '' ) {

    //     data.created_for_id = data.created_for_id.replace(/\s+/g, '');

    //     const isCustomer = await checkCustomer(data.created_for_id);

    //     if ( !isCustomer ) throw {
    //         name    : 'DatabaseBookingError',
    //         message : 'DB.CUSTOMER_NOT_FOUND'
    //     }

    // }

    /* ---------------------------------------
    | Add/Update customer                    |
    --------------------------------------- */

    // If no name, fallback to default value - which is beach's name
    // if ( !data.created_for_name || data.created_for_name && data.created_for_name === '' ) {

    //     const beach = await db.beach.findOne({
    //         raw        : true,
    //         where      : {id: reservation.beach_id}, 
    //         attributes : ['name']
    //     });

    //     if ( beach ) {
    //         data.created_for_name = beach.name;
    //     }

    // }

    const notificationData = {

        broker: {
            id: reservation.id,
            broker_id: reservation.broker_id,
            entity: 'reservation',
            action: 'update'
        }

    };

    const waiterNotification = {
        id: reservation.id,
        waiter_id: reservation.waiter_id || '',
        beach_id: reservation.beach_id,
        entity: 'reservation',
        action: 'update'
    };

    notificationData.waiter = waiterNotification;

    const customer_id = reservation.created_for_id || reservation.created_by;
    if (customer_id) {
        notificationData.customer = {
            id: reservation.id,
            customer_id: customer_id,
            beach_id: reservation.beach_id,
            entity: 'reservation',
            action: 'update'
        };
    }

    if (reservation.created_by === reservation.broker_id && data.created_for_phone && data.created_for_phone !== '') {

        await db.booking.update({
            phone: data.created_for_phone
        }, {
            where: {
                id: reservation.id
            }
        });

        return {
            message: 'VALIDATION.BOOKING.UPDATE',
            reservation: notificationData,
        };

    }
    return {
        message: 'VALIDATION.BOOKING.UPDATE_PHONE_NUMBER',
        reservation: notificationData,
    }
}

async function notifications(data) {

    const {
        beach_id,
        unread
    } = data;

    let items = await db.booking.findAll({
        where: {
            beach_id,
            read: false
        },
        attributes: ['id'],
        raw: true
    });

    let count = 0;

    if (items.length > unread) {
        count = items.length - unread;
    }

    return count;

}

async function calendar(beach_id, days) {

    const grids = await db.calendar.by_days(beach_id, days);
    return grids;

}

/* ---------------------------------------
| PUBLIC METHODS                         |
--------------------------------------- */

export const get = async (req, res) => {
    console.log(">>>>>>>>> BOOKING GET ::: function called called");
    // Validate beach
    const beach = await checkBeach(req.params.beach_id);
    console.log(">>>>>>>>> BOOKING GET ::: got beach");
    console.log("------------------------------------------------------");

    if (!beach || beach && beach.status !== 'published') throw {
        name: 'InvalidArgumentException',
        message: 'DB.BEACH_NOT_FOUND'
    }

    let start_date = !req.query.start_date || req.query.start_date && req.query.start_date === '' ?
        null : req.query.start_date;

    let end_date = !req.query.end_date || req.query.end_date && req.query.end_date === '' ?
        null : req.query.end_date;

    let status = !req.query.status || (req.query.status && req.query.status === '') || (req.query.status && req.query.status === 'null') ? ['canceled', 'expired', 'pending', 'booked', 'active', 'change-request', 'completed'] : req.query.status.split(',');

    let paid = !req.query.paid || req.query.paid && req.query.paid === false ?
        null : true;

    // if ( !Array.isArray(status) ) throw {
    //     name    : 'InvalidArgumentException',
    //     message : 'VALIDATION.BOOKING.STATUS'
    // }

    // Validate end date
    if (moment(start_date) > moment(end_date)) throw {
        name: 'InvalidArgumentException',
        message: 'BROKER.VALIDATION.GRID.DATE_RANGE_START'
    }

    // Validate page number
    if (req.query.offset <= 0) req.query.offset = 0;

    let items = [],
        per_page = db._broker['items_per_page'];

    if (req.query.offset % db._broker['items_per_page'] !== 0) {

        // Error for frontend dev (no translation required)
        throw {
            name: 'InvalidArgumentException',
            message: `Please make sure the OFFSET parameter (from URL - if not 0) can be devided by the LIMIT you get from response, which is: ${per_page}.`
        }

    }

    let where = {
        beach_id: req.params.beach_id,
        status,
    };

    if (req.query.status === 'booked') {
        where.payment_method = paid ? 'online' : 'offline';
    }
    if (req.query.unread == 1) {
        where.read = false;
    }

    if (start_date && end_date) {

        // if ( start_date == end_date ) {

        //     where.$and = [
        //         db.sequelize.where(db.sequelize.fn('TO_CHAR', db.sequelize.col('start_date'), 'YYYY-MM-DD'), '=', start_date),
        //         db.sequelize.where(db.sequelize.fn('TO_CHAR', db.sequelize.col('end_date'), 'YYYY-MM-DD'), '=', end_date),
        //     ]

        // } else {

        //     where.$and = [
        //         db.sequelize.where(db.sequelize.fn('TO_CHAR', db.sequelize.col('start_date'), 'YYYY-MM-DD'), '>=', start_date),
        //         db.sequelize.where(db.sequelize.fn('TO_CHAR', db.sequelize.col('end_date'), 'YYYY-MM-DD'), '<=', end_date),
        //     ]

        // }

        if (start_date == end_date) {

            where.start_date = db.sequelize.where(db.sequelize.fn('TO_CHAR', db.sequelize.col('start_date'), 'YYYY-MM-DD'), '>=', start_date);

        } else {

            where.$or = [
                db.sequelize.where(db.sequelize.fn('TO_CHAR', db.sequelize.col('start_date'), 'YYYY-MM-DD'), '>=', start_date),
                db.sequelize.where(db.sequelize.fn('TO_CHAR', db.sequelize.col('end_date'), 'YYYY-MM-DD'), '<=', end_date),
            ]

        }

    }
    console.log(">>>>>>>>> BOOKING GET ::: get results");
    console.log(">>>>>>>>> BOOKING GET ::: no results");

    let results = [];
    try {
        results = await db.booking.findAndCountAll({

            where,

            limit: per_page,
            offset: req.query.offset,
            order: [
                ['updated_at', 'DESC']
            ],
            raw: true,
            logging: console.log,
            attributes: [
                'id',
                'status',
                'number',
                'start_date',
                'end_date',
                'released_days',
                'beach_id',
                'created_for_id',
                'created_by',
                'broker_id',
                'seat',
                'seat_type',
                'seat_number_sides',
                'amount',
                'old_amount',
                'currency',
                'payment_method',
                'name',
                'created_for_name',
                'phone',
                'created_for_phone',
                'time_limit',
                'timezone',
                'created_at',
                'read'
            ]

        });
    } catch (e) {
        console.log(">>>>>>>>> BOOKING GET ::: Error in getting results", e);
    }
    console.log(">>>>>>>>> BOOKING GET ::: got results");

    console.log("results");
    let blocked = await db.beach_block_users.findAll({
        where: {
            beach_id: req.params.beach_id,
            blocked: false,
        }
    });

    blocked = blocked.map(item => item.booking_id);

    if (results.rows.length) {

        // If filtered by paid-online...
        if (paid) {
            items = results.rows.filter(item => item.payment_method == 'online');
        }

        items = items.length ? items : results.rows;

        // Exclude canceled/expired/completed with read: true
        // const statusLookup = ['canceled', 'expired', 'completed'];

        // items = items.filter(item => {

        //     if ( statusLookup.includes(item.status) && item.read === true ) {
        //         return false;
        //     }

        //     return true;

        // });

        // Continue with mapping the items
        items = items.map(item => {

           // if (item.payment_method === 'offline') {

                //let minutes_left = minutesLeft(item);

                // Add time left (in the response) in minutes
                //if (minutes_left > 0) item.minutes_left = minutes_left;

                // Add expiration flag
                // if (item.status === 'booked' && minutes_left === 0) {
                //     item.status = 'expired';
                // }

            //}

            // Add period
            const period = reservationPeriod(item, false);
            item.period = {
                start: period[0],
                end: period.length > 1 ? period[period.length - 1] : period[0]
            };

            item.period.start = moment(item.period.start).format('DD.MM');
            item.period.end = moment(item.period.end).format('DD.MM');

            // Add time
            item.time = moment.tz(item.created_at, item.timezone).format('HH:mm DD.MM.YYYY');

            // Format released days (if any)
            if (item.released_days && Array.isArray(item.released_days) && item.released_days.length) {

                item.released_days_original = JSON.parse(JSON.stringify(item.released_days));
                item.released_days = item.released_days.map(day => moment(day).format('DD.MM'));

            }

            // Add BY and FOR
            item.by = `${item.name}`;
            if (item.phone && item.phone !== '') item.by = `${item.by} / ${item.phone}`;

            item.for = `${item.created_for_name}`;
            if (item.created_for_phone && item.created_for_phone !== '') item.for = `${item.for} / ${item.created_for_phone}`;

            // Modify seat
            if (item.seat_type !== 'baldaquin') {

                let _seat = {
                    sunbeds: 0
                };

                // Add sunbeds count, extra sunbeds (if any) side, number and type
                if (item.seat_type === 'umbrella') {
                    let sunbedCount = 0;
                    Object.keys(item.seat.slots || {}).map(seatSlot => {
                        if (item.seat.slots[seatSlot] && item.seat.slots[seatSlot].length) {
                            sunbedCount += item.seat.slots[seatSlot].length;
                        }
                    });
                    _seat.sunbeds = sunbedCount; // item.seat.slots['a'].length + item.seat.slots['b'].length;
                    _seat.sides = item.seat_number_sides;
                    _seat.number = item.seat.number;
                    _seat.extra_sunbeds = item.seat.extra_seats;
                    _seat.type = item.seat_type;

                    if (item.status === 'change-request') {
                        let sunbedCountNew = 0;
                        Object.keys(item.seat.new_slots).map(seatSlot => {
                            if (item.seat.new_slots[seatSlot] && item.seat.new_slots[seatSlot.length]) {
                                sunbedCountNew += item.seat.new_slots[seatSlot].length;
                            }
                        });

                        _seat.new_sunbeds = sunbedCountNew; // item.seat.new_slots['a'].length + item.seat.new_slots['b'].length;
                        _seat.new_extra_sunbeds = item.seat.new_extra_seats;
                        _seat.new_number = item.seat.new_number;
                        _seat.new_sides = item.seat.new_number_sides.replace(/\s+/, '');
                        _seat.new_zone = item.seat.new_zone;
                    }

                } else if (item.seat_type === 'sunbed') {

                    _seat.sunbeds = item.seat.count;
                    _seat.type = item.seat_type;

                    if (item.status === 'change-request') {
                        _seat.new_count = item.seat.new_count;
                    }

                }

                item.seat = _seat;

            } else {

                let _seat = {
                    number: item.seat.number,
                    type: item.seat_type
                };

                if (item.status === 'change-request') {
                    _seat.new_number = item.seat.new_number;
                    _seat.new_zone = item.seat.new_zone;
                }

                item.seat = _seat;

            }

            // Add clicked flag
            item.clicked = false;
            console.log(item.status);
            // Add status text (for example, change active to occupied)
            switch (item.status) {

                case 'booked':

                    item.status_text = `${res.__('BOOKING_STATUS.BOOKED')}`;

                    if (item.payment_method === 'online') {
                        item.status_text = `${res.__('BOOKING_STATUS.PAID')} ONLINE`;
                    }

                    break;

                case 'active':
                    item.status_text = res.__('BOOKING_STATUS.ACTIVE');
                    break;

                case 'expired':
                    item.status_text = res.__('BOOKING_STATUS.EXPIRED');
                    break;

                case 'change-request':

                    if (item.seat_type !== 'sunbed') {
                        item.status_text = res.__('BOOKING_STATUS.CHANGE_REQUEST');
                    } else {
                        item.status_text = res.__('BOOKING_STATUS.CHANGE_REQUEST_SUNBED');
                    }

                    break;

                case 'canceled':
                    item.status_text = res.__('BOOKING_STATUS.CANCELED');
                    break;

                case 'completed':
                    item.status_text = `${res.__('BOOKING_STATUS.COMPLETED')}`;
                    break;

                case 'unanounced':
                    item.status_text = res.__('BOOKING_STATUS.UNANOUNCED');
                    break;

                case 'pending':
                    item.status_text = res.__('BOOKING_STATUS.PENDING');
                    break;

            }

            // Keep active status text in case reservation is in change-request state so we can fallback to its default status
            item.active_status_text = res.__('BOOKING_STATUS.ACTIVE');

            item.acceptable = blocked.indexOf(item.id) === -1;

            if (item.created_by === item.broker_id) item.acceptable = false;


            // Delete unnecessary data

            if (item.seat_type === 'sunbed') {
                delete item.seat_number;
                delete item.seat_number_sides;
            }

            delete item.created_at;
            delete item.timezone;
            delete item.time_limit;
            delete item.seat_type;
            delete item.name;
            delete item.created_for_name;
            delete item.phone;
            delete item.created_for_phone;
            delete item.seat_number_sides;
            delete item.start_date;
            delete item.end_date;
            delete item.beach_id;
            delete item.created_for_id;
            delete item.created_by;

            return item;

        });

    }

    const hasMore = db._has_more(results, req.query.offset);
    const limit = per_page;

    // // Get free sunbeds count
    // const sunbeds = await countFreeSunbeds({start: start_date, end: end_date}, req.params.beach_id);

    // Attach new notifications (if any) to response
    const notificationsCount = await notifications({
        beach_id: req.params.beach_id,
        unread: req.query.unread && req.query.unread !== '' ? req.query.unread : 0
    });

    // return {items, limit, hasMore, free_sunbeds: sunbeds.count, notifications: notificationsCount};
    console.log(">>>>>>>>> BOOKING GET ::: Got Response");

    return {
        items,
        limit,
        hasMore,
        notifications: notificationsCount
    };

};

export const photo = async ({
    reservation_id
}) => {
    let reservation = await checkReservation(reservation_id);

    if (reservation) {
        const customer = await db.customer.find({
            where: {
                id: reservation.created_for_id || reservation.created_by
            }
        });

        if (!customer) throw {
            message: 'VALIDATION.BOOKING.NO_CUSTOMER'
        };
        if (!customer.photo) throw {
            message: 'VALIDATION.BOOKING.NO_IMAGE'
        };

        return customer.photo;

    } else {

        throw {
            name: 'DatabaseBookingError',
            message: 'DB.RESERVATION_NOT_FOUND'
        };

    }
}

export const view = async ({
    reservation_id
}) => {

    let reservation = await checkReservation(reservation_id);

    if (reservation) {

        // Read reservation (background action)
        if (false === reservation.read) {
            readReservation(reservation.id);
        }

        // Add period
        reservation.period = reservationPeriod(reservation, false);

        // reservation.period = reservation.period
        //     .map(day => {
        //         return {date: day, day: moment(day).format('DD.MM')};
        //     })
        //     .filter(item => {

        //         const now = moment.tz(reservation.timezone).format('YYYY-MM-DD');
        //         return moment(item.date).format('YYYY-MM-DD') >= now;

        //     });

        reservation.period = reservation.period
            .map(day => {
                return {
                    date: day,
                    day: moment(day).format('DD.MM')
                };
            });

        // Format released days (if any)
        if (reservation.released_days && Array.isArray(reservation.released_days) && reservation.released_days.length) {

            reservation.released_days_original = JSON.parse(JSON.stringify(reservation.released_days));
            reservation.released_days = reservation.released_days;

        }

        // Replace created by
        if (reservation.created_by === reservation.broker_id) {
            reservation.created_by = 'broker';
        } else {
            reservation.created_by = 'customer';
        }

        // Remove the + in front of phone number (make it numeric)
        if (reservation.phone && reservation.phone !== '') {
            reservation.phone = reservation.phone.replace('+', '');
        }

        if (reservation.created_for_phone && reservation.created_for_phone !== '') {
            reservation.created_for_phone = reservation.created_for_phone.replace('+', '');
        }

        const cal = await db.calendar.findOne({
            where: {
                beach_id: reservation.beach_id,
                created_at: {
                    $between: [moment(reservation.start_date).format('YYYY-MM-DD'), moment(reservation.end_date).format('YYYY-MM-DD')]
                }
            }
        });
        const beach_setting = await db.beach_setting.findOne({
            where: {
                beach_id: reservation.beach_id
            }
        });
        if (cal) {
            reservation.extra_sunbeds = cal.extra_sunbeds;
        }
        if (beach_setting) {
            reservation.beach_setting = beach_setting;
        }

        // Delete unnecessary data
        delete reservation.seat.allow_change_in_booking_state;

        delete reservation.waiter_id;
        delete reservation.beach_id;
        delete reservation.broker_id;
        delete reservation.cancel_limit;
        delete reservation.created_at;
        delete reservation.timezone;
        delete reservation.time_limit;
        delete reservation.start_date;
        delete reservation.end_date;

        return reservation;

    } else {

        throw {
            name: 'DatabaseBookingError',
            message: 'DB.RESERVATION_NOT_FOUND'
        };

    }

};

export const create = async (data) => {
    console.log(">>>> BOOKING PROCESS:: create function is called", data);
    try {

        // Check phone param
        if (data.phone && data.phone !== '' && !Number.isInteger(Number(data.phone))) throw {
            name: 'InvalidArgumentException',
            message: 'VALIDATION.BOOKING.PHONE_PARAM'
        };

        if (data.phone && data.phone !== '') {
            data.phone = `+${data.phone}`.replace(/\s+/g, '');
        }

        if (!data.phone) data.phone = '';

        checkParams(data);

        const validation = await validate(data);
        console.log(">>>> BOOKING PROCESS:: check arams validatio completed");

        // Who created this reservation - default value is beach's name
        data.name = validation.beach_name;

        // Remove extra information (if it's the case)
        if (data.seat.type !== 'umbrella' && data.seat.type !== 'baldaquin') {

            delete data.seat.extra_seats;
            delete data.seat.new_slots;
            delete data.seat.slots;

        }

        if (data.seat.type !== 'sunbed') {
            delete data.seat.count;
        }

        // Make reservation
        const reservation = await makeReservation(data);

        return {
            message: 'VALIDATION.BOOKING.BOOKED_BROKER',
            reservation
        };

    } catch (error) {
        throw error;
    }

};

export const update = async (data) => {
    console.log(">>> BOOKING UPDATE::: function called", data);
    checkParams(data);
    console.log(">>> BOOKING UPDATE::: Check params completed");

    // Validate reservation id
    const reservation = await checkReservation(data.id);
    console.log(">>> BOOKING UPDATE::: reservation fetched", reservation);

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
    if (data.seat.type !== 'umbrella' && data.seat.type !== 'baldaquin') {

        delete data.seat.extra_seats;
        delete data.seat.new_slots;
        delete data.seat.slots;

    }

    const notificationData = {

        broker: {
            id: reservation.id,
            broker_id: reservation.broker_id,
            entity: 'reservation',
            action: 'update'
        }

    };

    const waiterNotification = {
        id: reservation.id,
        waiter_id: reservation.waiter_id || '',
        beach_id: reservation.beach_id,
        entity: 'reservation',
        action: 'update'
    };

    notificationData.waiter = waiterNotification;

    const customer_id = reservation.created_for_id || reservation.created_by;
    if (customer_id) {
        notificationData.customer = {
            id: reservation.id,
            customer_id: customer_id,
            beach_id: reservation.beach_id,
            entity: 'reservation',
            action: 'update'
        };
    }

    if (data.seat.type === 'umbrella' && Object.keys(data.seat.new_slots).length === 0) {
        delete data.seat.new_slots;
    }

    if (data.seat.type !== 'sunbed') {
        delete data.seat.count;
    } else {
        notificationData.sunbeds = seat.count;
    }

    try {

        // console.log('------------------------');
        // console.log(JSON.stringify(data, null, 4));
        // console.log('------------------------');

        console.log(">>> BOOKING UPDATE::: update seat called");

        await updateSeat(data, reservation);
        console.log(">>> BOOKING UPDATE::: update seat process completed");

        return {
            message: 'VALIDATION.BOOKING.UPDATE',
            reservation: notificationData,
        };

    } catch (error) {
        throw error;
    }

};

export const customer = async (data) => {

    try {

        const result = await setCustomer(data);
        return result;

    } catch (error) {
        throw error;
    }

};

export const cancel = async ({
    id,
    block
}) => {


    // Validate reservation id
    const reservation = await checkReservation(id);

    if (!reservation) throw {
        name: 'DatabaseBookingError',
        message: 'DB.RESERVATION_NOT_FOUND'
    }

    const notificationData = {

        broker: {
            id: reservation.id,
            broker_id: reservation.broker_id,
            entity: 'reservation',
            action: 'update'
        }

    };

    const waiterNotification = {
        id: reservation.id,
        waiter_id: reservation.waiter_id || '',
        beach_id: reservation.beach_id,
        entity: 'reservation',
        action: 'update'
    };

    notificationData.waiter = waiterNotification;

    const customer_id = reservation.created_for_id || reservation.created_by;
    if (customer_id) {
        notificationData.customer = {
            id: reservation.id,
            customer_id: customer_id,
            beach_id: reservation.beach_id,
            entity: 'reservation',
            action: 'cancel'
        };
    }

    try {


        return await db.sequelize.transaction().then(function (transaction) {


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
                    id,
                    beach_id,
                    start_date,
                    end_date,
                    created_by,
                    broker_id,
                    created_for_id,
                    seat
                } = reservation;

                // Remove reservation from seat
                seat.reservation_id = id;

                // Remove customer from grid item's customer array
                if (created_by !== broker_id) {
                    seat.created_by = created_by;
                } else {
                    seat.created_by = created_for_id;
                }

                if (seat.new_slots) {
                    delete seat.new_slots;
                }

                let result = updateGrids({
                    beach_id,
                    start_date,
                    end_date,
                    seat,
                    transaction
                }, 'available');
                try {
                    //let promises = db.guest_code.removeByReservation(id);

                } catch (e) {

                }

                return result;


            }).then(() => {

                transaction.commit().then(function () {

                    /* ---------------------------------------
                    | STATS                                  |
                    | - background action                    |
                    --------------------------------------- */
                    const {
                        start_date,
                        end_date,
                        seat
                    } = reservation;

                    const period = reservationPeriod({
                        start_date,
                        end_date
                    }, false);

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

                const result = {
                    message: 'VALIDATION.BOOKING.CANCELED_BY_BROKER',
                    reservation: notificationData,
                };

                const {
                    id,
                    beach_id,
                    created_for_id,
                    created_by
                } = reservation;
                const customer_id = created_for_id || created_by;

                // Beach block users
                /*if (customer_id && block) {

                    return db.beach_block_users.destroy({
                        where: {
                            booking_id: id
                        }
                    }).then(() => {
                        return block ? db.beach_block_users.create({
                            beach_id,
                            customer_id,
                            blocked: true,
                            booking_id: id
                        }) : null;
                    }).then(() => {
                        return result;
                    }).catch(error => {
                        console.log(error);
                        return result;
                    });
                }*/

                return {
                    message: 'VALIDATION.BOOKING.CANCELED_BY_BROKER',
                    reservation: notificationData,
                }

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

    // Validate reservation id
    const reservation = await checkReservation(id);

    if (!reservation) throw {
        name: 'DatabaseBookingError',
        message: 'DB.RESERVATION_NOT_FOUND'
    }

    const notificationData = {

        broker: {
            id: reservation.id,
            broker_id: reservation.broker_id,
            entity: 'reservation',
            action: 'update'
        }

    };

    const waiterNotification = {
        id: reservation.id,
        waiter_id: reservation.waiter_id || '',
        beach_id: reservation.beach_id,
        entity: 'reservation',
        action: 'update'
    };

    notificationData.waiter = waiterNotification;

    const customer_id = reservation.created_for_id || reservation.created_by;
    if (customer_id) {
        notificationData.customer = {
            id: reservation.id,
            customer_id: customer_id,
            beach_id: reservation.beach_id,
            entity: 'reservation',
            action: 'release'
        };
    }

    // Only active and booked (paid online) reservations can be released
    if (reservation['status'] !== 'active') {

        if (reservation['payment_method'] !== 'online') throw {
            name: 'BookingReleaseException',
            message: 'VALIDATION.BOOKING.RELEASE'
        }

    }

    // Make sure dates are within reservation period before releasing
    const start = moment(reservation.start_date).format('YYYY-MM-DD');
    const end = moment(reservation.end_date).format('YYYY-MM-DD');

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
            broker_id,
            created_by,
            created_for_id
        } = reservation;

        // To remove customer from grid item's customer array
        if (created_for_id && created_for_id !== created_by) {
            seat.created_by = created_for_id;
        } else if (!created_for_id && created_by !== broker_id) {
            seat.created_by = created_by;
        }

        // To remove reservation from calendar
        seat.reservation_id = reservation['id'];

        // Loialty points
        if (seat.created_by) {

            const beachSettings = await getBeachSettings(beach_id, [
                'hour_release_points',
                'partial_day_release_percent_to_points',
                'day_release_percent_to_points'
            ]);

            // Loiality points
            const loialtyPoints = await earnLoialityPoints(reservation, days, beachSettings);

            if (loialtyPoints > 0) {
                await loialityPointsToCustomer(beach_id, seat.created_by, loialtyPoints);
            }

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

            } catch (error) {

                transaction.rollback();
                throw error;

            }

            try {

                days = reservation['released_days'].concat(days);
                await db.booking.update({
                    released_days: days
                }, {
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
                    count = 0;
                    Object.keys(seat.slots).map((slotName) => {
                        count += seat.slots[slotName].length;
                    });
                    count +=seat.extra_seats;
                        break;
                    case 'baldaquin':
                        count = 1;
                        break;

                }

                const payload = {
                    status: 'released',
                    count: count,
                    beach_id: reservation.beach_id,
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

            } catch (error) {
                throw error;
            }

            try {

                const {
                    id,
                    beach_id,
                    created_for_id,
                    created_by
                } = reservation;
                const customer_id = created_for_id || created_by;

                if (customer_id) {

                    await db.beach_block_users.destroy({
                        where: {
                            booking_id: id,
                        }
                    });

                }

            } catch (error) {
                console.log(error);
            }

            // Release the whole period (if it's the case)
            if (booking_period.length === days.length) {

                try {
                    await db.booking.update({
                        status: 'completed'
                    }, {
                        where: {
                            id
                        }
                    });
                } catch (error) {
                    throw error;
                }

                return {
                    message: 'VALIDATION.BOOKING.RELEASED_BY_BROKER',
                    completed: true,
                    reservation: notificationData
                }

            }

            return {
                message: 'VALIDATION.BOOKING.UPDATE',
                completed: false,
                reservation: notificationData
            };

        } catch (error) {
            throw error;
        }

    } else {

        return {
            message: 'VALIDATION.BOOKING.UPDATE'
        };

    }

};

export const position = async ({
    id,
    change
}) => {

    // Validate reservation id
    const reservation = await checkReservation(id);

    if (!reservation) throw {
        name: 'DatabaseBookingError',
        message: 'DB.RESERVATION_NOT_FOUND'
    }

    const notificationData = {

        broker: {
            id: reservation.id,
            broker_id: reservation.broker_id,
            entity: 'reservation',
            action: 'update'
        }

    };

    const waiterNotification = {
        id: reservation.id,
        waiter_id: reservation.waiter_id || '',
        beach_id: reservation.beach_id,
        entity: 'reservation',
        action: 'update'
    };
    notificationData.waiter = waiterNotification;

    const customer_id = reservation.created_for_id || reservation.created_by;
    if (customer_id) {
        notificationData.customer = {
            id: reservation.id,
            customer_id: customer_id,
            beach_id: reservation.beach_id,
            entity: 'reservation',
            action: 'position'
        };
    }

    try {

        // Read reservation (background action)
        if (false === reservation.read) {
            readReservation(reservation.id);
        }

        let result;

        if (reservation.seat_type !== 'sunbed') {
            result = await changePosition(reservation, change);
        } else {
            result = await changeSunbeds(reservation, change);
        }

        return {
            ...result,
            reservation: notificationData
        };

    } catch (error) {

        throw error;

    }

};

export const pay = async ({
    id
}) => {

    // Validate reservation id
    const reservation = await checkReservation(id);

    if (!reservation) throw {
        name: 'DatabaseBookingError',
        message: 'DB.RESERVATION_NOT_FOUND'
    }

    const notificationData = {

        broker: {
            id: reservation.id,
            broker_id: reservation.broker_id,
            entity: 'reservation',
            action: 'update'
        }

    };

    const waiterNotification = {
        id: reservation.id,
        waiter_id: reservation.waiter_id || '',
        beach_id: reservation.beach_id,
        entity: 'reservation',
        action: 'update'
    };

    notificationData.waiter = waiterNotification;

    const customer_id = reservation.created_for_id || reservation.created_by;
    if (customer_id) {
        notificationData.customer = {
            id: reservation.id,
            customer_id: customer_id,
            beach_id: reservation.beach_id,
            entity: 'reservation',
            action: 'update'
        };
    }

    try {

        let dataToUpdate = {

            status: 'active',
            old_amount: parseFloat(reservation.amount),
            amount: 0,
            read: true

        };

        if (reservation.payment_method === 'online') {
            dataToUpdate.old_amount = parseFloat(reservation.amount) + parseFloat(reservation.old_amount);
        }

        let created_by = reservation.created_by;

        if (reservation.created_for_id && reservation.created_for_id !== created_by) {
            created_by = reservation.created_for_id;
        }

        // If paid with loialty points, substract them from customer's virtual wallet
        if (reservation.payment_method !== 'online' && reservation.virtual_cash) {

            if (created_by !== reservation.broker_id) {

                const customerWallet = await db.loiality_points.findOne({
                    where: {
                        beach_id: reservation.beach_id,
                        customer_id: created_by
                    },
                    attributes: ['points'],
                    raw: true
                });

                if (customerWallet && customerWallet.points < dataToUpdate.old_amount) throw {
                    name: 'InsufficientLoialtyPointsException',
                    message: 'VALIDATION.WALLET.INSUFFICIENT_CREDIT'
                }

                await loialityPointsFromCustomer(reservation.beach_id, created_by, dataToUpdate.old_amount);

            }

        }

        await db.booking.update(dataToUpdate, {
            where: {
                id
            }
        });

        // Allow customer to rate & review
        await db.can_rate_review.update({
            rate: true,
            review: true
        }, {
            where: {
                customer_id: created_by,
                beach_id: reservation.beach_id
            }
        });

        if (reservation.seat.type !== 'sunbed') {

            try {

                // let status = reservation.payment_method === 'offline' ? 'occupied' : 'paid';
                const status = 'occupied';

                await seatStatus({
                    beach_id: reservation['beach_id'],
                    start_date: reservation.start_date,
                    end_date: reservation['end_date'],
                    released_days: reservation['released_days'],
                    seat: reservation['seat']
                }, status);

            } catch (error) {
                throw error;
            }

        }

        /* ---------------------------------------
        | STATS                                  |
        | - background action                    |
        --------------------------------------- */
        const {
            start_date,
            end_date,
            seat
        } = reservation;

        const period = reservationPeriod({
            start_date,
            end_date
        }, false);

        let seat_type = seat.type;
        if (seat_type === 'umbrella') seat_type = 'sunbed';

        let count = 0; // number of seats that were booked

        switch (seat.type) {

            case 'sunbed':
                count = seat.count;
                break;
            case 'umbrella':
                count = 0;
                Object.keys(seat.slots).map((seat_slot) => {

                    count += seat.slots[seat_slot].length;
                });
                count = count + seat.extra_seats;
                break;
            case 'baldaquin':
                count = 1;
                break;

        }

        const payload = {
            status: 'occupied',
            count: count,
            beach_id: reservation.beach_id,
            seat_type: seat_type,
            dates: period
        };

        // Track seats (add occupied)
        let action = payload.dates.length > 1 ? 'addBulk' : 'add';
        db.stats_seat[action](payload);

        // Track seats (remove booked)
        payload.status = 'booked';

        action = payload.dates.length > 1 ? 'removeBulk' : 'remove';
        db.stats_seat[action](payload);

        return {
            message: 'VALIDATION.BOOKING.CONFIRM',
            reservation: notificationData
        };

    } catch (error) {
        throw error;
    }

};

export const phoneLookup = async ({
    phone
}) => {

    // Check phone param
    if (!Number.isInteger(Number(phone))) throw {
        name: 'InvalidArgumentException',
        message: 'VALIDATION.BOOKING.PHONE_PARAM'
    };

    const customer = await checkPhone(phone);

    if (customer) return {
        customer
    };

    return {
        customer: null
    };

};

export const search = async ({
    phone,
    beach_id
}, res) => {

    try {

        const results = await searchReservations(phone, beach_id, res);
        return results;

    } catch (error) {
        throw error;
    }

};

export const read = async ({
    id
}) => {

    // Validate reservation id
    const reservation = await checkReservation(id);

    if (!reservation) throw {
        name: 'DatabaseBookingError',
        message: 'DB.RESERVATION_NOT_FOUND'
    }

    try {

        await db.booking.update({
            read: true
        }, {
            where: {
                id
            }
        });

    } catch (error) {}

};

export const accept = async ({
    id
}) => {

    // Validate reservation id
    const reservation = await checkReservation(id);

    console.log('reservation', reservation);

    if (!reservation) throw {
        name: 'DatabaseBookingError',
        message: 'DB.RESERVATION_NOT_FOUND'
    }
    try {
        const {
            id,
            beach_id,
            created_for_id,
            created_by
        } = reservation;
        const customer_id = created_for_id || created_by;
        let notificationData = {};
        if (customer_id) {

            let dataToUpdate = {

                status: 'booked',
                read: true

            };

            await db.booking.update(dataToUpdate, {
                where: {
                    id
                }
            });

            notificationData.customer = {
                id: reservation.id,
                customer_id: customer_id,
                entity: 'reservation',
                action: 'accepted'
            }
            //await db.beach_block_users.create({booking_id: id, beach_id, blocked: false});
        }
        await seatStatus(reservation, 'booked');
        return {
            message: 'VALIDATION.BOOKING.ACCEPT',
            reservation: notificationData
        };

    } catch (error) {}
};