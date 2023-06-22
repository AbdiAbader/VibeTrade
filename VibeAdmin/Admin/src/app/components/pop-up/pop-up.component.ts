import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ProductserviceService } from 'src/app/services/product/productservice.service';
import { ProductResponse, Product } from 'src/app/interfaces/Products/product.interface';





@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {
  productForm!: FormGroup;
  productlist : Product[] = [];

  constructor(private formBuilder: FormBuilder, private productservice: ProductserviceService) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required],
      quantity: [null, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      // Submit form
     this.productlist.push(this.productForm.value);
     this.productservice.addproduct(this.productForm.value).subscribe(
      (data) => {
      window.location.href = '';
      },
      (error) => {
        console.error('Error retrieving properties:', error);
      }
    );


      console.log(this.productForm.value);
    } else {
      // Handle form validation errors
    }
  }

}
