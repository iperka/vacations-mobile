import moment from 'moment';
import React from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  useColorScheme,
  View,
} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import {Text} from 'react-native-svg';
import tw from 'twrnc';
import {Card, Stat, Typography} from '../components';
import {
  useGetNextVacationQuery,
  useGetOverviewQuery,
} from '../services/vacation';

const Home = () => {
  const {
    data: dataNextVacations,
    isLoading,
    error,
    refetch,
  } = useGetNextVacationQuery();
  const {
    data: dataOverview,
    isLoading: isLoadingOverview,
    error: errorOverview,
    refetch: refetchOverview,
  } = useGetOverviewQuery(new Date().getFullYear());

  const nextVacationsIn = moment(dataNextVacations?.data?.startDate).diff(
    moment(),
    'days',
  );

  console.log(dataOverview);

  return (
    <SafeAreaView style={[tw`pt-4 flex h-full`]}>
      <Typography style={[tw`px-4 text-2xl font-bold`]}>Home</Typography>
      <ScrollView
        style={[
          tw`px-4 py-2 flex-1 my-2`,
          // isDarkMode ? tw`bg-gray-800` : tw`bg-gray-200`,
        ]}>
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => {
            refetch();
            refetchOverview();
          }}
        />
        <Stat
          value={nextVacationsIn + ' days' || 'n/a'}
          name="Next Vacations in"
          style={[tw`mb-4`]}
        />
        {dataOverview && dataOverview.data && (
          <Card>
            <BarChart
              data={{
                labels: moment.months().slice(new Date().getMonth() - 1, 6),
                datasets: [
                  {
                    data: dataOverview?.data.slice(
                      new Date().getMonth() - 1,
                      6,
                    ),
                  },
                ],
              }}
              width={320}
              height={220}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={{
                backgroundColor: 'white',
                backgroundGradientFrom: 'white',
                backgroundGradientTo: 'white',
                color: (opacity = 1) => `#F6761F`,
                labelColor: (opacity = 1) => `#F6761F`,
              }}
            />
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
