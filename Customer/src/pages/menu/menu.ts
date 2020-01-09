import { Component, ViewChild, NgZone } from '@angular/core';
import { NavController, AlertController ,Navbar, NavParams, Events, Platform, ViewController } from 'ionic-angular';
import { CustomBootstrap } from '../../app/BootstrapFirstRun';
import { ApiProvider } from '../providers/services';
import * as moment from 'moment';
import { CartPage } from '../cart/cart';
import { Notification } from "../providers/interface";

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-menu',
    templateUrl: 'menu.html',
})
export class MenuPage {
    beach_id: string; // selected Beach id from nav
    reservation_id: string;
    waiter_id:string;
    menu: any = []; // menu
    beach_settings:any=[];
    selectedToppings: any = [];
    confirmPopover: any;
    currentDate: string; // start Date from nav
    isMenuDetails: {
        status: boolean,
        data: any
    } = { status: false, data: [] };
    quantity: number = 1;
    mention: string = '';
    cartAmount: number = 0;
    myCart: any = {};
    currency: any;
    shouldResetEverything: boolean;
    sub1$
    itemsShown = false;
    require_call  = false;
    showImgFullscreen: boolean = false;
    reservation:any;

    @ViewChild(Navbar) navBar: Navbar;
    constructor(private platform: Platform, public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController, public viewController: ViewController,
        public configuration: CustomBootstrap, private config: CustomBootstrap,public api: ApiProvider, public events: Events, private ngZone: NgZone
    ) {
        this.beach_settings =JSON.parse( localStorage.getItem('beachsettings') || '[]');
        this.platform.ready().then(() => {
            
            if (navParams && navParams.data && navParams.data.beach_id) {
                this.beach_id = navParams.data.beach_id;
                this.showImgFullscreen = navParams.data.showImgFullscreen;
                this.currentDate = moment().format('YYYY-MM-DD');
                this.reservation_id = '';
                this.loadMenu();
                return;
            }
            this.events.subscribe('page:beachmenu', (param: any) => {
               
                this.beach_id = param.id;
                this.currentDate = param.startD;
                this.reservation_id = param.reserveId;
                this.loadMenu();
            });
    
            this.events.subscribe('cart:added', data => {
                if (!data) {
                    return;
                }
                this.configuration.getStorage('tab').then(res => {
                    let len = res.cart.data.length;
                    let cnt = 0;
                    for (let i = 0; i < len; i++) {
                        cnt += res.cart.data[i].quantity;
                    }
                    this.cartAmount = cnt;
                });
                //this.loadMenu();
                this.configuration.getStorage('menu').then(r => {
                    this.menu = r[this.beach_id + this.currentDate];
                });
            });
    
            this.events.subscribe('cart:reset', (data: any) => {
                this.configuration.getStorage('tab').then(res => {
                    this.cartAmount = 0;
                    this.selectedToppings = [];
                    this.quantity = 1;
                    this.mention = '';
                    this.myCart = {};
                    this.clean(false);
                });
                if (this.navCtrl.getActive().name === "CartPage") {
                    this.navCtrl.pop();
                }
            });
            this.sub1$ = this.platform.resume.subscribe(() => {
                this.reloadData();
            })
            this.configuration.getStorage('reservation').then(r => {
                if(r){
                    this.reservation = r;
                }
            });
        });

    }

    onNewNotification(data: Notification) {
        this.ngZone.run(() => {
            if (data && data.entity === 'reservation') {
                this.reloadData();
            }
        })
    }

    reloadData(){
        this.configuration.getStorage('login').then((a) => {
            if (a && a.token) {
                this.api.get(`booking/${a.phone}`, {}, {}, true, false).subscribe(r => {
                    if (r && r.length > 0)
                        this.configuration.setStorage('reservation', r[0]).then(() => {
                        }, error => { });
                }, error => { });
            }
        });
    }
    onClose(){
        this.viewController.dismiss();
    }
    ionViewDidLoad() {
        this.configuration.getStorage('tab').then(res => {
            if (res && res.cart && res.cart.data) {
                let len = res.cart.data.length;
                let cnt = 0;
                for (let i = 0; i < len; i++) {
                    cnt += res.cart.data[i].quantity;
                }
                this.cartAmount = cnt;
            }
            else {
                this.cartAmount = 0;
                this.selectedToppings = [];
                this.quantity = 1;
                this.mention = '';
                this.myCart = {};
                this.clean(false);
            }
        });
    }

    loadMenu() {

        let ss = this.beach_settings.find(item => {
            return item.beach_id == this.beach_id;
        });

        if(ss){
            this.currency = ss.currency;
            this.require_call = ss.require_call;
        }
        
        
        if (this.beach_id) {
            this.configuration.getStorage('menu').then((a: any) => {
                if (a && a[this.beach_id] && a.time && moment(moment.now()).diff(a.time, 'minutes') < 10) {
                    this.menu = a[this.beach_id + this.currentDate];
                   
                    return;
                }
                this.api.get('menu/' + this.beach_id, {}, { 'Content-Type': 'application/json' }, false, false).subscribe(r => {
                    this.menu = r;
                   
                    this.configuration.setStorage('menu', { [this.beach_id + this.currentDate]: r, time: moment.now() });
                }, error => {

                })
            })
        }
    }

    backMenu() {
        this.isMenuDetails.status = false;
    }

    openCart() {
        this.shouldResetEverything = false;
        this.navCtrl.push(CartPage, { currency: this.currency });
    }

    gotoSelection(item: any): void {
        if (!this.reservation_id) return;
        this.isMenuDetails.data = item;
        this.clean(true);
    }

    getNumberPrice(price: String): any {
        let tmp = price.split("$");
        return tmp[1]
    }

    private clean(status: boolean) {
        this.quantity = 1;
        this.mention = '';
        this.selectedToppings = [];
        this.isMenuDetails.status = status;
    }
    toggleItems(item) {
        item.itemsShown = !item.itemsShown;
        this.menu.forEach((element) => {
            if (element != item) element.itemsShown = false
        })
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
            // this.addCart();
            this.clean(false);
        }

    }

    backButtonsHelper() {
        if (this.isMenuDetails.status == true) {
            setTimeout(() => {
                this.isMenuDetails.status = false;
                // this.loaded=0;
            }, 500);
            return;
        }
        this.navCtrl.pop();

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

    counter(val: number): void {
        if ((val < 0 && this.quantity > 0) || val > 0 && this.quantity < 19) this.quantity += val;
    }

    ionViewWillEnter() {
        this.events.subscribe('app:notification', (data: Notification) => this.onNewNotification(data))
    }
    ionViewWillLeave() {
        this.events.unsubscribe('app:notification');
        if(this.sub1$)
        this.sub1$.unsubscribe();
    }
    showConfirm() {
        this.confirmPopover = this.alertCtrl.create({
            title: 'Do you want to call the waiter?',
            buttons: [
                {
                    text: this.config.translate.translate.instant('Yes'),
                    role: 'ok',
                    handler: () => {
                    }
                },
                {
                    text: this.config.translate.translate.instant('No'),
                    role: 'cancel',
                    handler: () => {
                    }
                }
                
            ],
            enableBackdropDismiss: false,
        });
        this.confirmPopover.present();

        return this.confirmPopover;
    }
    wantCall(){
        
        this.showConfirm().onDidDismiss((data, role) => {
            
            if (role === 'ok') {
                let reservationID = this.reservation_id;
                let waiter_id;
                this.configuration.getStorage('login').then((a) => {
                    if (a && a.token) {
                        this.api.get(`booking/${a.phone}`, {}, {}, true, false).subscribe(r => {
                            if (r && r.length > 0) {
                                waiter_id = r[0].waiter_id;
                                let param = {
                                    "reservation_id": this.reservation_id,
                                    "waiter_id": waiter_id
                                }
                                  
                                this.api.post('call', param, { 'Content-Type': 'application/json' }, false, false).subscribe(r => {
                                }, error => {
                                })
                                // this.configuration.setStorage('reservation', r[0]).then(() => {
                                    
                                // }, error => { });
                            } else {
                                this.navCtrl.pop();
                            }
                        }, error => { });
                    }
                });
                
            }
        });
    }
}
