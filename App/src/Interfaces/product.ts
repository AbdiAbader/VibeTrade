export interface Product {
    _id: string,
    name: string,
    price: number,
    description: string,
    quantity: number,
    image: string,
    brand: string,
    category: string,
    sale: boolean,

}
export interface Productapiresponse {
    products : Product[],
    status: string;
   
    
}
    