import { Injectable } from '@angular/core';

// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
import { AppService } from './app.service';
import { Notification} from '../models/notification';
import { NativeAudio } from '@ionic-native/native-audio';
import { Vibration } from '@ionic-native/vibration';

@Injectable()
export class BeachService {
    
    constructor(
        private appService: AppService,
        private nativeAudio: NativeAudio,
        private vibration: Vibration,
    ) {
        this.nativeAudio.preloadSimple('notification', 'assets/notification.mp3').then(() => {
        }).catch(error => {
        });
    }

    getBeachList(): Promise<any> {
        return this.appService.get('')
        .then(data => {
            return data.beachs;
        })
        .catch(error => {
            throw error;
        })
    }

    getAllSeats(): Promise<any> {
        const beach_id = this.appService.getAccount().beach_id;
        return this.appService.get(`seats/${beach_id}`)
    }

    select(seats: Array<string>, bookings: Array<string>) {
        const account = this.appService.getAccount();
        const beach_id = this.appService.getAccount().beach_id;
        const waiter = {id: account.id, color: account.color};
        return this.appService.post('select', {seats, bookings, beach_id, waiter});
    }

    getReservations() {
        return this.appService.get('reservation');
    }
    async getOrders() {
        try{
            const beach_id = this.appService.getAccount().beach_id;
            let orders:Array<any> = await this.appService.get(`order/all/${beach_id}`);
            orders = orders.sort((a, b) => {
                if (a.status<b.status) return 1;
                if (a.status>b.status) return -1;
                if (new Date(a.updated_at)<new Date(b.updated_at)) return 1;
                if (new Date(a.updated_at)>new Date(b.updated_at)) return -1;
                return 0;
            })
            return orders;
        }catch(error){
            throw error;
        }
    }
    createOrder(order) {
        const beach_id = this.appService.getAccount().beach_id;
        order.beach_id = beach_id;
        return this.appService.post('order', order);
    }
    confirmOrder(order_id, items) {
        return this.appService.post('order/confirm', {order_id, items});
    }
    getOrder(order_id) {
        return this.appService.get(`order/${order_id}`);
    }
    deleteOrder(order_id) {
        return this.appService.delete(`order/${order_id}`);
    }
    getReservation(reservation_id) {
        return this.appService.get(`reservation/${reservation_id}`);
    }
    getProductions() {
        const beach_id = this.appService.getAccount().beach_id;
        return this.appService.get(`products/${beach_id}`);
    }

    receivedNotification(){
        this.nativeAudio.play('notification').then((value) => {
        }).catch(error => {
        });
        this.vibration.vibrate(1000);
    }

    async getNotificationData(notification: Notification) {
        if (!notification) return null;
        const beach = await this.appService.getBeach();
        try {
            let result: any = {entity: notification.entity, action: notification.action, waiter_id: notification.waiter_id};
            if (notification.entity === 'order') {
                this.receivedNotification();
                const order = await this.getOrder(notification.id);
                result.data = order;
                if (!order.reservation || order.reservation.beach_id !== beach.id) return null;
                return result;
            } else if (notification.entity === 'reservation') {
                const reservation = await this.getReservation(notification.id);
                if (reservation.beach_id !== beach.id) return null;
                result.data = reservation;
            } else if (beach.id === notification.id && this.appService.getAccount().id !== notification.waiter_id){
                return {...notification, data: null};
            } else {
                return null;
            }
            return result;
        } catch (error) {
            throw error;
        }
    }
}