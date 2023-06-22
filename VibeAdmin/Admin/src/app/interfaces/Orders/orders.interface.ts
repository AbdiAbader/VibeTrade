export interface Order {
    _id: string,
    user: string,
    order_date: Date,
    order_status: string,
    payment_method: string,
    createdAt: Date,
    updatedAt: Date,
    order_items: OrderItem[]
}


export interface OrderItem {
    _id: string,
    product: string,
    quantity: number
}

export interface OrderResponse {
    orders: Order[],
    orderitem: OrderItem[] 
}