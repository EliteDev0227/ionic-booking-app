/**
 * Created by shadow-viper on 1/8/18.
 */


import {Injectable} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class translateServices{

  private readonly defaultLanguage:string='ro';
  public currentLanguage:string = 'ro';
  constructor(public translate:TranslateService){
    this.translate.setDefaultLang(this.defaultLanguage);
  }


  setLanguageProvider(lang:string,navCtrl?:any,page?:string){

    this.translate.use(lang);
    this.currentLanguage=lang;
    this.translate.resetLang(lang);
    this.translate.reloadLang(lang).subscribe(()=>{
     /* if(navCtrl){
        if(page){
          if(page=='signup')
            navCtrl.setRoot(SignupPage);
          else
            navCtrl.setRoot(LoginPage)
        }else{
          navCtrl.setRoot(SignupPage)
        }

      }*/
    });
  }


  getLanguage(name:string) {
    return this.translate.get(name);
  }
}
