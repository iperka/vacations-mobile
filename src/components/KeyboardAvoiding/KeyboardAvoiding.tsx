import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
  ViewProps,
} from 'react-native';
import {useDeviceContext} from 'twrnc';
import tw from '../../tailwindcss';

export interface KeyboardAvoidingProps extends ViewProps {}

const KeyboardAvoiding: React.FC<KeyboardAvoidingProps> = ({children}) => {
  useDeviceContext(tw);
  return (
    <KeyboardAvoidingView
      style={[tw`flex-1`]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[tw`flex-1`]}>{children}</View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoiding;
