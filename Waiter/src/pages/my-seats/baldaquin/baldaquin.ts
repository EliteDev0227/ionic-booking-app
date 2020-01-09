import { Component, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { CommonProvider } from '../../../providers/common/common';
import { AppService } from '../../../services/app.service';
import { BeachService } from '../../../services/beach.service';
import moment from 'moment';

/**
 * Generated class for the BaldaquinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-baldaquin',
    templateUrl: 'baldaquin.html',
})
export class BaldaquinPage {
    panActiveStats: ['normal', 'left', 'right'];
    activeState: boolean = false;
    addModalState: boolean = false;
    filterClassAry: Array<string> = [`filter-red`, `filter-brown`, `filter-blue`, ``];
    seat: any = false;
    noteModal: any;
    currency: string = null;

    constructor(public navCtrl: NavController, public navParams: NavParams, public common: CommonProvider, private modalCtrl: ModalController,
        private appService: AppService, private beachService: BeachService, private events: Events
    ) {
        this.seat = navParams.get('seat');
        this.appService.getBeach()
            .then(beach => {
                this.currency = beach.settings.currency;
                this.toggleActiveState();
            })
        this.handleOrderNotify();
    }
    
    handleOrderNotify(){
        this.appService.orderNotify = new EventEmitter<any>();
        this.appService.orderNotify.subscribe(notify => {
            try{
                var reservation = this.seat.reservations? this.seat.reservations[0]: false;
                if (notify.created) {
                    if (reservation &&  notify.data.reservation_id == reservation.id) {
                        reservation.orders.push(notify.data);
                    }
                } else if (notify.updated) {
                    if (reservation){
                        for (let i=0;i<reservation.orders.length; i++){
                            if (reservation.orders[i].id == notify.data.id) {
                                reservation.orders[i].items = notify.data.items;
                                reservation.orders[i].status = 'confirmed';
                                break;
                            }
                        }
                    }
                } else if (notify.deleted) {
                    if (reservation){
                        for (let i=0;i<reservation.orders.length; i++){
                            if (reservation.orders[i].id == notify.data.id) {
                                reservation.orders.splice(i, 1);
                                break;
                            }
                        }
                    }
                }
            }catch(error) {
            }
        })
    }
    ionViewWillEnter(){
        this.events.subscribe('app:notification', (data) => this.onNewNotification(data))
    }
    onNewNotification(data){
        this.beachService.getNotificationData(data)
            .then(result => {
                if (!result) return;
                const account = this.appService.getAccount();
                if (result.entity === 'order' && result.data && account.id === result.waiter_id && result.action === 'create') {
                    this.appService.addNotification(result.data.id);
                    var reservation = this.seat.reservations? this.seat.reservations[0]: false;
                    if (reservation.id === result.data.reservation_id){
                        reservation.orders = reservation.orders || [];
                        result.data.updated = moment(new Date(result.data.updated_at)).format('HH:mm');
                        reservation.orders = [result.data].concat(reservation.orders);
                    }
                } else if (result.entity === 'reservation' && result.waiter_id === account.id){
                    if (result.action === 'create') {
                        this.seat.reservations = this.seat.reservations || [];
                        this.seat.reservations.push(result.data);
                    } else if (result.action === 'complete' || result.action === 'cancel') {
                        let index = -1;
                        for (var i=0;i<this.seat.reservations.length; i++) {
                            if (result.data.id === this.seat.reservations[i].id) {
                                index = i; break;
                            }
                        }
                        if (index > -1) {
                            this.seat.reservations.splice(index, 1);
                        }
                    }
                }
            })
            .catch(error => {
            });
    }
    ionViewWillUnload(){
        this.appService.orderNotify.unsubscribe();
        this.events.unsubscribe('app:notification');
    }
    //-------------UI Utiles and Functions-------------------------------

    onClickOrderList() {
        this.toggleActiveState();
    }

    onClickNew(reservation){
        this.noteModal = this.modalCtrl.create(`NoteAddPage`, { currency: this.currency, reservation_id: reservation.id, title: reservation.seat_number_sides });
        this.noteModal.present();
    }
    onClickOrder (order) {
        if (order.status == 'sent') {
            this.noteModal = this.modalCtrl.create(`NoteAddPage`, { order, currency: this.currency, title:  order.reservation.seat_number_sides });
        } else {
            this.noteModal = this.modalCtrl.create(`NotePage`, { order, currency: this.currency, title: order.reservation.seat_number_sides });
        }
        this.noteModal.present();
    }    

    toggleActiveState() {
        this.activeState = !this.activeState;
    }
}
