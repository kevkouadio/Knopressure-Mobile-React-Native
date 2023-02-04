import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Linking, Image } from 'react-native';
import TipsItems from '../helpers/TipsItems.json';

export default function TipsScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={TipsItems}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Image source={{ uri: item.picture }} style={styles.cardImage} />
            <Text style={styles.cardText}>{item.body + '..'}</Text>
            <Text style={styles.cardLink} onPress={() => Linking.openURL(item.link)}>
              Read More
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'plum',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    height: 200,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10
  },
  card: {
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    elevation: 2,
    borderRadius: 10
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  cardText: {
    fontSize: 16,
    marginBottom: 10
  },
  cardLink: {
    color: 'blue',
    fontSize: 16
  }
});
