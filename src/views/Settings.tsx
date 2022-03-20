import {AUTH0_CLIENT_ID, AUTH0_DOMAIN} from '@env';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Linking,
  Modal,
  Pressable,
  ScrollView,
  Switch,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Auth0 from 'react-native-auth0';
import * as Keychain from 'react-native-keychain';
import QRCode from 'react-native-qrcode-svg';
import Svg, {Path} from 'react-native-svg';
import {useDispatch} from 'react-redux';
import tw from 'twrnc';
import {Avatar, Button, Card, Input, Typography} from '../components';
import {useAuth} from '../hooks/useAuth';
import {setCredentials} from '../store/authSlice';

const auth0 = new Auth0({
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
});

const useMount = (func: any) => useEffect(() => func(), []);
const useInitialURL = () => {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  useMount(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();
      console.log(initialUrl);
      setUrl(initialUrl);
      setLoading(false);
    };

    getUrlAsync();
  });

  return {url, loading};
};

const Settings = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const {user} = useAuth();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const {url: initialUrl, loading} = useInitialURL();
  const [emailHash, setEmailHash] = useState<string>();

  // const handlePress = useCallback(async () => {
  //   // Open the custom settings if the app has one
  //   console.log(await Linking.getInitialURL());
  // }, []);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: user.email || '',
      phone: '',
      perYear: 25,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: true,
      sunday: true,
    },
  });

  return (
    <View style={[tw`py-4 flex h-full`]}>
      <Typography style={[tw`px-4 text-2xl font-bold`]}>Settings</Typography>
      <Modal
        style={[isDarkMode ? tw`bg-gray-900` : tw`bg-white`]}
        animationType="slide"
        visible={showModal}
        presentationStyle="formSheet"
        onRequestClose={() => {
          setShowModal(false);
        }}>
        <View
          style={[
            tw`w-full h-full flex items-center py-12 px-5`,
            isDarkMode ? tw`bg-gray-900` : tw`bg-white`,
          ]}>
          <Button
            text="Close"
            style={[tw`my-4`]}
            onPress={() => setShowModal(false)}
          />
          <QRCode
            size={250}
            value={`${
              initialUrl === null ? 'vacations' : initialUrl
            }://friends/${user !== null ? user.sub.replace('|', '_') : 'n/a'}`}
          />
          <Avatar style={[tw`mt-5`]} />
          <Typography style={[tw`text-2xl font-bold mt-4`]}>
            {user !== null ? user.name : 'n/a'}
          </Typography>
          <Typography style={[tw`text-lg mt-1`]}>
            Add me to your friends!
          </Typography>
          <Text>{emailHash}</Text>
        </View>
      </Modal>
      <ScrollView style={[tw`flex-1`]}>
        <Card title="Vacations">
          <View>
            <Text style={[tw`dark:text-white`]}>Per year</Text>
            <Input
              name="perYear"
              control={control}
              invalid={errors.perYear !== undefined}
              rules={{required: true, min: 0, max: 365}}
              disabled={loading}
              textContentType="none"
              keyboardType="decimal-pad"
              autoCapitalize="none"
              returnKeyType="next"
            />
          </View>
          <Text style={[tw`mt-4 dark:text-white text-lg`]}>Freetime</Text>
          {[
            'sunday',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
          ].map((weekday, index) => (
            <View style={[tw`my-2 flex flex-row items-center`]} key={index}>
              <Text style={[tw`flex-grow dark:text-white`]}>
                {moment.weekdays()[index]}
              </Text>
              <Controller
                control={control}
                name={weekday as any}
                render={({field: {onChange, value}}) => (
                  <Switch value={value} onValueChange={onChange} />
                )}
              />
            </View>
          ))}
        </Card>
        <Card title="Friends">
          <View>
            <Text style={[tw`dark:text-white`]}>Email</Text>
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
          <View style={[tw`my-2 mt-2`]}>
            <Text style={[tw`dark:text-white`]}>Phone</Text>
            <Input
              name="phone"
              control={control}
              invalid={errors.phone !== undefined}
              rules={{required: true}}
              disabled={loading}
              textContentType="telephoneNumber"
              keyboardType="number-pad"
              autoCapitalize="none"
              returnKeyType="next"
            />
          </View>
          <View style={[tw`my-2 flex flex-row items-center`]}>
            <Text style={[tw`flex-grow dark:text-white`]}>
              Allow friends to find me.
            </Text>
            <Switch />
          </View>
        </Card>
      </ScrollView>
      <Card>
        <View style={[tw`flex`]}>
          <View style={[tw`flex flex-row my-2 items-center`]}>
            <Avatar />
            <View style={[tw`flex flex-grow ml-2`]}>
              <Typography style={[tw`text-xl font-bold`]}>
                {user !== null ? user.name : 'n/a'}
              </Typography>
              <Typography>{user !== null ? user.sub : 'n/a'}</Typography>
            </View>
            <Pressable
              style={[
                tw`w-9 h-9 p-0 bg-transparent border border-black rounded-lg`,
              ]}
              onPress={() => setShowModal(true)}>
              <Svg
                style={[
                  tw`w-8 h-8 mx-1 my-1`,
                  isDarkMode ? tw`text-white` : tw`text-black`,
                ]}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2">
                <Path
                  fill-rule="evenodd"
                  d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z"
                  clip-rule="evenodd"
                />
                <Path d="M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zM16 9a1 1 0 100 2 1 1 0 000-2zM9 13a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zM7 11a1 1 0 100-2H4a1 1 0 100 2h3zM17 13a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM16 17a1 1 0 100-2h-3a1 1 0 100 2h3z" />
              </Svg>
            </Pressable>
          </View>
          <Button
            text="Sign Out"
            onPress={() => {
              auth0.webAuth
                .clearSession()
                .then(() => {
                  Keychain.resetGenericPassword();
                })
                .then(() =>
                  dispatch(setCredentials({token: null, user: undefined})),
                );
            }}
          />
        </View>
      </Card>
    </View>
  );
};

export default Settings;
