import { Injectable } from '@angular/core';
import { Product, ProductResponse } from 'src/app/interfaces/Products/product.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {
 proid: any = [];
  private apiUrl = 'http://localhost:3000/product';

  constructor(private http: HttpClient) { }

  getproducts(): Observable<ProductResponse> {
    
    return this.http.get<ProductResponse>(this.apiUrl);
    }
  updateproduct(productId: string, product: Product): Observable<ProductResponse> {
    const url = `${this.apiUrl}/${productId}`; 
    return this.http.put<ProductResponse>(url, product)
  }
  deleteproduct(productId: string): Observable<ProductResponse> {
    console.log(productId);
    const url = `${this.apiUrl}/${productId}`; 
    return this.http.delete<ProductResponse>(url)
  }


  addproduct(product: Product): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(this.apiUrl, product);
  }
  setid(id: string) {
    this.proid = [];
    this.proid.push(id);
    
}
getid() {
    return this.proid;
}
}