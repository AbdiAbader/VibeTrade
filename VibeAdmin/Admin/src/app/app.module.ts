import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { PopdelComponent } from './components/popdel/popdel.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { UsersComponent } from './components/users/users.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { UserdelComponent } from './components/userdel/userdel.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartComponent } from './components/chart/chart.component';
import { OrdersComponent } from './components/orders/orders.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { UserRequestComponent } from './components/user-request/user-request.component';

import { NgxWebstorageModule } from 'ngx-webstorage';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PopUpComponent,
    PopdelComponent,
    UsersComponent,
    UserdelComponent,
    ChartComponent,
    OrdersComponent,
    UserRequestComponent,
   

 


   
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    NgxChartsModule,
    MatSnackBarModule,
    NgxWebstorageModule.forRoot(),
   

    
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
