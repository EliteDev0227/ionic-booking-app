import { Component, Input, OnInit } from '@angular/core';
import { NavController, PopoverController, NavParams, Events, Platform } from 'ionic-angular';

import { BeachPage } from "../../beach/beach";
import { ratingPage } from "../../rating/rating";
import { ApiProvider } from "../../providers/services";
import { BeachView } from "../beachView/beachView";
import { CustomBootstrap } from "../../../app/BootstrapFirstRun";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { Geolocation } from '@ionic-native/geolocation';
import { TranslateService } from '@ngx-translate/core';
import { searchDupplication } from '../searchDupplication/searchDupplication';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { SearchResultsPage } from "../../search-results/search-results";


@Component({
	selector: 'searchResult',
	templateUrl: 'searchResult.html'
})

export class searchResult implements OnInit {
	public title: string = '';
	public infiniteCount: number = 5;
	public SearchObj: any;
	direction: Array<number> = [];
	enteredGrid: boolean = false;
	SearchResult: any;
	beachSettings : any =[];
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public api: ApiProvider,
		public popoverCtrl: PopoverController,
		public configuration: CustomBootstrap,
		public iap: InAppBrowser, public translate: TranslateService,
		public events: Events, public geolocation: Geolocation, public platform: Platform,
		public launchNavigator: LaunchNavigator,
		public search: SearchResultsPage
	) {
		this.beachSettings =JSON.parse( localStorage.getItem('beachsettings') || '[]');
		this.SearchResult = [];
		this.SearchObj = [];
	}


	ngOnInit() {
	}

	next(id: string, data1: any, title: string) {
		this.setCurrencyByBeach(id);
		


		this.search.sub1$.unsubscribe();
		this.search.sub2$.unsubscribe();

		if (!this.enteredGrid) {
			this.configuration.getStorage('reserv_endDate').then(data => {
				
				let timezoneOffsetHours = new Date().getTimezoneOffset() / 60
				let alreadyEDate = data === '0' ? undefined : new Date(new Date(data).setHours(new Date(data).getHours() + timezoneOffsetHours)).getDate();
			
				let newSDate = new Date(this.SearchObj.start_date).getDate();
				let endSDate = new Date(this.SearchObj.end_date).getDate();

				this.configuration.getStorage('reservation').then(reservation => {
					let sameBeach = reservation && reservation.beach_id === id;
					if (sameBeach && alreadyEDate && (newSDate <= alreadyEDate && alreadyEDate <= endSDate)) {
						let popoverSignup = this.popoverCtrl.create(searchDupplication, { msg: this.translate.instant('DUPPLICATED_RESERVATION_DETECT') });
						popoverSignup.present();
						return;
					}
					this.SearchObj.waiter_id = this.SearchResult.waiter_id;
					this.navCtrl.push(BeachPage, { id: id, data: data1, title: this.title, title2: title, SearchObj: this.SearchObj, context: "search" });
				})
					.catch(error => {
						if (alreadyEDate && (newSDate <= alreadyEDate && alreadyEDate <= endSDate)) {
							let popoverSignup = this.popoverCtrl.create(searchDupplication, { msg: this.translate.instant('DUPPLICATED_RESERVATION_DETECT') });
							popoverSignup.present();
							return;
						}
						this.SearchObj.waiter_id = this.SearchResult.waiter_id;
						this.navCtrl.push(BeachPage, { id: id, data: data1, title: this.title, title2: title, SearchObj: this.SearchObj, context: "search" });
					})

			});

		}
		this.enteredGrid = true;
		setTimeout(() => {
			this.enteredGrid = false;
		}, 1000)


	}

	private setCurrencyByBeach(id: string) {
		let ss = this.beachSettings.find(item => {
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
				this.infiniteCount += 5;
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
		this.title = data
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
		return (data | 0);
	}

	getBeachWorkingHours(id) {
		let workingHours;
		this.beachSettings.map((beach) => {
			if (beach.beach_id === id) {
				workingHours = beach.working_hours || {};
			}
		})
		return workingHours;
	}

	getRating(rate: number, num: number): string {
		let star: string = 'beach-star-0';
		if (Math.floor(rate) >= num) {
			star = 'beach-star-100';
		} else {
			if ((num - rate) > 1) {
				star = 'beach-star-0';
			} else {
				star = `beach-star-${100 - Math.floor(((num - rate) * 100) / 25) * 25}`;
			}
		}
		return star;
	}

	beachModal(id) {
		
		let beachM = this.popoverCtrl.create(BeachView, { beach_id: id }, { cssClass: 'imgPop' });

		beachM.onDidDismiss(data => {

			this.search.getGeolocation(true);

		});
		beachM.present();
	}

	private BeachCordinates(beach_id: string) {

		for (let i in this.beachSettings) {
			if (this.beachSettings.hasOwnProperty(i)) {
				if (this.beachSettings[i] && this.beachSettings[i].beach_id == beach_id) {
					return this.beachSettings[i];
				}
			}
		}
	}

	openNavigator(beach: any, type: string) {
		let beachCord = this.BeachCordinates(beach.id);
		if (beachCord.latitude) {
			//this.api.AmBusy('');
			this.geolocation.getCurrentPosition().then(myPosition => {
				let options: LaunchNavigatorOptions = {
					start: `${myPosition.coords.latitude}, ${myPosition.coords.longitude}`,
					app: this.launchNavigator.APP.GOOGLE_MAPS,
					transportMode: type == 'walking' ? this.launchNavigator.TRANSPORT_MODE.WORKING : this.launchNavigator.TRANSPORT_MODE.DRIVING,
				};

				this.launchNavigator.navigate(`${beachCord.latitude}, ${beachCord.longitude}`, options)
					.then(
						success => {
							
							//this.api.AmBusy('',true);
						},
						error => {
						
							//this.api.AmBusy('',true);
						}
					);
			}).catch(err => {
			
				//this.api.AmBusy('',true);
			});
		}
	}

}
