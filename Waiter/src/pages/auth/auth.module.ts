import { NgModule } from "@angular/core";
import { AuthPage } from "./auth";
import { IonicPageModule } from "ionic-angular/module";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";
import { HttpModule } from "@angular/http";


@NgModule({
    declarations: [
        AuthPage
    ],
    imports: [
        HttpModule,
        TranslateModule.forChild(),
        ComponentsModule,
        IonicPageModule.forChild(AuthPage)
    ]
})

export class AuthPageModule {

}