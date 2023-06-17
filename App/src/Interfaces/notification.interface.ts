export interface notification {
    _id: string,
    user: string,
    message: string,
    read: boolean,
    title: string
}
export interface notificationapires {
    success: boolean,
    data: notification[]
}