import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class AppService {

  authenticated = false;
  headers: HttpHeaders = new HttpHeaders({
    'Authorization': 'Basic ' + sessionStorage.getItem('token')
  });

  options = { headers: this.headers };

  constructor() {
  }

}
