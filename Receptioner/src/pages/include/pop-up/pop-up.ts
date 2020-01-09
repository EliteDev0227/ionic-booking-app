import { CustomBootstrap } from './../../../app/BootstrapFirstRun';
import { ApiProvider } from './../../../providers/services';
import { Tools } from './../../../providers/tools';
import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { IonicPage, AlertController, NavController, NavParams, ViewController, Platform, ModalController, Events, LoadingController } from 'ionic-angular';
import { CommonProvider } from '../../../providers/common/common';
import 'rxjs/add/operator/switchMap';
import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ViewRef_ } from '@angular/core/src/view';
import { Storage } from '@ionic/storage';
import { NativeAudio } from '@ionic-native/native-audio';
import { Notification } from '../../../providers/interface';
import { Vibration } from '@ionic-native/vibration';

declare var window: any;

/**
 * Generated class for the PopUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name: 'page-pop-up',
    priority: 'high'
})
@Component({
    selector: 'page-pop-up',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DatePipe],
    templateUrl: 'pop-up.html'
})
export class PopUpPage {

    @ViewChild('nameInputRef') nameInputRef: ElementRef;
    @ViewChild('phoneInputRef') phoneInputRef: ElementRef;
    isProtocolModeOn: boolean;
    isDiscountModeOn: boolean;
    customValue: number = 0;
    phoneNameFound: boolean = false;
    currentSelectedReservation: any;
    confirmPopover: any;
    selectedExtraSeatsNumber: number = -1;
    selectedExtraSunbedsNumber: number = -1;
    isExtraSeatsDisabled: boolean = true;
    isCheckedExtraSunBedsNumber: number;
    reservationEdit: any;
    latestrresponse: any;
    item: any;
    isLoading = false;
    pageState: {
        kind: string,
        isDetail: boolean,
        isNew: boolean,
        action: string,
        period?: {
            from: any,
            to: any,
            period: any,
            isToday: boolean
        },
        compState?: boolean,
        canCreate: boolean
    } = {
            kind: '',
            isDetail: false,
            isNew: true,
            action: '',
            period: {
                from: '',
                to: '',
                period: 0,
                isToday: false
            },
            compState: false,
            canCreate: false
        };

    umbrellaData: any = {
        umbrella: { left: 'selected', right: 'busy' },
        seats: { first: 'selected', second: 'free', third: 'busy', fourth: 'free' },
        status: 'booked'
    };

    reserveInfo: {
        amount: string,
        by: string,
        currency: string,
        for: string,
        id: string,
        number: number,
        period: Array<string>,
        released_days: Array<any>,
        seat: { number: number, sids: string, sunbeds: number },
        status: string,
        status_text: string
    } = {
            amount: '0',
            by: '',
            currency: '',
            for: '',
            id: '',
            number: 0,
            period: [],
            released_days: [],
            seat: { number: 0, sids: '1 A', sunbeds: 0 },
            status: 'active',
            status_text: 'Occupied'
        }
    oldReservation: { extra_sunbeds: number, number: number, sunbeds: number } = { extra_sunbeds: 0, number: 0, sunbeds: 0 };
    singleReserve: {
        amount: number, old_amount: number, status: string, created_by: string, created_for_id: string, created_for_name: string, created_for_phone: string, id: string, name: string, payment_method: string,
        period: Array<{ date: string, day: string }>, phone: string, released_days: Array<string>, old_phone?: string, old_name?: string,
        seat: { index?: number, extra_seats: number, number: number, position: { x: number, y: number }, slots: { a: Array<number>, b: Array<number> }, type: string, zone: string }
    } = { amount: 0, old_amount: 0, status: '', created_by: '', created_for_name: '', created_for_id: '', created_for_phone: '', id: '', name: '', payment_method: '', period: [], phone: null, released_days: [], seat: { extra_seats: 0, number: 0, position: { x: 0, y: 0 }, slots: { a: [], b: [] }, type: '', zone: '' } };

    reservationAry: Array<any> = [];

    // seatInfo:{type:string,zone:string,available_seat:{status:boolean,data:Array<number>},broker_id:string,can_seat:any,
    //   coords:{x:number,y:number},number:number,price:number,seats:number,shape:string,
    //   status:any,status_color:any,waiter:{id:string,color:string}} 
    //   = {type:'',zone:'',available_seat:{status:false,data:[]},
    //   broker_id:'',can_seat:'',coords:{x:0,y:0},number:0,price:0,seats:0,shape:'',
    //   status:{},status_color:{},waiter:{id:'',color:''}};
    public seatInfo: any = {};

    availableSeat: {
        status: boolean,
        data: Array<any>
    };

    newReservation: any;

    userInfo: { name: string, phone: string } = { name: '', phone: '' };
    currency: string = '';
    averagePrice: number = 0;
    selectedReserveStatus: { status: string, payment_method: string } = { status: '', payment_method: '' };

    periodAry: Array<any> = [];
    releaseAry: Array<string> = [];
    releaseAryImmutable: Array<string>;
    oldReleaseAry: Array<string> = [];
    newSlots: { a: Array<number>, b: Array<number> } = { a: [], b: [] };
    oldSlot: { a: Array<number>, b: Array<number> } = { a: [], b: [] };
    immutableSlots: { a: Array<number>, b: Array<number> } = { a: [], b: [] };
    immutableExtraSeats: number;
    oldExtraSeats: number;
    newPosition: any = {};
    oldAmount: number = 0;
    stateChangePosition: { changed: boolean, paid_off: boolean } = { changed: false, paid_off: false };

    isReleaseShown: boolean = false;

    isFreeSunbed: boolean = false;
    bedNum: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8];
    uSeatNum: Array<number> = [];
    bSeatNum: Array<number> = [];
    seatCheckedAry: Array<number> = [];
    checkedExtraSeat: number;

    waiter_id: string;
    beachSettings: any = {};
    broker_id: string = '';
    beach_id: string = '';
    beach_name: string = '';
    periodSelNum: number = 0;
    firstDate: { date: string, day: string } = { date: '', day: '' };
    freeSunbedsData: { price: number, count: number, reservations?: Array<any>, old_amount: number, old_count: number, old_remaining: number } = { price: 0, count: 0, reservations: [], old_amount: 0, old_count: 0, old_remaining: 0 };

    changeModalState: any;

    loadingInstance: any;
    isProtocolReservation = false;
    isDiscountReservation = false;
    guestCodes = [/*{
        code:121324
    }*/];
    sideConfigs = {
        left: ['a'],
        right: ['b'],
        center: ['m', 'n', 'o', 'x', 'y', 'z']
    };
    bookingStatus = {
        left: false,
        right: false,
        center: false
    };
    sides = ['center', 'left', 'right'];
    umbrella: any;
    baldaquin: any;
    eleList: any;
    type = "";
    isNew = false;
    discountTotal = 0;
    reloadingGridFlag = 0;
    old_name = "";
    old_phone = "";
    discountPer: any = '';
    discountPerList = [5, 10, 15, 20, 25, 30, 40, 50, 70, 75];
    old_sunbed = 0;
    old_extra_sunbed = 0;
    averagePriceOld = 0;
    sunbedPriceOld = 0;
    settings: any = {};
    gridReloadParams: any;
    noprice: any = false;
    posChangeZone;
    firstPopup = 0;

    constructor(private dp: DatePipe, private changeDetectorRef: ChangeDetectorRef, public navCtrl: NavController, private alertCtrl: AlertController, private ev: Events, public tools: Tools, private modalCtrl: ModalController,
        private api: ApiProvider, private config: CustomBootstrap, private platform: Platform,
        public navParams: NavParams, public viewCtrl: ViewController, private common: CommonProvider, private vibration: Vibration, private ngZone: NgZone,
        public loadingCtrl: LoadingController, public translate: TranslateService, private storage: Storage, private events: Events, private nativeAudio: NativeAudio) {

        this.pageState.kind = this.navParams.data.kind;
        this.noprice = this.navParams.data.no_price;
        //alert('-' + this.noprice)

        this.firstPopup = 0;

        let beach_settings = JSON.parse(localStorage.beach_settings);
        this.settings = beach_settings;
        this.pageState.canCreate = this.navParams.data.canCreate;
        this.changeModalState = this.navParams.get('setState');
        this.type = this.navParams.data.seatInfo.type;
        this.setDetails(this.navParams.data.seatInfo.info.mapElement.list, "from constructor");
        if (this.type == "umbrella") {
            this.umbrella = this.eleList.umbrella[0];
        } else if (this.type == "baldaquin") {
            this.baldaquin = this.navParams.data.seatInfo.info.mapElement.element.baldaquin;
        }
        this.ngZone = new NgZone({
            enableLongStackTrace: false
        });

        let that = this;


        //this.noprice = localStorage.getItem('no_price_' + this.beach_id + '_' + this.seatInfo.number);
        ////this.noprice =  sessionStorage.getItem('no_price1') ? sessionStorage.getItem('no_price1') : false;
        // if(this.noprice == false){
        //     this.pro
        // }

        this.storage.get('no_price').then((val) => {
            this.noprice = val;
        });

        this.nativeAudio.preloadSimple('notification', 'assets/notification.mp3').then(() => {

        }).catch(error => {
            console.error(error);
        });

        if (this.pageState.kind == 'sunbed') {

            this.isFreeSunbed = true;
            this.freeSunbedsData = this.navParams.data.freeSunbeds;
            this.freeSunbedsData.old_amount = this.navParams.data.freeSunbeds.count;
            this.reservationAry = this.freeSunbedsData.reservations;

            if (this.freeSunbedsData.count < this.bedNum.length) {
                this.bedNum = this.bedNum.slice(0, this.freeSunbedsData.count);
            }

            if (this.reservationAry.length > 0) {

                this.pageState.isDetail = false;
                this.pageState.isNew = false;

                this.pageState.action = 'listing';

                this.changeModalState({ kind: this.pageState.kind, action: this.pageState.action });

            } else {

                this.pageState.canCreate = false;
                console.log('this.addNew is called');
                this.addNew();

            }

            this.seatInfo = {
                type: '', zone: '', available_seat: { status: false, data: [] }, reservations: this.freeSunbedsData.reservations,
                broker_id: '', can_seat: '', coords: { x: 0, y: 0 }, number: 0, price: 0, seats: 0, shape: '',
                status: {}, status_color: {}, waiter: { id: '', color: '' }
            };

        } else {

            this.isNew = this.navParams.data.isNew;
            this.averagePrice = this.navParams.data.seatInfo.price;
            this.seatInfo = this.navParams.data.seatInfo;
            this.seatInfo.avgPrice = this.seatInfo.price;
            this.updateStatus();
            window['seatInfo'] = this.seatInfo;
            window['eleList'] = this.eleList;
            this.reservationAry = this.navParams.data.data;
            this.availableSeat = this.navParams.data.seatInfo.available_seat;

            if (this.reservationAry.length > 0) {

                this.pageState.isDetail = false;
                this.pageState.isNew = false;
                this.pageState.action = 'listing';



                this.changeModalState({
                    kind: this.pageState.kind,
                    action: this.pageState.action,
                    seat: {
                        zone: this.seatInfo.zone,
                        position: this.seatInfo.coords,
                        number: this.seatInfo.number
                    }
                });

            } else {
                this.pageState.isDetail = true;
                this.pageState.canCreate = this.pageState.kind == 'baldaquin';
                this.addNew();

            }

        }

        // Init Global Events
        this.ev.subscribe('grid:seatItemUpdated', li => {
            console.log('seat item updated');
            this.seatInfo = li;
            this.refreshView();
        });

        this.ev.subscribe(`app:changePosition`, data => {

            this.posChangeZone = data.zone;
            this.averagePrice = data.price;
            let getInfo = function (obj) {
                if (obj.info) {
                    return getInfo(obj.info);
                }
                return obj;
            };


            /*let dataFields = ['number', 'index', 'coords'];
            dataFields.map((dataField) => {
                data[dataField] = this.seatInfo[dataField];
            });*/



            let dataFields = ['number', 'index', 'zone', 'coords', 'price', 'prices'];
            dataFields.map((dataField) => {
                this.navParams.data.seatInfo[dataField] = data[dataField];
            });
            this.seatInfo = this.navParams.data.seatInfo;
            let slots: any = {};
            Object.keys(this.seatInfo.status_color).map((slot) => {
                slots[slot] = [];
            });


            this.newSlots = slots || { a: [], b: [] };
            this.oldSlot = this.singleReserve.seat.slots;
            this.oldExtraSeats = this.singleReserve.seat.extra_seats;
            this.singleReserve.seat.slots = slots || { a: [], b: [] };
            this.selectExtraSeats(this.singleReserve.seat.extra_seats);
            this.newPosition = data.coords;
            this.availableSeat = this.seatInfo.available_seat;
            this.selectedReserveStatus.status = 'change';
            this.selectedReserveStatus.payment_method = '';
            this.waiter_id = data.waiter_id;

            this.seatInfo = data;
            this.setDetails(getInfo(this.seatInfo).mapElement.list, "from change pos");
            this.baldaquin = getInfo(this.seatInfo).mapElement.element.baldaquin;
            this.pageState.kind = data.type;

            this.updateStatus();

            this.changeDetectorRef.markForCheck();
        });
        this.ev.subscribe('app:gridUpdate', function (res) {
            if (this.seatInfo && res) {
                this.seatInfo.can_seat = res.can_seat;

            }
        }.bind(this));

        // Retrieve static data from storage

        this.beach_name = this.common.getStorageItem('beach_name');
        this.beach_id = this.common.getStorageItem('beach_id');
        this.broker_id = this.common.getStorageItem('user_id');
        this.currency = this.common.getStorageItem('currency');
        // Add extra sunbeds buttons for umbrella
        if (true || this.pageState.kind === 'umbrella') {

            let extra_seats = parseInt(this.common.getStorageItem('extra_seats'));

            if (extra_seats > 0) {

                for (let i = 1; i <= extra_seats; i++) {
                    this.uSeatNum.push(i);
                }

            } else {

            }


        }
        // if (this.phoneInputRef) {
        //     this.phoneInputRef.nativeElement.focus();
        // }
    }

    ngOnInit() {
        this.storage.get('no_price').then((val) => {
            this.noprice = val;
        });
        //this.noprice = this.navParams.data.no_price;
    }

    setDiscountPer(disVal) {
        this.discountPer = disVal;
        if (this.discountPer > 100) {
            this.discountPer = 100;
        }
        this.calcDiscountPer();
    }

    setDetails(eleList, note = '') {

        window['eleList'] = eleList;
        this.eleList = eleList;
    }
    getDetails(note = '') {
        if (note) {

        }
        return this.eleList;
    }
    setDetails1() {

    }
    calcDiscountPer() {

        let total = this.getPrice(true);
        let old_amount = parseFloat(this.singleReserve.old_amount + '');

        let discountPer = this.discountPer || 0;
        if (discountPer > 0) {
            total = total - total * discountPer / 100;
        }


        total -= old_amount;

        total = this.rountItUp(total);
        this.customValue = (total > 0) ? total : 0;

        // 
        return this.customValue;
    }

    getAdjustedTime(date) {
        let a = new Date();
        let offset = a.getTimezoneOffset() * -1;
        let hour = Math.round(offset / 60),
            minute = offset - hour * 60;
        a.setHours(a.getHours() + hour);
        a.setMinutes(a.getMinutes() + minute);
        return a.getTime();
    }

    getGridInfo(zone, pos) {
        try {
            const grid = JSON.parse(localStorage.beach_grid);
            return grid[zone][pos]['info'] || null;
        } catch (e) {

            return null;
        }
    }
    getGridInfoByIndex(zone, index) {
        try {
            const grid = JSON.parse(localStorage.beach_grid);
            let item = grid[zone].filter((item) => item.index == index)[0];
            return item['info'] || null;
        } catch (e) {

            return null;
        }
    }
    sunbedColor(li) {
        let style = {
            background: "white"
        };
        try {
            let list = li.status_color;
            style.background = list[0];

            // style.background = "linear-gradient(90deg, " + list.join(',') + ")";
        } catch (e) {

        }
        return style; // JSON.stringify(style);
    }
    selectSunbed(li) {


        if (li.locked) {
            return;
        }
        li.selected = !li.selected;

        this.atLeastOneUmbrella();
        this.calcDiscountPer();

    }
    resetStatus(clearStatus = false) {
        let sConfigs = this.sideConfigs;
        let sides = this.sides;
        let eleList = this.getDetails();

        for (let i = 0; i < sides.length; i++) {
            let sideName = sides[i], // left or right
                sideList = sConfigs[sideName],
                list = eleList[sideName];
            if (!(sideList && sideList.length && list && list.length)) {
                continue;
            }
            for (let j = 0; j < sideList.length; j++) {
                let side = sideList[j]; // a or b
                for (let k = 0; k < list.length; k++) {
                    let li = list[k];
                    if (clearStatus) {
                        li.statusList = [];
                        // li.status_color = [];
                    }
                    li.selected = false;
                }
            }
        }
    }

    onDiscountValueChanged($event) {

    }

    isFormValid() {
        let resv = this.singleReserve;
        let valid = true;
        if (!(!resv.created_for_phone || resv.created_for_phone == '0' || (resv.created_for_phone && resv.created_for_phone.length >= 3))) {
            valid = false;
        }
        return valid;
    }
    // the issue is in this function
    isSelectionChanged() {

        let changed = false;
        let sConfigs = this.sideConfigs;
        let sides = this.sides;
        let eleList = this.getDetails();

        let seatSlot = this.singleReserve.seat.slots;
        let reservation_id = this.singleReserve.id;


        if (!reservation_id) {

            return changed;
        }
        if (this.checkedExtraSeat !== this.singleReserve.seat.extra_seats) {
            changed = true;
        }

        try {
            let cur = this.currentSelectedReservation;

            let phoneOld = cur.by_phone || cur.phone || cur.created_for_phone || '',
                phoneNew = this.singleReserve.created_for_phone || '',
                nameOld = cur.for || cur.by || cur.created_for_name || '',
                nameNew = this.singleReserve.created_for_name || '',
                nameList = nameOld.split(" / ");
            // if(cur.for != ""){
            //     this.phoneNameFound = true;
            // }
            if (nameList[0]) {
                nameOld = nameList[0];
            }
            if (nameList[1]) {
                phoneOld = nameList[1];
            }
            // if (cur.by_name) {
            //     nameOld = cur.by_name;
            // }
            // if (cur.by_number) {
            //     phoneOld = cur.by_number;
            // }
            if (phoneOld[0] == '+') {
                phoneOld = phoneOld.substr(1, phoneOld.length - 1);
            }
            if (phoneOld !== phoneNew || nameOld !== nameNew) {
                //changed = true;
            }
        } catch (e) {

        }
        if (!sides) {

            return changed;
        }

        for (let i = 0; i < sides.length; i++) {
            let side = sides[i];
            let sideNameList = sConfigs[side];
            let list = eleList[side];

            if (!sideNameList) {
                continue;
            } else if (side == 'center') {
                sideNameList = [Object.keys(seatSlot)[0]];
            }
            for (let j = 0; j < sideNameList.length; j++) {
                let sideName = sideNameList[j]; // a b c 
                if (!list) {
                    continue;
                }
                for (let k = 0; k < list.length; k++) {
                    let li = list[k];
                    if (li.selected) {
                        if (!(seatSlot[sideName] && seatSlot[sideName][k])) {
                            changed = true;

                        }
                    } else {
                        if ((seatSlot[sideName] && seatSlot[sideName][k])) {
                            changed = true;

                        }
                    }
                }
            }
        }

        return changed;
    }
    getSelectedSlots() {
        let slots = {};
        let sConfigs = this.sideConfigs;
        let seatInfo = this.seatInfo,
            status_color = seatInfo.status_color;
        let sides = this.sides;
        let eleList = this.getDetails();
        for (let i = 0; i < sides.length; i++) {
            let sideName = sides[i], // left or right
                sideList = sConfigs[sideName],
                list = eleList[sideName];

            if (!(sideList && sideList.length && list && list.length)) {
                continue;
            }
            for (let j = 0; j < sideList.length; j++) {
                let side = sideList[j]; // a or b
                if (!status_color[side]) {
                    continue;
                }
                if (!slots[side]) {
                    slots[side] = [];
                }
                for (let k = 0; k < list.length; k++) {
                    let li = list[k];
                    let value = (li.selected) ? 1 : 0;
                    slots[side].push(value);
                }
            }
        }
        Object.keys(slots).map((side) => {
            let valid = false;
            for (let i = 0; i < slots[side].length; i++) {
                if (slots[side][i]) {
                    valid = true;
                    break;
                }
            }
            if (!valid) {
                slots[side] = [];
            }
        });

        return slots;
    }

    reloadMainGrid() {
        let that = this;
        let reloadingGridFlag = Math.random();
        this.reloadingGridFlag = reloadingGridFlag;
        setTimeout(() => {
            if (that.reloadingGridFlag == reloadingGridFlag) {

                this.ev.publish("grid:updateItem", this.seatInfo);
            } else {

            }
        }, 100);
    }
    updateStatus() {
        if (this.firstPopup < 2) {
            this.resetStatus(true); //vladimir

        }
        this.firstPopup++;
        let sConfigs = this.sideConfigs;
        let statuses = this.seatInfo.status;
        let sides = this.sides;
        let eleList = this.getDetails();
        let seatSlot = this.singleReserve.seat.slots;
        window['beach'] = {
            sConfigs, statuses, sides, eleList, seatSlot, singleReserve: this.singleReserve, date: new Date()
        };


        /*let sConfigs = window['sConfigs'];
        let statuses = window['statuses'];
        let sides = window['sides'];
        let eleList = window['eleList'];*/

        for (let i = 0; i < sides.length; i++) {
            let sideName = sides[i], // left or right
                sideList = sConfigs[sideName],
                list = eleList[sideName];
            if (!(sideList && sideList.length && list && list.length)) {
                continue;
            }
            for (let j = 0; j < sideList.length; j++) {
                let side = sideList[j]; // a or b
                for (let k = 0; k < list.length; k++) {
                    let li = list[k];
                    if (!li.statusList) {
                        li.statusList = [];
                    }
                    for (let l = 0; l < statuses.length; l++) {
                        let status = statuses[l];

                        if (status && status[side] && status[side][k] && li.statusList.indexOf(status[side][k]) == -1) {
                            li.statusList.push(status[side][k]);
                            if (status[side][k] !== 'available') {
                                if (seatSlot[side] && seatSlot[side][k]) {
                                    li.selected = true;
                                    li.locked = false;
                                    li.statusList = [];
                                } else if (!li.selected) {
                                    li.locked = true;

                                } else {
                                    li.locked = false;
                                }

                            } else {
                                li.locked = false;
                            }
                        } else {


                        }
                    }
                }
            }

        }

        window['eleList'] = eleList;
        /* for (let i = 0; i < this.sides.length; i++) {
            let side = this.sides[i];
            let list = this.eleList[side];
            let status = '';
            this.sideConfigs[side].map((sideConfig) => {
              if (!status && this.seatInfo.status[sideConfig] && this.seatInfo.status[sideConfig].length) {
                status = sideConfig;
              }
            });
            let statuses = this.seatInfo.status[status];
            for (let j = 0; j < list.length; j++) {
              let li = list[j];
              li.status = statuses[j];
              if (li.status && li.status != 'available') {
                this.bookingStatus[side] = true;
              }
            }
        } */
        this.reloadMainGrid(); this.changeDetectorRef.markForCheck();

    }
    isSideFree(side) {
        let free = true;
        try {
            let slots = this.seatInfo.status || [];

            for (let j = 0; j < slots.length; j++) {
                let slot = slots[j];
                if (!(slot && slot[side])) {
                    continue;
                }
                let list = slot[side] || [];
                for (let i = 0; i < list.length; i++) {
                    let li = list[i];
                    if (li !== 'available') {
                        free = false;
                        return free;
                    }
                }
            }

        } catch (e) {

        }
        return free;
    }
    isSideSeatFree(side) {

        let free = false;
        try {
            let slots = this.seatInfo.status || [];

            for (let j = 0; j < slots.length; j++) {
                let slot = slots[j];
                if (!(slot && slot[side])) {
                    continue;
                }
                let list = slot[side] || [];
                for (let i = 0; i < list.length; i++) {
                    let li = list[i];
                    if (li == 'available') {
                        free = true;
                        return free;
                    }
                }
            }

        } catch (e) {

        }

        return free;
    }
    isSeatInOtherReservation(reservation, side) {
        let free = true;
        try {
            let reservations = this.seatInfo.reservations || [];
            let slots = this.seatInfo.slots || [];
            for (let i = 0; i < slots.length; i++) {
                let slot = slots[i];
                let list = slot[side] || [];
                for (let j = 0; j < list.length; j++) {
                    if (list[j] !== 'available') {
                        free = false;
                        return free;
                    }
                }
            }
        } catch (e) {

        }
        return free;
    }

    canSeatSide(sideName) {

        try {

            let reservation_id = this.singleReserve.id || '';
            let seatSlot = this.singleReserve.seat.slots;
            let reservations = this.seatInfo.reservations || [];
            let slots = this.seatInfo.status || [];
            let canSeatObject = {
            };
            let canSeat = true;
            let sideConfigs = this.sideConfigs,
                sides = sideConfigs[sideName] || [];
            let sidesList = [];

            if (!reservation_id) {
                for (let i = 0; i < sides.length; i++) {
                    let side = sides[i];
                    canSeatObject[side] = this.isSideFree(side) || "";
                }

            } else {

                for (let j = 0; j < sides.length; j++) {
                    let side = sides[j];
                    canSeatObject[side] = true;
                    if (!seatSlot[side]) {

                    }
                    try {
                        if (eval([0].concat(seatSlot[side] || []).join("+")) > 0) {
                            sidesList.push(side);
                        }
                    } catch (e) {
                    }
                    if (!seatSlot[side] || !seatSlot[side].length) {
                        canSeatObject[side] = this.isSideFree(side);
                    }
                }
                if (reservations && reservations.length) {
                    for (let i = 0; i < reservations.length; i++) {
                        let reservation = reservations[i];
                        if (reservation !== reservation_id) {
                            let slot = slots[i];
                            if (!slot) {
                                continue;
                            }
                            for (let j = 0; j < sides.length; j++) {
                                let side = sides[j];
                                let list = seatSlot[side] || [];
                                if (sidesList.indexOf(side) > -1) {
                                    if (canSeatObject[side]) {
                                        // canSeatObject[side] = this.isSideSeatFree(side);
                                    }
                                } else {
                                    if (canSeatObject[side]) {
                                        canSeatObject[side] = this.isSideFree(side);
                                    }
                                }
                                /* let list = slot[side];
                                 for (let k = 0; k < list.length; k++) {
                                     if(list[k]!=='available') {
                                         canSeatObject[side] = false;
                                     }
                                 }    */

                            }
                        }
                    }
                }

            }

            Object.keys(canSeatObject).map((cObj) => {
                if (!canSeatObject[cObj]) {
                    canSeat = false;
                }
            });


            return canSeat;

        } catch (e) {

            return false;
        }
    }

    canSeatSide2(side) {
        try {

            let sideConfigs = this.sideConfigs,
                canSeat = true,
                sides = sideConfigs[side],
                slots = this.seatInfo.slots,
                canSeatObj = this.seatInfo.can_seat_obj;
            sides.map((sideName) => {
                canSeat = canSeat && canSeatObj[sideName];
            });
            return canSeat;

        } catch (e) {
            return false;
        }
    }
    initSingleReservation() {

        this.singleReserve = {
            amount: 0,
            old_amount: 0,
            status: '',
            created_by: '',
            created_for_name: '',
            created_for_id: '',
            created_for_phone: '',
            id: '',
            name: '',
            payment_method: '',
            period: [],
            phone: null,
            released_days: [],
            seat: {
                extra_seats: 0,
                number: 0,
                position: { x: 0, y: 0 },
                slots: { a: [], b: [] },
                type: '',
                zone: ''
            }
        };

        this.selectedReserveStatus.status = '';
        this.selectedReserveStatus.payment_method = '';

        this.newReservation = undefined;
        this.pageState.compState = false;

        if (this.pageState.kind === 'sunbed') {
            this.selectExtraSeats(0);
        }

    }

    ionViewWillEnter() {


        if (this.pageState.action != 'listing') return;
        if (this.pageState.isNew && this.pageState.isDetail) return;

        this.pageState.isDetail = false;
        this.pageState.isNew = false;

        console.log("123456 - grid  - unsubscribe");
        this.events.unsubscribe('app:notification');
        console.log("123456 - grid subscribe");
        this.events.subscribe('app:notification', ((data: Notification) => this.onNewNotification(data)));


    }

    onNewNotification(data: Notification) {
        this.ngZone.run(() => {
            if (data) {
                console.log('Notification Data:', data);
                if (this.platform.is('cordova') && data.action === 'create') {
                    this.receivedNotification();
                }
                if (this.platform.is('cordova') && data.action === 'cancel') {
                    this.receivedNotification();
                }
                if (this.platform.is('cordova') && data.action === 'release') {
                    this.receivedNotification();
                }
                this.updateStatus();
                this.refreshView();
            }
        })
    }
    receivedNotification() {
        this.nativeAudio.play('notification').then((value) => {

        }).catch(error => {
            console.error(error);
        });
        this.vibration.vibrate(1000);
    }
    ionViewDidEnter() {
        this.storage.get('no_price').then((val) => {
            this.noprice = val;
        });
        //this.noprice = this.navParams.data.no_price;

        // Dont change view after position is changed (UPDATE BUTTON PRESSED)
        // if ( this.pageState.action != 'pos-change' ) {
        //   this.pageState.action = 'listing';
        // }
        let kind = this.pageState.kind;
        this.pageState.kind = this.isFreeSunbed ? 'sunbed' : ((typeof this.seatInfo != 'undefined') ? this.seatInfo.type : '');
        if (kind !== this.pageState.kind) {

        }
        // // Update parent view
        // this.changeModalState({action: this.pageState.action});

        if (this.platform.is('android') || this.platform.is('ios')) {
            // this.keyboard.disableScroll(true);
        }

    }

    ionViewDidLeave() {
        this.pageState.compState = true;
        this.currentSelectedReservation = undefined;
        this.getAllGuestCodes();
        if (this.platform.is('android') || this.platform.is('ios')) {
            // this.keyboard.disableScroll(false);
        }
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
                    }
                }
            ],
            enableBackdropDismiss: false,
        });
        this.confirmPopover.present();

        return this.confirmPopover;
    }

    emit(data) {

        if (data) {

            if (data.refreshListing) {

                if (this.pageState.kind !== 'sunbed') {

                    this.listingPageData({
                        beach_id: this.common.getStorageItem('beach_id'),
                        seat_number: data.number,
                        reservations: data.reservations
                    }).subscribe(newData => {

                        const colorMap = { booked: '#a82fab', occupied: '#000000', paid: '#f40006', 'change-request': '#54fe62' };

                        newData = newData.map(item => {

                            item.status_color = item.payment_method === 'online' && item.status === 'booked' ? colorMap['paid'] : colorMap[item.status];
                            return item;

                        });

                        this.ngZone.run(() => {
                            this.reservationAry = newData;
                        });

                    }, err => { });

                } else {

                    let { items, count, price } = data;

                    this.freeSunbedsData.price = price;
                    this.freeSunbedsData.count = count;
                    this.freeSunbedsData.old_count = 0;

                    const colorMap = { booked: '#a82fab', occupied: '#000000', paid: '#f40006', 'change-request': '#54fe62' };

                    items = items.map(item => {

                        item.status_color = item.payment_method === 'online' && item.status === 'booked' ? colorMap['paid'] : colorMap[item.status];
                        return item;

                    });

                    this.ngZone.run(() => {
                        this.reservationAry = items;
                    });

                }

            } else {

                if (!data.switchToListingPage) {

                    if (this.pageState.action === 'reservation' || this.pageState.action === 'add') {

                        if (this.pageState.action === 'reservation') {

                            // RESERVATION PAGE

                            this.ngZone.run(() => {

                                if (this.pageState.kind !== 'sunbed') {

                                    if (data.reservation_id === data.updated_id) {

                                        if (data.reservation_status !== 'booked' || data.reservation_status !== 'active') {

                                            let message = { expired: 'Messages.EXPIRED', canceled: 'Messages.CANCELED', completed: 'Messages.COMPLETED' };

                                            if (typeof message[data.reservation_status] !== 'undefined') {

                                                this.api.AmError(
                                                    this.config.translate.translate.instant('Components.INFO'),
                                                    this.config.translate.translate.instant(message[data.reservation_status]),
                                                    [{
                                                        text: this.config.translate.translate.instant('Buttons.OK'),
                                                        handler: () => {
                                                            this.close();
                                                        }
                                                    }]
                                                );

                                            } else {

                                                // Change request
                                                this.api.AmError(
                                                    this.config.translate.translate.instant('Components.INFO'),
                                                    this.config.translate.translate.instant('Messages.CHANGE_REQUEST'),
                                                    [{
                                                        text: this.config.translate.translate.instant('Buttons.OK'),
                                                        handler: () => {
                                                            this.listingPage();
                                                        }

                                                    }]);

                                            }

                                        } else {



                                            this.availableSeat = data.canSeat;
                                            // this.seatInfo.available_seat = data.canSeat;

                                        }

                                    } else {
                                        this.availableSeat = data.canSeat;
                                    }

                                } else {

                                    if (data.reservation_id === data.updated_id) {

                                        let message = { expire: 'Messages.EXPIRED', cancel: 'Messages.CANCELED', complete: 'Messages.COMPLETED' };

                                        if (typeof message[data.action] !== 'undefined') {

                                            this.api.AmError(
                                                this.config.translate.translate.instant('Components.INFO'),
                                                this.config.translate.translate.instant(message[data.action]),
                                                [{
                                                    text: this.config.translate.translate.instant('Buttons.OK'),
                                                    handler: () => {
                                                        this.close();
                                                    }
                                                }]
                                            );

                                        } else {
                                            this.updateBedsNum(data);
                                        }

                                    } else {
                                        this.updateBedsNum(data);
                                    }

                                }

                            });

                        } else {

                            // CREATE RESERVATION

                            if (data.type === 'umbrella' || data.type === 'baldaquin') {

                                if (!data.canSeat.status) {

                                    if (this.singleReserve && this.singleReserve.id && this.singleReserve.id !== '') {

                                        let slots = [];
                                        const selectedSlotsLength = this.newSlots.a.length + this.newSlots.b.length;

                                        if (selectedSlotsLength > 0 && selectedSlotsLength < data.seats) {

                                            if (data.seats === 2) {

                                                if (this.newSlots.a.length) {
                                                    slots.push(0);
                                                }

                                                if (this.newSlots.b.length) {
                                                    slots.push(1);
                                                }

                                            } else if (data.seats === 4) {

                                                if (this.newSlots.a.length) {

                                                    slots.push(0);
                                                    slots.push(1);

                                                }

                                                if (this.newSlots.b.length) {

                                                    slots.push(2);
                                                    slots.push(3);

                                                }

                                            }

                                            if (slots.length) {

                                                this.ngZone.run(() => {
                                                    this.availableSeat = { status: true, data: slots };
                                                });

                                            }

                                        } else {

                                            this.ngZone.run(() => {
                                                this.availableSeat = data.canSeat;
                                            });

                                        }

                                    } else {

                                        this.ngZone.run(() => {

                                            this.availableSeat = data.canSeat;

                                            this.api.AmError(
                                                this.config.translate.translate.instant('Components.INFO'),
                                                this.config.translate.translate.instant('Messages.BOOKED_UMBRELLA'),
                                                [{
                                                    text: this.config.translate.translate.instant('Buttons.OK'),
                                                    handler: () => {
                                                        this.close();
                                                    }
                                                }]
                                            );

                                        });

                                    }

                                } else {

                                    this.ngZone.run(() => {
                                        this.availableSeat = data.canSeat;
                                    });

                                }

                            } else if (data.type === 'sunbed') {

                                this.ngZone.run(() => {

                                    // If we made a reservation already and we're ready to pay it off...
                                    if (this.singleReserve && this.singleReserve.id && this.singleReserve.id !== '') {

                                        if (this.singleReserve.id === data.updated_id) {

                                            let message = { expire: 'Messages.EXPIRED', cancel: 'Messages.CANCELED', complete: 'Messages.COMPLETED' };

                                            if (typeof message[data.action] !== 'undefined') {

                                                this.api.AmError(
                                                    this.config.translate.translate.instant('Components.INFO'),
                                                    this.config.translate.translate.instant(message[data.action]),
                                                    [{
                                                        text: this.config.translate.translate.instant('Buttons.OK'),
                                                        handler: () => {
                                                            this.close();
                                                        }
                                                    }]
                                                );

                                            } else {

                                                this.updateBedsNum(data);

                                            }

                                        } else {

                                            this.updateBedsNum(data);

                                        }

                                    } else {

                                        this.updateBedsNum(data);

                                    }

                                });

                            }

                        }

                    }

                } else {

                    if (this.pageState.kind !== 'sunbed') {

                        // Feed listing page with fresh data

                        this.listingPageData({
                            beach_id: this.common.getStorageItem('beach_id'),
                            seat_number: data.number,
                            reservations: data.reservations
                        }).subscribe(newData => {

                            const colorMap = { booked: '#a82fab', occupied: '#000000', paid: '#f40006', 'change-request': '#54fe62' };

                            newData = newData.map(item => {

                                item.status_color = item.payment_method === 'online' && item.status === 'booked' ? colorMap['paid'] : colorMap[item.status];
                                return item;

                            });

                            this.reservationAry = newData;

                            this.pageState.isDetail = false;
                            this.pageState.isNew = false;
                            this.pageState.action = 'listing';

                            delete data.switchToListingPage;

                            // Update parent view
                            this.changeModalState({ action: this.pageState.action, kind: this.pageState.kind });
                            this.updateStatus();
                            this.refreshView();
                        }, err => { });

                    } else {

                        this.initSingleReservation();

                        let { items, count, price } = data;

                        this.freeSunbedsData.price = price;
                        this.freeSunbedsData.count = count;
                        this.freeSunbedsData.old_count = 0;

                        const colorMap = { booked: '#a82fab', occupied: '#000000', paid: '#f40006', 'change-request': '#54fe62' };

                        items = items.map(item => {

                            item.status_color = item.payment_method === 'online' && item.status === 'booked' ? colorMap['paid'] : colorMap[item.status];
                            return item;

                        });

                        this.reservationAry = items;

                        this.pageState.isDetail = false;
                        this.pageState.isNew = false;
                        this.pageState.action = 'listing';

                        delete data.switchToListingPage;

                        // Update parent view
                        this.changeModalState({ action: this.pageState.action, kind: this.pageState.kind });

                    }

                }

            }

        }

    }

    updateBedsNum(data) {

        const isReservation = this.singleReserve && this.singleReserve.id && this.singleReserve.id !== '';
        const countLoop = isReservation ? (this.checkedExtraSeat + data.count) : data.count;

        let bedNum = [];

        for (let i = 1; i <= countLoop; i++) {
            bedNum.push(i);
        }

        this.bedNum = bedNum.length > 8 ? bedNum.slice(0, 8) : bedNum;

        this.freeSunbedsData.count = data.count;

        if (isReservation) {

            // if ( !this.freeSunbedsData.old_count ) {
            //   this.freeSunbedsData.old_count = this.checkedExtraSeat;
            // }

            // this.freeSunbedsData.old_remaining = data.count;

            // ...
            if (data.reservation_id === data.updated_id && data.action === 'update') {

                if (this.singleReserve.status === 'booked') {

                    this.selectExtraSeats(data.new_count);

                } else if (this.singleReserve.status === 'active') {

                    this.api.AmError(
                        this.config.translate.translate.instant('Components.INFO'),
                        this.config.translate.translate.instant('Messages.SUNBEDS_MODIFIED'),
                        [{
                            text: this.config.translate.translate.instant('Buttons.OK'),
                            handler: () => {
                                this.listingPage();
                            }
                        }]
                    );

                }

            }

        } else {

            this.selectExtraSeats(0);

            this.freeSunbedsData.old_amount = data.count;
            this.freeSunbedsData.count = data.count;

        }

    }
    onClickBackBtn() {
        this.listingPage();
        setTimeout(() => {
            this.pageState.isDetail = false;

            this.refreshView();
        }, 300);
    }

    listingPage() {
        let that = this;
        this.ionViewDidLeave();

        // if ( this.pageState.kind === 'sunbed' ) {

        // if ( !this.singleReserve.id && this.checkedExtraSeat > 0 ) {
        //   this.selectExtraSeats(0);
        // } else if ( this.singleReserve.id ) {
        //   this.selectExtraSeats(this.singleReserve.seat['count']);
        // }

        // }
        this.refreshReservation();
        // this.changeModalState(); // get fresh data (reservations) for current seat from parent view

        this.refreshView();

    }

    listingPageData(param: any) {
        if (!param.seat_number) {
            param.seat_number = this.seatInfo.number
        }
        if (!param.reservations) {
            param.reservations = this.seatInfo.reservations
        }
        return this.api.post('seat/reservations', param, { 'Content-Type': 'application/json' }, true, false);
    }

    // Popup Events  ------------------------------
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

    itemClick(item: any, isDetailedPeriod = false, avoidReloadGuestCode?: boolean) {

        if (item.acceptable && item.status === 'pending') return;

        if (item.status === 'change-request') {
            item.clicked = !item.clicked;
        } else if (item.status === 'pending' || item.status === 'booked' || item.status === 'active') {
            setTimeout(() => {
                this.showDetail(item, isDetailedPeriod, avoidReloadGuestCode);
            }, 300);
        }

    }

    accept(item: any) {
        this.api.post('booking/accept', { id: item.id }, {}, true).subscribe((resp) => {
            item.acceptable = false;
            this.itemClick(item);

        }, (err: any) => {
            item.acceptable = false;

        });
    }

    cancel(item: any) {
        // this.ev.publish("grid:reloadGrid", this.gridReloadParams);
        this.api.post('booking/cancel', { id: item.id, block: true }, {}, true).subscribe(() => {
            this.reservationAry.forEach((reservation, index) => {
                if (item.id === reservation.id) {

                }
                //this.changeModalState();
            });
            //this.ev.publish("grid:reloadGrid", '');

            //this.refreshView();

            this.close();
        });
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

    prepareEndpoint(item, to_confirm): { segment: string, payload: Object } {

        let endPoints = {
            change_request_confirm: {
                segment: "position",
                payload: {
                    id: item.id,
                    change: true
                }
            },
            change_request_reject: {
                segment: "position",
                payload: {
                    id: item.id,
                    change: false
                }
            },
            view_change: {
                segment: "view/" + item.reservation_id,
                payload: {
                    id: item.id,
                }
            },
            payoff: {
                segment: "pay",
                payload: {
                    id: item.id,
                }
            },
            confirm: {
                segment: "pay",
                payload: {
                    id: item.id,
                }
            },
            cancel: {
                segment: "cancel",
                payload: {
                    id: item.id,
                }
            },
            release_all: {
                segment: "release",
                payload: {
                    id: item.id,
                    days: this.generateDays(this.tools.getFormattedDateStr(item.period.start), this.tools.getFormattedDateStr(item.period.end))
                }
            }
        }

        return endPoints[to_confirm];
    }

    confirmPosition(item, to_confirm, evt?) {
        console.log('confirm.position');

        if (evt) {
            evt.stopPropagation();
        }

        if (to_confirm !== 'later') {
            if (to_confirm === 'view_change') {
                let endPoint = this.prepareEndpoint(item, to_confirm);
                this.confirmPositionRequestHandler(endPoint, item)
            }
            else if (to_confirm === 'payoff-skip-confirm') {
                let endPoint = this.prepareEndpoint(item, 'payoff');
                this.confirmPositionRequestHandler(endPoint, item)
            }
            else {
                let endPoint = this.prepareEndpoint(item, to_confirm);
                this.showConfirm().onDidDismiss((data, role) => {
                    if (role === 'ok') {
                        // this.loading();
                        this.confirmPositionRequestHandler(endPoint, item)
                    }
                })
            }

        } else {
            item.clicked = false;
        }

    }

    confirmPositionRequestHandler(endPoint, item) {
        this.api.post(`booking/` + endPoint.segment, endPoint.payload, { 'Content-Type': 'application/json' }, true, false).subscribe(res => {

            //this.pageState.action = 'listing';
            //  this.close(false);


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

    pastReservationIntervalHandler(start_date: string, end_date: string): { start_date: string, end_date: string } {
        let now = new Date();

        let newStartDate;
        let newEndDate;

        let isStartDatePast = now.getDate() > new Date(start_date).getDate();

        if (isStartDatePast) {
            newStartDate = this.tools.getFormattedDate(now)
            newEndDate = start_date === end_date ? this.tools.getFormattedDate(now) : end_date;
        }
        else {
            newStartDate = start_date
            newEndDate = end_date
        }

        return { start_date: newStartDate, end_date: newEndDate }
    }
    editProtocolBooking(nameInputRef: any) {

    }
    getAllGuestCodes() {
        const that = this;
        let reservation = this.currentSelectedReservation;
        let broker_id = '';
        if (!reservation) {
            reservation = this.latestrresponse;
        }
        if (!reservation) {
            return '';
        }
        if (!reservation.broker_id) {
            broker_id = reservation.created_for_id;
        } else {
            broker_id = reservation.broker_id;
        }
        this.api.post('get-code-list', {
            reservation_id: reservation.id,
            broker_id: broker_id
        }, {
                'Content-Type': 'application/json'
            }, true, false).subscribe((res: any) => {
                if (res.codes && res.codes.length) {
                    that.guestCodes = res.codes;
                } else {
                    that.guestCodes = [];
                }
                that.refreshView();
            }, (err: any) => {
                that.guestCodes = [];
                that.refreshView();
            });
    }
    onClickGetCode() {
        let reservation = this.currentSelectedReservation;
        if (!reservation) {
            reservation = this.latestrresponse;
        }
        let reservation_id = reservation.id;
        let broker_id = '';
        if (!reservation.broker_id) {
            let broker_id = reservation.created_for_id;
        } else {
            let broker_id = reservation.broker_id;
        }
        this.api.post('get-new-code', {
            reservation_id,
            broker_id
        }, {
                'Content-Type': 'application/json'
            }, true, false).subscribe((res: any) => {
                if (res.created_by) {
                    reservation.broker_id = res.created_by;
                }
                console.log('on click get code');
                this.getAllGuestCodes();
            }, (err: any) => {
                console.error(err);
            });
    }

    onClickDeleteGuestCode(guestCode) {
        let guest_code_id = guestCode.id;
        this.api.post('delete-guest-code', {
            guest_code_id
        }, {
                'Content-Type': 'application/json'
            }, true, false).subscribe((res: any) => {
                console.log('onClickDeleteGuestCode');
                this.getAllGuestCodes();
            }, (err: any) => {
                console.error(err);
            });

    }
    onClickDiscount(nameInputRef: any) {
        this.isDiscountModeOn = !this.isDiscountModeOn;
        if (this.isDiscountModeOn) {
            this.isProtocolModeOn = false;
            if (nameInputRef) {
                nameInputRef._native.nativeElement.focus();
            }
        }
        if (this.isDiscountModeOn) {
            this.discountPer = '';
        }
    }
    onClickProtocol(nameInputRef: any) {
        this.isProtocolModeOn = !this.isProtocolModeOn;
        if (this.isProtocolModeOn) {
            this.isDiscountModeOn = false;
            if (nameInputRef) {
                nameInputRef._native.nativeElement.focus();
            }
        }


        // if(this.pageState.isNew){
        //   this.protocolValue = this.getSunbedTotal();
        // }
        // else if(this.isFreeSunbed){

        // }
    }

    refreshReservation(isDetailedPeriod = false) {
        let item = this.currentSelectedReservation;
        let start: any = localStorage.grid_start_date;
        let end: any = localStorage.grid_end_date;

        if (!(item && item.seat)) {
            this.changeModalState();

            return;
        }


        // let now = new Date();
        // let hours = now.getHours();
        // let minutes = now.getMinutes();
        // let seconds = now.getSeconds();
        // let parsedStart = this.pageState.period.isToday ? new Date(new Date(start).setHours(hours, minutes, seconds)).getTime() : new Date(new Date(start).setHours(0, 0, 0)).getTime();
        // let parsedEnd = new Date(new Date(end).setHours(23, 59, 59)).getTime();

        // start = this.getLocalDateTime(parsedStart)
        // end = this.getLocalDateTime(parsedEnd)


        let params: any = {};
        try {
            params = {
                start_date: start,
                end_date: end,
                sunbeds: false,
                seat_x: item.seat && item.seat.position ? item.seat.position.x : undefined,
                seat_y: item.seat && item.seat.position ? item.seat.position.y : undefined,
                index: item.seat.index,
                seat_zone: item.seat && item.seat.zone ? item.seat.zone : undefined,
                reservation_id: item.id,
                excluded_days: item.released_days_original
            }

            params.start_date = this.pageState.period.from;
            params['startDate'] = this.pageState.period.from;
            params.end_date = this.pageState.period.to;
            params['endDate'] = this.pageState.period.to;
        } catch (e) {


        }

        let res;
        let that = this;


        this.api.get(`booking/view/${this.item.id}`, {}, { 'Content-Type': 'application/json' }, true, false).switchMap(reservationRes => {

            res = reservationRes;
            if (res && res.seat) {
                that.old_phone = res.created_for_phone;
                that.old_name = res.created_for_name;

                res.info = that.getGridInfoByIndex(res.seat.zone, res.seat.index);
            }


            this.updateStatus();

            //   let preparedDate = this.pastReservationIntervalHandler(start, end);
            params.start_date = start;
            params.end_date = end;
            params.start_date = this.pageState.period.from;
            params['startDate'] = this.pageState.period.from;
            params.end_date = this.pageState.period.to;
            params['endDate'] = this.pageState.period.to;
            this.gridReloadParams = params;

            // this.ev.publish("grid:reloadGrid", params);
            console.log('refreshReserve.grid')
            return this.api.get("grid/" + this.beach_id, params, { 'Content-Type': 'application/json' }, true, false)
        }).subscribe(response => {

            let seatInfo = that.seatInfo;
            response.info = res.info;
            Object.keys(response).map((resField) => {
                that.seatInfo[resField] = response[resField];
            });
            /*that.averagePrice = res.avg_price;
            that.seatInfo.sunbed_price = res.extra_price;*/
            that.averagePrice = response.price;

            that.averagePriceOld = res.avg_price;
            that.sunbedPriceOld = res.extra_price;
            that.old_sunbed = that.countSunbedsFromSlot(res.seat.slots);
            that.old_extra_sunbed = res.seat.extra_seats;

            this.updateStatus();



            let res2 = response;
            this.changeModalState(); // get fresh data (reservations) for current seat from parent view

        }, err => { });
    }

    isProtocolSelectedReservation = false;
    isDiscountSelectedReservation = false;

    showDetail(item: any, isDetailedPeriod = false, avoidReloadGuestCodes?: boolean) {
        /* this.seatInfo.can_seat = false;
        this.refreshView();
        let me = this;
        setTimeout(() => {
            me.ev.publish('grid:reloadGrid', '');
        }, 300);
        return; */


        //  this.resetStatus();  //vladimir
        this.isNew = false;
        this.isReleaseShown = false;
        this.isProtocolModeOn = false;
        this.isDiscountModeOn = false;
        this.currentSelectedReservation = item;


        this.singleReserve.created_by = item.created_by;
        this.singleReserve.created_for_name = item.by_name;
        this.singleReserve.created_for_id = item.created_for_id;
        this.singleReserve.created_for_phone = item.by_number;
        // let number = parseInt(this.singleReserve.created_for_phone);
        // this.api.get(`booking/check/${number}`, {}, { 'Conetent-Type': 'application/json' }, true, false).subscribe(res => {
        //     this.phoneNameFound = res.customer != null;
        // }, err => {
        // });
        this.singleReserve.seat.extra_seats = 0;
        this.singleReserve.seat = item.seat;
        this.isExtraSeatsDisabled = true;
        /*if (typeof (item.avg_price) !== 'undefined') {
            this.averagePrice = item.avg_price;
        }
        if (typeof (item.extra_price) !== 'undefined') {
            this.seatInfo.sunbed_price = item.extra_price;
        }*/

        if (typeof (item.avg_price) !== 'undefined') {
            this.averagePriceOld = item.avg_price;
        }
        if (typeof (item.extra_price) !== 'undefined') {
            this.sunbedPriceOld = item.extra_price;
        }
        this.old_sunbed = this.countSunbedsFromSlot(item.seat.slots);
        this.old_extra_sunbed = item.seat.extra_seats;



        this.currency = item.currency || this.common.getStorageItem('currency');;
        this.pageState.action = 'reservation';
        this.oldReservation = item.seat;

        if (!avoidReloadGuestCodes) {
            this.getAllGuestCodes();
        }

        let start: any;
        let end: any;
        if (isDetailedPeriod) {

            start = item.period && item.period.length > 0 ? this.tools.getFormattedDateStr(item.period[0].day) : this.tools.getToday();
            end = item.period && item.period.length > 0 ? this.tools.getFormattedDateStr(item.period[item.period.length - 1].day) : this.tools.getToday();
        }
        else {
            start = item.period && item.period.start ? this.tools.getFormattedDateStr(item.period.start) : this.tools.getToday();
            end = item.period && item.period.end ? this.tools.getFormattedDateStr(item.period.end) : this.tools.getToday();
        }

        // let now = new Date();
        // let hours = now.getHours();
        // let minutes = now.getMinutes();
        // let seconds = now.getSeconds();
        // let parsedStart = this.pageState.period.isToday ? new Date(new Date(start).setHours(hours, minutes, seconds)).getTime() : new Date(new Date(start).setHours(0, 0, 0)).getTime();
        // let parsedEnd = new Date(new Date(end).setHours(23, 59, 59)).getTime();

        // start = this.getLocalDateTime(parsedStart)
        // end = this.getLocalDateTime(parsedEnd)

        if (!(item && item.seat)) {


        }
        let params = {
            start_date: start,
            end_date: end,
            sunbeds: false,
            seat_x: item.seat && item.seat.position ? item.seat.position.x : undefined,
            seat_y: item.seat && item.seat.position ? item.seat.position.y : undefined,
            index: item.seat.index,
            seat_zone: item.seat && item.seat.zone ? item.seat.zone : undefined,
            reservation_id: item.id,
            excluded_days: item.released_days_original
        }

        if (!params.excluded_days || (params.excluded_days && params.excluded_days.length === 0)) {
            delete params.excluded_days;
        }

        if (!params.seat_x) {
            delete params.seat_x
        }
        if (!params.seat_y) {
            delete params.seat_y
        }
        if (!params.seat_zone) {
            delete params.seat_zone
        }

        // Update parent view
        let modalState = { action: this.pageState.action, period: { start: '', end: '' }, kind: '', reservation_id: item.id, status: '' };

        this.selectedExtraSeatsNumber = -1;
        this.isExtraSeatsDisabled = true;

        let res;
        let that = this;
        that.item = item;

        this.api.get(`booking/view/${item.id}`, {}, { 'Content-Type': 'application/json' }, true, false).switchMap(reservationRes => {
            res = reservationRes;
            if (res && res.seat) {
                this.discountPer = res.discount_per || 0;
                this.calcDiscountPer();

                /* this.averagePrice = res.avg_price;
                this.seatInfo.sunbed_price = res.extra_price; */

                this.averagePriceOld = res.avg_price;
                this.sunbedPriceOld = res.extra_price;
                this.old_sunbed = this.countSunbedsFromSlot(res.seat.slots);
                this.old_extra_sunbed = res.seat.extra_seats;

                if (typeof (res.can_seat) === 'undefined') {
                    res.can_seat = that.seatInfo.can_seat;
                }
                res.info = that.getGridInfoByIndex(res.seat.zone, res.seat.index);
                // that.seatInfo = res;
                Object.keys(res).map((resField: any) => {
                    // that.seatInfo[resField] = res[resField];
                });
            }

            this.updateStatus();


            let free_sunbeds = (res) ? res.extra_sunbeds : 0;
            this.beachSettings = res.beach_setting;
            this.bSeatNum = [];
            for (let i = 0; free_sunbeds && i < free_sunbeds; i++) {
                this.bSeatNum.push(i + 1);
            }
            if (res.protocol) {
                this.isProtocolSelectedReservation = true;
                this.isProtocolModeOn = true;
            } else {
                this.isProtocolSelectedReservation = false;
                this.isProtocolModeOn = false;
            }
            if (res.discount) {
                this.isDiscountSelectedReservation = true;
                this.isDiscountModeOn = true;
            } else {
                this.isDiscountSelectedReservation = false;
                this.isDiscountModeOn = false;
            }
            //   let preparedDate = this.pastReservationIntervalHandler(start, end);
            params.start_date = start;
            params.end_date = end;

            if (!that.pageState.period.from || !that.pageState.period.to) {

            } else {
                params.start_date = that.pageState.period.from;
                params.end_date = that.pageState.period.to;

            }

            // on show existing reservation    
            console.log('showDetail.grid')
            return this.api.get("grid/" + this.beach_id, params, { 'Content-Type': 'application/json' }, true, false)

        }).subscribe(response => {
            response.info = res.info;
            Object.keys(response).map((resp) => {
                this.seatInfo[resp] = response[resp];
            });
            // this.averagePrice = res.avg_price;
            // this.seatInfo.sunbed_price = res.extra_price;
            this.averagePriceOld = res.avg_price;
            this.sunbedPriceOld = res.extra_price;
            this.old_sunbed = this.countSunbedsFromSlot(res.seat.slots);
            this.old_extra_sunbed = res.seat.extra_seats;

            this.averagePrice = response.price;
            this.seatInfo.sunbed_price = response.sunbed_price;
            this.updateStatus();




            let res2 = response;
            this.reservationEdit = response;
            if (res && res.seat) {
                // this.isExtraSeatsDisabled = false;

                if (this.reservationEdit.slots && this.reservationEdit.number) {
                    this.ev.publish('app:gridUpdate', this.reservationEdit);
                }
                if (res.seat.type === 'sunbed') {
                    this.selectedExtraSeatsNumber = res.seat.count;
                }
                else {
                    this.selectedExtraSeatsNumber = res.seat.extra_seats || 0;
                }
            }

            // Update modal's state
            modalState.period.start = res.period[0].date;
            modalState.period.end = res.period.length > 0 ? res.period[res.period.length - 1].date : res.period[0].date;
            modalState.kind = this.pageState.kind;
            modalState.status = res.status;

            if (modalState.kind != 'sunbed') {
                modalState['seat'] = { zone: item.seat.zone, position: item.seat.position };
            }

            this.changeModalState(modalState);

            if (this.pageState.kind == 'sunbed') {

                this.setOldReleaseDays(res.released_days);
                this.releaseAry = res.released_days;
                this.singleReserve = res;
                this.singleReserve.created_for_phone = res.created_for_phone || res.phone;
                this.singleReserve.old_phone = res.created_for_phone || res.phone;
                this.singleReserve.old_name = res.created_for_name || res.name;
                this.singleReserve.created_for_name = res.created_for_name || res.name;
                this.oldAmount = parseFloat(res.old_amount);
                this.singleReserve.old_amount = parseFloat(res.old_amount);
                this.singleReserve.amount = parseFloat(res.amount);
                this.selectedReserveStatus.status = res.status;
                this.selectedReserveStatus.payment_method = res.payment_method;
                this.freeSunbedsData.old_remaining = this.freeSunbedsData.count;
                this.freeSunbedsData.old_count = res.seat.count;
                this.checkedExtraSeat = res.seat.count;

                this.seatCheckedAry = [];
                this.seatCheckedAry.push(this.singleReserve.seat['count']);

                this.refreshSunbedsCount(modalState.period);

            } else {

                this.setOldReleaseDays(res.released_days);
                this.releaseAry = res.released_days;
                this.singleReserve = res;
                this.singleReserve.created_for_phone = res.created_for_phone || res.phone;
                this.singleReserve.old_phone = res.created_for_phone || res.phone;
                this.singleReserve.created_for_name = res.created_for_name || res.name;
                this.oldAmount = parseFloat(res.old_amount);
                this.singleReserve.old_amount = parseFloat(res.old_amount);

                if (res.seat.type === 'umbrella') {

                    let slot = res.seat.slots;
                    this.newSlots = slot;
                    this.immutableSlots = JSON.parse(JSON.stringify(res.seat.slots));
                    this.immutableExtraSeats = JSON.parse(JSON.stringify(res.seat.extra_seats));

                }

                this.singleReserve.amount = parseInt(res.amount);
                this.newPosition = res.seat.position;
                this.selectedReserveStatus.status = res.status;
                this.selectedReserveStatus.payment_method = res.payment_method;

                this.checkedExtraSeat = this.singleReserve.seat.extra_seats;

                // for(let i = 0; i < this.singleReserve.seat.extra_seats; i++){
                //   this.seatCheckedAry.push(i + 1);
                // }

            }
            if (!this.singleReserve.id) {
                this.averagePrice = 0;

            }
            /*if (!this.selectedReserveStatus || (this.selectedReserveStatus && this.selectedReserveStatus.status != 'new')) {
                if (this.pageState.kind != 'sunbed') {
                    this.averagePrice = res2 && res2.price ? res2.price : this.navParams.data.seatInfo.price;



                }
                else {
                    this.averagePrice = 0;
                }
            }
            else {
                this.averagePrice = 0;
            }*/

            // ui action (show/hide)
            this.pageState.isDetail = true;
            this.pageState.isNew = false;

            this.periodAry = res.period;

        }, err => { });

    }

    countSunbedsFromSlot(slots, all = false) {
        let count = 0;
        Object.keys(slots).map((slot) => {
            if (all) {
                count += slots[slot].length;
            } else {
                count += eval([0].concat(slots[slot]).join("+"));
            }

        });
        return count;
    }
    rountItUp(price: number): number {
        return price ? Math.round(price * 100) / 100 : 0;
    }

    refreshSunbedsCount(period) {
        console.log('refreshSunbedsCount.grid');
        const url = `grid/${this.beach_id}`;

        const param = {
            start_date: period.start,
            end_date: period.end,
            sunbeds: true
        };

        this.api.get(url, param, { 'Content-Type': 'application/json' }, true, false).subscribe(sunbeds => {
            /*let free_sunbeds  = sunbeds.free_sunbeds;
            this.bSeatNum = [];
            for(let i=0; i<=free_sunbeds;i++) {
                this.bSeatNum.push(i);
            }*/
            let bedNum = [];

            for (let i = 1; i <= (this.checkedExtraSeat + sunbeds.count); i++) {
                bedNum.push(i);
            }

            if (bedNum.length > 8) bedNum = bedNum.slice(0, 8);

            this.bedNum = bedNum;

        }, err => { });

    }

    setOldReleaseDays(days: Array<string>) {
        this.oldReleaseAry = [];
        for (let i = 0; i < days.length; i++) {
            this.oldReleaseAry.push(days[i]);
        }
    }

    refreshView() {
        let that = this;
        if (that.changeDetectorRef !== null &&
            that.changeDetectorRef !== undefined &&
            !(this.changeDetectorRef as ViewRef_).destroyed) {
            that.changeDetectorRef.markForCheck();
            that.changeDetectorRef.detectChanges();
        }
    }

    addNew() {

        this.isNew = true;
        this.discountPer = 0;
        this.isReleaseShown = false;
        this.singleReserve.created_by = '';
        this.singleReserve.created_for_name = '';
        this.singleReserve.created_for_id = '';
        this.singleReserve.created_for_phone = '';
        this.singleReserve.seat.extra_seats = 0;
        this.singleReserve.old_amount = 0;
        this.isExtraSeatsDisabled = true;
        this.isDiscountModeOn = false;
        this.isProtocolModeOn = false;
        this.customValue = 0;
        this.averagePrice = this.seatInfo.avgPrice || this.seatInfo.price || 0;


        let that = this;




        // Update parent view
        let modalState = { action: 'add', period: { start: '', end: '' }, kind: '' };
        // this.resetStatus();
        this.config.getStorage('period').then(r => {

            that.currentSelectedReservation = undefined;
            that.selectedExtraSeatsNumber = -1;
            that.isExtraSeatsDisabled = true;
            that.getAllGuestCodes();
            that.pageState.period = r;
            that.pageState.isDetail = true;
            that.pageState.isNew = true;
            that.singleReserve.amount = 0;
            that.singleReserve.phone = '';
            that.singleReserve.name = '';
            that.singleReserve.id = this.seatInfo.id;
            that.singleReserve.seat.slots = { a: [], b: [] }
            that.currency = this.common.getStorageItem('currency');
            that.pageState.compState = true;
            that.availableSeat = this.seatInfo.available_seat;
            that.selectedReserveStatus.status = 'new';
            that.pageState.action = 'add';
            that.selectedReserveStatus.payment_method = '';
            that.reservationEdit = undefined;

            if (that.isNew || that.selectedReserveStatus.status == 'new') {
                if (that.isNew) {
                    that.averagePrice = that.navParams && that.navParams.data && that.navParams.data.seatInfo ? that.navParams.data.seatInfo.avgPrice : 0;
                } else {
                    that.averagePrice = that.navParams && that.navParams.data && that.navParams.data.seatInfo ? that.navParams.data.seatInfo.price : 0;
                }

            }



            // Update modal's state
            modalState.period.start = r.from;
            modalState.period.end = r.to;
            modalState.kind = this.pageState.kind;

            if (modalState.kind != 'sunbed') {
                modalState['seat'] = { zone: that.seatInfo.zone, position: that.seatInfo.coords };
            }
            that.changeModalState(modalState);

        });
        setTimeout(() => {
            if (that.changeDetectorRef !== null &&
                that.changeDetectorRef !== undefined &&
                !(this.changeDetectorRef as ViewRef_).destroyed) {
                that.changeDetectorRef.markForCheck();
                that.changeDetectorRef.detectChanges();
            }
        }, 500);
    }

    changedPhoneNumber = false;
    changePhoneNumber(newValue) {
        if (!this.reservationEdit) return;
        let old = this.singleReserve.old_phone || '';
        if (old !== newValue) {
            this.changedPhoneNumber = true;
        } else {
            this.changedPhoneNumber = false;
        }
    }
    removeFocus(ev: any, inputRef) {
        inputRef._native.nativeElement.blur()
    }

    lookUpPhone(ev: any, phoneInputRef, nameInputRef) {
        if (ev.value == '') return;
        this.api.get(`booking/check/${this.singleReserve.created_for_phone}`, {}, { 'Conetent-Type': 'application/json' }, true, false).subscribe(res => {
            this.phoneNameFound = res.customer != null;
            if (res.customer != null) {
                this.singleReserve.created_for_phone = this.regulatePhone(res.customer.phone, true);
                this.singleReserve.old_phone = this.regulatePhone(res.customer.phone, true);
                this.singleReserve.created_for_name = res.customer.name;
                this.singleReserve.created_for_id = res.customer.id;
            }
            else {
                setTimeout(function () {
                    nameInputRef.setFocus();
                }, 100);
            }
        }, err => {
            setTimeout(function () {
                nameInputRef.setFocus();
            }, 100);
        });
    }

    regulatePhone(phone: string, toGet: boolean): any {
        if (toGet) {
            let ary = phone.split('+');
            return ary[1];
        } else {
            return `+${phone}`;
        }
    }

    getSelectedFormatPeriod(r: any): Array<{ date: string, day: string }> {

        let periods: Array<{ date: string, day: string }> = [];
        let sDate = new Date(r.from);
        for (let i = 0; i < r.period; i++) {
            var dateStr = `${sDate.getFullYear()}-${this.tools.getFormatedNum(sDate.getMonth() + 1)}-${this.tools.getFormatedNum(sDate.getDate() + i + 1)}`;
            var dayStr = `${this.tools.getFormatedNum(sDate.getDate() + i + 1)}.${this.tools.getFormatedNum(sDate.getMonth() + 1)}`;
            periods.push({ date: dateStr, day: dayStr });
        }
        return periods;

    }

    // -------------------------------------------------------------------------
    // Release part

    toggleRelease() {

        this.isReleaseShown = !this.isReleaseShown;

        if (!this.isReleaseShown) {
            this.releaseAry = [];
        }

    }

    alreadyReleased(date: string) {
        return this.oldReleaseAry.indexOf(date, 0) > -1;
    }

    checkReleaseDay(item: { date: string, day: string }) {

        if (this.alreadyReleased(item.date)) return;

        let index = this.releaseAry.indexOf(item.date, 0);

        if (index > -1) {
            this.releaseAry.splice(index, 1);
        } else {
            this.releaseAry.push(item.date);
        }

    }
    isAllReleaseSelected() {
        let selected = true;
        let list = this.singleReserve.period || [];
        let list2 = this.releaseAry || [];
        list.map((li) => {
            if (list2.indexOf(li.date) == -1) {
                selected = false;
            }
        });
        return selected;
    }
    onClickCheck($event) {
        this.onAllReleaseClicked($event.checked);
    }
    onAllReleaseClicked(status = true) {
        this.releaseAry = [];
        let list = this.singleReserve.period || [];
        if (status) {
            list.map((li) => {
                this.releaseAry.push(li.date);
            });
        }
    }

    isReleaseChecked(item: { date: string, day: string }): boolean {
        var index = this.releaseAry.indexOf(item.date, 0);
        if (index > -1) {
            return false;
        } else {
            return true;
        }
    }

    isReleaseCalendarDirty() {
        return this.oldReleaseAry.length === this.releaseAry.length;
    }

    getComma(day: string) {
        var lastDay = this.singleReserve.released_days[this.singleReserve.released_days.length - 1];
        return day == lastDay ? '' : ',';
    }

    onRelease() {

        let param = {
            id: this.singleReserve.id,
            days: this.releaseAry
        }

        this.api.post('booking/release', param, { 'Content-Type': 'application/json' }, true, false).subscribe(res => {
            if (res.completed) {
                this.close();
            } else {
                this.setOldReleaseDays(this.singleReserve.status === 'active' ? this.singleReserve.released_days : this.releaseAry);
            }

        }, err => { });

    }

    isRelease(date: string) {
        for (let i = 0; i < this.periodAry.length; i++) {
            // let item = this.releaseAry.find(this.periodAry[i]);
        }
    }

    // End of Release -----------------------------------------
    // Extra sunbeds
    selectExtraSeats(item: number) {
        // if (item === 0 && this.currentSelectedReservation) return;
        if (this.checkedExtraSeat === item) {

            if (this.singleReserve && this.singleReserve.id && this.singleReserve.id !== '' && this.pageState.kind === 'sunbed') {
                return false;
            }

            this.checkedExtraSeat = 0;
            // this.singleReserve.seat.extra_seats = 0;
            this.pageState.canCreate = true;

            if (this.pageState.kind == 'sunbed') {
                this.freeSunbedsData.count = this.freeSunbedsData.old_amount === 0 ? item : this.freeSunbedsData.old_amount;
            }

        } else {

            this.checkedExtraSeat = item;

            if (this.pageState.kind != 'sunbed') {

                // this.singleReserve.seat.extra_seats = this.checkedExtraSeat ? this.checkedExtraSeat : 0;
                this.pageState.canCreate = this.checkedExtraSeat > 0

            } else {
                this.pageState.canCreate = this.checkedExtraSeat > 0

                if (this.selectedReserveStatus.status === 'active') {

                    this.freeSunbedsData.count = this.freeSunbedsData.old_amount - (this.checkedExtraSeat ? this.checkedExtraSeat : 0) + this.freeSunbedsData.old_count;

                } else {

                    if (this.singleReserve && this.singleReserve.id && this.singleReserve.id !== '') {

                        if ((this.freeSunbedsData.old_count - this.checkedExtraSeat) === 0) {
                            this.freeSunbedsData.count = this.freeSunbedsData.old_remaining;
                        } else {
                            this.freeSunbedsData.count = (this.freeSunbedsData.old_count + this.freeSunbedsData.old_remaining) - this.checkedExtraSeat;
                        }

                    } else {

                        this.freeSunbedsData.count = this.freeSunbedsData.old_amount - this.checkedExtraSeat;

                    }
                }
            }
        }
        this.calcDiscountPer();
    }

    removedExtraSunbeds = false
    isCheckedExtra(item: number) {
        if (!this.selectedSeatCount(false)) {
            this.checkedExtraSeat = 0;
            // this.singleReserve.seat.extra_seats = 0;
        }
        if (this.selectedExtraSeatsNumber === item && this.currentSelectedReservation) {
            if (this.currentSelectedReservation.status === 'active') {
                if (this.checkedExtraSeat === item) {
                    this.removedExtraSunbeds = false;
                    return 'blocked-black'
                } else {
                    this.removedExtraSunbeds = true;
                    return ''
                }
            }
            else if (
                this.currentSelectedReservation.status === 'booked' && this.currentSelectedReservation.payment_method == 'offline'
            ) {
                if (this.checkedExtraSeat === item) {
                    this.removedExtraSunbeds = false;
                    return 'blocked-magent';
                }
                else {
                    this.removedExtraSunbeds = true;
                    return '';
                }
            }
            else if (
                this.currentSelectedReservation.status === 'booked' && this.currentSelectedReservation.payment_method == 'online'
            ) {
                return 'blocked-red'
            }
            else {
                return 'blocked-black'
            }
        } else if (this.checkedExtraSeat === item) {
            return 'active'
        }
        else {
            return ''
        }

    }

    isCheckedExtraSunBeds(item: number) {
        if (this.selectedExtraSunbedsNumber === item && this.currentSelectedReservation) {
            if (this.currentSelectedReservation.status === 'active') {
                if (this.isCheckedExtraSunBedsNumber === item) {
                    this.removedExtraSunbeds = false;
                    return 'blocked-black'
                } else {
                    this.removedExtraSunbeds = true;
                    return ''
                }
            }
            else if (
                this.currentSelectedReservation.status === 'booked' && this.currentSelectedReservation.payment_method == 'offline'
            ) {
                if (this.isCheckedExtraSunBedsNumber === item) {
                    this.removedExtraSunbeds = false;
                    return 'blocked-magent';
                }
                else {
                    this.removedExtraSunbeds = true;
                    return '';
                }
            }
            else if (
                this.currentSelectedReservation.status === 'booked' && this.currentSelectedReservation.payment_method == 'online'
            ) {
                return 'blocked-red'
            }
            else {
                return 'blocked-black'
            }
        } else if (this.isCheckedExtraSunBedsNumber === item) {
            return 'active'
        }
        else {
            return ''
        }

    }

    getExtraDisable() {

        // if(this.pageState.isNew){
        //   return this.singleReserve.seat.slots.a.length + this.singleReserve.seat.slots.b.length < this.seatInfo.available_seat.data.length;
        // }else{

        // if ( this.selectedReserveStatus.status === 'change' ) {
        //   return false;
        // }

        let toDisable = this.singleReserve.seat.slots.a.length + this.singleReserve.seat.slots.b.length < this.seatInfo.seats;

        if (toDisable && this.singleReserve.seat.extra_seats > 0) {
            toDisable = false;
        }

        return toDisable;

        // }
    }

    priceDiff(): number {
        let diff = this.getPrice() - this.oldAmount;
        return diff > 0 ? diff : 0;
    }

    getPrice(include_old_amount = false): number {
        let total = 0;
        let action = this.pageState.action;
        let extraSeatNew = this.checkedExtraSeat || 0;
        let selectedSeatNew = this.selectedSeatCount() - extraSeatNew;
        let extraSeatOldOrg = this.old_extra_sunbed;
        let extraSeatOld = extraSeatOldOrg;
        let selectedSeatOld = this.old_sunbed;
        let reservation_id = this.singleReserve.id;
        let old_amount = this.singleReserve.old_amount || 0;
        let avgPriceNew = Number(this.averagePrice);
        // let avgPriceOldOrg = Number(this.averagePriceOld) || avgPriceNew;
        let avgPriceOldOrg = avgPriceNew;
        let avgPriceOld = avgPriceOldOrg;


        if (action == 'pos-change') {
            avgPriceOld = avgPriceNew;
            extraSeatOld = extraSeatNew;
        }

        let extraSunbedPriceNew = this.seatInfo.sunbed_price;
        let extraSunbedPriceOld = this.sunbedPriceOld;
        let days = (this.isNew) ? (this.pageState.period.period + 1) : (this.periodAry.length - this.releaseAry.length);
        let daysAll = days;

        let sunbedTotal = 0;
        let sunbedExtraTotal = 0;
        if (extraSeatNew > extraSeatOld) {
            sunbedExtraTotal = (extraSeatNew - extraSeatOld) * extraSunbedPriceNew + (extraSeatOld * extraSunbedPriceOld);
        } else {
            sunbedExtraTotal = extraSeatNew * extraSunbedPriceOld;
        }
        if (selectedSeatNew > selectedSeatOld) {
            sunbedTotal = (selectedSeatNew - selectedSeatOld) * avgPriceNew + (selectedSeatOld * avgPriceOld);
        }
        else {
            sunbedTotal = selectedSeatNew * avgPriceOld;
        }
        if (action == 'pos-change') {
            if (extraSeatNew > 0) {
                sunbedExtraTotal = extraSeatNew * extraSunbedPriceNew;
            } else {
                sunbedExtraTotal = extraSeatNew * extraSunbedPriceOld;
            }
        }
        total = sunbedTotal + sunbedExtraTotal;
        console.log("GET PRICE CALC:::", {
            days,
            total,
            totalAll: days * total,
            sunbedExtraTotal,
            sunbedTotal,
            extraSunbedPriceOld,
            extraSunbedPriceNew,
            avgPriceOld,
            avgPriceNew,
            extraSeatOld,
            extraSeatNew,
            selectedSeatOld,
            selectedSeatNew,
            old_amount,
            pageState: this.pageState
        });
        total = days * total;
        if (!this.isDiscountModeOn) {
            this.customValue = total;
        }
        if (reservation_id && old_amount && !include_old_amount) {
            total = total - old_amount;
        }
        let totoalPrice = (total > 0) ? this.rountItUp(total) : 0;

        if (selectedSeatNew == selectedSeatOld && !(action == 'pos-change') && sunbedExtraTotal == 0) {
            return this.singleReserve.amount;
        }
        else {
            return (total > 0) ? this.rountItUp(total) : 0;
        }

    }

    selectedSeatCount(extra = true) {
        let selectedList = [];
        let seatSlot: any = Object.assign({}, this.singleReserve.seat.slots);

        if (this.pageState.kind == 'baldaquin') {
            seatSlot = {};
            let slots = Object.keys(this.navParams.data.seatInfo.status_color || {}).map((slot) => {
                seatSlot[slot] = [1];
            });
            try {
                if (this.eleList.center[0]) {
                    this.eleList.center[0].selected = true;
                }
            } catch (e) {
                // console.error("SELECTED SEAT COUNT ERROR::", e, this.eleList);
            }
        }
        let extraSeat = (this.checkedExtraSeat) ? this.checkedExtraSeat : 0;




        let count = 0;
        let sConfigs = this.sideConfigs;
        let sides = this.sides;
        let eleList = this.getDetails();


        for (let i = 0; i < sides.length; i++) {
            let sideName = sides[i], // left or right
                sideList = sConfigs[sideName],
                list = eleList[sideName];
            if (!(sideList && sideList.length && list && list.length)) {
                continue;
            }
            if (this.isNew && !this.canSeatSide(sideName)) {

                continue;
            }
            for (let j = 0; j < sideList.length; j++) {
                let side = sideList[j]; // a or b
                for (let k = 0; k < list.length; k++) {
                    let li = list[k];
                    if (!li.selected && !li.locked) {
                        // Busy
                    } else {
                        // Free
                        if (!li.locked) {
                            selectedList.push({ li, k, side });
                            count++;
                        }
                    }
                }
                if (sideName == 'center') {
                    break;
                }
            }
        }
        if (extra) {
            return count + extraSeat;
        }
        return count;
    }


    atLeastOneUmbrella() {
        let seatSlot = this.singleReserve.seat.slots;
        let reservation_id = this.singleReserve.id;
        let sConfigs = this.sideConfigs;
        let sides = this.sides;
        let eleList = this.getDetails();



        if (reservation_id && seatSlot) {
            this.isExtraSeatsDisabled = true;
            for (let i = 0; i < sides.length; i++) {
                let sideName = sides[i], // left or right
                    sideList = sConfigs[sideName],
                    list = eleList[sideName];
                let full = true;
                if (!list.length) {
                    continue;
                }

                for (let j = 0; j < list.length; j++) {
                    let li = list[j];
                    if (!(li.selected && !li.locked)) {
                        full = false;

                    } else {

                    }
                }
                if (full) {
                    this.isExtraSeatsDisabled = false;
                    break;
                }
            }

        } else {
            for (let i = 0; i < sides.length; i++) {
                let sideName = sides[i], // left or right
                    sideList = sConfigs[sideName],
                    list = eleList[sideName];
                if (!(sideList && sideList.length && list && list.length)) {
                    continue;
                }
                if (this.isNew && !this.canSeatSide(sideName)) {
                    continue;
                }
                for (let j = 0; j < sideList.length; j++) {
                    let side = sideList[j]; // a or b
                    for (let k = 0; k < list.length; k++) {
                        let li = list[k];
                        if (!li.selected && !li.locked) {
                            if (!(reservation_id && seatSlot)) {
                                this.isExtraSeatsDisabled = true;
                            }
                            this.selectedExtraSeatsNumber = -1;
                            this.checkedExtraSeat = 0;
                            this.singleReserve.seat.extra_seats = 0;
                            this.isAnySideFullCheck();
                            return true;
                        }
                    }
                }
            }
            if (!(reservation_id && seatSlot)) {
                this.isExtraSeatsDisabled = false;
                this.isAnySideFullCheck();
            }
        }
        return false;
    }

    isAnySideFullCheck() {
        if (!this.isNew && this.isExtraSeatsDisabled) {

            this.isExtraSeatsDisabled = !this.isAnySideFull();
        }
    }

    isAnySideFull() {

        let sConfigs = this.sideConfigs;
        let sides = this.sides;
        let eleList = this.getDetails();

        for (let i = 0; i < sides.length; i++) {
            let sideName = sides[i], // left or right
                sideList = sConfigs[sideName],
                list = eleList[sideName];
            if (!(sideList && sideList.length && list && list.length)) {
                continue;
            }
            for (let j = 0; j < sideList.length; j++) {
                let side = sideList[j]; // a or b
                let booked = true;
                for (let k = 0; k < list.length; k++) {
                    let li = list[k];
                    if (!li.selected && !li.locked) {
                        booked = false;
                        break;
                    }
                }
                if (booked) {
                    return true;
                }
            }
        }
        return false;
    }

    getFormattedDay(date: string) { // "2018-05-24"
        return this.tools.getFormattedDayStr(date);
    }



    close(close = true) {
        console.log('onClose');

        if (close) {
            this.initSingleReservation();

            if (this.viewCtrl) {
                this.viewCtrl.dismiss(null, null, {
                    duration: 0,
                    animate: false
                });
            }            
        } else {
            // this.ev.publish("grid:transaction", {});

            console.log('publish.singleItemUpdate');
            this.ev.publish('grid:singleItemUpdate', {
                seatNumber: this.singleReserve.seat.number,
                seatIndex: this.singleReserve.seat.index,
                reservationId: this.singleReserve.id,
                seatZone: this.singleReserve.seat.zone
            })
        }
    }

    onSelectSeat(event: { a: Array<number>, b: Array<number> }) {

        const selectedSunbeds = (event.a.length + event.b.length);


        // this.isExtraSeatsDisabled = this.selectedReserveStatus.status == 'new' && selectedSunbeds < 1;
        if (selectedSunbeds === 0) {
            this.singleReserve.seat.extra_seats = 0;
            this.freeSunbedsData.count = 0;
            this.pageState.canCreate = false;
        }

        if (this.selectedReserveStatus.status != 'change') {

            // // Unselect extra sunbeds if the seat have at least a free sunbed
            if (selectedSunbeds < this.seatInfo.seats) {
                this.selectExtraSeats(0);
            }

        } else {
            if (selectedSunbeds === 0) {
                this.selectExtraSeats(0);
            } else {
                if (selectedSunbeds === this.seatInfo.seats) {
                    this.selectExtraSeats(this.oldExtraSeats);
                } else {
                    this.selectExtraSeats(this.checkedExtraSeat === 0 && (selectedSunbeds === this.seatInfo.seats) ? this.oldExtraSeats : this.checkedExtraSeat);
                }
            }
        }

        this.newSlots = event;

        this.pageState.canCreate = selectedSunbeds > 0;

    }
    changedCustomPrice = false

    getCustomPriceChanges() {
        if (!this.isProtocolSelectedReservation && !this.isDiscountSelectedReservation) return true;
        return !this.changedCustomPrice;
    }

    getUpdateAvailable() {
        if (this.isProtocolSelectedReservation || this.isDiscountSelectedReservation) return false;
        if (this.selectedReserveStatus.status == 'active') return true;
        if (this.singleReserve.seat.type == 'baldaquin' && this.selectedReserveStatus.status == 'booked') return false;

        let oldSunbeds = this.immutableExtraSeats;
        let oldSeats = (this.immutableSlots.a.length + this.immutableSlots.b.length);

        let newSeats = (this.singleReserve.seat.slots.a.length + this.singleReserve.seat.slots.b.length);
        let newSunbeds = this.checkedExtraSeat;

        // let updateAvailable = (oldSunbeds + oldSeats) != (newSunbeds + newSeats);
        let updateAvailable = (oldSunbeds != newSunbeds) || (oldSeats != newSeats);

        // let seats      = (this.singleReserve.seat.extra_seats === 0 ? (this.checkedExtraSeat || 0) : this.singleReserve.seat.extra_seats) + this.singleReserve.seat.slots.a.length + this.singleReserve.seat.slots.b.length;

        // return (oldSunbeds + this.oldReservation.sunbeds) < seats ? true : false;

        return updateAvailable;

    }

    getChangeAvailable() {
        if (this.changedPhoneNumber) return false;
        if (this.singleReserve.seat.type == 'baldaquin') return true;
        // return (typeof this.oldReservation.extra_sunbeds == 'undefined' ? 0 : this.oldReservation.extra_sunbeds) + this.oldReservation.sunbeds == this.singleReserve.seat.extra_seats + this.singleReserve.seat.slots.a.length + this.singleReserve.seat.slots.b.length;



        return (JSON.stringify(this.newSlots) === JSON.stringify(this.immutableSlots)) && (!this.checkedExtraSeat || (this.checkedExtraSeat && this.selectedExtraSeatsNumber === this.checkedExtraSeat))

    }

    old_action: any = false;
    onClickChangePos() {

        this.old_action = this.pageState.action;
        this.pageState.action = 'pos-change';

        let modal = this.modalCtrl.create(`page-grid`, { isModal: true, rData: this.singleReserve }, { cssClass: `gridModal` });

        modal.onDidDismiss(data => {
            // this.pageState.action = this.old_action;
        });

        modal.present();

    }


    saveChangePos = false;

    onClickConfirm() {   // Update Seat!!!!
        let param: any;
        let amountt = this.getPrice();
        param = {
            id: this.singleReserve.id,
            created_for_name: this.singleReserve.created_for_name,
            created_for_phone: this.singleReserve.created_for_phone,
            seat: {
                type: this.seatInfo.type,
                zone: this.navParams.data.seatInfo.zone,
                number: this.seatInfo.number,
                slots: this.singleReserve.seat.slots,
                new_slots: this.newSlots,
                position: this.newPosition,
                extra_seats: this.checkedExtraSeat
            },

            amount: this.selectedReserveStatus.status == 'active' ? 0 : amountt,
            old_amount: this.selectedReserveStatus.status == 'active' ? this.oldAmount + amountt : this.oldAmount,
            waiter_id: this.seatInfo.waiter && this.seatInfo.waiter['id'] ? this.seatInfo.waiter.id : null,
            avg_price: Number(this.averagePrice),
            extra_price: this.seatInfo.sunbed_price
        }
        if (this.noprice) {
            param.amount = 0;
            param.old_amount = 0;
        }
        else {

        }
        param.seat.new_slots = this.getSelectedSlots();

        if (this.selectedReserveStatus.status != 'changed') {
            // param.seat.slots = this.newSlots;
            // delete param.seat.new_slots
        }
        param.old_amount = param.old_amount
        this.singleReserve.amount = amountt;


        // param.amount = 0;
        // param.amount = param.old_amount + param.amount
        if (this.pageState.action === 'pos-change' && param.old_amount > 0) {  //vladimir

            param.old_amount = param.old_amount + param.amount
            param.seat.zone = this.posChangeZone;
            param.amount = 0;
        }
        if (this.pageState.action === 'pos-change') {
            param.waiter_id = this.seatInfo.waiter && this.seatInfo.waiter['id'] ? this.seatInfo.waiter.id : null;
        }

        if (this.saveChangePos) {
            param.seat.zone = this.posChangeZone;
        }

        if (this.isProtocolSelectedReservation) {
            // param.amount = this.customValue;
            param.amount = 0;
            param.old_amount = 0;
            param.protocol = true;
        }

        if (this.isDiscountSelectedReservation) {
            param.amount = 0;
            let disper = parseFloat(this.discountPer);
            param.old_amount = param.old_amount - param.old_amount * disper / 100;
            // param.old_amount = this.customValue;
            param.discount = true;
        }

        delete param.seat.position;
        param.seat.index = this.seatInfo.index;

        this.showConfirm().onDidDismiss((data, role) => {
            //  this.loading();
            if (role === 'ok') {

                if (this.selectedReserveStatus.status == 'active') {
                    param.amount = 0;
                }

                this.onClickConfirmRequest(param);

                if (this.pageState.action === 'pos-change') {
                    // this.selectedReserveStatus.status = 'booked';
                    this.saveChangePos = true;
                }

                this.pageState.action = 'reservation';

                if (this.isDiscountSelectedReservation) {
                    this.selectedReserveStatus.status = 'active';
                }

                setTimeout(() => {
                    this.api.get(`booking/view/${this.singleReserve.id}`, {}, { 'Content-Type': 'application/json' }, true, false).subscribe(reservationResponse => {

                        this.loading(false);
                        this.latestrresponse = reservationResponse;
                        this.singleReserve.old_amount = this.latestrresponse.old_amount;
                        this.singleReserve.amount = this.latestrresponse.amount;

                        if (reservationResponse && reservationResponse.status !== 'booked') {
                            this.getAllGuestCodes();
                        }

                        this.itemClick(reservationResponse, true, true);

                        //this.singleReserve.old_amount = parseFloat(rervationResponse.amount + rervationResponse.old_amount);
                        //this.singleReserve.amount = 0;
                    });
                }, 400);
            }
            // this.loading(false);
        })
    }

    onClickConfirmRequest(param) {
        console.log('booking/update');
        
        this.api.post(`booking/update`, param, { 'Content-Type': 'application/json' }, true, false).subscribe(res => {

            this.freeSunbedsData.old_count = this.checkedExtraSeat;
            this.freeSunbedsData.old_remaining = this.freeSunbedsData.count;

            if (this.pageState.action === 'pos-change') {
                this.pageState.action = this.old_action;

                if (this.singleReserve.status == 'active') {

                    if (this.pageState.kind === 'baldaquin') {
                        param.old_amount = param.old_amount + param.amount
                        param.amount = 0;
                    }
                    this.close(false);


                } else {

                    this.stateChangePosition.changed = true;
                    this.close(false);

                }

            } else {

                if (this.singleReserve.status === 'active') {
                    param.old_amount = param.old_amount + param.amount
                    param.amount = 0;
                    this.close(false);
                }

                if (this.singleReserve.status === 'booked') {

                    this.pageState.compState = false;

                    if (this.pageState.kind == 'sunbed') {
                        this.singleReserve.amount = param.amount;
                    }

                    if (this.pageState.kind === 'umbrella') {
                        this.oldReservation.extra_sunbeds = this.singleReserve.seat.extra_seats;
                        this.oldReservation.sunbeds = this.singleReserve.seat.slots.a.length + this.singleReserve.seat.slots.b.length;
                    }

                    this.close(false);
                }
            }
        }, err => {
            console.error(err);
        });
    }

    avail_sunbeds() {
        return (this.bSeatNum.length > 0) ? true : false;
    }


    onClickPayOff() {
        if (this.newReservation) {

            if (this.newReservation.type !== 'baldaquin') {

                if (this.newReservation.type === 'umbrella') {

                    if ((JSON.stringify(this.newReservation.slots) !== JSON.stringify(this.newSlots))
                        || (this.newReservation.extra !== this.checkedExtraSeat)) {

                        // Update reservation
                        let param: any = {
                            id: this.singleReserve.id,
                            amount: this.getPrice(),
                            old_amount: 0
                        };

                        param.seat = {
                            slots: this.newReservation.slots,
                            new_slots: this.newSlots,
                            extra_seats: this.checkedExtraSeat,
                            type: this.newReservation.type,
                            zone: this.newReservation.zone,
                            position: this.newReservation.position,
                            number: this.newReservation.number
                        };

                        this.showConfirm().onDidDismiss((data, role) => {
                            // this.loading();
                            if (role === 'ok') {

                                // let that = this;
                                // this.api.post(`booking/update`, param, { 'Content-Type': 'application/json' }, true, false).subscribe(res => {

                                // Reservation updated! Now pay it...
                                this.api.post(`booking/pay`, { id: this.singleReserve.id }, { 'Content-Type': 'application/json' }, true, false).subscribe(res => {

                                    // hide loading                                       
                                    this.selectedReserveStatus.status = 'active';
                                    let oldPrice = this.getPrice();
                                    this.singleReserve.old_amount = oldPrice || 0;
                                    this.singleReserve.amount = 0;//amount should come from DB ( = 0)

                                    this.oldAmount = this.singleReserve.old_amount;

                                    this.close(false);
                                    this.api.get(`booking/view/${this.singleReserve.id}`, {}, { 'Content-Type': 'application/json' }, true, false).subscribe(rervationResponse => {

                                        this.latestrresponse = rervationResponse;
                                        // this.itemClick(rervationResponse, true);
                                        this.loading(false);
                                        this.singleReserve.amount = rervationResponse.amount;
                                    });
                                }, err => {
                                    console.error(err);
                                });
                            }
                        })
                    } else {

                        console.log('this.pay.called1');
                        // Only pay
                        this.pay();

                    }
                }

            } else {

                // Only pay
                console.log('this.pay.called2');
                this.pay();

            }

        } else {
            // Only pay
            console.log('this.pay.called3');
            this.pay();
        }
    }

    setSelection() {
        let eleList = this.getDetails();
        let seatSlot = this.singleReserve.seat.slots;
        let sideConfigs = this.sideConfigs;
        let getSideName = function (slotname) {
            let sides = Object.keys(sideConfigs);
            for (let i = 0; i < sides.length; i++) {
                let side = sides[i];
                if (sideConfigs[side] && sideConfigs[side].indexOf(slotname) > -1) {
                    return side;
                }
            }
            return null;
        }
        Object.keys(seatSlot).map((seatName) => {
            let side = getSideName(seatName);
            if (side && eleList[side]) {
                let list = eleList[side];
                let selected = false;
                let newList = [];
                list.map((li) => {
                    let newLi = (li.selected) ? 1 : 0;
                    if (newLi) {
                        selected = true;
                    }
                    newList.push(newLi);
                });
                if (selected) {
                    seatSlot[seatName] = newList;
                } else {
                    seatSlot[seatName] = [];
                }
            }
        });
    }
    setPaid() {
        let that = this;
        that.selectedReserveStatus.status = 'active';
        that.singleReserve.status = 'active';
        let oldPrice = this.getPrice();
        this.singleReserve.old_amount = oldPrice || 0;
        this.setSelection();
        this.updateStatus();
        this.refreshView();
    }

    pay() {
        //ON PAY WITHOUT ANY UPDATE
        this.showConfirm().onDidDismiss((data, role) => {
            // this.loading();
            if (role === 'ok') {
                console.log('booking.pay');

                this.api.post(
                    `booking/pay`, { id: this.singleReserve.id },
                    { 'Content-Type': 'application/json' }, true, false).subscribe(res => {

                        // this.loading(false);
                        this.selectedReserveStatus.status = 'active';
                        // if(this.pageState.isNew){
                        let oldPrice = this.getPrice();
                        this.singleReserve.old_amount = oldPrice || 0;

                        this.oldAmount = this.singleReserve.old_amount;

                        this.close(false);
                        this.api.get(`booking/view/${this.singleReserve.id}`, {}, { 'Content-Type': 'application/json' }, true, false).subscribe(rervationResponse => {

                            // this.loading(false);
                            this.latestrresponse = rervationResponse;
                            this.singleReserve.amount = rervationResponse.amount;
                        });
                    }, err => {
                        console.error(err);
                    });
            }
            // this.loading(false);
        })
    }

    getLocalDateTime(date: number) {
        let dateObj = new Date(date);
        let hoursWithTimezone = dateObj.getHours() + ((-1) * (dateObj.getTimezoneOffset() / 60))

        return new Date(new Date(date).setHours(hoursWithTimezone)).getTime();
    }

    onCustomValueChanged(event) {
        this.customValue = parseFloat(event.value);

        if (isNaN(this.customValue)) {
            event.value = "";
            this.customValue = 0;
        } else {
            event.value = this.customValue;
        }

        this.changedCustomPrice = this.customValue != this.singleReserve.amount;
    }

    onClickReserve() { //create reservation
        let params: any = {};
        let start: any;
        let end: any;

        if (this.pageState.isNew || this.pageState.kind == 'sunbed') {
            start = new Date(this.pageState.period.from).getTime();
            end = new Date(this.pageState.period.to).getTime();
        } else {
            start = new Date(this.singleReserve.period[0].date).getTime();
            end = new Date(this.singleReserve.period[this.singleReserve.period.length - 1].date).getTime();
        }

        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        let parsedStart = this.pageState.period.isToday ? new Date(new Date(start).setHours(hours, minutes, seconds)).getTime() : new Date(new Date(start).setHours(0, 0, 0)).getTime();
        let parsedEnd = new Date(new Date(end).setHours(23, 59, 59)).getTime();

        start = this.getLocalDateTime(parsedStart)
        end = this.getLocalDateTime(parsedEnd)

        let modalState = {
            action: this.pageState.action,
            period: { start: this.pageState.period.from, end: this.pageState.period.to },
            kind: this.pageState.kind,
            reservation_id: '',
            status: 'booked'
        };

        start = start; // this.getAdjustedTime(start);
        end = end; // this.getAdjustedTime(end);

        let avgPrice = 0;
        let extPrice = 0;
        if (!this.noprice) {
            avgPrice = this.averagePrice;
            extPrice = this.seatInfo.sunbed_price;
        }
        else {
            this.averagePrice = 0;
            this.seatInfo.sunbed_price = 0;
        }
        params = {
            beach_id: this.beach_id,
            broker_id: this.seatInfo.broker_id,
            waiter_id: this.seatInfo.waiter && this.seatInfo.waiter['id'] ? this.seatInfo.waiter.id : null,
            created_for_id: this.singleReserve.created_for_id,
            created_for_name: this.singleReserve.created_for_name,
            status: "booked",
            seat: {
                type: this.seatInfo.type,
                index: this.seatInfo.index,
                zone: this.seatInfo.zone,
                number: this.seatInfo.number,
                slots: this.singleReserve.seat.slots,
                position: this.seatInfo.coords,
                extra_seats: this.checkedExtraSeat, //this.singleReserve.seat.extra_seats,
                seats_num: this.seatInfo.seats
            },
            phone: this.singleReserve.created_for_phone,
            start_date: start,
            end_date: end,
            amount: this.getPrice(),
            discount_per: this.discountPer,
            avg_price: avgPrice,
            extra_price: extPrice //ALSO FOR THIS ONE APPLY ok
        }

        delete params.seat.position;
        params.seat.slots = this.getSelectedSlots();
        params.beach_name = this.beach_name;
        params.protocol = this.isProtocolModeOn;

        params.discount = this.isDiscountModeOn;
        params.startDate = this.pageState.period.from || this.dp.transform(new Date(params.start_date), 'yyyy-MM-dd');
        params.endDate = this.pageState.period.to || this.dp.transform(new Date(params.end_date), 'yyyy-MM-dd');

        if ((this.isProtocolModeOn || this.isDiscountModeOn || this.noprice) && (this.pageState.isNew || this.isFreeSunbed)) {
            params.amount = this.customValue;
        }
        if (this.isProtocolModeOn) {
            params.amount = 0;
        }
        if (this.noprice) {
            params.amount = 0;
        }
        if (!params.seat.zone) {
            params.seat.zone = this.navParams.data.seatInfo.zone;
        }
        this.showConfirm().onDidDismiss((data, role) => {
            this.loading();

            if (role === 'ok') {

                this.pageState.isNew = false;
                this.isFreeSunbed = false;

                this.api.post('booking', params, { 'Content-Type': 'application/json' }, true, false).subscribe(res => {
                    this.singleReserve.id = res.reservation_id;

                    modalState.reservation_id = res.reservation_id;
                    this.changeModalState(modalState);

                    try {
                        this.newReservation = {
                            slots: JSON.parse(JSON.stringify(params.seat.slots)),
                            extra: JSON.parse(JSON.stringify(params.seat.extra_seats)),
                            type: params.seat.type,
                            zone: params.seat.zone,
                            position: params.seat.position,
                            // index: params.seat.index,
                            number: params.seat.number
                        };
                    } catch (e) {
                    }

                    this.pageState.compState = false;

                    this.api.get(`booking/view/${res.reservation_id}`, {}, { 'Content-Type': 'application/json' }, true, false).subscribe(rervationResponse => {
                        if (this.isProtocolModeOn) {
                            this.confirmPosition(rervationResponse, 'payoff-skip-confirm')
                            // this.isProtocolModeOn = false;
                            this.selectedReserveStatus.status = 'active';
                            this.close(false);
                            this.setPaid();
                        }
                        if (this.isDiscountModeOn) {
                            this.confirmPosition(rervationResponse, 'payoff-skip-confirm')
                            //this.isDiscountModeOn = false
                            this.selectedReserveStatus.status = 'active';
                            this.close(false);
                            this.setPaid();
                        }
                        // else {
                        this.itemClick(rervationResponse, true, true);
                        //}
                        this.isLoading = false;
                        this.loading(false);
                    });
                }, err => {
                    this.isLoading = false;

                    this.loading(false);
                    this.confirmPopover = this.alertCtrl.create({
                        title: err.message,
                        buttons: [
                            {
                                text: this.config.translate.translate.instant('Buttons.OK'),
                                role: 'cancel',
                                handler: () => {
                                }
                            }
                        ],
                        enableBackdropDismiss: false,
                    });
                    this.confirmPopover.present();
                });

            } else {
                this.loading(false);
            }
        })

    }

    onClickReserve1copy() {

        let params: any = {};
        let start: any;
        let end: any;

        if (this.pageState.isNew || this.pageState.kind == 'sunbed') {
            start = new Date(this.pageState.period.from).getTime();
            end = new Date(this.pageState.period.to).getTime();
        } else {
            start = new Date(this.singleReserve.period[0].date).getTime();
            end = new Date(this.singleReserve.period[this.singleReserve.period.length - 1].date).getTime();
        }

        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        let parsedStart = this.pageState.period.isToday ? new Date(new Date(start).setHours(hours, minutes, seconds)).getTime() : new Date(new Date(start).setHours(0, 0, 0)).getTime();
        let parsedEnd = new Date(new Date(end).setHours(23, 59, 59)).getTime();

        start = this.getLocalDateTime(parsedStart)
        end = this.getLocalDateTime(parsedEnd)

        let modalState = {
            action: this.pageState.action,
            period: { start: this.pageState.period.from, end: this.pageState.period.to },
            kind: this.pageState.kind,
            reservation_id: '',
            status: 'booked'
        };

        if (this.seatInfo.type == 'umbrella') { // If current seat is Umbrella

            params = {
                beach_id: this.beach_id,
                broker_id: this.seatInfo.broker_id,
                waiter_id: this.seatInfo.waiter && this.seatInfo.waiter['id'] ? this.seatInfo.waiter.id : null,
                created_for_id: this.singleReserve.created_for_id,
                created_for_name: this.singleReserve.created_for_name,
                status: "booked",
                seat: {
                    type: this.seatInfo.type,
                    zone: this.seatInfo.zone,
                    number: this.seatInfo.number,
                    slots: this.singleReserve.seat.slots,
                    position: this.seatInfo.coords,
                    extra_seats: this.singleReserve.seat.extra_seats,
                    seats_num: this.seatInfo.seats
                },
                phone: this.singleReserve.created_for_phone,
                start_date: start,
                end_date: end,
                amount: this.getPrice()
            }
        } else if (this.seatInfo.type == 'baldaquin') {  // If current seat is Baldaquin

            params = {
                beach_id: this.beach_id,
                broker_id: this.seatInfo.broker_id,
                waiter_id: this.seatInfo.waiter && this.seatInfo.waiter['id'] ? this.seatInfo.waiter.id : null,
                created_for_id: this.singleReserve.created_for_id,
                created_for_name: this.singleReserve.created_for_name,
                status: "booked",
                seat: {
                    type: "baldaquin",
                    zone: this.seatInfo.zone,
                    number: this.seatInfo.number,
                    position: this.seatInfo.coords
                },
                phone: this.singleReserve.created_for_phone,
                start_date: start,
                end_date: end,
                amount: this.getPrice()
            }

        } else if (this.pageState.kind == 'sunbed') {
            params = {
                beach_id: this.beach_id,
                broker_id: this.broker_id,
                waiter_id: this.seatInfo.waiter && this.seatInfo.waiter['id'] ? this.seatInfo.waiter.id : null,
                created_for_id: this.singleReserve.created_for_id,
                created_for_name: this.singleReserve.created_for_name,
                status: "booked",
                seat: {
                    type: "sunbed",
                    count: this.checkedExtraSeat
                },
                phone: this.singleReserve.created_for_phone,
                start_date: start,
                end_date: end,
                amount: this.getSunbedTotal()
            }
        }

        params.beach_name = this.beach_name;
        params.protocol = this.isProtocolModeOn;
        params.discount = this.isDiscountModeOn;

        if ((this.isProtocolModeOn || this.isDiscountModeOn) && (this.pageState.isNew || this.isFreeSunbed)) {
            params.amount = this.customValue;
            // return;
        }

        this.showConfirm().onDidDismiss((data, role) => {
            this.loading();
            if (role === 'ok') {

                this.api.post('booking', params, { 'Content-Type': 'application/json' }, true, false).subscribe(res => {

                    this.singleReserve.id = res.reservation_id;

                    modalState.reservation_id = res.reservation_id;

                    this.changeModalState(modalState);

                    if (this.pageState.kind == 'sunbed') {

                        this.newReservation = {
                            type: 'sunbed',
                            count: this.checkedExtraSeat
                        };

                        this.freeSunbedsData.old_count = this.checkedExtraSeat;
                        this.freeSunbedsData.old_remaining = this.freeSunbedsData.count;

                        this.pageState.compState = false;

                    } else {

                        if (this.pageState.kind === 'umbrella') {

                            this.newReservation = {
                                slots: JSON.parse(JSON.stringify(params.seat.slots)),
                                extra: JSON.parse(JSON.stringify(params.seat.extra_seats)),
                                type: params.seat.type,
                                zone: params.seat.zone,
                                position: params.seat.position,
                                number: params.seat.number
                            };

                        }

                        this.pageState.compState = false;

                    }

                    this.api.get(`booking/view/${res.reservation_id}`, {}, { 'Content-Type': 'application/json' }, true, false).subscribe(rervationResponse => {
                        if (this.isProtocolModeOn) {
                            this.confirmPosition(rervationResponse, 'payoff-skip-confirm')
                            //this.isProtocolModeOn = false
                            this.selectedReserveStatus.status = 'active';
                            this.close(false);
                            this.setPaid();
                        }
                        if (this.isDiscountModeOn) {
                            this.confirmPosition(rervationResponse, 'payoff-skip-confirm')
                            //this.isDiscountModeOn = false
                            this.selectedReserveStatus.status = 'active';
                            this.close(false);
                            this.setPaid();
                        }
                        else {
                            this.itemClick(rervationResponse, true);

                        }
                    })
                }, err => { });

            }
        })

    }

    onCancelReservation() {
        let param = {
            id: this.singleReserve.id
        }
        this.showConfirm().onDidDismiss((data, role) => {
            if (role === 'ok') {
                this.api.post(`booking/cancel`, param, { 'Content-Type': 'application/json' }, true, false).subscribe(res => {
                    this.close();
                    this.initSingleReservation();
                }, err => { });
            }
        })
    }

    getSunbedTotal() {

        const checkValue = this.checkedExtraSeat ? this.checkedExtraSeat : 0;

        if (this.pageState.isNew) {

            return this.freeSunbedsData.price * checkValue * (this.pageState.period.period + 1);

        } else {

            // if ( this.singleReserve.payment_method === 'online' && checkValue <= this.freeSunbedsData.old_count ) {
            //   return 0;
            // }

            // return this.freeSunbedsData.price * checkValue * this.singleReserve.period.length - this.singleReserve.old_amount;

            if ((this.singleReserve.payment_method === 'online' || this.singleReserve.status === 'active') && checkValue <= this.freeSunbedsData.old_count) {
                return this.singleReserve.amount > 0 ? this.singleReserve.amount : 0;
            }

            return this.freeSunbedsData.price * checkValue * this.singleReserve.period.length - this.singleReserve.old_amount;

        }

    }

    loading(show: boolean = true) {

        if (show) {

            this.loadingInstance = this.loadingCtrl.create({
                spinner: 'hide',
                content: this.translate.instant("Messages.PLEASE_WAIT")
            });

            this.loadingInstance.present();

        } else {
            if (this.loadingInstance) {
                this.loadingInstance.dismiss(null, null, {
                    duration: 0,
                    animate: false
                });
            }            
        }

    }

    /**
     * Enable or disable the no price toggle
     * @param event 
     */
    enableDisablePrice(event) {
        // if(this.noprice){
        //     this.pageState.isNew = true;
        // }
        // localStorage.setItem('no_price_' + this.beach_id + '_' + this.seatInfo.number, event);
        this.noprice = event;
        // localStorage.removeItem('no_price');
        //localStorage.setItem('no_price',event);

        this.storage.set('no_price', event);
    }
    appendLeadingZeroes(n) {
        if (n <= 9) {
            return "0" + n;
        }
        return n
    }
    onClickPrint() {
        let today = new Date();
        let date = this.appendLeadingZeroes(today.getDate()) + '-' + this.appendLeadingZeroes(today.getMonth() + 1) + '-' + today.getFullYear() + "  " + this.appendLeadingZeroes(today.getHours()) + ":" + this.appendLeadingZeroes(today.getMinutes());
        let printHeader = [this.beach_name, date, "----------------------------", "Guest codes"];
        today.setMinutes(today.getMinutes() + 30);
        let dateExpire = this.appendLeadingZeroes(today.getDate()) + '-' + this.appendLeadingZeroes(today.getMonth() + 1) + '-' + today.getFullYear() + "  " + this.appendLeadingZeroes(today.getHours()) + ":" + this.appendLeadingZeroes(today.getMinutes());
        let printFooter = ["These codes will expire at :", dateExpire, "----------------------------", "How to use it :", "- app name : Smart Beach", "a. download app playstore or       appstore"];
        let printFooter1 = ["b. Insert guest code and press     OK", "c. Check Beach Menu section", "d. Send your order/call waiter", "Note: Once code is validated,"];
        let printFooter2 = ["you are allow to use this code ", "only from that phone", "----------------------------", "Thank you for your choise.", "Powered by Smart Beach", "                                      "];

        printHeader.forEach((item, index) => {
            window.DatecsPrinter.printText("{br}", 'ISO-8859-1',
                function () {

                }
            );
            if (index == 0) {
                window.DatecsPrinter.printText('{center}' + item, 'ISO-8859-1',
                    function () {

                    }
                );
            }
            else {
                window.DatecsPrinter.printText(item, 'ISO-8859-1',
                    function () {

                    }
                );
            }
        });
        this.guestCodes.forEach((item, index) => {
            window.DatecsPrinter.printText("{br}", 'ISO-8859-1',
                function () {

                }
            );
            window.DatecsPrinter.printText((index + 1) + ". " + item.code, 'ISO-8859-1',
                function () {

                }
            );

        });
        printFooter.forEach((item, index) => {
            window.DatecsPrinter.printText("{br}", 'ISO-8859-1',
                function () {

                }
            );
            window.DatecsPrinter.printText(item, 'ISO-8859-1',
                function () {

                }
            );

        });
        printFooter1.forEach((item, index) => {
            window.DatecsPrinter.printText("{br}", 'ISO-8859-1',
                function () {

                }
            );
            window.DatecsPrinter.printText(item, 'ISO-8859-1',
                function () {

                }
            );

        });
        printFooter2.forEach((item, index) => {
            window.DatecsPrinter.printText("{br}", 'ISO-8859-1',
                function () {

                }
            );
            window.DatecsPrinter.printText(item, 'ISO-8859-1',
                function () {

                }
            );

        });
        window.DatecsPrinter.printText("{br}{br}", 'ISO-8859-1',
            function () {

            }
        );

    }

}
