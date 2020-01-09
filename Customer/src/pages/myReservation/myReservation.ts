import { Component, NgZone, ViewChild } from "@angular/core";
import { ApiProvider } from "../providers/services";
import { CustomBootstrap } from "../../app/BootstrapFirstRun";
import { ReleasePage } from "../includes/release/release";
import {ModalController, NavController, Events, Platform, PopoverController, Tabs } from "ionic-angular";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { beachBook } from "../beachBook/beachBook";
import { beachBookSunbed } from "../beachBookSunbed/beachBookSunbed";
import { beachBookBaldaquin } from "../beachBookBaldaquin/beachBookBaldaquin";
import { PopoverWeather } from "../includes/popover/weatherPopover/popover.weather";
import { ratingPage } from "../rating/rating";
import { Subscription } from 'rxjs/Subscription';
import { Notification } from "../providers/interface";
import { distinct } from 'rxjs/operators';
import { AdsPopoverPage } from "./ads-popover/ads-popover";


/**
 * Created by shadow-viper on 12/19/17.
 */

@Component({
    selector: 'myReservation',
    templateUrl: 'myReservation.html'
})

export class myReservation {
    public viewChangeDisabled: boolean = true;
    public customer: any = {};
    public reservation: any = {};
    public requestPage: string = 'MyReservation';
    public reserveIndex: any = [];
    private poolState: boolean = false;
    private tooltip: boolean = false;
    FormData: any;
    currency:any;
    beach_settings:any=[];

    @ViewChild('myTabs') tabRef: Tabs;

    rand: number;
    private removePooling: boolean = false;
    private sub$1: any;
    private sub$2: any;

    constructor(public platform: Platform, public api: ApiProvider, public popoverCtrl: PopoverController,
        public configuration: CustomBootstrap, public navCtrl: NavController, public events: Events, private ngZone: NgZone,public modalCtrl: ModalController) {

        this.FormData = new FormGroup({
            phone: new FormControl('', [Validators.minLength(6), Validators.required])
        });

        this.platform.ready().then(() => {
            
            this.sub$1 = this.platform.pause.subscribe(() => {

                if (this.navCtrl.getActive().name == 'myReservation') {
                    // alert("Reservation pause");
                    this.poolState = false;
                    //this.poollingList(false);

                }

            }, error => { });
            
            this.configuration.getStorage('reservation').then((res) => {
                if (res) {
                    let ss = this.beach_settings.find(item => {
                        return item.beach_id == res.beach_id;
                    });
                    this.currency = ss.currency;
                    
                }
            })

            this.sub$2 = this.platform.resume.subscribe(() => {

                //this.getData();
                if (this.navCtrl.getActive().name == 'myReservation') {
                    // alert("Reservation resume");
                    setTimeout(() => {

                        this.poolState = true;
                        //this.myReservation();

                    }, 500);
                }

            }, error => { });
        }, error => { });

        this.beach_settings =JSON.parse( localStorage.getItem('beachsettings') || '[]');

    }

    onNewNotification(data: Notification) {
        this.ngZone.run(() => {
            if (data && data.entity === 'reservation') {
                this.getData();
            }
        })
    }

    ionViewWillEnter() {

        let self = this;
        this.removePooling = false;

        this.configuration.getStorage('login').then((a) => {
            if (a && a.token && !self.removePooling) {
                // alert("myreservation");
                this.customer = a;
               
                this.poolState = true;
                this.myReservation();
            }
        }, error => { });
        this.configuration.setRequestPage(this.requestPage);
        this.events.subscribe('app:notification', (data: Notification) => this.onNewNotification(data));

        // let flg = this.reservation.seenURL;
        // console.log("adfasfd",this.reservation);
        // let pop = this.modalCtrl.create(
        //     AdsPopoverPage,
        //     {
        //         flag : flg
        //     },
        //     {}
        // );
        // pop.present();

    }

    ionViewWillLeave() {
        this.poolState = false;
        this.sub$1.unsubscribe();
        this.sub$2.unsubscribe();
        this.configuration.ClearTimeout();
        this.removePooling = true;
        let self = this;
        if (self.reserveIndex && self.reserveIndex.length > 0) {
            self.reserveIndex = self.reserveIndex.map(x => false)
        }
        this.events.unsubscribe('app:notification');
    }

    getData() {
        this.api.get(`booking/${this.customer.phone}`, {}, {}, true, false).subscribe(r => {
        
            this.reservation = r[0];
            
            if (!this.reservation.id) {
                this.poollingList(false);
                this.events.publish('reservation:empty');
            } else {
                this.configuration.setStorage('reservation', this.reservation).then(() => {
                }, error => { });
                this.poollingList(true);
            }


        }, error => { });
    }

    poollingList(flag) {
        let self = this;
        if (flag == true) {
            let timeout = setTimeout(() => {
                // offLoader
                // alert("pooling start");
                if (!this.poolState || self.removePooling) return;
                this.getData();
            }, 10000);
            setTimeout(function () {
                self.configuration.setTimeout(timeout);
            }, 0);
        } else {
            this.configuration.ClearTimeout();
        }

    }

    myReservation() {
        // alert("my reservation start");
        if (this.customer.guest) {
            this.api.get(`guests/reservation`, {}, {}, true).subscribe(r => {
                
                this.reservation = r[0];
                this.configuration.setStorage('reservation', this.reservation).then(() => {
                }, error => { });
                
            }, error => { });

            return false;
        }

        this.api.get(`booking/${this.customer.phone}`, {}, {}, true, false).subscribe(r => {
            if (r[0]) {
                this.reservation = r[0];
                // this.api.get(`booking/view/${this.reservation.id}`, {}, { 'Content-Type': 'application/json' }, true, false).subscribe(reservationRes => {
                // }, error => { })
            } else {
                this.reservation = {};
            }

         
            //this.poollingList(true);
            if (!this.reservation.id)
                this.events.publish('reservation:empty');

        }, error => { })
       
        
    }

    isExpired(IsoDate: string): boolean {
        return new Date(IsoDate) < new Date();
    }

    delete(id: string) {
        this.api.post('booking/cancel', { id: id }, {}).subscribe(r => {
            this.api.AmError(this.configuration.translate.translate.instant('DONE'), r.message, [{
                text: this.configuration.translate.translate.instant('CLOSE'), handler: () => {
                    this.configuration.setStorage('reserv_endDate', '0');
                    this.events.publish('reservation:empty');
                    this.configuration.setStorage('tab', null);
                    this.reservation = {};
                }
            }])
        }, error => { })
    }

    release(item: any) {
        this.poolState = false;
        this.navCtrl.push(ReleasePage, { data: item })
    }
    blurEvent() {
        let elements = document.getElementsByTagName("tooltip-box");
        for (var i = 0, il = elements.length; i < il; i++) {
            if (!elements[i].classList.contains('hidden')) {
                elements[i].className += " hidden";
                //elements[i].classList.remove("hidden");
            }

        }

    }
    tooltipClick() {
        event.preventDefault();
        event.stopPropagation();
        let elements = document.getElementsByTagName("tooltip-box");
        for (var i = 0, il = elements.length; i < il; i++) {
            if (elements[i].classList.contains('hidden')) {
                // elements[i].className += " hidden";
                elements[i].classList.remove("hidden");
            }

        }
    }

    change(item: any, index: number) {
       
        this.reserveIndex[index] = !this.reserveIndex[index];
        let options = this.getElementObject(item);


        if (item && item.seat) {
            if (item.seat.type == 'umbrella') {
                this.navCtrl.push(beachBook, options)
            } else if (item.seat.type == 'sunbed') {
                this.navCtrl.push(beachBookSunbed, options)
            } else if (item.seat.type == 'baldaquin') {
                this.navCtrl.push(beachBookBaldaquin, options)
            }
            this.setCurrencyByBeach(item.beach_id);
        }
    }

    private setCurrencyByBeach(id: string) {
        let ss = this.beach_settings.find(item => {
            return item.beach_id == id;
        });
        this.configuration.currency = ss.currency;
    }

    getDateObj(date: string): Date {
        return new Date(date)
    }


    showWaterMenu($event: any) {
        this.configuration.getStorage('reservation').then((res) => {
            if (res) {
                let beachSettings = this.beach_settings.filter((beach) => beach.beach_id == res.beach_id)
                let popover = this.popoverCtrl.create(PopoverWeather, { beach_ids: res.beach_id, settings: beachSettings && beachSettings.length > 0 ? beachSettings[0] : {} }, { cssClass: 'weatherPopOver' });
                popover.present({
                    ev: $event
                }).then(() => {
                });
                popover.onDidDismiss((e) => {
                  
                })
            }
        })
    }


    getElementObject(item) {
      
        let start = new Date(item.start_date).getTime();
        let end = new Date(item.end_date).getTime();
    

        let search;

      

        if (item.seat.type == "sunbed") {
            search = {
                amount: item.amount,
                status: item.status,
                reservation: item,
                data: {},
                change: true,
                extra: item.seat.extra_seats,
                settings: this.beachSettings(item.beach_id),
                title: item.beach,
                index: item.seat.number,
                location: item.seat.zone,
                search: {
                    beach_ids: [item.beach_id],
                    customer_id: this.customer.id,
                    seat_type: item.seat.type,
                    seat_zone: [item.seat.zone],
                    start_date: start,
                    end_date: end,
                    refresh: true
                },
                pool: {
                    beach_ids: [item.beach_id],
                    customer_id: this.customer.id,
                    seat_type: item.seat.type,
                    seat_zone: [item.seat.zone],
                    start_date: start,
                    end_date: end,
                    refresh: true
                }
            };
        } else {
            search = {
                amount: item.amount,
                status: item.status,
                reservation: item,
                data: {},
                change: true,
                extra: item.seat.extra_seats,
                settings: this.beachSettings(item.beach_id),
                title: item.beach,
                index: item.seat.number,
                location: item.seat.zone,
                search: {
                    beach_ids: [item.beach_id],
                    customer_id: this.customer.id,
                    seat_type: item.seat.type,
                    seat_zone: [item.seat.zone],
                    seat_position: { x: item.seat.position.x, y: item.seat.position.y },
                    start_date: start,
                    end_date: end,
                    refresh: true
                },
                pool: {
                    beach_ids: [item.beach_id],
                    customer_id: this.customer.id,
                    seat_type: item.seat.type,
                    seat_zone: [item.seat.zone],
                    seat_position: { x: item.seat.position.x, y: item.seat.position.y },
                    start_date: start,
                    end_date: end,
                    refresh: true
                }
            };
        }

        return search;
    }
    beachSettings(id: string) {
        for (let i in this.beach_settings) {
            if (this.beach_settings.hasOwnProperty(i)) {
                if (this.beach_settings[i] && this.beach_settings[i].beach_id == id) {
                    return this.beach_settings[i] ? this.beach_settings[i] : []
                }
            }
        }
    }
    closeOverlay(i) {
        this.reserveIndex[i] = false;
    }
    getSunbedCount(slots: any, count: any) {
        let ret = {
            slot: '',
            seat: 0
        };
        let singleSeatCount = {
            m: 1, n: 2, o: 4, x: 2, y: 3, z: 4
        };

        let slotList = Object.keys(slots);
        for (const key in slots) {
            if (slots.hasOwnProperty(key)) {
                const element = slots[key];
                if (element.length > 0) {
                    ret.slot += key;
                    ret.seat += element.filter(el => el).length;
                }
            }
        }
        if (slotList.length == 1) {

            let seatCount = singleSeatCount[slotList[0]];
            return seatCount + count;
        } else {
            return ret.seat + count;
        }

    }
    getSeatSlots(slots: any): any {
        let ret = {
            slot: '',
            seat: 0
        };
        let singleSeatCount = {
            m: 1, n: 2, o: 4, x: 2, y: 3, z: 4
        };

        let slotList = Object.keys(slots);
        for (const key in slots) {
            if (slots.hasOwnProperty(key)) {
                const element = slots[key];
                if (element.length > 0) {
                    ret.slot += key;
                    ret.seat += element.length;
                }
            }
        }
        if (slotList.length == 1) {
            let seatCount = singleSeatCount[slotList[0]];
            let person = (seatCount > 1) ? 'PERSONS' : 'PERSON';
            person = this.configuration.translate.translate.instant(person);
            ret = {
                slot: '(' + seatCount + ' ' + person + ')',
                seat: 0
            };
        }
        return ret;
    }

    openRating() {
        this.navCtrl.push(ratingPage, { id: this.reservation.beach_id, title: this.reservation.beach });
    }

    updatePhone(event: any) {
        if (event && event.complete) {
            if (event.complete.length > 4) {
                this.FormData.controls['phone'].setValue(event.complete);
                this.configuration.setStorage('AdditionalRegData', event).then(a => {

                }, error => {

                });
            }
        }
    }

    getSeats(item: any) {
        return item.seat.extra_seats + this.getSeatSlots(item.seat.slots).seat;
    }

    deletePhone(item: any, guest: any) {
        this.api.post(`booking/unshare`, {
            id: item.id,
            share_id: guest.id
        }, {}, true, false).subscribe(response => {
           
            item.guests = response;
        }, error => { });
    }

    shareReservation(item: any) {
        let seats = this.getSunbedCount(this.reservation.seat.slots, this.reservation.seat.extra_seats) - 1;
        // let seats = this.getSeats(item) - 1;
        if (item.guests.length < seats) {
            var phone = this.FormData.controls['phone'].value;
            if (phone) {
                this.api.post(`booking/share`, {
                    id: item.id,
                    phone: phone
                }, {}, true, false).subscribe(response => {
                   
                    item.guests = response;
                }, error => { });
            }
            else {
                let title = this.configuration.translate.translate.instant('ERROR');
                let message = this.configuration.translate.translate.instant('PHONE_VALIDATION');
                let close = this.configuration.translate.translate.instant('CLOSE');
                this.api.AmError(title, message, [{
                    text: close, handler: () => {

                    }
                }]);
            }
        }
        else {
            let title = this.configuration.translate.translate.instant('ERROR');
            let message = this.configuration.translate.translate.instant('SHARE_LIMIT', { seats: seats });
            let close = this.configuration.translate.translate.instant('CLOSE');
            this.api.AmError(title, message, [{
                text: close, handler: () => {

                }
            }]);
        }
    }

    showPhone(item) {
        item.show = true;
        item.show_give = false;
    }

    showGive(item) {
        item.show_give = true;
        item.show = false;
    }

    isOwner(item) {
        return item.phone == this.customer.phone;
    }

    isFriend(item) {
        return item.phone != this.customer.phone;
    }

    isActive(item) {
        return (item.status == 'booked' || item.status == 'active');
    }

    isPending(item) {
        return item.status == 'pending';
    }

    acceptInvitation(reservation: any) {
        this.api.post(`booking/accept_invitation`, {
            id: reservation.id
        }, {}, true, false).subscribe(response => {
            reservation.share_status = 'accepted';

            let title = this.configuration.translate.translate.instant('SUCCESS');
            let message = response.message;
            let close = this.configuration.translate.translate.instant('CLOSE');
            this.api.AmError(title, message, [{
                text: close, handler: () => {
                    this.myReservation();
                }
            }]);
        }, error => { });
    }

    rejectInvitation(reservation: any) {
        this.api.post(`booking/reject_invitation`, {
            id: reservation.id,
            share_id: reservation.share_id
        }, {}, true, false).subscribe(response => {
            let title = this.configuration.translate.translate.instant('SUCCESS');
            let message = response.message;
            let close = this.configuration.translate.translate.instant('CLOSE');
            this.api.AmError(title, message, [{
                text: close, handler: () => {
                    this.events.publish('reservation:empty');
                }
            }]);
        }, error => { });
    }

    quitInvitation(reservation: any) {
        this.api.post(`booking/quit_invitation`, {
            id: reservation.id,
            share_id: reservation.share_id
        }, {}, true, false).subscribe(response => {
            let title = this.configuration.translate.translate.instant('SUCCESS');
            let message = response.message;
            let close = this.configuration.translate.translate.instant('CLOSE');
            this.api.AmError(title, message, [{
                text: close, handler: () => {
                    this.events.publish('reservation:empty');
                }
            }]);
        }, error => { });
    }

    // Give Reservation
    deleteGive(reservation: any) {
        this.api.post(`booking/cancel_transfer`, {
            id: reservation.id,
            give_id: reservation.give.id
        }, {}, true, false).subscribe(response => {
            
            reservation.give = null;
        }, error => { });
    }

    transferReservation(reservation: any) {
        var phone = this.FormData.controls['phone'].value;
        if (phone) {
            this.api.post(`booking/transfer`, {
                id: reservation.id,
                phone: phone
            }, {}, true, false).subscribe(response => {
               
                reservation.give = response;
                reservation.show = true;
            }, error => { });
        }
        else {
            let title = this.configuration.translate.translate.instant('ERROR');
            let message = this.configuration.translate.translate.instant('PHONE_VALIDATION');
            let close = this.configuration.translate.translate.instant('CLOSE');
            this.api.AmError(title, message, [{
                text: close, handler: () => {

                }
            }]);
        }
    }

    acceptTransfer(reservation: any) {
        this.api.post(`booking/accept_transfer`, {
            id: reservation.id,
            give_id: reservation.give.id
        }, {}, true, false).subscribe(response => {
            let title = this.configuration.translate.translate.instant('SUCCESS');
            let message = response.message;
            let close = this.configuration.translate.translate.instant('CLOSE');
            this.api.AmError(title, message, [{
                text: close, handler: () => {
                    this.myReservation();
                }
            }]);
        }, error => { });
    }

    rejectTransfer(reservation: any) {
        this.api.post(`booking/reject_transfer`, {
            id: reservation.id,
            give_id: reservation.give.id
        }, {}, true, false).subscribe(response => {
            let title = this.configuration.translate.translate.instant('SUCCESS');
            let message = response.message;
            let close = this.configuration.translate.translate.instant('CLOSE');
            this.api.AmError(title, message, [{
                text: close, handler: () => {
                    this.events.publish('reservation:empty');
                }
            }]);
        }, error => { });
    }

    getInvitationMessage(reservation) {
        return this.configuration.translate.translate.instant('SHARE_MSG', { name: reservation.name });
    }

    getTransferMessage(reservation) {
        return this.configuration.translate.translate.instant('TRANSFER_MSG', { name: reservation.name });
    }
}
