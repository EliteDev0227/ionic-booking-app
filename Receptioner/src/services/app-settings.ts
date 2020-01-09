// Global App Settings

export const STATUS = {
    SEAT : ['order','booked','free','busy'],
    ONOFF : ['online','offline'],
    SHAPE : ['circle','square','triangle'],
    KIND : ['Ambrella','Baldaquin','Sunbed']
}

export const STORE = {
    SEAT_DATA : {
        ALL : 'all_seats',
        MY : 'my_seats',
        FREE : 'free_seats',
        STATE : 'store_state'
    }, 
    USER : {
        LOGIN : 'is_login',
        TOKEN : 'user_token',
        ID    : 'user_id',
        PHONE : 'user_phone',
        BEACH_ID : 'beach_id',
        BEACH_NAME : 'beach_name'
    },
    SETTINGS: {
        EXTRA_SEATS: 'extra_seats',
        CURRENCY: 'currency'
    }
}