import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatDialog } from '@angular/material/dialog';
import { ContactusserviceService } from 'src/app/services/contactus/contactusservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit{
 emailRegex: any = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

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
    email: ['', [Validators.required, this.emailValidator ]],
    message: ['', [Validators.required]]
   
  });
}
emailValidator = (control: FormControl) => {
  const value = control.value;
  if (!value || !this.emailRegex.test(value)) {
    return {
      email: {
        required: true,
        pattern: this.emailRegex,
      },
      
    };
  }

  return null;
};

async contactus(){
  if (this.contactusForm.invalid) {
    if (this.contactusForm.controls['name'].invalid || this.contactusForm.controls['message'].invalid) {

    this.snackbar('Please fill all the fields Correctly');
    return;
  }
  else{
    this.snackbar('Please Enter a valid Email');
    return;
  }
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