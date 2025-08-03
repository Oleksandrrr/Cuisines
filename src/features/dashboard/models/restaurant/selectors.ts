import {createSelector} from 'reselect';
import {RootState} from '../../../../store';

const selectRestaurantState = (state: RootState) => state.restaurant;

const selectRestaurants = createSelector(
  [selectRestaurantState, (state: RootState, cuisineId: string) => cuisineId],
  (restaurantState, cuisineId) => {
    const all = restaurantState.restaurants;
    // Filter by cuisineId (now restaurants have isOpen property)
    const filtered = all.filter(r => r.cuisineId === cuisineId);
    // Sort: open first, then closed
    return [
      ...filtered.filter(r => r.isOpen),
      ...filtered.filter(r => !r.isOpen),
    ];
  },
);

const selectRestaurantLoading = createSelector(
  [selectRestaurantState],
  restaurantState => restaurantState.isLoading,
);

const selectRestaurantError = createSelector(
  [selectRestaurantState],
  restaurantState => restaurantState.error,
);

const selectSelectedRestaurant = createSelector(
  [selectRestaurantState],
  restaurantState => restaurantState.selectedRestaurant,
);

export const selectors = {
  selectRestaurants,
  selectRestaurantLoading,
  selectRestaurantError,
  selectSelectedRestaurant,
};
