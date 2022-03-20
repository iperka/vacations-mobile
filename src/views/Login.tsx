import {AUTH0_AUDIENCE, AUTH0_CLIENT_ID, AUTH0_DOMAIN} from '@env';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  Pressable,
  Text,
  View,
} from 'react-native';
import Auth0, {Credentials} from 'react-native-auth0';
import * as Keychain from 'react-native-keychain';
import OneSignal from 'react-native-onesignal';
import Svg, {Path} from 'react-native-svg';
import {useDispatch} from 'react-redux';
import tw from 'twrnc';
import {Button, Input} from '../components';
import {setCredentials} from '../store/authSlice';

const auth0 = new Auth0({
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
});

export type LoginProps = {
  location?: {state: any};
};

const Login: React.FC<LoginProps> = ({location}) => {
  const {t} = useTranslation();
  const [showSignInModal, setShowSignInModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSignUp = () => {
    setShowSignInModal(false);
    auth0.webAuth
      .authorize({prompt: 'signUp'})
      .then(() => {
        setShowSignInModal(true);
      })
      .catch(console.error);
  };

  const handleLoginSuccess = (credentials: Credentials) => {
    auth0.auth
      .userInfo({token: credentials.accessToken})
      .then(user => {
        if (credentials.refreshToken) {
          console.log(credentials.refreshToken);
          Keychain.setGenericPassword(user.sub, credentials.refreshToken)
            .then(console.log)
            .catch(setError);
        }

        dispatch(
          setCredentials({
            token: credentials.accessToken,
            user,
          }),
        );

        OneSignal.setExternalUserId(user.sub, results => {
          // success
        });
      })
      .catch(setError);
  };

  const handleSocialLogin = (connection: string) => {
    auth0.webAuth
      .authorize({
        connection,
        scope:
          'openid profile offline_access vacations:read vacations:write friendships:read friendships:write users:read',
        audience: AUTH0_AUDIENCE,
      })
      .then(handleLoginSuccess)
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    // Retrieve the credentials
    setLoading(true);
    Keychain.getGenericPassword()
      .then(credentials => {
        if (credentials) {
          console.log(credentials.password);
          auth0.auth
            .refreshToken({refreshToken: credentials.password})
            .then(credentials => {
              setLoading(false);
              handleLoginSuccess(credentials as Credentials);
            })
            .catch(console.error);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={[tw`h-full w-full flex`]}>
      <View style={[tw`px-6 pt-12 -mb-2 flex h-full pb-12`]}>
        <Image
          source={require('../../assets/sign-in.png')}
          width={Dimensions.get('screen').width}
          resizeMode="contain"
          style={[tw`w-full h-60 mt-12`]}
        />

        <View style={[tw`flex-grow`]}>
          <Text style={[tw`text-2xl text-white font-bold mt-12`]}>
            {t('authentication:welcome')}
          </Text>
          <Text style={[tw`text-lg font-semibold text-gray-100 mt-3`]}>
            {t('authentication:slogan')}
          </Text>

          {loading && (
            <View style={[tw`absolute w-full flex items-center`]}>
              <View
                style={[
                  tw`w-32 h-32 bg-gray-900 rounded-xl opacity-95 flex justify-center items-center`,
                ]}>
                <ActivityIndicator size="large" style={[tw`text-white`]} />
                <Text style={[tw`text-white font-semibold text-lg mt-2`]}>
                  {t('common:loading')}
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={[tw`mt-12 flex`]}>
          <Button
            text={t('authentication:signIn')}
            onPress={() => setShowSignInModal(true)}
          />

          <Pressable
            onPress={handleSignUp}
            style={({pressed}) => [
              tw`mt-4 px-4 py-3 flex items-center justify-center border rounded-lg py-3`,
              pressed
                ? tw`border-gray-900 bg-indigo-900`
                : tw`border-white bg-transparent`,
            ]}>
            <Text style={[tw`text-white`]}>{t('authentication:orSignUp')}</Text>
          </Pressable>
        </View>
      </View>

      <Modal
        animationType="slide"
        visible={showSignInModal}
        transparent={true}
        onRequestClose={() => setShowSignInModal(false)}>
        <View style={[tw`bg-transparent`, {height: 510, marginTop: 'auto'}]}>
          <View
            style={[
              tw`flex-grow bg-white dark:bg-gray-700 rounded-t-xl px-6 py-4 pb-6`,
            ]}>
            <View style={[tw`flex-grow`]}>
              <Text style={[tw`text-2xl dark:text-white font-bold mt-2`]}>
                {t('authentication:welcomeBack')}
              </Text>
              <Text style={[tw`text-lg text-gray-600 dark:text-gray-200`]}>
                {t('authentication:signInToContinue')}
              </Text>

              <View style={[tw`my-2 mt-4`]}>
                <Text style={[tw`dark:text-white`]}>
                  {t('authentication:email')}
                </Text>
                <Input
                  name="email"
                  control={control}
                  invalid={errors.email !== undefined}
                  rules={{required: true}}
                  disabled={loading}
                  textContentType="username"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="next"
                />
              </View>
              <View style={[tw`my-2`]}>
                <Text style={[tw`dark:text-white`]}>
                  {t('authentication:password')}
                </Text>
                <Input
                  disabled={loading}
                  invalid={errors.password !== undefined}
                  secureTextEntry
                  textContentType="password"
                  name="password"
                  control={control}
                  rules={{required: true}}
                  returnKeyType="done"
                />
              </View>

              {error && <Text style={[tw`text-red-600 py-2`]}>{error}</Text>}
            </View>

            <View style={[tw`flex flex-col pb-5`]}>
              <Button
                text={t('authentication:signIn')}
                onPress={handleSubmit(data => {
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    auth0.auth
                      .passwordRealm({
                        username: data.email,
                        password: data.password,
                        realm: 'Username-Password-Authentication',
                        scope:
                          'openid profile offline_access vacations:read vacations:write friendships:read friendships:write users:read',
                        audience: AUTH0_AUDIENCE,
                      })
                      .then(handleLoginSuccess)
                      .catch(error => {
                        switch (error.name) {
                          case 'too_many_attempts':
                            console.error(error.message);
                            setError(error.message);
                            break;

                          case 'invalid_grant':
                            console.error(error.message);
                            setError(error.message);
                            break;

                          case 'requires_verification':
                            setLoading(true);
                            auth0.webAuth
                              .authorize({
                                connection: 'Username-Password-Authentication',
                                scope:
                                  'openid profile offline_access vacations:read vacations:write friendships:read friendships:write users:read',
                                audience: AUTH0_AUDIENCE,
                              })
                              .then(handleLoginSuccess)
                              .catch(error => setError(error.message))
                              .finally(() => setLoading(false));
                            break;

                          default:
                            console.error(error.message);
                            setError(error.message);
                            break;
                        }
                      });
                  }, 500);
                })}
                loading={loading}
              />
              <View
                style={[
                  tw`border-t-2 border-gray-300 text-gray-600 my-2 mt-4 py-2 flex items-center flex flex-row justify-center`,
                ]}>
                <Pressable onPress={handleSignUp} style={[tw`mr-1`]}>
                  <Text style={[tw`text-blue-500 font-bold`]}>
                    {t('authentication:signUp')}
                  </Text>
                </Pressable>
                <Text style={[tw`dark:text-white`]}>
                  {t('authentication:orContinueWith')}
                </Text>
              </View>
              <View style={[tw`flex flex-row w-full`]}>
                <Pressable
                  onPress={() => handleSocialLogin('github')}
                  style={({pressed}) => [
                    tw`mr-4 flex-1 flex items-center justify-center border rounded-lg py-3`,
                    pressed
                      ? tw`border-gray-900 bg-gray-900`
                      : tw`border-black bg-black`,
                  ]}>
                  <Svg
                    viewBox="0 0 24 24"
                    style={[tw`h-5 w-5`]}
                    stroke={'white'}
                    fill={'white'}>
                    <Path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </Svg>
                </Pressable>

                <Pressable
                  onPress={() => handleSocialLogin('google-oauth2')}
                  style={({pressed}) => [
                    tw`mr-4 flex-1 flex items-center justify-center border rounded-lg py-3`,
                    pressed
                      ? tw`border-gray-700 bg-gray-100`
                      : tw`border-gray-600 bg-white`,
                  ]}>
                  <Svg
                    width="24"
                    height="24"
                    viewBox="0 0 48 48"
                    style={[tw`h-5 w-5`]}>
                    <Path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></Path>
                    <Path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></Path>
                    <Path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></Path>
                    <Path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></Path>
                  </Svg>
                </Pressable>

                <Pressable
                  onPress={() => handleSocialLogin('linkedin')}
                  style={({pressed}) => [
                    tw`flex-1 flex items-center justify-center border rounded-lg py-3`,
                    pressed
                      ? tw`border-blue-700 bg-blue-700`
                      : tw`border-blue-600 bg-blue-600`,
                  ]}>
                  <Svg
                    viewBox="0 0 24 24"
                    style={[tw`h-5 w-5`]}
                    stroke={'white'}
                    fill={'white'}>
                    <Path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </Svg>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Login;
