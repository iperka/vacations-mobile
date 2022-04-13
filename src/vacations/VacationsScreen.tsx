import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import Animated, {FadeInDown, FadeInLeft} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDeviceContext} from 'twrnc';
import StartupLifeSvg from '../../assets/undraw_startup_life_re_8ow9.svg';
import {Button, Card} from '../components';
import tw from '../tailwindcss';
import {useGetAllVacationsQuery} from './vacationsApi';

export interface VacationsScreenProps
  extends NativeStackScreenProps<
    {Vacations: undefined; VacationAdd: undefined},
    'Vacations'
  > {}

const VacationsScreen: React.FC<VacationsScreenProps> = ({navigation}) => {
  useDeviceContext(tw);
  const {data: response, isError, error} = useGetAllVacationsQuery(1);

  console.log('VacationsScreen', error);

  if (isError) {
    return (
      <SafeAreaView
        style={[tw`px-6 pt-4 h-full bg-gray-100 dark:bg-slate-900`]}>
        <Text style={[tw`text-lg dark:text-white tracking-wide`]}>{error}</Text>
      </SafeAreaView>
    );
  }

  if (response?.metadata.totalElements === 0) {
    <SafeAreaView style={[tw`px-6 pt-4 h-full bg-gray-100 dark:bg-slate-900`]}>
      <Card entering={FadeInLeft.duration(750).delay(0)}>
        <StartupLifeSvg style={[tw`mx-auto`]} width={250} height={250} />
        <View style={[tw`flex flex-row my-2`]}>
          <Text style={[tw`text-xl dark:text-white tracking-wide`]}>No </Text>
          <Text
            style={[
              tw`text-blue-500 dark:text-blue-500 text-xl font-bold tracking-wide`,
            ]}>
            vacations
          </Text>
          <Text style={[tw`text-xl dark:text-white tracking-wide`]}> yet!</Text>
        </View>
        <Text style={[tw`text-lg dark:text-white tracking-wide`]}>
          You worked hard. Take your time off and use you vacation days.
        </Text>
        <Animated.View entering={FadeInDown.duration(400).delay(900)}>
          <Button
            style={[tw`mt-4`]}
            text="Add Vacations"
            onPress={() => navigation.navigate('VacationAdd')}
          />
        </Animated.View>
      </Card>
    </SafeAreaView>;
  }

  return (
    <SafeAreaView style={[tw`px-6 pt-4 h-full bg-gray-100 dark:bg-slate-900`]}>
      <Card entering={FadeInLeft.duration(750).delay(0)}>
        <ScrollView>
          {(response?.data || []).map(vacation => (
            <View key={vacation.uuid} style={[tw`my-2`]}>
              <Text style={[tw`text-lg dark:text-white tracking-wide`]}>
                {vacation.title}
              </Text>
            </View>
          ))}
        </ScrollView>
      </Card>
    </SafeAreaView>
  );
};

export default VacationsScreen;
