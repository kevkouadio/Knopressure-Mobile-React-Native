import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ChartScreen() {
    return (
        <View style={styles.container}>
        <Text> This is my chart screen </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'plum',
      alignItems: 'center',
      justifyContent: 'center',
      
    }
  });