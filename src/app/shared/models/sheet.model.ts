import {Serializable} from './serializable.model';
import {StocktakingModel} from './stocktaking.model';
import {ItemModel} from './item.model';

export class SheetModel extends Serializable{

  idSheet: number;
  code: number;
  unit: string;
  quantity: number;
  price: number;
  value: number;
  comment: string;
  idStocktaking: StocktakingModel;
  idItem: ItemModel;
  checked: number;
}
