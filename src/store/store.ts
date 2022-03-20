import {configureStore} from '@reduxjs/toolkit';
import {friendshipApi} from '../services/friendships';
import {vacationApi} from '../services/vacation';
import {userApi} from '../services/users';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [vacationApi.reducerPath]: vacationApi.reducer,
    [friendshipApi.reducerPath]: friendshipApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(vacationApi.middleware)
      .concat(userApi.middleware)
      .concat(friendshipApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
