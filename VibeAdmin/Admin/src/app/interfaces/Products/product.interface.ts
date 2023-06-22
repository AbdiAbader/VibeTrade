export interface Product {
    _id: string,
    name: string,
    price: number,
    description: string,
    category: string,
    image: string,
    quantity: number,
    createdAt: string,
    updatedAt: string,
    __v: number
}

export interface ProductResponse {
    products: Product[],
   
}