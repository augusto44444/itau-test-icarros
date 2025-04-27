import { CarsReducer } from './CarsReducer';
import { CarsActionTypes } from './CarsActions';
import { CarsContextModel } from '../../Models/carContext.model';
import { cars_mock } from '../../assets/mock/cars.mock';
describe('CarsReducer', () => {
  const initialState: CarsContextModel = {
    cars: cars_mock,
    car: null,
  };

  it('should handle SET_CAR', () => {
    const payload = cars_mock[0];
    const action = { type: CarsActionTypes.SET_CAR, payload };
    const newState = CarsReducer(initialState, action);
    expect(newState.car).toEqual(payload);
  });

  it('should handle INTERACT_CAR', () => {
    const carId = cars_mock[0].id;
    const initialLiked = cars_mock[0].liked;
    const action = {
      type: CarsActionTypes.INTERACT_CAR,
      payload: { id: carId },
    };
    const newState = CarsReducer(initialState, action);
    const interactedCar = newState.cars.find(car => car.id === carId);
    expect(interactedCar?.liked).toEqual(!initialLiked);
  });

  it('should handle SEARCH_CAR', () => {
    const payload = 'Honda';
    const action = { type: CarsActionTypes.SEARCH_CAR, payload };
    const newState = CarsReducer(initialState, action);
    const newCars = cars_mock.filter(
      car => car.brand.toLowerCase().indexOf(action.payload.toLowerCase()) > -1,
    );
    expect(newState.cars).toEqual(newCars);
  });

  it('should return the same state if the search returns no results', () => {
    const payload = 'NonExistingBrand';
    const action = { type: CarsActionTypes.SEARCH_CAR, payload };
    const newState = CarsReducer(initialState, action);
    expect(newState.cars).toEqual(initialState.cars);
  });

  it('should return the current state for unknown action types', () => {
    const action = { type: 'UNKNOWN_ACTION', payload: {} };
    const newState = CarsReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
