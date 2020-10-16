import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { ListingData, ListingsService } from 'src/app/listings.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit, OnDestroy {

  @Input('data') listingData: ListingData;
  isAuthenticated = false;
  authSubs: Subscription;

  constructor(
    private authService: AuthService,
    private listingsService: ListingsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authSubs = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy() {
    this.authSubs.unsubscribe();
  }

  goToProductPage(listingId) {
    this.router.navigate([`product/${listingId}`]);
  }

  onAddToCart(listingId) {
    if (!this.isAuthenticated) {
      return this.router.navigate(['/authenticate']);
    }

    this.listingsService.addToCart({ id: listingId });
  }

  onRemoveFromCart(listingId) {
    if (!this.isAuthenticated) {
      return this.router.navigate(['/authenticate']);
    }

    this.listingsService.removeFromCart({ id: listingId });
  }

}
