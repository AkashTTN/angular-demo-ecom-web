import { Component, OnInit } from '@angular/core';
import { ListingsService } from 'src/app/listings.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {

  listings;

  constructor(private listingsService: ListingsService) { }

  ngOnInit(): void {
    this.listings = this.listingsService.getListings();
  }

}
