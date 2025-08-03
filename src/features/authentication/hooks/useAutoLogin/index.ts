import React, {useState, useEffect} from 'react';
import {useAppDispatch} from '../../../../store/hooks';
import {loginUser} from '../../slice';
import {keychainService} from '../../services/keychain';

export interface UseAutoLoginReturn {
  isAutoLoginAvailable: boolean;
  isLoading: boolean;
  error: string | null;
  performAutoLogin: () => Promise<boolean>;
  clearSavedCredentials: () => Promise<void>;
}

export const useAutoLogin = (): UseAutoLoginReturn => {
  const [isAutoLoginAvailable, setIsAutoLoginAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const performAutoLogin = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      // Check if there are saved credentials
      const credentials = await keychainService.getCredentials();

      if (!credentials) {
        setIsAutoLoginAvailable(false);
        return false;
      }

      // Perform automatic login
      await dispatch(loginUser(credentials)).unwrap();

      console.log('Auto login successful');
      return true;
    } catch (loginError: any) {
      console.error('Auto login failed:', loginError);
      setError(loginError.message || 'Auto login failed');

      // If auto-login failed, clear saved credentials
      await clearSavedCredentials();

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const clearSavedCredentials = async (): Promise<void> => {
    try {
      await keychainService.clearAllData();
      setIsAutoLoginAvailable(false);
      setError(null);
      console.log('Saved credentials cleared');
    } catch (error) {
      console.error('Error clearing saved credentials:', error);
    }
  };

  // Check auto-login availability during initialization
  const checkAutoLoginAvailability = async () => {
    try {
      const credentials = await keychainService.getCredentials();
      setIsAutoLoginAvailable(!!credentials);
    } catch (error) {
      console.error('Error checking auto login availability:', error);
      setIsAutoLoginAvailable(false);
    }
  };

  // Call check when hook is created
  useEffect(() => {
    checkAutoLoginAvailability();
  }, []);

  return {
    isAutoLoginAvailable,
    isLoading,
    error,
    performAutoLogin,
    clearSavedCredentials,
  };
};
