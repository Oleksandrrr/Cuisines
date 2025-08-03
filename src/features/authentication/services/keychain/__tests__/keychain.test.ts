import {keychainService} from '../index';
import {describe, it, expect, beforeEach, jest} from '@jest/globals';
// Mock react-native-keychain
jest.mock('react-native-keychain', () => ({
  setInternetCredentials: jest.fn(),
  getInternetCredentials: jest.fn(),
  resetInternetCredentials: jest.fn(),
  canImplyAuthentication: jest.fn(),
}));

describe('KeychainService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('saveToken', () => {
    it('should save token successfully', async () => {
      const mockSetInternetCredentials =
        require('react-native-keychain').setInternetCredentials;
      mockSetInternetCredentials.mockResolvedValue(true);

      await keychainService.saveToken('test-token');

      expect(mockSetInternetCredentials).toHaveBeenCalledWith(
        'raisin_eat_token',
        'token',
        'test-token',
      );
    });

    it('should throw error when saving fails', async () => {
      const mockSetInternetCredentials =
        require('react-native-keychain').setInternetCredentials;
      mockSetInternetCredentials.mockRejectedValue(new Error('Save failed'));

      await expect(keychainService.saveToken('test-token')).rejects.toThrow(
        'Failed to save token',
      );
    });
  });

  describe('getToken', () => {
    it('should return token when available', async () => {
      const mockGetInternetCredentials =
        require('react-native-keychain').getInternetCredentials;
      mockGetInternetCredentials.mockResolvedValue({
        username: 'token',
        password: 'test-token',
      });

      const result = await keychainService.getToken();

      expect(result).toBe('test-token');
    });

    it('should return null when no token found', async () => {
      const mockGetInternetCredentials =
        require('react-native-keychain').getInternetCredentials;
      mockGetInternetCredentials.mockResolvedValue(null);

      const result = await keychainService.getToken();

      expect(result).toBeNull();
    });
  });

  describe('saveUserData', () => {
    it('should save user data successfully', async () => {
      const mockSetInternetCredentials =
        require('react-native-keychain').setInternetCredentials;
      mockSetInternetCredentials.mockResolvedValue(true);

      const userData = {
        token: 'test-token',
        user: {id: 1, email: 'test@example.com'},
      };

      await keychainService.saveUserData(userData);

      expect(mockSetInternetCredentials).toHaveBeenCalledWith(
        'raisin_eat_user_data',
        'user_data',
        JSON.stringify(userData),
      );
    });
  });

  describe('getUserData', () => {
    it('should return user data when available', async () => {
      const mockGetInternetCredentials =
        require('react-native-keychain').getInternetCredentials;
      const userData = {
        token: 'test-token',
        user: {id: 1, email: 'test@example.com'},
      };

      mockGetInternetCredentials.mockResolvedValue({
        username: 'user_data',
        password: JSON.stringify(userData),
      });

      const result = await keychainService.getUserData();

      expect(result).toEqual(userData);
    });

    it('should return null when no user data found', async () => {
      const mockGetInternetCredentials =
        require('react-native-keychain').getInternetCredentials;
      mockGetInternetCredentials.mockResolvedValue(null);

      const result = await keychainService.getUserData();

      expect(result).toBeNull();
    });
  });

  describe('clearAllData', () => {
    it('should clear all data successfully', async () => {
      const mockResetInternetCredentials =
        require('react-native-keychain').resetInternetCredentials;
      mockResetInternetCredentials.mockResolvedValue(true);

      await keychainService.clearAllData();

      expect(mockResetInternetCredentials).toHaveBeenCalledTimes(3);
      expect(mockResetInternetCredentials).toHaveBeenCalledWith(
        'raisin_eat_token',
      );
      expect(mockResetInternetCredentials).toHaveBeenCalledWith(
        'raisin_eat_user_data',
      );
      expect(mockResetInternetCredentials).toHaveBeenCalledWith(
        'raisin_eat_credentials',
      );
    });
  });
});
