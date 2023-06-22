import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { UserserviceService } from 'src/app/services/user/userservice.service';
import { UserResponse } from 'src/app/interfaces/Users/user.interface';
import { MatPaginator,MatPaginatorModule } from '@angular/material/paginator';
import { DataService } from 'src/app/services/data/data.service';
import { FormControl, Validators } from '@angular/forms';
import { Order } from 'src/app/interfaces/Orders/orders.interface';
import { OrderserviceService } from 'src/app/services/order/orderservice.service';
import { PopdelComponent } from '../popdel/popdel.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  isSidebarVisible = true;
  isChanged: boolean = false;
  displayedColumns: string[] = ['position', 'name', 'order', 'delete' ];
  dataSource : any;
  orderlist!: Order[]
  orderbool: boolean = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

constructor( private orderservice: OrderserviceService, public dialog: MatDialog){
  this.getorder();
}

ngOnInit(): void {
  this.getorder();
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  update(name: string){
    console.log(name);
  }


  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
}

isChangedFunc() {
  this.isChanged = true;
}

getorder() {
  this.orderservice.getorders().subscribe(
    (data) =>{
      this.orderlist = data.orders;
      this.dataSource = new MatTableDataSource(this.orderlist);
      this.dataSource.paginator = this.paginator;
      console.log(this.orderlist);
    }
  )

}

open(orderlist: Order) {
  const dialogRef = this.dialog.open(PopdelComponent, {
   
    data: {order_id: orderlist._id,
      type: 'order'}
  });
  dialogRef.afterClosed().subscribe((result) => {
    console.log(`Dialog result: ${result}`);
    this.getorder();
  });
}

}
