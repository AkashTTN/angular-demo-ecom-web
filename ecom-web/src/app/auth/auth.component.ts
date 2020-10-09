import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  @ViewChild('authForm') authForm: NgForm;
  isLoginMode = false;

  constructor() { }

  ngOnInit(): void {
  }

  onAuthSubmit() {
    console.log('Submitted.');
  }

  switchAuthMode() {
    this.isLoginMode = !this.isLoginMode;
  }

}
