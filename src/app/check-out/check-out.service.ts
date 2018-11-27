import {Injectable} from '@angular/core';
import {ActionModel} from '../shared/models/reservation.model';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AppService} from '../shared/services/app.service';
import {UserService} from '../shared/services/user.service';

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
    this.http.post(environment.endpointBase + 'checkout/new', reservation, this.app.options).subscribe(res => {
        newHeader.responseType = 'json';
      },
      error => {
        newHeader.responseType = 'json';
      }
    );
  }


  getCheckOutsForItem(itemId): Observable<ActionModel[]> {
    console.log('Pobiera checkouty');
    this.app.options.responseType = 'json';
    let reservationsForItem: ActionModel[];
    return new Observable<ActionModel[]>((observer) => {
      this.http.get(environment.endpointBase + 'checkout/item/' + itemId, this.app.options).subscribe(res => {
          console.log('Zwrocone checkouty');
          console.log(res['body'] as ActionModel[]);
          reservationsForItem = res['body'] as ActionModel[];
          observer.next(reservationsForItem);
          observer.complete();
        },
        error => {
          console.log('Zwrocony error');
          console.log(error);
          observer.error('error with send data');
          observer.complete();
        }
      );

    });
  }
}
