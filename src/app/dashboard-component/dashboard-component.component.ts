import { DataService } from './../services/data.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Chart } from 'chart.js';
import { Renderer2, Inject } from '@angular/core';
import {DOCUMENT} from '@angular/common';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_material from '@amcharts/amcharts4/themes/material.js';
import { emailId } from '../login/login.component';
import * as postscribe from 'postscribe';

am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);

let widgetscript = `<script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js" async>
  {
  "colorTheme": "light",
  "dateRange": "12m",
  "showChart": true,
  "locale": "in",
  "largeChartUrl": "",
  "isTransparent": false,
  "width": "400",
  "height": "660",
  "plotLineColorGrowing": "rgba(33, 150, 243, 1)",
  "plotLineColorFalling": "rgba(33, 150, 243, 1)",
  "gridLineColor": "rgba(240, 243, 250, 1)",
  "scaleFontColor": "rgba(120, 123, 134, 1)",
  "belowLineFillColorGrowing": "rgba(111, 168, 220, 0.12)",
  "belowLineFillColorFalling": "rgba(111, 168, 220, 0.12)",
  "symbolActiveColor": "rgba(33, 150, 243, 0.12)",
  "tabs": [
    {
      "title": "Indices",
      "symbols": [
        {
          "s": "BSE:SENSEX",
          "d": "SENSEX"
        },
        {
          "s": "BSE:HDFCBANK",
          "d": "HDFCBANK"
        },
        {
          "s": "BSE:INFY",
          "d": "INFY"
        },
        {
          "s": "BSE:ITC",
          "d": "ITC"
        },
        {
          "s": "BSE:RELIANCE",
          "d": "RELIANCE"
        },
        {
          "s": "BSE:SUNPHARMA",
          "d": "SUNPHARMA"
        }
      ],
      "originalTitle": "Indices"
    }
  ]
}
</script>`;


@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.scss']
})

export class DashboardComponentComponent implements OnInit {

private chart: am4charts.TreeMap;
  temp: any;
  data: any;
  options: any;
  dashChart: [];

  holdings: any;
  cols = [
    { field: 'instrument', header: 'Instrument' },
    { field: 'avgp', header: 'Average Price' },
    { field: 'ltp', header: 'Latest Traded Price' },
    { field: 'quantity', header: 'Quantity' },
    { field: 'gain', header: 'Gain' },
    { field: 'gainp', header: 'Gain %' },
  ];
  selectedHoldings: any[] = [];


  constructor(private zone: NgZone, private dashboardService: DataService, private renderer2: Renderer2, @Inject(DOCUMENT) private _document) {
    // this.holdings = this.derivativeService.getUserHoldings();
  }

  ngAfterViewInit() {

  }

   generateChart() {
    // var data1 = this.temp;
    // var data = data1["totalValue"];
    // console.log(data1["totalValue"]);

    // let data = {
    //    "ITC" : {"Profit":2000, "Loss":5000},
    //    "HDFCBANK" : {"Profit":5000, "Loss":5000}
    // }

    const data = {
        // "Acura": { "ILX": 11757, "MDX": 54886, "NSX": 581, "RDX": 51295, "RLX": 1237, "TLX": 34846 },
        // "Alfa Romeo": { "4C": 407, "Giulia": 8903, "Stelvio": 2721 }

        'ITC': {'NetPL': 3000},
        'HDFCBANK': {'NetPL': 5000}
    };


    // let chart = am4core.create("chartdiv", am4charts.TreeMap);
    // chart.colors.step = 2;

    // chart.data = [{
    //     name: "NetPL",
    //     children: [
    //       {
    //         name : "ITC",
    //         value: 200
    //       }
    //     ] },
    //     {
    //     name: "NetPL",
    //     children: [
    //         {
    //         name : "HDFCBANK",
    //         value: 600
    //         }
    //     ]

    //   }];
    // define data fields
    function processData(data) {
        const treeData = [];

        const smallBrands = { name: 'Other', children: [] };

        for (let brand in data) {
          const brandData = { name: brand, children: [] };
          let brandTotal = 0;
          for (let model in data[brand]) {
            brandTotal += data[brand][model];
          }

          for (let model in data[brand]) {
            // do not add very small
            if (data[brand][model] > 100) {
              brandData.children.push({ name: model, count: data[brand][model] });
            }
          }

          // add to small brands if total number less than
          if (brandTotal > 100000) {
            treeData.push(brandData);
          } else {
            smallBrands.children.push(brandData);
          }

        }
        treeData.push(smallBrands);
        return treeData;
      }

      // create chart
    let chart = am4core.create('chartdiv', am4charts.TreeMap);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

      // only one level visible initially
    chart.maxLevels = 1;
      // define data fields
    chart.dataFields.value = 'count';
    chart.dataFields.name = 'name';
    chart.dataFields.children = 'children';
    chart.homeText = 'US Car Sales 2017';

      // enable navigation
    chart.navigationBar = new am4charts.NavigationBar();

      // level 0 series template
    let level0SeriesTemplate = chart.seriesTemplates.create('0');
    level0SeriesTemplate.strokeWidth = 2;

      // by default only current level series bullets are visible, but as we need brand bullets to be visible all the time, we modify it's hidden state
    level0SeriesTemplate.bulletsContainer.hiddenState.properties.opacity = 1;
    level0SeriesTemplate.bulletsContainer.hiddenState.properties.visible = true;
      // create hover state
    let columnTemplate = level0SeriesTemplate.columns.template;
    let hoverState = columnTemplate.states.create('hover');

      // darken
    hoverState.adapter.add('fill', function(fill, target) {
        if (fill instanceof am4core.Color) {
          return am4core.color(am4core.colors.brighten(fill.rgb, -0.2));
        }
        return fill;
      });

      // add logo
    let image = columnTemplate.createChild(am4core.Image);
    image.opacity = 0.15;
    image.align = 'center';
    image.valign = 'middle';
    image.width = am4core.percent(80);
    image.height = am4core.percent(80);

      // add adapter for href to load correct image
    //   image.adapter.add("href", function (href, target) {
    //     let dataItem = target.parent.dataItem;
    //     if (dataItem) {
    //       return "https://www.amcharts.com/lib/images/logos/" + dataItem.treeMapDataItem.name.toLowerCase() + ".png";
    //     }
    //   });

      // level1 series template
    let level1SeriesTemplate = chart.seriesTemplates.create('1');
    level1SeriesTemplate.columns.template.fillOpacity = 0;

    let bullet1 = level1SeriesTemplate.bullets.push(new am4charts.LabelBullet());
    bullet1.locationX = 0.5;
    bullet1.locationY = 0.5;
    bullet1.label.text = '{name}';
    bullet1.label.fill = am4core.color('#ffffff');

      // level2 series template
    let level2SeriesTemplate = chart.seriesTemplates.create('2');
    level2SeriesTemplate.columns.template.fillOpacity = 0;

    let bullet2 = level2SeriesTemplate.bullets.push(new am4charts.LabelBullet());
    bullet2.locationX = 0.5;
    bullet2.locationY = 0.5;
    bullet2.label.text = '{name}';
    bullet2.label.fill = am4core.color('#ffffff');

    chart.data = processData(data);
   }

  ngOnInit() {
    postscribe('#marketwidget', widgetscript);
    console.log(emailId);
    this.dashboardService.getValueFromUser(emailId).subscribe(res => {
        this.temp = res;
        this.generateChart();
      });
    // this.generateChart();
    // const s = this.renderer2.createElement('script');
    // s.type = 'text/javascript';
    // s.src = './marketwidget.js';
    // s.text = ``;
    // this.renderer2.appendChild(this._document.body, s);
  }

  // generateChart() {
  //   this.dashChart = new Chart('dashChart', {
  //     type: 'line',
  //     data: {
  //       labels: ['20/08', '21/08', '22/08', '23/08', '24/08', '25/08', '26/08', '27/08', '28/08', '29/08', '30/08', '31/08'],
  //       datasets: [
  //           {
  //               label: 'Net',
  //               data: [65, 59, 80, 81, 56, -15, -40, -5, 29, 30, 81, 56],
  //               lineTension: 0
  //             }
  //         ]
  //     },
  //     options: {
  //       title: {
  //           display: true,
  //           text: 'Holdings Summary',
  //           fontSize: 16
  //       },
  //     //   plugins: [{
  //     //     beforeRender(x, options) {
  //     //         const c = x.chart;
  //     //         const dataset = x.data.datasets[0];
  //     //         const yScale = x.scales['y-axis-0'];
  //     //         const yPos = yScale.getPixelForValue(0);

  //     //         const gradientFill = c.ctx.createLinearGradient(0, 0, 0, c.height);
  //     //         gradientFill.addColorStop(0, 'green');
  //     //         gradientFill.addColorStop(yPos / c.height - 0.01, 'green');
  //     //         gradientFill.addColorStop(yPos / c.height + 0.01, 'red');
  //     //         gradientFill.addColorStop(1, 'red');

  //     //         const model = x.data.datasets[0]._meta[Object.keys(dataset._meta)[0]].dataset._model;
  //     //         model.backgroundColor = gradientFill;
  //     //     }
  //     // }]
  //   }
  // });
  // }

}
