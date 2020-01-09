import { Component, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { CommonProvider } from '../../../providers/common/common';
import { AppService } from '../../../services/app.service';
import { BeachService } from '../../../services/beach.service';
import moment from 'moment';
import { status_color } from '../../../services/app-settings';

/**
 * Generated class for the UmbrellaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-umbrella',
    templateUrl: 'umbrella.html',
})
export class UmbrellaPage {

    panActiveStats: ['normal', 'left', 'right'];
    seat: any;
    activeAction: string = ``;
    activeState: boolean = false;
    addModalState: boolean = false;
    filterClassAry: Array<string> = [`filter-red`, `filter-brown`, `filter-blue`, ``];
    reservation: any = {
        left: false,
        right: false,
    }
    noteModal: any;
    currency: string = null;

    single_content = false;
    color_left: string = '';
    color_right: string = '';
    singleSeatName = '';
    constructor(public navCtrl: NavController, public navParams: NavParams, public common: CommonProvider, private modalCtrl: ModalController,
        private appService: AppService, private beachService: BeachService, private events: Events
    ) {

        this.seat = navParams.get('seat');
        this.setActive('normal');
        this.splitReservations();
        this.color_left = navParams.get('left-color');
        
        this.color_right = navParams.get('right-color');

        this.appService.getBeach()
            .then(beach => {
                this.currency = beach.settings.currency;
            })
        this.handleOrderNotify();
    }

    handleOrderNotify() {
        this.appService.orderNotify = new EventEmitter<any>();
        this.appService.orderNotify.subscribe(notify => {
            
            try {
                if (notify.created) {
                    if (this.reservation.left && notify.data.reservation_id == this.reservation.left.id) {
                        this.reservation.left.orders = this.reservation.left.orders || [];
                        this.reservation.left.orders.push(notify.data);
                        if (notify.data.status === 'sent') {
                            this.color_left = 'orange';
                        }
                    } else if (this.reservation.right && notify.data.reservation_id == this.reservation.right.id) {
                        this.reservation.right.orders = this.reservation.left.orders || [];
                        this.reservation.right.orders.push(notify.data);
                        if (notify.data.status === 'sent') {
                            
                            this.color_right = 'orange';
                        }
                    }
                } else if (notify.updated) {
                    try {
                        let reservation: any = false;
                        if (this.reservation.left && notify.data.reservation_id == this.reservation.left.id) {
                            reservation = this.reservation.left;
                            this.color_left = 'black';
                        } else if (this.reservation.right && notify.data.reservation_id == this.reservation.right.id) {
                            reservation = this.reservation.right;
                            this.color_right = 'black';
                        }
                        if (reservation) {
                            reservation.orders = reservation.orders || [];
                            for (let i = 0; i < reservation.orders.length; i++) {
                                if (reservation.orders[i].id == notify.data.id) {
                                    reservation.orders[i].items = notify.data.items;
                                    reservation.orders[i].status = 'confirmed';
                                    break;
                                }
                            }
                        }
                    } catch (error) {
                        
                    }
                } else if (notify.deleted) {
                    try {
                        let reservation: any = false;
                        if (this.reservation.left && notify.data.reservation_id == this.reservation.left.id) {
                            reservation = this.reservation.left;
                        } else if (this.reservation.right && notify.data.reservation_id == this.reservation.right.id) {
                            reservation = this.reservation.right;
                        }
                        if (reservation) {
                            reservation.orders = reservation.orders || [];
                            for (let i = 0; i < reservation.orders.length; i++) {
                                if (reservation.orders[i].id == notify.data.id) {
                                    reservation.orders.splice(i, 1);
                                    break;
                                }
                            }
                        }
                    } catch (error) {
                        
                    }
                }
            } catch (error) {
                
            }
        })
    }
    ionViewWillEnter() {
        this.events.subscribe('app:notification', (data) => this.onNewNotification(data));
    }
    onNewNotification(data) {
        console.log('umbrella seats notification');
        this.beachService.getNotificationData(data)
            .then(result => {
                if (!result) return;
                const account = this.appService.getAccount();
                if (result.entity === 'order' && result.data && account.id === result.waiter_id && result.action === 'create') {
                    this.appService.addNotification(result.data.id);

                    var reservation: any = false;
                    if (this.seat.reservations) {
                        this.seat.reservations.forEach((item, index) => {
                            if (result.data.reservation_id == item.id) {
                                reservation = this.seat.reservations[index];
                            }
                        });
                    }
                    if (reservation) {
                        reservation.orders = reservation.orders || [];
                        result.data.updated = moment(new Date(result.data.updated_at)).format('HH:mm');
                        reservation.orders = [result.data].concat(reservation.orders);
                        if (result.data.status === 'sent') {
                            if (reservation.id == this.reservation.left.id) {
                                this.color_left = 'orange';
                            } else if(reservation.id == this.reservation.right.id){
                                
                                this.color_right = 'orange';
                            }
                        }
                    }
                } else if (result.entity === 'reservation' && result.waiter_id === account.id) {
                    if (result.action === 'create') {
                        this.seat.reservations = this.seat.reservations || [];
                        this.seat.reservations.push(result.data);
                        this.splitReservations();
                    } else if (result.action === 'complete' || result.action === 'cancel') {
                        let index = -1;
                        for (var i = 0; i < this.seat.reservations.length; i++) {
                            if (result.data.id === this.seat.reservations[i].id) {
                                index = i; break;
                            }
                        }
                        if (index > -1) {
                            this.seat.reservations.splice(index, 1);
                        }
                        this.splitReservations();
                    }
                }
            })
            .catch(error => {
                
            });
    }
    ionViewWillUnload() {
        this.appService.orderNotify.unsubscribe();
        this.events.unsubscribe('app:notification');
    }
    splitReservations() {
        
        this.reservation.left = false;
        this.reservation.right = false;
        const old_left = this.color_left;
        const old_right = this.color_right;
        this.color_left = status_color.available;
        this.color_right = status_color.available;

        let seatConfigs = {
            left: ['a', 'm', 'n', 'o', 'x', 'y', 'z'],
            right: ['b', 'm', 'n', 'o', 'x', 'y', 'z']
        };
        if (this.seat.reservations) {
            this.seat.reservations.forEach(item => {
                let seat = item.seat;
                Object.keys(seat.slots).map((slotname) => {
                    let booked = false;
                    seat.slots[slotname].map((slotStatus) => {
                        if (slotStatus) {
                            booked = true;
                        }
                    });
                    if (booked) {
                        if (seatConfigs.left.indexOf(slotname) > -1) {
                            this.reservation.left = item;
                            this.color_left = (old_left !== status_color.available) ? old_left : status_color[item.status];
                        }
                        if (seatConfigs.right.indexOf(slotname) > -1) {
                            
                            this.reservation.right = item;
                            
                            this.color_right = (old_right !== status_color.available) ? old_right : status_color[item.status];

                        }
                    }
                });
                /*if (item.seat_number_sides.indexOf('A') > -1) {
                    this.reservation.left = item;
                    this.color_left = (old_left !== status_color.available) ? old_left : status_color[item.status];
                }
                if (item.seat_number_sides.indexOf('B') > -1) {
                    this.reservation.right = item;
                    this.color_right = (old_right !== status_color.available) ? old_right : status_color[item.status];
                }*/
            });
        }

        if (this.reservation.left && this.reservation.right) {
            if (this.reservation.left.id == this.reservation.right.id) {
                this.single_content = true;
            }
        } else if (this.seat.statusList.length == 1) {
            this.single_content = true;
        } else {
            this.single_content = false;
        }
        if (this.single_content) {
            this.singleSeatName = this.seat.statusList.join("").toUpperCase();
        }
    }
    //-------------UI Utiles and Functions-------------------------------

    onClickOrderList(state: string) {
        this.setActive(state);
    }

    onClickNew(reservation) {
        this.noteModal = this.modalCtrl.create(`NoteAddPage`, { currency: this.currency, reservation_id: reservation.id, title: reservation.seat_number_sides });
        this.noteModal.present();
    }
    onClickOrder(order) {
        if (order.status == 'sent') {
            this.noteModal = this.modalCtrl.create(`NoteAddPage`, { order, currency: this.currency, title: order.reservation.seat_number_sides });
        } else {
            this.noteModal = this.modalCtrl.create(`NotePage`, { order, currency: this.currency, title: order.reservation.seat_number_sides });
        }
        this.noteModal.present();
    }

    setActive(state: string) {
        if (this.single_content) {
            this.activeState = !this.activeState;
            return;
        }
        if (state != `normal`) {
            this.activeState = !this.activeState;
        }
        if (this.activeState) {
            this.activeAction = `${state}-active`;
        } else {
            this.activeAction = `normal-active`;
        }
    }
    //-------------------------------------------------

    panSwipe(event) {
        if (event.direction === 2)
            this.activeAction = `right-active`;
        if (event.direction === 4)
            this.activeAction = `left-active`;
    }
}
