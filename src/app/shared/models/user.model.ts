import {Serializable} from './serializable.model';
import {RoleModel} from './role.model';
import {PersonaldataModel} from './personaldata.model';
import {LocationModel} from './location.model';

export class UserModel extends Serializable{

  idUser: number;
  username: string;
  password: string;
  email: string;
  idRole: RoleModel;
  idPersonaldata: PersonaldataModel;
}
