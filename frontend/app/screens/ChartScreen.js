import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getAllBPData } from '../service';

export default function ChartScreen() {
  const [bpData, setBpData] = useState([]);

  useEffect(() => {
    getAllBPData()
      .then(data => setBpData(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      {bpData.map(data => (
        <Text key={data._id}>{data.Systolic} / {data.Diastolic}/{data.userID}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'plum',
      alignItems: 'center',
      justifyContent: 'center',
      
    }
  });