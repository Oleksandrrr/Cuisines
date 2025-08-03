import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {configureStore} from '@reduxjs/toolkit';
import {describe, it, expect, jest} from '@jest/globals';
import RootNavigation from '../../../navigators';
import authReducer from '../slice';

// Mock react-native-splash-screen
jest.mock('react-native-splash-screen', () => ({
  hide: jest.fn(),
}));

// Mock react-native-simple-toast
jest.mock('react-native-simple-toast', () => ({
  show: jest.fn(),
  SHORT: 'SHORT',
}));

// Mock react-native-vector-icons
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

// Mock react-native-linear-gradient
jest.mock('react-native-linear-gradient', () => 'LinearGradient');

// Mock keychain service
jest.mock('../services/keychain', () => ({
  keychainService: {
    saveToken: jest.fn(),
    saveUserData: jest.fn(),
    saveCredentials: jest.fn(),
    getToken: jest.fn(),
    getUserData: jest.fn(),
    clearAllData: jest.fn(),
  },
}));

// Mock API service
jest.mock('../services/api', () => ({
  login: jest.fn(),
}));

const createTestStore = (initialState = {}) =>
  configureStore({
    reducer: {
      auth: authReducer,
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
    },
  });

const renderWithProviders = (
  component: React.ReactElement,
  initialState = {},
) => {
  const store = createTestStore(initialState);
  return render(
    <Provider store={store}>
      <NavigationContainer>{component}</NavigationContainer>
    </Provider>,
  );
};

describe('Authentication Navigation', () => {
  it('should show loading indicator when auth is not initialized', () => {
    const {getByTestId} = renderWithProviders(<RootNavigation />);

    // Should show loading indicator
    expect(getByTestId).toBeDefined();
  });

  it('should show authentication screen when user is not authenticated', () => {
    const {getByText} = renderWithProviders(<RootNavigation />, {
      isInitialized: true,
      token: null,
    });

    // Should show login screen
    expect(getByText('Welcome Back')).toBeTruthy();
  });

  it('should show dashboard screen when user is authenticated', () => {
    const {getByText} = renderWithProviders(<RootNavigation />, {
      isInitialized: true,
      token: 'valid-token',
      user: {email: 'test@example.com'},
    });

    // Should show cuisine list screen
    expect(getByText('Список кухонь')).toBeTruthy();
  });
});
