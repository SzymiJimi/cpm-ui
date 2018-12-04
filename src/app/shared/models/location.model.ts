import {UserModel} from './user.model';

export class LocationModel {

  idLocation: number;
  name: string;
  coordinateX: number;
  coordinateY: number;
  address: string;
  unitHead: UserModel;
}
