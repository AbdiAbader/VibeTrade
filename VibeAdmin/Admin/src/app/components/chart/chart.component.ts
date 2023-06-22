import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { ViewDimensions, ColorHelper } from '@swimlane/ngx-charts';
import { User } from 'src/app/interfaces/Users/user.interface';
import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  customcolorScheme: any
  data: any[]; // Define the data property
  @ViewChild ('paginator') paginator!: MatPaginatorModule;
  
  chartData: { name: string; value: number }[] = [];
  chartData2: { name: string; value: number }[] = [];
  chartData3: { name: string; value: number }[] = [];
  chartData4: { name: string; value: number }[] = [];
  combined: any[] = [];
  view!: ViewDimensions;
  isSidebarVisible = true;
  cardColor: string = '#232837';

  

  

  constructor(private dataservice: DataService) { 
    this.customcolorScheme= {
      domain: ['#ffffff'],
    };
    this.data = []

    
   
  }
  ngOnInit(): void {
    this.dataservice.getusers().subscribe(
      (data) => {
        this.chartData = [
            { name: 'Users', value: data.users.length},
          ];
        })

      this.dataservice.getproducts().subscribe(
        (data) => {
          this.chartData2 = [
            { name: 'Products', value: data.products.length},
          ];
        }
      )
      this.dataservice.getorders().subscribe(
        (data) => {
          this.chartData3 = [
            { name: 'Orders', value: data.orders.length},
          ];
        })
        this.dataservice.getrequests().subscribe(
          (data) => {
            this.chartData4 = [
              { name: 'Requests', value: data.requests.length},
            ];
          }
        )



    }
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
}



    
}