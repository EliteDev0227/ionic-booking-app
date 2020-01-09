import { SelectPaymethods } from './../select-paymethods/select-paymethods';
import { Component, OnInit } from "@angular/core";
import { NavController, NavParams, Platform, PopoverController, ModalController } from "ionic-angular";
import { beachAgreement } from "../includes/popover/beachAgreement/beachAgreement";
import { BeachProvider } from "../providers/beachProvider";
import { ApiProvider } from "../providers/services";
import { CustomBootstrap } from "../../app/BootstrapFirstRun";
import { myReservation } from "../myReservation/myReservation";
import { TranslateService } from "@ngx-translate/core";
import {AgreementHelper} from "../providers/agreement.helper";

/**
 * Created by shadow-viper on 12/19/17.
 */

@Component({
  selector: 'beachBookSunbed',
  templateUrl: 'beachBookSunbed.html'
})

export class beachBookSunbed implements OnInit {
  btn: any;
  beach_settings: any = [];
  selectedSunbed: number = 0;
  title: string = '';
  remaining_sunbed: any;
  requestPage: string = 'SunbedBook';
  index: string = '0';
  status: any = [];
  reservationStatus: string = '';
  price: any;
  remain: any;
  totalprice: any = 0;
  fixedprice: any;
  brokerid: any;
  oldAmount: any;
  confirmState: boolean = false;
  statusbooking: any;
  private sub1$: any;
  private sub2$: any;
  public reservationBox:boolean=false;
  constructor(private agreementHelper:AgreementHelper,public platform: Platform, public configuration: CustomBootstrap, public translate: TranslateService, public modalCtrl: ModalController, public popoverCtrl: PopoverController, public navparam: NavParams, public beachProvider: BeachProvider, public navCtrl: NavController, public api: ApiProvider) {
    this.btn = [];
    this.btn = this.beachProvider.sunbed.values;
    this.beach_settings = this.navparam.data.settings;
    // this.reservationStatus = this.navparam.data.status;
    this.title = this.navparam.data.title;
    this.index = this.navparam.data.index;
    this.status = this.navparam.data.data;
  
    this.beachProvider.sunbed.selected = 1;

    this.reservationStatus = (this.navparam.data.reservation && typeof this.navparam.data.reservation.status != 'undefined') ? this.navparam.data.reservation.status : '';
    this.oldAmount = (this.navparam.data.reservation && typeof this.navparam.data.reservation.amount != 'undefined') ? this.navparam.data.reservation.amount : '';

    if (this.navparam.data.reservation) {
      this.totalprice = this.oldAmount;
      this.btn[this.navparam.data.reservation.seat.count - 1] = true;
      this.statusbooking = this.navparam.data.reservation.status;
    }


    this.platform.ready().then(() => {

      this.sub1$ = this.platform.pause.subscribe(() => {

        if (this.navCtrl.getActive().name == 'beachBookSunbed') {
          this.configuration.ClearTimeout();
        }

      }, error => { });

      this.sub2$ = this.platform.resume.subscribe(() => {

        if (this.navCtrl.getActive().name == 'beachBookSunbed') {
          this.getRealtimeSunbed();
        }

      }, error => { });

    }, error => { });


  }

  ionViewWillUnload() {
    this.sub1$.unsubscribe();
    this.sub2$.unsubscribe();
  }

  ionViewWillLeave() {
    this.configuration.ClearTimeout();
  }

  ngOnInit() {
    this.getRemainingSunbed();
  }

  Agreement() {
    if (this.beachProvider.sunbed.selected && this.beachProvider.sunbed.selected > 0) {
      let agreementPopover = this.popoverCtrl.create(beachAgreement, { nav: this.navCtrl, total: this.totalprice, search: this.navparam.data.search, location: this.navparam.data.location, data: this.status, title: this.title, index: this.index, settings: this.beach_settings, selected: this.beachProvider.sunbed.selected }, { cssClass: 'agreementPopOver' });
      agreementPopover.present().then(() => {
      }, error => {
        console.error(error);
      });
    }


  }


  public check(){
    if(this.reservationBox){
      this.agreementHelper.navCtrl=this.navCtrl;
      this.agreementHelper.navparam={ nav: this.navCtrl, total: this.totalprice, search: this.navparam.data.search, location: this.navparam.data.location, data: this.status, title: this.title, index: this.index, settings: this.beach_settings, selected: this.beachProvider.sunbed.selected };
   
    }
  }

  public completeReservation(){
    this.agreementHelper.setup();
  }


  public canReserve(){
    return this.agreementHelper.canMakeReservation() && this.reservationBox;
  }


  Select(index: number, value: number) {
    if (this.reservationStatus == 'change-request') return;
    this.btn = [];
    this.btn[index] = true;
    this.selectedSunbed = value;
    this.beachProvider.sunbed = {
      values: this.btn,
      selected: value
    };

    


    var eventStartTime = this.navparam.data.search.start_date;
    var eventEndTime = this.navparam.data.search.end_date;
    var duration = eventEndTime - eventStartTime;

  

    var real = Math.floor(Math.abs((new Date(eventEndTime)).getTime() - (new Date(eventStartTime)).getTime()) / 36e5 / 24) ;

    if (real == 0) {
      this.totalprice = this.fixedprice * 1 * value;
    } else {
      this.totalprice = this.fixedprice * (real + 1) * value;
    }

    if (this.statusbooking == 'active') {
      
      this.totalprice = this.totalprice - parseInt(this.navparam.data.reservation.old_amount);
    }

    this.totalprice = Math.round(this.totalprice);


    if (this.oldAmount != this.totalprice) {
      this.confirmState = true;
    }

    this.status.broker_id = this.brokerid;
    this.status.count = value;

  }


  getRemainingSunbed() {
   
    let date = new Date();
    this.api.get(`grid/${this.beach_settings.beach_id}/extra-seats`, { start_date: this.navparam.data.search ? this.getDate(this.navparam.data.search.start_date) : this.getDate(date.getMilliseconds()), end_date: this.navparam.data.search ? this.getDate(this.navparam.data.search.end_date) : this.getDate(date.getMilliseconds()) }, {}, true, true).subscribe(r => {
      this.remaining_sunbed = r;
      this.price = r.price;
      this.fixedprice = r.price;
      this.remain = r.count;
      this.brokerid = r.broker_id;

      this.getRealtimeSunbed();
    }, error => { })
  }

  getRealtimeSunbed() {
    let timeout = setTimeout(() => {

      this.getRemainingSunbed();

    }, 5000);
    this.configuration.setTimeout(timeout);
  }


  private getDate(Inputdate: number) {
    let isoDate = new Date(Inputdate).toISOString();
    // return `${date.getFullYear()}-${this.getDoubleStr((date.getMonth()+1).toString())}-${date.getDate()-1}`
    return isoDate && isoDate.split("Z") && isoDate.split("Z").length > 0 ? isoDate.split("T")[0] : isoDate
  }


//   getDoubleStr(data: string) {
//     return data.length > 1 ? data : '0' + data;
//   }

  ionViewWillEnter() {
    this.configuration.setRequestPage(this.requestPage);
  }

  getPrice() {
    return this.beachProvider.getPrice(this.beach_settings, this.status.type, this.navparam.data.location, this.navparam.data.pool) || 0;
  }


  getTotalPrice() {
    var eventStartTime = this.navparam.data.pool.start_date;
    var eventEndTime = this.navparam.data.pool.end_date;
    var duration = eventEndTime - eventStartTime;

    var real = duration / (24 * 60 * 60 * 1000) == 0 ? 1 : (duration / (24 * 60 * 60 * 1000)) + 1;

    return this.getPrice() * this.selectedSunbed * real;
  }
  

  confirmChange() {

    let optionConfirm;

    if (this.statusbooking == 'active') {
      optionConfirm = {
        id: this.navparam.data.reservation.id,
        seat: {
          type: this.navparam.data.pool.seat_type,
          count: this.selectedSunbed
        },
        amount: parseInt(this.totalprice),
        old_amount: parseInt(this.navparam.data.reservation.old_amount)

      };
    } else {
      optionConfirm = {
        id: this.navparam.data.reservation.id,
        seat: {
          type: this.navparam.data.pool.seat_type,
          count: this.selectedSunbed
        },
        amount: parseInt(this.totalprice),
        old_amount: 0

      };
    }

    // if(this.reservationStatus != 'booked')
    //   optionConfirm['old_amount'] = this.oldAmount;
    /*start_date:this.navparam.data.pool.start_date,
      end_date:this.navparam.data.pool.end_date,*/
    //this.getPrice()*(this.selected + ((this.sunbed && this.sunbed>0)?this.sunbed:0)),
  
    this.api.post('booking/update', optionConfirm, {}).subscribe(r => {
      this.api.AmError(this.configuration.translate.translate.instant('DONE'), this.configuration.translate.translate.instant('RESERVATION_CHANGED_SUCCESSFULLY'), [{
        text: this.configuration.translate.translate.instant('PROCEED'), handler: () => {
          this.navCtrl.setRoot(myReservation);
        }
      }])
    }, error => {

    })
  }

  onPay() {

    this.configuration.getStorage('login').then((a) => {
      if (a && a.token) {
     
        let url = `loiality-points/${a.id}/${this.beach_settings.id}`;
        this.api.get(url,{},{}).subscribe(res => {
          if (res != null) {
            this.modalCtrl.create(SelectPaymethods,{nav: this.navCtrl, 'total': this.totalprice, 'points': res['points'], 'isCard':this.beach_settings.card, search: this.navparam.data.search, location: this.navparam.data.location, data: this.status.data, title: this.title, index: this.index, settings: this.beach_settings, selected: this.beachProvider.sunbed.selected, extra: 0},{}).present();
          }else{
            if (this.beach_settings.card == false) {
              this.translate.get("YOU_HAVE_NOT_LOYALITY",{beachName:this.beach_settings.name}).subscribe((res: string) => {
                this.api.showInfo(res);  
              });
            }else{
              this.modalCtrl.create(SelectPaymethods,{nav: this.navCtrl, 'total': this.totalprice, 'points': 0, 'isCard': this.beach_settings.card, search: this.navparam.data.search, location: this.navparam.data.location, data: this.status.data, title: this.title, index: this.index, settings: this.beach_settings, selected: this.beachProvider.sunbed.selected, extra: 0},{}).present();
            }
          }
        });
      }
    }, error => { });
  }

}

// total: this.totalprice, search: this.navparam.data.search, location: this.navparam.data.location, data: this.status, title: this.title, index: this.index, settings: this.beach_settings, selected: this.beachProvider.sunbed.selected