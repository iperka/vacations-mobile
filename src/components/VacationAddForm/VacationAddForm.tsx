import moment, {Moment} from 'moment';
import React, {useState} from 'react';
import {Text, useColorScheme, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {useDeviceContext} from 'twrnc';
import {Input} from '..';
import tw from '../../tailwindcss';
import {useAddVacationMutation} from '../../vacations/vacationsApi';
import {Button} from '../Button';

const enumerateDaysBetweenDates = (
  startDate: moment.MomentInput,
  endDate: moment.MomentInput,
): Moment[] => {
  const dates = [moment(startDate).startOf('day')];

  const currDate = moment(startDate).startOf('day');
  const lastDate = moment(endDate).startOf('day');

  while (currDate.add(1, 'days').diff(lastDate) < 0) {
    dates.push(currDate.clone());
  }

  return [...dates, moment(endDate).startOf('day')];
};

export interface VacationAddFormProps {}

const VacationAddForm: React.FC<VacationAddFormProps> = () => {
  useDeviceContext(tw);
  const isDark = useColorScheme() === 'dark';

  const [addVacation, result] = useAddVacationMutation();

  const [title, setTitle] = useState<string>('My Vacations');
  const [startDate, setStartDate] = useState<Moment>();
  const [endDate, setEndDate] = useState<Moment>();
  const [days, setDays] = useState<number>(0);

  return (
    <View style={[tw`flex flex-col`]}>
      <Text style={[tw`dark:text-white`]}>Title</Text>
      <Input
        defaultValue={title}
        onChangeText={setTitle}
        invalid={title.length < 1}
        loading={result.isLoading}
      />

      <Calendar
        displayLoadingIndicator={result.isLoading}
        disableArrowLeft={result.isLoading}
        disableArrowRight={result.isLoading}
        disableMonthChange={result.isLoading}
        style={[tw`dark:bg-gray-800`]}
        theme={{
          backgroundColor: isDark ? tw.color('gray-800') : tw.color('white'),
          calendarBackground: isDark ? tw.color('gray-800') : tw.color('white'),
          todayTextColor: isDark ? tw.color('white') : tw.color('gray-800'),
        }}
        onDayPress={day => {
          if (result.isLoading) {
            return;
          }
          const date = moment(day.dateString);
          if (startDate && endDate === undefined) {
            if (startDate.isAfter(date)) {
              return setStartDate(date);
            }
            setDays(date.diff(startDate, 'days'));
            return setEndDate(date);
          }
          setEndDate(undefined);
          setStartDate(date);
          console.log('selected day', day);
        }}
        monthFormat={'yyyy MMM'}
        markingType={'period'}
        firstDay={1}
        enableSwipeMonths={true}
        markedDates={{
          [moment().format('YYYY-MM-DD')]: {
            selected: true,
            selectedColor: tw.color('blue-500'),
          },
          ...enumerateDaysBetweenDates(startDate, endDate).reduce(
            (prev, curr, index, array) => {
              return {
                ...prev,
                [curr.format('YYYY-MM-DD')]: {
                  selected: true,
                  startingDay: index === 0,
                  endingDay: index === array.length - 1,
                  color:
                    !!curr && [6, 7].includes(curr.isoWeekday())
                      ? tw.color('blue-200')
                      : tw.color('blue-500'),
                },
              };
            },
            {},
          ),
        }}
      />

      <Text style={[tw`mt-6 dark:text-white`]}>Days</Text>
      <Input
        defaultValue={isNaN(days) ? '' : days.toString()}
        onChangeText={v => setDays(parseFloat(v))}
        keyboardType="decimal-pad"
        invalid={days < 0.25 || days > 365 || isNaN(days)}
        loading={result.isLoading}
      />

      <Button
        style={[tw`mt-6`]}
        text="Add Vacations"
        loading={result.isLoading}
        onPress={() => {
          if (startDate && endDate) {
            addVacation({
              title,
              startDate: startDate.format('YYYY-MM-DD'),
              endDate: endDate.format('YYYY-MM-DD'),
              days,
            });
          }
        }}
      />
    </View>
  );
};

export default VacationAddForm;
