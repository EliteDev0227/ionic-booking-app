import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TranslateService } from '@ngx-translate/core';

import { AlertController } from 'ionic-angular';
import { STORE } from './app-settings';
import { Account } from '../models/account';
import { Beach } from '../models/beach';
import { CommonProvider } from '../providers/common/common';
import { environment } from '../environment/environment';
@Injectable()
export class AppService {
    public baseURL = environment.baseURL;
    private account: Account = null;
    public loggedin = false;
    private beach: Beach = {
        id: null,
        settings: {}
    };
    private lang: string = 'en';
    public notifications = [];

    public languageNotify: EventEmitter<string> = new EventEmitter<string>();
    public orderNotify: EventEmitter<any> = new EventEmitter<any>();
    fcmToken: string;

    constructor(
        private http: Http,
        public translate: TranslateService,
        private alert: AlertController,
        private common: CommonProvider
    ) {
        this.init();
    }
    async init() {
        try {
            const lang = await this.common.getStorageItem(STORE.USER.LANG)
            this.lang = lang || 'en';
            this.languageNotify.emit(lang);
        } catch (error) {
            this.lang = 'en';
        }
        this.translate.use(this.lang);
        try {
            let account = await this.common.getStorageItem(STORE.USER.ACCOUNT);
            this.account = account;
        } catch (error) {
        }
    }
    setAccount(user: Account) {
        return this.common.setStorageItem(STORE.USER.ACCOUNT, user)
            .then(() => {
                this.account = Object.assign({}, user);
            })
    }
    getAccount(): Account {
        return Object.assign({}, this.account);
    }
    removeAccount() {
        this.account = null;
    }
    async getBeach(): Promise<Beach> {
        if (this.beach.id) return this.beach;
        const beach_id = this.account.beach_id;
        this.beach = await this.get(`beach/${beach_id}`);
        return this.beach;
    }
    setBeach(beach: any) {
        this.beach = beach;
    }
    getLang() {
        return this.lang;
    }
    setLang(lang) {
        this.lang = lang;
        this.translate.use(lang);
        this.languageNotify.emit(lang);
        this.common.setStorageItem(STORE.USER.LANG, lang);
    }
    fullURL(url) {
        return `${this.baseURL}${url}?lang=${this.getLang()}`;
    }
    post(url: string, body: any) {
        Object.keys(body).forEach(key => {
            if (body[key] === "" || body[key] === undefined || body[key] === null) {
                delete body[key]
            }
        })
        var headers = new Headers({
            "x-token": this.account ? this.account.token : undefined
        });
        return this.http.post(this.fullURL(url), body, { headers }).toPromise()
            .then(res => res.json())
            .catch(error => {
                if (error.status === 0) {
                    this.reachServerError();
                    throw null;
                } else {
                    throw JSON.parse(error._body);
                }
            })
    };

    multipart(url: string, body: FormData) {
        var headers = new Headers({
            "x-token": this.account ? this.account.token : undefined,
            'Content-Type': 'multipart/form-data',
        });
        return this.http.post(this.fullURL(url), body, { headers }).toPromise()
            .then(res => res.json())
            .catch(error => {
                if (error.status === 0) {
                    this.reachServerError();
                    throw null;
                } else {
                    throw JSON.parse(error._body);
                }
            })
    };
    get(url: string) {
        var headers = new Headers({
            "x-token": this.account ? this.account.token : undefined,
        })
        return this.http.get(this.fullURL(url), { headers }).toPromise()
            .then(res => res.json())
            .catch(error => {
                if (error.status === 0) {
                    this.reachServerError();
                    throw null;
                } else {
                    throw JSON.parse(error._body);
                }
            })
    }
    delete(url: string) {
        var headers = new Headers({
            "x-token": this.account ? this.account.token : undefined,
        })
        return this.http.delete(this.fullURL(url), { headers }).toPromise()
            .then(res => res.json())
            .catch(error => {
                if (error.status === 0) {
                    this.reachServerError();
                    throw null;
                } else {
                    throw JSON.parse(error._body);
                }
            })
    }

    private opendServerError: boolean = false;
    async reachServerError() {
        if (this.opendServerError) return;
        this.opendServerError = true;
        const title = await this.translate.get('LABELS.ERROR').toPromise();
        const closeLabel = await this.translate.get('ACTIONS.CLOSE').toPromise();
        const message = await this.translate.get('MESSAGES.REACH_SERVER_ERROR').toPromise();
        const alert = this.alert.create({
            title: title,
            message: message,
            buttons: [
                {
                    text: closeLabel,
                    role: 'cancel',
                    handler: () => {
                        this.opendServerError = false;
                    }
                }
            ]
        })
        alert.present();
    }
    async errorHandler(error) {
        if (error === null) return;
        try {
            const title = await this.translate.get('LABELS.ERROR').toPromise();
            const closeLabel = await this.translate.get('ACTIONS.CLOSE').toPromise();
            const alert = this.alert.create({
                title: title,
                message: error.message,
                buttons: [
                    {
                        text: closeLabel,
                        role: 'cancel'
                    }
                ]
            })
            alert.present();
        } catch (error) {
        }
    }
    addNotification(order_id) {
        if (this.notifications.indexOf(order_id) < 0) {
            this.notifications.push(order_id);
        }
    }
    removeNotification(order_id) {
        const pos = this.notifications.indexOf(order_id);
        if (pos > -1) {
            this.notifications.splice(pos, 1);
        }
    }
}