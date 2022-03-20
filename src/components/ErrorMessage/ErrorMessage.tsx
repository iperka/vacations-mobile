import React from 'react';
import {Text, View, ViewProps} from 'react-native';
import {Button} from '..';
import tw from '../../tailwindcss';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';

export interface ErrorMessageProps extends ViewProps {
  loading?: boolean;
  retry?: () => void;
  error: any;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  retry,
  loading,
  style,
  ...rest
}) => {
  const {t} = useTranslation();

  return (
    <View style={[tw`px-2 py-5 my-5`, style]} {...rest}>
      <View style={[tw`flex flex-row`]}>
        <Icon name="alert-circle" style={[tw`text-red mr-4`, {fontSize: 50}]} />
        <View style={[tw`flex-1`]}>
          <Text style={[tw`text-xl font-bold dark:text-white`]}>
            HTTP {error.status} {error.data.message}
          </Text>
          {error.data.errors.map((error: any, i: number) => (
            <Text key={i} style={[tw`font-semibold dark:text-white`]}>
              {error.message}
            </Text>
          ))}
          <Text style={[tw`text-xs my-2 dark:text-white`]}>
            {error.data.host} - {error.data.version}
          </Text>
        </View>
      </View>

      <Button
        style={[tw`mt-4`]}
        color="red"
        loading={loading}
        text={t('common:retry')}
        onPress={retry}
      />
    </View>
  );
};

export default ErrorMessage;
