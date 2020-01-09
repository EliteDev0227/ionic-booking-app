export interface Coord {
    y: number,
    x: number
}
export interface Seat {
    broker_id: string,
    coords: Coord,
    number: string,
    price: number,
    seats: number
    status: any,
    type: string,
    selected?: boolean,
    waiter?: Account,
}

export interface Grid {
    front: Array<Seat>,
    middle: Array<Seat>,
    back: Array<Seat>,
}

export interface Reservation {
    id: string,
    number: number,
    created_by?: string,
    created_for_id?: string,
    waiter_id?: string,
    waiter? : Account,
    broker_id?: string,
    beach_id: string,
    status: string,
    seat_number: string,
    seat_number_sides: string,
    seat_type: string,
    phone?: string,
    created_for_phone?: string,
    name?: string,
    created_for_name?: string,
    selected?: boolean,
}

