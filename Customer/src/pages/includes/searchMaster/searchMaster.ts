import { ListPopoverPage } from "./list-popover/list-popover";
import { Component, OnInit, ViewChild } from "@angular/core";
import { CalendarPopoverPage } from "./calendar-popover/calendar-popover";
import {
  ModalController,
  NavController,
  Platform,
  PopoverController,
  Events,
  AlertController
} from "ionic-angular";
import * as moment from "moment";
import { SearchDetailsPage } from "../../search-details/search-details";
import { ApiProvider } from "../../providers/services";
import { CustomBootstrap } from "../../../app/BootstrapFirstRun";
import { SearchResultsPage } from "../../search-results/search-results";
import { TranslateService } from "@ngx-translate/core";
import { AndroidPermissions } from "@ionic-native/android-permissions";
import { LocationAccuracy } from "@ionic-native/location-accuracy";
import { Diagnostic } from "@ionic-native/diagnostic";
import { Storage } from "@ionic/storage";
@Component({
  selector: "searchMaster",
  templateUrl: "searchMaster.html"
})
export class searchMaster  {
  @ViewChild("placeFocus") placeFocus;
  public date = { from: null, to: null, period: 0 };
  public beaches:any = [];
  private customer: any = {} as any;
  beach: {
    refresh: boolean;
    beach_ids: Array<string>;
    start_date: number;
    end_date: number;
    latitude: number;
    longitude: number;
    customer_id: string;
    search_date: number;
    search_by: string;
  } = {
      refresh: false,
      beach_ids: [],
      start_date: null,
      end_date: null,
      latitude: 0,
      longitude: 0,
      customer_id: "",
      search_date: 0,
      search_by: "location"
    };
  places: any = { id: [], start_date: 0, end_date: 0 };
  focused: { place: boolean; country: boolean } = {
    place: false,
    country: false
  };
  dateObj: { from: any; to: any } = { from: null, to: null };
  countries: string;
  SearchDetails: { country: string; place: string; all: string } = {
    country: null,
    place: "",
    all: ""
  };
  Search: { country: number; place: string } = { country: null, place: "" };
  PreviousInput: { place: string; country: string; all: string };
  search_by: string = "location";
  coords: any;
  value: any;
  

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public events: Events,
    public translate: TranslateService,
    private locationAccuracy: LocationAccuracy,
    private diagnostic: Diagnostic,
    public startBoostrapping: CustomBootstrap,
    private androidPermission: AndroidPermissions,
    private storage: Storage,
    private alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    public api: ApiProvider,
    public configuration: CustomBootstrap,
    public modalCtrl: ModalController
  ) {
    this.PreviousInput = { place: "", country: "", all: "" };

    // getting country and place from modal
    this.events.subscribe("page:country", c => {
      this.SearchDetails.country = c;
      this.resetCalendar();
    });
    this.events.subscribe("page:country_id", c_id => {
      this.Search.country = c_id;
      this.resetCalendar();
    });
    this.events.subscribe("page:place", p => {
      this.SearchDetails.place = p;
      this.resetCalendar();
    });
    this.events.subscribe("page:beach", beach => {
      this.beach = beach;
    });

    

  }

  setCountry(country){
    if(this.SearchDetails){
      this.SearchDetails.country = country;
    }

  }
  resetCalendar() {
    this.date = { from: null, to: null, period: 0 };
    this.dateObj = { from: null, to: null };
  }

  ngOnInit() {

    this.dateObj.from = moment(new Date());
    setTimeout(() => {
      this.countries = this.configuration.countries;
       this.places = this.configuration.places;
      // this.DefaultDates(moment(new Date()))
    }, 300);

    this.configuration.getStorage("login").then(
      (data: any) => {
        if (data && data.id) {
          this.customer = data;
        }
      },
      error => { }
    );
  }

  presentCalendar() {
    if (this.date && this.date.from) {
      let date = new Date(this.date.from);

      let popover = this.popoverCtrl.create(CalendarPopoverPage, {
        options: {
          pickMode: "range",
          from: this.dateObj.from,
          to: date.setDate(date.getDate() + 9)
        }
      });
      popover.present();
      popover.onDidDismiss((date: any) => {
        if (date && date.from && date.to) {
          date.to = moment(new Date(new Date(date.to).setHours(23, 59, 59)));
          let isToToday = new Date(date).getDate() === new Date().getDate();
          let computedTo = isToToday
            ? new Date(new Date(date.to).setHours(23, 59, 59))
            : new Date(date.to);
          this.date.to = date.to.format();
          this.beach.end_date = computedTo.getTime();
          this.dateObj.to = date.to;
          if (this.date.to && this.date.from) {
            this.date.period =
              this.dateObj.to.diff(this.dateObj.from, "days") + 1;
          }

          if (
            this.date.from &&
            new Date(this.date.to) < new Date(this.date.from)
          ) {
            this.date.to = this.date.from || this.date.to;
            this.beach.end_date = this.beach.start_date || this.beach.end_date;
            this.dateObj.to = this.dateObj
              ? this.dateObj.from
              : this.dateObj.to;
          }
        }
      });
    }
  }

  myKeyPress(event, type) {
    let pop = this.modalCtrl.create(
      ListPopoverPage,
      {
        type: type,
        countries: this.countries,
        places: this.places,
        country_id: this.Search.country
      },
      {}
    );
    pop.present();

    // if (this.PreviousInput[type] && this.SearchDetails[type] && (this.PreviousInput[type].length > this.SearchDetails[type].length)) {
    this.SearchDetails[type] = "";
    // this.PreviousInput[type]='';
    // }else{
    //   this.PreviousInput[type]=this.SearchDetails[type];
    // }
    this.SearchDetails.all = "All";
    if (this.SearchDetails[type] == "") {
      if (type == "country") this.SearchDetails.place = "";
    }
  }

  presentCalendarStart() {
    let popover = this.popoverCtrl.create(CalendarPopoverPage, {
      options: { pickMode: "single" },
      sfrom: this.dateObj.from,
      cssClass: "calender-modal"
    });
    popover.present();
    popover.onDidDismiss((date: any) => {
      if (date && date["_i"]) {
        this.DefaultDates(date);
      }
    });
  }

  DefaultDates(date: any) {
    let today = new Date();
    let isFromToday = new Date(date).getDate() === today.getDate();
    // isFromToday = false;

    let computedFrom = isFromToday
      ? new Date(
        new Date(date).setHours(
          today.getHours(),
          today.getMinutes(),
          today.getSeconds()
        )
      )
      : new Date(date);
    let computedTo = new Date(new Date(date).setHours(23, 59, 59));

    this.beach.start_date = computedFrom.getTime();
    this.beach.end_date = computedTo.getTime();

    this.date.from = date.format();
    this.date.to = date.format();

    this.dateObj.from = date;
    this.dateObj.to = date;

    this.date.period = 1;
  }

  next() {
    let keep = false;

    if (this.search_by == "near") {
      if (
        this.beach.start_date &&
        this.beach.end_date &&
        this.beach.start_date > 10 &&
        this.beach.end_date > 10
      ) {
        keep = true;
      } else {
        return false;
      }
    }

    if (!keep) {
      if (
        this.beach &&
        this.beach.beach_ids &&
        this.beach.start_date &&
        this.beach.end_date &&
        this.beach.beach_ids.length > 0 &&
        this.SearchDetails.place != "" &&
        this.SearchDetails.country != ""
      ) {
        //this.navCtrl.push(SearchDetailsPage, { beach: this.beach, title: this.SearchDetails.country + ', ' + this.SearchDetails.place })
        keep = true;
      } else {
        return false;
      }
    }

    this.beach.search_date = new Date().getTime() * 1000;
    this.beach.refresh = true;
    this.beach.search_by = this.search_by;
    this.beach.customer_id = this.customer.id;

    let title = this.SearchDetails.country + ", " + this.SearchDetails.place;
    if (this.search_by == "near") {
      title = this.translate.instant("NEAR_BY");
    }
    let searchResParams: any = {
      searchlist: this.beach,
      title: title,
      search_by: this.search_by
    };
    if (this.search_by == "near") {
      searchResParams.coords = this.coords;
    }

    this.navCtrl.push(SearchResultsPage, searchResParams);
  }

  isFocused(place: boolean, country: boolean) {
    if (place) {
      this.focused = {
        place: true,
        country: false
      };
    }
    if (country) {
      this.focused = {
        place: false,
        country: true
      };
    }
    if (!place && !country) {
      this.focused = {
        place: false,
        country: false
      };
    }
  }

  getBeachId(
    country?: { id: number; name: string; beaches: number },
    place?: { id: string; name: string; beaches: number }
  ) {
    this.SearchDetails.all = "";
    if (country && country.id && country.name) {
      if (country.beaches <= 0) {
        return;
      }
      this.Search.country = country.id;
      this.SearchDetails.country = country.name;
      this.placeFocus.setFocus();
      this.isFocused(true, false);
      return;
    }

    if (place && place.id && place.name) {
      if (place.beaches <= 0) {
        return;
      }
      this.Search.place = place.id;
      this.SearchDetails.place = place.name;
    }
    // Define map tab test-=------
    if (
      this.SearchDetails.country === "Romania" &&
      this.SearchDetails.place === "Mamaia"
    )
      this.events.publish("app:mapView", true);
    else this.events.publish("app:mapView", false);
    //- --------------------
    if (
      this.Search.country &&
      this.Search.country >= 0 &&
      (this.Search.place && this.Search.place.length > 3)
    ) {
      this.api
        .get(
          "beaches/" + this.Search.country + "/" + this.Search.place,
          {},
          {},
          true
        )
        .subscribe(r => {
          this.beach.beach_ids = r;
        });
    }
    this.focused = {
      place: false,
      country: false
    };
  }

  shouldAllowSubmit(): boolean {
    if (this.search_by == "near") {
      if (
        this.beach.start_date &&
        this.beach.end_date &&
        this.beach.start_date > 10 &&
        this.beach.end_date > 10
      ) {
        return true;
      }
      return false;
    }

    if (
      this.beach &&
      this.beach.beach_ids &&
      this.beach.start_date &&
      this.beach.end_date &&
      this.beach.beach_ids.length > 0 &&
      this.beach.start_date > 10 &&
      this.beach.end_date > 10
    ) {
      return true;
    }
  }

  getCountryPlaces() {
    if (this.Search && this.Search.country) {
      return this.places.filter(r => r["country_id"] === this.Search.country);
    }
  }

  //   private unixMiliseconds(StrDate: string) {
  //     let date = new Date(StrDate);
  //     return new Date(date.setDate(date.getDate())).getTime();
  //   }

  byLocation() {
    this.search_by = "location";
  }

  nearBy() {
    let that = this;

    this.search_by = "location";

    this.androidPermission
      .checkPermission(this.androidPermission.PERMISSION.ACCESS_FINE_LOCATION)
      .then((a: any) => {
        this.locationAccuracy
          .canRequest()
          .then(possible => {
            if (possible) {

              //that.search_by = "near";
              return this.locationAccuracy.request(
                this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
                  () => that.search_by = "near",
                  error => {}
                );
            } else {
              return this.diagnostic.isGpsLocationEnabled().then(enabled => {
                if (enabled) {
                  that.search_by = "near";
                }
              });
            }
          })
          .catch(error => {
            this.search_by = "location";
            console.error("accuracy request failure");
          });

      })
      .catch(error => {
        this.androidPermission
          .requestPermission(
            this.androidPermission.PERMISSION.ACCESS_FINE_LOCATION
          )
          .then(
            (a: any) => {
              this.locationAccuracy
                .canRequest()
                .then(possible => {
                  if (possible) {

                    that.search_by = "near";
                    return this.locationAccuracy.request(
                      this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
                        () => that.search_by = "near",
                        error => {}
                      );
                  } else {
                    return this.diagnostic
                      .isGpsLocationEnabled()
                      .then(enabled => {
                        if (enabled) {
                          that.search_by = "near";
                        }
                      });
                  }
                })
                .then(() => {
                  
                })
                .catch(error => {
                 
                });
            },
            error => {
              console.error("permission denial");
              console.error(error);
            }
          );
      });


    // this.androidPermission.checkPermission(this.androidPermission.PERMISSION.ACCESS_FINE_LOCATION).then((a: any) => {

    // 	return this.diagnostic.isGpsLocationEnabled()
    // 		.then(enabled => {
    // 			if (enabled) {
    // 				this.search_by = 'near';
    // 			}
    // 			else {
    // 				this.storage.get('alreadygpsset').then((val) => {
    // 					 this.value = val;
    // 				  });
    // 				this.startBoostrapping.apiData.AmError("GPS is inactive", "Do you want to activate it?", [{
    // 					text: 'No thanks', handler: () => {
    // 						this.search_by = 'location';
    // 					}
    // 				}, {
    // 					text: 'Activate', handler: () => {
    // 						this.diagnostic.switchToLocationSettings();
    // 					}
    // 				}])
    // 			}
    // 		});

    // }, (error) => {
    // 	console.error('error accessing gps location permission');
    // 	console.info('we are going to request for it');
    // 	this.androidPermission.requestPermission(this.androidPermission.PERMISSION.ACCESS_FINE_LOCATION).then((a: any) => {
    // 		this.locationAccuracy.canRequest()
    // 			.then(possible => {
    // 				if (possible) {
    // 					this.search_by = 'near';
    // 					return this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
    // 				} else {
    // 					return this.diagnostic.isGpsLocationEnabled()
    // 						.then(enabled => {
    // 							if (!enabled) {
    // 								return this.diagnostic.switchToLocationSettings();
    // 							}
    // 						});
    // 				}
    // 			}).then(() => {
    // 			}).catch(error => {
    // 				console.error('accuracy request failure');
    // 			});
    // 	}, error => {
    // 		console.error('permission denial');
    // 		console.error(error);
    // 	});
    // });
    //if (!this.platform.is("cordova")) {
    this.search_by = "near";

    navigator.geolocation.getCurrentPosition(
      a => {
       
        if (a && a.coords && a.coords.latitude) {
          this.coords = a.coords;
          this.api
            .get(
              "beachesNearBy?latitude=" +
              a.coords.latitude +
              "&longitude=" +
              a.coords.longitude,
              {},
              {},
              true
            )
            .subscribe(r => {

              this.beach.beach_ids = r.beach_ids;
              // localStorage.setItem('beachsettings', JSON.stringify(r.beach_settings));
              this.beaches = r.beach;
            });
        }
      },
      e => {
        
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );

    return true;
  }
}
