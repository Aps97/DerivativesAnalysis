import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Renderer2, Inject } from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.scss']
})

export class DashboardComponentComponent implements OnInit {

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


  constructor(private derivativeService: DataService, private renderer2: Renderer2, @Inject(DOCUMENT) private _document) {
    //this.holdings = this.derivativeService.getUserHoldings();
  }

  ngOnInit() {
    this.generateChart();
    // const s = this.renderer2.createElement('script');
    // s.type = 'text/javascript';
    // s.src = './marketwidget.js';
    // s.text = ``;
    // this.renderer2.appendChild(this._document.body, s);
  }

  generateChart() {
    this.dashChart = new Chart('dashChart', {
      type: 'line',
      data: {
        labels: ['20/08', '21/08', '22/08', '23/08', '24/08', '25/08', '26/08', '27/08', '28/08', '29/08', '30/08', '31/08'],
        datasets: [
            {
                label: 'Net',
                data: [65, 59, 80, 81, 56, -15, -40, -5, 29, 30, 81, 56],
                lineTension: 0
              }
          ]
      },
      options: {
        title: {
            display: true,
            text: 'Holdings Summary',
            fontSize: 16
        },
      //   plugins: [{
      //     beforeRender(x, options) {
      //         const c = x.chart;
      //         const dataset = x.data.datasets[0];
      //         const yScale = x.scales['y-axis-0'];
      //         const yPos = yScale.getPixelForValue(0);

      //         const gradientFill = c.ctx.createLinearGradient(0, 0, 0, c.height);
      //         gradientFill.addColorStop(0, 'green');
      //         gradientFill.addColorStop(yPos / c.height - 0.01, 'green');
      //         gradientFill.addColorStop(yPos / c.height + 0.01, 'red');
      //         gradientFill.addColorStop(1, 'red');

      //         const model = x.data.datasets[0]._meta[Object.keys(dataset._meta)[0]].dataset._model;
      //         model.backgroundColor = gradientFill;
      //     }
      // }]
    }
  });
  }

}
