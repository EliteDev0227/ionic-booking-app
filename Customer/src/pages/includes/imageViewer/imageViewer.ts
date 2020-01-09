import {Component} from "@angular/core";
import {NavController, NavParams, ViewController} from "ionic-angular";
import { ApiProvider } from "../../providers/services";
import { CustomBootstrap } from "../../../app/BootstrapFirstRun";
import {SplashScreen} from "@ionic-native/splash-screen";
/**
 * Created by Bruce Lee on 03/16/18.
 */
@Component({
  selector:'image-viewer',
  templateUrl:'imageViewer.html'
})

export class ImageViewerPage{
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
    this.viewCtrl.dismiss(accept);
  }

}
