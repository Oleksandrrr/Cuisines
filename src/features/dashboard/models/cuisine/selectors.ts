import {RootState} from '../../../../store';

const selectCuisineState = (state: RootState) => state.cuisine;

const selectCuisines = (state: RootState) => selectCuisineState(state).cuisines;

const selectCuisineLoading = (state: RootState) =>
  selectCuisineState(state).isLoading;

const selectCuisineError = (state: RootState) =>
  selectCuisineState(state).error;

export const selectors = {
  selectCuisines,
  selectCuisineLoading,
  selectCuisineError,
};
