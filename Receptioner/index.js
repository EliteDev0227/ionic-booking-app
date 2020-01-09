import * as booking from './factory';
import {
    sendNotification
} from '../../../../stream';
import db from './../../../../../models';

const bookingController = {};

bookingController.default = function (req, res, next) {
    res.sendStatus(404);
};

bookingController.get = async function (req, res, next) {

    try {

        let reservations = await booking.get(req, res);

        res.status(200).send(reservations);

    } catch (error) {
        const status = 'error';
        const code = 400;
        const message = res.__(error.message);

        res.status(code).json({
            status,
            code,
            message
        });

    }

};

bookingController.photo = async function (req, res, next) {

    try {

        const photourl = await booking.photo(req.params);

        if (photourl) {
            res.status(200).json({
                url: photourl
            });
        } else throw {
            message: 'VALIDATION.BOOKING.NO_IMAGE'
        }

    } catch (error) {

        const status = 'error';
        const code = 404;
        const message = res.__(error.message);

        res.status(code).json({
            status,
            code,
            message
        });

    }

};

bookingController.view = async function (req, res, next) {

    try {

        const reservation = await booking.view(req.params);
        res.status(200).json(reservation);

    } catch (error) {

        let status = 'error';
        let code = 400;
        let message = res.__(error.message);

        res.status(code).json({
            status,
            code,
            message
        });

    }

};

bookingController.search = async function (req, res, next) {

    try {

        const results = await booking.search(req.query, res);
        res.status(200).send(results);

    } catch (error) {

        const status = 'error';
        const code = 400;
        const message = res.__(error.message);

        res.status(code).json({
            status,
            code,
            message
        });

    }

};

bookingController.create = async function (req, res, next) {
    console.log(">>> BOOKING PROCESS:: form index js");
    try {
        let data = req.body;
        if (data.startDate) {
            data.start_date = new Date(data.startDate).getTime();
        }
        if (data.endDate) {
            data.end_date = new Date(data.endDate).getTime();
        }
        console.log(">>> BOOKING PROCESS:: call from index js");
        const booked = await booking.create(data);

        /* res.nrp.emit('notification', booked.reservation.broker);
        sendNotification(booked.reservation.broker);

        if ( booked.reservation.waiter ) {
            res.nrp.emit('notification', booked.reservation.waiter);
            sendNotification(booked.reservation.waiter);
        }
        if ( booked.reservation.customer ) {
            res.nrp.emit('notification', booked.reservation.customer);
            sendNotification(booked.reservation.customer);
        } */

        // Add Reservation to grid...
        const gridList = await db.calendar.findAll({
            where: {
                beach_id: req.body.beach_id,
                created_at: req.body.start_date
            },
            attributes: ['grid'],
            raw: true
        });
        // let transaction = await db.sequelize.transaction();

        res.status(200).json({
            message: req.__(booked.message),
            gridList: gridList,
            reservation_id: booked.reservation.broker.id
        });

    } catch (error) {
        
        console.log(error);

        const status = 'error';
        const code = 400;
        const message = res.__(error.message);
        const available_seats = error.available_seats;

        res.status(code).json({
            status,
            code,
            message,
            available_seats
        });

    }

};

bookingController.update = async function (req, res, next) {

    try {

        const updated = await booking.update(req.body);

        /* res.nrp.emit('notification', updated.reservation.broker);
        sendNotification(updated.reservation.broker);

        if ( updated.reservation.waiter ) {
            res.nrp.emit('notification', updated.reservation.waiter);
            sendNotification(updated.reservation.waiter);
        }
        if ( updated.reservation.customer ) {
            res.nrp.emit('notification', updated.reservation.customer);
            sendNotification(updated.reservation.customer);
        } */

        res.status(200).json({
            message: req.__(updated.message)
        });

    } catch (error) {

        const status = 'error';
        const code = 400;
        const message = res.__(error.message);

        res.status(code).json({
            status,
            code,
            message
        });

    }

};

bookingController.customer = async function (req, res, next) {

    try {

        const updated = await booking.customer(req.body);

        /* res.nrp.emit('notification', updated.reservation.broker);
        sendNotification(updated.reservation.broker);
        if ( updated.reservation.waiter ) {
            res.nrp.emit('notification', updated.reservation.waiter);
            sendNotification(updated.reservation.waiter);
        }
        if ( updated.reservation.customer ) {
            res.nrp.emit('notification', updated.reservation.customer);
            sendNotification(updated.reservation.customer);
        }
        */

        res.status(200).json({
            message: req.__(updated.message)
        });

    } catch (error) {

        const status = 'error';
        const code = 400;
        const message = res.__(error.message);

        res.status(code).json({
            status,
            code,
            message
        });

    }

};

bookingController.cancel = async function (req, res, next) {

    try {

        const canceled = await booking.cancel(req.body);

        /* res.nrp.emit('notification', canceled.reservation.broker);
        sendNotification(canceled.reservation.broker);

        if ( canceled.reservation.waiter ) {
            res.nrp.emit('notification', canceled.reservation.waiter);
            sendNotification(canceled.reservation.waiter);
        }

        if ( canceled.reservation.customer ) {
            res.nrp.emit('notification', canceled.reservation.customer);
            sendNotification(canceled.reservation.customer);
        } */

        res.status(200).json({
            message: req.__(canceled.message)
        });

    } catch (error) {

        const status = 'error';
        const code = 400;
        let message = res.__(error.message);

        res.status(code).json({
            status,
            code,
            message
        });

    }

};

bookingController.release = async function (req, res, next) {

    try {

        const released = await booking.release(req.body);

        /* res.nrp.emit('notification', released.reservation.broker);
        sendNotification(released.reservation.broker);

        if ( released.reservation.waiter ) {
            res.nrp.emit('notification', released.reservation.waiter);
            sendNotification(released.reservation.waiter);
        }

        if ( released.reservation.customer ) {
            res.nrp.emit('notification', released.reservation.customer);
            sendNotification(released.reservation.customer);
        }
        */

        res.status(200).json({
            message: req.__(released.message),
            completed: released.completed
        });

    } catch (error) {
        console.log(error);
        const status = 'error';
        const code = 400;
        const message = res.__(error.message);

        res.status(code).json({
            status,
            code,
            message
        });

    }

};

bookingController.accept = async function (req, res, next) {
    try {

        const accepted = await booking.accept(req.body);

        //Notification is disabled..
        if (false && accepted.reservation.customer) {
            res.nrp.emit('notification', accepted.reservation.customer);
            sendNotification(accepted.reservation.customer);
        }

        res.status(200).json({
            message: req.__(accepted.message)
        });

    } catch (error) {

        const status = 'error';
        const code = 400;
        const message = res.__(error.message);

        res.status(code).json({
            status,
            code,
            message
        });

    }

}

bookingController.position = async function (req, res, next) {

    try {

        const confirmed = await booking.position(req.body);

        /* res.nrp.emit('notification', confirmed.reservation.broker);
        sendNotification(confirmed.reservation.broker);

        if ( confirmed.reservation.waiter ) {
            res.nrp.emit('notification', confirmed.reservation.waiter);
            sendNotification(confirmed.reservation.waiter);
        }
        if ( confirmed.reservation.customer ) {
            res.nrp.emit('notification', confirmed.reservation.customer);
            sendNotification(confirmed.reservation.customer);
        } */

        res.status(200).json({
            message: req.__(confirmed.message)
        });

    } catch (error) {

        const status = 'error';
        const code = 400;
        const message = res.__(error.message);

        res.status(code).json({
            status,
            code,
            message
        });

    }

};

bookingController.pay = async function (req, res, next) {

    try {

        const paid = await booking.pay(req.body);

        /* res.nrp.emit('notification', paid.reservation.broker);
         sendNotification(paid.reservation.broker);

         if ( paid.reservation.waiter ) {
             res.nrp.emit('notification', paid.reservation.waiter);
             sendNotification(paid.reservation.waiter);
         }

         if ( paid.reservation.customer ) {
             res.nrp.emit('notification', paid.reservation.customer);
             sendNotification(paid.reservation.customer);
         } */

        res.status(200).json({
            message: req.__(paid.message)
        });

    } catch (error) {
        const status = 'error';
        const code = 400;
        const message = res.__(error.message);

        res.status(code).json({
            status,
            code,
            message
        });

    }

};

bookingController.read = async function (req, res, next) {

    try {

        await booking.read(req.body);
        res.status(200).json({
            status: 'OK',
            code: 200
        });

    } catch (error) {

        const status = 'error';
        const code = 400;
        const message = res.__(error.message);

        res.status(code).json({
            status,
            code,
            message
        });

    }

};

bookingController.phone = async function (req, res, next) {

    try {

        const data = await booking.phoneLookup(req.params);
        res.status(200).send(data);

    } catch (error) {

        const status = 'error';
        const code = 400;
        const message = res.__(error.message);

        res.status(code).json({
            status,
            code,
            message
        });

    }

};

bookingController.get_sunbeds = async function (req, res, next) {

    try {

        const reservation = await booking.get_sunbeds(req.params);
        res.status(200).json(reservation);

    } catch (error) {

        let status = 'error';
        let code = 400;
        let message = res.__(error.message);

        res.status(code).json({
            status,
            code,
            message
        });

    }

};


export default bookingController;