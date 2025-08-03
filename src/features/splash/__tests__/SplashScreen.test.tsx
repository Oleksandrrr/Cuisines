import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import SplashScreen from '../SplashScreen';

// Mock react-native-linear-gradient
jest.mock('react-native-linear-gradient', () => {
  const {View} = require('react-native');
  return View;
});

// Mock Dimensions
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    Dimensions: {
      get: jest.fn().mockReturnValue({
        width: 375,
        height: 812,
      }),
    },
  };
});

describe('SplashScreen', () => {
  const mockOnFinish = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders correctly', () => {
    const {toJSON} = render(<SplashScreen onFinish={mockOnFinish} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onFinish after 3 seconds', async () => {
    render(<SplashScreen onFinish={mockOnFinish} />);

    // Fast-forward time by 3 seconds
    jest.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(mockOnFinish).toHaveBeenCalledTimes(1);
    });
  });

  it('displays RaisinEat text', () => {
    const {getByText} = render(<SplashScreen onFinish={mockOnFinish} />);
    expect(getByText('RaisinEat')).toBeTruthy();
  });

  it('does not call onFinish before 3 seconds', () => {
    render(<SplashScreen onFinish={mockOnFinish} />);

    // Fast-forward time by 2.9 seconds
    jest.advanceTimersByTime(2900);

    expect(mockOnFinish).not.toHaveBeenCalled();
  });
});
