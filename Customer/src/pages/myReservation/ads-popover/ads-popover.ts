import { ApiProvider } from './../../providers/services';
import { Events } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CustomBootstrap } from "../../../app/BootstrapFirstRun";

/**
 * Generated class for the AdsPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ads-popover',
  templateUrl: 'ads-popover.html',
})
export class AdsPopoverPage {

  flag ;
  showClose ;
  sec ; 
  intervalVar;
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private api: ApiProvider, public navParams: NavParams, private events: Events, public configuration: CustomBootstrap, ) {
    this.flag  = this.navParams.get('flag');
    this.showClose = false;
    this.sec = 0;
    this.startTimer();
  }
  startTimer(){
    this.intervalVar = setInterval(function(){
      this.sec ++;
      console.log("afasf",this.sec);
      if(!this.flag){
        if(this.sec > 5){
          this.showClose = true;
        }
      }
      else{
        this.showClose = true;
      }
    }.bind(this),1000);
  }
  ionViewDidLoad() {

  }

  ionViewWillLeave() {

  }

  ionViewCanLeave() { clearTimeout(this.intervalVar); console.log("Should I leave? Yes"); return true; }
}
