import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text } from 'react-native';

export const SearchScreenTest = () => {
  const [searchText, setSearchText] = useState('');
  const [movies, setMovies] = useState([
    { id: 1, title: 'The Shawshank Redemption' },
    { id: 2, title: 'The Godfather' },
    { id: 3, title: 'The Dark Knight' },
    { id: 4, title: 'Schindler\'s List' },
    { id: 5, title: 'The Lord of the Rings: The Return of the King' },
    { id: 6, title: 'Pulp Fiction' },
    { id: 7, title: 'Forrest Gump' },
    { id: 8, title: 'Inception' },
    { id: 9, title: 'The Lord of the Rings: The Fellowship of the Ring' },
    { id: 10, title: 'The Matrix' }
  ]);

  const handleSearch = (text) => {
    setSearchText(text);
    const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(text.toLowerCase()));
    setMovies(filteredMovies);
  }

  const renderMovieItem = ({ item }) => {
    return (
      <View style={styles.movieItem}>
        <Text>{item.title}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search movies"
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10
  },
  movieItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10
  }
});

