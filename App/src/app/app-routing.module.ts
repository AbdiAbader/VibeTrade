import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartHomeComponent } from './components/Carts/cart-home/cart-home.component';
import{ AuthguardService } from './services/authguard.service';
import { RegisterComponent } from './components/register/register.component';
import { MycartsComponent } from './components/Carts/mycarts/mycarts.component';
import { MyAccountHomeComponent } from './components/My_account/my-account-home/my-account-home.component';
import { ShopallComponent } from './components/shopall/shopall.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ReviewComponent } from './components/review/review.component';
import { OrderConfirmComponent } from './components/Carts/order-confirm/order-confirm.component';
import { VerificationComponent} from './components/verification/verification.component';
const routes: Routes = [
  { path: '', component: HomeComponent }
,
  { path: 'register', component: RegisterComponent},
  {path: 'cart', component: CartHomeComponent, canActivate: [AuthguardService]},
  {path: 'myaccount', component: MyAccountHomeComponent, canActivate: [AuthguardService]},
  {path: 'shopall', component: ShopallComponent},
  {path: 'aboutus', component: AboutusComponent},
  {path: 'contactus', component: ContactusComponent},
  {path: 'wishlist', component: WishlistComponent, canActivate: [AuthguardService]},
  {path: 'review', component: ReviewComponent, canActivate: [AuthguardService]},
  {path: 'orderconfirm', component: OrderConfirmComponent, canActivate: [AuthguardService]},
  {path: 'verify', component:  VerificationComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthguardService
  ]
})
export class AppRoutingModule { }
