import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import axios from 'react-native-axios';

export default function SignupScreen({ navigation }) {
  const [fdata, setFdata] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (!fdata.name || !fdata.email || !fdata.password || !fdata.confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (fdata.password !== fdata.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      console.log(fdata);
      const response = await axios.post('http://192.168.4.153:3000/signup', fdata);
      
      if (response.data.error) {
        setError(response.data.error);
      } else {
        alert('Account created successfully');
        navigation.navigate('Success');
      }
    } catch (error) {
      setError('Error connecting to the server');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.inner}>
          <Text style={styles.header}>Signup</Text>
          <Text style={styles.emailtext}>Employee Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            onPressIn={() => setError(null)}
            onChangeText={(text) => setFdata({ ...fdata, name: text })}
          />
          <Text style={styles.emailtext}>Enter Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            onPressIn={() => setError(null)}
            onChangeText={(text) => setFdata({ ...fdata, email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.emailtext}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            onPressIn={() => setError(null)}
            onChangeText={(text) => setFdata({ ...fdata, password: text })}
            secureTextEntry
          />
          <Text style={styles.emailtext}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            onPressIn={() => setError(null)}
            onChangeText={(text) => setFdata({ ...fdata, confirmPassword: text })}
            secureTextEntry
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <Button title="Submit" color="#0f4c75" style={styles.submit} onPress={handleSignup} />
          <Text style={styles.already}>
            Already registered?&nbsp;
            <Text onPress={() => navigation.navigate('Login')}>Login</Text>
          </Text>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emailtext: {
    color: '#000',
    alignItems: 'flex-start',
    marginTop: 13,
  },
  inner: {
    flex: 1,
    padding: 24,
  },
  header: {
    fontSize: 24,
    marginBottom: 24,
    marginTop: 50,
  },
  input: {
    width: '100%',
    padding: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
  },
  submit: {
    marginTop: 40,
  },
  already: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 70,
  },
});