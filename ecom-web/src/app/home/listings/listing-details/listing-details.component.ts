import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ListingData, ListingsService } from 'src/app/listings.service';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css']
})
export class ListingDetailsComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private listingsService: ListingsService) {
  }

  id: string;
  listingData;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    });
    this.listingData = this.listingsService.getListingById(this.id)[0];
    if (!this.listingData) {
      this.router.navigate(['/not-found']);
    }
  }

}
