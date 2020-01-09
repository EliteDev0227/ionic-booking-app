import { ApiProvider } from './../../../providers/services';
import { Events } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CustomBootstrap } from "../../../../app/BootstrapFirstRun";

/**
 * Generated class for the ListPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list-popover',
  templateUrl: 'list-popover.html',
})
export class ListPopoverPage {

  beach: { beach_ids: Array<string>, start_date: number, end_date: number, latitude: number, longitude: number } = { beach_ids: [], start_date: null, end_date: null, latitude: 0, longitude: 0 };
  mPage: { type: string, selected: number } = { type: '', selected: 0 };
  places: any = [];
  focused: { place: boolean, country: boolean } = { place: false, country: false };
  dateObj: { from: any, to: any } = { from: null, to: null };
  countries: string;
  SearchDetails: { country: string, place: string, all: string } = { country: null, place: '', all: '' };
  Search: { country: number, place: string } = { country: null, place: '' };
  PreviousInput: { place: string, country: string, all: string };

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private api: ApiProvider, public navParams: NavParams, private events: Events, public configuration: CustomBootstrap, ) {
    this.mPage.type = this.navParams.get('type');
    this.countries = this.navParams.get('countries');
    // this.places = this.navParams.get('places');
    this.Search.country = this.navParams.get('country_id');
    this.mPage.selected = this.navParams.get('country_id');
    this.places =JSON.parse( localStorage.getItem('places') || '[]');
  }

  ionViewDidLoad() {

  }

  ionViewWillLeave() {
    this.events.publish(`page:${this.mPage.type}`, this.SearchDetails[`${this.mPage.type}`]);
    // if(this.mPage.type == 'place') {
    //   this.events.publish('page:beach', this.beach);
    // }
  }

  getBeachId(country?: { id: number, name: string, beaches: number }, place?: { id: string, name: string, beaches: number }) {
    this.mPage.selected = country.id;
    if (country && country.id && country.name) {
      this.Search.country = country.id;
      this.SearchDetails.country = country.name;
      this.events.publish('page:country_id', country.id);
      this.viewCtrl.dismiss();
      return;
    }

    if (place && place.id && place.name) {
      this.Search.place = place.id;
      this.SearchDetails.place = place.name;

    }
    // Define map tab test-=------
    if (this.SearchDetails.country === 'Romania' && this.SearchDetails.place === 'Mamaia')
      this.events.publish('app:mapView', true);
    else
      this.events.publish('app:mapView', false);
    //- --------------------
    if ((this.Search.country && this.Search.country >= 0) && (this.Search.place && this.Search.place.length > 3)) {
      this.api.get('beaches/' + this.Search.country + '/' + this.Search.place, {}, {}, true).subscribe(r => {

        this.beach.beach_ids = r;
        this.events.publish('page:beach', this.beach);
      })
    }

    this.viewCtrl.dismiss();
  }

  getCountryPlaces() {
    if(!this.places.length) {
      
    }

    if (this.Search && this.Search.country) {
      return this.places.filter(r => r['country_id'] === this.Search.country)
    }
  }

  getPlaces() {
   
    this.api.get("places", {}, {}, true).subscribe(r => {
      localStorage.setItem('places',JSON.stringify(r));
    })

  }
  getBeachSettings(){
    /*this.api.get("beach-settings", {}, {}, true).subscribe(r => {
      localStorage.setItem('beachsettings',JSON.stringify(r));
    })*/
  }
}
