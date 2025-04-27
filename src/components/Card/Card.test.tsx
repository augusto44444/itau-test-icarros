import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './index';
import { CarModel } from '../../Models/car.model';
import { useCarContext } from '../../contexts/Cars/useCarsContext';
import { CarsActionTypes } from '../../contexts/Cars/CarsActions';

// Mock the context
jest.mock('../../contexts/Cars/useCarsContext', () => ({
  useCarContext: jest.fn(),
}));

describe('Card Component', () => {
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

  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useCarContext as jest.Mock).mockReturnValue({ dispatch: mockDispatch });
  });

  it('renders car information correctly', () => {
    render(<Card car={mockCar} />);

    expect(screen.getByText('Test Car')).toBeInTheDocument();
    expect(screen.getByText('Test Car Full Name')).toBeInTheDocument();
    expect(screen.getByText('Automatic')).toBeInTheDocument();
    expect(screen.getByText('R$ 50.000,00')).toBeInTheDocument(); // Price format
    expect(screen.getByText('Test Dealer')).toBeInTheDocument();
    expect(screen.getByText('2020/2021')).toBeInTheDocument();
    expect(screen.getByText('Test Location')).toBeInTheDocument();
    expect(screen.getByText('km 10.000')).toBeInTheDocument();
  });

  it('formats price correctly', () => {
    render(<Card car={mockCar} />);
    expect(screen.getByText('R$ 50.000,00')).toBeInTheDocument();
  });

  it('displays "vendedor particular" when dealer.company is false', () => {
    const mockCarNoCompany = {
      ...mockCar,
      dealer: { ...mockCar.dealer, company: false, name: 'Private' },
    };
    render(<Card car={mockCarNoCompany} />);
    expect(screen.getByText('vendedor particular')).toBeInTheDocument();
  });

  it('calls dispatch with INTERACT_CAR when like button is clicked', () => {
    render(<Card car={mockCar} />);
    const likeButton = screen.getByRole('link');
    fireEvent.click(likeButton);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: CarsActionTypes.INTERACT_CAR,
      payload: mockCar,
    });
  });

  it('calls dispatch with SET_CAR when contact button is clicked', () => {
    render(<Card car={mockCar} />);
    const contactButton = screen.getByRole('button', { name: 'Contanto' });
    fireEvent.click(contactButton);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: CarsActionTypes.SET_CAR,
      payload: mockCar,
    });
  });
});
