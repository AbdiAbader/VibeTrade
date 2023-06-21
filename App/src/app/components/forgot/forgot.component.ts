import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserauthServiceService } from 'src/app/services/userauth-service.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent {
  show = false;
  email = '';
  code:any;
  password1 = '';
  password2 = '';

  constructor(private snackbar: MatSnackBar,
    private userservice: UserauthServiceService) { }
  getcode(){
    const emailreg = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
    if (emailreg.test(this.email)){
    

    this.userservice.getcode(this.email).subscribe((res: any) => {
      if (res.status === 'success'){
        this.show = true;

      }},
      (err: any) => {
        this.snackbaropen('Email not found');
      }
    );


    }
    else{ 
      this.snackbaropen('Invalid email');
    }

  }
changepassword(){
   if (this.validate())
   {
    this.userservice.resetpass(this.email, this.code, this.password1)

   
   }
  


}
validate(){
  const emailreg = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
  if (this.email && this.code && this.password1 && this.password2){
    if (emailreg.test(this.email) === false){
      this.snackbaropen('Invalid email');
      return false;
    }
    if (this.password1.length < 8){
      this.snackbaropen('Password must be atleast 8 characters');
      return false;
    }
    if (this.password1 !== this.password2){
      this.snackbaropen('Password does not match');
      return false;
    }
    if (this.code < 99){
      this.snackbaropen('Invalid code');
      return false;
    }
    return true;
    
  }
  this.snackbaropen('All fields are required and must be valid');
    return false;
  
}


snackbaropen(msg: string){
  this.snackbar.open(msg, 'close', {
    duration: 3000,
    verticalPosition: 'top',
    horizontalPosition: 'center'
  });
}
  
}