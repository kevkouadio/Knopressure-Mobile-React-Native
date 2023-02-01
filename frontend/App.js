import React , { useEffect } from 'react';
import LandingScreen from './app/screens/LandingScreen';
import LoginScreen from './app/screens/LoginScreen';
import SignUpScreen from './app/screens/SignUpScreen';
import HomeTabs from './app/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const App = () => {
  

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App