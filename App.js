import 'react-native-gesture-handler';
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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
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
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Courses" component={Courses} />
      {/* <Tab.Screen name="Puzzles" component={Puzzles} /> */}
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

function CustomNavigationBar() {
  const navigation=useNavigation();
  const [menuVisible, setMenuVisible] = React.useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <View>
      <StatusBar barStyle="light-content" backgroundColor="#0f4c75" />
      <Appbar.Header style={styles.appbarHeader}>
        <View style={styles.logoContainer}>
          <Image source={athena} style={styles.logo} />
          {/* <Appbar.Content title="Athena" titleStyle={{ color: '#fff' }} /> */}
        </View>
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon="dots-vertical" color="#fff" onPress={openMenu} />
          }
        >
          <Menu.Item onPress={() => {}} title="Name" />
          <Divider />
          <Menu.Item onPress={() => {navigation.navigate("Login")}} title="Logout" />
        </Menu>
      </Appbar.Header>
    </View>
  );
}

function AppStack() {
  return (
    <View style={{ flex: 1 }}>
      <CustomNavigationBar />
      <Stack.Navigator initialRouteName="Success" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Success" component={BottomTabNavigator} />
        <Stack.Screen name="Verification" component={Verification} />
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
          <Stack.Screen name="Verficiation" component={Verification} />
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
