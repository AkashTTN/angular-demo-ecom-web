import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  links = ['Cart', 'Authenticate'];
  isAuthenticated = false;

  constructor(private authService: AuthService) { }

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
  }

  onLogout() {
    this.authService.logout();
  }

}
