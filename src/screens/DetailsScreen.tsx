import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView, Linking} from 'react-native';
import {HeaderPoster} from '../components/HeaderPoster';
import {getYear} from '../helper/dateHelper';
import {RootStackParamList} from '../navigators/StackNavigator';
import {globalStyles} from '../theme/main';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Badge} from '../components/Badge';
import {useCastName} from '../hooks/useCast';
import {useRecommendations} from '../hooks/useRecommendations';
import CropedText from '../components/CropedText';
import {TouchableIcon} from '../components/TouchableIcon';
import {useMovieDetails} from '../hooks/useMovieDetails';
import {FavoriteContext} from '../contexts/FavoriteContext';
import {WatchlistContext} from '../contexts/WatchlistContext';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {MoviesSlider} from '../components/MoviesSlider';

interface DetailsProps
  extends StackScreenProps<RootStackParamList, 'Details'> {}

export const DetailsScreen = (props: DetailsProps) => {
  const movie = props.route.params;
  const {castNames} = useCastName(movie.id);
  const {recommendations, similar} = useRecommendations(movie.id);
  const {movieDetails} = useMovieDetails(movie.id);
  const Genres = movieDetails?.genres;
  const {favorites, isFavorite, toggleFavorite} = useContext(FavoriteContext);
  const {watchlist, isAddWatchlist, toggleAddWatchlist} =
    useContext(WatchlistContext);
  const [isMovieFavorite, setIsMovieFavorite] = useState(false);
  const [addMovieList, setAddMovieList] = useState(false);

  console.log('movie in details: ', movieDetails);
  console.log('cast: ', castNames);
  console.log('recommendationsNames: ', recommendations);
  // console.log('Genres: ', Genres);

  useEffect(() => {
    setIsMovieFavorite(isFavorite(movie.id));
    setAddMovieList(isAddWatchlist(movie.id));
  }, [favorites, watchlist]);

 

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#000'}}>
      <View style={globalStyles.container}>
        <View style={styles.container}>
          <HeaderPoster movie={movie} />
        </View>
        <View style={globalStyles.row}>
          <Text style={globalStyles.subtitle}>
            {getYear(movie.release_date)}
          </Text>
          <View style={styles.iconContainer}>
            <Icon
              style={styles.icon}
              name="film-outline"
              size={20}
              color={'white'}
            />
            <Icon
              style={styles.icon}
              name="heart-outline"
              size={20}
              color={'white'}
            />
          </View>
          <Badge
            title={movie.adult ? '18+' : '11+'}
            color={!movie.adult ? 'orange' : '#6FC3DF'}
          />
          <Badge title={movie.vote_average.toString()} color="#333333" />
        </View>
        
        {/* Movies Genres */}
        <View style={{flexDirection: 'row', marginBottom: 20}}>
          {Genres &&
            Genres.map(genre => <Text key={genre.id}>{genre.name}, </Text>)}
        </View>

        <CropedText>
          <Text style={[globalStyles.paragraph, globalStyles.mv10]}>
            {movie.overview}
          </Text>
        </CropedText>

        <CropedText>
          <Text style={{fontWeight: 'bold'}}>Cast: </Text>
          {castNames.join(', ')}
        </CropedText>
        <View style={styles.moviesActionButtons}>
          <TouchableIcon
            title="My List"
            iconName={addMovieList ? 'checkmark-circle-outline' : 'add-outline'}
            color={addMovieList ? 'green' : 'white'}
            onPress={() => toggleAddWatchlist(movie)}
          />

          <TouchableIcon
            iconName="play-outline"
            title="Watch"
            onPress={() =>
              Linking.openURL(
                `https://www.imdb.com/title/${movieDetails?.imdb_id}`,
              )
            }
          />
          <TouchableIcon
            title="Favorite"
            iconName={isMovieFavorite ? 'heart' : 'heart-outline'}
            color={isMovieFavorite ? '#E50914' : 'white'}
            onPress={() => toggleFavorite(movie)}
          />
        </View>

        <MoviesSlider movies={similar} title="People also watch" />
        <MoviesSlider movies={recommendations} title="Recommendations" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  iconContainer: {
    marginTop: 3,
    marginLeft: 20,
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 3,
  },
  moviesActionButtons: {
    marginTop: 50,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});
