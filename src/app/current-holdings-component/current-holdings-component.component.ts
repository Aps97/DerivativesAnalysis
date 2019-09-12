import { Component, OnInit} from '@angular/core';
import { Derivative } from '../Classes/Dervivative';
import { DataService } from '../services/data.service';
import { Chart } from 'chart.js';
import { userHoldings, gain, gainPerc } from '../login/login.component';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material.js";
import { AnalysisTable } from '../analysis-component/analysis-component.component';
import { AnalysisData } from '../Classes/AnalysisData';
import { AddNewHoldings } from '../Classes/AddNewHolding';

@Component({
  selector: 'app-current-holdings',
  templateUrl: './current-holdings-component.component.html',
  styleUrls: ['./current-holdings-component.component.scss']
})
export class CurrentHoldingsComponentComponent implements OnInit {

  private chart: am4charts.XYChart;
  holdings : any;
  tableData : Derivative[] = [];
  cols : any[];
  selectedHolding : any;
  LineChart = [];
  graphData : any;
  // form: FormGroup;

  constructor(
    private derivativeService: DataService,
               //private formBuilder: FormBuilder
               ) {
      //this.holdings = this.derivativeService.getUserHoldings();
     }



  ngOnInit() {

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
        temp.position = this.holdings[x].position;
        temp.numLots = this.holdings[x].numLots;
        temp.ltp = this.holdings[x].ltp;
        temp.pl = gain[x];
        temp.per_change = gainPerc[x];
        this.tableData.push(temp);
    }

    this.cols = [
        { field: 'symbol', header: 'Symbol', width:'12.5%' },
        { field: 'instrument', header: 'Instrument', width:'15%' },
        { field: 'position', header: 'Position', width:'12.5%' },
        { field: 'numLots', header: 'Quantity', width:'12.5%' },
        { field: 'price', header: 'Price', width:'12%' },
        { field: 'ltp', header: 'LTP', width:'10.5%' },
        { field: 'pl', header: 'Profit/Loss', width:'12.5%' },
        { field: 'per_change', header: '% Change', width:'12.5%' }
    ];
  }

  selectedRow(){
    //console.log(this.selectedHoldings);
  }

  clearChart(){
    this.LineChart = [];
    this.selectedHolding = [];
  }

  createChart(){

    let temp = [];

    let chartData = new AddNewHoldings();

    chartData.price = this.selectedHolding.price.toString();
    chartData.quantity = this.selectedHolding.numLots.toString();
    chartData.symbol = this.selectedHolding.symbol;
    chartData.position = this.selectedHolding.position;
    chartData.lotSize = "";

    let temp2 = this.selectedHolding.instrument;
    let tempInstrument = temp2.split(" ", 3);

    chartData.expiryDate = tempInstrument[0];
    chartData.strikePrice = tempInstrument[1];
    chartData.type = tempInstrument[2];
    temp.push(chartData);

    let tempResult;

    this.derivativeService.sendAnalysisInput(temp).subscribe(res=>{
      tempResult = res;
      this.graphData = [];

      for(let i=0; i<tempResult.coordinatelist.length; i++){
        console.log("in graph loop");
        this.graphData.push(tempResult.coordinatelist[i]);
      }

      console.log(this.graphData);
      this.generateChart();
    });


  }

  generateChart(){
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    // Add data
    chart.data = this.graphData;
    console.log(chart.data);

    // Create axes
    var xAxis = chart.xAxes.push(new am4charts.ValueAxis());
    xAxis.renderer.minGridDistance = 40;
    xAxis.min = 0;
    xAxis.max =  10000;


    // Create value axis
    var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = -50000;
    yAxis.max = 50000;
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
    xAxis.title.text = "Underlying Price";
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
}

//   generateChart(){

//     let response;
//     let postData = this.selectedHoldings;
//     console.log(postData);
//     // this.derivativeService.sendHoldings_getChartData(postData).subscribe(result =>{
//     //     response = result;
//     // });

//     this.LineChart = new Chart('lineChart', {
//       type: 'line',
//       data: {
//         labels: ['start', 'mid', 'end'],
//         datasets: [{
//           label: 'Pay-Off Chart for selected holdings',
//           data: [
//             {x:-4, y: -1, indexLabel: "lowest", markerColor: "DarkSlateGrey", markerType: "cross"} , {x:4, y:-1}, {x:8, y:8}],
//           fill: false,
//           lineTension: 0,
//           borderColor: 'red',
//           borderWidth: 1
//         }]
//       },
//       options: {
//         title: {
//           text: 'Line Chart',
//           display: true
//         },
//         scales: {
//           yAxes: [{
//             ticks: {
//               beginAtZero: true
//             }
//           }]
//         }
//       }
//     });
//   }
