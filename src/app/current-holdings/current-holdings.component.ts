import { Component, OnInit } from '@angular/core';
import { Derivative } from '../Classes/Dervivative';
import { DataService } from '../data.service';

@Component({
  selector: 'app-current-holdings',
  templateUrl: './current-holdings.component.html',
  styleUrls: ['./current-holdings.component.scss']
})
export class CurrentHoldingsComponent implements OnInit {

  holdings : Derivative[];
  cols : any[];
  selectedHoldings : Derivative[];

  constructor(
    private derivativeService: DataService
    ) {
      this.holdings = this.derivativeService.getUserHoldings();
     }

  ngOnInit() {


    this.cols = [
        { field: 'symbol', header: 'Symbol' },
        { field: 'expiryDate', header: 'Instrument' },
        { field: 'quantity', header: 'Quantity' },
        { field: 'avgPrice', header: 'Average Price' },
        { field: 'ltp', header: 'LTP' },
        { field: 'currValue', header: 'Current Value' },
        { field: 'pl', header: 'Profit/Loss' },
        { field: 'per_change', header: '% Change' }
    ];
  }

}
