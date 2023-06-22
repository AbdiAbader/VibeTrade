import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Orders, Orderapiresponse } from 'src/Interfaces/order';
import { Router } from '@angular/router';
import { AuthserviceService } from '../Auth/authservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class OrderserviceService {
orderapi: string = 'http://0.0.0.0:3000/order/'
  constructor(private http: HttpClient, private snack: MatSnackBar, private router: Router) { }

getorderitems(): Observable<Orderapiresponse> {
  return this.http.get<Orderapiresponse>(this.orderapi, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
}
addorderitem(order: any): Observable<Response>{
   
 return this.http.post<Response>(this.orderapi, order, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
  
  
}
deleteorder(id: number): void{
  this.http.delete(this.orderapi + id, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}).subscribe((res: any) => {
   if(res.status == 'Success'){
     this.snack.open('Order deleted', 'close', {duration: 2000});
    
    


    
   }
   else{
      this.snack.open('Server Error ', 'close', {duration: 2000});
    }
  }
  )
}


}