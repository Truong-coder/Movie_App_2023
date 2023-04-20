import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {FavoriteProvider} from './src/contexts/FavoriteContext';
// import {DrawerNavigator} from './src/navigators/DrawerNavigator';
import {CreateBottomNavigator} from './src/navigators/BottomNavigator';
import {WatchlistProvider} from './src/contexts/WatchlistContext';

export const App = () => {
  return (
    <NavigationContainer>
      <FavoriteProvider>
        <WatchlistProvider>
          <StatusBar translucent={true} backgroundColor={'transparent'} />
          {/* <DrawerNavigator /> */}
          <CreateBottomNavigator />
        </WatchlistProvider>
      </FavoriteProvider>
    </NavigationContainer>
  );
};
