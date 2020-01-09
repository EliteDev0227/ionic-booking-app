/**
 * Created by shadow-viper on 1/2/18.
 */


import {Injectable} from "@angular/core";
@Injectable()
export class Tools{
  keyString:string;
  delayInstance:any;
  constructor(){
    this.keyString='';
  }

  //breakMobile number to the required format
  breakTelephone(code:string,suffix:string) {

    if (code && suffix) {
      let TelString = "+("+code+")";
      this.keyString=suffix;
      let ArData = this.keyString?this.keyString.split(''):[];
      let counter = 0;
      for (let i = 0; i < ArData.length; i++) {
        if (counter == 3) {
          counter = 0;
          TelString += ' '
        }
        counter++;
        TelString += ArData[i];
      }
      return TelString;
    }
  }

  GetDateDiv(diff:number){
    return isNaN(diff) ? NaN : {
      diff: diff,
      s: Math.floor((diff) % 60),
      m: Math.floor((diff) / 60) % 60,
      h: Math.floor((diff) / 3600) % 24,
      d: Math.floor((diff) / 86400 ),
      M: Math.floor((diff) / 2592000) %30
    };
  }

  delay=(callback:()=>any,seconds:number):any=>{
    if(!this.delayInstance){
      this.delayInstance=setTimeout(()=>{
        callback();
        clearTimeout(this.delayInstance);
        this.delayInstance=false;
      },seconds);
    }
  };


}
