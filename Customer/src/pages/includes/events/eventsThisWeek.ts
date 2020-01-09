import { Component, ViewChild, NgZone } from '@angular/core';
import { NavController, Navbar, NavParams, Events, Platform, ViewController } from 'ionic-angular';
import { CustomBootstrap } from '../../../app/BootstrapFirstRun';
import { ApiProvider } from '../../providers/services';
import * as moment from 'moment';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppAvailability } from '@ionic-native/app-availability';

declare const window;

@Component({
  selector: 'events-this-week',
  templateUrl: 'eventsThisWeek.html',
})
export class EventsThisWeek {

  items = [];
  sub1$
  constructor(private platform: Platform, public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser, public appAvailability: AppAvailability,
    public configuration: CustomBootstrap, public api: ApiProvider, public events: Events, private ngZone: NgZone, public viewCtrl: ViewController,
  ) {
    this.getEvents();
    this.events.subscribe('reload:event', () => {
      ngZone.run(() => {
        this.getEvents.bind(this);
      })
    });
    this.platform.ready().then(() => {
      try {
        this.sub1$ = this.platform.resume.subscribe(() => {
          ngZone.run(() => {
            this.getEvents();
          }, (error) => {
            
          });
        });
      } catch (error) {
      }
    });
    this.events.subscribe('app:event', () => {
      this.getEvents();
    })
  }

  ionViewWillUnload() {
    this.events.unsubscribe('reload:event');
    this.sub1$.unsubscribe();
  }

  getEvents() {
    this.ngZone.run(() => {
      this.api.get('events', {}, {}, true, false).subscribe((data) => {
        if (data) {
          this.items = data.map(item => {
            item.date = moment(item.date).format('YYYY-MM-DD HH:mm')
            return item;
          }).reverse();
        }
      }, (error) => {
       
      });
    })
  }
  openEvents(item) {
    item.unread = false;
    this.api.get(`events/read/${item.id}`, {}, {}, true, true).subscribe(async () => {

      if (this.platform.is('android') && item.android_scheme) {
        const sps = item.android_scheme.split(';');
        let package_name = null, scheme = null;
        
        sps.forEach(sp => {
          const key_map = sp.split('=');
          if (key_map.length === 2) {
            if (key_map[0] === 'package') {
              package_name = key_map[1];
            } else if(key_map[0] === 'scheme') {
              scheme = key_map[1];
            }
          }
        });
        if (package_name && scheme) {
          try{
            const exists = await this.appAvailability.check(package_name)
            if (exists) {
              return this.iab.create(item.link, '_system');
            }
          } catch (error) {
            
          }
        }
      } else if (this.platform.is('ios') && item.ios_scheme) {
        const position = item.ios_scheme.indexOf('://');
        if (position > -1) {
          const app = item.ios_scheme.substring(0, position + 3);
          try{
            const exists = await this.appAvailability.check(app);
            if (exists) {
              return this.iab.create(item.link, '_system');
            }
          } catch (error) {
            
          }
        }
      }
      this.iab.create(item.link, null, 'hidenavigationbuttons=yes');
    });
  }
  onClose() {
    this.viewCtrl.dismiss();
  }
}
