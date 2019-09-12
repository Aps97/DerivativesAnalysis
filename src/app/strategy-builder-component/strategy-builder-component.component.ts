import { Component, OnInit } from '@angular/core';
import { Derivative } from '../Classes/Dervivative';
import { DataService } from '../services/data.service';
// import { Chart } from 'chart.js';
import {FormBuilder, FormGroup} from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { Strategies } from '../Classes/Strategies';
import { StrategyService } from '../services/strategies.service';

export class strategyInput{
  security : String;
  views : String;
  expiryDate : String;
  target : String;
}

@Component({
  selector: 'app-strategy-builder-component',
  templateUrl: './strategy-builder-component.component.html',
  styleUrls: ['./strategy-builder-component.component.scss']
})
export class StrategyBuilderComponentComponent implements OnInit {

  securities: SelectItem[]; 
  views: SelectItem[];
  strategies1 : any=[];
  expiry : SelectItem[];
  cols : any[];
  temp : any;
  selectedStrategies : any = [];
  selectedSecurity : String;
  selectedView : String;
  selectedExpiry : String;
  selectedTarget : number;
  tableData: Strategies;
    
  constructor(private strategyService: StrategyService,
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

  getStrategyData() {
    let strategyData = new strategyInput();
    strategyData.security = this.selectedSecurity["label"];
    strategyData.expiryDate = this.selectedExpiry["label"];
    strategyData.views = this.selectedView["label"];
    strategyData.target = this.selectedTarget.toString();
    console.log("I'm inside");
    console.log(strategyData);
    this.strategyService.getStrategies(strategyData).subscribe(
        res => {
            this.strategies1 = [];
            this.temp = res;
            
            console.log("I'm inside 2");
            console.log(this.temp);

            for(var x=0; x<this.temp.strategies1.length; x++){
              console.log("in loop");
              let tableData = new Strategies();
              tableData.breakevens =  this.temp.strategies1[x].breakevens;
              tableData.maxLoss= this.temp.strategies1[x].maxLoss;
              tableData.maxProfit= this.temp.strategies1[x].maxProfit; 
              //temp.holdings= this.tableData.strategies1[x].holdings;
              tableData.strategyName= this.temp.strategies1[x].strategyName;
              this.strategies1.push(tableData);
                                
            }
           console.log(this.strategies1);
    

            // this.lotSize = this.temp.derivativeList[0].lotSize;
          });
  }

  ngOnInit() {
    this.cols =
     [ 
      { field: 'strategyName', header: 'Strategy Name' },
      { field: 'maxProfit', header: 'Max Profit' },
      { field: 'maxLoss', header: 'Max Loss' },
      { field: 'breakevens', header: 'Breakeven' },
  ];
  }

  //this.strategies = this.derivativeService.getUserHoldings();

}
