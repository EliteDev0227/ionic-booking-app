import { Component, OnInit, ViewChild } from "@angular/core";
import { DatePipe } from "@angular/common";
import { FilterPopoverPage } from "./filter-popover/filter-popover";
import { Events, NavParams, Platform, PopoverController, NavController, Navbar, ViewController, LoadingController } from "ionic-angular";
import { ApiProvider } from "../providers/services";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { CustomBootstrap } from "../../app/BootstrapFirstRun";
import { environment } from '../../environment/environment';
@Component({
	selector: 'page-search-results',
	templateUrl: 'search-results.html',
	providers: [DatePipe]
})
export class SearchResultsPage implements OnInit {

	@ViewChild(Navbar) navBar: Navbar;

	SearchInput: any;
	SearchFilterSubject: any;
	dataFilter: any;
	SearchResult: any;
	Result: any = [];
	count: number = 0;
	title: string;
	beach_settings:any = [];
	customer: any = {};
	timeoutInstance: any = [];
	requestPage: string = 'SearchResultsPage';
	isPolling: boolean = true;
	public sub1$: any;
	public sub2$: any;
	public loading: any;
	public noResponse: boolean = false;
	filters: any = [];
	search_by: string = '';
	imgPath = environment.base + "uploads/";
	private removePooling: boolean = false;
	constructor(private dp: DatePipe, public loadingCtrl: LoadingController, public platform: Platform, public navCtrl: NavController, public viewCtrl: ViewController, public popoverCtrl: PopoverController, public navParam: NavParams, public api: ApiProvider, public events: Events, public configuration: CustomBootstrap) {

		this.search_by = this.navParam.get('search_by');
		let order = this.search_by == 'near' ? 'distance' : '';

		this.dataFilter = { filter: '', order: order };
		

		this.SearchFilterSubject = new BehaviorSubject({ filter: [], order: order });
		this.beach_settings =JSON.parse( localStorage.getItem('beachsettings') || '[]');
		this.showFilters();
	}

	ngOnInit() {
		localStorage.setItem("grid_image_cache", "" + new Date().getTime());
		this.viewCtrl.willEnter.subscribe(r => {
			this.noResponse = false;

			this.loading = this.loadingCtrl.create({

				spinner: 'dots',
				content: ''

			});

			this.loading.present();

		});
	}

	ionViewDidLoad() {
		this.navBar.backButtonClick = (e: UIEvent) => {

			this.configuration.ClearTimeout();
			// this.getGeolocation(false);
			this.viewCtrl.dismiss();
		}
	}

	ionViewWillEnter() {
		this.removePooling = false;

		this.ClearSelection();
		this.SearchInput = this.navParam.get('searchlist');
		delete this.SearchInput.person_num;
		this.title = this.navParam.get('title');
		this.SearchResult = [];

		if (this.search_by != "near") {
			this.setCurrencyByBeach(this.SearchInput.beach_ids[0]);
		}

		this.configuration.getStorage('login').then((data: any) => {

			if (data && data.id) {
			
				this.customer = data;
			
				this.getGeolocation(true);
				// this.Search(false);
			}
		}, (error: any) => { });

	


		this.platform.ready().then(() => {

			this.sub1$ = this.platform.pause.subscribe(() => {

				if (this.navCtrl.getActive().name == 'SearchResultsPage') {
					// alert("search-pause");
					this.getGeolocation(false);
				}

			});

			this.sub2$ = this.platform.resume.subscribe(() => {

				if (this.navCtrl.getActive().name == 'SearchResultsPage') {
					// alert("searh-resume");
					this.getGeolocation(true);
				}

			});

		}, error => { });

		this.configuration.setRequestPage(this.requestPage);

	}

	ionViewWillUnload() {
		// alert("search ion view Unload");
		this.removePooling = true;
		this.configuration.ClearTimeout();
		this.sub1$.unsubscribe();
		this.sub2$.unsubscribe();
	}

	ionViewWillLeave() {
		// alert("search ion view Unload");
		this.removePooling = true;
		this.configuration.ClearTimeout();
		this.sub1$.unsubscribe();
		this.sub2$.unsubscribe();
	}

	private setCurrencyByBeach(id: string) {
		let ss = this.beach_settings.find(item => {
			return item.beach_id == id;
		});
		this.configuration.currency = ss.currency;
	}

	public getGeolocation = (flag) => {

		let timeout;


		if (this.removePooling) {
			return;
		}
		if (flag == true) {
			if (!this.isPolling) return;
			
			// if (this.configuration.hasLocationAccess) {
			navigator.geolocation.getCurrentPosition((a) => {
				
				if (a && a.coords && a.coords.latitude) {
			
					this.SearchInput.latitude = Number(a.coords.latitude);
					this.SearchInput.longitude = Number(a.coords.longitude);
					this.Search(true);
					this.configuration.ClearTimeout();
					// timeout = setTimeout(() => { this.getGeolocation(true); }, 15000);
					this.configuration.setTimeout(timeout);
				} else {
					delete this.SearchInput.latitude;
					delete this.SearchInput.longitude;
					this.Search(true);
					this.configuration.ClearTimeout();
					//  timeout = setTimeout(() => { this.getGeolocation(true); }, 15000);
					this.configuration.setTimeout(timeout);
				}
			}, (e) => {

				delete this.SearchInput.latitude;
				delete this.SearchInput.longitude;
				this.Search(true);
				this.configuration.ClearTimeout();
				// timeout = setTimeout(() => { this.getGeolocation(true); }, 15000);
				this.configuration.setTimeout(timeout);
			}, { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 })
		}
		else {
			delete this.SearchInput.latitude
			delete this.SearchInput.longitude
			this.Search(true);
			this.configuration.ClearTimeout();
			// timeout = setTimeout(() => { this.getGeolocation(true); }, 15000);
			this.configuration.setTimeout(timeout);
		}
		// } else {
		//   this.configuration.ClearTimeout();
		//   clearTimeout(timeout);
		// }

	};
	setUpdatedOn(beach_id, updated_on) {
		let timestampObj = JSON.parse(localStorage.getItem('updated_on') || "{}");
		if (timestampObj[beach_id] && timestampObj[beach_id] == updated_on) {
			return false;
		}
		timestampObj[beach_id] = updated_on;
		localStorage.setItem('updated_on', JSON.stringify(timestampObj));
		return true;
	}
	getImageList(beach) {
		let cache = "?s=gridImage" + localStorage.getItem("grid_image_cache");
		let grid = beach.grid;
		let beach_id = beach.id;
		let imgList = [];
		let staticList = [];
		let zones = ['front', 'middle', 'back'];
		zones.map((zone) => {
			let list = grid[zone];
			list.map((li) => {
				if (li.type == 'static') {
					if (staticList.indexOf(li.image) == -1) {
						staticList.push(li.image);
						new Image().src = li.image + cache;
					}
				} else {
					if (imgList.indexOf(li.image) == -1) {
						imgList.push(li.image);
						new Image().src = this.imgPath + beach_id + '/elements/' + li.image + cache;
					}
				}
			});
		});
	
	}

	loadImages(list: any[]) {
		// let cache: any = Math.random();
		// localStorage.setItem("grid_image_cache", '' + cache);
		let cache = localStorage.getItem("grid_image_cache");
		cache = "?s=gridImage" + cache;
		for (let i = 0; i < list.length; i++) {
			const li = list[i].grid_images,
				beach_id = list[i].id,
				imgList = li.dynamic;
			this.getImageList(list[i]);
			/*if (true || this.setUpdatedOn(list[i].id, list[i].updated_at)) {
				for (let j = 0; j < imgList.length; j++) {
					let imgSrc = imgList[j];
					new Image().src = this.imgPath + beach_id + '/elements/' + imgSrc + cache;
				}
			}*/

		}
	}

	isOpenow(beach){
		let open = true;

	}
	private Search(stopProgress: boolean) {

	
		// alert("search progress");
		if (this.SearchInput.start_date) {
			this.SearchInput.customer_id = this.customer.id;
			this.SearchInput.refresh = false;

		

			// let newTimeRange: { start_date: any, end_date: any } = this.timeUpdate(this.SearchInput.start_date, this.SearchInput.end_date)
			// this.SearchInput.start_date = newTimeRange.start_date;
			// this.SearchInput.end_date = newTimeRange.end_date;
			this.SearchInput.search_date = new Date((new Date().setHours(12,0,0))).getTime();
			let searchParams = JSON.parse(JSON.stringify(this.SearchInput));
			let searchParamCopy = Object.assign({}, searchParams);
			searchParams.search_date =searchParams.search_date; // this.getLocalDateTime(searchParams.search_date)
			//searchParams.start_date = searchParams.start_date;
			searchParams.start_date_formatted = this.dp.transform(new Date(searchParams.start_date), "yyyy-MM-dd");
			searchParams.end_date_formatted = this.dp.transform(new Date(searchParams.end_date), "yyyy-MM-dd");
			searchParams.end_date = searchParams.end_date;
			searchParams.start_date = new Date((new Date(searchParams.start_date).setHours(12,0,0))).getTime(); //this.getLocalDateTime(searchParams.start_date);

			//searchParams.end_date =  this.getLocalDateTime(searchParams.end_date)
			var d =new Date();
			let startTime = d.getTime();
			var today  = this.dp.transform(new Date(), "yyyy-MM-dd");
			
			searchParams.isToday =(today == searchParams.start_date_formatted)?true:false;

			

			this.api.post('search', searchParams, {}, stopProgress).subscribe(r => {
			
				if (r && r.length) {
					
					this.SearchResult = r;
					this.loadImages(r);
					this.count = 0;
					let date = new Date();
					
					let endTime = date.getTime();
					let diff = endTime - startTime;
				//	alert('Response TIme:'+ diff)
				} else {
					this.configuration.ClearTimeout();
				}
			}, error => {
				this.count = 0;
			}).add(r => {
				this.loading.dismiss();
				this.noResponse = true;
			})
		}
	}

	getLocalDateTime(date: number) {
		let dateObj = new Date(date);
		let hoursWithTimezone = dateObj.getHours() + ((-1) * (dateObj.getTimezoneOffset() / 60))

		return new Date(new Date(date).setHours(hoursWithTimezone)).getTime();
	}

	timeUpdate(start_date, end_date): { start_date: any, end_date: any } {
		let now = new Date();

		if (start_date && end_date && new Date(start_date).getDate() === now.getDate()) {
			start_date = now.getTime();
			if (start_date >= end_date) {
				let newEndDate = new Date(end_date)
				end_date = new Date(newEndDate.setDate(newEndDate.getDate() + 1)).getTime();
			}
		}
		else {
			start_date = start_date || now.getTime();
			end_date = end_date || new Date(new Date(now).setHours(23, 59, 59)).getTime();
		}

		return { start_date, end_date }
	}

	showFilter() {
		

		let popover = this.popoverCtrl.create(FilterPopoverPage, {
			subject: this.SearchFilterSubject,
			result: this.SearchResult,
			search_by: this.search_by
		}, { cssClass: 'filterPopOver' });
		popover.present().then(() => {
			this.SearchFilterSubject.subscribe((data: { filter: string, order: string }) => {
				if ((data && data.filter) || (data && data.order)) {
					
					this.dataFilter = data;

					this.showFilters();
				}
			})
		});
		popover.onDidDismiss(() => {
			this.getGeolocation(true);
		})
	}

	removeFilter(filter: any) {

		this.filters = this.filters.filter(item => {
			if (item && item != filter) {
				return item;
			}
		});

		//Refresh search
	

		var active = false;
		for (var i = 0; i < this.dataFilter.filter.length; i++) {
			active = false;
			for (var j = 0; j < this.filters.length; j++) {
				if (this.dataFilter.filter[i] == this.filters[j]) {
					active = true;
				}
			}

			if (!active) {
				this.dataFilter.filter[i] = "";
			}
		}

		// Save back to session
		this.configuration.getStorage('Filters').then(r => {
			this.configuration.setStorage('Filters', {
				filterMock: {
					filter: this.dataFilter.filter,
					sort: r.filterMock.sort
				},
				filters: {
					filter: this.dataFilter.filter,
					order: r.filters.order
				}
			});
		});

	}

	showFilters() {
		this.configuration.getStorage('Filters').then(r => {
			if (r && r.filterMock) {
				this.filters = r.filterMock.filter.filter(item => {
					if (item) {
						return item;
					}
				});
			}
			else {
				this.filters = [];
			}
		});
	}

	ClearSelection() {
		this.configuration.removeKeys('Filters');
		this.filters = [];

		let order = this.search_by == 'near' ? 'distance' : '';
		this.dataFilter = { filter: '', order: order };
	}
}
