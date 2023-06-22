import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserResponse, User } from 'src/app/interfaces/Users/user.interface';
import { ProductResponse } from 'src/app/interfaces/Products/product.interface';
import { Observable } from 'rxjs';
import { OrderResponse } from 'src/app/interfaces/Orders/orders.interface';
import { RequestResponse } from 'src/app/interfaces/Users/userRequest.inerface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/product';

  constructor(private http: HttpClient) { }

  getusers(): Observable<UserResponse> {
    return this.http.get<UserResponse>('http://localhost:3000/user')
    }
 
    getproducts(): Observable<ProductResponse> {
    
      return this.http.get<ProductResponse>(this.apiUrl);
      }
      getorders(): Observable<OrderResponse> {
        const url = `http://localhost:3000/order/all`; 
          
        return this.http.get<OrderResponse>(url);
        
        }

        getrequests(): Observable<RequestResponse> {
          const url = `http://localhost:3000/request`; 
            
          return this.http.get<RequestResponse>(url)
        
          
          }
 

  }