import {Component, OnInit, ViewChild} from "@angular/core";
import {NavController, NavParams, PopoverController, ViewController} from "ionic-angular";
import {TabsPage} from "../tabs/tabs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiProvider} from "../providers/services";
import {CustomBootstrap} from "../../app/BootstrapFirstRun";
import {Tools} from "../providers/tools";
import {LoginPage} from "../login/login";
import {confirmVerification} from "../includes/confirmVerification/confirmVerification";
/**
 * Created by shadow-viper on 12/20/17.
 */

//declare var OTPAutoVerification:any;

@Component({
  selector:'verification',
  templateUrl:'verification.html'
})

export class verification implements OnInit{
  @ViewChild('input1') v1;
  @ViewChild('input2') v2;
  @ViewChild('input3') v3;
  @ViewChild('input4') v4;
  timer:any=[
    3, 5, 15, 30, 60
  ];
  mobile:string;
  validation_id:string;
  codeCounter:any;
  timerStart:number=0;
  requestPage:string='verificationPage';
  counterInstance:any;
  verificationCode:any;
  phoneData ;
  constructor(public popoverCtrl:PopoverController,public navCtrl:NavController,public navparam:NavParams,public viewCtrl:ViewController,public api:ApiProvider,public configuration:CustomBootstrap,public tools:Tools){
    this.verificationCode=new FormGroup({
      v1:new FormControl('',[Validators.required,Validators.maxLength(1)]),
      v2:new FormControl('',[Validators.required,Validators.maxLength(1)]),
      v3:new FormControl('',[Validators.required,Validators.maxLength(1)]),
      v4:new FormControl('',[Validators.required,Validators.maxLength(1)])
    });
    this.counterInstance=false;

    this.mobile= this.navparam.get('mobile');
   this.configuration.getStorage('smsValidation').then(a=>{
     if(a){
        this.validation_id=a.uuid;
     }
       
   })
   this.configuration.getStorage('phoneData').then(dt=>{
    if(dt){
      console.log("1234-vier",dt);
       this.phoneData=dt;
    }
      
  })

  }
  ionViewWillEnter(){
   
    this.configuration.setRequestPage(this.requestPage);
  }

  ngOnInit(){
    this.codeCounter={
      diff:0,
      s:0,
      m:0,
      d:0,
      M:0
    };
    this.startCounter(this.timer[this.timerStart])
  }
  finishVerification(){
    if(this.verificationCode.valid){
      let verifString='';
      for(let i in this.verificationCode.value){
        if(this.verificationCode.value.hasOwnProperty(i)){
          if(this.verificationCode.value[i]!=null && this.verificationCode.value){
            verifString+=this.verificationCode.value[i];
          }
        }
      }
      this.api.post('verify-sms-pin',{pin:verifString,phone:this.phoneData.phone,prefix:this.phoneData.prefix,suffix:this.phoneData.suffix},{'Content-Type':'application/json'}).subscribe(r=>{
        if(this.navparam.data.user && this.navparam.data.user.name){
          this.doLogin(this.phoneData.phone,this.navparam.data.user.password, this.navparam.data.user.lang);
        }else{
          this.navCtrl.push(this.navparam.get('page'),{mobile:this.phoneData.phone});
          this.stopTimer();
          this.configuration.getStorage('AdditionalRegData').then(a=>{
            if(a && a.complete){
              a.canUse=true;
              this.configuration.setStorage('AdditionalRegData',a).then(a=>{
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
            }
          })
        }


      },error=>{
        
      });
    }
  }
  setfocus(event){
    event.preventDefault();
    if (event.keyCode === 8 || event.key === 'Backspace' || event.keyCode === 46 || event.key === 'Delete') {
      for(let i =Object.keys(this.verificationCode.value).length; i>=0; i--){
        if(Object.keys(this.verificationCode.value).hasOwnProperty(i)){
          if(this.verificationCode.value[Object.keys(this.verificationCode.value)[i]] && this.verificationCode.value[Object.keys(this.verificationCode.value)[i]]!=''){
            this.verificationCode.controls[Object.keys(this.verificationCode.value)[i]].setValue('');
            this[Object.keys(this.verificationCode.value)[i]].setFocus();
           break;
          }
        }
      }
      return;
    }else{
      for(let i in this.verificationCode.value){
        if(this.verificationCode.value.hasOwnProperty(i)){
          if(!this.verificationCode.value[i] && !(!isNaN(parseFloat(this.verificationCode.value[i])) && isFinite(this.verificationCode.value[i]))){
            this[i].setFocus();
            return;
          }
        }
      }
  }

    this.finishVerification();
  }

  stopTimer(){
    if(this.counterInstance){
      clearInterval(this.counterInstance);
      this.counterInstance=false;
    }

  }

  startCounter(startMin:number){
    if(startMin){
      startMin=(startMin*60);
      if(!this.counterInstance){
        this.counterInstance=setInterval(()=>{
          if(startMin>0){
            startMin--;
          }
          if(startMin<=0){
            this.stopTimer();
          }
          this.codeCounter=this.tools.GetDateDiv(startMin);
        },1000)
        this.timerStart+=1;
      }
    }else{
      this.codeCounter='';
    }

  }

  transformToString(startMin:number){
    return startMin.toString().length<2?'0'+startMin:startMin.toString();
  }

  didntRecieve(){

    this.api.post('request-validation',this.phoneData,{'Content-Type':'application/json'}).subscribe(r=>{
      //this.validation_id=r.id;
     // this.configuration.setStorage('smsValidation',r);
      this.startCounter(this.timer[this.timerStart])
    },error=>{
      
    })
  }

  ngDestroy(){
    this.stopTimer();
  }


  updateDevice() {
    this.configuration.getStorage('deviceInfo').then(r => {
      if (r && r.model) {
        this.api.post('device',{model:r.model,platform:r.platform,version:r.version,manufacturer:r.manufacturer},{'Content-Type':'application/json'}).subscribe(r=>{
          
        },error=>{
          
        })

      }
    })
  }

/*  watchSms(otp:any){
   this.stopWatchSMS();
    if(otp && otp>0){
      let otpAr:Array<any>=otp.split('');
      for(let i =0; i<otpAr.length; i++){
        if(otpAr.hasOwnProperty(i)){
          this.verificationCode.controls['v'+(i+1)].setValue(otpAr[i]);
        }
      }
      this.finishVerification();
    }
  }


  stopWatchSMS() {
 /!*   OTPAutoVerification.stopOTPListener();

  }*/


  doLogin(username:string,password:string, lang: string) {
      this.api.post('login',{phone:username,password:password},{'Content-Type':'application/json'}).subscribe(r=>{
        if(r.validated){
          if(lang){
            r.lang = lang;
          }
         
          this.configuration.setStorage('login',r);
          this.stopTimer();
          this.configuration.getStorage('AdditionalRegData').then(a=>{
            a.canUse = true;
            this.configuration.setStorage('UserPhoneInfo',a).then(reg =>{
              if(a && a.complete){
                a.canUse=true;
                this.configuration.setStorage('AdditionalRegData',a).then(a=>{
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
              }
            });
          });
          this.navCtrl.setRoot(TabsPage)
        }else {
          this.api.AmError(this.configuration.translate.translate.instant("NOT_VALIDATED"),this.configuration.translate.translate.instant("PLEASE_VALIDATE_YOUR_ACCOUNT"),[{text:this.configuration.translate.translate.instant("VALIDATE"),handler:()=>{
            let popoverSignup=this.popoverCtrl.create(confirmVerification,{page:verification,next:LoginPage,process:{fn:'SignupVerification',data:username}});
            popoverSignup.present();
          }}]);
        }

      },error=>{
        
      })
    }
}
