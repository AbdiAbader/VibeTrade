import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Orders, Orderapiresponse } from 'src/Interfaces/order';
import { AuthserviceService } from '../Auth/authservice.service';
@Injectable({
  providedIn: 'root'
})
export class OrderserviceService {
orderapi: string = 'http://0.0.0.0:3000/order/'
  constructor(private http: HttpClient) { }

getorderitems(): Observable<Orderapiresponse> {
  return this.http.get<Orderapiresponse>(this.orderapi, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
}
addorderitem(order: Orders): void{
   
  this.http.post<Orderapiresponse>(this.orderapi, order, {headers:  {Authorization: `Bearer ${localStorage.getItem('token')}`}}).subscribe((res: any) => {
    console.log(res);
  }
  )
}
  



}