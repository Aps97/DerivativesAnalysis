import { Component, OnInit } from '@angular/core';
import { Derivative } from '../Classes/Dervivative';
import { DataService } from '../services/data.service';
// import { Chart } from 'chart.js';
import {FormBuilder, FormGroup} from '@angular/forms';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'app-strategy-builder-component',
  templateUrl: './strategy-builder-component.component.html',
  styleUrls: ['./strategy-builder-component.component.scss']
})
export class StrategyBuilderComponentComponent implements OnInit {

  securities: SelectItem[]; 
  views: SelectItem[];
  strategies : any = [];
  expiry : SelectItem[];
  cols : any[];
  selectedStrategies : any = [];
    
  constructor(private derivativeService: DataService,
               //private formBuilder: FormBuilder
               
               ) {
                this.securities = [
                  {label:'HDFCBANK', value:'HDFCBANK'},
                  {label:'ITC', value:'ITC'},
                  {label:'INFY', value:'INFY'},
                  {label:'RELIANCE', value:'RELIANCE'},
                  {label:'SUNPHARMA', value:'SUNPHARMA'},
              ];
               
              this.views = [
                  {label:'Bearish', value:'Bearish'},
                  {label:'Bullish', value:'Bullish'},
                  {label:'Neutral', value:'Neutral'},
              ]

              this.expiry = [
                {label:'26-SEP-19', value:'26-SEP-19'},
                {label:'31-OCT-19', value:'31-OCT-19'},
                {label:'28-NOV-19', value:'28-NOV-19'},
              ]
      
   }

  ngOnInit() {
    this.cols = [
      { field: 'trade', header: 'Trade' },
      { field: 'profit', header: 'Profit' },
      { field: 'breakeven', header: 'Breakeven' },
      { field: 'capitalrequired', header: 'Capital Required' },
      { field: 'returnPercentage', header: 'Return %' },
      { field: 'more', header: 'More' }
  ];
  }

  //this.strategies = this.derivativeService.getUserHoldings();

}
