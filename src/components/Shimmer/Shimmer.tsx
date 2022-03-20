import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import tw from '../../tailwindcss';
import ShimmerPlaceHolder, {
  ShimmerPlaceholderProps,
} from 'react-native-shimmer-placeholder';
import {useDeviceContext} from 'twrnc';
import {useColorScheme} from 'react-native';

export interface ShimmerProps extends ShimmerPlaceholderProps {
  rounded?: boolean;
}

const Shimmer: React.FC<ShimmerProps> = ({style, rounded = true, ...rest}) => {
  useDeviceContext(tw);
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ShimmerPlaceHolder
      shimmerColors={
        isDarkMode
          ? ['rgb(107, 114, 128)', 'rgb(75, 85, 99)', 'rgb(107, 114, 128)']
          : ['#f3f3f3', '#ededed', '#ededed']
      }
      LinearGradient={LinearGradient}
      style={[tw`my-1`, rounded && tw`rounded-lg`, style]}
      {...rest}
    />
  );
};

export default Shimmer;
