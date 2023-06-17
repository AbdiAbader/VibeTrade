import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Productapiresponse} from 'src/Interfaces/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {
  ApiUrl = 'http://localhost:3000/product/';

  constructor(private http: HttpClient) { }
  getProducts(): Observable<Productapiresponse> {
    return this.http.get<Productapiresponse>(this.ApiUrl);
  }
 

   
}
