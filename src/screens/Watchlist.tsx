import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {TouchableIcon} from '../components/TouchableIcon';
import {TouchablePoster} from '../components/TouchablePoster';
import {WatchlistContext} from '../contexts/WatchlistContext';
import {globalStyles} from '../theme/main';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const Watchlist = () => {
  const {watchlist, removeFromWatchlist} = useContext(WatchlistContext);

  return (
    <>
      {watchlist.movies.size > 0 ? (
        <ScrollView style={globalStyles.container}>
          <View style={[styles.container, globalStyles.center]}>
            <View style={styles.grid}>
              {Array.from(watchlist.movies.values()).map(movie => (
                <View style={styles.poster} key={movie.id}>
                  <View style={styles.closeButton}>
                    <TouchableIcon
                      iconName="close-circle-outline"
                      onPress={() => removeFromWatchlist(movie.id)}
                    />
                  </View>
                  <TouchablePoster movie={movie} />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={[globalStyles.container, globalStyles.center]}>
          <MaterialCommunityIcons
            name="playlist-remove"
            color={'white'}
            size={60}
          />
          <Text style={globalStyles.text2}> Watchlist is empty </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    right: 0,
    top: -12,
    zIndex: 1,
  },
  grid: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  poster: {
    margin: 10,
  },
  container: {
    ...globalStyles.container,
    marginTop: 100,
  },
  title: {
    ...globalStyles.text,
    fontSize: 20,
    position: 'absolute',
    left: 60,
    top: 37,
  },
});
