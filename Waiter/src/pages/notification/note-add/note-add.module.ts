import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoteAddPage } from './note-add';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NoteAddPage,
  ],
  imports: [
    IonicPageModule.forChild(NoteAddPage),
    TranslateModule.forChild(),
  ],
})
export class NoteAddPageModule {}
