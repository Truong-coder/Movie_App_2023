import React from 'react';
import {View, Dimensions, ScrollView} from 'react-native';
import {useMovies} from '../hooks/useMovies';
import {TouchableHeaderPoster} from '../components/TouchableHeaderPoster';
import Carousel from 'react-native-snap-carousel';
import {MoviesSlider} from '../components/MoviesSlider';
import {Loader} from '../components/Loader';
import {globalStyles} from '../theme/main';

const {width: windowWidth} = Dimensions.get('window');

export const MoviesScreen = () => {
  const {latest, playingNow, upcoming, topRated, populars, isLoading} =
    useMovies();

  return isLoading ? (
    <Loader />
  ) : (
    <ScrollView>
      <View style={globalStyles.container}>
        <Carousel
          data={playingNow}
          renderItem={({item}) => <TouchableHeaderPoster movie={item} />}
          sliderWidth={windowWidth}
          itemWidth={300}
          layout={'tinder'}
          // layoutCardOffset={`18`}
          autoplay
          autoplayInterval={10000}
          loop
        />
        {/* <MoviesSlider movies={latest} title="What's new" /> */}
        <MoviesSlider movies={populars} title="Trending" />
        <MoviesSlider movies={topRated} title="Top Rated" />
        <MoviesSlider movies={upcoming} title="Upcoming" />
      </View>
    </ScrollView>
  );
};
