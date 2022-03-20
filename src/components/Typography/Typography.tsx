import React from 'react';
import {StyleProp, Text, useColorScheme, ViewStyle} from 'react-native';
import tw from 'twrnc';

export type TypographyProps = {
  children: string;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
};

const Typography: React.FC<TypographyProps> = ({children, style, ...rest}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Text
      style={[isDarkMode ? tw`text-white` : tw`text-black`, style]}
      {...rest}>
      {children}
    </Text>
  );
};

export default Typography;
