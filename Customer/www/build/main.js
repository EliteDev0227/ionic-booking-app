webpackJsonp([0],{

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    base: 'https://smart-beach.ga/',
    baseURL: 'https://smart-beach.ga/api/client/'
    //base: 'http://207.154.223.210/',  // for dev
    //baseURL: 'http://207.154.223.210/api/client/'
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_BootstrapFirstRun__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__terms_terms__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__includes_confirmVerification_confirmVerification__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__verification_verification__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_crop__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_base64__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_file__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ngx_translate_core__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__main_guest_page_main_guest_page_component__ = __webpack_require__(66);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
















var SignupPage = /** @class */ (function () {
    function SignupPage(platform, configuration, alerCtrl, navCtrl, http, fb, navParams, popoverCtrl, modalCtrl, misc, api, camera, croper, base64, file, translate) {
        var _this = this;
        this.platform = platform;
        this.configuration = configuration;
        this.alerCtrl = alerCtrl;
        this.navCtrl = navCtrl;
        this.http = http;
        this.fb = fb;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.modalCtrl = modalCtrl;
        this.misc = misc;
        this.api = api;
        this.camera = camera;
        this.croper = croper;
        this.base64 = base64;
        this.file = file;
        this.translate = translate;
        this.PICTURE_RATIO = 1659 / 1200;
        this.requestPage = "Signup";
        this.shouldTop = document.body.clientHeight - document.body.clientWidth * this.PICTURE_RATIO + 'px';
        this.isSelected = false;
        this.checkTerms = false;
        this.camera_options = {
            quality: 70,
            cameraDirection: this.camera.Direction.FRONT,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            correctOrientation: true,
        };
        this.crop_options = {
            quality: 70,
            targetWidth: 200,
            targetHeight: 200,
        };
        this.photo = false;
        this.SignupData = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormGroup"]({
            name: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](null, [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].minLength(2)]),
            password: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](null, [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].minLength(6)]),
            phone: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](null, [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].minLength(6)]),
            terms: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](null, [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required]),
            prefix: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"]('', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].minLength(1)]),
            suffix: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"]('', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].minLength(1)])
        });
        this.SignupData = fb.group({
            name: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](null, [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].minLength(2)]),
            password: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](null, [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].minLength(6)]),
            phone: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"](null, [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].minLength(6)]),
            terms: [false, SignupPage_1.mustBeTruthy],
            prefix: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"]('', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].minLength(1)]),
            suffix: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"]('', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].minLength(1)])
        });
        this.misc.getStorage('AdditionalRegData').then(function (a) {
            if (a && a.complete && a.complete.length > 6)
                _this.updatePhone(a);
        });
    }
    SignupPage_1 = SignupPage;
    SignupPage.prototype.takePhoto = function (mediaType) {
        var _this = this;
        this.camera.getPicture(__assign({}, this.camera_options, { sourceType: mediaType }))
            .then(function (imagepath) {
            return _this.croper.crop(imagepath, _this.crop_options);
        })
            .then(function (cropped_path) {
            if (_this.platform.is('android')) {
                return _this.base64.encodeFile(cropped_path);
            }
            else {
                var fileName = cropped_path.split('/').pop();
                var path = cropped_path.substring(0, cropped_path.lastIndexOf("/") + 1);
                return _this.file.readAsDataURL(path, fileName);
            }
        })
            .then(function (imageData) {
            return new Promise(function (resolve, reject) {
                try {
                    var img = new Image;
                    img.onload = function resizeImage() {
                        resolve(imageToDataUri_1(this, 500, 500));
                    };
                    img.src = imageData.split('\n').join('').split('\r').join('');
                    var imageToDataUri_1 = function (img, width, height) {
                        // create an off-screen canvas
                        var canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
                        // set its dimension to target size
                        canvas.width = width;
                        canvas.height = height;
                        // draw source image into the off-screen canvas:
                        ctx.drawImage(img, 0, 0, width, height);
                        // encode image to data-uri with base64 version of compressed image
                        return canvas.toDataURL('image/jpeg', 0.5);
                    };
                }
                catch (error) {
                    reject(error);
                }
            });
        })
            .then(function (imageData) {
            _this.photo = imageData;
        })
            .catch(function (error) {
        });
    };
    SignupPage.prototype.ngOnInit = function () {
    };
    SignupPage.mustBeTruthy = function (c) {
        var rv = {};
        if (!c.value) {
            rv['notChecked'] = true;
        }
        return rv;
    };
    SignupPage.prototype.ionViewWillEnter = function () {
        this.configuration.setRequestPage(this.requestPage);
    };
    //TODO: Implement auth
    SignupPage.prototype.doSignup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var confirm, a, controls;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        confirm = this.alerCtrl.create({
                            title: "Warning",
                            message: this.translate.instant('NO_PHOTO'),
                            buttons: [{
                                    text: "OK",
                                    handler: null
                                }]
                        });
                        return [4 /*yield*/, this.misc.getStorage('deviceInfo')];
                    case 1:
                        a = _a.sent();
                        this.SignupData.value.device = {};
                        if (a) {
                            this.SignupData.value.device = {
                                model: a.model,
                                platform: a.platform,
                                version: a.version,
                                manufacturer: a.manufacturer
                            };
                        }
                        controls = this.SignupData.controls;
                        if (controls['name'].hasError('required')) {
                            confirm.setMessage(this.translate.instant('NAME_REQUIRED'));
                        }
                        else if (controls['name'].hasError('minlength')) {
                            confirm.setMessage(this.translate.instant('NAME_LENGTH'));
                        }
                        else if (controls['phone'].hasError('required')) {
                            confirm.setMessage(this.translate.instant('PHONE_REQUIRED'));
                        }
                        else if (controls['phone'].hasError('minlength')) {
                            confirm.setMessage(this.translate.instant('PHONE_LENGTH'));
                        }
                        else if (controls['password'].hasError('required')) {
                            confirm.setMessage(this.translate.instant('PAWD_REQUIRED'));
                        }
                        else if (controls['password'].hasError('minlength')) {
                            confirm.setMessage(this.translate.instant('PAWD_LENGTH'));
                        }
                        else if (controls['terms'].hasError('notChecked')) {
                            confirm.setMessage(this.translate.instant('GDPR_REQUIRED'));
                        }
                        else if (!this.photo) {
                            confirm = this.alerCtrl.create({
                                title: "Warning",
                                message: this.translate.instant('NO_PHOTO'),
                                buttons: [{
                                        text: "YES",
                                        handler: function () {
                                            return _this.signup(_this.SignupData.value);
                                        }
                                    }, {
                                        text: "NO",
                                        handler: null
                                    }]
                            });
                            confirm.setMessage(this.translate.instant('PHOTO_REQUIRED'));
                        }
                        else {
                            return [2 /*return*/, this.signup(this.SignupData.value)];
                        }
                        confirm.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    SignupPage.prototype.goLogin = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    SignupPage.prototype.openAboutProfile = function () {
    };
    //TODO: Implement Language menu
    SignupPage.prototype.updatePhone = function (event) {
        var _this = this;
        if (event && event.complete && event.complete.length >= 1) {
            this.SignupData.controls['phone'].setValue(event.complete);
            this.SignupData.controls['prefix'].setValue(event.prefix);
            this.SignupData.controls['suffix'].setValue(event.suffix);
            this.isSelected = true;
            this.misc.setStorage('AdditionalRegData', event).then(function (a) {
                _this.toggleLanguage = Math.random();
            }, function (error) {
            });
        }
    };
    SignupPage.prototype.onLanguageChanged = function (lang) {
        var self = this;
        self.currentLanguage = lang;
    };
    SignupPage.prototype.signup = function (data) {
        var _this = this;
        data.phone = data.phone.replace(')', '').replace('(', '').replace(/\s/g, '');
        var parsedData = {
            name: data.name,
            password: data.password,
            phone: data.phone,
            device: data.device,
        };
        if (this.photo) {
            if (this.photo.indexOf(';base64,') > -1) {
                parsedData.photo = this.photo.substr(this.photo.indexOf(';base64,') + 8);
            }
            else {
                parsedData.photo = this.photo;
            }
        }
        this.api.post('register', parsedData, { 'Content-Type': 'application/json' }).subscribe(function (r) {
            _this.api.AmError(_this.misc.translate.translate.instant('REGISTERED'), r.message, [{
                    text: _this.misc.translate.translate.instant('PROCEED'), handler: function () {
                        var popoverSignup = _this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_9__includes_confirmVerification_confirmVerification__["a" /* confirmVerification */], { page: __WEBPACK_IMPORTED_MODULE_10__verification_verification__["a" /* verification */], next: __WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */], userData: data, process: { fn: 'SignupVerification', data: _this.SignupData.value } });
                        popoverSignup.present();
                    }
                }]);
        });
    };
    SignupPage.prototype.openTerms = function () {
        var _this = this;
        this.http.get(this.api.APIURL + 'term-condition?lang=' + this.currentLanguage, { responseType: 'text' }).toPromise().then(function (res) {
            _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__terms_terms__["a" /* TermsPage */], { title: _this.translate.instant('TERMS_CONDITIONS'), terms: res }).present();
        });
    };
    SignupPage.prototype.openGDPR = function () {
        var _this = this;
        this.http.get(this.api.APIURL + 'gdpr?lang=' + this.currentLanguage, { responseType: 'text' }).toPromise().then(function (res) {
            _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__terms_terms__["a" /* TermsPage */], { title: 'GDPR', terms: res }).present();
        });
    };
    SignupPage.prototype.openWhyPhoto = function () {
        var _this = this;
        this.http.get(this.api.APIURL + 'photo?lang=' + this.currentLanguage, { responseType: 'text' }).toPromise().then(function (res) {
            _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__terms_terms__["a" /* TermsPage */], { title: 'Why Photo?', terms: res }).present();
        });
    };
    SignupPage.prototype.goBack = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_15__main_guest_page_main_guest_page_component__["a" /* MainGuestPage */], {
            animation: true, direction: 'back'
        });
    };
    SignupPage = SignupPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-signup',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\signup\signup.html"*/'<ion-content [style.background-position]="\'0 \' + shouldTop">\n\n\n\n    <button ion-button icon-only class="back-button" (click)="goBack()"><ion-icon name="ios-arrow-back"></ion-icon></button>\n\n\n\n    <langComponent [refresh]="toggleLanguage" [page]="\'signup\'" (pushLang)="onLanguageChanged($event)"></langComponent>\n\n\n\n\n\n    <h1 text-center margined>{{ \'SMART_BEACH\' |translate }}</h1>\n\n    <div margined>\n\n\n\n        <form [formGroup]="SignupData" (submit)="doSignup()">\n\n            <div class="label-input">\n\n                <ion-item>\n\n                    <ion-label class="label-size" floating>{{ \'NAME\'|translate }}</ion-label>\n\n                    <ion-input autocomplete="off" name="name" type="text" formControlName="name" [required]="true"></ion-input>\n\n                </ion-item>\n\n            </div>\n\n\n\n            <!-- <ion-input type="hidden" placeholder="+(40)722 222 222" formControlName="phone"></ion-input> -->\n\n\n\n            <phoneComponent (CompletedSelect)="updatePhone($event)"></phoneComponent>\n\n\n\n            <div class="passwordHolder">\n\n                <ion-item>\n\n                    <ion-label floating>{{ \'PASSWORD\' | translate }}</ion-label>\n\n                    <ion-input autocomplete="new-password" name="password" *ngIf="!EyeShown" formControlName="password" type="password" [required]="true"></ion-input>\n\n                    <ion-input autocomplete="new-password" name="password2" *ngIf="EyeShown" type="text" formControlName="password" [required]="true"></ion-input>\n\n                </ion-item>\n\n                <button icon-only ion-button type="button" clear class="passwordEye" (click)="EyeShown=!EyeShown">\n\n                    <ion-icon name="ios-eye"></ion-icon>\n\n                </button>\n\n            </div>\n\n            <div class="photo-group">\n\n                <ion-avatar>\n\n                    <img [attr.src]="photo || \'assets/imgs/avatar.png\'" />\n\n\n\n                </ion-avatar>\n\n                <div class="button-group">\n\n                    <button icon-only ion-button type="button" (click)="takePhoto(0)">{{\'ADD_PHOTO\' | translate}}</button>\n\n                    <button icon-only ion-button type="button" (click)="takePhoto(1)">{{ \'TAKE_PHOTO\' | translate }}</button>\n\n                    <div class="photo-link">\n\n                        <span (click)="openWhyPhoto()">{{ \'WHY_PHOTO\' | translate}}</span>\n\n                    </div>\n\n                </div>\n\n            </div>\n\n            <ion-item no-lines>\n\n                <ion-checkbox formControlName="terms"></ion-checkbox>\n\n                <ion-label>{{\'AGREE_TO\' | translate}}<span (click)="openTerms()">{{\'TERMS_CONDITIONS\' | translate}}</span> + <span (click)="openGDPR()">GDPR</span>.</ion-label>\n\n            </ion-item>\n\n            <button ion-button round full type="submit" pink-gradient class="signup-button">{{ \'REGISTER\' |translate }}</button>\n\n        </form>\n\n\n\n    </div>\n\n    <!-- <div class="bottom-block should-hide" (click)="goLogin()">\n\n        <a>{{ \'ALREADY_HAVE_AN_ACCOUNT\' |translate }}</a>\n\n        <span class="a-brother">{{ \'LOGIN\' | translate }}</span>\n\n    </div> -->\n\n\n\n</ion-content>'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\signup\signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_4__app_BootstrapFirstRun__["a" /* CustomBootstrap */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["PopoverController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_4__app_BootstrapFirstRun__["a" /* CustomBootstrap */], __WEBPACK_IMPORTED_MODULE_5__providers_services__["a" /* ApiProvider */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_crop__["a" /* Crop */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_base64__["a" /* Base64 */], __WEBPACK_IMPORTED_MODULE_13__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_14__ngx_translate_core__["c" /* TranslateService */]])
    ], SignupPage);
    return SignupPage;
    var SignupPage_1;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return beachBook; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__select_paymethods_select_paymethods__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__includes_popover_beachAgreement_beachAgreement__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_beachProvider__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_BootstrapFirstRun__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__myReservation_myReservation__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__beach_beach__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__includes_searchDupplication_searchDupplication__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_agreement_helper__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_common__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















/**
 * Created by shadow-viper on 12/19/17.
 */
var beachBook = /** @class */ (function () {
    function beachBook(dp, agreementHelper, translate, platform, popoverCtrl, modalCtrl, configuration, navparam, beachProvider, navCtrl, alertCtrl, api, app, splashScreen) {
        var _this = this;
        this.dp = dp;
        this.agreementHelper = agreementHelper;
        this.translate = translate;
        this.platform = platform;
        this.popoverCtrl = popoverCtrl;
        this.modalCtrl = modalCtrl;
        this.configuration = configuration;
        this.navparam = navparam;
        this.beachProvider = beachProvider;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.api = api;
        this.app = app;
        this.splashScreen = splashScreen;
        this.umbrellaData = null;
        this.umbrellaData_buff = null;
        this.payReserveMsg = "This beach is not allow to do any reservation yet, but u can take in consideration the beach status view for your referance.";
        this.readModel = [];
        this.title = '';
        this.index = '0';
        this.beach_settings = [];
        this.sunbed = 0;
        this.requestPage = 'UmbrellaBook';
        this.available_sunbed = 0;
        this.busy = 0;
        this.selected = 0;
        this.available = 0;
        this.oldData = {};
        this.timeInstance = [];
        this.status = { icon: 0, data: [] };
        this.confirmState = false;
        this.tempSlots = [];
        this.reservationStatus = '';
        this.oldAmount = '';
        this.additionalSunbedPrice = 0;
        this.extraPrice = 0;
        this.sideConfigs = {
            left: ['a'],
            right: ['b'],
            center: ['m', 'n', 'o']
        };
        this.bookingStatus = {
            left: false,
            right: false,
            center: false
        };
        this.seat_count = 0;
        this.reservationBox = false;
        this.singleSeat = false;
        this.title = this.navparam.data.title;
        this.index = this.navparam.data.index;
        this.beach_settings = this.navparam.data.settings;
        this.data = this.navparam.data;
        this.additionalSunbedPrice = parseFloat(this.data.data.sunbed_price || '0');
        try {
            if (this.data.data.info.mapElement.list.center.length == 1) {
                this.singleSeat = true;
            }
        }
        catch (e) {
            this.singleSeat = false;
        }
        this.reservationStatus = (this.navparam.data.reservation && typeof this.navparam.data.reservation.status != 'undefined') ? this.navparam.data.reservation.status : '';
        this.oldAmount = (this.navparam.data.reservation && typeof this.navparam.data.reservation.amount != 'undefined') ? this.navparam.data.reservation.amount : '';
        if (this.navparam.data.reservation) {
        }
        this.elementPool(false);
        this.platform.ready().then(function () {
            _this.sub$1 = _this.platform.pause.subscribe(function () {
                if (_this.navCtrl.getActive().name == 'beachBook') {
                    // alert("stop");
                    _this.configuration.ClearTimeout();
                }
            }, function (error) { });
            _this.sub$2 = _this.platform.resume.subscribe(function () {
                if (_this.navCtrl.getActive().name == 'beachBook') {
                    // alert("start");
                    setTimeout(function () {
                        _this.elementPool(false);
                    }, 500);
                }
            }, function (error) { });
        }, function (error) { });
        // let button = document.getElementById('my-button');
        // var txt = button.textContent || button.innerText;
        //
    }
    beachBook.prototype.ionViewWillLeave = function () {
        this.forceStopPooling = true;
        if (this.timeInstance) {
            clearTimeout(this.timeInstance);
        }
        this.configuration.ClearTimeout();
    };
    beachBook.prototype.ionViewWillUnload = function () {
        this.sub$1.unsubscribe();
        this.sub$2.unsubscribe();
    };
    beachBook.prototype.ionViewWillEnter = function () {
        this.forceStopPooling = false;
        this.configuration.setRequestPage(this.requestPage);
        this.confirmState = false;
    };
    beachBook.prototype.load = function () {
        var status = this.status.data;
        this.sunbed = 0;
        if (this.navparam.data.reservation && this.navparam.data.reservation.seat.extra_seats) {
            this.sunbed = this.navparam.data.reservation.seat.extra_seats;
            this.title = this.navparam.data.reservation.beach;
        }
        if (status && status.seats) {
            var statusInt = this.statusIconArray(status.status_icon);
            if (this.status.data && this.status.data.customer) {
                statusInt = this.MakeMatch(this.status.data.customer, statusInt);
            }
            this.getBusy(statusInt);
            this.status.data.seats = statusInt.length;
            this.checkAvailability(statusInt);
            if (statusInt && statusInt.length > 2) {
                this.umbrellaData = {
                    umbrella: { left: this.statusKey(statusInt[0]), right: statusInt[2] ? this.statusKey(statusInt[2]) : this.statusKey(statusInt[1]) },
                    seats: { first: this.statusKey(statusInt[0]), second: this.statusKey(statusInt[1]), third: this.statusKey(statusInt[2]), fourth: this.statusKey(statusInt[3]) },
                    status: this.reservationStatus
                };
            }
            else if (statusInt && statusInt.length <= 2) {
                this.umbrellaData = {
                    umbrella: { left: this.statusKey(statusInt[0]), right: statusInt[2] ? this.statusKey(statusInt[2]) : this.statusKey(statusInt[1]) },
                    seats: { first: '', second: this.statusKey(statusInt[0]), third: this.statusKey(statusInt[1]), fourth: '' },
                    status: this.reservationStatus
                };
            }
            this.readModel = JSON.parse(JSON.stringify(this.umbrellaData));
            this.umbrellaData_buff = this.readModel;
            this.checkAvailabilityString();
        }
    };
    beachBook.prototype.Agreement = function () {
        var _this = this;
        var beachsettingperson = this.beach_settings.umbrella['person-num']['two']['occupy-all-seats'];
        var seatscount = this.navparam.data.data.seats;
        var aslotslength = this.status.data.slots.a.length;
        var bslotslength = this.status.data.slots.b.length;
        if (beachsettingperson == false && seatscount == 4 && aslotslength == 1 && bslotslength == 1) {
            var popoverSignup = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_9__includes_searchDupplication_searchDupplication__["a" /* searchDupplication */], { msg: this.translate.instant('CANOTSEAT') });
            popoverSignup.present();
            popoverSignup.onDidDismiss(function (data) {
                // this.elementPool(false);
            });
            return;
        }
        else {
            var agreementPopover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_3__includes_popover_beachAgreement_beachAgreement__["a" /* beachAgreement */], { nav: this.navCtrl, total: this.getTotal(), search: this.navparam.data.search, location: this.navparam.data.location, data: this.status.data, title: this.title, index: this.index, settings: this.beach_settings, selected: this.selected, extra: this.sunbed }, { cssClass: 'agreementPopOver' });
            agreementPopover.present().then(function () {
            }, function (error) {
                console.error(error);
            });
            agreementPopover.onDidDismiss(function (response) {
                // this.elementPool(false);
                if (response && response.agreed) {
                    _this.reservationBox = true;
                }
            });
        }
    };
    beachBook.prototype.check = function () {
        if (this.reservationBox) {
            this.agreementHelper.navCtrl = this.navCtrl;
            this.agreementHelper.navparam = { nav: this.navCtrl, total: this.getTotal(), search: this.navparam.data.search, location: this.navparam.data.location, data: this.status.data, title: this.title, settings: this.beach_settings, selected: this.selected, extra: this.sunbed, index: this.data.data.index, number: this.data.data.number, status: this.data.data.status, seats: this.data.data.seats, slots: this.slots, zone: this.zone || this.data.data.coords.zone };
        }
    };
    beachBook.prototype.completeReservation = function () {
        var warning = false;
        var slots = this.slots;
        var slotNames = Object.keys(slots);
        var selectedSlots = 0;
        var fullySelected = 0;
        console.log("extra", this.sunbed);
        slotNames.map(function (slotName) {
            var count = eval([0].concat(slots[slotName]).join("+"));
            if (count) {
                selectedSlots++;
                if (count >= slots[slotName].length) {
                    fullySelected++;
                }
            }
        });
        if (selectedSlots > 1 && !fullySelected) {
            var beachsettingperson = this.beach_settings.umbrella['person-num']['two']['occupy-all-seats'];
            if (!beachsettingperson) {
                warning = true;
            }
        }
        if (warning) {
            var alert_1 = this.alertCtrl.create({
                subTitle: this.translate.instant('CANOTSEAT'),
                buttons: ['Ok']
            });
            alert_1.present();
            return false;
        }
        this.agreementHelper.setup();
    };
    beachBook.prototype.canReserve = function () {
        return this.agreementHelper.canMakeReservation() && this.reservationBox;
    };
    beachBook.prototype.getBusy = function (data) {
        for (var i in data) {
            if (data[i] == 2) {
                this.busy += 1;
            }
        }
    };
    beachBook.prototype.UpdateData = function (event) {
        this.zone = event.zone || '';
        this.bookingStatus = event.bookingStatus;
        var available = 0, selected = 0;
        var status = this.data.data.status;
        var sides = [];
        var slots = {};
        try {
            sides = Object.keys(status);
        }
        catch (e) {
            console.error(e);
        }
        var findSide = function (side) {
            var configSide = '';
            var configSides = Object.keys(this.sideConfigs);
            for (var j = 0; j < configSides.length; j++) {
                if (this.sideConfigs[configSides[j]].indexOf(side) > -1) {
                    configSide = configSides[j];
                    break;
                }
            }
            return configSide;
        }.bind(this);
        for (var i = 0; i < sides.length; i++) {
            var side = sides[i], list = status[side], configSide = findSide(side);
            if (!slots[side]) {
                slots[side] = [];
            }
            for (var j = 0; j < list.length; j++) {
                var li = list[j];
                if (!this.bookingStatus[configSide] && li === 'available') {
                    available++;
                    slots[side].push(0);
                }
                else if (li === 'selected') {
                    selected++;
                    slots[side].push(1);
                }
                else {
                    slots[side].push(0);
                }
            }
            if (this.bookingStatus[configSide]) {
                slots[side] = [];
            }
        }
        if (available) {
            this.sunbed = 0;
        }
        this.available = available;
        this.selected = selected;
        this.slots = slots;
        return;
        /* if (event && event.umbrella) {
            this.sunbed = 0;
            this.umbrellaData = event;
            this.checkAvailabilityString();

            let newStr = JSON.stringify(this.umbrellaData);
            let oriStr = JSON.stringify(this.umbrellaData_buff);
            if (oriStr == newStr)
                this.confirmState = false;
            else
                this.confirmState = true;

        } */
    };
    beachBook.prototype.onChangeExtra = function (extra) {
        console.warn('extra sunbed');
        console.warn(extra);
        if (this.sunbed != extra) {
            this.sunbed = extra;
        }
        else {
            this.sunbed = 0;
        }
        if (this.navparam.data.reservation && (this.sunbed != this.navparam.data.reservation.seat.extra_seats))
            this.confirmState = true;
        else
            this.confirmState = false;
    };
    beachBook.prototype.statusIconArray = function (status) {
        return (!status) ? [] : status.replace('.png', '').split('');
    };
    beachBook.prototype.statusKey = function (key) {
        if (key == 1)
            return 'free';
        else if (key == 2)
            return 'busy';
        else if (key == 3)
            return 'selected';
        else
            return '';
    };
    beachBook.prototype.checkAvailability = function (statusIcon) {
        var count = 0;
        for (var i in statusIcon) {
            if (statusIcon[i] == 1 || statusIcon[i] == 3) {
                count++;
            }
        }
        this.status.icon = count;
    };
    beachBook.prototype.checkAvailabilityString = function () {
        if (this.umbrellaData && this.umbrellaData.seats) {
            this.selected = 0;
            var check = { a: 0, b: 0 };
            var slots = { a: [], b: [] };
            for (var i in this.umbrellaData.seats) {
                if (this.umbrellaData.seats.hasOwnProperty(i) && this.umbrellaData.seats[i] == 'selected' && (this.readModel.seats[i] != this.umbrellaData.seats[i] || this.navparam.data.change)) {
                    if (i == 'first' || i == 'second') {
                        if (i == 'first') {
                            slots.a[0] = 0;
                        }
                        if (i == 'second') {
                            if (slots.a[0] !== 0) {
                                if (this.umbrellaData.seats.first == '') {
                                    slots.a[0] = 0;
                                }
                                else {
                                    slots.a[0] = 1;
                                }
                            }
                            else {
                                slots.a[1] = 1;
                            }
                        }
                        check.a = 1;
                    }
                    else if (i == 'third' || i == 'fourth') {
                        check.b = 1;
                        if (i == 'third') {
                            slots.b[0] = 0;
                        }
                        if (i == 'fourth') {
                            if (slots.b[0] !== 0) {
                                slots.b[0] = 1;
                            }
                            else {
                                slots.b[1] = 1;
                            }
                        }
                    }
                    if (check.a == 1 && check.b == 1) {
                        this.status.data.section = 'A&B';
                    }
                    else if (check.a == 1) {
                        this.status.data.section = 'A';
                    }
                    else if (check.b == 1) {
                        this.status.data.section = 'B';
                    }
                    this.selected += 1;
                }
            }
            this.status.data.slots = slots;
        }
    };
    beachBook.prototype.getPrice = function () {
        if (this.beach_settings && this.status && this.status.data && this.status.data.type) {
            return (this.beachProvider.getPrice(this.beach_settings, this.status.data.type, this.navparam.data.location, this.navparam.data.pool)) * (this.beachProvider.getPeriod(this.navparam.data.pool)); // || 0
        }
        return 0;
    };
    beachBook.prototype.getAdditionalPrice = function () {
        if (typeof this.additionalSunbedPrice !== 'undefined') {
            return this.additionalSunbedPrice;
        }
        if (typeof this.status.data.sunbeds == 'undefined') {
            return 0;
        }
        return this.status.data.sunbeds.price;
    };
    beachBook.prototype.getTotal = function () {
        if (this.navparam.data.reservation && this.navparam.data.reservation.status == "active") {
            var temp = 0;
            return temp;
        }
        else {
            var eventStartTime = this.navparam.data.pool.start_date;
            var eventEndTime = this.navparam.data.pool.end_date;
            var days = __WEBPACK_IMPORTED_MODULE_12_moment___default()(new Date(eventEndTime)).diff(new Date(eventStartTime), 'day') + 1;
            var aditional = (this.available) ? 0 : this.getAdditionalPrice() * this.sunbed;
            if (days == 0) {
                //let temp = this.status.data.price * ((this.selected * 1) + (this.sunbed | 0));
                var temp = ((parseFloat(this.status.data.price) * this.selected) + aditional);
                if (this.reservationStatus == 'active') {
                    if (temp > parseInt(this.oldAmount)) {
                        return temp - parseInt(this.oldAmount);
                    }
                    else {
                        return 0;
                    }
                }
                else {
                    return temp;
                }
            }
            else {
                //let temp = this.status.data.price * ((this.selected * 1) + (this.sunbed | 0));
                var temp = ((parseFloat(this.status.data.price) * this.selected) + aditional) * days;
                if (this.reservationStatus == 'active') {
                    if (temp > parseInt(this.oldAmount)) {
                        return temp - parseInt(this.oldAmount);
                    }
                    else {
                        return 0;
                    }
                }
                else {
                    return temp;
                }
            }
        }
    };
    beachBook.prototype.getExtraSunbedArr = function () {
        return Array.from(new Array(this.avail_sunbed()), function (val, index) { return index + 1; });
    };
    beachBook.prototype.changePosition = function () {
        var posOption = {
            beach_ids: this.navparam.data.pool.beach_ids,
            customer_id: this.navparam.data.pool.customer_id,
            seat_type: this.navparam.data.pool.seat_type,
            seat_zone: ['front', 'middle', 'back'],
            refresh: true,
            excluded_days: this.navparam.data.reservation.released_days,
            start_date: this.navparam.data.pool.start_date,
            end_date: this.navparam.data.pool.end_date
        };
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__beach_beach__["a" /* BeachPage */], { change: true, SearchObj: posOption, title2: this.title, id: this.navparam.data.reservation.beach_id, reservation: this.navparam.data.reservation, context: "search" });
    };
    beachBook.prototype.confirmChange = function () {
        var _this = this;
        var optionConfirm = {
            id: this.navparam.data.reservation.id,
            seat: {
                type: this.navparam.data.pool.seat_type,
                zone: this.navparam.data.location,
                number: this.index,
                slots: this.navparam.data.reservation.seat.slots,
                new_slots: this.status.data.slots,
                extra_seats: this.sunbed,
                position: { x: this.navparam.data.pool.seat_position.x, y: this.navparam.data.pool.seat_position.y }
            },
            amount: this.getTotal(),
            old_amount: this.oldAmount
        };
        // if(this.reservationStatus != 'booked') 
        //   optionConfirm['old_amount'] = this.oldAmount;
        /*start_date:this.navparam.data.pool.start_date,
          end_date:this.navparam.data.pool.end_date,*/
        //this.getPrice()*(this.selected + ((this.sunbed && this.sunbed>0)?this.sunbed:0)),
        this.api.post('booking/update', optionConfirm, {}).subscribe(function (r) {
            _this.api.AmError(_this.configuration.translate.translate.instant('DONE'), _this.configuration.translate.translate.instant('RESERVATION_CHANGED_SUCCESSFULLY'), [{
                    text: _this.configuration.translate.translate.instant('PROCEED'), handler: function () {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__myReservation_myReservation__["a" /* myReservation */]);
                    }
                }]);
        }, function (error) {
        });
    };
    beachBook.prototype.elementPool = function (skipFirst) {
        if (this.navparam.data.pool) {
            if (!skipFirst) {
                this.element(false);
            }
            this.configuration.ClearTimeout();
            if (this.timeInstance) {
                clearTimeout(this.timeInstance);
            }
            return false;
            // Pooling Stopped 
            /* this.timeInstance = setTimeout(() => {
            
                this.element(true);
                this.elementPool(true);
                this.configuration.setTimeout(this.timeInstance)
            }, 5000);
*/
        }
    };
    beachBook.prototype.avail_sunbed = function () {
        if (this.beach_settings && this.beach_settings.seats && this.status.data.sunbeds) {
            if (parseInt(this.beach_settings.seats.extra) > parseInt(this.status.data.sunbeds.count)) {
                return parseInt(this.status.data.sunbeds.count);
            }
            else {
                return parseInt(this.beach_settings.seats.extra);
            }
        }
        else if (!this.status.data.sunbeds) {
            return parseInt(this.beach_settings.seats.extra);
        }
        return 0;
    };
    beachBook.prototype.element = function (showLoader) {
        var _this = this;
        var searchParams = JSON.parse(JSON.stringify(this.navparam.data.pool));
        searchParams.start_date_formatted = this.dp.transform(new Date(searchParams.start_date), "yyyy-MM-dd");
        searchParams.end_date_formatted = this.dp.transform(new Date(searchParams.end_date), "yyyy-MM-dd");
        searchParams.start_date = this.getLocalDateTime(searchParams.start_date);
        searchParams.end_date = this.getLocalDateTime(searchParams.end_date);
        searchParams.owned = true;
        this.api.post('search', searchParams, {}, showLoader).subscribe(function (r) {
            if (r && r.length) {
                if (!showLoader) {
                    _this.status.data = r[0];
                    _this.oldData = r[0];
                    console.log("con", _this.status.data);
                    _this.load();
                }
                else {
                    _this.status.data.status_icon = r[0].status_icon;
                    _this.status.data.sunbeds = r[0].sunbeds;
                }
            }
            else {
                _this.status.data.price = 0;
            }
        }, function (error) { });
        return;
        /*
        
        let params = {
            beach_id: searchParams.beach_ids[0],
            date: searchParams.start_date,
            x: searchParams.seat_position.x,
            y: searchParams.seat_position.y
        };
                this.api.get('grid/' + params.beach_id + '/seat', params, {}, showLoader).subscribe(r => {
                    
                    
                }, error => {
                    console.error(error);
        
                    
                }); */
    };
    beachBook.prototype.getLocalDateTime = function (date) {
        var dateObj = new Date(date);
        var hoursWithTimezone = dateObj.getHours() + ((-1) * (dateObj.getTimezoneOffset() / 60));
        return new Date(new Date(date).setHours(hoursWithTimezone)).getTime();
    };
    beachBook.prototype.MatchCustomer = function (currentStatus, customer, index) {
        for (var i = currentStatus.length - 1; i >= 0; --i) {
            if (customer && customer[i]) {
                var customer_status = this.statusIconArray(customer[i].status_icon);
                if (customer_status[index] == 3 && customer[i].id == this.navparam.data.pool.customer_id) {
                    return customer_status[index];
                }
            }
        }
        return currentStatus[index];
    };
    beachBook.prototype.MakeMatch = function (customer, statusArr) {
        for (var i in statusArr) {
            statusArr[i] = this.MatchCustomer(statusArr, customer, i);
        }
        return statusArr;
    };
    beachBook.prototype.isPayAvailable = function () {
    };
    beachBook.prototype.isReserveAvailable = function () {
        var self = this;
        return self.beach_settings && self.beach_settings.booking_time_limit && self.beach_settings.booking_time_limit > 0 && self.beach_settings.booking_time_limit != '0';
    };
    beachBook.prototype.onPay = function () {
        var _this = this;
        this.configuration.getStorage('login').then(function (a) {
            if (a && a.token) {
                // TODO:// Change message accordingly
                // if (a.guest) {
                // 	let popoverSignup = this.popoverCtrl.create(searchDupplication, { msg: this.translate.instant('BOOKING_PERMISSION') });
                // 	popoverSignup.present();
                // 	return false;
                // }else 
                if (a.tour) {
                    var popoverSignup = _this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_9__includes_searchDupplication_searchDupplication__["a" /* searchDupplication */], {
                        msg: _this.translate.instant('BOOKING_PERMISSION'),
                        redirect: true
                    });
                    popoverSignup.present();
                    return false;
                }
                var url = "loiality-points/" + a.id + "/" + _this.beach_settings.id;
                _this.api.get(url, {}, {}).subscribe(function (res) {
                    if (res && res.points && res.points != '0') {
                        _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_0__select_paymethods_select_paymethods__["a" /* SelectPaymethods */], { nav: _this.navCtrl, 'total': _this.getTotal(), 'points': res['points'], 'isCard': _this.beach_settings.card, search: _this.navparam.data.search, location: _this.navparam.data.location, data: _this.status.data, title: _this.title, index: _this.index, settings: _this.beach_settings, selected: _this.selected, extra: _this.sunbed }, {}).present();
                    }
                    else {
                        if (_this.beach_settings.card == false) {
                            _this.translate.get("YOU_HAVE_NOT_LOYALITY", { beachName: _this.beach_settings.name }).subscribe(function (res) {
                                _this.api.showInfo(res);
                            });
                            // this.api.AmBusy(`${this.beach_settings.name} don't agree to pay the reservation with credit card, also you have not Loiality points on this beach.`,false);
                        }
                        else {
                            _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_0__select_paymethods_select_paymethods__["a" /* SelectPaymethods */], { nav: _this.navCtrl, 'total': _this.getTotal(), 'points': 0, 'isCard': _this.beach_settings.card, search: _this.navparam.data.search, location: _this.navparam.data.location, data: _this.status.data, title: _this.title, index: _this.index, settings: _this.beach_settings, selected: _this.selected, extra: _this.sunbed }, {}).present();
                        }
                    }
                });
            }
        }, function (error) { });
    };
    beachBook = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'beachBook',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\beachBook\beachBook.html"*/'<ion-header class="has-shadow">\n\n	<ion-navbar>\n		<ion-title>{{ title }}</ion-title>\n		<ion-buttons end>\n\n		</ion-buttons>\n	</ion-navbar>\n\n</ion-header>\n\n<ion-content>\n	<ion-list>\n\n		<div class="sunbedContainer">\n			<!-- <P ion-text *ngIf="reservationStatus != \'change-request\'" style="text-align: center;color: #fe5295">{{\n						\'TAP_ON_SUNBED_YOU_WANT_TO_ORDER\' | translate }}</P>\n			<P ion-text *ngIf="reservationStatus == \'change-request\'" style="text-align: center;color: #fe5295">{{ \'YOUR_REQUEST_PENDING_MESSAGE\'\n				| translate }}</P> -->\n			<ion-row class="sunbedHeading">\n				<ion-col col-5>\n					<ion-row>\n						<h2 margined blackDark>{{ \'NUMBER\' | translate }}: {{ index }}</h2>\n					</ion-row>\n				</ion-col>\n				<ion-col col-7>{{ status.data.price | price }} {{ configuration.currency }}/{{ \'SUNBED\' | translate }}</ion-col>\n			</ion-row>\n			<div class="sunbedBg">\n				<ion-row *ngIf="!singleSeat" class="top">\n					<ion-col col-3>\n						<div class="As">A</div>\n					</ion-col>\n					<ion-col col-6 style="color: #fe5295;font-weight: bold;text-align: center">{{\'SELECT_SUNBEDS\' | translate}}</ion-col>\n					<ion-col col-3>\n						<div class="As right">B</div>\n					</ion-col>\n				</ion-row>\n				<div class="sunbedHolder">\n					<beach-umbrella [ReceivedEvent]="umbrellaData" [ViewData]="data" (changes)="UpdateData($event)"></beach-umbrella>\n				</div>\n\n				<ion-row *ngIf="!singleSeat" class="bottom">\n					<ion-col>\n						<div class="seats">{{ available}} {{ \'SEATS\' | translate }}</div>\n						<div class="availability">{{ \'AVAILABLE\' | translate }}</div>\n					</ion-col>\n					<ion-col>\n						<div class="seats">{{ selected }} {{ \'SEATS\' | translate }}</div>\n						<div class="availability blued">{{ \'SELECTED\' | translate }}</div>\n					</ion-col>\n					<ion-col *ngIf="busy">\n						<div class="seats">{{ busy }} {{ \'SEATS\' | translate }}</div>\n						<div class="availability red">{{ \'OCCUPIED\' | translate }}</div>\n					</ion-col>\n\n				</ion-row>\n				<ion-row *ngIf="singleSeat" class="bottom">\n					<ion-col>\n						<div class="seats">{{ \'SIZE\' | translate }}</div>\n						<div *ngIf="data.data.seats>1" class="availability persons">{{data.data.seats}} {{ \'PERSONS\' | translate }}</div>\n						<div  *ngIf="!(data.data.seats>1)" class="availability persons">{{data.data.seats}} {{ \'PERSON\' | translate }}</div>\n					</ion-col>\n				</ion-row>\n			</div>\n		</div>\n\n		<!--div class="sunbedContainer">\n			<ion-row class="sunbedHeading">\n				<ion-col col-7>\n					<ion-row>\n						<h2 margined blackDark>{{ \'NUMBER\' | translate }}: {{ index }}</h2>\n					</ion-row>\n				</ion-col>\n				<ion-col col-5>{{ status.data.price | price }} {{ configuration.currency }}/{{ \'SUNBED\' | translate }}</ion-col>\n			</ion-row>\n			<div class="sunbedBg">\n				<ion-row class="top">\n					<ion-col col-5>\n						<div class="As">A</div>\n					</ion-col>\n					<ion-col></ion-col>\n					<ion-col col-5>\n						<div class="As right">B</div>\n					</ion-col>\n				</ion-row>\n				<div class="sunbedHolder">\n					<beach-umbrella [ReceivedEvent]="umbrellaData" (changes)="UpdateData($event)"></beach-umbrella>\n				</div>\n\n				<ion-row class="bottom">\n					<ion-col>\n						<div class="seats">{{ status.icon - selected }} {{ \'SEATS\' | translate }}</div>\n						<div class="availability">{{ \'AVAILABLE\' | translate }}</div>\n					</ion-col>\n					<ion-col>\n						<div class="seats">{{ selected }} {{ \'SEATS\' | translate }}</div>\n						<div class="availability blued">{{ \'SELECTED\' | translate }}</div>\n					</ion-col>\n					<ion-col *ngIf="busy">\n						<div class="seats">{{ busy }} {{ \'SEATS\' | translate }}</div>\n						<div class="availability red">{{ \'OCCUPIED\' | translate }}</div>\n					</ion-col>\n\n				</ion-row>\n			</div>\n		</div-->\n\n		<ion-row *ngIf="avail_sunbed()>0 && reservationStatus != \'change-request\'" class="extra-sunbeds">\n			<ion-col col-12>\n				<h4 no-margin ion-text class="additional" color="primary">{{ \'DO_YOU_WANT_ADDITIONAL_SUNBED\' | translate }}</h4>\n			</ion-col>\n			<ion-col col-2 no-padding *ngFor="let extra of getExtraSunbedArr(); let i =index">\n				<button ion-button (click)="onChangeExtra(extra)" [disabled]="available" color="{{ sunbed==extra?\'primary\':\'white\' }}">{{\n					extra }}</button>\n			</ion-col>\n		</ion-row>\n\n		<!--  *ngIf="reservationStatus != \'change-request\'" -->\n		<br/>\n		<br/>\n		<div class="TextContainers">\n\n			<ion-item class="terms-condition">\n				<ion-checkbox start [(ngModel)]="reservationBox" (ngModelChange)="check()"></ion-checkbox>\n				<ion-label class="terms-label">{{\'ACCEPT\' |translate}} <a href="#" item-content (click)="Agreement()">{{\'TERMS_CONDITIONS\'\n						|translate}}</a></ion-label>\n			</ion-item>\n			<ng-container *ngIf="reservationStatus != \'change-request\'">\n				<h2 blackDark>{{ \'TOTAL\' | translate }}: {{ getTotal() | price }} {{ configuration.currency }}</h2>\n\n				<!-- <div *ngIf="beach_settings.only_cc">\n					<button [disabled]="selected<1 || !reservationBox" ion-button round block color="primary" light (click)="onPay()">{{\n						\'PAY\' | translate\n						}}</button>\n				</div> -->\n				<ion-row *ngIf="!beach_settings.only_cc" style="margin-top: 10vm !important;">\n					<ng-container *ngIf="beach_settings.without_pay_reserve">\n						<ion-col>\n							<button id="my-button" [disabled]="(selected < 1 || !isReserveAvailable()) || !canReserve()" ion-button round\n							block color="white" class="reserve" (click)="completeReservation()">{{ \'RESERVE\' | translate }} &nbsp; <span>({{\n									\'FOR\' | translate }} {{\n									beach_settings.booking_time_limit }} {{ \'MIN\' | translate }})</span></button>\n						</ion-col>\n						<ion-col *ngIf="beach_settings.card">\n							<button [disabled]="selected<1 || !reservationBox" ion-button round block color="primary" light (click)="onPay()">{{\n								\'PAY\' | translate\n								}}</button>\n						</ion-col>\n					</ng-container>\n					<ng-container *ngIf="!beach_settings.without_pay_reserve">\n						<span>\n							{{payReserveMsg}}\n						</span>\n					</ng-container>\n				</ion-row>\n			</ng-container>\n		</div>\n	</ion-list>\n</ion-content>'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\beachBook\beachBook.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["Button"], __WEBPACK_IMPORTED_MODULE_14__angular_common__["d" /* DatePipe */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_14__angular_common__["d" /* DatePipe */],
            __WEBPACK_IMPORTED_MODULE_11__providers_agreement_helper__["a" /* AgreementHelper */],
            __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["Platform"],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["PopoverController"],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["ModalController"],
            __WEBPACK_IMPORTED_MODULE_6__app_BootstrapFirstRun__["a" /* CustomBootstrap */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_4__providers_beachProvider__["a" /* BeachProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["AlertController"],
            __WEBPACK_IMPORTED_MODULE_5__providers_services__["a" /* ApiProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["App"],
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], beachBook);
    return beachBook;
}());

//# sourceMappingURL=beachBook.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return beachBookSunbed; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__select_paymethods_select_paymethods__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__includes_popover_beachAgreement_beachAgreement__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_beachProvider__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_BootstrapFirstRun__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__myReservation_myReservation__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_agreement_helper__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










/**
 * Created by shadow-viper on 12/19/17.
 */
var beachBookSunbed = /** @class */ (function () {
    function beachBookSunbed(agreementHelper, platform, configuration, translate, modalCtrl, popoverCtrl, navparam, beachProvider, navCtrl, api) {
        var _this = this;
        this.agreementHelper = agreementHelper;
        this.platform = platform;
        this.configuration = configuration;
        this.translate = translate;
        this.modalCtrl = modalCtrl;
        this.popoverCtrl = popoverCtrl;
        this.navparam = navparam;
        this.beachProvider = beachProvider;
        this.navCtrl = navCtrl;
        this.api = api;
        this.beach_settings = [];
        this.selectedSunbed = 0;
        this.title = '';
        this.requestPage = 'SunbedBook';
        this.index = '0';
        this.status = [];
        this.reservationStatus = '';
        this.totalprice = 0;
        this.confirmState = false;
        this.reservationBox = false;
        this.btn = [];
        this.btn = this.beachProvider.sunbed.values;
        this.beach_settings = this.navparam.data.settings;
        // this.reservationStatus = this.navparam.data.status;
        this.title = this.navparam.data.title;
        this.index = this.navparam.data.index;
        this.status = this.navparam.data.data;
        this.beachProvider.sunbed.selected = 1;
        this.reservationStatus = (this.navparam.data.reservation && typeof this.navparam.data.reservation.status != 'undefined') ? this.navparam.data.reservation.status : '';
        this.oldAmount = (this.navparam.data.reservation && typeof this.navparam.data.reservation.amount != 'undefined') ? this.navparam.data.reservation.amount : '';
        if (this.navparam.data.reservation) {
            this.totalprice = this.oldAmount;
            this.btn[this.navparam.data.reservation.seat.count - 1] = true;
            this.statusbooking = this.navparam.data.reservation.status;
        }
        this.platform.ready().then(function () {
            _this.sub1$ = _this.platform.pause.subscribe(function () {
                if (_this.navCtrl.getActive().name == 'beachBookSunbed') {
                    _this.configuration.ClearTimeout();
                }
            }, function (error) { });
            _this.sub2$ = _this.platform.resume.subscribe(function () {
                if (_this.navCtrl.getActive().name == 'beachBookSunbed') {
                    _this.getRealtimeSunbed();
                }
            }, function (error) { });
        }, function (error) { });
    }
    beachBookSunbed.prototype.ionViewWillUnload = function () {
        this.sub1$.unsubscribe();
        this.sub2$.unsubscribe();
    };
    beachBookSunbed.prototype.ionViewWillLeave = function () {
        this.configuration.ClearTimeout();
    };
    beachBookSunbed.prototype.ngOnInit = function () {
        this.getRemainingSunbed();
    };
    beachBookSunbed.prototype.Agreement = function () {
        if (this.beachProvider.sunbed.selected && this.beachProvider.sunbed.selected > 0) {
            var agreementPopover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_3__includes_popover_beachAgreement_beachAgreement__["a" /* beachAgreement */], { nav: this.navCtrl, total: this.totalprice, search: this.navparam.data.search, location: this.navparam.data.location, data: this.status, title: this.title, index: this.index, settings: this.beach_settings, selected: this.beachProvider.sunbed.selected }, { cssClass: 'agreementPopOver' });
            agreementPopover.present().then(function () {
            }, function (error) {
                console.error(error);
            });
        }
    };
    beachBookSunbed.prototype.check = function () {
        if (this.reservationBox) {
            this.agreementHelper.navCtrl = this.navCtrl;
            this.agreementHelper.navparam = { nav: this.navCtrl, total: this.totalprice, search: this.navparam.data.search, location: this.navparam.data.location, data: this.status, title: this.title, index: this.index, settings: this.beach_settings, selected: this.beachProvider.sunbed.selected };
        }
    };
    beachBookSunbed.prototype.completeReservation = function () {
        this.agreementHelper.setup();
    };
    beachBookSunbed.prototype.canReserve = function () {
        return this.agreementHelper.canMakeReservation() && this.reservationBox;
    };
    beachBookSunbed.prototype.Select = function (index, value) {
        if (this.reservationStatus == 'change-request')
            return;
        this.btn = [];
        this.btn[index] = true;
        this.selectedSunbed = value;
        this.beachProvider.sunbed = {
            values: this.btn,
            selected: value
        };
        var eventStartTime = this.navparam.data.search.start_date;
        var eventEndTime = this.navparam.data.search.end_date;
        var duration = eventEndTime - eventStartTime;
        var real = Math.floor(Math.abs((new Date(eventEndTime)).getTime() - (new Date(eventStartTime)).getTime()) / 36e5 / 24);
        if (real == 0) {
            this.totalprice = this.fixedprice * 1 * value;
        }
        else {
            this.totalprice = this.fixedprice * (real + 1) * value;
        }
        if (this.statusbooking == 'active') {
            this.totalprice = this.totalprice - parseInt(this.navparam.data.reservation.old_amount);
        }
        this.totalprice = Math.round(this.totalprice);
        if (this.oldAmount != this.totalprice) {
            this.confirmState = true;
        }
        this.status.broker_id = this.brokerid;
        this.status.count = value;
    };
    beachBookSunbed.prototype.getRemainingSunbed = function () {
        var _this = this;
        var date = new Date();
        this.api.get("grid/" + this.beach_settings.beach_id + "/extra-seats", { start_date: this.navparam.data.search ? this.getDate(this.navparam.data.search.start_date) : this.getDate(date.getMilliseconds()), end_date: this.navparam.data.search ? this.getDate(this.navparam.data.search.end_date) : this.getDate(date.getMilliseconds()) }, {}, true, true).subscribe(function (r) {
            _this.remaining_sunbed = r;
            _this.price = r.price;
            _this.fixedprice = r.price;
            _this.remain = r.count;
            _this.brokerid = r.broker_id;
            _this.getRealtimeSunbed();
        }, function (error) { });
    };
    beachBookSunbed.prototype.getRealtimeSunbed = function () {
        var _this = this;
        var timeout = setTimeout(function () {
            _this.getRemainingSunbed();
        }, 5000);
        this.configuration.setTimeout(timeout);
    };
    beachBookSunbed.prototype.getDate = function (Inputdate) {
        var isoDate = new Date(Inputdate).toISOString();
        // return `${date.getFullYear()}-${this.getDoubleStr((date.getMonth()+1).toString())}-${date.getDate()-1}`
        return isoDate && isoDate.split("Z") && isoDate.split("Z").length > 0 ? isoDate.split("T")[0] : isoDate;
    };
    //   getDoubleStr(data: string) {
    //     return data.length > 1 ? data : '0' + data;
    //   }
    beachBookSunbed.prototype.ionViewWillEnter = function () {
        this.configuration.setRequestPage(this.requestPage);
    };
    beachBookSunbed.prototype.getPrice = function () {
        return this.beachProvider.getPrice(this.beach_settings, this.status.type, this.navparam.data.location, this.navparam.data.pool) || 0;
    };
    beachBookSunbed.prototype.getTotalPrice = function () {
        var eventStartTime = this.navparam.data.pool.start_date;
        var eventEndTime = this.navparam.data.pool.end_date;
        var duration = eventEndTime - eventStartTime;
        var real = duration / (24 * 60 * 60 * 1000) == 0 ? 1 : (duration / (24 * 60 * 60 * 1000)) + 1;
        return this.getPrice() * this.selectedSunbed * real;
    };
    beachBookSunbed.prototype.confirmChange = function () {
        var _this = this;
        var optionConfirm;
        if (this.statusbooking == 'active') {
            optionConfirm = {
                id: this.navparam.data.reservation.id,
                seat: {
                    type: this.navparam.data.pool.seat_type,
                    count: this.selectedSunbed
                },
                amount: parseInt(this.totalprice),
                old_amount: parseInt(this.navparam.data.reservation.old_amount)
            };
        }
        else {
            optionConfirm = {
                id: this.navparam.data.reservation.id,
                seat: {
                    type: this.navparam.data.pool.seat_type,
                    count: this.selectedSunbed
                },
                amount: parseInt(this.totalprice),
                old_amount: 0
            };
        }
        // if(this.reservationStatus != 'booked')
        //   optionConfirm['old_amount'] = this.oldAmount;
        /*start_date:this.navparam.data.pool.start_date,
          end_date:this.navparam.data.pool.end_date,*/
        //this.getPrice()*(this.selected + ((this.sunbed && this.sunbed>0)?this.sunbed:0)),
        this.api.post('booking/update', optionConfirm, {}).subscribe(function (r) {
            _this.api.AmError(_this.configuration.translate.translate.instant('DONE'), _this.configuration.translate.translate.instant('RESERVATION_CHANGED_SUCCESSFULLY'), [{
                    text: _this.configuration.translate.translate.instant('PROCEED'), handler: function () {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__myReservation_myReservation__["a" /* myReservation */]);
                    }
                }]);
        }, function (error) {
        });
    };
    beachBookSunbed.prototype.onPay = function () {
        var _this = this;
        this.configuration.getStorage('login').then(function (a) {
            if (a && a.token) {
                var url = "loiality-points/" + a.id + "/" + _this.beach_settings.id;
                _this.api.get(url, {}, {}).subscribe(function (res) {
                    if (res != null) {
                        _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_0__select_paymethods_select_paymethods__["a" /* SelectPaymethods */], { nav: _this.navCtrl, 'total': _this.totalprice, 'points': res['points'], 'isCard': _this.beach_settings.card, search: _this.navparam.data.search, location: _this.navparam.data.location, data: _this.status.data, title: _this.title, index: _this.index, settings: _this.beach_settings, selected: _this.beachProvider.sunbed.selected, extra: 0 }, {}).present();
                    }
                    else {
                        if (_this.beach_settings.card == false) {
                            _this.translate.get("YOU_HAVE_NOT_LOYALITY", { beachName: _this.beach_settings.name }).subscribe(function (res) {
                                _this.api.showInfo(res);
                            });
                        }
                        else {
                            _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_0__select_paymethods_select_paymethods__["a" /* SelectPaymethods */], { nav: _this.navCtrl, 'total': _this.totalprice, 'points': 0, 'isCard': _this.beach_settings.card, search: _this.navparam.data.search, location: _this.navparam.data.location, data: _this.status.data, title: _this.title, index: _this.index, settings: _this.beach_settings, selected: _this.beachProvider.sunbed.selected, extra: 0 }, {}).present();
                        }
                    }
                });
            }
        }, function (error) { });
    };
    beachBookSunbed = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'beachBookSunbed',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\beachBookSunbed\beachBookSunbed.html"*/'<ion-header class="has-shadow">\n\n\n\n  <ion-navbar>\n\n    <ion-title>{{ title }}</ion-title>\n\n    <ion-buttons end>\n\n\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-list>\n\n    <h2 margined ion-text color="white">{{ \'TAP_ON_AVAILABLE_SEATS\' | translate }}</h2>\n\n\n\n    <div class="sunbedContainer">\n\n      <ion-row class="sunbedHeading">\n\n        <ion-col col-6>\n\n          <ion-row><h2 margined blackDark>{{ \'SUNBED\' |translate }} #{{ index }}</h2></ion-row>\n\n          <ion-row><h3 margined blackLight>{{ \'WITHOUT_SUNBED\' | translate }}</h3></ion-row>\n\n        </ion-col>\n\n        <!--<ion-col col-6>{{ getPrice() }} {{ configuration.currency }}/{{ \'SUNBED\' |translate }}</ion-col>-->\n\n        <ion-col col-6>{{ price | price }} {{ configuration.currency }}/{{ \'SUNBED\' |translate }}</ion-col>\n\n      </ion-row>\n\n      <div class="sunbedBg">\n\n\n\n\n\n        <ion-row class="bottom">\n\n          <div class="lotsButton" *ngFor="let btnC of [1,2,3,4,5,6,7,8];let i=index">\n\n            <button ion-button (click)="Select(i,btnC)" [ngClass]="btn[i]?\'active\':\'\'"  color="white">{{ btnC }}</button>\n\n          </div>\n\n        </ion-row>\n\n        <div class="remaining">{{ remain }} {{ \'REMAINING\' | translate }}</div>\n\n\n\n      </div>\n\n    </div>\n\n\n\n   <div class="TextContainers">\n\n\n\n     <ion-row>\n\n       <ion-col col-12>\n\n         <ion-item class="terms-condition">\n\n           <ion-checkbox start [(ngModel)]="reservationBox" (ngModelChange)="check()"></ion-checkbox>\n\n           <ion-label >{{\'ACCEPT\' |translate}} <a href="#" item-content (click)="Agreement()">{{\'TERMS_CONDITIONS\' |translate}}</a></ion-label>\n\n         </ion-item>\n\n       </ion-col>\n\n     <ion-col col-12>\n\n       <!--<h2 margined blackDark>{{ \'TOTAL\' | translate }}: {{ beachProvider.sunbed.selected*getPrice() }} {{ configuration.currency }}</h2>-->\n\n       <h2 margined blackDark>{{ \'TOTAL\' | translate }}: {{totalprice | price }} {{ configuration.currency }}</h2>\n\n\n\n     </ion-col>\n\n     <ng-container *ngIf="reservationStatus != \'change-request\'">\n\n        <ion-col col-6 *ngIf="!navparam.data.change"><button ion-button [disabled]="selectedSunbed<=0 || !canReserve()" rounded color="white" class="reserve" (click)="completeReservation()">{{ \'RESERVE\' | translate }} ({{ \'FOR\' | translate }}  {{ beach_settings.booking_time_limit }}  {{ \'MIN\' | translate }})</button></ion-col>\n\n        <ion-col col-6 *ngIf="!navparam.data.change"><button ion-button rounded color="primary" light (click)="onPay()">{{ \'PAY\' | translate }}</button></ion-col>\n\n\n\n       <ion-col col-6 *ngIf="navparam.data.change"><button ion-button rounded color="primary" light [disabled]="!confirmState"  (click)="confirmChange()" >{{ \'CONFIRM\' | translate }}</button></ion-col>\n\n\n\n     </ng-container>\n\n    </ion-row>\n\n   </div>\n\n  </ion-list>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\beachBookSunbed\beachBookSunbed.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_9__providers_agreement_helper__["a" /* AgreementHelper */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_6__app_BootstrapFirstRun__["a" /* CustomBootstrap */], __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["PopoverController"], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_4__providers_beachProvider__["a" /* BeachProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_5__providers_services__["a" /* ApiProvider */]])
    ], beachBookSunbed);
    return beachBookSunbed;
}());

// total: this.totalprice, search: this.navparam.data.search, location: this.navparam.data.location, data: this.status, title: this.title, index: this.index, settings: this.beach_settings, selected: this.beachProvider.sunbed.selected 
//# sourceMappingURL=beachBookSunbed.js.map

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return beachBookBaldaquin; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__select_paymethods_select_paymethods__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__includes_popover_beachAgreement_beachAgreement__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_beachProvider__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_BootstrapFirstRun__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__beach_beach__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_agreement_helper__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__includes_searchDupplication_searchDupplication__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











/**
 * Created by shadow-viper on 12/19/17.
 */
var beachBookBaldaquin = /** @class */ (function () {
    function beachBookBaldaquin(agreementHelper, configuration, translate, api, modalCtrl, popoverCtrl, navparam, platform, beachProvider, navCtrl) {
        var _this = this;
        this.agreementHelper = agreementHelper;
        this.configuration = configuration;
        this.translate = translate;
        this.api = api;
        this.modalCtrl = modalCtrl;
        this.popoverCtrl = popoverCtrl;
        this.navparam = navparam;
        this.platform = platform;
        this.beachProvider = beachProvider;
        this.navCtrl = navCtrl;
        this.title = '';
        this.beach_settings = [];
        this.index = '0';
        this.requestPage = 'BaldaquinBook';
        //status: any = [];
        this.status = { icon: 0, data: [] };
        this.reservationStatus = '';
        this.payReserveMsg = "this beach is not allow to do any reservation yet, but u can take in consideration the beach status view for your referance";
        this.reservationBox = false;
        this.sunbed = 0;
        this.available_sunbed = 0;
        this.confirmState = false;
        this.oldData = {};
        this.timeInstance = [];
        this.additionalSunbedPrice = 0;
        this.title = this.navparam.data.title;
        this.beach_settings = this.navparam.data.settings;
        this.reservationStatus = this.navparam.data.status;
        this.index = this.navparam.data.index;
        this.data = this.navparam.data;
        this.item = this.data.data;
        this.itemClass = this.item.image.substr(0, 3);
        this.additionalSunbedPrice = parseFloat(this.data.data.sunbed_price || '0');
        this.UpdateData();
        //this.status = this.navparam.data.data;
        this.elementPool(false);
        this.platform.ready().then(function () {
            _this.sub$1 = _this.platform.pause.subscribe(function () {
                if (_this.navCtrl.getActive().name == 'beachBook') {
                    // alert("stop");
                    _this.configuration.ClearTimeout();
                }
            }, function (error) { });
            _this.sub$2 = _this.platform.resume.subscribe(function () {
                if (_this.navCtrl.getActive().name == 'beachBook') {
                    // alert("start");
                    setTimeout(function () {
                        _this.elementPool(false);
                    }, 500);
                }
            }, function (error) { });
        }, function (error) { });
    }
    beachBookBaldaquin.prototype.UpdateData = function () {
        var slots = {};
        var seats = Object.keys(this.item.status);
        for (var i = 0; i < seats.length; i++) {
            slots[seats[i]] = [1];
        }
        this.slots = slots;
        this.zone = this.item.coords.zone;
        /* this.zone = event.zone || '';
        this.bookingStatus = event.bookingStatus;
        let available = 0, selected = 0;
        let status = this.data.data.status;
        let sides = [];
        let slots = {};
        try {

            sides = Object.keys(status);
        } catch (e) {
            console.error(e);
        }
        let findSide = function (side) {
            let configSide = '';
            let configSides = Object.keys(this.sideConfigs);
            for (let j = 0; j < configSides.length; j++) {
                if (this.sideConfigs[configSides[j]].indexOf(side) > -1) {
                    configSide = configSides[j];
                    break;
                }
            }
            return configSide;
        }.bind(this);
        for (let i = 0; i < sides.length; i++) {
            let side = sides[i],
                list = status[side],
                configSide = findSide(side);
            if (!slots[side]) {
                slots[side] = [];
            }
            for (let j = 0; j < list.length; j++) {
                let li = list[j];
                if (!this.bookingStatus[configSide] && li === 'available') {
                    available++;
                    slots[side].push(0);
                } else if (li === 'selected') {
                    selected++;
                    slots[side].push(1);
                } else {
                    slots[side].push(0);
                }
            }
            if(this.bookingStatus[configSide]) {
                slots[side] = [];
            }
        }
        if (available) {
            this.sunbed = 0;
        }
        
        return;

        */
    };
    beachBookBaldaquin.prototype.Agreement = function () {
        var _this = this;
        var agreementPopover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_4__includes_popover_beachAgreement_beachAgreement__["a" /* beachAgreement */], {
            nav: this.navCtrl,
            total: this.getPrice(),
            location: this.navparam.data.location,
            data: this.status,
            title: this.title,
            index: this.index,
            settings: this.beach_settings,
            selected: 1,
            extra: this.sunbed,
            search: this.navparam.data.search
        }, { cssClass: 'agreementPopOver' });
        agreementPopover.present().then(function (response) {
        }, function (error) {
            console.error(error);
        });
        agreementPopover.onDidDismiss(function (response) {
            if (response && response.agreed) {
                _this.reservationBox = true;
            }
        });
    };
    beachBookBaldaquin.prototype.check = function () {
        if (this.reservationBox) {
            this.agreementHelper.navCtrl = this.navCtrl;
            this.agreementHelper.navparam = { nav: this.navCtrl, total: this.getPrice(), location: this.navparam.data.location, data: this.status, title: this.title, index: this.navparam.data.data.index, number: this.navparam.data.data.number, settings: this.beach_settings, selected: 1, seats: this.data.data.seats, extra: this.sunbed, search: this.navparam.data.search, slots: this.slots, zone: this.zone };
        }
    };
    beachBookBaldaquin.prototype.completeReservation = function () {
        this.agreementHelper.setup();
    };
    beachBookBaldaquin.prototype.canReserve = function () {
        return this.agreementHelper.canMakeReservation() && this.reservationBox;
    };
    beachBookBaldaquin.prototype.ionViewWillEnter = function () {
        this.configuration.setRequestPage(this.requestPage);
    };
    beachBookBaldaquin.prototype.getPrice = function () {
        // return this.beachProvider.getPrice(this.beach_settings, this.status.type, this.navparam.data.location, this.navparam.data.pool) || 0
        return this.status.data.price || 0;
    };
    beachBookBaldaquin.prototype.getAdditionalPrice = function () {
        if (typeof this.additionalSunbedPrice !== 'undefined') {
            return this.additionalSunbedPrice;
        }
        if (typeof this.status.data.sunbeds == 'undefined') {
            return 0;
        }
        return this.status.data.sunbeds.price;
    };
    beachBookBaldaquin.prototype.getTotalPrice = function () {
        var eventStartTime = this.navparam.data.pool.start_date;
        var eventEndTime = this.navparam.data.pool.end_date;
        var days = Math.floor(Math.abs((new Date(eventEndTime)).getTime() - (new Date(eventStartTime)).getTime()) / 36e5 / 24) ? (Math.floor(Math.abs((new Date(eventEndTime)).getTime() - (new Date(eventStartTime)).getTime()) / 36e5 / 24)) + 1 : 1;
        //var total = this.getPrice() * days;?
        var aditional = this.getAdditionalPrice() * this.sunbed;
        var total = (parseFloat(this.status.data.price) + aditional) * days;
        // var sunbed_price = this.beachProvider.getPrice(this.beach_settings, 'sunbed', this.navparam.data.location, this.navparam.data.pool) || 0
        // total = total + (sunbed_price * this.sunbed);
        return total;
    };
    beachBookBaldaquin.prototype.changePosition = function () {
        var posOption = {
            beach_ids: this.navparam.data.pool.beach_ids,
            customer_id: this.navparam.data.pool.customer_id,
            seat_type: this.navparam.data.pool.seat_type,
            seat_zone: ['front', 'middle', 'back'],
            refresh: true,
            excluded_days: this.navparam.data.reservation.released_days,
            start_date: this.navparam.data.pool.start_date,
            end_date: this.navparam.data.pool.end_date
        };
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__beach_beach__["a" /* BeachPage */], { change: true, SearchObj: posOption, title2: this.title, id: this.navparam.data.reservation.beach_id, reservation: this.navparam.data.reservation, context: "search" });
    };
    beachBookBaldaquin.prototype.confirmChange = function () {
        // let optionConfirm={
        //     id:this.navparam.data.reservation.id,
        //     seat:{
        //         type:this.navparam.data.pool.seat_type,
        //         zone:this.navparam.data.location,//this.navparam.data.reservation.seat.zone,
        //         number:this.index,
        //         slots:this.navparam.data.reservation.seat.slots,
        //         new_slots:this.status.data.slots,
        //         extra_seats:this.sunbed,
        //         position:{x:this.navparam.data.pool.seat_position.x,y:this.navparam.data.pool.seat_position.y}
        //     },
        //     amount:this.getTotal(),
        //     old_amount:this.oldAmount
        // };
        // // if(this.reservationStatus != 'booked')
        // //   optionConfirm['old_amount'] = this.oldAmount;
        // /*start_date:this.navparam.data.pool.start_date,
        //   end_date:this.navparam.data.pool.end_date,*/
        // //this.getPrice()*(this.selected + ((this.sunbed && this.sunbed>0)?this.sunbed:0)),
        // this.api.post('booking/update',optionConfirm,{}).subscribe(r=>{
        //     this.api.AmError(this.configuration.translate.translate.instant('DONE'),this.configuration.translate.translate.instant('RESERVATION_CHANGED_SUCCESSFULLY'),[{text:this.configuration.translate.translate.instant('PROCEED'),handler:()=>{
        //             this.navCtrl.setRoot(myReservation);
        //         }}])
        // },error=>{
        //
        // })
    };
    beachBookBaldaquin.prototype.isReserveAvailable = function () {
        var self = this;
        return self.beach_settings && self.beach_settings.booking_time_limit && self.beach_settings.booking_time_limit > 0 && self.beach_settings.booking_time_limit != '0';
    };
    beachBookBaldaquin.prototype.onPay = function () {
        var _this = this;
        this.configuration.getStorage('login').then(function (a) {
            if (a && a.token) {
                // TODO:// Change message accordingly
                // if (a.guest || a.tour) {
                // 	let popoverSignup = this.popoverCtrl.create(searchDupplication, { msg: this.translate.instant('GUEST_PERMISSION') });
                // 	popoverSignup.present();
                // 	return false;
                // }
                // TODO:// Change message accordingly
                if (a.guest) {
                    var popoverSignup = _this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_10__includes_searchDupplication_searchDupplication__["a" /* searchDupplication */], { msg: _this.translate.instant('BOOKING_PERMISSION') });
                    popoverSignup.present();
                    return false;
                }
                else if (a.tour) {
                    var popoverSignup = _this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_10__includes_searchDupplication_searchDupplication__["a" /* searchDupplication */], { msg: _this.translate.instant('BOOKING_PERMISSION'),
                        redirect: true });
                    popoverSignup.present();
                    // popoverSignup.onDidDismiss(data => {
                    // 	 this.configuration.clearStorage().then(() => {
                    // //this.splashScreen.show();
                    //    this.app.getRootNav().setRoot(LoginPage);
                    //  });
                    // });
                    return false;
                }
                var url = "loiality-points/" + a.id + "/" + _this.beach_settings.id;
                _this.api.get(url, {}, {}).subscribe(function (res) {
                    if (res && res.points && res.points != '0') {
                        _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_0__select_paymethods_select_paymethods__["a" /* SelectPaymethods */], { nav: _this.navCtrl, 'total': _this.getTotalPrice(), 'points': res['points'], 'isCard': _this.beach_settings.card, search: _this.navparam.data.search, location: _this.navparam.data.location, data: _this.status.data, title: _this.title, index: _this.index, settings: _this.beach_settings, selected: 1, extra: 0 }, {}).present();
                    }
                    else {
                        if (_this.beach_settings.card == false) {
                            _this.translate.get("YOU_HAVE_NOT_LOYALITY", { beachName: _this.beach_settings.name }).subscribe(function (res) {
                                _this.api.showInfo(res);
                            });
                        }
                        else {
                            _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_0__select_paymethods_select_paymethods__["a" /* SelectPaymethods */], { nav: _this.navCtrl, 'total': _this.getTotalPrice(), 'points': 0, 'isCard': _this.beach_settings.card, search: _this.navparam.data.search, location: _this.navparam.data.location, data: _this.status.data, title: _this.title, index: _this.index, settings: _this.beach_settings, selected: 1, extra: 0 }, {}).present();
                        }
                    }
                });
            }
        }, function (error) { });
    };
    beachBookBaldaquin.prototype.getExtraSunbedArr = function () {
        return Array.from(new Array(this.avail_sunbed()), function (val, index) { return index + 1; });
    };
    beachBookBaldaquin.prototype.avail_sunbed = function () {
        if (this.beach_settings && this.beach_settings.seats && this.status.data.sunbeds) {
            if (parseInt(this.beach_settings.seats.extra) > parseInt(this.status.data.sunbeds.count)) {
                return parseInt(this.status.data.sunbeds.count);
            }
            else {
                return parseInt(this.beach_settings.seats.extra);
            }
        }
        else if (!this.status.data.sunbeds) {
            return parseInt(this.beach_settings.seats.extra);
        }
        return 0;
    };
    beachBookBaldaquin.prototype.onChangeExtra = function (extra) {
        console.warn('extra sunbed');
        console.warn(extra);
        if (this.sunbed != extra) {
            this.sunbed = extra;
        }
        else {
            this.sunbed = 0;
        }
        if (this.navparam.data.reservation && (this.sunbed != this.navparam.data.reservation.seat.extra_seats))
            this.confirmState = true;
        else
            this.confirmState = false;
    };
    beachBookBaldaquin.prototype.elementPool = function (skipFirst) {
        if (this.navparam.data.pool) {
            if (!skipFirst) {
                this.element(false);
            }
            this.configuration.ClearTimeout();
            if (this.timeInstance) {
                clearTimeout(this.timeInstance);
            }
            /*this.timeInstance = setTimeout(() => {
                
                this.element(true);
                this.elementPool(true);
                this.configuration.setTimeout(this.timeInstance)
            }, 5000);*/
        }
    };
    beachBookBaldaquin.prototype.element = function (showLoader) {
        var _this = this;
        var searchParams = JSON.parse(JSON.stringify(this.navparam.data.pool));
        searchParams.start_date = this.getLocalDateTime(searchParams.start_date);
        searchParams.end_date = this.getLocalDateTime(searchParams.end_date);
        this.api.post('search', searchParams, {}, showLoader).subscribe(function (r) {
            if (r && r.length) {
                if (!showLoader) {
                    _this.status.data = r[0];
                    _this.oldData = r[0];
                }
                else {
                    _this.status.data.status_icon = r[0].status_icon;
                    _this.status.data.sunbeds = r[0].sunbeds;
                }
            }
        }, function (error) { });
    };
    beachBookBaldaquin.prototype.getLocalDateTime = function (date) {
        var dateObj = new Date(date);
        var hoursWithTimezone = dateObj.getHours() + ((-1) * (dateObj.getTimezoneOffset() / 60));
        return new Date(new Date(date).setHours(hoursWithTimezone)).getTime();
    };
    beachBookBaldaquin = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
            selector: 'beachBookBaldaquin',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\beachBookBaldaquin\beachBookBaldaquin.html"*/'<ion-header class="has-shadow">\n\n	<ion-navbar>\n		<ion-title>{{ title }}</ion-title>\n		<ion-buttons end>\n\n		</ion-buttons>\n	</ion-navbar>\n\n</ion-header>\n\n<ion-content>\n	<ion-list>\n		<!-- <h2 margined ion-text color="white"></h2> -->\n\n		<div class="sunbedContainer">\n			<ion-row class="sunbedHeading">\n				<ion-col col-6>\n					<ion-row>\n						<h2 margined blackDark>{{ \'NUMBER\' | translate }}: {{ index }}</h2>\n					</ion-row>\n				</ion-col>\n				<ion-col col-6>{{ getPrice() | price }} {{ configuration.currency }} / {{ \'BALDAQUIN\' | translate }}</ion-col>\n			</ion-row>\n			<div class="baldaquin-img-div" *ngIf="item">\n				<img [src]="item.img" [ngClass]="\'type_\'+itemClass">\n\n			</div>\n			<div>\n				<ion-row class="baldaquin-bottom-div">\n					<ion-col>\n						<div class="seats">{{ \'SIZE\' | translate }}</div>\n						<div *ngIf="item.seats>1" class="availability persons">{{item.seats}} {{ \'PERSONS\' | translate }}</div>\n						<div *ngIf="!(item.seats>1)" class="availability persons">{{item.seats}} {{ \'PERSONS\' | translate }}</div>\n					</ion-col>\n				</ion-row>\n			</div>\n		</div>\n\n		<ion-row *ngIf="(avail_sunbed()>0 && reservationStatus != \'change-request\') && beach_settings.sunbeds_at_baldaquin" class="extra-sunbeds">\n			<ion-col col-12>\n				<h4 no-margin class="additional" ion-text color="primary">{{ \'DO_YOU_WANT_ADDITIONAL_SUNBED\' | translate }}</h4>\n			</ion-col>\n			<ion-col col-2 no-padding *ngFor="let extra of getExtraSunbedArr(); let i =index">\n				<button ion-button (click)="onChangeExtra(extra)" [disabled]="(status.icon - selected)" color="{{ sunbed==extra?\'primary\':\'white\' }}">{{\n					extra }}</button>\n			</ion-col>\n			<ion-col col-6></ion-col>\n		</ion-row>\n\n		<div class="TextContainers">\n			<ion-item class="terms-condition">\n				<ion-checkbox start [(ngModel)]="reservationBox" (ngModelChange)="check()"></ion-checkbox>\n				<ion-label>{{\'ACCEPT\' |translate}} <a href="#" item-content (click)="Agreement()">{{\'TERMS_CONDITIONS\'\n						|translate}}</a>\n				</ion-label>\n			</ion-item>\n\n			<h2 blackDark>{{ \'TOTAL\' | translate }}: {{ getTotalPrice() | price }} {{ configuration.currency }}</h2>\n			\n			<ng-container *ngIf="reservationStatus != \'change-request\'">\n				<div *ngIf="beach_settings.only_cc">\n					<button [disabled]="!reservationBox" ion-button round block color="primary" light (click)="onPay()">{{\n						\'PAY\' |translate }}</button>\n				</div>\n\n			\n				<ion-row *ngIf="!beach_settings.only_cc">\n					<ng-container *ngIf="beach_settings.without_pay_reserve">\n					<ion-col>\n						<button ion-button [disabled]="(!reservationBox || !isReserveAvailable()) || !canReserve()" round block color="white"\n						 class="reserve" (click)="completeReservation()">{{ \'RESERVE\' | translate }} ({{\n							\'FOR\' | translate }} {{ beach_settings.booking_time_limit }} {{ \'MIN\' | translate }})</button>\n					</ion-col>\n					<ion-col *ngIf="beach_settings.card">\n						<button [disabled]="!reservationBox" ion-button round block color="primary" light (click)="onPay()">{{\n							\'PAY\' |translate }}</button>\n					</ion-col>\n				</ng-container>\n				<ng-container *ngIf="!beach_settings.without_pay_reserve">\n					<span>\n						{{payReserveMsg}}\n					</span>\n				</ng-container>\n				</ion-row>\n			</ng-container>\n\n		</div>\n	</ion-list>\n\n\n</ion-content>'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\beachBookBaldaquin\beachBookBaldaquin.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_9__providers_agreement_helper__["a" /* AgreementHelper */],
            __WEBPACK_IMPORTED_MODULE_6__app_BootstrapFirstRun__["a" /* CustomBootstrap */],
            __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1__providers_services__["a" /* ApiProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["ModalController"],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["PopoverController"],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["Platform"],
            __WEBPACK_IMPORTED_MODULE_5__providers_beachProvider__["a" /* BeachProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["NavController"]])
    ], beachBookBaldaquin);
    return beachBookBaldaquin;
}());

//# sourceMappingURL=beachBookBaldaquin.js.map

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopoverWeather; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_BootstrapFirstRun__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(18);
/**
 * Created by shadow-viper on 12/16/17.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PopoverWeather = /** @class */ (function () {
    function PopoverWeather(viewCtrl, navparam, configuration, api, translate, platform) {
        this.viewCtrl = viewCtrl;
        this.navparam = navparam;
        this.configuration = configuration;
        this.api = api;
        this.translate = translate;
        this.platform = platform;
        this.latLong = { lat: '', long: '' };
        this.currentweather = {};
        this.beach_id = this.navparam.data.beach_ids;
        this.title = this.navparam.data.title;
    }
    PopoverWeather.prototype.ngOnInit = function () {
        var _this = this;
        this.getLatLong();
        this.getWeather();
        this.platform.registerBackButtonAction(function (event) {
            _this.viewCtrl.dismiss();
        });
    };
    PopoverWeather.prototype.populateWeather = function () {
        var _this = this;
        if (this.latLong && this.latLong.lat != '') {
            this.api.get('weather', this.latLong, { 'Content-Type': 'application/json' }, true).subscribe(function (r) {
                _this.currentweather = r.results.current_condition[0];
                _this.weather = _this.currentweather.weatherDesc[0].value;
                console.log("weather - -", _this.weather);
                _this.currtemp = _this.currentweather.temp_C;
                var orgresults = r.results.weather[0].hourly;
                //this.items = r.results.weather[0].hourly;
                for (var i = 0; i < orgresults.length; i++) {
                    var time = orgresults[i].time;
                    var mins = time.substr(time.length - 2, 2);
                    var hour = time.substr(0, time.length - 2) || '0';
                    if (hour.length < 2) {
                        hour = '0' + hour;
                    }
                    if (mins.length < 2) {
                        mins = '0' + mins;
                    }
                    orgresults[i].orgtime = hour + ':' + mins;
                }
                _this.items = orgresults.slice(3, 8);
                // this.configuration.setStorage('weather', { time: moment.now(), weather: r, latLong: this.latLong });
            }, function (error) {
            });
        }
    };
    PopoverWeather.prototype.getLatLong = function () {
        this.latLong = { lat: this.navparam.data.settings.latitude, lon: this.navparam.data.settings.longitude };
    };
    PopoverWeather.prototype.getWeather = function () {
        // this.configuration.getStorage('weather').then((r) => {
        //     if (r && r.weather) {
        //         this.items = r.weather;
        //     }
        //     if (r && r.time && r.latLong && r.latLong == this.latLong && moment(moment.now()).diff(r.time, 'minutes') < 10) {
        //         return;
        //     }
        this.populateWeather();
        // })
    };
    PopoverWeather.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    PopoverWeather = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'popover_weather',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\popover\weatherPopover\popover.weather.html"*/'<!-- <ion-header>\n\n\n\n  <ion-navbar>\n\n      <ion-buttons right>\n\n          <button ion-button icon-only class="back-button" (click)="close()">\n\n        <ion-icon name="close-circle"></ion-icon>\n\n      </button>\n\n      </ion-buttons>\n\n      </ion-navbar>\n\n\n\n</ion-header> -->\n\n<ion-content padding class="main-content" (click)="close()">\n\n  <!-- <div class="head-div">\n\n    <p>{{title}}</p>\n\n  </div> -->\n\n  <div class="main-title">{{((weather ==\'Partly cloudy\')||(weather ==\'Hailing\')||(weather ==\'Cloudy\')||(weather ==\'Foggy\')||(weather ==\'Snow storm\')||(weather ==\'Rain storm\')||(weather ==\'Falling snow\')||(weather ==\'Hail storm\')||(weather ==\'Cloud with rain\')||(weather ==\'Rainy\')||(weather ==\'Sunny\')||(weather ==\'Snowy\')||(weather ==\'Windy\')||(weather ==\'Stormy\'))?weather:\'\'}}</div>\n\n  <div class="main-div">\n\n    <div class="sub-div">\n\n      <!-- <button class="cloud-icon" ion-button icon-only>\n\n        <ion-icon name="cloudy"></ion-icon>\n\n      </button> -->\n\n      <img class= "weather-img" *ngIf="weather ==\'Partly cloudy\'" src="https://img.icons8.com/dusk/64/000000/partly-cloudy-day.png">\n\n      <img class= "weather-img" *ngIf="weather ==\'Rainy\'" src="https://img.icons8.com/ultraviolet/40/000000/rainy-weather.png">\n\n      <img class= "weather-img" *ngIf="weather ==\'Sunny\'" src="https://img.icons8.com/dusk/64/000000/sun.png">\n\n      <img class= "weather-img" *ngIf="weather ==\'Snowy\'" src="https://img.icons8.com/dusk/64/000000/snow.png">\n\n      <img class= "weather-img" *ngIf="weather ==\'Windy\'" src="https://img.icons8.com/dusk/64/000000/windy-weather.png">\n\n      <img class= "weather-img" *ngIf="weather ==\'Stormy\'" src="https://img.icons8.com/office/16/000000/chance-of-storm.png">\n\n      <img class= "weather-img" *ngIf="weather ==\'Cloud with rain\'" src="https://img.icons8.com/dusk/64/000000/rain.png">\n\n      <img class= "weather-img" *ngIf="weather ==\'Hail storm\'" src="https://img.icons8.com/ultraviolet/40/000000/cloud-lighting.png">\n\n      <img class= "weather-img" *ngIf="weather ==\'Falling snow\'" src="https://img.icons8.com/dusk/64/000000/snow.png">\n\n      <img class= "weather-img" *ngIf="weather ==\'Rain storm\'" src="https://img.icons8.com/dusk/64/000000/storm.png">\n\n      <img class= "weather-img" *ngIf="weather ==\'Snow storm\'" src="https://img.icons8.com/dusk/64/000000/snow-storm.png">\n\n      <img class= "weather-img" *ngIf="weather ==\'Cloudy\'" src="https://img.icons8.com/dusk/64/000000/clouds.png">\n\n      <img class= "weather-img" *ngIf="weather ==\'Foggy\'" src="https://img.icons8.com/dusk/64/000000/foggy-night-1.png">\n\n      <img class= "weather-img" *ngIf="weather ==\'Hailing\'" src="https://img.icons8.com/dusk/64/000000/hail.png">\n\n      <!-- <img class= "weather-img" *ngIf="!(weather==\'Stormy\') && !(weather == \'Cloudy\') && !(weather==\'Sunny\') && !(weather==\'Snowy\') && !(weather==\'Stormy\') && !(weather==\'Windy\')" src="./assets/imgs/beaches/clouds.png"> -->\n\n      <h2>{{currtemp}}°</h2>\n\n    </div>\n\n  </div>\n\n\n\n  <!-- <ion-list class="languageHolder" (click)="close()" *ngIf="items">\n\n  <ion-item no-lines *ngFor="let item of items | ToArray:[\'description\']; let i=index;">\n\n   <div class="tick" [ngClass]="item |key:true"></div> <div class="name">{{ "weather." + (item |key:true) | translate }} {{ item | key:false }}</div>\n\n  </ion-item>\n\n</ion-list> -->\n\n\n\n  <div class="sub-title">{{\'HOURLY_TEXT\' | translate}}</div>\n\n  <div class="wind-det">\n\n    <ion-col class="wind-cols" *ngFor="let item of items">\n\n      <div class="wind-items">\n\n        <div>{{item.orgtime}}</div>\n\n        <div class="each-weather">\n\n          <!-- <button class="weather-btns" ion-button icon-only >\n\n          <ion-icon name="cloudy"></ion-icon>\n\n        </button>  -->\n\n          <img class="image" src={{item.weatherIconUrl[0].value}} />\n\n          <div class="each-weather">{{item.tempC}}°</div>\n\n          <div class="dot"></div>\n\n          <div class="each-weather"><img src="./assets/imgs/waterdrop.png" /> <span>{{item.chanceofrain}}%</span> </div>\n\n        </div>\n\n\n\n\n\n\n\n        <div class="each-weather">\n\n          <img class="image" src="./assets/imgs/beaches/clouds.png" />\n\n          <div>{{item.cloudcover}}%</div>\n\n        </div>\n\n        <div class="each-weather">\n\n          <img class="image" src="./assets/imgs/beaches/wind.png" />\n\n          <div class="wind">{{item.WindGustMiles}}m/s</div>\n\n        </div>\n\n        <!-- <div class="each-weather">\n\n          <img class="image" src="./assets/imgs/weather/seatemp.png" />\n\n          <div class="wind">{{item.waterTemp_C}}°</div>\n\n        </div> -->\n\n        <div class="each-weather">\n\n          <img class="image" src="./assets/imgs/weather/uv.png" />\n\n          <div>{{item.uvIndex}}</div>\n\n        </div>\n\n\n\n      </div>\n\n\n\n    </ion-col>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\popover\weatherPopover\popover.weather.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__app_BootstrapFirstRun__["a" /* CustomBootstrap */], __WEBPACK_IMPORTED_MODULE_3__providers_services__["a" /* ApiProvider */], __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"]])
    ], PopoverWeather);
    return PopoverWeather;
}());

//# sourceMappingURL=popover.weather.js.map

/***/ }),

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarPopoverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// let date=new Date();
var CalendarPopoverPage = /** @class */ (function () {
    function CalendarPopoverPage(viewCtrl, navParam) {
        this.viewCtrl = viewCtrl;
        this.navParam = navParam;
        this.optionsRange = this.navParam.data.options;
        if (this.navParam.data.options && this.navParam.data.options.from && this.navParam.data.options.to) {
            this.dateRange = {
                from: null,
                to: null
            };
            this.dateRange.from = this.navParam.data.options.from;
        }
        if (this.navParam.data.sfrom) {
            this.dateRange = this.navParam.data.sfrom;
        }
    }
    CalendarPopoverPage.prototype.doClose = function () {
        this.viewCtrl.dismiss(this.dateRange);
    };
    CalendarPopoverPage.prototype.onChange = function (event) {
        if (this.navParam.data.options && this.navParam.data.options.from && this.navParam.data.options.to) {
            this.dateRange = {
                from: null,
                to: null
            };
            this.optionsRange = {};
            this.optionsRange = this.navParam.data.options;
            this.dateRange.from = this.navParam.data.options.from;
            if (!event.to && event.from) {
                this.optionsRange.to = event.from;
                this.dateRange.to = event.from;
            }
            if (event.to) {
                this.dateRange.to = event.to;
                this.optionsRange.to = event.to;
            }
        }
    };
    CalendarPopoverPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-calendar-popover',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\searchMaster\calendar-popover\calendar-popover.html"*/'<ion-calendar [(ngModel)]="dateRange"\n\n              [options]="optionsRange"\n\n              (onChange)="onChange($event)"\n\n              (change)="onChange($event)"\n\n              [type]="\'moment\'" #dateChange>\n\n</ion-calendar>\n\n<button ion-button clear block (click)="doClose()">{{ \'DONE\' | translate }}</button>\n\n\n\n\n\n'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\searchMaster\calendar-popover\calendar-popover.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], CalendarPopoverPage);
    return CalendarPopoverPage;
}());

//# sourceMappingURL=calendar-popover.js.map

/***/ }),

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_BootstrapFirstRun__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__cart_cart__ = __webpack_require__(167);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MenuPage = /** @class */ (function () {
    function MenuPage(platform, navCtrl, navParams, alertCtrl, viewController, configuration, config, api, events, ngZone) {
        var _this = this;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.viewController = viewController;
        this.configuration = configuration;
        this.config = config;
        this.api = api;
        this.events = events;
        this.ngZone = ngZone;
        this.menu = []; // menu
        this.beach_settings = [];
        this.selectedToppings = [];
        this.isMenuDetails = { status: false, data: [] };
        this.quantity = 1;
        this.mention = '';
        this.cartAmount = 0;
        this.myCart = {};
        this.itemsShown = false;
        this.require_call = false;
        this.showImgFullscreen = false;
        this.beach_settings = JSON.parse(localStorage.getItem('beachsettings') || '[]');
        this.platform.ready().then(function () {
            if (navParams && navParams.data && navParams.data.beach_id) {
                _this.beach_id = navParams.data.beach_id;
                _this.showImgFullscreen = navParams.data.showImgFullscreen;
                _this.currentDate = __WEBPACK_IMPORTED_MODULE_4_moment__().format('YYYY-MM-DD');
                _this.reservation_id = '';
                _this.loadMenu();
                return;
            }
            _this.events.subscribe('page:beachmenu', function (param) {
                _this.beach_id = param.id;
                _this.currentDate = param.startD;
                _this.reservation_id = param.reserveId;
                _this.loadMenu();
            });
            _this.events.subscribe('cart:added', function (data) {
                if (!data) {
                    return;
                }
                _this.configuration.getStorage('tab').then(function (res) {
                    var len = res.cart.data.length;
                    var cnt = 0;
                    for (var i = 0; i < len; i++) {
                        cnt += res.cart.data[i].quantity;
                    }
                    _this.cartAmount = cnt;
                });
                //this.loadMenu();
                _this.configuration.getStorage('menu').then(function (r) {
                    _this.menu = r[_this.beach_id + _this.currentDate];
                });
            });
            _this.events.subscribe('cart:reset', function (data) {
                _this.configuration.getStorage('tab').then(function (res) {
                    _this.cartAmount = 0;
                    _this.selectedToppings = [];
                    _this.quantity = 1;
                    _this.mention = '';
                    _this.myCart = {};
                    _this.clean(false);
                });
                if (_this.navCtrl.getActive().name === "CartPage") {
                    _this.navCtrl.pop();
                }
            });
            _this.sub1$ = _this.platform.resume.subscribe(function () {
                _this.reloadData();
            });
            _this.configuration.getStorage('reservation').then(function (r) {
                if (r) {
                    _this.reservation = r;
                }
            });
        });
    }
    MenuPage.prototype.onNewNotification = function (data) {
        var _this = this;
        this.ngZone.run(function () {
            if (data && data.entity === 'reservation') {
                _this.reloadData();
            }
        });
    };
    MenuPage.prototype.reloadData = function () {
        var _this = this;
        this.configuration.getStorage('login').then(function (a) {
            if (a && a.token) {
                _this.api.get("booking/" + a.phone, {}, {}, true, false).subscribe(function (r) {
                    if (r && r.length > 0)
                        _this.configuration.setStorage('reservation', r[0]).then(function () {
                        }, function (error) { });
                }, function (error) { });
            }
        });
    };
    MenuPage.prototype.onClose = function () {
        this.viewController.dismiss();
    };
    MenuPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.configuration.getStorage('tab').then(function (res) {
            if (res && res.cart && res.cart.data) {
                var len = res.cart.data.length;
                var cnt = 0;
                for (var i = 0; i < len; i++) {
                    cnt += res.cart.data[i].quantity;
                }
                _this.cartAmount = cnt;
            }
            else {
                _this.cartAmount = 0;
                _this.selectedToppings = [];
                _this.quantity = 1;
                _this.mention = '';
                _this.myCart = {};
                _this.clean(false);
            }
        });
    };
    MenuPage.prototype.loadMenu = function () {
        var _this = this;
        var ss = this.beach_settings.find(function (item) {
            return item.beach_id == _this.beach_id;
        });
        if (ss) {
            this.currency = ss.currency;
            this.require_call = ss.require_call;
        }
        if (this.beach_id) {
            this.configuration.getStorage('menu').then(function (a) {
                if (a && a[_this.beach_id] && a.time && __WEBPACK_IMPORTED_MODULE_4_moment__(__WEBPACK_IMPORTED_MODULE_4_moment__["now"]()).diff(a.time, 'minutes') < 10) {
                    _this.menu = a[_this.beach_id + _this.currentDate];
                    return;
                }
                _this.api.get('menu/' + _this.beach_id, {}, { 'Content-Type': 'application/json' }, false, false).subscribe(function (r) {
                    _this.menu = r;
                    _this.configuration.setStorage('menu', (_a = {}, _a[_this.beach_id + _this.currentDate] = r, _a.time = __WEBPACK_IMPORTED_MODULE_4_moment__["now"](), _a));
                    var _a;
                }, function (error) {
                });
            });
        }
    };
    MenuPage.prototype.backMenu = function () {
        this.isMenuDetails.status = false;
    };
    MenuPage.prototype.openCart = function () {
        this.shouldResetEverything = false;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__cart_cart__["a" /* CartPage */], { currency: this.currency });
    };
    MenuPage.prototype.gotoSelection = function (item) {
        if (!this.reservation_id)
            return;
        this.isMenuDetails.data = item;
        this.clean(true);
    };
    MenuPage.prototype.getNumberPrice = function (price) {
        var tmp = price.split("$");
        return tmp[1];
    };
    MenuPage.prototype.clean = function (status) {
        this.quantity = 1;
        this.mention = '';
        this.selectedToppings = [];
        this.isMenuDetails.status = status;
    };
    MenuPage.prototype.toggleItems = function (item) {
        item.itemsShown = !item.itemsShown;
        this.menu.forEach(function (element) {
            if (element != item)
                element.itemsShown = false;
        });
    };
    MenuPage.prototype.setBackButtonAction = function () {
        var _this = this;
        this.navBar.backButtonClick = function () {
            _this.backButtonsHelper();
        };
    };
    MenuPage.prototype.add = function (a) {
        var data = JSON.parse(JSON.stringify(a));
        if (this.quantity > 0) {
            data.quantity = this.quantity;
            data.beach_id = this.beach_id;
            data.mention = this.mention;
            data.toppings = this.selectedToppings;
            this.events.publish('cart:received', data);
            // this.addCart();
            this.clean(false);
        }
    };
    MenuPage.prototype.backButtonsHelper = function () {
        var _this = this;
        if (this.isMenuDetails.status == true) {
            setTimeout(function () {
                _this.isMenuDetails.status = false;
                // this.loaded=0;
            }, 500);
            return;
        }
        this.navCtrl.pop();
    };
    MenuPage.prototype.selectTopping = function (toppings, index) {
        if (this.selectedToppings[index]) {
            delete this.selectedToppings[index];
            this.isMenuDetails.data.price = (this.isMenuDetails.data.price | 0) - (toppings.price | 0);
        }
        else {
            this.selectedToppings[index] = toppings;
            this.isMenuDetails.data.price = (this.isMenuDetails.data.price | 0) + (toppings.price | 0);
        }
    };
    MenuPage.prototype.counter = function (val) {
        if ((val < 0 && this.quantity > 0) || val > 0 && this.quantity < 19)
            this.quantity += val;
    };
    MenuPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.events.subscribe('app:notification', function (data) { return _this.onNewNotification(data); });
    };
    MenuPage.prototype.ionViewWillLeave = function () {
        this.events.unsubscribe('app:notification');
        if (this.sub1$)
            this.sub1$.unsubscribe();
    };
    MenuPage.prototype.showConfirm = function () {
        this.confirmPopover = this.alertCtrl.create({
            title: 'Do you want to call the waiter?',
            buttons: [
                {
                    text: this.config.translate.translate.instant('Yes'),
                    role: 'ok',
                    handler: function () {
                    }
                },
                {
                    text: this.config.translate.translate.instant('No'),
                    role: 'cancel',
                    handler: function () {
                    }
                }
            ],
            enableBackdropDismiss: false,
        });
        this.confirmPopover.present();
        return this.confirmPopover;
    };
    MenuPage.prototype.wantCall = function () {
        var _this = this;
        this.showConfirm().onDidDismiss(function (data, role) {
            if (role === 'ok') {
                var reservationID = _this.reservation_id;
                var waiter_id_1;
                _this.configuration.getStorage('login').then(function (a) {
                    if (a && a.token) {
                        _this.api.get("booking/" + a.phone, {}, {}, true, false).subscribe(function (r) {
                            if (r && r.length > 0) {
                                waiter_id_1 = r[0].waiter_id;
                                var param = {
                                    "reservation_id": _this.reservation_id,
                                    "waiter_id": waiter_id_1
                                };
                                _this.api.post('call', param, { 'Content-Type': 'application/json' }, false, false).subscribe(function (r) {
                                }, function (error) {
                                });
                                // this.configuration.setStorage('reservation', r[0]).then(() => {
                                // }, error => { });
                            }
                            else {
                                _this.navCtrl.pop();
                            }
                        }, function (error) { });
                    }
                });
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Navbar"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Navbar"])
    ], MenuPage.prototype, "navBar", void 0);
    MenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-menu',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\menu\menu.html"*/'<!--\n\n  Generated template for the MenuPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header class="has-shadow" #header>\n\n  <link rel=\'stylesheet\' href=\'https://use.fontawesome.com/releases/v5.7.0/css/all.css\' integrity=\'sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ\' crossorigin=\'anonymous\'>\n\n  <ion-navbar>\n\n    <ion-buttons start>\n\n      <button ion-button icon-only clear (click)="backMenu()" class="back_btn" item-start *ngIf="isMenuDetails.status"><ion-icon name="arrow-back"></ion-icon></button>\n\n    </ion-buttons>\n\n    <ion-title>{{ \'MENU\' | translate }}</ion-title>\n\n    <ion-buttons end *ngIf="reservation_id&& !require_call">\n\n      <button id="notification-button" ion-button icon-only (click)="openCart()"><ion-icon name="cart"><ion-badge id="notifications-badge" color="danger">{{(cartAmount == 0)?\'\':cartAmount}}</ion-badge></ion-icon></button>\n\n    </ion-buttons>\n\n    <!-- <ion-buttons end *ngIf="(!reservation_id || require_call)&&(reservation.status==\'active\')"> -->\n\n      <ion-buttons end *ngIf="!reservation_id">\n\n        <!-- <button id="notification-button" ion-button icon-only ><ion-icon name="call"><ion-badge id="notifications-badge" color="danger"></ion-badge></ion-icon></button> -->\n\n        <!-- <button id="notification-button" ion-button icon-only ><ion-badge id="notifications-badge" color="danger"><i class="fas fa-concierge-bell" style="color:#fe5295;font-size:36px;"></i></ion-badge></button> -->\n\n        <div *ngIf="reservation && require_call">\n\n            <button *ngIf="reservation.status == \'active\'" id="notification-button" ion-button icon-only (click)="wantCall()"><i class="fas fa-concierge-bell" style="color:#fe5295;font-size:22px;margin-right: 5px;"></i></button>\n\n        </div>\n\n        \n\n      </ion-buttons>\n\n    <ion-buttons end *ngIf="!reservation_id">\n\n      <button ion-button icon-only (click)="onClose()"><ion-icon name="ios-close-outline" style="margin-right: 5px;"></ion-icon></button>\n\n    </ion-buttons>\n\n    \n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding class="beach-menu">\n\n\n\n  <div *ngIf="!isMenuDetails.status">\n\n    <ion-card *ngFor="let item of menu" class="parentCard" [class.itemsShown]="item.itemsShown">\n\n      <ion-row class="category" (click)="toggleItems(item)">\n\n        <span ion-text text-capitalize color="primary" class="category-name">{{item.name}}</span>\n\n        <ion-icon color="primary" [name]="item.itemsShown ? \'ios-arrow-up\' : \'ios-arrow-down\'"></ion-icon>\n\n      </ion-row>\n\n      <div *ngIf="item.itemsShown" class="mainContent">\n\n        <ion-row *ngFor="let content of item.products" class="ItemContents">\n\n          <ion-col col-12>\n\n              <div class="name topSection">{{ content.name | slice:0:100 }}</div>\n\n          </ion-col>\n\n            \n\n          <ng-container *ngIf="content.image">\n\n              <ion-col col-3>\n\n                  <img *ngIf="!showImgFullscreen" [src]="content.image" (click)="gotoSelection(content);" />\n\n                  <img *ngIf="showImgFullscreen" [src]="content.image" imageViewer />\n\n                </ion-col>\n\n                <ion-col col-6 (click)="gotoSelection(content);">\n\n                  <!-- <div class="name topSection">{{ content.name | slice:0:100 }}</div> -->\n\n                  <div class="description bottomSection">{{ content.description | slice:0:200}}</div>\n\n                </ion-col>\n\n          </ng-container>\n\n          <ng-container *ngIf="!content.image">\n\n              <ion-col col-9 (click)="gotoSelection(content);">\n\n                  <!-- <div class="name topSection">{{ content.name | slice:0:100 }}</div> -->\n\n                  <div class="description bottomSection">{{ content.description | slice:0:200}}</div>\n\n                </ion-col>\n\n          </ng-container>\n\n          <ion-col col-3>\n\n            <div class="add-amount"><div class="price topSection">{{ content.price}} {{currency}}</div>\n\n            <div class="addBtn bottomSection" *ngIf="reservation_id&&!require_call"><button ion-button color="primary" (click)="add(content);" rounded>{{ \'ADD\' | translate }}</button> </div>\n\n          </div>\n\n            \n\n          </ion-col>\n\n        </ion-row>\n\n      </div>\n\n    </ion-card>\n\n\n\n  </div>\n\n\n\n  <div *ngIf="isMenuDetails.status" class="details">\n\n    <ion-card>\n\n      <ion-row *ngIf=\'isMenuDetails.data.image\' class="category">\n\n        <div class="top-image"><img [src]="isMenuDetails.data.image" /> </div>\n\n      </ion-row>\n\n      <ion-row class="category">\n\n        <div ion-text text-capitalize color="primary" class="category-name">{{ isMenuDetails.data.name }}</div>\n\n        <div ion-text text-capitalize color="dark" class="category-description">{{ isMenuDetails.data.description }}</div>\n\n        <div ion-text text-capitalize color="primary" class="category-price" text-right>{{ isMenuDetails.data.price }}{{currency}}</div>\n\n      </ion-row>\n\n    </ion-card>\n\n    <ion-card>\n\n      <ion-row class="category" (click)="itemsShown = !itemsShown">\n\n        <div class="category-main">\n\n          <span ion-text text-capitalize color="primary" class="category-title">{{ \'TOPPINGS\' | translate }} </span>\n\n          <span ion-text color="dark" class="category-label">({{ \'OPTIONAL\' | translate }})</span>\n\n        </div>\n\n\n\n        <ion-icon color="primary" [name]="itemsShown ? \'ios-arrow-up\' : \'ios-arrow-down\'"></ion-icon>\n\n      </ion-row>\n\n      <ion-row class="category toppings" *ngIf="isMenuDetails.data.toppings && itemsShown">\n\n        <div *ngFor="let items of isMenuDetails.data.toppings; let i =index">\n\n          <div ion-text text-capitalize color="primary" class="category-name"><button ion-button class="toppingCheckbox" (click)="selectTopping(items,i)" [ngClass]="selectedToppings[i]?\'active\':\'\'"></button></div>\n\n          <div ion-text text-capitalize color="primary" class="category-name">{{ items.name }}</div>\n\n          <div ion-text text-capitalize color="primary" class="category-price" text-right>{{ items.price }}{{currency}}</div>\n\n        </div>\n\n\n\n      </ion-row>\n\n    </ion-card>\n\n    <ion-card>\n\n      <ion-row class="category">\n\n        <div class="category-main">\n\n          <span ion-text text-capitalize color="primary" class="category-title">{{ \'COMMENT\' | translate }} </span>\n\n          <span ion-text color="dark" class="category-label">({{ \'OPTIONAL\' | translate }})</span>\n\n        </div>\n\n        <div class="category-comment">\n\n          <ion-input placeholder="{{ \'MENTION_PLACEHOLDER\' | translate }}" name="mentions" [(ngModel)]="mention"></ion-input>\n\n        </div>\n\n      </ion-row>\n\n    </ion-card>\n\n    <ion-card>\n\n      <ion-row class="category">\n\n        <div class="category-main">\n\n          <span ion-text text-capitalize color="primary" class="category-title">{{ \'QUANTITY\' | translate }} </span>\n\n          <span ion-text color="dark" class="category-label">({{ \'OPTIONAL\' | translate }})</span>\n\n        </div>\n\n        <div class="category-quantity">\n\n          <button ion-button icon-only clear class="minus" (click)="counter(-1)"><ion-icon name="remove"></ion-icon></button>\n\n          <div class="screen"><span text-capitalize ion-text color="primary">{{ quantity }}</span></div>\n\n          <button ion-button icon-only clear class="plus" (click)="counter(+1)"><ion-icon name="add"></ion-icon></button>\n\n        </div>\n\n      </ion-row>\n\n    </ion-card>\n\n\n\n    <div class="addToCart">\n\n      <button ion-button [disabled]="quantity<=0" (click)="add(isMenuDetails.data)">{{ \'ADD_TO_CART\' | translate }}</button>\n\n    </div>\n\n  </div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\menu\menu.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"],
            __WEBPACK_IMPORTED_MODULE_2__app_BootstrapFirstRun__["a" /* CustomBootstrap */], __WEBPACK_IMPORTED_MODULE_2__app_BootstrapFirstRun__["a" /* CustomBootstrap */], __WEBPACK_IMPORTED_MODULE_3__providers_services__["a" /* ApiProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]])
    ], MenuPage);
    return MenuPage;
}());

//# sourceMappingURL=menu.js.map

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_BootstrapFirstRun__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CartPage = /** @class */ (function () {
    function CartPage(platform, alerCtrl, navparams, translateService, events, navCtrl, api, configuration, ngZone) {
        var _this = this;
        this.platform = platform;
        this.alerCtrl = alerCtrl;
        this.navparams = navparams;
        this.translateService = translateService;
        this.events = events;
        this.navCtrl = navCtrl;
        this.api = api;
        this.configuration = configuration;
        this.ngZone = ngZone;
        this.edit = false;
        this.totalPrice = 0;
        this.items = [];
        this.requestPage = 'CartPage';
        this.customer = [];
        this.beach_id = '';
        this.reserve_id = '';
        this.platform.ready().then(function () {
            _this.currency = _this.navparams.get('currency');
            _this.sub1$ = _this.platform.resume.subscribe(function () {
                _this.reloadData();
            });
        });
    }
    CartPage.prototype.toggleEdit = function () {
        this.edit = !this.edit;
    };
    CartPage.prototype.ngOnInit = function () {
        var _this = this;
        this.configuration.getStorage('login').then(function (a) {
            if (a && a.id) {
                _this.customer = a;
            }
        });
    };
    CartPage.prototype.createItem = function () {
        var _this = this;
        this.items = [];
        this.configuration.getStorage('reservation').then(function (a) {
            _this.waiter_id = a ? a.waiter_id : null;
        });
        this.configuration.getStorage('tab').then(function (a) {
            if (a && a.cart && a.cart.data) {
                var params = a.cart.data;
                _this.beach_id = a.cart.beach_id;
                _this.reserve_id = a.cart.reserve_id;
                _this.items = params;
                _this.events.publish('cart:removed', _this.items);
            }
        });
    };
    CartPage.prototype.onNewNotification = function (data) {
        var _this = this;
        this.ngZone.run(function () {
            if (data && data.entity === 'reservation') {
                _this.reloadData();
            }
        });
    };
    CartPage.prototype.reloadData = function () {
        var _this = this;
        this.configuration.getStorage('login').then(function (a) {
            if (a && a.token) {
                _this.api.get("booking/" + a.phone, {}, {}, true, false).subscribe(function (r) {
                    if (r && r.length > 0) {
                        _this.configuration.setStorage('reservation', r[0]).then(function () {
                            _this.waiter_id = r[0].waiter_id;
                        }, function (error) { });
                    }
                    else {
                        _this.toggleTab(0, [], '');
                        _this.navCtrl.pop();
                    }
                }, function (error) { });
            }
        });
    };
    CartPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.createItem();
        this.configuration.setRequestPage(this.requestPage);
        this.events.subscribe('app:notification', function (data) { return _this.onNewNotification(data); });
    };
    CartPage.prototype.ionViewWillUnload = function () {
        this.events.unsubscribe('app:notification');
        this.sub1$.unsubscribe();
    };
    CartPage.prototype.addProduct = function () {
        this.navCtrl.pop();
    };
    CartPage.prototype.order = function () {
        var _this = this;
        if (this.items && this.items.length > 0) {
            var orders_1 = {
                beach_id: this.beach_id,
                reservation_id: this.reserve_id,
                customer_id: this.customer.id,
                waiter_id: this.waiter_id,
                items: [],
                //  guest_code: localStorage.getItem('guest_code'),
                confirm: false
            };
            for (var i in this.items) {
                orders_1.items.push({
                    id: this.items[i].id,
                    name: this.items[i].name,
                    qty: this.items[i].quantity,
                    price: this.items[i].price,
                    toppings: this.items[i].toppings,
                    mentions: this.items[i].mention && this.items[i].mention.length > 1 ? this.items[i].mention : undefined,
                });
            }
            var self_1 = this;
            if (!orders_1 || (orders_1 && !orders_1.waiter_id)) {
                self_1.translateService.get("NO_WAITER_ERROR").subscribe(function (value) {
                    _this.api.AmError('Order', value, [{
                            text: 'Close', handler: function () { }
                        }]);
                });
            }
            else {
                var confirm_1 = this.alerCtrl.create({
                    title: "Warning",
                    message: "do you like the Waiter to come to confirm the order?",
                    buttons: [
                        {
                            text: "YES",
                            handler: function () {
                                orders_1.confirm = true;
                                _this.api.post('orders', orders_1, {}).subscribe(function (r) {
                                    _this.api.AmError('Order', r.message, [{
                                            text: 'Close', handler: function () {
                                                _this.toggleTab(0, [], '');
                                            }
                                        }]);
                                }, function (error) { });
                            }
                        },
                        {
                            text: "NO",
                            handler: function () {
                                _this.api.post('orders', orders_1, {}).subscribe(function (r) {
                                    _this.api.AmError('Order', r.message, [{
                                            text: 'Close', handler: function () {
                                                _this.toggleTab(0, [], '');
                                            }
                                        }]);
                                }, function (error) { });
                            }
                        }
                    ]
                });
                confirm_1.present();
            }
        }
    };
    CartPage.prototype.toggleTab = function (count, data, beach_id) {
        var _this = this;
        var tabData = { cart: {} };
        tabData.cart = {
            count: count,
            data: data,
            reload: true,
            beach_id: beach_id,
            reserve_id: this.reserve_id
        };
        this.totalPrice = 0;
        this.configuration.setStorage('tab', tabData).then(function () {
            _this.events.publish('cart:added', Math.random());
            // this.events.publish('cart:received',Math.random());
            _this.createItem();
        });
    };
    CartPage.prototype.getPrice = function () {
        this.totalPrice = 0;
        for (var i in this.items) {
            this.totalPrice += parseInt(this.items[i].price) * this.items[i].quantity;
        }
        return this.totalPrice;
    };
    CartPage.prototype.remove = function (id, index) {
        this.items.splice(index, 1);
        this.toggleTab(this.items.length, this.items, this.beach_id);
    };
    CartPage.prototype.QuantityMath = function (index, IsAdd) {
        if (this.items && this.items[index] && this.items[index].quantity) {
            if (IsAdd)
                this.items[index].quantity += 1;
            else
                this.items[index].quantity -= 1;
            var tabData = { cart: {} };
            tabData.cart = {
                count: this.items.length,
                data: this.items,
                reload: true,
                beach_id: this.beach_id,
                reserve_id: this.reserve_id
            };
            this.configuration.setStorage('tab', tabData).then(function () {
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myTabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Tabs"])
    ], CartPage.prototype, "tabRef", void 0);
    CartPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-cart',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\cart\cart.html"*/'<ion-header class="has-shadow">\n\n\n\n  <ion-navbar>\n\n    <ion-buttons start>\n\n    </ion-buttons>\n\n    <ion-title align="center">{{ \'YOUR_CART\' | translate }}</ion-title>\n\n    <ion-buttons right>\n\n      <button ion-button *ngIf="items && items[0]" (click)="toggleEdit()">\n\n        {{edit? configuration.translate.translate.instant(\'SAVE\') : configuration.translate.translate.instant(\'EDIT\')}}\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n  <p text-center *ngIf="items && items[0]">{{ items[0].beach }}</p>\n\n\n\n  <ion-list>\n\n    <ion-card>\n\n      <ion-row *ngFor="let item of items;let i =index" [class.shown]="edit">\n\n        <ion-col col-12> <h4 class="title">{{item.name}}</h4></ion-col>\n\n        <ion-col col-1 class="card-remove">\n\n          <ion-icon name="remove-circle" color="danger" (click)="remove(item.id,i)"></ion-icon>\n\n        </ion-col>\n\n        \n\n        <ion-col *ngIf="item.image" col-3 class="card-left">\n\n          <img [src]="item.image">\n\n        </ion-col>\n\n\n\n        <ion-col class="card-right">\n\n          \n\n          <ion-item class="quantity">\n\n            <ion-label>\n\n              <div class="quantityLabel">{{ \'QTY\' | translate }}: </div>\n\n              <div class="qtyHolder">\n\n                <button  ion-button [disabled]="item.quantity<=1" icon-only clear  class="minus" (click)="QuantityMath(i,false)"><ion-icon color="primary" name="remove"></ion-icon></button>\n\n                <div class="screen">{{item.quantity}}</div>\n\n                <button ion-button icon-only clear class="plus" [disabled]="item.quantity>=20" (click)="QuantityMath(i,true)"><ion-icon color="primary" name="add"></ion-icon></button>\n\n              </div>\n\n            </ion-label>\n\n\n\n            <!-- TODO: implement custom number picker -->\n\n          </ion-item>\n\n          <ion-item class="quantity" *ngIf="item.toppings && item.toppings.length"><div class="toppingLabel">{{ \'TOPPINGS\' | translate }}</div></ion-item>\n\n\n\n          <ion-item class="quantity" *ngFor="let item1 of item.toppings; let i =index">\n\n            <ion-label>\n\n              <div class="toppingLabel small">{{ item1.name }}: </div>\n\n              <div class="toppingValue small">{{ item1.price }} {{ currency }}</div>\n\n\n\n            </ion-label>\n\n          </ion-item>\n\n          \n\n          <ion-item>\n\n              <div class="price item-mention" *ngIf="item.mention">\n\n                  <span class="mention">{{ \'MENTION\' | translate }}: </span> {{ item.mention }}\n\n                </div>\n\n          </ion-item>\n\n\n\n        </ion-col>\n\n\n\n        \n\n        <div class="price">\n\n            <span class="price-item">\n\n              {{ \'UNIT_PRICE\' | translate }}: <b>{{item.price}} {{currency}}</b>\n\n            </span>\n\n          <span class="price-item">\n\n             {{ \'TOTAL_PRICE\' | translate }}: <b>{{item.price*item.quantity}} {{currency}}</b>\n\n            </span>\n\n        </div>\n\n\n\n      </ion-row>\n\n    </ion-card>\n\n  </ion-list>\n\n\n\n</ion-content>\n\n\n\n<ion-footer>\n\n  <div class="total">\n\n    {{ \'TOTAL\' | translate }}: <b>{{getPrice()}} {{currency}}</b>\n\n  </div>\n\n  <ion-row>\n\n    <ion-col>\n\n      <button ion-button outline round block small (click)="addProduct()">{{ \'ADD_PRODUCT\' | translate }}</button>\n\n    </ion-col>\n\n    <ion-col>\n\n      <button ion-button pink-gradient [disabled]="totalPrice<=0" round block small (click)="order()">{{ \'SEND\' | translate }}</button>\n\n    </ion-col>\n\n  </ion-row>\n\n</ion-footer>\n\n'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\cart\cart.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_2__providers_services__["a" /* ApiProvider */], __WEBPACK_IMPORTED_MODULE_3__app_BootstrapFirstRun__["a" /* CustomBootstrap */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]])
    ], CartPage);
    return CartPage;
}());

//# sourceMappingURL=cart.js.map

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_BootstrapFirstRun__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__privateChat_privatechat__ = __webpack_require__(431);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_img_viewer__ = __webpack_require__(433);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__includes_imageViewer_imageViewer__ = __webpack_require__(447);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ChatPage = /** @class */ (function () {
    function ChatPage(platform, alerCtrl, navparams, translateService, events, navCtrl, api, configuration, ngZone, imageViewController, popovercontroller) {
        this.platform = platform;
        this.alerCtrl = alerCtrl;
        this.navparams = navparams;
        this.translateService = translateService;
        this.events = events;
        this.navCtrl = navCtrl;
        this.api = api;
        this.configuration = configuration;
        this.ngZone = ngZone;
        this.imageViewController = imageViewController;
        this.popovercontroller = popovercontroller;
        this.currentItems = [{ 'name': 'Mohideen', 'about': 'Developer', 'note': 'Sample Usage', 'blocked': 'true' }, { 'name': 'Abu', 'about': 'Sr Developer', 'note': 'Sample', 'blocked': 'false' }];
        this.selected = "";
        this.activeItemSliding = null;
        this.activeItem = null;
        this.class = false;
        this.imageViewerCtrl = imageViewController;
        this.platform.ready().then(function () {
        });
    }
    ChatPage.prototype.ngOnInit = function () {
        this.selected = 'list';
    };
    ChatPage.prototype.openOption = function (itemSlide, item) {
        event.preventDefault();
        event.stopPropagation();
        if (this.activeItemSliding !== null)
            this.closeOption(item);
        this.activeItemSliding = itemSlide;
        this.activeItem = item;
        this.class = true;
        var swipeAmount = 173; //set your required swipe amount
        itemSlide.startSliding(swipeAmount);
        itemSlide.moveSliding(swipeAmount);
        itemSlide.setElementClass('active-options-right', true);
        itemSlide.setElementClass('active-swipe-right', true);
        item.setElementStyle('width', '100%');
        item.setElementStyle('opacity', '0.3');
        item.setElementStyle('background', '#8e8d8d');
        //item.setElementStyle('transform', 'translate3d(-'+swipeAmount+'px, 0px, 0px)');
    };
    ChatPage.prototype.closeOption = function (item) {
        if (this.activeItemSliding) {
            this.class = false;
            this.activeItem.setElementStyle('opacity', 'initial');
            item.setElementStyle('background', 'initial');
            this.activeItemSliding.close();
            this.activeItemSliding = null;
        }
    };
    ChatPage.prototype.presentImage = function (myImage) {
        event.preventDefault();
        event.stopPropagation();
        // const imageViewer = this.imageViewerCtrl.create(ImageViewerPage);
        // imageViewer.present();
        var popoverSignup = this.popovercontroller.create(__WEBPACK_IMPORTED_MODULE_7__includes_imageViewer_imageViewer__["a" /* ImageViewerPage */], { img: myImage.src });
        popoverSignup.present();
        popoverSignup.onDidDismiss(function (data) {
            // this.elementPool(false);
        });
    };
    ChatPage.prototype.onclickBlock = function (cus) {
        var _this = this;
        var alertControl = this.alerCtrl.create({
            message: 'Are You sure you want to block ?',
            buttons: [{
                    text: 'Cancel',
                    role: 'Cancel'
                }, {
                    text: 'Yes',
                    handler: function () {
                        cus.blocked = "true";
                        if (_this.activeItemSliding) {
                            _this.activeItem.setElementStyle('width', '100%');
                            _this.activeItemSliding.close();
                            _this.activeItemSliding = null;
                        }
                    }
                }]
        });
        alertControl.present();
    };
    ChatPage.prototype.deleteChat = function (cus, index) {
        var _this = this;
        var alertControl = this.alerCtrl.create({
            message: 'Are You sure you want to Delete this Chat ?',
            buttons: [{
                    text: 'Cancel',
                    role: 'Cancel'
                }, {
                    text: 'Yes',
                    handler: function () {
                        _this.currentItems.splice(index, 1);
                        if (_this.activeItemSliding) {
                            _this.activeItem.setElementStyle('width', '100%');
                            _this.activeItemSliding.close();
                            _this.activeItemSliding = null;
                        }
                    }
                }]
        });
        alertControl.present();
    };
    ChatPage.prototype.openItem = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__privateChat_privatechat__["a" /* PrivateChatPage */], { item: item });
    };
    ChatPage.prototype.ionViewWillEnter = function () {
    };
    ChatPage.prototype.ionViewWillUnload = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myTabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Tabs"])
    ], ChatPage.prototype, "tabRef", void 0);
    ChatPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-chat',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\chat\chat.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-row>\n\n        <ion-col class="chat-list" [ngClass]="selected == \'chatlist\'?\'active\':\'\'">\n\n            <button ion-button icon-only (click)="selected = \'chatlist\'" [ngClass]="selected == \'chatlist\'?\'active\':\'\'">\n\n                <ion-icon color="primary" name="list"></ion-icon>\n\n              </button>\n\n        </ion-col>\n\n        <ion-col class="chat-list" [ngClass]="selected == \'list\'?\'active\':\'\'">\n\n            <button ion-button icon-only (click)="selected = \'list\'" [ngClass]="selected == \'list\'?\'active\':\'\'">\n\n                <ion-icon color="primary" name="chatbubbles"></ion-icon>\n\n              </button>\n\n        </ion-col>\n\n        <ion-col>\n\n          \n\n          \n\n            \n\n        </ion-col>\n\n        </ion-row>\n\n        \n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content *ngIf="selected == \'list\' ">\n\n\n\n  <ion-list >\n\n    <ion-item-sliding disabled=true #slidingItem *ngFor="let cus of currentItems; let i = index" >\n\n      \n\n      <button #item ion-item detail-none (click)="openItem(cus)" >\n\n        <ion-avatar item-left>\n\n          <img src="./assets/imgs/samples.jpg" #myImage (click)="presentImage(myImage)" />\n\n        </ion-avatar>\n\n        <h2>{{cus.name}}</h2>\n\n        <p><span class="dot"></span> {{cus.about}}</p>\n\n        <ion-badge item-end color="primary">11</ion-badge>\n\n        <div  (click)="openOption(slidingItem, item)" item-end><i class=\'fa fa-ellipsis-v\'></i></div>\n\n      </button>\n\n        <ion-item-options [ngClass]= "class ? \'active\' : \'\'" side="right" >\n\n          <button ion-button round full class="action-btns" (click)= "onclickBlock(cus)">\n\n            Block\n\n          </button>  \n\n          <button ion-button round full class="action-btns" (click)="deleteChat(cus, i)">  \n\n             Delete\n\n          </button>\n\n          <button ion-button icon-only class="close-btn-chat" (click)="closeOption(item)">\n\n              <ion-icon name="close"></ion-icon>\n\n            </button>  \n\n        </ion-item-options>\n\n      \n\n\n\n    </ion-item-sliding>\n\n    \n\n  </ion-list>\n\n</ion-content>\n\n<ion-content  *ngIf="selected == \'chatlist\' ">\n\n\n\n  <ion-list>\n\n    <ion-item-sliding disabled=true #slidingItem *ngFor="let cus of currentItems">\n\n      <button #item ion-item detail-none (click)="openItem(cus)" [disabled] = "cus.blocked ==\'true\' ">\n\n        <ion-avatar item-left>\n\n          <img src="./assets/imgs/beaches/beach1.png" #myImage (click)="presentImage(myImage)" />\n\n        </ion-avatar>\n\n        <h2>{{cus.name}}</h2>\n\n        <div (click)="openOption(slidingItem, item)" item-end><i class=\'fa fa-ellipsis-v\'></i></div>\n\n      </button>\n\n      <ion-item-options  [ngClass]= "class ? \'active\' : \'\'" side="right" >\n\n        <div class="block-btn">\n\n          <button ion-button round class="action-btns" (click)= "onclickBlock(cus)">\n\n            Block\n\n          </button>  \n\n        </div>\n\n          <button ion-button icon-only class="close-btn-list" (click)="closeOption(item)">\n\n              <ion-icon name="close"></ion-icon>\n\n            </button>  \n\n        </ion-item-options>\n\n    </ion-item-sliding>\n\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\chat\chat.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_6_ionic_img_viewer__["a" /* ImageViewerController */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_2__providers_services__["a" /* ApiProvider */], __WEBPACK_IMPORTED_MODULE_3__app_BootstrapFirstRun__["a" /* CustomBootstrap */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_6_ionic_img_viewer__["a" /* ImageViewerController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["PopoverController"]])
    ], ChatPage);
    return ChatPage;
}());

//# sourceMappingURL=chat.js.map

/***/ }),

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BeachView; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_services__ = __webpack_require__(7);
/**
 * Created by shadow-viper on 2/14/18.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BeachView = /** @class */ (function () {
    function BeachView(navParam, ViewCtrl, api, events) {
        this.navParam = navParam;
        this.ViewCtrl = ViewCtrl;
        this.api = api;
        this.events = events;
        this.details = {
            beach: { description: '', name: '' },
            gallery: []
        };
        this.getBeachDetails();
    }
    BeachView.prototype.close = function () {
        // this.events.publish('app:beachModal', true);
        this.ViewCtrl.dismiss();
    };
    BeachView.prototype.getBeachDetails = function () {
        var _this = this;
        this.api.get("about/" + this.navParam.data.beach_id, {}, {}, true, true).subscribe(function (r) {
            _this.details = r;
        }, function (error) { });
    };
    BeachView.prototype.next = function () {
        this.slides.slideNext();
    };
    BeachView.prototype.prev = function () {
        this.slides.slidePrev();
    };
    BeachView.prototype.ionViewDidLeave = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Slides"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Slides"])
    ], BeachView.prototype, "slides", void 0);
    BeachView = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'beachView',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\beachView\beachView.html"*/'<div>\n\n  <button ion-button clear icon-only right (click)="close()" class="close-btn"><ion-icon name="ios-close-outline"></ion-icon></button>\n\n\n\n  <h2>{{ details.beach.name }} &nbsp;</h2>\n\n  <div class="photo-holder">\n\n    <ion-slides #Slides>\n\n      <ion-slide *ngFor="let item of details.gallery">\n\n        <img [src]="item.url"/>\n\n      </ion-slide>\n\n    </ion-slides>\n\n    <button ion-button icon-only class="icon-left" (click)="prev()"><ion-icon name="ios-arrow-back"></ion-icon></button>\n\n    <button ion-button icon-only class="icon-right" (click)="next()"><ion-icon name="ios-arrow-forward"></ion-icon></button>\n\n  </div>\n\n  <h3>{{ \'ABOUT_US\' | translate}}</h3>\n\n\n\n  <p>{{ details.beach.description}}</p>\n\n</div>\n\n'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\beachView\beachView.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_2__providers_services__["a" /* ApiProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"]])
    ], BeachView);
    return BeachView;
}());

//# sourceMappingURL=beachView.js.map

/***/ }),

/***/ 193:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 193;

/***/ }),

/***/ 235:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 235;

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return translateServices; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(18);
/**
 * Created by shadow-viper on 1/8/18.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var translateServices = /** @class */ (function () {
    function translateServices(translate) {
        this.translate = translate;
        this.defaultLanguage = 'ro';
        this.currentLanguage = 'ro';
        this.translate.setDefaultLang(this.defaultLanguage);
    }
    translateServices.prototype.setLanguageProvider = function (lang, navCtrl, page) {
        this.translate.use(lang);
        this.currentLanguage = lang;
        this.translate.resetLang(lang);
        this.translate.reloadLang(lang).subscribe(function () {
            /* if(navCtrl){
               if(page){
                 if(page=='signup')
                   navCtrl.setRoot(SignupPage);
                 else
                   navCtrl.setRoot(LoginPage)
               }else{
                 navCtrl.setRoot(SignupPage)
               }
       
             }*/
        });
    };
    translateServices.prototype.getLanguage = function (name) {
        return this.translate.get(name);
    };
    translateServices = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */]])
    ], translateServices);
    return translateServices;
}());

//# sourceMappingURL=translateServices.js.map

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoyaltyPointsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the LoyaltyPointsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoyaltyPointsPage = /** @class */ (function () {
    function LoyaltyPointsPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.myPoints = [];
        this.myPoints = this.navParams.data['points'];
    }
    LoyaltyPointsPage.prototype.ionViewDidLoad = function () {
    };
    LoyaltyPointsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-loyalty-points',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\myprofile\loyalty-points\loyalty-points.html"*/'<!--\n\n  Generated template for the LoyaltyPointsPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n    <ion-navbar mode="ios">\n\n      <ion-title mode="ios">{{ "BEACHES" | translate }}</ion-title>\n\n      <button ion-button clear icon-only right (click)="viewCtrl.dismiss()" class="close-btn"><ion-icon name="ios-close-outline"></ion-icon></button>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <ion-list>\n\n    <ng-container *ngIf="myPoints.length > 0">\n\n        <ion-item no-lines *ngFor="let item of myPoints">\n\n          <h2 float-left>{{ item.beach_name }}</h2>\n\n          <h2 float-right>( {{ item.points }} points )</h2>\n\n        </ion-item>\n\n    </ng-container>\n\n    <ng-container *ngIf="myPoints.length == 0">\n\n      <p class="no_items">{{ "NO_BEACH_FOUND" | translate }}</p>\n\n    </ng-container>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\myprofile\loyalty-points\loyalty-points.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"]])
    ], LoyaltyPointsPage);
    return LoyaltyPointsPage;
}());

//# sourceMappingURL=loyalty-points.js.map

/***/ }),

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_tools__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__beach_beach__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__myReservation_myReservation__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_BootstrapFirstRun__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__includes_searchDupplication_searchDupplication__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ngx_translate_core__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__includes_searchMaster_searchMaster__ = __webpack_require__(425);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var SearchPage = /** @class */ (function () {
    function SearchPage(platform, configuration, navCtrl, appCtrl, navParams, tool, api, translate, popoverCtrl, ngZone, events) {
        this.platform = platform;
        this.configuration = configuration;
        this.navCtrl = navCtrl;
        this.appCtrl = appCtrl;
        this.navParams = navParams;
        this.tool = tool;
        this.api = api;
        this.translate = translate;
        this.popoverCtrl = popoverCtrl;
        this.ngZone = ngZone;
        this.events = events;
        this.requestPage = "SearchPage";
        this.toggleLanguage = {};
        this.customer = {};
        this.beach_settings = [];
        this.Search = '';
        this.searchControl = new __WEBPACK_IMPORTED_MODULE_9__angular_forms__["FormControl"]();
        this.beach_settings = JSON.parse(localStorage.getItem('beachsettings') || '[]');
    }
    SearchPage.prototype.onNewNotification = function (data) {
        var _this = this;
        this.ngZone.run(function () {
            if (data && data.entity === 'reservation') {
                _this.api.get("booking/" + _this.customer.phone, {}, {}, true, false).subscribe(function (r) {
                    _this.configuration.setStorage('reservation', r[0]).then(function () {
                        if (r && r.length > 0) {
                            _this.events.publish('unlock:reservation');
                        }
                    }, function (error) { });
                }, function (error) { });
            }
        });
    };
    SearchPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.search();
        this.searchControl.valueChanges.debounceTime(1500).subscribe(function (search) {
            _this.search();
        });
    };
    SearchPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var reset = "";
        this.events.publish("page:country", reset);
        this.events.publish("page:country_id", reset);
        this.events.publish("page:place", reset);
        // this.events.publish("page:beach",reset);
        __WEBPACK_IMPORTED_MODULE_12__includes_searchMaster_searchMaster__["a" /* searchMaster */].prototype.setCountry("");
        this.configuration.setRequestPage(this.requestPage);
        this.configuration.getStorage('login').then(function (data) {
            if (data && data.id) {
                _this.customer = data;
            }
        }, function (error) { });
        // this.events.subscribe('page:country',this.resetCountry()); 
        this.events.subscribe('app:notification', function (data) { return _this.onNewNotification(data); });
    };
    SearchPage.prototype.ionViewWillLeave = function () {
        this.events.unsubscribe('app:notification');
    };
    SearchPage.prototype.goBack = function () {
        if (this.navCtrl.canGoBack()) {
            this.navCtrl.pop();
        }
        else {
            this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */], {}, { direction: 'back' });
        }
    };
    SearchPage.prototype.checkExist = function () {
        this.search();
    };
    SearchPage.prototype.setCurrencyByBeach = function (id) {
        var ss = this.beach_settings.find(function (item) {
            return item.beach_id == id;
        });
        this.configuration.currency = ss.currency;
    };
    SearchPage.prototype.chooseBeach = function (beachId, name) {
        var _this = this;
        var SearchObj = {};
        var startDate = new Date().getTime();
        var endDate = new Date(new Date().setHours(23, 59, 59)).getTime();
        SearchObj.search_date = new Date(new Date(startDate).setHours(12, 0, 0));
        SearchObj.start_date = startDate;
        SearchObj.end_date = endDate;
        SearchObj.customer_id = this.customer.id;
        this.setCurrencyByBeach(beachId);
        this.configuration.getStorage('reservation')
            .then(function (reservation) {
            var timezoneOffsetHours = new Date().getTimezoneOffset() / 60;
            var alreadyEDate = !reservation || (reservation && reservation.end_date === '0') ? undefined : new Date(new Date(reservation.end_date).setHours(new Date(reservation.end_date).getHours() + timezoneOffsetHours)).getDate();
            var isToday = alreadyEDate && (new Date()).getDate() === alreadyEDate;
            if (isToday && reservation && reservation.beach_id === beachId) {
                var popoverSignup = _this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_10__includes_searchDupplication_searchDupplication__["a" /* searchDupplication */], { msg: _this.translate.instant('DUPPLICATED_RESERVATION_DETECT') });
                popoverSignup.present();
                return;
            }
            else {
                var newName = name.split('(')[0];
                newName = newName.replace(')', '');
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__beach_beach__["a" /* BeachPage */], { id: beachId, title2: newName, SearchObj: SearchObj, context: "quick-search" });
            }
        })
            .catch(function (error) {
            var newName = name.split('(')[0];
            newName = newName.replace(')', '');
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__beach_beach__["a" /* BeachPage */], { id: beachId, title2: newName, SearchObj: SearchObj, context: "quick-search" });
        });
    };
    SearchPage.prototype.generateTodaySearchObj = function () {
    };
    SearchPage.prototype.CloseSearch = function () {
        var _this = this;
        setTimeout(function () {
            _this.IsClosed = true;
            _this.Search = '';
            _this.SearchDetails = '';
        }, 1000);
    };
    SearchPage.prototype.search = function () {
        var _this = this;
        if (this.Search && this.Search.length > 1) {
            var param = {};
            param['q'] = this.Search.toLowerCase();
            this.api.get('quick-search', param, {}, true).debounceTime(700).subscribe(function (r) {
                _this.SearchDetails = r;
            }, function (error) {
            });
        }
    };
    SearchPage.prototype.test = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__myReservation_myReservation__["a" /* myReservation */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Navbar"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Navbar"])
    ], SearchPage.prototype, "navBar", void 0);
    SearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-search',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\search\search.html"*/'<ion-content>\n\n\n\n	<langComponent [refresh]="toggleLanguage" [page]="\'signup\'"></langComponent>\n\n\n\n	<searchMaster *ngIf="!Search || IsClosed"></searchMaster>\n\n	<!--<button ion-button (click)="test()">test button</button>-->\n\n\n\n</ion-content>'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\search\search.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"],
            __WEBPACK_IMPORTED_MODULE_8__app_BootstrapFirstRun__["a" /* CustomBootstrap */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["App"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_3__providers_tools__["a" /* Tools */],
            __WEBPACK_IMPORTED_MODULE_4__providers_services__["a" /* ApiProvider */],
            __WEBPACK_IMPORTED_MODULE_11__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["PopoverController"],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"]])
    ], SearchPage);
    return SearchPage;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TermsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the TermsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TermsPage = /** @class */ (function () {
    function TermsPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.termsText = '';
        this.titleText = '';
        this.titleText = this.navParams.data.title;
        this.termsText = this.navParams.data.terms;
    }
    TermsPage.prototype.ionViewDidLoad = function () {
    };
    TermsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-terms',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\terms\terms.html"*/'<!--\n\n  Generated template for the TermsPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header mode="ios">\n\n\n\n  <ion-navbar mode="ios">\n\n      \n\n    <ion-title mode="ios">{{titleText}}</ion-title>\n\n    <button ion-button clear icon-only right (click)="viewCtrl.dismiss()" class="close-btn"><ion-icon name="ios-close-outline"></ion-icon></button>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <p [innerHTML]="termsText"></p>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\terms\terms.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"]])
    ], TermsPage);
    return TermsPage;
}());

//# sourceMappingURL=terms.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return newPassword; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_BootstrapFirstRun__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tabs_tabs__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__resetPassword_resetPassword__ = __webpack_require__(91);
/**
 * Created by shadow-viper on 12/18/17.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var newPassword = /** @class */ (function () {
    function newPassword(navCtrl, popoverCtrl, api, navparam, configuration, events) {
        this.navCtrl = navCtrl;
        this.popoverCtrl = popoverCtrl;
        this.api = api;
        this.navparam = navparam;
        this.configuration = configuration;
        this.events = events;
        this.PICTURE_RATIO = 1659 / 1200;
        this.requestPage = 'NewPassword';
        this.shouldTop = document.body.clientHeight - document.body.clientWidth * this.PICTURE_RATIO + 'px';
        this.newPassword = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormGroup"]({
            password: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6)]),
            password2: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6)])
        });
    }
    //TODO: Implement auth
    newPassword.prototype.doForgetPass = function () {
        var _this = this;
        if (this.newPassword.valid && (this.newPassword.value.password === this.newPassword.value.password2) && this.navparam.get('mobile')) {
            this.newPassword.value.phone = this.navparam.get('mobile');
            this.api.post('reset-password', this.newPassword.value, { 'Content-Type': 'application/json' }).subscribe(function (r) {
                _this.configuration.setStorage('login', r);
                r.canUse = true;
                _this.configuration.getStorage('AdditionalRegData').then(function (res) {
                    res.canUse = true;
                    _this.configuration.setStorage('UserPhoneInfo', res).then(function (reg) {
                        _this.configuration.setStorage('AdditionalRegData', r).then(function (a) {
                            //user can reuse mobile now
                            if (_this.api.fcmToken) {
                                setTimeout(function () {
                                    _this.api.get("fcm/" + _this.api.fcmToken, {}, {}, true).subscribe(function (res) {
                                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__tabs_tabs__["a" /* TabsPage */], { reservation: r.reservations });
                                    }, function (error) {
                                        alert(error.message);
                                    });
                                }, 500);
                            }
                            else {
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__tabs_tabs__["a" /* TabsPage */], { reservation: r.reservations });
                            }
                        });
                    });
                });
                // this.navCtrl.push(TabsPage)
            }, function (error) {
            });
        }
    };
    newPassword.prototype.ionViewWillEnter = function () {
        this.configuration.setRequestPage(this.requestPage);
    };
    newPassword.prototype.resetPassword = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__resetPassword_resetPassword__["a" /* resetPassword */]);
    };
    newPassword = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'newPassword',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\newpassword\newPassword.html"*/'\n\n\n\n<ion-content [style.background-position]="\'0 \' + shouldTop">\n\n\n\n  <button ion-button icon-only class="btn" (click)="resetPassword()" clear><ion-icon name="arrow-back" color="primary"></ion-icon></button>\n\n\n\n  <h1 text-center margined>{{ \'NEW_PASSWORD\'| translate }}</h1>\n\n\n\n  <br/>\n\n  <div margined>\n\n    <form [formGroup]="newPassword" (submit)="doForgetPass()">\n\n      <div class="passwordHolder">\n\n        <ion-item>\n\n          <ion-label stacked>{{ \'NEW_PASSWORD\'| translate }}</ion-label>\n\n          <ion-input *ngIf="!EyeShown" formControlName="password" type="password" placeholder="*******" required></ion-input>\n\n          <ion-input *ngIf="EyeShown" type="text" formControlName="password" placeholder="*******" required></ion-input>\n\n        </ion-item>\n\n        <button icon-only ion-button clear class="passwordEye" type="button"  (click)="EyeShown=!EyeShown"><ion-icon name="ios-eye"></ion-icon></button>\n\n      </div>\n\n      <div class="passwordHolder">\n\n        <ion-item>\n\n          <ion-label stacked>{{ \'CONFIRM_PASSWORD\' | translate }}</ion-label>\n\n          <ion-input *ngIf="!EyeShown1" formControlName="password2" type="password" placeholder="*******" required></ion-input>\n\n          <ion-input *ngIf="EyeShown1" type="text" formControlName="password2" placeholder="*******" required></ion-input>\n\n        </ion-item>\n\n        <button icon-only ion-button clear class="passwordEye" type="button"  (click)="EyeShown1=!EyeShown1"><ion-icon name="ios-eye"></ion-icon></button>\n\n      </div>\n\n\n\n      <button ion-button round full pink-gradient class="login-button" [disabled]="!newPassword.valid || newPassword.controls[\'password\'].value!=newPassword.controls[\'password2\'].value">{{ \'PROCEED\' |translate }}</button>\n\n    </form>\n\n\n\n\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\newpassword\newPassword.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["PopoverController"], __WEBPACK_IMPORTED_MODULE_3__providers_services__["a" /* ApiProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_4__app_BootstrapFirstRun__["a" /* CustomBootstrap */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"]])
    ], newPassword);
    return newPassword;
}());

//# sourceMappingURL=newPassword.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReleasePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_BootstrapFirstRun__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(2);
/**
 * Created by shadow-viper on 2/14/18.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ReleasePage = /** @class */ (function () {
    function ReleasePage(navParam, navCtrl, api, configuration, alert, events) {
        var _this = this;
        this.navParam = navParam;
        this.navCtrl = navCtrl;
        this.api = api;
        this.configuration = configuration;
        this.alert = alert;
        this.events = events;
        this.details = {};
        this.dateRanges = [];
        this.loopItem = [];
        this.excludes = [];
        this.reservation_id = '';
        this.alreadyreleasedday = [];
        this.details = this.navParam.data.data;
        this.excludes = this.navParam.data.data.released_days;
        localStorage.setItem('release', this.navParam.data.data.released_days);
        this.alreadyreleasedday.push(localStorage.getItem('release'));
        this.reservation_id = this.navParam.data.data.id;
        var tmpDates = this.navParam.data.data.period.filter(function (item) {
            // if(new Date(item) >= new Date()) return item;
            return item;
        });
        this.dateRanges = tmpDates.map(function (day) {
            var obj = { date: day, disabled: false };
            obj.disabled = _this.navParam.data.data.released_days.indexOf(day) !== -1;
            return obj;
        });
        this.loopItem = this.dateRanges.filter(function (item) {
            return !item.disabled;
        });
    }
    ReleasePage.prototype.add = function (item, i) {
        if (this.excludes.indexOf(item.date) == -1) {
            this.dateRanges[this.dateRanges.indexOf(item)].disabled = true;
            this.excludes.push(item.date);
        }
        else {
            if (this.alreadyreleasedday.indexOf(item.date) == -1) {
                this.dateRanges[this.dateRanges.indexOf(item)].disabled = false;
                this.excludes.splice(this.excludes.indexOf(item.date), 1);
            }
            else {
                var alert_1 = this.alert.create({
                    title: "Warning",
                    message: "This date is already released",
                });
                alert_1.present();
            }
        }
    };
    ReleasePage.prototype.isExclude = function (dateString) {
        if (this.excludes.indexOf(dateString) == -1) {
            return false;
        }
        else {
            return true;
        }
    };
    ReleasePage.prototype.reserve = function () {
        var _this = this;
        if (this.excludes.length == 0)
            return;
        this.api.post('booking/release', { id: this.reservation_id, days: this.loopItem }, {}, true).subscribe(function (r) {
            if (_this.dateRanges.length === _this.excludes.length) {
                _this.configuration.setStorage('reserv_endDate', '0');
            }
            _this.api.AmError(_this.configuration.translate.translate.instant('DONE'), r.message, [{
                    text: _this.configuration.translate.translate.instant('CLOSE'), handler: function () {
                        _this.navCtrl.pop().then(function (_) {
                            _this.events.publish('redirect:search');
                        });
                    }
                }]);
            // this.dateRanges=this.dateRanges.map(item=>{ item.disabled = true; return item; };
            //this.loopItem=[];
        }, function (error) {
            console.error(error);
            console.info('cannot released subscription');
        });
    };
    ReleasePage.prototype.getSeatSlots = function (slots) {
        var str = '';
        for (var key in slots) {
            if (slots.hasOwnProperty(key)) {
                var element = slots[key];
                if (element.length > 0)
                    str += key;
            }
        }
        return str;
    };
    ReleasePage.prototype.getDate = function () {
        var now = new Date();
        var y = now.getFullYear();
        var m = now.getMonth() + 1;
        var d = now.getDate();
        return '' + y + '-' + (m < 10 ? '0' : '') + m + '-' + (d < 10 ? '0' : '') + d;
    };
    ReleasePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'release',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\release\release.html"*/'<ion-header >\n\n\n\n  <ion-navbar>\n\n    <ion-buttons start>\n\n<button ion-button clear></button>\n\n  </ion-buttons>\n\n    <ion-title *ngIf="details.seat">{{ details.seat.type}} #{{ details.seat.number }} {{ getSeatSlots(details.seat.slots) }}</ion-title>\n\n\n\n    <ion-buttons end>\n\n      <button ion-button icon-only clear navPop><ion-icon name="ios-close-circle-outline"></ion-icon></button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-list>\n\n    <div>\n\n      <p>{{ \'SELECT_THE_DAYS_WHICH_YOU_LIKE_TO_RELEASE_FROM_YOUR_RESERVATION\'  | translate}}</p>\n\n      <ion-row>\n\n        <!-- <ion-col col-3 *ngFor="let item of dateRanges; let i =index"><button ion-button round color="white" [disabled]="isExclude(item)" (click)="add(item)">{{ item }}</button> </ion-col> -->\n\n        <!--<ion-col col-3 *ngFor="let item of dateRanges; let i =index"><button ion-button round [color]="item.disabled ? \'grey\' : \'white\'" [disabled]="item.disabled" (click)="add(item,i)">{{ item.date }}</button> </ion-col>-->\n\n        <ion-col col-3 *ngFor="let item of dateRanges; let i =index">\n\n          <button ion-button round [color]="item.disabled ? \'grey\' : \'white\'" (click)="add(item,i)">{{ item.date }}</button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </div>\n\n\n\n    <ion-item no-lines>\n\n      <button ion-button round color="danger" [disabled]="!excludes" (click)="reserve()">{{ \'CONFIRM\' | translate }}</button>\n\n\n\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\release\release.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1__providers_services__["a" /* ApiProvider */], __WEBPACK_IMPORTED_MODULE_2__app_BootstrapFirstRun__["a" /* CustomBootstrap */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["Events"]])
    ], ReleasePage);
    return ReleasePage;
}());

//# sourceMappingURL=release.js.map

/***/ }),

/***/ 425:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return searchMaster; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__list_popover_list_popover__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__calendar_popover_calendar_popover__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_BootstrapFirstRun__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__search_results_search_results__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_android_permissions__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_location_accuracy__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_diagnostic__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_storage__ = __webpack_require__(55);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var searchMaster = /** @class */ (function () {
    function searchMaster(platform, navCtrl, events, translate, locationAccuracy, diagnostic, startBoostrapping, androidPermission, storage, alertCtrl, popoverCtrl, api, configuration, modalCtrl) {
        var _this = this;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.events = events;
        this.translate = translate;
        this.locationAccuracy = locationAccuracy;
        this.diagnostic = diagnostic;
        this.startBoostrapping = startBoostrapping;
        this.androidPermission = androidPermission;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.popoverCtrl = popoverCtrl;
        this.api = api;
        this.configuration = configuration;
        this.modalCtrl = modalCtrl;
        this.date = { from: null, to: null, period: 0 };
        this.beaches = [];
        this.customer = {};
        this.beach = {
            refresh: false,
            beach_ids: [],
            start_date: null,
            end_date: null,
            latitude: 0,
            longitude: 0,
            customer_id: "",
            search_date: 0,
            search_by: "location"
        };
        this.places = { id: [], start_date: 0, end_date: 0 };
        this.focused = {
            place: false,
            country: false
        };
        this.dateObj = { from: null, to: null };
        this.SearchDetails = {
            country: null,
            place: "",
            all: ""
        };
        this.Search = { country: null, place: "" };
        this.search_by = "location";
        this.PreviousInput = { place: "", country: "", all: "" };
        // getting country and place from modal
        this.events.subscribe("page:country", function (c) {
            _this.SearchDetails.country = c;
            _this.resetCalendar();
        });
        this.events.subscribe("page:country_id", function (c_id) {
            _this.Search.country = c_id;
            _this.resetCalendar();
        });
        this.events.subscribe("page:place", function (p) {
            _this.SearchDetails.place = p;
            _this.resetCalendar();
        });
        this.events.subscribe("page:beach", function (beach) {
            _this.beach = beach;
        });
    }
    searchMaster.prototype.setCountry = function (country) {
        if (this.SearchDetails) {
            this.SearchDetails.country = country;
        }
    };
    searchMaster.prototype.resetCalendar = function () {
        this.date = { from: null, to: null, period: 0 };
        this.dateObj = { from: null, to: null };
    };
    searchMaster.prototype.ngOnInit = function () {
        var _this = this;
        this.dateObj.from = __WEBPACK_IMPORTED_MODULE_4_moment__(new Date());
        setTimeout(function () {
            _this.countries = _this.configuration.countries;
            _this.places = _this.configuration.places;
            // this.DefaultDates(moment(new Date()))
        }, 300);
        this.configuration.getStorage("login").then(function (data) {
            if (data && data.id) {
                _this.customer = data;
            }
        }, function (error) { });
    };
    searchMaster.prototype.presentCalendar = function () {
        var _this = this;
        if (this.date && this.date.from) {
            var date = new Date(this.date.from);
            var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_2__calendar_popover_calendar_popover__["a" /* CalendarPopoverPage */], {
                options: {
                    pickMode: "range",
                    from: this.dateObj.from,
                    to: date.setDate(date.getDate() + 9)
                }
            });
            popover.present();
            popover.onDidDismiss(function (date) {
                if (date && date.from && date.to) {
                    date.to = __WEBPACK_IMPORTED_MODULE_4_moment__(new Date(new Date(date.to).setHours(23, 59, 59)));
                    var isToToday = new Date(date).getDate() === new Date().getDate();
                    var computedTo = isToToday
                        ? new Date(new Date(date.to).setHours(23, 59, 59))
                        : new Date(date.to);
                    _this.date.to = date.to.format();
                    _this.beach.end_date = computedTo.getTime();
                    _this.dateObj.to = date.to;
                    if (_this.date.to && _this.date.from) {
                        _this.date.period =
                            _this.dateObj.to.diff(_this.dateObj.from, "days") + 1;
                    }
                    if (_this.date.from &&
                        new Date(_this.date.to) < new Date(_this.date.from)) {
                        _this.date.to = _this.date.from || _this.date.to;
                        _this.beach.end_date = _this.beach.start_date || _this.beach.end_date;
                        _this.dateObj.to = _this.dateObj
                            ? _this.dateObj.from
                            : _this.dateObj.to;
                    }
                }
            });
        }
    };
    searchMaster.prototype.myKeyPress = function (event, type) {
        var pop = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_0__list_popover_list_popover__["a" /* ListPopoverPage */], {
            type: type,
            countries: this.countries,
            places: this.places,
            country_id: this.Search.country
        }, {});
        pop.present();
        // if (this.PreviousInput[type] && this.SearchDetails[type] && (this.PreviousInput[type].length > this.SearchDetails[type].length)) {
        this.SearchDetails[type] = "";
        // this.PreviousInput[type]='';
        // }else{
        //   this.PreviousInput[type]=this.SearchDetails[type];
        // }
        this.SearchDetails.all = "All";
        if (this.SearchDetails[type] == "") {
            if (type == "country")
                this.SearchDetails.place = "";
        }
    };
    searchMaster.prototype.presentCalendarStart = function () {
        var _this = this;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_2__calendar_popover_calendar_popover__["a" /* CalendarPopoverPage */], {
            options: { pickMode: "single" },
            sfrom: this.dateObj.from,
            cssClass: "calender-modal"
        });
        popover.present();
        popover.onDidDismiss(function (date) {
            if (date && date["_i"]) {
                _this.DefaultDates(date);
            }
        });
    };
    searchMaster.prototype.DefaultDates = function (date) {
        var today = new Date();
        var isFromToday = new Date(date).getDate() === today.getDate();
        // isFromToday = false;
        var computedFrom = isFromToday
            ? new Date(new Date(date).setHours(today.getHours(), today.getMinutes(), today.getSeconds()))
            : new Date(date);
        var computedTo = new Date(new Date(date).setHours(23, 59, 59));
        this.beach.start_date = computedFrom.getTime();
        this.beach.end_date = computedTo.getTime();
        this.date.from = date.format();
        this.date.to = date.format();
        this.dateObj.from = date;
        this.dateObj.to = date;
        this.date.period = 1;
    };
    searchMaster.prototype.next = function () {
        var keep = false;
        if (this.search_by == "near") {
            if (this.beach.start_date &&
                this.beach.end_date &&
                this.beach.start_date > 10 &&
                this.beach.end_date > 10) {
                keep = true;
            }
            else {
                return false;
            }
        }
        if (!keep) {
            if (this.beach &&
                this.beach.beach_ids &&
                this.beach.start_date &&
                this.beach.end_date &&
                this.beach.beach_ids.length > 0 &&
                this.SearchDetails.place != "" &&
                this.SearchDetails.country != "") {
                //this.navCtrl.push(SearchDetailsPage, { beach: this.beach, title: this.SearchDetails.country + ', ' + this.SearchDetails.place })
                keep = true;
            }
            else {
                return false;
            }
        }
        this.beach.search_date = new Date().getTime() * 1000;
        this.beach.refresh = true;
        this.beach.search_by = this.search_by;
        this.beach.customer_id = this.customer.id;
        var title = this.SearchDetails.country + ", " + this.SearchDetails.place;
        if (this.search_by == "near") {
            title = this.translate.instant("NEAR_BY");
        }
        var searchResParams = {
            searchlist: this.beach,
            title: title,
            search_by: this.search_by
        };
        if (this.search_by == "near") {
            searchResParams.coords = this.coords;
        }
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__search_results_search_results__["a" /* SearchResultsPage */], searchResParams);
    };
    searchMaster.prototype.isFocused = function (place, country) {
        if (place) {
            this.focused = {
                place: true,
                country: false
            };
        }
        if (country) {
            this.focused = {
                place: false,
                country: true
            };
        }
        if (!place && !country) {
            this.focused = {
                place: false,
                country: false
            };
        }
    };
    searchMaster.prototype.getBeachId = function (country, place) {
        var _this = this;
        this.SearchDetails.all = "";
        if (country && country.id && country.name) {
            if (country.beaches <= 0) {
                return;
            }
            this.Search.country = country.id;
            this.SearchDetails.country = country.name;
            this.placeFocus.setFocus();
            this.isFocused(true, false);
            return;
        }
        if (place && place.id && place.name) {
            if (place.beaches <= 0) {
                return;
            }
            this.Search.place = place.id;
            this.SearchDetails.place = place.name;
        }
        // Define map tab test-=------
        if (this.SearchDetails.country === "Romania" &&
            this.SearchDetails.place === "Mamaia")
            this.events.publish("app:mapView", true);
        else
            this.events.publish("app:mapView", false);
        //- --------------------
        if (this.Search.country &&
            this.Search.country >= 0 &&
            (this.Search.place && this.Search.place.length > 3)) {
            this.api
                .get("beaches/" + this.Search.country + "/" + this.Search.place, {}, {}, true)
                .subscribe(function (r) {
                _this.beach.beach_ids = r;
            });
        }
        this.focused = {
            place: false,
            country: false
        };
    };
    searchMaster.prototype.shouldAllowSubmit = function () {
        if (this.search_by == "near") {
            if (this.beach.start_date &&
                this.beach.end_date &&
                this.beach.start_date > 10 &&
                this.beach.end_date > 10) {
                return true;
            }
            return false;
        }
        if (this.beach &&
            this.beach.beach_ids &&
            this.beach.start_date &&
            this.beach.end_date &&
            this.beach.beach_ids.length > 0 &&
            this.beach.start_date > 10 &&
            this.beach.end_date > 10) {
            return true;
        }
    };
    searchMaster.prototype.getCountryPlaces = function () {
        var _this = this;
        if (this.Search && this.Search.country) {
            return this.places.filter(function (r) { return r["country_id"] === _this.Search.country; });
        }
    };
    //   private unixMiliseconds(StrDate: string) {
    //     let date = new Date(StrDate);
    //     return new Date(date.setDate(date.getDate())).getTime();
    //   }
    searchMaster.prototype.byLocation = function () {
        this.search_by = "location";
    };
    searchMaster.prototype.nearBy = function () {
        var _this = this;
        var that = this;
        this.search_by = "location";
        this.androidPermission
            .checkPermission(this.androidPermission.PERMISSION.ACCESS_FINE_LOCATION)
            .then(function (a) {
            _this.locationAccuracy
                .canRequest()
                .then(function (possible) {
                if (possible) {
                    //that.search_by = "near";
                    return _this.locationAccuracy.request(_this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(function () { return that.search_by = "near"; }, function (error) { });
                }
                else {
                    return _this.diagnostic.isGpsLocationEnabled().then(function (enabled) {
                        if (enabled) {
                            that.search_by = "near";
                        }
                    });
                }
            })
                .catch(function (error) {
                _this.search_by = "location";
                console.error("accuracy request failure");
            });
        })
            .catch(function (error) {
            _this.androidPermission
                .requestPermission(_this.androidPermission.PERMISSION.ACCESS_FINE_LOCATION)
                .then(function (a) {
                _this.locationAccuracy
                    .canRequest()
                    .then(function (possible) {
                    if (possible) {
                        that.search_by = "near";
                        return _this.locationAccuracy.request(_this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(function () { return that.search_by = "near"; }, function (error) { });
                    }
                    else {
                        return _this.diagnostic
                            .isGpsLocationEnabled()
                            .then(function (enabled) {
                            if (enabled) {
                                that.search_by = "near";
                            }
                        });
                    }
                })
                    .then(function () {
                })
                    .catch(function (error) {
                });
            }, function (error) {
                console.error("permission denial");
                console.error(error);
            });
        });
        // this.androidPermission.checkPermission(this.androidPermission.PERMISSION.ACCESS_FINE_LOCATION).then((a: any) => {
        // 	return this.diagnostic.isGpsLocationEnabled()
        // 		.then(enabled => {
        // 			if (enabled) {
        // 				this.search_by = 'near';
        // 			}
        // 			else {
        // 				this.storage.get('alreadygpsset').then((val) => {
        // 					 this.value = val;
        // 				  });
        // 				this.startBoostrapping.apiData.AmError("GPS is inactive", "Do you want to activate it?", [{
        // 					text: 'No thanks', handler: () => {
        // 						this.search_by = 'location';
        // 					}
        // 				}, {
        // 					text: 'Activate', handler: () => {
        // 						this.diagnostic.switchToLocationSettings();
        // 					}
        // 				}])
        // 			}
        // 		});
        // }, (error) => {
        // 	console.error('error accessing gps location permission');
        // 	console.info('we are going to request for it');
        // 	this.androidPermission.requestPermission(this.androidPermission.PERMISSION.ACCESS_FINE_LOCATION).then((a: any) => {
        // 		this.locationAccuracy.canRequest()
        // 			.then(possible => {
        // 				if (possible) {
        // 					this.search_by = 'near';
        // 					return this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
        // 				} else {
        // 					return this.diagnostic.isGpsLocationEnabled()
        // 						.then(enabled => {
        // 							if (!enabled) {
        // 								return this.diagnostic.switchToLocationSettings();
        // 							}
        // 						});
        // 				}
        // 			}).then(() => {
        // 			}).catch(error => {
        // 				console.error('accuracy request failure');
        // 			});
        // 	}, error => {
        // 		console.error('permission denial');
        // 		console.error(error);
        // 	});
        // });
        //if (!this.platform.is("cordova")) {
        this.search_by = "near";
        navigator.geolocation.getCurrentPosition(function (a) {
            if (a && a.coords && a.coords.latitude) {
                _this.coords = a.coords;
                _this.api
                    .get("beachesNearBy?latitude=" +
                    a.coords.latitude +
                    "&longitude=" +
                    a.coords.longitude, {}, {}, true)
                    .subscribe(function (r) {
                    _this.beach.beach_ids = r.beach_ids;
                    // localStorage.setItem('beachsettings', JSON.stringify(r.beach_settings));
                    _this.beaches = r.beach;
                });
            }
        }, function (e) {
        }, { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 });
        return true;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])("placeFocus"),
        __metadata("design:type", Object)
    ], searchMaster.prototype, "placeFocus", void 0);
    searchMaster = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: "searchMaster",template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\searchMaster\searchMaster.html"*/'<ion-row padding align-items-center id="top-buttons">\n\n	<ion-col>\n\n		<button ion-button round full pink-gradient [ngClass]="search_by == \'location\' ? \'selected\' : \'default\'" (click)="byLocation()">{{\n\n			\'BY_LOCATION\' | translate}}</button>\n\n	</ion-col>\n\n	<ion-col col-1 text-center no-padding>{{\'OR_LABLE\' | translate}}</ion-col>\n\n	<ion-col>\n\n		<button ion-button round full pink-gradient [ngClass]="search_by == \'near\' ? \'selected\' : \'default\'" (click)="nearBy()" >{{\n\n			\'NEAR_BY\' | translate}}</button>\n\n			<!-- <div class="text-center" *ngIf="beaches && beaches.length>1"> {{beaches.length}} {{(beaches && beaches.length>1)?\'beaches\':\'beach\'}} </div> -->\n\n	</ion-col>\n\n</ion-row>\n\n\n\n<ion-list margined inset no-lines no-top-margin>\n\n\n\n	<div class="content" *ngIf="search_by == \'location\'">\n\n		<h2 text-center text-uppercase>{{ \'SELECT_YOUR_PLACE\' | translate }}</h2>\n\n\n\n		<ion-item>\n\n			<ion-label floating>{{ \'COUNTRY\' | translate }}</ion-label>\n\n			<ion-input type="text" readonly (ionBlur)="isFocused(false,false)" [(ngModel)]="SearchDetails.country" (ionFocus)="myKeyPress($event,\'country\')"\n\n			 data-name="country"></ion-input>\n\n		</ion-item>\n\n\n\n		<ion-item>\n\n			<ion-label floating>{{ \'PLACE\' | translate }}</ion-label>\n\n			<ion-input type="text" readonly (ionBlur)="isFocused(false,false)" [(ngModel)]="SearchDetails.place" (ionFocus)="myKeyPress($event,\'place\')"\n\n			 data-name="place" #placeFocus></ion-input>\n\n		</ion-item>\n\n	</div>\n\n\n\n	<br />\n\n	<br />\n\n	<br />\n\n	<h3 text-capitalize no-margin style="text-align: center">{{ \'SELECT_PERIOD\' | translate }}</h3>\n\n	<ion-row no-side-padding>\n\n\n\n		<ion-col col-6>\n\n			<ion-item (click)="presentCalendarStart()">\n\n				<ion-label stacked text-capitalize color="primary" style="font-weight: bold">{{ \'START_DATE\' | translate }}</ion-label>\n\n				<ion-datetime displayFormat="MM/DD/YYYY" disabled type="text" placeholder="01/01/2018" [(ngModel)]="date.from"></ion-datetime>\n\n			</ion-item>\n\n		</ion-col>\n\n\n\n		<ion-col col-6 class="end_date">\n\n			<ion-item (click)="presentCalendar()">\n\n				<ion-label stacked text-capitalize color="primary" style="font-weight: bold">{{ \'END_DATE\' | translate }}</ion-label>\n\n				<ion-datetime displayFormat="MM/DD/YYYY" disabled type="text" placeholder="01/01/2018" [(ngModel)]="date.to"></ion-datetime>\n\n			</ion-item>\n\n		</ion-col>\n\n	</ion-row>\n\n\n\n	<ion-label text-small text-center no-top-margin>\n\n		<span *ngIf="date.period > 1">{{ \'WITHIN_DAY_PERIOD_PLURAL\' | translate | interpolate : ["period",date.period] }}</span>\n\n		<span *ngIf="date.period == 1">{{ \'WITHIN_DAY_PERIOD_SINGULAR\' | translate | interpolate : ["period",date.period]\n\n			}}</span>\n\n\n\n	</ion-label>\n\n\n\n	<button ion-button round full pink-gradient class="next-btn" [disabled]="!shouldAllowSubmit()" (click)="next()">{{ \'NEXT\' | translate\n\n		}}</button>\n\n\n\n</ion-list>'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\searchMaster\searchMaster.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["Platform"],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["Events"],
            __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_location_accuracy__["a" /* LocationAccuracy */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_diagnostic__["a" /* Diagnostic */],
            __WEBPACK_IMPORTED_MODULE_6__app_BootstrapFirstRun__["a" /* CustomBootstrap */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_android_permissions__["a" /* AndroidPermissions */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["AlertController"],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["PopoverController"],
            __WEBPACK_IMPORTED_MODULE_5__providers_services__["a" /* ApiProvider */],
            __WEBPACK_IMPORTED_MODULE_6__app_BootstrapFirstRun__["a" /* CustomBootstrap */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["ModalController"]])
    ], searchMaster);
    return searchMaster;
}());

//# sourceMappingURL=searchMaster.js.map

/***/ }),

/***/ 426:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPopoverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_BootstrapFirstRun__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ListPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ListPopoverPage = /** @class */ (function () {
    function ListPopoverPage(navCtrl, viewCtrl, api, navParams, events, configuration) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.api = api;
        this.navParams = navParams;
        this.events = events;
        this.configuration = configuration;
        this.beach = { beach_ids: [], start_date: null, end_date: null, latitude: 0, longitude: 0 };
        this.mPage = { type: '', selected: 0 };
        this.places = [];
        this.focused = { place: false, country: false };
        this.dateObj = { from: null, to: null };
        this.SearchDetails = { country: null, place: '', all: '' };
        this.Search = { country: null, place: '' };
        this.mPage.type = this.navParams.get('type');
        this.countries = this.navParams.get('countries');
        // this.places = this.navParams.get('places');
        this.Search.country = this.navParams.get('country_id');
        this.mPage.selected = this.navParams.get('country_id');
        this.places = JSON.parse(localStorage.getItem('places') || '[]');
    }
    ListPopoverPage.prototype.ionViewDidLoad = function () {
    };
    ListPopoverPage.prototype.ionViewWillLeave = function () {
        this.events.publish("page:" + this.mPage.type, this.SearchDetails["" + this.mPage.type]);
        // if(this.mPage.type == 'place') {
        //   this.events.publish('page:beach', this.beach);
        // }
    };
    ListPopoverPage.prototype.getBeachId = function (country, place) {
        var _this = this;
        this.mPage.selected = country.id;
        if (country && country.id && country.name) {
            this.Search.country = country.id;
            this.SearchDetails.country = country.name;
            this.events.publish('page:country_id', country.id);
            this.viewCtrl.dismiss();
            return;
        }
        if (place && place.id && place.name) {
            this.Search.place = place.id;
            this.SearchDetails.place = place.name;
        }
        // Define map tab test-=------
        if (this.SearchDetails.country === 'Romania' && this.SearchDetails.place === 'Mamaia')
            this.events.publish('app:mapView', true);
        else
            this.events.publish('app:mapView', false);
        //- --------------------
        if ((this.Search.country && this.Search.country >= 0) && (this.Search.place && this.Search.place.length > 3)) {
            this.api.get('beaches/' + this.Search.country + '/' + this.Search.place, {}, {}, true).subscribe(function (r) {
                _this.beach.beach_ids = r;
                _this.events.publish('page:beach', _this.beach);
            });
        }
        this.viewCtrl.dismiss();
    };
    ListPopoverPage.prototype.getCountryPlaces = function () {
        var _this = this;
        if (!this.places.length) {
        }
        if (this.Search && this.Search.country) {
            return this.places.filter(function (r) { return r['country_id'] === _this.Search.country; });
        }
    };
    ListPopoverPage.prototype.getPlaces = function () {
        this.api.get("places", {}, {}, true).subscribe(function (r) {
            localStorage.setItem('places', JSON.stringify(r));
        });
    };
    ListPopoverPage.prototype.getBeachSettings = function () {
        /*this.api.get("beach-settings", {}, {}, true).subscribe(r => {
          localStorage.setItem('beachsettings',JSON.stringify(r));
        })*/
    };
    ListPopoverPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
            selector: 'page-list-popover',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\searchMaster\list-popover\list-popover.html"*/'<ion-header mode="ios">\n\n\n\n	<ion-navbar mode="ios">\n\n\n\n		<ion-title mode="ios">{{ mPage.type==\'country\' ? (\'SELECT_COUNTRY\' | translate) : (\'CHOOSE_PLACE\' | translate) }}</ion-title>\n\n		<button ion-button clear icon-only right (click)="viewCtrl.dismiss()" class="close-btn">\n\n			<ion-icon name="ios-close-outline"></ion-icon>\n\n		</button>\n\n	</ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n	<ion-list class="searchResult" *ngIf="mPage.type==\'country\'" no-padding no-margin>\n\n		<ion-item no-lines *ngFor="let item of countries | sort:\'All\':10:\'country\' let i =index" (mousedown)="getBeachId({id:item.id,name:item.country,beaches:item.beaches}); getPlaces();$event.preventDefault();">\n\n			<button ion-button round full pink-gradient [ngClass]="item.id == mPage.selected ? \'selected\' : \'default\'">\n\n				{{ item.country }} \n\n			</button>\n\n		</ion-item>\n\n	</ion-list>\n\n\n\n	<ion-list class="searchResult" *ngIf="mPage.type==\'place\'">\n\n		<ion-item no-lines *ngFor="let item of getCountryPlaces() | sort:\'All\':10:\'place\' let i =index" (mousedown)="getBeachId(false,{id:item.id,name:item.place,beaches:item.beaches});getBeachSettings()">\n\n			<button ion-button round full pink-gradient (click)="viewCtrl.dismiss()" [ngClass]="item.id == mPage.selected ? \'selected\' : \'default\'">\n\n				{{ item.place }} \n\n			</button>\n\n		</ion-item>\n\n	</ion-list>\n\n</ion-content>'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\searchMaster\list-popover\list-popover.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_0__providers_services__["a" /* ApiProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"], __WEBPACK_IMPORTED_MODULE_3__app_BootstrapFirstRun__["a" /* CustomBootstrap */]])
    ], ListPopoverPage);
    return ListPopoverPage;
}());

//# sourceMappingURL=list-popover.js.map

/***/ }),

/***/ 427:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterPopoverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_BootstrapFirstRun__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FilterPopoverPage = /** @class */ (function () {
    function FilterPopoverPage(viewCtrl, navparam, configuration) {
        var _this = this;
        this.viewCtrl = viewCtrl;
        this.navparam = navparam;
        this.configuration = configuration;
        this.options = [{
                name: 'kids',
                fullName: 'KIDS',
            },
            {
                name: 'credit',
                fullName: 'CREDIT_CARD',
            },
            {
                name: 'bar',
                fullName: 'BAR',
            },
            {
                name: 'food',
                fullName: 'RESTAURANT',
            },
            {
                name: 'shower',
                fullName: 'SHOWER',
            },
            {
                name: 'wifi',
                fullName: 'WIFI',
            },
            {
                name: 'massage',
                fullName: 'MASSAGE',
            },
            {
                name: 'blue_flag',
                fullName: 'BLUE_FLAG',
            },
            {
                name: 'music',
                fullName: 'MUSIC',
            }, {
                name: 'ski_jet',
                fullName: 'SKI_JET',
            },
            {
                name: 'games',
                fullName: 'GAMES',
            }];
        this.filterSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"]({ filter: [], order: '' });
        this.search_by = '';
        this.search_by = this.navparam.get('search_by');
        var order = this.search_by == 'near' ? 'distance' : '';
        if (this.search_by == 'near') {
            this.selected = {
                filter: [],
                sort: [null, null, { 2: true }]
            };
        }
        else {
            this.selected = {
                filter: [],
                sort: [{ 1: true }]
            };
        }
        this.SubjectOBj = {
            filter: [],
            order: order
        };
        var temp = this.navparam.data.subject;
        temp.order = order;
        this.filterSubject = temp;
        this.result = this.navparam.get('result');
        this.configuration.getStorage('Filters').then(function (r) {
            if (r && r.filterMock) {
                _this.selected = r.filterMock;
            }
            if (r && r.filters) {
                _this.SubjectOBj = r.filters;
                _this.filterSubject.next(_this.SubjectOBj);
            }
        });
    }
    FilterPopoverPage.prototype.doClose = function () {
        this.viewCtrl.dismiss();
    };
    FilterPopoverPage.prototype._select = function (type, index, name) {
        if (this.selected[type])
            this.selected[type][index] = name;
    };
    FilterPopoverPage.prototype._deselect = function (type, index) {
        if (this.selected[type])
            delete this.selected[type][index];
    };
    FilterPopoverPage.prototype.check = function (type, index, single, SubjectType, SubjectName) {
        if (this.selected[type]) {
            if (single)
                this.selected[type] = [];
            if (this.selected[type][index]) {
                this._deselect(type, index);
            }
            else {
                this._select(type, index, SubjectName);
            }
            if (SubjectType == 'filter')
                this.SubjectOBj['filter'] = this.selected.filter;
            else
                this.SubjectOBj[SubjectType] = SubjectName;
            this.configuration.setStorage('Filters', { filterMock: this.selected, filters: this.SubjectOBj });
            this.filterSubject.next(this.SubjectOBj);
        }
    };
    FilterPopoverPage.prototype.transform = function () {
        var _this = this;
        if (this.result && this.result.length > 0) {
            if (this.SubjectOBj && this.SubjectOBj.filter && this.SubjectOBj.filter.length) {
                var data = this.result.filter(function (beach_settings) {
                    var status = true;
                    for (var i in _this.SubjectOBj.filter) {
                        if (beach_settings['features'] && _this.SubjectOBj.filter[i]) {
                            if (JSON.stringify(beach_settings['features']).toLowerCase().indexOf(_this.SubjectOBj.filter[i].toLowerCase()) == -1) {
                                status = false;
                                break;
                            }
                        }
                    }
                    return status;
                });
                return (data && data.length) ? data.length : 0;
            }
        }
        return (this.result && this.result.length) ? this.result.length : 0;
    };
    FilterPopoverPage.prototype.ClearSelection = function () {
        var order = this.search_by == 'near' ? 'distance' : '';
        this.selected = {
            filter: [],
            sort: [{ 1: true }]
        };
        this.SubjectOBj = {
            filter: [],
            order: order
        };
        this.configuration.removeKeys('Filters');
        this.filterSubject.next(this.SubjectOBj);
        this.doClose();
    };
    FilterPopoverPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-filter-popover',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\search-results\filter-popover\filter-popover.html"*/'<ion-toolbar>\n\n	<ion-navbar>\n\n		<ion-title>\n\n			<button ion-button clear icon-left class="clear-button" (click)="ClearSelection()">\n\n				<ion-icon name="ios-arrow-back"></ion-icon> {{ \'DESELECT_ALL\' | translate }}\n\n			</button>\n\n		</ion-title>\n\n	</ion-navbar>\n\n</ion-toolbar>\n\n\n\n<div padding>\n\n\n\n	<h3>{{ \'FILTER_BY\' |translate }}</h3>\n\n	<div class="buttons">\n\n		<button ion-button clear *ngFor="let option of options; let i=index;" (click)="check(\'filter\',i,false,\'filter\',option.fullName)"\n\n		 [ngClass]="selected.filter[i]?\'active\':\'\'">\n\n			<div text-capitalize>\n\n				<div class="icon-div">\n\n					<ion-icon name="option-{{option.name}}" [ngClass]="selected.filter[i]?\'active\':\'\'" large></ion-icon>\n\n				</div>\n\n				{{this.configuration.translate.translate.instant(option.fullName)}}\n\n			</div>\n\n		</button>\n\n		<button ion-button clear [disabled]="true"></button>\n\n		<button ion-button clear [disabled]="true"></button>\n\n	</div>\n\n\n\n	<h3>{{ \'SORT_BY\' | translate }}</h3>\n\n	<div class="buttons alignLeft">\n\n		<button ion-button clear (click)="check(\'sort\',0,true,\'order\',\'reset\')" [ngClass]="selected.sort[0]?\'active\':\'\'" *ngIf="search_by != \'near\'">\n\n			<div text-capitalize>\n\n				<div class="icon-div">\n\n					<ion-icon name="list" large [ngClass]="selected.sort[0]?\'active\':\'\'"></ion-icon>\n\n				</div>\n\n				{{ \'NORMAL\' | translate }}\n\n			</div>\n\n		</button>\n\n		<button ion-button clear (click)="check(\'sort\',1,true,\'order\',\'rating\')" [ngClass]="selected.sort[1]?\'active\':\'\'">\n\n			<div text-capitalize>\n\n				<div class="icon-div">\n\n					<ion-icon name="star" large [ngClass]="selected.sort[1]?\'active\':\'\'"></ion-icon>\n\n				</div>\n\n				{{ \'RATING\' | translate }}\n\n			</div>\n\n		</button>\n\n		<button ion-button clear (click)="check(\'sort\',2,true,\'order\',\'distance\')" [ngClass]="selected.sort[2]?\'active\':\'\'">\n\n			<div text-capitalize>\n\n				<div class="icon-div">\n\n					<ion-icon name="pin" large [ngClass]="selected.sort[2]?\'active\':\'\'"></ion-icon>\n\n				</div>\n\n				{{ \'DISTANCE\' | translate }}\n\n			</div>\n\n		</button>\n\n		<button ion-button clear [disabled]="true"></button>\n\n	</div>\n\n</div>\n\n\n\n<button ion-button full pink-gradient class="bottom-button" (click)="doClose()">{{ \'SEE_RESULT\' | translate }} <span\n\n	 class="littleInfo">({{ transform() }} {{ \'BEACHES\'|translate }})</span></button>'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\search-results\filter-popover\filter-popover.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_3__app_BootstrapFirstRun__["a" /* CustomBootstrap */]])
    ], FilterPopoverPage);
    return FilterPopoverPage;
}());

//# sourceMappingURL=filter-popover.js.map

/***/ }),

/***/ 428:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyprofilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__myprofile_loyalty_points_loyalty_points__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_BootstrapFirstRun__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__resetPassword_resetPassword__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_base64__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_crop__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_file__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__includes_events_eventsThisWeek__ = __webpack_require__(429);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__ = __webpack_require__(43);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};













/**
 * Generated class for the MyprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MyprofilePage = /** @class */ (function () {
    function MyprofilePage(splashScreen, platform, alerCtrl, app, navCtrl, modalCtrl, navParams, events, configuration, api, camera, croper, base64, ngZone, file, popoverCtrl) {
        this.splashScreen = splashScreen;
        this.platform = platform;
        this.alerCtrl = alerCtrl;
        this.app = app;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.events = events;
        this.configuration = configuration;
        this.api = api;
        this.camera = camera;
        this.croper = croper;
        this.base64 = base64;
        this.ngZone = ngZone;
        this.file = file;
        this.popoverCtrl = popoverCtrl;
        this.is_guest = false;
        this.camera_options = {
            quality: 70,
            cameraDirection: this.camera.Direction.FRONT,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            correctOrientation: true,
        };
        this.crop_options = {
            quality: 70,
            targetWidth: 200,
            targetHeight: 200,
        };
        this.new_photo = false;
        this.unreceivedEvents = '';
    }
    MyprofilePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.checkEvents();
        this.events.subscribe('app:event', function () {
            _this.checkEvents();
        });
        this.configuration.getStorage('login').then(function (a) {
            if (a && a.token) {
                _this.oldName = a.name;
                _this.newName = a.name;
                _this.phone = a.phone;
                _this.customerid = a.id;
                _this.photo = a.photo;
                _this.is_guest = a.guest || a.tour;
            }
        }, function (error) { });
    };
    MyprofilePage.prototype.ionViewWillLeave = function () {
        this.events.unsubscribe('app:event');
    };
    MyprofilePage.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.api.fcmToken) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.api.get("fcm/" + this.api.fcmToken + "/remove", {}, {}, true).toPromise()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        this.configuration.clearStorage().then(function (r) {
                            window.location.reload();
                            _this.splashScreen.show();
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    MyprofilePage.prototype.takePhoto = function (source) {
        var _this = this;
        this.camera.getPicture(__assign({}, this.camera_options, { sourceType: source }))
            .then(function (imagepath) {
            return _this.croper.crop(imagepath, _this.crop_options);
        })
            .then(function (cropped_path) {
            if (_this.platform.is('android')) {
                return _this.base64.encodeFile(cropped_path);
            }
            else {
                var fileName = cropped_path.split('/').pop();
                var path = cropped_path.substring(0, cropped_path.lastIndexOf("/") + 1);
                return _this.file.readAsDataURL(path, fileName);
            }
        })
            .then(function (imageData) {
            return new Promise(function (resolve, reject) {
                try {
                    var img = new Image;
                    img.onload = function resizeImage() {
                        resolve(imageToDataUri_1(this, 500, 500));
                    };
                    img.src = imageData.split('\n').join('').split('\r').join('');
                    var imageToDataUri_1 = function (img, width, height) {
                        // create an off-screen canvas
                        var canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
                        // set its dimension to target size
                        canvas.width = width;
                        canvas.height = height;
                        // draw source image into the off-screen canvas:
                        ctx.drawImage(img, 0, 0, width, height);
                        // encode image to data-uri with base64 version of compressed image
                        return canvas.toDataURL('image/jpeg', 0.5);
                    };
                }
                catch (error) {
                    reject(error);
                }
            });
        })
            .then(function (imageData) {
            _this.new_photo = imageData;
            _this.ngZone.run(_this.updatePhoto.bind(_this));
        })
            .catch(function () {
        });
    };
    MyprofilePage.prototype.updatePhoto = function () {
        var _this = this;
        var imageData = this.new_photo;
        if (imageData.indexOf(';base64,') > -1) {
            imageData = imageData.substr(imageData.indexOf(';base64,') + 8);
        }
        this.api.post('customer', { id: this.customerid, photo: imageData }, {}, true).subscribe(function (res) {
            _this.ngZone.run(function () {
                _this.configuration.getStorage('login').then(function (login) {
                    var newLogin = JSON.parse(JSON.stringify(login));
                    newLogin.photo = res.photo;
                    _this.configuration.setStorage('login', newLogin);
                    _this.photo = res.photo;
                });
            });
        }, function (error) {
            _this.ngZone.run(function () {
                alert(error.message);
            });
        });
    };
    MyprofilePage.prototype.destroyAccount = function () {
        var _this = this;
        var confirm = this.alerCtrl.create({
            title: "Warning",
            message: "Do you really want to destroy your account?",
            buttons: [
                {
                    text: "Ok",
                    handler: function () {
                        _this.api.post('customer/delete', { customer_id: _this.customerid }, {}).subscribe(function (r) {
                            if (r) {
                                _this.logout();
                            }
                        }, function (error) { });
                    }
                },
                {
                    text: "Cancel",
                    handler: function () {
                        return;
                    }
                }
            ]
        });
        confirm.present();
    };
    MyprofilePage.prototype.checkEvents = function () {
        var _this = this;
        if (this.eventPopup)
            return;
        this.ngZone.run(function () {
            _this.api.get('events/hasnew', {}, {}, true, true).subscribe(function (data) {
                if (data.news) {
                    _this.unreceivedEvents = data.news;
                }
                else {
                    _this.unreceivedEvents = '';
                }
            }, function (error) { });
        });
    };
    MyprofilePage.prototype.eventsThisWeek = function () {
        var _this = this;
        this.events.publish('app:removeBadge');
        this.unreceivedEvents = '';
        this.eventPopup = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_10__includes_events_eventsThisWeek__["a" /* EventsThisWeek */], {}, {
            cssClass: 'eventsPopOver',
            enableBackdropDismiss: false
        });
        this.eventPopup.onDidDismiss(function () {
            _this.eventPopup = null;
        });
        this.eventPopup.present();
    };
    MyprofilePage.prototype.ResetPassword = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__resetPassword_resetPassword__["a" /* resetPassword */]);
    };
    MyprofilePage.prototype.onUpdateName = function (event) {
        var _this = this;
        var self = this;
        if (self.newName != self.oldName) {
            var requestBody = {
                name: self.newName
            };
            this.api.put("" + this.customerid, requestBody, {}).subscribe(function (res) {
                _this.configuration.getStorage('login').then(function (login) {
                    var newLogin = JSON.parse(JSON.stringify(login));
                    newLogin.name = res.name;
                    _this.configuration.setStorage('login', newLogin);
                });
            });
        }
    };
    MyprofilePage.prototype.onLoyalityPoint = function () {
        // https://smart-beach.ga/api/client/loiality-points/7ee6b60d-42ea-4b2a-9cbc-d4a36ea0e131
        var _this = this;
        this.api.get("loiality-points/" + this.customerid, {}, {}).subscribe(function (res) {
            _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_0__myprofile_loyalty_points_loyalty_points__["a" /* LoyaltyPointsPage */], { 'points': res }).present();
        });
    };
    MyprofilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'page-myprofile',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\myprofile\myprofile.html"*/'<ion-header class="has-shadow">\n\n\n\n    <ion-navbar>\n\n        <ion-title text-center  *ngIf="!is_guest">{{"MY_ACCOUNT" | translate}}</ion-title>\n\n        <ion-title text-center *ngIf="is_guest">{{"OPTIONS" | translate}}</ion-title>\n\n        <ion-buttons right>\n\n            <button ion-button (click)="logout()">\n\n                <div>\n\n                    <img src="assets/imgs/logout.png" class="logout-image">\n\n                    <div class="logout-label">{{"LOGOUT_LABEL" | translate}}</div>\n\n                </div>\n\n            </button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n\n\n    <div class="myprofile-main-layout">\n\n        <div class="myprofile-content-layout" *ngIf="!is_guest">\n\n            <div text-center>\n\n                <div text-left>\n\n                    <ion-item>\n\n                        <ion-label stacked>{{"NAME" | translate}}:</ion-label>\n\n                        <ion-input [(ngModel)]="newName" (ionBlur)="onUpdateName($event)"></ion-input>\n\n                    </ion-item>\n\n                    <br/>\n\n                    <ion-item>\n\n                        <ion-label stacked>{{"PHONE_NUMBER" | translate}}:</ion-label>\n\n                        <ion-input [(ngModel)]="phone" readonly></ion-input>\n\n                    </ion-item>\n\n                    <div class="photo-group">\n\n                        <ion-avatar>\n\n                            <img [attr.src]="photo || \'assets/imgs/avatar.png\'" />\n\n                        </ion-avatar>\n\n                        <div class="button-group">\n\n                            <button icon-only ion-button type="button" (click)="takePhoto(0)">{{ \'CHANGE_PHOTO\' | translate }}</button>\n\n                            <button icon-only ion-button type="button" (click)="takePhoto(1)">{{ \'TAKE_PHOTO\' | translate }}</button>\n\n                        </div>\n\n                    </div>\n\n                </div>\n\n            </div>\n\n        </div>\n\n        <div class="myprofile-button-layout">\n\n            <!-- <button ion-button round outline (click)="eventsThisWeek()">\n\n                <img src="assets/imgs/good_tick2.png" class="destroy-image">\n\n                <ion-badge *ngIf="unreceivedEvents" class="badge" color="danger">{{unreceivedEvents}}</ion-badge>\n\n                <div style="white-space: normal; flex: 1;">\n\n                    {{"EVENTS" | translate}}\n\n                </div>\n\n            </button> -->\n\n            <button ion-button round outline (click)="ResetPassword()" *ngIf="!is_guest">\n\n                <img src="assets/imgs/reset.png" class="reset-image">\n\n                <div style="white-space: normal; flex: 1;">\n\n                    {{"RESET_PASSWORD" | translate}}\n\n                </div>\n\n            </button>\n\n            <button ion-button round outline (click)="destroyAccount()" *ngIf="!is_guest">\n\n                <img src="assets/imgs/destroy.png" class="destroy-image">\n\n                <div style="white-space: normal; flex: 1;">\n\n                    {{"DESTROY" | translate}}\n\n                </div>\n\n            </button>\n\n            <button class="loyality" ion-button round full pink-gradient *ngIf="!is_guest" (click)="onLoyalityPoint()">{{ "ROYALTY_POINTS" | translate }}</button>\n\n        </div>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\myprofile\myprofile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["Platform"],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["App"],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["ModalController"],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["Events"],
            __WEBPACK_IMPORTED_MODULE_3__app_BootstrapFirstRun__["a" /* CustomBootstrap */], __WEBPACK_IMPORTED_MODULE_5__providers_services__["a" /* ApiProvider */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_crop__["a" /* Crop */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_base64__["a" /* Base64 */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_9__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["PopoverController"]])
    ], MyprofilePage);
    return MyprofilePage;
}());

//# sourceMappingURL=myprofile.js.map

/***/ }),

/***/ 429:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventsThisWeek; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_BootstrapFirstRun__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_app_availability__ = __webpack_require__(430);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







var EventsThisWeek = /** @class */ (function () {
    function EventsThisWeek(platform, navCtrl, navParams, iab, appAvailability, configuration, api, events, ngZone, viewCtrl) {
        var _this = this;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.iab = iab;
        this.appAvailability = appAvailability;
        this.configuration = configuration;
        this.api = api;
        this.events = events;
        this.ngZone = ngZone;
        this.viewCtrl = viewCtrl;
        this.items = [];
        this.getEvents();
        this.events.subscribe('reload:event', function () {
            ngZone.run(function () {
                _this.getEvents.bind(_this);
            });
        });
        this.platform.ready().then(function () {
            try {
                _this.sub1$ = _this.platform.resume.subscribe(function () {
                    ngZone.run(function () {
                        _this.getEvents();
                    }, function (error) {
                    });
                });
            }
            catch (error) {
            }
        });
        this.events.subscribe('app:event', function () {
            _this.getEvents();
        });
    }
    EventsThisWeek.prototype.ionViewWillUnload = function () {
        this.events.unsubscribe('reload:event');
        this.sub1$.unsubscribe();
    };
    EventsThisWeek.prototype.getEvents = function () {
        var _this = this;
        this.ngZone.run(function () {
            _this.api.get('events', {}, {}, true, false).subscribe(function (data) {
                if (data) {
                    _this.items = data.map(function (item) {
                        item.date = __WEBPACK_IMPORTED_MODULE_4_moment__(item.date).format('YYYY-MM-DD HH:mm');
                        return item;
                    }).reverse();
                }
            }, function (error) {
            });
        });
    };
    EventsThisWeek.prototype.openEvents = function (item) {
        var _this = this;
        item.unread = false;
        this.api.get("events/read/" + item.id, {}, {}, true, true).subscribe(function () { return __awaiter(_this, void 0, void 0, function () {
            var sps, package_name_1, scheme_1, exists, error_1, position, app, exists, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.platform.is('android') && item.android_scheme)) return [3 /*break*/, 5];
                        sps = item.android_scheme.split(';');
                        package_name_1 = null, scheme_1 = null;
                        sps.forEach(function (sp) {
                            var key_map = sp.split('=');
                            if (key_map.length === 2) {
                                if (key_map[0] === 'package') {
                                    package_name_1 = key_map[1];
                                }
                                else if (key_map[0] === 'scheme') {
                                    scheme_1 = key_map[1];
                                }
                            }
                        });
                        if (!(package_name_1 && scheme_1)) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.appAvailability.check(package_name_1)];
                    case 2:
                        exists = _a.sent();
                        if (exists) {
                            return [2 /*return*/, this.iab.create(item.link, '_system')];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 9];
                    case 5:
                        if (!(this.platform.is('ios') && item.ios_scheme)) return [3 /*break*/, 9];
                        position = item.ios_scheme.indexOf('://');
                        if (!(position > -1)) return [3 /*break*/, 9];
                        app = item.ios_scheme.substring(0, position + 3);
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, this.appAvailability.check(app)];
                    case 7:
                        exists = _a.sent();
                        if (exists) {
                            return [2 /*return*/, this.iab.create(item.link, '_system')];
                        }
                        return [3 /*break*/, 9];
                    case 8:
                        error_2 = _a.sent();
                        return [3 /*break*/, 9];
                    case 9:
                        this.iab.create(item.link, null, 'hidenavigationbuttons=yes');
                        return [2 /*return*/];
                }
            });
        }); });
    };
    EventsThisWeek.prototype.onClose = function () {
        this.viewCtrl.dismiss();
    };
    EventsThisWeek = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'events-this-week',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\events\eventsThisWeek.html"*/'<ion-header class="has-shadow" #header>\n\n    <ion-navbar>\n\n        <ion-title>{{ \'EVENTSE\' | translate }}</ion-title>\n\n        <ion-buttons end>\n\n            <button ion-button clear icon-only right (click)=\'onClose()\'>\n\n                <ion-icon name="ios-close-outline"></ion-icon>\n\n            </button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="events">\n\n    <ion-item *ngFor="let item of items;" (click)="openEvents(item)" no-lines>\n\n        <div class="badge" *ngIf="item.unread"></div>\n\n        <h2>{{item.title}}</h2>\n\n        <p>{{item.contents}}</p>\n\n        <h1>{{item.location}} ({{item.date}})</h1>\n\n    </ion-item>\n\n</ion-content>'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\events\eventsThisWeek.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_app_availability__["a" /* AppAvailability */],
            __WEBPACK_IMPORTED_MODULE_2__app_BootstrapFirstRun__["a" /* CustomBootstrap */], __WEBPACK_IMPORTED_MODULE_3__providers_services__["a" /* ApiProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"]])
    ], EventsThisWeek);
    return EventsThisWeek;
}());

//# sourceMappingURL=eventsThisWeek.js.map

/***/ }),

/***/ 431:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrivateChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_chat_service__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chat__ = __webpack_require__(172);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PrivateChatPage = /** @class */ (function () {
    function PrivateChatPage(navParams, chatService, events, navCtrl) {
        var _this = this;
        this.chatService = chatService;
        this.events = events;
        this.navCtrl = navCtrl;
        this.pushPage = __WEBPACK_IMPORTED_MODULE_3__chat__["a" /* ChatPage */];
        this.msgList = [
            {
                "messageId": "1",
                "userId": "140000198202211138",
                "userName": "Luff",
                "userImgUrl": "../../assets/imgs/beaches/beach1.png",
                "toUserId": "210000198410281948",
                "toUserName": "Hancock",
                "userAvatar": "../../assets/imgs/beaches/beach2.png",
                "time": 1488349800000,
                "message": "A good programmer is someone who always looks both ways before crossing a one-way street. ",
                "status": "success"
            },
            {
                "messageId": "2",
                "userId": "210000198410281948",
                "userName": "Hancock",
                "userImgUrl": "../../assets/imgs/beaches/beach2.png",
                "toUserId": "140000198202211138",
                "toUserName": "Luff",
                "userAvatar": "../../assets/imgs/beaches/beach1.png",
                "time": 1491034800000,
                "message": "Don’t worry if it doesn't work right. If everything did, you’d be out of a job.",
                "status": "success"
            },
            {
                "messageId": "3",
                "userId": "140000198202211138",
                "userName": "Luff",
                "userImgUrl": "../../assets/imgs/beaches/beach1.png",
                "toUserId": "210000198410281948",
                "toUserName": "Hancock",
                "userAvatar": "../../assets/imgs/beaches/beach2.png",
                "time": 1491034920000,
                "message": "Most of you are familiar with the virtues of a programmer. There are three, of course: laziness, impatience, and hubris.",
                "status": "success"
            },
            {
                "messageId": "4",
                "userId": "210000198410281948",
                "userName": "Hancock",
                "userImgUrl": "../../assets/imgs/beaches/beach2.png",
                "toUserId": "140000198202211138",
                "toUserName": "Luff",
                "userAvatar": "../../assets/imgs/beaches/beach1.png",
                "time": 1491036720000,
                "message": "One man’s crappy software is another man’s full time job.",
                "status": "success"
            },
            {
                "messageId": "5",
                "userId": "210000198410281948",
                "userName": "Hancock",
                "userImgUrl": "../../assets/imgs/beaches/beach2.png",
                "toUserId": "140000198202211138",
                "toUserName": "Luff",
                "userAvatar": "../../assets/imgs/beaches/beach1.png",
                "time": 1491108720000,
                "message": "Programming is 10% science, 20% ingenuity, and 70% getting the ingenuity to work with the science.",
                "status": "success"
            },
            {
                "messageId": "6",
                "userId": "140000198202211138",
                "userName": "Luff",
                "userImgUrl": "../../assets/imgs/beaches/beach1.png",
                "toUserId": "210000198410281948",
                "toUserName": "Hancock",
                "userAvatar": "../../assets/imgs/beaches/beach2.png",
                "time": 1491231120000,
                "message": "If at first you don’t succeed, call it version 1.0",
                "status": "success"
            },
            {
                "messageId": "7",
                "userId": "140000198202211138",
                "userName": "Luff",
                "userImgUrl": "../../assets/imgs/beaches/beach1.png",
                "toUserId": "210000198410281948",
                "toUserName": "Hancock",
                "userAvatar": "../../assets/imgs/beaches/beach2.png",
                "time": 1491231150000,
                "message": "The <textarea> tag defines a multi-line text input control.\nA text area can hold an unlimited number of characters, and the text renders in a fixed-width font (usually Courier).\nThe size of a text area can be specified by the cols and rows attributes, or even better; through CSS' height and width properties.",
                "status": "success"
            }
        ];
        this.user = [];
        this.toUser = [];
        this.editorMsg = '';
        this.showEmojiPicker = false;
        // Get the navParams toUserId parameter
        //navParams = navParams.data.item;
        this.toUser = {
            id: '210000198410281948',
            name: 'Hancock'
        };
        this.chatService.getUserInfo()
            .then(function (res) {
            _this.user = res;
        });
    }
    PrivateChatPage.prototype.ionViewWillLeave = function () {
        // unsubscribe
        this.events.unsubscribe('chat:received');
    };
    PrivateChatPage.prototype.ionViewDidEnter = function () {
        //get message list
        this.getMsg();
    };
    PrivateChatPage.prototype.onFocus = function () {
        this.showEmojiPicker = false;
        this.content.resize();
        this.scrollToBottom();
    };
    PrivateChatPage.prototype.switchEmojiPicker = function () {
        this.showEmojiPicker = !this.showEmojiPicker;
        if (!this.showEmojiPicker) {
            this.focus();
        }
        else {
            this.setTextareaScroll();
        }
        this.content.resize();
        this.scrollToBottom();
    };
    /**
     * @name getMsg
     */
    PrivateChatPage.prototype.getMsg = function () {
        var _this = this;
        return this.chatService
            .getMsgList()
            .subscribe(function (res) {
            _this.msgList = res;
            _this.scrollToBottom();
        });
    };
    /**
     * @name sendMsg
     */
    PrivateChatPage.prototype.sendMsg = function () {
        if (!this.editorMsg.trim())
            return;
        // Mock message
        var id = Date.now().toString();
        var newMsg = {
            messageId: Date.now().toString(),
            userId: this.user.id,
            userName: this.user.name,
            userAvatar: this.user.avatar,
            toUserId: this.toUser.id,
            time: Date.now(),
            message: this.editorMsg,
            status: 'pending'
        };
        this.pushNewMsg(newMsg);
        this.editorMsg = '';
        if (!this.showEmojiPicker) {
            this.focus();
        }
        // this.chatService.sendMsg(newMsg)
        // .then(() => {
        //   let index = this.getMsgIndexById(id);
        //   if (index !== -1) {
        //     this.msgList[index].status = 'success';
        //   }
        // })
    };
    /**
     * @name pushNewMsg
     * @param msg
     */
    PrivateChatPage.prototype.pushNewMsg = function (msg) {
        var userId = this.user.id, toUserId = this.toUser.id;
        // Verify user relationships
        if (msg.userId === userId && msg.toUserId === toUserId) {
            this.msgList.push(msg);
        }
        else if (msg.toUserId === userId && msg.userId === toUserId) {
            this.msgList.push(msg);
        }
        this.scrollToBottom();
    };
    PrivateChatPage.prototype.getMsgIndexById = function (id) {
        return this.msgList.findIndex(function (e) { return e.messageId === id; });
    };
    PrivateChatPage.prototype.scrollToBottom = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.content.scrollToBottom) {
                _this.content.scrollToBottom();
            }
        }, 400);
    };
    PrivateChatPage.prototype.focus = function () {
        if (this.messageInput && this.messageInput.nativeElement) {
            this.messageInput.nativeElement.focus();
        }
    };
    PrivateChatPage.prototype.setTextareaScroll = function () {
        var textarea = this.messageInput.nativeElement;
        textarea.scrollTop = textarea.scrollHeight;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Content"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Content"])
    ], PrivateChatPage.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('chat_input'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], PrivateChatPage.prototype, "messageInput", void 0);
    PrivateChatPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'private-chat',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\chat\privateChat\privatechat.html"*/'<ion-header>\n\n\n\n    <ion-navbar>\n\n        <!-- <ion-buttons left>\n\n            <button ion-button icon-only class="back-button" (click)="closeChat()">\n\n          <ion-icon name="ios-arrow-back"></ion-icon>\n\n        </button>\n\n        </ion-buttons> -->\n\n      <ion-title>{{toUser.name}}</ion-title>\n\n\n\n		<!-- <ion-buttons right>\n\n			<button ion-button icon-only (click)="showFilter()">\n\n				<ion-icon name="options"></ion-icon>\n\n			</button>\n\n		</ion-buttons> -->\n\n    </ion-navbar>\n\n  \n\n  </ion-header>\n\n  \n\n  <ion-content>\n\n  \n\n    <div class="message-wrap">\n\n  \n\n      <div *ngFor="let msg of msgList"\n\n           class="message"\n\n           [class.left]=" msg.userId === toUser.id "\n\n           [class.right]=" msg.userId === user.id ">\n\n        <img class="user-img" [src]="msg.userAvatar" alt="" src="">\n\n        <ion-spinner name="dots" *ngIf="msg.status === \'pending\'"></ion-spinner>\n\n        <div class="msg-detail">\n\n          <div class="msg-content">\n\n            <span class="triangle"></span>\n\n            <p class="line-breaker ">{{msg.message}}</p>\n\n          </div>\n\n        </div>\n\n        \n\n        <!-- <div class="msg-info">\n\n            <p>\n\n              4:20</p>\n\n          </div> -->\n\n      </div>\n\n      \n\n  \n\n    </div>\n\n  \n\n  </ion-content>\n\n  \n\n  <ion-footer no-border [style.height]="showEmojiPicker ? \'255px\' : \'45px\'">\n\n    <!-- <div class="input-wrap">\n\n      <button ion-button clear icon-only item-left (click)="switchEmojiPicker()">\n\n        <ion-icon name="md-happy"></ion-icon>\n\n      </button>\n\n      <textarea #chat_input\n\n                placeholder="Text Input"\n\n                [(ngModel)]="editorMsg"\n\n                (keyup.enter)="sendMsg()"\n\n                (focusin)="onFocus()">\n\n      </textarea>\n\n      <button ion-button clear icon-only item-right (click)="sendMsg()">\n\n        <ion-icon name="ios-send" ios="ios-send" md="md-send"></ion-icon>\n\n      </button>\n\n    </div> -->\n\n    <div style="display:flex;">\n\n        <div class="footer-body">\n\n        <ion-col style="display:flex;">\n\n          <button style="max-width: 30px;color: grey !important;" ion-button clear icon-only item-left (click)="switchEmojiPicker()">\n\n              <ion-icon name="happy"></ion-icon>\n\n            </button>\n\n      <ion-col><textarea #chat_input style="display: flex;height: 38px;"\n\n          placeholder="Type a message"\n\n          [(ngModel)]="editorMsg"\n\n          (keyup.enter)="sendMsg()"\n\n          (focusin)="onFocus()">\n\n</textarea>\n\n      </ion-col>\n\n      <ion-col style="max-width: 64px;color: grey !important;display: contents;">\n\n        <button  style="max-width: 38px;color: grey !important;" ion-button clear icon-only (click)="switchEmojiPicker()">\n\n          <ion-icon name="attach"></ion-icon>\n\n        </button>\n\n          <button style="max-width: 38px;color: grey !important;" ion-button clear icon-only (click)="switchEmojiPicker()">\n\n              <ion-icon name="camera"></ion-icon>\n\n            </button>\n\n      </ion-col>\n\n    </ion-col>\n\n  </div>\n\n  <div><ion-col style="max-width: 46px;">\n\n      <button ion-button clear color="primary" class="send-btn" icon-only (click)="switchEmojiPicker()">\n\n          <ion-icon name="arrow-round-forward"></ion-icon>\n\n        </button>\n\n  </ion-col></div>\n\n    \n\n      \n\n        \n\n         \n\n          \n\n\n\n    </div>\n\n    <!-- <emoji-picker [(ngModel)]="editorMsg"></emoji-picker> -->\n\n  </ion-footer>\n\n  '/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\chat\privateChat\privatechat.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_2__providers_chat_service__["a" /* ChatService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"]])
    ], PrivateChatPage);
    return PrivateChatPage;
}());

//# sourceMappingURL=privatechat.js.map

/***/ }),

/***/ 432:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ChatMessage */
/* unused harmony export UserInfo */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators_map__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(87);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ChatMessage = /** @class */ (function () {
    function ChatMessage() {
    }
    return ChatMessage;
}());

var UserInfo = /** @class */ (function () {
    function UserInfo() {
    }
    return UserInfo;
}());

var ChatService = /** @class */ (function () {
    function ChatService(http, events) {
        this.http = http;
        this.events = events;
    }
    ChatService.prototype.mockNewMsg = function (msg) {
        var _this = this;
        var mockMsg = {
            messageId: Date.now().toString(),
            userId: '210000198410281948',
            userName: 'Hancock',
            userAvatar: './assets/to-user.jpg',
            toUserId: '140000198202211138',
            time: Date.now(),
            message: msg.message,
            status: 'success'
        };
        setTimeout(function () {
            _this.events.publish('chat:received', mockMsg, Date.now());
        }, Math.random() * 1800);
    };
    ChatService.prototype.getMsgList = function () {
        var msgListUrl = './assets/mock/msg-list.json';
        return this.http.get(msgListUrl)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators_map__["map"])(function (response) { return response.array; }));
    };
    ChatService.prototype.sendMsg = function (msg) {
        var _this = this;
        return new Promise(function (resolve) { return setTimeout(function () { return resolve(msg); }, Math.random() * 1000); })
            .then(function () { return _this.mockNewMsg(msg); });
    };
    ChatService.prototype.getUserInfo = function () {
        var userInfo = {
            id: '140000198202211138',
            name: 'Luff',
            avatar: './assets/user.jpg'
        };
        return new Promise(function (resolve) { return resolve(userInfo); });
    };
    ChatService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"]])
    ], ChatService);
    return ChatService;
}());

//# sourceMappingURL=chat-service.js.map

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return searchDupplication; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_BootstrapFirstRun__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Created by Bruce Lee on 03/16/18.
 */
var searchDupplication = /** @class */ (function () {
    function searchDupplication(navCtrl, viewCtrl, navparam, splashScreen, api, configuration) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.navparam = navparam;
        this.splashScreen = splashScreen;
        this.api = api;
        this.configuration = configuration;
        this.redirect = false;
    }
    searchDupplication.prototype.ngOnInit = function () {
        var param = this.navparam.data;
        if (param.redirect) {
            this.redirect = true;
        }
    };
    searchDupplication.prototype.close = function (accept) {
        var _this = this;
        if (this.redirect) {
            if (this.api.fcmToken) {
                try {
                    this.api.get("fcm/" + this.api.fcmToken + "/remove", {}, {}, true).toPromise();
                }
                catch (error) { }
            }
            this.configuration.clearStorage().then(function (r) {
                window.location.reload();
                _this.splashScreen.show();
            });
        }
        this.viewCtrl.dismiss(accept);
    };
    searchDupplication = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'search-dupplication',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\searchDupplication\searchDupplication.html"*/'<ion-list>\n\n  <h4 ion-text color="primary">{{ \'SMART_BEACH\' |translate }}</h4>\n\n\n\n  <p>{{ navparam.data.msg }}</p>\n\n\n\n  <div class="buttons">\n\n    <button ion-button (click)="close()">{{ \'OK\'|translate }}</button>\n\n    <!-- <button ion-button (click)="gotoVerification()">{{ \'OK\' |translate }}</button> -->\n\n  </div>\n\n</ion-list>\n\n'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\searchDupplication\searchDupplication.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_2__providers_services__["a" /* ApiProvider */],
            __WEBPACK_IMPORTED_MODULE_3__app_BootstrapFirstRun__["a" /* CustomBootstrap */]])
    ], searchDupplication);
    return searchDupplication;
}());

//# sourceMappingURL=searchDupplication.js.map

/***/ }),

/***/ 447:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImageViewerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_BootstrapFirstRun__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Created by Bruce Lee on 03/16/18.
 */
var ImageViewerPage = /** @class */ (function () {
    function ImageViewerPage(navCtrl, viewCtrl, navparam, splashScreen, api, configuration) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.navparam = navparam;
        this.splashScreen = splashScreen;
        this.api = api;
        this.configuration = configuration;
        this.redirect = false;
    }
    ImageViewerPage.prototype.ngOnInit = function () {
        var param = this.navparam.data;
        if (param.redirect) {
            this.redirect = true;
        }
    };
    ImageViewerPage.prototype.close = function (accept) {
        this.viewCtrl.dismiss(accept);
    };
    ImageViewerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'image-viewer',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\imageViewer\imageViewer.html"*/'<!-- <ion-header>\n\n  <ion-navbar>\n\n    <ion-buttons right>\n\n        <button ion-button icon-only (click)="close(true)">\n\n            <ion-icon name="close"></ion-icon>\n\n          </button> \n\n    </ion-buttons>\n\n      \n\n  </ion-navbar>\n\n</ion-header> -->\n\n<ion-content>\n\n  <img src={{navparam.data.img}}/>\n\n\n\n  </ion-content>\n\n'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\imageViewer\imageViewer.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_2__providers_services__["a" /* ApiProvider */],
            __WEBPACK_IMPORTED_MODULE_3__app_BootstrapFirstRun__["a" /* CustomBootstrap */]])
    ], ImageViewerPage);
    return ImageViewerPage;
}());

//# sourceMappingURL=imageViewer.js.map

/***/ }),

/***/ 453:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopoverLang; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_BootstrapFirstRun__ = __webpack_require__(6);
/**
* Created by shadow-viper on 12/16/17.
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PopoverLang = /** @class */ (function () {
    function PopoverLang(viewCtrl, navparam, configuration, navCtrl) {
        this.viewCtrl = viewCtrl;
        this.navparam = navparam;
        this.configuration = configuration;
        this.navCtrl = navCtrl;
    }
    PopoverLang.prototype.ngOnInit = function () {
        this.languages = [];
        this.selected = {};
        this.infiniteCount = 30;
        this.languages = this.configuration.storedLanguage();
        this.langAbbr = this.navparam.data.parentSubject;
        this.select(this.navparam.get('language'));
    };
    PopoverLang.prototype.select = function (item, external) {
        if (item) {
            if (item.code) {
                this.storeLanguage(item);
                this.selected = item.code;
                this.langAbbr.next(item.code);
            }
            else {
                this.selected = item;
                this.langAbbr.next(item);
            }
            if (external) {
                this.configuration.translate.setLanguageProvider(item.code, this.navCtrl, this.navparam.get('page'));
                this.configuration.apiData.currentLanguage = item.code;
                this.viewCtrl.dismiss();
            }
        }
    };
    PopoverLang.prototype.more = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            if (_this.languages.length) {
                _this.infiniteCount += 30;
                infiniteScroll.complete();
                if (_this.infiniteCount >= _this.languages.length) {
                    infiniteScroll.enable(false);
                    _this.infiniteCount = _this.languages.length;
                }
            }
        }, 300);
    };
    PopoverLang.prototype.sort = function (array) {
        array.sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            else if (a.name > b.name) {
                return 1;
            }
            else {
                return 0;
            }
        });
        return array;
    };
    PopoverLang.prototype.storeLanguage = function (selected) {
        var _this = this;
        this.configuration.getStorage('AdditionalRegData').then(function (a) {
            var lang = {};
            if (selected && selected.code) {
                lang = selected;
                lang.lang = selected.code;
            }
            else {
                lang = a;
            }
            localStorage.setItem("lang", lang.lang);
            _this.configuration.setStorage('AdditionalRegData', lang);
        });
    };
    PopoverLang = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'popover_lang',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\popover\language\popover.lang.html"*/'  <ion-content class="languageHolder">\n\n    <ion-item no-lines *ngFor="let item of languages|slice:0:infiniteCount let i=index;" (click)="select(item,true)">\n\n      <div class="tick"><div class="{{ item.code==selected?\'active\':\'\' }}"></div></div> <div class="name">{{ item.country | slice:0:8}}</div> <button ion-fab [ngStyle]="{\'background-image\': \'url(./assets/imgs/lang/\'+ item.code +\'.png)\'}"  class="lang" lang="{{ item.code }}"></button>\n\n    </ion-item>\n\n    <ion-infinite-scroll (ionInfinite)="more($event)" *ngIf="languages && languages.length>30">\n\n      <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n  </ion-content>\n\n\n\n'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\popover\language\popover.lang.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__app_BootstrapFirstRun__["a" /* CustomBootstrap */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"]])
    ], PopoverLang);
    return PopoverLang;
}());

//# sourceMappingURL=popover.lang.js.map

/***/ }),

/***/ 454:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SeachprefixPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import {searchDupplication} from "../includes/searchDupplication/searchDupplication";
/**
 * Generated class for the SeachprefixPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SeachprefixPage = /** @class */ (function () {
    function SeachprefixPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.countyries = this.navParams.get("country");
        this.tempcountry = this.countyries.slice(0, 15);
    }
    SeachprefixPage.prototype.ngOnDestroy = function () {
    };
    SeachprefixPage.prototype.ionViewDidLoad = function () {
    };
    SeachprefixPage.prototype.ionViewDidEnter = function () {
        this.tempcountry = this.countyries;
    };
    SeachprefixPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    SeachprefixPage.prototype.countryData = function (item) {
        this.viewCtrl.dismiss(item);
    };
    SeachprefixPage.prototype.getItems = function (ev) {
        var seachitem = ev.target.value;
        if (!seachitem || !seachitem.trim()) {
            this.countyries = this.tempcountry;
            return;
        }
        if (parseInt(seachitem)) {
            this.countyries = this.getquery({
                prefix: seachitem
            });
        }
        else {
            this.countyries = this.getquery({
                country: seachitem
            });
        }
    };
    SeachprefixPage.prototype.getquery = function (params) {
        if (!params) {
            return this.tempcountry;
        }
        return this.tempcountry.filter(function (item) {
            for (var key in params) {
                var field = item[key];
                var field1 = field.toString();
                if (typeof field1 == 'string' && field1.toLowerCase().indexOf(params[key].toLowerCase()) === 0) {
                    return item;
                }
                else if (field1 == params[key]) {
                    return item;
                }
            }
            return null;
        });
    };
    SeachprefixPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-seachprefix',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\seachprefix\seachprefix.html"*/'<!--\n\n  Generated template for the SeachprefixPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n    <ion-navbar>\n\n        <ion-buttons left>\n\n            <!-- <button ion-button icon-only (click)="closeModal()">\n\n        <ion-icon name="md-arrow-round-back"></ion-icon>\n\n      </button> -->\n\n            <button ion-button icon-only class="back-button" (click)="closeModal()">\n\n          <ion-icon name="ios-arrow-back"></ion-icon>\n\n        </button>\n\n        </ion-buttons>\n\n        <ion-title class="title">{{"SEARCHPREFIX" | translate}}</ion-title>\n\n    </ion-navbar>\n\n    <div class="chats-searchbar-layout">\n\n        <ion-searchbar (ionInput)="getItems($event)" placeholder="{{\'SEARCTYPE\'  | translate}}"></ion-searchbar>\n\n        <br>\n\n    </div>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n\n\n    <ion-list>\n\n        <ion-item no-lines *ngFor="let item of countyries;  let i =index" (click)="countryData(item);">\n\n            <ion-avatar item-start>\n\n                <img src="assets/imgs/lang/{{item.code}}.png">\n\n            </ion-avatar>\n\n            <span>(+{{item.prefix}})</span>\n\n            <span>{{ item.country }}</span>\n\n        </ion-item>\n\n    </ion-list>\n\n\n\n\n\n\n\n\n\n</ion-content>'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\seachprefix\seachprefix.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"]])
    ], SeachprefixPage);
    return SeachprefixPage;
}());

//# sourceMappingURL=seachprefix.js.map

/***/ }),

/***/ 457:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(467);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 467:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export TranslateLoaderFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_select_paymethods_select_paymethods__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_myprofile_loyalty_points_loyalty_points__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(517);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_keyboard__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_search_search__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_includes_searchMaster_calendar_popover_calendar_popover__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_search_details_search_details__ = __webpack_require__(626);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_search_results_search_results__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_search_results_filter_popover_filter_popover__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_beach_beach__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_cart_cart__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_status_bar__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_splash_screen__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__angular_platform_browser_animations__ = __webpack_require__(628);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_ion2_calendar__ = __webpack_require__(630);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_ion2_calendar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_20_ion2_calendar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_includes_popover_language_popover_lang__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_includes_searchMaster_searchMaster__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_includes_searchResults_searchResult__ = __webpack_require__(634);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_beachDetails_beachDetails__ = __webpack_require__(635);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_resetPassword_resetPassword__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_rating_rating__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_beachBook_beachBook__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_includes_popover_beachAgreement_beachAgreement__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_myReservation_myReservation__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_myReservation_ads_popover_ads_popover__ = __webpack_require__(636);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_verification_verification__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_beachBookBaldaquin_beachBookBaldaquin__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_beachBookSunbed_beachBookSunbed__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_includes_popover_weatherPopover_popover_weather__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_includes_popoverHelper__ = __webpack_require__(637);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_includes_confirmVerification_confirmVerification__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_newpassword_newPassword__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_providers_tools__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__BootstrapFirstRun__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_seachprefix_seachprefix__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__pages_includes_phoneComponent_phoneComponent__ = __webpack_require__(638);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__pages_filters_sort__ = __webpack_require__(639);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__ionic_storage__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__pages_includes_langComponent_langComponent__ = __webpack_require__(640);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__pages_providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__angular_common_http__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__ionic_native_screen_orientation__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__ionic_native_device__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__pages_directives_directive__ = __webpack_require__(641);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__ngx_translate_http_loader__ = __webpack_require__(642);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__ngx_translate_core__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__pages_providers_translateServices__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__ionic_native_android_permissions__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__pages_providers_beachProvider__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__pages_includes_beach_umbrella_beach_umbrella__ = __webpack_require__(644);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__pages_firstPage_firstPage__ = __webpack_require__(645);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__pages_providers_geolocation__ = __webpack_require__(646);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__ionic_native_geolocation__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__pages_includes_beachView_beachView__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__pages_includes_release_release__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__ionic_native_in_app_browser__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__pages_place_map_place_map__ = __webpack_require__(647);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63__pages_menu_menu__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64__pages_includes_searchDupplication_searchDupplication__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_65__ionic_native_launch_navigator__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_66__pages_includes_searchMaster_list_popover_list_popover__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_67__pages_myprofile_myprofile__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_68__pages_terms_terms__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_69__ionic_native_camera__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_70__ionic_native_crop__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_71__ionic_native_base64__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_72__ionic_native_file__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_73__ionic_native_push__ = __webpack_require__(448);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_74__pages_includes_events_eventsThisWeek__ = __webpack_require__(429);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_75__ionic_native_app_availability__ = __webpack_require__(430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_76__ionic_native_diagnostic__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_77__ionic_native_location_accuracy__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_78__pages_main_guest_page_main_guest_page_component__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_79__pages_includes_searchResultNew_searchResultInclude_component__ = __webpack_require__(648);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_80_ngx_carousel__ = __webpack_require__(649);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_81__pages_providers_agreement_helper__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_82__pages_providers_chat_service__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_83_ionic_tooltips__ = __webpack_require__(656);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_84__pages_chat_chat__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_85__pages_chat_privateChat_privatechat__ = __webpack_require__(431);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_86_ionic_img_viewer__ = __webpack_require__(433);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_87__pages_includes_imageViewer_imageViewer__ = __webpack_require__(447);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
























































































function TranslateLoaderFactory(http) {
    return new __WEBPACK_IMPORTED_MODULE_50__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_includes_searchMaster_calendar_popover_calendar_popover__["a" /* CalendarPopoverPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_search_details_search_details__["a" /* SearchDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_search_results_search_results__["a" /* SearchResultsPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_search_results_filter_popover_filter_popover__["a" /* FilterPopoverPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_beach_beach__["a" /* BeachPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_includes_popover_language_popover_lang__["a" /* PopoverLang */],
                __WEBPACK_IMPORTED_MODULE_16__pages_cart_cart__["a" /* CartPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_includes_searchMaster_searchMaster__["a" /* searchMaster */],
                __WEBPACK_IMPORTED_MODULE_23__pages_includes_searchResults_searchResult__["a" /* searchResult */],
                __WEBPACK_IMPORTED_MODULE_24__pages_beachDetails_beachDetails__["a" /* beachDetails */],
                __WEBPACK_IMPORTED_MODULE_25__pages_resetPassword_resetPassword__["a" /* resetPassword */],
                __WEBPACK_IMPORTED_MODULE_26__pages_rating_rating__["a" /* ratingPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_beachBook_beachBook__["a" /* beachBook */],
                __WEBPACK_IMPORTED_MODULE_28__pages_includes_popover_beachAgreement_beachAgreement__["a" /* beachAgreement */],
                __WEBPACK_IMPORTED_MODULE_29__pages_myReservation_myReservation__["a" /* myReservation */],
                __WEBPACK_IMPORTED_MODULE_30__pages_myReservation_ads_popover_ads_popover__["a" /* AdsPopoverPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_verification_verification__["a" /* verification */],
                __WEBPACK_IMPORTED_MODULE_32__pages_beachBookBaldaquin_beachBookBaldaquin__["a" /* beachBookBaldaquin */],
                __WEBPACK_IMPORTED_MODULE_33__pages_beachBookSunbed_beachBookSunbed__["a" /* beachBookSunbed */],
                __WEBPACK_IMPORTED_MODULE_34__pages_includes_popover_weatherPopover_popover_weather__["a" /* PopoverWeather */],
                __WEBPACK_IMPORTED_MODULE_36__pages_includes_confirmVerification_confirmVerification__["a" /* confirmVerification */],
                __WEBPACK_IMPORTED_MODULE_37__pages_newpassword_newPassword__["a" /* newPassword */],
                __WEBPACK_IMPORTED_MODULE_42__pages_filters_sort__["i" /* ToArrayPipe */],
                __WEBPACK_IMPORTED_MODULE_41__pages_includes_phoneComponent_phoneComponent__["a" /* phoneComponent */],
                __WEBPACK_IMPORTED_MODULE_49__pages_directives_directive__["a" /* SuppressEvents */],
                __WEBPACK_IMPORTED_MODULE_42__pages_filters_sort__["g" /* ProductPipe */],
                __WEBPACK_IMPORTED_MODULE_42__pages_filters_sort__["d" /* KeyPipe */],
                __WEBPACK_IMPORTED_MODULE_42__pages_filters_sort__["j" /* sortPipe */],
                __WEBPACK_IMPORTED_MODULE_44__pages_includes_langComponent_langComponent__["a" /* langComponent */],
                __WEBPACK_IMPORTED_MODULE_42__pages_filters_sort__["b" /* ArraySortPipe */],
                __WEBPACK_IMPORTED_MODULE_59__pages_includes_beachView_beachView__["a" /* BeachView */],
                __WEBPACK_IMPORTED_MODULE_55__pages_includes_beach_umbrella_beach_umbrella__["a" /* beachUmbrella */],
                __WEBPACK_IMPORTED_MODULE_42__pages_filters_sort__["e" /* PhoneSortPipe */],
                __WEBPACK_IMPORTED_MODULE_56__pages_firstPage_firstPage__["a" /* firstPage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_filters_sort__["a" /* ArrayIndexSortPipe */],
                __WEBPACK_IMPORTED_MODULE_42__pages_filters_sort__["h" /* TimeHelperMoment */],
                __WEBPACK_IMPORTED_MODULE_42__pages_filters_sort__["c" /* InterpolationPipe */],
                __WEBPACK_IMPORTED_MODULE_60__pages_includes_release_release__["a" /* ReleasePage */],
                __WEBPACK_IMPORTED_MODULE_62__pages_place_map_place_map__["a" /* PlaceMapPage */],
                __WEBPACK_IMPORTED_MODULE_63__pages_menu_menu__["a" /* MenuPage */],
                __WEBPACK_IMPORTED_MODULE_64__pages_includes_searchDupplication_searchDupplication__["a" /* searchDupplication */],
                __WEBPACK_IMPORTED_MODULE_66__pages_includes_searchMaster_list_popover_list_popover__["a" /* ListPopoverPage */],
                __WEBPACK_IMPORTED_MODULE_40__pages_seachprefix_seachprefix__["a" /* SeachprefixPage */],
                __WEBPACK_IMPORTED_MODULE_67__pages_myprofile_myprofile__["a" /* MyprofilePage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_filters_sort__["f" /* PricePipe */],
                __WEBPACK_IMPORTED_MODULE_1__pages_myprofile_loyalty_points_loyalty_points__["a" /* LoyaltyPointsPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_select_paymethods_select_paymethods__["a" /* SelectPaymethods */],
                __WEBPACK_IMPORTED_MODULE_68__pages_terms_terms__["a" /* TermsPage */],
                __WEBPACK_IMPORTED_MODULE_74__pages_includes_events_eventsThisWeek__["a" /* EventsThisWeek */],
                __WEBPACK_IMPORTED_MODULE_79__pages_includes_searchResultNew_searchResultInclude_component__["a" /* SearchResultIncludeComponent */],
                __WEBPACK_IMPORTED_MODULE_78__pages_main_guest_page_main_guest_page_component__["a" /* MainGuestPage */],
                __WEBPACK_IMPORTED_MODULE_84__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_85__pages_chat_privateChat_privatechat__["a" /* PrivateChatPage */],
                __WEBPACK_IMPORTED_MODULE_87__pages_includes_imageViewer_imageViewer__["a" /* ImageViewerPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_19__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_20_ion2_calendar__["CalendarModule"],
                __WEBPACK_IMPORTED_MODULE_43__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_19__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_80_ngx_carousel__["a" /* NgxCarouselModule */],
                __WEBPACK_IMPORTED_MODULE_51__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_51__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: (TranslateLoaderFactory),
                        deps: [__WEBPACK_IMPORTED_MODULE_46__angular_common_http__["a" /* HttpClient */]]
                    }
                }),
                __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["IonicModule"].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {
                    backButtonText: '',
                    mode: 'ios',
                }, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_46__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_83_ionic_tooltips__["a" /* TooltipsModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_86_ionic_img_viewer__["b" /* IonicImageViewerModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["IonicApp"]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_includes_searchMaster_calendar_popover_calendar_popover__["a" /* CalendarPopoverPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_search_details_search_details__["a" /* SearchDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_search_results_search_results__["a" /* SearchResultsPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_search_results_filter_popover_filter_popover__["a" /* FilterPopoverPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_beach_beach__["a" /* BeachPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_cart_cart__["a" /* CartPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_includes_popover_language_popover_lang__["a" /* PopoverLang */],
                __WEBPACK_IMPORTED_MODULE_22__pages_includes_searchMaster_searchMaster__["a" /* searchMaster */],
                __WEBPACK_IMPORTED_MODULE_23__pages_includes_searchResults_searchResult__["a" /* searchResult */],
                __WEBPACK_IMPORTED_MODULE_24__pages_beachDetails_beachDetails__["a" /* beachDetails */],
                __WEBPACK_IMPORTED_MODULE_25__pages_resetPassword_resetPassword__["a" /* resetPassword */],
                __WEBPACK_IMPORTED_MODULE_26__pages_rating_rating__["a" /* ratingPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_beachBook_beachBook__["a" /* beachBook */],
                __WEBPACK_IMPORTED_MODULE_28__pages_includes_popover_beachAgreement_beachAgreement__["a" /* beachAgreement */],
                __WEBPACK_IMPORTED_MODULE_29__pages_myReservation_myReservation__["a" /* myReservation */],
                __WEBPACK_IMPORTED_MODULE_30__pages_myReservation_ads_popover_ads_popover__["a" /* AdsPopoverPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_verification_verification__["a" /* verification */],
                __WEBPACK_IMPORTED_MODULE_32__pages_beachBookBaldaquin_beachBookBaldaquin__["a" /* beachBookBaldaquin */],
                __WEBPACK_IMPORTED_MODULE_33__pages_beachBookSunbed_beachBookSunbed__["a" /* beachBookSunbed */],
                __WEBPACK_IMPORTED_MODULE_55__pages_includes_beach_umbrella_beach_umbrella__["a" /* beachUmbrella */],
                __WEBPACK_IMPORTED_MODULE_34__pages_includes_popover_weatherPopover_popover_weather__["a" /* PopoverWeather */],
                __WEBPACK_IMPORTED_MODULE_36__pages_includes_confirmVerification_confirmVerification__["a" /* confirmVerification */],
                __WEBPACK_IMPORTED_MODULE_37__pages_newpassword_newPassword__["a" /* newPassword */],
                __WEBPACK_IMPORTED_MODULE_41__pages_includes_phoneComponent_phoneComponent__["a" /* phoneComponent */],
                __WEBPACK_IMPORTED_MODULE_44__pages_includes_langComponent_langComponent__["a" /* langComponent */],
                __WEBPACK_IMPORTED_MODULE_56__pages_firstPage_firstPage__["a" /* firstPage */],
                __WEBPACK_IMPORTED_MODULE_59__pages_includes_beachView_beachView__["a" /* BeachView */],
                __WEBPACK_IMPORTED_MODULE_60__pages_includes_release_release__["a" /* ReleasePage */],
                __WEBPACK_IMPORTED_MODULE_62__pages_place_map_place_map__["a" /* PlaceMapPage */],
                __WEBPACK_IMPORTED_MODULE_63__pages_menu_menu__["a" /* MenuPage */],
                __WEBPACK_IMPORTED_MODULE_64__pages_includes_searchDupplication_searchDupplication__["a" /* searchDupplication */],
                __WEBPACK_IMPORTED_MODULE_66__pages_includes_searchMaster_list_popover_list_popover__["a" /* ListPopoverPage */],
                __WEBPACK_IMPORTED_MODULE_40__pages_seachprefix_seachprefix__["a" /* SeachprefixPage */],
                __WEBPACK_IMPORTED_MODULE_67__pages_myprofile_myprofile__["a" /* MyprofilePage */],
                __WEBPACK_IMPORTED_MODULE_1__pages_myprofile_loyalty_points_loyalty_points__["a" /* LoyaltyPointsPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_select_paymethods_select_paymethods__["a" /* SelectPaymethods */],
                __WEBPACK_IMPORTED_MODULE_68__pages_terms_terms__["a" /* TermsPage */],
                __WEBPACK_IMPORTED_MODULE_79__pages_includes_searchResultNew_searchResultInclude_component__["a" /* SearchResultIncludeComponent */],
                __WEBPACK_IMPORTED_MODULE_74__pages_includes_events_eventsThisWeek__["a" /* EventsThisWeek */],
                __WEBPACK_IMPORTED_MODULE_78__pages_main_guest_page_main_guest_page_component__["a" /* MainGuestPage */],
                __WEBPACK_IMPORTED_MODULE_84__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_85__pages_chat_privateChat_privatechat__["a" /* PrivateChatPage */],
                __WEBPACK_IMPORTED_MODULE_87__pages_includes_imageViewer_imageViewer__["a" /* ImageViewerPage */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_38__pages_providers_tools__["a" /* Tools */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_45__pages_providers_services__["a" /* ApiProvider */],
                __WEBPACK_IMPORTED_MODULE_39__BootstrapFirstRun__["a" /* CustomBootstrap */],
                __WEBPACK_IMPORTED_MODULE_54__pages_providers_beachProvider__["a" /* BeachProvider */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_keyboard__["a" /* Keyboard */],
                __WEBPACK_IMPORTED_MODULE_52__pages_providers_translateServices__["a" /* translateServices */],
                __WEBPACK_IMPORTED_MODULE_81__pages_providers_agreement_helper__["a" /* AgreementHelper */],
                __WEBPACK_IMPORTED_MODULE_53__ionic_native_android_permissions__["a" /* AndroidPermissions */],
                __WEBPACK_IMPORTED_MODULE_58__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_47__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
                __WEBPACK_IMPORTED_MODULE_57__pages_providers_geolocation__["a" /* Geo */],
                __WEBPACK_IMPORTED_MODULE_48__ionic_native_device__["a" /* Device */],
                __WEBPACK_IMPORTED_MODULE_61__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_35__pages_includes_popoverHelper__["a" /* popoverHelper */],
                __WEBPACK_IMPORTED_MODULE_65__ionic_native_launch_navigator__["a" /* LaunchNavigator */],
                __WEBPACK_IMPORTED_MODULE_69__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_70__ionic_native_crop__["a" /* Crop */],
                __WEBPACK_IMPORTED_MODULE_71__ionic_native_base64__["a" /* Base64 */],
                __WEBPACK_IMPORTED_MODULE_72__ionic_native_file__["a" /* File */],
                {
                    provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["ErrorHandler"],
                    useClass: __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["IonicErrorHandler"]
                },
                __WEBPACK_IMPORTED_MODULE_73__ionic_native_push__["a" /* Push */],
                __WEBPACK_IMPORTED_MODULE_75__ionic_native_app_availability__["a" /* AppAvailability */],
                __WEBPACK_IMPORTED_MODULE_76__ionic_native_diagnostic__["a" /* Diagnostic */],
                __WEBPACK_IMPORTED_MODULE_77__ionic_native_location_accuracy__["a" /* LocationAccuracy */],
                __WEBPACK_IMPORTED_MODULE_82__pages_providers_chat_service__["a" /* ChatService */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signup_signup__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__resetPassword_resetPassword__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_BootstrapFirstRun__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__tabs_tabs__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__includes_confirmVerification_confirmVerification__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__verification_verification__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__main_guest_page_main_guest_page_component__ = __webpack_require__(66);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var LoginPage = /** @class */ (function () {
    function LoginPage(popoverCtrl, translateService, app, navCtrl, navParams, configuration, api, events) {
        this.popoverCtrl = popoverCtrl;
        this.translateService = translateService;
        this.app = app;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.configuration = configuration;
        this.api = api;
        this.events = events;
        this.PICTURE_RATIO = 1659 / 1200; // can we get these two variables dynamically somehow? why not - good
        this.shouldTop = document.body.clientHeight - document.body.clientWidth * this.PICTURE_RATIO + 'px';
        this.requestPage = 'LoginPage';
        this.FormData = new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormGroup"]({
            phone: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormControl"]('', [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].minLength(6), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].required]),
            password: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormControl"]('', [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].minLength(6), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].required]),
            prefix: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormControl"]('', [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].minLength(1)]),
            suffix: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormControl"]('', [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].minLength(1)])
        });
        this.non_validate = {
            title: '',
            body: '',
            btnText: ''
        };
    }
    LoginPage_1 = LoginPage;
    LoginPage.prototype.ionViewWillEnter = function () {
        this.configuration.getStorage('UserPhoneInfo').then(function (res) {
        });
        this.configuration.setRequestPage(this.requestPage);
    };
    //TODO: Implement auth
    LoginPage.prototype.doLogin = function () {
        var _this = this;
        var self = this;
        if (this.FormData.valid) {
            this.FormData.value.phone = this.FormData.value.phone.replace(')', '').replace('(', '').replace(/\s/g, '');
            var payload = {
                phone: this.FormData.value.phone,
                password: this.FormData.value.password
            };
            this.api.post('login', payload, { 'Content-Type': 'application/json' }).subscribe(function (r) {
                if (r.blocked) {
                    self.translateService.get("BLOCKED_ACCOUNT_ERROR").subscribe(function (value) {
                        _this.api.AmError('Login', value, [{
                                text: 'Close', handler: function () {
                                    _this.configuration.clearStorage()
                                        .then(function () {
                                        _this.app.getRootNav().setRoot(LoginPage_1);
                                    });
                                }
                            }]);
                    });
                }
                else {
                    if (r.validated) {
                        if (_this.currentLanguage) {
                            r.lang = _this.currentLanguage;
                        }
                        _this.configuration.setStorage('login', r);
                        r.canUse = true;
                        _this.configuration.getStorage('AdditionalRegData').then(function (res) {
                            res.canUse = true;
                            _this.configuration.setStorage('UserPhoneInfo', res).then(function (reg) {
                                _this.configuration.setStorage('AdditionalRegData', r).then(function (a) {
                                    //user can reuse mobile now
                                    if (_this.api.fcmToken) {
                                        setTimeout(function () {
                                            _this.api.get("fcm/" + _this.api.fcmToken, {}, {}, true).subscribe(function (res) {
                                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__tabs_tabs__["a" /* TabsPage */], { reservation: r.reservations });
                                            }, function (error) {
                                                alert(error.message);
                                            });
                                        }, 500);
                                    }
                                    else {
                                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__tabs_tabs__["a" /* TabsPage */], { reservation: r.reservations });
                                    }
                                });
                            });
                        });
                    }
                    else {
                        _this.api.AmError(_this.non_validate.title, _this.non_validate.body, [{
                                text: _this.non_validate.btnText, handler: function () {
                                    var popoverSignup = _this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_8__includes_confirmVerification_confirmVerification__["a" /* confirmVerification */], { page: __WEBPACK_IMPORTED_MODULE_9__verification_verification__["a" /* verification */], next: LoginPage_1, process: { fn: 'SignupVerification', data: _this.FormData.value } });
                                    popoverSignup.present();
                                }
                            }]);
                    }
                }
            }, function (error) {
            });
        }
    };
    LoginPage.prototype.ngOnInit = function () {
        var _this = this;
        this.configuration.getStorage('AdditionalRegData').then(function (a) {
            if (a && a.complete && a.canUse)
                _this.FormData.controls['phone'].setValue(a.complete);
            _this.configuration.translate.getLanguage("NOT_VALIDATED").subscribe(function (r) {
                _this.non_validate.title = r;
            });
            _this.configuration.translate.getLanguage("PLEASE_VALIDATE_YOUR_ACCOUNT").subscribe(function (r) {
                _this.non_validate.body = r;
            });
            _this.configuration.translate.getLanguage("VALIDATE").subscribe(function (r) {
                _this.non_validate.btnText = r;
            });
        });
        this.navCtrl.viewDidEnter.subscribe(function () {
            _this.rand = Math.random();
            _this.configuration.getStorage('UserPhoneInfo').then(function (a) {
                if (a && a.complete && a.complete.length > 6)
                    _this.updatePhone(a);
            });
        });
    };
    LoginPage.prototype.onLanguageChanged = function (lang) {
        var self = this;
        self.currentLanguage = lang;
    };
    LoginPage.prototype.goSignup = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__signup_signup__["a" /* SignupPage */]);
    };
    LoginPage.prototype.resetPassword = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__resetPassword_resetPassword__["a" /* resetPassword */]);
    };
    LoginPage.prototype.updatePhone = function (event) {
        var _this = this;
        if (event && event.complete) {
            if (event.complete.length > 4) {
                this.FormData.controls['phone'].setValue(event.complete);
                this.FormData.controls['prefix'].setValue(event.prefix);
                this.FormData.controls['suffix'].setValue(event.suffix);
                this.configuration.setStorage('AdditionalRegData', event).then(function (a) {
                    _this.toggleLanguage = Math.random();
                }, function (error) {
                });
            }
        }
    };
    LoginPage.prototype.ngDestroy = function () {
        this.navCtrl.viewDidEnter.unsubscribe();
    };
    LoginPage.prototype.goBack = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__main_guest_page_main_guest_page_component__["a" /* MainGuestPage */], {
            animation: true, direction: 'back'
        });
    };
    LoginPage = LoginPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-login',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\login\login.html"*/'<ion-content [style.background-position]="\'0 \' + shouldTop">\n\n    <button ion-button icon-only class="back-button" (click)="goBack()">\n      <ion-icon name="ios-arrow-back"></ion-icon>\n    </button>\n    <langComponent [refresh]="toggleLanguage" [page]="\'login\'" (pushLang)="onLanguageChanged($event)"></langComponent>\n\n    <h1 text-center margined><span>{{ "SMART_BEACH" | translate }}</span></h1>\n    <div margined>\n        <form [formGroup]="FormData" (submit)="doLogin()">\n            <!-- <ion-input type="hidden" placeholder="+(40)722 222 222" formControlName="phone" required></ion-input> -->\n\n            <phoneComponent (CompletedSelect)="updatePhone($event)" [toggleData]="rand"></phoneComponent>\n\n            <div class="passwordHolder">\n                <ion-item>\n                    <ion-label floating>{{ "PASSWORD" | translate }}</ion-label>\n                    <ion-input autocomplete="new-password" name="password" *ngIf="!EyeShown" formControlName="password" type="password" required></ion-input>\n                    <ion-input autocomplete="new-password" name="password2" *ngIf="EyeShown" type="text" formControlName="password" required></ion-input>\n                </ion-item>\n                <button icon-only ion-button type="button" clear class="passwordEye" (click)="EyeShown = !EyeShown">\n          <ion-icon name="ios-eye"></ion-icon>\n        </button>\n            </div>\n            <div class="should-hide" margin-top text-right (click)="resetPassword()">\n                <a>{{ "FORGOT_PASSWORD" | translate }}</a>\n            </div>\n            <button ion-button type="submit" round full pink-gradient class="login-button" [disabled]="!FormData.valid">\n              {{ "SIGN_IN" | translate }}\n            </button>\n        </form>\n    </div>\n\n    <!-- <div class="bottom-block  should-hide" (click)="goSignup()">\n    <a>{{ \'NEW_ON_SMART_BEACH\' | translate }}</a> <span class="a-brother">{{ \'REGISTER\' | translate }}</span>\n  </div> -->\n</ion-content>'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["PopoverController"], __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["App"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_5__app_BootstrapFirstRun__["a" /* CustomBootstrap */], __WEBPACK_IMPORTED_MODULE_6__providers_services__["a" /* ApiProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"]])
    ], LoginPage);
    return LoginPage;
    var LoginPage_1;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BeachPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__beachBook_beachBook__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__beachBookBaldaquin_beachBookBaldaquin__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__beachBookSunbed_beachBookSunbed__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__includes_popover_weatherPopover_popover_weather__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__includes_searchMaster_calendar_popover_calendar_popover__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_BootstrapFirstRun__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__beach_gridHelper__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__menu_menu__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__environment_environment__ = __webpack_require__(153);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var BeachPage = /** @class */ (function () {
    function BeachPage(dp, platform, events, navCtrl, navParams, popoverCtrl, api, configuration, helper, ngZone, modal) {
        var _this = this;
        this.dp = dp;
        this.platform = platform;
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.api = api;
        this.configuration = configuration;
        this.helper = helper;
        this.ngZone = ngZone;
        this.modal = modal;
        this.imgPath = __WEBPACK_IMPORTED_MODULE_13__environment_environment__["a" /* environment */].base + "uploads/";
        this.beachSection = 'overview';
        this.mention = '';
        this.index = 0;
        this.loaded = 0;
        this.oldItem = 0;
        this.title = '';
        this.coordFactor = 0;
        this.selectedToppings = [];
        this.menu = [];
        this.pollingInterval = 5000;
        this.change = false;
        this.isPulling = false;
        this.isMenuDetails = { status: false, data: [] };
        this.ProceedPages = {
            baldaquin: __WEBPACK_IMPORTED_MODULE_4__beachBookBaldaquin_beachBookBaldaquin__["a" /* beachBookBaldaquin */],
            umbrella: __WEBPACK_IMPORTED_MODULE_3__beachBook_beachBook__["a" /* beachBook */],
            sunbed: __WEBPACK_IMPORTED_MODULE_5__beachBookSunbed_beachBookSunbed__["a" /* beachBookSunbed */]
        };
        this.requestPage = 'BeachPage';
        this.SearchObj = {};
        this.quantity = 1;
        this.timeoutInstance = [];
        this.elementSize = '';
        this.customer = {};
        // Grid variables
        this.unit = 'px';
        this.mStatusH = 3;
        this.seatWidth = 71;
        this.seatHeight = 50;
        this.ratio = 0;
        this.isFinishZoom = false;
        this.isZooming = false;
        this.sWidth = 0;
        this.sHeight = 0;
        this.padding = 5;
        this.full_info = {};
        this.beach_settings = [];
        this.clearCache = "?s=gridImage" + localStorage.getItem('grid_image_cache');
        this.timeInstance = false;
        this.pinching = false;
        this.originalScale = 1;
        this.scale = 1;
        this.maxScale = 1;
        this.platform.ready().then(function () {
            _this.sWidth = _this.platform.width();
            _this.sHeight = _this.platform.height();
        });
        this.full_info = this.navParams.get('data');
        this.beach_settings = JSON.parse(localStorage.getItem('beachsettings') || '[]');
    }
    BeachPage.prototype.ngOnInit = function () {
        var _this = this;
        this.clearCache = "?s=gridImage" + localStorage.getItem('grid_image_cache');
        if (!this.loaded)
            this.load();
        this.configuration.getStorage('login').then(function (data) {
            if (data && data.id) {
                _this.customer = data;
            }
        }, function (error) { });
    };
    BeachPage.prototype.showProducts = function () {
        var menu_popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_12__menu_menu__["a" /* MenuPage */], { popover: true, beach_id: this.beach_id, showImgFullscreen: true }, { cssClass: 'menuPage' });
        menu_popover.present();
    };
    BeachPage.prototype.load = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.sub1$ = _this.platform.pause.subscribe(function () {
                if (_this.navCtrl.getActive().name == 'BeachPage') {
                    _this.configuration.ClearTimeout();
                }
            }, function (error) { });
            _this.sub2$ = _this.platform.resume.subscribe(function () {
                if (_this.navCtrl.getActive().name == 'BeachPage') {
                    // alert("Beach resume1");
                    // if(this.configuration.canRequestPool(this.requestPage))
                    // {
                    // alert("Beach resume2");
                    _this.GridPool();
                    // }
                }
            }, function (error) { });
        }, function (error) { });
        this.context = this.navParams.get('context');
        this.loaded += 1;
        this.grid = [];
        this.gridRefreshed();
        this.gridSettings = {};
        this.SearchObj = this.navParams.get('SearchObj');
        this.menu = [];
        this.beachsettings = [];
        this.title = this.navParams.get('title2');
        if (this.navParams.data.startD) {
            this.currentDate = this.getDateFormat(new Date(this.navParams.data.startD));
            this.beachSection = 'menu';
        }
        else {
            this.currentDate = this.getDateFormat(new Date());
        }
        if (this.navParams.data.id && !this.navParams.data.data) {
            this.beach_id = this.navParams.data.id;
            this.getPageInfo(true);
        }
        else if (this.navParams.data.id && this.navParams.data.data) {
            this.beach_id = this.navParams.data.id;
            this.getPageInfo(false);
        }
        this.beachSettings();
        this.platform.registerBackButtonAction(function (event) {
            _this.backButtonsHelper();
        });
        this.setBackButtonAction();
        setTimeout(function () {
            _this.loaded = 0;
        }, 1000);
    };
    BeachPage.prototype.backButtonsHelper = function () {
        var _this = this;
        if (this.isMenuDetails.status == true) {
            setTimeout(function () {
                _this.isMenuDetails.status = false;
                _this.loaded = 0;
            }, 500);
            return;
        }
        if (this.beachSection == 'menu') {
            this.beachSection = 'overview';
            return;
        }
        this.navCtrl.pop();
    };
    BeachPage.prototype.ionViewWillEnter = function () {
        if (!this.loaded) {
            this.load();
        }
        this.configuration.setRequestPage(this.requestPage);
    };
    BeachPage.prototype.setBackButtonAction = function () {
        var _this = this;
        this.navBar.backButtonClick = function () {
            _this.backButtonsHelper();
        };
    };
    BeachPage.prototype.add = function (a) {
        var data = JSON.parse(JSON.stringify(a));
        if (this.quantity > 0) {
            data.quantity = this.quantity;
            data.beach_id = this.beach_id;
            data.mention = this.mention;
            data.toppings = this.selectedToppings;
            this.events.publish('cart:received', data);
            this.clean(false);
        }
    };
    BeachPage.prototype.counter = function (val) {
        if ((val < 0 && this.quantity > 0) || val > 0 && this.quantity < 19)
            this.quantity += val;
    };
    BeachPage.prototype.beachSettings = function () {
        for (var i in this.beach_settings) {
            if (this.beach_settings.hasOwnProperty(i)) {
                if (this.beach_settings[i] && this.beach_settings[i].beach_id == this.beach_id) {
                    this.beachsettings = this.beach_settings[i];
                    break;
                }
            }
        }
    };
    BeachPage.prototype.getStyle = function (item, type) {
        var size = this.helper.gridStyle;
        if (size && size[type]) {
            size = size[type];
            size.top = "" + (this.helper.getFactor(item.coords.y, 'y') + 'px');
            size.left = "" + (this.helper.getFactor(item.coords.x, 'x') + 'px');
            return size;
        }
    };
    BeachPage.prototype.gotoSelection = function (item) {
        this.isMenuDetails.data = item;
        this.clean(true);
    };
    BeachPage.prototype.clean = function (status) {
        this.quantity = 1;
        this.mention = '';
        this.selectedToppings = [];
        this.isMenuDetails.status = status;
    };
    BeachPage.prototype.dualString = function (data) {
        return data.length < 2 ? 0 + data : data;
    };
    BeachPage.prototype.getDateFormat = function (date) {
        return date.getFullYear() + '-' + this.dualString((date.getMonth() + 1).toString()) + '-' + this.dualString(date.getDate().toString());
    };
    BeachPage.prototype.toggleItems = function (item) {
        item.itemsShown = !item.itemsShown;
        this.menu.forEach(function (element) {
            if (element != item)
                element.itemsShown = false;
        });
    };
    BeachPage.prototype.Proceed = function (type, data, index, location) {
        if (this.pinching)
            return;
        this.sub1$.unsubscribe();
        this.sub2$.unsubscribe();
        index = typeof index === 'number' ? JSON.stringify(index) : index;
        if (this.isFinishZoom === true || true) {
            if (this.ProceedPages && this.ProceedPages[type]) {
                data.type = !data.type ? type : data.type;
                var ElementPool = {
                    beach_ids: [this.beach_id],
                    customer_id: this.customer.id,
                    seat_type: type,
                    seat_zone: [location],
                    seat_position: data.coords,
                    start_date: this.SearchObj && this.SearchObj.start_date ? this.SearchObj.start_date : new Date(this.currentDate).getTime(),
                    end_date: this.SearchObj && this.SearchObj.end_date ? this.SearchObj.end_date : new Date(this.currentDate).getTime(),
                    refresh: true
                };
                var full_info = undefined;
                if (this.full_info != null) {
                    full_info = this.full_info.front_sunbed_price;
                }
                this.beachsettings.front_sunbed_price = full_info;
                if (this.change) {
                    data.status_icon = this.MakeMatch(data.customer, data.status_icon);
                }
                // ADD restriction here
                if (true) {
                    this.navCtrl.push(this.ProceedPages[type], { data: data, settings: this.beachsettings, gridSettings: this.gridSettings, title: this.title, index: index, location: location, search: this.SearchObj, pool: ElementPool, change: this.change, reservation: this.navParams.data.reservation });
                }
                /* else if (data && !data.status_icon) {
                     this.navCtrl.push(this.ProceedPages[type], { data: data, settings: this.beachsettings, gridSettings: this.gridSettings, title: this.title, index: index, location: location, search: this.SearchObj, pool: ElementPool, change: this.change, reservation: this.navParams.data.reservation });
                 } else {
                    
                 }*/
            }
        }
    };
    BeachPage.prototype.showWaterMenu = function ($event) {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_6__includes_popover_weatherPopover_popover_weather__["a" /* PopoverWeather */], { popover: true, beach_ids: this.beach_id, settings: this.beachsettings, title: this.title }, { cssClass: 'weather-popover' });
        popover.present({
            ev: $event
        }).then(function () {
        });
        popover.onDidDismiss(function (e) {
        });
        console.log("weather", $event);
    };
    BeachPage.prototype.presentCalendar = function () {
        var _this = this;
        var calendarInst = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_7__includes_searchMaster_calendar_popover_calendar_popover__["a" /* CalendarPopoverPage */], { options: { pickMode: 'single' } });
        calendarInst.present();
        calendarInst.onDidDismiss(function (data) {
            if (data) {
                _this.currentDate = _this.getDateFormat(new Date(data.format()));
            }
        });
    };
    BeachPage.prototype.getBeachSearch = function (removeLoader) {
        var _this = this;
        if (this.beach_id) {
            /* this.configuration.getStorage('beach').then((a:any)=> {
               if (a && a[this.beach_id] && a.time && moment(moment.now()).diff(a.time, 'minutes') < 10) {
                 this.grid = a[this.beach_id + this.currentDate]
                 this.startZoom()
                 return;
               }  })*/
            //  let searchParams = JSON.parse(JSON.stringify(this.SearchObj));
            //  searchParams.search_date = this.getLocalDateTime(searchParams.search_date);
            //  searchParams.start_date = this.getLocalDateTime(searchParams.start_date);
            //  searchParams.end_date = this.getLocalDateTime(searchParams.end_date);
            this.api.get('grid/' + this.beach_id, { date: this.currentDate }, { 'Content-Type': 'application/json' }, true, true).subscribe(function (r) {
                if (r && r.setting) {
                    _this.helper.gridHeight = r.setting.height;
                    _this.helper.gridWidth = r.setting.width;
                    _this.helper.sizeLogic(r.setting.height, r.setting.width);
                    if (!_this.isFinishZoom && !_this.isZooming) {
                        _this.unit = 'px';
                        _this.ratio = _this.sWidth / r.setting.width;
                        _this.maxScale = (80 / _this.seatWidth) / _this.ratio;
                        _this.originalScale = 1;
                    }
                }
                /*  if(r && r.grid){
                    this.helper.gridWidth=Math.max(Math.max(r.grid.front[0]?r.grid.front[r.grid.front.length-1].coords.x:0,r.grid.middle[0]?r.grid.middle[r.grid.middle.length-1].coords.x:0),r.grid.back[0]?r.grid.back[r.grid.back.length-1].coords.x:0);
                    this.helper.gridHeight=Math.max(Math.max(r.grid.front[0]?r.grid.front[r.grid.front.length-1].coords.y:0,r.grid.middle[0]?r.grid.middle[r.grid.middle.length-1].coords.y:0),r.grid.back[0]?r.grid.back[r.grid.back.length-1].coords.y:0);
                    this.grid = r.grid;

                  }*/
                if (r && r.grid) {
                    var oldGrid = JSON.stringify(_this.grid);
                    var newGrid = JSON.stringify(r.grid);
                    if (oldGrid !== newGrid) {
                        _this.grid = r.grid;
                        _this.gridRefreshed();
                    }
                }
                if (r && r.setting) {
                    var oldSettings = JSON.stringify(_this.gridSettings);
                    var newSettings = JSON.stringify(r.setting);
                    if (oldSettings !== newSettings) {
                        _this.gridSettings = r.setting;
                    }
                }
                //  if(!this.isPulling)
                var timeout = setTimeout(function () {
                    _this.isPulling = true;
                    //   if(this.helper.isFinishAuth===true) {
                    _this.getBeachSearch();
                    //  }
                }, _this.pollingInterval);
                _this.configuration.setTimeout(timeout);
                //  this.configuration.setStorage('beach', {[this.beach_id + this.currentDate]: r, time: moment.now()});
            }, function (error) {
            });
        }
    };
    BeachPage.prototype.BeachSegmentChanged = function () {
        if (this.beachSection == 'menu') {
            this.getMenu();
            this.configuration.ClearTimeout();
        }
        else {
            this.zooming();
            this.GridPool();
        }
    };
    BeachPage.prototype.GridPool = function () {
        if (this.context === 'search') {
            this.searchPool();
        }
        else {
            this.getBeachSearch();
        }
    };
    BeachPage.prototype.getBeachUmbrellaSetting = function () {
        var beach_id = this.navParams.data.id;
        var beach_settings = JSON.parse(localStorage.beachsettings);
        var beach_setting = beach_settings.filter(function (setting) {
            return beach_id == setting.beach_id;
        })[0];
        var umbrellaSetting = beach_setting['umbrella'];
        if (!umbrellaSetting) {
        }
        return umbrellaSetting;
    };
    BeachPage.prototype.getStatusClass = function (li) {
        var type = li.type, cls = type.substr(0, 1), getStatus = function (list) {
            var no = 1;
            for (var i = 0; i < list.length; i++) {
                if (list[i] == 'booked' || list[i] == 'pending' || list[i] == 'occupied') {
                    no = 2;
                    break;
                }
            }
            return '_' + no;
        };
        if (type == 'static' || !li.status) {
            return 's_0';
        }
        var keys = Object.keys(li.status);
        for (var i = 0; i < keys.length; i++) {
            var side = keys[i];
            cls += getStatus(li.status[side]);
        }
        try {
            if (type == 'umbrella') {
                var umbrella = this.getBeachUmbrellaSetting();
                var one = umbrella['person-num']['one']['occupy-all-seats'] || false;
                var single_sides = ['u_1_2', 'u_2_1'];
                var full_sides = 'u_2_2';
                if (one && single_sides.indexOf(cls) > -1) {
                    cls = full_sides;
                }
            }
        }
        catch (e) {
        }
        return cls;
    };
    BeachPage.prototype.gridRefreshed = function () {
        var _this = this;
        var fullClassList = ['u_2_2', 'u_2', 'b_2'];
        Object.keys(this.grid).forEach(function (side) {
            var list = _this.grid[side];
            list.map(function (li) {
                li.img = _this.getPosImg(li);
                li.style = _this.getItemStyle(li);
                var cls = _this.getStatusClass(li);
                li.status_class = cls;
                li.isFull = (fullClassList.indexOf(cls) > -1) ? true : false;
            });
        });
        this.getFullWidth();
    };
    BeachPage.prototype.getLocalDateTime = function (date) {
        var dateObj = new Date(date);
        var hoursWithTimezone = dateObj.getHours() + ((-1) * (dateObj.getTimezoneOffset() / 60));
        return new Date(new Date(date).setHours(hoursWithTimezone)).getTime();
    };
    BeachPage.prototype.searchPool = function () {
        return false;
        /*

        let searchObject = {

            beach_ids: [this.beach_id],
            start_date: this.SearchObj.start_date,
            end_date: this.SearchObj.end_date,
            // latitude:this.SearchObj.latitude,
            // longitude:this.SearchObj.longitude,
            seat_type: this.SearchObj.seat_type,
            seat_zone: this.SearchObj.seat_zone,
            person_num: this.SearchObj.person_num,
            customer_id: this.SearchObj.customer_id,
            refresh: this.SearchObj.refresh,
            timezone: this.SearchObj.timezone
        };

        // this.SearchObj.beach_ids = [this.beach_id];
        if (this.SearchObj && this.SearchObj.customer_id) {
            this.SearchObj.refresh = true;
            searchObject.refresh = true;

            let searchParams = JSON.parse(JSON.stringify(searchObject));
            searchParams.start_date = this.getLocalDateTime(searchParams.start_date);
            searchParams.end_date = this.getLocalDateTime(searchParams.end_date);

            this.api.post('search', searchParams, {}, true).subscribe(r => {

                if (r && r.setting) {
                    this.helper.gridHeight = r.setting.height;
                    this.helper.gridWidth = r.setting.width;
                    this.helper.sizeLogic(r.setting.height, r.setting.width);
                }
                
                if (r && r.grid)
                    this.grid = r.grid;
                this.gridRefreshed();
                if (!this.isFinishZoom && !this.isZooming) {
                    this.originalScale = 1;
                    this.scale = 1;
                    this.zooming();
                }

                let timeout = setTimeout(() => {
                    this.isPulling = true;
                    //   if(this.helper.isFinishAuth===true) {
                    //Comment this line to stop pooling
                    // this.GridPool();
                    //  }
                }, this.pollingInterval);
                this.configuration.setTimeout(timeout);

            }, error => {
                console.error('grid pool error');
            });
        } */
    };
    BeachPage.prototype.getBeach = function (removeLoader) {
        var _this = this;
        if (this.beach_id) {
            var items = undefined;
            if (this.navParams.data.data !== null) {
                items = this.navParams.data.data.items;
            }
            /* this.configuration.getStorage('beach').then((a:any)=> {
               if (a && a[this.beach_id] && a.time && moment(moment.now()).diff(a.time, 'minutes') < 10) {
                 this.grid = a[this.beach_id]
                 this.startZoom();
                 return;
               }        })*/
            var searchObject = {
                beach_ids: [this.beach_id],
                start_date: this.SearchObj.start_date,
                end_date: this.SearchObj.end_date,
                // latitude:this.SearchObj.latitude,
                // longitude:this.SearchObj.longitude,
                seat_type: this.SearchObj.seat_type,
                seat_zone: this.SearchObj.seat_zone,
                person_num: this.SearchObj.person_num,
                customer_id: this.SearchObj.customer_id,
                refresh: this.SearchObj.refresh,
                timezone: this.SearchObj.timezone
            };
            var searchParams = JSON.parse(JSON.stringify(searchObject));
            searchParams.start_date_formatted = this.dp.transform(new Date(searchParams.start_date), "yyyy-MM-dd");
            searchParams.end_date_formatted = this.dp.transform(new Date(searchParams.end_date), "yyyy-MM-dd");
            searchParams.start_date = this.getLocalDateTime(searchParams.start_date);
            searchParams.end_date = this.getLocalDateTime(searchParams.end_date);
            searchParams.view_type = 'grid';
            // this.api.post('grid/' + this.beach_id + '/custom', { items: items }, { 'Content-Type': 'application/json' }, removeLoader).subscribe(r => {
            this.api.post('search', searchParams, {}, true).subscribe(function (r) {
                r = r[0];
                //  r.grid = mergeGrids(r.grid, r.grid2);
                if (r && r.setting) {
                    _this.helper.gridHeight = r.setting.height;
                    _this.helper.gridWidth = r.setting.width;
                    _this.helper.sizeLogic(r.setting.height, r.setting.width);
                }
                // ------------------------ Grid Ratio ---------------------------
                if (!_this.isPulling && !_this.isFinishZoom && !_this.isZooming) {
                    _this.unit = 'px';
                    _this.ratio = _this.sWidth / r.setting.width;
                    _this.maxScale = (80 / _this.seatWidth) / _this.ratio;
                    _this.originalScale = 1;
                    _this.scale = 1;
                    // this.unit = 'vh';
                    // let vH = this.constVal * this.sHeight / 100;
                    // let rr = vH / 30;
                    // this.ratio = this.sHeight / (r.setting.height * rr);
                    // }
                }
                // -------------------------- End -------------------------------
                /* this.helper.gridWidth=Math.max(Math.max(r.grid.front[0]?r.grid.front[r.grid.front.length-1].coords.x:0,r.grid.middle[0]?r.grid.middle[r.grid.middle.length-1].coords.x:0),r.grid.back[0]?r.grid.back[r.grid.back.length-1].coords.x:0);
                 this.helper.gridHeight=Math.max(Math.max(r.grid.front[0]?r.grid.front[r.grid.front.length-1].coords.y:0,r.grid.middle[0]?r.grid.middle[r.grid.middle.length-1].coords.y:0),r.grid.back[0]?r.grid.back[r.grid.back.length-1].coords.y:0);
                 */
                if (r && r.grid) {
                    _this.grid = r.grid;
                    _this.gridRefreshed();
                    _this.GridPool();
                    _this.zooming();
                }
                // this.configuration.setStorage('beach', {[this.beach_id]: r, time: moment.now()});
            }, function (error) {
            });
        }
    };
    BeachPage.prototype.getMenu = function () {
        var _this = this;
        if (this.beach_id) {
            this.configuration.getStorage('menu').then(function (a) {
                if (a && a[_this.beach_id] && a.time && __WEBPACK_IMPORTED_MODULE_10_moment__(__WEBPACK_IMPORTED_MODULE_10_moment__["now"]()).diff(a.time, 'minutes') < 10) {
                    _this.menu = a[_this.beach_id + _this.currentDate];
                    return;
                }
                _this.api.get('menu/' + _this.beach_id, {}, { 'Content-Type': 'application/json' }, false, true).subscribe(function (r) {
                    _this.menu = r;
                    _this.configuration.setStorage('menu', (_a = {}, _a[_this.beach_id + _this.currentDate] = r, _a.time = __WEBPACK_IMPORTED_MODULE_10_moment__["now"](), _a));
                    var _a;
                }, function (error) {
                });
            });
        }
    };
    BeachPage.prototype.getPageInfo = function (isQuickSearch) {
        if (this.isFinishZoom) {
            this.isFinishZoom = false;
        }
        if (this.navParams.data.change) {
            this.change = this.navParams.data.change;
            this.searchPool();
            return;
        }
        // if (isQuickSearch) {
        //     this.api.post('grid/' + this.beach_id + '/custom', { items: this.navParams.data.data.items }, { 'Content-Type': 'application/json' }, true).subscribe(r => {
        //         if (r && r.setting) {
        //             this.helper.gridHeight = r.setting.height;
        //             this.helper.gridWidth = r.setting.width;
        //             this.helper.sizeLogic(r.setting.height, r.setting.width);
        //         }
        //         // ------------------------ Grid Ratio ---------------------------
        //         if (!this.isPulling && !this.isFinishZoom && !this.isZooming) {
        //             this.unit = 'px';
        //             this.ratio = this.sWidth / r.setting.width;
        //             this.maxScale = (80 / this.seatWidth) / this.ratio;
        //             this.originalScale = 1;
        //             this.scale = 1;
        //         }
        //         if (r && r.grid) {
        //             this.grid = r.grid;
        //             this.GridPool();
        //         }
        //     }, error => {
        //     });
        //     if (!this.navParams.data.startD) {
        //         this.BeachSegmentChanged();
        //     }
        // } else {
        this.getBeach();
        //}
    };
    BeachPage.prototype.startZoom = function () {
        this.helper.isFinishAuth = false;
        this.helper.resetZoom();
        setTimeout(function () {
            // this.helper.initializeZoom(this.zoom.nativeElement, this.content, this.header.nativeElement, this.elements.nativeElement, this.wave.nativeElement);
            // this.helper.autoZoom();
        }, 10000);
    };
    BeachPage.prototype.IsItMyBooking = function (statusIcon, customer) {
        var match = '';
        if (customer && customer.customer)
            match = this.MakeMatch(customer.customer, statusIcon);
        else
            match = statusIcon;
        return match;
    };
    BeachPage.prototype.ionViewWillLeave = function () {
        if (this.timeInstance) {
            clearInterval(this.timeInstance);
            this.isZooming = false;
        }
    };
    BeachPage.prototype.ionViewWillUnload = function () {
        this.sub1$.unsubscribe();
        this.sub2$.unsubscribe();
        this.configuration.ClearTimeout();
        try {
            this.helper.ZoomData.gesture.destroy();
        }
        catch (e) {
            console.error('trying to destroy un-initialized gesture');
        }
        this.events.unsubscribe('nav:back');
    };
    BeachPage.prototype.getIndex = function (childIndex, location) {
        if (location == 'front') {
            return ((this.grid.front ? this.grid.front.length : 0)) + (childIndex + 1);
        }
        else if (location == 'middle') {
            return (((this.grid.middle && this.grid.middle ? this.grid.middle.length : 0)) + (childIndex + 1)) + ((this.grid.front.length) * (this.grid.front.length));
        }
        else if (location == 'back') {
            return (((this.grid.back && this.grid.back ? this.grid.back.length : 0)) + (childIndex + 1)) + ((this.grid.front.length) * (this.grid.front.length)) + ((this.grid.middle.length) * (this.grid.middle.length));
        }
    };
    BeachPage.prototype.selectTopping = function (toppings, index) {
        if (this.selectedToppings[index]) {
            delete this.selectedToppings[index];
            this.isMenuDetails.data.price = (this.isMenuDetails.data.price | 0) - (toppings.price | 0);
        }
        else {
            this.selectedToppings[index] = toppings;
            this.isMenuDetails.data.price = (this.isMenuDetails.data.price | 0) + (toppings.price | 0);
        }
    };
    BeachPage.prototype.MakeMatch = function (customer, statusicon) {
        for (var i in customer) {
            if (customer && customer[i] && customer[i].id == this.customer.id) {
                return customer[i].status_icon;
            }
        }
        return statusicon;
    };
    BeachPage.prototype.isFreeSeats = function (item) {
        return false;
    };
    /// ----- Grid Property -----------
    BeachPage.prototype.getPosImg = function (item) {
        var img = this.imgPath + this.beach_id + '/elements/';
        if (item.type == 'static') {
            img = item.image;
        }
        else {
            img += item.image;
        }
        item.img = img;
        return img;
    };
    BeachPage.prototype.getItemStyle = function (item) {
        var coord = item.coords;
        var width = item.info.mapElement.size.width, height = item.info.mapElement.size.height;
        var style = {
            'left': "" + coord.x * this.ratio + this.unit,
            'top': "" + coord.y * this.ratio + this.unit,
            'width': "" + width * this.ratio + this.unit,
            'height': "" + height * this.ratio + this.unit
        };
        item.style = style;
        return style;
    };
    BeachPage.prototype.getPosStyle = function (coord) {
        var style = {
            'left': "" + coord.x * this.ratio + this.unit,
            'top': "" + coord.y * this.ratio + this.unit,
            'width': "" + this.seatWidth * this.ratio + this.unit,
            'height': "" + this.seatHeight * this.ratio + this.unit
        };
        return style;
    };
    BeachPage.prototype.getMax = function () {
        var maxX = 0, maxY = 0;
        var list = [];
        var getNumber = function (size) {
            try {
                var no = size.substr(0, size.length - 2);
                return parseFloat(no);
            }
            catch (e) {
                console.error("Get number funciton Error ", size);
            }
        };
        if (this.grid && this.grid.front) {
            list = list.concat(this.grid.front);
        }
        if (this.grid && this.grid.middle) {
            list = list.concat(this.grid.middle);
        }
        if (this.grid && this.grid.back) {
            list = list.concat(this.grid.back);
        }
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var item = list_1[_i];
            if (item.style) {
                var style = item.style, x = getNumber(style.left), y = getNumber(style.top), w = getNumber(style.width), h = getNumber(style.height);
                maxX = Math.max(maxX, x + w),
                    maxY = Math.max(maxY, y + h);
            }
        }
        return { x: maxX, y: maxY };
    };
    BeachPage.prototype.getFullWidth = function () {
        var max = this.getMax();
        var ratio = this.ratio;
        ratio = 1;
        var style = {
            display: 'block',
            width: (max.x + this.padding) * ratio + "px",
            height: (max.y + this.padding) * ratio + "px"
        };
        this.containerStyle = style;
        return style;
    };
    BeachPage.prototype.getStatusHeight = function (status) {
        var style = {
            'height': "" + this.mStatusH / status.length + this.unit
        };
        return style;
    };
    BeachPage.prototype.zooming = function () {
        var self = this;
        this.isZooming = true;
        var timerInterval = setInterval(function () {
            if (self.ratio > 0) {
                self.zoomAction();
                clearInterval(timerInterval);
            }
        }, 30);
    };
    BeachPage.prototype.zoomAction = function () {
        var _this = this;
        this.timeInstance = setInterval(function () {
            if (_this.isFinishZoom) {
                _this.isZooming = false;
                clearInterval(_this.timeInstance);
                _this.timeInstance = false;
                return;
            }
            _this.scale += 0.05;
            var container = document.getElementById('container');
            container.style.transform = "scale(" + _this.scale * _this.originalScale + ")";
            if (_this.scale >= _this.maxScale / 2) {
                _this.ngZone.run(function () {
                    _this.isFinishZoom = true;
                    _this.originalScale = _this.scale * _this.originalScale;
                    _this.scale = 1;
                    _this.defineZoomAction();
                });
            }
        }, 30);
    };
    BeachPage.prototype.defineZoomAction = function () {
        var _this = this;
        this.gesture = new __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["Gesture"](this.content.getElementRef().nativeElement);
        this.gesture.listen();
        this.gesture.on('pinch', function (event) {
            if (!_this.pinching)
                return;
            if (event.scale === 1) {
                _this.pinchEnd();
            }
            else {
                var scrollView = document.querySelector('#content .scroll-content'), container = document.getElementById('container');
                if (event.scale * _this.originalScale < 1 || event.scale * _this.originalScale > _this.maxScale)
                    return;
                var scrollLeft = scrollView.scrollLeft, scrollTop = scrollView.scrollTop;
                scrollLeft = scrollLeft * event.scale / _this.scale + (event.scale / _this.scale - 1) * scrollView.clientWidth / 2;
                scrollTop = scrollTop * event.scale / _this.scale + (event.scale / _this.scale - 1) * scrollView.clientHeight / 2;
                _this.scale = event.scale;
                container.style.transform = "scale(" + _this.scale * _this.originalScale + ")";
                scrollView.scrollLeft = scrollLeft > 0 ? scrollLeft : 0;
                scrollView.scrollTop = scrollTop > 0 ? scrollTop : 0;
            }
        });
        this.gesture.on('pinchstart', function (event) {
            var scrollView = document.querySelector('#content .scroll-content');
            _this.pinching = true;
        });
        this.gesture.on('pinchend', function () {
            _this.pinchEnd();
        });
    };
    BeachPage.prototype.pinchEnd = function () {
        var _this = this;
        if (!this.pinching || this.scale === 1)
            return;
        setTimeout(function () {
            _this.pinching = false;
        }, 10);
        this.originalScale = this.originalScale * this.scale;
        this.scale = 1;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["Content"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["Content"])
    ], BeachPage.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('elements'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], BeachPage.prototype, "elements", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('header'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], BeachPage.prototype, "header", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["Navbar"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["Navbar"])
    ], BeachPage.prototype, "navBar", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('wave'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], BeachPage.prototype, "wave", void 0);
    BeachPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-beach',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\beach\beach.html"*/'<ng-template #Umbrella let-item>\n\n        <ng-container *ngIf="!(item.type==\'umbrella\' && item.item.sides>1)">\n\n            <img [ngClass]="(item.item.isFull || item.type==\'static\' || item.item.disabled)?\'cursor-disabled \'+item.item.status_class:\'cursor-pointer \'+item.item.status_class"\n\n                [src]="item.img+clearCache" (click)="item.item.isFull || item.item.disabled ||Proceed(item.type,item.item,item.item.number,\'front\')" />\n\n        </ng-container>\n\n        <div *ngIf="item.type==\'umbrella\' && item.item.sides>1">\n\n            <div id="drag-comb" class="draggable-element-div grid-elements {{item.item.status_class}}">\n\n                <div [ngClass]="(item.item.isFull || item.item.disabled)?\'ele-merged-obj cursor-disabled\':\'ele-merged-obj cursor-pointer\'"\n\n                    style="position:relative;"\n\n                    (click)="item.item.isFull || item.item.disabled || Proceed(item.type,item.item,item.item.number,\'front\')">\n\n                    <div class="ele-merged-div float-left position-relative"\n\n                        [ngStyle]="{} || {\'width\':item.info.widthPercentage+\'%\'}">\n\n                        <div class="ele-merged-sub left" [ngStyle]="{\'width\':item.info.pos.widthLeftOuter+\'%\'}">\n\n                            <div class="ele-merged-inner" [ngStyle]="{\'width\':item.info.pos.widthLeftInner+\'%\'}">\n\n                                <img id="drag-comb-left" class="ele-merged-img upside-down left-img" [src]="item.img+clearCache">\n\n                            </div>\n\n                        </div>\n\n                        <div class="ele-merged-sub right" [ngStyle]="{\'width\':item.info.pos.widthRightOuter+\'%\'}">\n\n                            <div class="ele-merged-inner right"\n\n                                [ngStyle]="{\'width\':item.info.pos.widthRightInner+\'%\',\'margin-left\':item.info.pos.marginLeftOffset+\'%\'}">\n\n                                <img id="drag-comb-right" class="ele-merged-img upside-down right-img" [src]="item.img+clearCache">\n\n                            </div>\n\n                        </div>\n\n                    </div>\n\n                </div>\n\n                <div id="drag-comb-div" style="opacity:0;width:100%;height:100%;position:absolute;">&nbsp;</div>\n\n            </div>\n\n        </div>\n\n    \n\n    \n\n    </ng-template>\n\n    <ng-template #ZoneItems let-list>\n\n        <ng-container *ngFor="let item of list">\n\n            <div class="{{(item.disabled)?\'disabled\':\'enabled\'}}" [ngClass]="isFreeSeats(item) ? \'seat free\' : \'seat\'" [ngStyle]="item.style">\n\n                <ng-container\n\n                    *ngTemplateOutlet="Umbrella; context:{$implicit:{item:item, info:item.info.mapElement, img: item.img, type:item.type}}">\n\n                </ng-container>\n\n            </div>\n\n        </ng-container>\n\n    </ng-template>\n\n    <!--ng-container *ngTemplateOutlet="SunBed; context:{$implicit:{side:side, data: item, index: ind}}"></ng-container-->\n\n    \n\n    <ion-header class="has-shadow" #header>\n\n        <ion-navbar>\n\n            <ion-title>{{ title }}</ion-title>\n\n            <ion-buttons end>\n\n                <button ion-button icon-only (click)="showProducts()">\n\n                    <ion-icon name="paper"></ion-icon>\n\n                </button>\n\n            </ion-buttons>\n\n            <ion-buttons end>&nbsp;&nbsp;</ion-buttons>\n\n            <ion-buttons end>\n\n                <button ion-button icon-only (click)="showWaterMenu()">\n\n                    <ion-icon class="fa fa-thermometer-full"></ion-icon>\n\n                </button>\n\n            </ion-buttons>\n\n        </ion-navbar>\n\n    \n\n    </ion-header>\n\n    <ion-content no-bounce id="content">\n\n        <div class="container" id="container" [ngStyle]="containerStyle || getFullWidth()">\n\n            <div class="wave" *ngIf="!navParams.data.startD" #wave></div>\n\n    \n\n            <div class="wave-offset-div">\n\n                &nbsp;\n\n            </div>\n\n            <div class="grid-seat-div">\n\n                <ng-container *ngFor="let zone of [\'front\',\'middle\',\'back\']">\n\n                    <ng-container *ngTemplateOutlet="ZoneItems; context:{$implicit:grid[zone]}">\n\n                    </ng-container>\n\n                </ng-container>\n\n                <!--ng-container *ngFor="let item of grid.front">\n\n                    <div [ngClass]="isFreeSeats(item) ? \'seat free\' : \'seat\'" [ngStyle]="item.style">\n\n                        <ng-container\n\n                            *ngTemplateOutlet="Umbrella; context:{$implicit:{item:item, info:item.info.mapElement, img: item.img, type:item.type}}">\n\n                        </ng-container>\n\n                    </div>\n\n                </ng-container>\n\n                <ng-container *ngFor="let item of grid.middle">\n\n                    <div [ngClass]="isFreeSeats(item) ? \'seat free\' : \'seat\'" [ngStyle]="item.style">\n\n                        <ng-container\n\n                            *ngTemplateOutlet="Umbrella; context:{$implicit:{item:item, info:item.info.mapElement, img: item.img, type:item.type}}">\n\n                        </ng-container>\n\n                    </div>\n\n                </ng-container>\n\n                <ng-container *ngFor="let item of grid.back">\n\n                    <div [ngClass]="isFreeSeats(item) ? \'seat free\' : \'seat\'" [ngStyle]="item.style">\n\n                        <ng-container\n\n                            *ngTemplateOutlet="Umbrella; context:{$implicit:{item:item, info:item.info.mapElement, img: item.img, type:item.type}}">\n\n                        </ng-container>\n\n                    </div>\n\n                </ng-container-->\n\n            </div>\n\n            <div>\n\n                <ion-row class="sunbedLink" (click)="Proceed(\'sunbed\',{},1)"\n\n                    *ngIf="beachsettings.extra_sunbeds>0 && SearchObj && SearchObj.seat_type==\'sunbed\'">\n\n                    <ion-col col-3>\n\n                        <img src="./assets/imgs/beaches/individual_sunbed_without_umbrella.png" />\n\n                    </ion-col>\n\n                    <ion-col col-6>\n\n                        <div class="text">{{ \'SUNBED_WITHOUT_UMBRELLA\' | translate }}</div>\n\n                    </ion-col>\n\n                    <ion-col col-3>\n\n                        <img src="./assets/imgs/beaches/individual_sunbed_without_umbrella.png" />\n\n                    </ion-col>\n\n                </ion-row>\n\n            </div>\n\n    \n\n    \n\n    \n\n        </div>\n\n    \n\n    </ion-content>'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\beach\beach.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_11__beach_gridHelper__["a" /* gridHelper */], __WEBPACK_IMPORTED_MODULE_1__angular_common__["d" /* DatePipe */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common__["d" /* DatePipe */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["Events"], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["PopoverController"], __WEBPACK_IMPORTED_MODULE_8__providers_services__["a" /* ApiProvider */], __WEBPACK_IMPORTED_MODULE_9__app_BootstrapFirstRun__["a" /* CustomBootstrap */], __WEBPACK_IMPORTED_MODULE_11__beach_gridHelper__["a" /* gridHelper */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["ModalController"]])
    ], BeachPage);
    return BeachPage;
}());

//# sourceMappingURL=beach.js.map

/***/ }),

/***/ 515:
/***/ (function(module, exports) {

module.exports = {"login":"loginStore","register":"registerStore","AdditionalRegData":"LocationStore","smsValidation":"ValidationStore","lang":"LanguageStore","country":"CountriesStore","places":"placesStore","deviceInfo":"DeviceInfo","LangApi":"ApiLanguage","Filters":"FilterStore","beach_settings":"beach_settingsStore","weather":"WeatherStore","beach":"BeachStore","menu":"MenuStore","tab":"TabStore","reservation":"reserveStore","UserPhoneInfo":"phoneInfoStore","events":"events"}

/***/ }),

/***/ 516:
/***/ (function(module, exports) {

module.exports = [{"delimiter":"SmartBeach este:","length":4,"origin":"sms"},{"delimiter":"SmartBeach este:","length":4,"origin":"TLNET"},{"delimiter":"SmartBeach este:","length":4,"origin":"SMS"},{"delimiter":"SmartBeach este:","length":4,"origin":"InfoSMS"},{"delimiter":"SmartBeach app:","length":4,"origin":"TLNET"},{"delimiter":"SmartBeach app:","length":4,"origin":"SMS"},{"delimiter":"SmartBeach app:","length":4,"origin":"sms"},{"delimiter":"SmartBeach app:","length":4,"origin":"InfoSMS"}]

/***/ }),

/***/ 517:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__BootstrapFirstRun__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_screen_orientation__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_device__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_android_permissions__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_push__ = __webpack_require__(448);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_diagnostic__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_location_accuracy__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_main_guest_page_main_guest_page_component__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_storage__ = __webpack_require__(55);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
















var MyApp = /** @class */ (function () {
    function MyApp(statusbar, app, device, androidPermission, diagnostic, locationAccuracy, platform, screenOrientation, statusBar, splashScreen, keyboard, startBoostrapping, events, push, api, configuration, storage) {
        var _this = this;
        this.app = app;
        this.androidPermission = androidPermission;
        this.diagnostic = diagnostic;
        this.locationAccuracy = locationAccuracy;
        this.platform = platform;
        this.startBoostrapping = startBoostrapping;
        this.events = events;
        this.push = push;
        this.api = api;
        this.configuration = configuration;
        this.storage = storage;
        this.viewsWithoutBackButton = ['BeachPage'];
        platform.ready().then(function () {
            // keyboard.disableScroll(true);
            var clientHeight = document.body.clientHeight;
            _this.definePermissions(); // Define Android Permissions
            startBoostrapping.setDeviseInfo({ model: device.model, platform: device.platform, version: device.version, manufacturer: device.manufacturer, uuid: device.uuid });
            screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT).then(function () {
            }, function (error) {
            });
            _this.firstScreenRun();
            NodeList.prototype.forEach = Array.prototype.forEach;
            statusBar.styleDefault();
            splashScreen.hide();
            keyboard.onKeyboardShow().subscribe(function () {
                // keyboard.disableScroll(true);
                document.body.classList.add('keyboard-is-open');
                var scroll = document.querySelectorAll('.scroll-content');
                scroll.forEach(function (e) { e.style.height = clientHeight + "px"; });
            });
            keyboard.onKeyboardHide().subscribe(function () {
                // keyboard.disableScroll(true);
                document.body.classList.remove('keyboard-is-open');
                var scroll = document.querySelectorAll('.scroll-content');
                scroll.forEach(function (e) { e.style.height = 'auto'; });
            });
            statusbar.backgroundColorByHexString('#fe5295');
            //back button delegation for beach details
            _this.MyAppEvents();
            platform.pause.subscribe(function () {
                _this.MyAppOnPause();
            });
            if (platform.is('cordova')) {
                _this.push.hasPermission()
                    .then(function (res) {
                    if (res.isEnabled) {
                    }
                    else {
                    }
                });
                // Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
                _this.push.createChannel({
                    id: "testchannel1",
                    description: "My first test channel",
                    // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
                    importance: 3
                }).then(function () { });
                // Delete a channel (Android O and above)
                _this.push.deleteChannel('testchannel1');
                // Return a list of currently configured channels
                _this.push.listChannels();
                // to initialize push notifications 
                var options = {
                    android: {
                        senderID: '494805758050',
                        sound: true,
                        vibrate: true,
                        icon: 'icon'
                    },
                    ios: {
                        alert: true,
                        badge: true,
                        sound: true,
                    }
                };
                var pushObject_1 = _this.push.init(options);
                pushObject_1.on('notification').subscribe(function (notification) {
                    alert('not');
                    var data = notification.additionalData;
                    if (data.topic === 'customer' || data.topic === 'dev_customer') {
                        _this.events.publish('app:reload', notification.additionalData);
                    }
                    else if (data.topic === 'event' || data.topic === 'dev_event') {
                        _this.events.publish('app:event', {});
                    }
                    else {
                        _this.events.publish('app:notification', data);
                    }
                });
                pushObject_1.on('registration').subscribe(function (registration) {
                    _this.api.fcmToken = registration.registrationId; //fcm working for all 3 apps now.
                    console.log('fcm token', _this.api.fcmToken);
                    // dev
                    pushObject_1.subscribe('dev_customer');
                    pushObject_1.subscribe('dev_event');
                    // prod
                    pushObject_1.subscribe('customer');
                    pushObject_1.subscribe('event');
                });
                pushObject_1.on('error').subscribe(function (error) { return console.error('Error with Push plugin', error); });
            }
        });
    }
    MyApp.prototype.definePermissions = function () {
        if (!this.platform.is('cordova'))
            return;
        this.locationPermission();
        this.requestSMSPermission();
    };
    MyApp.prototype.locationPermission = function () {
        var _this = this;
        navigator.geolocation.getCurrentPosition(function (a) {
            if (a && a.coords && a.coords.latitude) {
            }
        }, function (e) {
        }, { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 });
        this.androidPermission.checkPermission(this.androidPermission.PERMISSION.ACCESS_FINE_LOCATION).then(function (a) {
            _this.storage.set('alreadygpsset', 'true');
            _this.enableGPS();
        }, function (error) {
            _this.androidPermission.requestPermission(_this.androidPermission.PERMISSION.ACCESS_FINE_LOCATION).then(function (a) {
                _this.enableGPS();
            }, function (error) {
            });
        });
    };
    MyApp.prototype.enableGPS = function () {
        var _this = this;
        this.locationAccuracy.canRequest()
            .then(function (possible) {
            if (possible) {
                return _this.locationAccuracy.request(_this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
            }
            else {
                return _this.diagnostic.isGpsLocationEnabled()
                    .then(function (enabled) {
                    if (!enabled) {
                        //return this.diagnostic.switchToLocationSettings();
                        _this.androidPermission.checkPermission(_this.androidPermission.PERMISSION.ACCESS_FINE_LOCATION).then(function (a) {
                            _this.enableGPS();
                        }, function (error) {
                        });
                    }
                });
            }
        }).then(function () {
        }).catch(function (error) {
        });
    };
    // locationPermission() {
    //   navigator.geolocation.getCurrentPosition((a) => {
    //   if (a && a.coords && a.coords.latitude) {
    //     this.startBoostrapping.hasLocationAccess = true;
    //   }
    //   }, (e) => {
    //   this.androidPermission.requestPermission(this.androidPermission.PERMISSION.ACCESS_FINE_LOCATION).then((a: any) => {
    //     this.startBoostrapping.hasLocationAccess = a.hasPermissions;
    //     if (a.hasPermissions) {
    //     }
    //   }, error => {
    //     this.startBoostrapping.hasLocationAccess = false;
    //     console.error('permission denial');
    //     console.error(error);
    //   });
    //   }, { enableHighAccuracy: true, maximumAge: 0 })
    // }
    MyApp.prototype.requestSMSPermission = function () {
        var otpConfig = {
            delimiter: ":",
            length: 4,
            origin: ""
        };
    };
    MyApp.prototype.firstScreenRun = function () {
        var _this = this;
        this.startBoostrapping.apiData.Busymessage = 'Updating...';
        this.startBoostrapping.apiData.AmBusy(this.startBoostrapping.apiData.Busymessage);
        this.startBoostrapping.Load().then(function (r) {
            _this.startBoostrapping.apiData.AmBusy(_this.startBoostrapping.apiData.Busymessage);
            _this.startBoostrapping.apiData.Busymessage = 'Please wait...';
            _this.IsDeviceLoggedIn();
        }, function (error) {
            _this.startBoostrapping.apiData.AmBusy(_this.startBoostrapping.apiData.Busymessage);
            _this.startBoostrapping.apiData.Busymessage = 'Please wait...';
            _this.startBoostrapping.apiData.AmError("You're offline", "The content didn't load. Try again?", [{
                    text: 'Close', handler: function () {
                        _this.platform.exitApp();
                    }
                }, {
                    text: 'Retry', handler: function () {
                        _this.firstScreenRun();
                    }
                }]);
        });
    };
    MyApp.prototype.IsDeviceLoggedIn = function () {
        var _this = this;
        this.startBoostrapping.getStorage('login').then(function (a) {
            if (a && a.token) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__["a" /* TabsPage */];
            }
            else {
                _this.startBoostrapping.clearStorage()
                    .then(function () {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_14__pages_main_guest_page_main_guest_page_component__["a" /* MainGuestPage */];
                });
            }
        }, function (error) {
            _this.startBoostrapping.clearStorage()
                .then(function () {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_14__pages_main_guest_page_main_guest_page_component__["a" /* MainGuestPage */];
            });
        });
    };
    ;
    MyApp.prototype.backButtonAction = function () {
        var _this = this;
        this.platform.registerBackButtonAction(function (event) {
            var nav = _this.app.getActiveNavs();
            var navChild = nav && nav.length > 0 && nav[0]._views && nav[0]._views.length > 0 ? nav[0]._views[nav[0]._views.length - 1].component.name : false;
            if (_this.viewsWithoutBackButton.indexOf(navChild) != -1) {
                _this.events.publish('nav:back', navChild);
                alert("app.component.view.back");
                return;
            }
            if (nav[0].canGoBack()) {
                nav[0].pop().then(function () {
                }, function (error) { });
            }
            else {
                _this.startBoostrapping.apiData.AmError('Back', 'Do you wish to exist app?', [{
                        text: 'Agree', handler: function () {
                            _this.platform.exitApp();
                        }
                    }, { text: 'Disagree', role: 'cancel' }]);
            }
        });
    };
    MyApp.prototype.MyAppEvents = function () {
        var _this = this;
        this.app.viewWillEnter.subscribe(function (data) {
            console.warn('stopping loop light');
            _this.startBoostrapping.ClearTimeout();
        });
    };
    MyApp.prototype.MyAppOnPause = function () {
        this.startBoostrapping.ClearTimeout();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Nav"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Nav"])
    ], MyApp.prototype, "nav", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myTabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Tabs"])
    ], MyApp.prototype, "tabRef", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["App"], __WEBPACK_IMPORTED_MODULE_7__ionic_native_device__["a" /* Device */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_android_permissions__["a" /* AndroidPermissions */], __WEBPACK_IMPORTED_MODULE_12__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_13__ionic_native_location_accuracy__["a" /* LocationAccuracy */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_6__ionic_native_screen_orientation__["a" /* ScreenOrientation */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__["a" /* Keyboard */], __WEBPACK_IMPORTED_MODULE_5__BootstrapFirstRun__["a" /* CustomBootstrap */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"], __WEBPACK_IMPORTED_MODULE_10__ionic_native_push__["a" /* Push */],
            __WEBPACK_IMPORTED_MODULE_11__pages_providers_services__["a" /* ApiProvider */], __WEBPACK_IMPORTED_MODULE_5__BootstrapFirstRun__["a" /* CustomBootstrap */], __WEBPACK_IMPORTED_MODULE_15__ionic_storage__["b" /* Storage */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 525:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 294,
	"./af.js": 294,
	"./ar": 295,
	"./ar-dz": 296,
	"./ar-dz.js": 296,
	"./ar-kw": 297,
	"./ar-kw.js": 297,
	"./ar-ly": 298,
	"./ar-ly.js": 298,
	"./ar-ma": 299,
	"./ar-ma.js": 299,
	"./ar-sa": 300,
	"./ar-sa.js": 300,
	"./ar-tn": 301,
	"./ar-tn.js": 301,
	"./ar.js": 295,
	"./az": 302,
	"./az.js": 302,
	"./be": 303,
	"./be.js": 303,
	"./bg": 304,
	"./bg.js": 304,
	"./bm": 305,
	"./bm.js": 305,
	"./bn": 306,
	"./bn.js": 306,
	"./bo": 307,
	"./bo.js": 307,
	"./br": 308,
	"./br.js": 308,
	"./bs": 309,
	"./bs.js": 309,
	"./ca": 310,
	"./ca.js": 310,
	"./cs": 311,
	"./cs.js": 311,
	"./cv": 312,
	"./cv.js": 312,
	"./cy": 313,
	"./cy.js": 313,
	"./da": 314,
	"./da.js": 314,
	"./de": 315,
	"./de-at": 316,
	"./de-at.js": 316,
	"./de-ch": 317,
	"./de-ch.js": 317,
	"./de.js": 315,
	"./dv": 318,
	"./dv.js": 318,
	"./el": 319,
	"./el.js": 319,
	"./en-SG": 320,
	"./en-SG.js": 320,
	"./en-au": 321,
	"./en-au.js": 321,
	"./en-ca": 322,
	"./en-ca.js": 322,
	"./en-gb": 323,
	"./en-gb.js": 323,
	"./en-ie": 324,
	"./en-ie.js": 324,
	"./en-il": 325,
	"./en-il.js": 325,
	"./en-nz": 326,
	"./en-nz.js": 326,
	"./eo": 327,
	"./eo.js": 327,
	"./es": 328,
	"./es-do": 329,
	"./es-do.js": 329,
	"./es-us": 330,
	"./es-us.js": 330,
	"./es.js": 328,
	"./et": 331,
	"./et.js": 331,
	"./eu": 332,
	"./eu.js": 332,
	"./fa": 333,
	"./fa.js": 333,
	"./fi": 334,
	"./fi.js": 334,
	"./fo": 335,
	"./fo.js": 335,
	"./fr": 336,
	"./fr-ca": 337,
	"./fr-ca.js": 337,
	"./fr-ch": 338,
	"./fr-ch.js": 338,
	"./fr.js": 336,
	"./fy": 339,
	"./fy.js": 339,
	"./ga": 340,
	"./ga.js": 340,
	"./gd": 341,
	"./gd.js": 341,
	"./gl": 342,
	"./gl.js": 342,
	"./gom-latn": 343,
	"./gom-latn.js": 343,
	"./gu": 344,
	"./gu.js": 344,
	"./he": 345,
	"./he.js": 345,
	"./hi": 346,
	"./hi.js": 346,
	"./hr": 347,
	"./hr.js": 347,
	"./hu": 348,
	"./hu.js": 348,
	"./hy-am": 349,
	"./hy-am.js": 349,
	"./id": 350,
	"./id.js": 350,
	"./is": 351,
	"./is.js": 351,
	"./it": 352,
	"./it-ch": 353,
	"./it-ch.js": 353,
	"./it.js": 352,
	"./ja": 354,
	"./ja.js": 354,
	"./jv": 355,
	"./jv.js": 355,
	"./ka": 356,
	"./ka.js": 356,
	"./kk": 357,
	"./kk.js": 357,
	"./km": 358,
	"./km.js": 358,
	"./kn": 359,
	"./kn.js": 359,
	"./ko": 360,
	"./ko.js": 360,
	"./ku": 361,
	"./ku.js": 361,
	"./ky": 362,
	"./ky.js": 362,
	"./lb": 363,
	"./lb.js": 363,
	"./lo": 364,
	"./lo.js": 364,
	"./lt": 365,
	"./lt.js": 365,
	"./lv": 366,
	"./lv.js": 366,
	"./me": 367,
	"./me.js": 367,
	"./mi": 368,
	"./mi.js": 368,
	"./mk": 369,
	"./mk.js": 369,
	"./ml": 370,
	"./ml.js": 370,
	"./mn": 371,
	"./mn.js": 371,
	"./mr": 372,
	"./mr.js": 372,
	"./ms": 373,
	"./ms-my": 374,
	"./ms-my.js": 374,
	"./ms.js": 373,
	"./mt": 375,
	"./mt.js": 375,
	"./my": 376,
	"./my.js": 376,
	"./nb": 377,
	"./nb.js": 377,
	"./ne": 378,
	"./ne.js": 378,
	"./nl": 379,
	"./nl-be": 380,
	"./nl-be.js": 380,
	"./nl.js": 379,
	"./nn": 381,
	"./nn.js": 381,
	"./pa-in": 382,
	"./pa-in.js": 382,
	"./pl": 383,
	"./pl.js": 383,
	"./pt": 384,
	"./pt-br": 385,
	"./pt-br.js": 385,
	"./pt.js": 384,
	"./ro": 386,
	"./ro.js": 386,
	"./ru": 387,
	"./ru.js": 387,
	"./sd": 388,
	"./sd.js": 388,
	"./se": 389,
	"./se.js": 389,
	"./si": 390,
	"./si.js": 390,
	"./sk": 391,
	"./sk.js": 391,
	"./sl": 392,
	"./sl.js": 392,
	"./sq": 393,
	"./sq.js": 393,
	"./sr": 394,
	"./sr-cyrl": 395,
	"./sr-cyrl.js": 395,
	"./sr.js": 394,
	"./ss": 396,
	"./ss.js": 396,
	"./sv": 397,
	"./sv.js": 397,
	"./sw": 398,
	"./sw.js": 398,
	"./ta": 399,
	"./ta.js": 399,
	"./te": 400,
	"./te.js": 400,
	"./tet": 401,
	"./tet.js": 401,
	"./tg": 402,
	"./tg.js": 402,
	"./th": 403,
	"./th.js": 403,
	"./tl-ph": 404,
	"./tl-ph.js": 404,
	"./tlh": 405,
	"./tlh.js": 405,
	"./tr": 406,
	"./tr.js": 406,
	"./tzl": 407,
	"./tzl.js": 407,
	"./tzm": 408,
	"./tzm-latn": 409,
	"./tzm-latn.js": 409,
	"./tzm.js": 408,
	"./ug-cn": 410,
	"./ug-cn.js": 410,
	"./uk": 411,
	"./uk.js": 411,
	"./ur": 412,
	"./ur.js": 412,
	"./uz": 413,
	"./uz-latn": 414,
	"./uz-latn.js": 414,
	"./uz.js": 413,
	"./vi": 415,
	"./vi.js": 415,
	"./x-pseudo": 416,
	"./x-pseudo.js": 416,
	"./yo": 417,
	"./yo.js": 417,
	"./zh-cn": 418,
	"./zh-cn.js": 418,
	"./zh-hk": 419,
	"./zh-hk.js": 419,
	"./zh-tw": 420,
	"./zh-tw.js": 420
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 525;

/***/ }),

/***/ 526:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return gridHelper; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_tools__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Created by shadow-viper on 1/19/18.
 */
var gridHelper = /** @class */ (function () {
    function gridHelper(tool) {
        var _this = this;
        this.tool = tool;
        this.ColSize = 15;
        this.elementCount = 0;
        //   private  zoomConfig:any={};
        this.isFinishAuth = false;
        this.lastScale = 0;
        this.gridHeight = 0;
        this.headerSize = 91;
        this.ElementSize = 10;
        this.logicComputed = false;
        this.gridWidth = 0;
        this.gridStyle = [];
        this.SizeInfo = { width: 1200, height: 600, types: { baldaquin4: { width: 23, height: 12 }, umbrella4: { width: 13, height: 12 }, umbrella2: { width: 23, height: 12 } } };
        this.cssConfiguration = { width_right_padding: 0, width_left_padding: 0, element_padding: 0 };
        this.supposedObjSize = (9 * 3); //we are looking for an object of 15mm
        this.ZoomData = { min_x: 0, min_y: 0, cord: true, x: 0, y: 0, last_x: 0, wave: [], gesture: [], elements: [], last_y: 0, header: [], scale: 1, base: 1, newScale: 0, content: [], el: [], ow: 0, oh: 0, original_x: [], original_y: [] };
        this.continueScaling = function (scale) {
            return _this.ElementRealSize() * scale < _this.supposedObjSize;
        };
    }
    /*private pixelRatio(){
      return window.devicePixelRatio
    }*/
    gridHelper.prototype.ScreenWidth = function () {
        return window.outerWidth - this.reduceWidth();
    };
    gridHelper.prototype.reduceWidth = function () {
        return (this.cssConfiguration.width_left_padding + this.cssConfiguration.width_right_padding + (this.cssConfiguration.element_padding * 15 * 2));
    };
    /*
      private ScreenHeight(sub:number):any{
        return window.outerHeight-sub;
      }
    */
    gridHelper.prototype.ElementRealSize = function () {
        return this.ElementSize;
    };
    gridHelper.prototype.sizeLogic = function (Iheight, Iwidth) {
        if (!this.logicComputed) {
            for (var i in this.SizeInfo.types) {
                var type = i;
                var height = ((this.ScreenWidth() / (Iwidth / Iheight)) / (Iheight * (this.SizeInfo.types[type].height) / this.SizeInfo.height)) - 6;
                var width = (this.ScreenWidth() / (Iwidth * (this.SizeInfo.types[type].width) / this.SizeInfo.width)) - 6;
                if (height > this.supposedObjSize) {
                    var sizeRatio = width / height;
                    width = this.supposedObjSize * sizeRatio;
                    height = this.supposedObjSize;
                }
                this.ElementSize = width;
                this.gridStyle[i] = {
                    width: width + 'px',
                    height: height + 'px',
                    'min-width': width + 'px',
                    'min-height': height + 'px',
                    'max-height': height + 'px',
                    'max-width': width + 'px'
                };
            }
            this.logicComputed = true;
        }
    };
    /*
      private getNewElementCount(oldHeight:number,newHeight:number,oldCount:number){
        return (newHeight*oldCount)/oldHeight;
      } */
    gridHelper.prototype.row = function () {
        return (this.elementCount % this.ColSize) > 0 ? parseInt((this.elementCount / this.ColSize).toString()) + 1 : (this.elementCount / this.ColSize);
    };
    gridHelper.prototype.RowCol = function () {
        return { row: this.row(), col: this.ColSize };
    };
    gridHelper.prototype.fill = function (length) {
        this.elementCount = length;
    };
    //   storeConfig(config){
    //     this.zoomConfig=JSON.parse(JSON.stringify(config))
    //   }
    gridHelper.prototype.resetZoom = function () {
        this.ZoomData = { min_x: 0, min_y: 0, cord: true, x: 0, y: 0, last_x: 0, wave: [], gesture: [], elements: [], last_y: 0, header: [], scale: 1, base: 1, newScale: 0, content: [], el: [], ow: 0, oh: 0, original_x: [], original_y: [] };
    };
    gridHelper.prototype.autoZoom = function () {
        var _this = this;
        var totalScale = this.supposedObjSize / this.ElementRealSize();
        var increment = ((totalScale - 1) / 50);
        var i = 0;
        var intervalInstance = setInterval(function () {
            _this.ZoomData.scale += increment;
            if (_this.continueScaling(_this.ZoomData.scale)) {
                _this.setBounds();
                _this.transform();
            }
            else {
                _this.ZoomFinished(intervalInstance);
            }
            i++;
            if (i >= 50) {
                _this.ZoomData.base = _this.ZoomData.scale;
                _this.ZoomFinished(intervalInstance);
            }
        }, 20);
    };
    gridHelper.prototype.ZoomFinished = function (intervalInstance) {
        clearInterval(intervalInstance);
        this.pinchZoom();
        this.onPanend();
    };
    gridHelper.prototype.getFactor = function (cord, axis) {
        //if grid height with a cord of y to a known axis
        //then get device height with y to an unknown axis
        if (axis == 'y') {
            return ((cord * (this.ScreenWidth() / (this.gridWidth / this.gridHeight))) / (this.gridHeight));
        }
        else if (axis == 'x') {
            return (cord * this.ScreenWidth()) / this.gridWidth;
        }
    };
    gridHelper.prototype.initializeZoom = function (el, content, header, elements, wave) {
        // max translate x = (container_width - element absolute_width)px
        // max translate y = (container_height - element absolute_height)px
        this.ZoomData.el = el;
        this.ZoomData.content = content;
        this.ZoomData.header = header;
        this.ZoomData.wave = wave;
        this.ZoomData.elements = elements;
        for (var i = 0; i < this.ZoomData.el.children.length; i++) {
            var c = this.ZoomData.el.children.item(i);
            this.ZoomData.ow = c.offsetWidth;
            this.ZoomData.oh += c.offsetHeight;
        }
        this.ZoomData.original_x = this.ZoomData.content.contentWidth - this.ZoomData.ow;
        this.ZoomData.original_y = this.ZoomData.content.contentHeight - this.headerSize - this.ZoomData.oh;
        this.ZoomData.max_x = this.ZoomData.original_x;
        this.ZoomData.max_y = this.ZoomData.original_y;
    };
    gridHelper.prototype.pinchZoom = function () {
        var _this = this;
        this.isFinishAuth = true;
        this.ZoomData.gesture = new __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["Gesture"](this.ZoomData.el);
        this.ZoomData.gesture.listen();
        this.ZoomData.gesture.on('pan', function (evt) { _this.onPan(evt); });
        this.ZoomData.gesture.on('panend', function (evt) { _this.onPanend(); });
        this.ZoomData.gesture.on('pancancel', function (evt) { _this.onPanend(); });
        // _gesture.on('tap', (ev)=>{this.onTap(ev);});
        //  this.ZoomData.gesture.on('pinch', (ev)=>{this.onPinch(ev);})
        // this.ZoomData.gesture.on('pinchend', (ev)=>{this.onPinchend(ev);});
        // this.ZoomData.gesture.on('pinchcancel', (ev)=>{this.onPinchend(ev);})
    };
    gridHelper.prototype.onPanend = function () {
        // remembers previous position to continue panning.
        this.ZoomData.last_x = this.ZoomData.x;
        this.ZoomData.last_y = this.ZoomData.y;
    };
    gridHelper.prototype.onTap = function (ev) {
        if (ev.tapCount === 2) {
            var reset = false;
            this.ZoomData.scale += .5;
            if (this.ZoomData.scale > 2) {
                this.ZoomData.scale = 1;
                reset = true;
            }
            this.setBounds();
            reset ? this.transform(this.ZoomData.max_x / 2, this.ZoomData.max_y / 2) : this.transform();
        }
    };
    /*private onPinch(ev) {
      // formula to append scale to new scale
       this.ZoomData.newScale=this.ZoomData.base + (ev.scale * this.ZoomData.scale - this.ZoomData.scale)/this.ZoomData.scale;
       this.ZoomData.newScale=this.ZoomData.newScale<1?1:this.ZoomData.newScale;
       this.ZoomData.scale = this.continueScaling(this.ZoomData.newScale)?this.ZoomData.newScale:this.ZoomData.scale;
  
       this.setBounds();
       this.transform();
    }
  
    private onPinchend(ev) {
       if (this.ZoomData.scale > 4) {
       this.ZoomData.scale = 4;
       }
       if (this.ZoomData.scale < 1) {
       this.ZoomData.scale = 1;
       }
       // lets pinch know where the new base will start
       this.ZoomData.base = this.ZoomData.scale;
      this.setBounds();
       // transform();
  
    }
  */
    //   private setY(Y:number){
    //     this.ZoomData.y=Y;
    //   }
    gridHelper.prototype.setCoor = function (xx, yy, isPan, type) {
        this.ZoomData.x = Math.min(Math.max((this.ZoomData.last_x + xx), this.ZoomData.max_x), this.ZoomData.min_x);
        this.ZoomData.y = Math.min(Math.max((this.ZoomData.last_y + yy), this.ZoomData.max_y), (this.ZoomData.min_y));
        this.alignHeader();
    };
    gridHelper.prototype.alignHeader = function () {
        if ((this.ZoomData.elements.getBoundingClientRect().top - 3) < (this.ZoomData.header.offsetHeight + this.ZoomData.wave.offsetHeight - 3) && this.ZoomData.elements.getBoundingClientRect().top > this.ZoomData.header.offsetHeight - 3) {
            if (this.ZoomData.elements.getBoundingClientRect().top > this.ZoomData.header.offsetHeight) {
                this.ZoomData.wave.style.webkitTransform = "translateY(" + -(this.ZoomData.header.offsetHeight + this.ZoomData.wave.offsetHeight - this.ZoomData.elements.getBoundingClientRect().top) + "px) scale3d(1,1, 1)";
            }
        }
        else if (this.ZoomData.elements.getBoundingClientRect().top < this.ZoomData.header.offsetHeight) {
            this.ZoomData.wave.style.webkitTransform = "translateY(" + -(this.ZoomData.header.offsetHeight + this.ZoomData.wave.offsetHeight + 10) + "px) scale3d(1,1, 1)";
        }
        else if (this.ZoomData.elements.getBoundingClientRect().top > (this.ZoomData.header.offsetHeight + this.ZoomData.wave.offsetHeight)) {
            this.ZoomData.wave.style.webkitTransform = "translateY(0px) scale3d(1,1, 1)";
        }
    };
    gridHelper.prototype.transform = function (xx, yy) {
        this.ZoomData.el.style.webkitTransform = "translate3d(" + (xx || this.ZoomData.x) + "px, " + (yy || this.ZoomData.y) + "px, 0) scale3d(" + this.ZoomData.scale + ", " + this.ZoomData.scale + ", 1)";
    };
    gridHelper.prototype.setBounds = function () {
        var scaled_x = Math.ceil((this.ZoomData.el.offsetWidth * this.ZoomData.scale - this.ZoomData.el.offsetWidth) / 2);
        var scaled_y = Math.ceil((this.ZoomData.el.offsetHeight * this.ZoomData.scale - this.ZoomData.el.offsetHeight) / 2);
        var overflow_x = Math.ceil(this.ZoomData.original_x * this.ZoomData.scale - this.ZoomData.original_x); // returns negative
        var overflow_y = Math.ceil(this.ZoomData.oh * this.ZoomData.scale - this.ZoomData.oh);
        this.ZoomData.max_x = this.ZoomData.original_x - scaled_x + overflow_x;
        this.ZoomData.min_x = 0 + scaled_x;
        this.ZoomData.max_y = this.ZoomData.original_y - scaled_y + overflow_y;
        this.ZoomData.min_y = 0 + scaled_y;
        this.alignHeader();
        this.setCoor(0, scaled_y);
    };
    gridHelper.prototype.onPan = function (ev) {
        this.setCoor(ev.deltaX, ev.deltaY);
        this.transform();
    };
    gridHelper = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_tools__["a" /* Tools */]])
    ], gridHelper);
    return gridHelper;
}());

//# sourceMappingURL=beach.gridHelper.js.map

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__search_search__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_BootstrapFirstRun__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__myReservation_myReservation__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__menu_menu__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__includes_searchDupplication_searchDupplication__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__myprofile_myprofile__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__chat_chat__ = __webpack_require__(172);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var TabsPage = /** @class */ (function () {
    function TabsPage(platform, api, app, events, popoverCtrl, navCtrl, storage, configuration, ngZone, translate, popover, alertCtrl, splashScreen) {
        this.platform = platform;
        this.api = api;
        this.app = app;
        this.events = events;
        this.popoverCtrl = popoverCtrl;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.configuration = configuration;
        this.ngZone = ngZone;
        this.translate = translate;
        this.popover = popover;
        this.alertCtrl = alertCtrl;
        this.splashScreen = splashScreen;
        this.veiwMapState = false;
        this.isMenuShown = false;
        this.showquit = false;
        this.beachRootParam = { id: '', startD: '', title2: '', reserveId: '' };
        this.unlockReservation = false;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__search_search__["a" /* SearchPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_6__myReservation_myReservation__["a" /* myReservation */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_8__menu_menu__["a" /* MenuPage */];
        // tab4Root: any = PlaceMapPage;
        this.tab5Root = __WEBPACK_IMPORTED_MODULE_11__myprofile_myprofile__["a" /* MyprofilePage */];
        this.chatRoot = __WEBPACK_IMPORTED_MODULE_13__chat_chat__["a" /* ChatPage */];
        this.last_tab = '';
        this.customer = {};
        this.showthat = true;
        this.waitAlert = false;
        this.unreceivedEvents = '';
        this.badge = {
            cart: {
                count: 0,
                data: [],
                beach_id: '',
                reserve_id: '',
                mention: ''
            }
        };
    }
    TabsPage.prototype.ionViewWillUnload = function () {
        this.events.unsubscribe('app:notification');
        this.events.unsubscribe('app:event');
        this.events.unsubscribe('tab:select');
        this.sub1$.unsubscribe();
        this.events.unsubscribe('app:removeBadge');
    };
    TabsPage.prototype.onNewNotification = function (data) {
        if (data && data.entity === 'reservation') {
            switch (data.action) {
                case 'accepted':
                    if (this.waitAlert) {
                        this.waitAlert.dismiss();
                        this.myReservation(this.customer.phone);
                        this.waitAlert = false;
                    }
                    break;
                default:
                    break;
            }
        }
    };
    TabsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.events.subscribe('redirect:search', function (_) {
            _this.tabRef.select(0);
        });
        this.events.subscribe('unlock:reservation', function (_) {
            _this.unlockReservation = true;
        });
        this.last_tab = this.translate.instant('MY_ACCOUNT');
        this.configuration.getStorage('login').then(function (a) {
            if (a && a.token) {
                if (a.guest || a.tour) {
                    _this.last_tab = _this.translate.instant('OPTIONS');
                }
                else {
                    _this.showthat = false;
                    _this.showquit = true;
                }
                _this.customer = a;
            }
        }, function (error) { });
    };
    TabsPage.prototype.checkEvents = function () {
        // this.ngZone.run(() => {
        //     this.api.get('events/hasnew', {
        //     }, {}, true, true).subscribe(data => {
        //         if (data.news) {
        //             this.unreceivedEvents = data.news
        //         } else {
        //             this.unreceivedEvents = ''
        //         }
        //     }, error => { }); 
        // });
    };
    TabsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.checkEvents();
        this.platform.ready().then(function () {
            _this.sub1$ = _this.platform.resume.subscribe(function () {
                _this.checkEvents();
                _this.reloadHomeStorage();
            });
        });
        this.events.subscribe('app:notification', function (data) { return _this.onNewNotification(data); });
        this.events.subscribe('app:removeBadge', function () { return _this.unreceivedEvents = ''; });
        this.events.subscribe('app:event', function () {
            _this.checkEvents();
        });
        this.events.subscribe('tab:select', function (index) {
            _this.tabRef.select(index);
        });
        setTimeout(function () {
            _this.api.get("beach-settings", {}, {}, true).subscribe(function (r) {
                localStorage.setItem('beachsettings', JSON.stringify(r));
            });
        }, 1000);
        this.detectMyReservation();
    };
    TabsPage.prototype.viewMapEvents = function () {
        var _this = this;
        this.events.subscribe('app:mapView', function (state) {
            _this.veiwMapState = state;
        });
    };
    TabsPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        setTimeout(function () {
            _this.cartEvent();
            _this.HomeEvent();
            _this.viewMapEvents();
            _this.configuration.getStorage('login').then(function (a) {
                if (a && a.token) {
                    if (a.guest || a.tour) {
                        _this.last_tab = _this.translate.instant('OPTIONS');
                    }
                    else {
                        _this.showthat = false;
                        _this.showquit = true;
                    }
                    if (a.reservations == 1) {
                        _this.customer = a;
                        _this.myReservation(a.phone);
                        _this.tabRef.select(1);
                    }
                    else {
                        _this.customer = a;
                        _this.myReservation(a.phone);
                    }
                }
            }, function (error) { });
        }, 2000);
    };
    TabsPage.prototype.reloadCart = function () {
        var _this = this;
        this.configuration.getStorage('tab').then(function (a) {
            if (a && a.cart && a.cart.data) {
                _this.badge = a;
            }
        });
    };
    TabsPage.prototype.toggleMenu = function () {
        this.isMenuShown = !this.isMenuShown;
    };
    TabsPage.prototype.logout = function () {
        var _this = this;
        this.configuration.clearStorage()
            .then(function () {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
        });
    };
    TabsPage.prototype.logoutapp = function () {
        var _this = this;
        if (this.api.fcmToken) {
            try {
                this.api.get("fcm/" + this.api.fcmToken + "/remove", {}, {}, true).toPromise();
            }
            catch (error) { }
        }
        this.configuration.clearStorage().then(function (r) {
            window.location.reload();
            _this.splashScreen.show();
        });
        /*this.navCtrl.popToRoot().then(_ => {
            this.navCtrl.push(LoginPage);
            this.app.getRootNav().setRoot(MainGuestPage);
        });*/
    };
    TabsPage.prototype.arrangeCart = function (a) {
        var _this = this;
        if (a && a.id) {
            var data = JSON.parse(JSON.stringify(a));
            if (data.toppings && data.toppings.length)
                data.toppings = this.CleanToppings(data);
            this.badge.cart.beach_id = this.beachRootParam.id;
            this.badge.cart.reserve_id = this.beachRootParam.reserveId;
            this.badge.cart.data.push(data);
            this.badge.cart.count = this.badge.cart.data.length;
            this.configuration.setStorage('tab', JSON.parse(JSON.stringify(this.badge))).then(function () {
                _this.events.publish('cart:added', _this.badge.cart.data.length);
            });
        }
        else {
            this.reloadCart();
        }
    };
    TabsPage.prototype.CleanToppings = function (data) {
        var topping = [];
        if (data && data.toppings) {
            for (var i in data.toppings) {
                if (data.toppings.hasOwnProperty(i) && data.toppings[i] && data.toppings[i].name) {
                    topping.push(data.toppings[i]);
                }
            }
        }
        return topping;
    };
    TabsPage.prototype.cartEvent = function () {
        var _this = this;
        this.reloadCart();
        this.events.subscribe('cart:received', function (data) {
            _this.arrangeCart(data);
        });
        this.events.subscribe('cart:removed', function (data) {
            _this.badge.cart.data = data;
        });
    };
    TabsPage.prototype.reloadHomeStorage = function () {
        this.myReservation(this.customer.phone);
    };
    TabsPage.prototype.HomeEvent = function () {
        var _this = this;
        this.events.subscribe('reservation:received', function (data) {
            if (data && data.delete) {
                _this.configuration.removeKeys('reservation');
                setTimeout(function () {
                    _this.reloadHomeStorage();
                }, 1000);
            }
            else {
                _this.reloadHomeStorage();
            }
        });
        this.events.subscribe('reservation:empty', function () {
            _this.configuration.getStorage('login').then(function (login) {
                var newLogin = JSON.parse(JSON.stringify(login));
                newLogin.reservations = 0;
                _this.configuration.setStorage('reservation', null);
                _this.configuration.setStorage('login', newLogin);
                _this.tabRef.select(0);
            });
            _this.unlockReservation = false;
        });
        this.events.subscribe('reservation:cancel', function (data) {
            _this.reloadHomeStorage();
        });
    };
    TabsPage.prototype.reloadStorage = function () {
        this.reloadHomeStorage();
    };
    TabsPage.prototype.myReservation = function (id) {
        var _this = this;
        if (this.customer.guest) {
            this.api.get("guests/reservation", {}, {}, true).subscribe(function (r) {
                _this.beachRootParam = { id: r[0].beach_id, startD: r[0].start_date, title2: r[0].beach, reserveId: r[0].id };
                _this.unlockReservation = true;
                _this.configuration.ClearTimeout();
                _this.tabRef.select(1);
                _this.configuration.setStorage('reservation', r[0]).then(function () { });
                _this.configuration.setStorage('reserv_endDate', r[0].end_date).then(function () { });
            });
            return false;
        }
        else if (this.customer.tour) {
            return false;
        }
        this.api.get("booking/" + id, {}, {}, true).subscribe(function (r) {
            if (r && r[0] && r[0].beach && (r[0].status != 'expired' || r[0].status != 'canceled')) {
                if (_this.waitAlert) {
                    _this.waitAlert.dismiss();
                    _this.myReservation(_this.customer.phone);
                    _this.waitAlert = false;
                }
                _this.beachRootParam = { id: r[0].beach_id, startD: r[0].start_date, title2: r[0].beach, reserveId: r[0].id };
                _this.unlockReservation = true;
                _this.configuration.ClearTimeout();
                _this.tabRef.select(1);
                _this.configuration.setStorage('reservation', r[0]).then(function () { });
                _this.configuration.setStorage('reserv_endDate', r[0].end_date).then(function () { });
                return;
                // if (r[0].acceptable && r[0].status === 'booked') {
                //     if (this.waitAlert) return;
                //     this.waitAlert = this.alertCtrl.create({
                //         title: '',
                //         message: this.translate.instant('UNREAD_RECEPTIONER'),
                //         enableBackdropDismiss: false,
                //         buttons: [
                //             {
                //                 text: this.translate.instant('CANCEL'),
                //                 handler: () => {
                //                     this.api.post(`booking/cancel`, { id: r[0].id }, {}, true).subscribe(() => {
                //                         this.waitAlert.dismiss();
                //                         this.waitAlert = false;
                //                     }, error => {
                //                         this.api.AmError(this.translate.instant('ERROR'), error.message, [{
                //                             text: this.configuration.translate.translate.instant('CLOSE'),
                //                             handler: () => {
                //                                 this.myReservation(id);
                //                             }
                //                         }]);
                //                     })
                //                 }
                //             }
                //         ]
                //     });
                //     this.waitAlert.present();
                // } else {
                //     if (this.waitAlert) {
                //         this.waitAlert.dismiss();
                //         this.myReservation(this.customer.phone);
                //         this.waitAlert = false;
                //     }
                //     this.beachRootParam = { id: r[0].beach_id, startD: r[0].start_date, title2: r[0].beach, reserveId: r[0].id }
                //     this.unlockReservation = true;
                //     this.configuration.ClearTimeout();
                //     this.tabRef.select(1);
                //     this.configuration.setStorage('reservation', r[0]).then(() => { });
                //     this.configuration.setStorage('reserv_endDate', r[0].end_date).then(() => { });
                //     return;
                // }
            }
            _this.configuration.setStorage('reservation', null);
            _this.configuration.setStorage('reserv_endDate', '0');
            _this.configuration.setStorage('tab', null);
            _this.unlockReservation = false;
        }, function (error) {
        });
    };
    TabsPage.prototype.detectMyReservation = function () {
        var _this = this;
        this.configuration.getStorage('login').then(function (res) {
            if (res.reservations > 0)
                _this.unlockReservation = true;
            else
                _this.unlockReservation = false;
        });
    };
    TabsPage.prototype.tabEvents = function (e) {
        var _this = this;
        if (e.index != 2) {
            this.configuration.setStorage('tab', { cart: {} }).then(function () {
                _this.badge = {
                    cart: {
                        count: 0,
                        data: [],
                        beach_id: '',
                        reserve_id: '',
                        mention: ''
                    }
                };
            });
            this.events.publish('cart:reset');
        }
        if (!this.unlockReservation) {
            if (e.index == 1) {
                // let pop1 = this.popover.create(searchDupplication, { msg: this.translate.instant('INFO_BEFORE_RESERVATION') });
                // pop1.present();
                this.tabRef.select(0);
            }
            if (e.index == 2) {
                var pop2 = this.popover.create(__WEBPACK_IMPORTED_MODULE_10__includes_searchDupplication_searchDupplication__["a" /* searchDupplication */], { msg: this.translate.instant('INFO_BEFORE_MENU') });
                pop2.present();
                this.tabRef.select(0);
            }
            return;
        }
        else {
            if (e.index == 3) {
                this.navCtrl.popToRoot().then(function (value) {
                    // this.tabRef.select(3).then(() => {
                    // });
                });
            }
            if (e.index == 2) {
                this.events.publish('page:beachmenu', this.beachRootParam);
                this.navCtrl.popToRoot().then(function (value) {
                    // this.tabRef.select(2).then(() => {
                    // });
                });
            }
            if (e.index == 1) {
                this.navCtrl.popToRoot().then(function (value) {
                    // this.tabRef.select(1).then(() => {
                    // });
                });
            }
            if (e.index == 0) {
                // this.navCtrl.setRoot(SearchPage);
                this.navCtrl.popToRoot().then(function (value) {
                    // this.tabRef.select(0).then(() => {
                    // });
                });
            }
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myTabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["Tabs"])
    ], TabsPage.prototype, "tabRef", void 0);
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-tabs',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\tabs\tabs.html"*/'<ion-tabs #myTabs [class.menu-shown]="isMenuShown" (ionChange)="tabEvents($event)">\n\n  <ion-tab [root]="tab1Root" tabIcon="search" tabTitle="{{ \'SEARCH\' | translate }}"></ion-tab>\n\n  <ion-tab [root]="tab2Root"  tabIcon="beach-tab-calendar" tabTitle="{{ \'RESERVATION\' | translate }}" enabled="true"></ion-tab>\n\n  <!-- <ion-tab [root]="tab5Root" [rootParams]="beachRootParam" [tabIcon]="isMenuShown?\'close\':\'ios-paper\'" tabTitle="{{ \'BEACH_MENU\' | translate }}" (ionSelect)="toggleMenu()" enabled="{{ unlockReservation }}"></ion-tab> -->\n\n  <ion-tab [root]="tab3Root" tabIcon="ios-paper" tabTitle="{{ \'BEACH_MENU\' | translate }}" enabled="true"></ion-tab>\n\n  <!-- <ion-tab [root]="tab4Root"  tabIcon="beach-tab-map" tabTitle="{{ \'BEACH_MAP\' | translate }}" [enabled]="veiwMapState"></ion-tab> -->\n\n  <!-- <ion-toolbar class="menu">\n\n    <ion-buttons> -->\n\n\n\n      <!--<button ion-button>\n\n        <div>\n\n          <div class="icon-div">\n\n            <ion-icon name="settings" large></ion-icon>\n\n          </div>\n\n          Settings\n\n        </div>\n\n      </button>\n\n      <button ion-button>\n\n        <div>\n\n          <div class="icon-div">\n\n            <ion-icon name="share-alt"></ion-icon>\n\n          </div>\n\n          Give Reservation\n\n        </div>\n\n      </button>\n\n      <button ion-button>\n\n        <div>\n\n          <div class="icon-div">\n\n            <ion-icon name="share"></ion-icon>\n\n          </div>\n\n          Share App\n\n        </div>\n\n      </button>-->\n\n\n\n      <!-- <button ion-button (click)="openCart()">\n\n        <ion-badge>{{ badge.cart.count }}</ion-badge>\n\n\n\n        <div>\n\n          <div class="icon-div">\n\n            <ion-icon name="cart"></ion-icon>\n\n          </div>\n\n          cart\n\n        </div>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-toolbar> -->\n\n  <!-- <div id="mask" (click)="toggleMenu()"></div> -->\n\n  <!-- <ion-tab  [root]="chatRoot" tabIcon="chatboxes" tabTitle="Chat" tabBadge="" enabled="true"></ion-tab> -->\n\n \n\n  <ion-tab  *ngIf="showquit" [root]="tab5Root" tabIcon="person" tabTitle="{{last_tab}}" tabBadge="{{unreceivedEvents}}" enabled="true"></ion-tab>\n\n  <ion-tab *ngIf="customer.tour || customer.guest" tabIcon="power" tabTitle="Quit" (ionSelect)="logoutapp()" enabled="true"></ion-tab>\n\n  \n\n  <!-- <ion-tab [root]="tab4Root" tabIcon="power" tabTitle="Logout" (ionSelect)=" logout()"></ion-tab> -->\n\n  <!-- <ion-tab [tabIcon]="isMenuShown ? \'close\' : \'menu\'" (ionSelect)="toggleMenu()"></ion-tab>\n\n<ion-toolbar class="menu">\n\n     <ion-buttons>\n\n       <button ion-button>\n\n         <div>\n\n           <div class="icon-div">\n\n             <ion-icon name="settings" large></ion-icon>\n\n           </div>\n\n           Settings\n\n         </div>\n\n       </button>\n\n       <button ion-button>\n\n         <div>\n\n           <div class="icon-div">\n\n             <ion-icon name="share-alt"></ion-icon>\n\n           </div>\n\n           Give Reservation\n\n         </div>\n\n       </button>\n\n       <button ion-button>\n\n         <div>\n\n           <div class="icon-div">\n\n             <ion-icon name="share"></ion-icon>\n\n           </div>\n\n           Share App\n\n         </div>\n\n       </button>\n\n       <button ion-button>\n\n         <div>\n\n           <div class="icon-div">\n\n             <ion-icon name="chatbubbles"></ion-icon>\n\n           </div>\n\n           Chat Online\n\n         </div>\n\n       </button>\n\n     </ion-buttons>\n\n   </ion-toolbar>\n\n  <div id="mask" (click)="toggleMenu()"></div>-->\n\n</ion-tabs>\n\n'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_7__providers_services__["a" /* ApiProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["App"], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["Events"], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["PopoverController"],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5__app_BootstrapFirstRun__["a" /* CustomBootstrap */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"],
            __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["PopoverController"], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tools; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/**
 * Created by shadow-viper on 1/2/18.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Tools = /** @class */ (function () {
    function Tools() {
        var _this = this;
        this.delay = function (callback, seconds) {
            if (!_this.delayInstance) {
                _this.delayInstance = setTimeout(function () {
                    callback();
                    clearTimeout(_this.delayInstance);
                    _this.delayInstance = false;
                }, seconds);
            }
        };
        this.keyString = '';
    }
    //breakMobile number to the required format
    Tools.prototype.breakTelephone = function (code, suffix) {
        if (code && suffix) {
            var TelString = "+(" + code + ")";
            this.keyString = suffix;
            var ArData = this.keyString ? this.keyString.split('') : [];
            var counter = 0;
            for (var i = 0; i < ArData.length; i++) {
                if (counter == 3) {
                    counter = 0;
                    TelString += ' ';
                }
                counter++;
                TelString += ArData[i];
            }
            return TelString;
        }
    };
    Tools.prototype.GetDateDiv = function (diff) {
        return isNaN(diff) ? NaN : {
            diff: diff,
            s: Math.floor((diff) % 60),
            m: Math.floor((diff) / 60) % 60,
            h: Math.floor((diff) / 3600) % 24,
            d: Math.floor((diff) / 86400),
            M: Math.floor((diff) / 2592000) % 30
        };
    };
    Tools = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], Tools);
    return Tools;
}());

//# sourceMappingURL=tools.js.map

/***/ }),

/***/ 6:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomBootstrap; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_storage__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__storageKey_json__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__storageKey_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__storageKey_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_providers_translateServices__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sms_watch_json__ = __webpack_require__(516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sms_watch_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__sms_watch_json__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by shadow-viper on 1/2/18.
 */






var CustomBootstrap = /** @class */ (function () {
    function CustomBootstrap(storage, apiData, translate) {
        this.storage = storage;
        this.apiData = apiData;
        this.translate = translate;
        this.timeoutInstance = [];
        this.currency = "";
        // public hasLocationAccess: boolean = false;
        this.pages = [];
    }
    CustomBootstrap.prototype.populateCountries = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.apiData.get("countries", {}, {}, true).subscribe(function (r) {
                var arrangedCountry = _this.changeToLower(r, "code");
                _this.setStorage("country", arrangedCountry);
                resolve(arrangedCountry);
            }, function (error) {
                reject(error);
            });
        });
    };
    CustomBootstrap.prototype.populateBeachSettings = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.apiData.get("beach-settings", {}, {}, true).subscribe(function (r) {
                _this.setStorage("beach_settings", r);
                resolve(r);
            }, function (error) {
                reject(error);
            });
            // return this.getStorage('beach_settings').then((a) => {
            //   if (a && a.length) {
            //   resolve(a);
            //   } else {
            //   this.apiData.get('beach-settings', {}, {},true).subscribe(r => {
            //     this.setStorage('beach_settings',r);
            //     resolve(r);
            //   },error=>{
            //     reject(error);
            //   })
            //   }
            // }, (error) => {
            //   reject(error);
            // })
        });
    };
    CustomBootstrap.prototype.lang = function (countries) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.apiData.get("languages", {}, {}, true).subscribe(function (r) {
                var lang = _this.availableLang(countries, "code", r);
                _this.setStorage("lang", lang);
                resolve(lang);
            }, function (error) {
                reject(error);
            });
            // return this.getStorage('lang').then((a) => {
            //   if (a && a.length) {
            //   resolve(a);
            //   } else {
            //   this.apiData.get('languages', {}, {},true).subscribe(r => {
            //     let lang=this.availableLang(countries,'code',r);
            //     this.setStorage('lang', lang);
            //     resolve(lang);
            //   },error=>{
            //     reject(error);
            //   });
            //   }
            // }, (error) => {
            //   reject(error);
            // })
        });
    };
    CustomBootstrap.prototype.place = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.apiData.get("places", {}, {}, true).subscribe(function (r) {
                _this.setStorage("places", r);
                resolve(r);
            }, function (error) {
                reject(error);
            });
            // this.getStorage('places').then((a)=>{
            //   if(a && a.length){
            //   resolve(a);
            //   }else{
            //   this.apiData.get('places',{},{},true).subscribe(r=>{
            //     this.setStorage('places',r);
            //     resolve(r);
            //   },error=>{
            //     reject(error);
            //   })
            //   }
            // },(error)=>{
            //   console.error(error)
            // })
        });
    };
    CustomBootstrap.prototype.changeToLower = function (countries, column) {
        for (var i in countries) {
            if (countries.hasOwnProperty(i)) {
                countries[i][column] = countries[i][column].toLowerCase();
            }
        }
        return countries;
    };
    CustomBootstrap.prototype.availableLang = function (countries, column, check) {
        var language = [];
        for (var i in countries) {
            if (countries.hasOwnProperty(i)) {
                if (check.indexOf(countries[i][column].toLowerCase()) > -1) {
                    language.push(countries[i]);
                }
                else if (countries[i][column].toLowerCase() == "gb") {
                    countries[i][column] = "en";
                    language.push(countries[i]);
                }
            }
        }
        return language;
    };
    CustomBootstrap.prototype.Load = function () {
        var _this = this;
        this.translate.setLanguageProvider("ro");
        return new Promise(function (resolve, reject) {
            return _this.populateCountries().then(function (r) {
                return _this.lang(r).then(function (l) {
                    _this.storedLang = l;
                    _this.countries = r;
                    resolve({
                        country: r,
                        language: l,
                    });
                }, function (error) {
                    reject(error);
                });
            }, function (error) {
                reject(error);
            });
        });
    };
    CustomBootstrap.prototype.storedCountry = function () {
        return this.countries;
    };
    CustomBootstrap.prototype.storedLanguage = function () {
        return this.storedLang;
    };
    CustomBootstrap.prototype.storageKeys = function () {
        return __WEBPACK_IMPORTED_MODULE_1__storageKey_json__;
    };
    CustomBootstrap.prototype.removeKeys = function (key) {
        var _this = this;
        return this.storage.ready().then(function () {
            _this.storage.remove(_this.storageKeys()[key]);
        });
    };
    CustomBootstrap.prototype.setStorage = function (key, value) {
        var _this = this;
        return this.storage.ready().then(function () {
            return _this.storage.set(_this.storageKeys()[key], value);
        });
    };
    CustomBootstrap.prototype.getStorage = function (key) {
        var _this = this;
        return this.storage.ready().then(function () {
            return _this.storage.get(_this.storageKeys()[key]);
        });
    };
    CustomBootstrap.prototype.clearStorage = function () {
        return this.storage.clear();
    };
    CustomBootstrap.prototype.SMSconfig = function () {
        return __WEBPACK_IMPORTED_MODULE_5__sms_watch_json__;
    };
    CustomBootstrap.prototype.getTimeout = function () {
        return this.timeoutInstance;
    };
    CustomBootstrap.prototype.canRequestPool = function (page) {
        if (this.pages && this.pages[this.pages.length - 1] == page) {
            return true;
        }
    };
    CustomBootstrap.prototype.setRequestPage = function (page) {
        if (page) {
            this.pages.push(page);
        }
    };
    CustomBootstrap.prototype.setTimeout = function (value) {
        this.timeoutInstance.push(value);
    };
    CustomBootstrap.prototype.ClearTimeout = function () {
        if (this.timeoutInstance && Array.isArray(this.timeoutInstance)) {
            for (var i in this.timeoutInstance) {
                try {
                    console.warn(this.timeoutInstance);
                    clearTimeout(this.timeoutInstance[i]);
                    this.pages = [];
                }
                catch (e) {
                    console.error(e);
                }
            }
            this.timeoutInstance = [];
        }
    };
    CustomBootstrap.prototype.setDeviseInfo = function (infoObj) {
        this.deviceInfo = infoObj;
    };
    CustomBootstrap.prototype.getDeviseInfo = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var devceInf = _this.deviceInfo;
            resolve(devceInf);
        });
    };
    CustomBootstrap = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3__pages_providers_services__["a" /* ApiProvider */],
            __WEBPACK_IMPORTED_MODULE_4__pages_providers_translateServices__["a" /* translateServices */]])
    ], CustomBootstrap);
    return CustomBootstrap;
}());

//# sourceMappingURL=BootstrapFirstRun.js.map

/***/ }),

/***/ 626:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_results_search_results__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_BootstrapFirstRun__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_filter__ = __webpack_require__(627);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_BehaviorSubject__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__main_guest_page_main_guest_page_component__ = __webpack_require__(66);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var SearchDetailsPage = /** @class */ (function () {
    function SearchDetailsPage(geo, navCtrl, navParams, api, configuration) {
        var _this = this;
        this.geo = geo;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.api = api;
        this.configuration = configuration;
        this.langSubscr = new __WEBPACK_IMPORTED_MODULE_7_rxjs_BehaviorSubject__["BehaviorSubject"]('ro');
        this.country = 'Romania';
        this.clickable = false;
        this.place = 'Mamaia';
        this.persons = Array.from(new Array(8), function (val, index) { return index + 1; });
        this.types = ['UMBRELLA', 'BALDAQUIN']; //['UMBRELLA', 'BALDAQUIN', 'SUNBED'];
        this.requestPage = 'SearchDetails';
        this.zones = ['FRONT', 'MIDDLE', 'BACK'];
        this.getGeolocation = function () {
            try {
                navigator.geolocation.getCurrentPosition(function (a) {
                    if (a && a.coords && a.coords.latitude) {
                        _this.SearchPost.latitude = a.coords.latitude;
                        _this.SearchPost.longitude = a.coords.longitude;
                    }
                }, function (e) { }, { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 });
            }
            catch (error) {
            }
        };
        this.selected = {
            seat: [],
            zone: [],
            persons: [],
            sunbed: [],
            sunbedEveryday: []
        };
        this.SearchPost = this.navParams.get('beach');
        this.clickable = false;
        this.title = this.navParams.get('title');
        this.SearchPost.all_seats = false;
        // if (this.configuration.hasLocationAccess) {
        this.getGeolocation();
        // }
    }
    SearchDetailsPage.prototype.ionViewWillEnter = function () {
        this.configuration.setRequestPage(this.requestPage);
        this.currentlang = localStorage.getItem('lang');
        if (this.currentlang == null) {
            this.currentlang = 'ro';
        }
    };
    SearchDetailsPage.prototype.SearchBeaches = function () {
        if (this.shouldAllowSubmit()) {
            this.SearchPost.seat_zone = this.zones;
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__search_results_search_results__["a" /* SearchResultsPage */], { searchlist: this.SearchPost, title: this.title });
        }
    };
    SearchDetailsPage.prototype._select = function (type, index, name) {
        if (this.selected[type])
            this.selected[type][index] = name ? name : true;
    };
    SearchDetailsPage.prototype._deselect = function (type, index) {
        if (this.selected[type])
            delete this.selected[type][index];
    };
    SearchDetailsPage.prototype.check = function (type, index, single, name) {
        if (this.selected[type]) {
            if (single)
                this.selected[type] = [];
            if (this.selected[type][index]) {
                this._deselect(type, index);
                this.setPostVar();
                return;
            }
            this._select(type, index, name);
        }
        this.setPostVar();
    };
    SearchDetailsPage.prototype.shouldAllowSubmit = function () {
        if (this.clickable == true && this.SearchPost && this.SearchPost.beach_ids && this.SearchPost.beach_ids.length > 0 && this.SearchPost.end_date && this.SearchPost.end_date && this.SearchPost.person_num && this.SearchPost.seat_type) {
            return true;
        }
        else {
            return false;
        }
    };
    SearchDetailsPage.prototype.SanitizeData = function (data) {
        var data1 = [];
        if (data) {
            for (var i in data) {
                if (data.hasOwnProperty(i) && data[i] != undefined) {
                    data1.push(data[i]);
                }
            }
        }
        return data1;
    };
    SearchDetailsPage.prototype.SanitizeToString = function (data, lower) {
        var data1 = '';
        if (data) {
            for (var i in data) {
                if (data.hasOwnProperty(i) && data[i] != undefined) {
                    data1 += lower ? data[i].toLowerCase() : data[i];
                }
            }
        }
        return data1;
    };
    SearchDetailsPage.prototype.getNumber = function () {
        for (var i in this.selected.persons) {
            if (this.selected.persons.length > 0 && this.selected.persons[i] && this.selected.persons[i] > 0) {
                return this.selected.persons[i];
            }
        }
    };
    SearchDetailsPage.prototype.setPostVar = function () {
        this.clickable = true;
        this.SearchPost.seat_type = this.SanitizeToString(this.selected.seat, true);
        this.SearchPost.seat_zone = this.SanitizeData(this.selected.zone);
        this.SearchPost.person_num = this.getNumber();
        this.SearchPost.all_seats = this.selected.sunbed[0];
    };
    SearchDetailsPage.prototype.translate = function (key) {
        this.configuration.translate.translate.instant(key.toUpperCase());
    };
    SearchDetailsPage.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__main_guest_page_main_guest_page_component__["a" /* MainGuestPage */]);
    };
    SearchDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-search-details',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\search-details\search-details.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>{{ title }}</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n  <div id="type-block">\n\n    <h3>{{ \'SEAT_TYPE\' | translate }}</h3>\n\n    <ion-list no-lines ion-row class="vertical-buttons">\n\n      <ion-item ion-col col-6 *ngFor="let type of types; let i=index;">\n\n        <!--<button *ngIf="type == \'UMBRELLA\' && currentlang == \'en\'" ion-button round block color="light" value="{{type}}" (click)="check(\'seat\',i,true,type)"   [ngClass]="selected.seat[i]?\'active\':\'\'" >Sunbeds<br>(at umbrella)</button>-->\n\n        <!--<button *ngIf="type == \'BALDAQUIN\' && currentlang == \'en\'" ion-button round block color="light" value="{{type}}" (click)="check(\'seat\',i,true,type)"   [ngClass]="selected.seat[i]?\'active\':\'\'" >{{type | translate}}</button>-->\n\n        <!--<button *ngIf="type == \'SUNBED\' && currentlang == \'en\'" ion-button round block color="light" value="{{type}}" (click)="check(\'seat\',i,true,type)"   [ngClass]="selected.seat[i]?\'active\':\'\'" >Sunbeds<br>(without umbrella)</button>-->\n\n\n\n        <!--<button *ngIf="type == \'UMBRELLA\' && currentlang == \'ro\'" ion-button round block color="light" value="{{type}}" (click)="check(\'seat\',i,true,type)"   [ngClass]="selected.seat[i]?\'active\':\'\'" >Sezlonguri<br>(at la umbrela)</button>-->\n\n        <!--<button *ngIf="type == \'BALDAQUIN\' && currentlang == \'ro\'" ion-button round block color="light" value="{{type}}" (click)="check(\'seat\',i,true,type)"   [ngClass]="selected.seat[i]?\'active\':\'\'" >{{type | translate}}</button>-->\n\n        <!--<button *ngIf="type == \'SUNBED\' && currentlang == \'ro\'" ion-button round block color="light" value="{{type}}" (click)="check(\'seat\',i,true,type)"   [ngClass]="selected.seat[i]?\'active\':\'\'" >Sezlonguri<br>(fara umbrela)</button>-->\n\n        <button ion-button round block color="light" value="{{type}}" (click)="check(\'seat\',i,true,type)"   [ngClass]="selected.seat[i]?\'active\':\'\'" >{{type+\'_T\' | translate}}<br> {{ type+i | translate}} </button>\n\n      </ion-item>\n\n    </ion-list>\n\n  </div>\n\n\n\n  <div *ngIf="false" id="zone-block">\n\n    <h3>{{ \'ZONE\' | translate }}</h3>\n\n    <ion-list no-lines ion-row class="vertical-buttons">\n\n      <ion-item ion-col col-4 *ngFor="let zone of zones; let i=index">\n\n        <button ion-button round block color="light" value="{{zone}}"  (click)="check(\'zone\',i,false,zone)" [ngClass]="selected.zone[i]?\'active\':\'\'">{{zone | translate}}</button>\n\n      </ion-item>\n\n    </ion-list>\n\n  </div>\n\n\n\n  <div id="persons-block">\n\n    <h3>{{ \'HOW_MANY_PERSONS\' | translate }}</h3>\n\n    <ion-list no-lines ion-row class="vertical-buttons persons">\n\n      <ion-item ion-col *ngFor="let person of persons; let i=index">\n\n        <button ion-button block color="light" value="{{person}}"  (click)="check(\'persons\',i,true,person)" [ngClass]="selected.persons[i]?\'active\':\'\'">{{person}}</button>\n\n      </ion-item>\n\n    </ion-list>\n\n  </div>\n\n\n\n  <div id="sunbeds-block" *ngIf="selected.seat[0] && selected.seat[0]==\'UMBRELLA\'">\n\n    <h3>{{ \'SUNBEDS_TO_BE_AT_THE_FREE_UMBRELLA\' | translate }}</h3>\n\n    <ion-list no-lines ion-row class="vertical-buttons">\n\n      <ion-item ion-col col-3>\n\n        <button ion-button clear block icon-left check value="true" [ngClass]="selected.sunbed[0]?\'checked\':\'\'" (click)="check(\'sunbed\',0)">\n\n          <ion-icon name="check"></ion-icon>\n\n          {{ \'YES\' | translate }}\n\n        </button>\n\n      </ion-item>\n\n      <ion-item ion-col col-3>\n\n        <button ion-button clear block icon-left check value="false"  [ngClass]="selected.sunbed[0]?\'\':\'checked\'"  (click)="check(\'sunbed\',0)">\n\n          <ion-icon name="check"></ion-icon>\n\n          {{ \'NO\' | translate }}\n\n        </button>\n\n      </ion-item>\n\n    </ion-list>\n\n  </div>\n\n\n\n  <!--\n\n  <div id="same-sunbeds-block">\n\n    <h3>During your stay do you want sunbeds booked to be the same every day?</h3>\n\n    <ion-list no-lines ion-row class="vertical-buttons">\n\n      <ion-item ion-col col-3>\n\n        <button ion-button clear block icon-left check value="true"  [ngClass]="selected.sunbedEveryday[0]?\'checked\':\'\'"  (click)="check(\'sunbedEveryday\',0)">\n\n          <ion-icon name="check"></ion-icon>\n\n          Yes\n\n        </button>\n\n      </ion-item>\n\n      <ion-item ion-col col-3>\n\n        <button ion-button clear block icon-left check value="false"  [ngClass]="selected.sunbedEveryday[0]?\'\':\'checked\'"  (click)="check(\'sunbedEveryday\',0)">\n\n          <ion-icon name="check"></ion-icon>\n\n          No\n\n        </button>\n\n      </ion-item>\n\n    </ion-list>\n\n  </div>\n\n  -->\n\n\n\n  <ion-row margined>\n\n    <button ion-button round full pink-gradient (click)="SearchBeaches()" [disabled]="!shouldAllowSubmit()">{{ \'NEXT\' | translate }}</button>\n\n  </ion-row>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\search-details\search-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_3__providers_services__["a" /* ApiProvider */], __WEBPACK_IMPORTED_MODULE_4__app_BootstrapFirstRun__["a" /* CustomBootstrap */]])
    ], SearchDetailsPage);
    return SearchDetailsPage;
}());

//# sourceMappingURL=search-details.js.map

/***/ }),

/***/ 634:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return searchResult; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__beach_beach__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__rating_rating__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__beachView_beachView__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_BootstrapFirstRun__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_in_app_browser__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__searchDupplication_searchDupplication__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_launch_navigator__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__search_results_search_results__ = __webpack_require__(69);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var searchResult = /** @class */ (function () {
    function searchResult(navCtrl, navParams, api, popoverCtrl, configuration, iap, translate, events, geolocation, platform, launchNavigator, search) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.api = api;
        this.popoverCtrl = popoverCtrl;
        this.configuration = configuration;
        this.iap = iap;
        this.translate = translate;
        this.events = events;
        this.geolocation = geolocation;
        this.platform = platform;
        this.launchNavigator = launchNavigator;
        this.search = search;
        this.title = '';
        this.infiniteCount = 5;
        this.direction = [];
        this.enteredGrid = false;
        this.beachSettings = [];
        this.beachSettings = JSON.parse(localStorage.getItem('beachsettings') || '[]');
        this.SearchResult = [];
        this.SearchObj = [];
    }
    searchResult.prototype.ngOnInit = function () {
    };
    searchResult.prototype.next = function (id, data1, title) {
        var _this = this;
        this.setCurrencyByBeach(id);
        this.search.sub1$.unsubscribe();
        this.search.sub2$.unsubscribe();
        if (!this.enteredGrid) {
            this.configuration.getStorage('reserv_endDate').then(function (data) {
                var timezoneOffsetHours = new Date().getTimezoneOffset() / 60;
                var alreadyEDate = data === '0' ? undefined : new Date(new Date(data).setHours(new Date(data).getHours() + timezoneOffsetHours)).getDate();
                var newSDate = new Date(_this.SearchObj.start_date).getDate();
                var endSDate = new Date(_this.SearchObj.end_date).getDate();
                _this.configuration.getStorage('reservation').then(function (reservation) {
                    var sameBeach = reservation && reservation.beach_id === id;
                    if (sameBeach && alreadyEDate && (newSDate <= alreadyEDate && alreadyEDate <= endSDate)) {
                        var popoverSignup = _this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_10__searchDupplication_searchDupplication__["a" /* searchDupplication */], { msg: _this.translate.instant('DUPPLICATED_RESERVATION_DETECT') });
                        popoverSignup.present();
                        return;
                    }
                    _this.SearchObj.waiter_id = _this.SearchResult.waiter_id;
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__beach_beach__["a" /* BeachPage */], { id: id, data: data1, title: _this.title, title2: title, SearchObj: _this.SearchObj, context: "search" });
                })
                    .catch(function (error) {
                    if (alreadyEDate && (newSDate <= alreadyEDate && alreadyEDate <= endSDate)) {
                        var popoverSignup = _this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_10__searchDupplication_searchDupplication__["a" /* searchDupplication */], { msg: _this.translate.instant('DUPPLICATED_RESERVATION_DETECT') });
                        popoverSignup.present();
                        return;
                    }
                    _this.SearchObj.waiter_id = _this.SearchResult.waiter_id;
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__beach_beach__["a" /* BeachPage */], { id: id, data: data1, title: _this.title, title2: title, SearchObj: _this.SearchObj, context: "search" });
                });
            });
        }
        this.enteredGrid = true;
        setTimeout(function () {
            _this.enteredGrid = false;
        }, 1000);
    };
    searchResult.prototype.setCurrencyByBeach = function (id) {
        var ss = this.beachSettings.find(function (item) {
            return item.beach_id == id;
        });
        this.configuration.currency = ss.currency;
    };
    Object.defineProperty(searchResult.prototype, "searchInput", {
        get: function () {
            return this.SearchResult;
        },
        set: function (data) {
            this.SearchResult = data;
        },
        enumerable: true,
        configurable: true
    });
    searchResult.prototype.more = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            if (_this.SearchResult.length) {
                _this.infiniteCount += 5;
                infiniteScroll.complete();
                if (_this.infiniteCount >= _this.SearchResult.length) {
                    infiniteScroll.enable(false);
                    _this.infiniteCount = _this.SearchResult.length;
                }
            }
        }, 300);
    };
    searchResult.prototype.rating = function (id) {
        this.search.sub1$.unsubscribe();
        this.search.sub2$.unsubscribe();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__rating_rating__["a" /* ratingPage */], { id: id, title: this.title });
    };
    Object.defineProperty(searchResult.prototype, "Title", {
        get: function () {
            return this.title;
        },
        set: function (data) {
            this.title = data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(searchResult.prototype, "SearchParam", {
        get: function () {
            return this.SearchObj;
        },
        set: function (data) {
            this.SearchObj = data;
        },
        enumerable: true,
        configurable: true
    });
    searchResult.prototype.convertInt = function (data) {
        return (data | 0);
    };
    searchResult.prototype.getBeachWorkingHours = function (id) {
        var workingHours;
        this.beachSettings.map(function (beach) {
            if (beach.beach_id === id) {
                workingHours = beach.working_hours || {};
            }
        });
        return workingHours;
    };
    searchResult.prototype.getRating = function (rate, num) {
        var star = 'beach-star-0';
        if (Math.floor(rate) >= num) {
            star = 'beach-star-100';
        }
        else {
            if ((num - rate) > 1) {
                star = 'beach-star-0';
            }
            else {
                star = "beach-star-" + (100 - Math.floor(((num - rate) * 100) / 25) * 25);
            }
        }
        return star;
    };
    searchResult.prototype.beachModal = function (id) {
        var _this = this;
        var beachM = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_5__beachView_beachView__["a" /* BeachView */], { beach_id: id }, { cssClass: 'imgPop' });
        beachM.onDidDismiss(function (data) {
            _this.search.getGeolocation(true);
        });
        beachM.present();
    };
    searchResult.prototype.BeachCordinates = function (beach_id) {
        for (var i in this.beachSettings) {
            if (this.beachSettings.hasOwnProperty(i)) {
                if (this.beachSettings[i] && this.beachSettings[i].beach_id == beach_id) {
                    return this.beachSettings[i];
                }
            }
        }
    };
    searchResult.prototype.openNavigator = function (beach, type) {
        var _this = this;
        var beachCord = this.BeachCordinates(beach.id);
        if (beachCord.latitude) {
            //this.api.AmBusy('');
            this.geolocation.getCurrentPosition().then(function (myPosition) {
                var options = {
                    start: myPosition.coords.latitude + ", " + myPosition.coords.longitude,
                    app: _this.launchNavigator.APP.GOOGLE_MAPS,
                    transportMode: type == 'walking' ? _this.launchNavigator.TRANSPORT_MODE.WORKING : _this.launchNavigator.TRANSPORT_MODE.DRIVING,
                };
                _this.launchNavigator.navigate(beachCord.latitude + ", " + beachCord.longitude, options)
                    .then(function (success) {
                    //this.api.AmBusy('',true);
                }, function (error) {
                    //this.api.AmBusy('',true);
                });
            }).catch(function (err) {
                //this.api.AmBusy('',true);
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], searchResult.prototype, "searchInput", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], searchResult.prototype, "Title", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], searchResult.prototype, "SearchParam", null);
    searchResult = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'searchResult',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\searchResults\searchResult.html"*/'<p text-center *ngIf="SearchResult && SearchResult.length">{{SearchResult.length}} {{ \'BEACHES_FOUND_FOR_YOU\' | translate }}</p>\n\n<!--<p text-center *ngIf="!SearchResult || !SearchResult.length">{{ \'NO_BEACH_FOUND_ON_YOUR_SEARCH\' | translate }}</p>-->\n\n<div *ngIf="SearchResult">\n\n  <ion-card *ngFor="let beach of SearchResult |  slice:0:infiniteCount  let i =index ">\n\n    <!--<div class="goto-map" *ngIf="direction[i] && beach.geometrical_data">-->\n\n    <!--<button icon-only clear class="close-icon" (click)="direction[i]=!direction[i]">-->\n\n    <!--<ion-icon name="md-close-circle"></ion-icon>-->\n\n    <!--</button>-->\n\n    <!--<h2>{{ beach.name }}</h2>-->\n\n    <!--<ion-row class="map-button-holder">-->\n\n    <!--<ion-col col-6><button (click)="openNavigator(beach,\'driving\')" ion-button round color="primary" *ngIf="beach.geometrical_data.driving"><ion-icon name="md-car"></ion-icon>{{ beach.geometrical_data.driving.duration }} ({{ beach.geometrical_data.driving.distance}})</button></ion-col>-->\n\n    <!--<ion-col col-6><button (click)="openNavigator(beach,\'walking\')" ion-button round color="white" primary *ngIf="beach.geometrical_data.walking"><ion-icon name="ios-walk-outline"></ion-icon> {{ beach.geometrical_data.walking.duration }} ({{ beach.geometrical_data.walking.distance}})</button> </ion-col>-->\n\n    <!--</ion-row>-->\n\n    <!--<p>{{ \'PRESS_ONE_OF_THE_BUTTONS_TO_GET_DIRECTIONS_TO_THE_BEACH\'  | translate}}</p>-->\n\n    <!--</div>-->\n\n    <ion-row class="closed-overlay" *ngIf="beach.closed">\n\n      <div class="text">\n\n        <div class="title">{{\'BEACH_CLOSED_LABEL\' | translate}}</div>\n\n        <div class="subtitle">{{(\'BEACH_CLOSED_MSG\' | translate) + ": " + getBeachWorkingHours(beach.id).start + " - " + getBeachWorkingHours(beach.id).end}}</div>\n\n      </div>\n\n    </ion-row>\n\n\n\n    <ion-row>\n\n\n\n      <ion-col col-3 class="card-left">\n\n\n\n        <img [src]="beach.image" (click)="beachModal(beach.id)" />\n\n        <p text-center class="reviews" (click)="rating(beach.id)">({{beach.rating_count}})</p>\n\n\n\n        <div class="star-rating" (click)="rating(beach.id)">\n\n          <ion-icon [name]="getRating(beach.rating,1)" [class.full]="beach.rating>0"></ion-icon>\n\n          <ion-icon [name]="getRating(beach.rating,2)" [class.full]="beach.rating>1"></ion-icon>\n\n          <ion-icon [name]="getRating(beach.rating,3)" [class.full]="beach.rating>2"></ion-icon>\n\n          <ion-icon [name]="getRating(beach.rating,4)" [class.full]="beach.rating>3"></ion-icon>\n\n          <ion-icon [name]="getRating(beach.rating,5)" [class.full]="beach.rating>4"></ion-icon>\n\n        </div>\n\n\n\n      </ion-col>\n\n\n\n      <ion-col col-9 class="card-right">\n\n        <h4 class="title">{{beach.name}}</h4>\n\n\n\n        <ion-row>\n\n          <ion-col col-6 (click)="next(beach.id,beach.beach,beach.name)">\n\n            <p class="seats">{{beach.all_seats}} {{ \'SEATS\' | translate }}</p>\n\n            <ion-item class="available" *ngIf="beach.available_seats" (click)="next(beach.id,beach,beach.name)" text-wrap>\n\n              {{ \'AVAILABLE\' | translate }}:\n\n              <span class="place" *ngIf="beach.available_seats.type==\'sunbed\'">\n\n                {{beach.available_seats.total}}\n\n                <ion-icon name="place-sunbed"></ion-icon>\n\n              </span>\n\n              <span class="place" *ngIf="beach.available_seats.type==\'umbrella\'">\n\n                {{beach.available_seats.total}}\n\n                <ion-icon name="place-umbrella"></ion-icon>\n\n              </span>\n\n              <span class="place" *ngIf="beach.available_seats.type==\'baldaquin\'">\n\n                {{beach.available_seats.total}}\n\n                <ion-icon name="place-baldaquin"></ion-icon>\n\n              </span>\n\n            </ion-item>\n\n\n\n\n\n          </ion-col>\n\n          <ion-col col-6 (click)="next(beach.id,beach.available_seats,beach.name)">\n\n            <div class="direction-btn-holder" *ngIf="beach.geometrical_data && beach.geometrical_data.driving">\n\n              <button ion-button round (click)="openNavigator(beach,\'driving\')"><img class="direction-image" src="./assets/imgs/direction.png"><span class="direction-text">{{ \'GET_DIRECTION\' |translate }}</span></button>\n\n            </div>\n\n            <div class="direction-location-text" *ngIf="beach.geometrical_data && beach.geometrical_data.driving">\n\n              {{ beach.geometrical_data.driving.duration }} ({{ beach.geometrical_data.driving.distance}})\n\n            </div>\n\n          </ion-col>\n\n        </ion-row>\n\n\n\n\n\n        <div class="options">\n\n          <ion-icon *ngFor="let option of beach.features" name="option-{{option}}"></ion-icon>\n\n        </div>\n\n      </ion-col>\n\n\n\n    </ion-row>\n\n  </ion-card>\n\n  <ion-infinite-scroll (ionInfinite)="more($event)">\n\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n  </ion-infinite-scroll>\n\n\n\n</div>'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\searchResults\searchResult.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_4__providers_services__["a" /* ApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["PopoverController"],
            __WEBPACK_IMPORTED_MODULE_6__app_BootstrapFirstRun__["a" /* CustomBootstrap */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"], __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_launch_navigator__["a" /* LaunchNavigator */],
            __WEBPACK_IMPORTED_MODULE_12__search_results_search_results__["a" /* SearchResultsPage */]])
    ], searchResult);
    return searchResult;
}());

//# sourceMappingURL=searchResult.js.map

/***/ }),

/***/ 635:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return beachDetails; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cart_cart__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__beach_beach__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_BootstrapFirstRun__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Created by shadow-viper on 12/17/17.
 */
var beachDetails = /** @class */ (function () {
    function beachDetails(configuration, navparam, navCtrl, events) {
        this.configuration = configuration;
        this.navparam = navparam;
        this.navCtrl = navCtrl;
        this.events = events;
        this.requestPage = 'BeachDetails';
        this.itemsShown = false;
        this.quantity = 1;
    }
    beachDetails.prototype.ngOnInit = function () {
        this.beachDetailsData = this.navparam.get('item');
        this.beachSection = this.navparam.get('type');
    };
    beachDetails.prototype.add = function () {
        this.events.publish('cart:received', this.quantity);
    };
    beachDetails.prototype.beach = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__beach_beach__["a" /* BeachPage */]);
    };
    beachDetails.prototype.gotoCart = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__cart_cart__["a" /* CartPage */]);
    };
    beachDetails.prototype.counter = function (val) {
        if ((val < 0 && this.quantity > 0) || val > 0 && this.quantity < 19)
            this.quantity += val;
    };
    beachDetails.prototype.ionViewWillEnter = function () {
        this.configuration.setRequestPage(this.requestPage);
    };
    beachDetails = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'beachDetails',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\beachDetails\beachDetails.html"*/'<ion-header class="has-shadow">\n\n\n\n  <ion-navbar>\n\n    <ion-title>Mamaia, Crazy Beach</ion-title>\n\n    <ion-buttons end>\n\n\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n  <ion-toolbar no-padding class="segments-toolbar">\n\n    <ion-segment [(ngModel)]="beachSection">\n\n      <ion-segment-button value="overview" (click)="beach()">\n\n        Beach\n\n      </ion-segment-button>\n\n      <ion-segment-button value="menu">\n\n        Menu\n\n      </ion-segment-button>\n\n    </ion-segment>\n\n  </ion-toolbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content [ngSwitch]="beachSection">\n\n\n\n  <div *ngSwitchCase="\'overview\'" class="beach-overview">\n\n  </div>\n\n\n\n  <div *ngSwitchCase="\'menu\'" class="beach-menu">\n\n    <div>\n\n      <ion-card>\n\n        <ion-row class="category">\n\n          <div ion-text text-capitalize color="primary" class="category-name">Prosciuto & funghi</div>\n\n          <div ion-text text-capitalize color="dark" class="category-description">30 cm, mozzarela, ham mushroom, tomato sauce</div>\n\n          <div ion-text text-capitalize color="primary" class="category-price" text-right>{{ 26 | currency }}</div>\n\n        </ion-row>\n\n      </ion-card>\n\n      <ion-card>\n\n        <ion-row class="category" (click)="itemsShown=!itemsShown">\n\n          <div class="category-main">\n\n            <span ion-text text-capitalize color="primary" class="category-title">Toppings </span>\n\n            <span ion-text color="dark" class="category-label">(optional)</span>\n\n          </div>\n\n\n\n          <ion-icon color="primary" [name]="itemsShown ? \'ios-arrow-up\' : \'ios-arrow-down\'"></ion-icon>\n\n        </ion-row>\n\n      </ion-card>\n\n      <ion-card>\n\n        <ion-row class="category">\n\n          <div class="category-main">\n\n            <span ion-text text-capitalize color="primary" class="category-title">Comment </span>\n\n            <span ion-text color="dark" class="category-label">(optional)</span>\n\n          </div>\n\n          <div class="category-comment">\n\n            <ion-input placeholder="Write Here"></ion-input>\n\n          </div>\n\n        </ion-row>\n\n      </ion-card>\n\n      <ion-card>\n\n        <ion-row class="category">\n\n          <div class="category-main">\n\n            <span ion-text text-capitalize color="primary" class="category-title">quantity </span>\n\n            <span ion-text color="dark" class="category-label">(optional)</span>\n\n          </div>\n\n          <div class="category-quantity">\n\n            <button ion-button icon-only clear class="minus" (click)="counter(-1)"><ion-icon name="remove"></ion-icon></button>\n\n            <div class="screen"><span text-capitalize ion-text color="primary">{{ quantity }}</span></div>\n\n            <button ion-button icon-only clear class="plus" (click)="counter(+1)"><ion-icon name="add"></ion-icon></button>\n\n          </div>\n\n        </ion-row>\n\n      </ion-card>\n\n\n\n      <div class="addToCart">\n\n        <button ion-button (click)="add()">Add to Cart</button>\n\n      </div>\n\n    </div>\n\n\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\beachDetails\beachDetails.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__app_BootstrapFirstRun__["a" /* CustomBootstrap */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"]])
    ], beachDetails);
    return beachDetails;
}());

//# sourceMappingURL=beachDetails.js.map

/***/ }),

/***/ 636:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdsPopoverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_BootstrapFirstRun__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the AdsPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AdsPopoverPage = /** @class */ (function () {
    function AdsPopoverPage(navCtrl, viewCtrl, api, navParams, events, configuration) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.api = api;
        this.navParams = navParams;
        this.events = events;
        this.configuration = configuration;
        this.flag = this.navParams.get('flag');
        this.showClose = false;
        this.sec = 0;
        this.startTimer();
    }
    AdsPopoverPage.prototype.startTimer = function () {
        this.intervalVar = setInterval(function () {
            this.sec++;
            console.log("afasf", this.sec);
            if (!this.flag) {
                if (this.sec > 5) {
                    this.showClose = true;
                }
            }
            else {
                this.showClose = true;
            }
        }.bind(this), 1000);
    };
    AdsPopoverPage.prototype.ionViewDidLoad = function () {
    };
    AdsPopoverPage.prototype.ionViewWillLeave = function () {
    };
    AdsPopoverPage.prototype.ionViewCanLeave = function () { clearTimeout(this.intervalVar); console.log("Should I leave? Yes"); return true; };
    AdsPopoverPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
            selector: 'page-ads-popover',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\myReservation\ads-popover\ads-popover.html"*/'<ion-header mode="ios">\n\n\n\n	<ion-navbar mode="ios">\n\n\n\n		<button *ngIf="showClose" ion-button clear icon-only right (click)="viewCtrl.dismiss()" class="close-btn">\n\n			<ion-icon name="ios-close-outline"></ion-icon>\n\n		</button>\n\n		<p>{{sec}}</p>\n\n	</ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n</ion-content>'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\myReservation\ads-popover\ads-popover.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_0__providers_services__["a" /* ApiProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"], __WEBPACK_IMPORTED_MODULE_3__app_BootstrapFirstRun__["a" /* CustomBootstrap */]])
    ], AdsPopoverPage);
    return AdsPopoverPage;
}());

//# sourceMappingURL=ads-popover.js.map

/***/ }),

/***/ 637:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return popoverHelper; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by shadow-viper on 12/29/17.
 */

var popoverHelper = /** @class */ (function () {
    function popoverHelper() {
    }
    popoverHelper.prototype.CustomAnimationIsStarting = function () {
        document.body.classList.add('customPopover');
    };
    popoverHelper.prototype.CleanAnimation = function () {
        document.body.classList.remove('customPopover');
    };
    popoverHelper = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], popoverHelper);
    return popoverHelper;
}());

//# sourceMappingURL=popoverHelper.js.map

/***/ }),

/***/ 638:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return phoneComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_tools__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_BootstrapFirstRun__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__seachprefix_seachprefix__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Created by shadow-viper on 1/2/18.
 */
var phoneComponent = /** @class */ (function () {
    function phoneComponent(modal, tool, configuration, api) {
        var _this = this;
        this.modal = modal;
        this.tool = tool;
        this.configuration = configuration;
        this.api = api;
        this.phonePrefix = {
            country: '',
            prefix: ''
        };
        this.CompletedSelect = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.arrangeTel = function (code, suffix) {
            if (code && suffix)
                return _this.tool.breakTelephone(code, suffix);
        };
        this.openedSearch = false;
        this.configurations = [];
        this.search = '';
        this.phoneNumber = {
            code: null,
            suffix: null,
            complete: null,
            mobile_prefix: [],
            search: '',
            lang: this.configuration.translate.currentLanguage,
            name: null,
            prefix: null
        };
        this.format = {
            country: '',
            phone: ''
        };
        this.changeType(true, 'prefix');
        this.translationText();
    }
    phoneComponent.prototype.ngOnInit = function () {
        //setTimeout(() => {
        this.configurations = this.configuration.storedCountry();
        this.recoverCountry();
        this.translationText();
        //}, 1000);
        //this.toggleCache();
    };
    Object.defineProperty(phoneComponent.prototype, "toggleData", {
        set: function (data) {
            if (data != 111) {
                //this.toggleCache();
            }
        },
        enumerable: true,
        configurable: true
    });
    phoneComponent.prototype.recoverCountry = function () {
        var self = this;
        if (!self.phoneNumber || (self.phoneNumber && !self.phoneNumber.code)) {
            return;
        }
        //21.cand dau logout...la prefix imi apare 44. am dat clear data...si tot apare. e hardcodat cred..sau nu stiu 
        if (self.configurations && self.configurations.length > 0) {
            var lastCountryData = self.configurations.find(function (countryObj) {
                return countryObj.code === self.phoneNumber.code;
            });
            if (lastCountryData) {
                self.countryData(lastCountryData);
            }
        }
    };
    phoneComponent.prototype.showSearch = function () {
        var _this = this;
        if (this.openedSearch)
            return;
        this.openedSearch = true;
        var modal = this.modal.create(__WEBPACK_IMPORTED_MODULE_4__seachprefix_seachprefix__["a" /* SeachprefixPage */], { country: this.configurations, cssClass: 'test-modal' });
        modal.onDidDismiss(function (data) {
            if (data) {
                setTimeout(function () {
                    _this.countryData(data);
                }, 300);
            }
            else {
            }
            _this.openedSearch = false;
        });
        modal.present();
        // this.changeType(false,'search');
    };
    phoneComponent.prototype.countryData = function (item) {
        // alert(item.prefix);
        this.phoneNumber = {
            prefix: item.prefix,
            suffix: this.phoneNumber.suffix,
            complete: this.phoneNumber.complete,
            lang: this.configuration.translate.currentLanguage,
            search: this.phoneNumber.search,
            mobile_prefix: item.mobile_prefix,
            name: item.name,
            code: item.code
        };
        this.phonePrefix.prefix = this.phoneNumber.mobile_prefix && this.phoneNumber.mobile_prefix.length > 0 ? JSON.stringify(this.phoneNumber.mobile_prefix) : undefined;
        this.phonePrefix.country = item.country;
        /* for(let i in this.configuration.storedLanguage()){
           if(this.configuration.storedLang.hasOwnProperty(i) && this.configuration.storedLang[i].code==item.code){
             this.phoneNumber.lang=item.code;
             break;
           }
         }*/
        this.changeType(true, 'prefix');
        this.suffixFocus.setFocus();
    };
    phoneComponent.prototype.changeType = function (selected, model) {
        this.type = { selected: selected, model: model };
    };
    phoneComponent.prototype.completed = function () {
        if (this.phoneNumber.prefix && this.phoneNumber.suffix) {
            this.phoneNumber.complete = this.arrangeTel(this.phoneNumber.prefix, this.phoneNumber.suffix);
            this.CompletedSelect.emit(this.phoneNumber);
            this.changeType(true, 'prefix');
        }
    };
    phoneComponent.prototype.checkCorrect = function () {
        var _this = this;
        if (this.phoneNumber.prefix && this.phoneNumber.suffix) {
            this.tool.delay(function () {
                _this.phoneNumber.complete = _this.arrangeTel(_this.phoneNumber.prefix, _this.phoneNumber.suffix);
                _this.CompletedSelect.emit(_this.phoneNumber);
            }, 500);
        }
    };
    phoneComponent.prototype.toggleCache = function () {
        var _this = this;
        this.configuration.getStorage('UserPhoneInfo').then(function (a) {
            if (a && a.complete && a.canUse) {
                _this.phoneNumber = a;
            }
        });
    };
    phoneComponent.prototype.translationText = function () {
        this.format.country = this.configuration.translate.translate.instant('COUNTRY');
        this.format.phone = this.configuration.translate.translate.instant('PHONE_NUMBER');
    };
    phoneComponent.prototype.logAFF = function () {
    };
    phoneComponent.prototype.isFilledPrefix = function () {
        var _this = this;
        // alert("light");
        //   alert(this.phoneNumber);
        //   alert(this.phoneNumber.prefix);
        //   alert(parseInt(this.phoneNumber.prefix));
        //   alert(this.phoneNumber.search);
        //   alert(this.phoneNumber.search.length);
        //   alert(this.phoneNumber.suffix);
        //   alert(this.phonePrefix.prefix);
        setTimeout(function () {
            // alert("timeout");
            if (_this.phoneNumber && _this.phoneNumber.prefix && parseInt(_this.phoneNumber.prefix)) {
                var parsedPrefixCondition = JSON.parse(_this.phonePrefix.prefix) && JSON.parse(_this.phonePrefix.prefix).length > 0;
                if (_this.phoneNumber && _this.phoneNumber.suffix && parsedPrefixCondition && _this.phonePrefix.prefix.indexOf(_this.phoneNumber.suffix.split('')[0]) == -1) {
                    // alert("timeout true");
                    _this.api.AmError(_this.configuration.translate.translate.instant('ERROR'), _this.phonePrefix.country + ' ' + _this.configuration.translate.translate.instant('COUNTRY_SUPPORT_THE_PHONE_NUMBERS_WHICH_START_WITH') + ' ' + _this.phoneNumber.mobile_prefix, [{ text: _this.configuration.translate.translate.instant('CANCEL'), role: 'cancel' }]);
                    _this.phoneNumber.suffix = null;
                }
            }
            else {
                // alert("time else");
                _this.countryFocus.setFocus();
            }
        }, 300);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('countryFocus'),
        __metadata("design:type", Object)
    ], phoneComponent.prototype, "countryFocus", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('suffixFocus'),
        __metadata("design:type", Object)
    ], phoneComponent.prototype, "suffixFocus", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], phoneComponent.prototype, "CompletedSelect", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], phoneComponent.prototype, "toggleData", null);
    phoneComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'phoneComponent',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\phoneComponent\phoneComponent.html"*/'<div class="inputNumber country active" >\n\n  <div class="contentMain" (click)="$event.preventDefault()">\n\n  <!--  <ion-label>{{ type.model==\'search\'?configuration.translate.translate.instant(\'COUNTRY\'):configuration.translate.translate.instant(\'PHONE_NUMBER\')}}</ion-label>-->\n\n\n\n    <ion-item class="short">\n\n      <ion-label floating>{{\'PREFIX\'  | translate}}</ion-label>\n\n      <ion-input type="text" col-3 (ionFocus)="showSearch()"  (mousedown)="countryFocus.setFocus(); " [(ngModel)]="phoneNumber[type.model]" readonly #countryFocus></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item class="long"><ion-label floating>{{\'PHONE_NUMBER\'  | translate}}</ion-label>\n\n      <ion-input autocomplete="off" name="phonenumber" type="tel" col-9 [(ngModel)]="phoneNumber.suffix" (ngModelChange)="checkCorrect()" (ionFocus)="isFilledPrefix()" (ionChange)="isFilledPrefix()" (ionBlur)="completed()" #suffixFocus></ion-input>\n\n    </ion-item>\n\n  </div>\n\n  <ion-list class="searchResult" *ngIf="!type.selected && phoneNumber.search">\n\n    <ion-item no-lines *ngFor="let item of configurations| PhoneSort:phoneNumber.search:10:[\'country\']  let i =index" (mousedown)="countryData(item); $event.preventDefault()">\n\n      {{ item.country }}\n\n    </ion-item>\n\n  </ion-list>\n\n</div>\n\n'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\phoneComponent\phoneComponent.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_1__providers_tools__["a" /* Tools */], __WEBPACK_IMPORTED_MODULE_2__app_BootstrapFirstRun__["a" /* CustomBootstrap */], __WEBPACK_IMPORTED_MODULE_3__providers_services__["a" /* ApiProvider */]])
    ], phoneComponent);
    return phoneComponent;
}());

//# sourceMappingURL=phoneComponent.js.map

/***/ }),

/***/ 639:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return sortPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return PhoneSortPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return ProductPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ArraySortPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrayIndexSortPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return PricePipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return KeyPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return ToArrayPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return TimeHelperMoment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return InterpolationPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


/**
 * Created by shadow-viper on 1/2/18.
 */
var sortPipe = /** @class */ (function () {
    function sortPipe() {
    }
    sortPipe.prototype.transform = function (data, search, end, column) {
        if (data && data.length > 0 && search) {
            if (column) {
                return data.filter(function (r) {
                    var tmp = r[column].split(' ');
                    var state = false;
                    if (tmp.length > 0) {
                        for (var i = 0; i < tmp.length; i++) {
                            if (search == 'All') {
                                state = (r["beaches"] > 0) ? true : false;
                            }
                            else {
                                state = (tmp[i].toLowerCase().startsWith(search.toLowerCase()) && r["beaches"] > 0) ? true : false;
                            }
                            if (state)
                                break;
                        }
                    }
                    return state;
                    // r[column].toLowerCase().startsWith(search.toLowerCase()) != -1
                }).slice(0, end);
            }
            return data.filter(function (r) { return JSON.stringify(r).toLowerCase().indexOf(search.toLowerCase()) != -1; }).slice(0, end);
        }
    };
    sortPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            pure: false,
            name: 'sort'
        })
    ], sortPipe);
    return sortPipe;
}());

var PhoneSortPipe = /** @class */ (function () {
    function PhoneSortPipe() {
    }
    PhoneSortPipe.prototype.transform = function (data, search, end, column) {
        if (data && data.length > 0 && search) {
            if (column && column.length) {
                return data.filter(function (r) {
                    var tmp = r['country'].split(' ');
                    var state = false;
                    if (tmp.length > 0) {
                        for (var i = 0; i < tmp.length; i++) {
                            state = tmp[i].toLowerCase().startsWith(search.toLowerCase()) ? true : false;
                            if (state)
                                break;
                        }
                    }
                    return state || r['prefix'] == search;
                    // r['country'].toLowerCase().startsWith(search.toLowerCase())|| r['prefix']==search || r['country'].toLowerCase().indexOf(search.toLowerCase()) != -1
                }).slice(0, end);
            }
            return data.filter(function (r) { return JSON.stringify(r).toLowerCase().indexOf(search.toLowerCase()) != -1; }).slice(0, end);
        }
    };
    PhoneSortPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            pure: false,
            name: 'PhoneSort'
        })
    ], PhoneSortPipe);
    return PhoneSortPipe;
}());

var ProductPipe = /** @class */ (function () {
    function ProductPipe() {
    }
    ProductPipe.prototype.transform = function (data, search, column, order) {
        if (data && data.length > 0) {
            if (search && search.length) {
                if (column) {
                    data = data.filter(function (r) {
                        var status = true;
                        for (var i in search) {
                            if (search[i]) {
                                if (JSON.stringify(r[column]).toLowerCase().indexOf(search[i].toLowerCase()) == -1) {
                                    status = false;
                                    break;
                                }
                            }
                        }
                        return status;
                    });
                }
            }
            if (order && ['distance', 'rating'].indexOf(order) != -1 && data && data.length > 0) {
                data = this[order](data);
            }
            // sort by Promoted, by promoted_index, then...by index
            //this.sortPromotion(data);
            return data;
        }
        else {
        }
    };
    // private abc(data:Array<any>){
    //     return data.sort((a: any, b: any) => {
    //       if (a['name'] < b['name']) {
    //         return -1;
    //       } else if (a['name'] > b['name']) {
    //         return 1;
    //       } else {
    //         return 0;
    //       }
    //     });
    // }
    ProductPipe.prototype.size = function (data) {
        return data.sort(function (a, b) {
            if (a['all_seats'] < b['all_seats']) {
                return 1;
            }
            else if (a['all_seats'] > b['all_seats']) {
                return -1;
            }
            else {
                return 0;
            }
        });
    };
    ProductPipe.prototype.distance = function (data) {
        return data.sort(function (a, b) {
            if (!a['geometrical_data']) {
                return 1;
            }
            if (!b['geometrical_data']) {
                return -1;
            }
            if (parseFloat(a['geometrical_data']['driving']['distance']) < parseFloat(b['geometrical_data']['driving']['distance'])) {
                return -1;
            }
            else if (parseFloat(a['geometrical_data']['driving']['distance']) > parseFloat(b['geometrical_data']['driving']['distance'])) {
                return 1;
            }
            else {
                return 0;
            }
        });
    };
    ProductPipe.prototype.rating = function (data) {
        return data.sort(function (a, b) {
            if (parseFloat(a['rating']) < parseFloat(b['rating'])) {
                return 1;
            }
            else if (parseFloat(a['rating']) > parseFloat(b['rating'])) {
                return -1;
            }
            else {
                return 0;
            }
        });
    };
    ProductPipe.prototype.sortPromotion = function (data) {
        data = [
            { id: 1, promoted_index: 4, index: 4 },
            { id: 2, promoted_index: 1, index: 1 },
            { id: 3, promoted_index: 2, index: 5 },
            { id: 4, promoted_index: 5, index: 3 },
        ];
        // the expected result should be:
        // 2, 3, 4, 5
        data = data.sort(function (a, b) {
            // Sort by promoted
            // if (a['promoted']) {
            // 	return -1;
            // }
            // if (!a['promoted']) {
            // 	return 1;
            // }
            //Sort by promoted_index 
            if (parseInt(a['promoted_index']) < parseInt(b['promoted_index'])) {
                return -1;
            }
            if (parseInt(a['promoted_index']) > parseInt(b['promoted_index'])) {
                return 1;
            }
            // Sort by index
            if (parseInt(a['index']) < parseInt(b['index'])) {
                return -1;
            }
            if (parseInt(a['index']) > parseInt(b['index'])) {
                return 1;
            }
            return 0;
        });
        return data;
    };
    ProductPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            pure: false,
            name: 'ProductSort'
        })
    ], ProductPipe);
    return ProductPipe;
}());

var ArraySortPipe = /** @class */ (function () {
    function ArraySortPipe() {
    }
    ArraySortPipe.prototype.transform = function (array, args) {
        array.sort(function (a, b) {
            if (a < b) {
                return -1;
            }
            else if (a > b) {
                return 1;
            }
            else {
                return 0;
            }
        });
        return array;
    };
    ArraySortPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: "order"
        })
    ], ArraySortPipe);
    return ArraySortPipe;
}());

var ArrayIndexSortPipe = /** @class */ (function () {
    function ArrayIndexSortPipe() {
    }
    ArrayIndexSortPipe.prototype.transform = function (array, args) {
        array.sort(function (a, b) {
            if (a[args] < b[args]) {
                return -1;
            }
            else if (a[args] > b[args]) {
                return 1;
            }
            else {
                return 0;
            }
        });
        return array;
    };
    ArrayIndexSortPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: "indexSort"
        })
    ], ArrayIndexSortPipe);
    return ArrayIndexSortPipe;
}());

var PricePipe = /** @class */ (function () {
    function PricePipe() {
    }
    PricePipe.prototype.transform = function (price, args) {
        var retPrice = Math.round(price * 100) / 100;
        return retPrice;
    };
    PricePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: "price"
        })
    ], PricePipe);
    return PricePipe;
}());

var KeyPipe = /** @class */ (function () {
    function KeyPipe() {
    }
    KeyPipe.prototype.transform = function (Obj, requestKey, replaceUnderscore) {
        if (Obj) {
            for (var i in Obj) {
                if (Obj.hasOwnProperty(i)) {
                    if (requestKey)
                        if (replaceUnderscore)
                            return i = i.replace('_', ' ');
                        else
                            return i;
                    else
                        return Obj[i];
                }
            }
        }
    };
    KeyPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'key'
        })
    ], KeyPipe);
    return KeyPipe;
}());

var ToArrayPipe = /** @class */ (function () {
    function ToArrayPipe() {
    }
    ToArrayPipe.prototype.transform = function (Obj, remove) {
        var Arr = [];
        if (Obj) {
            for (var i in Obj) {
                var newObj = {};
                if (Obj.hasOwnProperty(i)) {
                    if (remove && remove.length > 0 && JSON.stringify(remove).toLowerCase().indexOf(i) != -1) {
                        continue;
                    }
                    newObj[i] = Obj[i];
                    Arr.push(newObj);
                }
            }
            return Arr;
        }
    };
    ToArrayPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'ToArray'
        })
    ], ToArrayPipe);
    return ToArrayPipe;
}());

var TimeHelperMoment = /** @class */ (function () {
    function TimeHelperMoment() {
    }
    TimeHelperMoment.prototype.transform = function (time) {
        var timeString = __WEBPACK_IMPORTED_MODULE_1_moment__(time).fromNow();
        var timeArray = timeString.split(' ');
        return timeArray[1].length > 5 ? timeArray[0] + " " + timeArray[1].substr(0, 3) + " " + timeArray[2] : timeString;
    };
    TimeHelperMoment = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'timeHelper'
        })
    ], TimeHelperMoment);
    return TimeHelperMoment;
}());

var InterpolationPipe = /** @class */ (function () {
    function InterpolationPipe() {
    }
    InterpolationPipe.prototype.transform = function (text, params) {
        var keys = [];
        var values = [];
        if (!text || !params) {
            return;
        }
        params.map(function (item, index) {
            index % 2 === 0 ? keys.push(item) : values.push(item);
        });
        keys.map(function (key, index) {
            var transformedKey = "{{ " + key + " }}";
            var transformedKey2 = "{{" + key + "}}";
            if (text.indexOf(transformedKey) > -1) {
                text = text.replace(transformedKey, values[index]);
            }
            else if (text.indexOf(transformedKey2) > -1) {
                text = text.replace(transformedKey2, values[index]);
            }
        });
        return text;
    };
    InterpolationPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'interpolate'
        })
    ], InterpolationPipe);
    return InterpolationPipe;
}());

//# sourceMappingURL=sort.js.map

/***/ }),

/***/ 640:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return langComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__popover_language_popover_lang__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_BootstrapFirstRun__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Created by shadow-viper on 1/2/18.
 */
var langComponent = /** @class */ (function () {
    function langComponent(popoverCtrl, misc, navCtrl, viewCtrl) {
        this.popoverCtrl = popoverCtrl;
        this.misc = misc;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.currentLanguage = 'ro';
        this.langSubscr = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"]('ro');
        this.pushLang = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.currentLanguage = this.misc.translate.currentLanguage;
    }
    langComponent.prototype.ngOnInit = function () {
        this.getLanguage();
    };
    langComponent.prototype.showLanguageMenu = function ($event) {
        var _this = this;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_1__popover_language_popover_lang__["a" /* PopoverLang */], { parentSubject: this.langSubscr, language: this.currentLanguage, page: this.paged }, { cssClass: 'languagePopOver' });
        popover.present({
            ev: $event
        }).then(function () {
            _this.langSubscr.subscribe(function (newLang) {
                _this.currentLanguage = newLang;
                _this.pushLang.emit(_this.currentLanguage);
                _this.misc.translate.setLanguageProvider(_this.currentLanguage);
                _this.misc.apiData.currentLanguage = _this.currentLanguage;
            });
        });
        popover.onDidDismiss(function (e) {
        });
    };
    langComponent.prototype.getLanguage = function () {
        var _this = this;
        this.misc.getStorage('AdditionalRegData').then(function (a) {
            if (a && a.lang)
                _this.currentLanguage = a.lang;
            else
                _this.currentLanguage = 'en';
            _this.pushLang.emit(_this.currentLanguage);
            _this.misc.translate.setLanguageProvider(_this.currentLanguage);
            _this.misc.apiData.currentLanguage = _this.currentLanguage;
        }, function (error) {
            //not found
            _this.currentLanguage = 'en';
            _this.misc.translate.setLanguageProvider(_this.currentLanguage);
            _this.misc.apiData.currentLanguage = _this.currentLanguage;
        });
    };
    Object.defineProperty(langComponent.prototype, "refresh", {
        get: function () {
            return this.langRefresh;
        },
        set: function (data) {
            this.getLanguage();
            this.langRefresh = data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(langComponent.prototype, "page", {
        get: function () {
            return this.paged;
        },
        set: function (data) {
            this.paged = data;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], langComponent.prototype, "pushLang", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], langComponent.prototype, "refresh", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], langComponent.prototype, "page", null);
    langComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'langComponent',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\langComponent\langComponent.html"*/'\n\n\n\n<ion-fab top right>\n\n  <button ion-fab mini id="language" lang="{{currentLanguage}}"  [ngStyle]="{\'background-image\': \'url(./assets/imgs/lang/\'+ currentLanguage +\'.png)\'}" (click)="showLanguageMenu()"></button>\n\n</ion-fab>\n\n'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\langComponent\langComponent.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["PopoverController"], __WEBPACK_IMPORTED_MODULE_4__app_BootstrapFirstRun__["a" /* CustomBootstrap */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["ViewController"]])
    ], langComponent);
    return langComponent;
}());

//# sourceMappingURL=langComponent.js.map

/***/ }),

/***/ 641:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SuppressEvents; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by shadow-viper on 1/7/18.
 */

var SuppressEvents = /** @class */ (function () {
    function SuppressEvents(element) {
        this.element = element;
        this.onClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    SuppressEvents.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.suppressEvents) {
            if (changes.suppressEvents.firstChange) {
                var el = this.element.nativeElement;
                if (this.suppressEvents == "all" || this.suppressEvents == null) {
                    this.suppressEvents = ["click", "mousedown", "touchdown", "touchmove", "touchstart"];
                }
                else if (typeof this.suppressEvents == "string") {
                    this.suppressEvents = [this.suppressEvents];
                }
                else if (typeof this.suppressEvents == "object" && !Array.isArray(this.suppressEvents)) {
                    var r = [];
                    for (var _i = 0, _a = this.suppressEvents; _i < _a.length; _i++) {
                        var e = _a[_i];
                        r.push(e);
                    }
                    this.suppressEvents = r;
                }
                for (var _b = 0, _c = this.suppressEvents; _b < _c.length; _b++) {
                    var evName = _c[_b];
                    el.addEventListener(evName, function (event) {
                        _this.stopBubble(event);
                    });
                }
                el.addEventListener('touchend', function (event) {
                    _this.stopBubble(event);
                    _this.onClick.emit(event);
                });
                el.addEventListener('mouseup', function (event) {
                    _this.onClick.emit(event);
                });
            }
        }
    };
    SuppressEvents.prototype.stopBubble = function (event) {
        event.preventDefault();
        event.stopPropagation(); //Stops event bubbling
    };
    SuppressEvents = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[suppressEvents]',
            inputs: ["suppressEvents"],
            outputs: ["onClick"]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], SuppressEvents);
    return SuppressEvents;
}());

//# sourceMappingURL=directive.js.map

/***/ }),

/***/ 644:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return beachUmbrella; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Created by shadow-viper on 1/22/18.
 */
var beachUmbrella = /** @class */ (function () {
    function beachUmbrella() {
        this.changes = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.umbrellaData = null;
        this.data = null;
        this.sides = ['center', 'left', 'right'];
        this.sideConfigs = {
            left: ['a'],
            right: ['b'],
            center: ['m', 'n', 'o']
        };
        this.bookingStatus = {
            left: false,
            right: false,
            center: false
        };
        this.singleSeat = false;
        this.seatCount = 0;
    }
    Object.defineProperty(beachUmbrella.prototype, "ReceivedEvent", {
        get: function () {
            return this.umbrellaData;
        },
        set: function (data) {
            this.umbrellaData = data;
            this.viewInit();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(beachUmbrella.prototype, "ViewData", {
        get: function () {
            return this.data;
        },
        set: function (data) {
            this.data = data.data;
            var eleList = data.data.info.mapElement.list;
            this.eleList = eleList;
            if (eleList && eleList.umbrella.length) {
                this.umbrella = eleList.umbrella[0];
            }
            var obj = eleList.center[0];
            if (eleList.center && eleList.center.length == 1) {
                this.singleSeat = true;
            }
            this.seatCount = this.data.seats;
            this.updateStatus();
            this.viewInit();
        },
        enumerable: true,
        configurable: true
    });
    beachUmbrella.prototype.updateStatus = function () {
        var _this = this;
        this.zone = this.data.coords.zone;
        var _loop_1 = function (i) {
            var side = this_1.sides[i];
            var list = this_1.eleList[side];
            var status_1 = '';
            this_1.sideConfigs[side].map(function (sideConfig) {
                if (!status_1 && _this.data.status[sideConfig] && _this.data.status[sideConfig].length) {
                    status_1 = sideConfig;
                }
            });
            var statuses = this_1.data.status[status_1];
            for (var j = 0; j < list.length; j++) {
                var li = list[j];
                li.status = statuses[j];
                if (li.status && li.status != 'available') {
                    this_1.bookingStatus[side] = true;
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.sides.length; i++) {
            _loop_1(i);
        }
        this.changes.emit({
            bookingStatus: this.bookingStatus,
            data: this.data,
            zone: this.zone
        });
    };
    beachUmbrella.prototype.submitStatus = function () {
        var _this = this;
        var _loop_2 = function (i) {
            var side = this_2.sides[i];
            var list = this_2.eleList[side];
            var status_2 = '';
            this_2.sideConfigs[side].map(function (sideConfig) {
                if (!status_2 && _this.data.status[sideConfig] && _this.data.status[sideConfig].length) {
                    status_2 = sideConfig;
                }
            });
            var statuses = this_2.data.status[status_2];
            for (var j = 0; j < list.length; j++) {
                var li = list[j];
                if (li.status == 'available' || li.status == 'selected') {
                    statuses[j] = li.status;
                }
            }
        };
        var this_2 = this;
        for (var i = 0; i < this.sides.length; i++) {
            _loop_2(i);
        }
    };
    beachUmbrella.prototype.viewInit = function () {
        if (!(this.umbrellaData && this.data)) {
            return false;
        }
    };
    beachUmbrella.prototype.clickSunbed = function (data) {
        data.status = (data.status == 'available') ? 'selected' : 'available';
        this.submitStatus();
        this.changes.emit({
            bookingStatus: this.bookingStatus,
            data: this.data
        });
    };
    beachUmbrella.prototype.Select = function (type, selected) {
        if (type && selected && this.umbrellaData.status != 'change-request') {
            if (this.umbrellaData[type] && this.umbrellaData[type][selected] && this.umbrellaData[type][selected] == 'free') {
                if (selected == 'first' || selected == 'second') {
                    this.umbrellaData.umbrella.left = 'selected';
                }
                if (selected == 'third' || selected == 'fourth') {
                    this.umbrellaData.umbrella.right = 'selected';
                }
                this.umbrellaData[type][selected] = 'selected';
            }
            else if (this.umbrellaData[type] && this.umbrellaData[type][selected] && this.umbrellaData[type][selected] == 'selected') {
                this.umbrellaData[type][selected] = 'free';
            }
            if ((this.umbrellaData.seats.first == '' || this.umbrellaData.seats.first == 'free') && this.umbrellaData.seats.second == 'free') {
                this.umbrellaData.umbrella.left = 'free';
            }
            if (this.umbrellaData.seats.third == 'free' && (this.umbrellaData.seats.fourth == '' || this.umbrellaData.seats.fourth == 'free')) {
                this.umbrellaData.umbrella.right = 'free';
            }
            this.changes.emit(this.umbrellaData);
        }
    };
    beachUmbrella.prototype.getUmbrellaClass = function () {
        this.umbrellaClass = this.umbrellaData ? [this.umbrellaData.umbrella.left + 1, this.umbrellaData.umbrella.right + 2] : 'free1 free2';
        return this.umbrellaClass;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], beachUmbrella.prototype, "changes", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], beachUmbrella.prototype, "ReceivedEvent", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], beachUmbrella.prototype, "ViewData", null);
    beachUmbrella = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'beach-umbrella',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\beach-umbrella\beach-umbrella.html"*/'<ng-template #SunBed let-sunbedData>\n\n  <div (click)="bookingStatus[side] || clickSunbed(sunbedData.data)" class="sunbed sunbed-{{sunbedData.side}} sunbed-seat-{{seatCount}}">\n\n    <img class="sunbed-img {{sunbedData.data.status}}" [src]="sunbedData.data.src">\n\n  </div>\n\n</ng-template>\n\n\n\n<div class="interactiveSelect">\n\n  <div class="selection-div">\n\n    <div class="umbrella-div" *ngIf="umbrella">\n\n      <div class="umbrella-inner-div">\n\n        <img [src]="umbrella.src" class="umbrella-img">\n\n      </div>\n\n    </div>\n\n\n\n    <div class="sunbed-div">\n\n      <div class="sunbed-inner-div">\n\n        <ng-container *ngFor="let side of sides;">\n\n          <div class="sunbed-div-{{side}} {{\'booked-\'+bookingStatus[side]}}" *ngIf="eleList[side] && eleList[side].length">\n\n            <ng-container *ngFor="let item of eleList[side];let ind=index;">\n\n              <ng-container *ngTemplateOutlet="SunBed; context:{$implicit:{side:side, data: item, index: ind}}"></ng-container>\n\n            </ng-container>\n\n          </div>\n\n        </ng-container>\n\n      </div>\n\n\n\n    </div>\n\n    <div class="clear-both"></div>\n\n  </div>\n\n</div>\n\n\n\n\n\n\n\n\n\n<!--\n\n\n\n  \n\n<div class="interactiveSelect">\n\n  <div class="umbrella " [ngClass]="umbrellaClass || getUmbrellaClass()">\n\n    <div class="left"></div>\n\n    <div class="right"></div>\n\n  </div>\n\n  <div class="seats" *ngIf="umbrellaData">\n\n    <div class="column left" [ngClass]="umbrellaData.seats.first" (click)="Select(\'seats\',\'first\')"></div>\n\n    <div class="column left" [ngClass]="umbrellaData.seats.second" (click)="Select(\'seats\',\'second\')"></div>\n\n    <div class="column right" [ngClass]="umbrellaData.seats.third" (click)="Select(\'seats\',\'third\')"></div>\n\n    <div class="column right" [ngClass]="umbrellaData.seats.fourth" (click)="Select(\'seats\',\'fourth\')"></div>\n\n  </div>\n\n</div>\n\n\n\n\n\n-->'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\beach-umbrella\beach-umbrella.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], beachUmbrella);
    return beachUmbrella;
}());

//# sourceMappingURL=beach-umbrella.js.map

/***/ }),

/***/ 645:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return firstPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Created by shadow-viper on 1/26/18.
 */
var firstPage = /** @class */ (function () {
    function firstPage() {
        this.gridElement = {
            front: [
                { type: "baldaquin", icon: "4.png", coords: { y: 74, x: 46 } },
                { type: "umbrella", icon: "44.png", coords: { y: 62, x: 8 } },
                { type: "umbrella", icon: "4444.png", coords: { y: 144, x: 107 } },
                { type: "umbrella", icon: "4444.png", coords: { y: 72, x: 113 } }
            ]
        };
    }
    firstPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'firstPage',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\firstPage\firstPage.html"*/'<ion-header class="has-shadow">\n\n\n\n  <ion-navbar>\n\n    <ion-title>{{ title }}</ion-title>\n\n    <ion-buttons end>\n\n\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div class="relative">\n\n    <div class="absolute" *ngFor="let item of gridElement.front" [ngStyle]="{\'-webkit-transform\':\'translate3d(\'+item.coords.x+\'px,\'+item.coords.y+\'px,0)\'}"><img src="./assets/imgs/beach-icons/{{ item.type }}/{{ item.icon }}"/></div>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\firstPage\firstPage.html"*/
        })
    ], firstPage);
    return firstPage;
}());

//# sourceMappingURL=firstPage.js.map

/***/ }),

/***/ 646:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Geo; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_geolocation__ = __webpack_require__(71);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Geo = /** @class */ (function () {
    function Geo(geolocation) {
        this.geolocation = geolocation;
    }
    Geo.prototype.deviceGeolocation = function () {
        return this.geolocation.getCurrentPosition({ timeout: 30000 });
    };
    Geo = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_geolocation__["a" /* Geolocation */]])
    ], Geo);
    return Geo;
}());

//# sourceMappingURL=geolocation.js.map

/***/ }),

/***/ 647:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlaceMapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_tools__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_debounceTime__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_BootstrapFirstRun__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var PlaceMapPage = /** @class */ (function () {
    function PlaceMapPage(configuration, navCtrl, appCtrl, navParams, tool, api) {
        this.configuration = configuration;
        this.navCtrl = navCtrl;
        this.appCtrl = appCtrl;
        this.navParams = navParams;
        this.tool = tool;
        this.api = api;
    }
    PlaceMapPage.prototype.ionViewDidLoad = function () {
    };
    PlaceMapPage.prototype.ionViewWillEnter = function () {
    };
    PlaceMapPage.prototype.goBack = function () {
        if (this.navCtrl.canGoBack()) {
            this.navCtrl.pop();
        }
        else {
            this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */], {}, { direction: 'back' });
        }
    };
    PlaceMapPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'place-map',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\place-map\place-map.html"*/'\n\n\n\n<ion-content>\n\n  <img src="assets/imgs/sample-map.png" />\n\n</ion-content>\n\n'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\place-map\place-map.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__app_BootstrapFirstRun__["a" /* CustomBootstrap */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["App"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_3__providers_tools__["a" /* Tools */],
            __WEBPACK_IMPORTED_MODULE_4__providers_services__["a" /* ApiProvider */]])
    ], PlaceMapPage);
    return PlaceMapPage;
}());

//# sourceMappingURL=place-map.js.map

/***/ }),

/***/ 648:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchResultIncludeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__beach_beach__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__rating_rating__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__beachView_beachView__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_BootstrapFirstRun__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__searchDupplication_searchDupplication__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_launch_navigator__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__search_results_search_results__ = __webpack_require__(69);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var SearchResultIncludeComponent = /** @class */ (function () {
    function SearchResultIncludeComponent(navCtrl, navParams, api, popoverCtrl, configuration, translate, events, geolocation, platform, launchNavigator, search) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.api = api;
        this.popoverCtrl = popoverCtrl;
        this.configuration = configuration;
        this.translate = translate;
        this.events = events;
        this.geolocation = geolocation;
        this.platform = platform;
        this.launchNavigator = launchNavigator;
        this.search = search;
        this.title = "";
        this.infiniteCount = 10;
        this.direction = [];
        this._noResponse = false;
        this.enteredGrid = false;
        this._169 = (document.body.clientWidth * 9) / 16;
        this.filters = [];
        this.beach_settings = [];
        this.carouselTile = {
            grid: { xs: 1, sm: 1, md: 3, lg: 3, all: 0 },
            slide: 3,
            speed: 250,
            point: {
                visible: false
            },
            load: 2,
            velocity: 0,
            touch: true,
            easing: "cubic-bezier(0, 0, 0.2, 1)"
        };
        this.SearchResult = [];
        this.SearchObj = [];
        this.beach_settings = JSON.parse(localStorage.getItem('beachsettings') || '[]');
        // this.configuration.getStorage('Filters').then(r => {
        //     if (r && r.filterMock) {
        //         this.filters = r.filterMock.filter.filter(item => {
        //             if (item) {
        //                 return item;
        //             }
        //         });
        //     }
        // });
    }
    SearchResultIncludeComponent.prototype.ngOnInit = function () { };
    SearchResultIncludeComponent.prototype.ionViewWillEnter = function () {
        this._noResponse = false;
    };
    SearchResultIncludeComponent.prototype.next = function (id, data1, title, $event) {
        var _this = this;
        if (data1.closed ||
            $event.target.closest(".star-rating") ||
            $event.target.closest(".direction-btn-holder") ||
            $event.target.closest(".arrow")) {
            return false;
        }
        this.setCurrencyByBeach(id);
        this.search.sub1$.unsubscribe();
        this.search.sub2$.unsubscribe();
        if (!this.enteredGrid) {
            this.configuration.getStorage("reserv_endDate").then(function (data) {
                var timezoneOffsetHours = new Date().getTimezoneOffset() / 60;
                var alreadyEDate = data === "0"
                    ? undefined
                    : new Date(new Date(data).setHours(new Date(data).getHours() + timezoneOffsetHours)).getDate();
                var newSDate = new Date(_this.SearchObj.start_date).getDate();
                var endSDate = new Date(_this.SearchObj.end_date).getDate();
                _this.configuration
                    .getStorage("reservation")
                    .then(function (reservation) {
                    var sameBeach = reservation && reservation.beach_id === id;
                    if (sameBeach &&
                        alreadyEDate &&
                        (newSDate <= alreadyEDate && alreadyEDate <= endSDate)) {
                        var popoverSignup = _this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_9__searchDupplication_searchDupplication__["a" /* searchDupplication */], {
                            msg: _this.translate.instant("DUPPLICATED_RESERVATION_DETECT")
                        });
                        popoverSignup.present();
                        return;
                    }
                    _this.SearchObj.waiter_id = _this.SearchResult.waiter_id;
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__beach_beach__["a" /* BeachPage */], {
                        id: id,
                        data: data,
                        title: _this.title,
                        title2: title,
                        SearchObj: _this.SearchObj,
                        context: "search"
                    });
                })
                    .catch(function (error) {
                    if (alreadyEDate &&
                        (newSDate <= alreadyEDate && alreadyEDate <= endSDate)) {
                        var popoverSignup = _this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_9__searchDupplication_searchDupplication__["a" /* searchDupplication */], {
                            msg: _this.translate.instant("DUPPLICATED_RESERVATION_DETECT")
                        });
                        popoverSignup.present();
                        return;
                    }
                    _this.SearchObj.waiter_id = _this.SearchResult.waiter_id;
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__beach_beach__["a" /* BeachPage */], {
                        id: id,
                        data: data,
                        title: _this.title,
                        title2: title,
                        SearchObj: _this.SearchObj,
                        context: "search"
                    });
                });
            });
        }
        this.enteredGrid = true;
        setTimeout(function () {
            _this.enteredGrid = false;
        }, 1000);
    };
    SearchResultIncludeComponent.prototype.setCurrencyByBeach = function (id) {
        var ss = this.beach_settings.find(function (item) {
            return item.beach_id == id;
        });
        this.configuration.currency = ss.currency;
    };
    Object.defineProperty(SearchResultIncludeComponent.prototype, "searchInput", {
        get: function () {
            return this.SearchResult;
        },
        set: function (data) {
            this.SearchResult = data;
        },
        enumerable: true,
        configurable: true
    });
    SearchResultIncludeComponent.prototype.more = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            if (_this.SearchResult.length) {
                _this.infiniteCount += 10;
                infiniteScroll.complete();
                if (_this.infiniteCount >= _this.SearchResult.length) {
                    infiniteScroll.enable(false);
                    _this.infiniteCount = _this.SearchResult.length;
                }
            }
        }, 300);
    };
    SearchResultIncludeComponent.prototype.rating = function (id) {
        this.search.sub1$.unsubscribe();
        this.search.sub2$.unsubscribe();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__rating_rating__["a" /* ratingPage */], { id: id, title: this.title });
    };
    Object.defineProperty(SearchResultIncludeComponent.prototype, "Title", {
        get: function () {
            return this.title;
        },
        set: function (data) {
            this.title = data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchResultIncludeComponent.prototype, "SearchParam", {
        get: function () {
            return this.SearchObj;
        },
        set: function (data) {
            this.SearchObj = data;
        },
        enumerable: true,
        configurable: true
    });
    SearchResultIncludeComponent.prototype.convertInt = function (data) {
        return data | 0;
    };
    SearchResultIncludeComponent.prototype.getBeachWorkingHours = function (id) {
        var workingHours;
        this.beach_settings.map(function (beach) {
            if (beach.beach_id === id) {
                workingHours = beach.working_hours || {};
            }
        });
        return workingHours;
    };
    SearchResultIncludeComponent.prototype.getRating = function (rate, num) {
        var star = "beach-star-0";
        if (Math.floor(rate) >= num) {
            star = "beach-star-100";
        }
        else {
            if (num - rate > 1) {
                star = "beach-star-0";
            }
            else {
                star = "beach-star-" + (100 - Math.floor(((num - rate) * 100) / 25) * 25);
            } //i forgot about < > arrows if the user will click on it. now it goes into the beach page
        }
        return star;
    };
    SearchResultIncludeComponent.prototype.beachModal = function (id) {
        var _this = this;
        var beachM = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_5__beachView_beachView__["a" /* BeachView */], { beach_id: id }, { cssClass: "imgPop" });
        beachM.onDidDismiss(function (data) {
            _this.search.getGeolocation(true);
        });
        beachM.present();
    };
    SearchResultIncludeComponent.prototype.BeachCordinates = function (beach_id) {
        for (var i in this.beach_settings) {
            if (this.beach_settings.hasOwnProperty(i)) {
                if (this.beach_settings[i] &&
                    this.beach_settings[i].beach_id == beach_id) {
                    return this.beach_settings[i];
                }
            }
        }
    };
    SearchResultIncludeComponent.prototype.openNavigator = function (beach, type) {
        var _this = this;
        var beachCord = this.BeachCordinates(beach.id);
        if (beachCord.latitude) {
            //this.api.AmBusy('');
            this.geolocation
                .getCurrentPosition()
                .then(function (myPosition) {
                var options = {
                    start: myPosition.coords.latitude + ", " + myPosition.coords.longitude,
                    app: _this.launchNavigator.APP.GOOGLE_MAPS,
                    transportMode: type == "walking"
                        ? _this.launchNavigator.TRANSPORT_MODE.WORKING
                        : _this.launchNavigator.TRANSPORT_MODE.DRIVING
                }; //id585027354
                _this.launchNavigator
                    .navigate(beachCord.latitude + ", " + beachCord.longitude, options)
                    .then(function (success) {
                    //this.api.AmBusy('',true);
                }, function (error) {
                    //this.api.AmBusy('',true);
                });
            })
                .catch(function (err) {
                //this.api.AmBusy('',true);
            });
        }
    };
    Object.defineProperty(SearchResultIncludeComponent.prototype, "noResponse", {
        get: function () {
            return this._noResponse;
        },
        set: function (value) {
            this._noResponse = value;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], SearchResultIncludeComponent.prototype, "searchInput", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], SearchResultIncludeComponent.prototype, "Title", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], SearchResultIncludeComponent.prototype, "SearchParam", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], SearchResultIncludeComponent.prototype, "noResponse", null);
    SearchResultIncludeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "app-search-result-include",template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\searchResultNew\searchResultInclude.component.html"*/'<p text-center *ngIf="(!SearchResult || !SearchResult.length)  && noResponse">{{ \'NO_BEACH_FOUND_ON_YOUR_SEARCH\' |\n\n    translate }}</p>\n\n\n\n<div *ngIf="SearchResult" class="main-container">\n\n\n\n    <ion-card *ngFor="let beach of (SearchResult)| slice:0:infiniteCount  let i =index " (click)="next(beach.id,beach,beach.name,$event)">\n\n\n\n        <div class="has-closed" *ngIf="beach.closed">\n\n            <div class="inner-closed">\n\n                {{\'BEACH_CLOSED_LABLE\' | translate}}\n\n                <div class="hours"> \n\n                    <!-- {{\'WORKING_HOURS\' | translate}} : {{beach.settings.working_hours.start}} - {{beach.settings.working_hours.end}} -->\n\n                </div>\n\n            </div>\n\n        </div>\n\n\n\n        <div class="result-header">\n\n            <h3>{{beach.name}}</h3>\n\n        </div>\n\n        <div class="result-body">\n\n            <div class="has-promotion" *ngIf="beach.promoted">\n\n                <div class="inner-promotion">\n\n                    Promoted\n\n                </div>\n\n            </div>\n\n\n\n            <div class="image-holder">\n\n                <ngx-carousel class="banner" [inputs]="carouselTile">\n\n                    <ngx-item NgxCarouselItem *ngFor="let tile of beach.images; let i = index;">\n\n                        <div class="ngx-img-div" [ngStyle]="{height:_169+\'px\', \'background-image\':\'url(\'+tile.url+\')\'}">\n\n                        </div>\n\n                    </ngx-item>\n\n                    <button NgxCarouselPrev class="leftRs arrow">\n\n                        <ion-icon name="ios-arrow-back"></ion-icon>\n\n                    </button>\n\n                    <button NgxCarouselNext class="rightRs arrow">\n\n                        <ion-icon name="ios-arrow-forward"></ion-icon>\n\n                    </button>\n\n                </ngx-carousel>\n\n            </div>\n\n        </div>\n\n\n\n        <div class="result-footer">\n\n            <ion-row>\n\n                <ion-col col-8>\n\n\n\n                    <div class="star-rating" (click)="rating(beach.id)">\n\n                        <p text-center class="reviews" (click)="rating(beach.id)">({{beach.rating_count}})</p>\n\n\n\n                        <ion-icon [name]="getRating(beach.rating,1)" [class.full]="beach.rating>0"></ion-icon>\n\n                        <ion-icon [name]="getRating(beach.rating,2)" [class.full]="beach.rating>1"></ion-icon>\n\n                        <ion-icon [name]="getRating(beach.rating,3)" [class.full]="beach.rating>2"></ion-icon>\n\n                        <ion-icon [name]="getRating(beach.rating,4)" [class.full]="beach.rating>3"></ion-icon>\n\n                        <ion-icon [name]="getRating(beach.rating,5)" [class.full]="beach.rating>4"></ion-icon>\n\n                    </div>\n\n\n\n                    <div class="features">\n\n                        <ion-icon *ngFor="let option of beach.features" name="option-{{option}}"></ion-icon>\n\n\n\n                    </div>\n\n                </ion-col>\n\n                <ion-col col-4>\n\n                    <div class="direction-btn-holder" *ngIf="beach.geometrical_data && beach.geometrical_data.driving">\n\n                        <button ion-button round (click)="openNavigator(beach,\'driving\')"><img class="direction-image"\n\n                                src="./assets/imgs/direction.png"><span class="direction-text">{{ \'GET_DIRECTION\'\n\n                                |translate }}</span></button>\n\n                    </div>\n\n                    <div class="direction-location-text" *ngIf="beach.geometrical_data && beach.geometrical_data.driving">\n\n                        {{ beach.geometrical_data.driving.duration }} ({{ beach.geometrical_data.driving.distance}})\n\n                    </div>\n\n                </ion-col>\n\n            </ion-row>\n\n        </div>\n\n\n\n    </ion-card>\n\n</div>'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\searchResultNew\searchResultInclude.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_4__providers_services__["a" /* ApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["PopoverController"],
            __WEBPACK_IMPORTED_MODULE_6__app_BootstrapFirstRun__["a" /* CustomBootstrap */],
            __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_launch_navigator__["a" /* LaunchNavigator */],
            __WEBPACK_IMPORTED_MODULE_11__search_results_search_results__["a" /* SearchResultsPage */]])
    ], SearchResultIncludeComponent);
    return SearchResultIncludeComponent;
}());

//# sourceMappingURL=searchResultInclude.component.js.map

/***/ }),

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return confirmVerification; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_BootstrapFirstRun__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Created by shadow-viper on 12/31/17.
 */
var confirmVerification = /** @class */ (function () {
    function confirmVerification(navCtrl, viewCtrl, navparam, api, configuration) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.navparam = navparam;
        this.api = api;
        this.configuration = configuration;
    }
    confirmVerification.prototype.gotoVerification = function () {
        var _this = this;
        if (this.navparam.get('process')) {
            console.log("123", this.navparam.get('process'));
            this[this.navparam.get('process').fn](this.navparam.get('process').data, function (phoneDt) {
                _this.navCtrl.push(_this.navparam.get('page'), { page: _this.navparam.get('next'), mobile: phoneDt.phone, prefix: phoneDt.prefix, suffix: phoneDt.suffix, user: _this.navparam.data.userData });
            });
            return;
        }
        this.navCtrl.push(this.navparam.get('page'), { page: this.navparam.get('next') });
    };
    confirmVerification.prototype.close = function (accept) {
        this.viewCtrl.dismiss(accept);
    };
    confirmVerification.prototype.reset = function (data, successCallback) {
        var _this = this;
        data.phone = data.phone.replace(')', '').replace('(', '').replace(/\s/g, '');
        this.api.post('forgot', data, { 'Content-Type': 'application/json' }).subscribe(function (r) {
            _this.sendVerification(data, successCallback);
            // }}])
        }, function (error) {
            _this.close(false);
        });
    };
    confirmVerification.prototype.sendVerification = function (data, successCallback) {
        var _this = this;
        this.api.post('request-validation', data, { 'Content-Type': 'application/json' }).subscribe(function (r) {
            console.log("1234", r);
            _this.configuration.setStorage("phoneData", data);
            _this.configuration.setStorage('smsValidation', r);
            successCallback(data);
            _this.close(true);
        }, function (error) {
        });
    };
    confirmVerification.prototype.SignupVerification = function (data, successCallback) {
        this.sendVerification(data, successCallback);
    };
    confirmVerification = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'confirmVerification',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\confirmVerification\confirmVerification.html"*/'<ion-list>\n\n  <h4 ion-text color="primary">{{ \'SMS_VERIFICATION\' |translate }}</h4>\n\n\n\n  <p>{{ "SMART_BEACH_WILL_SEND_YOU_AN_SMS_MESSAGE_TO_VERIFY_YOUR_PHONE_NUMBER" |translate }}</p>\n\n\n\n  <div class="buttons">\n\n    <button ion-button (click)="close()">{{ \'CANCEL\'|translate }}</button>\n\n    <button ion-button (click)="gotoVerification()">{{ \'OK\' |translate }}</button>\n\n  </div>\n\n</ion-list>\n\n'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\confirmVerification\confirmVerification.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_services__["a" /* ApiProvider */], __WEBPACK_IMPORTED_MODULE_3__app_BootstrapFirstRun__["a" /* CustomBootstrap */]])
    ], confirmVerification);
    return confirmVerification;
}());

//# sourceMappingURL=confirmVerification.js.map

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainGuestPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signup_signup__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_BootstrapFirstRun__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__tabs_tabs__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_device__ = __webpack_require__(155);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MainGuestPage = /** @class */ (function () {
    //device :any;
    function MainGuestPage(navCtrl, api, configuration, device) {
        this.navCtrl = navCtrl;
        this.api = api;
        this.configuration = configuration;
        this.device = device;
        this.guestCode = false;
        this.height = window.innerHeight;
        // this.configuration.getStorage('deviceInfo').then(device => {
        //     this.device = device;
        // });
    }
    MainGuestPage.prototype.onLanguageChanged = function (event) {
    };
    MainGuestPage.prototype.goSignup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__signup_signup__["a" /* SignupPage */]);
    };
    MainGuestPage.prototype.goLogin = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
    };
    MainGuestPage.prototype.toggleGuest = function () {
        var _this = this;
        event.stopPropagation();
        event.preventDefault();
        this.guestCode = !this.guestCode;
        if (this.guestCode) {
            setTimeout(function () {
                _this.guestInput.setFocus();
            }, 200);
        }
    };
    MainGuestPage.prototype.eventHandler = function () {
        if (this.guestInput.value != "" || this.guestCode == false) {
            return false;
        }
        // if(this.guestCode == true){
        //     return false;
        // }
        this.guestCode = !this.guestCode;
    };
    // public focusEvent(){
    //     event.stopPropagation();
    //     event.preventDefault();
    //     return false;
    // }
    MainGuestPage.prototype.guestLogin = function (tour) {
        // if(this.guestInput.value == ""){
        //     setTimeout(() => {
        //         this.guestCode = !this.guestCode;
        //     }, 200)
        var _this = this;
        // }
        this.configuration.getDeviseInfo().then(function (device) {
            console.log(_this.guestInput.value);
            console.log(device.uuid);
            _this.api.post('guest-login', {
                code: tour ? 'tour' : _this.guestInput.value,
                //device_uuid: this.device.uuid  ? this.device.uuid  : 'empty'
                device_uuid: _this.device.uuid
                //this is for "tour" ...right ?
            }, { 'Content-Type': 'application/json' }).subscribe(function (r) {
                if (_this.currentLanguage) {
                    r.lang = _this.currentLanguage;
                }
                localStorage.setItem('guest_code', _this.guestInput.value);
                _this.configuration.setStorage('login', r);
                r.canUse = true;
                _this.configuration.getStorage('AdditionalRegData').then(function (res) {
                    _this.configuration.setStorage('UserPhoneInfo', res).then(function (reg) {
                        _this.configuration.setStorage('AdditionalRegData', r).then(function (a) {
                            //user can reuse mobile now
                            if (_this.api.fcmToken) {
                                setTimeout(function () {
                                    _this.api.get("fcm/" + _this.api.fcmToken, {}, {}, true).subscribe(function (res) {
                                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__tabs_tabs__["a" /* TabsPage */], { reservation: r.reservations });
                                    }, function (error) {
                                        alert(error.message);
                                        setTimeout(function () {
                                            _this.guestInput.setFocus();
                                        }, 200);
                                    });
                                }, 500);
                            }
                            else {
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__tabs_tabs__["a" /* TabsPage */], { reservation: r.reservations });
                                setTimeout(function () {
                                    _this.guestInput.setFocus();
                                }, 200);
                            }
                        });
                    });
                });
            }, function (error) {
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('guestInput'),
        __metadata("design:type", Object)
    ], MainGuestPage.prototype, "guestInput", void 0);
    MainGuestPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-main-guest-page',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\main-guest-page\main-guest-page.component.html"*/'<ion-content [ngStyle]="{ height: height + \'px !important\' }">\n  <langComponent [refresh]="toggleLanguage" [page]="\'signup\'" (pushLang)="onLanguageChanged($event)"></langComponent>\n\n  <div class="inner-body-content" (click)="eventHandler()">\n    <ion-list>\n      <h1 text-center margined>{{ "SMART_BEACH" | translate }}</h1>\n\n      <ion-item no-lines class="button-like slide-guest">\n        <button ion-button round full color="primary" class="guest-toggle" [ngClass]="guestCode ? \'\' : \'active\'"\n          (click)="toggleGuest()">\n          Guest code\n        </button>\n        <ion-item no-lines class="button-like guest-toggle guestinput" [ngClass]="guestCode ? \'active\' : \'\'">\n          <ion-input  type="number" (keyup.enter)="guestLogin(false)()" #guestInput></ion-input>\n          <button ion-button item-content color="primary" class="text-dark" (click)="guestLogin(false)">\n            Go\n          </button>\n        </ion-item>\n      </ion-item>\n\n      <button ion-button full round color="primary" (click)="goLogin()">\n        Sign in\n      </button>\n\n      <button ion-button round full color="primary" (click)="goSignup()">\n        Register\n      </button>\n\n      <button ion-button full color="primary" class="text-dark" round (click)="guestLogin(true)">\n        Make a tour\n      </button>\n    </ion-list>\n  </div>\n</ion-content>'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\main-guest-page\main-guest-page.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_4__providers_services__["a" /* ApiProvider */],
            __WEBPACK_IMPORTED_MODULE_5__app_BootstrapFirstRun__["a" /* CustomBootstrap */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_device__["a" /* Device */]])
    ], MainGuestPage);
    return MainGuestPage;
}());

//# sourceMappingURL=main-guest-page.component.js.map

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgreementHelper; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_BootstrapFirstRun__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__includes_searchDupplication_searchDupplication__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AgreementHelper = /** @class */ (function () {
    function AgreementHelper(api, configuration, events, alertCtrl, popoverCtrl, translate, splashScreen, app) {
        this.api = api;
        this.configuration = configuration;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.popoverCtrl = popoverCtrl;
        this.translate = translate;
        this.splashScreen = splashScreen;
        this.app = app;
        this.search = {};
        this.location = "";
        this.data = [];
        this.title = "";
        this.index = "0";
        this.startEndDate = { start: "", end: "" };
        this.settings = [];
        this.total = 0;
        this.beach_settings = [];
        this.customer = [];
        this.selected = 1;
        this.extra = 0;
        this.number = 0;
        this.seats_num = 0;
        this.price = 0;
        this.extraPrice = 0;
        this.beach_settings = JSON.parse(localStorage.getItem('beachsettings') || '[]');
    }
    AgreementHelper.prototype.setup = function () {
        var _this = this;
        this.search = this.navparam.search;
        this.location = this.navparam.location;
        this.data = this.navparam.data;
        this.title = this.navparam.title;
        this.index = this.navparam.index;
        this.settings = this.navparam.settings;
        this.selected = this.navparam.selected;
        this.extra = this.navparam.extra;
        this.total = this.navparam.total;
        this.status = this.navparam.status;
        this.slots = this.navparam.slots;
        this.zone = this.navparam.zone;
        this.number = this.navparam.number;
        this.seats_num = this.navparam.seats;
        this.price = this.navparam.data.price;
        this.extraPrice = this.navparam.data.extra_price;
        if (this.slots.a) {
            this.slots.a = [].concat(this.slots.a.reverse());
        }
        this.startDate();
        this.configuration.getStorage("login").then(function (a) {
            if (a && a.token) {
                _this.customer = a;
                // TODO:// Change message accordingly
                if (_this.customer.tour) {
                    var popoverSignup = _this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_5__includes_searchDupplication_searchDupplication__["a" /* searchDupplication */], {
                        msg: _this.translate.instant("BOOKING_PERMISSION"),
                        redirect: true
                    });
                    popoverSignup.present();
                }
                else {
                    _this.doReservation();
                }
            }
        }, function (error) { });
    };
    AgreementHelper.prototype.doReservation = function () {
        var _this = this;
        if (!this._navparam || !this._navCtrl || !this.navparam.data) {
            return;
        }
        this.data = this.data.data ? this.data.data : this.data;
        var reservationCopy = JSON.parse(JSON.stringify(this[this.data.type]()));
        var reservation = this[this.data.type]();
        reservation.start_date = this.getLocalDateTime(reservation.start_date);
        reservation.end_date = this.getLocalDateTime(reservation.end_date);
        reservation.seat.slots = this.slots;
        reservation.seat.index = this.index;
        reservation.seat.zone = this.zone;
        reservation.seat.number = this.number;
        reservation.seat.seats_num = this.seats_num;
        reservation.avg_price = this.price;
        reservation.extra_price = this.extraPrice;
        delete reservation.seat.position;
        this.api.post("booking", reservation, {}, false, true).subscribe(function (r) {
            _this._navCtrl.popToRoot();
            reservationCopy.name = _this.data.each_name;
            _this.configuration.setStorage("reservation", reservationCopy).then(function () {
                _this.events.publish("reservation:cancel");
            }, function (error) { });
            _this._navparam = {};
        }, function (error) {
            if (error.message === "CUSTOMER_NO_PHOTO") {
                var alert_1 = _this.alertCtrl.create({
                    title: "",
                    message: _this.translate.instant("CUSTOMER_NO_PHOTO"),
                    enableBackdropDismiss: false,
                    buttons: [
                        {
                            text: _this.translate.instant("YES"),
                            handler: function () {
                                _this.events.publish("tab:select", 3);
                            }
                        },
                        {
                            text: _this.translate.instant("NO"),
                            handler: null
                        }
                    ]
                });
                alert_1.present();
            }
            else {
                var alert_2 = _this.alertCtrl.create({
                    title: "",
                    message: error.message,
                    enableBackdropDismiss: false,
                    buttons: [
                        {
                            text: _this.translate.instant("CLOSE"),
                            handler: function () { }
                        }
                    ]
                });
                alert_2.present();
            }
        });
    };
    AgreementHelper.prototype.sunbed = function () {
        var date = this.dateint();
        return {
            broker_id: this.data.broker_id,
            waiter_id: this.data.waiter_id,
            beach_id: this.settings.beach_id,
            created_by: this.customer.id,
            seat: {
                type: this.data.type,
                count: this.selected
            },
            phone: this.customer.phone,
            start_date: date.start,
            end_date: date.end,
            amount: this.total
        };
    };
    AgreementHelper.prototype.umbrella = function () {
        var date = this.dateint();
        return {
            broker_id: this.data.broker_id,
            waiter_id: this.data.waiter_id,
            beach_id: this.settings.beach_id,
            created_by: this.customer.id,
            seat: {
                type: this.data.type,
                zone: this.location,
                number: this.index,
                slots: this.data.slots,
                extra_seats: this.navparam.extra,
                position: { x: this.data.coords.x, y: this.data.coords.y }
            },
            phone: this.customer.phone,
            start_date: date.start,
            end_date: date.end,
            amount: this.total
        };
    };
    AgreementHelper.prototype.baldaquin = function () {
        var date = this.dateint();
        return {
            broker_id: this.data.broker_id,
            waiter_id: this.data.waiter_id,
            beach_id: this.settings.beach_id,
            created_by: this.customer.id,
            seat: {
                type: this.data.type,
                zone: this.location,
                number: this.index,
                extra_seats: this.navparam.extra,
                position: { x: this.data.coords.x, y: this.data.coords.y }
            },
            phone: this.customer.phone,
            start_date: date.start,
            end_date: date.end,
            amount: this.total
        };
    };
    AgreementHelper.prototype.getBeachWorkingHours = function () {
        var workingHours;
        var self = this;
        this.beach_settings.map(function (beach) {
            if (beach.beach_id === self.settings.beach_id) {
                workingHours = beach.working_hours || {};
            }
        });
        return workingHours;
    };
    AgreementHelper.prototype.getLocalDateTime = function (date) {
        var dateObj = new Date(date);
        var hoursWithTimezone = dateObj.getHours() + -1 * (dateObj.getTimezoneOffset() / 60);
        return new Date(new Date(date).setHours(hoursWithTimezone)).getTime();
    };
    AgreementHelper.prototype.dateint = function (date) {
        if (this.search && this.search.start_date) {
            if (date) {
                return {
                    start: new Date(this.search.start_date),
                    end: new Date(this.search.end_date)
                };
            }
            return { start: this.search.start_date, end: this.search.end_date };
        }
        else {
            var date_1 = new Date();
            if (date_1) {
                return {
                    start: new Date(date_1.getDate()),
                    end: new Date(date_1.getDate())
                };
            }
            return { start: date_1.getMilliseconds(), end: date_1.getMilliseconds() };
        }
    };
    AgreementHelper.prototype.startDate = function () {
        var date = this.dateint(true);
        var start_date = date.start;
        var end_date = date.end;
        this.startEndDate = {
            start: start_date.getFullYear() + "." + (start_date.getMonth() +
                1) + "." + start_date.getDate(),
            end: end_date.getFullYear() + "." + (end_date.getMonth() +
                1) + "." + end_date.getDate()
        };
    };
    Object.defineProperty(AgreementHelper.prototype, "navparam", {
        get: function () {
            return this._navparam;
        },
        set: function (value) {
            this._navparam = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgreementHelper.prototype, "navCtrl", {
        set: function (value) {
            this._navCtrl = value;
        },
        enumerable: true,
        configurable: true
    });
    AgreementHelper.prototype.canMakeReservation = function () {
        return this.navparam && this.navparam.data;
    };
    AgreementHelper = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services__["a" /* ApiProvider */],
            __WEBPACK_IMPORTED_MODULE_4__app_BootstrapFirstRun__["a" /* CustomBootstrap */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["PopoverController"],
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["App"]])
    ], AgreementHelper);
    return AgreementHelper;
}());

//# sourceMappingURL=agreement.helper.js.map

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return myReservation; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_BootstrapFirstRun__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__includes_release_release__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__beachBook_beachBook__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__beachBookSunbed_beachBookSunbed__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__beachBookBaldaquin_beachBookBaldaquin__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__includes_popover_weatherPopover_popover_weather__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__rating_rating__ = __webpack_require__(94);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











/**
 * Created by shadow-viper on 12/19/17.
 */
var myReservation = /** @class */ (function () {
    function myReservation(platform, api, popoverCtrl, configuration, navCtrl, events, ngZone, modalCtrl) {
        var _this = this;
        this.platform = platform;
        this.api = api;
        this.popoverCtrl = popoverCtrl;
        this.configuration = configuration;
        this.navCtrl = navCtrl;
        this.events = events;
        this.ngZone = ngZone;
        this.modalCtrl = modalCtrl;
        this.viewChangeDisabled = true;
        this.customer = {};
        this.reservation = {};
        this.requestPage = 'MyReservation';
        this.reserveIndex = [];
        this.poolState = false;
        this.tooltip = false;
        this.beach_settings = [];
        this.removePooling = false;
        this.FormData = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["FormGroup"]({
            phone: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["FormControl"]('', [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["Validators"].minLength(6), __WEBPACK_IMPORTED_MODULE_5__angular_forms__["Validators"].required])
        });
        this.platform.ready().then(function () {
            _this.sub$1 = _this.platform.pause.subscribe(function () {
                if (_this.navCtrl.getActive().name == 'myReservation') {
                    // alert("Reservation pause");
                    _this.poolState = false;
                    //this.poollingList(false);
                }
            }, function (error) { });
            _this.configuration.getStorage('reservation').then(function (res) {
                if (res) {
                    var ss = _this.beach_settings.find(function (item) {
                        return item.beach_id == res.beach_id;
                    });
                    _this.currency = ss.currency;
                }
            });
            _this.sub$2 = _this.platform.resume.subscribe(function () {
                //this.getData();
                if (_this.navCtrl.getActive().name == 'myReservation') {
                    // alert("Reservation resume");
                    setTimeout(function () {
                        _this.poolState = true;
                        //this.myReservation();
                    }, 500);
                }
            }, function (error) { });
        }, function (error) { });
        this.beach_settings = JSON.parse(localStorage.getItem('beachsettings') || '[]');
    }
    myReservation.prototype.onNewNotification = function (data) {
        var _this = this;
        this.ngZone.run(function () {
            if (data && data.entity === 'reservation') {
                _this.getData();
            }
        });
    };
    myReservation.prototype.ionViewWillEnter = function () {
        var _this = this;
        var self = this;
        this.removePooling = false;
        this.configuration.getStorage('login').then(function (a) {
            if (a && a.token && !self.removePooling) {
                // alert("myreservation");
                _this.customer = a;
                _this.poolState = true;
                _this.myReservation();
            }
        }, function (error) { });
        this.configuration.setRequestPage(this.requestPage);
        this.events.subscribe('app:notification', function (data) { return _this.onNewNotification(data); });
        // let flg = this.reservation.seenURL;
        // console.log("adfasfd",this.reservation);
        // let pop = this.modalCtrl.create(
        //     AdsPopoverPage,
        //     {
        //         flag : flg
        //     },
        //     {}
        // );
        // pop.present();
    };
    myReservation.prototype.ionViewWillLeave = function () {
        this.poolState = false;
        this.sub$1.unsubscribe();
        this.sub$2.unsubscribe();
        this.configuration.ClearTimeout();
        this.removePooling = true;
        var self = this;
        if (self.reserveIndex && self.reserveIndex.length > 0) {
            self.reserveIndex = self.reserveIndex.map(function (x) { return false; });
        }
        this.events.unsubscribe('app:notification');
    };
    myReservation.prototype.getData = function () {
        var _this = this;
        this.api.get("booking/" + this.customer.phone, {}, {}, true, false).subscribe(function (r) {
            _this.reservation = r[0];
            if (!_this.reservation.id) {
                _this.poollingList(false);
                _this.events.publish('reservation:empty');
            }
            else {
                _this.configuration.setStorage('reservation', _this.reservation).then(function () {
                }, function (error) { });
                _this.poollingList(true);
            }
        }, function (error) { });
    };
    myReservation.prototype.poollingList = function (flag) {
        var _this = this;
        var self = this;
        if (flag == true) {
            var timeout_1 = setTimeout(function () {
                // offLoader
                // alert("pooling start");
                if (!_this.poolState || self.removePooling)
                    return;
                _this.getData();
            }, 10000);
            setTimeout(function () {
                self.configuration.setTimeout(timeout_1);
            }, 0);
        }
        else {
            this.configuration.ClearTimeout();
        }
    };
    myReservation.prototype.myReservation = function () {
        var _this = this;
        // alert("my reservation start");
        if (this.customer.guest) {
            this.api.get("guests/reservation", {}, {}, true).subscribe(function (r) {
                _this.reservation = r[0];
                _this.configuration.setStorage('reservation', _this.reservation).then(function () {
                }, function (error) { });
            }, function (error) { });
            return false;
        }
        this.api.get("booking/" + this.customer.phone, {}, {}, true, false).subscribe(function (r) {
            if (r[0]) {
                _this.reservation = r[0];
                // this.api.get(`booking/view/${this.reservation.id}`, {}, { 'Content-Type': 'application/json' }, true, false).subscribe(reservationRes => {
                // }, error => { })
            }
            else {
                _this.reservation = {};
            }
            //this.poollingList(true);
            if (!_this.reservation.id)
                _this.events.publish('reservation:empty');
        }, function (error) { });
    };
    myReservation.prototype.isExpired = function (IsoDate) {
        return new Date(IsoDate) < new Date();
    };
    myReservation.prototype.delete = function (id) {
        var _this = this;
        this.api.post('booking/cancel', { id: id }, {}).subscribe(function (r) {
            _this.api.AmError(_this.configuration.translate.translate.instant('DONE'), r.message, [{
                    text: _this.configuration.translate.translate.instant('CLOSE'), handler: function () {
                        _this.configuration.setStorage('reserv_endDate', '0');
                        _this.events.publish('reservation:empty');
                        _this.configuration.setStorage('tab', null);
                        _this.reservation = {};
                    }
                }]);
        }, function (error) { });
    };
    myReservation.prototype.release = function (item) {
        this.poolState = false;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__includes_release_release__["a" /* ReleasePage */], { data: item });
    };
    myReservation.prototype.blurEvent = function () {
        var elements = document.getElementsByTagName("tooltip-box");
        for (var i = 0, il = elements.length; i < il; i++) {
            if (!elements[i].classList.contains('hidden')) {
                elements[i].className += " hidden";
                //elements[i].classList.remove("hidden");
            }
        }
    };
    myReservation.prototype.tooltipClick = function () {
        event.preventDefault();
        event.stopPropagation();
        var elements = document.getElementsByTagName("tooltip-box");
        for (var i = 0, il = elements.length; i < il; i++) {
            if (elements[i].classList.contains('hidden')) {
                // elements[i].className += " hidden";
                elements[i].classList.remove("hidden");
            }
        }
    };
    myReservation.prototype.change = function (item, index) {
        this.reserveIndex[index] = !this.reserveIndex[index];
        var options = this.getElementObject(item);
        if (item && item.seat) {
            if (item.seat.type == 'umbrella') {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__beachBook_beachBook__["a" /* beachBook */], options);
            }
            else if (item.seat.type == 'sunbed') {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__beachBookSunbed_beachBookSunbed__["a" /* beachBookSunbed */], options);
            }
            else if (item.seat.type == 'baldaquin') {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__beachBookBaldaquin_beachBookBaldaquin__["a" /* beachBookBaldaquin */], options);
            }
            this.setCurrencyByBeach(item.beach_id);
        }
    };
    myReservation.prototype.setCurrencyByBeach = function (id) {
        var ss = this.beach_settings.find(function (item) {
            return item.beach_id == id;
        });
        this.configuration.currency = ss.currency;
    };
    myReservation.prototype.getDateObj = function (date) {
        return new Date(date);
    };
    myReservation.prototype.showWaterMenu = function ($event) {
        var _this = this;
        this.configuration.getStorage('reservation').then(function (res) {
            if (res) {
                var beachSettings = _this.beach_settings.filter(function (beach) { return beach.beach_id == res.beach_id; });
                var popover = _this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_9__includes_popover_weatherPopover_popover_weather__["a" /* PopoverWeather */], { beach_ids: res.beach_id, settings: beachSettings && beachSettings.length > 0 ? beachSettings[0] : {} }, { cssClass: 'weatherPopOver' });
                popover.present({
                    ev: $event
                }).then(function () {
                });
                popover.onDidDismiss(function (e) {
                });
            }
        });
    };
    myReservation.prototype.getElementObject = function (item) {
        var start = new Date(item.start_date).getTime();
        var end = new Date(item.end_date).getTime();
        var search;
        if (item.seat.type == "sunbed") {
            search = {
                amount: item.amount,
                status: item.status,
                reservation: item,
                data: {},
                change: true,
                extra: item.seat.extra_seats,
                settings: this.beachSettings(item.beach_id),
                title: item.beach,
                index: item.seat.number,
                location: item.seat.zone,
                search: {
                    beach_ids: [item.beach_id],
                    customer_id: this.customer.id,
                    seat_type: item.seat.type,
                    seat_zone: [item.seat.zone],
                    start_date: start,
                    end_date: end,
                    refresh: true
                },
                pool: {
                    beach_ids: [item.beach_id],
                    customer_id: this.customer.id,
                    seat_type: item.seat.type,
                    seat_zone: [item.seat.zone],
                    start_date: start,
                    end_date: end,
                    refresh: true
                }
            };
        }
        else {
            search = {
                amount: item.amount,
                status: item.status,
                reservation: item,
                data: {},
                change: true,
                extra: item.seat.extra_seats,
                settings: this.beachSettings(item.beach_id),
                title: item.beach,
                index: item.seat.number,
                location: item.seat.zone,
                search: {
                    beach_ids: [item.beach_id],
                    customer_id: this.customer.id,
                    seat_type: item.seat.type,
                    seat_zone: [item.seat.zone],
                    seat_position: { x: item.seat.position.x, y: item.seat.position.y },
                    start_date: start,
                    end_date: end,
                    refresh: true
                },
                pool: {
                    beach_ids: [item.beach_id],
                    customer_id: this.customer.id,
                    seat_type: item.seat.type,
                    seat_zone: [item.seat.zone],
                    seat_position: { x: item.seat.position.x, y: item.seat.position.y },
                    start_date: start,
                    end_date: end,
                    refresh: true
                }
            };
        }
        return search;
    };
    myReservation.prototype.beachSettings = function (id) {
        for (var i in this.beach_settings) {
            if (this.beach_settings.hasOwnProperty(i)) {
                if (this.beach_settings[i] && this.beach_settings[i].beach_id == id) {
                    return this.beach_settings[i] ? this.beach_settings[i] : [];
                }
            }
        }
    };
    myReservation.prototype.closeOverlay = function (i) {
        this.reserveIndex[i] = false;
    };
    myReservation.prototype.getSunbedCount = function (slots, count) {
        var ret = {
            slot: '',
            seat: 0
        };
        var singleSeatCount = {
            m: 1, n: 2, o: 4, x: 2, y: 3, z: 4
        };
        var slotList = Object.keys(slots);
        for (var key in slots) {
            if (slots.hasOwnProperty(key)) {
                var element = slots[key];
                if (element.length > 0) {
                    ret.slot += key;
                    ret.seat += element.filter(function (el) { return el; }).length;
                }
            }
        }
        if (slotList.length == 1) {
            var seatCount = singleSeatCount[slotList[0]];
            return seatCount + count;
        }
        else {
            return ret.seat + count;
        }
    };
    myReservation.prototype.getSeatSlots = function (slots) {
        var ret = {
            slot: '',
            seat: 0
        };
        var singleSeatCount = {
            m: 1, n: 2, o: 4, x: 2, y: 3, z: 4
        };
        var slotList = Object.keys(slots);
        for (var key in slots) {
            if (slots.hasOwnProperty(key)) {
                var element = slots[key];
                if (element.length > 0) {
                    ret.slot += key;
                    ret.seat += element.length;
                }
            }
        }
        if (slotList.length == 1) {
            var seatCount = singleSeatCount[slotList[0]];
            var person = (seatCount > 1) ? 'PERSONS' : 'PERSON';
            person = this.configuration.translate.translate.instant(person);
            ret = {
                slot: '(' + seatCount + ' ' + person + ')',
                seat: 0
            };
        }
        return ret;
    };
    myReservation.prototype.openRating = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__rating_rating__["a" /* ratingPage */], { id: this.reservation.beach_id, title: this.reservation.beach });
    };
    myReservation.prototype.updatePhone = function (event) {
        if (event && event.complete) {
            if (event.complete.length > 4) {
                this.FormData.controls['phone'].setValue(event.complete);
                this.configuration.setStorage('AdditionalRegData', event).then(function (a) {
                }, function (error) {
                });
            }
        }
    };
    myReservation.prototype.getSeats = function (item) {
        return item.seat.extra_seats + this.getSeatSlots(item.seat.slots).seat;
    };
    myReservation.prototype.deletePhone = function (item, guest) {
        this.api.post("booking/unshare", {
            id: item.id,
            share_id: guest.id
        }, {}, true, false).subscribe(function (response) {
            item.guests = response;
        }, function (error) { });
    };
    myReservation.prototype.shareReservation = function (item) {
        var seats = this.getSunbedCount(this.reservation.seat.slots, this.reservation.seat.extra_seats) - 1;
        // let seats = this.getSeats(item) - 1;
        if (item.guests.length < seats) {
            var phone = this.FormData.controls['phone'].value;
            if (phone) {
                this.api.post("booking/share", {
                    id: item.id,
                    phone: phone
                }, {}, true, false).subscribe(function (response) {
                    item.guests = response;
                }, function (error) { });
            }
            else {
                var title = this.configuration.translate.translate.instant('ERROR');
                var message = this.configuration.translate.translate.instant('PHONE_VALIDATION');
                var close_1 = this.configuration.translate.translate.instant('CLOSE');
                this.api.AmError(title, message, [{
                        text: close_1, handler: function () {
                        }
                    }]);
            }
        }
        else {
            var title = this.configuration.translate.translate.instant('ERROR');
            var message = this.configuration.translate.translate.instant('SHARE_LIMIT', { seats: seats });
            var close_2 = this.configuration.translate.translate.instant('CLOSE');
            this.api.AmError(title, message, [{
                    text: close_2, handler: function () {
                    }
                }]);
        }
    };
    myReservation.prototype.showPhone = function (item) {
        item.show = true;
        item.show_give = false;
    };
    myReservation.prototype.showGive = function (item) {
        item.show_give = true;
        item.show = false;
    };
    myReservation.prototype.isOwner = function (item) {
        return item.phone == this.customer.phone;
    };
    myReservation.prototype.isFriend = function (item) {
        return item.phone != this.customer.phone;
    };
    myReservation.prototype.isActive = function (item) {
        return (item.status == 'booked' || item.status == 'active');
    };
    myReservation.prototype.isPending = function (item) {
        return item.status == 'pending';
    };
    myReservation.prototype.acceptInvitation = function (reservation) {
        var _this = this;
        this.api.post("booking/accept_invitation", {
            id: reservation.id
        }, {}, true, false).subscribe(function (response) {
            reservation.share_status = 'accepted';
            var title = _this.configuration.translate.translate.instant('SUCCESS');
            var message = response.message;
            var close = _this.configuration.translate.translate.instant('CLOSE');
            _this.api.AmError(title, message, [{
                    text: close, handler: function () {
                        _this.myReservation();
                    }
                }]);
        }, function (error) { });
    };
    myReservation.prototype.rejectInvitation = function (reservation) {
        var _this = this;
        this.api.post("booking/reject_invitation", {
            id: reservation.id,
            share_id: reservation.share_id
        }, {}, true, false).subscribe(function (response) {
            var title = _this.configuration.translate.translate.instant('SUCCESS');
            var message = response.message;
            var close = _this.configuration.translate.translate.instant('CLOSE');
            _this.api.AmError(title, message, [{
                    text: close, handler: function () {
                        _this.events.publish('reservation:empty');
                    }
                }]);
        }, function (error) { });
    };
    myReservation.prototype.quitInvitation = function (reservation) {
        var _this = this;
        this.api.post("booking/quit_invitation", {
            id: reservation.id,
            share_id: reservation.share_id
        }, {}, true, false).subscribe(function (response) {
            var title = _this.configuration.translate.translate.instant('SUCCESS');
            var message = response.message;
            var close = _this.configuration.translate.translate.instant('CLOSE');
            _this.api.AmError(title, message, [{
                    text: close, handler: function () {
                        _this.events.publish('reservation:empty');
                    }
                }]);
        }, function (error) { });
    };
    // Give Reservation
    myReservation.prototype.deleteGive = function (reservation) {
        this.api.post("booking/cancel_transfer", {
            id: reservation.id,
            give_id: reservation.give.id
        }, {}, true, false).subscribe(function (response) {
            reservation.give = null;
        }, function (error) { });
    };
    myReservation.prototype.transferReservation = function (reservation) {
        var phone = this.FormData.controls['phone'].value;
        if (phone) {
            this.api.post("booking/transfer", {
                id: reservation.id,
                phone: phone
            }, {}, true, false).subscribe(function (response) {
                reservation.give = response;
                reservation.show = true;
            }, function (error) { });
        }
        else {
            var title = this.configuration.translate.translate.instant('ERROR');
            var message = this.configuration.translate.translate.instant('PHONE_VALIDATION');
            var close_3 = this.configuration.translate.translate.instant('CLOSE');
            this.api.AmError(title, message, [{
                    text: close_3, handler: function () {
                    }
                }]);
        }
    };
    myReservation.prototype.acceptTransfer = function (reservation) {
        var _this = this;
        this.api.post("booking/accept_transfer", {
            id: reservation.id,
            give_id: reservation.give.id
        }, {}, true, false).subscribe(function (response) {
            var title = _this.configuration.translate.translate.instant('SUCCESS');
            var message = response.message;
            var close = _this.configuration.translate.translate.instant('CLOSE');
            _this.api.AmError(title, message, [{
                    text: close, handler: function () {
                        _this.myReservation();
                    }
                }]);
        }, function (error) { });
    };
    myReservation.prototype.rejectTransfer = function (reservation) {
        var _this = this;
        this.api.post("booking/reject_transfer", {
            id: reservation.id,
            give_id: reservation.give.id
        }, {}, true, false).subscribe(function (response) {
            var title = _this.configuration.translate.translate.instant('SUCCESS');
            var message = response.message;
            var close = _this.configuration.translate.translate.instant('CLOSE');
            _this.api.AmError(title, message, [{
                    text: close, handler: function () {
                        _this.events.publish('reservation:empty');
                    }
                }]);
        }, function (error) { });
    };
    myReservation.prototype.getInvitationMessage = function (reservation) {
        return this.configuration.translate.translate.instant('SHARE_MSG', { name: reservation.name });
    };
    myReservation.prototype.getTransferMessage = function (reservation) {
        return this.configuration.translate.translate.instant('TRANSFER_MSG', { name: reservation.name });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myTabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["Tabs"])
    ], myReservation.prototype, "tabRef", void 0);
    myReservation = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'myReservation',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\myReservation\myReservation.html"*/'<ion-header class="has-shadow">\n\n\n\n	<ion-navbar>\n\n		<ion-buttons start>\n\n			<button ion-button icon-only (click)="openRating()">\n\n				<ion-icon name="icon-review"></ion-icon>\n\n			</button>\n\n		</ion-buttons>\n\n		<ion-title>{{ \'RESERVATION\' | translate }}</ion-title>\n\n		<ion-buttons end>\n\n			<button ion-button icon-only (click)="showWaterMenu()">\n\n				<ion-icon name="" class="fa fa-thermometer-full"></ion-icon>\n\n			</button>\n\n		</ion-buttons>\n\n		<!-- <ion-buttons end>\n\n      <button ion-button icon-only class="Cart" (click)="gotoCart()">\n\n        <span class="text" ion-text color="light" text-center>{{ quantity }}</span>\n\n      </button>\n\n    </ion-buttons> -->\n\n	</ion-navbar>\n\n\n\n</ion-header>\n\n<ion-content>\n\n	<div padding class="reservation-container" *ngIf="reservation.id" [ngClass]="reservation.status==\'expired\'?\'inactive\':\'active\'"\n\n	 (click)="blurEvent()">\n\n		<ion-row>\n\n			<ion-col col-5>\n\n				<h2 ion-text color="primary">{{ \'BEACH\' | translate }} </h2>\n\n			</ion-col>\n\n			<ion-col col-7>\n\n				<h2 ion-text color="dark" class="lowercase"><i>{{ reservation.beach }}</i></h2>\n\n			</ion-col>\n\n		</ion-row>\n\n		<ion-row *ngIf="reservation.status != \'expired\'">\n\n			<ion-col col-5>\n\n				<h2 ion-text color="primary">{{ \'STATUS\' | translate }} </h2>\n\n			</ion-col>\n\n			<ion-col col-7>\n\n				<h2 ion-text color="primary">{{ reservation.status_text}} </h2>\n\n			</ion-col>\n\n		</ion-row>\n\n		<ion-row>\n\n			<ion-col col-5>\n\n				<h2 ion-text color="dark">{{ \'AVAILABLE_FOR\' | translate }} </h2>\n\n			</ion-col>\n\n			<ion-col col-7>\n\n				<h2 ion-text color="dark">{{ reservation.start_date | slice:0:10 }} - {{ reservation.end_date | slice:0:10 }}</h2>\n\n			</ion-col>\n\n		</ion-row>\n\n		<ion-row>\n\n			<ion-col col-5>\n\n				<h2 ion-text color="dark">{{ \'RESERVATION\' | translate }} </h2>\n\n			</ion-col>\n\n			<ion-col col-7>\n\n				<h2 ion-text color="dark" class="lowercase">{{ reservation.seat.type }} #{{ reservation.seat.number }}</h2>\n\n			</ion-col>\n\n		</ion-row>\n\n		<ion-row>\n\n			<ion-col col-5>\n\n				<h2 ion-text color="dark">{{ \'SEATS\' | translate }} </h2>\n\n			</ion-col>\n\n			<ion-col col-7>\n\n				<h2 ion-text color="dark">{{getSunbedCount(reservation.seat.slots, reservation.seat.extra_seats)}} </h2>\n\n			</ion-col>\n\n		</ion-row>\n\n		<ion-row>\n\n			<ion-col col-5>\n\n				<h2 ion-text color="dark">{{ \'RESERVATION_NO\' | translate }} </h2>\n\n			</ion-col>\n\n			<ion-col col-7>\n\n				<h2 ion-text color="dark" class="lowercase">{{ reservation.number }}</h2>\n\n			</ion-col>\n\n		</ion-row>\n\n		<ion-row>\n\n			<ion-col col-5>\n\n				<h2 ion-text color="dark">{{ \'PRICE\' | translate }} </h2>\n\n			</ion-col>\n\n			<ion-col col-7>\n\n				<h2 *ngIf="reservation.status ===  \'active\'" ion-text color="dark" class="lowercase">{{reservation.old_amount }} {{reservation.currency}} ({{ \'PAID\' | translate }})</h2>\n\n				<h2 *ngIf="reservation.status !=  \'active\'" ion-text color="dark" class="lowercase">{{reservation.amount }} {{reservation.currency}}</h2>\n\n			</ion-col>\n\n		</ion-row>		\n\n\n\n		<div padding *ngIf="isOwner(reservation) && isActive(reservation)">\n\n			<form [formGroup]="FormData" *ngIf="reservation.show">\n\n				<ion-input type="hidden" placeholder="+(40)722 222 222" formControlName="phone" required></ion-input>\n\n				<phoneComponent (CompletedSelect)="updatePhone($event)" [toggleData]="111"></phoneComponent>\n\n				<button ion-button icon-only clear class="add-phone" (click)="shareReservation(reservation)">\n\n					<ion-icon name="ios-add-circle"></ion-icon>\n\n				</button>\n\n			</form>\n\n\n\n			<ion-list>\n\n				<ion-item *ngFor="let guest of reservation.guests; let i = index">\n\n					<!-- <ion-icon *ngIf="guest.status == \'pending\'" name="" item-start class="far fa-clock fa-spin slow-spin"></ion-icon> -->\n\n					<!-- <ion-spinner *ngIf="guest.status == \'pending\'" name="bubbles" icon="ripple"></ion-spinner> -->\n\n					<div *ngIf="guest.status == \'pending\'">\n\n						<div class="clock"></div>\n\n					</div>\n\n					<ion-icon *ngIf="guest.status == \'accepted\'" name="" item-start class="fa fa-check-circle"></ion-icon>\n\n					<span class="phone-number">{{guest.phone_number}}</span>\n\n					<button ion-button icon-only clear (click)="deletePhone(reservation, guest)" item-end>\n\n						<ion-icon name="ios-remove-circle"></ion-icon>\n\n					</button>\n\n				</ion-item>\n\n			</ion-list>\n\n\n\n			<!-- Share -->\n\n			<ion-row class="button-row">\n\n				<button ion-button round full pink-gradient (click)="showPhone(reservation)">{{ \'SHARE_RESERVATION\' | translate}}</button>\n\n				<button ion-button icon-only (click)="tooltipClick()" class="info-button" hideOthers="true" duration="5000" tooltip="{{ \'TOOLTIP_FRIENDS\' | translate}}"\n\n				 positionV="top" [arrow]="true" event="click">\n\n					<ion-icon name="information-circle-outline"></ion-icon>\n\n				</button>\n\n			</ion-row>\n\n\n\n			<ion-list *ngIf="reservation.give">\n\n				<ion-item>\n\n					<!-- <ion-icon *ngIf="reservation.give.status == \'pending\'" name="" item-start class="fa fa-hourglass fa-spin slow-spin"></ion-icon> -->\n\n					<!-- <ion-spinner *ngIf="reservation.give.status == \'pending\'" name="bubbles" icon="crescent"></ion-spinner> -->\n\n					<div *ngIf="reservation.give.status == \'pending\'">\n\n						<div class="clock"></div>\n\n					</div>\n\n					<ion-icon *ngIf="reservation.give.status == \'accepted\'" name="" item-start class="fa fa-check-circle"></ion-icon>\n\n					<!-- {{reservation.give.phone_number}} -->\n\n					<span class="phone-number">{{reservation.give.phone_number}}</span>\n\n					<button ion-button icon-only clear (click)="deleteGive(reservation)" item-end>\n\n						<ion-icon name="ios-remove-circle"></ion-icon>\n\n					</button>\n\n				</ion-item>\n\n			</ion-list>\n\n			<!-- Give -->\n\n			<form [formGroup]="FormData" *ngIf="reservation.show_give && !reservation.give" padding-top>\n\n				<ion-input type="hidden" placeholder="+(40)722 222 222" formControlName="phone" required></ion-input>\n\n				<phoneComponent (CompletedSelect)="updatePhone($event)" [toggleData]="111"></phoneComponent>\n\n				<button ion-button icon-only clear class="add-phone" (click)="transferReservation(reservation)">\n\n					<ion-icon name="ios-add-circle"></ion-icon>\n\n				</button>\n\n			</form>\n\n			<ion-row class="button-row">\n\n				<button ion-button round full pink-gradient (click)="showGive(reservation)">{{ \'GIVE_RESERVATION\' | translate}}</button>\n\n				<button ion-button icon-only class="info-button" (click)="tooltipClick()" hideOthers="true" duration="5000" tooltip="{{ \'TOOLTIP_GIVERESERVATION\' | translate}}"\n\n				 positionV="bottom" [arrow]="true" event="click">\n\n					<ion-icon name="information-circle-outline"></ion-icon>\n\n				</button>\n\n			</ion-row>\n\n		</div>\n\n\n\n		<div padding *ngIf="isFriend(reservation) && reservation.share_status == \'pending\'">\n\n			<div padding text-center>\n\n				{{getInvitationMessage(reservation)}}\n\n			</div>\n\n			<ion-row>\n\n				<ion-col>\n\n					<button ion-button round full pink-gradient (click)="acceptInvitation(reservation)">{{ \'ACCEPT_INVITATION\' |\n\n						translate}}</button>\n\n				</ion-col>\n\n				<ion-col>\n\n					<button ion-button round full pink-gradient (click)="rejectInvitation(reservation)">{{ \'REJECT_INVITATION\' |\n\n						translate}}</button>\n\n				</ion-col>\n\n			</ion-row>\n\n		</div>\n\n\n\n		<div padding *ngIf="isFriend(reservation) && reservation.give_status == \'pending\'">\n\n			<div padding text-center>\n\n				{{getTransferMessage(reservation)}}\n\n			</div>\n\n			<ion-row>\n\n				<ion-col>\n\n					<button ion-button round full pink-gradient (click)="acceptTransfer(reservation)">{{ \'ACCEPT_INVITATION\' |\n\n						translate}}</button>\n\n				</ion-col>\n\n				<ion-col>\n\n					<button ion-button round full pink-gradient (click)="rejectTransfer(reservation)">{{ \'REJECT_INVITATION\' |\n\n						translate}}</button>\n\n				</ion-col>\n\n			</ion-row>\n\n		</div>\n\n	</div>\n\n\n\n<ion-footer>\n\n	<ion-buttons *ngIf="reservation && reservation.id">\n\n			<button ion-button color="dark" block small *ngIf="isOwner(reservation) && ((reservation.status != \'booked\' && reservation.status != \'pending\') || reservation.status == \'paid\')"\n\n			 (click)="release(reservation)">{{\n\n				\'RELEASE\' | translate }}</button>\n\n			<button ion-button color="dark" small block *ngIf="isOwner(reservation) && (reservation.status == \'booked\' || reservation.status == \'pending\')"\n\n			 (click)="delete(reservation.id)">{{ \'CANCEL\' | translate }}</button>\n\n	\n\n			<button ion-button color="dark" small block *ngIf="isFriend(reservation) && reservation.share_status == \'accepted\'"\n\n			 (click)="quitInvitation(reservation)">{{ \'QUIT\' | translate }}</button>\n\n		</ion-buttons>\n\n	</ion-footer>\n\n</ion-content>\n\n\n\n\n\n\n\n	<!-- <ion-buttons [ngClass]="reserveIndex[i]?\'active\':\'\'" (click)="reserveIndex[i]=!reserveIndex[i]"> -->\n\n\n\n'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\myReservation\myReservation.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_1__providers_services__["a" /* ApiProvider */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["PopoverController"],
            __WEBPACK_IMPORTED_MODULE_2__app_BootstrapFirstRun__["a" /* CustomBootstrap */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["Events"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["ModalController"]])
    ], myReservation);
    return myReservation;
}());

//# sourceMappingURL=myReservation.js.map

/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchResultsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__filter_popover_filter_popover__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_BehaviorSubject__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_BootstrapFirstRun__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environment_environment__ = __webpack_require__(153);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var SearchResultsPage = /** @class */ (function () {
    function SearchResultsPage(dp, loadingCtrl, platform, navCtrl, viewCtrl, popoverCtrl, navParam, api, events, configuration) {
        var _this = this;
        this.dp = dp;
        this.loadingCtrl = loadingCtrl;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.popoverCtrl = popoverCtrl;
        this.navParam = navParam;
        this.api = api;
        this.events = events;
        this.configuration = configuration;
        this.Result = [];
        this.count = 0;
        this.beach_settings = [];
        this.customer = {};
        this.timeoutInstance = [];
        this.requestPage = 'SearchResultsPage';
        this.isPolling = true;
        this.noResponse = false;
        this.filters = [];
        this.search_by = '';
        this.imgPath = __WEBPACK_IMPORTED_MODULE_7__environment_environment__["a" /* environment */].base + "uploads/";
        this.removePooling = false;
        this.getGeolocation = function (flag) {
            var timeout;
            if (_this.removePooling) {
                return;
            }
            if (flag == true) {
                if (!_this.isPolling)
                    return;
                // if (this.configuration.hasLocationAccess) {
                navigator.geolocation.getCurrentPosition(function (a) {
                    if (a && a.coords && a.coords.latitude) {
                        _this.SearchInput.latitude = Number(a.coords.latitude);
                        _this.SearchInput.longitude = Number(a.coords.longitude);
                        _this.Search(true);
                        _this.configuration.ClearTimeout();
                        // timeout = setTimeout(() => { this.getGeolocation(true); }, 15000);
                        _this.configuration.setTimeout(timeout);
                    }
                    else {
                        delete _this.SearchInput.latitude;
                        delete _this.SearchInput.longitude;
                        _this.Search(true);
                        _this.configuration.ClearTimeout();
                        //  timeout = setTimeout(() => { this.getGeolocation(true); }, 15000);
                        _this.configuration.setTimeout(timeout);
                    }
                }, function (e) {
                    delete _this.SearchInput.latitude;
                    delete _this.SearchInput.longitude;
                    _this.Search(true);
                    _this.configuration.ClearTimeout();
                    // timeout = setTimeout(() => { this.getGeolocation(true); }, 15000);
                    _this.configuration.setTimeout(timeout);
                }, { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 });
            }
            else {
                delete _this.SearchInput.latitude;
                delete _this.SearchInput.longitude;
                _this.Search(true);
                _this.configuration.ClearTimeout();
                // timeout = setTimeout(() => { this.getGeolocation(true); }, 15000);
                _this.configuration.setTimeout(timeout);
            }
            // } else {
            //   this.configuration.ClearTimeout();
            //   clearTimeout(timeout);
            // }
        };
        this.search_by = this.navParam.get('search_by');
        var order = this.search_by == 'near' ? 'distance' : '';
        this.dataFilter = { filter: '', order: order };
        this.SearchFilterSubject = new __WEBPACK_IMPORTED_MODULE_5_rxjs_BehaviorSubject__["BehaviorSubject"]({ filter: [], order: order });
        this.beach_settings = JSON.parse(localStorage.getItem('beachsettings') || '[]');
        this.showFilters();
    }
    SearchResultsPage.prototype.ngOnInit = function () {
        var _this = this;
        localStorage.setItem("grid_image_cache", "" + new Date().getTime());
        this.viewCtrl.willEnter.subscribe(function (r) {
            _this.noResponse = false;
            _this.loading = _this.loadingCtrl.create({
                spinner: 'dots',
                content: ''
            });
            _this.loading.present();
        });
    };
    SearchResultsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.navBar.backButtonClick = function (e) {
            _this.configuration.ClearTimeout();
            // this.getGeolocation(false);
            _this.viewCtrl.dismiss();
        };
    };
    SearchResultsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.removePooling = false;
        this.ClearSelection();
        this.SearchInput = this.navParam.get('searchlist');
        delete this.SearchInput.person_num;
        this.title = this.navParam.get('title');
        this.SearchResult = [];
        if (this.search_by != "near") {
            this.setCurrencyByBeach(this.SearchInput.beach_ids[0]);
        }
        this.configuration.getStorage('login').then(function (data) {
            if (data && data.id) {
                _this.customer = data;
                _this.getGeolocation(true);
                // this.Search(false);
            }
        }, function (error) { });
        this.platform.ready().then(function () {
            _this.sub1$ = _this.platform.pause.subscribe(function () {
                if (_this.navCtrl.getActive().name == 'SearchResultsPage') {
                    // alert("search-pause");
                    _this.getGeolocation(false);
                }
            });
            _this.sub2$ = _this.platform.resume.subscribe(function () {
                if (_this.navCtrl.getActive().name == 'SearchResultsPage') {
                    // alert("searh-resume");
                    _this.getGeolocation(true);
                }
            });
        }, function (error) { });
        this.configuration.setRequestPage(this.requestPage);
    };
    SearchResultsPage.prototype.ionViewWillUnload = function () {
        // alert("search ion view Unload");
        this.removePooling = true;
        this.configuration.ClearTimeout();
        this.sub1$.unsubscribe();
        this.sub2$.unsubscribe();
    };
    SearchResultsPage.prototype.ionViewWillLeave = function () {
        // alert("search ion view Unload");
        this.removePooling = true;
        this.configuration.ClearTimeout();
        this.sub1$.unsubscribe();
        this.sub2$.unsubscribe();
    };
    SearchResultsPage.prototype.setCurrencyByBeach = function (id) {
        var ss = this.beach_settings.find(function (item) {
            return item.beach_id == id;
        });
        this.configuration.currency = ss.currency;
    };
    SearchResultsPage.prototype.setUpdatedOn = function (beach_id, updated_on) {
        var timestampObj = JSON.parse(localStorage.getItem('updated_on') || "{}");
        if (timestampObj[beach_id] && timestampObj[beach_id] == updated_on) {
            return false;
        }
        timestampObj[beach_id] = updated_on;
        localStorage.setItem('updated_on', JSON.stringify(timestampObj));
        return true;
    };
    SearchResultsPage.prototype.getImageList = function (beach) {
        var _this = this;
        var cache = "?s=gridImage" + localStorage.getItem("grid_image_cache");
        var grid = beach.grid;
        var beach_id = beach.id;
        var imgList = [];
        var staticList = [];
        var zones = ['front', 'middle', 'back'];
        zones.map(function (zone) {
            var list = grid[zone];
            list.map(function (li) {
                if (li.type == 'static') {
                    if (staticList.indexOf(li.image) == -1) {
                        staticList.push(li.image);
                        new Image().src = li.image + cache;
                    }
                }
                else {
                    if (imgList.indexOf(li.image) == -1) {
                        imgList.push(li.image);
                        new Image().src = _this.imgPath + beach_id + '/elements/' + li.image + cache;
                    }
                }
            });
        });
    };
    SearchResultsPage.prototype.loadImages = function (list) {
        // let cache: any = Math.random();
        // localStorage.setItem("grid_image_cache", '' + cache);
        var cache = localStorage.getItem("grid_image_cache");
        cache = "?s=gridImage" + cache;
        for (var i = 0; i < list.length; i++) {
            var li = list[i].grid_images, beach_id = list[i].id, imgList = li.dynamic;
            this.getImageList(list[i]);
            /*if (true || this.setUpdatedOn(list[i].id, list[i].updated_at)) {
                for (let j = 0; j < imgList.length; j++) {
                    let imgSrc = imgList[j];
                    new Image().src = this.imgPath + beach_id + '/elements/' + imgSrc + cache;
                }
            }*/
        }
    };
    SearchResultsPage.prototype.isOpenow = function (beach) {
        var open = true;
    };
    SearchResultsPage.prototype.Search = function (stopProgress) {
        var _this = this;
        // alert("search progress");
        if (this.SearchInput.start_date) {
            this.SearchInput.customer_id = this.customer.id;
            this.SearchInput.refresh = false;
            // let newTimeRange: { start_date: any, end_date: any } = this.timeUpdate(this.SearchInput.start_date, this.SearchInput.end_date)
            // this.SearchInput.start_date = newTimeRange.start_date;
            // this.SearchInput.end_date = newTimeRange.end_date;
            this.SearchInput.search_date = new Date((new Date().setHours(12, 0, 0))).getTime();
            var searchParams = JSON.parse(JSON.stringify(this.SearchInput));
            var searchParamCopy = Object.assign({}, searchParams);
            searchParams.search_date = searchParams.search_date; // this.getLocalDateTime(searchParams.search_date)
            //searchParams.start_date = searchParams.start_date;
            searchParams.start_date_formatted = this.dp.transform(new Date(searchParams.start_date), "yyyy-MM-dd");
            searchParams.end_date_formatted = this.dp.transform(new Date(searchParams.end_date), "yyyy-MM-dd");
            searchParams.end_date = searchParams.end_date;
            searchParams.start_date = new Date((new Date(searchParams.start_date).setHours(12, 0, 0))).getTime(); //this.getLocalDateTime(searchParams.start_date);
            //searchParams.end_date =  this.getLocalDateTime(searchParams.end_date)
            var d = new Date();
            var startTime_1 = d.getTime();
            var today = this.dp.transform(new Date(), "yyyy-MM-dd");
            searchParams.isToday = (today == searchParams.start_date_formatted) ? true : false;
            this.api.post('search', searchParams, {}, stopProgress).subscribe(function (r) {
                if (r && r.length) {
                    _this.SearchResult = r;
                    _this.loadImages(r);
                    _this.count = 0;
                    var date = new Date();
                    var endTime = date.getTime();
                    var diff = endTime - startTime_1;
                    //	alert('Response TIme:'+ diff)
                }
                else {
                    _this.configuration.ClearTimeout();
                }
            }, function (error) {
                _this.count = 0;
            }).add(function (r) {
                _this.loading.dismiss();
                _this.noResponse = true;
            });
        }
    };
    SearchResultsPage.prototype.getLocalDateTime = function (date) {
        var dateObj = new Date(date);
        var hoursWithTimezone = dateObj.getHours() + ((-1) * (dateObj.getTimezoneOffset() / 60));
        return new Date(new Date(date).setHours(hoursWithTimezone)).getTime();
    };
    SearchResultsPage.prototype.timeUpdate = function (start_date, end_date) {
        var now = new Date();
        if (start_date && end_date && new Date(start_date).getDate() === now.getDate()) {
            start_date = now.getTime();
            if (start_date >= end_date) {
                var newEndDate = new Date(end_date);
                end_date = new Date(newEndDate.setDate(newEndDate.getDate() + 1)).getTime();
            }
        }
        else {
            start_date = start_date || now.getTime();
            end_date = end_date || new Date(new Date(now).setHours(23, 59, 59)).getTime();
        }
        return { start_date: start_date, end_date: end_date };
    };
    SearchResultsPage.prototype.showFilter = function () {
        var _this = this;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_2__filter_popover_filter_popover__["a" /* FilterPopoverPage */], {
            subject: this.SearchFilterSubject,
            result: this.SearchResult,
            search_by: this.search_by
        }, { cssClass: 'filterPopOver' });
        popover.present().then(function () {
            _this.SearchFilterSubject.subscribe(function (data) {
                if ((data && data.filter) || (data && data.order)) {
                    _this.dataFilter = data;
                    _this.showFilters();
                }
            });
        });
        popover.onDidDismiss(function () {
            _this.getGeolocation(true);
        });
    };
    SearchResultsPage.prototype.removeFilter = function (filter) {
        var _this = this;
        this.filters = this.filters.filter(function (item) {
            if (item && item != filter) {
                return item;
            }
        });
        //Refresh search
        var active = false;
        for (var i = 0; i < this.dataFilter.filter.length; i++) {
            active = false;
            for (var j = 0; j < this.filters.length; j++) {
                if (this.dataFilter.filter[i] == this.filters[j]) {
                    active = true;
                }
            }
            if (!active) {
                this.dataFilter.filter[i] = "";
            }
        }
        // Save back to session
        this.configuration.getStorage('Filters').then(function (r) {
            _this.configuration.setStorage('Filters', {
                filterMock: {
                    filter: _this.dataFilter.filter,
                    sort: r.filterMock.sort
                },
                filters: {
                    filter: _this.dataFilter.filter,
                    order: r.filters.order
                }
            });
        });
    };
    SearchResultsPage.prototype.showFilters = function () {
        var _this = this;
        this.configuration.getStorage('Filters').then(function (r) {
            if (r && r.filterMock) {
                _this.filters = r.filterMock.filter.filter(function (item) {
                    if (item) {
                        return item;
                    }
                });
            }
            else {
                _this.filters = [];
            }
        });
    };
    SearchResultsPage.prototype.ClearSelection = function () {
        this.configuration.removeKeys('Filters');
        this.filters = [];
        var order = this.search_by == 'near' ? 'distance' : '';
        this.dataFilter = { filter: '', order: order };
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["Navbar"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["Navbar"])
    ], SearchResultsPage.prototype, "navBar", void 0);
    SearchResultsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-search-results',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\search-results\search-results.html"*/'<ion-header class="has-shadow">\n\n\n\n	<ion-navbar>\n\n		<ion-title>{{ title }}</ion-title>\n\n\n\n		<!-- <ion-buttons right>\n\n			<button ion-button icon-only (click)="showFilter()">\n\n				<ion-icon name="options"></ion-icon>\n\n			</button>\n\n		</ion-buttons> -->\n\n\n\n	</ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n\n\n	<div *ngIf="filters.length > 0" padding id="filters">\n\n		<ion-chip *ngFor="let filter of filters" color="primary">\n\n			<ion-label>{{filter}}</ion-label>\n\n			<button ion-button clear color="dark" (click)="removeFilter(filter)">\n\n				<ion-icon name="close-circle"></ion-icon>\n\n			</button>\n\n		</ion-chip>\n\n	</div>\n\n\n\n	<app-search-result-include [noResponse]="noResponse" [SearchParam]="SearchInput" [searchInput]="SearchResult | ProductSort: dataFilter.filter: \'features\': dataFilter.order"\n\n	 [Title]="title"></app-search-result-include>\n\n\n\n</ion-content>'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\search-results\search-results.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["d" /* DatePipe */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common__["d" /* DatePipe */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["PopoverController"], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_4__providers_services__["a" /* ApiProvider */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["Events"], __WEBPACK_IMPORTED_MODULE_6__app_BootstrapFirstRun__["a" /* CustomBootstrap */]])
    ], SearchResultsPage);
    return SearchResultsPage;
}());

//# sourceMappingURL=search-results.js.map

/***/ }),

/***/ 7:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(505);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(506);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_throw__ = __webpack_require__(508);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__ = __webpack_require__(510);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__environment_environment__ = __webpack_require__(153);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var ApiProvider = /** @class */ (function () {
    function ApiProvider(platform, http, alertCtrl, loadCtrl, translate, storage, toastCtrl) {
        var _this = this;
        this.platform = platform;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loadCtrl = loadCtrl;
        this.translate = translate;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.Login = { name: '', email: '', phone: '', validated: false, token: '' };
        this.currentLanguage = 'ro';
        this.loaderInstance = false;
        this.fileKey = 'mybeachMedia';
        //this.APIURL='https://smart-beach.ga/api/client/';  // for product
        //this.APIURL = 'http://dev-smart-beach.ga/api/client/'; // for Dev
        //this.APIURL = 'http://localhost/ionic/Testing/Nick/api/client/'; // for Dev
        this.APIURL = __WEBPACK_IMPORTED_MODULE_10__environment_environment__["a" /* environment */].baseURL;
        this.platform.ready().then(function (a) {
            _this.initializeToken();
        });
    }
    ApiProvider.prototype.ngOnInit = function () {
    };
    ApiProvider.prototype.initializeToken = function () {
        var _this = this;
        this.storage.get("loginStore").then(function (a) {
            if (a && a.token) {
                _this.Login = a;
                _this.IsAuthenticated = true;
            }
            else {
                _this.IsAuthenticated = false;
            }
        }, function (error) {
            _this.IsAuthenticated = false;
        });
    };
    ApiProvider.prototype.get = function (url, param, headers, offLoader, allowLanguage) {
        var _this = this;
        this.Busymessage = this.translate.instant("PLEASE_WAIT");
        if (!offLoader) {
            this.AmBusy(this.Busymessage);
            if (!allowLanguage)
                param.lang = "" + this.currentLanguage;
        }
        else if (offLoader === true) {
            if (!allowLanguage)
                param.lang = "" + this.currentLanguage;
        }
        headers['x-token'] = this.Login.token;
        var options = {
            headers: new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["c" /* HttpHeaders */](headers)
        };
        url = url.startsWith('http') ? url : this.APIURL + url;
        // we can move this to a helper ... coz' im sure we will be copy pasting these more times
        for (var i in param) {
            if (param.hasOwnProperty(i)) {
                if (url.indexOf('?') != -1)
                    url += '&' + i + '=' + param[i];
                else
                    url += '?' + i + '=' + param[i];
            }
        }
        return this.http.get(url, options).map(function (r) {
            if (!offLoader) {
                _this.AmBusy(_this.Busymessage);
            }
            _this.debug(r);
            setTimeout(function () {
                _this.initializeToken();
            }, 500);
            return r;
        }).catch(function (error) {
            error = error.error;
            if (!offLoader) {
                _this.AmBusy(_this.Busymessage, true);
                _this.AmError(_this.translate.instant("ERROR"), error.message, [{ text: _this.translate.instant('CLOSE'), role: _this.translate.instant('CANCEL') }]);
            }
            _this.debug(error);
            return __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__["Observable"].throw(error).map(function (r) { return r.json(); });
        });
    };
    ApiProvider.prototype.post = function (url, body, headers, offLoader, disableErrorAlert) {
        var _this = this;
        this.Busymessage = this.translate.instant("PLEASE_WAIT");
        if (!offLoader) {
            this.AmBusy(this.Busymessage);
        }
        headers['x-token'] = this.Login.token;
        var options = {
            headers: new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["c" /* HttpHeaders */](headers)
        };
        url = url.startsWith('http') ? url : this.APIURL + url;
        url = url.indexOf('?') != -1 ? url + '&lang=' + this.currentLanguage : url + '?lang=' + this.currentLanguage;
        return this.http.post(url, body, options).map(function (r) {
            if (!offLoader) {
                _this.AmBusy(_this.Busymessage);
            }
            _this.debug(r);
            setTimeout(function () {
                _this.initializeToken();
            }, 500);
            return r;
        }).catch(function (error) {
            error = error.error;
            if (!offLoader) {
                _this.AmBusy(_this.Busymessage, true);
                if (!disableErrorAlert) {
                    _this.AmError(_this.translate.instant("ERROR"), error.message, [{ text: _this.translate.instant('CLOSE'), role: _this.translate.instant('CANCEL') }]);
                }
            }
            _this.debug(error);
            return __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__["Observable"].throw(error).map(function (r) { return r.json(); });
        });
    };
    ApiProvider.prototype.put = function (url, body, headers, offLoader) {
        var _this = this;
        this.Busymessage = this.translate.instant("PLEASE_WAIT");
        if (!offLoader) {
            this.AmBusy(this.Busymessage);
        }
        headers['x-token'] = this.Login.token;
        var options = {
            headers: new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["c" /* HttpHeaders */](headers)
        };
        url = url.startsWith('http') ? url : this.APIURL + url;
        url = url.indexOf('?') != -1 ? url + '&lang=' + this.currentLanguage : url + '?lang=' + this.currentLanguage;
        return this.http.put(url, body, options).map(function (r) {
            if (!offLoader) {
                _this.AmBusy(_this.Busymessage);
            }
            _this.debug(r);
            setTimeout(function () {
                _this.initializeToken();
            }, 500);
            return r;
        }).catch(function (error) {
            error = error.error;
            if (!offLoader) {
                _this.AmBusy(_this.Busymessage, true);
                _this.AmError(_this.translate.instant("ERROR"), error.message, [{ text: _this.translate.instant('CLOSE'), role: _this.translate.instant('CANCEL') }]);
            }
            _this.debug(error);
            return __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__["Observable"].throw(error).map(function (r) { return r.json(); });
        });
    };
    ApiProvider.prototype.multipart = function (url, body, headers) {
        var _this = this;
        this.AmBusy(this.Busymessage);
        headers['x-token'] = this.Login.token;
        var options = {
            headers: new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["c" /* HttpHeaders */](headers)
        };
        url = url.startsWith('http') ? url : this.APIURL + url;
        url = url.indexOf('?') != -1 ? url + '&lang=' + this.currentLanguage : url + '?lang=' + this.currentLanguage;
        return this.http.post(url, body, options).map(function (r) {
            _this.AmBusy(_this.Busymessage);
            _this.debug(r);
            setTimeout(function () {
                _this.initializeToken();
            }, 500);
            return r;
        }).catch(function (error) {
            _this.AmBusy(_this.Busymessage);
            error = error.error;
            _this.debug(error);
            _this.AmError(error.status, error.message, [{ text: _this.translate.instant('CLOSE'), role: _this.translate.instant('CANCEL') }]);
            return __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__["Observable"].throw(error).map(function (r) { return r.json(); });
        });
    };
    ApiProvider.prototype.AmBusy = function (text, cancel) {
        if (!text)
            text = this.translate.instant("PLEASE_WAIT");
        if (cancel && this.loaderInstance) {
            this.loaderInstance.dismiss();
            this.loaderInstance = false;
            return;
        }
        else if (this.loaderInstance) {
            this.loaderInstance.dismiss();
            this.loaderInstance = false;
            return;
        }
        this.loaderInstance = this.loadCtrl.create({
            spinner: 'hide',
            content: text
        });
        this.loaderInstance.present();
    };
    ApiProvider.prototype.AmError = function (title, description, button) {
        var alert = this.alertCtrl.create({
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
    };
    ApiProvider.prototype.showInfo = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 5000,
            position: 'bottom',
            dismissOnPageChange: true
        });
        toast.present();
    };
    ApiProvider.prototype.debug = function (response) {
    };
    ApiProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["ToastController"]])
    ], ApiProvider);
    return ApiProvider;
}());

//# sourceMappingURL=services.js.map

/***/ }),

/***/ 76:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectPaymethods; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_BootstrapFirstRun__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the LoyaltyPointsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SelectPaymethods = /** @class */ (function () {
    function SelectPaymethods(navCtrl, configuration, events, navParams, viewCtrl, api) {
        this.navCtrl = navCtrl;
        this.configuration = configuration;
        this.events = events;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.api = api;
        this.mPaymethod = 'point';
        this.isConfirmable = true;
        this.beach_settings = [];
        this.mPoints = 0;
        this.isCard = false;
        this.mTotal = 0;
        this.search = {};
        this.location = '';
        this.data = [];
        this.title = '';
        this.index = '0';
        this.startEndDate = { start: '', end: '' };
        this.settings = [];
        this.total = 0;
        this.customer = [];
        this.selected = 1;
        this.mPoints = this.navParams.data['points'];
        this.isCard = this.navParams.data['isCard'];
        this.mTotal = this.navParams.data['total'];
        this.onSelectMethod();
        this.search = this.navParams.data.search;
        this.location = this.navParams.data.location;
        this.data = this.navParams.data.data;
        this.title = this.navParams.data.title;
        this.index = this.navParams.data.index;
        this.settings = this.navParams.data.settings;
        this.selected = this.navParams.data.selected;
        this.total = this.navParams.data.total;
        this.startDate();
        this.beach_settings = JSON.parse(localStorage.getItem('beachsettings') || '[]');
    }
    SelectPaymethods.prototype.ngOnInit = function () {
        var _this = this;
        this.configuration.getStorage('login').then(function (a) {
            if (a && a.token) {
                _this.customer = a;
            }
        }, function (error) { });
    };
    SelectPaymethods.prototype.getBeachWorkingHours = function () {
        var workingHours;
        var self = this;
        this.beach_settings.map(function (beach) {
            if (beach.beach_id === self.settings.beach_id) {
                workingHours = beach.working_hours || {};
            }
        });
        return workingHours;
    };
    SelectPaymethods.prototype.getLocalDateTime = function (date) {
        var dateObj = new Date(date);
        var hoursWithTimezone = dateObj.getHours() + ((-1) * (dateObj.getTimezoneOffset() / 60));
        return new Date(new Date(date).setHours(hoursWithTimezone)).getTime();
    };
    SelectPaymethods.prototype.dateint = function (date) {
        if (this.search && this.search.start_date) {
            if (date) {
                return { start: new Date(this.search.start_date), end: new Date(this.search.end_date) };
            }
            return { start: this.search.start_date, end: this.search.end_date };
        }
        else {
            var date_1 = new Date();
            if (date_1) {
                return { start: new Date(date_1.getDate()), end: new Date(date_1.getDate()) };
            }
            return { start: date_1.getMilliseconds(), end: date_1.getMilliseconds() };
        }
    };
    SelectPaymethods.prototype.startDate = function () {
        var date = this.dateint(true);
        var start_date = date.start;
        var end_date = date.end;
        this.startEndDate = {
            start: start_date.getFullYear() + "." + (start_date.getMonth() + 1) + "." + start_date.getDate(),
            end: end_date.getFullYear() + "." + (end_date.getMonth() + 1) + "." + end_date.getDate()
        };
    };
    SelectPaymethods.prototype.sunbed = function () {
        var date = this.dateint();
        return {
            broker_id: this.data.broker_id,
            waiter_id: this.data.waiter_id,
            beach_id: this.settings.beach_id,
            created_by: this.customer.id,
            seat: {
                type: this.data.type,
                count: this.selected
            },
            phone: this.customer.phone,
            start_date: date.start,
            end_date: date.end,
            amount: this.total,
            virtual_cash: true
        };
    };
    SelectPaymethods.prototype.umbrella = function () {
        var date = this.dateint();
        return {
            broker_id: this.data.broker_id,
            waiter_id: this.data.waiter_id,
            beach_id: this.settings.beach_id,
            created_by: this.customer.id,
            seat: {
                type: this.data.type,
                zone: this.location,
                number: this.index,
                slots: this.data.slots,
                extra_seats: this.navParams.data.extra,
                position: { x: this.data.coords.x, y: this.data.coords.y }
            },
            phone: this.customer.phone,
            start_date: date.start,
            end_date: date.end,
            amount: this.total,
            virtual_cash: true
        };
    };
    SelectPaymethods.prototype.baldaquin = function () {
        var date = this.dateint();
        return {
            broker_id: this.data.broker_id,
            waiter_id: this.data.waiter_id,
            beach_id: this.settings.beach_id,
            created_by: this.customer.id,
            seat: {
                type: this.data.type,
                zone: this.location,
                number: this.index,
                position: { x: this.data.coords.x, y: this.data.coords.y }
            },
            phone: this.customer.phone,
            start_date: date.start,
            end_date: date.end,
            amount: this.total,
            virtual_cash: true
        };
    };
    // ----------------------------------------------
    SelectPaymethods.prototype.onSelectMethod = function () {
        if (this.mPaymethod == 'point') {
            if (this.mPoints > this.mTotal) {
                this.isConfirmable = true;
            }
            else {
                this.isConfirmable = false;
            }
        }
        else {
            this.isConfirmable = true;
        }
    };
    SelectPaymethods.prototype.onClickConfirm = function () {
        var _this = this;
        var reservationCopy = JSON.parse(JSON.stringify(this[this.data.type]()));
        var reservation = this[this.data.type]();
        reservation.start_date = this.getLocalDateTime(reservation.start_date);
        reservation.end_date = this.getLocalDateTime(reservation.end_date);
        // reservation.customer_id = reservation.customer_id ? reservation.customer_id : this.customer.id;
        this.api.post('booking', reservation, {}).subscribe(function (r) {
            _this.navParams.data.nav.popToRoot();
            _this.navCtrl.popToRoot();
            reservationCopy.name = _this.data.each_name;
            _this.configuration.setStorage('reservation', reservationCopy).then(function () {
                _this.events.publish('reservation:received');
            }, function (error) { });
            _this.viewCtrl.dismiss();
        }, function (error) { });
    };
    SelectPaymethods.prototype.availConfirm = function () {
        if (this.isCard) {
            return true;
        }
        else {
            if (this.mPoints - this.mTotal < 0)
                return false;
            else
                return true;
        }
    };
    SelectPaymethods = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Component"])({
            selector: 'page-select-paymethods',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\select-paymethods\select-paymethods.html"*/'<!--\n\n  Generated template for the LoyaltyPointsPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n    <ion-navbar>\n\n      <ion-title>{{ "PAY" | translate }}</ion-title>\n\n      <button ion-button clear icon-only right (click)="viewCtrl.dismiss()" class="close-btn"><ion-icon name="ios-close-outline"></ion-icon></button>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <ion-list radio-group [(ngModel)]="mPaymethod"> \n\n\n\n    <ion-list-header no-lines>\n\n      {{ "SELECT_PAY_METHOD" | translate }}\n\n    </ion-list-header>\n\n      \n\n    <ion-item no-lines>\n\n      <ion-radio value="point" (ionSelect)="onSelectMethod()"></ion-radio>\n\n      <ion-label>Loiality Point ( {{ mPoints }} points )</ion-label>\n\n    </ion-item>\n\n    \n\n<!--   \n\n    <ion-item *ngIf=\'isCard\' no-lines>\n\n      <ion-radio value="card" (ionSelect)="onSelectMethod()"></ion-radio>\n\n      <ion-label>Credit card</ion-label>\n\n    </ion-item> -->\n\n\n\n    <ion-item no-lines class="total_cont">\n\n      <h2>Total : {{mTotal}} ron</h2>\n\n    </ion-item>\n\n    <button ion-button round full pink-gradient [disabled]="!isConfirmable" (click)="onClickConfirm()">{{ "CONFIRM" | translate }}</button>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\select-paymethods\select-paymethods.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_2__app_BootstrapFirstRun__["a" /* CustomBootstrap */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["Events"], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_1__providers_services__["a" /* ApiProvider */]])
    ], SelectPaymethods);
    return SelectPaymethods;
}());

//# sourceMappingURL=select-paymethods.js.map

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return verification; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs_tabs__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_BootstrapFirstRun__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_tools__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__login_login__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__includes_confirmVerification_confirmVerification__ = __webpack_require__(65);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/**
 * Created by shadow-viper on 12/20/17.
 */
//declare var OTPAutoVerification:any;
var verification = /** @class */ (function () {
    function verification(popoverCtrl, navCtrl, navparam, viewCtrl, api, configuration, tools) {
        var _this = this;
        this.popoverCtrl = popoverCtrl;
        this.navCtrl = navCtrl;
        this.navparam = navparam;
        this.viewCtrl = viewCtrl;
        this.api = api;
        this.configuration = configuration;
        this.tools = tools;
        this.timer = [
            3, 5, 15, 30, 60
        ];
        this.timerStart = 0;
        this.requestPage = 'verificationPage';
        this.verificationCode = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormGroup"]({
            v1: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"]('', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].maxLength(1)]),
            v2: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"]('', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].maxLength(1)]),
            v3: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"]('', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].maxLength(1)]),
            v4: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"]('', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].maxLength(1)])
        });
        this.counterInstance = false;
        this.mobile = this.navparam.get('mobile');
        this.configuration.getStorage('smsValidation').then(function (a) {
            if (a) {
                _this.validation_id = a.uuid;
            }
        });
        this.configuration.getStorage('phoneData').then(function (dt) {
            if (dt) {
                console.log("1234-vier", dt);
                _this.phoneData = dt;
            }
        });
    }
    verification_1 = verification;
    verification.prototype.ionViewWillEnter = function () {
        this.configuration.setRequestPage(this.requestPage);
    };
    verification.prototype.ngOnInit = function () {
        this.codeCounter = {
            diff: 0,
            s: 0,
            m: 0,
            d: 0,
            M: 0
        };
        this.startCounter(this.timer[this.timerStart]);
    };
    verification.prototype.finishVerification = function () {
        var _this = this;
        if (this.verificationCode.valid) {
            var verifString = '';
            for (var i in this.verificationCode.value) {
                if (this.verificationCode.value.hasOwnProperty(i)) {
                    if (this.verificationCode.value[i] != null && this.verificationCode.value) {
                        verifString += this.verificationCode.value[i];
                    }
                }
            }
            this.api.post('verify-sms-pin', { pin: verifString, phone: this.phoneData.phone, prefix: this.phoneData.prefix, suffix: this.phoneData.suffix }, { 'Content-Type': 'application/json' }).subscribe(function (r) {
                if (_this.navparam.data.user && _this.navparam.data.user.name) {
                    _this.doLogin(_this.phoneData.phone, _this.navparam.data.user.password, _this.navparam.data.user.lang);
                }
                else {
                    _this.navCtrl.push(_this.navparam.get('page'), { mobile: _this.phoneData.phone });
                    _this.stopTimer();
                    _this.configuration.getStorage('AdditionalRegData').then(function (a) {
                        if (a && a.complete) {
                            a.canUse = true;
                            _this.configuration.setStorage('AdditionalRegData', a).then(function (a) {
                                //user can reuse mobile now
                                if (_this.api.fcmToken) {
                                    setTimeout(function () {
                                        _this.api.get("fcm/" + _this.api.fcmToken, {}, {}, true).subscribe(function (res) {
                                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__tabs_tabs__["a" /* TabsPage */], { reservation: r.reservations });
                                        }, function (error) {
                                            alert(error.message);
                                        });
                                    }, 500);
                                }
                                else {
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__tabs_tabs__["a" /* TabsPage */], { reservation: r.reservations });
                                }
                            });
                        }
                    });
                }
            }, function (error) {
            });
        }
    };
    verification.prototype.setfocus = function (event) {
        event.preventDefault();
        if (event.keyCode === 8 || event.key === 'Backspace' || event.keyCode === 46 || event.key === 'Delete') {
            for (var i = Object.keys(this.verificationCode.value).length; i >= 0; i--) {
                if (Object.keys(this.verificationCode.value).hasOwnProperty(i)) {
                    if (this.verificationCode.value[Object.keys(this.verificationCode.value)[i]] && this.verificationCode.value[Object.keys(this.verificationCode.value)[i]] != '') {
                        this.verificationCode.controls[Object.keys(this.verificationCode.value)[i]].setValue('');
                        this[Object.keys(this.verificationCode.value)[i]].setFocus();
                        break;
                    }
                }
            }
            return;
        }
        else {
            for (var i in this.verificationCode.value) {
                if (this.verificationCode.value.hasOwnProperty(i)) {
                    if (!this.verificationCode.value[i] && !(!isNaN(parseFloat(this.verificationCode.value[i])) && isFinite(this.verificationCode.value[i]))) {
                        this[i].setFocus();
                        return;
                    }
                }
            }
        }
        this.finishVerification();
    };
    verification.prototype.stopTimer = function () {
        if (this.counterInstance) {
            clearInterval(this.counterInstance);
            this.counterInstance = false;
        }
    };
    verification.prototype.startCounter = function (startMin) {
        var _this = this;
        if (startMin) {
            startMin = (startMin * 60);
            if (!this.counterInstance) {
                this.counterInstance = setInterval(function () {
                    if (startMin > 0) {
                        startMin--;
                    }
                    if (startMin <= 0) {
                        _this.stopTimer();
                    }
                    _this.codeCounter = _this.tools.GetDateDiv(startMin);
                }, 1000);
                this.timerStart += 1;
            }
        }
        else {
            this.codeCounter = '';
        }
    };
    verification.prototype.transformToString = function (startMin) {
        return startMin.toString().length < 2 ? '0' + startMin : startMin.toString();
    };
    verification.prototype.didntRecieve = function () {
        var _this = this;
        this.api.post('request-validation', this.phoneData, { 'Content-Type': 'application/json' }).subscribe(function (r) {
            //this.validation_id=r.id;
            // this.configuration.setStorage('smsValidation',r);
            _this.startCounter(_this.timer[_this.timerStart]);
        }, function (error) {
        });
    };
    verification.prototype.ngDestroy = function () {
        this.stopTimer();
    };
    verification.prototype.updateDevice = function () {
        var _this = this;
        this.configuration.getStorage('deviceInfo').then(function (r) {
            if (r && r.model) {
                _this.api.post('device', { model: r.model, platform: r.platform, version: r.version, manufacturer: r.manufacturer }, { 'Content-Type': 'application/json' }).subscribe(function (r) {
                }, function (error) {
                });
            }
        });
    };
    /*  watchSms(otp:any){
       this.stopWatchSMS();
        if(otp && otp>0){
          let otpAr:Array<any>=otp.split('');
          for(let i =0; i<otpAr.length; i++){
            if(otpAr.hasOwnProperty(i)){
              this.verificationCode.controls['v'+(i+1)].setValue(otpAr[i]);
            }
          }
          this.finishVerification();
        }
      }
    
    
      stopWatchSMS() {
     /!*   OTPAutoVerification.stopOTPListener();
    
      }*/
    verification.prototype.doLogin = function (username, password, lang) {
        var _this = this;
        this.api.post('login', { phone: username, password: password }, { 'Content-Type': 'application/json' }).subscribe(function (r) {
            if (r.validated) {
                if (lang) {
                    r.lang = lang;
                }
                _this.configuration.setStorage('login', r);
                _this.stopTimer();
                _this.configuration.getStorage('AdditionalRegData').then(function (a) {
                    a.canUse = true;
                    _this.configuration.setStorage('UserPhoneInfo', a).then(function (reg) {
                        if (a && a.complete) {
                            a.canUse = true;
                            _this.configuration.setStorage('AdditionalRegData', a).then(function (a) {
                                //user can reuse mobile now
                                if (_this.api.fcmToken) {
                                    setTimeout(function () {
                                        _this.api.get("fcm/" + _this.api.fcmToken, {}, {}, true).subscribe(function (res) {
                                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__tabs_tabs__["a" /* TabsPage */], { reservation: r.reservations });
                                        }, function (error) {
                                            alert(error.message);
                                        });
                                    }, 500);
                                }
                                else {
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__tabs_tabs__["a" /* TabsPage */], { reservation: r.reservations });
                                }
                            });
                        }
                    });
                });
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__tabs_tabs__["a" /* TabsPage */]);
            }
            else {
                _this.api.AmError(_this.configuration.translate.translate.instant("NOT_VALIDATED"), _this.configuration.translate.translate.instant("PLEASE_VALIDATE_YOUR_ACCOUNT"), [{ text: _this.configuration.translate.translate.instant("VALIDATE"), handler: function () {
                            var popoverSignup = _this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_8__includes_confirmVerification_confirmVerification__["a" /* confirmVerification */], { page: verification_1, next: __WEBPACK_IMPORTED_MODULE_7__login_login__["a" /* LoginPage */], process: { fn: 'SignupVerification', data: username } });
                            popoverSignup.present();
                        } }]);
            }
        }, function (error) {
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('input1'),
        __metadata("design:type", Object)
    ], verification.prototype, "v1", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('input2'),
        __metadata("design:type", Object)
    ], verification.prototype, "v2", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('input3'),
        __metadata("design:type", Object)
    ], verification.prototype, "v3", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('input4'),
        __metadata("design:type", Object)
    ], verification.prototype, "v4", void 0);
    verification = verification_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'verification',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\verification\verification.html"*/'<ion-header class="has-shadow">\n\n\n\n  <ion-navbar>\n\n    <ion-title>{{ mobile }}</ion-title>\n\n    <ion-buttons end>\n\n      <button ion-button  (click)="finishVerification()">\n\n       {{ \'DONE\' |translate }}\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-list>\n\n    <div class="textBody">\n\n      <p class="paragraphMargined margin top double">{{ "WE_HAVE_SENT_YOU_AN_SMS_WITH_A_CODE_TO_THE_NUMBER_ABOVE"|translate }}</p>\n\n      <p class="paragraphMargined margin top">{{ "TO_COMPLETE_YOUR_PHONE_VERIFICATION_PLEASE_ENTER_THE_4_DIGITS_ACTIVATION_CODE" |translate }}</p>\n\n    </div>\n\n    <form [formGroup]="verificationCode" (submit)="finishVerification()" name="verificationForm">\n\n      <div class="boxInput margin top">\n\n        <ion-input #input1 maxlength="1" type="number" formControlName="v1" (keyup)="setfocus($event)" required></ion-input>\n\n        <ion-input #input2 maxlength="1" type="number" formControlName="v2" (keyup)="setfocus($event)" required></ion-input>\n\n        <ion-input #input3 maxlength="1" type="number" formControlName="v3" (keyup)="setfocus($event)" required></ion-input>\n\n        <ion-input #input4 maxlength="1" type="number" formControlName="v4" (keyup)="setfocus($event)"></ion-input>\n\n      </div>\n\n      <button type="submit" [hidden]="true" ion-button [disabled]="!verificationCode.valid"></button>\n\n    </form>\n\n\n\n    <div class="clearfix"></div>\n\n    <div class="counterSection">\n\n      <p *ngIf="codeCounter.diff>0">{{ "YOU_CAN_RE_SEND_CODE_IN" |translate }} <span>{{ transformToString(codeCounter.d) }}:{{ transformToString(codeCounter.h) }}:{{ transformToString(codeCounter.m) }}:{{ transformToString(codeCounter.s) }}</span></p>\n\n      <p *ngIf="codeCounter.diff<=0" (click)="didntRecieve()">{{ "DIDNT_RECEIVED_THE_TEXT_MESSAGE"|translate }} <span>{{ "RESEND_VALIDATION_CODE" |translate }}</span></p>\n\n    </div>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\verification\verification.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["PopoverController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_4__providers_services__["a" /* ApiProvider */], __WEBPACK_IMPORTED_MODULE_5__app_BootstrapFirstRun__["a" /* CustomBootstrap */], __WEBPACK_IMPORTED_MODULE_6__providers_tools__["a" /* Tools */]])
    ], verification);
    return verification;
    var verification_1;
}());

//# sourceMappingURL=verification.js.map

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return resetPassword; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__newpassword_newPassword__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__verification_verification__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__includes_confirmVerification_confirmVerification__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_BootstrapFirstRun__ = __webpack_require__(6);
/**
 * Created by shadow-viper on 12/18/17.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var resetPassword = /** @class */ (function () {
    function resetPassword(configuration, navCtrl, popoverCtrl, misc) {
        var _this = this;
        this.configuration = configuration;
        this.navCtrl = navCtrl;
        this.popoverCtrl = popoverCtrl;
        this.misc = misc;
        this.PICTURE_RATIO = 1659 / 1200;
        this.shouldTop = document.body.clientHeight - document.body.clientWidth * this.PICTURE_RATIO + 'px';
        this.requestPage = 'ResetPassword';
        this.resetData = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["FormGroup"]({
            phone: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["FormControl"]('', [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["Validators"].minLength(8)]),
            prefix: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["FormControl"]('', [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["Validators"].minLength(1)]),
            suffix: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["FormControl"]('', [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["Validators"].minLength(1)]),
        });
        this.rand = Math.random();
        this.misc.getStorage('AdditionalRegData').then(function (a) {
            if (a && a.complete && a.complete.length > 6)
                _this.updatePhone(a);
        });
    }
    //TODO: Implement auth
    resetPassword.prototype.doForgetPass = function () {
        if (this.resetData.valid)
            this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_4__includes_confirmVerification_confirmVerification__["a" /* confirmVerification */], { page: __WEBPACK_IMPORTED_MODULE_3__verification_verification__["a" /* verification */], next: __WEBPACK_IMPORTED_MODULE_2__newpassword_newPassword__["a" /* newPassword */], process: { fn: 'reset', data: this.resetData.value } }).present();
    };
    resetPassword.prototype.ionViewWillEnter = function () {
        this.configuration.setRequestPage(this.requestPage);
    };
    resetPassword.prototype.updatePhone = function (event) {
        var _this = this;
        if (event && event.complete.length >= 1) {
            this.resetData.controls['phone'].setValue(event.complete);
            this.resetData.controls['prefix'].setValue(event.prefix);
            this.resetData.controls['suffix'].setValue(event.suffix);
            this.misc.setStorage('AdditionalRegData', event).then(function (a) {
                _this.toggleLanguage = Math.random();
            }, function (error) {
            });
        }
    };
    resetPassword = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'resetPassword',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\resetPassword\resetPassword.html"*/'\n\n\n\n<ion-content [style.background-position]="\'0 \' + shouldTop">\n\n\n\n<button ion-button icon-only class="btn" clear navPop><ion-icon name="ios-arrow-back" color="primary"></ion-icon></button>\n\n  <h1 text-center margined> {{ \'RESET_PASSWORD\' | translate }}</h1>\n\n\n\n  <h5 text-center color="dark">{{ \'FOR\' | translate }}</h5>\n\n  <form [formGroup]="resetData" (submit)="doForgetPass()">\n\n    <div margined>\n\n\n\n\n\n      <ion-input type="hidden" placeholder="+(40)722 222 222" formControlName="phone" required></ion-input>\n\n\n\n      <phoneComponent (CompletedSelect)="updatePhone($event)" [toggleData]="rand"></phoneComponent>\n\n\n\n      <button ion-button round full pink-gradient class="login-button" [disabled]="!resetData.valid">{{ \'SUBMIT\'|translate }}</button>\n\n    </div>\n\n  </form>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\resetPassword\resetPassword.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__app_BootstrapFirstRun__["a" /* CustomBootstrap */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["PopoverController"], __WEBPACK_IMPORTED_MODULE_6__app_BootstrapFirstRun__["a" /* CustomBootstrap */]])
    ], resetPassword);
    return resetPassword;
}());

//# sourceMappingURL=resetPassword.js.map

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return beachAgreement; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_BootstrapFirstRun__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_agreement_helper__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import { myReservation } from "../../../myReservation/myReservation";





/**
 * Created by shadow-viper on 12/19/17.
 */
var beachAgreement = /** @class */ (function () {
    function beachAgreement(app, platform, events, viewCtrl, navCtrl, navparam, configuration, api, translateService, popoverCtrl, alertCtrl, translate, agreement) {
        this.app = app;
        this.platform = platform;
        this.events = events;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navparam = navparam;
        this.configuration = configuration;
        this.api = api;
        this.translateService = translateService;
        this.popoverCtrl = popoverCtrl;
        this.alertCtrl = alertCtrl;
        this.translate = translate;
        this.agreement = agreement;
        this.search = {};
        this.location = '';
        this.data = [];
        this.title = '';
        this.index = '0';
        this.startEndDate = { start: '', end: '' };
        this.settings = [];
        this.total = 0;
        this.customer = [];
        this.selected = 1;
        this.contents = [];
        this.contentArray = [];
        this.extra = 0;
        this.beach_settings = [];
        this.onNotificationSubscription = false;
        this.platform.ready().then(function () {
        });
        this.search = this.navparam.data.search;
        this.location = this.navparam.data.location;
        this.data = this.navparam.data.data;
        this.title = this.navparam.data.title;
        this.index = this.navparam.data.index;
        this.settings = this.navparam.data.settings;
        this.contents = (this.settings.agreement) ? this.settings.agreement : [];
        this.selected = this.navparam.data.selected;
        this.extra = this.navparam.data.extra;
        this.total = this.navparam.data.total;
        this.beach_settings = JSON.parse(localStorage.getItem('beachsettings') || '[]');
        // if (this.contents && this.contents[this.translateService.currentLang]) {
        //     this.contentArray = this.contents[this.translateService.currentLang].split('\n');
        // }
        if (this.contents) {
            this.contentArray = this.contents;
        }
        this.startDate();
    }
    beachAgreement.prototype.ngOnInit = function () {
        var _this = this;
        this.configuration.getStorage('login').then(function (a) {
            if (a && a.token) {
                _this.customer = a;
            }
        }, function (error) { });
    };
    beachAgreement.prototype.agree = function () {
        this.viewCtrl.dismiss({
            agreed: true
        });
    };
    beachAgreement.prototype.decline = function () {
        this.viewCtrl.dismiss();
    };
    beachAgreement.prototype.getBeachWorkingHours = function () {
        var workingHours;
        var self = this;
        this.beach_settings.map(function (beach) {
            if (beach.beach_id === self.settings.beach_id) {
                workingHours = beach.working_hours || {};
            }
        });
        return workingHours;
    };
    beachAgreement.prototype.getLocalDateTime = function (date) {
        var dateObj = new Date(date);
        var hoursWithTimezone = dateObj.getHours() + ((-1) * (dateObj.getTimezoneOffset() / 60));
        return new Date(new Date(date).setHours(hoursWithTimezone)).getTime();
    };
    beachAgreement.prototype.dateint = function (date) {
        if (this.search && this.search.start_date) {
            if (date) {
                return { start: new Date(this.search.start_date), end: new Date(this.search.end_date) };
            }
            return { start: this.search.start_date, end: this.search.end_date };
        }
        else {
            var date_1 = new Date();
            if (date_1) {
                return { start: new Date(date_1.getDate()), end: new Date(date_1.getDate()) };
            }
            return { start: date_1.getMilliseconds(), end: date_1.getMilliseconds() };
        }
    };
    beachAgreement.prototype.startDate = function () {
        var date = this.dateint(true);
        var start_date = date.start;
        var end_date = date.end;
        this.startEndDate = {
            start: start_date.getFullYear() + "." + (start_date.getMonth() + 1) + "." + start_date.getDate(),
            end: end_date.getFullYear() + "." + (end_date.getMonth() + 1) + "." + end_date.getDate()
        };
    };
    beachAgreement.prototype.sunbed = function () {
        var date = this.dateint();
        return {
            broker_id: this.data.broker_id,
            waiter_id: this.data.waiter_id,
            beach_id: this.settings.beach_id,
            created_by: this.customer.id,
            seat: {
                type: this.data.type,
                count: this.selected
            },
            phone: this.customer.phone,
            start_date: date.start,
            end_date: date.end,
            amount: this.total
        };
    };
    beachAgreement.prototype.umbrella = function () {
        var date = this.dateint();
        return {
            broker_id: this.data.broker_id,
            waiter_id: this.data.waiter_id,
            beach_id: this.settings.beach_id,
            created_by: this.customer.id,
            seat: {
                type: this.data.type,
                zone: this.location,
                number: this.index,
                slots: this.data.slots,
                extra_seats: this.navparam.data.extra,
                position: { x: this.data.coords.x, y: this.data.coords.y }
            },
            phone: this.customer.phone,
            start_date: date.start,
            end_date: date.end,
            amount: this.total
        };
    };
    beachAgreement.prototype.baldaquin = function () {
        var date = this.dateint();
        return {
            broker_id: this.data.broker_id,
            waiter_id: this.data.waiter_id,
            beach_id: this.settings.beach_id,
            created_by: this.customer.id,
            seat: {
                type: this.data.type,
                zone: this.location,
                number: this.index,
                position: { x: this.data.coords.x, y: this.data.coords.y }
            },
            phone: this.customer.phone,
            start_date: date.start,
            end_date: date.end,
            amount: this.total
        };
    };
    beachAgreement = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'beachAgreement',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\popover\beachAgreement\beachAgreement.html"*/'<div class="agreement">\n\n\n\n    <div class="header">\n\n        <h1 margined ion-text text-center>{{ data.type }} #{{ index }} {{ data.section }}</h1>\n\n\n\n        <h3>\n\n            <span ion-text>{{"PERIOD" | translate}}:</span>\n\n            <span ion-text color="primary">{{ startEndDate.start }}</span>\n\n            <span ion-text>{{" - "}}</span>\n\n            <span ion-text color="primary">{{ startEndDate.end }}</span>\n\n\n\n        </h3>\n\n\n\n        <h3 *ngIf="data.type != \'baldaquin\'">{{"NUMBER_OF_SEATS" | translate}}:\n\n            <span ion-text color="primary">{{ selected+extra }}</span>\n\n        </h3>\n\n        <h3>\n\n            <span ion-text>{{(\'WORKING_HOURS\' | translate) + ": "}}</span>\n\n            <span ion-text color="primary">{{getBeachWorkingHours().start}}</span>\n\n            <span ion-text>{{" - "}}</span>\n\n            <span ion-text color="primary">{{getBeachWorkingHours().end}}</span>\n\n        </h3>\n\n\n\n    </div>\n\n    <div class="contents" *ngIf="contents.length">\n\n        \n\n            <div *ngFor="let content of contentArray ; let ind = index">\n\n                <p>\n\n                    <span ion-text color="primary">{{"INFO" | translate}} {{ind}}:</span>\n\n                    \n\n                        <span>{{contents[ind]}}</span>\n\n                    \n\n                </p>\n\n                \n\n            </div>\n\n      \n\n    </div>\n\n    <div class="contents" *ngIf="!contents.length">\n\n        <p>\n\n            <span ion-text color="primary">{{"INFO1" | translate}}</span>\n\n            <span>{{\n\n                configuration.translate.translate.instant(\'INFO1_1_CONTENT\',{number:settings.booking_time_limit})}}</span>\n\n            <span>{{\n\n                configuration.translate.translate.instant(\'INFO1_2_CONTENT\',{number:settings.cancel_daily_limit})}}</span>\n\n            <span>{{"INFO1_3_CONTENT" | translate}}</span>\n\n        </p>\n\n        <p>\n\n            <span ion-text color="primary">{{"INFO2" | translate}}</span> {{"INFO2_1_CONTENT" | translate}} </p>\n\n        <p>\n\n            <span ion-text color="primary">{{"INFO3" | translate}}</span> {{"INFO3_1_CONTENT" | translate}} </p>\n\n        <p>\n\n            <span ion-text color="primary">{{"INFO4" | translate}}</span> {{"INFO4_1_CONTENT" | translate}} </p>\n\n        <p>\n\n            <span ion-text color="primary">{{"INFO5" | translate}}</span>\n\n            {{ configuration.translate.translate.instant(\'INFO5_1_CONTENT\',{value1:settings.hour_release_points,\n\n            value2:settings.partial_day_release_percent_to_points, value3:settings.day_release_percent_to_points}) }}\n\n        </p>\n\n    </div>\n\n\n\n    <div class="footer">\n\n        <ion-row>\n\n            <ion-col>\n\n                <button ion-button color="primary" dark block outline small round (click)="decline()">{{ \'CLOSE\' |\n\n                    translate }}</button>\n\n            </ion-col>\n\n            <ion-col>\n\n                <button ion-button color="primary" dark block outline small round (click)="agree()">{{ \'I_AGREE\' |\n\n                    translate }}</button>\n\n            </ion-col>\n\n        </ion-row>\n\n    </div>\n\n\n\n</div>'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\includes\popover\beachAgreement\beachAgreement.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["App"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__app_BootstrapFirstRun__["a" /* CustomBootstrap */],
            __WEBPACK_IMPORTED_MODULE_3__providers_services__["a" /* ApiProvider */], __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["PopoverController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_5__providers_agreement_helper__["a" /* AgreementHelper */]])
    ], beachAgreement);
    return beachAgreement;
}());

//# sourceMappingURL=beachAgreement.js.map

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BeachProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Created by shadow-viper on 1/21/18.
 */
var BeachProvider = /** @class */ (function () {
    function BeachProvider() {
        this.sunbed = {
            selected: 0,
            values: []
        };
    }
    BeachProvider.prototype.getPrice = function (beach_settings, type, location, search) {
        if (type == 'sunbed' && beach_settings.seats_price)
            return beach_settings.seats_price[type][this.isWeekend() ? 'weekend' : 'daily'];
        if (beach_settings && beach_settings.seats_price[location] && beach_settings.seats_price[location][type]) {
            return this.searchDate(search, beach_settings.seats_price[location][type].periods);
        }
    };
    BeachProvider.prototype.getPeriod = function (search) {
        var edate = new Date(search.end_date);
        var sdate = new Date(search.start_date);
        if (edate.getDay() < sdate.getDay()) {
            return (this.getDaysInMonth(sdate.getMonth() + 1, sdate.getFullYear()) - sdate.getDay()) + edate.getDay() + 1;
        }
        else {
            return edate.getDay() - sdate.getDay() + 1;
        }
    };
    BeachProvider.prototype.getDaysInMonth = function (month, year) {
        return new Date(year, month, 0).getDate();
    };
    BeachProvider.prototype.searchDate = function (search, settings) {
        var s = {
            start: search && search.start_date ? new Date(search.start_date) : new Date(),
            end: search && search.end_date ? new Date(search.end_date) : new Date()
        };
        for (var i in settings) {
            if (settings.hasOwnProperty(i)) {
                if (new Date(settings[i].start) <= s.start) {
                    return this.isWeekend() ? settings[i].weekend : settings[i].daily;
                }
            }
        }
    };
    BeachProvider.prototype.isWeekend = function () {
        var date = new Date();
        return date.getDay() == 6 || date.getDay() == 0;
    };
    BeachProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], BeachProvider);
    return BeachProvider;
}());

//# sourceMappingURL=beachProvider.js.map

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ratingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_services__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_BootstrapFirstRun__ = __webpack_require__(6);
/**
 * Created by shadow-viper on 12/18/17.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ratingPage = /** @class */ (function () {
    function ratingPage(navparam, api, configuration) {
        this.navparam = navparam;
        this.api = api;
        this.configuration = configuration;
        this.rating = [];
        this.myRate = 1;
        this.write = false;
        this.review = [];
        this.requestPage = 'Rating';
        this.page = 1;
        this.title = '';
        this.perPage = 0;
        this.myReview = '';
        this.customer = [];
        this.infiniteCount = 0;
        this.title = this.navparam.data.title;
    }
    ratingPage.prototype.ngOnInit = function () {
        var _this = this;
        this.beach_id = this.navparam.data.id;
        this.configuration.getStorage('login').then(function (a) {
            if (a && a.token) {
                _this.customer = a;
                _this.ratings();
                _this.reviews();
            }
        }, function (error) { });
    };
    ratingPage.prototype.ionViewWillEnter = function () {
        this.configuration.setRequestPage(this.requestPage);
    };
    ratingPage.prototype.ratings = function () {
        var _this = this;
        if (this.beach_id) {
            this.api.get("rating", { beach_id: this.beach_id, customer_id: this.customer.id }, {}, false, true).subscribe(function (r) {
                _this.rating = r;
                if (_this.rating.rated && !_this.rating.reviewed) {
                    _this.write = true;
                }
                else {
                    _this.write = false;
                }
            }, function (error) {
            });
        }
    };
    ratingPage.prototype.reviews = function (infiniteScroll) {
        var _this = this;
        if (this.beach_id) {
            this.api.get("reviews/" + this.beach_id + "/?offset=" + this.infiniteCount, {}, {}, true).subscribe(function (r) {
                if (infiniteScroll && infiniteScroll.state) {
                    if (_this.review && _this.review.items && _this.review.items.length)
                        _this.review.items = _this.review.items.concat(r.items);
                    infiniteScroll.complete();
                }
                else {
                    _this.review = r;
                }
            }, function (error) {
            });
        }
    };
    ratingPage.prototype.newReview = function () {
        var _this = this;
        if (this.beach_id && this.customer && this.customer.id) {
            var reviews = { beach_id: this.beach_id, customer_id: this.customer.id, vote: this.myRate, review: this.myReview };
            this.api.post('review', reviews, {}).subscribe(function (r) {
                _this.api.AmError('Rating', r.message, [{ text: 'Close', handler: function () {
                            _this.write = false;
                            _this.reviews();
                        } }]);
            });
        }
    };
    ratingPage.prototype.newRating = function () {
        var _this = this;
        if (this.beach_id && this.customer && this.customer.id && this.myRate) {
            var rateParam = { beach_id: this.beach_id, customer_id: this.customer.id, vote: this.myRate };
            this.api.post('rating', rateParam, {}).subscribe(function (r) {
                if (!_this.rating.reviewed) {
                    _this.write = true;
                }
            }, function (error) { });
        }
    };
    ratingPage.prototype.toggleRate = function (data) {
        this.myRate = data;
    };
    ratingPage.prototype.more = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            _this.infiniteCount += 10;
            _this.reviews(infiniteScroll);
            if (_this.infiniteCount >= _this.review.length) {
                infiniteScroll.enable(false);
                _this.infiniteCount = _this.review.length;
            }
        }, 300);
    };
    ratingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'rating-page',template:/*ion-inline-start:"E:\2019\06\2Ionic\CUSTOMER\src\pages\rating\rating.html"*/'<ion-header class="has-shadow">\n\n\n\n  <ion-navbar>\n\n    <ion-title>{{ title }}</ion-title>\n\n    <ion-buttons end>\n\n\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n  <ion-content>\n\n    <ion-card>\n\n      <div class=" {{ write?\'rtHolder\':\'active\' }}">\n\n        <div>\n\n          <h2 text-center margined color="dark" ion-text>{{ \'ENJOYING_THE_BEACH\' | translate }}</h2>\n\n          <h3 text-center margined color="grey" ion-text>{{ \'PLEASE_USE_THE_STAR_TO_RATE_IT\' | translate }}</h3>\n\n        </div>\n\n        <div class="star-rating big">\n\n          <ion-icon name="star" (click)="toggleRate(1)" [class.full]="myRate>=1"></ion-icon>\n\n          <ion-icon name="star" (click)="toggleRate(2)"  [class.full]="myRate>=2"></ion-icon>\n\n          <ion-icon name="star" (click)="toggleRate(3)"  [class.full]="myRate>=3"></ion-icon>\n\n          <ion-icon name="star" (click)="toggleRate(4)"  [class.full]="myRate>=4"></ion-icon>\n\n          <ion-icon name="star" (click)="toggleRate(5)"  [class.full]="myRate>=5"></ion-icon>\n\n        </div>\n\n        <div>\n\n          <button ion-button  clear center [disabled]="!myRate || (myRate && myRate<=0)" (click)="newRating()">{{ \'SUBMIT\' | translate }}</button>\n\n        </div>\n\n      </div>\n\n      <div  class=" {{ write?\'active\':\'rtHolder\' }}">\n\n        <div>\n\n          <h2 text-center margined color="dark" ion-text>{{ \'WRITE_A_REVIEW\' | translate }}</h2>\n\n          <h3 text-center margined color="grey" ion-text>{{ \'PLEASE_TELL_US_WHAT_YOU_THINK\' | translate }}</h3>\n\n        </div>\n\n        <div class="reviewInput">\n\n          <ion-input type="text" name="review" [(ngModel)]="myReview" placeholder="Write Here"></ion-input>\n\n        </div>\n\n        <div>\n\n        <button ion-button clear center [disabled]="!myReview || (myReview && myReview.length<5)" (click)="newReview()">{{ \'SUBMIT\' | translate }}</button>\n\n      </div>\n\n      </div>\n\n    </ion-card>\n\n    <div class="SecondRatingHolder">\n\n      <h2 class="NumberRating">{{ rating.rating }}</h2>\n\n      <div class="iconRating">\n\n        <div class="star-rating small">\n\n          <ion-icon name="star" [class.full]="rating.rating>=1"></ion-icon>\n\n          <ion-icon name="star" [class.full]="rating.rating>=2"></ion-icon>\n\n          <ion-icon name="star" [class.full]="rating.rating>=3"></ion-icon>\n\n          <ion-icon name="star" [class.full]="rating.rating>=4"></ion-icon>\n\n          <ion-icon name="star" [class.full]="rating.rating>=5"></ion-icon>\n\n        </div>\n\n        <p class="digit">{{ rating.count }}</p>\n\n      </div>\n\n    </div>\n\n    <div class="clearfix"></div>\n\n    <ion-row class="review" *ngFor="let item of review.items">\n\n      <ion-col col-12 class="name">{{ item.author }}</ion-col>\n\n      <ion-col col-12 class="star">\n\n        <ion-row>\n\n          <ion-col>\n\n            <div class="star-rating small">\n\n              <ion-icon name="star" [class.full]="item.vote>=1"></ion-icon>\n\n              <ion-icon name="star" [class.full]="item.vote>=2"></ion-icon>\n\n              <ion-icon name="star" [class.full]="item.vote>=3"></ion-icon>\n\n              <ion-icon name="star" [class.full]="item.vote>=4"></ion-icon>\n\n              <ion-icon name="star" [class.full]="item.vote>=5"></ion-icon>\n\n          </div>\n\n          </ion-col>\n\n          <ion-col class="date">{{ item.created_at | timeHelper }}</ion-col>\n\n        </ion-row>\n\n      </ion-col>\n\n      <ion-col col-12 class="description">{{ item.review }}\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n\n\n    <ion-infinite-scroll (ionInfinite)="more($event)">\n\n      <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n\n\n  </ion-content>\n\n'/*ion-inline-end:"E:\2019\06\2Ionic\CUSTOMER\src\pages\rating\rating.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_services__["a" /* ApiProvider */], __WEBPACK_IMPORTED_MODULE_3__app_BootstrapFirstRun__["a" /* CustomBootstrap */]])
    ], ratingPage);
    return ratingPage;
}());

//# sourceMappingURL=rating.js.map

/***/ })

},[457]);
//# sourceMappingURL=main.js.map