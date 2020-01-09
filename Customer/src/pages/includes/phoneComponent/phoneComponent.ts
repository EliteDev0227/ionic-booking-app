import { Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { Tools } from "../../providers/tools";
import { Input } from "@angular/core";
import { CustomBootstrap } from "../../../app/BootstrapFirstRun";
import { ApiProvider } from "../../providers/services";
import { SeachprefixPage } from "../../seachprefix/seachprefix";
import { ModalController } from "ionic-angular";

/**
 * Created by shadow-viper on 1/2/18.
 */

@Component({
  selector: 'phoneComponent',
  templateUrl: 'phoneComponent.html'
})

export class phoneComponent implements OnInit {
  configurations: any[];

  @ViewChild('countryFocus') countryFocus;
  @ViewChild('suffixFocus') suffixFocus;
  phonePrefix: any = {
    country: '',
    prefix: ''
  };
  phoneNumber: {
    prefix: string,
    suffix: string,
    lang: string,
    complete: string,
    search: string,
    name: string,
    mobile_prefix: Array<string>,
    code: string;
  };
  @Output() CompletedSelect: EventEmitter<{
    prefix: string,
    suffix: string,
    complete: string,
    lang: string,
    mobile_prefix: Array<string>,
    name: string,
    search: string,
    code: string;
  }> = new EventEmitter();
  format: {
    country: string,
    phone: string
  };

  search: string;
  type: any;
  constructor(public modal: ModalController, public tool: Tools, public configuration: CustomBootstrap, public api: ApiProvider) {
    this.configurations = [];
    this.search = '';
    this.phoneNumber = {
      code: null,
      suffix: null,
      complete: null,
      mobile_prefix: [],
      search: '',
      lang: this.configuration.translate.currentLanguage,
      name: null,
      prefix: null
    };
    this.format = {
      country: '',
      phone: ''
    };
    this.changeType(true, 'prefix');
    this.translationText();

  }

  ngOnInit() {
    //setTimeout(() => {
      this.configurations = this.configuration.storedCountry();
      this.recoverCountry();
      this.translationText();
    //}, 1000);
    //this.toggleCache();

  }
  arrangeTel = (code: string, suffix) => {
    if (code && suffix)
      return this.tool.breakTelephone(code, suffix);

  };

  @Input() set toggleData(data: number) {
   

    if (data != 111) {
      //this.toggleCache();
    }
  }


  recoverCountry() {
    let self = this;
    if (!self.phoneNumber || (self.phoneNumber && !self.phoneNumber.code)) {
      return;
    }

    //21.cand dau logout...la prefix imi apare 44. am dat clear data...si tot apare. e hardcodat cred..sau nu stiu 
    if (self.configurations && self.configurations.length > 0) {
      let lastCountryData = self.configurations.find(
        countryObj => {
          return countryObj.code === self.phoneNumber.code
        })

      if (lastCountryData) {
        self.countryData(lastCountryData);
      }
    }
  }

  showSearch() {
    if (this.openedSearch) return;
    this.openedSearch = true;
    let modal = this.modal.create(SeachprefixPage, { country: this.configurations, cssClass : 'test-modal' });

    modal.onDidDismiss(data => {

      if (data) {

        setTimeout(() => {

          this.countryData(data);

        }, 300);

      } else {
        
      }
      this.openedSearch = false;
    });

    modal.present();

    // this.changeType(false,'search');
  }

  countryData(item: any) {

    // alert(item.prefix);
    this.phoneNumber = {
      prefix: item.prefix,
      suffix: this.phoneNumber.suffix,
      complete: this.phoneNumber.complete,
      lang: this.configuration.translate.currentLanguage,
      search: this.phoneNumber.search,
      mobile_prefix: item.mobile_prefix,
      name: item.name,
      code: item.code
    };

    this.phonePrefix.prefix = this.phoneNumber.mobile_prefix && this.phoneNumber.mobile_prefix.length > 0 ? JSON.stringify(this.phoneNumber.mobile_prefix) : undefined;
    this.phonePrefix.country = item.country;
    /* for(let i in this.configuration.storedLanguage()){
       if(this.configuration.storedLang.hasOwnProperty(i) && this.configuration.storedLang[i].code==item.code){
         this.phoneNumber.lang=item.code;
         break;
       }
     }*/
    this.changeType(true, 'prefix');
    this.suffixFocus.setFocus();

  }

  private changeType(selected: boolean, model: string) {
    this.type = { selected: selected, model: model };
  }

  completed() {
    if (this.phoneNumber.prefix && this.phoneNumber.suffix) {
      this.phoneNumber.complete = this.arrangeTel(this.phoneNumber.prefix, this.phoneNumber.suffix);
      this.CompletedSelect.emit(this.phoneNumber);
      this.changeType(true, 'prefix');
    }
  }
  checkCorrect() {
    if (this.phoneNumber.prefix && this.phoneNumber.suffix) {
      this.tool.delay(() => {
        this.phoneNumber.complete = this.arrangeTel(this.phoneNumber.prefix, this.phoneNumber.suffix);
        this.CompletedSelect.emit(this.phoneNumber);
      }, 500)
    }
  }

  openedSearch = false;

  toggleCache() {
    this.configuration.getStorage('UserPhoneInfo').then(a => { //this.configuration.getStorage('AdditionalRegData').then(a=>{
      if (a && a.complete && a.canUse) {
        this.phoneNumber = a;
      }
    })
  }

  translationText() {
    this.format.country = this.configuration.translate.translate.instant('COUNTRY')
    this.format.phone = this.configuration.translate.translate.instant('PHONE_NUMBER');
  }

  logAFF() {
   
  }

  isFilledPrefix() {
    // alert("light");
    //   alert(this.phoneNumber);
    //   alert(this.phoneNumber.prefix);
    //   alert(parseInt(this.phoneNumber.prefix));
    //   alert(this.phoneNumber.search);
    //   alert(this.phoneNumber.search.length);
    //   alert(this.phoneNumber.suffix);
    //   alert(this.phonePrefix.prefix);
    setTimeout(() => {
      // alert("timeout");
      if (this.phoneNumber && this.phoneNumber.prefix && parseInt(this.phoneNumber.prefix)) {
        let parsedPrefixCondition = JSON.parse(this.phonePrefix.prefix) && JSON.parse(this.phonePrefix.prefix).length > 0
        if (this.phoneNumber && this.phoneNumber.suffix && parsedPrefixCondition && this.phonePrefix.prefix.indexOf(this.phoneNumber.suffix.split('')[0]) == -1) {
          // alert("timeout true");
          this.api.AmError(this.configuration.translate.translate.instant('ERROR'), this.phonePrefix.country + ' ' + this.configuration.translate.translate.instant('COUNTRY_SUPPORT_THE_PHONE_NUMBERS_WHICH_START_WITH') + ' ' + this.phoneNumber.mobile_prefix, [{ text: this.configuration.translate.translate.instant('CANCEL'), role: 'cancel' }])
          this.phoneNumber.suffix = null;
        }
      } else {
        // alert("time else");
        this.countryFocus.setFocus();
       
      }
    }, 300)


  }
}
