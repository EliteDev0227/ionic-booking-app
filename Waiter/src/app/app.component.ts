import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CommonProvider } from '../providers/common/common';
import { STORE } from '../services/app-settings';
import { TranslateService } from '@ngx-translate/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AppService } from '../services/app.service';
import { Push, PushOptions, PushObject } from '@ionic-native/push';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    public rootPage: any = 'page-auth';

    countries: Array<any> = [];

    constructor(
        private scOrientation: ScreenOrientation, private events: Events, private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public translate: TranslateService, private common: CommonProvider,
        private appService: AppService, private push: Push
    ) {

        platform.ready().then(() => {
            statusBar.styleLightContent();      // .styleDefault();
            splashScreen.hide();

            this.translate.setDefaultLang('en');
            this.translate.use(this.appService.getLang());
            if (platform.is('cordova')) {

                this.scOrientation.lock(this.scOrientation.ORIENTATIONS.PORTRAIT);

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
                    console.log('get push notification');
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
                    this.appService.fcmToken = registration.registrationId;
                });

                pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

                this.platform.resume.subscribe(() => {
                    this.events.publish('app:reload');
                })    
            }

        });

        this.authenticationPage();
        this.changeLanguage();
    }

    changeLanguage() {
        this.events.subscribe('app:langChange', lang => {
            this.translate.use(lang);
            this.translate.resetLang(lang);
            this.translate.reloadLang(lang)
            this.appService.setLang(lang);
        });
    }

    authenticationPage() {
        this.common.getStorageItem(STORE.USER.LOGIN)
            .then(user => {
                if (user) {
                    this.rootPage = 'page-tabs';
                } else {
                    this.rootPage = 'page-auth';
                }
            })
    }
}

