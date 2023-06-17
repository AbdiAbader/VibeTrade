import { Component, OnInit } from '@angular/core';
import { ReviewserviceService } from 'src/app/services/review/reviewservice.service';
import { UserauthServiceService } from 'src/app/services/userauth-service.service';
import { Cart } from 'src/Interfaces/cart';
import { Product } from 'src/Interfaces/product';
import { CastserviceService } from 'src/app/services/cart/castservice.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormBuilder, FormControlName, Validators, FormGroup} from '@angular/forms';


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
 pordutinfo: Product[] = [];
 showReplyForm = false;
 replyContent = '';
  constructor(private reviewservice: ReviewserviceService, private userservice: UserauthServiceService,
    private cart: CastserviceService,
    private dialog: MatDialog,
    private snack: MatSnackBar,) { 
    this.getReview();
    this.pordutinfo = this.cart.getsinglecart();
    console.log(this.pordutinfo);

  }
  ngOnInit(): void {
    this.pordutinfo = this.cart.getsinglecart();
    
  }
getReview(){
 const id = this.cart.getsinglecart()[0]._id;
  this.reviewservice.getReviews(id).subscribe((response: any) => {
    console.log(response);
    this.reivew = response.data;
  }
  )



}
addreview(){

 this.dialog.open(RpopComponent);
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
updateLike(item: any) {

  
    this.reviewservice.updatelike(item._id).subscribe((response: any) => {
    console.log(response);
    this.getReview();
  }
  )}

updateDislike(item: any) {

  this.reviewservice.updatedislike(item._id).subscribe((response: any) => {
    console.log(response);
    this.getReview();
  }
  )
}
like(x=0){
 return this.reivew.likes.length;
}
dislike(){
  return this.reivew.dislikes.length;
}
submitreply(item: any){
  this.reviewservice.addReply(item._id, this.replyContent).subscribe((response: any) => {
    console.log(response);
    this.getReview();
  }
  )
}
submitreplyreply(reply: any){
  this.reviewservice.addReplyofReply(reply._id, this.replyContent).subscribe((response: any) => {
    console.log(response);
    this.getReview();
  }
  )
}


}


