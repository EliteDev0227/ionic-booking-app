import {Component} from "@angular/core";
import {NavController, NavParams, ViewController} from "ionic-angular";
import { ApiProvider } from "../../providers/services";
import { CustomBootstrap } from "../../../app/BootstrapFirstRun";
import {SplashScreen} from "@ionic-native/splash-screen";
/**
 * Created by Bruce Lee on 03/16/18.
 */
@Component({
  selector:'search-dupplication',
  templateUrl:'searchDupplication.html'
})

export class searchDupplication{
  redirect : boolean = false;
  constructor(public navCtrl:NavController,public viewCtrl:ViewController,public navparam:NavParams, private splashScreen : SplashScreen,
    private api: ApiProvider,
    private configuration: CustomBootstrap,){}

  ngOnInit(){
    let param = this.navparam.data;
    if(param.redirect){
      this.redirect = true;
    }
  }

  close(accept:boolean){
    if(this.redirect){
      if (this.api.fcmToken) {
        try {
             this.api.get(`fcm/${this.api.fcmToken}/remove`, {}, {}, true).toPromise();
        } catch (error) {}
    }
    this.configuration.clearStorage().then(r=>{
        window.location.reload();
        this.splashScreen.show();

    });
    }
    this.viewCtrl.dismiss(accept);
  }

}
