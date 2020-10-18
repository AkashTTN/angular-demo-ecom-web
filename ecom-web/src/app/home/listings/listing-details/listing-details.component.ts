import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/store/actions';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css']
})
export class ListingDetailsComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<{ shop: { listings: {}, cartTotal: number } }>
  ) {
  }

  id: string;
  listingData: Product;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    });

    this.store.select('shop').subscribe((storeData) => {
      if (this.id in storeData.listings) {
        this.listingData = storeData.listings[this.id];
      } else {
        this.router.navigate(['/not-found']);
      }
    });

  }

}
