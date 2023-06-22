import { Component , OnInit, ViewChild} from '@angular/core';
import { ProductserviceService } from 'src/app/services/product/productservice.service';
import { ProductResponse, Product } from 'src/app/interfaces/Products/product.interface';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { User } from 'src/app/interfaces/Users/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { PopdelComponent } from '../popdel/popdel.component';
import {MatButtonModule} from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isChanged: boolean = false;
  isSidebarVisible = true;
  Element: Product[] = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'delete'];
  dataSource : any;
  productlist : Product[] = [];
  userlist : User[] = [];
  name : string = '';
  price : number = 0;
  quantity : number = 0;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
 

  constructor(private productservice: ProductserviceService, public dialog: MatDialog, private _snackBar: MatSnackBar) { 
    this.getproducts();
   
    
    }

ngOnInit(): void {
  this.getproducts();



}
  getproducts() {
    this.productservice.getproducts().subscribe(
      (data) => {
        // Assign the data to the data source for the table to render
        this.productlist = data.products;
        this.dataSource = new MatTableDataSource(this.productlist);
        console.log(this.productlist);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error retrieving properties:', error);
      }
    );
  }


    
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    update(name: string){
      console.log(name);
    }

    

    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
}

updateProduct(product: Product) {

this.name = product.name;
this.price = product.price;
this.quantity = product.quantity;
  

  // update the product
  const productToUpdate = {
    _id: product._id,
    name: this.name,
    price: this.price,
    quantity: this.quantity,
  };

  if (!productToUpdate._id) {
    console.error('Product not found:', product);
    return;
  } else {
    console.log('Product to update:', productToUpdate);
    console.log(productToUpdate._id);
  }

 
  this.productservice.updateproduct( productToUpdate._id, product).subscribe(
    (data) => {
      this.getproducts();
      console.log('Product updated:', data);
    },
    (error) => {
      // Handle the error response
      console.error('Error updating product:', error);
    }
  );
  this.isChanged = false;
  this._snackBar.open('Product Updated', 'Close', {
    duration: 2000,
    horizontalPosition: 'center',
    verticalPosition: 'top',

  });
}

deleteProduct(product: Product) {
  // delete the product
  const productToDelete = {
    _id: product._id,
    name: product.name,
    price: product.price,
    quantity: product.quantity,
  };

  if (!productToDelete._id) {
    console.error('Product not found:', product);
    return;
  } else {
    console.log('Product to delete:', productToDelete);
    console.log(productToDelete._id);
  }

  this.productservice.deleteproduct(productToDelete._id).subscribe(
    (data) => {
      this.getproducts();
      console.log('Product deleted:', data);
    },
    (error) => {
      // Handle the error response
      console.error('Error deleting product:', error);
    }
  );
}

add() {
  this.dialog.open(PopUpComponent);
}
delete(product: any) {
  this.productservice.setid(product._id);
  this.dialog.open(PopdelComponent , {data: {type: 'product'}}
  )
  .afterClosed().subscribe(result => {
    this.getproducts();
  });
}

isChangedFunc() {
  this.isChanged = true;
}
}