import { BeachProvider } from './../providers/beachProvider';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard } from '@ionic-native/keyboard';

import { MyApp } from './app.component';
import { CommonProvider } from '../providers/common/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CalendarPopoverPage } from '../pages/include/calendar-popover/calendar-popover';
import { CalendarModule } from 'ion2-calendar';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CustomBootstrap } from './BootstrapFirstRun';
import { IonicStorageModule } from '@ionic/storage';
import { ApiProvider } from '../providers/services';
import { translateServices } from '../providers/translateServices';
import { PopoverLang } from '../pages/include/language/popover.lang';
import { Tools } from '../providers/tools';
import { NativeAudio } from '@ionic-native/native-audio';
import { Vibration } from '@ionic-native/vibration';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Push } from '@ionic-native/push';
import { GridApiProvider } from '../providers/grid-api';

@NgModule({
  declarations: [
    MyApp,
    CalendarPopoverPage,
    PopoverLang
  ],
  imports: [
    BrowserModule,
    IonicPageModule,
    CalendarModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist : false,
      autoFocusAssist : false,
      preloadModules: true,
      animate:false
    }),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CalendarPopoverPage,
    PopoverLang
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CustomBootstrap,
    CommonProvider,
    ApiProvider,
    translateServices,
    Keyboard, Tools, BeachProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NativeAudio,
    Vibration,
    PhotoViewer,
    Push,
    GridApiProvider
  ]
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/lang/','.json');
}