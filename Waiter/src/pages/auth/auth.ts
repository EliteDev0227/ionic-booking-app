import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, LoadingController } from 'ionic-angular';
import { FormGroup, ValidatorFn, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CommonProvider } from '../../providers/common/common';
import { STORE } from '../../services/app-settings';

import { BeachService } from '../../services/beach.service';
import { AppService } from '../../services/app.service';
import { UserService } from '../../services/user.service';
import { AssetService } from '../../services/asset.service';
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
    phone?: string,
    password?: string,
    password2?: string
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
    selectedBeach: string;
    pageState: PageState;
    unlockCode: string;
    authForm: FormGroup;
    countries: Array<any> = [];

    constructor(
        public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,
        private common: CommonProvider,
        private appService: AppService,
        private beachService: BeachService,
        private userService: UserService,
        private assetService: AssetService,
        public loadingCtrl: LoadingController
    ) {
        this.unlockCode = '';
        this.pageState = {
            isSearch: false,
            unlockState: false,
            searchEndState: false,
            searchState: false,
            registerState: false,
            loginState: true
        }
        this.initValidatorControls(this.pageState);
        this.initBeachData()
            .then(() => {
                this.loadLanguages();
            })
    }
    private processing: any = false;
    loadLanguages() {
        if (this.processing) return;
        this.processing = true;
        this.assetService.getLanguage()
            .then(languages => {
                this.countries = languages;
                this.processing = false;
            })
            .catch(error => {
                this.countries = [];
                this.processing = false;
            })
    }

    initValidatorControls(status: PageState) {
        // initializing form controls for validate
        if (status.registerState) {
            this.authForm = this.formBuilder.group({
                password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
                password2: new FormControl('', [Validators.required, this.equalto('password')])
            });
        } else if (status.loginState) {
            this.authForm = this.formBuilder.group({
                phone: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(18)])),
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

    // ----------------------------------------
    async initBeachData() {
        if (this.processing) return;
        this.processing = true;
        try {
            const beachs = await this.beachService.getBeachList();
            this.originAry = beachs;
            this.beachAry = beachs;
        } catch (error) {
            this.originAry = [];
            this.beachAry = [];
        }
        this.processing = false;
    }

    searchBeach(events: any) {
        this.beachAry = this.originAry.filter((item) => {
            if (item.name.toLowerCase().indexOf(events.value.toLowerCase()) >= 0 ||
                item.description.toLowerCase().indexOf(events.value.toLowerCase()) >= 0) {
                return true
            }
            return false
        });

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
            this.selectedBeach = ``;
            this.pageState.searchEndState = false;
            this.pageState.unlockState = false;
            this.unlockCode = ``;
        }
    }

    beachClick(beach: any) {
        this.selectedBeach = `${beach.name} ${beach.description}`;
        this.appService.setBeach(beach);
        this.pageState.searchEndState = true;
        if (this.pageState.isSearch) this.pageState.isSearch = false;
        setTimeout(() => {
            this.unlockInput.setFocus();
        }, 250);
    }

    onInputUnlock(event: any) {
        if (event.value.length > 0)
            this.pageState.unlockState = true;
        else
            this.pageState.unlockState = false;
    }

    async onClickUnlock() {
        if (this.processing) return;
        this.processing = true;
        try {
            const account = await this.userService.unlockCode(this.unlockCode);
            this.appService.setAccount(account);
            this.pageState.searchState = false;
            this.pageState.registerState = true;
            this.initValidatorControls(this.pageState);
        } catch (error) {
            this.appService.errorHandler(error);
        }
        this.processing = false;
    }
    //  for Register
    async onClickRegister(fObj: any) {
        if (this.processing) return;
        if (!this.authForm.valid) {
            return;
        }
        this.processing = true;
        try {
            await this.userService.register(fObj);
            this.pageState.registerState = false;
            this.pageState.loginState = true;
            this.initValidatorControls(this.pageState);
        } catch (error) {
            this.appService.errorHandler(error);
        }
        this.processing = false;
    }

    async onClickSignIn(fObj: any) {
        if (this.processing) return;
        if (!this.authForm.valid) return;
        const body = { ...fObj };
        body.phone = '+' + body.phone;
        this.processing = true;
        try {
            const account = await this.userService.login(body);
            await this.appService.setAccount(account);
            await this.common.setStorageItem(STORE.USER.LOGIN, true);
            this.navCtrl.setRoot('page-tabs');
            await this.userService.fcm_register();
        } catch (error) {
            this.appService.errorHandler(error);
        }
        this.processing = false;
    }

    goLogin() {
        this.pageState.loginState = true;
        this.pageState.registerState = false;
        this.pageState.searchState = false;
        this.pageState.searchEndState = true;
        this.initValidatorControls(this.pageState);
    }
    goSignup() {
        this.pageState.loginState = false;
        this.pageState.registerState = false;
        this.pageState.searchState = true;
        this.pageState.searchEndState = false;
        this.initValidatorControls(this.pageState);
    }
}
