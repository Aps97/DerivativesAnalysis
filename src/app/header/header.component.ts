import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { loginEmail, setLoginEmail } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  firstName = loginEmail;

  constructor() { }

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {label: 'Dashboard', icon: 'fa fa-fw fa-tachometer', routerLink: ['../dashboard']},
      {label: 'Current Holdings', icon: 'fa fa-fw fa-th-list', routerLink: ['../holdings']},
      {label: 'Derivatives Analysis', icon: 'fa fa-fw fa-line-chart', routerLink: ['../analysis']},
      {label: 'Strategy Builder', icon: 'fa fa-fw fa-money', routerLink: ['../strategies']},
  ];
  
  }

  logout(){
    setLoginEmail(null, null);
  }

}
