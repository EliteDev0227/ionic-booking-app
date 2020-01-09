import { Injectable } from '@angular/core';
import { AppService } from './app.service';

@Injectable()
export class AssetService {
    
    constructor(
        private appService: AppService,
    ) {
    }
    languages: Array<any>;
    async getLanguage() {
        if (this.languages) return this.languages;
        this.languages = await this.appService.get('asset/languages');
        return this.languages;
    }
}