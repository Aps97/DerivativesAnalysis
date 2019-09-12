import { Component, OnInit } from '@angular/core';
// import { Derivative } from '../Classes/Dervivative';
// import { DataService } from '../services/data.service';
// // import { Chart } from 'chart.js';
// import {FormBuilder, FormGroup} from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { Strategies } from '../Classes/Strategies';
import { StrategyService } from '../services/strategies.service';
// import { MatTableModule } from '@angular/material';

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
  strategies =[];
  expiry : SelectItem[];
  cols : any[];
  temp : any;
  selectedStrategies : any = [];
  selectedSecurity : String;
  selectedView : String;
  selectedExpiry : String;
  selectedTarget : number;
  tableData: Strategies;
  dataSource: Strategies;
  tableColumns  :  string[]=['strategyName','maxProfit','maxLoss','breakevens'];
  constructor(private strategyService: StrategyService
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
    
    // let resp;
    // let strategyData = new strategyInput();
    // strategyData.security = "";
    // strategyData.expiryDate = "";
    // strategyData.views = "";
    // strategyData.target = "0";
    this.strategyService.getStrategies(strategyData).subscribe(
        res => {
            this.strategies = [];
            this.temp = res;
            
            console.log("I'm inside 2");
            console.log(this.temp);
            // console.log(this.temp.strategies.length);
            for(var x=0; x<this.temp.strategies.length; x++){
              console.log("in loop");
              let tableData = new Strategies();
              tableData.breakevens =  this.temp.strategies[x].breakevens;
              //console.log(tableData.breakevens);
              tableData.maxLoss= this.temp.strategies[x].maxLoss;
              //console.log(tableData.maxLoss);
              tableData.maxProfit= this.temp.strategies[x].maxProfit; 
              //tableData.holdings= this.temp.strategies[x].holdings;
              tableData.strategyName= this.temp.strategies[x].strategyName;
              console.log(tableData.strategyName);
              this.strategies.push(tableData);
                                
            }
           console.log(this.strategies);
    

            // this.lotSize = this.temp.derivativeList[0].lotSize;
          });
  } 

  ngOnInit() {
    // let resp;
    // let strategyData = new strategyInput();
    // strategyData.security = "";
    // strategyData.expiryDate = "";
    // strategyData.views = "";
    // strategyData.target = "0";
    // this.strategyService.getStrategies(strategyData).subscribe((result)=>{
    //   resp=result;    
    //   this.dataSource =  resp.strategies;
    // })
    this.cols =
     [ 
      { field: 'strategyName', header: 'Strategy Name' },
      { field: 'maxProfit', header: 'Max Profit' },
      { field: 'maxLoss', header: 'Max Loss' },
      { field: 'breakevens', header: 'Breakeven' }
     // { field: 'holdings', header: 'Holdings' },
  ];
  }

  //this.strategies = this.derivativeService.getUserHoldings();

}
