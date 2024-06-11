import React from "react";
import { View, Text, StyleSheet, Button,TouchableOpacity } from "react-native";


export default function SuccessScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <Text style={styles.text}>Login Successful!</Text>
        <Button title="Go back" onPress={() => navigation.navigate("Login")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  taskbar: {
    height: 60,
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e1e1e1",
    backgroundColor: "#0f4c75",
  },
  taskbarButton: {
    fontSize: 18,
    color:'#fff'
  },
});
