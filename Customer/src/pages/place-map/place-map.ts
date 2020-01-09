import { Component } from '@angular/core'
import { NavController, App, NavParams } from 'ionic-angular'

import { LoginPage } from '../login/login'
import {Tools} from "../providers/tools";
import {ApiProvider} from "../providers/services";
import 'rxjs/add/operator/debounceTime'
import {CustomBootstrap} from "../../app/BootstrapFirstRun";



@Component({
  selector: 'place-map',
  templateUrl: 'place-map.html',
})
export class PlaceMapPage {
  
  constructor(
    public configuration:CustomBootstrap,
    public navCtrl: NavController,
    public appCtrl: App,
    public navParams: NavParams,
    public tool:Tools,
    public api:ApiProvider
  ) {
    
  }

  ionViewDidLoad() {

  }
  ionViewWillEnter(){

    
  }

  goBack() {
    if(this.navCtrl.canGoBack()) {
      this.navCtrl.pop()
    } else {
      this.appCtrl.getRootNav().push(LoginPage, {}, { direction: 'back' })
    }
  }

}
