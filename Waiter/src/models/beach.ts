export interface BeachSetting {
    id?: string,
    timezone?: string,
    currency?: string,
}

export interface Beach {
    id: string,
    name?: string,
    image?: string,
    status?: string,
    settings_id?: string,
    settings: BeachSetting,
}
