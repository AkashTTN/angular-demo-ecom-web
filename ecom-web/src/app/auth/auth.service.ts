import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from './user.model';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  firebaseApiKey = environment.firebase.apiKey;
  endpoints = {
    signin: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.firebaseApiKey}`,
    signup: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.firebaseApiKey}`
  };
  user = new BehaviorSubject<User>(null);

  constructor(private router: Router, private http: HttpClient) { }

  logout() {
    this.user.next(null);
    this.router.navigate(['/']);
  }

  singin({ email, password }) {
    const payload = { email, password, returnSecureToken: true };

    return this.http.post<AuthResponseData>(this.endpoints.signin, payload)
      .pipe(catchError(this.handleError), tap((resData) => {
        const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
        const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
        this.user.next(user);
      }));
  }

  signup({ email, password }) {
    const payload = { email, password, returnSecureToken: true };

    return this.http.post<AuthResponseData>(this.endpoints.signup, payload).pipe(catchError(this.handleError));
  }

  private handleError(errRes: HttpErrorResponse) {

    let defaultErrorMsg = 'An unknown error occured.';

    if (!errRes.error || !errRes.error.error) {
      return throwError(defaultErrorMsg);
    }

    switch (errRes.error.error.message) {
      case 'EMAIL_EXISTS':
        return throwError('The email address is already in use by another account.');
      case 'OPERATION_NOT_ALLOWED':
        return throwError('Password sign -in is disabled for this project.');
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        return throwError('We have blocked all requests from this device due to unusual activity. Try again later.');
      case 'EMAIL_NOT_FOUND':
        return throwError('There is no user record corresponding to this identifier. The user may have been deleted.');
      case 'INVALID_PASSWORD':
        return throwError('The password is invalid or the user does not have a password.');
      case 'USER_DISABLED':
        return throwError('The user account has been disabled by an administrator.');
      default: return throwError(defaultErrorMsg);
    }
  }

}
