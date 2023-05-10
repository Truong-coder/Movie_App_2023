import React, {useCallback, useState} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {
  Movie,
  ProductionCompanyPoster,
  MovieGenre,
  MovieTrailers,
  VideoKey,
  Credit,
} from '../types/MoviesDB';
import {
  TouchablePoster,
  TouchableCompaniesPoster,
  TouchableCreditPoster,
} from './TouchablePoster';
import {TouchableMovieGenres} from './TouchableGenres';
import {VideoPlayer} from './VideoPlayer/VideoPlayer';
import {globalStyles} from '../theme/main';
import YoutubeIframe from 'react-native-youtube-iframe';
import {CreateAxiosDefaults} from 'axios';
import {PosterMovieCast} from './HeaderPoster';

interface MoviesCarouselProps {
  movies: Movie[];
  title?: string;
}

interface ProductionCompPosterProps {
  productionComp: ProductionCompanyPoster[];
  // name: string;
}

interface MoviesGenresProps {
  genres: MovieGenre[];
}

interface MoviesVideoProps {
  videos: MovieTrailers[];
}

interface CreditProps {
  cast: Credit[];
}

export const MoviesSlider = ({movies, title}: MoviesCarouselProps) => {
  return (
    <View style={styles.flatListContainer}>
      <Text style={styles.flatListHeader}>{title}</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
        renderItem={({item}) => <TouchablePoster movie={item} />}
        horizontal
      />
    </View>
  );
};

export const MoviesSliderinDetails = ({movies, title}: MoviesCarouselProps) => {
  return (
    <View style={styles.new_flatListContainer}>
      <Text style={styles.flatListHeader}>{title}</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
        renderItem={({item}) => <TouchablePoster movie={item} />}
        horizontal
      />
    </View>
  );
};

export const CompanyLogoSlider = ({
  productionComp,
}: ProductionCompPosterProps) => {
  return (
    <View style={styles.flatListContainerCompPoster}>
      <FlatList
        data={productionComp}
        renderItem={({item}) => (
          <View style={styles.container}>
            <Text style={styles.text}>{item.name}</Text>
            <TouchableCompaniesPoster productionComp={item} />
          </View>
        )}
        horizontal
      />
    </View>
  );
};

export const MovieGenreSlider = ({genres}: MoviesGenresProps) => {
  return (
    <View style={styles.flatListContainerGenres}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={genres}
        renderItem={({item}) => <TouchableMovieGenres genres={item} />}
        horizontal
      />
    </View>
  );
};

export const VideoPlayerSlider = ({videos}: MoviesVideoProps) => {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback(
    (state, videoIndex) => {
      if (state === 'ended') {
        setPlaying(false);
        // If the current video has ended, play the next video
        if (videoIndex < videos.length - 1) {
          setPlaying(true);
        }
      }
    },
    [videos],
  );

  console.log('Video: ', videos);

  return (
    <View style={styles.flatListContainer}>
      <FlatList
        data={[videos]}
        renderItem={({item, index}) => (
          <VideoPlayer
            videoKey={item}
            playing={playing && index === 0} // Only play the first video initially
            onStateChange={state => onStateChange(state, index)}
          />
        )}
        keyExtractor={item => item.id}
        horizontal
      />
    </View>
  );
};

export const CastSlider = ({cast}: CreditProps) => {
  return (
    <View style={styles.flatListContainerCompPoster}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={cast}
        renderItem={({item}) => (
          <View style={styles.container}>
            <View>
              <PosterMovieCast credit={item} />
            </View>
            <TouchableCreditPoster credit={item} />
          </View>
        )}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    height: '16%',
    width: '100%',
    marginTop: 10,
    marginLeft: 5,
  },
  new_flatListContainer: {
    height: '11%',
    width: '100%',
    marginTop: 10,
    marginLeft: 5,
  },
  flatListContainerCompPoster: {
    height: '11%',
    marginTop: 20,
    borderRadius: 20,
  },
  flatListContainerGenres: {
    height: 50,
    marginTop: 30,
  },
  flatListHeader: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 5,
    marginBottom: 10,
  },
  container: {
    flexDirection: 'column',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 5,
    width: 150,
  },
});
