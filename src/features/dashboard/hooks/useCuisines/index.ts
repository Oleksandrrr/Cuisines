import {useEffect, useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../store/hooks';
import {fetchCuisinesAsync} from '../../models/cuisine/slice';
import {selectors as cuisineSelectors} from '../../models/cuisine/selectors';

export const useCuisines = () => {
  const dispatch = useAppDispatch();
  const cuisines = useAppSelector(cuisineSelectors.selectCuisines);
  const isLoading = useAppSelector(cuisineSelectors.selectCuisineLoading);
  const error = useAppSelector(cuisineSelectors.selectCuisineError);

  const fetch = useCallback(() => {
    dispatch(fetchCuisinesAsync());
  }, [dispatch]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    cuisines,
    fetch,
    isLoading,
    error,
  };
};
