import { Injectable } from '@angular/core';
import {ItemModel} from '../shared/models/item.model';
import {ReportModel} from '../shared/models/report.model';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AppService} from '../shared/services/app.service';
import {UserService} from '../shared/services/user.service';
import {ConfirmDialogData} from '../shared/interfaces/confirm-dialog-data.interface';
import {DatetimePipe} from '../shared/pipes/datetime.pipe';
import {DatePipe, formatDate} from '@angular/common';


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

  getAllReports(): Observable<ReportModel[]> {
    return new Observable<ReportModel[]>((observer) => {
      this.http.get(environment.endpointBase + 'reports', this.app.options).subscribe(res => {
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


  getSingleReport(id: number): Observable<ReportModel> {
    return new Observable<ReportModel>((observer) => {
      this.http.get(environment.endpointBase + 'report/'+id, this.app.options).subscribe(res => {
          observer.next(res['body'] as ReportModel);
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

  considerReport(id: number){
    return new Observable<ReportModel>((observer) => {
      this.http.get(environment.endpointBase + 'report/consider/'+id, this.app.options).subscribe(res => {
          observer.next(res['body'] as ReportModel);
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

  finishReport(report: ReportModel, message: string){
    report = this.addFinishMessage(report, message);
    return new Observable<ReportModel>((observer) => {
      let newHeader = this.app.options;
      newHeader.responseType = 'text';
      this.http.post(environment.endpointBase + 'report/finish', report ,this.app.options).subscribe(res => {
          newHeader.responseType = 'json';
          observer.next(res['body'] as ReportModel);
          observer.complete();
        },
        error => {
          newHeader.responseType = 'json';
          if (error.status == 401) {
            observer.error('unauthorized');
          }
          observer.complete();
        }
      );
    });
  }

  private addFinishMessage(report: ReportModel , message: string): ReportModel{
    let todayDate = Date.now();
    let dateString: string;
    dateString = formatDate(todayDate, 'yyyy-MM-dd HH:mm:ss', 'en_US');
    report.description = report.description
                        + ' // On: '
                        + new DatetimePipe().transform(dateString)
                        + '  '
                        + this.user.user.personal_data.name
                        + ' '
                        + this.user.user.personal_data.surname
                        + ' wrote: '+ message;
    return report;
  }
}
