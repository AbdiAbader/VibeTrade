import { Component, OnInit } from '@angular/core';
import { ReviewserviceService } from 'src/app/services/review/reviewservice.service';
import { UserauthServiceService } from 'src/app/services/userauth-service.service';
import { Cart } from 'src/Interfaces/cart';
import { Product } from 'src/Interfaces/product';
import { CastserviceService } from 'src/app/services/cart/castservice.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormBuilder, FormControlName, Validators, FormGroup} from '@angular/forms';
import { ProductserviceService } from 'src/app/services/productservice.service';


@Component({
  selector: 'app-rpop',
  templateUrl: './rpop.component.html',
  styleUrls: ['./style.scss']
})
export class RpopComponent  implements OnInit{
 
  reviewform: FormGroup= new FormGroup(
     {reviewz : new FormControl(''),
    rating: new FormControl('')

  }
  )
 

  constructor (private snack: MatSnackBar,
    private reviewservice: ReviewserviceService, private frombuilder: FormBuilder,
    private cartservice: CastserviceService)
    {
      this.buildform();
    }
    ngOnInit(): void {  
      this.buildform();
    }
    buildform(){
      this.reviewform = this.frombuilder.group({
        reviewz: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
        rating: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]]
      })
    }
  addreview(){
    toolbar
    if (this.reviewform.invalid) {
      this.snackOpen("Please fill all the field");
    }
    else{
    
    const review = {
      content: this.reviewform.value.reviewz,
      rating: this.reviewform.value.rating,
      product: this.cartservice.getsinglecart()[0]._id,
      
    }
    this.reviewservice.addReview(review).subscribe((response: any) => {
      console.log(response);
      this.snackOpen("review Added Successfully Thanks for your review");
    
    }
    )

  }
}
  snackOpen(message: string){
    this.snack.open(message, 'close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }



}

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent  implements OnInit {
 reivew:any= []
 pordutinfo: any = [];
 showReplyForm = false;
 replyContent = '';
  constructor(private reviewservice: ReviewserviceService, private userservice: UserauthServiceService,
    private producrservice: ProductserviceService,
    private cart: CastserviceService,
    private dialog: MatDialog,
    private snack: MatSnackBar,) { 
    this.getReview();
    
  }
  ngOnInit(): void {
         this.producrservice.getProducts().subscribe((response: any) => {
           response.products.forEach((product: any) => {
              if (product._id == this.reviewservice.getreview()) {
                this.pordutinfo = product;
              }
            }
            )
          }
          )
        this.getReview();

    
  }
getReview(){
 const id: any = this.reviewservice.getreview();

  this.reviewservice.getReviews(id).subscribe((response: any) => {
    
    this.reivew = response.data;
  }
  )



}
addreview(){

 this.dialog.open(RpopComponent);
 this.dialog.afterAllClosed.subscribe((res: any) => {
    this.getReview();
  }
  )
}
submitReply()
{}
toggleReplyForm(reply: any)
{
  reply.showReplyForm = !reply.showReplyForm;
}

replycounter(){
  let count = 0;
  this.reivew.forEach((review: any) => {
    count += review.replies.length;
  }
  )
  return count;
}
toggleReplies(item: any) {
  item.showReplies = !item.showReplies;
}

likes(item: any) {
}
async updateLike(item: any) {


   await this.reviewservice.updatelike(item._id).subscribe((response: any) => {
    console.log(response);
    this.getReview();
  }
  )}

async updateDislike(item: any) {

  await this.reviewservice.updatedislike(item._id).subscribe((response: any) => {
    console.log(response);
    this.getReview();
  }
  )
}
like(){
 return this.reivew.likes.length;
}
dislike(){
  return this.reivew.dislikes.length;
}
submitreply(item: any){
  this.reviewservice.addReply(item._id, this.replyContent).subscribe((response: any) => {
    console.log(response);
    this.dialog.closeAll();
    this.getReview();
  }
  )
}

updatereplyLike(item: any, reply: any){
  this.reviewservice.replylike(item._id, reply._id).subscribe((response: any) => {
    console.log(response);
    this.getReview();
  }
  )

}
updatereplydisLike(item: any, reply: any){
  this.reviewservice.replydislike(item._id, reply._id).subscribe((response: any) => {
    console.log(response);
    this.getReview();
  }
  )

}

totalstar(){
  let total = 0;
  this.reivew.forEach((review: any) => {
    total += review.rating;
  }
  )
  return total/this.reivew.length;
}

}
