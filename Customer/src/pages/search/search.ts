import { Component, ViewChild, NgZone } from '@angular/core'
import { NavController, Navbar, App, NavParams, PopoverController, Events, Platform } from 'ionic-angular'
import { LoginPage } from '../login/login'
import { Tools } from "../providers/tools";
import { ApiProvider } from "../providers/services";
import { BeachPage } from "../beach/beach";
import 'rxjs/add/operator/debounceTime'
import { myReservation } from "../myReservation/myReservation";
import { CustomBootstrap } from "../../app/BootstrapFirstRun";
import { FormControl } from '@angular/forms';
import { searchDupplication } from '../includes/searchDupplication/searchDupplication';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { Notification } from "../providers/interface";
import { distinct } from 'rxjs/operators';
import { searchMaster } from '../includes/searchMaster/searchMaster';

@Component({
    selector: 'page-search',
    templateUrl: 'search.html',
})
export class SearchPage {
    @ViewChild(Navbar) navBar: Navbar;
    searchControl: FormControl;
    isData: boolean;
    Search: string;
    IsClosed: boolean;
    requestPage: string = "SearchPage";
    toggleLanguage: any = {};
    customer: any = {};
    beach_settings:any=[];
    SearchDetails;
    constructor(
        private platform: Platform,
        public configuration: CustomBootstrap,
        public navCtrl: NavController,
        public appCtrl: App,
        public navParams: NavParams,
        public tool: Tools,
        public api: ApiProvider,
        public translate: TranslateService,
        public popoverCtrl: PopoverController,
        private ngZone: NgZone,
        private events: Events
    ) {
        this.Search = '';
        this.searchControl = new FormControl();
        this.beach_settings =JSON.parse( localStorage.getItem('beachsettings') || '[]');
    }

    onNewNotification(data: Notification) {
        this.ngZone.run(() => {
            if (data && data.entity === 'reservation') {
                this.api.get(`booking/${this.customer.phone}`, {}, {}, true, false).subscribe(r => {
                    this.configuration.setStorage('reservation', r[0]).then(() => {
                        if (r && r.length > 0) {
                            this.events.publish('unlock:reservation');
                        }
                    }, error => { });
                }, error => { });
            }
        })
    }

    ionViewDidLoad() {
        this.search();
        this.searchControl.valueChanges.debounceTime(1500).subscribe(search => {

            this.search();

        });

    }

    ionViewWillEnter() {
        let reset = "";
        this.events.publish("page:country",reset);
        this.events.publish("page:country_id",reset);
        this.events.publish("page:place",reset);
        // this.events.publish("page:beach",reset);
       
        searchMaster.prototype.setCountry("");
        this.configuration.setRequestPage(this.requestPage);
        this.configuration.getStorage('login').then((data: any) => {
            if (data && data.id) {
                this.customer = data;
            }
        }, (error: any) => { });
        // this.events.subscribe('page:country',this.resetCountry()); 
        this.events.subscribe('app:notification', (data: Notification) => this.onNewNotification(data));
    }

    ionViewWillLeave() {
        this.events.unsubscribe('app:notification');
    }

    goBack() {
        if (this.navCtrl.canGoBack()) {
            this.navCtrl.pop()
        } else {
            this.appCtrl.getRootNav().push(LoginPage, {}, { direction: 'back' })
        }
    }

    checkExist(): void {
        this.search();
    }


    private setCurrencyByBeach(id: string) {
        let ss = this.beach_settings.find(item => {
            return item.beach_id == id;
        });
        this.configuration.currency = ss.currency;
    }


    chooseBeach(beachId: string, name: string) {
        let SearchObj: any = {};
        let startDate = new Date().getTime();
        let endDate = new Date(new Date().setHours(23, 59, 59)).getTime()
        SearchObj.search_date = new Date(new Date(startDate).setHours(12,0,0));
        SearchObj.start_date = startDate
        SearchObj.end_date = endDate
        SearchObj.customer_id = this.customer.id;
        

        this.setCurrencyByBeach(beachId);
        this.configuration.getStorage('reservation')
            .then(reservation => {
                let timezoneOffsetHours = new Date().getTimezoneOffset() / 60;
                
                let alreadyEDate = !reservation || (reservation && reservation.end_date === '0') ? undefined : new Date(new Date(reservation.end_date).setHours(new Date(reservation.end_date).getHours() + timezoneOffsetHours)).getDate();

                let isToday = alreadyEDate && (new Date()).getDate() === alreadyEDate;

                if (isToday && reservation && reservation.beach_id === beachId) {
                    let popoverSignup = this.popoverCtrl.create(searchDupplication, { msg: this.translate.instant('DUPPLICATED_RESERVATION_DETECT') });
                    popoverSignup.present();
                    return;
                }
                else {
                  
                    let newName = name.split('(')[0];
                    newName = newName.replace(')', '');
                 
                    this.navCtrl.push(BeachPage, { id: beachId, title2: newName, SearchObj: SearchObj, context: "quick-search" })
                }

            })
            .catch(error => {
               
                let newName = name.split('(')[0];
                newName = newName.replace(')', '');
            
                this.navCtrl.push(BeachPage, { id: beachId, title2: newName, SearchObj: SearchObj, context: "quick-search" })
            })

    }

    generateTodaySearchObj() {

    }

    CloseSearch() {
        setTimeout(() => {
            this.IsClosed = true; this.Search = ''; this.SearchDetails = '';
        }, 1000)
    }

    search() {

        if (this.Search && this.Search.length > 1) {
            let param = {};
            param['q'] = this.Search.toLowerCase();
            this.api.get('quick-search', param, {}, true).debounceTime(700).subscribe(r => {
                
                this.SearchDetails = r;
            }, error => {
                
            })
        }
    }

    test() {
        this.navCtrl.push(myReservation)
    }
}
