import { render, screen } from '@testing-library/react';
import { Home } from '.';
import { useCarContext } from '../../contexts/Cars/useCarsContext';
import { CarModel } from '../../Models/car.model';

jest.mock('../../contexts/Cars/useCarsContext', () => ({
  useCarContext: jest.fn(),
}));

const mockCars: CarModel[] = [
  {
    id: 1,
    short_name: 'Test Car 1',
    full_name: 'Test Car Full Name 1',
    transmission: 'Automatic',
    price: 50000,
    images: [],
    liked: false,
    brand: 'teste 1',
    color: 'teste 1',
    fuel: 'Flex',
    dealer: {
      company: true,
      email: 'Teste1@mail.com',
      name: 'Test Dealer 1',
      phone: '999999',
    },
    year: '2020/2021',
    location: 'Test Location 1',
    kilometers: 10000,
  },
  {
    id: 2,
    short_name: 'Test Car 2',
    full_name: 'Test Car Full Name 2',
    transmission: 'Automatic',
    price: 50000,
    images: [],
    liked: false,
    brand: 'teste 2',
    color: 'teste 2',
    fuel: 'Flex',
    dealer: {
      company: true,
      email: 'Teste2@mail.com',
      name: 'Test Dealer 2',
      phone: '999999',
    },
    year: '2021/2022',
    location: 'Test Location 2',
    kilometers: 10000,
  },
];

describe('Home Component', () => {
  it('should render Header, Modal and Cards based on context state', () => {
    (useCarContext as jest.Mock).mockReturnValue({
      state: {
        cars: mockCars,
        car: mockCars[0]
      },
    });

    render(<Home />);

    expect(screen.getByText('Test Car 1')).toBeInTheDocument();
    expect(screen.getByText('Test Car 2')).toBeInTheDocument();
    expect(screen.getByText(/Icarros/)).toBeInTheDocument();
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  it('should render "No cars" when the car list is empty', () => {
    (useCarContext as jest.Mock).mockReturnValue({
      state: {
        cars: [],
      },
    });

    render(<Home />);

    expect(screen.queryByText('Car 1')).not.toBeInTheDocument();
  });
});
