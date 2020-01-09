import { Injectable } from "@angular/core";
import {
  AlertController,
  Events,
  NavController,
  Tabs,
  ViewController,
  PopoverController,
  App
} from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";
import { ApiProvider } from "./services";
import { CustomBootstrap } from "../../app/BootstrapFirstRun";
import { searchDupplication } from "../includes/searchDupplication/searchDupplication";
import { SignupPage } from "../signup/signup";
import {SplashScreen} from "@ionic-native/splash-screen";
@Injectable()
export class AgreementHelper {
  private _navparam: any;
  private _navCtrl: NavController;

  tab: Tabs;
  search: any = {};
  location: string = "";
  data: any = [];
  title: string = "";
  index: string = "0";
  startEndDate: { start: string; end: string } = { start: "", end: "" };
  settings: any = [];
  total: number = 0;
  beach_settings:any=[];
  customer: any = [];
  selected: number = 1;
  extra: number = 0;
  number: number = 0;
  status: any;
  slots:any;
  zone:any;
  seats_num:number = 0;
  price : number = 0;
  extraPrice : number = 0;
  constructor(
    private api: ApiProvider,
    private configuration: CustomBootstrap,
    private events: Events,
    private alertCtrl: AlertController,
    private popoverCtrl: PopoverController,
    private translate: TranslateService,
    private splashScreen : SplashScreen,
    private app : App
  ) {
    this.beach_settings =JSON.parse( localStorage.getItem('beachsettings') || '[]');
  }

  setup() {
    this.search = this.navparam.search;
    this.location = this.navparam.location;
    this.data = this.navparam.data;
    this.title = this.navparam.title;
    this.index = this.navparam.index;
    this.settings = this.navparam.settings;
    this.selected = this.navparam.selected;
    this.extra = this.navparam.extra;
    this.total = this.navparam.total;
    this.status = this.navparam.status;
    this.slots = this.navparam.slots;
    this.zone = this.navparam.zone;
    this.number = this.navparam.number;
    this.seats_num = this.navparam.seats;
    this.price = this.navparam.data.price;
    this.extraPrice = this.navparam.data.extra_price;

    if(this.slots.a) {
      this.slots.a = [].concat(this.slots.a.reverse());
    }
    this.startDate();

    this.configuration.getStorage("login").then(
      a => {
        if (a && a.token) {
          this.customer = a;
      

          // TODO:// Change message accordingly
          if (this.customer.tour) {
            let popoverSignup = this.popoverCtrl.create(searchDupplication, {
              msg: this.translate.instant("BOOKING_PERMISSION"),
              redirect : true
            });
            popoverSignup.present();
           
            
          } 
          // else if (this.customer.guest) {
          //   let popoverSignup = this.popoverCtrl.create(searchDupplication, {
          //     msg: this.translate.instant("BOOKING_PERMISSION")
          //   });
          //   popoverSignup.present();
          // } 
          else {
            this.doReservation();
          }
        }
      },
      error => {}
    );
  }

  private doReservation() {
    if (!this._navparam || !this._navCtrl || !this.navparam.data) {
     
      return;
    }

    this.data = this.data.data ? this.data.data : this.data;

    let reservationCopy = JSON.parse(JSON.stringify(this[this.data.type]()));

    let reservation = this[this.data.type]();
    reservation.start_date = this.getLocalDateTime(reservation.start_date);
    reservation.end_date = this.getLocalDateTime(reservation.end_date);
    reservation.seat.slots = this.slots;
    reservation.seat.index = this.index;
    reservation.seat.zone = this.zone;
    reservation.seat.number = this.number;
    reservation.seat.seats_num = this.seats_num;
    reservation.avg_price = this.price;
    reservation.extra_price = this.extraPrice;
delete reservation.seat.position;
    this.api.post("booking", reservation, {}, false, true).subscribe(
      r => {
        this._navCtrl.popToRoot();
        reservationCopy.name = this.data.each_name;
        this.configuration.setStorage("reservation", reservationCopy).then(
          () => {
            this.events.publish("reservation:cancel");
          },
          error => {}
        );
        this._navparam = {};
      },
      error => {
        if (error.message === "CUSTOMER_NO_PHOTO") {
          const alert = this.alertCtrl.create({
            title: "",
            message: this.translate.instant("CUSTOMER_NO_PHOTO"),
            enableBackdropDismiss: false,
            buttons: [
              {
                text: this.translate.instant("YES"),
                handler: () => {
                  this.events.publish("tab:select", 3);
                }
              },
              {
                text: this.translate.instant("NO"),
                handler: null
              }
            ]
          });

          alert.present();
        } else {
          const alert = this.alertCtrl.create({
            title: "",
            message: error.message,
            enableBackdropDismiss: false,
            buttons: [
              {
                text: this.translate.instant("CLOSE"),
                handler: () => {}
              }
            ]
          });

          alert.present();
        }
      }
    );
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
        extra_seats: this.navparam.extra,
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
        extra_seats: this.navparam.extra,
        position: { x: this.data.coords.x, y: this.data.coords.y }
      },
      phone: this.customer.phone,
      start_date: date.start,
      end_date: date.end,
      amount: this.total
    };
  }

  getBeachWorkingHours() {
    let workingHours;
    let self = this;
    this.beach_settings.map(beach => {
      if (beach.beach_id === self.settings.beach_id) {
        workingHours = beach.working_hours || {};
      }
    });
    return workingHours;
  }

  getLocalDateTime(date: number) {
    let dateObj = new Date(date);
    let hoursWithTimezone =
      dateObj.getHours() + -1 * (dateObj.getTimezoneOffset() / 60);

    return new Date(new Date(date).setHours(hoursWithTimezone)).getTime();
  }

  private dateint(date?: boolean) {
    if (this.search && this.search.start_date) {
      if (date) {
        return {
          start: new Date(this.search.start_date),
          end: new Date(this.search.end_date)
        };
      }
      return { start: this.search.start_date, end: this.search.end_date };
    } else {
      let date = new Date();
      if (date) {
        return {
          start: new Date(date.getDate()),
          end: new Date(date.getDate())
        };
      }
      return { start: date.getMilliseconds(), end: date.getMilliseconds() };
    }
  }
  startDate() {
    let date = this.dateint(true);
    let start_date = date.start;
    let end_date = date.end;

    this.startEndDate = {
      start: `${start_date.getFullYear()}.${start_date.getMonth() +
        1}.${start_date.getDate()}`,
      end: `${end_date.getFullYear()}.${end_date.getMonth() +
        1}.${end_date.getDate()}`
    };
  }

  set navparam(value: any) {
    this._navparam = value;
  }

  set navCtrl(value: NavController) {
    this._navCtrl = value;
  }

  get navparam(): any {
    return this._navparam;
  }

  public canMakeReservation() {
    return this.navparam && this.navparam.data;
  }
}
