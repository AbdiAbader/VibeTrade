import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Searched } from 'src/app/layouts/header/header.component';
import { ContactusserviceService } from 'src/app/services/contactus/contactusservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { async } from 'rxjs';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit{

  contactusForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    message: new FormControl('')
  });

constructor(private _snackbar: MatSnackBar, private dialog: MatDialog,
  private contactusservice: ContactusserviceService,private formBuilder: FormBuilder){



}
ngOnInit(): void {
  this.buildForm();
}
buildForm() {
  this.contactusForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.minLength(3)]],
    message: ['', [Validators.required]]
   
  });
}
async contactus(){
  if (this.contactusForm.invalid) {
    this.snackbar('Please fill all the fields');
    return;
  }

  
const data = {
   name : this.contactusForm.value.name,
    email : this.contactusForm.value.email,
    message : this.contactusForm.value.message

}
 try {
    await this.contactusservice.addContactUs(data);
    this.snackbar('Message sent successfully');
 }
  catch(error){
    this.snackbar("Failed to send message");
  }

}

snackbar(msg: string ){
  this._snackbar.open(msg, 'close', {
    duration: 5000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
  });

}

}