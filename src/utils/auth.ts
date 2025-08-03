import {keychainService} from '../features/authentication/services/keychain';
import {useAppDispatch} from '../store/hooks';
import {logoutUser} from '../features/authentication/slice';

/**
 * Utility functions for authentication management
 */

/**
 * Clears all authentication data and returns to login screen
 * This function:
 * 1. Clears Keychain storage
 * 2. Clears Redux auth state
 * 3. User will be automatically redirected to login screen
 */
export const clearAuthAndLogout = async (
  dispatch: ReturnType<typeof useAppDispatch>,
) => {
  try {
    // Clear Keychain storage
    await keychainService.clearAllData();

    // Clear Redux auth state
    await dispatch(logoutUser()).unwrap();

    console.log('Successfully logged out and cleared all auth data');
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

/**
 * Clears only Keychain data without affecting Redux state
 * Useful for debugging or manual cleanup
 */
export const clearKeychainOnly = async () => {
  try {
    await keychainService.clearAllData();
    console.log('Successfully cleared Keychain data');
  } catch (error) {
    console.error('Error clearing Keychain:', error);
    throw error;
  }
};

/**
 * Checks if user is authenticated by checking Keychain
 * Returns true if token exists in Keychain
 */
export const checkKeychainAuth = async (): Promise<boolean> => {
  try {
    const token = await keychainService.getToken();
    return !!token;
  } catch (error) {
    console.error('Error checking Keychain auth:', error);
    return false;
  }
};

/**
 * Gets stored user data from Keychain
 * Returns null if no data found
 */
export const getStoredUserData = async () => {
  try {
    return await keychainService.getUserData();
  } catch (error) {
    console.error('Error getting stored user data:', error);
    return null;
  }
};

/**
 * Force logout - clears everything and forces app restart
 * This is a more aggressive logout method
 */
export const forceLogout = async (
  dispatch: ReturnType<typeof useAppDispatch>,
) => {
  try {
    // Clear everything
    await clearAuthAndLogout(dispatch);

    // In a real app, you might want to restart the app here
    // For React Native, you could use react-native-restart
    console.log('Force logout completed');
  } catch (error) {
    console.error('Error during force logout:', error);
    throw error;
  }
};
