import { STORE } from '../../services/app-settings';
import { CustomBootstrap } from './../../app/BootstrapFirstRun';
import { ApiProvider } from './../../providers/services';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, Events, Platform } from 'ionic-angular';
import { FormGroup, ValidatorFn, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CommonProvider } from '../../providers/common/common';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Keyboard } from '@ionic-native/keyboard';
import { TranslateService } from "@ngx-translate/core";

/**
 * Generated class for the AuthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface PageState {
    isSearch?: boolean;
    unlockState?: boolean;
    searchEndState?: boolean;
    searchState?: boolean;
    registerState?: boolean;
    loginState?: boolean;
}

export interface User {
    userName?: string,
    password?: string,
    confirm_password?: string
}
@IonicPage({
    name: 'page-auth',
    priority: 'high'
})
@Component({
    selector: 'page-auth',
    templateUrl: 'auth.html',
})

export class AuthPage {

    @ViewChild('unlockInput') unlockInput;
    @ViewChild('searchInput') searchInput;

    beachAry: Array<any> = [];
    originAry: Array<any> = [];
    selectedBeach: any = { id: '', name: '' };
    pageState: PageState;
    unlockCode: string;
    authForm: FormGroup;

    toggleLanguage: number;
    isKeyHided: boolean = true;

    countries: Array<any> = [];

    constructor(public navCtrl: NavController, public platform: Platform, public api: ApiProvider, public config: CustomBootstrap,
        public events: Events, public navParams: NavParams, public formBuilder: FormBuilder, private common: CommonProvider, private orientation: ScreenOrientation, private keyboard: Keyboard, public translate: TranslateService) {

        this.events.publish('app:authState', true);

        this.initBeachData();
        this.unlockCode = '';

        this.pageState = {
            isSearch: false,
            unlockState: false,
            searchEndState: false,
            searchState: true,
            registerState: false,
            loginState: false
        }

        this.toggleLanguage = Math.random();

        if (this.platform.is('android') || this.platform.is('ios')) {
            if (platform.is('cordova'))
                this.orientation.lock(this.orientation.ORIENTATIONS.PORTRAIT);
            // window.addEventListener('keydown', (res) => {
            this.keyboard.onKeyboardShow().subscribe(() => {
                this.isKeyHided = false;
            });
            this.keyboard.onKeyboardHide().subscribe(() => {
                this.isKeyHided = true;
            });
            // });
        }

        this.config.removeKeys('lang');
    }

    initValidatorControls(status: PageState) {
        // initializing form controls for validate
        if (status.registerState) {
            this.authForm = this.formBuilder.group({
                username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(18)])),
                password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
                confirm_password: new FormControl('', [Validators.required, this.equalto('password')])
            });
        } else if (status.loginState) {
            this.authForm = this.formBuilder.group({
                username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(18)])),
                password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
            });
        }
    }

    equalto(field_name): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {

            let input = control.value;

            let isValid = control.root.value[field_name] == input
            if (!isValid)
                return { 'equalTo': { isValid } }
            else
                return null;
        };
    }

    // ---- Getting Beaches ------------
    initBeachData() {
        this.api.get('beaches', {}, {}, true, true).subscribe(res => {
            this.originAry = this.beachAry = res;
        }, err => {
            console.error(err);
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AuthPage');
        this.goLogin();
    }

    searchBeach(events: any) {
        if (this.pageState.searchEndState) return;
        this.beachAry = this.originAry.filter((item) => (item.name.toLowerCase().indexOf(events.value.toLowerCase()) >= 0));

        this.pageState.isSearch = false;

        if (this.beachAry.length > 0 && events.value.length > 0) {
            this.pageState.isSearch = true;
            this.pageState.searchEndState = false;
        }
    }

    onClickSearchField() {
        if (this.beachAry.length > 0)
            this.pageState.isSearch = !this.pageState.isSearch;
        if (this.pageState.searchEndState) {
            this.selectedBeach = { id: '', name: '' };
            this.pageState.searchEndState = false;
            this.pageState.unlockState = false;
            this.unlockCode = ``;
        }
    }

    beachClick(beach: any) {
        this.selectedBeach = beach;
        this.pageState.searchEndState = true;
        this.pageState.isSearch = !this.pageState.isSearch;
        setTimeout(() => {
            if (typeof this.unlockInput != 'undefined') this.unlockInput.setFocus();
        }, 250);
    }

    onInputUnlock(event: any) {
        if (event.value.length > 0)
            this.pageState.unlockState = true;
        else
            this.pageState.unlockState = false;
    }

    onClickUnlock() {
        let param = {
            beach_id: this.selectedBeach.id,
            unlock_code: this.unlockCode
        };
        //console.log(param);
        this.api.post('unlock', param, { 'Content-Type': 'application/json' }, true, true).subscribe(res => {
            this.pageState.searchState = false;
            this.pageState.registerState = true;
            this.initValidatorControls(this.pageState);
            // console.log(`Unlocked : ${res}`);
            this.config.setStorage('broker', res);
            this.authForm.controls['username'].setValue(this.getRealNumber(res.phone));
        }, (err: any) => {
            //console.error(err);
            if (typeof err.registered != 'undefined') {
                if (!err.registered) { // if user is verified but not registered
                    this.pageState.searchState = false;
                    this.pageState.registerState = true;
                    this.initValidatorControls(this.pageState);
                    this.authForm.controls['username'].setValue(this.getRealNumber(err.phone));
                    localStorage.setItem(STORE.USER.PHONE, err.phone);
                } else {
                    this.pageState.searchState = false;
                    this.pageState.registerState = false;
                    this.pageState.loginState = true;
                    this.initValidatorControls(this.pageState);
                    this.authForm.controls['username'].setValue(this.getRealNumber(err.phone));
                    localStorage.setItem(STORE.USER.PHONE, err.phone);
                }
            }
        });
    }
    getRealNumber(str: any) {

        if (str && str !== '') {
            let ary = str.split('+');
            return ary[1];
        }

        return str;

    }
    //  for Register
    onClickRegister(fObj: any): void {
        if (!this.authForm.valid) {
            console.log(`Validate Error Occoured!! ${this.authForm.controls.username.valid}`);
            return;
        }
        this.config.getStorage('broker').then(broker => {
            let params = {
                broker_id: broker.id,
                beach_id: this.selectedBeach.id,
                // phone:`+${fObj.username}`,
                password: fObj.password,
                password2: fObj.confirm_password
            };
            this.api.post('register', params, { 'Content-Type': 'application/json' }, true, true).subscribe(res => {
                this.pageState.registerState = false;
                this.pageState.loginState = true;
                this.initValidatorControls(this.pageState);
                this.authForm.controls['username'].setValue(this.getRealNumber(fObj.username));
            }, err => {
                console.log(err);
            });
        }).catch(err => {
            console.log(err);
        });
    }

    onClickSignIn(fObj: any) {
        if (!this.authForm.valid) {
            console.log('Validate Error Occoured!!!');
            return;
        }
        let self = this;
        let param = {
            phone: `+${fObj.username}`,
            password: fObj.password
        }
        this.api.post('login', param, { 'Content-Type': 'application/json' }, true, true).subscribe(res => {

            this.common.setStorageItem(STORE.USER.LOGIN, true);
            this.common.setStorageItem(STORE.USER.TOKEN, res.token);
            this.common.setStorageItem(STORE.USER.ID, res.id);
            this.common.setStorageItem(STORE.USER.BEACH_ID, res.beach_id);
            this.common.setStorageItem(STORE.USER.BEACH_NAME, res.beach_name);

            this.config.setStorage('login', res).then(() => {
                console.log("Login Response",res);
                console.log("123456",this.api.fcmToken);
                localStorage.setItem("beach_grid", JSON.stringify(res.grid));
                console.log("auth_grid-auth.ts",res.grid);
                localStorage.setItem("grid_setting", JSON.stringify(res.grid_setting));
                this.config.populateBeachSettings(res.beach_id).then((r: any) => {
                    localStorage.setItem("beach_settings", JSON.stringify(r));
                    this.common.setStorageItem(STORE.SETTINGS.EXTRA_SEATS, r.seats.extra);
                    this.common.setStorageItem(STORE.SETTINGS.CURRENCY, r.currency);

                    // goto notification page
                    if (this.api.fcmToken) {
                        this.api.get(`fcm/${this.api.fcmToken}`, {}, {}, true).subscribe(res => {
                            console.log("page-notification-fcm");
                      
                        }, error => {
                            alert(error.message);
                        });
                    } else {
                        console.log("page-notification");
                        
                    }
                    this.navCtrl.setRoot('page-notification');
                }).catch(e => {
                    console.log(e);
                });
            });
        }, error => {
            var alertInstance = this.api.AmCustomError(this.translate.instant("Buttons.ERROR"), error.message, [{ text: this.translate.instant('Buttons.CLOSE'), role: this.translate.instant('Buttons.CANCEL') }]);
            alertInstance.onDidDismiss(data => {
                if (error.message === "This user is not validated" || error.type === "verification") {
                    self.goSignup()
                }
            });


            console.log(error);
        });
    }

    goLogin() {
        this.pageState.loginState = true;
        this.pageState.registerState = false;
        this.pageState.searchState = false;
        this.pageState.searchEndState = true;
        this.initValidatorControls(this.pageState);
        this.authForm.controls['username'].setValue(this.getRealNumber(localStorage.getItem(STORE.USER.PHONE)));
    }

    goSignup() {
        this.pageState.loginState = false;
        this.pageState.registerState = false;
        this.pageState.searchState = true;
        this.pageState.searchEndState = false;
        this.initValidatorControls(this.pageState);
    }

}