import React, {ReactChild, ReactNode} from 'react';
import {
  Animated,
  Easing,
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  ViewStyle,
} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';
import {useDeviceContext} from 'twrnc';
import tw from '../../tailwindcss';

export type Color =
  | 'white'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'mint'
  | 'teal'
  | 'cyan'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'pink'
  | 'brown';

export interface ButtonProps extends PressableProps {
  text?: string;
  color?: Color;
  children?: ReactChild | ReactChild[] | ReactNode | ReactNode[];
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  loading?: boolean;
}

const getColor = (color: Color, pressed: boolean, disabled: boolean) => {
  switch (color) {
    case 'white':
      if (disabled) {
        return tw`bg-white-300 dark:bg-gray-800 border-gray-300 dark:border-gray-700`;
      }
      if (pressed) {
        return tw`bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-700`;
      }
      return tw`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-700`;
    case 'red':
      if (disabled) {
        return tw`bg-red-300 dark:bg-redDark-300`;
      }
      if (pressed) {
        return tw`bg-red-600 dark:bg-redDark-600`;
      }
      return tw`bg-red dark:bg-redDark`;
    case 'orange':
      if (disabled) {
        return tw`bg-orange-300 dark:bg-orangeDark-300`;
      }
      if (pressed) {
        return tw`bg-orange-600 dark:bg-orangeDark-600`;
      }
      return tw`bg-orange dark:bg-orangeDark`;
    case 'yellow':
      if (disabled) {
        return tw`bg-yellow-300 dark:bg-yellowDark-300`;
      }
      if (pressed) {
        return tw`bg-yellow-600 dark:bg-yellowDark-600`;
      }
      return tw`bg-yellow dark:bg-yellowDark`;
    case 'green':
      if (disabled) {
        return tw`bg-green-300 dark:bg-greenDark-300`;
      }
      if (pressed) {
        return tw`bg-green-600 dark:bg-greenDark-600`;
      }
      return tw`bg-green dark:bg-greenDark`;
    case 'mint':
      if (disabled) {
        return tw`bg-mint-300 dark:bg-mintDark-300`;
      }
      if (pressed) {
        return tw`bg-mint-600 dark:bg-mintDark-600`;
      }
      return tw`bg-mint dark:bg-mintDark`;
    case 'teal':
      if (disabled) {
        return tw`bg-teal-300 dark:bg-tealDark-300`;
      }
      if (pressed) {
        return tw`bg-teal-600 dark:bg-tealDark-600`;
      }
      return tw`bg-teal dark:bg-tealDark`;
    case 'cyan':
      if (disabled) {
        return tw`bg-cyan-300 dark:bg-cyanDark-300`;
      }
      if (pressed) {
        return tw`bg-cyan-600 dark:bg-cyanDark-600`;
      }
      return tw`bg-cyan dark:bg-cyanDark`;
    case 'blue':
      if (disabled) {
        return tw`bg-blue-300 dark:bg-blueDark-300`;
      }
      if (pressed) {
        return tw`bg-blue-600 dark:bg-blueDark-600`;
      }
      return tw`bg-blue dark:bg-blueDark`;
    case 'indigo':
      if (disabled) {
        return tw`bg-indigo-300 dark:bg-indigoDark-300`;
      }
      if (pressed) {
        return tw`bg-indigo-600 dark:bg-indigoDark-600`;
      }
      return tw`bg-indigo dark:bg-indigoDark`;
    case 'purple':
      if (disabled) {
        return tw`bg-purple-300 dark:bg-purpleDark-300`;
      }
      if (pressed) {
        return tw`bg-purple-600 dark:bg-purpleDark-600`;
      }
      return tw`bg-purple dark:bg-purpleDark`;
    case 'pink':
      if (disabled) {
        return tw`bg-pink-300 dark:bg-pinkDark-300`;
      }
      if (pressed) {
        return tw`bg-pink-600 dark:bg-pinkDark-600`;
      }
      return tw`bg-pink dark:bg-pinkDark`;
    case 'brown':
      if (disabled) {
        return tw`bg-brown-300 dark:bg-brownDark-300`;
      }
      if (pressed) {
        return tw`bg-brown-600 dark:bg-brownDark-600`;
      }
      return tw`bg-brown dark:bg-brownDark`;
    default:
      break;
  }
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
    <Animated.View style={[tw`mr-2`, {transform: [{rotate: spin}]}]}>
      <Svg style={[tw`h-5 w-5 text-white`]} fill="none" viewBox="0 0 24 24">
        <Circle
          opacity={25}
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <Path
          opacity={75}
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </Svg>
    </Animated.View>
  );
};

const Button: React.FC<ButtonProps> = ({
  text,
  children,
  color = 'blue',
  disabled,
  loading,
  style,
  ...rest
}) => {
  useDeviceContext(tw);

  return (
    <Pressable
      style={({pressed}) => [
        tw`bg-blue px-4 py-3 rounded-lg items-center flex flex-row justify-center items-center border`,
        getColor(color, pressed, !!disabled || !!loading),
        style,
      ]}
      {...rest}
      disabled={disabled || loading}>
      {!!loading && <Spinner />}
      {children ? (
        children
      ) : (
        <Text
          style={[
            tw`text-white text-center font-semibold`,
            color === 'white' && tw`text-black dark:text-white`,
          ]}>
          {text}
        </Text>
      )}
    </Pressable>
  );
};

export default Button;
