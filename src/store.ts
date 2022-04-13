import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import {vacationApi} from './vacations/vacationsApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [vacationApi.reducerPath]: vacationApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(vacationApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
