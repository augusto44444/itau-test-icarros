import { cars_mock } from '../../assets/mock/cars.mock';
import { CarsContextModel } from '../../Models/carContext.model';
import { CarsActionModel, CarsActionTypes } from './CarsActions';

export function CarsReducer(state: CarsContextModel, action: CarsActionModel) {
  switch (action.type) {
    case CarsActionTypes.SET_CAR: {
      return { ...state, car: action.payload };
    }
    case CarsActionTypes.INTERACT_CAR: {
      const newCars = state.cars.map(car => {
        if (car.id == action.payload.id) {
          return { ...car, liked: !car.liked };
        }
        return car;
      });
      return { ...state, cars: newCars };
    }
    case CarsActionTypes.SEARCH_CAR: {
      const newCars = cars_mock.filter(
        car =>
          car.brand.toLowerCase().indexOf(action.payload.toLowerCase()) > -1,
      );
      return { ...state, cars: newCars.length > 0 ? newCars : state.cars };
    }
  }
  return state;
}
