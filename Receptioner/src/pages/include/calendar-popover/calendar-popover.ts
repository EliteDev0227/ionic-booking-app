import { Tools } from './../../../providers/tools';
import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { CalendarComponentOptions } from 'ion2-calendar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-calendar-popover',
  templateUrl: 'calendar-popover.html',
})

export class CalendarPopoverPage {


  dateRange: any;
  optionsRange: CalendarComponentOptions = this.navParam.data.options;
  isChange: boolean = false;
  isSingle: boolean = false;
  badRange: boolean = false;
  

  constructor(public viewCtrl: ViewController, public navParam: NavParams, private tools: Tools, private translateService: TranslateService) {
   
    // console.log(this.navParam.data.options);

    if (this.navParam.data.options && this.navParam.data.options.defaultDateRange.from && this.navParam.data.options.defaultDateRange.to) {
      this.dateRange = {
        from: null,
        to: null
      };
      this.dateRange.from = this.navParam.data.options.defaultDateRange.from;
      this.dateRange.to = this.navParam.data.options.defaultDateRange.to;
    }
  }

  doClose() {

    if (this.isChange) {

      // const period = this.tools.getPeriod(this.dateRange.from, this.dateRange.to);

    //   const period = Math.floor(Math.abs((new Date(this.dateRange.from)).getTime() - (new Date(this.dateRange.to)).getTime()) / 36e5 / 24) + 1;

      // if (period > 14) {
      //   this.badRange = true;
      // } else {
      //   this.viewCtrl.dismiss(this.dateRange);
      // }
      this.viewCtrl.dismiss(this.dateRange);

    } else {

      if (this.isSingle) {
        this.viewCtrl.dismiss(this.dateRange);
      } else {
        this.viewCtrl.dismiss(null);
      }

    }
  }

  onChange(event) {
    this.badRange = false;
    // console.log(event.from);
    if (this.navParam.data.options && this.navParam.data.options.defaultDateRange) {
      this.isSingle = false;
      this.isChange = true;
      this.dateRange.isSingle = false;
      // this.dateRange={
      //   from:null,
      //   to:null,
      //   isSingle:false
      // };
      // this.optionsRange={};

      let period = Math.floor(Math.abs((new Date(this.dateRange.from)).getTime() - (new Date(this.dateRange.to)).getTime()) / 36e5 / 24);
      this.translateService.get("SELECTED_DAYS_TITLE", { "days": period }).subscribe((value) => {
        this.optionsRange = this.navParam.data.options;
        this.optionsRange.defaultTitle = value;
      })
      // this.dateRange.from = event.from;
      // this.dateRange.to = event.to;
    }
  }

  onSelectStart($event) {
    this.optionsRange.defaultSubtitle = '';
    // console.log('onSelectStart',$event);
    this.isSingle = true;
    let dateStr = new Date($event.time);
    this.dateRange.from = `${dateStr.getFullYear()}-${this.tools.getFormatedNum(dateStr.getMonth() + 1)}-${this.tools.getFormatedNum(dateStr.getDate())}`;
    this.dateRange.to = this.dateRange.from;
    this.dateRange.isSingle = true;
  }

}
