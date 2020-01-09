import { Events } from 'ionic-angular';
import { ApiProvider } from './../providers/services';
import { CustomBootstrap } from './../../app/BootstrapFirstRun';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the LoyaltyPointsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-select-paymethods',
  templateUrl: 'select-paymethods.html',
})
export class SelectPaymethods {
  mPaymethod: string = 'point';
  isConfirmable: boolean = true;
  beach_settings:any=[];

  mPoints : number = 0;
  isCard : boolean = false;
  mTotal : number = 0;

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

  constructor(public navCtrl: NavController, public configuration: CustomBootstrap, public events: Events, public navParams: NavParams, public viewCtrl: ViewController, private api: ApiProvider) {
    this.mPoints = this.navParams.data['points'];
    this.isCard = this.navParams.data['isCard'];
    this.mTotal = this.navParams.data['total'];
    this.onSelectMethod();
    this.search = this.navParams.data.search;
    this.location = this.navParams.data.location;
    this.data = this.navParams.data.data;
    this.title = this.navParams.data.title;
    this.index = this.navParams.data.index;
    this.settings = this.navParams.data.settings;
    this.selected = this.navParams.data.selected;
    this.total = this.navParams.data.total;
    this.startDate();
    this.beach_settings =JSON.parse( localStorage.getItem('beachsettings') || '[]');

  }

  ngOnInit() {
    this.configuration.getStorage('login').then((a) => {
      if (a && a.token) {
        this.customer = a;
        
      }
    }, error => { })
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


  sunbed() {
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
      amount: this.total,
      virtual_cash: true
    };
  }


  umbrella() {
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
        extra_seats: this.navParams.data.extra,
        position: { x: this.data.coords.x, y: this.data.coords.y }
      },
      phone: this.customer.phone,
      start_date: date.start,
      end_date: date.end,
      amount: this.total,
      virtual_cash: true
    };
  }

  baldaquin() {
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
      amount: this.total,
      virtual_cash: true
    };
  }
// ----------------------------------------------
  onSelectMethod() {
   
    if (this.mPaymethod == 'point') {
      if (this.mPoints > this.mTotal) {
        this.isConfirmable = true;
      }else{
        this.isConfirmable = false;
      }
    }else{
      this.isConfirmable = true;
    }
  }

  onClickConfirm () {
    
    let reservationCopy = JSON.parse(JSON.stringify(this[this.data.type]()))
    
    let reservation = this[this.data.type]();
    reservation.start_date = this.getLocalDateTime(reservation.start_date);
    reservation.end_date = this.getLocalDateTime(reservation.end_date);
    // reservation.customer_id = reservation.customer_id ? reservation.customer_id : this.customer.id;
    
   
    this.api.post('booking', reservation, {}).subscribe(r => {
      this.navParams.data.nav.popToRoot();
      this.navCtrl.popToRoot();
      reservationCopy.name = this.data.each_name;
      this.configuration.setStorage('reservation', reservationCopy).then(() => {
        this.events.publish('reservation:received');
      }, error => { });
      this.viewCtrl.dismiss();
    }, error => { });
  }
  
  availConfirm() : boolean {
    if (this.isCard) {
      return true;
    }else{
      if (this.mPoints - this.mTotal < 0)
        return false;
      else
        return true;
    }
  }
}
