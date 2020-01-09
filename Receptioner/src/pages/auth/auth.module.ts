import { NgModule } from "@angular/core";
import { AuthPage } from "./auth";
import { IonicPageModule } from "ionic-angular/module";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";
import { Keyboard } from "@ionic-native/keyboard";
import { ScreenOrientation } from "@ionic-native/screen-orientation";


@NgModule({
    declarations: [
        AuthPage
    ],
    imports: [
        IonicPageModule.forChild(AuthPage),
        TranslateModule.forChild(),
        ComponentsModule
    ],
    providers:[
        Keyboard,
        ScreenOrientation
    ]
})

export class AuthPageModule {}