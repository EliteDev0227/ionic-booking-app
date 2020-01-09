import { Component, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { CommonProvider } from '../../../providers/common/common';
import { AppService } from '../../../services/app.service';
import { BeachService } from '../../../services/beach.service';
import moment from 'moment';

/**
 * Generated class for the SunbedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sunbed',
  templateUrl: 'sunbed.html',
})
export class SunbedPage {
    panActiveStats : ['normal','left','right'];
    activeState : boolean = false;
    addModalState : boolean = false;
    filterClassAry : Array<string> = [`filter-red`,`filter-brown`,`filter-blue`,``];
    seat: any = false;
    noteModal : any;
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
                if (notify.created) {
                    this.seat.orders = this.seat.orders || [];
                    this.seat.orders = [notify.data].concat(this.seat.orders);
                } else if (notify.updated) {
                    for (let i=0;i<this.seat.orders.length; i++){
                        if (this.seat.orders[i].id == notify.data.id) {
                            this.seat.orders[i].items = notify.data.items;
                            this.seat.orders[i].status = 'confirmed';
                            break;
                        }
                    }
                } else if (notify.deleted) {
                    for (let i=0;i<this.seat.orders.length; i++){
                        if (this.seat.orders[i].id == notify.data.id) {
                            this.seat.orders.splice(i, 1);
                            break;
                        }
                    }
                }
            }catch(error) {
            }
        })
    }
    ionViewWillEnter(){
        this.events.subscribe('app:notification', (data) => this.onNewNotification(data));
    }
    onNewNotification(data){
        this.beachService.getNotificationData(data)
            .then(result => {
                if (!result) return;
                const account = this.appService.getAccount();
                if (result.entity === 'order' && result.data && account.id === result.waiter_id && result.action === 'create') {
                    this.appService.addNotification(result.data.id);
                    if (this.seat.id === result.data.reservation_id){
                        this.seat.orders = this.seat.orders || [];
                        result.data.updated = moment(new Date(result.data.updated_at)).format('HH:mm');
                        this.seat.orders = [result.data].concat(this.seat.orders);
                    }
                } else if (result.entity === 'reservation' && result.data.id === this.seat.id){
                    if (result.action === 'complete' || result.action === 'cancel') {
                        this.navCtrl.pop();
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

    onClickOrderList () {
        this.toggleActiveState();
    }

    onClickNew(){
        this.noteModal = this.modalCtrl.create(`NoteAddPage`, { currency: this.currency, reservation_id: this.seat.id, title: `sunbed #${this.seat.seat_number_sides}` });
        this.noteModal.present();
    }
    onClickOrder (order) {
        if (order.status == 'sent') {
            this.noteModal = this.modalCtrl.create(`NoteAddPage`, { order, currency: this.currency, title: this.seat.seat_number_sides });
        } else {
            this.noteModal = this.modalCtrl.create(`NotePage`, { order, currency: this.currency, title: this.seat.seat_number_sides });
        }
        this.noteModal.present();
    }    

    toggleActiveState () {
        this.activeState = !this.activeState;
    }
}
