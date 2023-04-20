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

export const RegisterScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  // const [login, setLogin] = useState(false);
  function handleConfirmPasswordChange(text) {
    setConfirmPassword(text);
    setPasswordsMatch(text === password);
  }

  return (
    <SafeAreaView
      style={styles.backgroundStyle}
      testID="app-root"
      accessibilityLabel="app-root">
      <StatusBar barStyle="dark-content" />

      <View style={styles.inputContainer}>
        <TextInput
          {...testProps('username-textinput')}
          placeholder="Username..."
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
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          style={styles.inputText}
          onChangeText={setPassword}
          value={password}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          {...testProps('confirm-password-textinput')}
          secureTextEntry={true}
          placeholder="Confirm Password..."
          placeholderTextColor="#003f5c"
          style={styles.inputText}
          onChangeText={handleConfirmPasswordChange}
          // value={setConfirmPassword}
        />
      </View>
      {!passwordsMatch && (
        <Text style={{color: 'red', bottom: 20, right: 80}}>
          Wrong password!!!
        </Text>
      )}
      <Pressable
        style={styles.buttonContainer}
        {...testProps('signup-button')}
        onPress={() => {
          if (
            password === '' ||
            confirmPassword === '' ||
            username === '' ||
            !passwordsMatch
          ) {
            Alert.alert('Error', 'Please fill in the empty field', [
              {text: 'OK'},
            ]);
          } else {
            navigation.navigate('Login');
          }
        }}>
        <Text style={styles.textStyle}>Signup</Text>
      </Pressable>
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
});


