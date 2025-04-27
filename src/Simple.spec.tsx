import { First } from './Simple';
import { render, screen } from '@testing-library/react';

describe('first tests', () => {
  it('should render component', () => {
    render(<First />);
    expect(true).toBeTruthy();
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
  });
});
