import {Serializable} from './serializable.model';

export class PersonaldataModel extends Serializable{

  id_personal_data: number;
  name: string;
  surname: string;
  date_of_birth: Date;
  gender: string;

}
