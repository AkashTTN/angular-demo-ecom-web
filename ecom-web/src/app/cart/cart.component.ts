import { Component, OnInit } from '@angular/core';

import { ListingData, ListingsService } from '../listings.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private listingsService: ListingsService) { }

  listingsInCart: string[];
  cartItems: ListingData[];
  cartTotal: number;

  ngOnInit(): void {
    this.listingsService.listingsInCart.subscribe((idsList) => {
      this.cartItems = this.listingsService.getListingById(idsList);
      this.cartTotal = this.listingsService.getCartTotal();
    });
  }

  onCheckout() {
    this.listingsService.checkout();
  }

}
