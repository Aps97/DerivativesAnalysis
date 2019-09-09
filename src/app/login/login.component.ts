import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  firstName: String;
  title = 'Derivatives Analysis';
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
              private fb: FormBuilder, private router: Router) { }

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
    let resp;
    this.loginService.sendLoginRequest(this.loginForm.value).subscribe(res => {
      resp = res;
      console.log(resp.message);
      this.router.navigateByUrl(resp.url);
    });
  }

}
