import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {
  Movie,
  MovieDetails,
  ProductionCompanyPoster,
  Credit,
} from '../types/MoviesDB';
import {useNavigation} from '@react-navigation/core';
import {TvSeries} from '../types/tvSeriesDB';

interface TouchablePosterProps {
  movie: Movie;
}

interface TouchableTvPosterProps {
  tv: TvSeries;
}

interface TouchableCompaniesPosterProps {
  productionComp: ProductionCompanyPoster;
}

interface TouchableCreditPosterProps {
  credit: Credit;
}

export const TouchablePoster = ({movie}: TouchablePosterProps) => {
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

export const TouchableTvPoster = ({tv}: TouchableTvPosterProps) => {
  const uri = `https://image.tmdb.org/t/p/w500${tv?.poster_path}`;
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('TvDetails', tv)}>
        <Image source={{uri}} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

export const TouchableCompaniesPoster = ({
  productionComp,
}: TouchableCompaniesPosterProps) => {
  const uri = `https://image.tmdb.org/t/p/w500${productionComp?.logo_path}`;
  const navigation = useNavigation<any>();
  console.log('Companies Logo: ', uri);

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image source={{uri}} style={styles.company_logo} resizeMode="center" />
      </TouchableOpacity>
    </View>
  );
};

export const TouchableCreditPoster = ({credit}: TouchableCreditPosterProps) => {
  const uri = `https://image.tmdb.org/t/p/w500${credit?.profile_path}`;
  const navigation = useNavigation<any>();
  console.log('Profile: ', uri);

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image source={{uri}} style={styles.profile} resizeMode="center" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 20,
  },
  image: {
    width: '80%',
    height: '100%',
    borderRadius: 10,
  },
  company_logo: {
    width: '80%',
    height: '90%',
    borderRadius: 10,
    margin: 5,
  },
  profile: {
    width: '80%',
    height: '90%',
    borderRadius: 10,
    margin: 5,
  },
});
