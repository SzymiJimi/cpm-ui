import {Timestamp} from 'rxjs';
import {UserModel} from './user.model';
import {LocationModel} from './location.model';

export class ItemModel {


  // constructor(item: ItemModel) {
  //
  //   this.idItem = item.idItem;
  //   this.brand = item.brand;
  //   this.model = item.model;
  //   this.value = item.value;
  //   this.purchaseDate = item.purchaseDate;
  //   this.residualValue = item.residualValue;
  //   this.warrantyDate = item.warrantyDate;
  //   this.serialNumber = item.serialNumber;
  //   this.decription = item.decription;
  //   this.creationUser = item.creationUser;
  //   this.location = item.location;
  // }
  //


  idItem: number;
  brand: string;
  model: string;
  value: number;
  purchaseDate: Date;
  residualValue: number;
  warrantyDate: Date;
  serialNumber: string;
  description: string;
  creationUser: UserModel;
  location: LocationModel;


}
