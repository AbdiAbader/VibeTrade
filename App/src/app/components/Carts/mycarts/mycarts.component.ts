import { Component, Inject, OnInit, OnChanges} from '@angular/core';
import { Router } from '@angular/router';
import { CastserviceService } from 'src/app/services/cart/castservice.service';
import { Product } from 'src/Interfaces/product';
import { Cart } from 'src/Interfaces/cart';
import { OrderserviceService } from 'src/app/services/order/orderservice.service';
import { Orders, OrderItem } from 'src/Interfaces/order';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { UserauthServiceService } from 'src/app/services/userauth-service.service';
import { NotifyserviceService } from 'src/app/services/notify/notifyservice.service';





@Component({
  selector: 'app-mycarts',
  templateUrl: './mycarts.component.html',
  styleUrls: ['./mycarts.component.scss']
})
export class MycartsComponent implements OnInit  {
  progress = false;
 payment: string = 'cash on delivery';
 empty = true;
 orderitem: OrderItem[] = []
 msg = '';
  order: any
  card: any;

  selectedValues: number[] = [];
  selectedValue: number = 1;
  product: Product[] = [];
  cart: Cart[] = [];
  shipping: string = '';
  paymentHandler: any = null;
  stripeAPIKey: any = 'pk_test_51NI7b4AxmjUhPD5LMdKZyHa6gQBYvzPCMQAwAqasg3xZ8JKtO04fvpPliHITdYg6jdr4RGyUP6qT6T9BmRP59Z9j00V6RXkgCA';

  constructor(private cartservice: CastserviceService,
    private orderservice: OrderserviceService, private _snackBar: MatSnackBar,
    private userauthservice: UserauthServiceService,
    private router: Router,
    private notify: NotifyserviceService ){
      
  }

  ngOnInit(): void {

   

    this.cart = this.cartservice.getcart()
    this.total();
    this.invokeStripe();
   this.userauthservice.getuserbyid().subscribe((res: any) => {

    this.shipping = res.data.shippingAddress;
 
   }
    )
   
  }
  ngOnChanges(): void {
    this.total();
  }
  removefromcart(product: any, selectedValue: number){
     
    this.cartservice.removefromcart(product, selectedValue)
    
   this.total();

  }
  onQuantityChange(product: Product, selectedValue: number) {
   
    this.total();
  }



 async checkout(){
  if (this.shipping === '') {
    this.snackbar("Please add shipping address");
  
    return;
  }
 
   
   
  
   
 if (this.cartservice.getcart().length > 0) {
  this.progress = true;
    if (this.payment !== 'cash on delivery') {
      this.paymentHandler.open({
        name: 'VibeTrade-Shopping',
        description: 'Payment',
        amount: this.total() * 100
      });
    }
    if (this.paymentHandler.closed) {

    for (let item of this.cartservice.getcart()) {
      this.orderitem.push({
        product: item.product._id,
        quantity: item.selectedvalue
      })
    }
   this.order = {
      payment_method: this.payment,
      order_items: this.orderitem,
   }
   setTimeout(() => {
    this.progress = false;
  }, 3000);
    

    this.orderservice.addorderitem(this.order).subscribe((res: any) => {
      
      console.log(res);
        this.empty = false;
        this.snackbar("Order placed successfully");
        this.notify.createNotification({"title": "Order Placed Successfully", "message": "Your order has been placed successfully"})
        this.cartservice.freecart();
        this.router.navigate(['/orderconfirm']);
      
    
  },
  (err: any) => {
    this.snackbar("Product out of stock");
    this.progress = false;
  }
  )
    }

  
}

else {
  this.snackbar("Cart is empty");

}
this.progress = false;

  }

snackbar(msg: string ){
  this._snackBar.open(msg, 'close', {
    duration: 5000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
  });
}
total(): number{
 return Number(this.cartservice.Total());
}




invokeStripe() {
  if (!window.document.getElementById('stripe-script')) {
    const script = window.document.createElement('script');

    script.id = 'stripe-script';
    script.type = 'text/javascript';
    script.src = 'https://checkout.stripe.com/checkout.js';
    script.onload = () => {
      this.paymentHandler = (<any>window).StripeCheckout.configure({
        key: this.stripeAPIKey,
        locale: 'auto',
        token: function (stripeToken: any) {
          console.log(stripeToken);
          alert(this.snackbar());
        },
      });
    };

    window.document.body.appendChild(script);

  }
}

}
