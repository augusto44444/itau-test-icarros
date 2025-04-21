import { CarModel } from '../../Models/car.model';

export enum CarsActionTypes {
  INTERACT_CAR = 'INTERACT_CAR',
  SET_CAR = 'SET_CAR',
  SEARCH_CAR = 'SEARCH_CAR',
}

type CarsActionWithPayload =
  | {
      type: CarsActionTypes.SET_CAR;
      payload: CarModel | null;
    }
  | {
      type: CarsActionTypes.INTERACT_CAR;
      payload: CarModel;
    }
  | {
      type: CarsActionTypes.SEARCH_CAR;
      payload: string;
    };




export type CarsActionModel = CarsActionWithPayload