import {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {useCuisines} from '../../hooks';
import CuisineCell from './components/Cell';

const CuisineList = () => {
  const {cuisines, error, fetch} = useCuisines();

  if (error) {
    fetch();
  }

  useEffect(() => {
    fetch();
  }, [fetch]);

  //TODO: I feel like this not the best solution. later I will refactor it.
  return (
    <ScrollView>
      {cuisines.map(item => (
        <CuisineCell />
      ))}
    </ScrollView>
  );
};

export default CuisineList;
