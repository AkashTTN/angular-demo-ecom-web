import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ListingsService } from './listings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  links = ['Cart', 'Authenticate'];
  isAuthenticated = false;
  listingsInCart: Array<string>;

  constructor(
    private authService: AuthService,
    private listingsService: ListingsService
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

    this.listingsService.listingsInCart.subscribe((listingsInCart) => {
      this.listingsInCart = listingsInCart;
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
