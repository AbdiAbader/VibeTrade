import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthserviceService } from './Auth/authservice.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {
 condition = false;
  constructor(private authService: AuthserviceService, private router: Router,
    private snackbar: MatSnackBar ) {}

 canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.authguard();
   

  }
  snackbaropen(message: string) {
    this.snackbar.open(message, 'close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });

  }
  async authguard() {

    console.log(this.condition + 'authService'); 
   this.condition =  await this.authService.isAuthenticated()
   await this.authService.checkTokenExpiration().subscribe(isValid => {
    this.condition = isValid;
    console.log(isValid)
    console.log(this.condition+ 'authguard');  
    if (this.condition === true) {
      console.log(this.condition + 'after if');
      console.log('Access granted. User is authenticated.');
      return true;
    }
    this.snackbaropen('Please Login to continue');
    console.log('Access denied. User is not authenticated.');
    return this.router.createUrlTree(['/register']);
  
      
  
  }
  );


  return this.condition;

}

}




