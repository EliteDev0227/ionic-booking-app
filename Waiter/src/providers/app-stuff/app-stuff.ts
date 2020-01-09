import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AppStuffProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppStuffProvider {

    constructor(public http: HttpClient) {
        
    }

}

@Injectable()
export class TabStateService {
    public states: { [s: string]: any } = {};

    setState(tab: string, enabled: boolean) {
        this.states[tab] = enabled;
    }
}