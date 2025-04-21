import { CarModel } from "./car.model";

export type CarsContextModel = {
  cars: CarModel[];
  car: CarModel | null;
}
