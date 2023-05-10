import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {MovieDetails} from '../types/MoviesDB';
import {useNavigation} from '@react-navigation/core';

interface TouchableMovieGenresProps {
  genres: MovieDetails;
}

export const TouchableMovieGenres = ({genres}: TouchableMovieGenresProps) => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}> {genres.name} </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 20,
    borderWidth: 1,
    marginLeft: 10
  },
  button: {
    width: '100%',
    height: '100%',
    backgroundColor: '#212121',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  text:{
    fontSize: 12,
    color: 'white'
  }
});
