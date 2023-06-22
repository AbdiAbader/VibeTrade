import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './user.interface';
import { login } from './user.interface';
import { AuthserviceService } from './Auth/authservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ProgressService } from './progress/progress.service';




@Injectable({
  providedIn: 'root'
})

export class UserauthServiceService {
  public isAuthenticated = false;

 ApiUrl = 'http://localhost:3000/user/';



      constructor(private http: HttpClient, private router: Router, private authService: AuthserviceService,
        private snackbar: MatSnackBar,
        private progress: ProgressService) { }

       
 signupUser(user: User): void {
 this.progress.setProgress(true);
  this.http.post(this.ApiUrl, user).subscribe(
    (response: any) => {
      if (response.status === 'Success') {
        this.snackbaropen('Signup successfully please verify your email');
        this.router.navigate(['/verify'],{
          queryParams: {
            email: user.email}
        });
        this.progress.setProgress(false);
      }
    },
    (error: any) => {
      this.snackbaropen("Email already exists");
    }
  );
 

}
 longinUser(user: login): void{

this.http.post(this.ApiUrl+'login', user).subscribe(
  (response: any) => {
    console.log(response);
      if (response.message) {
     
        this.handleSuccessfulLogin(response);
      } else {
      
        this.handleLoginError('Failed');
      }
    },
    (error: any) => {
      
      this.handleLoginError(error.statusText);
    }
  );
}

private handleSuccessfulLogin(response: any): void {
  this.snackbaropen('Login successful');
 
  this.isAuthenticated = true;
  console.log('Login successful');
  this.authService.login(response.token);
  
 window.location.href = '';
  



}

private handleLoginError(str: string): void {
  if (str === 'Forbidden') {
    this.snackbaropen('Verify your account first');
    this.router.navigate(['/verify']);
  }
  else if (str === 'Not Found') {
    this.snackbaropen('Email not found');
  }
  else{
 this.snackbaropen('Invalid password');
  }
  this.isAuthenticated = false;
  }



getIsAuthenticated() {
  return this.isAuthenticated;
}
getuserbyid(): Observable<User> {
  return this.http.get<User>(`${this.ApiUrl}`,{headers: {Authorization: `Bearer ${this.authService.getToken()}`}});
}
updateuser(userinfo: {}): Observable<User> {
  return this.http.put<User>(`${this.ApiUrl}`, userinfo, {headers: {Authorization: `Bearer ${this.authService.getToken()}`}});
}

snackbaropen(message: string) {
  this.snackbar.open(message, 'close', {
    duration: 3500,
    verticalPosition: 'top',
    horizontalPosition: 'center'
  });
}

verify(email: string, pin: number)
{
  this.http.post(this.ApiUrl+'verifypin', {email: email, pin: pin},{headers: {Authorization: `Bearer ${this.authService.getToken()}`}}).subscribe(
    (response: any) => {
      if (response.status === 'success') {
        this.snackbaropen('Verification successfull Please Login');
        this.router.navigate(['/register']);

      }
      else{
        this.snackbaropen('Verification failed');
      }
    }
  );
}

getcode(email: string): Observable<Response>
{
  return this.http.post<Response>(this.ApiUrl+'getcode', {email: email})
  }
  resetpass(email: string, pin: number, password: string){
    this.http.post(this.ApiUrl+'resetpassword', {email: email, pin: pin, password: password}).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.snackbaropen('Password reset successfully');
          this.router.navigate(['/register']);
        }
   
      },
      (error) =>{
        this.snackbaropen('Password reset failed');
      }

    );
  }
paydemo(total: number): Observable<Response>
{
  console.log(total);
  
return this.http.post<Response>('http://0.0.0.0:3000/user/paydemo', {"total": total},{headers: {Authorization: `Bearer ${this.authService.getToken()}`}});
}
}