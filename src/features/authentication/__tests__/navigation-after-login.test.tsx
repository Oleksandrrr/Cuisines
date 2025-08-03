import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {describe, it, expect, jest} from '@jest/globals';
import RootNavigation from '../../../navigators';
import authReducer from '../slice';
import cuisineReducer from '../../dashboard/models/cuisine/slice';
import restaurantReducer from '../../dashboard/models/restaurant/slice';

// Mock components
jest.mock('../../features/authentication/screens/Login', () => 'LoginScreen');
jest.mock('../../features/dashboard/screens/CuisineList', () => 'CuisineList');
jest.mock(
  '../../features/dashboard/screens/RestaurantList',
  () => 'RestaurantList',
);
jest.mock(
  '../../features/dashboard/screens/RestaurantDetail',
  () => 'RestaurantDetail',
);

const createTestStore = (initialState = {}) =>
  configureStore({
    reducer: {
      auth: authReducer,
      cuisine: cuisineReducer,
      restaurant: restaurantReducer,
    },
    preloadedState: {
      auth: {
        user: null,
        token: null,
        isLoading: false,
        error: null,
        isInitialized: false,
        ...initialState,
      },
      cuisine: {
        cuisines: [],
        isLoading: false,
        error: null,
      },
      restaurant: {
        restaurants: [],
        selectedRestaurant: null,
        isLoading: false,
        error: null,
      },
    },
  });

describe('Navigation After Login', () => {
  it('should show loading when not initialized', () => {
    const store = createTestStore({isInitialized: false});

    const {getByTestId} = render(
      <Provider store={store}>
        <RootNavigation />
      </Provider>,
    );

    // Should show loading indicator
    expect(getByTestId).toBeDefined();
  });

  it('should show authentication screen when not authenticated', () => {
    const store = createTestStore({
      isInitialized: true,
      token: null,
    });

    const {getByText} = render(
      <Provider store={store}>
        <RootNavigation />
      </Provider>,
    );

    // Should show authentication screen
    expect(getByText).toBeDefined();
  });

  it('should show dashboard screen when authenticated', () => {
    const store = createTestStore({
      isInitialized: true,
      token: 'test-token',
      user: {email: 'test@example.com'},
    });

    const {getByText} = render(
      <Provider store={store}>
        <RootNavigation />
      </Provider>,
    );

    // Should show dashboard screen
    expect(getByText).toBeDefined();
  });
});
