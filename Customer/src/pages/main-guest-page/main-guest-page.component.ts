import { Component, ElementRef, ViewChild } from "@angular/core";
import { NavController } from "ionic-angular";
import { SignupPage } from "../signup/signup";
import { LoginPage } from "../login/login";
import { ApiProvider } from "../providers/services";
import { CustomBootstrap } from "../../app/BootstrapFirstRun";
import { TabsPage } from "../tabs/tabs";
import { Device } from '@ionic-native/device'
import { DeviceInfo } from "../../app/deviceInfoType";

@Component({
    selector: 'app-main-guest-page',
    templateUrl: './main-guest-page.component.html'
})

export class MainGuestPage {

    public guestCode: boolean = false;
    public height: number = window.innerHeight;
    @ViewChild('guestInput') guestInput;
    private currentLanguage: string;
    //device :any;

    constructor(
        private navCtrl: NavController,
        public api: ApiProvider,
        public configuration: CustomBootstrap,
        public device : Device
    ) {
        // this.configuration.getStorage('deviceInfo').then(device => {
        //     this.device = device;
        // });
    }

    public onLanguageChanged(event) {

    }

    public goSignup() {
        this.navCtrl.push(SignupPage)
    }

    public goLogin() {
        this.navCtrl.push(LoginPage)
    }

    public toggleGuest() {
        event.stopPropagation();
        event.preventDefault();

        this.guestCode = !this.guestCode;

        if (this.guestCode) {
            setTimeout(() => {
                this.guestInput.setFocus();
            }, 200)
        }
    }

    public eventHandler() {
        if (this.guestInput.value != "" || this.guestCode == false) {

            return false;
        }
        // if(this.guestCode == true){
        //     return false;
        // }
        this.guestCode = !this.guestCode;
    }
    // public focusEvent(){
    //     event.stopPropagation();
    //     event.preventDefault();
    //     return false;
    // }

    guestLogin(tour: boolean) {
        // if(this.guestInput.value == ""){
        //     setTimeout(() => {
        //         this.guestCode = !this.guestCode;
        //     }, 200)

        // }
        this.configuration.getDeviseInfo().then((device: DeviceInfo) => {
                console.log(this.guestInput.value);
                console.log(device.uuid);

                this.api.post('guest-login', {
                    code: tour ? 'tour' : this.guestInput.value,
                    //device_uuid: this.device.uuid  ? this.device.uuid  : 'empty'
                    device_uuid: this.device.uuid 
                    //this is for "tour" ...right ?
                }, { 'Content-Type': 'application/json' }).subscribe(r => {
                    
                    if (this.currentLanguage) {
                        r.lang = this.currentLanguage;
                    }
                    localStorage.setItem('guest_code', this.guestInput.value);
                    this.configuration.setStorage('login', r);
    
                    r.canUse = true;
                    this.configuration.getStorage('AdditionalRegData').then(res => {
    
                        this.configuration.setStorage('UserPhoneInfo', res).then(reg => {
    
                            this.configuration.setStorage('AdditionalRegData', r).then(a => {
                                //user can reuse mobile now
                                if (this.api.fcmToken) {
                                    setTimeout(() => {
                                        this.api.get(`fcm/${this.api.fcmToken}`, {}, {}, true).subscribe(res => {
                                            this.navCtrl.setRoot(TabsPage, { reservation: r.reservations });
                                        }, error => {
                                            alert(error.message);
                                            setTimeout(() => {
                                                this.guestInput.setFocus();
                                            }, 200)
                                        });
                                    }, 500);
                                } else {
                                    this.navCtrl.setRoot(TabsPage, { reservation: r.reservations });
                                    setTimeout(() => {
                                        this.guestInput.setFocus();
                                    }, 200)
                                }
    
                            })
                        });
                    });
                }, error => {
    
                });
            
            
        });
    }
}
