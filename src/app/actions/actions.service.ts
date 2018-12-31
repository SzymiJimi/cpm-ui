import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ItemModel} from '../shared/models/item.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AppService} from '../shared/services/app.service';
import {ActionModel} from '../shared/models/reservation.model';
import {UserService} from '../shared/services/user.service';
import {Action} from 'rxjs/internal/scheduler/Action';
import {ReportModel} from '../shared/models/report.model';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  constructor(private app: AppService, private user: UserService, private http: HttpClient) {
  }

  reservationsList: ActionModel[];
  allReservationListForItem: ActionModel[];

  getUserReservations(): Observable<ActionModel[]> {
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
    return new Observable<ActionModel[]>((observer) => {
      let newHeader = this.app.options;
      newHeader.responseType = 'text';
      this.http.post(environment.endpointBase + 'reservation/new', reservation, this.app.options).subscribe(res => {
          newHeader.responseType = 'json';
          observer.next(res['body']);
          observer.complete();
        },
        error => {
          newHeader.responseType = 'json';
          observer.error('error');
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

  getSingleAction(id: number) {
    return new Observable<ActionModel>((observer) => {
      this.http.get(environment.endpointBase + 'action/get/' + id, this.app.options).subscribe(res => {
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

  finishAction(reservation: ActionModel) {
    return new Observable<any>((observer) => {
      this.http.post(environment.endpointBase + 'action/finish', reservation, this.app.options).subscribe(res => {
          observer.next(res['body'] as ActionModel);
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

  getAllUserActions(period: string, idUser: number): Observable<ActionModel[]> {
    return new Observable<ActionModel[]>((observer) => {
      this.http.get(environment.endpointBase + 'actions/' + period + '/user/' + idUser, this.app.options).subscribe(res => {
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

  getAllActiveUserReservations() {
    console.log('No jestem w serwisie');
    return new Observable<ActionModel[]>((observer) => {
      console.log('Przed pobraniem');
      console.log( this.user.user);
      this.http.get(environment.endpointBase + 'orders/get/active/amount/user/' + this.user.user.idUser, this.app.options).subscribe(res => {
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

  getAllPreviousUserReservations() {
    return new Observable<ActionModel[]>((observer) => {
      this.http.get(environment.endpointBase + 'orders/get/prev/amount/user/' + this.user.user.idUser, this.app.options).subscribe(res => {
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
