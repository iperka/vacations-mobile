import React from 'react';
import {View} from 'react-native';
import {FadeInLeft} from 'react-native-reanimated';
import {useDeviceContext} from 'twrnc';
import {Card, VacationAddForm} from '../components';
import tw from '../tailwindcss';

const VacationAddScreen = () => {
  useDeviceContext(tw);
  return (
    <View style={[tw`px-6 h-full bg-gray-100 dark:bg-slate-900`]}>
      <Card entering={FadeInLeft.duration(750).delay(0)}>
        <VacationAddForm />
      </Card>
    </View>
  );
};

export default VacationAddScreen;
