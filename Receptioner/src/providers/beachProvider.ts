import {Injectable} from "@angular/core";
/**
 * Created by shadow-viper on 1/21/18.
 */

@Injectable()
export class BeachProvider{
  sunbed:{
    selected:number,
    values:Array<any>

  }={
    selected:0,
    values:[]
  };

  getPrice(beach_settings:any,type:string,location:string,search:any):number{

    if(type=='sunbed' && beach_settings.seats_price)
      return beach_settings.seats_price[type][this.isWeekend()?'weekend':'daily'];
    if(beach_settings && beach_settings.seats_price[location] && beach_settings.seats_price[location][type]){
      return this.searchDate(search,beach_settings.seats_price[location][type].periods)
    }
  }

  private searchDate(search:any,settings:any){
    let s:any={
        start:search && search.start_date?new Date(search.start_date):new Date(),
        end:search && search.end_date?new Date(search.end_date):new Date()
      }
     for(let i in settings){
      if(settings.hasOwnProperty(i)){
        if(new Date(settings[i].start)<=s.start){
          return this.isWeekend()?settings[i].weekend:settings[i].daily
        }
      }
     }
  }

  private isWeekend():boolean{
    let date=new Date()
    return date.getDay()==6 || date.getDay()==0
  }
}
