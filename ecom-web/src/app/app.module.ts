import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { ListingsComponent } from './home/listings/listings.component';
import { ListingComponent } from './home/listings/listing/listing.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { ListingDetailsComponent } from './home/listings/listing-details/listing-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { ShopReducer } from './store/reducers';
import { ShopEffects } from './store/effects';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    AuthComponent,
    HomeComponent,
    ListingsComponent,
    ListingComponent,
    CartItemComponent,
    ListingDetailsComponent,
    PageNotFoundComponent,
  ],
  imports: [
    StoreModule.forRoot({ shop: ShopReducer }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([ShopEffects]),
    HttpClientModule,
    MatCardModule,
    MatListModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
