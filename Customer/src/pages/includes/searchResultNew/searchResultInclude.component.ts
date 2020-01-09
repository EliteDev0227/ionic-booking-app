import { Component, Input, OnInit } from "@angular/core";
import {
  NavController,
  PopoverController,
  NavParams,
  Events,
  Platform,
  ViewController
} from "ionic-angular";
import { BeachPage } from "../../beach/beach";
import { ratingPage } from "../../rating/rating";
import { ApiProvider } from "../../providers/services";
import { BeachView } from "../beachView/beachView";
import { CustomBootstrap } from "../../../app/BootstrapFirstRun";
import { Geolocation } from "@ionic-native/geolocation";
import { TranslateService } from "@ngx-translate/core";
import { searchDupplication } from "../searchDupplication/searchDupplication";
import {
  LaunchNavigator,
  LaunchNavigatorOptions
} from "@ionic-native/launch-navigator";
import { SearchResultsPage } from "../../search-results/search-results";
import moment from "moment";

@Component({
  selector: "app-search-result-include",
  templateUrl: "./searchResultInclude.component.html"
})
export class SearchResultIncludeComponent implements OnInit {
  public title: string = "";
  public infiniteCount: number = 10;
  public SearchObj: any;
  direction: Array<number> = [];
  private _noResponse = false;
  enteredGrid: boolean = false;
  public _169: number = (document.body.clientWidth * 9) / 16;
  filters: any = [];
  beach_settings:any = [];
  SearchResult: any;
  public carouselTile = {
    grid: { xs: 1, sm: 1, md: 3, lg: 3, all: 0 },
    slide: 3,
    speed: 250,
    point: {
      visible: false
    },
    load: 2,
    velocity: 0,
    touch: true,
    easing: "cubic-bezier(0, 0, 0.2, 1)"
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public popoverCtrl: PopoverController,
    public configuration: CustomBootstrap,
    public translate: TranslateService,
    public events: Events,
    public geolocation: Geolocation,
    public platform: Platform,
    public launchNavigator: LaunchNavigator,
    public search: SearchResultsPage
  ) {
    this.SearchResult = [];
    this.SearchObj = [];
    this.beach_settings =JSON.parse( localStorage.getItem('beachsettings') || '[]');

    // this.configuration.getStorage('Filters').then(r => {
    //     if (r && r.filterMock) {
    //         this.filters = r.filterMock.filter.filter(item => {
    //             if (item) {
    //                 return item;
    //             }
    //         });

    //     }
    // });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this._noResponse = false;
  }

  next(id: string, data1: any, title: string, $event) {

    if (
      data1.closed ||
      $event.target.closest(".star-rating") ||
      $event.target.closest(".direction-btn-holder") ||
      $event.target.closest(".arrow")
    ) {
      return false;
    }

    this.setCurrencyByBeach(id);


    this.search.sub1$.unsubscribe();
    this.search.sub2$.unsubscribe();

    if (!this.enteredGrid) {
      this.configuration.getStorage("reserv_endDate").then(data => {
        
        let timezoneOffsetHours = new Date().getTimezoneOffset() / 60;
        let alreadyEDate =
          data === "0"
            ? undefined
            : new Date(
                new Date(data).setHours(
                  new Date(data).getHours() + timezoneOffsetHours
                )
              ).getDate();
        let newSDate = new Date(this.SearchObj.start_date).getDate();
        let endSDate = new Date(this.SearchObj.end_date).getDate();

        this.configuration
          .getStorage("reservation")
          .then(reservation => {
            let sameBeach = reservation && reservation.beach_id === id;
            if (
              sameBeach &&
              alreadyEDate &&
              (newSDate <= alreadyEDate && alreadyEDate <= endSDate)
            ) {
              let popoverSignup = this.popoverCtrl.create(searchDupplication, {
                msg: this.translate.instant("DUPPLICATED_RESERVATION_DETECT")
              });
              popoverSignup.present();
              return;
            }
            this.SearchObj.waiter_id = this.SearchResult.waiter_id;


            this.navCtrl.push(BeachPage, {
              id: id,
              data: data,
              title: this.title,
              title2: title,
              SearchObj: this.SearchObj,
              context: "search"
            });
          })
          .catch(error => {
            if (
              alreadyEDate &&
              (newSDate <= alreadyEDate && alreadyEDate <= endSDate)
            ) {
              let popoverSignup = this.popoverCtrl.create(searchDupplication, {
                msg: this.translate.instant("DUPPLICATED_RESERVATION_DETECT")
              });
              popoverSignup.present();
              return;
            }
            this.SearchObj.waiter_id = this.SearchResult.waiter_id;

            this.navCtrl.push(BeachPage, {
              id: id,
              data: data,
              title: this.title,
              title2: title,
              SearchObj: this.SearchObj,
              context: "search"
            });
          });
      });
    }
    this.enteredGrid = true;
    setTimeout(() => {
      this.enteredGrid = false;
    }, 1000);
  }

  private setCurrencyByBeach(id: string) {
    let ss = this.beach_settings.find(item => {
      return item.beach_id == id;
    });
    this.configuration.currency = ss.currency;
  }

  @Input()
  set searchInput(data: any) {
    this.SearchResult = data;
  }

  get searchInput() {
    return this.SearchResult;
  }
  more(infiniteScroll) {
    
    setTimeout(() => {
      if (this.SearchResult.length) {
        this.infiniteCount += 10;
        infiniteScroll.complete();
        if (this.infiniteCount >= this.SearchResult.length) {
          infiniteScroll.enable(false);
          this.infiniteCount = this.SearchResult.length;
        }
      }
    }, 300);
  }
  rating(id: string): void {
    this.search.sub1$.unsubscribe();
    this.search.sub2$.unsubscribe();
    this.navCtrl.push(ratingPage, { id: id, title: this.title });
  }

  @Input()
  set Title(data: string) {
    this.title = data;
  }
  @Input()
  set SearchParam(data: string) {
    this.SearchObj = data;
  }

  get SearchParam() {
    return this.SearchObj;
  }
  get Title() {
    return this.title;
  }

  convertInt(data: number) {
    return data | 0;
  }

  getBeachWorkingHours(id) {
    let workingHours;
    this.beach_settings.map(beach => {
      if (beach.beach_id === id) {
        workingHours = beach.working_hours || {};
      }
    });
    return workingHours;
  }

  getRating(rate: number, num: number): string {
    let star: string = "beach-star-0";
    if (Math.floor(rate) >= num) {
      star = "beach-star-100";
    } else {
      if (num - rate > 1) {
        star = "beach-star-0";
      } else {
        star = `beach-star-${100 - Math.floor(((num - rate) * 100) / 25) * 25}`;
      } //i forgot about < > arrows if the user will click on it. now it goes into the beach page
    }
    return star;
  }

  beachModal(id) {
   
    let beachM = this.popoverCtrl.create(
      BeachView,
      { beach_id: id },
      { cssClass: "imgPop" }
    );

    beachM.onDidDismiss(data => {
     
      this.search.getGeolocation(true);
    });
    beachM.present();
  }

  private BeachCordinates(beach_id: string) {
    for (let i in this.beach_settings) {
      if (this.beach_settings.hasOwnProperty(i)) {
        if (
          this.beach_settings[i] &&
          this.beach_settings[i].beach_id == beach_id
        ) {
          return this.beach_settings[i];
        }
      }
    }
  }

  openNavigator(beach: any, type: string) {
    let beachCord = this.BeachCordinates(beach.id);
    if (beachCord.latitude) {
      //this.api.AmBusy('');
      this.geolocation
        .getCurrentPosition()
        .then(myPosition => {
          let options: LaunchNavigatorOptions = {
            start: `${myPosition.coords.latitude}, ${
              myPosition.coords.longitude
            }`,
            app: this.launchNavigator.APP.GOOGLE_MAPS,
            transportMode:
              type == "walking"
                ? this.launchNavigator.TRANSPORT_MODE.WORKING
                : this.launchNavigator.TRANSPORT_MODE.DRIVING
          };//id585027354

          this.launchNavigator
            .navigate(`${beachCord.latitude}, ${beachCord.longitude}`, options)
            .then(
              success => {
                
                //this.api.AmBusy('',true);
              },
              error => {
                
                //this.api.AmBusy('',true);
              }
            );
        })
        .catch(err => {
        
          //this.api.AmBusy('',true);
        });
    }
  }

  get noResponse(): boolean {
    return this._noResponse;
  }

  @Input()
  set noResponse(value: boolean) {
    this._noResponse = value;
  }
}
