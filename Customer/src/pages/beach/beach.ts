import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
    NavController, NavParams, PopoverController, Content, Events, Platform,
    Navbar, Gesture, ModalController
} from 'ionic-angular'
import { beachBook } from "../beachBook/beachBook";
import { beachBookBaldaquin } from "../beachBookBaldaquin/beachBookBaldaquin";
import { beachBookSunbed } from "../beachBookSunbed/beachBookSunbed";
import { PopoverWeather } from "../includes/popover/weatherPopover/popover.weather";
import { CalendarPopoverPage } from "../includes/searchMaster/calendar-popover/calendar-popover";
import { ApiProvider } from "../providers/services";
import { CustomBootstrap } from "../../app/BootstrapFirstRun";
import * as moment from 'moment';
import { gridHelper } from "./beach.gridHelper";
import { MenuPage } from '../menu/menu';
import { environment } from '../../environment/environment';

@Component({
    selector: 'page-beach',
    templateUrl: 'beach.html',
    providers: [gridHelper, DatePipe]
})
export class BeachPage implements OnInit {
    context: string;

    imgPath = environment.base + "uploads/";
    beachSection: string = 'overview';
    currentDate: string;
    mention: string = '';
    index: number = 0;
    loaded: number = 0;
    oldItem: number = 0;
    title: string = '';
    coordFactor: number = 0;
    selectedToppings: any = [];
    menu: any = [];
    readonly pollingInterval: number = 5000;
    change: boolean = false;
    isPulling: boolean = false;
    isMenuDetails: {
        status: boolean,
        data: any
    } = { status: false, data: [] };
    beach_id: string;
    ProceedPages: any = {
        baldaquin: beachBookBaldaquin,
        umbrella: beachBook,
        sunbed: beachBookSunbed
    };
    requestPage: string = 'BeachPage';
    beachsettings: any;
    grid: any;
    gridSettings: any;
    SearchObj: any = {};
    quantity: number = 1;

    gridElement: {
        'min-width': string,
        'min-height': string;
        'max-width': string,
        'max-height': string;
        width: string,
        height: string,
        top: string,
        left: string
    };
    timeoutInstance: any = [];
    elementSize: string = '';
    customer: any = {};
    private sub1$: any;
    private sub2$: any;
    @ViewChild(Content) content: Content;
    @ViewChild('elements') elements: ElementRef;
    @ViewChild('header') header: ElementRef;
    @ViewChild(Navbar) navBar: Navbar;
    @ViewChild('wave') wave: ElementRef;

    // Grid variables
    unit: string = 'px';
    mStatusH: number = 3;
    seatWidth: number = 71;
    seatHeight: number = 50;
    ratio: number = 0;
    isFinishZoom: boolean = false;
    isZooming: boolean = false;
    sWidth: number = 0;
    sHeight: number = 0;
    padding = 5;
    full_info: any = {};
    beach_settings: any = [];

    containerStyle: any;
    clearCache = "?s=gridImage" + localStorage.getItem('grid_image_cache');

    constructor(private dp: DatePipe, public platform: Platform, public events: Events, public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public api: ApiProvider, public configuration: CustomBootstrap, public helper: gridHelper, private ngZone: NgZone, public modal: ModalController) {
        this.platform.ready().then(() => {
            this.sWidth = this.platform.width();
            this.sHeight = this.platform.height();
        });
        this.full_info = this.navParams.get('data');
        this.beach_settings = JSON.parse(localStorage.getItem('beachsettings') || '[]');
    }

    ngOnInit() {
        this.clearCache = "?s=gridImage" + localStorage.getItem('grid_image_cache');
        if (!this.loaded)
            this.load();
        this.configuration.getStorage('login').then((data: any) => {
            if (data && data.id) {
                this.customer = data;
            }
        }, error => { });
    }

    showProducts() {
        const menu_popover = this.popoverCtrl.create(MenuPage, { popover: true, beach_id: this.beach_id, showImgFullscreen: true }, { cssClass: 'menuPage' });
        menu_popover.present();
    }

    load() {

        this.platform.ready().then(() => {

            this.sub1$ = this.platform.pause.subscribe(() => {

                if (this.navCtrl.getActive().name == 'BeachPage') {
                    this.configuration.ClearTimeout();
                }

            }, error => { });

            this.sub2$ = this.platform.resume.subscribe(() => {

                if (this.navCtrl.getActive().name == 'BeachPage') {
                    // alert("Beach resume1");
                    // if(this.configuration.canRequestPool(this.requestPage))
                    // {
                    // alert("Beach resume2");
                    this.GridPool();
                    // }
                }


            }, error => { });

        }, error => { });

        this.context = this.navParams.get('context')
        this.loaded += 1;
        this.grid = [];
        this.gridRefreshed();
        this.gridSettings = {};
        this.SearchObj = this.navParams.get('SearchObj');


        this.menu = [];
        this.beachsettings = [];
        this.title = this.navParams.get('title2');

        if (this.navParams.data.startD) {
            this.currentDate = this.getDateFormat(new Date(this.navParams.data.startD));
            this.beachSection = 'menu';
        }
        else {
            this.currentDate = this.getDateFormat(new Date());
        }

        if (this.navParams.data.id && !this.navParams.data.data) {
            this.beach_id = this.navParams.data.id;
            this.getPageInfo(true);
        } else if (this.navParams.data.id && this.navParams.data.data) {
            this.beach_id = this.navParams.data.id;
            this.getPageInfo(false);
        }

        this.beachSettings();

        this.platform.registerBackButtonAction((event: any) => {
            this.backButtonsHelper();
        });

        this.setBackButtonAction();

        setTimeout(() => {
            this.loaded = 0;
        }, 1000);
    }


    backButtonsHelper() {
        if (this.isMenuDetails.status == true) {
            setTimeout(() => {
                this.isMenuDetails.status = false;
                this.loaded = 0;
            }, 500);
            return;
        }

        if (this.beachSection == 'menu') {
            this.beachSection = 'overview';
            return;
        }

        this.navCtrl.pop();

    }
    ionViewWillEnter() {
        if (!this.loaded) {
            this.load();
        }
        this.configuration.setRequestPage(this.requestPage);
    }

    setBackButtonAction() {
        this.navBar.backButtonClick = () => {
            this.backButtonsHelper();
        }
    }

    add(a: any) {
        let data = JSON.parse(JSON.stringify(a));
        if (this.quantity > 0) {
            data.quantity = this.quantity;
            data.beach_id = this.beach_id;
            data.mention = this.mention;
            data.toppings = this.selectedToppings;
            this.events.publish('cart:received', data);
            this.clean(false);
        }
    }

    counter(val: number): void {
        if ((val < 0 && this.quantity > 0) || val > 0 && this.quantity < 19) this.quantity += val;
    }

    beachSettings() {
        for (let i in this.beach_settings) {
            if (this.beach_settings.hasOwnProperty(i)) {
                if (this.beach_settings[i] && this.beach_settings[i].beach_id == this.beach_id) {
                    this.beachsettings = this.beach_settings[i];
                    break;
                }
            }
        }
    }


    getStyle(item, type: string) {
        let size = this.helper.gridStyle;
        if (size && size[type]) {
            size = size[type];
            size.top = `${this.helper.getFactor(item.coords.y, 'y') + 'px'}`;
            size.left = `${this.helper.getFactor(item.coords.x, 'x') + 'px'}`;
            return size;
        }
    }


    gotoSelection(item: any): void {
        this.isMenuDetails.data = item;
        this.clean(true);
    }

    private clean(status: boolean) {
        this.quantity = 1;
        this.mention = '';
        this.selectedToppings = [];
        this.isMenuDetails.status = status;
    }

    dualString(data: string) {
        return data.length < 2 ? 0 + data : data;
    }

    private getDateFormat(date: Date): string {
        return date.getFullYear() + '-' + this.dualString((date.getMonth() + 1).toString()) + '-' + this.dualString(date.getDate().toString());
    }

    toggleItems(item) {
        item.itemsShown = !item.itemsShown;
        this.menu.forEach((element) => {
            if (element != item) element.itemsShown = false
        })
    }

    Proceed(type: string, data: any, index: string | number, location: string): void {

        if (this.pinching) return;

        this.sub1$.unsubscribe();
        this.sub2$.unsubscribe();


        index = typeof index === 'number' ? JSON.stringify(index) : index;

        if (this.isFinishZoom === true || true) {
            if (this.ProceedPages && this.ProceedPages[type]) {
                data.type = !data.type ? type : data.type;
                let ElementPool = {
                    beach_ids: [this.beach_id],
                    customer_id: this.customer.id,
                    seat_type: type,
                    seat_zone: [location],
                    seat_position: data.coords,
                    start_date: this.SearchObj && this.SearchObj.start_date ? this.SearchObj.start_date : new Date(this.currentDate).getTime(),
                    end_date: this.SearchObj && this.SearchObj.end_date ? this.SearchObj.end_date : new Date(this.currentDate).getTime(),
                    refresh: true
                };
                var full_info = undefined;
                if (this.full_info != null) {
                    full_info = this.full_info.front_sunbed_price;
                }
                this.beachsettings.front_sunbed_price = full_info;

                if (this.change) {
                    data.status_icon = this.MakeMatch(data.customer, data.status_icon);
                }

                // ADD restriction here
                if (true || data && data.status_icon != '4444.png' && data.status_icon != '22.png' && data.status_icon != '44.png' && data.status_icon != '4.png' && data.status_icon != '2222.png' && data.status_icon != '2.png' && index != '0') {
                    this.navCtrl.push(this.ProceedPages[type], { data: data, settings: this.beachsettings, gridSettings: this.gridSettings, title: this.title, index: index, location: location, search: this.SearchObj, pool: ElementPool, change: this.change, reservation: this.navParams.data.reservation });
                }
                /* else if (data && !data.status_icon) {
                     this.navCtrl.push(this.ProceedPages[type], { data: data, settings: this.beachsettings, gridSettings: this.gridSettings, title: this.title, index: index, location: location, search: this.SearchObj, pool: ElementPool, change: this.change, reservation: this.navParams.data.reservation });
                 } else {
                    
                 }*/
            }
        }

    }

    showWaterMenu($event: any) {
        let popover = this.popoverCtrl.create(PopoverWeather, { popover: true, beach_ids: this.beach_id, settings: this.beachsettings, title: this.title }, { cssClass: 'weather-popover' });
        popover.present({
            ev: $event
        }).then(() => {
        });
        popover.onDidDismiss((e) => {
        })
        console.log("weather",$event);
    }

    presentCalendar() {
        let calendarInst = this.popoverCtrl.create(CalendarPopoverPage, { options: { pickMode: 'single' } })
        calendarInst.present();
        calendarInst.onDidDismiss((data: any) => {
            if (data) {
                this.currentDate = this.getDateFormat(new Date(data.format()));
            }
        })
    }

    getBeachSearch(removeLoader?: boolean) {

        if (this.beach_id) {
            /* this.configuration.getStorage('beach').then((a:any)=> {
               if (a && a[this.beach_id] && a.time && moment(moment.now()).diff(a.time, 'minutes') < 10) {
                 this.grid = a[this.beach_id + this.currentDate]
                 this.startZoom()
                 return;
               }  })*/

            //  let searchParams = JSON.parse(JSON.stringify(this.SearchObj));
            //  searchParams.search_date = this.getLocalDateTime(searchParams.search_date);
            //  searchParams.start_date = this.getLocalDateTime(searchParams.start_date);
            //  searchParams.end_date = this.getLocalDateTime(searchParams.end_date);
            this.api.get('grid/' + this.beach_id, { date: this.currentDate }, { 'Content-Type': 'application/json' }, true, true).subscribe(r => {
                if (r && r.setting) {
                    this.helper.gridHeight = r.setting.height;
                    this.helper.gridWidth = r.setting.width;
                    this.helper.sizeLogic(r.setting.height, r.setting.width);
                    if (!this.isFinishZoom && !this.isZooming) {
                        this.unit = 'px';
                        this.ratio = this.sWidth / r.setting.width;
                        this.maxScale = (80 / this.seatWidth) / this.ratio;
                        this.originalScale = 1;

                    }
                }
                /*  if(r && r.grid){
                    this.helper.gridWidth=Math.max(Math.max(r.grid.front[0]?r.grid.front[r.grid.front.length-1].coords.x:0,r.grid.middle[0]?r.grid.middle[r.grid.middle.length-1].coords.x:0),r.grid.back[0]?r.grid.back[r.grid.back.length-1].coords.x:0);
                    this.helper.gridHeight=Math.max(Math.max(r.grid.front[0]?r.grid.front[r.grid.front.length-1].coords.y:0,r.grid.middle[0]?r.grid.middle[r.grid.middle.length-1].coords.y:0),r.grid.back[0]?r.grid.back[r.grid.back.length-1].coords.y:0);
                    this.grid = r.grid;

                  }*/
                if (r && r.grid) {
                    const oldGrid = JSON.stringify(this.grid);
                    const newGrid = JSON.stringify(r.grid);
                    if (oldGrid !== newGrid) {
                        this.grid = r.grid;
                        this.gridRefreshed();
                    }
                }
                if (r && r.setting) {
                    const oldSettings = JSON.stringify(this.gridSettings);
                    const newSettings = JSON.stringify(r.setting);
                    if (oldSettings !== newSettings) {
                        this.gridSettings = r.setting;
                    }
                }
                //  if(!this.isPulling)
                let timeout = setTimeout(() => {
                    this.isPulling = true;
                    //   if(this.helper.isFinishAuth===true) {
                    this.getBeachSearch();
                    //  }
                }, this.pollingInterval);

                this.configuration.setTimeout(timeout);

                //  this.configuration.setStorage('beach', {[this.beach_id + this.currentDate]: r, time: moment.now()});
            }, error => {
            });
        }
    }

    BeachSegmentChanged() {
        if (this.beachSection == 'menu') {
            this.getMenu();
            this.configuration.ClearTimeout();
        } else {

            this.zooming();
            this.GridPool();

        }

    }

    GridPool() {
        if (this.context === 'search') {
            this.searchPool();
        } else {
            this.getBeachSearch();
        }
    }
    getBeachUmbrellaSetting() {
        let beach_id = this.navParams.data.id;
        let beach_settings = JSON.parse(localStorage.beachsettings);
        let beach_setting = beach_settings.filter((setting) => {
            return beach_id == setting.beach_id;
        })[0];
        let umbrellaSetting = beach_setting['umbrella'];
        if (!umbrellaSetting) {
           
        }
        return umbrellaSetting;
    }
    getStatusClass(li) {


        let type = li.type,
            cls = type.substr(0, 1),
            getStatus = function (list) {
                let no = 1;
                for (let i = 0; i < list.length; i++) {
                    if (list[i] == 'booked' || list[i] == 'pending' || list[i] == 'occupied') {
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

        try {
            if (type == 'umbrella') {
                let umbrella = this.getBeachUmbrellaSetting();
                let one = umbrella['person-num']['one']['occupy-all-seats'] || false;
                let single_sides = ['u_1_2', 'u_2_1'];
                let full_sides = 'u_2_2';
                if (one && single_sides.indexOf(cls) > -1) {
                    cls = full_sides;
                }
            }
        } catch (e) {
           
        }
        return cls;

    }
    gridRefreshed() {
        const fullClassList = ['u_2_2', 'u_2', 'b_2'];
        Object.keys(this.grid).forEach((side: any) => {
            let list = this.grid[side];
            list.map((li: any) => {
                li.img = this.getPosImg(li);
                li.style = this.getItemStyle(li);
                let cls = this.getStatusClass(li);
                li.status_class = cls;
                li.isFull = (fullClassList.indexOf(cls) > -1) ? true : false;
            });
        })
       
        this.getFullWidth();
    }

    getLocalDateTime(date: number) {
        let dateObj = new Date(date);
        let hoursWithTimezone = dateObj.getHours() + ((-1) * (dateObj.getTimezoneOffset() / 60))

        return new Date(new Date(date).setHours(hoursWithTimezone)).getTime();
    }

    private searchPool() {
        return false;
        /*

        let searchObject = {

            beach_ids: [this.beach_id],
            start_date: this.SearchObj.start_date,
            end_date: this.SearchObj.end_date,
            // latitude:this.SearchObj.latitude,
            // longitude:this.SearchObj.longitude,
            seat_type: this.SearchObj.seat_type,
            seat_zone: this.SearchObj.seat_zone,
            person_num: this.SearchObj.person_num,
            customer_id: this.SearchObj.customer_id,
            refresh: this.SearchObj.refresh,
            timezone: this.SearchObj.timezone
        };

        // this.SearchObj.beach_ids = [this.beach_id];
        if (this.SearchObj && this.SearchObj.customer_id) {
            this.SearchObj.refresh = true;
            searchObject.refresh = true;

            let searchParams = JSON.parse(JSON.stringify(searchObject));
            searchParams.start_date = this.getLocalDateTime(searchParams.start_date);
            searchParams.end_date = this.getLocalDateTime(searchParams.end_date);

            this.api.post('search', searchParams, {}, true).subscribe(r => {

                if (r && r.setting) {
                    this.helper.gridHeight = r.setting.height;
                    this.helper.gridWidth = r.setting.width;
                    this.helper.sizeLogic(r.setting.height, r.setting.width);
                }
                
                if (r && r.grid)
                    this.grid = r.grid;
                this.gridRefreshed();
                if (!this.isFinishZoom && !this.isZooming) {
                    this.originalScale = 1;
                    this.scale = 1;
                    this.zooming();
                }

                let timeout = setTimeout(() => {
                    this.isPulling = true;
                    //   if(this.helper.isFinishAuth===true) {
                    //Comment this line to stop pooling
                    // this.GridPool();
                    //  }
                }, this.pollingInterval);
                this.configuration.setTimeout(timeout);

            }, error => {
                console.error('grid pool error');
            });
        } */
    }

    getBeach(removeLoader?: boolean) {
        if (this.beach_id) {

            var items = undefined;

            if (this.navParams.data.data !== null) {
                items = this.navParams.data.data.items;
            }
            /* this.configuration.getStorage('beach').then((a:any)=> {
               if (a && a[this.beach_id] && a.time && moment(moment.now()).diff(a.time, 'minutes') < 10) {
                 this.grid = a[this.beach_id]
                 this.startZoom();
                 return;
               }        })*/


            let searchObject = {

                beach_ids: [this.beach_id],
                start_date: this.SearchObj.start_date,
                end_date: this.SearchObj.end_date,
                // latitude:this.SearchObj.latitude,
                // longitude:this.SearchObj.longitude,
                seat_type: this.SearchObj.seat_type,
                seat_zone: this.SearchObj.seat_zone,
                person_num: this.SearchObj.person_num,
                customer_id: this.SearchObj.customer_id,
                refresh: this.SearchObj.refresh,
                timezone: this.SearchObj.timezone
            };


            let searchParams = JSON.parse(JSON.stringify(searchObject));
            searchParams.start_date_formatted = this.dp.transform(new Date(searchParams.start_date), "yyyy-MM-dd");
            searchParams.end_date_formatted = this.dp.transform(new Date(searchParams.end_date), "yyyy-MM-dd");
            searchParams.start_date = this.getLocalDateTime(searchParams.start_date);
            searchParams.end_date = this.getLocalDateTime(searchParams.end_date);
            searchParams.view_type = 'grid';

            // this.api.post('grid/' + this.beach_id + '/custom', { items: items }, { 'Content-Type': 'application/json' }, removeLoader).subscribe(r => {
            this.api.post('search', searchParams, {}, true).subscribe(r => {

                r = r[0];
                //  r.grid = mergeGrids(r.grid, r.grid2);

                if (r && r.setting) {
                    this.helper.gridHeight = r.setting.height;
                    this.helper.gridWidth = r.setting.width;
                    this.helper.sizeLogic(r.setting.height, r.setting.width);
                }
                // ------------------------ Grid Ratio ---------------------------
                if (!this.isPulling && !this.isFinishZoom && !this.isZooming) {
                    this.unit = 'px';
                    this.ratio = this.sWidth / r.setting.width;
                    this.maxScale = (80 / this.seatWidth) / this.ratio;
                    this.originalScale = 1;
                    this.scale = 1;
                    // this.unit = 'vh';
                    // let vH = this.constVal * this.sHeight / 100;
                    // let rr = vH / 30;
                    // this.ratio = this.sHeight / (r.setting.height * rr);
                    // }
                }
                // -------------------------- End -------------------------------
                /* this.helper.gridWidth=Math.max(Math.max(r.grid.front[0]?r.grid.front[r.grid.front.length-1].coords.x:0,r.grid.middle[0]?r.grid.middle[r.grid.middle.length-1].coords.x:0),r.grid.back[0]?r.grid.back[r.grid.back.length-1].coords.x:0);
                 this.helper.gridHeight=Math.max(Math.max(r.grid.front[0]?r.grid.front[r.grid.front.length-1].coords.y:0,r.grid.middle[0]?r.grid.middle[r.grid.middle.length-1].coords.y:0),r.grid.back[0]?r.grid.back[r.grid.back.length-1].coords.y:0);
                 */
                if (r && r.grid) {
                    this.grid = r.grid;
                    this.gridRefreshed();
                    this.GridPool();

                    this.zooming();
                }

                // this.configuration.setStorage('beach', {[this.beach_id]: r, time: moment.now()});
            }, error => {
               
            });
        }
    }

    getMenu() {
        if (this.beach_id) {
            this.configuration.getStorage('menu').then((a: any) => {
                if (a && a[this.beach_id] && a.time && moment(moment.now()).diff(a.time, 'minutes') < 10) {
                    this.menu = a[this.beach_id + this.currentDate];
                    return;
                }
                this.api.get('menu/' + this.beach_id, {}, { 'Content-Type': 'application/json' }, false, true).subscribe(r => {
                    this.menu = r;
                    this.configuration.setStorage('menu', { [this.beach_id + this.currentDate]: r, time: moment.now() });
                }, error => {

                });
            });
        }
    }

    getPageInfo(isQuickSearch: boolean) {
        if (this.isFinishZoom) {
            this.isFinishZoom = false;
        }
        if (this.navParams.data.change) {
            this.change = this.navParams.data.change;
            this.searchPool();
            return;
        }
        // if (isQuickSearch) {

        //     this.api.post('grid/' + this.beach_id + '/custom', { items: this.navParams.data.data.items }, { 'Content-Type': 'application/json' }, true).subscribe(r => {
        //         if (r && r.setting) {
        //             this.helper.gridHeight = r.setting.height;
        //             this.helper.gridWidth = r.setting.width;
        //             this.helper.sizeLogic(r.setting.height, r.setting.width);
        //         }
        //         // ------------------------ Grid Ratio ---------------------------
        //         if (!this.isPulling && !this.isFinishZoom && !this.isZooming) {
        //             this.unit = 'px';
        //             this.ratio = this.sWidth / r.setting.width;
        //             this.maxScale = (80 / this.seatWidth) / this.ratio;
        //             this.originalScale = 1;
        //             this.scale = 1;
        //         }
        //         if (r && r.grid) {
        //             this.grid = r.grid;
        //             this.GridPool();
        //         }

        //     }, error => {

        //     });
        //     if (!this.navParams.data.startD) {
        //         this.BeachSegmentChanged();
        //     }

        // } else {
        this.getBeach();
        //}
    }

    startZoom(): void {

        this.helper.isFinishAuth = false;

        this.helper.resetZoom();
        setTimeout(() => {
            // this.helper.initializeZoom(this.zoom.nativeElement, this.content, this.header.nativeElement, this.elements.nativeElement, this.wave.nativeElement);
            // this.helper.autoZoom();
        }, 10000);

    }

    IsItMyBooking(statusIcon: string, customer: any) {
        let match = '';
        if (customer && customer.customer)
            match = this.MakeMatch(customer.customer, statusIcon);
        else
            match = statusIcon;
        return match;
    }

    ionViewWillLeave() {
        if (this.timeInstance) {
            clearInterval(this.timeInstance);
            this.isZooming = false;
        }
    }

    ionViewWillUnload() {
        this.sub1$.unsubscribe();
        this.sub2$.unsubscribe();
        this.configuration.ClearTimeout();

        try {
            this.helper.ZoomData.gesture.destroy();
        } catch (e) {
            console.error('trying to destroy un-initialized gesture')
        }
        this.events.unsubscribe('nav:back');
    }


    getIndex(childIndex: number, location: string) {
        if (location == 'front') {
            return ((this.grid.front ? this.grid.front.length : 0)) + (childIndex + 1)
        } else if (location == 'middle') {
            return (((this.grid.middle && this.grid.middle ? this.grid.middle.length : 0)) + (childIndex + 1)) + ((this.grid.front.length) * (this.grid.front.length))
        } else if (location == 'back') {
            return (((this.grid.back && this.grid.back ? this.grid.back.length : 0)) + (childIndex + 1)) + ((this.grid.front.length) * (this.grid.front.length)) + ((this.grid.middle.length) * (this.grid.middle.length))
        }
    }

    selectTopping(toppings: any, index: number) {
        if (this.selectedToppings[index]) {
            delete this.selectedToppings[index];
            this.isMenuDetails.data.price = (this.isMenuDetails.data.price | 0) - (toppings.price | 0);

        } else {
            this.selectedToppings[index] = toppings;
            this.isMenuDetails.data.price = (this.isMenuDetails.data.price | 0) + (toppings.price | 0);
        }

    }

    private MakeMatch(customer: any, statusicon: string) {
        for (let i in customer) {
            if (customer && customer[i] && customer[i].id == this.customer.id) {
                return customer[i].status_icon
            }
        }
        return statusicon;
    }

    isFreeSeats(item: any): boolean {
        return false
    }

    /// ----- Grid Property -----------
    getPosImg(item) {
        let img = this.imgPath + this.beach_id + '/elements/';
        if (item.type == 'static') {
            img = item.image;
        } else {
            img += item.image;
        }
        item.img = img;
        return img;
    }

    getItemStyle(item: any) {
        let coord = item.coords;
        let width = item.info.mapElement.size.width,
            height = item.info.mapElement.size.height;
        let style = {
            'left': `${coord.x * this.ratio}${this.unit}`,
            'top': `${coord.y * this.ratio}${this.unit}`,
            'width': `${width * this.ratio}${this.unit}`,
            'height': `${height * this.ratio}${this.unit}`
        }
        item.style = style;
        return style;
    }

    getPosStyle(coord: any): any {

        let style = {
            'left': `${coord.x * this.ratio}${this.unit}`,
            'top': `${coord.y * this.ratio}${this.unit}`,
            'width': `${this.seatWidth * this.ratio}${this.unit}`,
            'height': `${this.seatHeight * this.ratio}${this.unit}`
        }
        return style;
    }
    getMax() {

        let maxX = 0, maxY = 0;
        let list = [];
        let getNumber = function (size) {
            try {
                let no = size.substr(0, size.length - 2);
                return parseFloat(no);
            } catch (e) {
                console.error("Get number funciton Error ", size);
            }
        }
        if (this.grid && this.grid.front) {
            list = list.concat(this.grid.front);
        }
        if (this.grid && this.grid.middle) {
            list = list.concat(this.grid.middle);
        }
        if (this.grid && this.grid.back) {
            list = list.concat(this.grid.back);
        }
        for (let item of list) {
            if (item.style) {
                let style = item.style,
                    x = getNumber(style.left),
                    y = getNumber(style.top),
                    w = getNumber(style.width),
                    h = getNumber(style.height);
                maxX = Math.max(maxX, x + w),
                    maxY = Math.max(maxY, y + h);
            }
        }

        return { x: maxX, y: maxY };
    }

    getFullWidth() {
        const max = this.getMax();
        let ratio = this.ratio;
        ratio = 1;
        let style = {
            display: 'block',
            width: `${(max.x + this.padding) * ratio}px`,
            height: `${(max.y + this.padding) * ratio}px`
        };
        this.containerStyle = style;
        return style;
    }
    getStatusHeight(status: Array<any>): any {
        let style = {
            'height': `${this.mStatusH / status.length}${this.unit}`
        }
        return style;
    }

    zooming() {
        let self = this;
        this.isZooming = true;
        const timerInterval = setInterval(() => {
            if (self.ratio > 0) {
                self.zoomAction();
                clearInterval(timerInterval);
            }
        }, 30);
    }
    timeInstance: any = false;
    zoomAction() {

        this.timeInstance = setInterval(() => {
            if (this.isFinishZoom) {
                this.isZooming = false;
                clearInterval(this.timeInstance);
                this.timeInstance = false;
                return;
            }
            this.scale += 0.05;
            const container = document.getElementById('container');
            container.style.transform = `scale(${this.scale * this.originalScale})`;
            if (this.scale >= this.maxScale / 2) {
                this.ngZone.run(() => {
                    this.isFinishZoom = true;
                    this.originalScale = this.scale * this.originalScale;
                    this.scale = 1;
                    this.defineZoomAction();
                })
            }
        }, 30);
    }
    // -----
    gesture: Gesture;
    pinching = false;
    originalScale = 1;
    scale = 1;
    maxScale = 1;
    defineZoomAction() {
        this.gesture = new Gesture(this.content.getElementRef().nativeElement);
        this.gesture.listen();
        this.gesture.on('pinch', (event) => {
            if (!this.pinching) return;
            if (event.scale === 1) {
                this.pinchEnd();
            } else {
                const scrollView = document.querySelector('#content .scroll-content'), container = document.getElementById('container');

                if (event.scale * this.originalScale < 1 || event.scale * this.originalScale > this.maxScale) return;

                let scrollLeft = scrollView.scrollLeft, scrollTop = scrollView.scrollTop;

                scrollLeft = scrollLeft * event.scale / this.scale + (event.scale / this.scale - 1) * scrollView.clientWidth / 2;
                scrollTop = scrollTop * event.scale / this.scale + (event.scale / this.scale - 1) * scrollView.clientHeight / 2;

                this.scale = event.scale;
                container.style.transform = `scale(${this.scale * this.originalScale})`;

                scrollView.scrollLeft = scrollLeft > 0 ? scrollLeft : 0;
                scrollView.scrollTop = scrollTop > 0 ? scrollTop : 0;

            }
        });
        this.gesture.on('pinchstart', (event) => {

            const scrollView = document.querySelector('#content .scroll-content');

            this.pinching = true;
        });
        this.gesture.on('pinchend', () => {
            this.pinchEnd();
        });
    }

    pinchEnd() {
        if (!this.pinching || this.scale === 1) return;

        setTimeout(() => {
            this.pinching = false;
        }, 10);


        this.originalScale = this.originalScale * this.scale;
        this.scale = 1;
    }
}
