/**
 * Created by shadow-viper on 12/18/17.
 */


import {Component} from "@angular/core";
import {NavController, PopoverController} from "ionic-angular";
import {newPassword} from "../newpassword/newPassword";
import {verification} from "../verification/verification";
import {confirmVerification} from "../includes/confirmVerification/confirmVerification";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomBootstrap} from "../../app/BootstrapFirstRun";

@Component({
  selector:'resetPassword',
  templateUrl:'resetPassword.html'
})


export class resetPassword{
  PICTURE_RATIO = 1659/1200;
  shouldTop = document.body.clientHeight - document.body.clientWidth * this.PICTURE_RATIO + 'px';
  resetData:any;
  toggleLanguage:number;
  requestPage:string='ResetPassword';
  rand:number;
  constructor(public configuration:CustomBootstrap,public navCtrl:NavController,public popoverCtrl:PopoverController,public misc:CustomBootstrap){
    this.resetData=new FormGroup({
      phone:new FormControl('',[Validators.required,Validators.minLength(8)]),
      prefix:new FormControl('',[Validators.required,Validators.minLength(1)]),
      suffix:new FormControl('',[Validators.required,Validators.minLength(1)]),
    });
    this.rand=Math.random();
    this.misc.getStorage('AdditionalRegData').then(a=>{
      if(a && a.complete && a.complete.length>6)
        this.updatePhone(a);
    })
  }

  //TODO: Implement auth
  doForgetPass() {
    if(this.resetData.valid)
       this.popoverCtrl.create(confirmVerification,{page:verification,next:newPassword,process:{fn:'reset',data:this.resetData.value}}).present();
  }

  ionViewWillEnter(){
    this.configuration.setRequestPage(this.requestPage);
  }


  updatePhone(event:any){
    if(event && event.complete.length>=1){
      this.resetData.controls['phone'].setValue(event.complete);
      this.resetData.controls['prefix'].setValue(event.prefix);
      this.resetData.controls['suffix'].setValue(event.suffix);
      this.misc.setStorage('AdditionalRegData',event).then(a=>{
        this.toggleLanguage=Math.random();
      },error=>{

      });

    }
  }


}
