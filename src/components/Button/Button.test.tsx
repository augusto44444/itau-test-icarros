import { Button } from './index';
import { fireEvent, render, screen } from '@testing-library/react';

describe('first tests', () => {
  it('Should render component Button', () => {
    render(<Button className='teste'>Teste</Button>);
    expect(screen.getByText('Teste')).toBeInTheDocument();
  });

  it('Should listen click event', () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} className='teste'>
        Teste
      </Button>,
    );
    const btn = screen.getByText(/Teste/);
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
