import moment, {Moment} from 'moment';
import React from 'react';
import tw from '../../tailwindcss';
import {ScrollView, ScrollViewProps, Text, View} from 'react-native';

export interface DaysProps extends ScrollViewProps {
  startDate: Date;
  endDate: Date;
}

const enumerateDaysBetweenDates = function (
  startDate: Moment,
  endDate: Moment,
) {
  var now = startDate.clone(),
    dates = [];

  while (now.isSameOrBefore(endDate)) {
    dates.push({
      status: moment().startOf('day').isSame(now.startOf('day'))
        ? 0
        : moment().isAfter(now)
        ? -1
        : 1,
      date: now.format('DD'),
    });
    now.add(1, 'days');
  }
  return dates;
};

const Days: React.FC<DaysProps> = ({startDate, endDate, style, ...rest}) => {
  const dates = enumerateDaysBetweenDates(moment(startDate), moment(endDate));

  return (
    <ScrollView horizontal style={[tw`pb-2`, style]} {...rest}>
      {dates.map((date, i) => (
        <View
          key={date.date}
          style={[
            tw`rounded-lg p-3 mr-2 shadow-md`,
            date.status === -1 && tw`bg-red dark:bg-redDark`,
            date.status === 0 && tw`bg-yellow dark:bg-yellowDark`,
            date.status === 1 && tw`bg-green dark:bg-greenDark`,
          ]}>
          <Text style={[tw`text-xl text-white font-bold`]}>{date.date}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Days;
