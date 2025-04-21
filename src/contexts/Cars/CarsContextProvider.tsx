import { useReducer } from 'react';
import { CarsContenxt } from './CarsContext';
import { initialCarsState } from './initialCars';
import { CarsReducer } from './CarsReducer';
import { cars_mock } from '../../assets/mock/cars.mock';

type CarsContextProviderProps = {
  children: React.ReactNode;
};

export function CarsContextProvider({ children }: CarsContextProviderProps) {
  const [state, dispatch] = useReducer(CarsReducer, initialCarsState, () => {
    return { cars: cars_mock, car: null };
  });

  return (
    <CarsContenxt.Provider value={{ state, dispatch }}>
      {children}
    </CarsContenxt.Provider>
  );
}
