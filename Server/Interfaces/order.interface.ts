export interface OrderItems {
    order: string;
    product: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;

}

export interface Order {
    _id: string,
    user: string,
    order_items: orderitems[],
    order_status: string,
    order_date: Date,
    createdAt: Date,
    updatedAt: Date,
}
 export interface orderitems {
    product: string;
    quantity: number;
}