import { Injectable, OnInit } from "@angular/core";
import { ApiInterface } from "./ApiProvider";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { AlertController, LoadingController, Platform } from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";
import { Storage } from "@ionic/storage";
import { STORE } from "../services/app-settings";
import { environment } from '../environment/environment';
@Injectable()
export class ApiProvider implements ApiInterface, OnInit {
    Login: {
        name: string,
        email: string,
        phone: string,
        validated: boolean,
        token: string
    } = { name: '', email: '', phone: '', validated: false, token: '' };
    IsAuthenticated: boolean;
    Busymessage: string;
    fileKey: any;
    loaderInstance: any;
    APIURL: string;
    COUNTRY_URL: string;

    fcmToken: string;
    constructor(public platform: Platform, public http: HttpClient, public alertCtrl: AlertController, public loadCtrl: LoadingController, public translate: TranslateService, public storage: Storage) {
        this.loaderInstance = false;
        this.fileKey = 'mybeachMedia';
        //this.APIURL = 'https://smart-beach.ga/api/broker/';
        this.APIURL = environment.baseURL; // 'http://dev-smart-beach.ga/api/broker/';

        this.platform.ready().then(a => {
            this.initializeToken()
        });

    }

    ngOnInit() {

    }

    initializeToken() {
        this.storage.get("loginStore").then(a => {
            if (a && a.token) {
                this.Login = a;
                this.IsAuthenticated = true;
            } else {
                this.IsAuthenticated = false;
            }
        }, error => {
            this.IsAuthenticated = false;
        })
    }

    get(url: string, param: any, headers: any, offLoader?: boolean, isPublic?: boolean): Observable<any> {

        this.Busymessage = this.translate.instant("Messages.PLEASE_WAIT");
        if (!offLoader) {
            this.AmBusy(this.Busymessage);
            // if (!allowLanguage)
            //   param.lang = `${localStorage.getItem('lang')}`;
        }
        param.lang = `${localStorage.getItem('lang')}`;
        // console.log(param);
        if (!isPublic)
            headers['x-token'] = (localStorage.getItem(STORE.USER.TOKEN) != null) ? localStorage.getItem(STORE.USER.TOKEN) : '';
        // console.log(this.Login.token)
        const options = {
            headers: new HttpHeaders(headers)
        };

        url = url.startsWith('http') ? url : this.APIURL + url;

        // we can move this to a helper ... coz' im sure we will be copy pasting these more times
        for (let i in param) {
            if (param.hasOwnProperty(i)) {
                if (url.indexOf('?') != -1)
                    url += '&' + i + '=' + param[i];
                else
                    url += '?' + i + '=' + param[i];
            }
        }
        return this.http.get(url, options).map((r: any) => {
            if (!offLoader) {
                this.AmBusy(this.Busymessage);
            }

            setTimeout(() => {
                this.initializeToken();
            }, 500);
            return r;
        })
            .catch((error: any): any => {
                error = error.error;
                if (!offLoader) {
                    this.AmBusy(this.Busymessage, true);
                    this.AmError(this.translate.instant("Buttons.ERROR"), error.message, [{ text: this.translate.instant('Buttons.CLOSE'), role: this.translate.instant('Buttons.CANCEL') }]);

                }
                this.debug(error);
                return Observable.throw(error).map(r => r.json());

            })
    }

    post(url: string, body: any, headers: any, offLoader?: boolean, isPublic?: boolean): Observable<any> {
        this.Busymessage = this.translate.instant("Messages.PLEASE_WAIT");
        if (!offLoader) {
            this.AmBusy(this.Busymessage);
        }
        if (!isPublic)
            headers['x-token'] = (localStorage.getItem(STORE.USER.TOKEN) != null) ? localStorage.getItem(STORE.USER.TOKEN) : '';
        const options = {
            headers: new HttpHeaders(headers)
        };
        // this.debug(this.Login.token)
        url = url.startsWith('http') ? url : this.APIURL + url;
        url = url.indexOf('?') != -1 ? url + '&lang=' + localStorage.getItem('lang') : url + '?lang=' + localStorage.getItem('lang');
        // this.debug(url)

        return this.http.post(url, body, options).map((r: any) => {
            if (!offLoader) {
                this.AmBusy(this.Busymessage);
            }
            // this.debug(r);
            setTimeout(() => {
                this.initializeToken();
            }, 500);
            return r;
        }).catch((error: any): any => {
            error = error.error;
            if (!offLoader) {
                this.AmBusy(this.Busymessage, true);
                this.AmError(this.translate.instant("Buttons.ERROR"), error.message, [{ text: this.translate.instant('Buttons.CLOSE'), role: this.translate.instant('Buttons.CANCEL') }]);
            }
            // this.debug(error);

            return Observable.throw(error).map(r => r.json());
        })
    }

    AmBusy(text: string, cancel?: boolean) {
        if (!text)
            text = this.translate.instant("PLEASE_WAIT");
        if (cancel && this.loaderInstance) {
            this.loaderInstance.dismiss();
            this.loaderInstance = false;
            return;
        } else if (this.loaderInstance) {
            this.loaderInstance.dismiss();
            this.loaderInstance = false;
            return;
        }
        this.loaderInstance = this.loadCtrl.create({
            spinner: 'hide',
            content: text
        });
        this.loaderInstance.present();

    }

    PostFile(url: string, body: any, headers: any): Observable<any> {
        this.AmBusy(this.Busymessage);
        const options = {
            headers: new HttpHeaders(headers)
        };
        url = url.startsWith('http') ? url : this.APIURL + url;
        url = url.indexOf('?') != -1 ? url + '&lang=' + localStorage.getItem('lang') : url + '?lang=' + localStorage.getItem('lang');
        return this.http.post(url, body, options).map((r: any) => {
            this.AmBusy(this.Busymessage);
            this.debug(r);
            setTimeout(() => {
                this.initializeToken();
            }, 500);
            return r;
        }).catch((error: any): any => {
            this.AmBusy(this.Busymessage);
            error = error.error;
            this.debug(error);

            this.AmError(error.status, error.message, [{ text: this.translate.instant('Buttons.CLOSE'), role: this.translate.instant('Buttons.CANCEL') }]);
            return Observable.throw(error).map(r => r.json());
        })
    }

    AmError(title: string, description: string, button: Array<{ text: string, role?: string, handler?: (controllerInstance: any) => any }>) {
        this.alertCtrl.create({
            title: title,
            message: description,
            buttons: button,
            enableBackdropDismiss: false,
        }).present();
        /*for(let i in button){
          if(button[i].handler){
            button[i].handler(alert);
          }
        }*/
    }


    AmCustomError(title: string, description: string, button: Array<{ text: string, role?: string, handler?: (controllerInstance: any) => any }>) {
        let alert = this.alertCtrl.create({
            title: title,
            message: description,
            buttons: button,
            enableBackdropDismiss: false,
        })
        alert.present();

        return alert;
        /*for(let i in button){
          if(button[i].handler){
            button[i].handler(alert);
          }
        }*/
    }

    debug(response: any) {
        console.log('-------------------- Printing response -----------------------------------')
        console.log(response);
    }

}

