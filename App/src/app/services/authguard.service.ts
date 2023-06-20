import { Injectable } from '@angular/core';
import {  Router, UrlTree } from '@angular/router';
import { AuthserviceService } from './Auth/authservice.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {
 condition = false;


  constructor(private authService: AuthserviceService, private router: Router,
    private snackbar: MatSnackBar ) {}

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.isAuthenticated()) {
        console.log('Access granted. User is authenticated.');
        return this.authService.checkTokenExpiration().pipe( map(isValid => {
            if (isValid) {
              console.log('Token is valid');
              return true;
            } else {
              this.snackbaropen('Please Login to continue');
              console.log('Access denied. User is not authenticated.');
              window.location.href = '/register';
              return this.router.createUrlTree(['/register']);
            }
          })
        );
      }
    
      this.snackbaropen('Please Login to continue');
      console.log('Access denied. User is not authenticated.');
      return this.router.createUrlTree(['/register']);
    }
    

  
  snackbaropen(message: string) {
    this.snackbar.open(message, 'close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });

  }
 
}




