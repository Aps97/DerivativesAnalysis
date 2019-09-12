import { Component, OnInit } from '@angular/core';
import { Derivative } from '../Classes/Dervivative';
import { DataService } from '../services/data.service';
import { Chart } from 'chart.js';
import { userHoldings, gain, gainPerc } from '../login/login.component';

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
        if(this.holdings[x].type == "FUT"){
          temp.price = this.holdings[x].avgPrice;
        }
        else{
          temp.price = this.holdings[x].premium;
        }
        
        temp.symbol = this.holdings[x].symbol;
        temp.instrument = this.holdings[x].expiryDate + " " + this.holdings[x].strikePrice + " " + this.holdings[x].type;
        temp.numLots = this.holdings[x].numLots;
        temp.ltp = this.holdings[x].spotPrice;
        temp.pl = gain[x];
        temp.per_change = gainPerc[x];
        this.tableData.push(temp);
    }

    this.cols = [
        { field: 'symbol', header: 'Symbol' },
        { field: 'instrument', header: 'Instrument' },
        { field: 'numLots', header: 'Quantity' },
        { field: 'price', header: 'Price' },
        { field: 'ltp', header: 'LTP' },
        { field: 'pl', header: 'Profit/Loss' },
        { field: 'per_change', header: '% Change' }
    ];
  }

  selectedRow(){
    //console.log(this.selectedHoldings);
  }

  clearChart(){
    this.LineChart = [];
    this.selectedHoldings = [];
  }

  generateChart(){

    let response;
    let postData = this.selectedHoldings;
    // this.derivativeService.sendHoldings_getChartData(postData).subscribe(result =>{
    //     response = result;
    // });

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
