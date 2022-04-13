import {NativeStackScreenProps} from '@react-navigation/native-stack';
import moment from 'moment';
import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDeviceContext} from 'twrnc';
import HappyNewsSvg from '../../assets/undraw_happy_news_re_tsbd.svg';
import {AuthContext} from '../auth';
import {Avatar, Button, Card} from '../components';
import {getInitials} from '../helpers';
import tw from '../tailwindcss';
import {useGetNextVacationQuery} from '../vacations/vacationsApi';

interface WelcomeHeaderProps
  extends React.ComponentProps<typeof Animated.View> {
  name: string;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({name}) => {
  return (
    <Animated.View
      style={[tw`mr-2 flex-1`]}
      entering={FadeInLeft.duration(750)}>
      <Text style={[tw`text-2xl dark:text-white font-bold tracking-wide`]}>
        Welcome back,
      </Text>
      <Text style={[tw`text-2xl dark:text-white font-bold tracking-wide`]}>
        {name}!
      </Text>
    </Animated.View>
  );
};

export interface HomeScreenProps
  extends NativeStackScreenProps<
    {Home: undefined; VacationAdd: undefined},
    'Home'
  > {}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  useDeviceContext(tw);
  const {user} = useContext(AuthContext);

  const {data: nextVacation, isSuccess, error} = useGetNextVacationQuery();
  console.log(nextVacation, error);

  return (
    <SafeAreaView style={[tw`px-6 pt-4 h-full bg-gray-100 dark:bg-slate-900`]}>
      <View style={[tw`flex flex-row items-center`]}>
        <WelcomeHeader name={user?.name || 'Anonymous'} />
        {user && (
          <Animated.View entering={FadeInRight.duration(750)}>
            <Avatar uri={user.picture} initials={getInitials(user.name)} />
          </Animated.View>
        )}
      </View>

      <Card
        style={[tw`my-6 flex justify-center`]}
        entering={FadeInLeft.duration(750).delay(600)}>
        <HappyNewsSvg style={[tw`mx-auto`]} width={200} height={250} />
        <View style={[tw`flex flex-row my-2`]}>
          <Text style={[tw`text-xl dark:text-white tracking-wide`]}>
            Time for a{' '}
          </Text>
          <Text
            style={[
              tw`text-blue-500 dark:text-blue-500 text-xl font-bold tracking-wide`,
            ]}>
            break!
          </Text>
        </View>

        {isSuccess && nextVacation ? (
          <Text style={[tw`text-lg dark:text-white tracking-wide`]}>
            Only {moment(nextVacation.data?.startDate).fromNow()} days left
            until your next vacation!
          </Text>
        ) : (
          <>
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
          </>
        )}
      </Card>
    </SafeAreaView>
  );
};

export default HomeScreen;
