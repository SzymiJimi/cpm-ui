import {Injectable} from '@angular/core';
import {ActionModel} from '../../shared/models/reservation.model';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AppService} from '../../shared/services/app.service';
import {UserService} from '../../shared/services/user.service';

@Injectable()
export class CheckOutService {

  constructor(private app: AppService, private user: UserService, private http: HttpClient) {
  }

  checkOutsList: ActionModel[];

  getUserCheckouts(): Observable<ActionModel[]> {
    console.log(this.app.options);

    return new Observable<ActionModel[]>((observer) => {
      this.http.get(environment.endpointBase + 'checkout/user/' + this.user.user.idUser, this.app.options).subscribe(res => {
          this.checkOutsList = res['body'] as ActionModel[];
          observer.next(this.checkOutsList);
          observer.complete();
        },
        error => {
          observer.error('error with send data');
          observer.complete();
        }
      );

    });
  }


  checkOutItem(reservation: ActionModel) {
    let newHeader = this.app.options;
    newHeader.responseType = 'text';
    return new Observable<any>((observer) => {
      this.http.post(environment.endpointBase + 'checkout/new', reservation, this.app.options).subscribe(res => {
          newHeader.responseType = 'json';
          observer.next('Success!');
          observer.complete();
        },
        error => {
          newHeader.responseType = 'json';
          observer.error('Error with creating check-out');
          observer.complete();
        }
      );
    });
  }

  getAllActiveUserCheckout() {
    console.log('No jestem w serwisie');
    return new Observable<ActionModel[]>((observer) => {
      console.log('Przed pobraniem');
      console.log( this.user.user);
      this.http.get(environment.endpointBase + 'checkout/get/active/amount/user/' + this.user.user.idUser, this.app.options).subscribe(res => {
          console.log(res['body']);
          observer.next(res['body'] as ActionModel[]);
          observer.complete();
        },
        error => {
          console.log(error);
          observer.error('Error with fetching data');
          observer.complete();
        }
      );
    });
  }

  getAllPreviousUserCheckout() {
    return new Observable<ActionModel[]>((observer) => {
      this.http.get(environment.endpointBase + 'checkout/get/prev/amount/user/' + this.user.user.idUser, this.app.options).subscribe(res => {
          console.log(res['body']);
          observer.next(res['body'] as ActionModel[]);
          observer.complete();
        },
        error => {
          console.log(error);
          observer.error('error with send data');
          observer.complete();
        }
      );
    });
  }


}
