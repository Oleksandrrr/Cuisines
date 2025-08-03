import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {fetchRestaurants, fetchRestaurantDetail} from '../../services/api';
import {
  Restaurant,
  RestaurantDetail,
} from '../../services/api/fetchCuisines/types';

export interface RestaurantState {
  restaurants: Restaurant[];
  selectedRestaurant: RestaurantDetail | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: RestaurantState = {
  restaurants: [],
  selectedRestaurant: null,
  isLoading: false,
  error: null,
};

export const fetchRestaurantsAsync = createAsyncThunk(
  'restaurant/fetchRestaurants',
  async (cuisineId: string, {rejectWithValue}) => {
    try {
      const response = await fetchRestaurants(cuisineId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch restaurants');
    }
  },
);

export const fetchRestaurantDetailAsync = createAsyncThunk(
  'restaurant/fetchRestaurantDetail',
  async (restaurantId: string, {rejectWithValue}) => {
    try {
      const response = await fetchRestaurantDetail(restaurantId);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'Failed to fetch restaurant details',
      );
    }
  },
);

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    clearSelectedRestaurant: state => {
      state.selectedRestaurant = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRestaurantsAsync.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRestaurantsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.restaurants = action.payload;
        state.error = null;
      })
      .addCase(fetchRestaurantsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRestaurantDetailAsync.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRestaurantDetailAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedRestaurant = action.payload;
        state.error = null;
      })
      .addCase(fetchRestaurantDetailAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {clearSelectedRestaurant} = restaurantSlice.actions;
export default restaurantSlice.reducer;
