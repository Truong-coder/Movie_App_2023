import {StackScreenProps} from '@react-navigation/stack';
import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Linking,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {HeaderTvPoster} from '../components/HeaderPoster';
import {getYear} from '../helper/dateHelper';
import {RootStackParamList} from '../navigators/StackNavigator';
import {globalStyles} from '../theme/main';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialComIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Badge} from '../components/Badge';
import {useCastName} from '../hooks/useCast';
import {useRecommendationsTv} from '../hooks/useRecommendationsTv';
import CropedText from '../components/CropedText';
import {TouchableIcon} from '../components/TouchableIcon';
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
import {useTvVideos} from '../hooks/useTvVideos';
import {VideoPlayer} from '../components/VideoPlayer/VideoPlayer';
import {useNavigation} from '@react-navigation/native';
import {useTvDetails} from '../hooks/useTvDetails';
import BackButton from '../components/BackButton';
import {TvSliderinDetails} from '../components/TvSeriesSlider';
import {SearchButton} from '../components/SearchButton';

interface DetailsProps
  extends StackScreenProps<RootStackParamList, 'TvDetails'> {}

export const TvDetailsScreen = (props: DetailsProps) => {
  const tv = props.route.params;
  const {castNames} = useCastName(tv.id);
  const {recommendationsTv, similarTv} = useRecommendationsTv(tv.id);
  const {tvDetails} = useTvDetails(tv.id);
  const {tvVideos} = useTvVideos(tv.id);
  const Genres = tvDetails?.genres;
  const ProductionComp = tvDetails?.production_companies;
  const Language = tvDetails?.spoken_languages;
  const Country = tvDetails?.production_countries;
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

  //   console.log('movie in details: ', tvDetails);
  //   console.log('cast: ', castNames);
  //   console.log('recommendationsNames: ', recommendations);
  //   console.log('Trailer: ', movieVideos);
  // console.log('Video key: ', videoKey);

  console.log('TV: ', tvDetails);
  useEffect(() => {
    setIsMovieFavorite(isFavorite(tv.id));
    setAddMovieList(isAddWatchlist(tv.id));
  }, [favorites, watchlist]);

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: '#000'}}
      ref={scrollViewRef}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={handleRefresh} />
      }>
      <View style={styles.container}>
        <HeaderTvPoster tv={tv} />
        <View style={styles.backButtonContainer}>
          <BackButton />
          <SearchButton />
        </View>
      </View>

      <View style={globalStyles.detailScreen_container}>
        <View style={globalStyles.row}>
          <Text style={globalStyles.subtitle}>
            {getYear(tv.first_air_date)}
          </Text>
          <View style={styles.iconContainer}>
            <Icon
              style={styles.icon}
              name="tv-outline"
              size={25}
              color={'white'}
            />
            <Badge
              title={tv.adult ? '18+' : '11+'}
              color={!tv.adult ? 'orange' : '#6FC3DF'}
            />
            <Badge title={tv.vote_average.toString()} color="#333333" />
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <MaterialComIcons name="flag-variant" size={21} />
          {/* Production Country */}
          {Country &&
            Country.map((item, index) => (
              <Text key={index} style={{fontSize: 14, marginLeft: 5}}>
                {item.name}
                {index !== Country.length - 1 && ', '}
              </Text>
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
          <Text> {tvDetails?.episode_run_time[0]} minutes / episode </Text>
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
            onPress={() => toggleAddWatchlist(tv)}
          />

          <TouchableIcon
            iconName="play-outline"
            title="Watch"
            onPress={() =>
              Linking.openURL(
                `https://www.imdb.com/title/${tvDetails?.imdb_id}`,
              )
            }
          />
          <TouchableIcon
            title="Favorite"
            iconName={isMovieFavorite ? 'heart' : 'heart-outline'}
            color={isMovieFavorite ? '#E50914' : 'white'}
            onPress={() => toggleFavorite(tv)}
          />
        </View>

        {/* Movie Videos */}
        <Text style={{fontWeight: 'bold', fontSize: 14}}> Trailer: </Text>
        <VideoPlayer videoKey={tvVideos} />

        <CropedText>
          <Text style={{fontWeight: 'bold', fontSize: 14}}>Description: </Text>
          <Text style={[globalStyles.paragraph, globalStyles.mv10]}>
            {tv.overview}
          </Text>
        </CropedText>

        {/* Production Companies */}

        <Text style={{color: 'white'}}> Production Companies: </Text>
        <View style={{flexDirection: 'row'}}>
          {ProductionComp &&
            ProductionComp.map((item, index) => (
              <Text key={index} style={{fontSize: 14, marginLeft: 5}}>
                {item.name}
                {index !== ProductionComp.length - 1 && ', '}
              </Text>
            ))}
          {/* <CropedText> */}
        </View>
        
        {/* Cast */}
        <Text style={{fontWeight: 'bold'}}>Cast: </Text>
        <CastSlider cast={castNames} />

        <TvSliderinDetails tv={similarTv} title="Similar to this TV show" />
        <TvSliderinDetails
          tv={recommendationsTv}
          title="Maybe you like to watch"
        />
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
});
