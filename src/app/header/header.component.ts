import { Router } from '@angular/router';
import { LoginComponent, firstName } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { setUser } from '../login/login.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit {

  temp = firstName;

  constructor(private router: Router) { }

  items: MenuItem[];

  logout() {
    setUser(null, 'Guest', null, null, null, null);
    console.log('Logging out...');
    this.router.navigateByUrl('/login');
  }

  home() {
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
    this.items = [
      {label: 'Dashboard', icon: 'fa fa-fw fa-tachometer', routerLink: ['../dashboard']},
      {label: 'Current Holdings', icon: 'fa fa-fw fa-th-list', routerLink: ['../holdings']},
      {label: 'Derivatives Analysis', icon: 'fa fa-fw fa-line-chart', routerLink: ['../analysis']},
      {label: 'Strategy Builder', icon: 'fa fa-fw fa-money', routerLink: ['../strategies']},
  ];

  }

}
