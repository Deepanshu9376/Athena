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
import React, { useEffect, useState } from "react";
import athena from "../assets/images/Athen_Logo.png";

// import { bwmessage, errormessage, formgroup, head1, head2, input, label, link, link2 } from '../common/formcss'

const Verification = ({ navigation, route }) => {
  const { userdata } = route.params;

  const [errormsg, setErrormsg] = useState(null);
  const [userCode, setUserCode] = useState("XXXX");
  const [actualCode, setActualCode] = useState(null);

  useEffect(() => {
    setActualCode(userdata[0]?.VerificationCode);
  }, []);

  const Sendtobackend = () => {
    // console.log(userCode);
    // console.log(actualCode);

    if (userCode == "XXXX" || userCode == "") {
      setErrormsg("Please enter the code");
      return;
    } else if (userCode == actualCode) {
      // console.log('correct code');
      const fdata = {
        email: userdata[0]?.email,
        password: userdata[0]?.password,
        name: userdata[0]?.name,
      };

      fetch("http://10.50.0.124:4000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fdata),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.message === "User Registered Successfully") {
            alert(data.message);
            navigation.navigate("Login");
          } else {
            alert("Something went wrong !! Try Signing Up Again");
          }
        });
    } else if (userCode != actualCode) {
      setErrormsg("Incorrect code");
      return;
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
            <Text style={styles.verify}>Verification Code</Text>
            <Text style={styles.emailtext}>
              A Code has been sent to you on your email
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setUserCode(text)}
              placeholder="Enter 6 digit verification code"
              onPressIn={() => setErrormsg(null)}
            />
            {errormsg ? (
                <Text style={styles.errorText}>{errormsg}</Text>
              ) : null}
          </View>
          <View style={styles.forgot}>
            <Text style={styles.button} onPress={() => Sendtobackend()}>
              Verify
            </Text>
            <Text style={styles.errorInput}>
              Don't have an account?&nbsp;
              <Text style={styles.forgottext} onPress={() => navigation.navigate("Signup")}>
                Create a new account
              </Text>
            </Text>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Verification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    alignItems: "center",
  },
  verify:{
    alignItems:'center',
    paddingStart: 20,
    fontSize: 30,
    color: '#000'
  },
  button:{
    backgroundColor: '#0f4c75',
    color: '#fff',
    padding: 4,
    marginEnd: 70,
    borderRadius: 5,
    fontSize: 18,
    minWidth: 150,
    textAlign: 'center',
    margin: 10,
    alignItems:'center'
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginTop: 10,
    marginTop: 24
  },
  input: {
    height: 40,
    width: 270,
    borderWidth: 1,
    marginTop: 30,
    padding: 10,
    alignItems: "flex-start",
    borderRadius: 10,
  },
  errorInput: {
    borderColor: "red",
    marginTop: 30,
  },
  emailtext: {
    color: "#000",
    alignItems: "flex-start",
    marginTop: 23,
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
  errorText: {
    color: "red",
    fontSize: 12,
  },
});
