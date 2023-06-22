import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { User } from 'src/app/interfaces/Users/user.interface';
import { UserserviceService } from 'src/app/services/user/userservice.service';

@Component({
  selector: 'app-userdel',
  templateUrl: './userdel.component.html',
  styleUrls: ['./userdel.component.scss']
})
export class UserdelComponent implements OnInit {
  userlist : any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userservice: UserserviceService) { 
    this.userlist = this.data
  }

  ngOnInit(): void {
    this.userlist = this.data
    console.log(this.userlist)
  }

  deleteuser(){
    console.log(this.data)
    this.userservice.deleteuser(this.userlist).subscribe(
      (data) => {
        // window.location.href = '/Users';
      },
      (error: any) => {
        console.error('Error retrieving properties:', error);
      }

    );
  }

}