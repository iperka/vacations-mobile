import React, {useContext} from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDeviceContext} from 'twrnc';
import {AuthContext} from '../auth';
import {Button} from '../components';
import tw from '../tailwindcss';
import * as Keychain from 'react-native-keychain';

const AccountScreen = () => {
  useDeviceContext(tw);
  const {setIsLoggedIn, setAccessToken, auth0} = useContext(AuthContext);
  return (
    <SafeAreaView style={[tw`px-6 pt-4 h-full bg-gray-100 dark:bg-slate-900`]}>
      <Text>Account</Text>
      <Button
        text="Sign Out"
        onPress={() => {
          auth0.webAuth.clearSession().then(() => {
            setAccessToken(null);
            setIsLoggedIn(false);
            Keychain.resetGenericPassword();
          });
        }}
      />
    </SafeAreaView>
  );
};

export default AccountScreen;
