import {Timestamp} from 'rxjs';
import {UserModel} from './user.model';
import {LocationModel} from './location.model';

export class ItemModel {
  idItem: number;
  brand: string;
  model: string;
  value: number;
  purchaseDate: Date;
  residualValue: number;
  warrantyDate: Date;
  serialNumber: string;
  decription: string;
  creationUser: UserModel;
  location: LocationModel;
}
