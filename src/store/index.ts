import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import authReducer from '../features/authentication/slice';
import cuisineReducer from '../features/dashboard/models/cuisine/slice';
import restaurantReducer from '../features/dashboard/models/restaurant/slice';

// Persist configuration for auth
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['user', 'token'], // Only persist user and token
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    cuisine: cuisineReducer,
    restaurant: restaurantReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      // Performance optimizations
      immutableCheck: {
        ignoredPaths: ['restaurant.restaurants'], // Ignore large arrays
      },
    }),
  devTools: __DEV__,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
