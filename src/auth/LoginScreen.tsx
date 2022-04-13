import {AUTH0_AUDIENCE} from '@env';
import React, {useCallback, useContext, useState} from 'react';
import {Text} from 'react-native';
import * as Keychain from 'react-native-keychain';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDeviceContext} from 'twrnc';
import {Button} from '../components';
import tw from '../tailwindcss';
import {AuthContext} from './AuthProvider';

const LoginScreen: React.FC = () => {
  useDeviceContext(tw);

  // Get the context from the AuthProvider
  const {auth0, setAccessToken, setIsLoggedIn, setUser} =
    useContext(AuthContext);

  const [error, setError] = useState<string>();

  const handleLogin = useCallback(() => {
    auth0.webAuth
      .authorize({
        scope:
          'openid profile offline_access vacations:read vacations:write friendships:read friendships:write users:read',
        audience: AUTH0_AUDIENCE,
      })
      .then(credentials => {
        setAccessToken(credentials.accessToken);
        setIsLoggedIn(true);
        auth0.auth.userInfo({token: credentials.accessToken}).then(user => {
          setUser(user);
          if (credentials.refreshToken) {
            Keychain.setGenericPassword(user.sub, credentials.refreshToken)
              .then(console.log)
              .catch(console.error);
          }
        });
      })
      .catch(e => {
        setError(e.message);
      });
  }, [auth0, setAccessToken, setIsLoggedIn, setUser]);

  return (
    <SafeAreaView style={[tw`px-6 pt-4 h-full bg-white dark:bg-slate-900`]}>
      <Text>Login Screen</Text>
      <Button onPress={handleLogin} text="Login" />
      {error && <Text>{error}</Text>}
    </SafeAreaView>
  );
};

export default LoginScreen;
