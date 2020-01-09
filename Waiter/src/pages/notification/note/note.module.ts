import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotePage } from './note';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NotePage,
  ],
  imports: [
    IonicPageModule.forChild(NotePage),
    TranslateModule.forChild(),
  ],
})
export class NotePageModule {}
