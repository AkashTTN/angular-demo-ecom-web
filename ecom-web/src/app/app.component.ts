import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './store/reducers';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  links = ['Cart', 'Authenticate'];
  isAuthenticated = false;
  listingsInCart;
  storeSubs: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store<{ shop: fromApp.AppState }>
  ) { }

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      if (this.isAuthenticated) {
        this.links = this.links.filter((link) => link !== 'Authenticate');
      } else {
        if (!this.links.includes('Authenticate')) {
          this.links.push('Authenticate');
        }
      }
    });

    this.storeSubs = this.store.select('shop').subscribe((storeData) => {
      this.listingsInCart = Object.values(storeData.listings).filter((listing) => listing['quantityInCart'] > 0);
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
