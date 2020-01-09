import { Component, OnInit, ViewChild, NgZone } from '@angular/core'
import { Events, NavController, NavParams, AlertController, Platform } from 'ionic-angular'
import { Tabs } from "ionic-angular";
import { ApiProvider } from "../providers/services";
import { CustomBootstrap } from "../../app/BootstrapFirstRun";
import { TranslateService } from "@ngx-translate/core";
import { Notification } from "../providers/interface";

@Component({
    selector: 'page-cart',
    templateUrl: 'cart.html',
})
export class CartPage implements OnInit {
    edit: boolean = false
    totalPrice: number = 0;
    items = [];
    requestPage: string = 'CartPage';
    customer: any = [];
    beach_id: string = '';
    reserve_id: string = '';
    currency: any;
    waiter_id: string;
    @ViewChild('myTabs') tabRef: Tabs;

    sub1$

    constructor(private platform: Platform, private alerCtrl: AlertController, public navparams: NavParams,
        public translateService: TranslateService, public events: Events, public navCtrl: NavController,
        public api: ApiProvider, public configuration: CustomBootstrap, private ngZone: NgZone) {
        this.platform.ready().then(() => {
            this.currency = this.navparams.get('currency');
            this.sub1$ = this.platform.resume.subscribe(() => {
                this.reloadData();
            })
        });
    }

    toggleEdit() {
        this.edit = !this.edit
    }
    ngOnInit() {
        this.configuration.getStorage('login').then(a => {
            if (a && a.id) {
                this.customer = a;
            }
        })
    }

    createItem() {
        this.items = [];
        this.configuration.getStorage('reservation').then(a => {
            this.waiter_id = a ? a.waiter_id : null;
        })
        this.configuration.getStorage('tab').then(a => {
            if (a && a.cart && a.cart.data) {
                let params = a.cart.data;
                this.beach_id = a.cart.beach_id;
                this.reserve_id = a.cart.reserve_id;
                this.items = params;
                this.events.publish('cart:removed', this.items);
            }

        })

    }

    onNewNotification(data: Notification) {
        this.ngZone.run(() => {
            if (data && data.entity === 'reservation') {
                this.reloadData();
            }
        })
    }
    reloadData() {
        this.configuration.getStorage('login').then((a) => {
            if (a && a.token) {
                this.api.get(`booking/${a.phone}`, {}, {}, true, false).subscribe(r => {
                    if (r && r.length > 0) {
                        this.configuration.setStorage('reservation', r[0]).then(() => {
                            this.waiter_id = r[0].waiter_id;
                        }, error => { });
                    } else {
                        this.toggleTab(0, [], '');
                        this.navCtrl.pop();
                    }
                }, error => { });
            }
        });
    }
    ionViewWillEnter() {
        this.createItem();
        this.configuration.setRequestPage(this.requestPage);
        this.events.subscribe('app:notification', (data: Notification) => this.onNewNotification(data));
    }
    ionViewWillUnload() {
        this.events.unsubscribe('app:notification');
        this.sub1$.unsubscribe();
    }
    addProduct() {
        this.navCtrl.pop();
    }

    order() {
        
        if (this.items && this.items.length > 0) {
            let orders = {
                beach_id: this.beach_id,
                reservation_id: this.reserve_id,
                customer_id: this.customer.id,
                waiter_id: this.waiter_id,
                items: [],
              //  guest_code: localStorage.getItem('guest_code'),
                confirm: false
            };
            for (let i in this.items) {
                orders.items.push({
                    id: this.items[i].id,
                    name: this.items[i].name,
                    qty: this.items[i].quantity,
                    price: this.items[i].price,
                    toppings: this.items[i].toppings,
                    mentions: this.items[i].mention && this.items[i].mention.length > 1 ? this.items[i].mention : undefined,

                })
            }

            let self = this;
            if (!orders || (orders && !orders.waiter_id)) {
                self.translateService.get("NO_WAITER_ERROR").subscribe(value => {
                    this.api.AmError('Order', value, [{
                        text: 'Close', handler: () => { }
                    }]);
                })
            }
            else {
                let confirm = this.alerCtrl.create({

                    title: "Warning",
                    message: "do you like the Waiter to come to confirm the order?",
                    buttons: [
                        {
                            text: "YES",
                            handler: () => {
                                orders.confirm = true;
                                this.api.post('orders', orders, {}).subscribe(r => {
                                    this.api.AmError('Order', r.message, [{
                                        text: 'Close', handler: () => {
                                            this.toggleTab(0, [], '');
                                        }
                                    }]);
                                }, error => { })
                            }
                        },
                        {
                            text: "NO",
                            handler: () => {
                                this.api.post('orders', orders, {}).subscribe(r => {
                                    this.api.AmError('Order', r.message, [{
                                        text: 'Close', handler: () => {
                                            this.toggleTab(0, [], '');
                                        }
                                    }]);
                                }, error => { })
                            }
                        }
                    ]
                });
                confirm.present();
            }

        }
    }



    private toggleTab(count: number, data: any, beach_id: string) {
        let tabData = { cart: {} };
        tabData.cart = {
            count: count,
            data: data,
            reload: true,
            beach_id: beach_id,
            reserve_id: this.reserve_id
        };
        this.totalPrice = 0;
        this.configuration.setStorage('tab', tabData).then(() => {
            this.events.publish('cart:added', Math.random());
            // this.events.publish('cart:received',Math.random());
            this.createItem();

        })
    }

    private getPrice() {
        this.totalPrice = 0;
        for (let i in this.items) {
            this.totalPrice += parseInt(this.items[i].price) * this.items[i].quantity;

        }
        return this.totalPrice;
    }

    remove(id: string, index: number) {
        this.items.splice(index, 1);
        this.toggleTab(this.items.length, this.items, this.beach_id);
    }

    QuantityMath(index: number, IsAdd: boolean) {
        if (this.items && this.items[index] && this.items[index].quantity) {
            if (IsAdd)
                this.items[index].quantity += 1;
            else
                this.items[index].quantity -= 1;

            let tabData = { cart: {} };
            tabData.cart = {
                count: this.items.length,
                data: this.items,
                reload: true,
                beach_id: this.beach_id,
                reserve_id: this.reserve_id
            };
            this.configuration.setStorage('tab', tabData).then(() => {
            })
        }
    }

}
