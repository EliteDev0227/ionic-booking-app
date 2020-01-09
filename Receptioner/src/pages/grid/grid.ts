import { ViewController, AlertController, Popover } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { CustomBootstrap } from './../../app/BootstrapFirstRun';
import { ApiProvider } from './../../providers/services';
import { CommonProvider } from '../../providers/common/common';
import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, IonicPage, Events, PopoverController, Platform } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Keyboard } from '@ionic-native/keyboard';
import { Tools } from './../../providers/tools';
import { Subscription } from 'rxjs/Subscription';
import { Notification } from '../../providers/interface';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { PopUpPage } from '../include/pop-up/pop-up';
import { NativeAudio } from '@ionic-native/native-audio';
import { Vibration } from '@ionic-native/vibration';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { environment } from '../../environment/environment';
import * as moment from 'moment';


@IonicPage({
    name: 'page-grid',
    priority: 'high'
})
@Component({
    selector: 'page-grid',
    templateUrl: 'grid.html',
    providers: [DatePipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridPage {

    seatInfo: any;
    mStatusH: number = 3;
    mRatio: number = 1.58;
    mRatioH: number = 1.35;
    eW: number = 8;
    eH: number = 8 / 1.42;
    gWidth: number = 0;
    public gridScaleRatio = 0.5;
    gHeight: number = 0;
    wWidth: number = window.screen.width;
    wHeight: number = window.screen.height;
    unit: string = 'vw';
    gridunit = 'px';
    isOriChanged: boolean = true;
    fSeats: Array<any> = [];
    mSeats: Array<any> = [];
    bSeats: Array<any> = [];

    public isFreeShowState: boolean = false;
    isLoading: boolean = true;
    hasGridData: boolean = true;
    gridRes: any;
    seatData: {
        beach_id: string,
        seat_number: string,
        reservations: Array<string>,
        // end_date: string,
        // is_sunbed: boolean
    } = {
            beach_id: '',
            seat_number: '',
            reservations: []
            // end_date: '',
            // is_sunbed: false
        }

    isModal: boolean = false;
    modalInstance: any;

    modalState: any = {}; // modal popup

    oldSeatNum: number = 0;
    reserveId: string = '';
    selReserveData: any = {};
    selSeatAmount: number = 0;
    selSeatType: string = '';

    isModalLoading: boolean = false;

    private onResumeSubscription: Subscription;

    isPooling: boolean = true;

    private _selectPeriodHandler: (data: any) => void;
    private _sunbedModalHandler: () => void;

    loading = true;
    imgPath = environment.base + 'uploads/';
    ratio = 1;
    _grid: any;
    grid_sides = ['front', 'middle', 'back'];
    seat_configs = {
        sides: {
            left: ['a'],
            right: ['b'],
            center: ['m', 'n', 'o', 'x', 'y', 'z']
        },
        seats: {
            a: 'left',
            b: 'right',
            m: 'center',
            n: 'center',
            o: 'center'
        }
    }
    grid_start_date: any;
    grid_end_date: any;
    date_passed_alert = true;
    localGrid: any;
    refreshGridFlag = 0;
    changePosNumber: any;
    _PopUP: Popover;
    gridId = Math.random();

    constructor(
        private alertCtrl: AlertController,
        public navCtrl: NavController,
        private changeDetectorRef: ChangeDetectorRef,
        private ngZone: NgZone,
        private tools: Tools,
        public viewCtrl: ViewController,
        public navParams: NavParams,
        public platform: Platform,
        public api: ApiProvider,
        private common: CommonProvider,
        public config: CustomBootstrap,
        private orientation: ScreenOrientation,
        private nativeAudio: NativeAudio,
        private vibration: Vibration,
        private events: Events,
        public popoverCtrl: PopoverController,
        private keyboard: Keyboard,
        private dp: DatePipe
    ) {

        this.events.subscribe('Calendar', (_popover) => {
            //debugger
            this._PopUP = _popover;
            localStorage.setItem('SetCalendar', "true");
        })

        let that = this;

        // let alertInterval = setInterval(dpAlert, 100000);
        this._grid = {
            front: this.fSeats,
            middle: this.mSeats,
            back: this.bSeats
        };

        this.events.subscribe("grid:transaction", (val) => {
            // console.log("GRID RELOAD CALLED");
            this.isModalLoading = false;
            this.reloadGrid(true);
        });

        console.error('GRID ID', this.gridId, 'IS CREATED');

        this.events.subscribe('grid:singleItemUpdate', (p: any) => {

            console.error('published.singleItemUpdate', this.gridId);
            console.error('param', p);

            this.config.getStorage('period').then((r: any) => {
                const start_date = r.from;
                const end_date = r.to;

                const params = {
                    start_date,
                    end_date,
                    sunbeds: false,
                    index: p.seatIndex,
                    seat_zone: p.seatZone,
                    reservation_id: p.reservationId
                }

                this.config.getStorage('login').then(r => {
                    console.log('grid.grid:singleItemUpdate');

                    this.api.get(`grid/${r.beach_id}`, params, {
                        'Content-Type': 'application/json'
                    }, true, false).subscribe(data => {
                        const fullClassList = ['u_2_2', 'u_2', 'b_2'];
                        let li: any = data;

                        li.protocol = { a: [], b: [] };
                        li.discount = { a: [], b: [] };
                        li.info = this.getGridInfoById(li);
                        //Remove this fn later---->>>>>>>>
                        // console.log("INFO FOR " + li.i + " = ", li.info, li);
                        this.getColorInfo(li);
                        li.img = this.getPosImg(li);
                        li.style = this.getItemStyle(li);
                        let cls = this.getStatusClass(li);
                        li.status_class = cls;
                        li.custom_status = Object.assign(li.status);
                        li.isFull = (fullClassList.indexOf(cls) > -1) ? true : false;

                        if (li.number == this.seatData.seat_number) {
                            this.events.publish('grid:seatItemUpdated', li);
                        }

                        this.gridPartialUpdate(li);
                    });
                });
            });


        });

        this.events.subscribe("grid:updateItem", (itemInfo) => {

            this.onGridItemUpdate(itemInfo);
        });
        this.events.subscribe("grid:reloadGrid", (params: any) => {

            if (params) {
                this.onGridReload(params);
            } else {
                this.reloadGrid();
            }

        });


        platform.ready().then(() => {
            this.ngZone = new NgZone({
                enableLongStackTrace: false
            });

            this.isModal = this.navParams.get(`isModal`);
            let changePosData = this.navParams.get(`rData`);

            if (changePosData) {
                this.changePosNumber = changePosData.seat.number;
            }

            this.isFreeShowState = this.isModal;
            this.selReserveData = this.navParams.get(`rData`);

            if (typeof this.selReserveData != 'undefined' || this.selReserveData != null) {

                this.oldSeatNum = this.selReserveData['seat']['number'];
                this.reserveId = this.selReserveData['id'];
                this.selSeatType = this.selReserveData.seat.type;

                if (this.selSeatType == 'baldaquin') {
                    this.selSeatAmount = 1;
                } else {
                    let count = 0;
                    let seatList = Object.keys(this.selReserveData.seat.slots);
                    seatList.map((side) => {
                        count += this.selReserveData.seat.slots[side].length;
                    })
                    this.selSeatAmount = count + this.selReserveData.seat.extra_seats;
                }

            }

            if (platform.is('cordova')) {
                try {
                    this.orientation.lock(this.orientation.ORIENTATIONS.LANDSCAPE);
                } catch (error) {
                }

                this.nativeAudio.preloadSimple('notification', 'assets/notification.mp3').then(() => {

                }).catch(error => {
                    console.error(error);
                });

                this.onResumeSubscription = platform.resume.subscribe(() => {
                    this.isPooling = false;
                    this.initLoad();
                });

            }

        });
        // let beach_grid = JSON.parse(localStorage.beach_grid);
        // let grid_setting = JSON.parse(localStorage.grid_setting);
        // this.processGrid(beach_grid, grid_setting);
        // this.refreshView();
        // this.hasGridData = true;

        // console.log("localstorage",localStorage.beach_grid);
    }
    receivedNotification() {
        this.nativeAudio.play('notification').then((value) => {

        }).catch(error => {
            console.error(error);
        });
        this.vibration.vibrate(1000);
    }

    ionViewDidLoad() {
        this.initLoad();
    }

    ionViewWillUnload() {
        console.error('grid.ionViewWillUnload', this.gridId);
        // this.events.unsubscribe('grid:singleItemUpdate');
    }

    onGridItemUpdate(itemInfo) {
        let that = this;
        let refreshGridFlag = Math.random();

        localStorage.refreshGridFlag = refreshGridFlag;
        setTimeout(() => {
            if (localStorage.refreshGridFlag == refreshGridFlag) {
                that.gridItemUpdate(itemInfo);
            } else {

            }
        }, 10);
    }

    onGridReload(params) {
        console.log('grid.onGridReload');

        let that = this;
        let refreshGridFlag = Math.random();
        this.refreshGridFlag = refreshGridFlag;
        localStorage.refreshGridFlag = refreshGridFlag;
        setTimeout(() => {
            if (localStorage.refreshGridFlag == refreshGridFlag) {
                that.loadingGridData(params.start_date, params.end_date);

            } else {

            }
        }, 1000);
    }

    dpAlert() {
        if (!this.date_passed_alert) {
            return true;
        }
        // Date Passed Alert
        let msg = this.config.translate.translate.instant('Messages.DATE_PASSED_ALERT');
        let dpAlertbox = this.alertCtrl.create({
            title: msg,
            buttons: [{
                text: 'Ok',
                handler: () => {

                    try {
                        this.grid_start_date = this.dp.transform(new Date(), 'yyyy-MM-dd');
                        this.grid_end_date = this.dp.transform(new Date(), 'yyyy-MM-dd');

                        let selDate = {
                            from: this.grid_start_date,
                            to: this.grid_end_date,
                            period: this.tools.getPeriod(this.grid_start_date, this.grid_end_date),
                            isToday: this.tools.getToday() == this.grid_start_date ? true : false
                        };

                        this.config.setStorage('period', selDate);
                        this.loadingGridData(this.grid_start_date, this.grid_end_date, true)

                        let calenderSet = localStorage.getItem('SetCalendar');
                        //modal close
                        if (this._PopUP && !calenderSet) {
                            // this.modalState = undefined;
                            // this.modalInstance = undefined;
                            // this.isModalLoading = false;
                            this._PopUP.dismiss();
                            this._PopUP = undefined;
                        } else {
                            // selDate.isToday = true;
                            // let options = {
                            //     pickMode: 'range',
                            //     from: selDate.from,
                            //     to: selDate.to,
                            //     defaultDateRange: selDate
                            // };
                            // this.events.publish('Calendar', false);
                            let date = moment().add(0, 'days').format('Y-MM-DD');

                            const _selDate = {
                                from: date,
                                to: date,
                                period: 0,
                                isToday: false
                            }


                            this.config.setStorage('period', _selDate);


                            this._PopUP.dismiss()
                        }
                        localStorage.removeItem('SetCalendar');

                    }
                    catch (err) { }
                    let navTransition = dpAlertbox.dismiss();
                    return false;
                }
            }]
        });

        let start = this.grid_start_date;
        if (start) {
            let today = this.dp.transform(new Date(), 'yyyy-MM-dd');
            if (today > start) {
                dpAlertbox.present();
                this.date_passed_alert = false;
                return false;
            }

        }

        return true;
    }

    getGridInfo(zone, pos) {
        try {
            const grid = JSON.parse(localStorage.beach_grid);
            let li = grid[zone][pos];
            if (li.info.mapElement.list && li.info.mapElement.list[0]) {
                li.info.mapElement.list = { center: [li.info.mapElement.list[0]] };
            }
            let info = li.info;
            let list = info.mapElement.list;
            if (list && list[0]) {
                info.mapElement.list = { center: [list[0]] };
            }
            return info || null;
        } catch (e) {

            return null;
        }
    }

    getGridInfoById(item) {
        try {
            let info;
            const grid = JSON.parse(localStorage.beach_grid);
            Object.keys(grid).map((zone) => {
                let list = grid[zone];
                list.filter((li) => {
                    if (li.i == item.i) {
                        if (li.info.mapElement.list && li.info.mapElement.list[0]) {
                            li.info.mapElement.list = { center: [li.info.mapElement.list[0]] };
                        }
                        info = li.info;
                    }
                });

                // list.map((li) => {
                //     if (li.i == item.i) {
                //         if (li.info.mapElement.list && li.info.mapElement.list[0]) {
                //             li.info.mapElement.list = { center: [li.info.mapElement.list[0]] };
                //         }
                //         info = li.info;
                //     }
                // });
            });
            return info || null;
        } catch (e) {

            return null;
        }
    }

    getItemInfo(item) {
        let status = false;
        try {
            const grid = JSON.parse(localStorage.beach_grid);
            Object.keys(grid).map((zone) => {
                let list = grid[zone];
                if (list && list.length) {
                    list.map((li) => {
                        if (li.i == item.i) {
                            if (li.info.mapElement.list && li.info.mapElement.list[0]) {
                                li.info.mapElement.list = { center: [li.info.mapElement.list[0]] };
                            }
                            item.info = li.info;
                            status = true;
                        }
                    });
                }
            });
            let list = item.info.mapElement.list;
            if (list && list[0]) {
                item.info.mapElement.list = { center: [list[0]] };

            }

        } catch (e) {

        }
        return status;
    }

    getColorInfo(item) {
        if (item.type == 'static') {
            return item;
        }
        const getColorDetail = function (li, side) {

        };
        let seat_configs = this.seat_configs;
        try {

            let list = item.info.mapElement.list;
            if (list[0]) {
                console.log('item changed');
                list = { center: [list[0]] };
                item.info.mapElement.list = list;
            }
            let sides = Object.keys(list);

            for (let i = 0; i < sides.length; i++) {
                let side = sides[i];
                if (list[side] && list[side].length) {
                    for (let j = 0; j < list[side].length; j++) {
                        let li = list[side][j];
                        let status_list = [],
                            status_types = seat_configs['sides'][side];
                        for (let k = 0; k < status_types.length; k++) {
                            let status_type = status_types[k];
                            if (item.status_color[status_type] && item.status_color[status_type][j]) {
                                status_list = status_list.concat(item.status_color[status_type][j]);
                            }
                        }
                        li['status_color'] = status_list;
                        if (!li.status_color) {

                        }

                    }
                }

            }


        } catch (e) {

        }
        return item;
    }

    gridPartialUpdate(res) {
        const gridData = {
            fSeats: this.fSeats,
            mSeats: this.mSeats,
            bSeats: this.bSeats
        },
            seatNo = res.number,
            keys = Object.keys(gridData);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i], list = gridData[key];
            for (let j = 0; j < list.length; j++) {
                let li = list[j];
                if (li.number === seatNo) {
                    list[j] = Object.assign(list[j], res);
                    // li.info = this.getGridInfo(zone, j);
                    // this.changeDetectorRef.markForCheck();
                    return;
                }
            }
        }
    }

    gridItemUpdate(itemInfo) {
        this._grid = {
            front: this.fSeats,
            middle: this.mSeats,
            back: this.bSeats
        };
    }

    initLoad() {
        console.log('INIT LOAD');

        this.config.getStorage('period').then((r: any) => {
            if (r != null) {

                if (this.isModal) {

                    // Get period from reservation instead of calendar
                    let start = this.selReserveData.period[0].date,
                        end = this.selReserveData.period[this.selReserveData.period.length - 1].date;

                    this.loadingGridData(start, end, true, this.selReserveData.released_days_original);

                } else {
                    this.loadingGridData(r.from, r.to, true);
                }

            } else {

                this.config.getStorage('beach_settings').then((r: any) => {

                    const working_date_start = `${(new Date().getFullYear())}-${r.working_dates[0].start['month']}-${r.working_dates[0].start['day']}`;
                    const working_date_end = `${(new Date().getFullYear())}-${r.working_dates[0].end['month']}-${r.working_dates[0].end['day']}`;

                    const selDate = {
                        from: working_date_start,
                        to: working_date_end,
                        period: this.tools.getPeriod(working_date_start, working_date_end),
                        isToday: this.tools.getToday() == working_date_start ? true : false
                    };

                    if ((new Date(this.tools.getToday())).getTime() <= (new Date(selDate.from)).getTime()) {
                        selDate.to = selDate.from;
                    } else {
                        selDate.from = this.tools.getToday();
                        selDate.to = this.tools.getToday();
                    }

                    this.config.setStorage('period', selDate);
                    this.loadingGridData(selDate.from, selDate.to, true);
                });
            }
        });
    }

    ionViewDidEnter() {

        if (this.platform.is('android') || this.platform.is('ios')) {
            // this.keyboard.disableScroll(true);
        }
        this.initEvents();
    }

    ionViewDidLeave() {
        if (this.platform.is('android') || this.platform.is('ios')) {
            // this.keyboard.disableScroll(false);
        }
        this.events.unsubscribe('app:selectPeriod');
        this.events.unsubscribe('app:reserveSunbed');
        // this.events.unsubscribe('app:showFree');
        this.events.unsubscribe('app:reload');

        this.events.unsubscribe('app:gridUpdate');
    }

    ionViewWillEnter() {
        this.config.setPage('grid');

    }

    onNewNotification(data: Notification) {
        this.ngZone.run(() => {
            if (data) {
                // console.log('Notification Data:', data);

                if (this.platform.is('cordova') && data.action === 'create') {
                    this.receivedNotification();
                }
                if (this.platform.is('cordova') && data.action === 'cancel') {
                    this.receivedNotification();
                }
                if (this.platform.is('cordova') && data.action === 'release') {
                    this.receivedNotification();
                }
                this.reloadGrid();
            }
        })
    }

    changedFreeShowState(status) {
        this.isFreeShowState = status;
        this.selSeatType = 'free';
        this.dumpElement.nativeElement.click();
        this.refreshView();
    }

    dump = false;
    @ViewChild('dump') dumpElement;
    toggleDump() {

        this.dump = !this.dump;
    }
    initEvents() {
        this.events.subscribe('app:showFree', this.changedFreeShowState.bind(this));

        this.events.subscribe('app:reserveSunbed', () => {
            this.reloadGrid(true);
        });

        this.events.subscribe('app:reload', () => {
            this.reloadGrid();
        });
        this.events.subscribe('app:gridUpdate', this.gridPartialUpdate.bind(this));

        this._sunbedModalHandler = () => this.openSunbedsModal();
        this.events.subscribe('app:presentSunbedModal', this._sunbedModalHandler);

        this.events.publish('app:authState', false);

        // console.log("123456 - grid  - unsubscribe");
        this.events.unsubscribe('app:notification');
        // console.log("123456 - grid subscribe");
        this.events.subscribe('app:notification', ((data: Notification) => this.onNewNotification(data)));

        this._selectPeriodHandler = (data) => this.selectPeriodHandler(data);
        this.events.subscribe('app:selectPeriodMap', this._selectPeriodHandler);

        this.events.publish('app:activePage', 'grid');

    }

    selectPeriodHandler(data: any) {
        console.log('selectPeriodHandler');

        let dateObj = data.period;
        let pageNum = data.page;

        if (pageNum != 1) return;

        this.loadingGridData(dateObj.from, dateObj.to, true);
        this.poolingGrid();

    }

    // Pooling grid

    reloadGrid(loading?: boolean) {
        console.error('realod.grid');
        this.loading = true;
        this.config.getStorage('period').then((r: any) => {
            this.loadingGridData(r.from, r.to, loading ? loading : false);
            this.events.publish('app:reloadGrid', r);
        });
    }

    poolingGrid() {
        if (!this.isPooling) return;

        setTimeout(() => {
            this.config.getStorage('period').then((r: any) => {
                this.poolingGrid();
            });
        }, 50);
    }

    getJson(sunbed) {
        return JSON.stringify(sunbed || {});
    }

    //Grid Functions
    getPosImg(item) {
        let img = this.imgPath + this.seatData.beach_id + '/elements/';
        if (item.type == 'static') {
            img = item.image;
        } else {
            img += item.image;
        }
        item.img = img;
        return img;
    }

    getSizeByRatio(params) {
        let { width, height, seatGridWidth } = params;
        let ratio = this.gridScaleRatio * 100;
        width = width * 100 / ratio;
        height = height * 100 / ratio;
        if (seatGridWidth) {
            seatGridWidth = seatGridWidth * 100 / ratio;
        }
        return {
            width, height, seatGridWidth
        };
    }

    getItemStyle(item: any) {
        const seatGridCenterWidths = {
            "1": 0.6153846153846154,
            "2": 0.6185899269599711,
            "4": 0.575989194913353
        };
        let ratio = 0.13; this.ratio;
        let gridunit = 'vw'; this.gridunit;
        let style: any = {};
        const seatImgWidths = {
            /*
             "u/11+11.png": 0.9314047775586237,
             "u/1_4.png": 0.5564081163790396,
             "u/1_3.png": 0.947940947940948,
             "u/1+1.png": 0.5833333333333334,
             "u/11+111.png": 0.9379768422942285,
             "u/111+11.png": 0.9424647697693205,
             "u/11+1.png": 0.8320512820512821,
             "u/1+11.png": 0.8333333333333334
             */
        };
        try {
            let coord = item.coords;
            if (!(item.info && item.info.mapElement)) {
                this.getItemInfo(item);
            }
            let width = item.info.mapElement.size.width,
                height = item.info.mapElement.size.height;

            let img = item.image || '',
                imgSplit = img.split("/"),
                imgIndex = item.type.substr(0, 1) + "/" + imgSplit[imgSplit.length - 1];
            if (seatImgWidths[imgIndex]) {
                width *= seatImgWidths[imgIndex];
            }


            /* if (item.type == 'umbrella') {
 
                 let seatWidths = {
 
                     "3": 0.9851380010908707,
                 }
 
 
                 if (item.sides > 1 && item.info.mapElement.widthPercentage !== 100) {
                     let sgv = item.info.mapElement.seatGridWidth * 1 / this.gridScaleRatio;
                     width *= (sgv > 100) ? (100 / sgv) : (sgv / 100);
                    
                 } else if (item.sides == 1) {
                     width *= seatGridCenterWidths[item.seats];
                    
                 }
                 let seatCount = item.info.mapElement.seatCount;
                 if (seatWidths[seatCount]) {
                     console.log("CHANGED WIDTH FOR "+item.number+"; ",width, seatWidths[seatCount], item);
                     width *= seatWidths[seatCount];
                 } else {
                     console.log("ITEM", item);
                 }
             }
             if (typeof (item.info.mapElement.widthPercentage) !== 'undefined') {
                 //  width *= item.info.mapElement.widthPercentage / 100;
             } */

            let color = 'transparent';
            if (item.waiter && item.waiter.color) {
                color = item.waiter.color;
            }
            style = {
                'left': `${coord.x * ratio}${gridunit}`,
                'top': `${coord.y * ratio}${gridunit}`,
                'width': `${width * ratio}${gridunit}`,
                'height': `${height * ratio}${gridunit}`,
                'background': 'radial-gradient(transparent 60%, ' + color + ')'
            }
            let styleSunbedDiv = {
                height: "calc(" + style.height + " - 1.5vw)"

            };
            item.styleSunbedDiv = styleSunbedDiv;
            style.sunbedWidth = "calc(" + style.width + "/7)";
            style.sunbedMinWidth = "calc(1.312857vw)";
            if (item.type == 'static') {
                style.display = 'none';
            }
            item.style = style;
        } catch (e) {

        }
        return style;
    }

    getStatusClass(li) {
        let type = li.type,
            cls = type.substr(0, 1),
            getStatus = function (list) {
                let no = 1;
                for (let i = 0; i < list.length; i++) {
                    if (list[i] == 'booked' || list[i] == 'pending') {
                        no = 2;
                        break;
                    }
                }
                return '_' + no;
            };
        if (type == 'static' || !li.status) {
            return 's_0';
        }
        let keys = Object.keys(li.status);

        for (let i = 0; i < keys.length; i++) {
            let side = keys[i];
            cls += getStatus(li.status[side]);
        }
        return cls;

    }

    addCustomStatus(seat) {
        let custom = {},
            statusList = seat.status || [];
        for (let i = 0; i < statusList.length; i++) {
            let status = statusList[i],
                sides = Object.keys(status);
            for (let j = 0; j < sides.length; j++) {
                let side = sides[j];
                if (!custom[side]) {
                    custom[side] = [];
                }
            }
        }
        seat.custom_status = custom;
    }

    isValidSideList(data, side) {
        let restored = false;
        /* if (!(data.list && data.list[side] && data.list[side].length)) {
             this.getItemInfo(data.item);
             restored = true;
         }*/
        if (data.list && data.list[side] && data.list[side].length) {
            return true;
        } else {

            let num = data.item.number;
            if (restored) {

            }

            if (num > 6 && num < 11) {

                try {
                    const grid = JSON.parse(localStorage.beach_grid);
                    Object.keys(grid).map((zone) => {
                        let list = grid[zone];
                        if (list && list.length) {
                            list.map((li) => {
                                if (li.i == data.item.i) {
                                    if (li.info.mapElement.list && li.info.mapElement.list[0]) {
                                        li.info.mapElement.list = { center: [li.info.mapElement.list[0]] };
                                    }
                                    data.item.info = li.info;
                                    restored = true;

                                }
                            });
                        }
                    });
                } catch (e) {

                }

            }
            return false;
        }
    }

    private refreshTimer = null;

    refreshView() {
        if (this.refreshTimer) {
            return;
        }

        this.refreshTimer = setTimeout(() => {
            let that = this;
            let refresh_grid: any = 'Refresh:' + new Date().getTime();
            localStorage.setItem('refresh_grid', refresh_grid);

            if (localStorage.getItem('refresh_grid') == refresh_grid) {
                try {
                    that.changeDetectorRef.markForCheck();
                    that.changeDetectorRef.detectChanges();
                } catch (e) {
                }

            } else {

            }

            this.refreshTimer = null;
        }, 50);
    }

    // refreshView() {
    //     let that = this;
    //     let refresh_grid: any = 'Refresh:' + new Date().getTime();
    //     localStorage.setItem('refresh_grid', refresh_grid);

    //     setTimeout(() => {
    //         if (localStorage.getItem('refresh_grid') == refresh_grid) {
    //             try {
    //                 that.changeDetectorRef.markForCheck();
    //                 that.changeDetectorRef.detectChanges();
    //             } catch (e) {
    //             }

    //         } else {

    //         }
    //     }, 500);
    // }

    markForCheck() {
        try {
            this.changeDetectorRef.markForCheck();
        } catch (e) {

        }

    }

    checkCollision() {
        const grid = {
            front: this.fSeats,
            middle: this.mSeats,
            back: this.bSeats
        },
            getNum = function (str) {
                return parseFloat(str.replace(this.gridunit, ''));
            }.bind(this),
            getStyle = function (item) {
                let style = item.style,
                    left = getNum(style.left),
                    top = getNum(style.top),
                    width = getNum(style.width),
                    height = getNum(style.height);
                return { left, top, width, height };
            }.bind(this),
            checkPoints = function (style, point) {
                if (point > style.left && point > style.top && point < style.left + style.width && point < style.top + style.height) {
                    return true;
                }
                return false;
            }.bind(this),
            isCollide = function (style1, style2) {
                let style = Object.assign({}, { style1, style2 });
                let colide = false;
                if (checkPoints(style1, style2.top)) {
                    style2.top = style1.top + style1.height;
                    colide = true;
                }
                if (checkPoints(style1, style2.left)) {
                    style2.left = style1.left + style1.width;
                    colide = true;
                }
                if (checkPoints(style1, style2.top + style2.height)) {
                    style2.height = style1.top - style2.top;
                    colide = true;
                }
                if (checkPoints(style1, style2.left + style2.width)) {
                    style2.width = style1.left - style2.left;
                    colide = true;
                }
                if (colide) {
                    console.log("COLIDE ", style, style1, style2);
                }
                return style2;
            }.bind(this),
            checkItem = function (li) {
                let style = getStyle(li);
                Object.keys(grid).map(side => {
                    let list = grid[side];
                    list.map((item) => {
                        if (li.index !== item.index && li.style && item.style) {
                            let style2 = getStyle(item);
                            style2 = isCollide(style, style2);
                            item.style.top = style2.top + this.gridunit;
                            item.style.left = style2.left + this.gridunit;
                            item.style.width = style2.width + this.gridunit;
                            item.style.height = style2.height + this.gridunit;
                        }

                    });
                });
            }.bind(this);
        Object.keys(grid).map(side => {
            let list = grid[side];
            list.map((li) => {
                checkItem(li);
            });
        });
    }

    processGrid(seats, size) {
        try {
            let zones = Object.keys(seats);

            const fullClassList = ['u_2_2', 'u_2', 'b_2'];
            const grid = JSON.parse(localStorage.beach_grid);

            for (let i = 0; i < zones.length; i++) {
                let zone = zones[i],
                    list = seats[zone];

                list.forEach(li => {
                    li.protocol = { a: [], b: [] };
                    li.discount = { a: [], b: [] };

                    let info;
                    grid[zone].filter(lst => {
                        if (lst.i == li.i) {
                            if (lst.info.mapElement.list && lst.info.mapElement.list[0]) {
                                lst.info.mapElement.list = { center: [lst.info.mapElement.list[0]] };
                            }
                            info = lst.info;
                        }
                    });

                    li.info = info || null;
                    //Remove this fn later---->>>>>>>>
                    // console.log("INFO FOR " + li.i + " = ", li.info, li);after
                    // this.getColorInfo(li);

                    li.img = this.getPosImg(li);

                    const seatGridCenterWidths = {
                        "1": 0.6153846153846154,
                        "2": 0.6185899269599711,
                        "4": 0.575989194913353
                    };
                    let ratio = 0.13; this.ratio;
                    let gridunit = 'vw'; this.gridunit;
                    let style: any = {};
                    const seatImgWidths = {};
                    try {
                        let coord = li.coords;
                        if (!(li.info && li.info.mapElement)) {
                            try {
                                if (grid[zone] && grid[zone].length) {
                                    grid[zone].filter((lst) => {
                                        if (lst.i == li.i) {
                                            if (lst.info.mapElement.list && lst.info.mapElement.list[0]) {
                                                lst.info.mapElement.list = { center: [lst.info.mapElement.list[0]] };
                                            }
                                            li.info = lst.info;
                                        }
                                    });
                                }
                                let lists = li.info.mapElement.list;
                                if (lists && lists[0]) {
                                    li.info.mapElement.list = { center: [lists[0]] };

                                }

                            } catch (e) {

                            }
                        }
                        let width = li.info.mapElement.size.width,
                            height = li.info.mapElement.size.height;

                        let img = li.image || '',
                            imgSplit = img.split("/"),
                            imgIndex = li.type.substr(0, 1) + "/" + imgSplit[imgSplit.length - 1];
                        if (seatImgWidths[imgIndex]) {
                            width *= seatImgWidths[imgIndex];
                        }

                        let color = 'transparent';
                        if (li.waiter && li.waiter.color) {
                            color = li.waiter.color;
                        }
                        style = {
                            'left': `${coord.x * ratio}${gridunit}`,
                            'top': `${coord.y * ratio}${gridunit}`,
                            'width': `${width * ratio}${gridunit}`,
                            'height': `${height * ratio}${gridunit}`,
                            'background': 'radial-gradient(transparent 60%, ' + color + ')'
                        }
                        let styleSunbedDiv = {
                            height: "calc(" + style.height + " - 1.5vw)"

                        };
                        li.styleSunbedDiv = styleSunbedDiv;
                        style.sunbedWidth = "calc(" + style.width + "/7)";
                        style.sunbedMinWidth = "calc(1.312857vw)";
                        if (li.type == 'static') {
                            style.display = 'none';
                        }
                        li.style = style;
                    } catch (e) {

                    }

                    li.style = style;
                    // li.style = this.getItemStyle(li);

                    let type = li.type, cls = type.substr(0, 1);
                    if (type == 'static' || !li.status) {
                        cls = 's_0';
                    } else {
                        cls += '_1';
                    }

                    li.status_class = cls;
                    li.custom_status = Object.assign(li.status);
                    li.isFull = (fullClassList.indexOf(cls) > -1) ? true : false;
                    if (li.number == this.seatData.seat_number) {
                        this.events.publish('grid:seatItemUpdated', li);
                    }

                });
                seats[zone] = list.filter((li) => {
                    if (li && li.info) {
                        return true;
                    }
                    return false;
                });

            }

        } catch (e) {
            console.error(e);
        }

        this.fSeats = JSON.parse(JSON.stringify(seats.front));
        this.mSeats = JSON.parse(JSON.stringify(seats.middle));
        this.bSeats = JSON.parse(JSON.stringify(seats.back));

        this._grid = {
            front: this.fSeats,
            middle: this.mSeats,
            back: this.bSeats
        };

        this.gWidth = JSON.parse(JSON.stringify(size.width));
        this.gHeight = JSON.parse(JSON.stringify(size.height));
        this.hasGridData = true;
        // this.checkCollision();
        this.markForCheck();
    };

    setStatusColor(data, sideName, liIndex, li) {
        //this.getItemInfo(data.item);
        let seat_configs = this.seat_configs;
        let sideList = this.seat_configs.sides[sideName];

        let status_colors = data.item.status_color;
        let statuschk = data.item.status;
        let status = data.item.status;

        let statusList = [];

        // if(!status_colors){
        //     sideList = ["a","b"];
        // status_colors = statuschk;
        // for (let i = 0; i < sideList.length; i++) {
        //     let side = sideList[i];
        //          status_colors[side] = [];

        //     for(let m=0;m < data.item.status[side].length;m++){
        //         status_colors[side].push("#ffffff");
        //      }

        //     }
        // }
        if (!status_colors) {
            status_colors = Object.assign({}, status);
            for (let r = 0; r < sideList.length; r++) {
                let side = sideList[r];
                let sides = status_colors[side];
                if (sides) {
                    for (let m = 0; m < sides.length; m++) {
                        sides[m] = "#ffffff";
                    }
                }


            }

        }


        for (let i = 0; i < sideList.length; i++) {
            let side = sideList[i];

            let status_color = status_colors[side];

            if (status_color && status_color.length) {
                for (let j = 0; j < status_color.length; j++) {
                    if (liIndex == j) {
                        let color = status_color[j];

                        if (color && color.length) {
                            statusList = statusList.concat(color);
                        }
                    }
                }
            }
        }


        if (!li.status_color) {
            li.status_color = statusList;
        }
        if (data.item.number == 9 || data.item.number == 10) {

        }
        this.refreshView();
        return 1;
    }

    setStatusColor1(data, li) {
        let statusList = [];
        try {

            Object.keys(data.status_color).map((status_color) => {
                if (data.status_color[status_color] && data.status_color[status_color].length) {
                    let list = data.status_color[status_color];
                    for (let i = 0; i < list.length; i++) {
                        if (list[i]) {
                            statusList = list[i];
                            break;
                        }
                    }
                }

            });
            li.status_color = [];

        } catch (e) {

        }

        this.refreshView();
        return statusList.length;
    }

    logError(item) {
        return 'invalid';
    }

    // GRid Functions End

    /*loadGridCall(params) {
        let that = this;
        this.refreshGridFlag = true;
        const loadGrid = function(){
            if(this.refreshGridFlag) {
                return;
            }
        }.bind(this);
    }*/

    loadingGridData(s_date?: any, e_date?: any, loading: boolean = false, excluded_days?: string[]) {

        this.grid_start_date = s_date;
        this.grid_end_date = e_date;
        localStorage.grid_start_date = s_date;
        localStorage.grid_end_date = e_date;
        this.date_passed_alert = true;

        let param = {
            start_date: s_date,
            end_date: e_date,
            excluded_days: excluded_days || '',
            sunbeds: false
        }

        this.isLoading = true;
        this.loading = true;

        this.config.getStorage('login').then(r => {
            this.seatData.beach_id = r.beach_id;

            console.log('grid.loadingGridData');
            this.api.get(`grid/${r.beach_id}`, param, {
                'Content-Type': 'application/json'
            }, true, false).subscribe(data => {
                this.gridRes = data;
                this.config.setStorage("grid_details", data);
                if (data) {
                    if (data.seats) {
                        this.events.publish("app:showPercent", data.seats);
                        this.fSeats = [];
                        this.mSeats = [];
                        this.bSeats = [];

                        this.ngZone.run(() => {

                            this.processGrid(data.seats, data.size);
                            this.events.publish('app:freeAmount', data.free_sunbeds);
                            this.events.publish('app:notify', data.notifications);
                            this.refreshView();
                            setTimeout(() => {
                                this.refreshView();
                            }, 30);
                        });

                    } else {
                        this.ngZone.run(() => {
                            this.hasGridData = false;
                        });
                    }
                } else {

                    this.api.AmError(this.config.translate.translate.instant('Components.WARNING'), this.config.translate.translate.instant('Messages.CANT_SEARCH_PRE'), [{
                        text: this.config.translate.translate.instant('Buttons.OK'),
                        handler: () => { }
                    }]);
                }
                this.isLoading = false;
            }, err => {
            });

        });

    }

    getSeatStyle(coord: any, color): any {

        let style = {
            'left': `${this.getPosXOnPercentage(coord.x)}${this.unit}`,
            'top': `${this.getPosYOnPercentage(coord.y)}${this.unit}`,
            'background-color': color,
        }
        return style;
    }

    getSeatClass(item) {
        return {
            circle: item.type == 'baldaquin',
            square: (item.type == 'umbrella' && item.seats == '2'),
            rectangle: (item.type == 'umbrella' && item.seats == '4')
        }
    }

    getStatusStyle(status: Array<any>, color): any {

        let style = {
            'height': `${this.mStatusH / status.length}${this.unit}`,
            'background-color': color
        }
        return style;
    }

    getPosXOnPercentage(posPx: number) {
        return posPx * (8 / 71) - this.eW;
    }

    getPosYOnPercentage(posPx: number) {
        return posPx * (8 / 71) - this.eH;
    }

    // if seat have available sunbeds or baldaquin

    getAvailableSeats(seat: any): {
        status: boolean,
        data: Array<number>
    } {
        if (seat.type == 'umbrella') {

            if (!seat.can_seat) {
                return {
                    status: false,
                    data: []
                }
            }

            // let status: {
            // 	a: Array < string > ,
            // 	b: Array < string >
            // } = seat.status;

            let canSeat: string = seat.can_seat;

            var ret: {
                status: boolean,
                data: Array<number>
            } = {
                status: false,
                data: []
            };

            if (canSeat.length <= 2) {
                // detecting in status
                canSeat = `${canSeat}`;
                ret.status = true;
                if (canSeat.indexOf('A') > -1) { // available all seat in A side
                    if (seat.seats == 2) {
                        ret.data.push(0);
                    } else {
                        ret.data.push(0);
                        ret.data.push(1);
                    }
                }
                if (canSeat.indexOf('B') > -1) { // available all seat in B side
                    if (seat.seats == 2) {
                        ret.data.push(1);
                    } else {
                        ret.data.push(2);
                        ret.data.push(3);
                    }
                }
                return ret;
            }

        } else {
            return {
                status: seat.can_seat,
                data: []
            };
        }
    }

    isFreeSeats(seat: any) {

        const canSeat = typeof seat.can_seat === 'string' && seat.can_seat.length <= 2 ? true : seat.can_seat;

        if (this.isModal) {

            if (this.oldSeatNum === seat.number) {

                return false; // disable

            } else {

                if (this.selSeatType === seat.type && canSeat) {

                    return true; // enable

                } else {

                    return false;

                }

            }

        } else {

            return seat.can_seat;

        }


    }

    showSeatDetail(seat: any, zone: string) {
        this.seatInfo = seat;
        if (this.isModalLoading) {
            return
        }
        this.isModalLoading = true;

        this.isPooling = false;
        this.seatData.seat_number = seat.number;
        this.seatData.reservations = seat.reservations;
        seat['available_seat'] = this.getAvailableSeats(seat);
        seat['zone'] = zone; // popup title (listing page)

        let popUpData: {
            kind: string,
            data: Array<any>,
            seatInfo: any,
            isNew?: boolean,
            canCreate: boolean,
            setState: any
        } = {
            kind: seat.type,
            data: [],
            seatInfo: seat,
            isNew: false,
            canCreate: false,
            setState: undefined
        };

        popUpData.setState = this.setModalState.bind(this);  // we will call parent method (setModalState) from within modal

        try {
            if (!this.isModal && seat.reservations.length == 0) {

                popUpData.kind = seat.type;
                popUpData.data = [];
                popUpData.seatInfo = seat;
                popUpData.isNew = true;
                popUpData.canCreate = popUpData.kind == 'baldaquin' ? true : popUpData.canCreate;

                let pop = this.popoverCtrl.create(`page-pop-up`, popUpData, {
                    cssClass: 'SeatPopup',
                    enableBackdropDismiss: false
                });

                this._PopUP = pop;

                pop.onDidDismiss(data => {
                    this.modalState = undefined;
                    this.modalInstance = undefined;
                    this.isModalLoading = false;
                    this._PopUP = undefined;
                    this.reloadGrid(true);
                });


                // this.ngZone.run(() => {
                pop.present().then(() => {
                    this.isModalLoading = false;
                    this.modalInstance = pop.overlay['instance'] as PopUpPage;
                });
                // });

                return;

            }

        } catch (e) {


        }
        if (this.seatData.reservations && this.seatData.reservations.length) {

        }

        this.api.post('seat/reservations', this.seatData, {
            'Content-Type': 'application/json'
        }, true, false).subscribe((res: any) => {
            // console.log("debugger");
            // console.log(this.isModal);
            if (this.isModal) {
                // console.log("entering modal");
                this.performChangePos(seat);
                this.isModalLoading = false;

            } else {


                // ----------------------------------------
                // Modal data
                // ----------------------------------------
                const colorMap = { pending: '#ffff00', booked: '#a82fab', occupied: '#000000', paid: '#f40006', 'change-request': '#54fe62' };

                res = res.map(item => {
                    if (item) {
                        item.status_color = item.payment_method === 'online' && item.status === 'booked' ? colorMap['paid'] : colorMap[item.status];
                    }
                    if (!item.status_color) {

                    }
                    return item;

                });

                popUpData.kind = seat.type;
                popUpData.data = res;
                popUpData.seatInfo = seat;
                popUpData.isNew = false;

                let pop = this.popoverCtrl.create(`page-pop-up`, popUpData, {
                    cssClass: 'SeatPopup',
                    enableBackdropDismiss: false
                });

                this._PopUP = pop;

                pop.onDidDismiss(data => {
                    this.modalState = undefined;
                    this.modalInstance = undefined;
                    this.isModalLoading = false;
                    this._PopUP = undefined;
                    this.reloadGrid(true);
                });

                pop.present().then(() => {
                    this.isModalLoading = false;
                    this.modalInstance = pop.overlay['instance'] as PopUpPage;
                });

            }

        }, err => {
            console.error(err);
        });
    }

    openSunbedsModal() {

        this.config.getStorage('period').then(period => {
            let beach_id = this.common.getStorageItem('beach_id');
            this.getFreeSunbeds({ from: period.from, to: period.to, beach_id });

        });

    }

    async getFreeSunbeds(cfg: any) {

        let param = {
            start_date: cfg.from,
            end_date: cfg.to,
            sunbeds: true
        }

        console.log('grid.loadingGridData.getFreeSunbeds');
        const gridRequest = this.api.get(`grid/${cfg.beach_id}`, param, { 'Content-Type': 'application/json' }, true, false);
        const sunbedsRequest = this.api.get(`sunbeds/${cfg.beach_id}`, { start_date: cfg.from, end_date: cfg.to }, { 'Content-Type': 'application/json' }, true, false);

        const combined = combineLatest(gridRequest, sunbedsRequest);

        combined.subscribe(([grid, sunbeds]) => {

            if (grid) {

                if (sunbeds.length) {

                    const colorMap = { booked: '#a82fab', occupied: '#000000', paid: '#f40006', 'change-request': '#54fe62' };

                    sunbeds = sunbeds.map(item => {

                        if (item) {
                            item.status_color = item.payment_method === 'online' && item.status === 'booked' ? colorMap['paid'] : colorMap[item.status];
                        }
                        if (!item.status_color) {

                        }

                        return item;

                    });

                }

                grid['reservations'] = sunbeds;

                const openModal = grid.count > 0 && sunbeds.length || grid.count === 0 && sunbeds.length || grid.count > 0 && !sunbeds.length;

                if (openModal) {

                    const pop = this.popoverCtrl.create(`page-pop-up`, {
                        kind: 'sunbed',
                        freeSunbeds: grid,
                        setState: this.setModalState.bind(this)  // we will call parent method (setModalState) from within modal
                    }, {
                            cssClass: 'SeatPopup',
                            enableBackdropDismiss: false
                        });

                    pop.onDidDismiss(data => {

                        this.modalState = undefined;
                        this.modalInstance = undefined;

                        this.reloadGrid(true);

                    });

                    pop.present().then(() => {
                        this.modalInstance = pop.overlay['instance'] as PopUpPage;
                    });

                } else {

                    this.api.AmError(this.config.translate.translate.instant('Components.WARNING'),
                        this.config.translate.translate.instant('Messages.OPEN_SUNBEDS_MODAL'), [{
                            text: this.config.translate.translate.instant('Buttons.OK'),
                            handler: () => { }
                        }]
                    );

                }

            } else {

                this.api.AmError(this.config.translate.translate.instant('Components.WARNING'),
                    this.config.translate.translate.instant('Messages.CANT_SEARCH_PRE'), [{
                        text: this.config.translate.translate.instant('Buttons.OK'),
                        handler: () => { }
                    }]
                );

            }

        });

    }

    setModalState(data) {

        if (data) {

            this.modalState = data;

        } else {

            // Get fresh data for current seat (listing page)
            if (this.modalState.reservation_id) {
                delete this.modalState.reservation_id;
            }

            this.updateModal({ switchToListingPage: true });

        }

    }

    updateModal(data?: any) {


        if (this.modalState && Object.keys(this.modalState).length) {

            if (this.modalState.action && this.modalState.action !== '') {

                if (this.modalState.action === 'reservation' || this.modalState.action === 'add') {

                    if (this.modalState.kind !== 'sunbed') {

                        this.reloadGridCustom().subscribe(seat => {

                            seat.canSeat = this.getAvailableSeats(seat);

                            if (data && data.switchToListingPage) {
                                seat.switchToListingPage = true;
                            }

                            if (this.modalState.reservation_id && this.modalState.reservation_id !== '') {
                                seat.reservation_id = this.modalState.reservation_id;
                            }

                            if (data.data && data.data.id !== '') {
                                seat.updated_id = data.data.id;
                            }

                            this.modalInstance.emit(seat);

                        });

                    } else {

                        if (data && data.switchToListingPage) {

                            // Get listing page fresh data
                            this.config.getStorage('period').then(period => {
                                const reservationsSource = this.reloadGridCustom({ start: period.from, end: period.to });
                                const sunbedsSource = this.refreshSunbedsCount();

                                const source = combineLatest(reservationsSource, sunbedsSource);

                                source.subscribe(([reservations, sunbeds]) => {

                                    data.items = reservations;
                                    data.count = sunbeds.count;
                                    data.price = sunbeds.price;

                                    this.modalInstance.emit(data);

                                });

                            });

                        } else {

                            this.refreshSunbedsCount().subscribe(sunbeds => {

                                if (this.modalState.reservation_id && this.modalState.reservation_id !== '') {
                                    sunbeds.reservation_id = this.modalState.reservation_id;
                                }

                                sunbeds.updated_id = data.data.id;
                                sunbeds.action = data.data.action;

                                if (data.data.action === 'update') {
                                    sunbeds.new_count = data.data.sunbeds;
                                }

                                sunbeds.type = 'sunbed';
                                this.modalInstance.emit(sunbeds);

                            });

                        }

                    }

                } else {

                    // this.config.getStorage('period').then(period => {

                    // 	this.reloadGridCustom({start: period.from, end: period.to}).subscribe(seat => {

                    // 		if ( this.modalState.kind !== 'sunbed' ) {

                    // 			seat.refreshListing = true;
                    // 			this.modalInstance.emit(seat);

                    // 		} else {

                    // 			data = {
                    // 				items: seat,
                    // 				refreshListing: true
                    // 			};

                    // 			this.modalInstance.emit(data);

                    // 		}

                    // 	});

                    // });

                    // Listing page
                    this.config.getStorage('period').then(period => {

                        const reservationsSource = this.reloadGridCustom({ start: period.from, end: period.to });
                        const sunbedsSource = this.refreshSunbedsCount({ start: period.from, end: period.to });

                        const source = combineLatest(reservationsSource, sunbedsSource);

                        source.subscribe(([reservations, sunbeds]) => {

                            if (this.modalState.kind !== 'sunbed') {

                                reservations.refreshListing = true;
                                this.modalInstance.emit(reservations);

                            } else {

                                data.items = reservations;
                                data.count = sunbeds.count;
                                data.price = sunbeds.price;

                                data.refreshListing = true;

                                this.modalInstance.emit(data);

                            }

                        });

                    });

                }

            }

        } else {

            this.reloadGrid(true);

        }

    }

    reloadGridCustom(period?: any): Observable<any> {
        let url,
            beach_id = this.common.getStorageItem('beach_id');

        let param: any = {
            start_date: period ? period.start : this.grid_start_date || this.modalState.period.start,
            end_date: period ? period.end : this.grid_end_date || this.modalState.period.end
        };

        try {
            if (this.modalState.kind !== 'sunbed') {

                console.log('grid.reloadGridCustom.grid');
                url = `grid/${beach_id}`;

                param.excluded_days = '';
                param.reservation_id = '';
                param.seat_x = this.seatInfo.coords.x;
                param.seat_y = this.seatInfo.coords.y;
                param.seat_zone = this.seatInfo.zone;
                param.sunbeds = false;

            } else {
                url = `sunbeds/${beach_id}`;
            }

            if (this.modalState.reservation_id && this.modalState.reservation_id !== '') {
                param.reservation_id = this.modalState.reservation_id;
            }
        } catch (e) {


        }

        return this.api.get(url, param, { 'Content-Type': 'application/json' }, true, false);

    }

    refreshSunbedsCount(period?: any): Observable<any> {
        console.log('grid.refreshSunbedsCount.grid');
        const beach_id = this.common.getStorageItem('beach_id');

        console.log('grid.refreshSunbedsCount');
        const url = `grid/${beach_id}`;

        const param = {
            start_date: period ? period.start : this.modalState.period.start,
            end_date: period ? period.end : this.modalState.period.end,
            sunbeds: true
        };

        return this.api.get(url, param, { 'Content-Type': 'application/json' }, true, false);

    }

    performChangePos(seat: any) {

        // console.log("change position");
        this.viewClose();
        // console.log(seat);
        this.events.publish(`app:changePosition`, seat);
    }

    // When closing grid page...
    viewClose() {
        // console.log("close view");
        // console.log(this.viewCtrl);

        this.viewCtrl.dismiss({
            data: "Ok Grid Page Closed!!!"
        });
    }

    ionViewWillLeave(): void {
        if (this.onResumeSubscription) {
            this.onResumeSubscription.unsubscribe();
        }

        if (this._selectPeriodHandler) {

            this.events.unsubscribe('app:selectPeriodMap', this._selectPeriodHandler);
            this._selectPeriodHandler = undefined;

        }

        if (this._sunbedModalHandler) {

            this.events.unsubscribe('app:presentSunbedModal', this._sunbedModalHandler);
            this._sunbedModalHandler = undefined;

        }

    }

}
