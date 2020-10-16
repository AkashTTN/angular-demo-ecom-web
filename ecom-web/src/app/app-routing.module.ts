import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';

import { AuthComponent } from './auth/auth.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ListingDetailsComponent } from './home/listings/listing-details/listing-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/:id', component: ListingDetailsComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuardService] },
  { path: 'authenticate', component: AuthComponent, canActivate: [AuthGuardService] },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
