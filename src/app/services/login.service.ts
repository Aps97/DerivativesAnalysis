import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { User } from '../Classes/User';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpService: HttpClient) { }

  sendLoginRequest(postData: User) {
    console.log('Logging in...');
    return this.httpService.post('http://localhost:8082/DerivativeAnalysis/rest/login ', postData).pipe(map(res => res));
  }

  sendCreateRequest(postData: User) {
    console.log('Creating user...');
    return this.httpService.post('http://localhost:8082/DerivativeAnalysis/rest/create ', postData).pipe(map(res => res));
  }
}
