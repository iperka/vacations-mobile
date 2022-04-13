import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDeviceContext} from 'twrnc';
import tw from '../../tailwindcss';

export interface AvatarProps {
  uri: string;
  initials: string;
}

const Avatar: React.FC<AvatarProps> = ({uri, initials}) => {
  useDeviceContext(tw);
  const [isError, setIsError] = useState(false);
  const [rotate, setRotate] = useState<number>(0);

  if (isError) {
    return (
      <View
        style={[
          tw`bg-gray-500 w-15 h-15 rounded-full flex items-center justify-center`,
        ]}>
        <Text style={[tw`text-2xl text-white font-bold`]}>{initials}</Text>
      </View>
    );
  }

  return (
    <Pressable
      onLongPress={() => {
        setRotate(r => r + 90);
      }}>
      <FastImage
        onError={() => setIsError(true)}
        source={{uri}}
        style={[
          tw`w-15 h-15 rounded-full`,
          {
            transform: [{rotate: `${rotate}deg`}],
          },
        ]}
      />
    </Pressable>
  );
};

export default Avatar;
