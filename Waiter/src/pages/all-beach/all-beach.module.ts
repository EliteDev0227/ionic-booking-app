import { NgModule } from "@angular/core";
import { AllBeachPage } from "./all-beach";
import { IonicPageModule } from "ionic-angular/module";
import { ComponentsModule } from "../../components/components.module";
import { TranslateModule } from "@ngx-translate/core";


@NgModule ({
    declarations: [
        AllBeachPage
    ],
    imports: [
        IonicPageModule.forChild(AllBeachPage),
        TranslateModule.forChild(),
        ComponentsModule
    ]
})

export class AllBeachPageModule {}