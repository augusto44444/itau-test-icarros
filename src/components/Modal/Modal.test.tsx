import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './index';
import { CarsActionTypes } from '../../contexts/Cars/CarsActions';
import { CarsContenxt } from '../../contexts/Cars/CarsContext';
import { CarModel } from '../../Models/car.model';

const mockDispatch = jest.fn();

const mockCar: CarModel = {
  id: 1,
  short_name: 'Test Car',
  full_name: 'Test Car Full Name',
  transmission: 'Automatic',
  price: 50000,
  images: [],
  liked: false,
  brand: 'teste',
  color: 'teste',
  fuel: 'Flex',
  dealer: {
    company: true,
    email: 'Teste@mail.com',
    name: 'Test Dealer',
    phone: '999999',
  },
  year: '2020/2021',
  location: 'Test Location',
  kilometers: 10000,
};

const renderWithContext = (ui: React.ReactElement) => {
  return render(
    <CarsContenxt.Provider
      value={{ state: { cars: [], car: mockCar }, dispatch: mockDispatch }}
    >
      {ui}
    </CarsContenxt.Provider>,
  );
};

describe('Modal Component', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('should render the modal when car data is available', () => {
    renderWithContext(<Modal />);
    expect(screen.getByText('Contato do anuncionate')).toBeInTheDocument();
    expect(
      screen.getByText(`Nome: ${mockCar.dealer.name}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`email: ${mockCar.dealer.email}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`phone: ${mockCar.dealer.phone}`),
    ).toBeInTheDocument();
  });

  it('should not render the modal when car data is not available', () => {
    render(
      <CarsContenxt.Provider
        value={{ state: { cars: [], car: null }, dispatch: mockDispatch }}
      >
        <Modal />
      </CarsContenxt.Provider>,
    );
    expect(
      screen.queryByText('Contato do anuncionate'),
    ).not.toBeInTheDocument();
  });

  it('should call dispatch with SET_CAR action when the close button is clicked', () => {
    renderWithContext(<Modal />);
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: CarsActionTypes.SET_CAR,
      payload: null,
    });
  });
});
