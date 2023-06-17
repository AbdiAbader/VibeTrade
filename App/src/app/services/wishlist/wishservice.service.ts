import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishserviceService {
   WishlistItems: any[] = [];
  constructor(private http: HttpClient) {
    this.getWishlist().subscribe((response: any) => {
      this.WishlistItems = response.data;
    }
    );
   }
 
  getWishlist() {
    return this.http.get('http://localhost:3000/wishlist', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
  }
  addWishlist(id: string) {
    console.log(localStorage.getItem('token'))
    
    return this.http.post('http://localhost:3000/wishlist/'+id, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
  }
  deleteWishlist(id: string) {
    return this.http.delete('http://localhost:3000/wishlist/'+id, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
  }

}
