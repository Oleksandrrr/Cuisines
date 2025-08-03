import React from 'react';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {describe, it, expect, jest, beforeEach} from '@jest/globals';
import RestaurantDetail from '../index';
import restaurantReducer from '../../../models/restaurant/slice';

// Mock Linking
jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
}));

// Mock Alert
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

// Mock useRoute
const mockRoute = {
  params: {
    restaurantId: 'test-restaurant-id',
  },
};

jest.mock('@react-navigation/native', () => ({
  useRoute: () => mockRoute,
}));

// Mock useRestaurantDetail hook
const mockUseRestaurantDetail = jest.fn();
jest.mock('../../../hooks/useRestaurantDetail', () => ({
  useRestaurantDetail: () => mockUseRestaurantDetail(),
}));

const mockRestaurant = {
  id: 'test-restaurant-id',
  name: 'Test Restaurant',
  imageUrl: 'https://example.com/image.jpg',
  description: 'Test description',
  isOpen: true,
  cuisineId: 'test-cuisine-id',
  address: '123 Test Street',
  phone: '+1234567890',
  website: 'https://testrestaurant.com',
  rating: 4.5,
  priceRange: '$$',
  coordinates: {
    latitude: 40.7128,
    longitude: -74.006,
  },
  hours: {
    Monday: '9:00 AM - 10:00 PM',
    Tuesday: '9:00 AM - 10:00 PM',
  },
  fullDescription: 'Full restaurant description',
  menu: [
    {
      category: 'Appetizers',
      items: [
        {name: 'Spring Rolls', description: 'Fresh vegetables', price: 8.99},
      ],
    },
  ],
  reviews: [
    {
      id: 'review-1',
      author: 'John Doe',
      rating: 5,
      comment: 'Great food!',
      date: '2024-01-01',
    },
  ],
};

const createTestStore = (initialState = {}) =>
  configureStore({
    reducer: {
      restaurant: restaurantReducer,
    },
    preloadedState: {
      restaurant: {
        restaurants: [],
        selectedRestaurant: null,
        isLoading: false,
        error: null,
        ...initialState,
      },
    },
  });

const renderWithProviders = (
  component: React.ReactElement,
  initialState = {},
) => {
  const store = createTestStore(initialState);
  return render(<Provider store={store}>{component}</Provider>);
};

describe('RestaurantDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state when loading', () => {
    mockUseRestaurantDetail.mockReturnValue({
      restaurant: null,
      isLoading: true,
      error: null,
    });

    const {getByText} = renderWithProviders(<RestaurantDetail />);

    expect(getByText('Loading restaurant details...')).toBeTruthy();
  });

  it('renders error state when error occurs', () => {
    mockUseRestaurantDetail.mockReturnValue({
      restaurant: null,
      isLoading: false,
      error: 'Network error',
    });

    const {getByText} = renderWithProviders(<RestaurantDetail />);

    expect(getByText('Failed to load restaurant details')).toBeTruthy();
    expect(getByText('Network error')).toBeTruthy();
  });

  it('renders restaurant details when data is loaded', () => {
    mockUseRestaurantDetail.mockReturnValue({
      restaurant: mockRestaurant,
      isLoading: false,
      error: null,
    });

    const {getByText} = renderWithProviders(<RestaurantDetail />);

    expect(getByText('Test Restaurant')).toBeTruthy();
    expect(getByText('Open')).toBeTruthy();
    expect(getByText('⭐ 4.5')).toBeTruthy();
    expect(getByText('Full restaurant description')).toBeTruthy();
    expect(getByText('Contact Information')).toBeTruthy();
    expect(getByText('Address:')).toBeTruthy();
    expect(getByText('123 Test Street')).toBeTruthy();
  });

  it('displays action buttons when data is available', () => {
    mockUseRestaurantDetail.mockReturnValue({
      restaurant: mockRestaurant,
      isLoading: false,
      error: null,
    });

    const {getByText} = renderWithProviders(<RestaurantDetail />);

    expect(getByText('📞 Call')).toBeTruthy();
    expect(getByText('🌐 Website')).toBeTruthy();
    expect(getByText('🗺️ Maps')).toBeTruthy();
  });

  it('displays opening hours when available', () => {
    mockUseRestaurantDetail.mockReturnValue({
      restaurant: mockRestaurant,
      isLoading: false,
      error: null,
    });

    const {getByText, getAllByText} = renderWithProviders(<RestaurantDetail />);

    expect(getByText('Opening Hours')).toBeTruthy();
    expect(getByText('Monday:')).toBeTruthy();
    expect(getAllByText('9:00 AM - 10:00 PM')).toHaveLength(2);
  });

  it('displays menu preview when available', () => {
    mockUseRestaurantDetail.mockReturnValue({
      restaurant: mockRestaurant,
      isLoading: false,
      error: null,
    });

    const {getByText} = renderWithProviders(<RestaurantDetail />);

    expect(getByText('Menu')).toBeTruthy();
    expect(getByText('Appetizers')).toBeTruthy();
    expect(getByText('Spring Rolls')).toBeTruthy();
    expect(getByText('$8.99')).toBeTruthy();
  });

  it('displays reviews when available', () => {
    mockUseRestaurantDetail.mockReturnValue({
      restaurant: mockRestaurant,
      isLoading: false,
      error: null,
    });

    const {getByText} = renderWithProviders(<RestaurantDetail />);

    expect(getByText('Reviews')).toBeTruthy();
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('⭐ 5')).toBeTruthy();
    expect(getByText('Great food!')).toBeTruthy();
  });
});
