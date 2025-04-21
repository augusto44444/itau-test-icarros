import { useContext } from 'react';
import { CarsContenxt } from './CarsContext';

export function useCarContext() {
  return useContext(CarsContenxt);
}
