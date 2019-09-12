import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Derivative } from '../Classes/Dervivative';
import { AnalysisData } from '../Classes/AnalysisData';
import { AnalysisTable } from '../analysis-component/analysis-component.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private httpService: HttpClient ) { }

  getInstrumentsData(selectedSecurity: String) {
    console.log("inside instru");
    return this.httpService.post<Derivative[]>('http://localhost:8082/DerivativeAnalysis/rest/derivativelist', selectedSecurity).pipe(map(result => result));
  }

  sendUserHolding(holding: any) {
    return this.httpService.post('http://localhost:8082/DerivativeAnalysis/rest/senduserinput', holding).pipe(map(result => result));
    
  }

  sendUserInput(postData: Array<AnalysisData>) {
    return this.httpService.post('http://localhost:8082/DerivativeAnalysis/rest/generatepayoff', postData).subscribe(res => {
      console.log(res);
    }, err => (console.log('Error..')) );
  }

  getValueFromUser(userEmail : String){
    return this.httpService.post('http://localhost:8082/DerivativeAnalysis/rest/valuebyuser', userEmail).pipe(map(result => result));
  }



  // sendFormInput(formdata: FormData) {
  //   return this.httpService.post('http://127.0.0.1:5000/filedata', formdata).subscribe(res => {
  //     console.log(res);
  //   }, err => (console.log('Error..')) );
  // }

  sendAnalysisInput(postdata : any){
    return this.httpService.post('http://localhost:8082/DerivativeAnalysis/rest/generatepayoff', postdata).pipe(map(result => result));
  }
}
