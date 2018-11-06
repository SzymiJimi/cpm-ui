import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import {Subject} from 'rxjs';
import {UserService} from './user.service';

@Injectable()
export class AppService {

  authenticated = false;
  authenticatedSubject: Subject<boolean> = new Subject();
  headers: HttpHeaders;

  options;

  constructor() {
  }

  changeAuthenticated(value: boolean){
    this.authenticated = value;
    this.authenticatedSubject.next(value);
  }

  setHeadersAndOptions(){
    this.headers = new HttpHeaders({
      'Authorization': 'Basic ' + sessionStorage.getItem('token')
    });
    this.options = {observe: 'response', headers: this.headers, responseType: 'json'};
  }

}
