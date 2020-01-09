import {Component} from "@angular/core";
/**
 * Created by shadow-viper on 1/26/18.
 */

@Component({
  selector:'firstPage',
  templateUrl:'firstPage.html'
})

export class firstPage{
  gridElement:any={
    front:
      [
        {type:"baldaquin",icon:"4.png",coords:{y:74,x:46}},
        {type:"umbrella",icon:"44.png",coords:{y:62,x:8}},
        {type:"umbrella",icon:"4444.png",coords:{y:144,x:107}},
        {type:"umbrella",icon:"4444.png",coords:{y:72,x:113}}
      ]
  };


}
