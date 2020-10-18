import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { ListingData } from 'src/app/listings.service';
import * as Actions from '../../../store/actions';

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
    private router: Router,
    private store: Store<{ shop: { listings: {}, cartTotal: number } }>
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

    // this.listingsService.addToCart({ id: listingId });
    this.store.dispatch(new Actions.AddToCart({ listingId }));
  }

  onRemoveFromCart(listingId) {
    if (!this.isAuthenticated) {
      return this.router.navigate(['/authenticate']);
    }

    // this.listingsService.removeFromCart({ id: listingId });
    this.store.dispatch(new Actions.RemoveFromCart({ listingId }));
  }

}
