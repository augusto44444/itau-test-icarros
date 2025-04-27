import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Carrouseel } from './index';

const mockImages = [
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  'https://example.com/image3.jpg',
];

const mockFullName = 'Test Car Model';

describe('Carrouseel Component', () => {
  it('should render the component with the first image if images are provided', () => {
    render(<Carrouseel full_name={mockFullName} images={mockImages} />);
    const imageElement = screen.getByAltText(mockFullName);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', mockImages[0]);
  });

  it('should render the component with the default image if no images are provided', () => {
    render(<Carrouseel full_name={mockFullName} images={[]} />);
    const imageElement = screen.getByAltText(mockFullName);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute(
      'src',
      'https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg',
    );
  });

  it('should render the correct number of menu items', () => {
    render(<Carrouseel full_name={mockFullName} images={mockImages} />);
    const menuItems = screen.getAllByRole('link');
    expect(menuItems.length).toBe(mockImages.length);
  });

  it('should change the image when a menu item is clicked', () => {
    render(<Carrouseel full_name={mockFullName} images={mockImages} />);
    const menuItems = screen.getAllByRole('link');
    fireEvent.click(menuItems[1]);
    const imageElement = screen.getByAltText(mockFullName);
    expect(imageElement).toHaveAttribute('src', mockImages[1]);
  });

  it('should apply the selected class to the active menu item', () => {
    render(<Carrouseel full_name={mockFullName} images={mockImages} />);
    const menuItems = screen.getAllByRole('link');
    expect(menuItems[0]).toHaveClass(/selected/);
    fireEvent.click(menuItems[1]);
    expect(menuItems[1]).toHaveClass(/selected/);
    expect(menuItems[0]).not.toHaveClass(/selected/);
  });
});
