import { Component } from '@angular/core';
import { NavController, NavParams ,ViewController} from 'ionic-angular';
// import {searchDupplication} from "../includes/searchDupplication/searchDupplication";

/**
 * Generated class for the SeachprefixPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-seachprefix',
  templateUrl: 'seachprefix.html',
})
export class SeachprefixPage {


  countyries:any;
  tempcountry:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController) {
    this.countyries = this.navParams.get("country");
    this.tempcountry = this.countyries.slice(0, 15);
  }

  ngOnDestroy()
  {

  }

  ionViewDidLoad() {
  
  }
  ionViewDidEnter() {
    this.tempcountry = this.countyries;
  }

  closeModal()
  {
    this.viewCtrl.dismiss();
  }

  countryData(item)
  {


      this.viewCtrl.dismiss(item);
  }

  getItems(ev)
  {
    let seachitem = ev.target.value;

    if(!seachitem || !seachitem.trim())
    {
      this.countyries = this.tempcountry;
      return;
    }


    if(parseInt(seachitem))
    {
      

        this.countyries = this.getquery({

            prefix:seachitem
        });

    }else
    {
        this.countyries = this.getquery({

            country:seachitem
        });
    }



  }

  getquery(params?:any)
  {
    if(!params){
      return this.tempcountry;
    }

    return this.tempcountry.filter((item) => {

      for(let key in params)
      {
        let field = item[key];
        let field1 = field.toString();

       

          if (typeof field1 == 'string' && field1.toLowerCase().indexOf(params[key].toLowerCase()) === 0) {
            
              return item;
          } else if (field1 == params[key]) {

            return item;
          }
      }
     
      return null;

    });

  }

}
