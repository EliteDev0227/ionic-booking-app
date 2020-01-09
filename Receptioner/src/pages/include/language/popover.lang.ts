 /**
 * Created by shadow-viper on 12/16/17.
 */


import {Component, OnInit} from "@angular/core";
import {NavController, NavParams, ViewController} from "ionic-angular";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {CustomBootstrap} from "../../../app/BootstrapFirstRun";
@Component({
  selector:'popover_lang',
  templateUrl:'popover.lang.html'
})
export class PopoverLang implements OnInit{
  languages:any;
  infiniteCount:number;
  langAbbr: BehaviorSubject<string>;
  selected:any;
  constructor(public viewCtrl:ViewController,public navparam:NavParams,public configuration:CustomBootstrap,public navCtrl:NavController){}
  ngOnInit(){
    this.languages=[];
    this.selected={};
    this.infiniteCount=30;
    this.languages=this.configuration.storedLanguage();
    this.langAbbr=this.navparam.data.parentSubject;
    this.select(this.navparam.get('language'))
  }

  select(item:any,external?:boolean):void{
    if(item){
      if(item.code){
        this.storeLanguage(item);
        this.selected=item.code;
        this.langAbbr.next(item.code);

      }else{
        this.selected=item;
        this.langAbbr.next(item);
      }
      if(external){
        this.configuration.translate.setLanguageProvider(item.code,this.navCtrl,this.navparam.get('page'));

        this.viewCtrl.dismiss();

      }
    }
  }

  more(infiniteScroll) {
    setTimeout(() => {
      if(this.languages.length){
        this.infiniteCount+=30;
        infiniteScroll.complete();
        if(this.infiniteCount>=this.languages.length){
          infiniteScroll.enable(false);
          this.infiniteCount=this.languages.length;
        }
      }
    }, 300);
  }

  sort(array:Array<any>){
    array.sort((a: any, b: any) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }


  storeLanguage(selected:any){
    this.configuration.getStorage('AdditionalRegData').then(a=>{
      let lang:any={};
      if(selected && selected.code){
       lang=selected;
       lang.lang=selected.code;
      }else{
        lang=a;
      }
      console.log(lang);
      this.configuration.setStorage('AdditionalRegData',lang);
    })
  }
}
