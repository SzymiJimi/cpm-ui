import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {ReservationModel} from '../shared/models/reservation.model';
import {HttpClient} from '@angular/common/http';
import {AppService} from '../shared/services/app.service';
import {UserModel} from '../shared/models/user.model';
import {Observable} from 'rxjs';
import {PersonaldataModel} from '../shared/models/personaldata.model';
import {UserService} from '../shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  userProfileOpened: UserModel;

  constructor(private http: HttpClient,
              private app: AppService,
              private userService: UserService) {

  }


  checkManagerRigths(): Observable<string> {
    return new Observable<string>((observer) => {
      let newHeader = this.app.options;
      newHeader.responseType = 'text';
      this.http.get(environment.endpointBase + '/personaldata/manager/check', this.app.options).subscribe(res => {
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

  changeRole(newUserRole: string): Observable<string> {
    return new Observable<string>((observer) => {
      this.userProfileOpened.idRole.name = newUserRole;
      let newHeader = this.app.options;
      newHeader.responseType = 'text';
      this.http.post(environment.endpointBase + 'personaldata/update/role', this.userProfileOpened, this.app.options).subscribe(res => {
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

  changePersonalData(personalData: PersonaldataModel): Observable<string> {
    return new Observable<string>((observer) => {
      this.userProfileOpened.idPersonaldata = personalData;
      let newHeader = this.app.options;
      newHeader.responseType = 'text';
      this.http.post(environment.endpointBase + 'personaldata/update/own', this.userProfileOpened, this.app.options).subscribe(res => {
          newHeader.responseType = 'json';
          this.userService.user = this.userProfileOpened;
          this.userService.changeNavbarPersonData();
          observer.next(res['body']);
          observer.complete();
        },
        error => {
          console.log(error);
          newHeader.responseType = 'json';
          observer.error(error['body']);
          observer.complete();
        }
      );
    });
  }

  changePassword(newUserRole: string): Observable<string> {
    return new Observable<string>((observer) => {
      this.userProfileOpened.idRole.name = newUserRole;
      let newHeader = this.app.options;
      newHeader.responseType = 'text';
      this.http.post(environment.endpointBase + 'personaldata/update/role', this.userProfileOpened, this.app.options).subscribe(res => {
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

  checkOldPassword() {
    return new Observable<string>((observer) => {
      let newHeader = this.app.options;
      newHeader.responseType = 'text';
      this.http.post(environment.endpointBase + 'personaldata/update/role', this.userProfileOpened, this.app.options).subscribe(res => {
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


  getUserList(): Observable<UserModel[]> {
    return new Observable<UserModel[]>((observer) => {
      this.http.get(environment.endpointBase + 'users/manager', this.app.options).subscribe(res => {
          observer.next(res['body']);
          observer.complete();
        },
        error => {
          observer.error(error['body']);
          observer.complete();
        }
      );
    });
  }
}
