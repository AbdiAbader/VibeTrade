

export interface Order {
    _id: string,
    user: string,
    order_date: string,
    order_status: string,
    payment_method: string,
    order_items: OrderItem[],
    createdAt: string,
    updatedAt: string,
    __v: number,
  }
  export interface Orders{
   user: string,
    payment_method: string,
    order_items: OrderItem[]
  }
  
  export interface OrderItem {
  
    product: string,
    quantity: number
    
   
  }
export interface Orderapiresponse {
    orders : Order[];
  
    
}