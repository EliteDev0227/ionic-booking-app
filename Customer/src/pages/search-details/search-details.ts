import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'
import { SearchResultsPage } from '../search-results/search-results'
import { ApiProvider } from "../providers/services";
import { CustomBootstrap } from "../../app/BootstrapFirstRun";
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter'
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import {MainGuestPage} from "../main-guest-page/main-guest-page.component";

@Component({
  selector: 'page-search-details',
  templateUrl: 'search-details.html',
})
export class SearchDetailsPage {

  langSubscr: BehaviorSubject<string> = new BehaviorSubject<string>('ro');

  country: string = 'Romania';
  clickable: boolean = false;
  place: string = 'Mamaia';
  currentlang: any;
  persons = Array.from(new Array(8), (val, index) => index + 1)
  types = ['UMBRELLA', 'BALDAQUIN']; //['UMBRELLA', 'BALDAQUIN', 'SUNBED'];
  requestPage: string = 'SearchDetails';
  zones = ['FRONT', 'MIDDLE', 'BACK'];
  selected: {
    seat: Array<string>,
    zone: Array<string>,
    persons: Array<number>,
    sunbed: Array<boolean>,
    sunbedEveryday: Array<number>
  };
  SearchPost: {
    beach_ids: Array<string>,
    seat_type: string,
    seat_zone: Array<string>,
    person_num: number,
    all_seats: boolean,
    same_seats: boolean,
    end_date: number,
    start_date: number,
    longitude: number,
    latitude: number
  };
  title: string;
  constructor(public geo: Geolocation, public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider, public configuration: CustomBootstrap) {
    this.selected = {
      seat: [],
      zone: [],
      persons: [],
      sunbed: [],
      sunbedEveryday: []
    };
    this.SearchPost = this.navParams.get('beach');
    this.clickable = false;
    this.title = this.navParams.get('title');

    this.SearchPost.all_seats = false;
    // if (this.configuration.hasLocationAccess) {
      this.getGeolocation()
    // }
  }

  ionViewWillEnter() {
    this.configuration.setRequestPage(this.requestPage);

    this.currentlang = localStorage.getItem('lang');

    if (this.currentlang == null) {

      this.currentlang = 'ro';
    }

 
  }


  SearchBeaches() {
  
    if (this.shouldAllowSubmit()) {

      this.SearchPost.seat_zone = this.zones
      this.navCtrl.push(SearchResultsPage, { searchlist: this.SearchPost, title: this.title });
    }
  }

  private _select(type: string, index: number, name: string): void {
    if (this.selected[type])
      this.selected[type][index] = name ? name : true;
  }

  private _deselect(type: string, index: number): void {
    if (this.selected[type])
      delete this.selected[type][index];
  }
  check(type: string, index: number, single: boolean, name: string) {



    if (this.selected[type]) {
      if (single)
        this.selected[type] = [];
      if (this.selected[type][index]) {
        this._deselect(type, index);
        this.setPostVar();
        return;
      }
      this._select(type, index, name);
    }
    this.setPostVar()

  }

  shouldAllowSubmit(): boolean {
    if (this.clickable == true && this.SearchPost && this.SearchPost.beach_ids && this.SearchPost.beach_ids.length > 0 && this.SearchPost.end_date && this.SearchPost.end_date && this.SearchPost.person_num && this.SearchPost.seat_type) {
      return true;
    } else {
      return false;
    }
  }



  private SanitizeData(data: any) {
    let data1 = [];
    if (data) {
      for (let i in data) {
        if (data.hasOwnProperty(i) && data[i] != undefined) {
          data1.push(data[i])
        }
      }
    }
    return data1;
  }

  private SanitizeToString(data: any, lower: boolean) {
    let data1 = '';
    if (data) {
      for (let i in data) {
        if (data.hasOwnProperty(i) && data[i] != undefined) {
          data1 += lower ? data[i].toLowerCase() : data[i]
        }
      }
    }
    return data1;
  }

  private getNumber() {
    for (let i in this.selected.persons) {
      if (this.selected.persons.length > 0 && this.selected.persons[i] && this.selected.persons[i] > 0) {
        return this.selected.persons[i];
      }
    }
  }

  private setPostVar() {
 
    this.clickable = true;
    this.SearchPost.seat_type = this.SanitizeToString(this.selected.seat, true);
    this.SearchPost.seat_zone = this.SanitizeData(this.selected.zone);
    this.SearchPost.person_num = this.getNumber();
    this.SearchPost.all_seats = this.selected.sunbed[0];
  }

  public translate(key: string) {
   
    this.configuration.translate.translate.instant(key.toUpperCase())

  }


  private getGeolocation = () => {

    try {

      navigator.geolocation.getCurrentPosition((a) => {
        if (a && a.coords && a.coords.latitude) {
          this.SearchPost.latitude = a.coords.latitude;
          this.SearchPost.longitude = a.coords.longitude;
        }
      }, (e) => { }, { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 })

    } catch (error) {

    }
  }


  public goBack(){
    this.navCtrl.setRoot(MainGuestPage);
  }
}
