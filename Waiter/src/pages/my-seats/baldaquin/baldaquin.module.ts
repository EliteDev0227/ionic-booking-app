import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BaldaquinPage } from './baldaquin';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BaldaquinPage,
  ],
  imports: [
    IonicPageModule.forChild(BaldaquinPage),
    TranslateModule.forChild(),
  ],
})
export class BaldaquinPageModule {}
