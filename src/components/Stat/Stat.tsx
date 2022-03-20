import React from 'react';
import {StyleProp, useColorScheme, View, ViewStyle} from 'react-native';
import tw from 'twrnc';
import {Typography} from '..';

export type StatProps = {
  value: string;
  name: string;
  style?: StyleProp<ViewStyle>;
};

const Stat: React.FC<StatProps> = ({name, value, style, ...rest}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={[
        tw`px-4 py-5 shadow-md rounded-lg overflow-hidden`,
        isDarkMode ? tw`bg-gray-900` : tw`bg-white`,
        style,
      ]}
      {...rest}>
      <Typography
        style={[
          tw`text-sm font-medium`,
          isDarkMode ? tw`text-gray-300` : tw`text-gray-500`,
        ]}>
        {name}
      </Typography>
      <Typography
        style={[
          tw`mt-1 text-3xl font-semibold`,
          isDarkMode ? tw`text-white` : tw`text-gray-900`,
        ]}>
        {value}
      </Typography>
    </View>
  );
};

export default Stat;
