import { Component, OnInit } from '@angular/core'
import { Events, NavController, NavParams, PopoverController, App } from 'ionic-angular'
import { SignupPage } from '../signup/signup'
import { resetPassword } from "../resetPassword/resetPassword";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CustomBootstrap } from "../../app/BootstrapFirstRun";
import { ApiProvider } from "../providers/services";
import { TabsPage } from "../tabs/tabs";
import { confirmVerification } from "../includes/confirmVerification/confirmVerification";
import { verification } from "../verification/verification";
import { TranslateService } from "@ngx-translate/core";
import { MainGuestPage } from "../main-guest-page/main-guest-page.component";


@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage implements OnInit {

    PICTURE_RATIO = 1659 / 1200; // can we get these two variables dynamically somehow? why not - good
    shouldTop = document.body.clientHeight - document.body.clientWidth * this.PICTURE_RATIO + 'px';
    toggleLanguage: number;
    FormData: any;
    requestPage: string = 'LoginPage';
    rand: number;
    non_validate: {
        title: string,
        body: string,
        btnText: string
    };
    EyeShown: boolean;

    private currentLanguage: string;

    constructor(public popoverCtrl: PopoverController, public translateService: TranslateService, public app: App, public navCtrl: NavController, public navParams: NavParams, public configuration: CustomBootstrap, public api: ApiProvider, public events: Events) {
        this.FormData = new FormGroup({
            phone: new FormControl('', [Validators.minLength(6), Validators.required]),
            password: new FormControl('', [Validators.minLength(6), Validators.required]),
            prefix:new FormControl('',[Validators.required,Validators.minLength(1)]),
            suffix:new FormControl('',[Validators.required,Validators.minLength(1)])
        });
        this.non_validate = {
            title: '',
            body: '',
            btnText: ''
        };

    }

    ionViewWillEnter() {
        this.configuration.getStorage('UserPhoneInfo').then(res => {

        });

        this.configuration.setRequestPage(this.requestPage);
    }

    //TODO: Implement auth
    doLogin() {
        let self = this;
        if (this.FormData.valid) {

            this.FormData.value.phone = this.FormData.value.phone.replace(')', '').replace('(', '').replace(/\s/g, '');
            let payload = {
                phone: this.FormData.value.phone,
                password: this.FormData.value.password
            }
            this.api.post('login', payload, { 'Content-Type': 'application/json' }).subscribe(r => {
                if (r.blocked) {
                    self.translateService.get("BLOCKED_ACCOUNT_ERROR").subscribe(value => {
                        this.api.AmError('Login', value, [{
                            text: 'Close', handler: () => {
                                this.configuration.clearStorage()
                                    .then(() => {
                                        this.app.getRootNav().setRoot(LoginPage);
                                    })
                            }
                        }]);
                    })
                }
                else {
                    if (r.validated) {
                        if (this.currentLanguage) {
                            r.lang = this.currentLanguage;
                        }

                        this.configuration.setStorage('login', r);

                        

                        r.canUse = true;
                        this.configuration.getStorage('AdditionalRegData').then(res => {
                            res.canUse = true;
                            this.configuration.setStorage('UserPhoneInfo', res).then(reg => {

                                this.configuration.setStorage('AdditionalRegData', r).then(a => {
                                    //user can reuse mobile now
                                    if (this.api.fcmToken) {
                                        setTimeout(() => {
                                            this.api.get(`fcm/${this.api.fcmToken}`, {}, {}, true).subscribe(res => {
                                                this.navCtrl.setRoot(TabsPage, { reservation: r.reservations });
                                              
                                            }, error => {
                                                alert(error.message);
                                            });
                                        }, 500);
                                    } else {
                                        this.navCtrl.setRoot(TabsPage, { reservation: r.reservations });
                                       
                                    }

                                })
                            });
                        });
                    } else {
                        this.api.AmError(this.non_validate.title, this.non_validate.body, [{
                            text: this.non_validate.btnText, handler: () => {
                                let popoverSignup = this.popoverCtrl.create(confirmVerification, { page: verification, next: LoginPage, process: { fn: 'SignupVerification', data: this.FormData.value } });
                                popoverSignup.present();
                            }
                        }]);
                    }
                }
            }, error => {

            })
        }
    }
    ngOnInit() {
        this.configuration.getStorage('AdditionalRegData').then(a => {
            if (a && a.complete && a.canUse)
                this.FormData.controls['phone'].setValue(a.complete);

            this.configuration.translate.getLanguage("NOT_VALIDATED").subscribe(r => {
                this.non_validate.title = r;
            });
            this.configuration.translate.getLanguage("PLEASE_VALIDATE_YOUR_ACCOUNT").subscribe(r => {
                this.non_validate.body = r;
            });
            this.configuration.translate.getLanguage("VALIDATE").subscribe(r => {
                this.non_validate.btnText = r;
            });
        });
        this.navCtrl.viewDidEnter.subscribe(() => {
            this.rand = Math.random();
            this.configuration.getStorage('UserPhoneInfo').then(a => {  //this.configuration.getStorage('AdditionalRegData').then(a=>{
                if (a && a.complete && a.complete.length > 6)
                    this.updatePhone(a);
            })
        })

    }

    onLanguageChanged(lang: string) {
        let self = this;
        self.currentLanguage = lang;
    }

    goSignup() {
        this.navCtrl.setRoot(SignupPage)
    }


    resetPassword(): void {
        this.navCtrl.push(resetPassword);
    }


    updatePhone(event: any) {
        if (event && event.complete) {
            if (event.complete.length > 4) {
                this.FormData.controls['phone'].setValue(event.complete);
                this.FormData.controls['prefix'].setValue(event.prefix);
                this.FormData.controls['suffix'].setValue(event.suffix);
                this.configuration.setStorage('AdditionalRegData', event).then(a => {
                    this.toggleLanguage = Math.random();
                }, error => {

                });
            }
        }
    }
    ngDestroy() {
        this.navCtrl.viewDidEnter.unsubscribe()
    }




    public goBack() {
        this.navCtrl.push(MainGuestPage, {
            animation: true, direction: 'back'
        });
    }
}
