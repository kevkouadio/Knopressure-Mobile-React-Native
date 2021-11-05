import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TipsScreen from './TipsScreen';
import ChartScreen from './ChartScreen';


const Tab = createBottomTabNavigator();

function HomeScreen() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text> This is my Home screen </Text>
        </View>
    )
}

export default function HomeTabs() {
    return (
      <Tab.Navigator 
        initialRouteName="Home"
        activeColor="#e91e63"
        barStyle={{ backgroundColor: 'tomato' }}
      >
        <Tab.Screen name="Home" component={HomeScreen} 
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen name="Chart" component={ChartScreen} 
             options={{
                tabBarLabel: 'chart',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="chart-line" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen name="Tips" component={TipsScreen} 
             options={{
                tabBarLabel: 'tips',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="heart-pulse" color={color} size={26} />
                ),
            }}
        />
      </Tab.Navigator>
    );
  }

