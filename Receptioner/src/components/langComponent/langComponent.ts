import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {NavController, PopoverController, ViewController} from "ionic-angular";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {CustomBootstrap} from "../../app/BootstrapFirstRun";
import { PopoverLang } from "../../pages/include/language/popover.lang";
/**
 * Created by shadow-viper on 1/2/18.
 */


@Component({
  selector:'langComponent',
  templateUrl:'langComponent.html'
})
export class langComponent implements OnInit{
  currentLanguage: string = 'en';
  langSubscr: BehaviorSubject<string> = new BehaviorSubject<string>('en');
  langRefresh:any;
  paged:string;
  @Output() pushLang:EventEmitter<string>=new EventEmitter();
  constructor(public popoverCtrl:PopoverController,public misc:CustomBootstrap,public navCtrl:NavController,public viewCtrl:ViewController){
    this.currentLanguage=this.misc.translate.currentLanguage;
  }

  ngOnInit(){
    this.getLanguage();
  }
  showLanguageMenu($event:any) {
    let popover=this.popoverCtrl.create(PopoverLang,{parentSubject:this.langSubscr,language:this.currentLanguage,page:this.paged}, { cssClass: 'languagePopOver'});
    popover.present({
      ev:$event
    }).then(()=>{
      this.langSubscr.subscribe((newLang:any)=>{
        this.currentLanguage=newLang;
      })
    });
    popover.onDidDismiss((e)=>{
      console.log(e);
    })
  }

  getLanguage(){
    this.misc.getStorage('AdditionalRegData').then(a=>{
      if(a && a.lang)
        this.currentLanguage=a.lang;
      else
        this.currentLanguage='en';
      this.pushLang.emit(this.currentLanguage);
      this.misc.translate.setLanguageProvider(this.currentLanguage);
    },error=>{
      //not found
      this.currentLanguage='en'
      this.misc.translate.setLanguageProvider(this.currentLanguage);
    })
  }


  @Input()
    set refresh(data:any){
    this.getLanguage();
    this.langRefresh=data;
  }

  @Input()
  set page(data:string){
      this.paged=data;
  }

  get page(){
    return this.paged;
  }

  get refresh(){
    return this.langRefresh;
  }


}
