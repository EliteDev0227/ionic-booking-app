import { SelectPaymethods } from './../select-paymethods/select-paymethods';
import { ApiProvider } from './../providers/services';
import { Component } from "@angular/core";
import { NavController, NavParams, PopoverController, ModalController, Platform } from "ionic-angular";
import { beachAgreement } from "../includes/popover/beachAgreement/beachAgreement";
import { BeachProvider } from "../providers/beachProvider";
import { CustomBootstrap } from "../../app/BootstrapFirstRun";
import { BeachPage } from "../beach/beach";
import { TranslateService } from "@ngx-translate/core";
import { AgreementHelper } from "../providers/agreement.helper";
import { searchDupplication } from '../includes/searchDupplication/searchDupplication';
/**
 * Created by shadow-viper on 12/19/17.
 */

@Component({
	selector: 'beachBookBaldaquin',
	templateUrl: 'beachBookBaldaquin.html'
})

export class beachBookBaldaquin {
	title: string = '';
	beach_settings: any = [];
	index: string = '0';
	requestPage: string = 'BaldaquinBook';
	//status: any = [];
	status: { icon: number, data: any } = { icon: 0, data: [] };
	reservationStatus: string = '';
	payReserveMsg = "this beach is not allow to do any reservation yet, but u can take in consideration the beach status view for your referance";
	reservationBox: boolean = false;
	sunbed: number = 0;
	available_sunbed: number = 0;
	confirmState: boolean = false;
	oldData: any = {};
	timeInstance: any = [];
	data: any;
	item: any;
	itemClass: any;
	slots: any;
	zone:any;
	private sub$1: any;
	private sub$2: any;
	additionalSunbedPrice = 0;
	constructor(
		private agreementHelper: AgreementHelper,
		public configuration: CustomBootstrap,
		public translate: TranslateService,
		private api: ApiProvider,
		public modalCtrl: ModalController,
		public popoverCtrl: PopoverController,
		public navparam: NavParams,
		public platform: Platform,
		public beachProvider: BeachProvider,
		public navCtrl: NavController
	) {
		
		
		this.title = this.navparam.data.title;
		this.beach_settings = this.navparam.data.settings;
		this.reservationStatus = this.navparam.data.status;
		this.index = this.navparam.data.index;
		this.data = this.navparam.data;
		this.item = this.data.data;

		this.itemClass = this.item.image.substr(0,3);

		this.additionalSunbedPrice = parseFloat(this.data.data.sunbed_price || '0');
		
		this.UpdateData();
		//this.status = this.navparam.data.data;

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
	}


	UpdateData() {

		
		let slots = {};
		let seats = Object.keys(this.item.status);
		for(let i = 0; i<seats.length; i++) {
			slots[seats[i]] = [1];
		}
		this.slots = slots;
		this.zone = this.item.coords.zone;
		/* this.zone = event.zone || '';
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
		
		return;

		*/
	}
	Agreement() {
		let agreementPopover = this.popoverCtrl.create(beachAgreement, {
			nav: this.navCtrl,
			total: this.getPrice(),
			location: this.navparam.data.location,
			data: this.status,
			title: this.title,
			index: this.index,
			settings: this.beach_settings,
			selected: 1,
			extra: this.sunbed,
			search: this.navparam.data.search
		}, { cssClass: 'agreementPopOver' });
		agreementPopover.present().then((response) => {

		}, error => {
			console.error(error);
		});

		agreementPopover.onDidDismiss((response) => {
			if (response && response.agreed) {
				this.reservationBox = true;
			}
		})
	}

	public check() {
		if (this.reservationBox) {
			this.agreementHelper.navCtrl = this.navCtrl;
			this.agreementHelper.navparam = { nav: this.navCtrl, total: this.getPrice(), location: this.navparam.data.location, data: this.status, title: this.title, index: this.navparam.data.data.index, number:this.navparam.data.data.number, settings: this.beach_settings, selected: 1,seats:this.data.data.seats, extra: this.sunbed, search: this.navparam.data.search , slots: this.slots, zone: this.zone};
		
		}
	}

	public completeReservation() {
		this.agreementHelper.setup();
	}

	public canReserve() {
		return this.agreementHelper.canMakeReservation() && this.reservationBox;
	}

	ionViewWillEnter() {
	
		this.configuration.setRequestPage(this.requestPage);
	}

	getPrice() {
		// return this.beachProvider.getPrice(this.beach_settings, this.status.type, this.navparam.data.location, this.navparam.data.pool) || 0
		return this.status.data.price || 0;
	}

	getAdditionalPrice() {
		if(typeof this.additionalSunbedPrice !== 'undefined') {
			return this.additionalSunbedPrice;
		}
		if (typeof this.status.data.sunbeds == 'undefined') {
			return 0;
		}
		return this.status.data.sunbeds.price;
	}

	getTotalPrice() {
		var eventStartTime = this.navparam.data.pool.start_date;
		var eventEndTime = this.navparam.data.pool.end_date;

		var days = Math.floor(Math.abs((new Date(eventEndTime)).getTime() - (new Date(eventStartTime)).getTime()) / 36e5 / 24) ? (Math.floor(Math.abs((new Date(eventEndTime)).getTime() - (new Date(eventStartTime)).getTime()) / 36e5 / 24)) + 1 : 1;
		//var total = this.getPrice() * days;?

		let aditional = this.getAdditionalPrice() * this.sunbed;
		let total = (parseFloat(this.status.data.price) + aditional) * days;

		// var sunbed_price = this.beachProvider.getPrice(this.beach_settings, 'sunbed', this.navparam.data.location, this.navparam.data.pool) || 0
		// total = total + (sunbed_price * this.sunbed);

		return total;
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
		// let optionConfirm={
		//     id:this.navparam.data.reservation.id,
		//     seat:{
		//         type:this.navparam.data.pool.seat_type,
		//         zone:this.navparam.data.location,//this.navparam.data.reservation.seat.zone,
		//         number:this.index,
		//         slots:this.navparam.data.reservation.seat.slots,
		//         new_slots:this.status.data.slots,
		//         extra_seats:this.sunbed,
		//         position:{x:this.navparam.data.pool.seat_position.x,y:this.navparam.data.pool.seat_position.y}
		//     },
		//     amount:this.getTotal(),
		//     old_amount:this.oldAmount
		// };
		// // if(this.reservationStatus != 'booked')
		// //   optionConfirm['old_amount'] = this.oldAmount;
		// /*start_date:this.navparam.data.pool.start_date,
		//   end_date:this.navparam.data.pool.end_date,*/
		// //this.getPrice()*(this.selected + ((this.sunbed && this.sunbed>0)?this.sunbed:0)),
		// this.api.post('booking/update',optionConfirm,{}).subscribe(r=>{
		//     this.api.AmError(this.configuration.translate.translate.instant('DONE'),this.configuration.translate.translate.instant('RESERVATION_CHANGED_SUCCESSFULLY'),[{text:this.configuration.translate.translate.instant('PROCEED'),handler:()=>{
		//             this.navCtrl.setRoot(myReservation);
		//         }}])
		// },error=>{
		//
		// })
	}


	isReserveAvailable() {
		let self = this;

		return self.beach_settings && self.beach_settings.booking_time_limit && self.beach_settings.booking_time_limit > 0 && self.beach_settings.booking_time_limit != '0';
	}

	onPay() {
	
		this.configuration.getStorage('login').then((a) => {
			if (a && a.token) {
				// TODO:// Change message accordingly
				// if (a.guest || a.tour) {
				// 	let popoverSignup = this.popoverCtrl.create(searchDupplication, { msg: this.translate.instant('GUEST_PERMISSION') });
				// 	popoverSignup.present();
				// 	return false;
				// }

				// TODO:// Change message accordingly
				if (a.guest) {
					let popoverSignup = this.popoverCtrl.create(searchDupplication, { msg: this.translate.instant('BOOKING_PERMISSION') });
					popoverSignup.present();
					return false;
				}else if(a.tour){
					let popoverSignup = this.popoverCtrl.create(searchDupplication, { msg: this.translate.instant('BOOKING_PERMISSION'),
					redirect : true});
					popoverSignup.present();

					// popoverSignup.onDidDismiss(data => {
					// 	 this.configuration.clearStorage().then(() => {
					// //this.splashScreen.show();
					//    this.app.getRootNav().setRoot(LoginPage);
					//  });
					// });
					
					return false;
				}

				let url = `loiality-points/${a.id}/${this.beach_settings.id}`;
				this.api.get(url, {}, {}).subscribe(res => {
					if (res && res.points && res.points != '0') {
						this.modalCtrl.create(SelectPaymethods, { nav: this.navCtrl, 'total': this.getTotalPrice(), 'points': res['points'], 'isCard': this.beach_settings.card, search: this.navparam.data.search, location: this.navparam.data.location, data: this.status.data, title: this.title, index: this.index, settings: this.beach_settings, selected: 1, extra: 0 }, {}).present();
					} else {
						if (this.beach_settings.card == false) {
							this.translate.get("YOU_HAVE_NOT_LOYALITY", { beachName: this.beach_settings.name }).subscribe((res: string) => {
								this.api.showInfo(res);
							});
						} else {
							this.modalCtrl.create(SelectPaymethods, { nav: this.navCtrl, 'total': this.getTotalPrice(), 'points': 0, 'isCard': this.beach_settings.card, search: this.navparam.data.search, location: this.navparam.data.location, data: this.status.data, title: this.title, index: this.index, settings: this.beach_settings, selected: 1, extra: 0 }, {}).present();
						}
					}
				});
			}
		}, error => { });
	}

	getExtraSunbedArr() {
		return Array.from(new Array(this.avail_sunbed()), (val, index) => index + 1)
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

	elementPool(skipFirst?: boolean) {

	

		if (this.navparam.data.pool) {
			if (!skipFirst) {
				
				this.element(false);
			}

			this.configuration.ClearTimeout()
			if (this.timeInstance) {
				clearTimeout(this.timeInstance)
			}
			/*this.timeInstance = setTimeout(() => {
				
				this.element(true);
				this.elementPool(true);
				this.configuration.setTimeout(this.timeInstance)
			}, 5000);*/
		}
	}

	private element(showLoader: boolean) {



		let searchParams = JSON.parse(JSON.stringify(this.navparam.data.pool));
		searchParams.start_date = this.getLocalDateTime(searchParams.start_date);
		searchParams.end_date = this.getLocalDateTime(searchParams.end_date);

		this.api.post('search', searchParams, {}, showLoader).subscribe(r => {
			if (r && r.length) {
				if (!showLoader) {
					this.status.data = r[0];
					this.oldData = r[0];
				} else {
					
					this.status.data.status_icon = r[0].status_icon;
					this.status.data.sunbeds = r[0].sunbeds;
				}
			}
		}, error => { })
	}

	getLocalDateTime(date: number) {
		let dateObj = new Date(date);
		let hoursWithTimezone = dateObj.getHours() + ((-1) * (dateObj.getTimezoneOffset() / 60))

		return new Date(new Date(date).setHours(hoursWithTimezone)).getTime();
	}
}
