export interface ReadyState {
    CONNECTING : number;
    OPEN       : number;
    CLOSED     : number;
}

export interface Notification {

    id?: string;
    customer_id: string;
    entity?: string;
    action: string;
    sunbeds?: number;

}