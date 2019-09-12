import { MessageModule } from 'primeng/message';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';

export let emailId = '';
export let firstName = 'Guest';
export let lastName = '';
export let userHoldings = [];

export function setUser(v1, v2, v3, v4) {
  emailId = v1;
  firstName = v2;
  lastName = v3 ;
  userHoldings = v4;
  // console.log(emailId, firstName, lastName, userHoldings);
}


export function matchValues(matchTo: string): (AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    return !!control.parent &&
      !!control.parent.value &&
      control.value === control.parent.controls[matchTo].value
      ? null
      : { isMatching: false };
  };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  title = 'Derivatives Analysis';
  createAccountForm: FormGroup;
  loginForm: FormGroup;

  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router, private message: MessageModule) { }

  private passwordMatcher(control: FormControl): { [s: string]: boolean } {
    if (
        this.createAccountForm &&
        (control.value !== this.createAccountForm.controls.password.value)
    ) {
        return { passwordNotMatch: true };
    }
    return null;
  }

  ngOnInit() {

    this.createAccountForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      emailId: new FormControl('', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, this.passwordMatcher.bind(this)]),
    });

    this.loginForm = this.fb.group({
      emailId: new FormControl('', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]),
      password: new FormControl('', Validators.required),
    });

  }

  onCreateAccountSubmit() {
    let resp;
    this.loginService.sendCreateRequest(this.createAccountForm.value).subscribe(res => {
      resp = res;
      console.log(resp.message, resp.url);
      setUser(resp.emailId, resp.firstName, resp.lastName, resp.userHoldings);
      this.router.navigateByUrl(resp.url);
    });
  }

  onLoginSubmit() {
    let resp;
    this.loginService.sendLoginRequest(this.loginForm.value).subscribe(res => {
      resp = res;
      //console.log(resp);
      setUser(resp.emailId, resp.firstName, resp.lastName, resp.userHolding);
      this.router.navigateByUrl(resp.url);
    });
  }

}