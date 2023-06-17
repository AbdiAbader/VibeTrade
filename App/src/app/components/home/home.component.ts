import { Component, OnInit } from '@angular/core';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { CastserviceService } from 'src/app/services/cart/castservice.service';
import { ProductserviceService } from 'src/app/services/productservice.service';
import { Productapiresponse } from 'src/Interfaces/product';
import { Product } from 'src/Interfaces/product';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,

} from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Searched } from 'src/app/layouts/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],


})

export class HomeComponent implements OnInit {

  selectedvalue: number = 1;
  productlist : Product[] = [];
 
  constructor(private productservice: ProductserviceService, private cartservice: CastserviceService,
  private dialog: MatDialog,
   ){
  
  }
  
  ngOnInit() {
    
    
    this.getProducts();
  
  }

  getProducts() {
    this.productservice.getProducts().subscribe(
      (response: Productapiresponse) => {
        console.log(response);
        this.productlist = response.products;

      },
      (error)  => console.log(error) 
    );
    this.productlist.sort().reverse();
    
  }

  view(product: any): void {
    this.dialog.open(Searched);
    
    this.cartservice.singlecart(product);
   
  }
  singlecart1(product: Product){
    this.cartservice.singlecart(product);
  }

  
  
}
