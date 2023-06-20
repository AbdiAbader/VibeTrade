import { Component, OnInit, AfterViewInit, ViewChild, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormBuilder, FormControlName, Validators, FormGroup, FormControl } from '@angular/forms';
import { SeeOrderComponent } from '../see-order/see-order.component';
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
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-account-home',
  templateUrl: './my-account-home.component.html',
  styleUrls: ['./my-account-home.component.scss'],
  
})
export class MyAccountHomeComponent implements OnInit {
  progress: boolean = false;
  see: boolean = false;
  order: Order[] = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'see','symbol'];
  dataSource: any;
  hasChanges: boolean = false;
  email: string = '';
  name: string = 'sdds';
  current_password: string = '';
  new_pass1: string = '';
  new_pass2: string = '';
  address: string = '';
  userdata: User[] = [];
  pass: string = 'asdsdss';
  user: User[] = [];

  updateform: FormGroup = new FormGroup({
    name: new FormControl(''),
    cp: new FormControl('',),
    new_1: new FormControl(''),
    new_2: new FormControl(''),
    updateOption: new FormControl(''),
  });

  
 constructor (private _liveAnnouncer: LiveAnnouncer,
  private orderservice: OrderserviceService, private userservice: UserauthServiceService, 
  private _snackBar: MatSnackBar,
  private frombuilder: FormBuilder,
  
  private dialog: MatDialog) {
    
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
this.progress = true;
const info = {
  name: this.updateform.value.name,
  cp: this.updateform.value.cp,
  new_password: this.updateform.value.new_1,
  new_password2: this.updateform.value.new_2,
  updateOption: this.updateform.value.updateOption

}
setTimeout(() => {
  this.progress = false;
},3000);
if (info.updateOption === 'name') {
if (info.name === '') {
  this.openSnackBar('Empty Name');
  return;
}
if (info.name.length < 3){
  this.openSnackBar('Name too short');
  return;
}
else {
  this.userservice.updateuser({
    "name": info.name
}).subscribe(
    (response: any) => {
      console.log(response);
      if (response.status === 'success') {
        this.openSnackBar('Name updated');
        this.userinfo();
      }
      else {
        this.openSnackBar('Try Again');
      }
     
    }
  );

}


}
else if (info.updateOption === 'password') {
  if (info.cp === '' || info.cp.length < 8) {
    this.openSnackBar('Minimum 8 characters');
    return;
  }
  if (info.new_password === '' || info.new_password.length < 8 || info.new_password2 === '' || info.new_password2.length < 8) {
    this.openSnackBar('Minimum 8 characters for new password');
    return;
  }
  if (info.new_password !== info.new_password2) {
    this.openSnackBar('New passwords do not match');
    return;
  }
  else {
    this.userservice.updateuser({
      "password": info.cp,
      "new_password": info.new_password,
      "new_password2": info.new_password2
  }).subscribe(
      (response: any) => {
        console.log(response);
        if (response.status === 'success') {
          this.openSnackBar('Password updated');
         
        }
        else {
          this.openSnackBar('Try Again');
        }
       
      }
    );
  }
}

}
openSnackBar(msg: string) {
  this._snackBar.open(msg, 'Close', {
    horizontalPosition: 'center',
    verticalPosition: 'top',
   
    duration: 2000
  });
}
  updateaddress()
  { 
    this.progress = true;
    this.userservice.updateuser({
      "shippingAddress": this.address
  }).subscribe(
      (response: any) => {
        console.log(response);
        if (response.status === 'success') {
          this.openSnackBar('Address updated');
        }
        else {
          this.openSnackBar('Try Again');
        }
       
      }
    );
    setTimeout(() => {
      this.progress = false;
    },3000);
  }
  view_order(order: any){
    console.log(order);
    this.dialog.open(SeeOrderComponent, {
      data: order
    });
  }
  update_table(){

    this.getOrders();
  }
  remove_order(order: any){
    this.progress = true;
this.dialog.open(ConfirmDialogComponent, {
  data: order
});
this.dialog.afterAllClosed.subscribe((res: any) => {

  
    this.getOrders();
 
}

);

setTimeout(() => {
  this.progress = false;
},3000);


}


}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./my-account-home.component.scss']
})

export class ConfirmDialogComponent {

  constructor(private dialog: MatDialog, private ordersevice: OrderserviceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router){}
   delete(){
    console.log(this.data);
    const id = this.data._id;

  this.ordersevice.deleteorder(id)
 this.dialog.closeAll();




  }
  cancel(){
    this.dialog.closeAll();
  }
}