import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ItemModel} from '../shared/models/item.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AppService} from '../shared/services/app.service';
import {ReservationModel} from '../shared/models/reservation.model';
import {UserService} from '../shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(private app: AppService, private user: UserService, private http: HttpClient) {
  }

  reservationsList: ReservationModel[];
  allReservationListForItem: ReservationModel[];

  getUserReservations(): Observable<ReservationModel[]> {
    console.log(this.app.options);
    return new Observable<ReservationModel[]>((observer) => {
      this.http.get(environment.endpointBase + 'reservations/user/' + this.user.user.idUser, this.app.options).subscribe(res => {
          this.reservationsList = res['body'] as ReservationModel[];
          observer.next(this.reservationsList);
          observer.complete();
        },
        error => {
          observer.error('error with send data');
          observer.complete();
        }
      );

    });
  }

  reserveItem(reservation: ReservationModel) {
    let newHeader = this.app.options;
    newHeader.responseType = 'text';
    this.http.post(environment.endpointBase + 'reservation/new', reservation, this.app.options).subscribe(res => {
        newHeader.responseType = 'json';
      },
      error => {
        newHeader.responseType = 'json';
      }
    );
  }

  getReservationsForItem(itemId): Observable<ReservationModel[]> {
    this.app.options.responseType = 'json';
    let reservationsForItem: ReservationModel[];
    return new Observable<ReservationModel[]>((observer) => {
      this.http.get(environment.endpointBase + 'reservations/item/' + itemId, this.app.options).subscribe(res => {
        console.log(res['body'] as ReservationModel[]);
          reservationsForItem = res['body'] as ReservationModel[];
          observer.next(reservationsForItem);
          observer.complete();
        },
        error => {
          observer.error('error with send data');
          observer.complete();
        }
      );

    });
  }

  getAllReservationsForItem(itemId): Observable<ReservationModel[]> {
    this.app.options.responseType = 'json';
    let allReservationsForItem: ReservationModel[];
    return new Observable<ReservationModel[]>((observer) => {
      this.http.get(environment.endpointBase + 'reservations/all/item/' + itemId, this.app.options).subscribe(res => {
          allReservationsForItem = res['body'] as ReservationModel[];
          observer.next(allReservationsForItem);
          observer.complete();
        },
        error => {
          observer.error('error with send data');
          observer.complete();
        }
      );

    });
  }

}
