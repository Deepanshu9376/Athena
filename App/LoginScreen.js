import React, { useState, useContext } from "react";
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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import athena from "../assets/images/Athen_Logo.png";
import axios from 'react-native-axios';
import { UserContext } from '../Context/authContext';  // Import the UserContext
import {BASE_URL} from '@env';

export default function LoginScreen() {
  const navigation = useNavigation();
  const { setUser } = useContext(UserContext);  // Use context to set the user email
  const [fdata, setFdata] = useState({
    email: "",
    password: "",
  });

  const [errormsg, setErrormsg] = useState(null);

  const handleLogin = async () => {
    if (fdata.email === "" || fdata.password === "") {
      setErrormsg("All fields are required");
      return;
    }

    try {
      console.log(fdata);
      const response = await axios.post(`${BASE_URL}:4000/signin`, fdata);
      if (response.data.token) {
        // Update the context with the user's email
        setUser({ email: fdata.email });

        // Navigate to the AppStack and pass the email as well
        navigation.navigate('AppStack', { email: fdata.email });
      } else {
        setErrormsg('Invalid login response');
      }
    } catch (error) {
      setErrormsg('Error connecting to the server');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.inner}>
          <View>
            <Image source={athena} style={styles.image}></Image>
          </View>
          <View>
            <Text style={styles.emailtext}>Email</Text>
            <TextInput
              style={styles.input}
              value={fdata.email}
              onChangeText={(text) => setFdata({ ...fdata, email: text })}
              placeholder="Enter Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errormsg ? <Text style={styles.errorText}>{errormsg}</Text> : null}
          </View>
          <View>
            <Text style={styles.emailtext}>Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setFdata({ ...fdata, password: text })}
              placeholder="Enter Password"
              secureTextEntry
            />
            {errormsg ? <Text style={styles.errorText}>{errormsg}</Text> : null}
          </View>
          <View style={styles.forgot}>
            <TouchableOpacity>
              <Text style={styles.forgottext} onPress={() => navigation.navigate("Signup")}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signin}>
            <Button title="Sign in" color="#0f4c75" onPress={handleLogin}></Button>
          </View>
          <View style={styles.logingem}>
            <Button
              title="Signup with Gemini Id"
              color="#3e885b"
              onPress={() => navigation.navigate("Signup")}
            ></Button>
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
    alignItems: "center",
    padding: 24,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginTop: 20,
  },
  input: {
    height: 40,
    width: 250,
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    alignItems: "flex-start",
    borderRadius: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  emailtext: {
    color: "#000",
    alignItems: "flex-start",
    marginTop: 13,
  },
  forgot: {
    marginTop: 20,
    alignItems: "flex-end",
  },
  forgottext: {
    color: "#0f4c75",
    alignItems: "flex-end",
    marginStart: 140,
  },
  signin: {
    marginTop: 30,
    width: 250,
  },
  logingem: {
    color: "green",
    marginTop: 30,
    width: 250,
  },
});
