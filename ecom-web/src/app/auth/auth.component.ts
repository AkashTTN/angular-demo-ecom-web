import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy, OnInit, AfterViewInit {

  @ViewChild('authForm') authForm: NgForm;
  isLoginMode = false;
  isLoading = false;
  authFormError = null;
  authFormSubs: Subscription;
  authServiceObs: Observable<AuthResponseData>;
  error = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.authFormSubs.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.authFormSubs = this.authForm.statusChanges.subscribe((authFormStatus) => {
      this.authFormError = (authFormStatus === 'VALID' ? null : 'Invalid Data.');
    });
  }

  onAuthSubmit() {
    if (this.authFormError) {
      return;
    }

    const { email, password, confirmPassword } = this.authForm.value;

    this.isLoading = true;
    this.error = null;

    if (this.isLoginMode) {
      this.authServiceObs = this.authService.singin({ email, password });
    } else {
      if (password === confirmPassword) {
        console.log(password, confirmPassword)
        this.authServiceObs = this.authService.signup({ email, password });
      } else {
        this.error = 'Passwords don\'t match.';
        this.isLoading = false;
        return;
      }
    }

    this.authServiceObs.subscribe(
      (resData) => {
        this.isLoading = false;
        this.authForm.reset();
        if (this.isLoginMode) {
          this.openSnackBar('Login Success.', 'Close');
          this.router.navigate(['/']);
        } else {
          this.openSnackBar('Registeration Successful', 'Close');
          this.switchAuthMode();
        }
      },
      (errorMsg) => {
        this.isLoading = false;
        this.error = errorMsg;
        if (!this.isLoginMode) {
          this.openSnackBar('Registeration Failed.', 'Close');
        } else {
          this.openSnackBar('Login failed.', 'Close');
        }
      }
    );

  }

  switchAuthMode() {
    this.authForm.reset();
    this.authFormError = null;
    this.error = null;
    this.isLoginMode = !this.isLoginMode;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

}
