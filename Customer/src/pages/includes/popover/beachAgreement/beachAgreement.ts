import { Component, OnInit } from "@angular/core";
import { Events, NavController, NavParams, ViewController, Tabs, PopoverController, Platform, AlertController } from "ionic-angular";
// import { myReservation } from "../../../myReservation/myReservation";
import { CustomBootstrap } from "../../../../app/BootstrapFirstRun";
import { ApiProvider } from "../../../providers/services";
import { App } from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";
import { Notification } from '../../../providers/interface';
import { AgreementHelper } from "../../../providers/agreement.helper";

/**
 * Created by shadow-viper on 12/19/17.
 */


@Component({
    selector: 'beachAgreement',
    templateUrl: 'beachAgreement.html'
})

export class beachAgreement implements OnInit {

    tab: Tabs;
    search: any = {};
    location: string = '';
    data: any = [];
    title: string = '';
    index: string = '0';
    startEndDate: { start: string, end: string } = { start: '', end: '' };
    settings: any = [];
    total: number = 0;
    customer: any = [];
    selected: number = 1;
    contents = [];
    contentArray = [];
    extra: number = 0;
    zone: any;
    beach_settings:any=[];
    constructor(public app: App, public platform: Platform, public events: Events, public viewCtrl: ViewController,
        public navCtrl: NavController, public navparam: NavParams, public configuration: CustomBootstrap,
        public api: ApiProvider, public translateService: TranslateService, public popoverCtrl: PopoverController,
        public alertCtrl: AlertController, public translate: TranslateService, private agreement: AgreementHelper
    ) {
        this.platform.ready().then(() => {
            
        });
        this.search = this.navparam.data.search;
        this.location = this.navparam.data.location;
        this.data = this.navparam.data.data;
        this.title = this.navparam.data.title;
        this.index = this.navparam.data.index;
        this.settings = this.navparam.data.settings;
        this.contents = (this.settings.agreement)?this.settings.agreement:[];
        this.selected = this.navparam.data.selected;
        this.extra = this.navparam.data.extra;
        this.total = this.navparam.data.total;
        this.beach_settings =JSON.parse( localStorage.getItem('beachsettings') || '[]');
      
        // if (this.contents && this.contents[this.translateService.currentLang]) {
        //     this.contentArray = this.contents[this.translateService.currentLang].split('\n');
        // }
        if(this.contents){
          
            this.contentArray = this.contents;
        }

        this.startDate();
    }

    onNotificationSubscription: any = false;

    ngOnInit() {
        this.configuration.getStorage('login').then((a) => {
            if (a && a.token) {
                this.customer = a;
           
            }
        }, error => { });

    }
    agree() {
        this.viewCtrl.dismiss({
            agreed: true
        });
    }
    decline() {
        this.viewCtrl.dismiss();
    }

    getBeachWorkingHours() {
        let workingHours;
        let self = this;
        this.beach_settings.map((beach) => {
            if (beach.beach_id === self.settings.beach_id) {
                workingHours = beach.working_hours || {};
            }
        })
        return workingHours;
    }


    getLocalDateTime(date: number) {
        let dateObj = new Date(date);
        let hoursWithTimezone = dateObj.getHours() + ((-1) * (dateObj.getTimezoneOffset() / 60))

        return new Date(new Date(date).setHours(hoursWithTimezone)).getTime();
    }

    private dateint(date?: boolean) {
        if (this.search && this.search.start_date) {
            if (date) {
                return { start: new Date(this.search.start_date), end: new Date(this.search.end_date) }
            }
            return { start: this.search.start_date, end: this.search.end_date }
        } else {
            let date = new Date();
            if (date) {
                return { start: new Date(date.getDate()), end: new Date(date.getDate()) }
            }
            return { start: date.getMilliseconds(), end: date.getMilliseconds() }
        }

    }
    startDate() {
        let date = this.dateint(true);
        let start_date = date.start;
        let end_date = date.end;

        this.startEndDate = {
            start: `${start_date.getFullYear()}.${start_date.getMonth() + 1}.${start_date.getDate()}`,
            end: `${end_date.getFullYear()}.${end_date.getMonth() + 1}.${end_date.getDate()}`
        }
    }

    private sunbed() {
        let date = this.dateint();
        return {
            broker_id: this.data.broker_id,
            waiter_id: this.data.waiter_id,
            beach_id: this.settings.beach_id,
            created_by: this.customer.id,
            seat: {
                type: this.data.type,
                count: this.selected
            },
            phone: this.customer.phone,
            start_date: date.start,
            end_date: date.end,
            amount: this.total
        };
    }

    private umbrella() {
        let date = this.dateint();
        return {
            broker_id: this.data.broker_id,
            waiter_id: this.data.waiter_id,
            beach_id: this.settings.beach_id,
            created_by: this.customer.id,
            seat: {
                type: this.data.type,
                zone: this.location,
                number: this.index,
                slots: this.data.slots,
                extra_seats: this.navparam.data.extra,
                position: { x: this.data.coords.x, y: this.data.coords.y }
            },
            phone: this.customer.phone,
            start_date: date.start,
            end_date: date.end,
            amount: this.total
        };
    }

    private baldaquin() {
        let date = this.dateint();
        return {
            broker_id: this.data.broker_id,
            waiter_id: this.data.waiter_id,
            beach_id: this.settings.beach_id,
            created_by: this.customer.id,
            seat: {
                type: this.data.type,
                zone: this.location,
                number: this.index,
                position: { x: this.data.coords.x, y: this.data.coords.y }
            },
            phone: this.customer.phone,
            start_date: date.start,
            end_date: date.end,
            amount: this.total
        };
    }
}
