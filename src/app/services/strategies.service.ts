import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { strategyInput } from '../strategy-builder-component/strategy-builder-component.component';

@Injectable({
  providedIn: 'root'
})
export class StrategyService {

  strategies = [
  ];

  constructor( private httpService: HttpClient ) { }

  getStrategies(selectedStrategy: strategyInput) {
    return this.httpService.post('http://localhost:8082/DerivativeAnalysis/rest/strategyservlet', selectedStrategy).pipe(map(result => result));
  }

  // getStrategiesData() {
  //   return this.httpService.get('http://127.0.0.1:5000/holdings').pipe(map(result => result));
  // }

  // sendUserInput(postData: Strategies) {
  //   return this.httpService.post('http://127.0.0.1:5000/postdata', postData).subscribe(res => {
  //     console.log(res);
  //   }, err => (console.log('Error..')) );
  // }

  // sendFormInput(formdata: FormData) {
  //   return this.httpService.post('http://127.0.0.1:5000/filedata', formdata).subscribe(res => {
  //     console.log(res);
  //   }, err => (console.log('Error..')) );
  // }
}
