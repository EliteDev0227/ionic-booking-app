import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the TermsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html',
})
export class TermsPage {
  termsText: string = '';
  titleText: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.titleText = this.navParams.data.title;
    this.termsText = this.navParams.data.terms;
  }

  ionViewDidLoad() {
    
  }

}
