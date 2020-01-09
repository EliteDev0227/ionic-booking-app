import { NgModule } from "@angular/core";
import { TabsPage } from "./tabs";
import { IonicPageModule } from "ionic-angular/module";
import { LongPressModule } from "ionic-long-press";

@NgModule ({
    declarations: [
        TabsPage
    ],
    imports: [
        LongPressModule,
        IonicPageModule.forChild(TabsPage)
    ],
    exports: [
        TabsPage
    ]
})
export class TabsPageModule {}