import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';

/*
  Generated class for the CommonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonProvider {

    constructor(public http: HttpClient, private storage: Storage) {
        
    }

    setStorageItem (key_str : string, value : any): Promise<any> {
        return this.storage.set(key_str, value);
    }

    getStorageItem (key_str : string): Promise<any> {
        return this.storage.get(key_str);
    }

    clearStorage () {
        return this.storage.clear();
    }
}
