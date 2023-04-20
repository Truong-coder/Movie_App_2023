import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Username from './assests/username.svg';
import {globalStyles} from '../theme/main';

export const testProps = (testID: string) => {
  if (Platform.OS === 'ios') {
    return {
      testID,
      accessible: false,
    };
  }

  return {
    accessible: true,
    accessibilityLabel: testID,
  };
};

export const ProfileScreen = ({navigation, route}) => {
  // const {username} = route.params;
  return (
    <View style={styles.main_container}>
      <View style={styles.second_view}>
        {/* <View style={[styles.shadow]}> */}
        <Image
          source={require('./assests/username.png')}
          resizeMethod="auto"
          style={[styles.image, styles.circle]}
        />
        {/* <Username
          width={120}
          height={120}
          style={{
            marginBottom: 5,
            color: '#00BAB5',
          }}
        /> */}

        <Text style={styles.text}>
          {' '}
          {/* Hi: {username} */}
          Username
        </Text>

        <View
          style={{
            alignItems: 'center',
            top: 50,
          }}>
          <TouchableOpacity
            style={[globalStyles.new_container, styles.container]}>
            {/* onPress={onPressLearnMore} */}
            <MaterialIcons name="edit" color="white" size={25} />
            <Text style={styles.small_text}> Edit Profile </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[globalStyles.new_container, styles.container]}>
            {/* onPress={onPressLearnMore} */}
            <AntDesign name="earth" color="white" size={25} />
            <Text style={styles.small_text}> Language: English </Text>
          </TouchableOpacity>

          <TouchableOpacity
            {...testProps('sign-out-button')}
            onPress={() => navigation.navigate('Login')}
            style={[globalStyles.new_container, styles.container]}>
            <Feather
              name="log-out"
              color="white"
              size={25}
              style={{bottom: 0}}
            />
            <Text style={styles.small_text}> Sign Out </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 110,
    height: 110,
    borderRadius: 60,
    backgroundColor: 'green',
    shadowColor: 'green',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 3.5,
    // elevation: 5,
  },
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'black',
  },
  container: {
    width: 350,
    height: 50,
    margin: 5
  },
  image: {
    resizeMode: 'center',
    width: 50,
    height: 50,
  },
  overlay: {
    position: 'absolute',
    top: 120,
    left: 140,
  },
  text: {fontSize: 18, fontWeight: 'bold', color: 'white', marginRight: 10},
  small_text:{
    fontSize:14,
    color:'white',
    marginLeft: 10
  },
  border: {
    flexDirection: 'row',
    width: 350,
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#212121',
    backgroundColor: '#212121',
    margin: 5,
  },
  second_view: {top: 50, justifyContent: 'center', alignItems: 'center'},
});
