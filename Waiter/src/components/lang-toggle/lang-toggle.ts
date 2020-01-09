import { Component, Input } from "@angular/core";
import { AppService } from "../../services/app.service";

/**
 * Generated class for the LangToggleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "lang-toggle",
  templateUrl: "lang-toggle.html"
})
export class LangToggleComponent {
  @Input() data: Array<any>;

  show: boolean = false;

  currentLang: string = "en";

  constructor(
    public appService: AppService,
  ) {
    this.currentLang = this.appService.getLang();
    this.appService.languageNotify.subscribe(lang => {
      this.currentLang = lang || 'en';
    })
  }
  selectLang(lang: string) {
    this.currentLang = lang;
    this.show = !this.show;
    this.appService.setLang(lang);
  }
}
