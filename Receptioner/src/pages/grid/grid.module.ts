import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular/module";
import { GridPage } from "./grid";
import { TranslateModule } from "@ngx-translate/core";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { Keyboard } from "@ionic-native/keyboard";

@NgModule({
    declarations: [
        GridPage
    ],
    imports: [
        IonicPageModule.forChild(GridPage),
        TranslateModule.forChild()
    ],
    providers: [
        ScreenOrientation,
        Keyboard
    ]
})

export class GridPageModule { }