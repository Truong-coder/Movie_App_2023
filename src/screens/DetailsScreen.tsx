import {StackScreenProps} from '@react-navigation/stack';
import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableWithoutFeedback,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {HeaderPoster, PosterMovieCast} from '../components/HeaderPoster';
import {getYear} from '../helper/dateHelper';
import {RootStackParamList} from '../navigators/StackNavigator';
import {globalStyles} from '../theme/main';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialComIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Badge} from '../components/Badge';
import {useCastName} from '../hooks/useCast';
import {useRecommendations} from '../hooks/useRecommendations';
import CropedText from '../components/CropedText';
import {TouchableIcon} from '../components/TouchableIcon';
import {useMovieDetails} from '../hooks/useMovieDetails';
import {FavoriteContext} from '../contexts/FavoriteContext';
import {WatchlistContext} from '../contexts/WatchlistContext';
import {
  VideoPlayerSlider,
  MoviesSliderinDetails,
  CompanyLogoSlider,
  MovieGenreSlider,
  CastSlider,
} from '../components/MoviesSlider';
import {TouchablePoster} from '../components/TouchablePoster';
import {useVideos} from '../hooks/useVideos';
import {VideoPlayer} from '../components/VideoPlayer/VideoPlayer';
import {useNavigation} from '@react-navigation/native';
import BackButton from '../components/BackButton';
import {SearchButton} from '../components/SearchButton';
import VideoScreen from '../components/VideoPlayer/VideoScreen';
interface DetailsProps
  extends StackScreenProps<RootStackParamList, 'Details'> {}

export const DetailsScreen = (props: DetailsProps) => {
  const movie = props.route.params;
  const {castNames} = useCastName(movie.id);
  const {recommendations, similar} = useRecommendations(movie.id);
  const {movieDetails} = useMovieDetails(movie.id);
  const {movieVideos} = useVideos(movie.id);
  const Genres = movieDetails?.genres;
  const ProductionComp = movieDetails?.production_companies;
  const Language = movieDetails?.spoken_languages;
  const Country = movieDetails?.production_countries;
  const {favorites, isFavorite, toggleFavorite} = useContext(FavoriteContext);
  const {watchlist, isAddWatchlist, toggleAddWatchlist} =
    useContext(WatchlistContext);
  const [isMovieFavorite, setIsMovieFavorite] = useState(false);
  const [addMovieList, setAddMovieList] = useState(false);
  const [playing, setPlaying] = useState(false);
  const navigation = useNavigation<any>();
  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);
  // Refresh ScrllView
  const scrollViewRef = useRef();

  // method to handle refreshing of content
  const handleRefresh = () => {
    // scroll to the top of the scrollView
    scrollViewRef.current.scrollTo({y: 0, animated: true});

    // perform the refresh action here
    // ...
  };


  console.log('movie in details: ', movieDetails);
  console.log('castNames: ', castNames);
  console.log('recommendationsNames: ', recommendations);
  console.log('Trailer: ', movieVideos);
  console.log('Production Comp: ', ProductionComp);
  // console.log('Video key: ', videoKey);

  useEffect(() => {
    setIsMovieFavorite(isFavorite(movie.id));
    setAddMovieList(isAddWatchlist(movie.id));
  }, [favorites, watchlist]);

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: '#000'}}
      ref={scrollViewRef}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={handleRefresh} />
      }
      overScrollMode="never">
      <View style={styles.container}>
        <HeaderPoster movie={movie} />
        <View style={styles.backButtonContainer}>
          <BackButton />
          <SearchButton />
        </View>
      </View>

      <View style={globalStyles.detailScreen_container}>
        <View style={globalStyles.row}>
          <Text style={globalStyles.subtitle}>
            {getYear(movie.release_date)}
          </Text>
          <View style={styles.iconContainer}>
            <Icon
              style={styles.icon}
              name="film-outline"
              size={25}
              color={'white'}
            />
            <Badge
              title={movie.adult ? '18+' : '11+'}
              color={!movie.adult ? 'orange' : '#6FC3DF'}
            />
            <Badge title={movie.vote_average.toString()} color="#333333" />
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <MaterialComIcons name="flag-variant" size={21} />
          {/* Production Country */}
          {Country &&
            Country.map((item, index) => (
              <View style={{flexDirection: 'row'}}>
                <Text key={index} style={{fontSize: 14, marginLeft: 5}}>
                  {item.name}
                  {index !== Country.length - 1 && ', '}
                </Text>
              </View>
            ))}
        </View>

        <View style={{flexDirection: 'row'}}>
          <MaterialComIcons name="web" size={21} />

          {/* Language */}
          {Language &&
            Language.map((item, index) => (
              <Text key={index} style={{fontSize: 14, marginLeft: 5}}>
                {item.english_name}
                {index !== Language.length - 1 && ', '}
              </Text>
            ))}
        </View>
        <View style={{flexDirection: 'row'}}>
          <MaterialComIcons name="clock-outline" size={21} />
          <Text> {movieDetails?.runtime} minutes </Text>
        </View>
        {/* Movies Genres */}
        <View style={{marginBottom: 20}}>
          <MovieGenreSlider genres={Genres} />
        </View>

        {/* Add Movie to watchlist and favourite list */}
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

        {/* Movie Videos */}
        <Text style={{fontWeight: 'bold', fontSize: 14}}> Trailer: </Text>
        <VideoPlayer videoKey={movieVideos} />
        {/* <VideoScreen movieVideos={movieVideos} /> */}


        <CropedText>
          <Text style={{fontWeight: 'bold', fontSize: 14}}>Description: </Text>
          <Text style={[globalStyles.paragraph, globalStyles.mv10]}>
            {movie.overview}
          </Text>
        </CropedText>

        {/* Production Companies */}

        <Text style={{color: 'white'}}> Production Companies: </Text>
        <View style={{flexDirection: 'row'}}>
          {/* <CompanyLogoSlider productionComp={ProductionComp} /> */}
          {ProductionComp &&
            ProductionComp.map((item, index) => (
              <Text key={index} style={{fontSize: 14, marginLeft: 5}}>
                {item.name}
                {index !== ProductionComp.length - 1 && ', '}
              </Text>
            ))}
          {/* <CropedText> */}
        </View>

        <Text style={{fontWeight: 'bold'}}>Cast: </Text>
        {/* {castNames.join(', ')} */}
        <CastSlider cast={castNames} />
        {/* </CropedText> */}

        <MoviesSliderinDetails movies={similar} title="Similar to this movie" />
        <MoviesSliderinDetails
          movies={recommendations}
          title="Maybe you like to watch"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    position: 'relative',
  },
  iconContainer: {
    marginTop: 3,
    // marginBottom: 5
    marginLeft: 20,
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 3,
  },
  moviesActionButtons: {
    marginBottom: 20,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  backButtonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    top: 10,
    left: 10,
  },
  background: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    width: '90%',
    height: '80%',
  },
});
