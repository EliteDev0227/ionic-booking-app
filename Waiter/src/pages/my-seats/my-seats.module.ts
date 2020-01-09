import { NgModule } from "@angular/core";
import { MySeatsPage } from "./my-seats";
import { IonicPageModule } from "ionic-angular/module";
import { ComponentsModule } from "../../components/components.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations: [
        MySeatsPage
    ],
    imports: [
        IonicPageModule.forChild(MySeatsPage),
        TranslateModule.forChild(),
        ComponentsModule
    ]
})
export class MySeatsPageModule {}