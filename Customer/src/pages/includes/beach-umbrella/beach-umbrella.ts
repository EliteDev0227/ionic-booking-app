import { Component, EventEmitter, Input, Output } from "@angular/core";
/**
 * Created by shadow-viper on 1/22/18.
 */


@Component({
  selector: 'beach-umbrella',
  templateUrl: 'beach-umbrella.html'
})

export class beachUmbrella {
  @Output() changes: EventEmitter<any> = new EventEmitter<any>();
  umbrellaData: any = null;
  data: any = null;
  eleList: any;
  umbrellaClass: any;
  umbrella: any;
  sides = ['center', 'left', 'right'];
  sideConfigs = {
    left: ['a'],
    right: ['b'],
    center: ['m', 'n', 'o']
  };
  bookingStatus = {
    left: false,
    right: false,
    center: false
  };
  singleSeat = false;
  seatCount = 0;
  zone: any;
  constructor() { }


  @Input()
  set ReceivedEvent(data) {
    this.umbrellaData = data;
    this.viewInit();
  }

  @Input() set ViewData(data) {
    this.data = data.data;
    
    let eleList = data.data.info.mapElement.list;
    this.eleList = eleList;
    if (eleList && eleList.umbrella.length) {
      this.umbrella = eleList.umbrella[0];
  
    }
    let obj = eleList.center[0];
    if (eleList.center && eleList.center.length == 1) {
      this.singleSeat = true;
    }
    this.seatCount = this.data.seats;
    this.updateStatus();
   
    this.viewInit();
  }
  get ReceivedEvent() {
    return this.umbrellaData;
  }
  get ViewData() {
    return this.data;
  }

  updateStatus() {
    this.zone = this.data.coords.zone;
    for (let i = 0; i < this.sides.length; i++) {
      let side = this.sides[i];
      let list = this.eleList[side];
      let status = '';
      this.sideConfigs[side].map((sideConfig) => {
        if (!status && this.data.status[sideConfig] && this.data.status[sideConfig].length) {
          status = sideConfig;
        }
      });
      let statuses = this.data.status[status];
      for (let j = 0; j < list.length; j++) {
        let li = list[j];
        li.status = statuses[j];
        if (li.status && li.status != 'available') {
          this.bookingStatus[side] = true;
        }
      }
    }
 
    this.changes.emit({
      bookingStatus: this.bookingStatus,
      data: this.data,
      zone: this.zone
    });
  }

  submitStatus() {
    for (let i = 0; i < this.sides.length; i++) {
      let side = this.sides[i];
      let list = this.eleList[side];
      let status = '';
      this.sideConfigs[side].map((sideConfig) => {
        if (!status && this.data.status[sideConfig] && this.data.status[sideConfig].length) {
          status = sideConfig;
        }
      });
      let statuses = this.data.status[status];
      for (let j = 0; j < list.length; j++) {
        let li = list[j];
        if (li.status == 'available' || li.status == 'selected') {
          statuses[j] = li.status;
        }
      }
    }
  }

  viewInit() {
    if (!(this.umbrellaData && this.data)) {
      return false;
    }
    
  }
  clickSunbed(data: any) {
    data.status = (data.status == 'available') ? 'selected' : 'available';

    this.submitStatus();
    this.changes.emit({
      bookingStatus: this.bookingStatus,
      data: this.data
    });
  }
  Select(type: string, selected: string) {
    if (type && selected && this.umbrellaData.status != 'change-request') {

      if (this.umbrellaData[type] && this.umbrellaData[type][selected] && this.umbrellaData[type][selected] == 'free') {
        if (selected == 'first' || selected == 'second') { this.umbrellaData.umbrella.left = 'selected' }
        if (selected == 'third' || selected == 'fourth') { this.umbrellaData.umbrella.right = 'selected' }

        this.umbrellaData[type][selected] = 'selected';
      } else if (this.umbrellaData[type] && this.umbrellaData[type][selected] && this.umbrellaData[type][selected] == 'selected') {
        this.umbrellaData[type][selected] = 'free';
      }
      if ((this.umbrellaData.seats.first == '' || this.umbrellaData.seats.first == 'free') && this.umbrellaData.seats.second == 'free') { this.umbrellaData.umbrella.left = 'free'; }
      if (this.umbrellaData.seats.third == 'free' && (this.umbrellaData.seats.fourth == '' || this.umbrellaData.seats.fourth == 'free')) { this.umbrellaData.umbrella.right = 'free'; }

      this.changes.emit(this.umbrellaData);
    }

  }
  getUmbrellaClass() {
    this.umbrellaClass = this.umbrellaData ? [this.umbrellaData.umbrella.left + 1, this.umbrellaData.umbrella.right + 2] : 'free1 free2';
    return this.umbrellaClass;
  }


}
