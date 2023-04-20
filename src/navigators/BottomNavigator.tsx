import React from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StackNavigator} from './StackNavigator';
import {MoviesScreen} from '../screens/MoviesScreen';
import {FavoritesScreen} from '../screens/FavoritesScreen';
import {SearchScreen} from '../screens/SearchScreen';
import {ProfileScreen} from '../screens/ProfileScreen';
import {LoginScreen} from '../screens/LoginScreen';
import {RegisterScreen} from '../screens/RegisterScreen';
import {Watchlist} from '../screens/Watchlist';

// Create a bottom tab navigator and add the stacks to it:
const Tab = createBottomTabNavigator();

export const CreateBottomNavigator = () => {
  return (
    <Tab.Navigator
      headerMode="none"
      initialRouteName="Login"
      screenOptions={{
        tabBarActiveTintColor: 'red',
        tabBarStyle: {
          backgroundColor: 'black',
        },
      }}>
      <Tab.Screen
        name="MoviesStack"
        component={StackNavigator}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="movie-roll" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="movie-search-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="List"
        component={Watchlist}
        options={{
          tabBarLabel: 'Watchlist',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="movie-check-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: 'Favorites',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="heart-sharp" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-circle-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarStyle: {display: 'none'},
          tabBarButton: props => null, //this is additional if you want to hide the tab element from the bottom nav
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          tabBarStyle: {display: 'none'},
          tabBarButton: props => null, //this is additional if you want to hide the tab element from the bottom nav
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
