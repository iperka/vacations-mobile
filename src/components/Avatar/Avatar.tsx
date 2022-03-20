import React from 'react';
import {Image, ImageProps} from 'react-native';
import {useAuth} from '../../hooks/useAuth';

export interface AvatarProps extends ImageProps {}

const Avatar: React.FC<AvatarProps> = ({
  style,
  width = 50,
  height = 50,
  source = {},
  ...rest
}) => {
  const {user} = useAuth();

  return (
    <Image
      style={[{borderRadius: 50}, style]}
      width={width}
      height={height}
      source={source || {uri: user.picture}}
      {...rest}
    />
  );
};

export default Avatar;
