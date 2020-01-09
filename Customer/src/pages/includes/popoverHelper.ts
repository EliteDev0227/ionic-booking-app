/**
 * Created by shadow-viper on 12/29/17.
 */
import {Injectable} from "@angular/core";
@Injectable()
export class popoverHelper{
  constructor(){}
  CustomAnimationIsStarting(){
    document.body.classList.add('customPopover');
  }


  CleanAnimation(){
    document.body.classList.remove('customPopover');
  }
}
