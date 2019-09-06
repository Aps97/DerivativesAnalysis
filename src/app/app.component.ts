import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'derivatives-analysis-app';

  cities1: City[];
    
    cities2: City[];

    selectedCity1: City;
    
    selectedCity2: City;

    constructor(private router : Router) {
        //SelectItem API with label-value pairs
        this.cities1 = [
          {name: 'New York', code: 'NY'},
          {name: 'Rome', code: 'RM'},
          {name: 'London', code: 'LDN'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'}
        ];
        
        //An array of cities
        this.cities2 = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
        ];
    }

    loginUser() : void {
      this.router.navigateByUrl('login/holdings');
  }
}