import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';

export let emailId = null;
export let firstName = 'Guest';
export let lastName = null;
export let userHoldings = [];
export let gain = [];
export let gainPerc = [];

// v1, v2, v3, v4, v5, v6
export function setUser(v1, v2, v3) {
  emailId = v1;
  firstName = v2;
  lastName = v3 ;
}

export function setHoldings(v1){
  userHoldings = v1;
}

export function setGain(v1, v2){
  gain = v1;
  gainPerc = v2;
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

export function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class LoginComponent implements OnInit {

  title = 'Derivatives Analysis';
  createAccountForm: FormGroup;
  loginForm: FormGroup;

  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router,
              private messageService: MessageService, private messageModule: MessageModule) { }

  addSingle(sev, sum, msg) {
      this.messageService.add({severity: sev, summary: sum, detail: msg});
      console.log('Toast...');
  }

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
    let sev;
    let sum;
    this.loginService.sendCreateRequest(this.createAccountForm.value).subscribe(async res => {
      resp = res;
      console.log(resp);
      const error: boolean = resp.error;
      const messages: string[] = resp.message;
      if (!error) {
        sev = 'error';
        sum = 'Error';
      } else {
        sev = 'success';
        sum = 'Success';
      }
      messages.forEach ((mess) => {
        this.addSingle(sev, sum, mess);
      });
      await delay(500);
      setUser(resp.uniqueIdentifier, resp.firstName, resp.lastName);
      setGain(resp.gainList, resp.gainPercentageList);
      this.router.navigateByUrl('/app/holding');
    });
  }

  onLoginSubmit() {
    let resp;
    let sev;
    let sum;
    this.loginService.sendLoginRequest(this.loginForm.value).subscribe(async res => {
      resp = res;
      console.log(resp);
      const error: boolean = resp.error;
      let messages: string = resp.message;
      if (!error) {
        sev = 'error';
        sum = 'Error';
      } else {
        sev = 'success';
        sum = 'Welcome back!';
        messages = null;
      }
      this.addSingle(sev, sum, messages);
      await delay(500);
      setUser(resp.uniqueIdentifier, resp.firstName, resp.lastName);
      setHoldings(resp.userHolding);
      setGain(resp.gainList, resp.gainPercentageList);
      if (error) {
        this.router.navigateByUrl('/app/holdings');
      }
    });
  }

}
