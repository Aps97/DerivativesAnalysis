import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  firstName : String;
  title = "Derivatives Analysis";
  createAccountForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    emailID: ['', Validators.required],
    password: ['', Validators.required],
  });
  loginForm = this.fb.group({
    emailIDLogin: ['', Validators.required],
    passwordLogin: ['', Validators.required],
  });

  constructor(private loginService: LoginService,
              private fb: FormBuilder) { }

  ngOnInit() {

    // this.loginService.sendLoginRequest().subscribe(
    //   res => {
    //       this.holdings = res;
    //       console.log(this.holdings);
    //     });
  }

  onCreateAccountSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.createAccountForm.value);
  }

  onLoginSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.loginForm.value);
  }

}
