import React, {ReactChild, ReactNode, useState} from 'react';
import {StyleProp, Text, View, ViewStyle} from 'react-native';
import {useDeviceContext} from 'twrnc';
import tw from '../../tailwindcss';

export type CardProps = {
  title?: string;
  children: ReactChild | ReactChild[] | ReactNode | ReactNode[];
  style?: StyleProp<ViewStyle>;
};

const Card: React.FC<CardProps> = ({title, style, children}) => {
  useDeviceContext(tw);

  return (
    <View
      style={[
        tw`mx-4 my-2 flex p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm`,
        style,
      ]}>
      {title && (
        <Text style={[tw`dark:text-white text-2xl font-bold mb-2`]}>
          {title}
        </Text>
      )}
      <View style={[tw`flex-grow`]}>{children}</View>
    </View>
  );
};

export default Card;
