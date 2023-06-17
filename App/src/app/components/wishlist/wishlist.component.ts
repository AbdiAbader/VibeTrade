import { Component } from '@angular/core';
import { WishserviceService } from 'src/app/services/wishlist/wishservice.service';
import { AuthserviceService } from 'src/app/services/Auth/authservice.service';
import { Product } from 'src/Interfaces/product';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {
  wishlistItems: Product[] = [];
  constructor(private wishservice: WishserviceService, private authservice: AuthserviceService) { 
    console.log(this.authservice.getToken());
  }

  ngOnInit(): void {
    this.getWishlist();
    
  }

  getWishlist() {
    this.wishservice.getWishlist().subscribe((response: any) => {
      console.log(response);
      this.wishlistItems = response.data;
    },
      (error) => console.log(error)
    );
  }
  removeFromWishlist(id: string) {
    console.log(id);  
    this.wishservice.deleteWishlist(id).subscribe((response: any) => {
      console.log(response);
      this.getWishlist();
    }
    )


  }
  changes(): Product[] {
    return this.wishlistItems;
  }

}
