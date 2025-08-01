import {ScrollView} from 'react-native';
import {useRestaurants} from '../../hooks';
import RestaurantCell from './components/Cell';

const RestaurantList = () => {
  const cuisine = '';
  const {restaurants} = useRestaurants({cuisine});

  //TODO: I feel like this not the best solution. later I will refactor it.
  return (
    <ScrollView>
      {restaurants.map(item => (
        <RestaurantCell />
      ))}
    </ScrollView>
  );
};

export default RestaurantList;
