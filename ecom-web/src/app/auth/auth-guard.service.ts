import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        if (state.url === '/authenticate') {
          if (user) {
            return this.router.createUrlTree(['/']);
          }
          return true;
        } else {
          if (!!user) {
            return true;
          }
          this._snackBar.open('You need to login first.', 'Close', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
          });
          return this.router.createUrlTree(['/authenticate']);
        }
      })
    );
  }

}
