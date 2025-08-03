import {NavigationContainer} from '@react-navigation/native';
import React, {FC, useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {
  selectIsAuthenticated,
  selectIsAuthInitialized,
} from '../features/authentication/slice';
import {initializeAuth} from '../features/authentication/slice';
import AuthenticationNavigation from './authentication';
import DashboardNavigation from './dashboard';

const RootNavigation: FC = () => {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(selectIsAuthenticated);
  const isInitialized = useAppSelector(selectIsAuthInitialized);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await dispatch(initializeAuth());
      } catch (error) {
        console.error('Failed to initialize auth:', error);
      }
    };

    if (!isInitialized) {
      initAuth();
    }
  }, [dispatch, isInitialized]);

  // Show loading indicator until initialization is complete
  if (!isInitialized) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9933FF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!isAuthorized && <AuthenticationNavigation />}
      {!!isAuthorized && <DashboardNavigation />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});

export default RootNavigation;
