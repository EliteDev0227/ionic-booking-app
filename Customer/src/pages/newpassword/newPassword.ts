/**
 * Created by shadow-viper on 12/18/17.
 */


import {Component} from "@angular/core";
import {Events, NavController, NavParams, PopoverController} from "ionic-angular";

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiProvider} from "../providers/services";
import {CustomBootstrap} from "../../app/BootstrapFirstRun";
import {TabsPage} from "../tabs/tabs";
import {resetPassword} from "../resetPassword/resetPassword";

@Component({
  selector:'newPassword',
  templateUrl:'newPassword.html'
})


export class newPassword{
  PICTURE_RATIO = 1659/1200;
  newPassword:any;
  requestPage:string='NewPassword';
  shouldTop = document.body.clientHeight - document.body.clientWidth * this.PICTURE_RATIO + 'px'

  constructor(public navCtrl:NavController,public popoverCtrl:PopoverController,public api:ApiProvider,public navparam:NavParams,public configuration:CustomBootstrap,public events:Events){
    this.newPassword=new FormGroup({
      password:new FormControl('',[Validators.required,Validators.minLength(6)]),
      password2:new FormControl('',[Validators.required,Validators.minLength(6)])
    })
  }

  //TODO: Implement auth
  doForgetPass() {
    if(this.newPassword.valid && (this.newPassword.value.password===this.newPassword.value.password2) && this.navparam.get('mobile')){
      this.newPassword.value.phone=this.navparam.get('mobile');
      this.api.post('reset-password',this.newPassword.value,{'Content-Type':'application/json'}).subscribe(r=>{
        this.configuration.setStorage('login',r);
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
        // this.navCtrl.push(TabsPage)
      },error=>{
    
      })
    }
  }
  ionViewWillEnter(){
    
    this.configuration.setRequestPage(this.requestPage);
  }


  resetPassword(){
    this.navCtrl.push(resetPassword)
  }
}
