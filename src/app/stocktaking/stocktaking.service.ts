import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {AppService} from '../shared/services/app.service';
import {HttpClient} from '@angular/common/http';
import {LocationModel} from '../shared/models/location.model';
import {ActionModel} from '../shared/models/reservation.model';
import {StocktakingModel} from '../shared/models/stocktaking.model';
import {SheetModel} from '../shared/models/sheet.model';

@Injectable({
  providedIn: 'root'
})
export class StocktakingService {

  constructor(private app: AppService,
              private http: HttpClient) { }

  findLocationForInventoryManager(id: number): Observable<LocationModel>{
    return new Observable<LocationModel>((observer) => {
      this.http.get(environment.endpointBase + 'location/find/manager/'+id, this.app.options).subscribe(res => {
          observer.next(res['body']);
          observer.complete();
        },
        error => {
          observer.error('error');
          observer.complete();
        }
      );
    });
  }


  startNewStocktaking(stocktaking: StocktakingModel){
    return new Observable<any>((observer) => {
      let newHeader = this.app.options;
      newHeader.responseType = 'text';
      console.log('Weszło');
      console.log(stocktaking);
      this.http.post(environment.endpointBase + 'stocktaking/new', stocktaking, this.app.options).subscribe(res => {
        console.log(res);
          newHeader.responseType = 'json';
          observer.next(res['body']);
          observer.complete();
        },
        error => {
          console.log(error);

          newHeader.responseType = 'json';
          observer.error('error');
          observer.complete();
        }
      );
    });
  }

  findLastStocktakingForLocation(idLocation: number){
    return new Observable<any>((observer) => {
      this.http.get(environment.endpointBase + 'stocktaking/find/location/'+idLocation, this.app.options).subscribe(res => {
          observer.next(res['body']);
          observer.complete();
        },
        error => {
          observer.error('error');
          observer.complete();
        }
      );
    });
  }

  findAllStocktakingsForManagerLocation(idLocation: number){
    return new Observable<any>((observer) => {
      this.http.get(environment.endpointBase + 'stocktaking/location/manager/'+idLocation, this.app.options).subscribe(res => {
          observer.next(res['body']);
          observer.complete();
        },
        error => {
          observer.error('error');
          observer.complete();
        }
      );
    });
  }

  getSheetListForStocktaking(idStocktaking){
    return new Observable<any>((observer) => {
      this.http.get(environment.endpointBase + 'stocktaking/load/sheets/'+idStocktaking, this.app.options).subscribe(res => {
          observer.next(res['body']);
          observer.complete();
        },
        error => {
          observer.error('error');
          observer.complete();
        }
      );
    });
  }

  getStocktakingById(id: number){
    return new Observable<any>((observer) => {
      this.http.get(environment.endpointBase + 'stocktaking/'+id, this.app.options).subscribe(res => {
          observer.next(res['body']);
          observer.complete();
        },
        error => {
          observer.error('error');
          observer.complete();
        }
      );
    });
  }

  saveSheetsState(sheets: SheetModel[]){
    return new Observable<any>((observer) => {
      this.http.post(environment.endpointBase + 'sheet/save/state', sheets, this.app.options).subscribe(res => {
          observer.next(res['body']);
          observer.complete();
        },
        error => {
          observer.error('error');
          observer.complete();
        }
      );
    });
  }

  finishStocktaking(stocktaking: StocktakingModel){
    return new Observable<any>((observer) => {
      this.http.post(environment.endpointBase + 'stocktaking/finish', stocktaking, this.app.options).subscribe(res => {
          observer.next(res['body']);
          observer.complete();
        },
        error => {
          observer.error('error');
          observer.complete();
        }
      );
    });

  }

}
