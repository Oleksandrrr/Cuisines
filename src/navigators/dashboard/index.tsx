import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RestaurantList from '../../features/dashboard/screens/RestaurantList';
import RestaurantDetail from '../../features/dashboard/screens/RestaurantDetail';
import CuisineList from '../../features/dashboard/screens/CuisineList';

const Stack = createNativeStackNavigator();

const DashboardNavigation: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cuisines" component={CuisineList} />
      <Stack.Screen name="Restaurants" component={RestaurantList} />
      <Stack.Screen name="Detail" component={RestaurantDetail} />
    </Stack.Navigator>
  );
};

export default DashboardNavigation;
