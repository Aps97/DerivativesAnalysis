import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Derivative } from '../Classes/Dervivative';
import { AnalysisData } from '../Classes/AnalysisData';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private httpService: HttpClient ) { }

  getInstrumentsData(selectedSecurity: String) {
    return this.httpService.post('http://localhost:8082/DerivativeAnalysis/rest/derivativelist', selectedSecurity).pipe(map(result => result));
  }

  sendHoldings_getChartData(holdings: Array<Derivative>) {
    return this.httpService.post('http://localhost:8082/DerivativeAnalysis/rest/sendholdings', holdings).pipe(map(result => result));
    
  }

  sendUserInput(postData: Derivative) {
    return this.httpService.post('http://127.0.0.1:5000/postdata', postData).subscribe(res => {
      console.log(res);
    }, err => (console.log('Error..')) );
  }




  // sendFormInput(formdata: FormData) {
  //   return this.httpService.post('http://127.0.0.1:5000/filedata', formdata).subscribe(res => {
  //     console.log(res);
  //   }, err => (console.log('Error..')) );
  // }

  sendAnalysisInput(postdata : AnalysisData){
    return this.httpService.post('http://localhost:8082/DerivativeAnalysis/rest/generatepayoff', postdata).pipe(map(result => result));
  }
}
