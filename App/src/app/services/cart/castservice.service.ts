import { Injectable } from '@angular/core';
import { Cart   } from 'src/Interfaces/cart';
import { Product } from 'src/Interfaces/product';


@Injectable({
  providedIn: 'root'
})
export class CastserviceService {
  total: number = 0;
 cart: Cart[] = [];
 onecart: Product[] = [];
 selectedvalue: number = 1;
  constructor() { }

  
  singlecart(product: Product){
    this.onecart = [];
   this.onecart.push(product);
  }
  getsinglecart(){
    return this.onecart;
  }

  addtocart(product: any, selectedvalue: number) {
    const existingProductIndex = this.cart.findIndex(item => item.product._id === product._id);
    
    if (existingProductIndex !== -1) {
      // Product already exists in cart, update the quantity
  
      this.cart[existingProductIndex].selectedvalue = Number(selectedvalue);
      console.log(this.cart[existingProductIndex].selectedvalue);
      
    } else {
    
      this.cart.push({ product, selectedvalue });
    }
  }
getcart(){
  return this.cart;
}

removefromcart(product: any,selectedvalue: number){
  this.cart.splice(this.cart.indexOf({product, selectedvalue}), 1);
}
freecart(){
  this.cart = [];
}
Total(){
  this.total = this.cart.reduce((i, j) => i + j.product.price * j.selectedvalue, 0);
  return this.total.toFixed(2);

  }


counter(){
  return this.cart.length;
}
}
