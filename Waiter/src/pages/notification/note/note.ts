import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Select, LoadingController } from 'ionic-angular';
import { BeachService } from '../../../services/beach.service';
import { AppService } from '../../../services/app.service';

/**
 * Generated class for the NotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-note',
  templateUrl: 'note.html',
})
export class NotePage {
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

    @ViewChild('select_toppings') select_toppings_comp: Select;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private beachService: BeachService,
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
        this.beachService.getProductions()
            .then(data => {
                const allProductions = data.all;
                this.products = data.mine;
                if (order) {
                    this.order_id = order.id;
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
                // loading.dismiss();
            })
            .catch(error => {
                // loading.dismiss();
                this.appService.errorHandler(error);
            })
    }
    closeModal() {
        this.navCtrl.pop();
    }

    openItem(item_num: number) {
        this.openItemNum = item_num;
        this.openTopping = false;
    }
    completeItemEdit() {
        this.openItemNum = -1;
        this.openTopping = false;
    }
    selected_toppings = [];
    selected_topping_list = [];

    toggleToppings(index) {
        this.selected_toppings = this.items[index].toppings;
        this.selected_topping_list = this.items[index].topping_list;
        setTimeout(() => {
            this.select_toppings_comp.open();
        }, 200);
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
        return product.name.toLowerCase().indexOf(this.newItem.name.toLowerCase()) > -1;
    }
}
