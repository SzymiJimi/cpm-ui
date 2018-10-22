import {Observable, Subject, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AppService} from './app.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class UserService {

  user: Subject<string> = new Subject();
  userString: string;

  constructor(private http: HttpClient, private app: AppService) {

  }

  loadUser(): Observable<string> {
    return new Observable<string>((observer) => {
      this.http.post<Observable<Object>>(environment.endpointBase + 'user', {}, this.app.options).subscribe(principal => {
          this.app.authenticated = true;
          this.userString = principal['name'];
          observer.next(this.userString);
          observer.complete();
        },
        error => {
          if (error.status == 401)
            this.app.authenticated = false;
          observer.error('unauthorized');
          observer.complete();
        }
      );
    });
  }

}
