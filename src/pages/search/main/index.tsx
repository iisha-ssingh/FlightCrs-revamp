import React from 'react';
import {useAppDispatch} from '../../../store';
import {fetchBookings} from '../reducer';
import {Pressable, Text, View} from 'react-native';

export const SearchPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const fetchBookingList = async () => {
    console.log('button clicked');
    dispatch(fetchBookings({retry: true}));
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Pressable onPress={fetchBookingList}>
        <Text>Fetch Booking List</Text>
      </Pressable>
    </View>
  );
};
