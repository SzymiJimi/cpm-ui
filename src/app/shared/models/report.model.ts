import {ItemModel} from './item.model';
import {UserModel} from './user.model';
import {Serializable} from './serializable.model';

export class ReportModel extends Serializable{
  idRequest: number;
  type: string;
  itemId: ItemModel;
  declarant: UserModel;
  eventDate: Date;
  repairDate: Date;
  description: string;
  status: string;
  serviceman: UserModel;
}
