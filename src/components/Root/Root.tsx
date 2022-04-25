import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDeviceContext} from 'twrnc';
import AccountScreen from '../../account/AccountScreen';
import {AuthContext, LoginScreen} from '../../auth';
import HomeScreen from '../../home/HomeScreen';
import tw from '../../tailwindcss';
import VacationAddScreen from '../../vacations/VacationAddScreen';
import VacationsScreen from '../../vacations/VacationsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Root: React.FC = () => {
  useDeviceContext(tw);

  // Get the context from the AuthProvider
  const {isLoggedIn} = useContext(AuthContext);

  // Check if the user is logged in
  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{tabBarStyle: [tw`border-0 dark:bg-slate-800 pt-2`]}}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
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
              tabBarShowLabel: false,
            }}
          />
          <Tab.Screen
            name="VacationAdd"
            component={VacationAddScreen}
            options={{
              headerStyle: [tw`bg-blue-500 dark:bg-blueDark-500`],
              headerTitleStyle: [tw`text-white`],
              title: 'Add Vacation',
              tabBarIcon: ({focused}) => {
                return (
                  <Icon
                    name={focused ? 'ios-add-circle' : 'ios-add-circle-outline'}
                    size={25}
                    style={
                      focused
                        ? [tw`text-blue-500`]
                        : [tw`text-gray-900 dark:text-gray-100`]
                    }
                  />
                );
              },
              tabBarShowLabel: false,
            }}
          />
          <Tab.Screen
            name="Vacations"
            component={VacationsScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({focused}) => {
                return (
                  <Icon
                    name={focused ? 'ios-calendar' : 'ios-calendar-outline'}
                    size={25}
                    style={
                      focused
                        ? [tw`text-blue-500`]
                        : [tw`text-gray-900 dark:text-gray-100`]
                    }
                  />
                );
              },
              tabBarShowLabel: false,
            }}
          />

          <Tab.Screen
            name="Account"
            component={AccountScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({focused}) => {
                return (
                  <Icon
                    name={focused ? 'ios-user' : 'ios-user-outline'}
                    size={25}
                    style={
                      focused
                        ? [tw`text-blue-500`]
                        : [tw`text-gray-900 dark:text-gray-100`]
                    }
                  />
                );
              },
              tabBarShowLabel: false,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

  // If the user is not logged in
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
