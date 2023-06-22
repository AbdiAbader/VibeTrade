import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import{UsersComponent} from './components/users/users.component';
import { ChartComponent } from './components/chart/chart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { UserRequestComponent } from './components/user-request/user-request.component';


const routes: Routes = [
  {path: '', component: ChartComponent},
  {path: 'Home', component: HomeComponent},
  {path: 'Users', component: UsersComponent},
  {path: 'Order', component: OrdersComponent},
  {path: 'request', component: UserRequestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
