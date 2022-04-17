import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDeviceContext} from 'twrnc';
import tw from '../../tailwindcss';

const InputIcon: React.FC<{name: string; style: StyleProp<TextStyle>}> = ({
  name,
  style,
}) => {
  return (
    <Animated.View
      entering={FadeIn.duration(350)}
      exiting={FadeOut.duration(250)}>
      <Icon style={[tw`text-2xl px-1 font-bold`, style]} name={name} />
    </Animated.View>
  );
};

const getClassName = (props: {
  invalid?: boolean;
  valid?: boolean;
  loading?: boolean;
  focus?: boolean;
}): string => {
  if (props.invalid) {
    return 'bg-red-100 dark:bg-redDark-900 border-red-600 dark:border-redDark-600';
  }
  if (props.valid) {
    return 'bg-green-100 dark:bg-greenDark-900 border-green-600 dark:border-greenDark-600';
  }
  if (props.focus) {
    return 'bg-gray-50 dark:bg-gray-700 border-blue-500 dark:border-blueDark-600';
  }
  return 'bg-gray-50 dark:bg-gray-700';
};

export interface InputProps extends TextInputProps {
  invalid?: boolean;
  valid?: boolean;
  loading?: boolean;
}

const Input: React.FC<InputProps> = ({
  invalid,
  valid,
  loading,
  style,
  ...props
}) => {
  useDeviceContext(tw);

  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <View
      style={[
        tw`flex flex-row items-center border-2 my-1 rounded-lg border-gray-300 dark:border-gray-500`,
        tw.style(getClassName({invalid, valid, loading, focus: isFocus})),
      ]}>
      <TextInput
        defaultValue="Test"
        style={[tw`flex-grow px-4 py-3 dark:text-white`, style]}
        onFocus={() => {
          setIsFocus(true);
        }}
        onBlur={() => {
          setIsFocus(false);
        }}
        {...props}
        editable={!loading}
      />

      {loading ? (
        <ActivityIndicator style={[tw`pr-2`]} />
      ) : (
        invalid && (
          <InputIcon
            name="ios-alert-circle"
            style={[tw`text-red-600 text-redDark-600`]}
          />
        )
      )}
      {valid && (
        <InputIcon
          name="ios-checkmark-circle"
          style={[tw`text-green-600 text-greenDark-600`]}
        />
      )}
    </View>
  );
};

export default Input;
