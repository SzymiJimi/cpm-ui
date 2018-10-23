import {Serializable} from './serializable.model';

export class PersonaldataModel extends Serializable{

  idPersonalData: number;
  name: string;
  surname: string;
  dateOfBirth: Date;
  gender: string;

}
