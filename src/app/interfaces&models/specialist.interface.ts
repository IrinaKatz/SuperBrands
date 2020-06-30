import {Shop} from './shop.interface';

export interface Specialist {
  id: number;
  name: string;
  shops: Shop[];
}
