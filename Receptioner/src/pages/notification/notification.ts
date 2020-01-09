import { Tools } from './../../providers/tools';
import { CustomBootstrap } from './../../app/BootstrapFirstRun';
import { ApiProvider } from './../../providers/services';
import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams, Platform, Events, Content } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Subscription } from 'rxjs/Subscription';
import { Notification } from '../../providers/interface';
import { NativeAudio } from '@ionic-native/native-audio';
import { Vibration } from '@ionic-native/vibration';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import * as moment from 'moment';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name: 'page-notification',
    priority: 'high'
})
@Component({
    selector: 'page-notification',
    templateUrl: 'notification.html',
})
export class NotificationPage {

    @ViewChild(Content) content: Content;
    confirmPopover: any;
    showScrollButton: boolean;
    notificData: any = [];
    originalData: any = [];
    isInfinite: boolean = true;
    pageNum: number = 1;
    itemsPerPage: number = 10;
    isPooling: boolean = true;
    today: string = "";

    sFilter: { pending: boolean, booked: boolean, request: boolean, paid_online: boolean, occupied: boolean, phone: number, unread: boolean } = { pending: false, booked: false, request: false, paid_online: false, occupied: false, phone: null, unread: false };

    beachId: string = '';

    private _selectPeriodHandler: (data: any) => void;
    public colorMap: any = { booked: '#a82fab', occupied: '#000000', paid: '#f40006', 'change-request': '#54fe62', pending: '#fffd8c', unread: '#8181f9' };

    private onResumeSubscription: Subscription;

    constructor(public api: ApiProvider, private ngZone: NgZone, private alertCtrl: AlertController, private tools: Tools, private events: Events, private config: CustomBootstrap,
        private nativeAudio: NativeAudio, private vibration: Vibration,
        public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private keyboard: Keyboard, private orientation: ScreenOrientation,
        private photoViewer: PhotoViewer, public changeDetectorRef: ChangeDetectorRef
    ) {

        this.platform.ready().then(() => {
            if (platform.is('cordova')) {
                try {
                    this.orientation.lock(this.orientation.ORIENTATIONS.LANDSCAPE);
                } catch (error) {
                }
                this.nativeAudio.preloadSimple('notification', 'assets/notification.mp3').then(() => {
                    console.log('success');
                }).catch(error => {
                    console.log(error);
                });
            }

            this.onResumeSubscription = platform.resume.subscribe(() => {
                this.isPooling = false;
                this.buildParams().then(params => this.gettingReservations(params).subscribe(res => {
                    this.handleResponse(res, false);
                    this.originalData = JSON.parse(JSON.stringify(this.notificData));
                }));
            });

        });
    }
    receivedNotification() {
        this.nativeAudio.play('notification').then((value) => {
            console.log('success play');
        }).catch(error => {
            console.log(error);
        });
        this.vibration.vibrate(1000);
    }

    ionViewDidEnter() {
        this.today = moment(new Date()).format('DD.MM.YYYY');
        this.initEvents();

        if (this.platform.is('android') || this.platform.is('ios')) {
            // this.keyboard.disableScroll(true);
        }

    }

    onNewNotification(data: Notification) {
        if (data) {

            console.log('Notification Data:', data);

            this.buildParams().then(params => this.gettingReservations(params).subscribe(res => {

                if (this.platform.is('cordova') && data.action === 'create') {
                    this.receivedNotification();
                }
                if (this.platform.is('cordova') && data.action === 'cancel') {
                    this.receivedNotification();
                }
                if (this.platform.is('cordova') && data.action === 'release') {
                    this.receivedNotification();
                }
                this.ngZone.run(() => {
                    this.handleResponse(res, false);
                });

            }));

        }

    }

    ionViewWillEnter() {

        this.config.setPage('notification');

        this.buildParams().then(params => this.gettingReservations(params).subscribe(res => {
            this.handleResponse(res, false);
            this.originalData = JSON.parse(JSON.stringify(this.notificData));
        }));
    }

    onNavigateTop() {
        this.content.scrollToTop();
    }

    initEvents() {

        this._selectPeriodHandler = data => this.selectPeriodHandler(data);
        this.events.subscribe('app:selectPeriodNotifications', this._selectPeriodHandler);

        this.events.publish('app:authState', false);
        this.events.subscribe('app:reload', () => {
            this.buildParams().then(params => this.gettingReservations(params).subscribe(res => {
                this.handleResponse(res, false);
                this.originalData = JSON.parse(JSON.stringify(this.notificData));
            }));
        });

        console.log("123456 - notification unsubscribe");
        this.events.unsubscribe('app:notification');
        console.log("123456 - notification subscribe");
        this.events.subscribe('app:notification', this.onNewNotification.bind(this));

        this.events.publish('app:activePage', 'notifications');
    }

    selectPeriodHandler(data: any) {

        this.notificData = [];
        this.pageNum = 1;

        let pageTabNum = data.page;

        if (pageTabNum != 2) return;

        this.buildParams().then(params => {
            this.gettingReservations(params, data.period).subscribe(res => this.handleResponse(res));
        });

    }
    gettingReservations(params: any, period: any = null) {

        let beach_id = params.beach_id;
        delete params.beach_id;
        if (!beach_id) {
            //debugger;
        }
        return this.api.get(`booking/${beach_id}/`, params, { 'Content-Type': 'application/json' }, true, false);

    }

    itemClick(item: any) {
        console.log('item-clicked')

        // if ( item.status === 'change-request' ) {
        //   item.clicked = !item.clicked;
        // }
        if (item.status === 'canceled' || item.status === 'expired') {
            return;
        }

        this.notificData.map((notification) => {
            notification.clicked = notification.id === item.id && !notification.clicked
        })

    }

    generateDays(start, end) {
        let dateStart = new Date(start);
        let dateEnd = new Date(end);
        let days = [];

        let incrementalDate = new Date(start);
        if (dateEnd.getDate() == dateStart.getDate()) {
            days.push(this.tools.getFormattedDate(dateStart))
        }
        else {
            days.push(this.tools.getFormattedDate(incrementalDate))
            while (dateEnd.getDate() > dateStart.getDate()) {
                incrementalDate = new Date(incrementalDate.setDate(incrementalDate.getDate() + 1))
                days.push(this.tools.getFormattedDate(incrementalDate))
            }
        }
        return days;
    }

    checkPhoto(item, evt) {
        evt.stopPropagation();
        this.api.get(`booking/photo/${item.id}`, {}, {}, true).subscribe(res => {
            if (this.platform.is('cordova')) {
                this.photoViewer.show(res.url, '', {

                });
            } else {
                alert(res.url);
            }
        }, error => {
            this.api.AmError(this.config.translate.translate.instant('ERROR'), error.message, [{
                text: this.config.translate.translate.instant('Buttons.CLOSE')
            }]);
        })
    }
    confirmPosition(item, to_confirm, evt) {
        evt.stopPropagation();

        if (to_confirm !== 'later') {

            let endPoint = this.prepareEndpoint(item, to_confirm);

            if (to_confirm === 'accept') {
                this.api.post(`booking/` + endPoint.segment, endPoint.payload, { 'Content-Type': 'application/json' }, true, false).subscribe(res => {
                    item.clicked = false;
                    item.acceptable = false;
                    
                }, err => {
                    this.api.AmError(
                        this.config.translate.translate.instant('Components.WARNING'),
                        err.message,
                        [{
                            text: this.config.translate.translate.instant('Buttons.OK'),
                            handler: () => {
                                item.clicked = false;
                            }
                        }]);
                });
            }
            else if (to_confirm === 'view_change') {
                this.confirmPositionRequestHandler(endPoint, item, to_confirm)
            }
            else {
                this.showConfirm().onDidDismiss((data, role) => {
                    if (role === 'ok') {
                        this.confirmPositionRequestHandler(endPoint, item, to_confirm)
                    }
                })
            }
        } else {
            item.clicked = false;
        }

    }

    confirmPositionRequestHandler(endPoint, item, to_confirm) {
        console.log("1234",endPoint,"----",to_confirm,"------",item);
        this.api.post(`booking/` + endPoint.segment, endPoint.payload, { 'Content-Type': 'application/json' }, true, false).subscribe(res => {
            // Update item in the view
            if (to_confirm === 'confirm') {
                const uiItem = this.notificData.filter(el => el.id === item.id)[0];

                uiItem.status_text = uiItem.active_status_text;
                uiItem.status_color = '#000000';
                uiItem.status = 'active';
                uiItem.read = true;
            } else if (to_confirm === 'cancel') {
                const uiItem = this.notificData.filter(el => el.id === item.id)[0];

                uiItem.status_text = 'Canceled';
                uiItem.status_color = '#000000';
                uiItem.status = 'cancel';
                uiItem.read = true;
            } else if (to_confirm === 'payoff') {
                const uiItem = this.notificData.filter(el => el.id === item.id)[0];

                uiItem.status_text = uiItem.active_status_text;
                uiItem.status_color = '#000000';
                uiItem.status = 'active';
                uiItem.read = true;
            }
            else if (to_confirm === 'release_all') {
                const uiItem = this.notificData.filter(el => el.id === item.id)[0];

                uiItem.status_text = 'Completed';
                uiItem.status_color = '#000000';
                uiItem.status = 'active';
                uiItem.read = true;
            }

            item.clicked = false;

        }, err => {

            this.api.AmError(
                this.config.translate.translate.instant('Components.WARNING'),
                err.message,
                [{
                    text: this.config.translate.translate.instant('Buttons.OK'),
                    handler: () => {
                        item.clicked = false;
                    }
                }]);

        });
    }

    prepareEndpoint(item, to_confirm): { segment: string, payload: Object } {
        if (to_confirm === 'change_request_confirm') {
            let returnedValue = {
                segment: "position",
                payload: {
                    id: item.id,
                    change: true
                }
            }
            if (!item.read) {
                returnedValue.payload['read'] = true;
            }
            return returnedValue;
        } else if (to_confirm === 'change_request_reject') {
            return {
                segment: "position",
                payload: {
                    id: item.id,
                    change: false
                }
            }
        }
        else if (to_confirm === 'view_change') {
            return {
                segment: "view/" + item.reservation_id,
                payload: {
                    id: item.id,
                }
            }
        }
        else if (to_confirm === 'payoff') {
            let returnedValue = {
                segment: "pay",
                payload: {
                    id: item.id
                }
            }
            if (!item.read) {
                returnedValue.payload['read'] = true;
            }
            return returnedValue;
        }
        else if (to_confirm === 'confirm') {
            let returnedValue = {
                segment: "pay",
                payload: {
                    id: item.id
                }
            }
            if (!item.read) {
                returnedValue.payload['read'] = true;
            }
            return returnedValue;
        }
        else if (to_confirm === 'cancel') {
            let returnedValue: any = {
                segment: "cancel",
                payload: {
                    id: item.id,
                }
            }
            if (item.acceptable) {
                returnedValue.payload.block = true;
            }
            return returnedValue;

        } else if (to_confirm === 'accept') {
            let returnedValue = {
                segment: "accept",
                payload: {
                    id: item.id
                }
            }
            return returnedValue;
        }
        else if (to_confirm === 'release_all') {
            let days = this.tools.getDateAry(this.tools.getFormattedDateStr(item.period.start), this.tools.getFormattedDateStr(item.period.end))
            let dates = []
            if (days && days.length > 0) {
                days.map((day) => {
                    dates.push(this.tools.getFormattedDateStr(day))
                })
            }
            let returnedValue = {
                segment: "release",
                payload: {
                    id: item.id,
                    days: dates
                }
            }
            if (!item.read) {
                returnedValue.payload['read'] = true;
            }
            return returnedValue;
        }
    }

    ionViewDidLeave() {

        if (this.platform.is('android') || this.platform.is('ios')) {
            // this.keyboard.disableScroll(false);
        }

        this.events.unsubscribe('app:selectPeriod2');
        this.events.unsubscribe('app:reserveSunbed');
        this.events.unsubscribe('app:reload');

    }


    showConfirm() {
        this.confirmPopover = this.alertCtrl.create({
            title: 'Are you sure?',
            buttons: [
                {
                    text: this.config.translate.translate.instant('Buttons.REJECT'),
                    role: 'cancel',
                    handler: () => {
                    }
                },
                {
                    text: this.config.translate.translate.instant('Buttons.OK'),
                    role: 'ok',
                    handler: () => {
                        this.refreshView();
                    }
                }
            ],
            enableBackdropDismiss: false,
        });
        this.confirmPopover.present();
        return this.confirmPopover;
    }

    // UI Components

    getSeatType(seat: any): string {
        return (typeof seat.type != 'undefined') ? seat.type : 'Umbrella';
    }

    getComma(ary: Array<any>, item: any): string {
        return this.tools.getComma(ary, item);
    }

    filterCheck(event, filterName?: string) {
        if (!event.checked) {
            return;
        }
        for (const prop in this.sFilter) {
            if (this.sFilter[prop] && prop != filterName) {
                this.sFilter[prop] = false;
            }
        }

        this.pageNum = 1;
        this.buildParams().then(params => this.gettingReservations(params).subscribe(res => {
            this.config.setStorage('notifications', res.notifications);
            res.items = this.mapItems(res.items);
            this.notificData = res.items;
        }));

    }

    handleResponse(res, concat: boolean = true) {

        this.config.setStorage('notifications', res.notifications);

        res.items = this.mapItems(res.items);

        if (!concat) {
            this.notificData = res.items;
        } else {
            this.notificData = this.notificData ? this.notificData.concat(res.items) : res.items;
        }

    }

    onSwipeItem(item) {
        if (item.read) {
            return;
        }
        this.api.post(`booking/read`, { id: item.id }, { 'Content-Type': 'application/json' }, true, false)
            .subscribe(response => {
                this.buildParams().then(params => {
                    this.gettingReservations(params).subscribe(res => {
                        this.config.setStorage('notifications', res.notifications);
                        res.items = this.mapItems(res.items);
                        this.notificData = res.items;
                    });
                });
            },
                error => {
                    console.log(error)
                });
    }

    mapItems(items) {

        const colorMap = this.colorMap;

        items = items.map(item => {
            item.status_color = item.payment_method === 'online' && item.status === 'booked' ? colorMap['paid'] : colorMap[item.status];
            return item;
        });

        return items;

    }
    onPhoneSearch() {
        if (!this.sFilter.phone) return;
        this.buildParams().then((params: any) => {

            this.phoneSearch({ phone: this.sFilter.phone, beach_id: params.beach_id }).subscribe(res => {

                if (res.length) {
                    res = this.mapItems(res);
                    this.notificData = res;

                } else {
                    this.api.AmError(this.config.translate.translate.instant('Components.INFO'), this.config.translate.translate.instant('Messages.PHONE_NO_RESULTS'), [{
                        text: this.config.translate.translate.instant('Buttons.OK'),
                        handler: () => { }
                    }]);
                }
            })
        });

    }

    phoneSearch(params: any) {
        return this.api.get(`booking/search`, params, { 'Content-Type': 'application/json' }, true, false);
    }

    doInfinite(infiniteScroll: any) {
        console.log('infinitescroll');
        if (this.sFilter.phone) return;
        console.log('infinitescroll');
        console.log(infiniteScroll);
        let self = this;
        this.pageNum = this.pageNum + 1;
        this.buildParams().then((params: any) => {
            this.gettingReservations(params).subscribe(res => {
                res.items = self.mapItems(res.items);
                for (let i = 0; i < res.items.length; i++) {
                    self.notificData.push(res.items[i]);
                }
                //self.notificData = self.notificData.concat(res.items);
                self.refreshView();

                if (res.hasMore) {
                    self.pageNum = self.pageNum + 1;
                    infiniteScroll.complete();
                } else {
                    infiniteScroll.enable(true);
                }
                self.isInfinite = res.hasMore;

                console.log(self.isInfinite);
                console.log(infiniteScroll);
            });
        });
    }
    refreshView() {
        this.changeDetectorRef.markForCheck();
        this.changeDetectorRef.detectChanges();
    }
    getNotificData() {
        console.log(this.notificData);
        return this.notificData;
    }

    buildParams() {

        return new Promise(async (resolve, reject) => {

            let [period, login, /*notifications,*/ settings] = await Promise.all([
                this.config.getStorage('period'),
                this.config.getStorage('login'),
                this.config.getStorage('notifications'),
                this.config.getStorage('beach_settings')
            ]);

            if (!period) {
                period = this.initPeriod(settings);
            }

            let params: any = {

                beach_id: login ? login.beach_id : undefined,
                // start_date: period.from,
                // end_date: period.to,
                // unread: notifications || 0,
                offset: 0,
            }

            params.offset = this.calculateOffset();

            let status = null;

            for (const prop in this.sFilter) {
                if (prop !== 'phone') {

                    if (true === this.sFilter[prop]) {

                        if (prop === 'paid_online') {
                            params.paid = true;
                            status = 'booked';
                        } else if (prop === 'booked') {
                            params.paid = false;
                            status = 'booked';
                        } else if (prop === 'pending') {
                            params.paid = false;
                            status = 'pending';
                        } else if (prop === 'unread') {
                            params.unread = 1;
                        } else {
                            status = ['change-request', 'active'];
                        }

                    }

                }

            }

            if (status != null) {
                params.status = status;
            }

            resolve(params);

        });

    }

    initPeriod(settings: any) {

        let period;

        if (settings && settings.working_dates && Array.isArray(settings.working_dates) && settings.working_dates.length) {
            const dates = settings.working_dates[0];

            const working_date_start = `${(new Date().getFullYear())}-${dates.start['month']}-${dates.start['day']}`;
            const working_date_end = `${(new Date().getFullYear())}-${dates.end['month']}-${dates.end['day']}`;

            period = {
                from: working_date_start,
                to: working_date_end,
                period: this.tools.getPeriod(working_date_start, working_date_end),
                isToday: this.tools.getToday() == working_date_start ? true : false
            };

            if ((new Date(this.tools.getToday())).getTime() <= (new Date(period.from)).getTime()) {

                period.to = period.from;
                period.isToday = false;

            } else {

                period.from = this.tools.getToday();
                period.to = this.tools.getToday();
                period.period = 0;
                period.isToday = true;

            }

        } else {
            period = {
                from: moment(new Date()).format('YYYY-MM-DD'),
                to: moment(new Date()).format('YYYY-MM-DD'),
                period: 0,
                isToday: true
            };

        }

        console.log(period);
        if (period) {
            this.config.setStorage('period', period);
        }

        return period;

    }

    calculateOffset() {
        return (this.itemsPerPage * this.pageNum) - this.itemsPerPage;
    }

    searchReset() {
        this.pageNum = 1;
        for (const prop in this.sFilter) {
            if (prop === 'phone') {
                this.sFilter[prop] = null;
            } else {
                this.sFilter[prop] = false;
            }

        }

        this.content.scrollToTop().then(_ => {
            this.buildParams().then(params => this.gettingReservations(params).subscribe(res => {
                this.notificData = [];
                this.handleResponse(res);
                // this.pageNum = this.pageNum + 1;
                // save initial state
                this.originalData = JSON.parse(JSON.stringify(this.notificData));

            }));
        });


        // this.doRefresh();
        // console.log(this.content);
        // this.events.publish('scrollToTop',true);
        // this.content.scrollToTop();
    }

    getDispTotal(item: any) {

        const amount = Math.round(parseFloat(item.amount) * 100) / 100;
        const old_amount = Math.round(parseFloat(item.old_amount) * 100) / 100;

        let total;

        if (amount > 0 && old_amount === 0) {
            total = `${amount} ${item.currency}`;
        } else if (amount === 0 && old_amount > 0) {
            total = `${old_amount} ${item.currency}`;
        }

        if (amount > 0 && old_amount > 0) {
            total = `${amount} ${item.currency} (${this.config.translate.translate.instant('Components.PAID')} ${old_amount} ${item.currency})`;
        }

        return total;

    }

    ionViewWillLeave(): void {

        this.onResumeSubscription.unsubscribe();
        this.originalData = [];

        if (this._selectPeriodHandler) {

            this.events.unsubscribe('app:selectPeriodNotifications', this._selectPeriodHandler);
            this._selectPeriodHandler = undefined;

        }

    }

    // startScroll(event) {
    //   console.log(event);
    //   // if(event.scrollTop > 400) this.content.scrollTo(0,0,2);
    // }

}