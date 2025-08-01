import Login from '../../features/authentication/screens/Login';
import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthenticationNavigation: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default AuthenticationNavigation;
