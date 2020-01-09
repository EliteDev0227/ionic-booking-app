import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, LoadingController, Events } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { status_color } from '../../services/app-settings';
import { AppService } from '../../services/app.service';
import { BeachService } from '../../services/beach.service';
import moment from 'moment';

declare const window: any;
/**
 * Generated class for the MySeatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-my-seats',
    templateUrl: 'my-seats.html',
})
export class MySeatsPage {

    status_color = status_color;

    seats: Array<any> = [];
    sunbeds: Array<any> = [];
    orderStatus: number = 1;
    connectionStatus: number = 3;
    mStatusH: number = 3.5;
    unit: string = 'vh';
    statusUnit = 'vh';
    loaded = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, public common: CommonProvider, private events: Events,
        private appService: AppService, private beachService: BeachService, public loadingCtrl: LoadingController,
    ) {
        this.seats = [];
        this.sunbeds = [];
        this.defineOrientationEvent();
    }
    onNewNotification(data) {
        console.log('my seats notification');

        this.beachService.getNotificationData(data)
            .then(result => {
                this.loaded = false;
                this.loadMySeatData();
                if (!result || this.appService.getAccount().id !== result.waiter_id) {
                    console.log('id mismatch');
                    return;
                }
                if (result.entity === 'order' && result.action === 'create') {
                    if (result.data) {
                        this.appService.addNotification(result.data.id);
                    }
                }
            })
            .catch(error => {
            });
    }
    ionViewWillLeave() {
        this.events.unsubscribe('app:notification');
        this.events.unsubscribe('app:reload');
    }

    defineOrientationEvent() {
        if (window && window.screen && window.screen.orientation) {
            if (window.screen.orientation.type.startsWith('landscape')) {
                this.unit = 'vw';
            }
        }
        window.addEventListener("orientationchange", () => {
            if (window && window.screen && window.screen.orientation) {
                if (window.screen.orientation.type.startsWith('landscape')) {
                    this.unit = 'vw';
                } else {
                    this.unit = 'vh';
                }
            }
        });
    }
    loading: any = false;
    loadMySeatData() {
        this.beachService.getAllSeats()
            .then(({ grid, bookings }) => {
                grid.front = grid.front.filter(li => li.type !== 'static');
                grid.middle = grid.middle.filter(li => li.type !== 'static');
                grid.back = grid.back.filter(li => li.type !== 'static');
                const allSeats = [].concat(grid.front, grid.middle, grid.back);
                allSeats.map((seat) => {
                    seat.statusList = Object.keys(seat.status);
                    this.getSeatFreeStatus(seat);
                });

                this.refreshMySeats(allSeats);
            })
            .catch(error => {
            })
    }
    refreshMySeats(allSeats) {
        if (!this.loaded) {
            this.loading = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            this.loading.present();
        }
        this.beachService.getOrders()
            .then(orders => {
                orders = orders.map(item => {
                    item.updated = moment(new Date(item.updated_at)).format('HH:mm');
                    return item;
                })

                this.seats = allSeats.filter((seat) => {
                    if (!this.appService.getAccount()) return false;
                    return seat.waiter && (seat.waiter.id == this.appService.getAccount().id);
                });

                this.addOrdersToReservation(orders);
                if (this.loading) {
                    this.loading.dismiss();
                    this.loading = false;
                }
                this.loaded = true;
            })
            .catch(error => {
                if (this.loading) {
                    this.loading.dismiss();
                }
                this.appService.errorHandler(error);
            })
    }
    addOrdersToReservation(orders) {

        try {
            this.seats.forEach((item, seat_index) => {
                if (item.reservations) {
                    item.reservations.forEach((item, reservation_index) => {
                        for (var order of orders) {
                            if (item.id == order.reservation_id) {
                                this.seats[seat_index].reservations[reservation_index].orders = this.seats[seat_index].reservations[reservation_index].orders || [];
                                this.seats[seat_index].reservations[reservation_index].orders.push(order);
                            }
                        }
                    })
                }
            })

        } catch (error) {
        }

        orders.map((order) => {
            if (!order.confirm) {
                this.seats.map((seat) => {
                    let seatRes = seat.reservations || [];
                    seatRes.map((seatres) => {
                        if (seatres.id == order.reservation_id) {
                            if(order.status == 'sent'){
                                let slots = order.reservation.seat.slots;
                                Object.keys(slots).map((slotName) => {
                                    slots[slotName].forEach((slotval, slotIndex) => {
                                        if (slotval) {
                                            seat.status[slotName][slotIndex] = 'new_order';
                                        }
                                    });
                                });
                            }

                        }
                    });
                });
            }
        });

    }
    ionViewWillEnter() {
        this.events.subscribe('app:notification', (data) => this.onNewNotification(data));
        this.events.subscribe('app:reload', () => {
            this.loadMySeatData();
        });
        this.events.publish('app:reload');
    }


    getStatusColorSeatAll(seat, seatName: any, ind = -1) {
        if (!seat.reservations) return this.status_color.available;
        var has_reservations = false, new_order = false;
        const check_number_sides = seatName.toUpperCase();
        for (var reservation of seat.reservations) {
            if (reservation.seat_number_sides.indexOf(check_number_sides) > -1) {
                has_reservations = true;
                if (reservation.orders) {
                    for (var order of reservation.orders) {
                        if (order.status === 'sent') {
                            new_order = true;
                        }
                    }
                }
            }
        }
        if (new_order) {
            return this.status_color.new_order
        } else if (has_reservations) {
            let status = 'available';
            let index = 0;
            seat.status[seatName].forEach(item => {
                if (item != 'available' && (ind == index || ind == -1)) status = item;
                index++;
            })
            return this.status_color[status];
        } else {
            return this.status_color.available;
        }
    }

    getStatusColorSeatA(seat) {
        if (!seat.reservations) return this.status_color.available;
        var has_reservations = false, new_order = false;
        const check_number_sides = 'A';
        for (var reservation of seat.reservations) {
            if (reservation.seat_number_sides.indexOf(check_number_sides) > -1) {
                has_reservations = true;
                if (reservation.orders) {
                    for (var order of reservation.orders) {
                        if (order.status === 'sent') {
                            new_order = true;
                        }
                    }
                }
            }
        }
        if (new_order) {
            return this.status_color.new_order
        } else if (has_reservations) {
            let status = 'available';
            seat.status.a.forEach(item => {
                if (item != 'available') status = item;
            })
            return this.status_color[status];
        } else {
            return this.status_color.available;
        }
    }
    getStatusColorSeatB(seat) {
        
        /** add check orders code */
        if (!seat.reservations) return this.status_color.available;
        var has_reservations = false, new_order = false;
        const check_number_sides = 'b';
        for (var reservation of seat.reservations) {
            let selected = eval([0].concat(reservation.seat.slots[check_number_sides] || []).join("+"));
            if (selected) {
                has_reservations = true;
                if (reservation.orders) {
                    for (var order of reservation.orders) {
                        if (order.status === 'sent') {
                            new_order = true;
                        }
                    }
                }
            }
        }
        if (new_order) {
            return this.status_color.new_order
        } else if (has_reservations) {
            let status = 'available';
            seat.status.b.forEach(item => {
                if (item != 'available') status = item;
            })
            return this.status_color[status];
        } else {
            return this.status_color.available;
        }
    }
    getStatusColorSeat(seat) {
        /** add check orders code */
        if (!seat.reservations) return this.status_color.available;
        var new_order = false;
        for (var reservation of seat.reservations) {
            if (reservation.orders) {
                for (var order of reservation.orders) {
                    if (order.status === 'sent') {
                        new_order = true;
                    }
                }
            }
        }
        if (new_order) {
            return this.status_color.new_order;
        } else {
            return this.status_color[seat.status];
        }
    }
    getStatusClass(li) {
        let type = li.type,
            cls = type.substr(0, 1),
            getStatus = function (list) {
                let no = 1;
                for (let i = 0; i < list.length; i++) {
                    if (list[i] == 'booked' || list[i] == 'pending') {
                        no = 2;
                        break;
                    }
                }
                return '_' + no;
            };
        if (type == 'static' || !li.status) {
            return 's_0';
        }
        let keys = Object.keys(li.status);
        for (let i = 0; i < keys.length; i++) {
            let side = keys[i];
            cls += getStatus(li.status[side]);
        }
        return cls;

    }
    //Grid Functions
    getPosImg(item) {
        let img = '/'; // this.imgPath + this.seatData.beach_id + '/elements/';
        if (item.type == 'static') {
            img = item.image;
        } else {
            img += item.image;
        }
        item.img = img;
        return img;
    }
    getGridInfo(zone, pos) {
        try {
            const grid = JSON.parse(localStorage.beach_grid);
            let info = grid[zone][pos]['info'];
            let list = info.mapElement.list;

            if (list && list[0]) {
                info.mapElement.list = { center: [list[0]] };
            }
            return info || null;
        } catch (e) {

            return null;
        }
    }

    getShapeClass(seat: any) {
        let seatCount = (seat.statusList) ? seat.statusList.length : 1;
        return {
            'square': seat.type == 'baldaquin',
            'circle': (seat.type == 'umbrella' && !(seatCount > 1)),
            'ellipse': (seat.type == 'umbrella' && seatCount > 1)
        }
    }
    getStatusHeightBak(status: any): any {
        let length = status.length;
        if ((typeof status) == 'string') length = 1;
        return {
            'height': `${this.mStatusH / length}${this.unit}`
        }
    }
    getStatusHeight(status: any): any {
        let length = status.length;
        if ((typeof status) == 'string') length = 1;
        return {
            'height': `${this.mStatusH / length}${this.statusUnit}`
        }
    }
    filterOrderStatusSunbed(reservation) {
        if (this.orderStatus == 1) return true;
        if (this.orderStatus == 3) return false;
        if (!reservation.orders) return false;
        for (var order of reservation.orders) {
            if (order.status === 'sent') return true;
        }
        return false;
    }
    filterOrderStatusSeat(seat) {
        if (this.orderStatus == 1) return true;
        if (this.orderStatus == 3) {
            if ((typeof seat.status) === 'string') return seat.status === 'available';
            return seat.freeSlot;
        }

        if (!seat.reservations) return false;
        for (var reservation of seat.reservations) {
            if (!reservation.orders) continue;
            for (var order of reservation.orders) {
                if (order.status === 'sent') return true;
            }
        }
        return false;
    }
    filterConnectionStatusSunbed(reservation) {
        if (this.connectionStatus == 3) return true;
        const status = (reservation.created_by != reservation.broker_id) || (reservation.created_by != reservation.created_for_id)
        var connectionStatus = status ? 1 : 2;
        return connectionStatus == this.connectionStatus;
    }
    filterConnectionStatusSeat(seat) {
        if (this.connectionStatus == 1 && this.orderStatus == 3) return false;
        if (this.connectionStatus == 3) return true;
        if (seat.reservations) {
            for (var reservation of seat.reservations) {
                const status = (reservation.created_by != reservation.broker_id) || (reservation.created_by != reservation.created_for_id)
                var connectionStatus = status ? 1 : 2;
                if (connectionStatus == this.connectionStatus) return true;
            }
        }
        return false;
    }
    onClickConnectionStatusFilter(event: any) {
        this.connectionStatus = event;
    }
    onClickOrderStatusFilter(event: any) {
        this.orderStatus = event;
    }
    getStatusColor(statusArray) {
        let status = 'available';
        console.log("1234",statusArray);
        statusArray.forEach(item => {
            if (item != 'available') status = item;
        })
        return this.status_color[status];
    }

    getSeatFreeStatus(seat: any) {
        try {
            let statusList = seat.statusList;
            seat.freeSlot = false;
            /* if(seat.waiter) {
                return false;
            } */
            statusList.map((status) => {
                let free = true;
                seat.status[status].map((statusText) => {
                    if (statusText != 'available') {
                        free = false;
                    }
                });
                if (free) {
                    seat.freeSlot = true;

                }

            });
        } catch (e) {

        }
    }


    onClickSeat(seat: any) {
        if (seat.type === 'umbrella') {
            this.navCtrl.push('UmbrellaPage', {
                seat,
                'left-color': this.getStatusColorSeatA(seat),
                'right-color': this.getStatusColorSeatB(seat),
            });
        } else if (seat.type === 'baldaquin') {
            this.navCtrl.push('BaldaquinPage', { seat });
        } else {
            this.navCtrl.push('SunbedPage', { seat });
        }
    }

}
