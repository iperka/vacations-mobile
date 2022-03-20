import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import moment from 'moment';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {Vacations} from 'vacations-api';
import {Avatar, Typography} from '..';
import {ErrorMessage} from '..';
import {useGetUserByIdQuery} from '../../services/users';
import {useGetAllVacationsQuery} from '../../services/vacation';
import tw from '../../tailwindcss';
import {Shimmer} from '../Shimmer';

const VacationItem: React.FC<{
  vacation: Vacations.Vacation | null;
  loading?: boolean;
}> = ({vacation, loading}) => {
  if (loading || !vacation || vacation === null) {
    return (
      <View style={[tw`p-2 flex flex-row items-center rounded-lg`]}>
        <View style={[tw`mr-2 flex justify-center`]}>
          <Shimmer width={50} height={50} style={[{borderRadius: 50}]} />
        </View>
        <View>
          <Shimmer style={[tw`w-2/3 h-6`]} />
          <Shimmer style={[tw`w-full h-4`]} />
        </View>
      </View>
    );
  }

  const navigation =
    useNavigation<NativeStackNavigationProp<{Details: {uuid: string}}>>();
  const {data: response} = useGetUserByIdQuery(
    vacation.owner.replace('|', '_'),
  );

  return (
    <Pressable
      style={({pressed}) => [
        tw`p-2 flex flex-row items-center rounded-lg`,
        pressed
          ? tw`bg-gray-200 dark:bg-gray-700`
          : tw`bg-white dark:bg-gray-800`,
      ]}
      onPress={() =>
        navigation.navigate('Details', {
          uuid: vacation.uuid,
        })
      }>
      <View style={[tw`mr-2 flex justify-center`]}>
        <Avatar source={{uri: response?.data?.picture}} />
      </View>
      <View>
        <Text style={[tw`text-lg dark:text-white`]}>
          {vacation.title || 'Loading...'}
        </Text>
        <Text style={[tw`dark:text-gray-100`]}>
          {moment(vacation.startDate).format('DD.MM.YYYY') +
            ' - ' +
            moment(vacation.endDate).format('DD.MM.YYYY')}
        </Text>
      </View>
    </Pressable>
  );
};

const ItemSeparator = () => {
  return <View style={[tw`bg-gray-100 w-full`, {height: 2}]}></View>;
};

const VacationList: React.FC<{
  style?: StyleProp<ViewStyle>;
}> = ({style}) => {
  const [page, setPage] = useState(0);
  const {
    data: response,
    isLoading,
    refetch,
    error,
  } = useGetAllVacationsQuery(page);

  if (error) {
    return <ErrorMessage error={error} retry={refetch} loading={isLoading} />;
  }

  if (isLoading || !response || response === null || !response.data) {
    return (
      <FlatList
        style={style}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        keyExtractor={(item: number) => item.toString()}
        renderItem={({}) => <VacationItem vacation={null} loading />}
        ItemSeparatorComponent={ItemSeparator}
      />
    );
  }

  if (response.metadata.totalElements === 0) {
    return (
      <View style={[tw`flex-1 items-center justify-center`]}>
        <Image
          width={10}
          height={10}
          style={[tw`w-full h-72`]}
          source={{
            uri: 'https://s3-alpha.figma.com/hub/file/948140848/1f4d8ea7-e9d9-48b7-b70c-819482fb10fb-cover.png',
          }}
        />
        <Typography style={[tw`text-lg`]}>
          You look stressed... It's time for vacations!
        </Typography>
      </View>
    );
  }

  return (
    <FlatList
      style={style}
      refreshing={isLoading}
      onRefresh={refetch}
      data={response.data as Vacations.Vacation[]}
      keyExtractor={(item: Vacations.Vacation) => item.uuid}
      renderItem={({item}) => <VacationItem vacation={item} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default VacationList;
