import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './index';
import { CarsActionTypes } from '../../contexts/Cars/CarsActions';

const mockDispatch = jest.fn();

jest.mock('../../contexts/Cars/useCarsContext', () => ({
  useCarContext: () => ({
    dispatch: mockDispatch,
  }),
}));

describe('Header Component', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('should render the header with logo and search input', () => {
    render(<Header />);
    expect(screen.getByText('Icarros')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Pesquisar por marca'),
    ).toBeInTheDocument();
  });

  it('should dispatch SEARCH_CAR action with input value on form submit', () => {
    render(<Header />);
    const inputElement = screen.getByPlaceholderText('Pesquisar por marca');
    const formElement = screen.getByRole('form');

    fireEvent.change(inputElement, { target: { value: 'test car' } });
    fireEvent.submit(formElement);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: CarsActionTypes.SEARCH_CAR,
      payload: 'test car',
    });
  });

  it('should not dispatch SEARCH_CAR action if input value is empty after trimming', () => {
    render(<Header />);
    const inputElement = screen.getByPlaceholderText('Pesquisar por marca');
    const formElement = screen.getByRole('form');

    fireEvent.change(inputElement, { target: { value: '   ' } });
    fireEvent.submit(formElement);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: CarsActionTypes.SEARCH_CAR,
      payload: '',
    });
  });
});
