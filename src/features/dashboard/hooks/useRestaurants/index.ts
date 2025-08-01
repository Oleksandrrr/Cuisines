import {restaurantSelectors} from '../../models/restaurant';

export const useRestaurants = ({cuisine}: {cuisine: string}) => {
  const restaurants = restaurantSelectors.selectRestaurants(cuisine);

  return {
    restaurants,
  };
};
