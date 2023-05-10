import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {FavoriteProvider} from './src/contexts/FavoriteContext';
// import {DrawerNavigator} from './src/navigators/DrawerNavigator';
import {CreateBottomNavigator} from './src/navigators/BottomNavigator';
import {WatchlistProvider} from './src/contexts/WatchlistContext';
import SplashScreen from 'react-native-splash-screen';

export const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
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
