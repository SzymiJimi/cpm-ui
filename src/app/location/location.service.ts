import { Injectable } from '@angular/core';
import {ItemModel} from '../shared/models/item.model';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {LocationModel} from '../shared/models/location.model';
import {HttpClient} from '@angular/common/http';
import {AppService} from '../shared/services/app.service';
import {errorObject} from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  locations : LocationModel[];

  constructor(private http: HttpClient, private app: AppService) { }

  loadLocations():Observable<LocationModel[]>{
    return new Observable<LocationModel[]>((observer) => {
      this.http.get(environment.endpointBase + 'locations', this.app.options).subscribe(res => {
          this.locations = res['body'] as LocationModel[];
          observer.next(this.locations);
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

}
