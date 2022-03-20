import React from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  TextInput,
  TextInputSubmitEditingEventData,
  useColorScheme,
  ViewStyle,
} from 'react-native';
import {Controller, Control} from 'react-hook-form';
import tw from 'twrnc';

type DetectorType =
  | 'phoneNumber'
  | 'link'
  | 'address'
  | 'calendarEvent'
  | 'none'
  | 'all';

export type InputProps = {
  control: Control<any>;
  name: string;
  rules?: {
    required?: boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string | RegExp;
    validate?: () => boolean;
  };
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  valid?: boolean;
  invalid?: boolean;
  caretHidden?: boolean;
  clearButtonMode?: 'never' | 'while-editing' | 'unless-editing' | 'always';
  clearTextOnFocus?: boolean;
  dataDetectorTypes?: DetectorType | DetectorType[];
  defaultValue?: string;
  editable?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  enablesReturnKeyAutomatically?: boolean;
  keyboardAppearance?: 'light' | 'dark';
  returnKeyType?:
    | 'done'
    | 'go'
    | 'next'
    | 'search'
    | 'send'
    | 'none'
    | 'previous'
    | 'default'
    | 'emergency-call'
    | 'google'
    | 'join'
    | 'route'
    | 'yahoo';
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | 'visible-password';
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
  onChangeText?: (value: string) => void;
  placeholder?: string;
  placeholderTextColor?: string;
  scrollEnabled?: boolean;
  selectTextOnFocus?: boolean;
  spellCheck?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  textContentType?:
    | 'none'
    | 'URL'
    | 'addressCity'
    | 'addressCityAndState'
    | 'addressState'
    | 'countryName'
    | 'creditCardNumber'
    | 'emailAddress'
    | 'familyName'
    | 'fullStreetAddress'
    | 'givenName'
    | 'jobTitle'
    | 'location'
    | 'middleName'
    | 'name'
    | 'namePrefix'
    | 'nameSuffix'
    | 'nickname'
    | 'organizationName'
    | 'postalCode'
    | 'streetAddressLine1'
    | 'streetAddressLine2'
    | 'sublocality'
    | 'telephoneNumber'
    | 'username'
    | 'password';
  passwordRules?: string;
  secureTextEntry?: boolean;
  value?: string;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
};

const Input: React.FC<InputProps> = ({
  rules,
  control,
  name,
  disabled,
  valid,
  invalid,
  style,
  onSubmitEditing,
  ...rest
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Controller
      control={control}
      rules={rules as any}
      name={name}
      render={({field: {onChange, onBlur, value}}) => (
        <TextInput
          style={[
            tw`border my-1 py-3 px-4 w-full shadow-sm rounded-md`,
            valid && !invalid
              ? tw`border-green-600 text-green-700`
              : invalid && !valid
              ? tw`border-red-600 text-red-700`
              : isDarkMode
              ? tw`border-gray-700 text-white`
              : tw`border-gray-300`,
            isDarkMode
              ? disabled
                ? tw`bg-gray-700`
                : tw`bg-gray-800`
              : disabled
              ? tw`bg-gray-100`
              : tw`bg-white`,
            style,
          ]}
          {...rest}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          onSubmitEditing={onSubmitEditing}
          autoCorrect={false}
          autoCapitalize={'none'}
          defaultValue={`${value}`}
        />
      )}
    />
  );
};

export default Input;
