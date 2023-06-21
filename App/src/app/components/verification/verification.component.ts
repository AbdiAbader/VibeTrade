import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserauthServiceService } from 'src/app/services/userauth-service.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  constructor(private snack: MatSnackBar,
    private route: ActivatedRoute,
    private userservice: UserauthServiceService) { }
    email: string = '';
  pin = 0;
  

  verify(){
    

   if (this.pin < 99)
   {
   this.snackbaropen('invalid pin');
   }
      
   
   if (this.email === '' || !this.validemail(this.email)) {
    this.snackbaropen('invalid email');
  }
this.userservice.verify(this.email, this.pin)


  
}
  snackbaropen(msg: string) {
    this.snack.open(msg, 'close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
  ngOnInit(): void {
 
  }
validemail(email: string){
  const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  return regex.test(email);
}
}
