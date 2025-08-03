import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import LoginScreen from '../index';

// Mock react-native-linear-gradient
jest.mock('react-native-linear-gradient', () => {
  const {View} = require('react-native');
  return View;
});

// Mock react-native-vector-icons
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

// Mock react-native-simple-toast
jest.mock('react-native-simple-toast', () => ({
  show: jest.fn(),
  SHORT: 'SHORT',
}));

// Mock useLogin hook
const mockSetEmail = jest.fn();
const mockSetPassword = jest.fn();
const mockHandleLogin = jest.fn();

jest.mock('../../../hooks/useLogin', () => ({
  useLogin: () => ({
    email: '',
    password: '',
    isLoading: false,
    error: null,
    setEmail: mockSetEmail,
    setPassword: mockSetPassword,
    handleLogin: mockHandleLogin,
  }),
}));

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {toJSON} = render(<LoginScreen />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('displays welcome text', () => {
    const {getByText} = render(<LoginScreen />);
    expect(getByText('Welcome Back')).toBeTruthy();
    expect(getByText('Hello there, sign in to continue!')).toBeTruthy();
  });

  it('shows email and password inputs', () => {
    const {getByPlaceholderText} = render(<LoginScreen />);
    expect(getByPlaceholderText('Enter your email')).toBeTruthy();
    expect(getByPlaceholderText('Enter your password')).toBeTruthy();
  });

  it('shows sign in button', () => {
    const {getByText} = render(<LoginScreen />);
    expect(getByText('Sign in')).toBeTruthy();
  });

  it('calls setEmail when email input changes', () => {
    const {getByPlaceholderText} = render(<LoginScreen />);
    const emailInput = getByPlaceholderText('Enter your email');

    fireEvent.changeText(emailInput, 'test@example.com');
    expect(mockSetEmail).toHaveBeenCalledWith('test@example.com');
  });

  it('calls setPassword when password input changes', () => {
    const {getByPlaceholderText} = render(<LoginScreen />);
    const passwordInput = getByPlaceholderText('Enter your password');

    fireEvent.changeText(passwordInput, 'password123');
    expect(mockSetPassword).toHaveBeenCalledWith('password123');
  });
});
