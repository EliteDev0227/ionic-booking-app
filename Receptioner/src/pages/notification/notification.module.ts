import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationPage } from './notification';
import { TranslateModule } from '@ngx-translate/core';
import { Keyboard } from '@ionic-native/keyboard';
import { ScreenOrientation } from "@ionic-native/screen-orientation";

@NgModule({
  declarations: [
    NotificationPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationPage),
    TranslateModule.forChild(),
  ],
  providers: [
    Keyboard,
    ScreenOrientation
  ]
})
export class NotificationPageModule {}
