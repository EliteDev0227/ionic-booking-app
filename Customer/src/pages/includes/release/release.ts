/**
 * Created by shadow-viper on 2/14/18.
 */


import { Component } from "@angular/core";
import { ApiProvider } from "../../providers/services";
import { CustomBootstrap } from "../../../app/BootstrapFirstRun";
import { NavParams, Events, AlertController, NavController } from "ionic-angular";

@Component({
  selector: 'release',
  templateUrl: './release.html'
})


export class ReleasePage {
  details: any = {};
  dateRanges: any = [];
  loopItem: any = [];
  excludes: any = [];
  reservation_id: string = '';
  alreadyreleasedday: any = [];
  constructor(public navParam: NavParams, public navCtrl: NavController, public api: ApiProvider, public configuration: CustomBootstrap, public alert: AlertController, public events: Events) {
   
    this.details = this.navParam.data.data;
    this.excludes = this.navParam.data.data.released_days;
    localStorage.setItem('release', this.navParam.data.data.released_days);
    this.alreadyreleasedday.push(localStorage.getItem('release'));
    
    this.reservation_id = this.navParam.data.data.id;
    let tmpDates = this.navParam.data.data.period.filter(item => {
     
      // if(new Date(item) >= new Date()) return item;
      return item;
    });
    this.dateRanges = tmpDates.map(day => {
     
      let obj = { date: day, disabled: false };
      obj.disabled = this.navParam.data.data.released_days.indexOf(day) !== -1;
      return obj;
    });
    this.loopItem = this.dateRanges.filter(item => {
      return !item.disabled;
    });

  }

  add(item: any, i) {
   


    if (this.excludes.indexOf(item.date) == -1) {
      
      this.dateRanges[this.dateRanges.indexOf(item)].disabled = true;
      this.excludes.push(item.date);
      
    } else {
      
      if (this.alreadyreleasedday.indexOf(item.date) == -1) {

       
        this.dateRanges[this.dateRanges.indexOf(item)].disabled = false;
        this.excludes.splice(this.excludes.indexOf(item.date), 1);
      

      } else {

        let alert = this.alert.create({
          title: "Warning",
          message: "This date is already released",
        });
        alert.present();

      }

    }
  }

  isExclude(dateString: string) {
    if (this.excludes.indexOf(dateString) == -1) {
      return false;
    } else {
      return true;
    }

  }

  reserve() {
    if (this.excludes.length == 0) return;
 
    this.api.post('booking/release', { id: this.reservation_id, days: this.loopItem }, {}, true).subscribe(r => {
    
      if (this.dateRanges.length === this.excludes.length) {
        this.configuration.setStorage('reserv_endDate', '0')
      }
      this.api.AmError(this.configuration.translate.translate.instant('DONE'), r.message, [{
        
        text: this.configuration.translate.translate.instant('CLOSE'), handler: () => {
          
          this.navCtrl.pop().then(_ => {
            this.events.publish('redirect:search')
         
          });
        }
      }])
      // this.dateRanges=this.dateRanges.map(item=>{ item.disabled = true; return item; };
      //this.loopItem=[];
    }, (error) => {
      console.error(error);
      console.info('cannot released subscription')
    })
  }

  getSeatSlots(slots: any): string {
    let str = '';
    for (const key in slots) {
      if (slots.hasOwnProperty(key)) {
        const element = slots[key];
        if (element.length > 0)
          str += key;
      }
    }
    return str;
  }

  getDate() {
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    return '' + y + '-' + (m < 10 ? '0' : '') + m + '-' + (d < 10 ? '0' : '') + d;
  }
}
