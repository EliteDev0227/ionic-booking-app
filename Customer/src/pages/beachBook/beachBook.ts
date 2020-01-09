import { SelectPaymethods } from './../select-paymethods/select-paymethods';
import { Component } from "@angular/core";
import { NavController, AlertController, NavParams, Platform, PopoverController, ModalController, Tabs, App, Button } from "ionic-angular";
import { beachAgreement } from "../includes/popover/beachAgreement/beachAgreement";
import { BeachProvider } from "../providers/beachProvider";
import { ApiProvider } from "../providers/services";
import { CustomBootstrap } from "../../app/BootstrapFirstRun";
import { myReservation } from "../myReservation/myReservation";
import { BeachPage } from "../beach/beach";
import { searchDupplication } from "../includes/searchDupplication/searchDupplication";
import { TranslateService } from "@ngx-translate/core";
import { AgreementHelper } from "../providers/agreement.helper";
import moment from 'moment'
import { SignupPage } from "../signup/signup";
import { SplashScreen } from "@ionic-native/splash-screen";
import { LoginPage } from '../login/login';
import { DatePipe } from '@angular/common';
/**
 * Created by shadow-viper on 12/19/17.
 */

@Component({
	selector: 'beachBook',
	templateUrl: 'beachBook.html',
	providers: [Button, DatePipe]
})

export class beachBook {
	umbrellaData: any = null;
	umbrellaData_buff: any = null;
	payReserveMsg = "This beach is not allow to do any reservation yet, but u can take in consideration the beach status view for your referance.";
	readModel: any = [];
	title: string = '';
	index: string = '0';
	beach_settings: any = [];
	sunbed: number = 0;
	requestPage: string = 'UmbrellaBook';
	available_sunbed: number = 0;
	busy: number = 0;
	selected: number = 0;
	available: number = 0;
	oldData: any = {};
	timeInstance: any = [];
	status: { icon: number, data: any } = { icon: 0, data: [] };
	confirmState: boolean = false;
	tempSlots: Array<any> = [];
	reservationStatus: string = '';
	oldAmount: string = '';
	forceStopPooling: boolean;
	additionalSunbedPrice = 0;
	extraPrice = 0;
	sideConfigs = {
		left: ['a'],
		right: ['b'],
		center: ['m', 'n', 'o']
	};
	bookingStatus = {
		left: false,
		right: false,
		center: false
	};
	slots: any;
	zone: any;
	seat_count = 0;
	public reservationBox: boolean = false;
	private sub$1: any;
	private sub$2: any;
	public data: any;
	public singleSeat = false;

	constructor(
		private dp: DatePipe,
		private agreementHelper: AgreementHelper,
		public translate: TranslateService,
		public platform: Platform,
		public popoverCtrl: PopoverController,
		public modalCtrl: ModalController,
		public configuration: CustomBootstrap,
		public navparam: NavParams,
		public beachProvider: BeachProvider,
		public navCtrl: NavController,
		public alertCtrl : AlertController,
		public api: ApiProvider,
		public app: App,
		public splashScreen: SplashScreen,
	) {

		this.title = this.navparam.data.title;
		this.index = this.navparam.data.index;
		this.beach_settings = this.navparam.data.settings;
		this.data = this.navparam.data;


		this.additionalSunbedPrice = parseFloat(this.data.data.sunbed_price || '0');
		
		try {
			if (this.data.data.info.mapElement.list.center.length == 1) {
				this.singleSeat = true;
			}
		} catch (e) {
			this.singleSeat = false;
		}
		this.reservationStatus = (this.navparam.data.reservation && typeof this.navparam.data.reservation.status != 'undefined') ? this.navparam.data.reservation.status : '';
		this.oldAmount = (this.navparam.data.reservation && typeof this.navparam.data.reservation.amount != 'undefined') ? this.navparam.data.reservation.amount : '';

	
		if (this.navparam.data.reservation) {
		
		}

		this.elementPool(false);

		this.platform.ready().then(() => {

			this.sub$1 = this.platform.pause.subscribe(() => {

				if (this.navCtrl.getActive().name == 'beachBook') {
					// alert("stop");
					this.configuration.ClearTimeout();
				}

			}, error => { });

			this.sub$2 = this.platform.resume.subscribe(() => {

				if (this.navCtrl.getActive().name == 'beachBook') {
					// alert("start");

					setTimeout(() => {

						this.elementPool(false);

					}, 500);
				}

			}, error => { });

		}, error => { });


		// let button = document.getElementById('my-button');
		// var txt = button.textContent || button.innerText;
		//
	}

	ionViewWillLeave() {
		this.forceStopPooling = true;
		if (this.timeInstance) {
			clearTimeout(this.timeInstance)
		}
		this.configuration.ClearTimeout();
	}

	ionViewWillUnload() {
		this.sub$1.unsubscribe();
		this.sub$2.unsubscribe();
	}

	ionViewWillEnter() {
		this.forceStopPooling = false;

		
		this.configuration.setRequestPage(this.requestPage);
		this.confirmState = false;
	}

	load() {
		let status = this.status.data;
		this.sunbed = 0;
		if (this.navparam.data.reservation && this.navparam.data.reservation.seat.extra_seats) {
			this.sunbed = this.navparam.data.reservation.seat.extra_seats;
			this.title = this.navparam.data.reservation.beach;
		}
		if (status && status.seats) {
			let statusInt: Array<number> = this.statusIconArray(status.status_icon);
			if (this.status.data && this.status.data.customer) {
				statusInt = this.MakeMatch(this.status.data.customer, statusInt);
			}
			this.getBusy(statusInt);
			this.status.data.seats = statusInt.length;
			this.checkAvailability(statusInt);
			if (statusInt && statusInt.length > 2) {
				this.umbrellaData = {
					umbrella: { left: this.statusKey(statusInt[0]), right: statusInt[2] ? this.statusKey(statusInt[2]) : this.statusKey(statusInt[1]) },
					seats: { first: this.statusKey(statusInt[0]), second: this.statusKey(statusInt[1]), third: this.statusKey(statusInt[2]), fourth: this.statusKey(statusInt[3]) },
					status: this.reservationStatus
				};
			} else if (statusInt && statusInt.length <= 2) {
				this.umbrellaData = {
					umbrella: { left: this.statusKey(statusInt[0]), right: statusInt[2] ? this.statusKey(statusInt[2]) : this.statusKey(statusInt[1]) },
					seats: { first: '', second: this.statusKey(statusInt[0]), third: this.statusKey(statusInt[1]), fourth: '' },
					status: this.reservationStatus
				}
			}
			this.readModel = JSON.parse(JSON.stringify(this.umbrellaData));
			this.umbrellaData_buff = this.readModel;
			this.checkAvailabilityString();
		}
	}

	Agreement() {

	


		var beachsettingperson = this.beach_settings.umbrella['person-num']['two']['occupy-all-seats'];

		var seatscount = this.navparam.data.data.seats;

		var aslotslength = this.status.data.slots.a.length;

		var bslotslength = this.status.data.slots.b.length;




		if (beachsettingperson == false && seatscount == 4 && aslotslength == 1 && bslotslength == 1) {
			let popoverSignup = this.popoverCtrl.create(searchDupplication, { msg: this.translate.instant('CANOTSEAT') });
			popoverSignup.present();
			popoverSignup.onDidDismiss(data => {

				// this.elementPool(false);

			});
			return;
		} else {
			let agreementPopover = this.popoverCtrl.create(beachAgreement, { nav: this.navCtrl, total: this.getTotal(), search: this.navparam.data.search, location: this.navparam.data.location, data: this.status.data, title: this.title, index: this.index, settings: this.beach_settings, selected: this.selected, extra: this.sunbed }, { cssClass: 'agreementPopOver' });
			agreementPopover.present().then(() => {
			}, error => {
				console.error(error);
			});

			agreementPopover.onDidDismiss(response => {
				// this.elementPool(false);
				if (response && response.agreed) {
					this.reservationBox = true;
				}

			});
		}


	}
	public check() {
		if (this.reservationBox) {

			this.agreementHelper.navCtrl = this.navCtrl;
			this.agreementHelper.navparam = { nav: this.navCtrl, total: this.getTotal(), search: this.navparam.data.search, location: this.navparam.data.location, data: this.status.data, title: this.title,  settings: this.beach_settings, selected: this.selected, extra: this.sunbed, index: this.data.data.index, number: this.data.data.number, status: this.data.data.status,seats:this.data.data.seats ,slots: this.slots, zone: this.zone ||this.data.data.coords.zone };

		}
	}

	public completeReservation() {
		let warning = false;
		let slots = this.slots;
		let slotNames = Object.keys(slots);
		let selectedSlots = 0;
		let fullySelected = 0;
		console.log("extra",this.sunbed);
		slotNames.map((slotName) => {
			let count = eval([0].concat(slots[slotName]).join("+"));
			if (count) {
				selectedSlots++;
				if (count >= slots[slotName].length) {
					fullySelected++;
				}
			}
		});
		if(selectedSlots>1 && !fullySelected) {
			var beachsettingperson = this.beach_settings.umbrella['person-num']['two']['occupy-all-seats'];
			if(!beachsettingperson) {
				warning = true;
			}
		}

		if (warning) {
			let alert = this.alertCtrl.create({
				subTitle: this.translate.instant('CANOTSEAT'),
				buttons: ['Ok']
			});
			alert.present();
			return false;
		}
		this.agreementHelper.setup();
	}


	public canReserve() {
		return this.agreementHelper.canMakeReservation() && this.reservationBox;
	}


	getBusy(data: Array<number>) {
		for (let i in data) {
			if (data[i] == 2) {
				this.busy += 1;
			}
		}
	}




	UpdateData(event) {
		
		this.zone = event.zone || '';
		this.bookingStatus = event.bookingStatus;
		let available = 0, selected = 0;
		let status = this.data.data.status;
		let sides = [];
		let slots = {};
		try {

			sides = Object.keys(status);
		} catch (e) {
			console.error(e);
		}
		let findSide = function (side) {
			let configSide = '';
			let configSides = Object.keys(this.sideConfigs);
			for (let j = 0; j < configSides.length; j++) {
				if (this.sideConfigs[configSides[j]].indexOf(side) > -1) {
					configSide = configSides[j];
					break;
				}
			}
			return configSide;
		}.bind(this);
		for (let i = 0; i < sides.length; i++) {
			let side = sides[i],
				list = status[side],
				configSide = findSide(side);
			if (!slots[side]) {
				slots[side] = [];
			}
			for (let j = 0; j < list.length; j++) {
				let li = list[j];
				if (!this.bookingStatus[configSide] && li === 'available') {
					available++;
					slots[side].push(0);
				} else if (li === 'selected') {
					selected++;
					slots[side].push(1);
				} else {
					slots[side].push(0);
				}
			}
			if(this.bookingStatus[configSide]) {
				slots[side] = [];		
			}
		}
		if (available) {
			this.sunbed = 0;
		}
		this.available = available;
		this.selected = selected;
		this.slots = slots;
		return;

		/* if (event && event.umbrella) {
			this.sunbed = 0;
			this.umbrellaData = event;
			this.checkAvailabilityString();

			let newStr = JSON.stringify(this.umbrellaData);
			let oriStr = JSON.stringify(this.umbrellaData_buff);
			if (oriStr == newStr)
				this.confirmState = false;
			else
				this.confirmState = true;

		} */
	}

	onChangeExtra(extra: number) {

		console.warn('extra sunbed');
		console.warn(extra);
		if (this.sunbed != extra) {
			this.sunbed = extra;
		} else {
			this.sunbed = 0;
		}

		if (this.navparam.data.reservation && (this.sunbed != this.navparam.data.reservation.seat.extra_seats))
			this.confirmState = true;
		else
			this.confirmState = false;
	}

	private statusIconArray(status: string): Array<any> {

		return (!status) ? [] : status.replace('.png', '').split('');
	}

	statusKey(key: number) {
		if (key == 1) return 'free';
		else if (key == 2) return 'busy';
		else if (key == 3) return 'selected';
		else return '';
	}

	checkAvailability(statusIcon: Array<number>) {
		let count = 0;
		for (let i in statusIcon) {
			if (statusIcon[i] == 1 || statusIcon[i] == 3) {
				count++;
			}
		}
		this.status.icon = count;
	}


	checkAvailabilityString() {
		if (this.umbrellaData && this.umbrellaData.seats) {
			this.selected = 0;
			let check = { a: 0, b: 0 };
			let slots = { a: [], b: [] };
			for (let i in this.umbrellaData.seats) {
				if (this.umbrellaData.seats.hasOwnProperty(i) && this.umbrellaData.seats[i] == 'selected' && (this.readModel.seats[i] != this.umbrellaData.seats[i] || this.navparam.data.change)) {
					if (i == 'first' || i == 'second') {
						if (i == 'first') { slots.a[0] = 0; }
						if (i == 'second') {
							if (slots.a[0] !== 0) {
								if (this.umbrellaData.seats.first == '') {
									slots.a[0] = 0;
								} else {
									slots.a[0] = 1
								}
							} else {
								slots.a[1] = 1;
							}
						}
						check.a = 1;
					} else if (i == 'third' || i == 'fourth') {
						check.b = 1;
						if (i == 'third') { slots.b[0] = 0; }
						if (i == 'fourth') {
							if (slots.b[0] !== 0) {
								slots.b[0] = 1;
							} else {
								slots.b[1] = 1;
							}
						}
					}
					if (check.a == 1 && check.b == 1) { this.status.data.section = 'A&B' } else if (check.a == 1) { this.status.data.section = 'A' } else if (check.b == 1) { this.status.data.section = 'B' }
					this.selected += 1;
				}
			}

			this.status.data.slots = slots;

		}
	}


	getPrice() {
		if (this.beach_settings && this.status && this.status.data && this.status.data.type) {
			return (this.beachProvider.getPrice(this.beach_settings, this.status.data.type, this.navparam.data.location, this.navparam.data.pool)) * (this.beachProvider.getPeriod(this.navparam.data.pool)) // || 0
		}
		return 0
	}

	getAdditionalPrice() {
		if (typeof this.additionalSunbedPrice !== 'undefined') {
			return this.additionalSunbedPrice;
		}
		if (typeof this.status.data.sunbeds == 'undefined') {
			return 0;
		}
		return this.status.data.sunbeds.price;
	}

	getTotal() {
		if (this.navparam.data.reservation && this.navparam.data.reservation.status == "active") {
			let temp = 0;
			return temp;

		} else {
			var eventStartTime = this.navparam.data.pool.start_date;
			var eventEndTime = this.navparam.data.pool.end_date;

			var days = moment(new Date(eventEndTime)).diff(new Date(eventStartTime), 'day') + 1;

			let aditional = (this.available) ? 0 : this.getAdditionalPrice() * this.sunbed;

			if (days == 0) {
				//let temp = this.status.data.price * ((this.selected * 1) + (this.sunbed | 0));
				let temp = ((parseFloat(this.status.data.price) * this.selected) + aditional);
				if (this.reservationStatus == 'active') {
					if (temp > parseInt(this.oldAmount)) {
						return temp - parseInt(this.oldAmount);
					} else {
						return 0;
					}
				} else {
					return temp;
				}

			} else {
				//let temp = this.status.data.price * ((this.selected * 1) + (this.sunbed | 0));
				let temp = ((parseFloat(this.status.data.price) * this.selected) + aditional) * days;
				if (this.reservationStatus == 'active') {
					if (temp > parseInt(this.oldAmount)) {
						return temp - parseInt(this.oldAmount);
					} else {
						return 0;
					}
				} else {
					return temp;
				}
			}
		}
	}

	getExtraSunbedArr() {
		return Array.from(new Array(this.avail_sunbed()), (val, index) => index + 1)
	}

	changePosition() {
		let posOption = {
			beach_ids: this.navparam.data.pool.beach_ids,
			customer_id: this.navparam.data.pool.customer_id,
			seat_type: this.navparam.data.pool.seat_type,
			seat_zone: ['front', 'middle', 'back'],
			refresh: true,
			excluded_days: this.navparam.data.reservation.released_days,
			start_date: this.navparam.data.pool.start_date,
			end_date: this.navparam.data.pool.end_date
		};
		this.navCtrl.push(BeachPage, { change: true, SearchObj: posOption, title2: this.title, id: this.navparam.data.reservation.beach_id, reservation: this.navparam.data.reservation, context: "search" });
	}

	confirmChange() {
		let optionConfirm = {
			id: this.navparam.data.reservation.id,
			seat: {
				type: this.navparam.data.pool.seat_type,
				zone: this.navparam.data.location,//this.navparam.data.reservation.seat.zone,
				number: this.index,
				slots: this.navparam.data.reservation.seat.slots,
				new_slots: this.status.data.slots,
				extra_seats: this.sunbed,
				position: { x: this.navparam.data.pool.seat_position.x, y: this.navparam.data.pool.seat_position.y }
			},
			amount: this.getTotal(),
			old_amount: this.oldAmount
		};
		// if(this.reservationStatus != 'booked') 
		//   optionConfirm['old_amount'] = this.oldAmount;
		/*start_date:this.navparam.data.pool.start_date,
		  end_date:this.navparam.data.pool.end_date,*/
		//this.getPrice()*(this.selected + ((this.sunbed && this.sunbed>0)?this.sunbed:0)),
		this.api.post('booking/update', optionConfirm, {}).subscribe(r => {
			this.api.AmError(this.configuration.translate.translate.instant('DONE'), this.configuration.translate.translate.instant('RESERVATION_CHANGED_SUCCESSFULLY'), [{
				text: this.configuration.translate.translate.instant('PROCEED'), handler: () => {
					this.navCtrl.setRoot(myReservation);
				}
			}])
		}, error => {

		})
	}

	elementPool(skipFirst?: boolean) {


		if (this.navparam.data.pool) {
			if (!skipFirst) {
				
				this.element(false);
			}

			this.configuration.ClearTimeout()
			if (this.timeInstance) {
				clearTimeout(this.timeInstance)
			}
			return false;
			// Pooling Stopped 

			/* this.timeInstance = setTimeout(() => {
			
				this.element(true);
				this.elementPool(true);
				this.configuration.setTimeout(this.timeInstance)
			}, 5000);
*/
		}
	}

	private avail_sunbed() {
		if (this.beach_settings && this.beach_settings.seats && this.status.data.sunbeds) {
			if (parseInt(this.beach_settings.seats.extra) > parseInt(this.status.data.sunbeds.count)) {
				return parseInt(this.status.data.sunbeds.count)
			} else {
				return parseInt(this.beach_settings.seats.extra)
			}
		}
		else if (!this.status.data.sunbeds) {
			return parseInt(this.beach_settings.seats.extra)
		}
		return 0;
	}

	private element(showLoader: boolean) {

		

		let searchParams = JSON.parse(JSON.stringify(this.navparam.data.pool));
		searchParams.start_date_formatted = this.dp.transform(new Date(searchParams.start_date), "yyyy-MM-dd");
		searchParams.end_date_formatted = this.dp.transform(new Date(searchParams.end_date), "yyyy-MM-dd");
		searchParams.start_date = this.getLocalDateTime(searchParams.start_date);
		searchParams.end_date = this.getLocalDateTime(searchParams.end_date);
		searchParams.owned = true;
		this.api.post('search', searchParams, {}, showLoader).subscribe(r => {
			 
			if (r && r.length) {
				if (!showLoader) {
					
					this.status.data = r[0];
					this.oldData = r[0];
					console.log("con",this.status.data);
					this.load();
				} else {
				
					this.status.data.status_icon = r[0].status_icon;
					this.status.data.sunbeds = r[0].sunbeds;
				}
			} else {
				this.status.data.price = 0;
			}
		}, error => { });
		return;
		/*
		
		let params = {
			beach_id: searchParams.beach_ids[0],
			date: searchParams.start_date,
			x: searchParams.seat_position.x,
			y: searchParams.seat_position.y
		};
				this.api.get('grid/' + params.beach_id + '/seat', params, {}, showLoader).subscribe(r => {
					
					
				}, error => { 
					console.error(error);
		
					
				}); */

	}

	getLocalDateTime(date: number) {
		let dateObj = new Date(date);
		let hoursWithTimezone = dateObj.getHours() + ((-1) * (dateObj.getTimezoneOffset() / 60))

		return new Date(new Date(date).setHours(hoursWithTimezone)).getTime();
	}

	private MatchCustomer(currentStatus: Array<number>, customer: Array<any>, index: any) {
		for (let i = currentStatus.length - 1; i >= 0; --i) {
			if (customer && customer[i]) {
				let customer_status: Array<number> = this.statusIconArray(customer[i].status_icon);
				if (customer_status[index] == 3 && customer[i].id == this.navparam.data.pool.customer_id) {
					return customer_status[index]
				}

			}

		}

		return currentStatus[index];
	}

	private MakeMatch(customer: any, statusArr: Array<number>) {
		for (let i in statusArr) {
			statusArr[i] = this.MatchCustomer(statusArr, customer, i);
		}
		return statusArr;
	}

	isPayAvailable() {

	}

	isReserveAvailable() {
		let self = this;

		return self.beach_settings && self.beach_settings.booking_time_limit && self.beach_settings.booking_time_limit > 0 && self.beach_settings.booking_time_limit != '0';
	}

	onPay() {
	
		this.configuration.getStorage('login').then((a) => {
			if (a && a.token) {

				// TODO:// Change message accordingly
				// if (a.guest) {
				// 	let popoverSignup = this.popoverCtrl.create(searchDupplication, { msg: this.translate.instant('BOOKING_PERMISSION') });
				// 	popoverSignup.present();
				// 	return false;
				// }else 
				if (a.tour) {
					let popoverSignup = this.popoverCtrl.create(searchDupplication, {
						msg: this.translate.instant('BOOKING_PERMISSION'),
						redirect: true
					});
					popoverSignup.present();


					return false;
				}

				let url = `loiality-points/${a.id}/${this.beach_settings.id}`;
				this.api.get(url, {}, {}).subscribe(res => {
					if (res && res.points && res.points != '0') {
						this.modalCtrl.create(SelectPaymethods, { nav: this.navCtrl, 'total': this.getTotal(), 'points': res['points'], 'isCard': this.beach_settings.card, search: this.navparam.data.search, location: this.navparam.data.location, data: this.status.data, title: this.title, index: this.index, settings: this.beach_settings, selected: this.selected, extra: this.sunbed }, {}).present();
					} else {
						if (this.beach_settings.card == false) {
							this.translate.get("YOU_HAVE_NOT_LOYALITY", { beachName: this.beach_settings.name }).subscribe((res: string) => {
								this.api.showInfo(res);
							});
							// this.api.AmBusy(`${this.beach_settings.name} don't agree to pay the reservation with credit card, also you have not Loiality points on this beach.`,false);
						} else {
							this.modalCtrl.create(SelectPaymethods, { nav: this.navCtrl, 'total': this.getTotal(), 'points': 0, 'isCard': this.beach_settings.card, search: this.navparam.data.search, location: this.navparam.data.location, data: this.status.data, title: this.title, index: this.index, settings: this.beach_settings, selected: this.selected, extra: this.sunbed }, {}).present();
						}
					}
				});
			}
		}, error => { });
	}

}
