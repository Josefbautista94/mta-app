import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import protobuf from "protobufjs";
import GtfsRealtimeBindings from "gtfs-realtime-bindings";
import { FeedMessage } from "gtfs-realtime-bindings";
import { MTA_API_KEY } from "@env"; // Ensure you have installed and configured react-native-dotenv
import { ScrollView } from "react-native";

const API_ENDPOINT = `https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace`;
const formatTripId = (tripId) => {
  const parts = tripId.split(/[_\.]+/);
  // Assuming the format is Time_Line_Direction
  const timePart = parts[0];
  const linePart = parts[1];
  const directionPart = parts[2];

  const time = `${timePart.substring(0, 2)}:${timePart.substring(2, 4)}`;
  const timeFormatted = new Date(`1970-01-01T${time}:00Z`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  const directionMap = { 'N': 'Northbound', 'S': 'Southbound' };
  const directionFormatted = directionMap[directionPart] || directionPart;

  return `${timeFormatted} - Line ${linePart} ${directionFormatted}`;
};

export default function App() {
  const handlePress = () =>
    Alert.alert("Button Pressed", "You pressed the button!");

  const [searchQuery, setSearchQuery] = useState("");
  const [realTimeData, setRealTimeData] = useState<FeedMessage | null>(null);

  const handleSearch = () => {
    console.log("Search for:", searchQuery);
    // Here you would typically make an API call with the search query
  };
  const fetchRealTimeData = () => {
    // Replace '<FEED_URI>' with the actual feed URI and '<Api Key>' with your actual API key
    axios
      .get(API_ENDPOINT, {
        responseType: "arraybuffer",
        headers: { "x-api-key": MTA_API_KEY }, // Now using the environment variable
      })
      .then((response) => {
        // Decode the response with the GTFS bindings
        const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
          new Uint8Array(response.data)
        );
        setRealTimeData(feed); // Update the state with the new data
      })
      .catch((error) => {
        console.error("Error fetching MTA data:", error);
        setRealTimeData(null); // Reset the state if there's an error
      });
  };
  const renderRealTimeData = () => {
    if (realTimeData && realTimeData.entity) {
      return realTimeData.entity
        .slice(0, 6)
        .map((entity, index) => {
          if (entity.tripUpdate && entity.tripUpdate.trip) {
            const formattedId = formatTripId(entity.tripUpdate.trip.tripId);
            return (
              <View key={index} style={styles.dataItem}>
                <Text style={styles.dataText}>
                  {`Trip ID: ${formattedId}`}
                </Text>
              </View>
            );
          }
          return null;
        })
        .filter((component) => component !== null);
    }
    return <Text>No data available.</Text>;
  };


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.headerText}>MTA App</Text>
      </View>
      <View style={styles.realTimeDataContainer}>
        {realTimeData ? (
          <ScrollView>{renderRealTimeData()}</ScrollView>
        ) : (
          <Text>Loading or no data...</Text>
        )}
      </View>

      {/* <TouchableOpacity style={styles.button} onPress={handlePress}>
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
      </TouchableOpacity> */}
      {/* <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Remove Train Schedules </Text>
      </TouchableOpacity> */}
      
      <TouchableOpacity style={styles.button} onPress={fetchRealTimeData}>
        <Text style={styles.buttonText}>Fetch Real Time Data</Text>
      </TouchableOpacity>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "rgb(40, 95, 165)",
    marginTop: 50,
    marginBottom: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },

  button: {
    marginTop: 30,

    backgroundColor: "rgb(40, 95, 165)",
    paddingVertical: 10, // Make sure this vertical padding is enough
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",

    fontSize: 18,
    textAlign: "center", // Add this line to ensure text is centered horizontally
  },
  searchContainer: {
    flexDirection: "row",
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: "rgb(40, 95, 165)", // or another color that fits your design
    marginTop: 40,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  searchButton: {
    backgroundColor: "#fff",
    borderRadius: 5,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  searchButtonText: {
    color: "rgb(40, 95, 165)",
    fontSize: 16,
    fontWeight: "bold",
  },

  realTimeDataContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0", // choose an appropriate background color
  },
  dataItem: {
    // styling for each data item
    marginBottom: 5,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  dataText: {
    // styling for the text of each data item
    fontSize: 16,
  },
});
