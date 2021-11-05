import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

export default function LandingScreen({navigation}) {
  return (
    
    <View style={styles.container}>
        <View style={styles.wrapper}>
            <View style={styles.row}>  
                <Text style={styles.title}>KnoPressure</Text>
                
                <Image style={styles.Imgif} source={{uri:"https://i.pinimg.com/originals/b3/70/5c/b3705cc2edf8f527789e6e2be29f6267.gif"}}/>
            </View> 
            <View style={styles.row}>  
                <Text>Hypertension is as dangerous than ever! Known as the "silent killer", you can be considered overall healthy and then have a massive heart attack or stroke in the blink of an eye without any warning.
                      However, there are ways to lower your risk and avoid this! If your blood pressure is too high, it puts extra strain on your blood vessels, heart and other organs, such as the brain, kidneys and eyes. 
                      Persistent high blood pressure can increase your risk of a number of serious and potentially life-threatening health conditions, such as:</Text>
                <Text style={styles.thirdText}> heart disease. heart attacks !!!! Let's get heart healthy! </Text>
                {/* <Image style={styles.Imgif} source={{uri:"https://i.pinimg.com/originals/b3/70/5c/b3705cc2edf8f527789e6e2be29f6267.gif"}}/> */}
            </View> 
            <View>
                <Text style={styles.row}>Use our app to track your Blood Pressure.</Text>
            </View>
            <Button title="Login" onPress={() =>navigation.navigate('Login', { name: 'Login' })} />
            <Button title="SignUp"onPress={() =>navigation.navigate('SignUp', { name: 'SignUp' })}/>
            <Button title="Home"onPress={() =>navigation.navigate('Home', { name: 'Home' })}/>
        <StatusBar style="auto" />
        </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'plum',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Imgif: {
      width:250,
      height:100,
      alignSelf:"center"
  },
  row: {
    padding:20,
    alignContent:"center", 
    justifyContent: 'center',
    textAlign: 'center',
  },
  title: {
      color: 'white',
      fontSize: 30,
      fontWeight: "bold",
      backgroundColor: 'blueviolet',
      marginBottom:20,
      textAlign: 'center',
  },
  thirdText: {
    color: "#ff1493",
    fontSize:22,
  },
  wrapper: {
      borderColor: 'grey',
      borderWidth: 5, 
  }
});
