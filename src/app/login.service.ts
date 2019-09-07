import { Injectable } from '@angular/core';
import { User } from './Classes/User';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private httpService: HttpClient) { }

  sendLoginRequest(postData: User) {
    return this.httpService.post('http://127.0.0.1:5000/postdata', postData).subscribe(res => {
      console.log(res);
    }, err => (console.log('Error..')) );
  }
}
