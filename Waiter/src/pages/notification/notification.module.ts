import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationPage } from './notification';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NotificationPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationPage),
    TranslateModule.forChild(),
  ],
})
export class NotificationPageModule {}
