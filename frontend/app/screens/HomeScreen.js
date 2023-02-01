import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TipsScreen from './TipsScreen';
import ChartScreen from './ChartScreen';
import { theme } from '../core/theme'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import Tables from '../components/Table';
import * as SecureStore from 'expo-secure-store';
import { getUserProfile } from '../service';

const Tab = createBottomTabNavigator();

function HomeScreen({ navigation, userId }) {
  const [user, setUser] = useState({});
  const [diastolic, setDiastolic] = useState({});
  const [systolic, setSystolic] = useState({});

  useEffect(() => {
    getUserProfile(userId)
      .then((response) => {
        setUser(response);
        //console.log(response);
        //setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        // console.error(error.response.status);
        // console.error(error.response.data);
      });
  }, [userId]);

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('token');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Landing' }],
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Button title="Home" style={styles.LogoutButton} onPress={logout}>
          logout
        </Button>
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
            // error={!!email.error}
            // errorText={email.error}
            autoCapitalize="none"
            // autoCompleteType="email"
            // textContentType="emailAddress"
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
            // error={!!password.error}
            // errorText={password.error}
            // secureTextEntry
            keyboardType="numeric"
          />
        </View>
        {/* <Tables />  */}
        <Text>Understanding Blood Pressure Readings</Text>
        <Image
          source={require('../assets/blood-pressure-readings-chart.jpg')}
          style={styles.image}
        />

        <Button style={styles.Button} mode="contained" disabled={!(systolic.value && diastolic)}>
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
      <Tab.Screen name="Profile" component={HomeScreen}
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
          headerShown: false
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
    fontSize: '70',
    margin: 'auto',
  },
  image: {
    width: 365,
    height: 240,
    marginBottom: 8,
  },
});