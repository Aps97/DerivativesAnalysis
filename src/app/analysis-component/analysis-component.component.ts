import { Component, OnInit, NgZone  } from '@angular/core';
import {SelectItem} from 'primeng/api';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Chart } from 'chart.js';
import { Derivative } from '../Classes/Dervivative';
import { AnalysisData } from '../Classes/AnalysisData';
import { DataService } from '../services/data.service';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material.js";


am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);
import { AddNewHoldings } from '../Classes/AddNewHolding';
import { emailId, setHoldings, setGain, gain } from '../login/login.component';

export class AnalysisTable{
  strategy : String;
  entryPrice : String;
  position : String;
  numLots : String;
}

@Component({
  selector: 'app-analysis-component',
  templateUrl: './analysis-component.component.html',
  styleUrls: ['./analysis-component.component.scss']
})
export class AnalysisComponentComponent implements OnInit {

  private chart: am4charts.XYChart;

  securities: SelectItem[];  //list of 5 securities in the dropdown
  instruments: SelectItem[];  //list of derivatives after security selection

  prevSelectedSecurity : String = " ";  //holds the last made selection
  selectedSecurity: String;     //holds the selection made from security dropdown
  selectedInstrument : string;  //holds the selection made from instruments dropdown
  selectedPosition: string;  //holds the selected position
  selectedItems : any;

  maxProfit : any;      //to display the max profit
  maxLoss : any;        //to display the max loss
  Breakevens : number[];   //to display the list of breakevens

  cols : any[];    //list of table columns

  LineChart = [];               //to display the chart
  postData : AnalysisData;    //to send analysis data to the service

  setPrice : number;    //to set the price in html
  setQuantity : number;    //to set the quantity in html
  lotSize = "Lot Size ";  //to set the lot size in html
  uValue = "U.Value ";              //to display underlying value in html
  temp: any;                        //receives list of derivatives from the service
  completeTableData: AnalysisData[] = [];   //holds the list of selected derivatives
  partialTableData: AnalysisTable[] = [];

  graphData : any;  //to store graph data from backend
  message : any;
  disableButton = true; //disabale submit button until valid

  constructor(
    private zone: NgZone,
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
      { field: 'strategy', header: 'Security' },
      { field: 'entryPrice', header: 'Entry Price(र)' },
      { field: 'position', header: 'Position' },
      { field: 'numLots', header: 'No. of Lots' }
    ];
  }

  getInstrumentList(){  //call service to populate security dropdown
    
    if(this.selectedSecurity){
      if(this.prevSelectedSecurity && this.selectedSecurity!==this.prevSelectedSecurity){
        this.clearSelections(); 
        this.prevSelectedSecurity = this.selectedSecurity;
      }
      this.analysisService.getInstrumentsData(this.selectedSecurity).subscribe(
          res => {
              this.instruments = [];
              this.temp = res;
              
              for(var x=0; x<this.temp.derivativeList.length; x++){
                if(this.temp.derivativeList[x].type === "FUT"){
                  this.instruments.push({label: this.temp.derivativeList[x].expiryDate + " " + this.temp.derivativeList[x].strikePrice + " "
                + this.temp.derivativeList[x].type + " " + "("+ this.temp.derivativeList[x].ltp + ")",
                value: this.temp.derivativeList[x].expiryDate + " " + this.temp.derivativeList[x].strikePrice + " " + this.temp.derivativeList[x].type})
                }
                else{
                  this.instruments.push({label: this.temp.derivativeList[x].expiryDate + " " + this.temp.derivativeList[x].strikePrice + " "
                + this.temp.derivativeList[x].type + " " + "("+ this.temp.derivativeList[x].premium + ")",
                value: this.temp.derivativeList[x].expiryDate + " " + this.temp.derivativeList[x].strikePrice + " " + this.temp.derivativeList[x].type})
                }
                
              }

              this.lotSize = "Lot Size " + this.temp.derivativeList[0].lotSize.toString();
              this.uValue = "U.Value " + this.temp.derivativeList[0].underlyingValue.toString();
            });
    }
  }

  onAnalysisSubmit(data){  //on submit for analysis form data
    this.postData = new AnalysisData();
    this.postData.price = data.value["price"].toString();
    this.postData.position = this.selectedPosition;
    this.postData.quantity = data.value["quantity"].toString();

    let temp = this.selectedInstrument["label"];

    let tempInstrument = temp.split(" ", 3);
    this.postData.expiryDate = tempInstrument[0];
    this.postData.strikePrice = tempInstrument[1];
    this.postData.type = tempInstrument[2];

    temp = this.lotSize.split(" ", 3);
    this.postData.lotSize = temp[2];

    this.completeTableData.push(this.postData);
    
    let x = new AnalysisTable();
    x.strategy = this.selectedInstrument["label"];
    x.entryPrice = this.postData.price;
    x.position = this.postData.position;
    x.numLots = this.postData.quantity;
    this.partialTableData.push(x);

    let tempResult;

    this.analysisService.sendAnalysisInput(this.completeTableData).subscribe(res=>{
      tempResult = res;
      this.maxProfit = tempResult.maxprofit;
      if(this.maxProfit > 20000000)
        this.maxProfit = "Unlimited";
      if(this.maxLoss < -20000000)
        this.maxLoss = "Unlimited";
      this.maxLoss = tempResult.maxloss;
      this.Breakevens = tempResult.breakevenpoints;
      this.graphData = [];

      for(let i=0; i<tempResult.coordinatelist.length; i++){
        this.graphData.push(tempResult.coordinatelist[i]);
      }

      this.generateChart();
    });

  }

  generateChart(){
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    // Add data
    chart.data = this.graphData;

    // Create axes
    var xAxis = chart.xAxes.push(new am4charts.ValueAxis());
    xAxis.min = 0;
    xAxis.max = chart.data[chart.data.length-1].x + 100;
    
    // Create value axis
    var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    var max = chart.data[0].y;
    var min = chart.data[0].y;
    for(var i=0;i<(chart.data.length);i++)
    {
      if(chart.data[i].y >max)
      {
        max = chart.data[i].y;
      }
      if(chart.data[i].y <min)
      {
        min = chart.data[i].y;
      }
    }

    yAxis.min = min - 1000;
    yAxis.max = max + 1000;
    
    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "y";
    series.dataFields.valueX = "x";
    series.strokeWidth = 3;
    series.tooltipText = "{valueY.value}";
    series.fillOpacity = 0.1;
   

    var range = yAxis.createSeriesRange(series);
    range.value = 0;
    range.endValue = 999999999;
    range.contents.stroke = am4core.color("#008000");
    range.contents.fill = range.contents.stroke;
    range.contents.strokeOpacity = 0.7;
    range.contents.fillOpacity = 0.1;

    //titles
    xAxis.title.text = "Underlying Price (र)";
    xAxis.title.fontWeight = "bold";

    yAxis.title.text = "Profit/Loss";
    yAxis.title.fontWeight = "bold";


    //scrollbars
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = xAxis;
    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();

    this.chart = chart;

}


  clearSelections(){  //to clear selected derivatives
    this.completeTableData = [];
    this.partialTableData = [];
    this.graphData = [];
    this.maxLoss = 0;
    this.maxProfit = 0;
    this.Breakevens = [];

    if (this.chart) {
      this.chart.dispose();
    }
  }

  addSelection(){ //to add the input derivative in user holding table
    let inputData  = new AddNewHoldings();
    inputData.numLots = this.postData.quantity;
    inputData.symbol = this.selectedSecurity["label"];
    inputData.position = this.selectedPosition;
    let temp = this.lotSize.split(" ",3);
    inputData.lotSize = temp[2];
    inputData.userId = emailId;

    let tempInstrument = this.selectedInstrument["label"].split(" ", 4);
    inputData.expiryDate = tempInstrument[0];
    if(tempInstrument[2]==="FUT")
      inputData.strikePrice="0";
    else
      inputData.strikePrice = tempInstrument[1];
    inputData.type = tempInstrument[2];

    inputData.price = this.postData.price;
    console.log(inputData);

    this.analysisService.sendUserHolding(inputData).subscribe(res=>{
      this.message = res;
      console.log("after add");
      console.log(this.message);
      setHoldings(this.message.userHoldings);
      setGain(this.message.gain, this.message.gainPercentage);
      //userHoldings = tempx;
      console.log(this.message.gainList);
      console.log(gain);
    });

  }

  setFields(){  //set placefolders for all the fields
    if(this.selectedInstrument){
      let tempInstrument = this.selectedInstrument["label"].split(" ", 4);
        tempInstrument = tempInstrument[3].split("(", 2);
        tempInstrument = tempInstrument[1].split(")",2);
        this.setPrice = tempInstrument[0];
      
      this.setQuantity = 1;
      this.selectedPosition = "LONG";
      this.disableButton = false;
    }

  }
}
