import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useMovies} from '../hooks/useMovies';
import {MoviesSlider} from '../components/MoviesSlider';
import {Loader} from '../components/Loader';
import {globalStyles} from '../theme/main';
import {MoviesList} from '../components/MoviesList';
import {getSearchMovie} from '../services/moviedb';
import BackButton from '../components/BackButton';

export const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const {playingNow, upcoming, topRated, populars, isLoading} = useMovies();

  useEffect(() => {
    if (searchText) {
      // Call the search API when searchText is not empty
      getSearchMovie(searchText)
        .then(data => {
          setSearchResults(data.results);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      // Clear the search results when searchText is empty
      setSearchResults([]);
    }
  }, [searchText]);

  const handleSearch = text => {
    const results = populars.filter(
      movie =>
        movie.title.toLowerCase().includes(text.toLowerCase()) ||
        movie.release_date.toLowerCase().includes(text.toLowerCase()),
    );
    setSearchResults(results);
    setSearchText(text);
  };

  const handleCancel = () => {
    setSearchResults([]);
    setSearchText('');
    setIsSearchActive(false);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <View style={{backgroundColor: 'black', flex: 1}}>
      <View style={{flexDirection: 'row', width: '85%'}}>
        <View style={{marginTop: 20, marginLeft: 10}}>
          <BackButton />
        </View>

        <View style={styles.search_bar_container}>
          <TouchableOpacity onPress={() => setIsSearchActive(true)}>
            <Icon
              name="search-outline"
              size={25}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
          <View style={{flex: 1}}>
            <TextInput
              style={[styles.input, isSearchActive && styles.shortInput]}
              placeholder="Search here ..."
              placeholderTextColor={'#d3d3d3'}
              onChangeText={handleSearch}
              value={searchText}
              clearButtonMode={isSearchActive ? 'never' : 'while-editing'}
              onFocus={() => setIsSearchActive(true)}
              onBlur={() => setIsSearchActive(false)}
              // onSubmitEditing={handleSubmit}
            />
          </View>
          <TouchableOpacity onPress={handleCancel} style={{marginLeft: 50}}>
            <Icon
              name="close-outline"
              size={25}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Display the search results */}
      {searchResults.length > 0 && <MoviesList movies={searchResults} />}

      {/* Display the popular movies if search results are empty */}
      {!isSearchActive && <MoviesList movies={populars} />}
    </View>
  );
};

const styles = StyleSheet.create({
  search_bar_container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 10,
    marginTop: 45,
    width: '100%',
  },
  input: {
    flex: 1,
    height: 40,
    color: 'black',
    width: '80%',
  },
  shortInput: {
    flex: 0.9,
  },
  icon: {
    padding: 10,
  },
  cancelButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingRight: 10,
  },
  flatlist: {
    flex: 1,
  },
});
