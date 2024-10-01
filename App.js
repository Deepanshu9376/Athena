import "react-native-gesture-handler";
import { Text, TouchableOpacity } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Provider as PaperProvider,
  Appbar,
  Menu,
  Divider,
} from "react-native-paper";
import { View, Image, StyleSheet, StatusBar } from "react-native";
import LoginScreen from "./App/LoginScreen";
import SignupScreen from "./App/SignupScreen";
import Verification from "./App/Verification";
import Home from "./Screen/Home";
import Courses from "./Screen/Courses";
import Profile from "./Screen/Profile";
import Test from "./Screen/Test";
import Icon from "react-native-vector-icons/Ionicons";
import athena from "./assets/images/h.png";
import { useNavigation } from "@react-navigation/native";
import VideoPlayerScreen from "./Screen/VideoPlayerScreen";
import CourseDetails from "./Screen/CourseDetails";
import Summary from "./Screen/Summary";
import axios from "react-native-axios";
import { UserProvider } from "./Context/authContext";
import { UserContext } from "./Context/authContext";
import TestScreen from "./Screen/TestScreen";
import ResultScreen from "./Screen/ResultScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator({ enrolledCourses, setEnrolledCourses }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = "home-outline";
              break;
            case "Courses":
              iconName = "earth-outline";
              break;
            case "Test":
              iconName = "book-outline";
              break;
            case "Profile":
              iconName = "person-outline";
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#bbbbbb",
        tabBarStyle: { backgroundColor: "#0f4c75" },
      })}
    >
      <Tab.Screen
        name="Home"
        children={() => <Home enrolledCourses={enrolledCourses} />}
      />
      <Tab.Screen
        name="Courses"
        children={() => (
          <Courses
            enrolledCourses={enrolledCourses}
            setEnrolledCourses={setEnrolledCourses}
          />
        )}
      />
      <Tab.Screen name="Test" component={Test} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

function CustomNavigationBar({ email }) {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = React.useState(true);
  const [userData, setUserData] = useState({ username: "" });

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("Attempting to fetch user data...");
        const response = await fetch(`http://10.50.1.14:4000/get-username`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user.email }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Fetched user data:", result);

        setUserData({ username: result.username });
      } catch (error) {
        setError(error.message);
        // console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View>
      <StatusBar barStyle="light-content" backgroundColor="#0f4c75" />
      <Appbar.Header style={styles.appbarHeader}>
        <TouchableOpacity>
          <View style={styles.logoContainer}>
            <Image
              source={athena}
              style={styles.logo}
              onPress={() => {
                navigation.navigate("Home");
              }}
            />
          </View>
        </TouchableOpacity>
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              color="#fff"
              onPress={openMenu}
            />
          }
        >
          <Menu.Item
            onPress={() => {}}
            title={<Text>{userData.username || "Loading..."}</Text>}
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              navigation.navigate("Login");
            }}
            title={<Text>Logout</Text>}
          />
        </Menu>
      </Appbar.Header>
    </View>
  );
}

function AppStack({ route }) {
  const { email } = route.params;
  const [enrolledCourses, setEnrolledCourses] = React.useState([]);

  return (
    <View style={{ flex: 1 }}>
      <CustomNavigationBar email={email} />
      <Stack.Navigator
        initialRouteName="Success"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Success">
          {() => (
            <BottomTabNavigator
              enrolledCourses={enrolledCourses}
              setEnrolledCourses={setEnrolledCourses}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="VideoPlayerScreen" component={VideoPlayerScreen} />
        <Stack.Screen name="CourseDetail" component={CourseDetails} />
        <Stack.Screen name="Summary" component={Summary} />
        <Stack.Screen name="TestScreen" component={TestScreen} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} />
      </Stack.Navigator>
    </View>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Verification" component={Verification} />
            <Stack.Screen name="AppStack" component={AppStack} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  appbarHeader: {
    backgroundColor: "#0f4c75",
    marginTop: StatusBar.currentHeight ? 2 : 0,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 140,
    height: 80,
    marginRight: 150,
    resizeMode: "contain",
  },
});
