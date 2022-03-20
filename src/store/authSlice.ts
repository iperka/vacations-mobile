import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserInfo} from 'react-native-auth0';
import {RootState} from './store';

type AuthState = {
  user: UserInfo<any> | null;
  token: string | null;
};

const slice = createSlice({
  name: 'auth',
  initialState: {user: null, token: null} as AuthState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: {user, token},
      }: PayloadAction<{user: UserInfo<any>; token: string | null}>,
    ) => {
      state.user = user;
      state.token = token;
    },
  },
});

export const {setCredentials} = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
