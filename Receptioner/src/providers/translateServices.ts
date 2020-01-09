/**
 * Created by shadow-viper on 1/8/18.
 */


import {Injectable} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import { CommonProvider } from "./common/common";
// import {Observable} from "rxjs/Observable";
@Injectable()
export class translateServices{

  private readonly defaultLanguage:string='en';
  public currentLanguage:string;
  constructor(public translate:TranslateService, private common: CommonProvider){
    this.translate.setDefaultLang(this.defaultLanguage);
    this.currentLanguage = this.common.getStorageItem('lang') || this.defaultLanguage;
    this.translate.use(this.currentLanguage);
  }


  setLanguageProvider(lang:string,navCtrl?:any,page?:string){
    this.translate.use(lang);
    this.currentLanguage=lang;
    this.translate.resetLang(lang);
    this.translate.reloadLang(lang).subscribe(()=>{
      this.common.setStorageItem('lang', lang);
    });
  }


  getLanguage(name:string) {
    return this.translate.get(name);
  }
}
