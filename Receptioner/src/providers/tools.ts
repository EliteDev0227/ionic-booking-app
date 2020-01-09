/**
 * Created by shadow-viper on 1/2/18.
 */


import { Injectable } from "@angular/core";
import * as moment from 'moment';

@Injectable()
export class Tools {
    keyString: string;
    delayInstance: any;
    constructor() {
        this.keyString = '';
    }

    //breakMobile number to the required format
    breakTelephone(code: string, suffix: string) {

        if (code && suffix) {
            let TelString = "+(" + code + ")";
            this.keyString = suffix;
            let ArData = this.keyString ? this.keyString.split('') : [];
            let counter = 0;
            for (let i = 0; i < ArData.length; i++) {
                if (counter == 3) {
                    counter = 0;
                    TelString += ' '
                }
                counter++;
                TelString += ArData[i];
            }
            return TelString;
        }
    }

    GetDateDiv(diff: number) {
        return isNaN(diff) ? NaN : {
            diff: diff,
            s: Math.floor((diff) % 60),
            m: Math.floor((diff) / 60) % 60,
            h: Math.floor((diff) / 3600) % 24,
            d: Math.floor((diff) / 86400),
            M: Math.floor((diff) / 2592000) % 30
        };
    }

    delay = (callback: () => any, seconds: number): any => {
        if (!this.delayInstance) {
            this.delayInstance = setTimeout(() => {
                callback();
                clearTimeout(this.delayInstance);
                this.delayInstance = false;
            }, seconds);
        }
    };

    public getPeriod(start_date: string, end_date: string): number {   // "2018-04-03", "2018-05-10"
        let edate = new Date(end_date);
        let sdate = new Date(start_date);
        return moment(edate).diff(moment(sdate), 'days');
        // if (edate.getDate() < sdate.getDate()) {
        //   return (this.getDaysInMonth(sdate.getMonth() + 1, sdate.getFullYear()) - sdate.getDay()) + edate.getDay() + 1;
        // } else {
        //   return edate.getDate() - sdate.getDate() + 1;
        // }
    }

    getDaysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    public getDateAry(start_date: string, end_date: string): Array<string> {   // ["24.04","25.04","26.04" ....]
        var ary = [];
        var len = this.getPeriod(start_date, end_date);
        let sDate = new Date(start_date);
        for (let i = 0; i <= len; i++) {
            var dStr = `${this.getFormatedNum(sDate.getDate())}.${this.getFormatedNum(sDate.getMonth() + 1)}`;
            ary.push(dStr);
            sDate.setDate(sDate.getDate() + 1);
        }
        return ary;
    }

    public getFormatedNum(num: number): string {
        return num < 10 ? `0${num}` : `${num}`;
    }

    public getFormattedDateStr(date_str: string): string { // input : "24.05", output : "2018-05-24"
        if (date_str == '' || date_str == null || date_str == 'null') return '';
        var strAry = date_str.split('.');
        var now = new Date();
        return `${now.getFullYear()}-${strAry[1]}-${strAry[0]}`;
    }


    public getFormattedDate(date: Date): string {
        if (!date) return '';
        var yyyy = date.getFullYear();
        var dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var mm = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);

        var today = yyyy + "-" + mm + "-" + dd;
        return today;
    }

    public getFormattedDayStr(date_str: string): string { // input : "2018-05-24", output : "24.05"
        if (date_str == '' || date_str == null || date_str == 'null') return '';
        var strAry = date_str.split('-');
        return `${strAry[2]}.${strAry[1]}`;
    }

    public getToday(): string {
        let today = new Date();
        return `${today.getFullYear()}-${this.getFormatedNum(today.getMonth() + 1)}-${this.getFormatedNum(today.getDate())}`;
    }

    public getComma(ary: Array<any>, item: any) {
        var lItem = ary[ary.length - 1];
        return item == lItem ? '' : ',';
    }
}
