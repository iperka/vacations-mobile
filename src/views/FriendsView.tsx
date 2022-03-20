import {useNavigation} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  Modal,
  useColorScheme,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';
import {Avatar, Button, FriendshipList, Typography, Card} from '../components';
import {useAuth} from '../hooks/useAuth';
import {useAddFriendShipMutation} from '../services/friendships';
import {useGetUserByIdQuery} from '../services/users';

export const ListFriendView: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={[tw`py-4 flex h-full`]}>
      <Card title="Friends">
        <FriendshipList />
        <View style={[tw`mx-2 mt-4`]}>
          <Button text="Add Friend" onPress={() => setShowModal(true)} />
        </View>
      </Card>

      <Modal
        animationType="slide"
        visible={showModal}
        presentationStyle="formSheet"
        style={[isDarkMode ? tw`bg-gray-900` : tw`bg-white`]}
        onRequestClose={() => {
          setShowModal(false);
        }}>
        <View
          style={[
            tw`w-full h-full flex items-start`,
            isDarkMode ? tw`bg-gray-900` : tw`bg-white`,
          ]}>
          <QRCodeScanner
            topContent={
              <View>
                <Typography style={[tw`text-2xl font-bold`]}>Scan</Typography>
                <Typography>
                  Add your friend to your list by scanning the QR code.
                </Typography>
              </View>
            }
            onRead={e => {
              if (/^vacations:\/\//.test(e.data)) {
                Linking.openURL(encodeURI(e.data.replace('|', '_'))).catch(
                  err => console.error('An error occurred', err),
                );
                setShowModal(false);
              } else {
                Alert.alert(`Invalid code: ${e.data}`);
              }
            }}
            flashMode={RNCamera.Constants.FlashMode.auto}
            bottomContent={
              <View>
                <Button onPress={() => setShowModal(false)} text="Cancel" />
              </View>
            }
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export const DetailFriendView: React.FC<
  NativeStackScreenProps<{Details: {userId: string}}, 'Details'>
> = ({route}) => {
  const {user} = useAuth();
  const {
    data: response,
    isLoading: isLoadingUser,
    refetch,
    error,
  } = useGetUserByIdQuery(route.params.userId);
  const [addFriendShip, {isLoading}] = useAddFriendShipMutation();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<{Details: {userId: string}; List: {}}>
    >();

  if (isLoadingUser) {
    return <ActivityIndicator size="large" />;
  }

  if (error || !response || !response.data || response.data === null) {
    return (
      <View>
        <Typography style={[tw`text-red-600`]}>
          {JSON.stringify({error, response})}
        </Typography>
        <Typography style={[tw`my-4`]}>{JSON.stringify(user)}</Typography>
        <Button loading={isLoadingUser} text="Retry" onPress={refetch} />
      </View>
    );
  }

  return (
    <View style={[tw`flex items-center px-5`]}>
      <Avatar style={[tw`mt-5`]} picture={response.data.picture} />
      <Typography style={[tw`text-2xl font-bold mt-4`]}>
        {response.data.name}
      </Typography>
      <Typography style={[tw`font-semibold mt-1`]}>
        {response.data.id}
      </Typography>
      <Button
        style={[tw`mt-6`]}
        text="Add to friends"
        onPress={() => {
          if (response.data !== null) {
            addFriendShip({
              user: response.data.id,
            }).then(res => {
              console.log(res);
              navigation.navigate('List', {});
            });
          }
        }}
      />
      <Button
        style={[tw`mt-2`]}
        variant="light"
        text="Close"
        loading={isLoading}
        onPress={() => navigation.navigate('List', {})}
      />
    </View>
  );
};

const FriendsView = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen
        options={{headerShown: false}}
        name="List"
        component={ListFriendView}
      />
      <Stack.Screen name="Details" component={DetailFriendView} />
    </Stack.Navigator>
  );
};

export default FriendsView;
