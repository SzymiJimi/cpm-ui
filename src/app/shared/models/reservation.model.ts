import {UserModel} from './user.model';
import {ItemModel} from './item.model';

export class ReservationModel {

  idReservation: number;
  from: Date;
  to: Date;
  reason: string;
  contact: string;
  type: string;
  reserverUser: UserModel;
  itemId: ItemModel;

}
