import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UmbrellaPage } from './umbrella';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        UmbrellaPage,
    ],
    imports: [
        IonicPageModule.forChild(UmbrellaPage),
        TranslateModule.forChild(),
    ],
})
export class UmbrellaPageModule {}
