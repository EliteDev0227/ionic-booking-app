import { NgModule } from '@angular/core';
import { SingleToggleComponent } from './single-toggle/single-toggle';
import { IonicModule } from 'ionic-angular';
import { SelectUmbrellaComponent } from './select-umbrella/select-umbrella';
import { langComponent } from './langComponent/langComponent';

@NgModule({
	declarations: [
		SingleToggleComponent,
		SelectUmbrellaComponent,
		langComponent
	],
	imports: [
		IonicModule
	],
	exports: [
		SingleToggleComponent,
		SelectUmbrellaComponent,
		langComponent
	]
})
export class ComponentsModule {}
