import {useState} from 'react';
import {cuisineSelectors, normalizeFetchCuisines} from '../../models/cuisine';
import {fetchCuisines} from '../../services/api';

export const useCuisines = () => {
  const cuisines = cuisineSelectors.selectCuisines();
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // TODO: maybe something like react-query could help in here
  // https://react-query.tanstack.com/
  const fetch = () => {
    setIsLoading(true);
    try {
      const response = normalizeFetchCuisines(fetchCuisines());
      // TODO: update the store later when I completed my redux.
      setIsLoading(false);
    } catch (error) {
      setError(error as Error);
    }
  };

  if (isLoading) {
    setError(null);
  }

  return {
    cuisines,
    fetch,
    isLoading,
    error,
  };
};
