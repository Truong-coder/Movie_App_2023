import React from 'react';
import {View, Dimensions, ScrollView} from 'react-native';
import {useMovies} from '../hooks/useMovies';
import {useTvSeries} from '../hooks/useTvSeries';
import {TouchableHeaderPoster} from '../components/TouchableHeaderPoster';
import Carousel from 'react-native-snap-carousel';
import {MoviesSlider} from '../components/MoviesSlider';
import { TvSeriesSlider } from '../components/TvSeriesSlider';
import {Loader} from '../components/Loader';
import {globalStyles} from '../theme/main';

const {width: windowWidth} = Dimensions.get('window');

export const MoviesScreen = () => {
  const {latest, playingNow, upcoming, topRated, populars, isLoading} =
    useMovies();

  const {popular, airingToday, onAir, topRatedTv} = useTvSeries();

  return isLoading ? (
    <Loader />
  ) : (
    <ScrollView>
      <Carousel
        data={playingNow}
        renderItem={({item}) => <TouchableHeaderPoster movie={item} />}
        sliderWidth={windowWidth}
        itemWidth={400}
        layout={'stack'}
        // layoutCardOffset={`18`}
        autoplay
        autoplayInterval={5000}
        loop
      />

      <View style={globalStyles.container}>
        <MoviesSlider movies={populars} title="Trending" />
        <MoviesSlider movies={topRated} title="Top Rated" />
        <MoviesSlider movies={upcoming} title="Upcoming" />
        <MoviesSlider movies={playingNow} title="New in theater" />
        <TvSeriesSlider tv={popular} title="Treding TV show" />
        {/* <MoviesSlider movies={airingToday} title="TV show on-air today" />
        <MoviesSlider movies={onAir} title="On-air"/> */}
        <TvSeriesSlider tv={topRatedTv} title="Top Rated TV show"/>
      </View>
    </ScrollView>
  );
};
