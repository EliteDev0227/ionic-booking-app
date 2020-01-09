/**
 * Created by shadow-viper on 1/2/18.
 */
import {Storage} from '@ionic/storage';
import * as store from './storageKey.json';
import {Injectable, OnInit} from "@angular/core";
import {translateServices} from "../providers/translateServices";
import * as smsConfig from './sms-watch.json';
import { ApiProvider } from '../providers/services';
import * as Countries from './countries.json';

@Injectable()
export class CustomBootstrap implements OnInit {
  public countries:any;
  public places:any;
  public storedLang:any;
  public timeoutInstance:any=[];
  public beach_settings:any;
  pageName:string;
  private pages:any=[];
  constructor(public storage:Storage,public apiData:ApiProvider,public translate:translateServices){
    this.countries = Countries;
  }
  ngOnInit(){
  }

  private populateCountries(){
    return new Promise((resolve,reject)=> {
      return this.getStorage('country').then((a) => {
        if (a && a.length) {
          resolve(a);
        } else {
          this.setStorage('country', this.countries);
          resolve(this.countries);
        }
      }, (error) => {
        reject(error);
      })
    })
  }
  public populateBeachSettings(beach_id:string){
    return new Promise((resolve,reject)=> {
      return this.getStorage(`beach_settings`).then((a) => {
        if (a && a.length < 1) {
          resolve(a);
        } else {
          this.apiData.get(`beach-settings/${beach_id}`, {}, {}, true, true).subscribe(r => {
            this.setStorage('beach_settings',r);
            resolve(r);
          },error=>{
            reject(error);
          })
        }
      }, (error) => {
        reject(error);
      })
    })
  }

  private lang(countries:any){
    return new Promise((resolve,reject)=> {
      return this.getStorage('lang').then((a) => {
        if (a && a.length) {
          resolve(a);
        } else {
          this.apiData.get('languages', {}, {},true).subscribe(r => {
            let lang=this.availableLang(countries,'code',r);
            this.setStorage('lang', lang);
            resolve(lang);
          },error=>{
            reject(error);
          })
        }
      }, (error) => {
        reject(error);
      })
    })
  }

  private availableLang(countries:any,column:string,check:Array<string>){
    let language=[];
    for(let i in countries){
      if(countries.hasOwnProperty(i)){
        if(check.indexOf(i.toLowerCase())>-1){
          countries[i][column]=i.toLowerCase();
          language.push(countries[i]);
        }else if(i.toLowerCase()=='gb'){
          countries[i][column]='en';
          language.push(countries[i])
        }
      }
    }
    return language;
  }

  Load():Promise<any>{
    this.translate.setLanguageProvider('en');
    return new Promise((resolve,reject)=> {
      return this.populateCountries().then(r => {
        return this.lang(r).then((l: any) => {
          this.storedLang = l;
          this.countries = r;
          resolve({country: r, language: l});
        }, error => {
          reject(error);
        })
      },error=>{
        reject(error);
      })
    });
  }
  storedCountry(){
    return this.countries;
  }

  storedLanguage(){
    return this.storedLang;
  }
  storageKeys(){
    return store;
  }

  removeKeys(key){
    this.storage.remove(this.storageKeys()[key]);
  }
  setStorage(key:string,value:any):Promise<any>{
    return this.storage.set(this.storageKeys()[key],value);
  }

  getStorage(key:string):Promise<any>{
    return this.storage.get(this.storageKeys()[key]);
  }

  clearStorage() {
    return this.storage.clear();
  }

  SMSconfig(){
    return smsConfig
  }

  getTimeout(){
    return this.timeoutInstance;
  }

  canRequestPool(page:string):boolean{
    if(this.pages && this.pages[this.pages.length-1]==page){
      return true;
    }
  }

  setRequestPage(page:string):void{
    if(page){
      this.pages.push(page);
    }
  }

  setTimeout(value:any){
    this.timeoutInstance.push(value);
  }

  ClearTimeout(){
    if(this.timeoutInstance && Array.isArray(this.timeoutInstance)){
      for(let i in this.timeoutInstance){
        try{
          console.warn(this.timeoutInstance)
          clearTimeout(this.timeoutInstance[i])
          this.pages=[];
        }catch(e){
          console.error(e);
        }
      }
      this.timeoutInstance=[];
    }
  }

  setPage(value:string) {
    this.pageName = value;
  }

  getPage():string{
    return this.pageName;
  }
}
