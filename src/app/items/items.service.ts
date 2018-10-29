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
          console.log(this.itemsList);
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

}
