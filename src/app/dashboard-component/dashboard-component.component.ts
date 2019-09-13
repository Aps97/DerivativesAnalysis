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

const widgetscript = `<script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js" async>
  {
  "colorTheme": "light",
  "dateRange": "12m",
  "showChart": true,
  "locale": "in",
  "largeChartUrl": "",
  "isTransparent": false,
  "width": "400",
  "height": "420",
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


  constructor(private zone: NgZone, private dashboardService: DataService, private renderer2: Renderer2,
              @Inject(DOCUMENT) private _document) {
    // this.holdings = this.derivativeService.getUserHoldings();
  }

  ngAfterViewInit() {
    // postscribe('#marketwidget', widgetscript);
  }

   generateChart() {

    let data = {
      "Acura": { "ILX": 11757, "MDX": 54886, "NSX": 581, "RDX": 51295, "RLX": 1237, "TLX": 34846 },
      "Alfa Romeo": { "4C": 407, "Giulia": 8903, "Stelvio": 2721 },
      "Audi": { "A3": 20733, "A3 e-tron": 2877, "A4": 37674, "A5": 21301, "A6": 16304, "A7": 4810, "A8": 3127, "Q3": 20633, "Q5": 57640, "Q7": 38346, "R8": 772, "TT": 2294 },
      "Bentley": { "Bentayga": 1152, "Continental GT": 898, "Flying Spur": 257, "Mulsanne": 98 },
      "BMW": { "2-Series": 11737, "3-Series": 59449, "4-Series": 39634, "5-Series": 40658, "6-Series": 3355, "7-Series": 9276, "i3": 6276, "i8": 488, "X1": 30826, "X3": 40691, "X4": 5198, "X5": 50815, "X6": 6780, "Z4": 502 },
      "Buick": { "Cascada": 5595, "Enclave": 48564, "Encore": 88035, "Envision": 41040, "LaCrosse": 20161, "Regal": 11559, "Verano": 4277 },
      "Cadillac": { "ATS": 13100, "CT6": 10542, "CTS": 10344, "ELR": 17, "Escalade": 37694, "SRX": 156, "XT5": 68312, "XTS": 16275 },
      "Chevrolet": { "Bolt": 23297, "Camaro": 67940, "Caprice PPV": 693, "City Express": 8348, "Colorado": 112996, "Corvette": 25079, "Cruze": 184751, "Equinox": 290458, "Express": 69164, "Impala": 75877, "Malibu": 185857, "Silverado": 585864, "Sonic": 30290, "Spark": 22589, "SS": 4055, "Suburban": 56516, "Tahoe": 98961, "Traverse": 123506, "Trax": 79289, "Volt": 20349 },
      "Chrysler": { "200": 18457, "300": 51237, "Pacifica": 118274, "Town & Country": 577 },
      "Dodge": { "Avenger": 14, "Challenger": 64537, "Charger": 88351, "Dart": 10082, "Durango": 68761, "Grand Caravan": 125196, "Journey": 89470, "Viper": 585, "RAM P/U": 500723, "RAM ProMaster": 40483, "RAM ProMaster City": 15584 },
      "Fiat": { "124 Spider": 4478, "500": 12685, "500L": 1664, "500X": 7665 },
      "Ford": { "C-Max": 18390, "Edge": 142603, "Escape": 308296, "E-Series": 53304, "Expedition": 51883, "Explorer": 271131, "Fiesta": 46249, "Flex": 22389, "Focus": 158385, "F-Series": 896764, "Fusion": 209623, "GT": 89, "Mustang": 81866, "Taurus": 41236, "Transit": 127360, "Transit Connect": 34473 },
      "Genesis": { "G80": 16196, "G90": 4398 },
      "GMC": { "Acadia": 111276, "Canyon": 32106, "Savana": 29679, "Sierra": 217943, "Terrain": 85441, "Yukon": 49183, "Yukon XL": 35059 },
      "Honda": { "Accord": 322655, "Civic": 377286, "Clarity FCV": 2455, "Crosstour": 5, "CR-V": 377895, "CR-Z": 705, "Fit": 49454, "HR-V": 94034, "Insight": 3, "Odyssey": 100307, "Pilot": 127279, "Ridgeline": 34749 },
      "Hyundai": { "Accent": 58955, "Azera": 3060, "Elantra": 198210, "Equus": 20, "Genesis": 1152, "Ioniq": 11197, "Santa Fe": 133171, "Sonata": 131803, "Tucson": 114735, "Veloster": 12658 },
      "Infiniti": { "Q50": 40739, "Q60": 10751, "Q70": 5772, "QX30": 14093, "QX50": 16857, "QX60": 40444, "QX70": 6878, "QX80": 17881 },
      "Jaguar": { "F-Pace": 18946, "F-Type": 4108, "XE": 9278, "XF": 4541, "XJ": 2721 },
      "Jeep": { "Cherokee": 169882, "Compass": 83253, "Grand Cherokee": 240696, "Patriot": 10735, "Renegade": 103434, "Wrangler": 190522 },
      "Kia": { "Cadenza": 7249, "Forte": 117596, "K900": 455, "Niro": 27237, "Optima": 107493, "Rio": 16760, "Sedona": 23815, "Sorento": 99684, "Soul": 115712, "Sportage": 72824, "Stinger": 843 },
      "Land Rover": { "Discovery / LR4": 6398, "Discovery Sport": 14187, "Range Rover": 16869, "Range Rover Evoque": 11979, "Range Rover Sport": 19153, "Range Rover Velar": 6153 },
      "Lexus": { "CT": 4690, "ES": 51398, "GS": 7773, "GX": 27190, "IS": 26482, "LC": 2487, "LFA": 3, "LS": 4094, "LX": 6004, "NX": 59341, "RC": 7363, "RX": 108307 },
      "Lincoln": { "Continental": 12012, "MKC": 27048, "MKS": 153, "MKT": 3005, "MKX": 31031, "MKZ": 27387, "Navigator": 10523 },
      "Maserati": { "Ghibli": 5531, "GranTurismo": 1018, "Levante": 5448, "Quattroporte": 1700 },
      "Mazda": { "3": 75018, "5": 10, "6": 33402, "CX-3": 16355, "CX-5": 127563, "CX-9": 25828, "MX-5 Miata": 11294 },
      "Mercedes-Benz": { "B-Class": 744, "C-Class": 77447, "CLA-Class": 20669, "E / CLS-Class": 51312, "G-Class": 4188, "GLA-Class": 24104, "GLC-Class": 48643, "GLE-Class": 54595, "GLS-Class": 32248, "Metris": 7579, "S-Class": 15888, "SLC-Class": 2860, "SL-Class": 2940, "Sprinter": 27415 },
      "Mini": { "Cooper": 32232, "Countryman": 14864, "Paceman": 9 },
      "Mitsubishi": { "i MiEV": 6, "Lancer": 12725, "Mirage": 22386, "Outlander": 35310, "Outlander PHEV": 99, "Outlander Sport": 33160 },
      "Nissan": { "370Z": 4614, "Altima": 254996, "Armada": 35667, "Frontier": 74360, "GT-R": 578, "Juke": 10157, "Leaf": 11230, "Maxima": 67627, "Murano": 76732, "NV": 17858, "NV200": 18602, "Pathfinder": 81065, "Quest": 4950, "Rogue": 403465, "Sentra": 218451, "Titan": 52924, "Versa": 106772, "Xterra": 1 },
      "Porsche": { "911": 8970, "Boxster": 2287, "Cayenne": 13203, "Cayman": 2800, "Macan": 21429, "Panamera": 6431 },
      "Smart": { "Fortwo": 3071 },
      "Subaru": { "BRZ": 4131, "Crosstrek": 110138, "Forester": 177563, "Impreza": 117401, "Legacy": 49837, "Outback": 188886 },
      "Tesla": { "Model 3": 2320, "Model S †": 28800, "Model X †": 24000 },
      "Toyota": { "4Runner": 128296, "86/Scion FR-S": 6846, "Avalon": 32583, "Camry": 387081, "C-HR": 25755, "Corolla": 329196, "FJ Cruiser": 4, "Highlander": 215775, "Land Cruiser": 3100, "Mirai": 1838, "Prius": 108662, "RAV4": 407594, "Sequoia": 12156, "Sienna": 111489, "Tacoma": 198124, "Tundra": 116285, "Venza": 14, "Yaris": 44380 },
      "Volkswagen": { "Atlas": 27119, "Beetle": 15166, "CC": 1355, "Eos": 1, "Golf": 68978, "Jetta": 115807, "Passat": 60722, "Tiguan": 46983, "Touareg": 3545 },
      "Volvo": { "S60": 16825, "S80": 7, "S90": 11090, "XC60": 22516, "XC90": 30996 }
    }

    function processData(data) {
      let treeData = [];

      let smallBrands = { name: "Other", children: [] };

      for (var brand in data) {
        let brandData = { name: brand, children: [] }
        let brandTotal = 0;
        for (var model in data[brand]) {
          brandTotal += data[brand][model];
        }

        for (var model in data[brand]) {
          // do not add very small
          if (data[brand][model] > 100) {
            brandData.children.push({ name: model, count: data[brand][model] });
          }
        }

        // add to small brands if total number less than
        if (brandTotal > 100000) {
          treeData.push(brandData);
        }
        else {
          smallBrands.children.push(brandData)
        }

      }
      treeData.push(smallBrands);
      return treeData;
    }

    // create chart
    let chart = am4core.create("chartdiv", am4charts.TreeMap);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

    // only one level visible initially
    chart.maxLevels = 1;
    // define data fields
    chart.dataFields.value = "count";
    chart.dataFields.name = "name";
    chart.dataFields.children = "children";
    chart.homeText = "US Car Sales 2017";

    // enable navigation
    chart.navigationBar = new am4charts.NavigationBar();

    // level 0 series template
    let level0SeriesTemplate = chart.seriesTemplates.create("0");
    level0SeriesTemplate.strokeWidth = 2;

    // by default only current level series bullets are visible, but as we need brand bullets to be visible all the time, we modify it's hidden state
    level0SeriesTemplate.bulletsContainer.hiddenState.properties.opacity = 1;
    level0SeriesTemplate.bulletsContainer.hiddenState.properties.visible = true;
    // create hover state
    let columnTemplate = level0SeriesTemplate.columns.template;
    let hoverState = columnTemplate.states.create("hover");

    // darken
    hoverState.adapter.add("fill", function (fill, target) {
      if (fill instanceof am4core.Color) {
        return am4core.color(am4core.colors.brighten(fill.rgb, -0.2));
      }
      return fill;
    })

    // add logo
    let image = columnTemplate.createChild(am4core.Image);
    image.opacity = 0.15;
    image.align = "center";
    image.valign = "middle";
    image.width = am4core.percent(80);
    image.height = am4core.percent(80);

    // add adapter for href to load correct image
    // image.adapter.add("href", function (href, target) {
    //   let dataItem = target.parent.dataItem;
    //   if (dataItem) {
    //     return "https://www.amcharts.com/lib/images/logos/" + dataItem.treeMapDataItem.name.toLowerCase() + ".png";
    //   }
    // });

    // level1 series template
    let level1SeriesTemplate = chart.seriesTemplates.create("1");
    level1SeriesTemplate.columns.template.fillOpacity = 0;

    let bullet1 = level1SeriesTemplate.bullets.push(new am4charts.LabelBullet());
    bullet1.locationX = 0.5;
    bullet1.locationY = 0.5;
    bullet1.label.text = "{name}";
    bullet1.label.fill = am4core.color("#ffffff");

    // level2 series template
    let level2SeriesTemplate = chart.seriesTemplates.create("2");
    level2SeriesTemplate.columns.template.fillOpacity = 0;

    let bullet2 = level2SeriesTemplate.bullets.push(new am4charts.LabelBullet());
    bullet2.locationX = 0.5;
    bullet2.locationY = 0.5;
    bullet2.label.text = "{name}";
    bullet2.label.fill = am4core.color("#ffffff");

    chart.data = processData(data);
   }

  ngOnInit() {
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
