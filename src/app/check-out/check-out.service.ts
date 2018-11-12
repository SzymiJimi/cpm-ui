import {Injectable} from '@angular/core';
import {ReservationModel} from '../shared/models/reservation.model';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AppService} from '../shared/services/app.service';
import {UserService} from '../shared/services/user.service';

@Injectable()
export class CheckOutService {

  constructor(private app: AppService, private user: UserService, private http: HttpClient) {
  }

  checkOutsList: ReservationModel[];

  getUserCheckouts(): Observable<ReservationModel[]> {
    console.log(this.app.options);

    return new Observable<ReservationModel[]>((observer) => {
      this.http.get(environment.endpointBase + 'checkout/user/' + this.user.user.idUser, this.app.options).subscribe(res => {
          this.checkOutsList = res['body'] as ReservationModel[];
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


  checkOutItem(reservation: ReservationModel) {
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


  getCheckOutsForItem(itemId): Observable<ReservationModel[]> {
    console.log('Pobiera checkouty');
    this.app.options.responseType = 'json';
    let reservationsForItem: ReservationModel[];
    return new Observable<ReservationModel[]>((observer) => {
      this.http.get(environment.endpointBase + 'checkout/item/' + itemId, this.app.options).subscribe(res => {
          console.log('Zwrocone checkouty');
          console.log(res['body'] as ReservationModel[]);
          reservationsForItem = res['body'] as ReservationModel[];
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
