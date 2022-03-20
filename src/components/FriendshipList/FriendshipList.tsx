import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import tw from 'twrnc';
import {Friendships} from 'vacations-api';
import {Typography} from '..';
import {useAuth} from '../../hooks/useAuth';
import {useGetAllFriendshipsQuery} from '../../services/friendships';
import {useGetUserByIdQuery} from '../../services/users';
import {Avatar} from '../Avatar';

const FriendshipItem: React.FC<{friendship: Friendships.Friendship}> = ({
  friendship,
}) => {
  const {data: response} = useGetUserByIdQuery(
    friendship.user.replace('|', '_'),
  );
  const navigation =
    useNavigation<NativeStackNavigationProp<{Details: {userId: string}}>>();
  const name = response?.data?.name || response?.data?.username;

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
          userId: friendship.user.replace('|', '_'),
        })
      }>
      <View style={[tw`mr-2 flex justify-center`]}>
        <Avatar picture={response?.data?.picture} />
      </View>
      <View>
        <Text style={[tw`text-lg dark:text-white`]}>
          {name || 'Loading...'}
        </Text>
        <Text style={[tw`dark:text-gray-100`]}>
          {friendship.status || 'Loading...'}
        </Text>
      </View>
    </Pressable>
  );
};

const FriendshipList = () => {
  const {user} = useAuth();
  const {
    data: friendships,
    refetch,
    isLoading,
    error,
  } = useGetAllFriendshipsQuery({page: 0, owner: user.sub.replace('|', '_')});

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return (
      <Typography style={[tw`text-red-600`]}>
        {JSON.stringify(error)}
      </Typography>
    );
  }

  return (
    <FlatList
      data={friendships?.data as Friendships.Friendship[]}
      keyExtractor={item => item.uuid}
      renderItem={({item}) => <FriendshipItem friendship={item} />}
      onRefresh={refetch}
      refreshing={isLoading}
    />
  );
};

export default FriendshipList;
