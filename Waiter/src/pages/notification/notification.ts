import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, Platform, Events } from 'ionic-angular';
import { BeachService } from '../../services/beach.service';
import { AppService } from '../../services/app.service';
import moment from 'moment';
import { Beach } from '../../models/beach';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-notification',
    templateUrl: 'notification.html',
})
export class NotificationPage {
    orders: Array<any> = [];
    noteModal: any;
    currency: string = "";
    loaded = false;
    calls = [];
    constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private beachService: BeachService,
        private platform: Platform, private appService: AppService, public loadingCtrl: LoadingController, private events: Events
    ) {
        this.platform.ready().then(() => {
            this.appService.getBeach()
                .then((beach: Beach) => {
                    this.getCalls();
                    this.currency = beach.settings.currency;
                });
        })
    }
    private loading: any = false;
    private processing = false;
    loadInitData() {
        if (this.processing) return;
        this.processing = true;
        const now = moment(new Date());
        console.log('loadinitdata 1');
        if (!this.loaded) {
            this.loading = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            this.loading.present();
        }
        console.log('loadinitdata 2');
        this.getCalls();
        console.log('loadinitdata 3');
        this.beachService.getOrders()
            .then(orders => {
                console.log('orders', orders);
                orders = orders.map(item => {
                    const ordered = moment(new Date(item.updated_at));
                    const before = now.diff(ordered, 'minutes');
                    if (before > 60) {
                        item.before = `${Math.floor(before / 60)}h ${(before % 60) == 0 ? '' : (before % 60) + 'mins'}`;
                    } else if (before > 0) {
                        item.before = `${before}mins`;
                    } else {
                        item.before = 'Now';
                    }
                    return item;
                })
                this.orders = orders;
                if (this.loading) {
                    this.loading.dismiss();
                }
                this.loaded = true
                this.processing = false;
            })
            .catch(error => {
                if (this.loading) {
                    this.loading.dismiss();
                }
                this.appService.errorHandler(error);
                this.processing = false;
            })
    }
    async getCalls(){
        try{
            const now = moment(new Date());
            const waiter_id = this.appService.getAccount().id;
            const beach_id = this.appService.getAccount().beach_id;
            let calls:Array<any> = await this.appService.get(`order/getCall/${beach_id}/${waiter_id}`);
            console.log('calls', calls);
            calls = calls.map(item => {
                const called = moment(new Date(item.reservation.updated_at));
                const before = now.diff(called, 'minutes');
                if (before > 60) {
                    item.before = `${Math.floor(before / 60)}h ${(before % 60) == 0 ? '' : (before % 60) + 'mins'}`;
                } else if (before > 0) {
                    item.before = `${before}mins`;
                } else {
                    item.before = 'Now';
                }
                return item;
            })
            this.calls = calls;
        }catch(error){
            throw error;
        }
    }
    ionViewDidEnter() {
        this.events.subscribe('app:notification', (data) => this.onNewNotification(data))
        this.events.subscribe('app:reload', () => {
            this.loadInitData();
        });
        this.events.publish('app:reload');
    }
    onNewNotification(data) {
        console.log('new notificaiton');
        this.beachService.getNotificationData(data)
            .then(result => {
                console.log('notification data', result);
                if (result && result.entity === 'order' && result.waiter_id == this.appService.getAccount().id && result.action === 'create') {
                    let order = result.data;
                    order.before = 'Now';
                    this.orders = [order].concat(this.orders);
                }
                console.log('calling api');
                this.loaded = false;
                this.loadInitData();
            })
            .catch(error => {
            });
    }
    ionViewWillLeave() {
        this.events.unsubscribe('app:notification');
        this.events.unsubscribe('app:reload');
    }

    onClickItem(order) {
        if (order.status == 'sent') {
            this.noteModal = this.modalCtrl.create(`NoteAddPage`, { order, currency: this.currency, title: order.reservation.seat_number_sides });
            this.noteModal.onDidDismiss(() => {
                this.loadInitData();
            });
        } else {
            this.noteModal = this.modalCtrl.create(`NotePage`, { order, currency: this.currency, title: order.reservation.seat_number_sides });
        }
        this.noteModal.present();
    }
    onDelete(index) {
        if (this.processing) return;
        this.processing = true;
        const order_id = this.orders[index].id;
        this.beachService.deleteOrder(order_id)
            .then(() => {
                this.orders.splice(index, 1);
                this.appService.orderNotify.emit({
                    deleted: true,
                    data: {
                        id: order_id,
                    }
                });
                this.processing = false;
            })
            .catch(error => {
                this.processing = false;
                this.appService.errorHandler(error);
            })
    }
}
