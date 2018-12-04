import {Serializable} from './serializable.model';
import {LocationModel} from './location.model';
import {UserModel} from './user.model';

export class StocktakingModel extends Serializable {
    idSocktaking: number;
    start: Date;
    finish: Date;
    type: string;
    method: string;
    location: LocationModel;
    manager: UserModel;
}
