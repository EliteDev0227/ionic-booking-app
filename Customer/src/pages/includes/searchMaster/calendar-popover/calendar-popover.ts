import {Component} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {CalendarComponentOptions} from 'ion2-calendar';
// let date=new Date();
@Component({
  selector: 'page-calendar-popover',
  templateUrl: 'calendar-popover.html',
})

export class CalendarPopoverPage {


  dateRange:any;
  optionsRange: CalendarComponentOptions = this.navParam.data.options;




  doClose() {
    this.viewCtrl.dismiss(this.dateRange)
  }

  constructor(public viewCtrl: ViewController,public navParam:NavParams) {

    if(this.navParam.data.options && this.navParam.data.options.from && this.navParam.data.options.to){
      this.dateRange={
      from:null,
      to:null
      };
      this.dateRange.from=this.navParam.data.options.from;
    }
    if(this.navParam.data.sfrom){
      this.dateRange= this.navParam.data.sfrom;
    }
  }

  onChange(event){

    if(this.navParam.data.options && this.navParam.data.options.from && this.navParam.data.options.to){
      this.dateRange={
        from:null,
        to:null
      };
      this.optionsRange={};

      this.optionsRange=this.navParam.data.options;
      this.dateRange.from=this.navParam.data.options.from;

      if(!event.to && event.from){
        this.optionsRange.to=event.from;
        this.dateRange.to=event.from;
      }
      if(event.to){
        this.dateRange.to=event.to;
        this.optionsRange.to=event.to;

      }
    }
  }

}
