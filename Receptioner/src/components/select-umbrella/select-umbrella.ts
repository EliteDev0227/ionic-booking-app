import { Input } from '@angular/core';
import { Component, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the SelectNumbrellaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'select-umbrella',
  templateUrl: 'select-umbrella.html'
})
export class SelectUmbrellaComponent {

  @Output() seatChange: EventEmitter<any> = new EventEmitter<any>();

  reservationInfo: any;
  seatData: { a: Array<number>, b: Array<number> } = {
    a: [],
    b: []
  }
  curSeatNums: Array<number> = [];
  statusAry: Array<any> = [
    { class: 'filter-brown', status: 'booked' },
    { class: 'filter-red', status: 'paid' },
    { class: 'filter-blue', status: 'occupied' },
    { class: '', status: 'free' }
  ];

  seatNum: number = 0;
  reservationsNumber: number = 0;
  editState: { status: boolean, data: Array<number> } = { status: false, data: [] };
  reserveStatus: { status: string, payment_method: string } = { status: '', payment_method: '' };

  statusNum: Array<number> = [0, 0, 0, 0];
  buffSeatNum: number = 0;
  constructor() { }

  resetMembers() {
    this.reservationInfo = undefined;
    this.seatData = {
      a: [],
      b: []
    }
    this.curSeatNums = [];
    this.statusAry = [
      { class: 'filter-brown', status: 'booked' },
      { class: 'filter-red', status: 'paid' },
      { class: 'filter-blue', status: 'occupied' },
      { class: '', status: 'free' }
    ];
    this.seatNum = 0
    this.reservationsNumber = 0;
    this.editState =  { status: false, data: [] };
    this.reserveStatus = { status: '', payment_method: '' };
    this.statusNum = [0, 0, 0, 0];
    this.buffSeatNum = 0;
  }

  ngOnInit(){
    // this.resetMembers();
    console.log("enter select-umbrella")
  }

  isAvailable(num: number): boolean {
    if (this.seatNum == 2)
      if (num > 0) num += 2;

    return this.editState && this.editState.data && this.editState.data.indexOf(num) > -1;
  }

  selectSeat(seat_num: number) {

    if (this.reserveStatus.status == 'new' || this.reserveStatus.status == 'change') {
      if (this.editState && this.editState.data && this.editState.data.indexOf(seat_num) < 0) return;
    } else {
      let b = this.curSeatNums.indexOf(seat_num);

      if (b > -1) this.curSeatNums.splice(b, 1)
      if (b > -1) this.editState.data.splice(b, 1)
      // if (!this.editState.status && b > -1) return;  
    }

    if (this.seatNum == 2) {
      if (seat_num == 0) {
        if (this.seatData.a.length > 0) {
          this.seatData.a.length = 0;
        } else {
          this.seatData.a.push(0);
        }
      } else {
        if (this.seatData.b.length > 0) {
          this.seatData.b.length = 0;
        } else {
          this.seatData.b.push(0);
        }
      }
    } else {
      if (seat_num < 2) {
        var index = this.seatData.a.indexOf(seat_num, 0);
        if (index > -1) {
          this.seatData.a.splice(index, 1);
        } else {
          this.seatData.a.push(seat_num);
        }
      } else {
        var index1 = this.seatData.b.indexOf(seat_num - 2, 0);
        if (index1 > -1) {
          this.seatData.b.splice(index1, 1);
        } else {
          this.seatData.b.push(seat_num - 2);
        }
      }
    }

    this.seatChange.emit(this.seatData);
  }

  prepareSlots(slots) {

    let availableSlots = [];
    let formattedSlots = { a: [], b: [] };
    let sideSlots = { a: [], b: [] };

    if (slots && slots.a && slots.a.length > 0) {
      let foundAtIndex = -1;
      slots.a.map((item, index) => {
        if (item === "occupied") {
          formattedSlots.a.push(index);
        }
        if (item === "available") {
          foundAtIndex = index;
          availableSlots.push(index);
        }
      })
      if (!foundAtIndex) {
        sideSlots.a = [0];
      }
    }
    if (slots && slots.b && slots.b.length > 0) {
      let foundAtIndex = -1;
      slots.b.map((item, index) => {
        if (item === "occupied") {
          formattedSlots.b.push(index);
        }
        if (item === "available") {
          foundAtIndex = index;
          availableSlots.push(index + 2);
        }
      })
      if (!foundAtIndex) {
        sideSlots.b = [3];
      }
    }

    return { sideSlots: sideSlots, availableSlots: availableSlots, formattedSlots: formattedSlots };
    // return { sideSlots: sideSlots, availableSlots: availableSlots, formattedSlots: { a: [], b: [] } };
  }

  getSelectStyle(s_slot: string, s_num?: number): string {
    if(!this.reserveStatus || !this.editState) {
      return '';
    }
    // if (this.reservationInfo) {
    //   let singleReservation: boolean = this.reservationsNumber < 2;
    //   let preparedSlots = this.prepareSlots(this.reservationInfo.slots);
    //   this.editState = { status: singleReservation ? true : this.reservationInfo.can_seat, data: preparedSlots.availableSlots };
    //   this.seatData = preparedSlots.formattedSlots;
    //   this.seatNum = this.reservationInfo.seats;
    //   this.reserveStatus = this.reservationInfo.reservation_status;
    //   this.curSeatNums = [];
    // }

    if (this.reservationInfo) {
      // console.log(this.reservationInfo.slots);
      let preparedSlots = this.prepareSlots(this.reservationInfo.slots);

      if (this.editState && this.editState.data && this.editState.data.length > -1) {
        if (preparedSlots.availableSlots && preparedSlots.availableSlots.length > 0) {
          preparedSlots.availableSlots.map((slot) => {
            if (this.editState.data.indexOf(slot) === -1) {
              this.editState.data.push(slot);
            }
          })
        }
      }
    }


    let styleColor = 'filter-blue';
    if (this.reserveStatus.status == 'new' || this.reserveStatus.status == 'change') {
      if (this.editState.status == false) {
        return 'filter-disable';
      } else {

      }
    } else {

      if (this.editState.status == false) {
        styleColor = 'filter-disable';
      }

      if (this.editState.status && this.curSeatNums.indexOf(s_num) < 0) {
        // console.log("this.curSeatNums", this.curSeatNums)
        styleColor = 'filter-blue';
      } else {
        if (this.curSeatNums.indexOf(s_num) < 0) {
          // console.log("this.curSeatNums", this.curSeatNums)
          styleColor = 'filter-blue';
        } else {
          if (this.reserveStatus.status == 'booked') {
            if (this.reserveStatus.payment_method == 'offline') {
              styleColor = 'filter-magent';
            } else {
              styleColor = 'filter-red';
            }
          } else if (this.reserveStatus.status == 'active') {
            // console.log("this.curSeatNums", this.curSeatNums)
            styleColor = 'filter-black';
          }
        }
      }

    }

    if (this.seatNum == 2) {
      if (this.seatData[s_slot].length > 0)
        return styleColor;
    } else {
      // console.log("this.curSeatNums", this.seatData)
      if (this.seatData[s_slot].length > 0) {
        let idx = -1;
        if (s_slot == 'b')
          idx = this.seatData[s_slot].indexOf(s_num - 2);
        else
          idx = this.seatData[s_slot].indexOf(s_num);
        if (idx > -1)
          return styleColor;
      }
    }

    // if(this.reserveStatus.status == 'new' || this.reserveStatus.status == 'change') {
    // console.log(this.editState && this.editState.data && this.editState.data.indexOf(s_num) < 0 ? 'filter-disable' : '')
    return this.editState && this.editState.data && this.editState.data.indexOf(s_num) < 0 ? 'filter-disable' : '';
    // }
    // }
  }

  getUnableStyle(seat_num: number) {
    // console.log(this.curSeatNums.indexOf(seat_num) > -1);
    // console.log(this.editState.data.indexOf(seat_num) > -1);
    return this.editState && this.editState.data && this.editState.data.indexOf(seat_num) < 0 ? 'filter-disable' : '';
  }

  @Input()
  set setReservationNumber(data: any) {
    if (!data) return;;
    this.reservationsNumber = data ? data.length : 0;
    // console.log(data);
  }

  @Input()
  set setReservation(data: any) {
    if (!data) return;;
    this.reservationInfo = data;
    // console.log(data);
  }

  @Input()
  set setSeats(data: number) {

    this.seatNum = data;
    // console.log(data);
  }

  @Input()
  set isEditable(data: { status: boolean, data: Array<number> }) {
    this.editState = data;
    // console.log(data);
  }

  @Input()
  set seatStatus(data: { status: string, payment_method: string }) {
    this.reserveStatus = data;
    // console.log(data);
  }

  @Input()
  set setSeatData(data: any) {
    if (typeof data == 'undefined' || data == null) return;
    this.seatData = data;
    this.curSeatNums = this.getCurrentSlots();
    // console.log(data);
  }
  getCurrentSlots() {
    let curSeatNums = [];
    for (var i = 0; i < this.seatData.a.length; i++) {
      curSeatNums.push(this.seatData.a[i]);
    }
    for (var j = 0; j < this.seatData.b.length; j++) {
      if (this.seatNum == 4)
        curSeatNums.push(this.seatData.b[j] + 2);
      else
        curSeatNums.push(1);
    }
    return curSeatNums;
  }
}
