import {Component, OnInit} from "@angular/core";
import {Events, NavController, NavParams} from "ionic-angular";
import {CartPage} from "../cart/cart";
import {BeachPage} from "../beach/beach";
import {CustomBootstrap} from "../../app/BootstrapFirstRun";
/**
 * Created by shadow-viper on 12/17/17.
 */

@Component({
  selector:'beachDetails',
  templateUrl:'beachDetails.html'
})

export class beachDetails implements OnInit{
  beachDetailsData:any;
  quantity:number;
  itemsShown:boolean;
  requestPage:string='BeachDetails';
  beachSection:string;
  constructor(public configuration:CustomBootstrap,public navparam:NavParams,public navCtrl:NavController,public events:Events){
    this.itemsShown=false;
    this.quantity=1;
  }
  ngOnInit(){
    this.beachDetailsData=this.navparam.get('item');
    this.beachSection=this.navparam.get('type');
  }


  add(){
    this.events.publish('cart:received',this.quantity);
  }

  beach(){
    this.navCtrl.push(BeachPage)
  }
  gotoCart(){
    this.navCtrl.push(CartPage)
  }
  counter(val:number):void{
    if((val<0 && this.quantity>0) || val>0 && this.quantity<19) this.quantity+=val;
  }

  ionViewWillEnter(){

    this.configuration.setRequestPage(this.requestPage);
  }

}
