import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthserviceService } from 'src/app/services/Auth/authservice.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
   constructor(private snackbar: MatSnackBar, 
    private authservice: AuthserviceService,
    private router: Router,
    private dialog: MatDialog){}
   closeDialog(res : boolean){
     if (res) {
      this.authservice.logout();
      this.snackbar.open('Logged out successfully', 'close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      window.location.href = '';
    

     }
     else{
      this.dialog.closeAll();
     }
     
   }
}
