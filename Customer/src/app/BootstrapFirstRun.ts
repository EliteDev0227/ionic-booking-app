/**
 * Created by shadow-viper on 1/2/18.
 */
import { Storage } from "@ionic/storage";
import * as store from "./storageKey.json";
import { Injectable, OnInit } from "@angular/core";
import { ApiProvider } from "../pages/providers/services";
import { translateServices } from "../pages/providers/translateServices";
import { DeviceInfo } from "./deviceInfoType";
import * as smsConfig from "./sms-watch.json";

@Injectable()
export class CustomBootstrap {
  public countries: any;
  public places: any;
  public storedLang: any;
  public timeoutInstance: any = [];
  public beach_settings: any;
  public currency: string = "";

  public deviceInfo: DeviceInfo;
  // public hasLocationAccess: boolean = false;
  private pages: any = [];
  constructor(
    public storage: Storage,
    public apiData: ApiProvider,
    public translate: translateServices
  ) {}

  private populateCountries() {
    return new Promise((resolve, reject) => {
      this.apiData.get("countries", {}, {}, true).subscribe(
        r => {
          let arrangedCountry = this.changeToLower(r, "code");
          this.setStorage("country", arrangedCountry);
          resolve(arrangedCountry);
        },
        error => {
          reject(error);
        }
      );
    });
  }
  private populateBeachSettings() {
    return new Promise((resolve, reject) => {
      this.apiData.get("beach-settings", {}, {}, true).subscribe(
        r => {
         
          this.setStorage("beach_settings", r);
          resolve(r);
        },
        error => {
          reject(error);
        }
      );
      // return this.getStorage('beach_settings').then((a) => {
      //   if (a && a.length) {
      //   resolve(a);
      //   } else {
      //   this.apiData.get('beach-settings', {}, {},true).subscribe(r => {
      //     this.setStorage('beach_settings',r);
      //     resolve(r);
      //   },error=>{
      //     reject(error);
      //   })
      //   }
      // }, (error) => {
      //   reject(error);
      // })
    });
  }

  private lang(countries: any) {
    return new Promise((resolve, reject) => {
      this.apiData.get("languages", {}, {}, true).subscribe(
        r => {
          let lang = this.availableLang(countries, "code", r);
          this.setStorage("lang", lang);
          resolve(lang);
        },
        error => {
          reject(error);
        }
      );

      // return this.getStorage('lang').then((a) => {
      //   if (a && a.length) {
      //   resolve(a);
      //   } else {
      //   this.apiData.get('languages', {}, {},true).subscribe(r => {
      //     let lang=this.availableLang(countries,'code',r);
      //     this.setStorage('lang', lang);
      //     resolve(lang);
      //   },error=>{
      //     reject(error);
      //   });
      //   }
      // }, (error) => {
      //   reject(error);
      // })
    });
  }
  private place() {
    return new Promise((resolve, reject) => {
      this.apiData.get("places", {}, {}, true).subscribe(
        r => {
          this.setStorage("places", r);
          resolve(r);
        },
        error => {
          reject(error);
        }
      );

      // this.getStorage('places').then((a)=>{
      //   if(a && a.length){
      //   resolve(a);
      //   }else{
      //   this.apiData.get('places',{},{},true).subscribe(r=>{
      //     this.setStorage('places',r);
      //     resolve(r);
      //   },error=>{
      //     reject(error);
      //   })
      //   }
      // },(error)=>{
      //   console.error(error)
      // })
    });
  }

  private changeToLower(countries: any, column: string) {
    for (let i in countries) {
      if (countries.hasOwnProperty(i)) {
        countries[i][column] = countries[i][column].toLowerCase();
      }
    }
    return countries;
  }

  private availableLang(countries: any, column: string, check: Array<string>) {
    let language = [];
    for (let i in countries) {
      if (countries.hasOwnProperty(i)) {
        if (check.indexOf(countries[i][column].toLowerCase()) > -1) {
          language.push(countries[i]);
        } else if (countries[i][column].toLowerCase() == "gb") {
          countries[i][column] = "en";
          language.push(countries[i]);
        }
      }
    }
    return language;
  }

  Load(): Promise<any> {
    this.translate.setLanguageProvider("ro");
    return new Promise((resolve, reject) => {
      return this.populateCountries().then(
        r => {
          return this.lang(r).then(
            (l: any) => {
              this.storedLang = l;
                  this.countries = r;
                  
                  
                  resolve({
                    country: r,
                    language: l,
                 
                  });
            },
            error => {
              reject(error);
            }
          );
        },
        error => {
          reject(error);
        }
      );
    });
  }
  storedCountry() {
    return this.countries;
  }

  storedLanguage() {
    return this.storedLang;
  }
  storageKeys() {
    return store;
  }

  removeKeys(key) {
    return this.storage.ready().then(() => {
      this.storage.remove(this.storageKeys()[key]);
    });
  }

  setStorage(key: string, value: any): Promise<any> {
    return this.storage.ready().then(() => {
      return this.storage.set(this.storageKeys()[key], value);
    });
  }

  getStorage(key: string): Promise<any> {
    return this.storage.ready().then(() => {
      return this.storage.get(this.storageKeys()[key]);
    });
  }

  clearStorage(): Promise<any> {
    return this.storage.clear();
  }
   SMSconfig() {
     return smsConfig;
   }

  getTimeout() {
    return this.timeoutInstance;
  }

  canRequestPool(page: string): boolean {
    if (this.pages && this.pages[this.pages.length - 1] == page) {
      return true;
    }
  }

  setRequestPage(page: string): void {
    if (page) {
      this.pages.push(page);
    }
  }

  setTimeout(value: any) {
    this.timeoutInstance.push(value);
  }

  ClearTimeout() {
    if (this.timeoutInstance && Array.isArray(this.timeoutInstance)) {
      for (let i in this.timeoutInstance) {
        try {
          console.warn(this.timeoutInstance);
          clearTimeout(this.timeoutInstance[i]);
          this.pages = [];
        } catch (e) {
          console.error(e);
        }
      }
      this.timeoutInstance = [];
    }
  }

  setDeviseInfo (infoObj) {
    this.deviceInfo = infoObj;
  }

  getDeviseInfo () {
    return new Promise((resolve, reject) => {
      let devceInf:DeviceInfo  = this.deviceInfo;
      resolve(devceInf);
    });
  }
}
