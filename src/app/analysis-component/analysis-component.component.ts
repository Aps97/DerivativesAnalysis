import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Chart } from 'chart.js';
import { Derivative } from '../Classes/Dervivative';
import { AnalysisData } from '../Classes/AnalysisData';
import { DataService } from '../services/data.service';

class AnalysisTable{
  strategy : String;
  entryPrice : number;
}

@Component({
  selector: 'app-analysis-component',
  templateUrl: './analysis-component.component.html',
  styleUrls: ['./analysis-component.component.scss']
})
export class AnalysisComponentComponent implements OnInit {

  securities: SelectItem[];  //list of 5 securities in the dropdown
  instruments: SelectItem[];  //list of derivatives after security selection

  selectedSecurity: String;     //holds the selection made from security dropdown
  selectedInstrument : string;  //holds the selection made from instruments dropdown
  selectedPosition: string;  //holds the selected position
  selectedItems : any = [];
  
  maxProfit : number;      //to display the max profit
  maxLoss : number;        //to display the max loss
  Breakevens : number[];   //to display the list of breakevens

  cols : any[];    //list of table columns
  
  LineChart = [];               //to display the chart
  postData : AnalysisData;    //to send analysis data to the service
 
  setPrice : number;
  setQuantity : number;
  lotSize : number;                 //to display in html
  temp: any;                        //receives list of derivatives from the service
  completeTableData: AnalysisData[] = [];   //holds the list of selected derivatives
  partialTableData: AnalysisTable[] = [];

  constructor(
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
    this.cols = [
      { field: 'strategy', header: 'Strategy' },
      { field: 'entryPrice', header: 'Entry Price' }
    ];
  }

  getInstrumentList(){
    this.analysisService.getInstrumentsData(this.selectedSecurity).subscribe(
        res => {
            this.instruments = [];
            this.temp = res;
            console.log(this.temp);

            for(var x=0; x<this.temp.derivativeList.length; x++){
              this.instruments.push({label: this.temp.derivativeList[x].expiryDate + " " + this.temp.derivativeList[x].strikePrice + " " 
              + this.temp.derivativeList[x].type + " " + "("+ this.temp.derivativeList[x].premium + ")",
               value: this.temp.derivativeList[x].expiryDate + " " + this.temp.derivativeList[x].strikePrice + " " + this.temp.derivativeList[x].type})
            }

            this.lotSize = this.temp.derivativeList[0].lotSize;
          });
  }

  onAnalysisSubmit(data){
    
    this.postData = new AnalysisData();
    this.postData.price = data.value["price"];
    this.postData.position = this.selectedPosition;
    this.postData.quantity = data.value["quantity"];

    let temp = this.selectedInstrument["label"];
   
    let tempInstrument = temp.split(" ", 3);
    this.postData.expiryDate = tempInstrument[0];
    this.postData.strikePrice = tempInstrument[1];
    this.postData.type = tempInstrument[2];
    
    this.postData.lotsize = this.lotSize;

    this.completeTableData.push(this.postData);
    console.log(this.completeTableData);

    let x = new AnalysisTable();
    x.strategy = tempInstrument[0] + " " + tempInstrument[1] + " " + tempInstrument[2];
    x.entryPrice = this.postData.price;
    this.partialTableData.push(x);

    let tempResult;

    
    // this.analysisService.sendAnalysisInput(this.completeTableData).subscribe(res=>{
    //   tempResult = res;
    //   // this.maxProfit = tempResult.maxProfit;
    //   // this.maxLoss = tempResult.maxLoss;
    //   // this.Breakevens = tempResult.Breakevens;
    //   console.log(tempResult);
    // });

    //this.generateChart();
    
  }

  generateChart(){

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

  clearSelections(){
    this.completeTableData = [];
    this.partialTableData = [];
  }

  // deleteSelections(){
  //   console.log(this.selectedItems);
  //   this.selectedItems.forEach(function(item) {
  //     const index = this.partialTableData.indexOf(item);

  //     this.partialTableData.splice(index, 1);
  // });
  // //console.log(this.selectedItems);
  // }

  setFields(){
    if(this.selectedInstrument){
      let tempInstrument = this.selectedInstrument["label"].split(" ", 4);
      tempInstrument = tempInstrument[3].split("(", 2);
      tempInstrument = tempInstrument[1].split(")",2);
      this.setPrice = tempInstrument[0];
      this.setQuantity = 1;
    }
    
  }
}
