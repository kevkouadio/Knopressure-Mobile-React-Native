import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TipsScreen from './TipsScreen';
import ChartScreen from './ChartScreen';
import ProfileScreen from './ProfileScreen';
import { theme } from '../core/theme'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import Tables from '../components/Table';
import * as SecureStore from 'expo-secure-store';
import { getUserProfile, createBpData } from '../service';

const Tab = createBottomTabNavigator();

function HomeScreen({ navigation, userId }) {
  const [user, setUser] = useState({});
  const [diastolic, setDiastolic] = useState({});
  const [systolic, setSystolic] = useState({});

  useEffect(() => {
    getUserProfile(userId)
      .then((response) => {
        setUser(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);

  const createNewBpData = async () => {
    try {
      const bpData = {
        Systolic: systolic.value,
        Diastolic: diastolic.value,
        userID: user.id
      };
      const response = await createBpData(bpData);
      alert("BP data saved!");
      setSystolic({ value: '' });
      setDiastolic({ value: '' });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Header>
          Welcome {user.username}
        </Header>
        <Text>
          What are your numbers today? Let's find out if it is normal.
        </Text>
        <View style={styles.input}>
          <TextInput
            style={styles.inputSys}
            label="Systolic (Upper)"
            returnKeyType="next"
            value={systolic.value}
            onChangeText={(text) => setSystolic({ value: text, error: '' })}
            autoCapitalize="none"
            keyboardType="numeric"
          />

          <View>
            <Text style={styles.slash}>/</Text>
          </View>

          <TextInput
            label="Diastolic (Lower)"
            returnKeyType="done"
            value={diastolic.value}
            onChangeText={(text) => setDiastolic({ value: text, error: '' })}
            keyboardType="numeric"
          />
        </View>
        {/* <Tables />  */}
        <Text>Understanding Blood Pressure Readings</Text>
        <Tables />
        {/* <Image
          source={require('../assets/blood-pressure-readings-chart.jpg')}
          style={styles.image}
        /> */}

        <Button style={styles.Button} mode="contained" onPress={createNewBpData} disabled={!(systolic.value && diastolic)}>
          Submit your numbers
        </Button>
      </View>
    </>
  );
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
          headerShown: false
        }}
      />
      <Tab.Screen name="Chart" component={ChartScreen}
        options={{
          tabBarLabel: 'Chart',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-line" color={color} size={26} />
          ),
          headerShown: false,
          orientation: 'landscape'
        }}
      />
      <Tab.Screen name="Tips" component={TipsScreen}
        options={{
          tabBarLabel: 'Tips',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart-pulse" color={color} size={26} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
          headerShown: false
        }}
      />

    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'plum',
    alignItems: 'center',
    //justifyContent: 'center',
    //height:"100%",
  },
  LogoutButton: {
    backgroundColor: theme.colors.success,
    //marginTop:20,
    width: "25%"
  },
  Button: {
    backgroundColor: theme.colors.success
  },
  forgotPassword: {
    width: '90%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  input: {
    width: '47%',
    flexDirection: 'row',
    marginHorizontal: '10%',
    justifyContent: 'center',
    position: 'relative'
  },

  slash: {
    fontWeight: 'bold',
    fontSize: 70,
    margin: 'auto',
  },
  image: {
    width: 365,
    height: 240,
    marginBottom: 8,
  },
});