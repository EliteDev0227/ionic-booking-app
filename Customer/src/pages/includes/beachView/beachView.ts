/**
 * Created by shadow-viper on 2/14/18.
 */

import {Component, ViewChild} from "@angular/core";
import {NavParams, Slides, ViewController, Events} from "ionic-angular";
import {ApiProvider} from "../../providers/services";
@Component({
  selector: 'beachView',
  templateUrl: './beachView.html'
})

export class BeachView{
  details:any={
    beach:{description:'',name:''},
    gallery:[]
  };
  @ViewChild(Slides) slides: Slides;

  constructor(public navParam:NavParams,public ViewCtrl:ViewController,public api:ApiProvider, public events:Events){

    this.getBeachDetails();
  }

  close()
  {
    
    // this.events.publish('app:beachModal', true);
    this.ViewCtrl.dismiss();
  }

  getBeachDetails(){
    this.api.get(`about/${this.navParam.data.beach_id}`,{},{},true,true).subscribe(r=>{
    
      this.details=r;
    },error=>{})
    }

    next(){
    this.slides.slideNext();
    }

    prev(){
      this.slides.slidePrev();
    }

    ionViewDidLeave()
    {
   
    }
}
