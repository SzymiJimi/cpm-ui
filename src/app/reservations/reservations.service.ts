import { Injectable } from '@angular/core';
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

  constructor(private app: AppService, private user: UserService , private http: HttpClient ) { }

  reservationsList: ReservationModel[];

  getUserReservations():Observable<ReservationModel[]>{
    return new Observable<ReservationModel[]>((observer) => {
      this.http.get(environment.endpointBase + 'reservations/user/' + this.user.user.idUser , this.app.options).subscribe(res => {
          this.reservationsList = res['body'] as ReservationModel[];
          console.log(this.reservationsList);
          observer.next(this.reservationsList);
          observer.complete();
        },
        error => {
          if (error.status == 401) {
            observer.error('error with send data');
          }
          observer.complete();
        }
      );

    });
  }

}
