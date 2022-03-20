import DateTimePicker from '@react-native-community/datetimepicker';
import {RouteProp, useRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import moment from 'moment-business-days';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  ActivityIndicator,
  Modal,
  Switch,
  useColorScheme,
  View,
} from 'react-native';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';
import {Button, Card, Input, Stat, Typography, VacationList} from '../components';
import {
  useAddVacationMutation,
  useGetVacationByUuidQuery,
} from '../services/vacation';

export const ListVacationView: React.FC = () => {
  const [addVacation, {isLoading}] = useAddVacationMutation();
  const isDarkMode = useColorScheme() === 'dark';

  const [allDay, setAllDay] = useState(true);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: {errors, isValid},
  } = useForm({
    defaultValues: {
      title: 'Vacations',
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
      days: '1',
    },
  });

  return (
    <View style={[tw`py-4 pt-8 flex h-full`]}>
      <Modal
        style={[isDarkMode ? tw`bg-gray-900` : tw`bg-white`]}
        animationType="slide"
        visible={showModal}
        presentationStyle="formSheet"
        onRequestClose={() => {
          setShowModal(false);
        }}>
        <View
          style={[
            tw`w-full h-full flex items-start py-5 px-5`,
            isDarkMode ? tw`bg-gray-900` : tw`bg-white`,
          ]}>
          <Typography style={[tw`text-2xl font-bold mb-4`]}>
            New Vacation
          </Typography>
          <Typography>Title</Typography>
          <Input
            name="title"
            control={control}
            invalid={errors.title !== undefined}
            rules={{required: true, minLength: 2, maxLength: 100}}
            disabled={loading}
            autoCapitalize="none"
            returnKeyType="next"
          />

          <View style={[tw`mt-4 w-full flex flex-row items-center`]}>
            <Typography style={[tw`flex-grow`]}>All Day</Typography>
            <Switch value={allDay} onValueChange={setAllDay} />
          </View>

          <View style={[tw`mt-4 w-full flex flex-row items-center`]}>
            <Typography>Starts</Typography>
            <Controller
              control={control}
              rules={{required: true}}
              name="startDate"
              render={({field: {onChange, onBlur, value}}) => (
                <DateTimePicker
                  style={[tw`flex-1`]}
                  value={moment(value).toDate()}
                  mode={allDay ? 'date' : 'datetime'}
                  display="default"
                  locale="de-CH"
                  minuteInterval={15}
                  onChange={(event: Event, date?: Date | undefined) => {
                    onChange(date);
                    if (moment(date).isAfter(moment(getValues('endDate')))) {
                      setValue('endDate', moment(value).format('YYYY-MM-DD'));
                    }
                  }}
                />
              )}
            />
          </View>
          <View style={[tw`mt-4 w-full flex flex-row items-center`]}>
            <Typography>Ends</Typography>
            <Controller
              control={control}
              rules={{required: true}}
              name="endDate"
              render={({field: {onChange, onBlur, value}}) => (
                <DateTimePicker
                  style={[tw`flex-1`]}
                  value={moment(value).toDate()}
                  mode={allDay ? 'date' : 'datetime'}
                  display="default"
                  locale="de-CH"
                  minuteInterval={15}
                  onChange={(event: Event, date?: Date | undefined) => {
                    onChange(date);
                    setValue(
                      'days',
                      moment(date)
                        .startOf('date')
                        .add(1, 'day')
                        .businessDiff(
                          moment(getValues('startDate')).startOf('date'),
                        )
                        .toString(),
                    );
                  }}
                  minimumDate={moment(getValues('startDate')).toDate()}
                />
              )}
            />
          </View>

          <Typography style={[tw`mt-4`]}>Days</Typography>
          <Input
            name="days"
            control={control}
            invalid={errors.days !== undefined}
            rules={{required: true, min: 0.25}}
            disabled={loading}
            autoCapitalize="none"
            returnKeyType="next"
          />

          <Button
            disabled={!isValid}
            text="Add"
            style={[tw`mt-5 w-full`]}
            onPress={handleSubmit(handler => {
              addVacation({
                title: handler.title,
                startDate: handler.startDate,
                endDate: handler.endDate,
              })
                .then(() => setShowModal(false))
                .catch(setError);
            })}
          />
          <Button
            text="Close"
            style={[tw`mt-2 w-full`]}
            onPress={() => setShowModal(false)}
          />
        </View>
      </Modal>

      <Card title="Vacations" style={[tw`h-full`]}>
        <VacationList />
        <View style={[tw`mt-4`]}>
          <Button
            loading={isLoading}
            onPress={() => setShowModal(true)}
            text="Add Vacation"
          />
        </View>
      </Card>
    </View>
  );
};

export const DetailVacationView: React.FC = () => {
  const route = useRoute<RouteProp<{Details: {uuid: string}}, 'Details'>>();
  const {
    data: response,
    isLoading,
    refetch,
    error,
  } = useGetVacationByUuidQuery(route.params.uuid);

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (error || !response || !response.data || response.data === null) {
    return (
      <View>
        <Typography style={[tw`text-red-600`]}>
          {JSON.stringify(error)}
        </Typography>
        <Button loading={isLoading} text="Retry" onPress={refetch} />
      </View>
    );
  }

  return (
    <View style={[tw`flex h-full p-4`]}>
      <Typography style={[tw`text-2xl font-bold`]}>
        {response.data.title}
      </Typography>
      <Stat
        style={[tw`my-2`]}
        value={moment(response.data.startDate).format('DD.MM.YYYY') || 'n/a'}
        name="Starts"
      />

      <Stat
        style={[tw`my-2`]}
        value={moment(response.data.endDate).format('DD.MM.YYYY') || 'n/a'}
        name="Ends"
      />

      <Stat
        style={[tw`my-2`]}
        value={response.data.days + ' days' || 'n/a'}
        name="Days"
      />

      <Button
        style={[tw`my-2 mt-5`]}
        text="Add to Calendar"
        onPress={() => {
          if (response.data === null) return;

          AddCalendarEvent.presentEventCreatingDialog({
            title: response.data.title,
            startDate: moment(response.data.startDate).format('YYYY-MM-DD'),
            endDate: moment(response.data.endDate).format('YYYY-MM-DD'),
            allDay: true,
            notes: 'This event has been created by vacations app.',
          })
            .then(() => {})
            .catch((error: string) => {
              // handle error such as when user rejected permissions
              console.warn(error);
            });
        }}
      />

      <Button
        style={[tw`my-2`]}
        text="Remove"
        variant="danger"
        onPress={() => {}}
      />
    </View>
  );
};

const VacationsView = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen
        options={{headerShown: false}}
        name="List"
        component={ListVacationView}
      />
      <Stack.Screen name="Details" component={DetailVacationView} />
    </Stack.Navigator>
  );
};

export default VacationsView;
