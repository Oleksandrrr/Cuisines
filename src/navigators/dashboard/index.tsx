import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RestaurantList from '../../features/dashboard/screens/RestaurantList';
import RestaurantDetail from '../../features/dashboard/screens/RestaurantDetail';
import CuisineList from '../../features/dashboard/screens/CuisineList';

export type DashboardStackParamList = {
  CuisineList: undefined;
  RestaurantList: {cuisineId: string; cuisineName: string};
  RestaurantDetail: {restaurantId: string};
};

const Stack = createNativeStackNavigator<DashboardStackParamList>();

const DashboardNavigation: FC = () => {
  return (
    <Stack.Navigator initialRouteName="CuisineList">
      <Stack.Screen
        name="CuisineList"
        component={CuisineList}
        options={{
          title: 'Cuisines',
          headerStyle: {
            backgroundColor: '#9933FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="RestaurantList"
        component={RestaurantList}
        options={{
          title: 'Restaurants',
          headerStyle: {
            backgroundColor: '#9933FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="RestaurantDetail"
        component={RestaurantDetail}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default DashboardNavigation;
