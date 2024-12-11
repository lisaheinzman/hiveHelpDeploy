import React from 'react';
import { View, Text } from 'react-native';

const DateDetailsScreen = ({ route }) => {
  const { date } = route.params;

  return (
    <View>
      <Text>Name: {date.name}</Text>
      <Text>Notes: {date.notes}</Text>
      <Text>Start Date: {date.startDate}</Text>
      <Text>End Date: {date.endDate}</Text>
    </View>
  );
}

export default DateDetailsScreen;
