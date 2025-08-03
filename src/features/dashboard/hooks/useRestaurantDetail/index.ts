import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../store/hooks';
import {fetchRestaurantDetailAsync} from '../../models/restaurant/slice';
import {selectors as restaurantSelectors} from '../../models/restaurant/selectors';

export const useRestaurantDetail = (restaurantId: string) => {
  const dispatch = useAppDispatch();
  const restaurant = useAppSelector(
    restaurantSelectors.selectSelectedRestaurant,
  );
  const isLoading = useAppSelector(restaurantSelectors.selectRestaurantLoading);
  const error = useAppSelector(restaurantSelectors.selectRestaurantError);

  useEffect(() => {
    if (restaurantId) {
      dispatch(fetchRestaurantDetailAsync(restaurantId));
    }
  }, [dispatch, restaurantId]);

  return {
    restaurant,
    isLoading,
    error,
  };
};
