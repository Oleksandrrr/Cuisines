import React, {useEffect, useCallback} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {DashboardStackParamList} from '../../../../navigators/dashboard';
import {useRestaurants} from '../../hooks/useRestaurants';
import RestaurantCell from './components/Cell';
import {Restaurant} from '../../services/api/fetchCuisines/types';

type RestaurantListNavigationProp = NativeStackNavigationProp<
  DashboardStackParamList,
  'RestaurantList'
>;

type RestaurantListRouteProp = RouteProp<
  DashboardStackParamList,
  'RestaurantList'
>;

const RestaurantList: React.FC = () => {
  const route = useRoute<RestaurantListRouteProp>();
  const navigation = useNavigation<RestaurantListNavigationProp>();
  const {cuisineId, cuisineName} = route.params;
  const {restaurants, isLoading, error} = useRestaurants(cuisineId);

  useEffect(() => {
    if (cuisineName) {
      navigation.setOptions({
        title: cuisineName,
      });
    }
  }, [navigation, cuisineName]);

  const renderRestaurant = useCallback(
    ({item}: {item: Restaurant}) => <RestaurantCell restaurant={item} />,
    [],
  );

  const keyExtractor = useCallback((item: Restaurant) => item.id, []);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: 200, // Approximate height of each item
      offset: 200 * index,
      index,
    }),
    [],
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#9933FF" />
        <Text style={styles.loadingText}>Loading restaurants...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Failed to load restaurants</Text>
        <Text style={styles.errorSubtext}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={restaurants}
      renderItem={renderRestaurant}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={10}
      removeClippedSubviews={true}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF4444',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default RestaurantList;
