import React from 'react';
import {Text, Image, StyleSheet, View} from 'react-native';
import {globalStyles} from '../theme/main';
import LinearGradient from 'react-native-linear-gradient';
import {Credit, Movie} from '../types/MoviesDB';
import {getImageUri, getMovieCastImageUri} from '../services/image';
import { TvSeries } from '../types/tvSeriesDB';

interface HeaderPosterProps {
  movie: Movie;
  height?: number | string;
}

interface HeaderTvPosterProps {
  tv: TvSeries;
  height?: number | string;
}

interface MovieCastImgProps {
  credit: Credit;
  height?: number | string;
}


export const HeaderPoster = ({movie, height = 600}: HeaderPosterProps) => {
  const uri = getImageUri(movie);

  return (
    <>
      <Image
        source={{uri}}
        style={{width: '100%', height: height}}
        resizeMode="contain"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,1)']}
        style={styles.gradient}
      />
      <Text style={styles.title}>{movie.title}</Text>
    </>
  );
};

export const HeaderTvPoster = ({tv, height = 600}: HeaderTvPosterProps) => {
  const uri = getImageUri(tv);
 
  return (
    <>
      <Image
        source={{uri}}
        style={{width: '100%', height: height}}
        resizeMode="contain"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,1)']}
        style={styles.gradient}
      />
      <Text style={styles.title}>{tv.name}</Text>
    </>
  );
};

// export const PosterTvCast = ({tv, height = 600}: HeaderTvPosterProps) => {
//   const uri = getImageUri(tv);
 
//   return (
//     <>
//       <Image
//         source={{uri}}
//         style={{width: '100%', height: height}}
//         resizeMode="contain"
//       />
//       <LinearGradient
//         colors={['transparent', 'rgba(0,0,0,1)']}
//         style={styles.gradient}
//       />
//       <Text style={styles.title}>{tv.name}</Text>
//     </>
//   );
// };

export const PosterMovieCast = ({credit, height = 250}: MovieCastImgProps) => {
  const uri = getMovieCastImageUri(credit);
  console.log('movie cast credit: ', credit);
  console.log('movie cast uri: ', uri);
  return (
    <>
      <Image
        source={{uri}}
        style={{width: '100%', height: height}}
        resizeMode="contain"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,1)']}
        style={styles.gradient}
      />
      <Text style={styles.title}>{credit.name}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
    zIndex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  title: {
    ...globalStyles.title,
    zIndex: 1000,
    textAlign: 'left',
    position: 'absolute',
    bottom: 0,
    fontWeight: 'bold',
    width: '90%',
  },
});
