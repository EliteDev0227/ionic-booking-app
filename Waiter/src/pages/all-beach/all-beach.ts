import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, Events, LoadingController } from 'ionic-angular';
import { TabStateService } from '../../providers/app-stuff/app-stuff';
import { CommonProvider } from '../../providers/common/common';
import { BeachService } from '../../services/beach.service';
import { AppService } from '../../services/app.service';
import { status_color } from '../../services/app-settings';
import { Seat, Grid, Coord, Reservation } from '../../models/grid';
import { Platform } from '../../../node_modules/ionic-angular/platform/platform';
import { environment } from '../../environment/environment';
declare const window: any;

@IonicPage()
@Component({
    selector: 'page-all-beach',
    templateUrl: 'all-beach.html',
})
export class AllBeachPage {

    status_color = status_color;

    coloredSunbedAry: Array<string> = ['seat-blue.png', 'seat-green.png', 'seat-magent.png', 'seat-blue.png', 'seat-yellow.png', 'seat-red.png'];

    // allSeats: Array<Seat> = [];
    allSeats: any = [];
    allSunbeds: Array<any> = [];

    confirmState: boolean = false;
    tabBarElement: any;
    mapViewState: boolean = false;
    public gridScaleRatio = 0.5;
    unit: string = 'vh';
    gridunit = 'px';
    imgPath = environment.base + "uploads/";
    ratio = 1;

    // map view ----
    mStatusH: number = 3;
    mRatio: number = 1.58;
    mRatioH: number = 1.35;
    eW: number = 8;
    eH: number = 8 / 1.42;
    hasGridData = false;
    gWidth: any;
    gHeight: any;
    // unit: string = 'vh';
    isFreeShowState: boolean = false;
    isLoading = true;
    loaded = false;

    filterState = {
        mine: false,
        free: false,
        state: false
    };


    allSeatSelected = false;
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
    seatData: any = {
        beach_id: '',
        seat_number: '',
        reservations: []
        // end_date: '',
        // is_sunbed: false
    }
    fSeats = [];
    mSeats = [];
    bSeats = [];
    constructor(public navCtrl: NavController, public events: Events, public navParams: NavParams, public tabStateService: TabStateService, public common: CommonProvider,
        private beachService: BeachService, private platform: Platform,
        private appService: AppService,
        public loadingCtrl: LoadingController,
    ) {
        this.platform.ready().then(() => {
            this.defineOrientationEvent();
        })
    }





    refreshView() {

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
        // const seatGridCenterWidths = {
        //     "1": 0.6153846153846154,
        //     "2": 0.6185899269599711,
        //     "4": 0.575989194913353
        // };
        let ratio = 0.20;// this.ratio;
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
                     width *= seatWidths[seatCount];
                 } else {
                 }
             }
             if (typeof (item.info.mapElement.widthPercentage) !== 'undefined') {
                 //  width *= item.info.mapElement.widthPercentage / 100;
             } */



            style = {
                'left': `${coord.x * ratio}${gridunit}`,
                'top': `${coord.y * ratio}${gridunit}`,
                'width': `${width * ratio}${gridunit}`,
                'height': `${height * ratio}${gridunit}`
            }
            let styleSunbedDiv = {
                height: "calc(" + style.height + " - 1.5vw)"

            };
            item.styleSunbedDiv = styleSunbedDiv;
            style.sunbedWidth = "calc(1.312857vh)";
            style.sunbedMinWidth = "calc(1.312857vh)";
            if (item.type == 'static') {
                style.display = 'none';
            }
            item.style = style;
        } catch (e) {

        }
        return style;
    }
    getItemStyle2(item: any) {
        const seatGridCenterWidths = {
            "1": 0.6153846153846154,
            "2": 0.6185899269599711,
            "4": 0.575989194913353
        };
        let ratio = 0.13; this.ratio;
        let gridunit = 'vw'; this.gridunit;
        let style: any = {};
        try {
            let coord = item.coords;
            if (!(item.info && item.info.mapElement)) {
                this.getItemInfo(item);
            }
            let width = item.info.mapElement.size.width,
                height = item.info.mapElement.size.height;
            if (item.type == 'umbrella') {

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
                    width *= seatWidths[seatCount];
                } else {
                }
            }
            if (typeof (item.info.mapElement.widthPercentage) !== 'undefined') {
                //  width *= item.info.mapElement.widthPercentage / 100;
            }


            style = {
                'left': `${coord.x * ratio}${gridunit}`,
                'top': `${coord.y * ratio}${gridunit}`,
                'width': `${width * ratio}${gridunit}`,
                'height': `${height * ratio}${gridunit}`
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
    //Grid Functions
    getPosImg(item) {
        let img = '/'; // this.imgPath + this.seatData.beach_id + '/elements/';
        if (item.type == 'static') {
            img = item.image;
        } else {
            img += item.image;
        }
        item.img = img;
        return img;
    }
    getGridInfo(zone, pos) {
        try {
            const grid = JSON.parse(localStorage.beach_grid);
            let info = grid[zone][pos]['info'];
            let list = info.mapElement.list;

            if (list && list[0]) {
                info.mapElement.list = { center: [list[0]] };
            }
            return info || null;
        } catch (e) {

            return null;
        }
    }

    checkGridInfo(li) {
        if (li.info && li.info.mapElement && li.info.mapElement.list && li.info.mapElement.list[0]) {
            li.info.mapElement.list = { center: [li.info.mapElement.list[0]] };
        }
    }
    getGridInfoById(item) {
        try {
            let info;
            const grid = JSON.parse(localStorage.beach_grid);
            Object.keys(grid).map((zone) => {
                let list = grid[zone];
                list.map((li) => {
                    if (li.i == item.i) {
                        if (li.info.mapElement.list && li.info.mapElement.list[0]) {
                            li.info.mapElement.list = { center: [li.info.mapElement.list[0]] };
                        }
                        info = li.info;
                    }
                });
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
                        if (li.index == item.index) {
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
        // const getColorDetail = function (li, side) {

        // };
        let seat_configs = this.seat_configs;
        try {

            let list = item.info.mapElement.list;
            if (list[0]) {
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
    processGrid(seats, size) {
        localStorage.setItem('beach_grid', JSON.stringify(seats));
        try {
            let zones = Object.keys(seats);
            const fullClassList = ['u_2_2', 'u_2', 'b_2'];
            for (let i = 0; i < zones.length; i++) {
                let zone = zones[i],
                    list = seats[zone];

                for (let j = 0; j < list.length; j++) {

                    let li = list[j];//  Object.assign(grid[zone][i], list[j]);
                    if (!li.info) {


                    }
                    //Remove this fn later
                    li.protocol = { a: [], b: [] },
                        li.discount = { a: [], b: [] };

                    //li.info = this.getGridInfo(zone, j);
                    //Remove this fn later---->>>>>>>>

                    li.info = this.getGridInfoById(li);
                    this.checkGridInfo(li);
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

                }

            }


        } catch (e) {


        }

        this.fSeats = seats.front; // JSON.parse(JSON.stringify(seats.front));
        this.mSeats = seats.middle; // JSON.parse(JSON.stringify(seats.middle));
        this.bSeats = seats.back; // JSON.parse(JSON.stringify(seats.back));
        this._grid = {
            front: this.fSeats,
            middle: this.mSeats,
            back: this.bSeats
        };
        window['grid'] = this._grid;
        this.gWidth = JSON.parse(JSON.stringify(size.width));
        this.gHeight = JSON.parse(JSON.stringify(size.height));
        this.hasGridData = true;
        // this.checkCollision();

    };

    initEvents() {
        this.events.subscribe('app:showFree', (status) => {
            this.isFreeShowState = status;
        });
        this.events.subscribe('app:notification', (data) => this.onNewNotification(data));
        this.events.subscribe('app:reload', () => {
            this.processing = false;
            this.loadingGridData();
        });
    }
    onNewNotification(data) {
        this.beachService.getNotificationData(data)
            .then(result => {
                if (!result) return;
                if (result.entity === 'order' && this.appService.getAccount().id === result.waiter_id && result.action === 'create') {
                    if (result.data) {
                        this.appService.addNotification(result.data.id);
                    }
                    return;
                } else {
                    this.loadingGridData();
                }
            })
            .catch(error => {
            });
    }
    processing = false;
    ionViewWillEnter() {
        this.processing = false;
        this.initEvents();
        this.loadingGridData();
    }
    ionViewWillLeave() {
        this.events.unsubscribe('app:notification');
        this.events.unsubscribe('app:showFree');
        this.events.unsubscribe('app:reload');
    }
    defineOrientationEvent() {
        if (window && window.screen && window.screen.orientation) {
            if (window.screen.orientation.type.startsWith('landscape')) {
                this.unit = 'vw';
            }
        }
        window.addEventListener("orientationchange", () => {
            if (window && window.screen && window.screen.orientation) {
                if (window.screen.orientation.type.startsWith('landscape')) {
                    this.unit = 'vw';
                } else {
                    this.unit = 'vh';
                }
            }
        });
    }
    private loading: any = false;
    loadingGridData() {
        if (this.processing) return;
        this.processing = true;
        if (!this.loaded) {
            this.loading = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            this.loading.present();
        }
        this.beachService.getAllSeats()
            .then((result) => {
                const grid: Grid = result.grid;
                const bookings = result.bookings;
                grid.front = grid.front.filter(li => li.type !== 'static');
                grid.middle = grid.middle.filter(li => li.type !== 'static');
                grid.back = grid.back.filter(li => li.type !== 'static');
                this.allSeats = [].concat(grid.front, grid.middle, grid.back);
                this.allSeats.map((seat) => {
                    seat.statusList = Object.keys(seat.status);
                    this.getSeatFreeStatus(seat);
                })
                this.allSunbeds = bookings;
                this.allSeats.forEach((item, index) => {
                    this.seatMap[item.number] = index;
                })
                /* this.allSunbeds.forEach((item, index) => {
                     this.sunbedMap[item.id] = index;
                 }) */
                this.checkSelectedSeats();
                if (this.loading) {
                    this.loading.dismiss();
                    this.loading = false;
                }
                this.checkSelectedSeats();
                this.loaded = true;
                this.processing = false;

                this.processGrid(grid, result.grid_setting);


            })
            .catch(error => {
                if (this.loading) {
                    this.loading.dismiss();
                }
                this.appService.errorHandler(error);
            })
    }

    getPosStyle(coord: Coord): any {
        if (!coord) return {
            'left': `${this.getPosXOnPercentage(0)}${this.unit}`,
            'top': `${this.getPosYOnPercentage(0)}${this.unit}`,
        }
        else return {
            'left': `${this.getPosXOnPercentage(coord.x)}${this.unit}`,
            'top': `${this.getPosYOnPercentage(coord.y)}${this.unit}`,
        }
    }

    getSeatFreeStatus(seat: any) {
        try {
            let statusList = seat.statusList;
            seat.freeSlot = false;
            if (seat.waiter) {
                return false;
            }
            statusList.map((status) => {
                let free = true;
                seat.status[status].map((statusText) => {
                    if (statusText != 'available') {
                        free = false;
                    }
                });
                if (free) {
                    seat.freeSlot = true;

                }

            });
        } catch (e) {
            
        }
    }

    getSeatClass(seat: any) {
        try {
            var waiter = seat.waiter || false;
            var selected = seat.selected || false;
            var isMine = this.isMine(seat);
            return {
                'disabled': waiter,
                'preColor': (!isMine && selected),
                'unselected': (isMine && selected)
            }
        } catch (e) {
            return {};
        }
    }
    getStatusColor(statusArray) {
        let status = 'available';
        statusArray.forEach(item => {
            if (item != 'available') status = item;
        })
        if (!status_color[status]) {
            
        }
        return this.status_color[status];
    }
    getShapeClass(seat: any) {
        let seatCount = (seat.statusList) ? seat.statusList.length : 1;
        return {
            'square': seat.type == 'baldaquin',
            'circle': (seat.type == 'umbrella' && !(seatCount > 1)),
            'ellipse': (seat.type == 'umbrella' && seatCount > 1)
        }
    }
    getStatusHeight(status: any): any {
        let length = status.length;
        if ((typeof status) == 'string') length = 1;
        return {
            'height': `${this.mStatusH / length}${this.unit}`
        }
    }

    setStatusColor(data, sideName, liIndex, li) {
        try {
            
            //this.getItemInfo(data.item);
            // let seat_configs = this.seat_configs;
            let sideList = this.seat_configs.sides[sideName];
            let status_colors = data.item.status_color;
            let statusList = [];
            for (let i = 0; i < sideList.length; i++) {
                let side = sideList[i];
                if (!status_colors) {
                    status_colors = {};
                    /*for (let s = 0; s < data.item.statusList.length; s++) {
                        
                        status_colors[data.item.statusList[s]] = ["#ffffff"];
                    }*/
                    let itemStatus = data.item.status;
                    Object.keys(itemStatus).map((statusKey) => {
                        status_colors[statusKey] = [];
                       itemStatus[statusKey].map((statusType) => {
                        status_colors[statusKey].push(this.status_color[statusType]);
                       })
                    });

                }
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
        } catch (e) {
            return 0;
        }
        this.refreshView();
        return 1;
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
                                if (li.index == data.item.index) {
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

    getPosXOnPercentage(posPx: number) {
        return posPx * (8 / 71) - this.eW;
    }

    getPosYOnPercentage(posPx: number) {
        return posPx * (8 / 71) - this.eH;
    }


    filterFreeClick(value: boolean) {
        this.isFreeShowState = value;
        this.filterState.free = value;
        if (!value) {
            if (!this.filterState.mine)
                this.filterState.state = value;
        } else {
            this.filterState.state = value;
        }
    }

    seatAndMapClick(value: boolean) {
        this.mapViewState = value;
    }

    checkFilter(seat: Seat) {
        if (!this.appService.getAccount()) return false;
        if (this.filterState.mine && !this.isMine(seat)) return false;
        if (this.filterState.free && seat.waiter) return false;
        return true;
    }
    isMine(seat: any) {
        return (seat.waiter && this.appService.getAccount().id === seat.waiter.id);
    }
    checkSelectedSeats() {

        for (const seat of this.allSeats) {
            if (seat.selected) {
                this.confirmState = true;
                this.events.publish('seat:confirm', false);
                if (this.tabBarElement) {
                    this.tabBarElement.style.display = 'none';
                }
                return;
            }
        }
        /* for (const sunbed of this.allSunbeds) {
            if (sunbed.selected) {
                this.confirmState = true;
                this.events.publish('seat:confirm', false);
                if (this.tabBarElement) {
                    this.tabBarElement.style.display = 'none';
                }
                return;
            }
        } */
        this.confirmState = false;
        this.events.publish('seat:confirm', true);
        if (this.tabBarElement) {
            this.tabBarElement.style.display = 'flex';
        }
    }
    onClickSunbed(sunbed: Reservation) {
        if (this.processing) return;
        this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
        if (this.isFreeShowState && sunbed.waiter) return;
        if (this.tabBarElement == null) return;
        if (!this.isMine(sunbed) && sunbed.waiter) return;
        sunbed.selected = !sunbed.selected;
        this.checkSelectedSeats();
    }
    showSeatDetail(item, grid_side) {
        this.onClickSeat(item);
    }
    // Events for Seats 
    onClickSeat(seat: any) {
        if (this.processing) return;
        this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
        if (this.isFreeShowState && seat.waiter) return;
        if (this.tabBarElement == null) return;
        if (!this.isMine(seat) && seat.waiter) return;
        seat.selected = !seat.selected;
        this.checkSelectedSeats();
    }
    canDisplaySelectAll() {

        let display = false;
        let grid = this.allSeats;
        grid.map((seat) => {
            if (this.processing) return;
            if (this.isFreeShowState && seat.waiter) return;
            if (!this.isMine(seat) && seat.waiter) return;
            if (!this.isMine(seat) && !seat.selected) {
                display = true;
            }
        });
        if (display) {
            this.allSeatSelected = false;
        }
        return display;
    }
    allSeatsSelected($event) {

        if (!this.allSeatSelected) {
            return;
        }
        if (this.tabBarElement) {
            this.tabBarElement.style.display = 'none';
        } else {

        }
        this.confirmState = true;
        this.events.publish('seat:confirm', false);
 
        let status = this.allSeatSelected;
        let grid = this.allSeats;
        grid.map((seat) => {
            if (this.processing) return;
            if (this.isFreeShowState && seat.waiter) return;
            if (!this.isMine(seat) && seat.waiter) return;
            if (this.isMine(seat)) {
                seat.selected = !status;
            } else {
                seat.selected = status;
            }

        });
    }

    onClickCancel() {
        this.confirmState = false;
        this.events.publish('seat:confirm', true);

        if (this.tabBarElement) {
            this.tabBarElement.style.display = 'flex';
        }
        for (const seat of this.allSeats) {
            seat.selected = false;
        }
        /* for (const sunbed of this.allSunbeds) {
            sunbed.selected = false;
        } */
    }

    seatMap: any = {};
    sunbedMap: any = {};
    onClickConfirm() {
        if (this.processing) return;
        this.processing = true;
        let seats: Array<string> = [];
        let bookings: Array<string> = [];
        for (const seat of this.allSeats) {
            if (seat.selected) {
                seats.push(`${seat.number}`);
            }
        }
        /* for (const sunbed of this.allSunbeds) {
            if (sunbed.selected) {
                bookings.push(sunbed.id);
            }
        } */
        this.beachService.select(seats, bookings)
            .then(({ seats, sunbeds, waiter }) => {

                if (sunbeds.failed.length > 0 || seats.failed.length > 0) {
                    this.processing = false;
                    this.loadingGridData();
                    return;
                }
                seats.successed.forEach(item => {
                    try {
                        this.allSeats[this.seatMap[item]].selected = false;
                        if (this.isMine(this.allSeats[this.seatMap[item]])) {
                            delete this.allSeats[this.seatMap[item]].waiter;
                        } else {
                            this.allSeats[this.seatMap[item]].waiter = waiter;
                        }
                    } catch (e) {
                        console.error(e);
                    }
                })
                 sunbeds.successed.forEach(item => {
                    this.allSunbeds[this.sunbedMap[item]].selected = false;
                    if (this.isMine(this.allSunbeds[this.sunbedMap[item]])) {
                        delete this.allSunbeds[this.sunbedMap[item]].waiter;
                    } else {
                        this.allSunbeds[this.sunbedMap[item]].waiter = waiter;
                    }
                }) 
                this.processing = false;
                if (this.tabBarElement) this.tabBarElement.style.display = 'flex';
            })
            .catch(error => {
                
            })
    }
}
