import { Component, OnInit, ViewChild, NgZone } from '@angular/core'

import { SearchPage } from '../search/search';
import { Events, NavController, PopoverController, App, Tabs, Tab, AlertController, Platform, Popover } from "ionic-angular";
import { LoginPage } from "../login/login";
import { Storage } from '@ionic/storage';
import { CustomBootstrap } from "../../app/BootstrapFirstRun";
import { myReservation } from "../myReservation/myReservation";
import { ApiProvider } from "../providers/services";
import { MenuPage } from '../menu/menu';
import { TranslateService } from '@ngx-translate/core';
import { searchDupplication } from '../includes/searchDupplication/searchDupplication';
import { MyprofilePage } from "../myprofile/myprofile";
import { Notification } from '../providers/interface';
import { EventsThisWeek } from '../includes/events/eventsThisWeek';
import {SplashScreen} from "@ionic-native/splash-screen";
import {ChatPage} from "../chat/chat";
@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {

    @ViewChild('myTabs') tabRef: Tabs;

    veiwMapState: boolean = false;
    isMenuShown: boolean = false;
    showquit : boolean = false;
    badge: {
        cart: {
            count: number,
            data: any,
            beach_id: string,
            reserve_id: string,
            mention: string
        }
    };
    beachRootParam: { id: string, startD: string, title2: string, reserveId: string } = { id: '', startD: '', title2: '', reserveId: '' };
    unlockReservation: boolean = false;
    tab1Root = SearchPage;
    tab2Root: any = myReservation;
    tab3Root: any = MenuPage;
    // tab4Root: any = PlaceMapPage;
    tab5Root = MyprofilePage;
    chatRoot = ChatPage;
    last_tab: string = '';
    customer: any = {};
    showthat = true;
    constructor(private platform: Platform, public api: ApiProvider, public app: App, public events: Events, public popoverCtrl: PopoverController,
        public navCtrl: NavController, public storage: Storage, public configuration: CustomBootstrap, private ngZone: NgZone,
        public translate: TranslateService, public popover: PopoverController, public alertCtrl: AlertController,private splashScreen : SplashScreen
    ) {
        this.badge = {
            cart: {
                count: 0,
                data: [],
                beach_id: '',
                reserve_id: '',
                mention: ''
            }
        };
    }
    ionViewWillUnload() {
    
        this.events.unsubscribe('app:notification');
        this.events.unsubscribe('app:event');
        this.events.unsubscribe('tab:select');
        this.sub1$.unsubscribe();
        this.events.unsubscribe('app:removeBadge');
    }
    onNewNotification(data: Notification) {
        if (data && data.entity === 'reservation') {
            switch (data.action) {
                case 'accepted':
                    if (this.waitAlert) {
                        this.waitAlert.dismiss();
                        this.myReservation(this.customer.phone);
                        this.waitAlert = false;
                    }
                    break;
                default:
                    break;
            }
        }
    }
    ngOnInit() {
        this.events.subscribe('redirect:search', _ => {
            this.tabRef.select(0);
        })
        this.events.subscribe('unlock:reservation', _ => {
            this.unlockReservation = true;
        })

        this.last_tab = this.translate.instant('MY_ACCOUNT');

        this.configuration.getStorage('login').then((a) => {
            if (a && a.token) {
                if (a.guest || a.tour) {
                    this.last_tab = this.translate.instant('OPTIONS');
                }
                /*if(!a.tour){
                    this.showquit = true;
                }*/else{
                    this.showthat = false;
                    this.showquit = true;
                }
                this.customer = a;
            }
        }, error => { });
    }

    checkEvents() {
        // this.ngZone.run(() => {
        //     this.api.get('events/hasnew', {

        //     }, {}, true, true).subscribe(data => {
        //         if (data.news) {
        //             this.unreceivedEvents = data.news
        //         } else {
        //             this.unreceivedEvents = ''
        //         }
        //     }, error => { }); 
        // });
    }
    sub1$
    ionViewWillEnter() {
        this.checkEvents();
        this.platform.ready().then(() => {
            this.sub1$ = this.platform.resume.subscribe(() => {
                this.checkEvents();
                this.reloadHomeStorage();
            });
        });
        this.events.subscribe('app:notification', (data: Notification) => this.onNewNotification(data));
        this.events.subscribe('app:removeBadge', () => this.unreceivedEvents = '');
        this.events.subscribe('app:event', () => {
            this.checkEvents();
        });

        this.events.subscribe('tab:select', (index) => {
       
            this.tabRef.select(index);
        });
        setTimeout(() => {
          
            this.api.get("beach-settings", {}, {}, true).subscribe(r => {
                localStorage.setItem('beachsettings',JSON.stringify(r));
              })
        },1000);
        this.detectMyReservation();
    }

    viewMapEvents() {
        this.events.subscribe('app:mapView', state => {
            this.veiwMapState = <boolean>state;
        });
    }

    ionViewDidEnter() {

        setTimeout(() => {
           
            this.cartEvent();
            this.HomeEvent();
            this.viewMapEvents();
            this.configuration.getStorage('login').then((a) => {
                if (a && a.token) {
                    if (a.guest || a.tour) {
                        this.last_tab = this.translate.instant('OPTIONS');
                    }
                   /* if(!a.tour){
                        this.showquit = true;
                    }*/else{
                        this.showthat = false;
                        this.showquit = true;
                    }
                    

                    if (a.reservations == 1) {
                        this.customer = a;
                        
                        this.myReservation(a.phone);
                        this.tabRef.select(1);

                    } else {
                        this.customer = a;
                       
                        this.myReservation(a.phone);
                    }
                }
            }, error => { });
        }, 2000)
    }

    private reloadCart() {
        this.configuration.getStorage('tab').then(a => {
            if (a && a.cart && a.cart.data) {
                this.badge = a;
            }
        })
    }
    toggleMenu() {
        this.isMenuShown = !this.isMenuShown
    }

    logout() {
        this.configuration.clearStorage()
            .then(() => {
                this.navCtrl.setRoot(LoginPage)
            });
    }
     logoutapp() {
        if (this.api.fcmToken) {
            try {
                 this.api.get(`fcm/${this.api.fcmToken}/remove`, {}, {}, true).toPromise();
            } catch (error) {}
        }
        this.configuration.clearStorage().then(r=>{
            window.location.reload();
            this.splashScreen.show();

        });
        /*this.navCtrl.popToRoot().then(_ => {
            this.navCtrl.push(LoginPage);
            this.app.getRootNav().setRoot(MainGuestPage);
        });*/
    }

    arrangeCart(a: any) {
        if (a && a.id) {
            let data = JSON.parse(JSON.stringify(a));
        
            if (data.toppings && data.toppings.length)
                data.toppings = this.CleanToppings(data);

            this.badge.cart.beach_id = this.beachRootParam.id;
            this.badge.cart.reserve_id = this.beachRootParam.reserveId;
            this.badge.cart.data.push(data);
            this.badge.cart.count = this.badge.cart.data.length;
            this.configuration.setStorage('tab', JSON.parse(JSON.stringify(this.badge))).then(() => {
                this.events.publish('cart:added', this.badge.cart.data.length);
            });

        } else {
            this.reloadCart()
        }
    }


    private CleanToppings(data: any) {
        let topping = [];
        if (data && data.toppings) {
            for (let i in data.toppings) {
                if (data.toppings.hasOwnProperty(i) && data.toppings[i] && data.toppings[i].name) {
                    topping.push(data.toppings[i]);
                }
            }
        }
        return topping;
    }

    private cartEvent() {


        this.reloadCart();
        this.events.subscribe('cart:received', (data: any) => {
            this.arrangeCart(data);
        });
        this.events.subscribe('cart:removed', (data: any) => {
            this.badge.cart.data = data;
        });
    }

    private reloadHomeStorage() {
        this.myReservation(this.customer.phone);
    }
    private HomeEvent() {
        this.events.subscribe('reservation:received', (data: any) => {
            if (data && data.delete) {
                this.configuration.removeKeys('reservation');
                setTimeout(() => {
                    this.reloadHomeStorage();
                }, 1000);
            } else {
                this.reloadHomeStorage()
            }
        });
        this.events.subscribe('reservation:empty', () => {
            this.configuration.getStorage('login').then(login => {
                let newLogin = JSON.parse(JSON.stringify(login))
                newLogin.reservations = 0;
                this.configuration.setStorage('reservation', null);
                this.configuration.setStorage('login', newLogin);
                this.tabRef.select(0);
            });
            this.unlockReservation = false;
        });
        this.events.subscribe('reservation:cancel', (data) => {
            this.reloadHomeStorage();
        });
    }


    public reloadStorage() {
        this.reloadHomeStorage();
    }

    waitAlert: any = false;
    unreceivedEvents: any = '';

    myReservation(id: string) {
        
        
        if (this.customer.guest) {
            this.api.get(`guests/reservation`, {}, {}, true).subscribe(r => {
                this.beachRootParam = { id: r[0].beach_id, startD: r[0].start_date, title2: r[0].beach, reserveId: r[0].id }
                this.unlockReservation = true;
                this.configuration.ClearTimeout();
                this.tabRef.select(1);
                this.configuration.setStorage('reservation', r[0]).then(() => { });
                this.configuration.setStorage('reserv_endDate', r[0].end_date).then(() => { });
            });

            return false;
        }
        else if (this.customer.tour) {
            return false;
        }

        this.api.get(`booking/${id}`, {}, {}, true).subscribe(r => {
         
            if (r && r[0] && r[0].beach && (r[0].status != 'expired' || r[0].status != 'canceled')) {
                
                if (this.waitAlert) {
                    this.waitAlert.dismiss();
                    this.myReservation(this.customer.phone);
                    this.waitAlert = false;
                }
                this.beachRootParam = { id: r[0].beach_id, startD: r[0].start_date, title2: r[0].beach, reserveId: r[0].id }
                this.unlockReservation = true;
                this.configuration.ClearTimeout();
                this.tabRef.select(1);
                this.configuration.setStorage('reservation', r[0]).then(() => { });
                this.configuration.setStorage('reserv_endDate', r[0].end_date).then(() => { });
                return;
                // if (r[0].acceptable && r[0].status === 'booked') {
                    
                //     if (this.waitAlert) return;
                //     this.waitAlert = this.alertCtrl.create({
                //         title: '',
                //         message: this.translate.instant('UNREAD_RECEPTIONER'),
                //         enableBackdropDismiss: false,
                //         buttons: [
                //             {
                //                 text: this.translate.instant('CANCEL'),
                //                 handler: () => {
                                
                //                     this.api.post(`booking/cancel`, { id: r[0].id }, {}, true).subscribe(() => {
                //                         this.waitAlert.dismiss();
                //                         this.waitAlert = false;
                //                     }, error => {
                //                         this.api.AmError(this.translate.instant('ERROR'), error.message, [{
                //                             text: this.configuration.translate.translate.instant('CLOSE'),
                //                             handler: () => {
                //                                 this.myReservation(id);
                //                             }
                //                         }]);
                //                     })
                //                 }
                //             }
                //         ]
                //     });
                //     this.waitAlert.present();
                // } else {
                //     if (this.waitAlert) {
                //         this.waitAlert.dismiss();
                //         this.myReservation(this.customer.phone);
                //         this.waitAlert = false;
                //     }
                //     this.beachRootParam = { id: r[0].beach_id, startD: r[0].start_date, title2: r[0].beach, reserveId: r[0].id }
                //     this.unlockReservation = true;
                //     this.configuration.ClearTimeout();
                //     this.tabRef.select(1);
                //     this.configuration.setStorage('reservation', r[0]).then(() => { });
                //     this.configuration.setStorage('reserv_endDate', r[0].end_date).then(() => { });
                //     return;
                // }
                   

            }
            this.configuration.setStorage('reservation', null);
            this.configuration.setStorage('reserv_endDate', '0');
            this.configuration.setStorage('tab', null);
            this.unlockReservation = false;
        }, error => {
           
        })
    }

    detectMyReservation() {
        this.configuration.getStorage('login').then(res => {

            if (res.reservations > 0)
                this.unlockReservation = true;
            else
                this.unlockReservation = false;
        });
    }

    tabEvents(e: Tab) {
        if (e.index != 2) {
            this.configuration.setStorage('tab', { cart: {} }).then(() => {
                this.badge = {
                    cart: {
                        count: 0,
                        data: [],
                        beach_id: '',
                        reserve_id: '',
                        mention: ''
                    }
                }
            });
            this.events.publish('cart:reset')
        }

        if (!this.unlockReservation) {
            if (e.index == 1) {
                // let pop1 = this.popover.create(searchDupplication, { msg: this.translate.instant('INFO_BEFORE_RESERVATION') });
                // pop1.present();
                this.tabRef.select(0);
            }
            if (e.index == 2) {
                let pop2 = this.popover.create(searchDupplication, { msg: this.translate.instant('INFO_BEFORE_MENU') });
                pop2.present();
                this.tabRef.select(0);
            }

            return;
        } else {

            if (e.index == 3) {
                this.navCtrl.popToRoot().then((value) => {
                    // this.tabRef.select(3).then(() => {
                    // });
                })
            }

            if (e.index == 2) {
               
                this.events.publish('page:beachmenu', this.beachRootParam);
                this.navCtrl.popToRoot().then((value) => {
                    // this.tabRef.select(2).then(() => {
                    // });
                })
            }

            if (e.index == 1) {
                this.navCtrl.popToRoot().then((value) => {
                    // this.tabRef.select(1).then(() => {
                    // });
                })
            }

            if (e.index == 0) {
                // this.navCtrl.setRoot(SearchPage);

                this.navCtrl.popToRoot().then((value) => {
                    // this.tabRef.select(0).then(() => {
                    // });
                })
            }
        }
    }
}
