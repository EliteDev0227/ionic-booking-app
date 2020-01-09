import { Injectable } from '@angular/core';

@Injectable()
export class CommonProvider {

    constructor() {}
    
    setStorageItem (key_str : string, value : any) {
        localStorage.setItem(key_str, value);
    }

    getStorageItem (key_str : string) {
        return localStorage.getItem(key_str);
    }


}
