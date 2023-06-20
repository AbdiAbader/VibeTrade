import { Component } from '@angular/core';

import {MatPaginatorModule} from '@angular/material/paginator';
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
  productlist : Product[] = [];
 
  constructor(private productservice: ProductserviceService, private dialog: MatDialog,
    private cartservice: CastserviceService){
    this.getpro();
    
  }
  getpro(){
     this.productservice.getProducts().subscribe(
      (response: Productapiresponse) =>
      {
        this.productlist = response.products;
      },
      (error) => console.log(error)
      
    )
  }
  furnitures(){
    this.productservice.getProducts().subscribe(
      (response: Productapiresponse) =>
      {
       this.productlist = response.products.filter((product) => product.category === 'Furniture');
      },
      (error) => console.log(error)
      
    )
  }
  electronics(){
    this.productservice.getProducts().subscribe(
      (response: Productapiresponse) =>
      {
       this.productlist = response.products.filter((product) => product.category === 'Electronics');
      },
      (error) => console.log(error)
      
    )
  }
    shoe(){
      this.productservice.getProducts().subscribe(
        (response: Productapiresponse) =>
        {
          this.productlist = response.products.filter((product) => product.category === 'Shoe');
          }
      )


}
view(product: any){
  this.cartservice.singlecart(product);
  this.dialog.open(Searched);

}

}