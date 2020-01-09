import { SelectPaymethods } from './../pages/select-paymethods/select-paymethods';
import { LoyaltyPointsPage } from './../pages/myprofile/loyalty-points/loyalty-points';
import { NgModule, ErrorHandler } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular'
import { MyApp } from './app.component'
import { Keyboard } from '@ionic-native/keyboard';

import { LoginPage } from '../pages/login/login'
import { SignupPage } from '../pages/signup/signup'
import { TabsPage } from '../pages/tabs/tabs'
import { SearchPage } from '../pages/search/search'
import { CalendarPopoverPage } from '../pages/includes/searchMaster/calendar-popover/calendar-popover'
import { SearchDetailsPage } from '../pages/search-details/search-details'
import { SearchResultsPage } from '../pages/search-results/search-results'
import { FilterPopoverPage } from '../pages/search-results/filter-popover/filter-popover'
import { BeachPage } from '../pages/beach/beach'
import { CartPage } from '../pages/cart/cart'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CalendarModule } from 'ion2-calendar'
import { PopoverLang } from "../pages/includes/popover/language/popover.lang";
import { searchMaster } from "../pages/includes/searchMaster/searchMaster";
import { searchResult } from "../pages/includes/searchResults/searchResult";
import { beachDetails } from "../pages/beachDetails/beachDetails";
import { resetPassword } from "../pages/resetPassword/resetPassword";
import { ratingPage } from "../pages/rating/rating";
import { beachBook } from "../pages/beachBook/beachBook";
import { beachAgreement } from "../pages/includes/popover/beachAgreement/beachAgreement";
import { myReservation } from "../pages/myReservation/myReservation";
import { AdsPopoverPage } from "../pages/myReservation/ads-popover/ads-popover";
import { verification } from "../pages/verification/verification";
import { beachBookBaldaquin } from "../pages/beachBookBaldaquin/beachBookBaldaquin";
import { beachBookSunbed } from "../pages/beachBookSunbed/beachBookSunbed";
import { PopoverWeather } from "../pages/includes/popover/weatherPopover/popover.weather";
import { popoverHelper } from "../pages/includes/popoverHelper";
import { confirmVerification } from "../pages/includes/confirmVerification/confirmVerification";
import { newPassword } from "../pages/newpassword/newPassword";
import { Tools } from "../pages/providers/tools";
import { CustomBootstrap } from "./BootstrapFirstRun";
import { SeachprefixPage } from "../pages/seachprefix/seachprefix";
import { phoneComponent } from "../pages/includes/phoneComponent/phoneComponent";
import {
  ArraySortPipe, KeyPipe, PhoneSortPipe, ProductPipe, sortPipe, TimeHelperMoment,
  ToArrayPipe, InterpolationPipe, PricePipe, ArrayIndexSortPipe
} from "../pages/filters/sort";
import { IonicStorageModule } from "@ionic/storage";
import { langComponent } from "../pages/includes/langComponent/langComponent";
import { ApiProvider } from "../pages/providers/services";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { Device } from "@ionic-native/device";
import { SuppressEvents } from "../pages/directives/directive";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { translateServices } from "../pages/providers/translateServices";
import { AndroidPermissions } from "@ionic-native/android-permissions";
import { BeachProvider } from "../pages/providers/beachProvider";
import { beachUmbrella } from "../pages/includes/beach-umbrella/beach-umbrella";
import { firstPage } from "../pages/firstPage/firstPage";
import { Geo } from "../pages/providers/geolocation";
import { Geolocation } from '@ionic-native/geolocation'
import { BeachView } from "../pages/includes/beachView/beachView";
import { ReleasePage } from "../pages/includes/release/release";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { PlaceMapPage } from '../pages/place-map/place-map';
import { MenuPage } from '../pages/menu/menu';
import { searchDupplication } from '../pages/includes/searchDupplication/searchDupplication';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { ListPopoverPage } from './../pages/includes/searchMaster/list-popover/list-popover';
import { MyprofilePage } from "../pages/myprofile/myprofile";
import { TermsPage } from '../pages/terms/terms';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { Base64 } from '@ionic-native/base64';
import { File } from '@ionic-native/file';
import { Push } from '@ionic-native/push';
import { EventsThisWeek } from '../pages/includes/events/eventsThisWeek';
import { AppAvailability } from '@ionic-native/app-availability';
import { Diagnostic } from '@ionic-native/diagnostic';
import {LocationAccuracy} from '@ionic-native/location-accuracy';
import {MainGuestPage} from "../pages/main-guest-page/main-guest-page.component";
import {SearchResultIncludeComponent} from "../pages/includes/searchResultNew/searchResultInclude.component";
import { NgxCarouselModule } from 'ngx-carousel';
import {AgreementHelper} from "../pages/providers/agreement.helper";
import {ChatService} from "../pages/providers/chat-service";
import { TooltipsModule } from 'ionic-tooltips';
import {ChatPage} from "../pages/chat/chat";
import {PrivateChatPage} from "../pages/chat/privateChat/privatechat";
import { IonicImageViewerModule } from 'ionic-img-viewer';
import {ImageViewerPage} from "../pages/includes/imageViewer/imageViewer";





export function TranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    TabsPage,
    SearchPage,
    CalendarPopoverPage,
    SearchDetailsPage,
    SearchResultsPage,
    FilterPopoverPage,
    BeachPage,
    PopoverLang,
    CartPage,
    searchMaster,
    searchResult,
    beachDetails,
    resetPassword,
    ratingPage,
    beachBook,
    beachAgreement,
    myReservation,
    AdsPopoverPage,
    verification,
    beachBookBaldaquin,
    beachBookSunbed,
    PopoverWeather,
    confirmVerification,
    newPassword,
    ToArrayPipe,
    phoneComponent,
    SuppressEvents,
    ProductPipe,
    KeyPipe,
    sortPipe,
    langComponent,
    ArraySortPipe,
    BeachView,
    beachUmbrella,
    PhoneSortPipe,
    firstPage,
      ArrayIndexSortPipe,
    TimeHelperMoment,
    InterpolationPipe,
    ReleasePage,
    PlaceMapPage,
    MenuPage,
    searchDupplication,
    ListPopoverPage,
    SeachprefixPage,
    MyprofilePage,
    PricePipe,
    LoyaltyPointsPage,
    SelectPaymethods,
    TermsPage,
    EventsThisWeek,
      SearchResultIncludeComponent,
      MainGuestPage,
      ChatPage,
      PrivateChatPage,
      ImageViewerPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule,
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule,
    NgxCarouselModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (TranslateLoaderFactory),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      mode: 'ios',
      // backButtonIcon : 'ios-arrow-back',
      //  scrollAssist: false,
      
      // autoFocusAssist: false
      // autoFocusAssist: false,
      // scrollPadding :false,
      // autocomplete : 'off'
    }),
    HttpClientModule,
    TooltipsModule.forRoot(),
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    TabsPage,
    SearchPage,
    CalendarPopoverPage,
    SearchDetailsPage,
    SearchResultsPage,
    FilterPopoverPage,
    BeachPage,
    CartPage,
    PopoverLang,
    searchMaster,
    searchResult,
    beachDetails,
    resetPassword,
    ratingPage,
    beachBook,
    beachAgreement,
    myReservation,
    AdsPopoverPage,
    verification,
    beachBookBaldaquin,
    beachBookSunbed,
    beachUmbrella,
    PopoverWeather,
    confirmVerification,
    newPassword,
    phoneComponent,
    langComponent,
    firstPage,
    BeachView,
    ReleasePage,
    PlaceMapPage,
    MenuPage,
    searchDupplication,
    ListPopoverPage,
    SeachprefixPage,
    MyprofilePage,
    LoyaltyPointsPage,
    SelectPaymethods,
    TermsPage,
      SearchResultIncludeComponent,
    EventsThisWeek,
      MainGuestPage,
      ChatPage,
      PrivateChatPage,
      ImageViewerPage,
      
  ],
  providers: [
    Tools,
    StatusBar,
    SplashScreen,
    ApiProvider,
    CustomBootstrap,
    BeachProvider,
    Keyboard,
    translateServices,
      AgreementHelper,
    AndroidPermissions,
    Geolocation,
    ScreenOrientation,
    Geo,
    Device,
    InAppBrowser,
    popoverHelper,
    LaunchNavigator,
    Camera,
    Crop,
    Base64,
    File,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    Push,
    AppAvailability,
    Diagnostic,
    LocationAccuracy,
    ChatService
  ]
})
export class AppModule { }
