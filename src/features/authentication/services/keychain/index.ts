import * as Keychain from 'react-native-keychain';
import {STORAGE_CONFIG} from '../../../../config';

export interface StoredUserData {
  token: string;
  user: any;
}

export interface UserCredentials {
  email: string;
  password: string;
}

class KeychainService {
  async saveToken(token: string): Promise<void> {
    try {
      await Keychain.setInternetCredentials(
        STORAGE_CONFIG.KEYS.AUTH_TOKEN,
        'token',
        token,
      );
    } catch (error) {
      throw new Error('Failed to save token');
    }
  }

  async getToken(): Promise<string | null> {
    try {
      const credentials = await Keychain.getInternetCredentials(
        STORAGE_CONFIG.KEYS.AUTH_TOKEN,
      );
      return credentials ? credentials.password : null;
    } catch (error) {
      return null;
    }
  }

  async saveUserData(userData: StoredUserData): Promise<void> {
    try {
      await Keychain.setInternetCredentials(
        STORAGE_CONFIG.KEYS.USER_DATA,
        'user',
        JSON.stringify(userData),
      );
    } catch (error) {
      throw new Error('Failed to save user data');
    }
  }

  async getUserData(): Promise<StoredUserData | null> {
    try {
      const credentials = await Keychain.getInternetCredentials(
        STORAGE_CONFIG.KEYS.USER_DATA,
      );
      if (credentials && credentials.password) {
        return JSON.parse(credentials.password);
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async saveCredentials(credentials: UserCredentials): Promise<void> {
    try {
      await Keychain.setInternetCredentials(
        STORAGE_CONFIG.KEYS.CREDENTIALS,
        credentials.email,
        credentials.password,
      );
    } catch (error) {
      throw new Error('Failed to save credentials');
    }
  }

  async getCredentials(): Promise<UserCredentials | null> {
    try {
      const credentials = await Keychain.getInternetCredentials(
        STORAGE_CONFIG.KEYS.CREDENTIALS,
      );
      if (credentials) {
        return {
          email: credentials.username,
          password: credentials.password,
        };
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async clearAllData(): Promise<void> {
    try {
      await Promise.all([
        Keychain.resetInternetCredentials({
          server: STORAGE_CONFIG.KEYS.AUTH_TOKEN,
        }),
        Keychain.resetInternetCredentials({
          server: STORAGE_CONFIG.KEYS.USER_DATA,
        }),
        Keychain.resetInternetCredentials({
          server: STORAGE_CONFIG.KEYS.CREDENTIALS,
        }),
      ]);
    } catch (error) {
      throw new Error('Failed to clear keychain data');
    }
  }

  async isKeychainSupported(): Promise<boolean> {
    try {
      return await Keychain.canImplyAuthentication({
        authenticationType: Keychain.AUTHENTICATION_TYPE.BIOMETRICS,
      });
    } catch (error) {
      return false;
    }
  }
}

export const keychainService = new KeychainService();
