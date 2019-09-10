import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Chart } from 'chart.js';
import { Derivative } from '../Classes/Dervivative';
import { AnalysisData } from '../Classes/AnalysisData';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-analysis-component',
  templateUrl: './analysis-component.component.html',
  styleUrls: ['./analysis-component.component.scss']
})
export class AnalysisComponentComponent implements OnInit {

  securities: SelectItem[];
  instruments: SelectItem[];

  selectedSecurity: String;
  selectedInstrument: String;

  result : any;

  analysisForm = this.fb.group({
    selectedCity: ['', Validators.required],
    //passwordLogin: ['', Validators.required],
  });

  selectedPosition: string;
  net_p_l : number;
  fairPrice : number;
  maxProfit : number;
  maxLoss : number;
  Breakevens : number;
  cols : any[];
  summary : any;
  LineChart = [];
  symbolDropdown : String[];
  postData : AnalysisData;

  constructor(
    private fb : FormBuilder,
    private analysisService: DataService
  ) {
    this.securities = [
      {label:'HDFCBANK', value:'HDFCBANK'},
      {label:'ITC', value:'ITC'},
      {label:'INFY', value:'INFY'},
      {label:'RELIANCE', value:'RELIANCE'},
      {label:'SUNPHARMA', value:'SUNPHARMA'},
  ];
  }

  ngOnInit() {

    //uncomment after connecting with backend
    // this.derivativeService.getHoldingsData().subscribe(
    //   res => {
    //       this.summary = res;
    //       console.log(this.summary);
    //     });
    //this.symbolDropdown = this.summary.symbol;

    this.cols = [
      { field: 'strategy', header: 'Strategy' },
      { field: 'entryPrice', header: 'Entry Price' }
    ];
  }

  getInstrumentList(){
    let derivativeList;
    this.analysisService.getInstrumentsData(this.selectedSecurity).subscribe(
        res => {
            derivativeList = res;
            console.log(derivativeList);

            this.instruments = [];
            for(let x=0; x<derivativeList.length; x++){
               this.instruments.push({label: derivativeList[x].expiryDate + " " + derivativeList[x].strikePrice + " " + derivativeList[x].type,
              value: derivativeList[x].expiryDate + " " + derivativeList[x].strikePrice + " " + derivativeList[x].type});
            }

            console.log(this.instruments);
          });
  }

  onAnalysisSubmit(data){
    
    this.postData.price = data.price;
    this.postData.position = this.selectedPosition;
    this.postData.quantity = data.quantity;

    let tempInstrument = this.selectedSecurity.split(" ", 3);

    this.postData.expiryDate = tempInstrument[0];
    this.postData.strikePrice = tempInstrument[1];
    this.postData.type = tempInstrument[2];

    console.log(this.postData);
    let tempResult;
    this.analysisService.sendAnalysisInput(this.postData).subscribe(res=>{
      tempResult = res;
      // this.net_p_l = tempResult.net_p_l;
      // this.fairPrice = tempResult.fairPrice;
      // this.maxProfit = tempResult.maxProfit;
      // this.maxLoss = tempResult.maxLoss;
      // this.Breakevens = tempResult.Breakevens;
      console.log(tempResult);
    });

    this.generateChart();
    this.summary.push(this.postData);
  }

  generateChart(){

    let temp : Derivative[];

    temp = this.summary;
    this.analysisService.sendHoldings_getChartData(temp).subscribe(res=>{

      //shift the chart generation here after retrieving the x-y coordinates.
    });

    this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: ['start', 'mid', 'end'],
        datasets: [{
          label: 'Pay-Off Chart for selected holdings',
          data: [
            {x:-4, y: -1, indexLabel: "lowest",markerColor: "DarkSlateGrey", markerType: "cross"} , {x:4, y:-1}, {x:8, y:8}],
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
