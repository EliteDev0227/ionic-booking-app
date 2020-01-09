export interface ReadyState {
    CONNECTING : number;
    OPEN       : number;
    CLOSED     : number;
}

export interface Notification {
    id?: string;
    broker_id: string;
    entity?: string;
    action: string;
    sunbeds?: number;
}