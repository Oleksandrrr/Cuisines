import {NavigationContainer} from '@react-navigation/native';
import React, {FC} from 'react';
import AuthenticationNavigation from './authentication';
import DashboardNavigation from './dashboard';

const RootNavigation: FC = () => {
  const isAuthorized = false;
  return (
    <NavigationContainer>
      {!isAuthorized && <AuthenticationNavigation />}
      {!!isAuthorized && <DashboardNavigation />}
    </NavigationContainer>
  );
};

export default RootNavigation;
