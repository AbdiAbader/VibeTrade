import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule }   from '@angular/forms';
import { AuthguardService } from './services/authguard.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { CartHomeComponent } from './components/Carts/cart-home/cart-home.component';
import { MycartsComponent } from './components/Carts/mycarts/mycarts.component';

import { MyAccountHomeComponent } from './components/My_account/my-account-home/my-account-home.component';

import {MatTabsModule} from '@angular/material/tabs';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';

import { MatDialogModule } from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ShopallComponent } from './components/shopall/shopall.component';
import {MatListModule} from '@angular/material/list';
import { Searched } from './layouts/header/header.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatBadgeModule} from '@angular/material/badge';
import { ContactusComponent } from './components/contactus/contactus.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ProgressComponent } from './components/progress/progress.component';
import { AlertComponent } from './components/alert/alert.component';
import { ReviewComponent } from './components/review/review.component';
import { RpopComponent } from './components/review/review.component';
import {MatChipsModule} from '@angular/material/chips';
import { NotificationComponent } from './components/notification/notification.component';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    RegisterComponent,
    CartHomeComponent,
    MycartsComponent,
    MyAccountHomeComponent,
    ShopallComponent,
    Searched,
    AboutusComponent,
    ContactusComponent,
    WishlistComponent,
    ProgressComponent,
    AlertComponent,
    ReviewComponent,
    RpopComponent,
    NotificationComponent

  

  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatSelectModule,
    MatTabsModule,

    MatTableModule,
    MatSortModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatRadioModule,
    MatSnackBarModule,
    MatListModule,
    FontAwesomeModule,
    MatBadgeModule,
    MatChipsModule
  

    

  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
