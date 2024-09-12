import 'react-native-gesture-handler';
import { Text } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider, Appbar, Menu, Divider } from 'react-native-paper';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import LoginScreen from './App/LoginScreen';
import SignupScreen from './App/SignupScreen';
import Verification from './App/Verification';
import Home from './InnerScreen/Home';
import Courses from './InnerScreen/Courses';
import Profile from './InnerScreen/Profile';
import Puzzles from './InnerScreen/Puzzles';
import Icon from 'react-native-vector-icons/Ionicons';
import athena from "./assets/images/h.png";
import { useNavigation } from '@react-navigation/native';
import VideoPlayerScreen from './InnerScreen/VideoPlayerScreen';
import CourseDetails from './InnerScreen/CourseDetails';
import axios from 'react-native-axios';

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
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Courses':
              iconName = 'book-outline';
              break;
            case 'Puzzles':
              iconName = 'book-outline';
              break;
            case 'Profile':
              iconName = 'person-outline';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#bbbbbb',
        tabBarStyle: { backgroundColor: '#0f4c75' },
      })}
    >
      <Tab.Screen name="Home" children={() => <Home enrolledCourses={enrolledCourses} />} />
      <Tab.Screen name="Courses" children={() => <Courses enrolledCourses={enrolledCourses} setEnrolledCourses={setEnrolledCourses} />} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

function CustomNavigationBar({ email }) {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [userName, setUserName] = React.useState("");

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const fetchUserData = async () => {
    try {
      if (email) {
        const response = await axios.get(`http://localhost:4000/get-username/${email}`);
        const userData = response.data;
        setUserName(userData.name);
        console.log(userData.name);
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  React.useEffect(() => {
    fetchUserData();
  }, [email]);

  return (
    <View>
      <StatusBar barStyle="light-content" backgroundColor="#0f4c75" />
      <Appbar.Header style={styles.appbarHeader}>
        <View style={styles.logoContainer}>
          <Image source={athena} style={styles.logo} />
        </View>
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon="dots-vertical" color="#fff" onPress={openMenu} />
          }
        >
          {/* <Menu.Item onPress={() => {}} title={<Text>{userName}</Text>} /> */}
          <Divider />
          <Menu.Item onPress={() => { navigation.navigate('Login') }} title={<Text>Logout</Text>} />
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
      <Stack.Navigator initialRouteName="Success" screenOptions={{ headerShown: false }}>
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
      </Stack.Navigator>
    </View>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Verification" component={Verification} />
          <Stack.Screen name="AppStack" component={AppStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  appbarHeader: {
    backgroundColor: '#0f4c75',
    marginTop: StatusBar.currentHeight ? 2:0,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 80,
    marginRight: 150,
    resizeMode: 'contain',
  },
});
