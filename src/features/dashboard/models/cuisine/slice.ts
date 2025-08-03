import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {fetchCuisines} from '../../services/api/fetchCuisines';
import {Cuisine} from '../../services/api/fetchCuisines/types';
import {normalizeFetchCuisines} from './normalizers';

export interface CuisineState {
  cuisines: Cuisine[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CuisineState = {
  cuisines: [],
  isLoading: false,
  error: null,
};

export const fetchCuisinesAsync = createAsyncThunk(
  'cuisine/fetchCuisines',
  async (_, {rejectWithValue}) => {
    try {
      const response = await fetchCuisines();
      const normalizedCuisines = normalizeFetchCuisines(response);
      return normalizedCuisines;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch cuisines');
    }
  },
);

const cuisineSlice = createSlice({
  name: 'cuisine',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCuisinesAsync.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCuisinesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cuisines = action.payload;
        state.error = null;
      })
      .addCase(fetchCuisinesAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {clearError} = cuisineSlice.actions;
export default cuisineSlice.reducer;
