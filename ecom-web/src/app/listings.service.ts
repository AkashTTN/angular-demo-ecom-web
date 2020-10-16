import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

export interface ListingData {
  title: string;
  data: string;
  id: string;
  quantityInCart: number;
  price: string;
}

@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  listings = [
    { id: '1', price: '20', title: 'Listing One', data: 'Listing Data', quantityInCart: 0 },
    { id: '2', price: '30', title: 'Listing Two', data: 'Listing Data', quantityInCart: 0 },
    { id: '3', price: '40', title: 'Listing Three', data: 'Listing Data', quantityInCart: 0 },
    { id: '4', price: '50', title: 'Listing Four', data: 'Listing Data', quantityInCart: 0 },
    { id: '5', price: '60', title: 'Listing Five', data: 'Listing Data', quantityInCart: 0 },
  ];
  listingsInCart = new BehaviorSubject<string[]>([]);

  constructor(private _snackBar: MatSnackBar) { }

  emptyCart() {
    this.listings.forEach((listing) => {
      if (this.listingsInCart.value.includes(listing.id)) {
        listing.quantityInCart = 0;
      }
    });
    this.listingsInCart.next([]);
  }

  checkout() {
    this.emptyCart();
    this._snackBar.open('Checkout Success.', 'Close');
  }

  getListings() {
    return this.listings;
  }

  getListingById(id: string[] | string) {
    if (Array.isArray(id)) {
      return this.listings.filter((item) => {
        return id.includes(item.id);
      });
    } else {
      return [this.listings.find((listing) => {
        return listing.id === id;
      })];
    }
  }

  getCartTotal() {

    let cartTotal = 0;

    this.listings.forEach((listing) => {
      if (this.listingsInCart.value.includes(listing.id)) {
        cartTotal += (listing.quantityInCart * +listing.price);
      }
    });

    return cartTotal;

  }

  addListing() { }

  removeListing() { }

  addToCart({ id }) {
    if (!this.listingsInCart.value.includes(id)) {
      this.listingsInCart.value.push(id);
    }

    this.listings.forEach((listing) => {
      if (listing.id === id) {
        ++listing.quantityInCart;
      }
    });
  }

  removeFromCart({ id }) {
    if (this.listingsInCart.value.includes(id)) {
      this.listingsInCart.next(this.listingsInCart.value.filter((itemId) => itemId !== id));
    }

    this.listings.forEach((listing) => {
      if (listing.id === id) {
        if (listing.quantityInCart === 0) return;
        --listing.quantityInCart;
      }
    });
  }

}
