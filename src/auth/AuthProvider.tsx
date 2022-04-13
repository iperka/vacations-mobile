import React, {useEffect, useState} from 'react';
import {AUTH0_CLIENT_ID, AUTH0_DOMAIN} from '@env';
import Auth0 from 'react-native-auth0';
import * as Keychain from 'react-native-keychain';
import {useDispatch} from 'react-redux';
import {setCredentials} from './authSlice';

const auth0 = new Auth0({
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
});

export const AuthContext = React.createContext<{
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  accessToken: string | null;
  auth0: Auth0;
  setAccessToken: (accessToken: string | null) => void;
}>({
  isLoggedIn: false,
  user: null,
  setIsLoggedIn: () => {},
  setUser: () => {},
  auth0,
  accessToken: null,
  setAccessToken: () => {},
});

export interface User {
  email: string;
  emailVerified: boolean;
  familyName: string;
  givenName: string;
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updatedAt: string;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    Keychain.getGenericPassword()
      .then(storedCredentials => {
        if (storedCredentials) {
          console.log(
            'Credentials successfully loaded for user ' +
              storedCredentials.username,
          );
          auth0.auth
            .refreshToken({refreshToken: storedCredentials.password})
            .then(credentials => {
              setAccessToken(credentials.accessToken);
              setIsLoggedIn(true);
              auth0.auth
                .userInfo({token: credentials.accessToken})
                .then(userInfo => {
                  setUser(userInfo);
                  dispatch(
                    setCredentials({
                      user: userInfo,
                      token: credentials.accessToken,
                    }),
                  );
                });
            })
            .catch(e => {
              console.error(e);
              Keychain.resetGenericPassword();
            });
        } else {
          console.log('No credentials stored');
        }
      })
      .catch(error => {
        console.log("Keychain couldn't be accessed!", error);
      });
  }, [dispatch]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        auth0,
        accessToken,
        setAccessToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
