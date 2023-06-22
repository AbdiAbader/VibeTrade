import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, OrderResponse } from 'src/app/interfaces/Orders/orders.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderserviceService {

  constructor(private http: HttpClient) { }

  getorders(): Observable<OrderResponse> {
    const url = `http://localhost:3000/order/all`; 
      
    return this.http.get<OrderResponse>(url);
    
    }
  deleteorders(orderid: string): Observable<OrderResponse> {
    const url = `http://localhost:3000/order/all/${orderid}`
    return this.http.delete<OrderResponse>(url)
  }

}
