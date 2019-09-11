import { Component, OnInit } from '@angular/core';
import { Derivative } from '../Classes/Dervivative';
import { DataService } from '../services/data.service';
import { Chart } from 'chart.js';
import {FormBuilder, FormGroup} from '@angular/forms';
import { userHoldings } from '../login/login.component';
//import { setLoginEmail, loginEmail } from '../login/login.component';

@Component({
  selector: 'app-current-holdings',
  templateUrl: './current-holdings-component.component.html',
  styleUrls: ['./current-holdings-component.component.scss']
})
export class CurrentHoldingsComponentComponent implements OnInit {

  holdings : any;
  tableData : Derivative[] = [];
  cols : any[];
  selectedHoldings : any = [];
  LineChart = [];
  // form: FormGroup;

  constructor( private derivativeService: DataService,
               //private formBuilder: FormBuilder
               ) {
      //this.holdings = this.derivativeService.getUserHoldings();
     }

  ngOnInit() {

    //uncomment after connecting with backend
    // this.derivativeService.getHoldingsData().subscribe(
    //   res => {
    //       this.holdings = res;
    //       console.log(this.holdings);
    //     });

    
    this.holdings = userHoldings;
    console.log(this.holdings);

    for(let x=0; x<this.holdings.length; x++){
      
        let temp = new Derivative();
        temp.avgPrice = this.holdings[x].avgPrice;
        temp.symbol = this.holdings[x].symbol;
        temp.instrument = this.holdings[x].expiryDate + " " + this.holdings[x].position + " " + this.holdings[x].type;
        temp.numLots = this.holdings[x].numLots;
        temp.ltp = this.holdings[x].ltp;
        temp.spotPrice = this.holdings[x].spotPrice;
        temp.pl = this.holdings[x].avgPrice;
        temp.per_change = this.holdings[x].avgPrice;
        this.tableData.push(temp);
    }

    this.cols = [
        { field: 'symbol', header: 'Symbol' },
        { field: 'instrument', header: 'Instrument' },
        { field: 'lotSize', header: 'Quantity' },
        { field: 'avgPrice', header: 'Average Price' },
        { field: 'ltp', header: 'LTP' },
        { field: 'strikePrice', header: 'Current Value' },
        { field: 'pl', header: 'Profit/Loss' },
        { field: 'per_change', header: '% Change' }
    ];
  }

  selectedRow(){
    console.log(this.selectedHoldings);
  }

  clearChart(){
    this.LineChart = [];
    this.selectedHoldings = [];
  }

  generateChart(){

    let response;
    let postData = this.selectedHoldings;
    this.derivativeService.sendHoldings_getChartData(postData).subscribe(result =>{
        response = result;
    });

    this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: ['start', 'mid', 'end'],
        datasets: [{
          label: 'Pay-Off Chart for selected holdings',
          data: [
            {x:-4, y: -1, indexLabel: "lowest", markerColor: "DarkSlateGrey", markerType: "cross"} , {x:4, y:-1}, {x:8, y:8}],
          fill: false,
          lineTension: 0,
          borderColor: 'red',
          borderWidth: 1
        }]
      },
      options: {
        title: {
          text: 'Line Chart',
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
