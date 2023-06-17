import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';

import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { OrderserviceService } from 'src/app/services/order/orderservice.service';
import { Order, Orderapiresponse } from 'src/Interfaces/order';
import { UserauthServiceService } from 'src/app/services/userauth-service.service';
import { User } from 'src/Interfaces/user.interface';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-my-account-home',
  templateUrl: './my-account-home.component.html',
  styleUrls: ['./my-account-home.component.scss'],
  
})
export class MyAccountHomeComponent implements OnInit {
  order: Order[] = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: any;
  hasChanges: boolean = false;
  email: string = '';
  name: string = '';
  current_password: string = '';
  new_pass1: string = '';
  new_pass2: string = '';
  address: string = '';
  userdata: User[] = [];
  pass: string = '';
  user: User[] = [];

  
 constructor (private _liveAnnouncer: LiveAnnouncer,
  private orderservice: OrderserviceService, private userservice: UserauthServiceService, 
  private _snackBar: MatSnackBar) {
    
   }
 @ViewChild(MatSort) sort: MatSort = new MatSort();
  ngOnInit(): void {
   this.getOrders();
   this.userinfo();
}
getOrders(): void {
  this.orderservice.getorderitems().subscribe(
  (response: Orderapiresponse) => {

    this.dataSource = new MatTableDataSource(response.orders);

  },
  (error) => {
    console.log(error);
  }
);
}


ngAfterViewInit() {
  this.dataSource.sort = this.sort;
}

/** Announce the change in sort state for assistive technology. */
announceSortChange(sortState: Sort) {
  if (sortState.direction) {
    this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  } else {
    this._liveAnnouncer.announce('Sorting cleared');
  }
}
userinfo()
{
  this.userservice.getuserbyid().subscribe(
    (response: any) => {
      this.name = response.data.name;
      this.email = response.data.email;
      
      this.address = response.data.shippingAddress;
    
    }
  );

  
}
updateuser()
{


  

  
  
}
openSnackBar() {
  this._snackBar.open('Cannonball!!', 'Splash', {
    horizontalPosition: 'center',
    verticalPosition: 'top',
    duration: 2000
  });
}
  updateaddress()
  { 
    
    this.userservice.updateuser({
      "shippingAddress": "Addiss"
  }).subscribe(
      (response: any) => {
        console.log(response);
       
      }
    );
  }
  
}

