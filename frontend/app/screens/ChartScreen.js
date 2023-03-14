import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Dimensions, FlatList } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { getAllBPData } from '../service';
import { Table, Row } from 'react-native-table-component';

export default function ChartScreen() {
  const [bpData, setBpData] = useState([]);
  const [screenOrientation, setScreenOrientation] = useState('portrait');

  useLayoutEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get('screen');
      setScreenOrientation(width > height ? 'landscape' : 'portrait');
    };
    const updateOrientationListener = Dimensions.addEventListener('change', updateOrientation);
    updateOrientation();
    return () => updateOrientationListener.remove();
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getAllBPData()
      .then(data => setBpData(data))
      .catch(error => console.error(error));
  };

  const systolicData = bpData.map(data => data.Systolic);
  const diastolicData = bpData.map(data => data.Diastolic);

  if (screenOrientation === 'portrait') {
    
    return (
      <View style={styles.TableContainer}>
        <Text>Put your device in landscape mode to view your chart.</Text>
        <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
          <Row data={['Date', 'Systolic', 'Diastolic']} textStyle={styles.head}  />
          {bpData.map(data => (           
              <Row
                key={data._id}
                data={[
                  new Date(data.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                  }),
                  data.Systolic,
                  data.Diastolic
                ]}
                textStyle={styles.text}
              />
            ))}
        </Table>
      </View>
    );
  }

  if (bpData?.length === 0) {
    return (
      <View style={styles.screen}>
        <Text>No chart data to display!</Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={getData}>
      <View style={styles.container}>
        <LineChart
          data={{
            labels: Array.from({ length: bpData.length }, (_, i) => i),
            datasets: [
              {
                data: systolicData,
                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                strokeWidth: 2
              },
              {
                data: diastolicData,
                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                strokeWidth: 2
              }
            ]
          }}
          width={Dimensions.get('window').width - 20}
          height={220}
          yAxisLabel="BP (mm Hg)"
          chartConfig={{
            backgroundColor: 'plum',
            backgroundGradientFrom: 'plum',
            backgroundGradientTo: 'plum',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'plum',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dateText: {
    fontSize: 16,
  },
  systolicText: {
    fontSize: 16,
  },
  diastolicText: {
    fontSize: 16,
  },
  head: { height: 28, backgroundColor: '#f1f8ff', textAlign: 'center', fontSize:15},
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: { height: 28 },
  text: { textAlign: 'center' },
  TableContainer: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: 'plum' },
});
