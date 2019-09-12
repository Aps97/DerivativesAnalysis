import { Component, OnInit, NgZone } from '@angular/core';
import { Derivative } from '../Classes/Dervivative';
import { DataService } from '../services/data.service';
import { Chart } from 'chart.js';
import { userHoldings, gain, gainPerc } from '../login/login.component';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material.js";


am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-current-holdings',
  templateUrl: './current-holdings-component.component.html',
  styleUrls: ['./current-holdings-component.component.scss']
})
export class CurrentHoldingsComponentComponent implements OnInit {

  // private chart: am4charts.XYChart;

  holdings : any;
  tableData : Derivative[] = [];
  cols : any[];
  selectedHoldings : any = [];
  LineChart = [];
  // form: FormGroup;

  constructor(  private zone: NgZone,
    private derivativeService: DataService,
               //private formBuilder: FormBuilder
               ) {
      //this.holdings = this.derivativeService.getUserHoldings();
     }

    ngAfterViewInit() {
     this.generateChart();
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
        temp.pl = 0;
        temp.per_change = 0;
        //temp.pl = gain[x];
        //temp.per_change = gainPerc[x];
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

  //   let response;
  //   let postData = this.selectedHoldings;
  //   // this.derivativeService.sendHoldings_getChartData(postData).subscribe(result =>{
  //   //     response = result;
  //   // });

  //   this.LineChart = new Chart('lineChart', {
  //     type: 'line',
  //     data: {
  //       labels: ['start', 'mid', 'end'],
  //       datasets: [{
  //         label: 'Pay-Off Chart for selected holdings',
  //         data: [
  //           {x:-4, y: -1, indexLabel: "lowest", markerColor: "DarkSlateGrey", markerType: "cross"} , {x:4, y:-1}, {x:8, y:8}],
  //         fill: false,
  //         lineTension: 0,
  //         borderColor: 'red',
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       title: {
  //         text: 'Line Chart',
  //         display: true
  //       },
  //       scales: {
  //         yAxes: [{
  //           ticks: {
  //             beginAtZero: true
  //           }
  //         }]
  //       }
  //     }
  //   });

  // let chart = am4core.create("chartdiv", am4charts.XYChart);

  var data = [{
    "country": "Dummy",
    "disabled": true,
    "litres": 1000,
    "color": am4core.color("#dadada"),
    "opacity": 0.3,
    "strokeDasharray": "4,4"
}, {
    "country": "Lithuania",
    "litres": 501.9
}, {
    "country": "Estonia",
    "litres": 301.9
}, {
    "country": "Ireland",
    "litres": 201.1
}, {
    "country": "Germany",
    "litres": 165.8
}, {
    "country": "Australia",
    "litres": 139.9
}, {
    "country": "Austria",
    "litres": 128.3
}];


let container = am4core.create("chartdiv", am4core.Container);
container.width = am4core.percent(100);
container.height = am4core.percent(100);
container.layout = "horizontal";

container.events.on("maxsizechanged", function () {
    chart1.zIndex = 0;
    separatorLine.zIndex = 1;
    dragText.zIndex = 2;
    chart2.zIndex = 3;
})

let chart1 = container.createChild(am4charts.PieChart);
chart1 .fontSize = 11;
chart1.hiddenState.properties.opacity = 0; // this makes initial fade in effect
chart1.data = data;
chart1.radius = am4core.percent(70);
chart1.innerRadius = am4core.percent(40);
chart1.zIndex = 1;

let series1 = chart1.series.push(new am4charts.PieSeries());
series1.dataFields.value = "litres";
series1.dataFields.category = "country";
series1.colors.step = 2;
series1.alignLabels = false;
series1.labels.template.bent = true;
series1.labels.template.radius = 3;
series1.labels.template.padding(0,0,0,0);

let sliceTemplate1 = series1.slices.template;
sliceTemplate1.cornerRadius = 5;
sliceTemplate1.draggable = true;
sliceTemplate1.inert = true;
sliceTemplate1.propertyFields.fill = "color";
sliceTemplate1.propertyFields.fillOpacity = "opacity";
sliceTemplate1.propertyFields.stroke = "color";
sliceTemplate1.propertyFields.strokeDasharray = "strokeDasharray";
sliceTemplate1.strokeWidth = 1;
sliceTemplate1.strokeOpacity = 1;

let zIndex = 5;

// sliceTemplate1.events.on("down", function (event) {
//     event.target.toFront();
//     // also put chart to front
//     let series = event.target.dataItem.component;
//     series.chart.zIndex = zIndex++;
// })

series1.ticks.template.disabled = true;

sliceTemplate1.states.getKey("active").properties.shiftRadius = 0;

sliceTemplate1.events.on("dragstop", function (event) {
    handleDragStop(event);
})

// separator line and text
let separatorLine = container.createChild(am4core.Line);
separatorLine.x1 = 0;
separatorLine.y2 = 300;
separatorLine.strokeWidth = 3;
separatorLine.stroke = am4core.color("#dadada");
separatorLine.valign = "middle";
separatorLine.strokeDasharray = "5,5";


let dragText = container.createChild(am4core.Label);
dragText.text = "Drag slices over the line";
dragText.rotation = 90;
dragText.valign = "middle";
dragText.align = "center";
dragText.paddingBottom = 5;

// second chart
let chart2 = container.createChild(am4charts.PieChart);
chart2.hiddenState.properties.opacity = 0; // this makes initial fade in effect
chart2 .fontSize = 11;
chart2.radius = am4core.percent(70);
chart2.data = data;
chart2.innerRadius = am4core.percent(40);
chart2.zIndex = 1;

let series2 = chart2.series.push(new am4charts.PieSeries());
series2.dataFields.value = "litres";
series2.dataFields.category = "country";
series2.colors.step = 2;

series2.alignLabels = false;
series2.labels.template.bent = true;
series2.labels.template.radius = 3;
series2.labels.template.padding(0,0,0,0);
series2.labels.template.propertyFields.disabled = "disabled";

let sliceTemplate2 = series2.slices.template;
sliceTemplate2.copyFrom(sliceTemplate1);

series2.ticks.template.disabled = true;

function handleDragStop(event) {
    let targetSlice = event.target;
    let dataItem1;
    let dataItem2;
    let slice1;
    let slice2;

    if (series1.slices.indexOf(targetSlice) != -1) {
        slice1 = targetSlice;
        slice2 = series2.dataItems.getIndex(targetSlice.dataItem.index).slice;
    }
    else if (series2.slices.indexOf(targetSlice) != -1) {
        slice1 = series1.dataItems.getIndex(targetSlice.dataItem.index).slice;
        slice2 = targetSlice;
    }


    dataItem1 = slice1.dataItem;
    dataItem2 = slice2.dataItem;

    let series1Center = am4core.utils.spritePointToSvg({ x: 0, y: 0 }, series1.slicesContainer);
    let series2Center = am4core.utils.spritePointToSvg({ x: 0, y: 0 }, series2.slicesContainer);

    let series1CenterConverted = am4core.utils.svgPointToSprite(series1Center, series2.slicesContainer);
    let series2CenterConverted = am4core.utils.svgPointToSprite(series2Center, series1.slicesContainer);

    // tooltipY and tooltipY are in the middle of the slice, so we use them to avoid extra calculations
    let targetSlicePoint = am4core.utils.spritePointToSvg({ x: targetSlice.tooltipX, y: targetSlice.tooltipY }, targetSlice);

    if (targetSlice == slice1) {
        if (targetSlicePoint.x > container.pixelWidth / 2) {
            let value = dataItem1.value;

            dataItem1.hide();

            let animation = slice1.animate([{ property: "x", to: series2CenterConverted.x }, { property: "y", to: series2CenterConverted.y }], 400);
            animation.events.on("animationprogress", function (event) {
                slice1.hideTooltip();
            })

            slice2.x = 0;
            slice2.y = 0;

            dataItem2.show();
        }
        else {
            slice1.animate([{ property: "x", to: 0 }, { property: "y", to: 0 }], 400);
        }
    }
    if (targetSlice == slice2) {
        if (targetSlicePoint.x < container.pixelWidth / 2) {

            let value = dataItem2.value;

            dataItem2.hide();

            let animation = slice2.animate([{ property: "x", to: series1CenterConverted.x }, { property: "y", to: series1CenterConverted.y }], 400);
            animation.events.on("animationprogress", function (event) {
                slice2.hideTooltip();
            })

            slice1.x = 0;
            slice1.y = 0;
            dataItem1.show();
        }
        else {
            slice2.animate([{ property: "x", to: 0 }, { property: "y", to: 0 }], 400);
        }
    }

    toggleDummySlice(series1);
    toggleDummySlice(series2);

    series1.hideTooltip();
    series2.hideTooltip();
}

function toggleDummySlice(series) {
    let show = true;
    for (var i = 1; i < series.dataItems.length; i++) {
        let dataItem = series.dataItems.getIndex(i);
        if (dataItem.slice.visible && !dataItem.slice.isHiding) {
            show = false;
        }
    }

    let dummySlice = series.dataItems.getIndex(0);
    if (show) {
        dummySlice.show();
    }
    else {
        dummySlice.hide();
    }
}

series2.events.on("datavalidated", function () {

    let dummyDataItem = series2.dataItems.getIndex(0);
    dummyDataItem.show(0);
    dummyDataItem.slice.draggable = false;
    dummyDataItem.slice.tooltipText = undefined;

    for (var i = 1; i < series2.dataItems.length; i++) {
        series2.dataItems.getIndex(i).hide(0);
    }
})

series1.events.on("datavalidated", function () {
    let dummyDataItem = series1.dataItems.getIndex(0);
    dummyDataItem.hide(0);
    dummyDataItem.slice.draggable = false;
    dummyDataItem.slice.tooltipText = undefined;
})
   }
}
