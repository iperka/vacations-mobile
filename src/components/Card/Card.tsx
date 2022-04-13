import React from 'react';
import {View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useDeviceContext} from 'twrnc';
import tw from '../../tailwindcss';

export interface CardProps extends React.ComponentProps<typeof Animated.View> {}

const Card: React.FC<CardProps> = ({style, children, ...props}) => {
  useDeviceContext(tw);

  return (
    <Animated.View
      style={[
        tw`bg-white dark:bg-slate-800 overflow-hidden shadow rounded-lg`,
        style,
      ]}
      {...props}>
      <View style={[tw`px-4 py-5 sm:p-6`]}>{children}</View>
    </Animated.View>
  );
};

export default Card;
