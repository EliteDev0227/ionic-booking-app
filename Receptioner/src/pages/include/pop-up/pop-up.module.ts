import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopUpPage } from './pop-up';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../components/components.module';
import { Keyboard } from '@ionic-native/keyboard';

@NgModule({
  declarations: [
    PopUpPage,
  ],
  imports: [
    IonicPageModule.forChild(PopUpPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
  providers:[
    Keyboard
  ]
})
export class PopUpPageModule {}
