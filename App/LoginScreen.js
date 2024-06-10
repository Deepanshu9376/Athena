import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import athena from '../assets/images/Athen_Logo.png'

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = () => {
    let valid = true;

    if (!email || !validateEmail(email)) {
      setEmailError('Please enter a valid email.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Please enter a password.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      console.log('Email:', email);
      console.log('Password:', password);
      navigation.navigate('Success');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.inner}>
          <View>
            <Image source={athena} style={styles.image}></Image>
          </View>
          <View>
            <Text style={styles.emailtext}>Email*</Text>
            <TextInput
              style={[styles.input, emailError ? styles.errorInput : null]}
              onChangeText={setEmail}
              placeholder="Enter Email"
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          </View>
          <View>
            <Text style={styles.emailtext}>Password*</Text>
            <TextInput
              style={[styles.input, passwordError ? styles.errorInput : null]}
              onChangeText={setPassword}
              placeholder="Enter Password"
              value={password}
              secureTextEntry
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          </View>
          <View style={styles.forgot}>
            <TouchableOpacity>
              <Text style={styles.forgottext}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signin}>
            <Button title="Sign in" color='#0f4c75' onPress={handleLogin}></Button>
          </View>
          <View style={styles.logingem}>
            <Button title="Login with Gemini Id" color='#3e885b' onPress={() => navigation.navigate('Signup')}></Button>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginTop: 20,
  },
  input: {
    height: 40,
    width: 250,
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    alignItems: 'flex-start',
    borderRadius: 10,
  },
  errorInput: {
    borderColor: 'red',
  },
  emailtext: {
    color: '#808080',
    alignItems: 'flex-start',
    marginTop: 13,
  },
  forgot: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  forgottext: {
    color: '#0f4c75',
    alignItems: 'flex-end',
    marginStart: 140,
  },
  signin: {
    marginTop: 30,
    width: 250,
  },
  logingem: {
    color: 'green',
    marginTop: 30,
    width: 250,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});
