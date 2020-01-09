import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { AppStuffProvider, TabStateService } from '../providers/app-stuff/app-stuff';
import { CommonProvider } from '../providers/common/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IonicPageModule } from 'ionic-angular/module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AppService } from '../services/app.service';
import { BeachService } from '../services/beach.service';
import { HttpModule } from '@angular/http';
import { UserService } from '../services/user.service';
import { AssetService } from '../services/asset.service';
import { NativeAudio } from '@ionic-native/native-audio';
import { Vibration } from '@ionic-native/vibration';
import { Push } from '@ionic-native/push';
import {IonicStorageModule} from "@ionic/storage";

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        IonicPageModule,
        HttpClientModule,
        HttpModule,
        IonicStorageModule.forRoot(),
        IonicModule.forRoot(MyApp, {
            scrollAssist : false,
            autoFocusAssist : false,
            preloadModules: true,
            animate:false
        }),
        TranslateModule.forRoot({
            loader : {
                provide: TranslateLoader,
                useFactory: TranslateLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ScreenOrientation,
        TranslateService,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        AppStuffProvider,
        TabStateService,
        CommonProvider,
        AppService,
        BeachService,
        UserService,
        AssetService,
        NativeAudio,
        Vibration,
        Push
    ]
})
export class AppModule {}

export function TranslateLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/lang/', '.json');
}