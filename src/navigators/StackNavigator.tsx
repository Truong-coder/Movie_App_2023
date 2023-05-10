import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {DetailsScreen} from '../screens/DetailsScreen';
import {FavoritesScreen} from '../screens/FavoritesScreen';
import {MoviesScreen} from '../screens/MoviesScreen';
import {ProfileScreen} from '../screens/ProfileScreen';
import {SearchScreen} from '../screens/SearchScreen';
// import { SearchScreenTest } from '../screens/SearchScreenTest';
import {Watchlist} from '../screens/Watchlist';
import {LoginScreen} from '../screens/LoginScreen';
import {RegisterScreen} from '../screens/RegisterScreen';
import {Movie} from '../types/MoviesDB';
import {TvSeries} from '../types/tvSeriesDB';
import {TvDetailsScreen} from '../screens/TvDetailsScreen';

export type RootStackParamList = {
  Movies: undefined;
  Details: Movie;
  Favorites: undefined;
  TvDetails: TvSeries;
};

const Stack = createStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Movies" component={MoviesScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="TvDetails" component={TvDetailsScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="List" component={Watchlist} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};
