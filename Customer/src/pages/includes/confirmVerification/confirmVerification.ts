import {Component} from "@angular/core";
import {NavController, NavParams, ViewController} from "ionic-angular";
import {ApiProvider} from "../../providers/services";
import {CustomBootstrap} from "../../../app/BootstrapFirstRun";
/**
 * Created by shadow-viper on 12/31/17.
 */



@Component({
  selector:'confirmVerification',
  templateUrl:'confirmVerification.html'
})

export class confirmVerification{
  constructor(public navCtrl:NavController,public viewCtrl:ViewController,public navparam:NavParams,public api:ApiProvider,public configuration:CustomBootstrap){}

  gotoVerification(){
    
    if(this.navparam.get('process')){
      console.log("123",this.navparam.get('process'));
        this[this.navparam.get('process').fn](this.navparam.get('process').data,(phoneDt:{
          "phone": string,
          "prefix" : string,
          "suffix" : string
        })=>{
          
        this.navCtrl.push(this.navparam.get('page'),{page:this.navparam.get('next'),mobile:phoneDt.phone,prefix:phoneDt.prefix,suffix:phoneDt.suffix,user:this.navparam.data.userData});
      });
      return;
    }
    this.navCtrl.push(this.navparam.get('page'),{page:this.navparam.get('next')});
  }
  close(accept:boolean){
    this.viewCtrl.dismiss(accept);
  }

  reset(data:{
    "phone": string,
    "prefix" : string,
    "suffix" : string
  },successCallback:(data:{
    "phone": string,
    "prefix" : string,
    "suffix" : string
  })=>any){
    data.phone=data.phone.replace(')','').replace('(','').replace(/\s/g,'');
    this.api.post('forgot',data,{'Content-Type':'application/json'}).subscribe(r=>{
      this.sendVerification(data,successCallback);
      // }}])
    },error=>{
      
      this.close(false);
    })
  }
  
  sendVerification(data:{
    "phone": string,
    "prefix" : string,
    "suffix" : string
  },successCallback:(data:{
    "phone": string,
    "prefix" : string,
    "suffix" : string
  })=>any){
    this.api.post('request-validation',data,{'Content-Type':'application/json'}).subscribe(r=>{
      console.log("1234",r);
      this.configuration.setStorage("phoneData",data);
      this.configuration.setStorage('smsValidation',r);
      successCallback(data);
      this.close(true);

    },error=>{
      
    })
  }

  SignupVerification(data:{
    "phone": string,
    "prefix" : string,
    "suffix" : string
  },successCallback:(data:{
    "phone": string,
    "prefix" : string,
    "suffix" : string
  })=>any){
  
    this.sendVerification(data,successCallback)
  }
}
