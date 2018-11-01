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

  addItem(item: ItemModel){
    console.log('Otrzymany item');
    console.log(item);
    return new Observable<any>((observer) => {

      this.http.post(environment.endpointBase + 'item/new', item, this.app.options).subscribe(res => {
          this.app.changeAuthenticated(true);
          // this.user = res['body'] as UserModel;
          // this.personData.next(this.user.idPersonaldata.name + ' ' + this.user.idPersonaldata.surname);
          observer.next('success');
          observer.complete();
        },
        error => {
          if (error.status == 401) {
            this.app.changeAuthenticated(false);
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

}
