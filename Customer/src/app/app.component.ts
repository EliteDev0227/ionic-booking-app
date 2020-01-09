import { Component, ViewChild, NgZone } from '@angular/core'
import { App, Events, Nav, Platform, Tabs, PopoverController } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { Keyboard } from '@ionic-native/keyboard';
import { CustomBootstrap } from "./BootstrapFirstRun";
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Device } from '@ionic-native/device'
import { TabsPage } from "../pages/tabs/tabs";
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { SignupPage } from '../pages/signup/signup';
import { Push, PushOptions, PushObject } from '@ionic-native/push';
import { ApiProvider } from '../pages/providers/services';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { MainGuestPage } from "../pages/main-guest-page/main-guest-page.component";
import { Storage } from '@ionic/storage';
declare var NodeList: any;
declare var cordova: any;
declare var alreadyLogin: any;

@Component({
	templateUrl: 'app.html'
})

export class MyApp {
	rootPage;
	@ViewChild(Nav) nav: Nav;
	@ViewChild('myTabs') tabRef: Tabs;
	viewsWithoutBackButton: Array<string> = ['BeachPage'];
	constructor(statusbar: StatusBar, public app: App, device: Device, private androidPermission: AndroidPermissions, private diagnostic: Diagnostic, private locationAccuracy: LocationAccuracy,
		public platform: Platform, screenOrientation: ScreenOrientation, statusBar: StatusBar, splashScreen: SplashScreen,
		keyboard: Keyboard, public startBoostrapping: CustomBootstrap, public events: Events, private push: Push,
		private api: ApiProvider, public configuration: CustomBootstrap, public storage : Storage
	) {
		platform.ready().then(() => {
			// keyboard.disableScroll(true);
			const clientHeight = document.body.clientHeight;
			this.definePermissions();   // Define Android Permissions
			startBoostrapping.setDeviseInfo({ model: device.model, platform: device.platform, version: device.version, manufacturer: device.manufacturer, uuid: device.uuid });
			screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT).then(() => {

			}, error => {

			});

			this.firstScreenRun();

			NodeList.prototype.forEach = Array.prototype.forEach;

			statusBar.styleDefault();
			splashScreen.hide();
			keyboard.onKeyboardShow().subscribe(() => {
				// keyboard.disableScroll(true);
				document.body.classList.add('keyboard-is-open');
			
				let scroll: any = document.querySelectorAll('.scroll-content');
				scroll.forEach((e) => { e.style.height = clientHeight + "px"; });
			});
			keyboard.onKeyboardHide().subscribe(() => {
				// keyboard.disableScroll(true);
				document.body.classList.remove('keyboard-is-open');
				let scroll: any = document.querySelectorAll('.scroll-content');
				scroll.forEach((e) => { e.style.height = 'auto'; });
			});

			statusbar.backgroundColorByHexString('#fe5295');
			//back button delegation for beach details
			this.MyAppEvents();
			platform.pause.subscribe(() => {
				this.MyAppOnPause();
			});

			if (platform.is('cordova')) {
				this.push.hasPermission()
					.then((res: any) => {

						if (res.isEnabled) {
							
						} else {
							
						}

					});

				// Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
				this.push.createChannel({
					id: "testchannel1",
					description: "My first test channel",
					// The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
					importance: 3
				}).then(() => {});

				// Delete a channel (Android O and above)
				this.push.deleteChannel('testchannel1');

				// Return a list of currently configured channels
				this.push.listChannels();

				// to initialize push notifications 

				const options: PushOptions = {
					android: {
						senderID: '494805758050',
						sound: true,
						vibrate: true,
						icon: 'icon'
					},
					ios: {
						alert: true,
						badge: true,
						sound: true,
					}
				};

				const pushObject: PushObject = this.push.init(options);

				pushObject.on('notification').subscribe((notification: any) => {
					alert('not');
					const data = notification.additionalData;


					if (data.topic === 'customer' || data.topic === 'dev_customer') {
						this.events.publish('app:reload', notification.additionalData);
					} else if (data.topic === 'event' || data.topic === 'dev_event') {
						this.events.publish('app:event', {});
					} else {
						this.events.publish('app:notification', data);
					}
				});

				pushObject.on('registration').subscribe((registration: any) => {
					this.api.fcmToken = registration.registrationId;//fcm working for all 3 apps now.
					console.log('fcm token', this.api.fcmToken);

					// dev
					pushObject.subscribe('dev_customer');
					pushObject.subscribe('dev_event');
					// prod
					pushObject.subscribe('customer');
					pushObject.subscribe('event');
				});

				pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

			}
		})
	}

	definePermissions() {
		if (!this.platform.is('cordova')) return;
		this.locationPermission();
		this.requestSMSPermission();
	}
	
	locationPermission() {
		navigator.geolocation.getCurrentPosition((a) => {
			if (a && a.coords && a.coords.latitude) {
		
			}
		}, (e) => {
	
		}, { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 })

		this.androidPermission.checkPermission(this.androidPermission.PERMISSION.ACCESS_FINE_LOCATION).then((a: any) => {
		
		    this.storage.set('alreadygpsset', 'true');
			this.enableGPS()
		}, (error) => {

	
			
			this.androidPermission.requestPermission(this.androidPermission.PERMISSION.ACCESS_FINE_LOCATION).then((a: any) => {
				this.enableGPS()
			}, error => {
			
			});
		});
	}
	private enableGPS() {
		this.locationAccuracy.canRequest()
			.then(possible => {
				if (possible) {
					return this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
				} else {
					return this.diagnostic.isGpsLocationEnabled()
						.then(enabled => {
							if (!enabled) {
								//return this.diagnostic.switchToLocationSettings();
								this.androidPermission.checkPermission(this.androidPermission.PERMISSION.ACCESS_FINE_LOCATION).then((a: any) => {
								
									this.enableGPS()
								}, (error) => {
									
									
								});
							}
						});
				}
			}).then(() => {
	
			}).catch(error => {
			
			});
	}

	// locationPermission() {

	//   navigator.geolocation.getCurrentPosition((a) => {
	//   if (a && a.coords && a.coords.latitude) {
	//     this.startBoostrapping.hasLocationAccess = true;
	//   }
	//   }, (e) => {
	//   this.androidPermission.requestPermission(this.androidPermission.PERMISSION.ACCESS_FINE_LOCATION).then((a: any) => {
	//     this.startBoostrapping.hasLocationAccess = a.hasPermissions;
	//     if (a.hasPermissions) {
	//     }
	//   }, error => {
	//     this.startBoostrapping.hasLocationAccess = false;
	//     console.error('permission denial');
	//     console.error(error);
	//   });
	//   }, { enableHighAccuracy: true, maximumAge: 0 })
	// }

	 requestSMSPermission() {
		let otpConfig: any = {
			delimiter: ":",
			length: 4,
			origin: ""
		};

	}

	firstScreenRun() {
		this.startBoostrapping.apiData.Busymessage = 'Updating...';
		this.startBoostrapping.apiData.AmBusy(this.startBoostrapping.apiData.Busymessage);
		this.startBoostrapping.Load().then(r => {
			
			this.startBoostrapping.apiData.AmBusy(this.startBoostrapping.apiData.Busymessage);
			this.startBoostrapping.apiData.Busymessage = 'Please wait...';
			this.IsDeviceLoggedIn();
		}, error => {
			this.startBoostrapping.apiData.AmBusy(this.startBoostrapping.apiData.Busymessage);
			this.startBoostrapping.apiData.Busymessage = 'Please wait...';
			this.startBoostrapping.apiData.AmError("You're offline", "The content didn't load. Try again?", [{
				text: 'Close', handler: () => {
					this.platform.exitApp();
				}
			}, {
				text: 'Retry', handler: () => {
					this.firstScreenRun();
				}
			}])
		});
	}


	IsDeviceLoggedIn() {
		this.startBoostrapping.getStorage('login').then((a) => {
			if (a && a.token) {
				this.rootPage = TabsPage;
			} else {
				this.startBoostrapping.clearStorage()
					.then(() => {
						this.rootPage = MainGuestPage;
					})
			}
		}, error => {
			this.startBoostrapping.clearStorage()
				.then(() => {
					this.rootPage = MainGuestPage;
				});
		})
	};

	backButtonAction() {
		this.platform.registerBackButtonAction((event: any) => {
			let nav = this.app.getActiveNavs();
			let navChild = nav && nav.length > 0 && nav[0]._views && nav[0]._views.length > 0 ? nav[0]._views[nav[0]._views.length - 1].component.name : false;
		
			if (this.viewsWithoutBackButton.indexOf(navChild) != -1) {
				this.events.publish('nav:back', navChild);
				alert("app.component.view.back");
			
				return;
			}

			if (nav[0].canGoBack()) {
				nav[0].pop().then(() => {
					
				}, error => { })
			} else {
				this.startBoostrapping.apiData.AmError('Back', 'Do you wish to exist app?', [{
					text: 'Agree', handler: () => {
						this.platform.exitApp();
					}
				}, { text: 'Disagree', role: 'cancel' }])
			}

		
		})
	}


	MyAppEvents() {
		this.app.viewWillEnter.subscribe((data: any) => {
			console.warn('stopping loop light');
			this.startBoostrapping.ClearTimeout();
		});
	}

	MyAppOnPause() {
		this.startBoostrapping.ClearTimeout();
	}

}
