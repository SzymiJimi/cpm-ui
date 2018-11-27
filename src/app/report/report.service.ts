import { Injectable } from '@angular/core';
import {ItemModel} from '../shared/models/item.model';
import {ReportModel} from '../shared/models/report.model';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AppService} from '../shared/services/app.service';
import {UserService} from '../shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient,
              private app: AppService,
              private user: UserService) { }

  reportItem(report: ReportModel): Observable<string> {
    return new Observable<string>((observer) => {
      let newHeader = this.app.options;
      newHeader.responseType = 'text';
      this.http.post(environment.endpointBase + 'report/new',report, this.app.options).subscribe(res => {
          newHeader.responseType = 'json';
          observer.next(res['body']);
          observer.complete();
        },
        error => {
          newHeader.responseType = 'json';
          observer.error(error['body']);
          observer.complete();
        }
      );
    });
  }

  getUserReports(): Observable<ReportModel[]> {
    return new Observable<ReportModel[]>((observer) => {
      this.http.get(environment.endpointBase + 'user/reports', this.app.options).subscribe(res => {
          observer.next(res['body'] as ReportModel[]);
          observer.complete();
        },
        error => {
          if (error.status == 401) {
            observer.error('unauthorized');
          }
          observer.complete();
        }
      );
    });
  }
}
