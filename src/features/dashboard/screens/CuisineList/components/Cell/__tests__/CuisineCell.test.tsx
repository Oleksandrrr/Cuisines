import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CuisineCell from '../index';

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

const mockCuisine = {
  id: '1',
  name: 'Chinese',
  imageUrl: 'https://example.com/chinese.jpg',
  description: 'Delicious Chinese cuisine',
};

describe('CuisineCell', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByText} = render(<CuisineCell cuisine={mockCuisine} />);

    expect(getByText('Chinese')).toBeTruthy();
    expect(getByText('Delicious Chinese cuisine')).toBeTruthy();
  });

  it('navigates to RestaurantList when pressed', () => {
    const {getByText} = render(<CuisineCell cuisine={mockCuisine} />);

    fireEvent.press(getByText('Chinese'));

    expect(mockNavigate).toHaveBeenCalledWith('RestaurantList', {
      cuisineId: '1',
    });
  });

  it('renders without description when not provided', () => {
    const cuisineWithoutDescription = {
      id: '2',
      name: 'Italian',
      imageUrl: 'https://example.com/italian.jpg',
    };

    const {getByText, queryByText} = render(
      <CuisineCell cuisine={cuisineWithoutDescription} />,
    );

    expect(getByText('Italian')).toBeTruthy();
    expect(queryByText('Delicious Chinese cuisine')).toBeNull();
  });
});
