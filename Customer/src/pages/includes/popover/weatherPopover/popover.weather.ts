/**
 * Created by shadow-viper on 12/16/17.
 */


import { Component, OnInit } from "@angular/core";
import { NavParams, ViewController,Platform } from "ionic-angular";
import * as moment from 'moment';
import { CustomBootstrap } from "../../../../app/BootstrapFirstRun";
import { ApiProvider } from "../../../providers/services";
import { TranslateService } from "@ngx-translate/core";
@Component({
    selector: 'popover_weather',
    templateUrl: 'popover.weather.html',
})
export class PopoverWeather implements OnInit {
    items: any;
    latLong: any = { lat: '', long: '' };
    beach_id: string;
    title: string;
    currentweather : any = {};
    weather: string;
    currtemp: string;

    constructor(public viewCtrl: ViewController, public navparam: NavParams, public configuration: CustomBootstrap, public api: ApiProvider, public translate : TranslateService, public platform : Platform) {
        this.beach_id = this.navparam.data.beach_ids;
        this.title = this.navparam.data.title;
    }
    ngOnInit() {
        this.getLatLong();
        this.getWeather();

        this.platform.registerBackButtonAction((event: any) => {
         
            this.viewCtrl.dismiss();
        });
    }

    populateWeather() {
        if (this.latLong && this.latLong.lat != '') {
            this.api.get('weather', this.latLong, { 'Content-Type': 'application/json' }, true).subscribe(r => {
                this.currentweather = r.results.current_condition[0];
              
                this.weather = this.currentweather.weatherDesc[0].value;
                console.log("weather - -",this.weather);
                this.currtemp = this.currentweather.temp_C;
                let orgresults = r.results.weather[0].hourly;
                //this.items = r.results.weather[0].hourly;
                for(let i = 0; i < orgresults.length ; i ++){
                    let time = orgresults[i].time;
                    let mins = time.substr(time.length-2,2);
                    let hour  = time.substr(0,time.length-2) || '0';
                    if(hour.length<2){
                        hour = '0'+hour;
                    }
                    if(mins.length<2){
                        mins = '0'+mins;
                    }
                    orgresults[i].orgtime = hour + ':' + mins;
                }
                
                this.items = orgresults.slice(3,8);
                // this.configuration.setStorage('weather', { time: moment.now(), weather: r, latLong: this.latLong });
            }, error => {

            })
        }

    }

    getLatLong() {
        this.latLong = { lat: this.navparam.data.settings.latitude, lon: this.navparam.data.settings.longitude };
    }

    getWeather() {
        // this.configuration.getStorage('weather').then((r) => {
        //     if (r && r.weather) {
        //         this.items = r.weather;
        //     }
        //     if (r && r.time && r.latLong && r.latLong == this.latLong && moment(moment.now()).diff(r.time, 'minutes') < 10) {
        //         return;
        //     }
            this.populateWeather();

        // })
    }

    close() {
        this.viewCtrl.dismiss();
    }

}
