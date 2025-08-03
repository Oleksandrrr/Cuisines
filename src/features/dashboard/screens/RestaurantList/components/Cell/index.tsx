import React, {memo, useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Restaurant} from '../../../../services/api/fetchCuisines/types';
import {DashboardStackParamList} from '../../../../../../navigators/dashboard';

type RestaurantListNavigationProp = NativeStackNavigationProp<
  DashboardStackParamList,
  'RestaurantList'
>;

interface RestaurantCellProps {
  restaurant: Restaurant;
}

const RestaurantCell: React.FC<RestaurantCellProps> = memo(({restaurant}) => {
  const navigation = useNavigation<RestaurantListNavigationProp>();

  const handlePress = useCallback(() => {
    navigation.navigate('RestaurantDetail', {restaurantId: restaurant.id});
  }, [navigation, restaurant.id]);

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <FastImage
        source={{
          uri: restaurant.imageUrl,
          priority: FastImage.priority.normal,
          cache: FastImage.cacheControl.immutable,
        }}
        style={styles.backgroundImage}
        resizeMode={FastImage.resizeMode.cover}>
        <View style={styles.overlay}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{restaurant.restaurantName}</Text>
              <Text style={styles.description}>{restaurant.shortDesc}</Text>
            </View>
            <View style={styles.deliveryTimeBadge}>
              <Text style={styles.deliveryTimeText}>
                {restaurant.deliveryTime}
              </Text>
            </View>
          </View>
          <View style={styles.footer}>
            <View style={styles.deliveryInfo}>
              <Text style={styles.deliveryIcon}>🚚</Text>
              <Text style={styles.deliveryCost}>
                {restaurant.currency} {restaurant.deliveryCost}
              </Text>
            </View>
            <View style={styles.ratingInfo}>
              <Text style={styles.ratingIcon}>😊</Text>
              <Text style={styles.rating}>{restaurant.rating}</Text>
            </View>
          </View>
        </View>
        {!restaurant.isOpen && (
          <View style={styles.closedOverlay}>
            <Text style={styles.closedText}>Closed</Text>
          </View>
        )}
      </FastImage>
    </TouchableOpacity>
  );
});

RestaurantCell.displayName = 'RestaurantCell';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backgroundImage: {
    height: 200,
    width: '100%',
  },
  imageStyle: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'space-between',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  deliveryTimeBadge: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  deliveryTimeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    width: '100%',
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  deliveryCost: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  ratingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  closedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  closedText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
  },
});

export default RestaurantCell;
