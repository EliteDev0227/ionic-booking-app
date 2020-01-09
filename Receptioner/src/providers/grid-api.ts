import { Injectable } from '@angular/core';
import { ApiProvider } from './services';

/*
  Generated class for the GridApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GridApiProvider {
  gridData: any;
  gridByIndex: any = {};

  constructor(private api: ApiProvider) {
  }

  getGrid(beachId: string, param: any) {
    return new Promise((res, rej) => {
      this.api.get(`grid/${beachId}`, param, {
        'Content-Type': 'application/json'
      }, true, false).subscribe((data: any) => {
        this.gridData = data;

        for (let zone in data.seats) {
          const zoneSeats = data.seats[zone];

          for (let seat of zoneSeats) {
            this.gridByIndex[seat.i] = seat;

            if (seat && seat.status_color) {
              for (let key in seat.status_color) {
                seat.status_color[key] = ['#aaa'];
              }
            }
          }
        }

        res(data);
      }, err => {
        rej(err);
      });
    });
  }

  getGridInfo(i) {
    return this.gridByIndex[i];
  }
}
