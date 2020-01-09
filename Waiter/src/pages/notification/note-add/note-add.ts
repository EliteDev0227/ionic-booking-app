import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Select, AlertController, LoadingController } from 'ionic-angular';
import { BeachService } from '../../../services/beach.service';
import { AppService } from '../../../services/app.service';

/**
 * Generated class for the NoteAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-note-add',
    templateUrl: 'note-add.html',
})

export class NoteAddPage {
    openItemNum: number;
    itemAddState: boolean;
    order: any = false;
    items = [];
    currency = 'ron';
    newItem: any = { qty: 1, name: '' };
    openTopping = false;
    products: any = [];
    order_id: false;
    reservation_id = false;
    title = '';
    showDropdown = false;
    processing = false;

    @ViewChild('select_toppings') select_toppings_comp: Select;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private beachService: BeachService,
        private alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        private appService: AppService
    ) {
        this.currency = navParams.get('currency');
        this.title = navParams.get('title');
        const order = navParams.get('order');
        // let loading = this.loadingCtrl.create({
        //     content: 'Please wait...'
        // });
        // loading.present();
        this.processing = true;
        this.beachService.getProductions()
            .then(data => {
                const allProductions = data.all;
                this.products = data.mine;
                const toppingDic = {};
                if (allProductions.toppings) {
                    allProductions.toppings.forEach((item, index) => {
                        toppingDic[`${item.name}:${item.price}`] = index;
                    })
                }
                if (order) {
                    this.order_id = order.id;
                    this.appService.removeNotification(this.order_id);
                    const items = JSON.parse(JSON.stringify(order.data.items));
                    items.forEach((item, index) => {
                        for (var production of allProductions) {
                            if (item.id == production.id) {
                                items[index].topping_list = production.toppings || [];
                                break;
                            }
                        }
                    });
                    this.items = items;
                    this.reservation_id = order.reservation_id;
                } else {
                    this.reservation_id = navParams.get('reservation_id');
                }
                this.processing = false;
                // loading.dismiss();
            })
            .catch(error => {
                // loading.dismiss();
                this.appService.errorHandler(error);
            })
    }
    onClickMentions(index){
        let alert = this.alertCtrl.create({
            title: 'Mentions',
            inputs: [
                {
                    name: 'mentions',
                    placeholder: 'Mentions',
                    value: this.items[index].mentions
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                    }
                },
                {
                    text: 'OK',
                    handler: data => {
                        this.items[index].mentions =  data.mentions;
                    }
                }
            ]
        });
        alert.present();
    }
    closeModal() {
        this.navCtrl.pop();
    }

    onConfirm() {
        if (this.processing) return;
        this.processing = true;
        const items = JSON.parse(JSON.stringify(this.items));
        for (var i=0;i<items.length;i++){
            delete items[i].topping_list;
        }
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        if (this.order_id) {
            this.beachService.confirmOrder(this.order_id, items)
                .then(() => {
                    loading.dismiss();
                    try{
                        this.appService.orderNotify.emit({
                            updated: true,
                            data: {
                                id: this.order_id,
                                items,
                                reservation_id: this.reservation_id
                            }
                        })
                    }catch(error) {
                    }
                    this.processing = false;
                    this.navCtrl.pop();
                })
                .catch(error => {
                    loading.dismiss();
                })
        } else if (this.reservation_id) {
            this.beachService.createOrder({
                reservation_id: this.reservation_id,
                items
            })
                .then((order) => {
                    this.appService.orderNotify.emit({
                        created: true,
                        data: order
                    })
                    loading.dismiss();
                    this.navCtrl.pop();
                })
                .catch(error => {
                    loading.dismiss();
                    this.appService.errorHandler(error);
                })
        } else {
            this.appService.errorHandler({
                message: 'Can not create order.'
            });
        }
    }

    openItem(item_num: number) {
        this.openItemNum = item_num;
        this.openTopping = false;
    }
    completeItemEdit() {
        this.openItemNum = -1;
        this.openTopping = false;
    }
    selectNewItem(item) {
        this.newItem.name = item.name;
        this.newItem.price = item.price;
        this.newItem.id = item.id;
        this.newItem.topping_list = item.toppings;
        this.showDropdown = false;
    }
    decNewItemQty() {
        this.newItem.qty = this.newItem.qty || 1;
        if (this.newItem.qty > 1) this.newItem.qty--;
    }
    incNewItemQty() {
        this.newItem.qty = this.newItem.qty || 1;
        this.newItem.qty++;
    }
    decItemQty(index) {
        this.items[index].qty = this.items[index].qty || 1;
        if (this.items[index].qty > 1) this.items[index].qty--;
    }
    incItemQty(index) {
        this.items[index].qty = this.items[index].qty || 1;
        this.items[index].qty++;
    }
    addOrderItem(action: string) {
        switch (action) {
            case 'open':
                this.itemAddState = true;
                this.openItemNum = -1;
                this.newItem = { qty: 1, name: '' };
                break;
            case 'add':
                this.itemAddState = false;
                this.items.push(Object.assign({}, { ...this.newItem, toppings: [] }));
                break;
            case 'close':
                this.itemAddState = false;
                break;
            default:
                break;
        }
    }
    removeItem(index) {
        this.items.splice(index, 1);
    }

    selected_toppings = [];
    selected_topping_list = [];
    toggleToppings(index) {
        this.selected_toppings = this.items[index].toppings.map(item => `${item.name}:${item.price}`);
        this.selected_topping_list = this.items[index].topping_list.map(item => `${item.name}:${item.price}`);
        setTimeout(() => {
            this.select_toppings_comp.open();
        }, 200);
    }
    applyToppings() {
        try{
            let selected = JSON.parse(JSON.stringify(this.selected_toppings));
            selected = selected.map(item => {
                const sp = item.split(':');
                return {
                    name: sp[0],
                    price: parseInt(sp[1])
                }
            });
            this.items[this.openItemNum].toppings = selected;
        }catch(error) {
        }
    }

    getAmount() {
        let amount = 0;
        this.items.forEach(item => {
            amount += item.price * item.qty;
            item.toppings.forEach(topping => {
                amount += topping.price * item.qty;
            })
        })
        return amount;
    }
    filterNewItem(product) {
        const words = product.name.split(' ');
        for (const word of words) {
            if (word.toLowerCase().startsWith(this.newItem.name.toLowerCase())){ 
                return true;
            }
        }
        return false;
    }
}
