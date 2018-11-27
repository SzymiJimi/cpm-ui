import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ItemModel} from '../shared/models/item.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AppService} from '../shared/services/app.service';
import {ActionModel} from '../shared/models/reservation.model';
import {UserService} from '../shared/services/user.service';
import {Action} from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(private app: AppService, private user: UserService, private http: HttpClient) {
  }

  reservationsList: ActionModel[];
  allReservationListForItem: ActionModel[];

  getUserReservations(): Observable<ActionModel[]> {
    console.log(this.app.options);
    return new Observable<ActionModel[]>((observer) => {
      this.http.get(environment.endpointBase + 'reservations/user/' + this.user.user.idUser, this.app.options).subscribe(res => {
          this.reservationsList = res['body'] as ActionModel[];
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

  reserveItem(reservation: ActionModel) {
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

  getReservationsForItem(itemId): Observable<ActionModel[]> {
    this.app.options.responseType = 'json';
    let reservationsForItem: ActionModel[];
    return new Observable<ActionModel[]>((observer) => {
      this.http.get(environment.endpointBase + 'reservations/item/' + itemId, this.app.options).subscribe(res => {
        console.log(res['body'] as ActionModel[]);
          reservationsForItem = res['body'] as ActionModel[];
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

  getAllReservationsForItem(itemId): Observable<ActionModel[]> {
    this.app.options.responseType = 'json';
    let allReservationsForItem: ActionModel[];
    return new Observable<ActionModel[]>((observer) => {
      this.http.get(environment.endpointBase + 'reservations/all/item/' + itemId, this.app.options).subscribe(res => {
          allReservationsForItem = res['body'] as ActionModel[];
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

  getSingleReservation(id: number){
    return new Observable<ActionModel>((observer) => {
      this.http.get(environment.endpointBase + 'reservation/get/'+ id, this.app.options).subscribe(res => {
          let reservation = res['body'] as ActionModel;
          observer.next(reservation);
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
