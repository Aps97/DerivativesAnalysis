import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  holdings = [
    {symbol : "hello",
    expiryDate : "date",
	  type : "call",
	  strikePrice : 4.4,
	  quantity :45,
    avgPrice : 10.5,
    ltp : 3,
    currValue : 34,
    pl : 37,
    per_change : 67},

    {symbol : "hello",
    expiryDate : "date",
	  type : "call",
	  strikePrice : 8.4,
	  quantity :45,
    avgPrice : 12.5,
    ltp : 3,
    currValue : 34,
    pl : 37,
    per_change : 67},

    {symbol : "bye",
    expiryDate : "date",
	  type : "call",
	  strikePrice : 4.4,
	  quantity :45,
    avgPrice : 12.5,
    ltp : 3,
    currValue : 34,
    pl : 37,
    per_change : 67},

    {symbol : "bye",
    expiryDate : "date",
	  type : "call",
	  strikePrice : 4.4,
	  quantity :45,
    avgPrice : 12.5,
    ltp : 3,
    currValue : 34,
    pl : 37,
    per_change : 67},

    {symbol : "bye",
    expiryDate : "date",
	  type : "call",
	  strikePrice : 4.4,
	  quantity :45,
    avgPrice : 12.5,
    ltp : 3,
    currValue : 34,
    pl : 37,
    per_change : 67},

    {symbol : "hello",
    expiryDate : "date",
	  type : "call",
	  strikePrice : 4.4,
	  quantity :45,
    avgPrice : 12.5,
    ltp : 3,
    currValue : 34,
    pl : 37,
    per_change : 67},

    {symbol : "hello",
    expiryDate : "date",
	  type : "call",
	  strikePrice : 4.4,
	  quantity :45,
    avgPrice : 12.5,
    ltp : 3,
    currValue : 34,
    pl : 37,
    per_change : 67}
  ];

  constructor() { }

  getUserHoldings(){
    return this.holdings;
  }
}
