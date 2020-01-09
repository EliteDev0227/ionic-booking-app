import { Component } from '@angular/core';
import { TabStateService } from '../../providers/app-stuff/app-stuff';
import { IonicPage, NavController /*, Events*/ } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { AppService } from '../../services/app.service';

@IonicPage({
    name: 'page-tabs',
    priority: 'high'
})
@Component(
    {
        template: `<ion-tabs>
                        <ion-tab [root]="tab1Root" [enabled]="tabStateService.states.tab1" tabIcon="beach-all-seat"></ion-tab>
                        <ion-tab [root]="tab2Root" [enabled]="tabStateService.states.tab2" tabIcon="beach-my-seat"></ion-tab>
                        <ion-tab [root]="tab3Root" [enabled]="tabStateService.states.tab3" [tabBadge]="getNotificationCount()" tabIcon="beach-current"></ion-tab>
                        <ion-tab [root]="tab4Root" [enabled]="tabStateService.states.tab4" *ngIf="showLogout"  (ionSelect)="logout()" tabIcon="ios-log-out" >
                        </ion-tab>
                    </ion-tabs>`
                    
    })
//<button (press)="logout()" class="tab-button-logout" ion-button icon-only clear *ngIf="showLogout"> <ion-icon name="ios-log-out"></ion-icon> </button>`
export class TabsPage {

    tab1Root = 'AllBeachPage';
    tab2Root = 'MySeatsPage';
    tab3Root = 'NotificationPage';
    count : number = 0;

    tab4Root = ''; // logout
    showLogout = true;
    constructor(
        public navCtrl: NavController, public tabStateService: TabStateService,
        private userService: UserService, public appService: AppService /*, private events: Events*/
    ) {
        this.tabStateService.setState('tab1', true);
        this.tabStateService.setState('tab2', true);
        this.tabStateService.setState('tab3', true);
        this.tabStateService.setState('tab4', true);
    }
    ionViewDidEnter() {
        // this.events.subscribe('seat:confirm', (visibleConfirm) => {
        //     this.showLogout = visibleConfirm;
        // })
    }
    getNotificationCount() {
        return this.appService.notifications.length;
    }
    logout() {

        this.count++;
        setTimeout(() => {
          if (this.count == 1) {
            this.count = 0;
          }if(this.count > 1){
            this.count = 0;
                this.navCtrl.setRoot('page-auth');
                this.userService.logout();
          }
        }, 250)
    }
}
