import { createContext } from 'react';
import { CarsContextModel } from '../../Models/carContext.model';
import { CarsActionModel } from './CarsActions';
import { initialCarsState } from './initialCars';

type carsContextProps = {
  state: CarsContextModel;
  dispatch: React.Dispatch<CarsActionModel>;
};

const initialContextValue = {
  state: initialCarsState,
  dispatch: () => {},
};

export const CarsContenxt =
  createContext<carsContextProps>(initialContextValue);
