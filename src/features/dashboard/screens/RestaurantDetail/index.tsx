import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {useAppDispatch} from '../../../../store/hooks';
import {DashboardStackParamList} from '../../../../navigators/dashboard';
import {useRestaurantDetail} from '../../hooks/useRestaurantDetail';
import {clearAuthAndLogout} from '../../../../utils/auth';
import {UI_CONFIG} from '../../../../config';

type RestaurantDetailNavigationProp = NativeStackNavigationProp<
  DashboardStackParamList,
  'RestaurantDetail'
>;

type RestaurantDetailRouteProp = RouteProp<
  DashboardStackParamList,
  'RestaurantDetail'
>;

const RestaurantDetail: React.FC = () => {
  const route = useRoute<RestaurantDetailRouteProp>();
  const navigation = useNavigation<RestaurantDetailNavigationProp>();
  const dispatch = useAppDispatch();
  const restaurantId = route.params.restaurantId;
  const {restaurant, isLoading, error} = useRestaurantDetail(restaurantId);

  const handleBack = () => {
    navigation.goBack();
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={UI_CONFIG.COLORS.PRIMARY} />
        <Text style={styles.loadingText}>Loading restaurant details...</Text>
      </View>
    );
  }

  if (error || !restaurant) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load restaurant details</Text>
        <Text style={styles.errorSubtext}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      {/* Header Image Section */}
      <View style={styles.headerSection}>
        <Image source={{uri: restaurant.imageUrl}} style={styles.headerImage} />

        {/* Navigation Arrow */}
        <TouchableOpacity style={styles.navArrow} onPress={handleBack}>
          <Text style={styles.arrowText}>‹</Text>
        </TouchableOpacity>

        {/* Delivery Info Badges */}
        <View style={styles.deliveryBadges}>
          <View style={styles.badge}>
            <Text style={styles.badgeLabel}>DELIVERY</Text>
            <Text style={styles.badgeValue}>
              {restaurant.currency} {restaurant.deliveryCost}
            </Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeLabel}>MIN. ORDER</Text>
            <Text style={styles.badgeValue}>
              {restaurant.currency} {restaurant.minOrder}
            </Text>
          </View>
        </View>
      </View>

      {/* Restaurant Info Section */}
      <View style={styles.infoSection}>
        <Text style={styles.title}>{restaurant.restaurantName}</Text>
        <Text style={styles.description}>{restaurant.shortDesc}</Text>

        <View style={styles.ratingRow}>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingIcon}>😊</Text>
            <Text style={styles.ratingText}>
              Very good, {restaurant.rating}
            </Text>
          </View>
          {restaurant.speciality && (
            <View style={styles.categoryButton}>
              <Text style={styles.categoryText}>{restaurant.speciality}</Text>
            </View>
          )}
        </View>

        {/* Restaurant Details */}
        <View style={styles.detailsSection}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Delivery Time:</Text>
            <Text style={styles.detailValue}>{restaurant.deliveryTime}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Rating:</Text>
            <Text style={styles.detailValue}>⭐ {restaurant.rating}/10</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Minimum Order:</Text>
            <Text style={styles.detailValue}>
              {restaurant.currency} {restaurant.minOrder}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    paddingBottom: 20, // Add some padding at the bottom for the last section
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
  headerSection: {
    position: 'relative',
    height: 350,
    width: '100%',
  },
  headerImage: {
    flex: 1,
    // width: '100%',
    height: 350,
    resizeMode: 'cover',
  },
  navArrow: {
    position: 'absolute',
    left: 16,
    top: 60,
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  arrowText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  deliveryBadges: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  badgeLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#666',
    textTransform: 'uppercase',
  },
  badgeValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  infoSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    zIndex: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  ratingText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  categoryButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
  },
  detailsSection: {
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
  },
  actionButton: {
    backgroundColor: '#9933FF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 100,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  logoutButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF4444',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});

export default RestaurantDetail;
