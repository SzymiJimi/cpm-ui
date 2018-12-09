import {UserModel} from './user.model';
import {ItemModel} from './item.model';
import {LocationModel} from './location.model';

export class ActionModel {

  idReservation: number;
  from: Date;
  to: Date;
  reason: string;
  contact: string;
  type: string;
  reserverUser: UserModel;
  itemId: ItemModel;
  location: LocationModel;

}
