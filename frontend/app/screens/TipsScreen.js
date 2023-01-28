import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TipsScreen() {
    return (
        <View style={styles.container}>
        <Text> This is my tips screen </Text>
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