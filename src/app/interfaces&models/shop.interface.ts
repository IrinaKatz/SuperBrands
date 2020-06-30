import {Specialist} from './specialist.interface';
export interface Shop  {
  id: number;
  specialist: Specialist;
  name: string;
  address: string;
}
