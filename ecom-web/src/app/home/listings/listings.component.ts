import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit, OnDestroy {

  listings;
  listingsSubs: Subscription;

  constructor(
    private store: Store<{ shop: { listings: {}, cartTotal: number } }>
  ) { }

  ngOnInit(): void {
    this.listingsSubs = this.store.select('shop').subscribe((storeState) => {
      this.listings = Object.values(storeState.listings);
    });
  }

  ngOnDestroy() {
    this.listingsSubs.unsubscribe();
  }

}
