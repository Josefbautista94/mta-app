import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const handlePress = () => Alert.alert('Button Pressed', 'You pressed the button!');


  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.headerText}>MTA App</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Look At The Map</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Look At Your Current Schedules </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Add  More Train Schedules </Text>
      </TouchableOpacity>
   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: 'rgb(40, 95, 165)',
    marginTop: 80,
    marginBottom: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',


  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  button: {
    marginTop: 30,
    backgroundColor: 'rgb(40, 95, 165)',
    paddingVertical: 10, // Make sure this vertical padding is enough
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',

  },
 buttonText: {
  color: '#fff',
  fontWeight: 'bold',

  fontSize: 18,
  textAlign: 'center', // Add this line to ensure text is centered horizontally
},
});
