import React, {useState} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {Movie} from '../types/MoviesDB';
import {TouchablePosterForSearch} from './TouchablePosterForSearch';
import {LongText} from './LongText';
import {globalStyles} from '../theme/main';

interface MoviesProps {
  movies: Movie[];
  title?: string;
}

export const MoviesList = ({movies, title}: MoviesProps) => {
  const renderItem = ({item}) => {
    console.log('MOVIES: ', movies);
    // console.log("title: ", item.original_title);
    const overview = item.overview;
    return (
      <View style={[globalStyles.new_container, styles.container]}>
        <View style={styles.row}>
          <TouchablePosterForSearch movie={item} />
          <View style={styles.show}>
            <Text style={styles.title}>{item.original_title}</Text>
            <LongText text={overview} />
            {/* <Text style={styles.desTitle}>{item.genre_ids}</Text> */}
            <Text style={styles.desTitle}>{item.release_date}</Text>
            <Text style={styles.rating1}>{item.vote_average.toFixed(1)}</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.flatListContainer}>
      <FlatList
        data={movies}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    height: '87%',
    marginTop: 5,
    marginLeft: 20,
  },
  flatListHeader: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 5,
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  container: {
    flex: 1,
    width: '97%',
    height: '20%',
    marginTop: 10,
    marginRight: 260
  },
  image: {
    borderColor: 'white',
    borderWidth: 1,
    height: 150,
    width: 100,
    marginTop: 7,
    marginLeft: 10,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    height: '100%',
  },
  show: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 20,
    marginBottom: 0,
    lineHeight: 17,
    // paddingVertical: 20,
  },
  title: {
    fontSize: 16,
    color: 'white',
    width: 200,
    fontWeight: 'bold',
  },
  desTitle: {
    fontSize: 14,
    color: 'white',
    width: 250,
    marginTop: 10,
    lineHeight: 15,
  },
  rating1: {
    fontSize: 14,
    color: 'white',
    marginTop: 10,
    marginLeft: 0,
    borderRadius: 10,
    backgroundColor: 'green',
    width: 30,
    lineHeight: 20,
    justifyContent: 'center',
  },
});
