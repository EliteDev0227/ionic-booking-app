




import {Injectable} from "@angular/core";
import {Geolocation} from '@ionic-native/geolocation'
@Injectable()
export class Geo {
  constructor(public geolocation:Geolocation){}
  public deviceGeolocation(): Promise<any> {
    return this.geolocation.getCurrentPosition({timeout:30000});
  }
}
