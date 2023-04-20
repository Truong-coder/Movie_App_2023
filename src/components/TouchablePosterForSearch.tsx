import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {Movie} from '../types/MoviesDB';
import {useNavigation} from '@react-navigation/core';

interface TouchablePosterForSearchProps {
  movie: Movie;
}

export const TouchablePosterForSearch = ({
  movie,
}: TouchablePosterForSearchProps) => {
  const uri = `https://image.tmdb.org/t/p/w500${movie?.poster_path}`;
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Details', movie)}>
        <Image source={{uri}} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '35%',
    height: '100%',
  },
  image: {
    width: 120,
    height: 160,
    borderRadius: 20,
  },
});
