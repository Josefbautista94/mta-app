import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert,TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const handlePress = () => Alert.alert('Button Pressed', 'You pressed the button!');

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Search for:', searchQuery);
    // Here you would typically make an API call with the search query
  };
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.headerText}>MTA App</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Go</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Look At Your Current Schedules </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Look At The Map</Text>
      </TouchableOpacity>
    
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}> Trains With Isues </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Add Train Schedules </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Remove Train Schedules </Text>
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
searchContainer: {
  flexDirection: 'row',
  paddingTop: 10,
  paddingHorizontal: 10,
  paddingBottom: 10,
  backgroundColor: 'rgb(40, 95, 165)', // or another color that fits your design
},
searchInput: {
  flex: 1,
  height: 40,
  backgroundColor: '#fff',
  paddingHorizontal: 10,
  borderRadius: 5,
},
searchButton: {
  backgroundColor: '#fff',
  borderRadius: 5,
  marginLeft: 10,
  alignItems: 'center',
  justifyContent: 'center',
  padding: 10,
},
searchButtonText: {
  color: 'rgb(40, 95, 165)',
  fontSize: 16,
  fontWeight: 'bold',

},

});
