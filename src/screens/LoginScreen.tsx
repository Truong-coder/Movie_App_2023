/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';

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

export const LoginScreen = ({navigation, route}) => {
  // const {username} = route.params;
  const [username, setUsername] = useState('username');
  const [password, setPassword] = useState('password');

  // const [login, setLogin] = useState(false);

  return (
    <SafeAreaView
      style={styles.backgroundStyle}
      testID="app-root"
      accessibilityLabel="app-root">
      <StatusBar barStyle="dark-content" />

      <View style={styles.inputContainer}>
        <TextInput
          {...testProps('username-textinput')}
          placeholder={username}
          placeholderTextColor="#003f5c"
          style={styles.inputText}
          onChangeText={setUsername}
          value={username}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          {...testProps('password-textinput')}
          secureTextEntry={true}
          placeholder={password}
          placeholderTextColor="#003f5c"
          style={styles.inputText}
          onChangeText={setPassword}
          value={password}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>

      <Pressable
        style={styles.buttonContainer}
        {...testProps('login-button')}
        onPress={() => {
          if (password === '') {
            Alert.alert('Empty Password', 'Please Enter your password', [
              {text: 'OK'},
            ]);
          } else {
            // navigation.navigate('Profile', {username});
            navigation.navigate('MoviesStack', {username});
            // navigation.navigate('Profile', {username});
          }
        }}>
        <Text style={styles.textStyle}>Login</Text>
      </Pressable>

      <TouchableOpacity
        {...testProps('signup-button')}
        onPress={() => navigation.navigate('Register')}>
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 20,
    color: 'white',
  },
  loginStatus: {
    fontSize: 30,
    color: '#003f5c',
  },
  inputContainer: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  buttonContainer: {
    width: '80%',
    backgroundColor: '#3CB371',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  loginText: {
    color: 'white',
  },
});

