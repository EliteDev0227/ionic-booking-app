import { NgModule } from '@angular/core';
import { SingleToogleComponent } from './single-toogle/single-toogle';
import { IonicModule } from 'ionic-angular/module';
import { DoubleToggleComponent } from './double-toggle/double-toggle';
import { ThreePairToggleComponent } from './three-pair-toggle/three-pair-toggle';
import { RadioButtonComponent } from './radio-button/radio-button';
import { LangToggleComponent } from './lang-toggle/lang-toggle';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [
        SingleToogleComponent,
        DoubleToggleComponent,
        ThreePairToggleComponent,
    RadioButtonComponent,
    LangToggleComponent
    ],
	imports: [IonicModule, TranslateModule.forChild()],
	exports: [
        SingleToogleComponent,
        DoubleToggleComponent,
        ThreePairToggleComponent,
    RadioButtonComponent,
    LangToggleComponent
    ]
})
export class ComponentsModule {}
