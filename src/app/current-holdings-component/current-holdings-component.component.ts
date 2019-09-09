import { Component, OnInit } from '@angular/core';
import { Derivative } from '../Classes/Dervivative';
import { DataService } from '../services/data.service';
import { Chart } from 'chart.js';
import {FormBuilder, FormGroup} from '@angular/forms';
//import { setLoginEmail, loginEmail } from '../login/login.component';

@Component({
  selector: 'app-current-holdings',
  templateUrl: './current-holdings-component.component.html',
  styleUrls: ['./current-holdings-component.component.scss']
})
export class CurrentHoldingsComponentComponent implements OnInit {

  holdings : any;
  cols : any[];
  selectedHoldings : any = [];
  LineChart = [];
  // form: FormGroup;

  constructor( private derivativeService: DataService,
               //private formBuilder: FormBuilder
               ) {
      this.holdings = this.derivativeService.getUserHoldings();
     }

  ngOnInit() {

    //uncomment after connecting with backend
    // this.derivativeService.getHoldingsData().subscribe(
    //   res => {
    //       this.holdings = res;
    //       console.log(this.holdings);
    //     });


    this.cols = [
        { field: 'symbol', header: 'Symbol' },
        { field: 'expiryDate', header: 'Instrument' },
        { field: 'quantity', header: 'Quantity' },
        { field: 'avgPrice', header: 'Average Price' },
        { field: 'ltp', header: 'LTP' },
        { field: 'currValue', header: 'Current Value' },
        { field: 'pl', header: 'Profit/Loss' },
        { field: 'per_change', header: '% Change' }
    ];
  }

  selectedRow(){
    console.log(this.selectedHoldings);
  }

  clearChart(){
    this.LineChart = [];
  }

  generateChart(){

    this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: ['start', 'mid', 'end'],
        datasets: [{
          label: 'Pay-Off Chart for selected holdings',
          data: [
            {x:-4, y: -1, indexLabel: "lowest", markerColor: "DarkSlateGrey", markerType: "cross"} , {x:4, y:-1}, {x:8, y:8}],
          fill: false,
          lineTension: 0.2,
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
