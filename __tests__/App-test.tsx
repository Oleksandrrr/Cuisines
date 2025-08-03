/**
 * @format
 */

import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../src/App';

// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';

// Mock react-native-linear-gradient
jest.mock('react-native-linear-gradient', () => {
  const {View} = require('react-native');
  return View;
});

// Mock react-native-splash-screen
jest.mock('react-native-splash-screen', () => ({
  hide: jest.fn(),
  show: jest.fn(),
}));

it('renders correctly', () => {
  const {toJSON} = render(<App />);
  expect(toJSON()).toBeTruthy();
});
