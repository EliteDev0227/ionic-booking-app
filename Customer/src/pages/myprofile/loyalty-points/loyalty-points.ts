import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the LoyaltyPointsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-loyalty-points',
  templateUrl: 'loyalty-points.html',
})
export class LoyaltyPointsPage {
  myPoints: Array<any> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.myPoints = this.navParams.data['points'];
  }

  ionViewDidLoad() {
    
  }

}
