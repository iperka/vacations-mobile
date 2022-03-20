/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import tw, {useDeviceContext} from 'twrnc';
import {useAuth} from './hooks/useAuth';
import ComponentsView from './views/ComponentsView';
import FriendsView from './views/FriendsView';
import Login from './views/Login';
import Settings from './views/Settings';
import VacationsView from './views/VacationsView';
import './IMLocalize';
import {useTranslation} from 'react-i18next';

const getTheme: (isDarkMode: boolean) => Theme = (isDarkMode: boolean) => {
  return isDarkMode ? DarkTheme : DefaultTheme;
};

const config = {
  screens: {
    Home: '/',
    Vacations: 'vacations',
    Friends: {
      screens: {
        List: 'friends/',
        Details: 'friends/:userId',
      },
    },
  },
};

const linking = {
  prefixes: ['https://vacations.iperka.com/', 'vacations://'],
  config,
};

const App = () => {
  useDeviceContext(tw);

  const {i18n, t} = useTranslation();
  const isDarkMode = useColorScheme() === 'dark';

  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const {user} = useAuth();

  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking} theme={getTheme(isDarkMode)}>
        <StatusBar
          barStyle={isDarkMode || !user ? 'light-content' : 'dark-content'}
        />
        {user ? (
          <Tab.Navigator
            sceneContainerStyle={[
              {backgroundColor: '#f1f1f6'},
              tw`dark:bg-gray-900`,
            ]}>
            <Tab.Screen
              name={t('navigate:home')}
              component={ComponentsView}
              options={{
                headerShown: false,
                tabBarIcon: ({focused}) => {
                  return (
                    <Icon
                      name={focused ? 'ios-home' : 'ios-home-outline'}
                      size={25}
                      style={
                        focused
                          ? [tw`text-blue-500`]
                          : [tw`text-gray-900 dark:text-gray-100`]
                      }
                    />
                  );
                },
              }}
            />
            <Tab.Screen
              name={t('navigate:vacations')}
              component={VacationsView}
              options={{
                headerShown: false,
                tabBarIcon: ({focused}) => {
                  return (
                    <Icon
                      name={focused ? 'today' : 'today-outline'}
                      size={25}
                      style={
                        focused
                          ? [tw`text-blue-500`]
                          : [tw`text-gray-900 dark:text-gray-100`]
                      }
                    />
                  );
                },
              }}
            />
            <Tab.Screen
              name={t('navigate:friends')}
              component={FriendsView}
              options={{
                headerShown: false,
                tabBarIcon: ({focused}) => {
                  return (
                    <Icon
                      name={focused ? 'people' : 'people-outline'}
                      size={25}
                      style={
                        focused
                          ? [tw`text-blue-500`]
                          : [tw`text-gray-900 dark:text-gray-100`]
                      }
                    />
                  );
                },
              }}
            />
            <Tab.Screen
              name={t('navigate:settings')}
              component={Settings}
              options={{
                headerShown: false,
                tabBarIcon: ({focused}) => {
                  return (
                    <Icon
                      name={focused ? 'cog' : 'cog-outline'}
                      size={25}
                      style={
                        focused
                          ? [tw`text-blue-500`]
                          : [tw`text-gray-900 dark:text-gray-100`]
                      }
                    />
                  );
                },
              }}
            />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              options={{
                headerShown: false,
                contentStyle: [{backgroundColor: '#240742'}],
              }}
              name="Login"
              component={Login}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
