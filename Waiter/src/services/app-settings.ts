// Global App Settings

export const STATUS = {
    SEAT: {
        available: 1,
        occupied: 2,
        booked: 3,
        disabled: 4,
        locked: 5
    },
    ONOFF: ['online', 'offline'],
    SHAPE: ['circle', 'square', 'triangle'],
    KIND: ['Ambrella', 'Baldaquin', 'Sunbed']
}

export const STORE = {
    SEAT_DATA: {
        ALL_SEATS: 'all_seats',
        ALL_SUNBEDS: 'all_sunbeds',
        STATE: 'store_state',
    },
    USER: {
        LOGIN: 'is_login',
        ACCOUNT: 'account',
        LANG: 'lang',
        LAST_NOTIFICATION: 'last_notification',
    }
}

export const status_color = {
    new_order:      'orange',
    available:      '#ffffff',
    booked:         '#CD70F4',
    paid:           '#ff0000',
    occupied :      '#000000'
}
