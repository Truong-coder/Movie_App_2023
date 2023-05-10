import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const SearchButton = () => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation && navigation.navigate && navigation.navigate('Search')
      }
      style={{marginTop: 30, marginLeft: 300}}>
      <Ionicons name="search-outline" size={30} color="white" />
    </TouchableOpacity>
  );
};
