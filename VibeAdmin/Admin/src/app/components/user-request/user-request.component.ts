import { Component, OnInit, ViewChild } from '@angular/core';
import { UserRequest, RequestResponse } from 'src/app/interfaces/Users/userRequest.inerface';
import { DataService } from 'src/app/services/data/data.service';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.scss']
})
export class UserRequestComponent implements OnInit {

  
  isSidebarVisible = true;
  request: UserRequest[] = [];
  dataSource: any;
  currentPage = 1;
  itemsPerPage = 9;
  totalPages!: number;
  pages: number[] = [];
  isChecked!: boolean;


 
  
    constructor(private dataservice: DataService, private localStorageService: LocalStorageService) { }
  
    ngOnInit(): void {

     
      this.isChecked = this.localStorageService.retrieve('isChecked');
      this.getUserRequests();
     
  

    }

    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    }

    getUserRequests() {
      this.dataservice.getrequests().subscribe(
        (data) => {
          console.log(data);
          this.request = data.requests;
          console.log(this.request.length);
          this.totalPages = Math.ceil(this.request.length / this.itemsPerPage);
          this.updatePages();
         
        },
        (error) => {
          console.error('Error retrieving user requests:', error);
        }
      );
    }

    updatePages() { 
      this.pages = Array(this.totalPages)
    .fill(0)
    .map((x, i) => i + 1);

    }

    changePage(page: number) {
      this.currentPage = page;
    }
    
    get paginatedUserRequests(): UserRequest[] {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.request.slice(startIndex, endIndex);

    }


    
    onCheckboxChange(event: any, userRequest: any) {
      const checked = event.target.checked;
      userRequest.checked = checked;
      this.localStorageService.store('userRequests', this.request);
    }
}
