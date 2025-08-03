import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {login} from './services/api';
import {keychainService} from './services/keychain';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: any | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isInitialized: false,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginCredentials, {rejectWithValue}) => {
    try {
      const response = await login(credentials);
      // Save data to Keychain
      // in response is no token, so  this is not working
      await keychainService.saveToken(response.token);
      await keychainService.saveUserData({
        token: response.token,
        user: response.user,
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  },
);

export const initializeAuth = createAsyncThunk(
  'auth/initializeAuth',
  async (_, {rejectWithValue}) => {
    try {
      const token = await keychainService.getToken();
      const userData = await keychainService.getUserData();

      if (token && userData) {
        return {token, user: userData.user};
      }
      return null;
    } catch (error: any) {
      return rejectWithValue('Failed to initialize auth');
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, {rejectWithValue}) => {
    try {
      await keychainService.clearAllData();
      return null;
    } catch (error: any) {
      return rejectWithValue('Failed to logout');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isInitialized = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(initializeAuth.pending, state => {
        state.isLoading = true;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isInitialized = true;
        if (action.payload) {
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      })
      .addCase(initializeAuth.rejected, state => {
        state.isLoading = false;
        state.isInitialized = true;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.user = null;
        state.token = null;
        state.isInitialized = true;
        state.error = null;
      });
  },
});

export const {clearError} = authSlice.actions;

export const selectIsAuthenticated = (state: {auth: AuthState}) =>
  !!state.auth.token && !!state.auth.user;

export const selectIsAuthInitialized = (state: {auth: AuthState}) =>
  state.auth.isInitialized;

export const selectAuthLoading = (state: {auth: AuthState}) =>
  state.auth.isLoading;

export const selectAuthError = (state: {auth: AuthState}) => state.auth.error;

export default authSlice.reducer;
