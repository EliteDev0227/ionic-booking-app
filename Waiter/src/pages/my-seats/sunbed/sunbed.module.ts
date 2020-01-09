import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SunbedPage } from './sunbed';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SunbedPage,
  ],
  imports: [
    IonicPageModule.forChild(SunbedPage),
    TranslateModule.forChild(),
  ],
})
export class SunbedPageModule {}
