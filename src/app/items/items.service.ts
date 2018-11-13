import { Injectable } from '@angular/core';
import {ItemModel} from '../shared/models/item.model';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {UserModel} from '../shared/models/user.model';
import {AppService} from '../shared/services/app.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  itemsList: ItemModel[];
  itemToReserve: ItemModel;
  itemToCheckout: ItemModel;

  constructor(private app: AppService, private http: HttpClient) { }

  getItems():Observable<ItemModel[]>{
    return new Observable<ItemModel[]>((observer) => {
      this.http.get(environment.endpointBase + 'items', this.app.options).subscribe(res => {
          this.itemsList = res['body'] as ItemModel[];
          observer.next(this.itemsList);
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

  addItem(item: ItemModel):Observable<any>{
    return new Observable<any>((observer) => {
      let newHeader = this.app.options;
      newHeader.responseType= 'text';
      this.http.post<string>(environment.endpointBase + 'item/new', item, newHeader).subscribe(res => {
          newHeader.responseType= 'json';
          observer.next('success');
          observer.complete();
        },
        error => {
          newHeader.responseType= 'json';
          if (error.status == 401) {
            observer.error('error with send data');
          }
          observer.complete();
        }
      );
    });
  }

  getSingleItem(id: number):Observable<ItemModel>{
    return new Observable<ItemModel>((observer) => {
      this.http.get(environment.endpointBase + 'item/'+id, this.app.options).subscribe(res => {
          let item: ItemModel = res['body'] as ItemModel;
          observer.next(item);
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

  checkAvailabilityOfItem(id: number){
    let newHeader = this.app.options;
    newHeader.responseType= 'text';
    return new Observable<boolean>((observer) => {
      this.http.get(environment.endpointBase + 'item/availability/'+id, newHeader).subscribe(res => {
          newHeader.responseType= 'json';
          observer.next(res['body']);
          observer.complete();
        },
        error => {
          newHeader.responseType= 'json';
          observer.next(error['body']);
          observer.complete();
        }
      );
    });
  }

}
