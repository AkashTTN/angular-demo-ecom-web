import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';

import { Product, Checkout } from '../store/actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar,
    private store: Store<{ shop: { listings: { string: Product }, cartTotal: number } }>
  ) { }

  listingsInCart: Product[];
  cartTotal: number;

  ngOnInit(): void {

    this.store.select('shop').subscribe((storeData) => {
      this.cartTotal = storeData.cartTotal;
      this.listingsInCart = Object.values(storeData.listings).filter((listing) => +listing['quantityInCart'] > 0)
    });

  }

  onCheckout() {
    this.store.dispatch(new Checkout());
    this._snackBar.open('Checkout Success', 'Close');
  }

}
