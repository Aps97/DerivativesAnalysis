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
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-current-holdings',
  templateUrl: './current-holdings-component.component.html',
  animations: [
    trigger('rowExpansionTrigger', [
        state('void', style({
            transform: 'translateX(-10%)',
            opacity: 0
        })),
        state('active', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
],
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

  constructor(
    private derivativeService: DataService
               ) {
      
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
        temp.ltp = this.holdings[x].spotPrice;
        temp.lcp = this.holdings[x].ltp;
        temp.pl = gain[x];
        temp.per_change = gainPerc[x];
        this.tableData.push(temp);
    }

    this.cols = [
        { field: 'symbol', header: 'Symbol', width:'12.5%' },
        { field: 'instrument', header: 'Instrument', width:'19%' },
        { field: 'position', header: 'Position', width:'12.5%' },
        { field: 'numLots', header: 'Quantity', width:'11.5%' },
        { field: 'price', header: 'Price(र)', width:'10%' },
        { field: 'lcp', header: 'LCP(र)', width:'9.5%' },
        { field: 'ltp', header: 'LTP(र)', width:'9.5%' },
        { field: 'pl', header: 'Profit/Loss(र)', width:'13.5%' },
        { field: 'per_change', header: '% Change', width:'12.5%' }
    ];
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

    console.log(temp);
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
    console.log(this.graphData);
    
    // Create axes
    var xAxis = chart.xAxes.push(new am4charts.ValueAxis());
    xAxis.min = 0;
    xAxis.max = chart.data[chart.data.length-1].x + 100;
    console.log("x min"+xAxis.min);
    console.log("x max"+xAxis.max);
    
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
    console.log("y min"+yAxis.min);
    console.log("y max"+yAxis.max);

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
    xAxis.title.text = "Underlying Price(र)";
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

