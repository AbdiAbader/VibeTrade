import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './user.interface';
import { login } from './user.interface';
import { AuthserviceService } from './Auth/authservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';




@Injectable({
  providedIn: 'root'
})

export class UserauthServiceService {
  public isAuthenticated = false;

 ApiUrl = 'http://localhost:3000/user/';



      constructor(private http: HttpClient, private router: Router, private authService: AuthserviceService,
        private snackbar: MatSnackBar) {

       }
 signupUser(user: User): Observable<User> {
  return this.http.post<User>(this.ApiUrl, user);
 

}
 longinUser(user: login): void{
this.http.post(this.ApiUrl+'login', user).subscribe(
  (response: any) => {
   
      if (response.message) {
        
        this.handleSuccessfulLogin(response);
      } else {
        this.snackbaropen('Login failed');
        this.handleLoginError();
      }
    },
    (error: any) => {
      this.snackbaropen('Login failed');
      this.handleLoginError();
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

private handleLoginError(): void {
 this.snackbaropen('Login failed');
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
    duration: 3000,
    verticalPosition: 'top',
    horizontalPosition: 'center'
  });
}


}
