import { render, screen, fireEvent } from '@testing-library/react';
import { Button, ButtonProps } from '.';

describe('Button component', () => {
  it('renders the children correctly', () => {
    render(<Button>Click Me</Button>);
    expect(
      screen.getByRole('button', { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn(); // se estiver usando Jest

    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button', { name: /click/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('accepts and applies additional props', () => {
    render(<Button type='submit'>Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
});
