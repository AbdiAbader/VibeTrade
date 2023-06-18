import { Component } from '@angular/core';
import { OrderserviceService } from 'src/app/services/order/orderservice.service';
@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss']
})
export class OrderConfirmComponent {
  order: any = {};
  constructor(private orderservice: OrderserviceService) { 
    this.getlatestorder();
  }


  ngOnInit(): void {
  
 
  }
  getlatestorder(): void{
    this.orderservice.getorderitems().subscribe((res: any) => {
      this.order = res.orders[res.orders.length - 1];
      console.log(this.order);
    }
    )
  }


}
