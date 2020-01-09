import { Injectable } from '@angular/core';

// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
import { AppService } from './app.service';
import { CommonProvider } from '../providers/common/common';

@Injectable()
export class UserService {

    constructor(
        private appService: AppService,
        private common: CommonProvider
    ) { }

    async unlockCode(unlock_code) {
        const beach = await this.appService.getBeach();
        return await this.appService.post('unlock', {
            beach_id: beach.id,
            unlock_code
        });
    }

    async register({ password, password2 }) {
        const beach = await this.appService.getBeach();
        const waiter = this.appService.getAccount();
        return await this.appService.post('register', {
            beach_id: beach.id,
            waiter_id: waiter.id,
            password,
            password2
        });
    }

    async fcm_register() {

        if (this.appService.fcmToken) {
            return await this.appService.get(`fcm/${this.appService.fcmToken}`);
        } else {
            return null;
        }
    }
    login(loginObj): Promise<any> {
        return this.appService.post('login', loginObj)
    }
    async logout() {
        try{
            await this.appService.get(`fcm/${this.appService.fcmToken}/remove`);
        } catch (error) {
        }
        try{
            await this.common.clearStorage();
        } catch (error) {
        }
        this.appService.loggedin = false;
        this.appService.removeAccount();
    }
}