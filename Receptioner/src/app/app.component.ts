import { Tools } from './../providers/tools';
import { Component, ViewChild, NgZone } from '@angular/core';
import { Platform, Events, PopoverController, Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CalendarPopoverPage } from '../pages/include/calendar-popover/calendar-popover';
import { TranslateService } from '@ngx-translate/core';
import { CustomBootstrap } from './BootstrapFirstRun';
import { Keyboard } from '@ionic-native/keyboard';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { ApiProvider } from '../providers/services';
import * as moment from 'moment';
import { CodegenComponentFactoryResolver } from '@angular/core/src/linker/component_factory_resolver';
import { JsonPipe } from '@angular/common';


declare var window: any;

@Component({
    templateUrl: 'app.html',
})
export class MyApp {
    @ViewChild(Nav) navCtrl: Nav;
    rootPage: any = `page-auth`;

    isAuthState: boolean = true;
    freeSunbeds: number = 0;
    notifications: number = 0;
    activeTabNum: number = 2;
    tabSunbedsActive: boolean = true;
    isShowFree: boolean = false;
    hideShowFree: boolean = true;
    activePage: string = 'notifications';
    totalSeats =0;
    totalOcuppied = 0;
    percent:number=0;
    selDate: {
        from: any,
        to: any,
        period: any,
        isToday: boolean
    } = {
            from: 'Today',
            to: new Date().toISOString().slice(0, 10),
            period: 0,
            isToday: false
        };
    defaultDate: any;
    dateObj: {
        from: any,
        to: any
    } = {
            from: null,
            to: null
        };
    buffRange: {
        from: Date,
        to: Date
    } = {
            from: new Date(),
            to: new Date()
        };

    modalState: any = {}; // modal popup
    selectedDay: string = '0';
    constructor( private platform: Platform, private tools: Tools, public config: CustomBootstrap, statusBar: StatusBar, splashScreen: SplashScreen, public events: Events, private keyboard: Keyboard,
        public popoverCtrl: PopoverController, public translate: TranslateService, private startBoostrapping: CustomBootstrap, private ngZone: NgZone,
        public push: Push, public api: ApiProvider, public alert : AlertController
    ) {
        this.platform.ready().then(() => {
            this.ngZone = new NgZone({
                enableLongStackTrace: false
            });
            this.ngZone.run(() => {
                        // Okay, so the platform is ready and our plugins are available.
                // Here you can do any higher level native things you might need.
                statusBar.styleDefault();
                splashScreen.hide();


                // this.translate.setDefaultLang('en');

                this.initPageEvents();

                this.config.setStorage('notifications', 0);


                this.firstScreenRun();

                if (this.platform.is('cordova')) {
                    // this.keyboard.disableScroll(true);
                    this.push.hasPermission()
                        .then((res: any) => {

                            if (res.isEnabled) {

                                console.log('We have permission to send push notifications');
                            } else {
                                
                                console.log('We do not have permission to send push notifications');
                            }

                        });

                    // Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
                    this.push.createChannel({
                        id: "testchannel1",
                        description: "My first test channel",
                        // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
                    importance: 3
                    }).then(() => console.log('Channel created'));

                    // Delete a channel (Android O and above)
                    this.push.deleteChannel('testchannel1').then(() => console.log('Channel deleted'));

                    // Return a list of currently configured channels
                    this.push.listChannels().then((channels) => console.log('List of channels', channels))

                    // to initialize push notifications

                    const options: PushOptions = {
                        android: {
                            senderID: '494805758050',
                            sound: true,
                            vibrate: true,
                            icon: 'icon'
                        },
                        ios: {
                            alert: true,
                            badge: true,
                            sound: true,
                        }
                    };

                    const pushObject: PushObject = this.push.init(options);

                    pushObject.on('notification').subscribe((notification: any) => {
                        this.events.publish('app:notification', notification.additionalData);
                    });

                    pushObject.on('registration').subscribe((registration: any) => {

                        this.api.fcmToken = registration.registrationId;

                        console.log(this.api.fcmToken);
                    });

                    pushObject.on('error').subscribe(error => {
                        console.error('Error with Push plugin', error)
                    });

                 }
            });
        });
        this.events.subscribe('app:showPercent', ((grid) => this.getAllSeats(grid)));

    }
    

    async firstScreenRun() {
        const waiting_message = await this.translate.get('Messages.PLEASE_WAIT').toPromise();
        const updating_message = await this.translate.get('Messages.UPDATING').toPromise();

        this.startBoostrapping.apiData.Busymessage = updating_message;
        this.startBoostrapping.apiData.AmBusy(this.startBoostrapping.apiData.Busymessage);
        this.startBoostrapping.Load().then(r => {
            console.log('bootstrap completed');
            this.startBoostrapping.apiData.AmBusy(this.startBoostrapping.apiData.Busymessage);
            this.startBoostrapping.apiData.Busymessage = waiting_message;
            this.IsDeviceLoggedIn();
        }, async (error) => {
            const error_title = await this.translate.get('Messages.UNABLE_START').toPromise();
            const upserted_message = await this.translate.get('Messages.NOT_UPSERTED').toPromise();
            this.startBoostrapping.apiData.AmBusy(this.startBoostrapping.apiData.Busymessage);
            this.startBoostrapping.apiData.Busymessage = waiting_message;
            this.startBoostrapping.apiData.AmError(error_title, upserted_message, [{
                text: 'Close',
                handler: () => {
                    this.platform.exitApp();
                }
            }, {
                text: 'Retry',
                handler: () => {
                    this.firstScreenRun();
                }
            }])
        });
    }

    IsDeviceLoggedIn() {

        this.startBoostrapping.getStorage('login').then((a) => {

            if (a && a.token) {
                let beach_id = localStorage.beach_id || null;
                this.api.get('beach-status/' + beach_id + '/', {}, {}).subscribe(item => {
                    if (item.success) {
                        this.rootPage = `page-notification`;
                    } else {
                        this.onLogOut({});
                    }
                }, error => {
                    this.onLogOut({});
                });

            } else {
                this.rootPage = `page-auth`;
            }

        }, error => {
            this.rootPage = `page-auth`;
        });

    };

    ionViewDidLoad() {
        console.log('did load app.html');
    }

    initPageEvents() {

        this.events.subscribe('app:activePage', num => {
            this.activePage = num;
        });

        this.events.subscribe('app:freeAmount', num => {
            this.freeSunbeds = num;
        });

        this.events.subscribe('app:notify', num => {
            this.notifications = num;
            this.config.setStorage('notifications', num);
        });

        this.events.subscribe('app:reloadGrid', period => {
            this.activeTabNum = 1;
            this.selDate.from = period.from;
            this.selDate.to = period.to;
        });

        this.events.subscribe('app:authState', (status) => {

            this.isAuthState = status;

            // If device is still logged in ...
            if (!this.isAuthState) {

                this.config.getStorage('beach_settings').then(r => {

                    if (r != null) {

                        const working_date_start = r.working_dates && r.working_dates.length ? `${(new Date().getFullYear())}-${r.working_dates[0].start['month']}-${r.working_dates[0].start['day']}` : undefined;
                        const working_date_end = r.working_dates && r.working_dates.length ? `${(new Date().getFullYear())}-${r.working_dates[0].end['month']}-${r.working_dates[0].end['day']}` : undefined;


                        this.config.getStorage('period').then(rs => {

                            if (rs != null) {

                                this.selDate = {
                                    from: rs.from,
                                    to: rs.to,
                                    period: this.tools.getPeriod(rs.from, rs.to),
                                    isToday: this.tools.getToday() == rs.from ? true : false
                                };

                                this.config.setStorage('period', this.selDate);

                            } else {

                                let tempSelDate = {
                                    from: working_date_start,
                                    to: working_date_end,
                                    period: this.tools.getPeriod(working_date_start, working_date_end),
                                    isToday: this.tools.getToday() == working_date_start ? true : false
                                };

                                if ((new Date(this.tools.getToday())).getTime() <= (new Date(this.selDate.from)).getTime()) {

                                    this.selDate.to = this.selDate.from;
                                    this.selDate.isToday = false;

                                } else {

                                    this.selDate.from = this.tools.getToday();
                                    this.selDate.to = this.tools.getToday();
                                    this.selDate.isToday = true;

                                }

                                this.selDate = tempSelDate;

                                this.config.setStorage('period', this.selDate);
                            }

                            this.defaultDate = {
                                from: working_date_start,
                                to: working_date_end
                            };

                        });

                    } else {

                        this.selDate = {
                            from: new Date().toISOString().slice(0, 10),
                            to: new Date().toISOString().slice(0, 10),
                            period: 0,
                            isToday: true
                        };

                        if (!this.defaultDate) {

                            this.defaultDate = {
                                from: this.selDate.from,
                                to: this.selDate.to
                            };

                        }

                        this.config.setStorage('period', this.selDate);

                    }

                });

            }

        });

    }
    activePeriod = false;

    tabAction(id: number) {

        this.activeTabNum = id;
        let view = this.navCtrl.getActive();

        if (this.activeTabNum == 1 && view.component.name !== 'GridPage') { // Grid
            this.hideShowFree = false;
            this.activePeriod = true;

            this.navCtrl.setRoot(`page-grid`);

        } else if (this.activeTabNum == 2 && view.component.name !== 'NotificationPage') { // Notifications
            this.hideShowFree = true;
            this.activePeriod = false;
            this.navCtrl.setRoot(`page-notification`);

            if (this.notifications > 0) {
                this.notifications = 0;
            }

        } else if (this.activeTabNum == 3) { // Free sunbeds
            this.hideShowFree = false;

            if (this.tabSunbedsActive === false) return;

            // if (this.freeSunbeds == 0) return;

            this.tabSunbedsActive = false;

            this.events.publish('app:presentSunbedModal');

            let timer = setTimeout(() => {
                this.ngZone.run(() => {
                    this.tabSunbedsActive = true;
                    clearTimeout(timer);
                });
            }, 1000);

        }

    }

    onClickShowFree() {
        this.isShowFree = !this.isShowFree;
        this.events.publish('app:showFree', this.isShowFree);
    }

    // updateTodayDate() {
    // 	let now = new Date();
    // 	let hours = now.getHours();
    // 	let minutes = now.getMinutes();
    // 	let seconds = now.getSeconds();

    // 	let isSelDateToday = now.getDate() === new Date(this.selDate.from).getDate();
    // 	let isDefaultDateToday = now.getDate() === new Date(this.defaultDate.from).getDate();

    // 	let isSelDatePast = now.getDate() > new Date(this.selDate.from).getDate();
    // 	let isDefaultDatePast = now.getDate() > new Date(this.defaultDate.from).getDate();

    // 	if(isSelDateToday){
    // 		this.selDate.from = isSelDateToday ? new Date(new Date(this.selDate.from).setHours(hours, minutes, seconds)) : this.selDate.from;
    // 		this.selDate.to = this.selDate.to;
    // 		this.selDate.period = this.tools.getPeriod(this.selDate.from, this.selDate.to);
    // 		this.selDate.isToday = this.tools.getToday() == this.selDate.from;
    // 	}
    // 	else if(isSelDatePast) {

    // 	}
    // 	else{

    // 	}

    // }

    shortDate(date) {
        return date.substring(5);
    }

    openGridDay(add: string) {
      
        this.selectedDay = add;
        let date = moment().add(add, 'days').format('Y-MM-DD');
        console.log('DATE: ', date);

        this.selDate.from = date;
        this.selDate.to = date;
        this.selDate.period = 0;

        if (this.tools.getToday() == this.selDate.from) {
            this.selDate.isToday = true;
        }
       

        this.ngZone.run(() => {


            let eventName;

            if (this.activeTabNum === 1) {
                eventName = 'app:selectPeriodMap';
            } else if (this.activeTabNum === 2) {
                eventName = 'app:selectPeriodNotifications';
            }

            if (eventName) {

                // Inform Grid/Notification page with selected date
                this.events.publish(eventName, {
                    period: this.selDate,
                    page: this.activeTabNum
                });

            }

        });

        this.config.setStorage('period', this.selDate);
    }

    // new Tommorow icon click functionality
    openGridTomorrow(add: string) {
     
        this.selectedDay = add;
        let date = moment().add(add, 'days').format('Y-MM-DD');
        console.log('DATE: ', date);

        this.selDate.from = date;
        this.selDate.to = date;
        this.selDate.period = 0;
        // console.log(this.tools.getToday());
        // console.log(this.selDate.from);

        if (this.tools.getToday() != this.selDate.from) {
            this.selDate.isToday = false;
        }

        this.ngZone.run(() => {
            let eventName;

            if (this.activeTabNum === 1) {
                eventName = 'app:selectPeriodMap';
            } else if (this.activeTabNum === 2) {
                eventName = 'app:selectPeriodNotifications';
            }

            if (eventName) {

                // Inform Grid/Notification page with selected date
                this.events.publish(eventName, {
                    period: this.selDate,
                    page: this.activeTabNum
                });

            }

        });

        this.config.setStorage('period', this.selDate);

    }

    openPeriod(add: string) {
       debugger;
        if (!this.activePeriod) return;
       
        let options = {
            pickMode: 'range',
            from: this.defaultDate.from,
            to: this.defaultDate.to,
            defaultDateRange: this.selDate
        };
       
        
        if( this.selDate.from < this.tools.getToday() ){
            this.selDate.from = this.tools.getToday();
            this.selDate.to = this.tools.getToday();
            options = {
                pickMode: 'range',
                from: this.selDate.from,
                to: this.selDate.to,
                defaultDateRange: this.selDate
            };
        }
        else if (this.selDate.isToday) {
            options.from = this.selDate.from;
        }
        else {  // condition for calander icon -- 
            
           // options.from = this.selDate.from;
           options.from =  this.tools.getToday();
        }


        let popover = this.popoverCtrl.create(CalendarPopoverPage, { options }, { cssClass: 'Calendar' });

        this.events.publish('Calendar', popover);

        popover.present();

        popover.onDidDismiss((date: any) => {
            if (!date) return;

            if (date.isSingle) {

                this.selDate.from = date.from;
                this.selDate.to = date.to;
                this.selDate.period = 0;

                // changes for grid tommorow function
                if (this.tools.getToday() == this.selDate.from) {
                    this.selDate.isToday = true;
                }
                else {
                    this.selectedDay = add;
                    this.selDate.isToday = false;
                }


            } else {
                this.selectedDay = add;
                this.selDate.from = date.from;
                this.selDate.to = date.to;
                this.selDate.period = this.tools.getPeriod(date.from, date.to);
                this.selDate.isToday = this.tools.getToday() == this.selDate.from;
               
            }

            this.buffRange.from = this.selDate.from;
            this.buffRange.to = this.selDate.to;

            this.ngZone.run(() => {

                let eventName;

                if (this.activeTabNum === 1) {
                    eventName = 'app:selectPeriodMap';
                } else if (this.activeTabNum === 2) {
                    eventName = 'app:selectPeriodNotifications';
                }

                if (eventName) {

                    // Inform Grid/Notification page with selected date
                    this.events.publish(eventName, {
                        period: this.selDate,
                        page: this.activeTabNum
                    });

                }

            });

            this.config.setStorage('period', this.selDate);
            console.log("OpenPeriod :seldata ",this.selDate);

        });

        

    }
    getAllSeats(grid){
        this.totalSeats = 0;
        this.totalOcuppied  = 0;
        this.percent    = 0;
        if(grid){
            Object.keys(grid).map((seats) => {
                
               grid[seats].forEach(item => {
                let total = 0;
                let total_occupied = 0;
                if(item.type == "umbrella"||item.type == "baldaquin"){

                    item.status.forEach(status => {
                        Object.keys(status).map((side)=>{
                            status[side].forEach(seat => {
                                if(seat != "available"){
                                    total_occupied++;
                                }
                                total ++;
                            });
                        });
                    });
                    if(item.sides == 1){
                        total = total * item.seats;
                        total_occupied = total_occupied * item.seats;
                    }

                }
                this.totalSeats+=total;
                this.totalOcuppied+=total_occupied;
               });
            });
    
        }
        this.percent = Math.floor( this.totalOcuppied/this.totalSeats*100 );
    }
    onLogOut(event) {

        this.api.get(`fcm/${this.api.fcmToken}/remove`, {}, {}, true).subscribe(item => {

            this.activeTabNum = 2;
            this.hideShowFree = true;
            this.events.publish('app:authState', true);
            this.navCtrl.setRoot('page-auth');

            this.config.clearStorage();
            localStorage.clear();
        }, error => {

            this.activeTabNum = 2;
            this.hideShowFree = true;
            this.events.publish('app:authState', true);
            this.navCtrl.setRoot('page-auth');

            this.config.clearStorage();
            localStorage.clear();
        })

    }
    searchDevices(){
        window.DatecsPrinter.listBluetoothDevices(
            function (devices) {
                console.log(devices);
                window.DatecsPrinter.connect(devices[0].address, 
                    function() {
                      
                    },
                    function(error) {
                      alert(JSON.stringify(error));
                    }
                  );
            },
            function (error) {
              alert(JSON.stringify(error));
            }
          );
    }
}

