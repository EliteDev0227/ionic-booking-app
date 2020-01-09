import { Component, OnInit, NgZone } from '@angular/core'
import { NavController, NavParams, PopoverController, ModalController, Platform, AlertController } from 'ionic-angular'
import { LoginPage } from '../login/login'
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from "@angular/forms";
import { CustomBootstrap } from "../../app/BootstrapFirstRun";
import { ApiProvider } from "../providers/services";
import { TermsPage } from '../terms/terms';
import { HttpClient } from '@angular/common/http';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { confirmVerification } from '../includes/confirmVerification/confirmVerification';
import { verification } from '../verification/verification';
import { Crop, CropOptions } from '@ionic-native/crop';
import { Base64 } from '@ionic-native/base64';
import { File } from '@ionic-native/file';
import { TranslateService } from '@ngx-translate/core';
import {MainGuestPage} from "../main-guest-page/main-guest-page.component";

declare const document: any;

@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
})
export class SignupPage implements OnInit {

    PICTURE_RATIO = 1659 / 1200;
    SignupData: FormGroup;
    toggleLanguage: number;
    requestPage: string = "Signup";
    shouldTop = document.body.clientHeight - document.body.clientWidth * this.PICTURE_RATIO + 'px';
    isSelected: boolean = false;
    checkTerms: boolean = false;

    private currentLanguage: string;

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

    photo: any = false;

    constructor(public platform: Platform, public configuration: CustomBootstrap, private alerCtrl: AlertController, public navCtrl: NavController, private http: HttpClient, public fb: FormBuilder, public navParams: NavParams, public popoverCtrl: PopoverController,
        public modalCtrl: ModalController, public misc: CustomBootstrap, public api: ApiProvider, public camera: Camera, public croper: Crop,
        private base64: Base64, private file: File, private translate: TranslateService
    ) {
        this.SignupData = new FormGroup({
            name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
            phone: new FormControl(null, [Validators.required, Validators.minLength(6)]),
            terms: new FormControl(null, [Validators.required]),
            prefix:new FormControl('',[Validators.required,Validators.minLength(1)]),
            suffix:new FormControl('',[Validators.required,Validators.minLength(1)])
        });
        this.SignupData = fb.group({
            name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
            phone: new FormControl(null, [Validators.required, Validators.minLength(6)]),
            terms: [false, SignupPage.mustBeTruthy],
            prefix:new FormControl('',[Validators.required,Validators.minLength(1)]),
            suffix:new FormControl('',[Validators.required,Validators.minLength(1)])
        });
        this.misc.getStorage('AdditionalRegData').then(a => {
            if (a && a.complete && a.complete.length > 6)
                this.updatePhone(a);
        })
    }

    takePhoto(mediaType) {
        this.camera.getPicture({...this.camera_options, sourceType: mediaType})
            .then((imagepath) => {
                return this.croper.crop(imagepath, this.crop_options);
            })
            .then(cropped_path => {
                if (this.platform.is('android')) {
                    return this.base64.encodeFile(cropped_path);
                } else {
                    let fileName = cropped_path.split('/').pop();
                    let path = cropped_path.substring(0, cropped_path.lastIndexOf("/") + 1);
                    return this.file.readAsDataURL(path, fileName);
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
                this.photo = imageData;
            })
            .catch((error) => {
            })
    }

    ngOnInit() {
    }

    static mustBeTruthy(c: AbstractControl): { [key: string]: boolean } {
        let rv: { [key: string]: boolean } = {};
        if (!c.value) {
            rv['notChecked'] = true;
        }
        return rv;
    }

    ionViewWillEnter() {
        this.configuration.setRequestPage(this.requestPage);
    }

    //TODO: Implement auth
    async doSignup() {

        let confirm = this.alerCtrl.create({
            title: "Warning",
            message: this.translate.instant('NO_PHOTO'),
            buttons: [{
                text: "OK",
                handler: null
            }]
        });
        const a = await this.misc.getStorage('deviceInfo');
        this.SignupData.value.device = {};
        if(a){
            this.SignupData.value.device = {
                model: a.model,
                platform: a.platform,
                version: a.version,
                manufacturer: a.manufacturer
            };
        }
        
        const controls = this.SignupData.controls;
        if (controls['name'].hasError('required')){
            confirm.setMessage(this.translate.instant('NAME_REQUIRED'));
        } else if (controls['name'].hasError('minlength')){
            confirm.setMessage(this.translate.instant('NAME_LENGTH'))
        } else if (controls['phone'].hasError('required')){
            confirm.setMessage(this.translate.instant('PHONE_REQUIRED'))
        } else if (controls['phone'].hasError('minlength')){
            confirm.setMessage(this.translate.instant('PHONE_LENGTH'))
        } else if (controls['password'].hasError('required')){
            confirm.setMessage(this.translate.instant('PAWD_REQUIRED'))
        } else if (controls['password'].hasError('minlength')){
            confirm.setMessage(this.translate.instant('PAWD_LENGTH'))
        } else if (controls['terms'].hasError('notChecked')){
            confirm.setMessage(this.translate.instant('GDPR_REQUIRED'))
        } else if (!this.photo){
            confirm = this.alerCtrl.create({
                title: "Warning",
                message: this.translate.instant('NO_PHOTO'),
                buttons: [{
                    text: "YES",
                    handler: () => {
                        return this.signup(this.SignupData.value);
                    }
                }, {
                    text: "NO",
                    handler: null
                }]
            });
            confirm.setMessage(this.translate.instant('PHOTO_REQUIRED'));
        } else {
            return this.signup(this.SignupData.value);
        }
        confirm.present();
    }

    goLogin() {
        this.navCtrl.setRoot(LoginPage)
    }

    openAboutProfile() {

    }
    //TODO: Implement Language menu

    updatePhone(event: any) {
        if (event && event.complete && event.complete.length >= 1) {
            this.SignupData.controls['phone'].setValue(event.complete);
            this.SignupData.controls['prefix'].setValue(event.prefix);
            this.SignupData.controls['suffix'].setValue(event.suffix);
            this.isSelected = true;
            this.misc.setStorage('AdditionalRegData', event).then(a => {
                this.toggleLanguage = Math.random();
            }, error => {

            });

        }
    }

    onLanguageChanged(lang: string) {
        let self = this;
        self.currentLanguage = lang;
    }

    private signup(data: {
        name: string,
        password: string,
        phone: string,
        lang: string,
        device: any
    }) {

        data.phone = data.phone.replace(')', '').replace('(', '').replace(/\s/g, '');

        let parsedData: any = {
            name: data.name,
            password: data.password,
            phone: data.phone,
            device: data.device,
        }
        if (this.photo) {
            if (this.photo.indexOf(';base64,') > -1) {
                parsedData.photo = this.photo.substr(this.photo.indexOf(';base64,') + 8);
            } else {
                parsedData.photo = this.photo;
            }
        }
        this.api.post('register', parsedData, { 'Content-Type': 'application/json' }).subscribe(r => {
            this.api.AmError(this.misc.translate.translate.instant('REGISTERED'), r.message, [{
                text: this.misc.translate.translate.instant('PROCEED'), handler: () => {
                    let popoverSignup = this.popoverCtrl.create(confirmVerification, { page: verification, next: LoginPage, userData: data, process: { fn: 'SignupVerification', data: this.SignupData.value } });
                    popoverSignup.present();
                }
            }])
        });
    }

    openTerms() {
        this.http.get(this.api.APIURL + 'term-condition?lang=' + this.currentLanguage, { responseType: 'text' }).toPromise().then(res => {
            this.modalCtrl.create(TermsPage, { title: this.translate.instant('TERMS_CONDITIONS'), terms: res }).present();
        });
    }
    openGDPR() {
        this.http.get(this.api.APIURL + 'gdpr?lang=' + this.currentLanguage, { responseType: 'text' }).toPromise().then(res => {
            this.modalCtrl.create(TermsPage, { title: 'GDPR', terms: res }).present();
        });
    }
    openWhyPhoto() {
        this.http.get(this.api.APIURL + 'photo?lang=' + this.currentLanguage, { responseType: 'text' }).toPromise().then(res => {
            this.modalCtrl.create(TermsPage, { title: 'Why Photo?', terms: res }).present();
        });
    }



    public goBack(){
        this.navCtrl.push(MainGuestPage,{
            animation:true,direction:'back'
        });
    }
}
