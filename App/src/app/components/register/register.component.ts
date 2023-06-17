import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ProgressComponent } from '../progress/progress.component';
import { FormGroupDirective, NgForm } from '@angular/forms';
import { UserauthServiceService } from '../../services/userauth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { HomeComponent } from '../home/home.component';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']

})
export class RegisterComponent implements  OnInit{
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
  cartForm: FormGroup = new FormGroup({
    name: new FormControl(),
    password: new FormControl()
    });
    loginForm: FormGroup = new FormGroup({
      password: new FormControl(),
    });

  constructor(private formBuilder: FormBuilder, private userservice: UserauthServiceService, private router: Router,
    private dialog: MatDialog, private location: Location,
    private change: ChangeDetectorRef) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    
    this.cartForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
  
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.loginForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
   
  }
 onSubmit() {
  const userdata = {
    name: this.cartForm.value.name,
    password: this.cartForm.value.password,
    email: this.emailFormControl.value || 'iuihi',
    shippingAddress: ''


    }
    this.userservice.signupUser(userdata).subscribe(
      response => console.log('Success!', response),
      error => console.error('Error!', error)
    );

  }

  async onsingin() {
    const userdatalogin = {
      email: this.emailFormControl.value || 'aaaa',
      password: this.loginForm.value.password
    }

    try {
      
     await this.userservice.longinUser(userdatalogin);
     if (await this.userservice.isAuthenticated){
      this.change.detectChanges();
      this.router.navigate(['']);
     }
   
    } catch (error) {
      console.error(error);
    }
  }
}
