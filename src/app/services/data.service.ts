import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Derivative } from '../Classes/Dervivative';

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

  constructor( private httpService: HttpClient ) { }

  getUserHoldings(){
    //temporary function
    return this.holdings;
  }

  getHoldingsData() {
    return this.httpService.get('http://127.0.0.1:5000/holdings').pipe(map(result => result));
  }

  sendUserInput(postData: Derivative) {
    return this.httpService.post('http://127.0.0.1:5000/postdata', postData).subscribe(res => {
      console.log(res);
    }, err => (console.log('Error..')) );
  }

  sendFormInput(formdata: FormData) {
    return this.httpService.post('http://127.0.0.1:5000/filedata', formdata).subscribe(res => {
      console.log(res);
    }, err => (console.log('Error..')) );
  }
}
