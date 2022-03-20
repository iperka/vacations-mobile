import React from 'react';
import { Pressable, useColorScheme, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import tw from 'twrnc';
import { Typography } from '..';

const NavigationItem: React.FC<{to: string; label: string; icon: string}> = ({
  to,
  label,
  icon,
}) => {
  // const {push} = useHistory();
  const isDarkMode = useColorScheme() === 'dark';
  // const match = useRouteMatch(to);
  const match = true;
  const push = (to: string) => null;

  return (
    <Pressable style={[tw`flex items-center`]} onPress={() => push(to)}>
      {icon === 'home' &&
        (match ? (
          <Svg
            style={[
              tw`h-6 w-6 mb-1`,
              isDarkMode ? tw`text-white` : tw`text-black`,
            ]}
            viewBox="0 0 20 20"
            fill="currentColor">
            <Path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </Svg>
        ) : (
          <Svg
            style={[
              tw`h-6 w-6 mb-1`,
              isDarkMode ? tw`text-white` : tw`text-black`,
            ]}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="4">
            <Path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </Svg>
        ))}
      {icon === 'world' &&
        (match ? (
          <Svg
            style={[
              tw`h-6 w-6 mb-1`,
              isDarkMode ? tw`text-white` : tw`text-black`,
            ]}
            viewBox="0 0 20 20"
            fill="currentColor">
            <Path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
              clip-rule="evenodd"
            />
          </Svg>
        ) : (
          <Svg
            style={[
              tw`h-6 w-6 mb-1`,
              isDarkMode ? tw`text-white` : tw`text-black`,
            ]}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="4">
            <Path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </Svg>
        ))}
      {icon === 'users' &&
        (match ? (
          <Svg
            style={[
              tw`h-6 w-6 mb-1`,
              isDarkMode ? tw`text-white` : tw`text-black`,
            ]}
            viewBox="0 0 24 24"
            stroke-width="4"
            fill="currentColor">
            <Path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </Svg>
        ) : (
          <Svg
            style={[
              tw`h-6 w-6 mb-1`,
              isDarkMode ? tw`text-white` : tw`text-black`,
            ]}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="4">
            <Path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </Svg>
        ))}
      {icon === 'cog' &&
        (match ? (
          <Svg
            style={[
              tw`h-6 w-6 mb-1`,
              isDarkMode ? tw`text-white` : tw`text-black`,
            ]}
            viewBox="0 0 20 20"
            fill="currentColor">
            <Path
              fill-rule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clip-rule="evenodd"
            />
          </Svg>
        ) : (
          <Svg
            style={[
              tw`h-6 w-6 mb-1`,
              isDarkMode ? tw`text-white` : tw`text-black`,
            ]}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="4">
            <Path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <Path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </Svg>
        ))}
      <Typography>{label}</Typography>
    </Pressable>
  );
};

const Navigation = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={[
        tw`w-full px-4 py-2 pb-7 flex flex-row shadow-md justify-around`,
        isDarkMode ? tw`bg-gray-900` : tw`bg-white`,
      ]}>
      <NavigationItem to="/home" label="Home" icon="home" />
      <NavigationItem to="/vacations" label="Vacations" icon="world" />
      <NavigationItem to="/friends" label="Friends" icon="users" />
      <NavigationItem to="/settings" label="Settings" icon="cog" />
    </View>
  );
};

export default Navigation;
