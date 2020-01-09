import {Observable} from "rxjs/Observable";
/**
 * Created by shadow-viper on 1/3/18.
 */


export interface ApiInterface{
  post:(url:string,body:any,headers:any)=>Observable<any>;
  get:(url:string,params:any,headers)=>Observable<any>;
  AmBusy:(text:string)=>void;
  AmError:(title:string,text:string,button:any)=>void;
  multipart:(url:string,body:FormData,headers:any)=>Observable<any>;
  initializeToken:()=>void;
}
