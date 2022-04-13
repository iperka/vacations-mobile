import React from 'react';
import {Text} from 'react-native';
import {FadeInLeft} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDeviceContext} from 'twrnc';
import {Card} from '../components';
import tw from '../tailwindcss';

const VacationAddScreen = () => {
  useDeviceContext(tw);
  return (
    <SafeAreaView style={[tw`px-6 pt-4 h-full bg-gray-100 dark:bg-slate-900`]}>
      <Card entering={FadeInLeft.duration(750).delay(0)}>
        <Text>Where will you go?</Text>
      </Card>
    </SafeAreaView>
  );
};

export default VacationAddScreen;
