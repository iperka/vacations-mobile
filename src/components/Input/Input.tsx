import React, {useState} from 'react';
import {TextInput, TextInputProps} from 'react-native';
import {useDeviceContext} from 'twrnc';
import tw from '../../tailwindcss';

export interface InputProps extends TextInputProps {
  invalid?: boolean;
}

const getClassName = (props: {invalid?: boolean; focus?: boolean}): string => {
  const {invalid, focus} = props;
  if (invalid) {
    if (focus) {
      return 'border-red-500 text-red-500 dark:text-white';
    }
    return 'border-red-600 text-red-600 dark:text-white';
  }
  if (focus) {
    return 'border-blue-500 dark:border-blueDark-500 dark:text-white';
  }
  return 'border-gray-300 dark:border-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-white';
};

const Input: React.FC<InputProps> = ({invalid, style, ...props}) => {
  useDeviceContext(tw);

  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <TextInput
      defaultValue="Test"
      style={[
        tw`my-1 px-4 py-3 rounded-lg border-2`,
        tw.style(getClassName({invalid, focus: isFocus})),
        style,
      ]}
      onFocus={() => {
        setIsFocus(true);
      }}
      onBlur={() => {
        setIsFocus(false);
      }}
      {...props}
    />
  );
};

export default Input;
