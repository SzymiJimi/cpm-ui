import {Observable, Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppService} from './app.service';
import {environment} from '../../../environments/environment';
import {UserModel} from '../models/user.model';

@Injectable()
export class UserService {

  user: UserModel;
  personData: Subject<string> = new Subject;

  constructor(private http: HttpClient, private app: AppService) {
  }

  loadUser(): Observable<UserModel> {
    this.app.setHeadersAndOptions();
    return new Observable<UserModel>((observer) => {
      this.http.post<any>(environment.endpointBase + 'user', {}, this.app.options).subscribe(res => {
          this.app.changeAuthenticated(true);
          this.user = res['body'] as UserModel;
          this.personData.next(this.user.idPersonaldata.name + ' ' + this.user.idPersonaldata.surname);
          observer.next(this.user);
          observer.complete();
        },
        error => {
          if (error.status == 401) {
            this.app.changeAuthenticated(false);
            observer.error('unauthorized');
          }
          observer.complete();
        }
      );
    });
  }

}
