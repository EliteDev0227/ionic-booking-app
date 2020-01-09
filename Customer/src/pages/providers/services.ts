import { Injectable, OnInit } from "@angular/core";
import { ApiInterface } from "../Interfaces/ApiProvider";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { AlertController, LoadingController, Platform, ToastController } from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";
import { Storage } from "@ionic/storage";
import { environment} from '../../environment/environment';
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
	currentLanguage: string = 'ro';
	APIURL: string;
	fcmToken: string;
	constructor(public platform: Platform, public http: HttpClient, public alertCtrl: AlertController, public loadCtrl: LoadingController, public translate: TranslateService, public storage: Storage, public toastCtrl: ToastController) {
		this.loaderInstance = false;
		this.fileKey = 'mybeachMedia';
		//this.APIURL='https://smart-beach.ga/api/client/';  // for product
		//this.APIURL = 'http://dev-smart-beach.ga/api/client/'; // for Dev
		//this.APIURL = 'http://localhost/ionic/Testing/Nick/api/client/'; // for Dev
		this.APIURL = environment.baseURL; 
		this.platform.ready().then(a => {
			this.initializeToken()
		})
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
	get(url: string, param: any, headers: any, offLoader?: boolean, allowLanguage?: boolean): Observable<any> {
		this.Busymessage = this.translate.instant("PLEASE_WAIT");
		if (!offLoader) {
			this.AmBusy(this.Busymessage);
			if (!allowLanguage)
				param.lang = `${this.currentLanguage}`;

		}
		else if (offLoader === true) {
			if (!allowLanguage)
				param.lang = `${this.currentLanguage}`;
		}
		headers['x-token'] = this.Login.token;

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
			this.debug(r);
			setTimeout(() => {
				this.initializeToken();
			}, 500);
			return r;
		}).catch((error: any): any => {
			error = error.error;
			if (!offLoader) {
				this.AmBusy(this.Busymessage, true);
				this.AmError(this.translate.instant("ERROR"), error.message, [{ text: this.translate.instant('CLOSE'), role: this.translate.instant('CANCEL') }]);

			}
			this.debug(error);
			return Observable.throw(error).map(r => r.json());

		})
	}

	post(url: string, body: any, headers: any, offLoader?: boolean, disableErrorAlert?: boolean): Observable<any> {
		this.Busymessage = this.translate.instant("PLEASE_WAIT");
		if (!offLoader) {
			this.AmBusy(this.Busymessage);
		}
		headers['x-token'] = this.Login.token;
		const options = {
			headers: new HttpHeaders(headers)
		};
		

		url = url.startsWith('http') ? url : this.APIURL + url;
		url = url.indexOf('?') != -1 ? url + '&lang=' + this.currentLanguage : url + '?lang=' + this.currentLanguage;
	
		return this.http.post(url, body, options).map((r: any) => {
			if (!offLoader) {
				this.AmBusy(this.Busymessage);
			}
			
			this.debug(r);
			setTimeout(() => {
				this.initializeToken();
			}, 500);
			return r;
		}).catch((error: any): any => {
			error = error.error;
			if (!offLoader) {
				this.AmBusy(this.Busymessage, true);
				if (!disableErrorAlert) {
					this.AmError(this.translate.instant("ERROR"), error.message, [{ text: this.translate.instant('CLOSE'), role: this.translate.instant('CANCEL') }]);
				}
			}
			this.debug(error);
			return Observable.throw(error).map(r => r.json());
		})
	}

	put(url: string, body: any, headers: any, offLoader?: boolean): Observable<any> {
		this.Busymessage = this.translate.instant("PLEASE_WAIT");
		if (!offLoader) {
			this.AmBusy(this.Busymessage);
		}
		headers['x-token'] = this.Login.token;
		const options = {
			headers: new HttpHeaders(headers)
		};

		url = url.startsWith('http') ? url : this.APIURL + url;
		url = url.indexOf('?') != -1 ? url + '&lang=' + this.currentLanguage : url + '?lang=' + this.currentLanguage;

		return this.http.put(url, body, options).map((r: any) => {
			if (!offLoader) {
				this.AmBusy(this.Busymessage);
			}
			
			this.debug(r);
			setTimeout(() => {
				this.initializeToken();
			}, 500);
			return r;
		}).catch((error: any): any => {
			error = error.error;
			if (!offLoader) {
				this.AmBusy(this.Busymessage, true);
				this.AmError(this.translate.instant("ERROR"), error.message, [{ text: this.translate.instant('CLOSE'), role: this.translate.instant('CANCEL') }]);
			}
			this.debug(error);

			return Observable.throw(error).map(r => r.json());
		})
	}
	multipart(url: string, body: FormData, headers: any): Observable<any> { // ah, ok... I think we will ot.. but leave it here if it helps you in any way (in future)
		this.AmBusy(this.Busymessage);
		headers['x-token'] = this.Login.token;
		const options = {
			headers: new HttpHeaders(headers)
		};
		url = url.startsWith('http') ? url : this.APIURL + url;
		url = url.indexOf('?') != -1 ? url + '&lang=' + this.currentLanguage : url + '?lang=' + this.currentLanguage;
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

			this.AmError(error.status, error.message, [{ text: this.translate.instant('CLOSE'), role: this.translate.instant('CANCEL') }]);
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

	AmError(title: string, description: string, button: Array<{ text: string, role?: string, handler?: (controllerInstance: any) => any }>) {
		let alert = this.alertCtrl.create({
			title: title,
			message: description,
			buttons: button
		});
		alert.present();
		/*for(let i in button){
		  if(button[i].handler){
		  button[i].handler(alert);
		  }
		}*/
	}

	showInfo(msg: string) {
		let toast = this.toastCtrl.create({
			message: msg,
			duration: 5000,
			position: 'bottom',
			dismissOnPageChange: true
		});
		toast.present();
	}

	debug(response: any) {
		
	}

}

