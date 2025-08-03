import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {describe, it, expect, jest, beforeEach} from '@jest/globals';
import {TextInput, TouchableOpacity, Text, View} from 'react-native';
import {useLogin} from '../hooks/useLogin';
import authReducer from '../slice';

// Mock API
jest.mock('../services/api', () => ({
  login: jest.fn(),
}));

// Mock Keychain
jest.mock('../services/keychain', () => ({
  keychainService: {
    saveToken: jest.fn().mockResolvedValue(undefined),
    saveUserData: jest.fn().mockResolvedValue(undefined),
    getToken: jest.fn().mockResolvedValue(null),
    getUserData: jest.fn().mockResolvedValue(null),
    clearAllData: jest.fn().mockResolvedValue(undefined),
  },
}));

const mockLogin = require('../services/api').login;

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

const TestComponent = () => {
  const {email, setEmail, password, setPassword, handleLogin, isLoading} =
    useLogin();

  return (
    <View>
      <TextInput testID="email-input" value={email} onChangeText={setEmail} />
      <TextInput
        testID="password-input"
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        testID="login-button"
        onPress={handleLogin}
        disabled={isLoading}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

describe('Login Navigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update auth state after successful login', async () => {
    const mockResponse = {
      user: {id: 1, email: 'test@example.com'},
      token: 'token-1-1234567890',
    };

    mockLogin.mockResolvedValue(mockResponse);

    const store = createTestStore();

    const {getByTestId} = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>,
    );

    // Fill in form
    fireEvent.changeText(getByTestId('email-input'), 'test@example.com');
    fireEvent.changeText(getByTestId('password-input'), 'password123');

    // Submit form
    fireEvent.press(getByTestId('login-button'));

    // Wait for async operation
    await waitFor(() => {
      const state = store.getState();
      expect(state.auth.token).toBe('token-1-1234567890');
      expect(state.auth.user).toEqual({id: 1, email: 'test@example.com'});
      expect(state.auth.isInitialized).toBe(true);
      expect(state.auth.isLoading).toBe(false);
    });
  });
});
