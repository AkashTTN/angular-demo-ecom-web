import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { LoadListings } from '../../store/actions';
import * as fromApp from '../../store/reducers';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit, OnDestroy {

  listings;
  listingsSubs: Subscription;
  listingsError: any;
  listingsLoading: boolean;

  constructor(
    private store: Store<{ shop: fromApp.AppState }>
  ) { }

  ngOnInit(): void {
    this.listingsSubs = this.store.select('shop').subscribe((storeState) => {
      this.listings = Object.values(storeState.listings);
      this.listingsError = storeState.error;
      this.listingsLoading = storeState.loading;
    });
    if (Object.values(this.listings).length === 0) {
      this.store.dispatch(new LoadListings());
    }
  }

  ngOnDestroy() {
    this.listingsSubs.unsubscribe();
  }

}
