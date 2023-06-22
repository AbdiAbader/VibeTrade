import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserauthServiceService } from 'src/app/services/userauth-service.service';
import { OrderserviceService } from 'src/app/services/order/orderservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifyserviceService } from 'src/app/services/notify/notifyservice.service';
import { Router } from '@angular/router';
import { CastserviceService } from 'src/app/services/cart/castservice.service';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent {
  credit= '5444-4444-4444-4444';
  Total = 0;
  orderitem:any = [];
  orders: any = [];

  payment = 'Credit Card';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userservice: UserauthServiceService,
  private orderservice: OrderserviceService, private snackbar: MatSnackBar,
  private notify: NotifyserviceService, private router: Router,
  private cartservice: CastserviceService) { 
    console.log(data);
    this.Total = this.data.total;
    this.payment = this.data.payment;
    for (let i = 0; i < this.data.cart.length; i++) {
      console.log(this.data.cart[i]);
      this.orderitem.push({
        product_id: this.data.cart[i].product_id,
        quantity: this.data.cart[i].selectedValue
      });
    }
    this.orders = {
      payment_method: this.payment,
      order_items: this.orderitem,
   }

  }
pay(){
  this.userservice.paydemo(this.Total).subscribe((res: any) => {
    console.log(res);
  this.orderservice.addorderitem(this.orders)
});
    this.snack('Order Placed Successfully');
    this.notify.createNotification({"title": "Order Placed Successfully", "message": "Your order has been placed successfully see your order in order history"})
      this.cartservice.freecart();
      this.router.navigate(['/orderconfirm']);    
  
}

snack(msg: string){
  this.snackbar.open(msg, 'close', {
    duration: 3000,
    verticalPosition: 'top',
    horizontalPosition: 'center'
  });

}
}
