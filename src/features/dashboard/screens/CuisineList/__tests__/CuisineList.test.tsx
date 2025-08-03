import React from 'react';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {configureStore} from '@reduxjs/toolkit';
import {describe, it, expect, beforeEach, jest} from '@jest/globals';
import CuisineList from '../index';

// Mock the useCuisines hook
const mockCuisines = [
  {
    id: '1',
    name: 'Chinese',
    imageUrl: 'https://example.com/chinese.jpg',
    description: 'Delicious Chinese cuisine',
  },
  {
    id: '2',
    name: 'Italian',
    imageUrl: 'https://example.com/italian.jpg',
    description: 'Authentic Italian dishes',
  },
  {
    id: '3',
    name: 'Indian',
    imageUrl: 'https://example.com/indian.jpg',
    description: 'Spicy Indian flavors',
  },
];

const mockUseCuisines = {
  cuisines: mockCuisines,
  isLoading: false,
  error: null as string | null,
  fetch: jest.fn(),
};

jest.mock('../../../hooks', () => ({
  useCuisines: () => mockUseCuisines,
}));

// Create a mock store
const createMockStore = () =>
  configureStore({
    reducer: {
      cuisine: (state: any = {cuisines: [], isLoading: false, error: null}) =>
        state,
    },
  });

const renderWithProviders = (component: React.ReactElement) => {
  const store = createMockStore();
  return render(
    <Provider store={store}>
      <NavigationContainer>{component}</NavigationContainer>
    </Provider>,
  );
};

describe('CuisineList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByText} = renderWithProviders(<CuisineList />);

    expect(getByText('Chinese')).toBeTruthy();
    expect(getByText('Italian')).toBeTruthy();
    expect(getByText('Indian')).toBeTruthy();
  });

  it('displays cuisine descriptions', () => {
    const {getByText} = renderWithProviders(<CuisineList />);

    expect(getByText('Delicious Chinese cuisine')).toBeTruthy();
    expect(getByText('Authentic Italian dishes')).toBeTruthy();
    expect(getByText('Spicy Indian flavors')).toBeTruthy();
  });

  it('shows loading state when loading', () => {
    mockUseCuisines.isLoading = true;
    mockUseCuisines.cuisines = [];

    const {getByText} = renderWithProviders(<CuisineList />);

    expect(getByText('Loading cuisines...')).toBeTruthy();
  });

  it('shows error state when there is an error', () => {
    mockUseCuisines.isLoading = false;
    mockUseCuisines.cuisines = [];
    mockUseCuisines.error = 'Network error';

    const {getByText} = renderWithProviders(<CuisineList />);

    expect(getByText('Failed to load cuisines')).toBeTruthy();
    expect(getByText('Network error')).toBeTruthy();
  });

  it('calls fetch on mount', () => {
    renderWithProviders(<CuisineList />);

    expect(mockUseCuisines.fetch).toHaveBeenCalled();
  });
});
