import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './App/LoginScreen';
import SignupScreen from './App/SignupScreen';
// import SuccessScreen from './App/SuccessScreen';
import Verification from './App/Verification';
import Home from './InnerScreen/Home';
import Courses from './InnerScreen/Courses';
import Profile from './InnerScreen/Profile';
import Puzzles from './InnerScreen/Puzzles';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({color,size}) => {
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
      <Tab.Screen name="Puzzles" component={Puzzles} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Success" component={BottomTabNavigator} />
        <Stack.Screen name="Verification" component={Verification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
