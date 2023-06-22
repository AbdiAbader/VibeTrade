import { AfterViewInit, Component , OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule, MatTableDataSourcePaginator} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { User } from 'src/app/interfaces/Users/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { PopdelComponent } from '../popdel/popdel.component';
import {MatButtonModule} from '@angular/material/button';
import { UserserviceService } from 'src/app/services/user/userservice.service';
import { UserResponse } from 'src/app/interfaces/Users/user.interface';
import { MatPaginator,MatPaginatorModule } from '@angular/material/paginator';
import { UserdelComponent } from '../userdel/userdel.component';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  isChanged: boolean = false;
  isSidebarVisible = true;
  displayedColumns: string[] = ['position', 'name', 'symbol', 'delete'];
  dataSource : any;
  userlist : User[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;


 

  constructor(private userservice: UserserviceService, public dialog: MatDialog, private _snackBar: MatSnackBar) { 
    this.getusers();
   
    
    }

ngOnInit(): void {
  this.getusers();



}
  getusers() {
    this.userservice.getusers().subscribe(
      (data) => {
        // Assign the data to the data source for the table to render
        this.userlist = data.users;
        this.dataSource = new MatTableDataSource(this.userlist);
        this.dataSource.paginator = this.paginator;
        console.log(this.userlist);
      },
      (error) => {
        console.error('Error retrieving properties:', error);
      }
    );
  }


    
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    update(name: string){
      console.log(name);
    }

    

    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
}

openDialog(user: User) {
  const dialogRef = this.dialog.open(UserdelComponent, {
    data: user._id
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
    setTimeout(() => {
      this.getusers();
    }
    , 2000);

  });
}

updateuser(user: User) {
  console.log(user._id);
  this.userservice.updateuser(user._id, user).subscribe(
    (data) => {
      console.log(data);
      this.getusers();
    },
    (error) => {
      console.error('Error retrieving properties:', error);
      this.getusers();
    }
  );
  this.isChanged = false;
  this._snackBar.open('User Updated', 'Close', {
    duration: 2000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
  });

}

isChangedFunc() {
  this.isChanged = true;
}


}

