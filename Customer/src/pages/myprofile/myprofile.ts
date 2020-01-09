import { LoyaltyPointsPage } from '../myprofile/loyalty-points/loyalty-points';
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, Platform, PopoverController, Popover } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { CustomBootstrap } from "../../app/BootstrapFirstRun";
import { resetPassword } from "../resetPassword/resetPassword";
import { ApiProvider } from "../providers/services";
import { App, Events } from "ionic-angular";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Base64 } from '@ionic-native/base64';
import { Crop, CropOptions } from '@ionic-native/crop';
import { File } from '@ionic-native/file';
import { EventsThisWeek } from '../includes/events/eventsThisWeek';
import {MainGuestPage} from "../main-guest-page/main-guest-page.component";
import {SplashScreen} from "@ionic-native/splash-screen";

/**
 * Generated class for the MyprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-myprofile',
    templateUrl: 'myprofile.html',
})
export class MyprofilePage {

    newName: any;
    oldName: any;
    phone: any;
    customerid: any;
    photo: any;
    is_guest: boolean = false;

    camera_options: CameraOptions = {
        quality: 70,
        cameraDirection: this.camera.Direction.FRONT,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        correctOrientation: true,
    }

    crop_options: CropOptions = {
        quality: 70,
        targetWidth: 200,
        targetHeight: 200,
    }

    constructor(
        private splashScreen:SplashScreen,
        public platform: Platform,
        private alerCtrl: AlertController, private app: App,
        public navCtrl: NavController, public modalCtrl: ModalController,
        public navParams: NavParams, public events: Events,
        public configuration: CustomBootstrap, public api: ApiProvider,
        public camera: Camera, public croper: Crop,
        private base64: Base64, private ngZone: NgZone, private file: File, public popoverCtrl: PopoverController
    ) {
    }

    ionViewWillEnter() {
        this.checkEvents();
        this.events.subscribe('app:event', () => {
            this.checkEvents();
        });
        this.configuration.getStorage('login').then((a) => {
            if (a && a.token) {

                
                this.oldName = a.name;
                this.newName = a.name;
                this.phone = a.phone;
                this.customerid = a.id;
                this.photo = a.photo;
                this.is_guest = a.guest || a.tour;

            }
        }, error => { });

    }

    ionViewWillLeave() {
        this.events.unsubscribe('app:event');
    }
    async logout() {
        if (this.api.fcmToken) {
            try {
                await this.api.get(`fcm/${this.api.fcmToken}/remove`, {}, {}, true).toPromise();
            } catch (error) {}
        }
        this.configuration.clearStorage().then(r=>{
            window.location.reload();
            this.splashScreen.show();

        });
        /*this.navCtrl.popToRoot().then(_ => {
            this.navCtrl.push(LoginPage);
            this.app.getRootNav().setRoot(MainGuestPage);
        });*/
    }

    new_photo: any = false;

    takePhoto(source) {

        this.camera.getPicture({...this.camera_options, sourceType: source})
            .then((imagepath) => {
                return this.croper.crop(imagepath, this.crop_options);
            })
            .then(cropped_path => {
                if (this.platform.is('android')) {
                    return this.base64.encodeFile(cropped_path);
                } else {
                    let fileName = cropped_path.split('/').pop();
                    let path = cropped_path.substring(0, cropped_path.lastIndexOf("/") + 1);
                    return this.file.readAsDataURL(path, fileName)
                }
            })
            .then(imageData => {
                return new Promise((resolve, reject) => {
                    try {
                        var img = new Image;

                        img.onload = function resizeImage() {
                            resolve(imageToDataUri(this, 500, 500));
                        };
                        img.src = imageData.split('\n').join('').split('\r').join('');

                        const imageToDataUri = (img, width, height) => {

                            // create an off-screen canvas
                            var canvas = document.createElement('canvas'),
                                ctx = canvas.getContext('2d');

                            // set its dimension to target size
                            canvas.width = width;
                            canvas.height = height;

                            // draw source image into the off-screen canvas:
                            ctx.drawImage(img, 0, 0, width, height);

                            // encode image to data-uri with base64 version of compressed image
                            return canvas.toDataURL('image/jpeg', 0.5);
                        }

                    } catch (error) {
                        reject(error);
                    }
                })
            })
            .then((imageData: string) => {
                this.new_photo = imageData;
                this.ngZone.run(this.updatePhoto.bind(this));
            })
            .catch(() => {
            })
    }
    updatePhoto() {
        let imageData = this.new_photo;
        if (imageData.indexOf(';base64,') > -1) {
            imageData = imageData.substr(imageData.indexOf(';base64,') + 8);
        }
        this.api.post('customer', { id: this.customerid, photo: imageData }, {}, true).subscribe(res => {
            this.ngZone.run(() => {
              this.configuration.getStorage('login').then(login => {
                let newLogin = JSON.parse(JSON.stringify(login))
                newLogin.photo = res.photo;
                this.configuration.setStorage('login', newLogin);
                this.photo = res.photo;
              });
            });
        }, error => {
            this.ngZone.run(() => {
                alert(error.message);
            });
        });
    }
    destroyAccount() {

        let confirm = this.alerCtrl.create({

            title: "Warning",
            message: "Do you really want to destroy your account?",
            buttons: [
                {
                    text: "Ok",
                    handler: () => {

                        this.api.post('customer/delete', { customer_id: this.customerid }, {}).subscribe(r => {

                            if (r) {
                                this.logout();
                            }

                        }, error => { });
                    }
                },
                {
                    text: "Cancel",
                    handler: () => {
                        return;
                    }
                }
            ]

        });

        confirm.present();
    }
    unreceivedEvents: any = '';
    checkEvents() {
        if (this.eventPopup) return;
        this.ngZone.run(() => {
            this.api.get('events/hasnew', {}, {}, true, true).subscribe(data => {
                if (data.news) {
                    this.unreceivedEvents = data.news
                } else {
                    this.unreceivedEvents = ''
                }
            }, error => { });
        });
    }
    eventPopup: Popover
    eventsThisWeek(){
        this.events.publish('app:removeBadge');
        this.unreceivedEvents = '';
        this.eventPopup = this.popoverCtrl.create(EventsThisWeek, {}, {
            cssClass: 'eventsPopOver',
            enableBackdropDismiss: false
        });
        this.eventPopup.onDidDismiss(() => {
            this.eventPopup = null;
        })
        this.eventPopup.present();
    }
    ResetPassword() {
        this.navCtrl.push(resetPassword);
    }

    onUpdateName(event) {
        let self = this;
        if (self.newName != self.oldName) {
            let requestBody = {
                name: self.newName
            }
            this.api.put(`${this.customerid}`, requestBody, {}).subscribe(res => {
              this.configuration.getStorage('login').then(login => {
                let newLogin = JSON.parse(JSON.stringify(login))
                newLogin.name = res.name;
                this.configuration.setStorage('login', newLogin);
              });
            });
        }
    }

    onLoyalityPoint() {
        // https://smart-beach.ga/api/client/loiality-points/7ee6b60d-42ea-4b2a-9cbc-d4a36ea0e131
        
        this.api.get(`loiality-points/${this.customerid}`, {}, {}).subscribe(res => {
            this.modalCtrl.create(LoyaltyPointsPage, { 'points': res }).present();
        });
    }



}
