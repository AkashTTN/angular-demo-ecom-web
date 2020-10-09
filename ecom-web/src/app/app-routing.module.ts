import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'authenticate', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
