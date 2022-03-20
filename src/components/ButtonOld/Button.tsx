import React, {ReactChild, ReactNode, useState} from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleProp,
  Text,
  ViewStyle,
} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';
import tw from 'twrnc';
import {Typography} from '..';
import LinearGradient from 'react-native-linear-gradient';

export type ButtonProps = {
  variant?: 'primary' | 'light' | 'danger';
  text?: string;
  children?: ReactChild | ReactChild[] | ReactNode | ReactNode[];
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
};

export const Spinner = () => {
  const spinValue = new Animated.Value(0);
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 750,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[{transform: [{rotate: spin}]}]}>
      <Svg style={[tw`h-5 w-5 text-white`]} fill="none" viewBox="0 0 24 24">
        <Circle
          opacity={25}
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"></Circle>
        <Path
          opacity={75}
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></Path>
      </Svg>
    </Animated.View>
  );
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  text,
  disabled,
  loading,
  style,
  onPress,
  ...rest
}) => {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      disabled={disabled || loading}
      onPress={onPress}
      {...rest}>
      <LinearGradient
        colors={pressed ? ['#F6761F','#F33631','#EF1649'] : ['#f89755', '#f66a66', '#f34b72']}
        start={{x: 0.0, y: 0}}
        end={{x: 1, y: pressed ? 0 : 1}}
        style={[
          tw`w-full items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-semibold text-white`,
          style,
        ]}>
        {loading ? (
          <Spinner />
        ) : text ? (
          variant === 'primary' || variant === 'danger' ? (
            <Text style={[tw`h-5 text-white font-semibold`]}>{text}</Text>
          ) : (
            <Typography>{text}</Typography>
          )
        ) : (
          children
        )}
      </LinearGradient>
    </Pressable>
  );
};

export default Button;
