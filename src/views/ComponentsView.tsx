import i18next from 'i18next';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  Animated,
  Easing,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDeviceContext} from 'twrnc';
import {
  Avatar,
  Button,
  Card,
  Days,
  Select,
  Shimmer,
  VacationList,
} from '../components';
import {Color} from '../components/Button/Button';
import tw from '../tailwindcss';

const ComponentsView = () => {
  useDeviceContext(tw);
  const {i18n} = useTranslation();

  const slideInValue = new Animated.Value(1);
  Animated.timing(slideInValue, {
    toValue: 0,
    duration: 200,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start();

  const slideIn = slideInValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0px', '-390px'],
  });

  return (
    <ScrollView>
      <ImageBackground source={require('../../assets/monaco.png')}>
        <LinearGradient
          colors={['transparent', 'black']}
          style={[tw`w-full h-90 flex justify-end px-4 py-5`]}>
          <Animated.View style={{transform: [{translateX: slideIn}]}}>
            <Text style={[tw`text-2xl text-white font-bold`]}>
              Monaco Holidays
            </Text>
            <Text style={[tw`text-xl text-gray-200 font-semibold`]}>
              November 2019
            </Text>
            <View style={[tw`my-2 flex flex-row`]}>
              <Avatar style={[]} source={0} height={32} width={32} />
              <Avatar
                style={[tw`-ml-2`]}
                source={{
                  uri: 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-260nw-221431012.jpg',
                }}
                height={32}
                width={32}
              />
              <Avatar
                style={[tw`-ml-2`]}
                source={{uri: 'https://i.stack.imgur.com/G9yXv.png?s=256&g=1'}}
                height={32}
                width={32}
              />
            </View>
          </Animated.View>
        </LinearGradient>
      </ImageBackground>
      <Card>
        <Days
          startDate={new Date('2022-03-19')}
          endDate={new Date('2022-03-30')}
        />
      </Card>
      <Card style={[tw`bg-white`]}>
        <Text style={[tw`text-black text-2xl font-bold mb-2`]}>Colors</Text>
        <ScrollView horizontal>
          <View style={[tw`flex flex-row`]}>
            <View style={[tw`mx-1 w-8 h-8 rounded-lg bg-red`]} />
            <View style={[tw`mx-1 w-8 h-8 rounded-lg bg-orange`]} />
            <View style={[tw`mx-1 w-8 h-8 rounded-lg bg-yellow`]} />
            <View style={[tw`mx-1 w-8 h-8 rounded-lg bg-green`]} />
            <View style={[tw`mx-1 w-8 h-8 rounded-lg bg-mint`]} />
            <View style={[tw`mx-1 w-8 h-8 rounded-lg bg-teal`]} />
            <View style={[tw`mx-1 w-8 h-8 rounded-lg bg-cyan`]} />
            <View style={[tw`mx-1 w-8 h-8 rounded-lg bg-blue`]} />
            <View style={[tw`mx-1 w-8 h-8 rounded-lg bg-indigo`]} />
            <View style={[tw`mx-1 w-8 h-8 rounded-lg bg-purple`]} />
            <View style={[tw`mx-1 w-8 h-8 rounded-lg bg-pink`]} />
            <View style={[tw`mx-1 w-8 h-8 rounded-lg bg-brown`]} />
          </View>
        </ScrollView>
      </Card>
      <Card style={[tw`bg-gray-900`]}>
        <Text style={[tw`text-white text-2xl font-bold mb-2`]}>
          Colors (dark)
        </Text>
        <ScrollView horizontal>
          <View style={[tw`flex flex-row`]}>
            <View style={[tw`mx-1 w-8 h-8 rounded-lg bg-redDark`]} />
            <View style={[tw`mx-1 w-8 h-8 rounded-lg bg-orangeDark`]} />
            <View style={[tw`mx-1 w-8 h-8 rounded-lg bg-yellowDark`]} />
            <View style={[tw`mx-1 w-8 h-8 rounded-lg bg-greenDark`]} />
            <View style={[tw`mx-1 w-8 h-8 rounded-lg bg-mintDark`]} />
            <View style={[tw`mx-1 w-8 h-8 rounded-lg bg-tealDark`]} />
            <View style={[tw`mx-1 w-8 h-8 rounded-lg bg-cyanDark`]} />
            <View style={[tw`mx-1 w-8 h-8 rounded-lg bg-blueDark`]} />
            <View style={[tw`mx-1 w-8 h-8 rounded-lg bg-indigoDark`]} />
            <View style={[tw`mx-1 w-8 h-8 rounded-lg bg-purpleDark`]} />
            <View style={[tw`mx-1 w-8 h-8 rounded-lg bg-pinkDark`]} />
            <View style={[tw`mx-1 w-8 h-8 rounded-lg bg-brownDark`]} />
          </View>
        </ScrollView>
      </Card>

      <Card title="Buttons">
        <View style={[tw`mb-2 flex flex-row`]}>
          <Text
            style={[tw`flex-1 text-lg text-center font-bold dark:text-white`]}>
            Default
          </Text>
          <Text
            style={[tw`flex-1 text-lg text-center font-bold dark:text-white`]}>
            Disabled
          </Text>
          <Text
            style={[tw`flex-1 text-lg text-center font-bold dark:text-white`]}>
            Loading
          </Text>
        </View>
        {[
          'red',
          'orange',
          'yellow',
          'green',
          'mint',
          'teal',
          'cyan',
          'blue',
          'indigo',
          'purple',
          'pink',
          'brown',
        ].map((color, i) => (
          <View style={[tw`mb-2 flex flex-row`]} key={i}>
            <Button
              style={[tw`flex-1 mr-1`]}
              text="Test"
              color={color as Color}
            />
            <Button
              style={[tw`flex-1 mx-1`]}
              text="Test"
              color={color as Color}
              disabled
            />
            <Button
              style={[tw`flex-1 ml-1`]}
              text="Test"
              color={color as Color}
              loading
            />
          </View>
        ))}
      </Card>
      <Card title="Shimmer">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
          <Shimmer key={i} />
        ))}
      </Card>
      <Card title="Vacation List">
        <VacationList />
      </Card>
      <Card title="Select">
        <Select
          defaultSelected={1}
          options={['English', 'Deutsch']}
          onChange={index => i18n.changeLanguage(['en', 'de'][index])}
        />
      </Card>
    </ScrollView>
  );
};

export default ComponentsView;
