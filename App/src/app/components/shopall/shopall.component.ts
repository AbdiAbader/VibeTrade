import { Component } from '@angular/core';

import { Searched } from 'src/app/layouts/header/header.component';
import { ProductserviceService } from 'src/app/services/productservice.service';
import { Product, Productapiresponse } from 'src/Interfaces/product';
import {MatDialog} from '@angular/material/dialog';
import { CastserviceService } from 'src/app/services/cart/castservice.service';

@Component({
  selector: 'app-shopall',
  templateUrl: './shopall.component.html',
  styleUrls: ['./shopall.component.scss']
})
export class ShopallComponent {
  first = 0;
  second = 6;
  productlist : Product[] = [];
  allProducts: Product[] = [];
 
  constructor(private productservice: ProductserviceService, private dialog: MatDialog,
    private cartservice: CastserviceService){
    this.getpro();
    
  }
  getpro(){
     this.productservice.getProducts().subscribe(
      (response: Productapiresponse) =>
      {
        this.allProducts = response.products;
        this.productlist = response.products;
      },
      (error) => console.log(error)
      
    )
  }
  all(){
    this.productlist = this.allProducts;
  }
  furnitures(){
    this.productlist = this.allProducts.filter((product) => product.category === 'Furnitures');
  }
  electronics(){
    this.productlist = this.allProducts.filter((product) => product.category === 'Electronics');
  }
    shoe(){
    this.productlist = this.allProducts.filter((product) => product.category === 'Shoe');

}
Clothe(){
  this.productlist = this.allProducts.filter((product) => product.category === 'Clothes');
}
view(product: any){
  this.cartservice.singlecart(product);
  this.dialog.open(Searched);

}
next(){
  if (this.second < this.productlist.length)
  {
  this.first +=5
  this.second +=5
  }

}
prev(){
  if(this.first != 0){
    
this.first -=5
this.second -=5
}
}
sale(){
  this.productlist = this.allProducts.filter((product) => product.sale === true);
}

}