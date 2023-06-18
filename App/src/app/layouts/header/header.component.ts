import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { ProductserviceService } from 'src/app/services/productservice.service';
import { Productapiresponse } from 'src/Interfaces/product';
import { Product } from 'src/Interfaces/product';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CastserviceService } from 'src/app/services/cart/castservice.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthguardService } from 'src/app/services/authguard.service';
import { AuthserviceService } from 'src/app/services/Auth/authservice.service';
import { UserauthServiceService } from 'src/app/services/userauth-service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { WishserviceService } from 'src/app/services/wishlist/wishservice.service';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { NotificationComponent } from 'src/app/components/notification/notification.component';
import { NotifyserviceService } from 'src/app/services/notify/notifyservice.service';

@Component({
  selector: 'app-serached',
  templateUrl: './searched.html',
  styleUrls: ['./styles.scss'],

  
})
export class Searched implements OnInit{
  selectedvalue: number = 1;
  singleproduct: Product[] = [];
  expired: boolean = false;
  count = 0;  

  constructor(private dialogRef: MatDialogRef<Searched>, private singlecart: CastserviceService,
    private authguard: AuthserviceService, private snack: MatSnackBar,
    private wishservice: WishserviceService,
    private router: Router,
    private cartservice: CastserviceService,
   ) {}

  close(): void {
    this.dialogRef.close();
    
  }
ngOnInit(): void {
 
  this.singleproduct = this.singlecart.getsinglecart();
  this.authguard.checkTokenExpiration().subscribe(isValid => {
    this.expired = !isValid;
  
  }
  )
}
addtocart(product: any, selectedvalue: number){
  if (this.authguard.isAuthenticated() && !this.expired)
{
  this.singlecart.addtocart(product, selectedvalue);
  this.snackOpen('Added to cart');
  
}
else{
  this.snackOpen('Please login to add to cart');
  
} 
}
addtowishlist(product: any){
  if (this.authguard.isAuthenticated() && !this.expired)
{
  if (this.wishservice.WishlistItems.findIndex((item: any) => item._id === product) === -1)
  {


  this.wishservice.addWishlist(product).subscribe((response: any) => {
    if (response.status === 'success'){
      this.snackOpen('Added to wishlist');
    }
  })
  }
  else{
    this.snackOpen('Already in wishlist');
  }
    

}
}
  snackOpen(message: string) {
    this.snack.open(message, 'close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }






  review(product: any){
    this.cartservice.singlecart(product);
    this.router.navigate(['/review']);
    this.dialogRef.close();

  }
    


  
 
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  cartitems = 0;
  search: string = '';
  productlist: Product[] = [];
  searched: Product[] = [];
  name: string = '';
  isLoggedin: boolean = false;
   count = 0;
  constructor(private productservice: ProductserviceService, private cartservice: CastserviceService, 
    private dialog: MatDialog, private snackbar: MatSnackBar,  private userservice: UserauthServiceService,
   
    private authservice: AuthserviceService, private router: Router,
    private dialogref: MatDialog,
   private notification: NotifyserviceService,
   private route: ActivatedRoute,
   ) { 
      this.userservice.getuserbyid().subscribe((response: any) => {
        this.name = response.data.name;
      })
     this.loggedin();
     this.isloggedin();
     console.log(this.authservice.getToken());

  
  
  }
  ngOnInit(): void {
    this.getProducts();
    console.log(this.authservice.getToken());
    this.loggedin();
    this.isloggedin();
    this.notification.getNotification().subscribe((response: any) => {
      console.log(response);
      this.count = response.data.filter((item: any) => item.read === false).length;
    }
    )
  

    
  }

  
  getProducts() {
    this.productservice.getProducts().subscribe(
      (response: Productapiresponse) => {
        console.log(response);
        this.productlist = response.products;

      },
      (error)  => console.log(error) 
    );
    
  }
  searchproduct(search: string){
    this.search = search;
    if(this.search === ''){
      this.searched = [];
      
    }
    else{
      this.searched = this.productlist.filter((product) => product.name.toLowerCase().startsWith(this.search.toLowerCase()));
     
      

    }
}

searchedpro(product: any): void {
  this.dialog.open(Searched);

  
  
  this.cartservice.singlecart(product);
 
}
counter(){
  return this.cartservice.counter();
}
logout(){
  this.dialogref.open(AlertComponent)
  this.dialogref.afterAllClosed.subscribe(() => {
    console.log('closed');
    this.loggedin();
    this.isloggedin();
    this.router.navigate(['']);
  })
  
}
 async loggedin(){
 
  this.isLoggedin = await this.authservice.isAuthenticated();
   await this.authservice.checkTokenExpiration().subscribe(isValid => {
    this.isLoggedin = isValid;
   })


}
 isloggedin(){

  return this.isLoggedin;
}


notify(){
  this.dialog.open(NotificationComponent);
  this.dialog.afterAllClosed.subscribe(() => {
    this.notification.getNotification().subscribe((response: any) => {
      console.log(response);
      this.count = response.data.filter((item: any) => item.read === false).length;
    }
    )
  }
  )
 

}
}
