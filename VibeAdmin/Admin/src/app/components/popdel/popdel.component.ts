import { Component, Inject, Injectable } from '@angular/core';
import { ProductserviceService } from 'src/app/services/product/productservice.service';
import { ProductResponse, Product } from 'src/app/interfaces/Products/product.interface';
import { MatTableDataSource } from '@angular/material/table';
import { OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { OrderserviceService } from 'src/app/services/order/orderservice.service';
import { Order } from 'src/app/interfaces/Orders/orders.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popdel',
  templateUrl: './popdel.component.html',
  styleUrls: ['./popdel.component.scss']
})
export class PopdelComponent implements OnInit {
  orderbool: boolean = false;
  probool: boolean = false;
  ck: any
  productlist : Product[] = [];
  dataSource : any;
  userlist : any;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private productservice: ProductserviceService, private orderservice: OrderserviceService) { 
    this.getproducts();
    this.userlist = this.data.order_id;
   if (this.data.type ==  'product') {
    this.probool = true;
   }
    else {
      this.orderbool = true;
     
    }
  }
  ngOnInit(): void {
    this.getproducts();
  }

  getproducts() {
    this.productservice.getproducts().subscribe(
      (data) => {
        // Assign the data to the data source for the table to render
        this.productlist = data.products;
        this.dataSource = new MatTableDataSource(this.productlist);
        console.log(this.productlist);
      },
      (error) => {
        console.error('Error retrieving properties:', error);
      }
    );
  }

  deleteProduct() {
    this.productservice.deleteproduct(this.productservice.getid()).subscribe(
      (data) => {
      },
      (error) => {
        console.error('Error retrieving properties:', error);
      }
    );
}

deleteOrder() {
  this.orderservice.deleteorders(this.userlist).subscribe(
  
    (error: any) => {
      console.error('Error retrieving properties:', error);
    }

  );
}
}
