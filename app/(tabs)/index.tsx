import { 
  StyleSheet,
  TextInput,   // Text input field
  Pressable,    // Button
  Image,        // Image
  ScrollView,   // To scroll the content
} from 'react-native';

import React, { useState } from 'react';
import { 
  Text,
  View 
} from '@/components/Themed';

export default function TabOneScreen() {
  // State to hold the selected mineral type
  const [mineralType, setMineralType] = useState(''); // Initially empty

  // Handling change in mineral type input
  const handleMineralTypeChange = (text: string) => {
    setMineralType(text); // This will update the state whenever the user types
  };

  return (
    <ScrollView style={styles.container}>
      {/* Image Section */}
      <Image 
        source={require('../../assets/images/myimages/mainimage.webp')}
        style={styles.image}
      />
      
      <Text style={styles.title}>Discover Minerals</Text>

      {/* Separator */}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {/* Mineral Type Selection */}
      <View style={styles.mineralSelector}>
        <Text style={styles.label}>Select Mineral Type</Text>
        <TextInput 
          value={mineralType} // Bound to the state
          onChangeText={handleMineralTypeChange} // Called when text changes
          placeholder="Enter mineral type"
          style={styles.input}
        />
      </View>

      {/* Upload Photo Button */}
      <Pressable style={({ pressed }) => [ 
        { backgroundColor: pressed ? "#B5EAD7" : "#A0D6B4" },
        styles.uploadButton
      ]}>
        <Text style={styles.buttonText}>Upload Photo</Text>
      </Pressable>

      {/* Add Photo Button */}
      <Pressable style={({ pressed }) => [ 
        { backgroundColor: pressed ? '#FF6F61' : '#FF6F61' },
        styles.addButton
      ]}>
        <Text style={styles.buttonText}>Add Photo</Text>
      </Pressable>

      {/* Mineral Property Selection */}
      <View style={styles.propertySelector}>
        <Text style={styles.label}>Select Mineral Properties</Text>
        {/* Additional options for selecting properties can be added here */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2', //  rengini arka plan olarak ekledim
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,  // Larger font size for main title
    fontWeight: 'bold',
    color: '#2F4F4F',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Georgia', // Elegant serif font for the title
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
    backgroundColor: '#ddd',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
  },
  uploadButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#A0D6B4',
  },
  addButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#FF8DAA',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16, // Slightly larger font size for readability
    fontFamily: 'Helvetica Neue', // Clean and modern sans-serif font
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontFamily: 'Arial', // Clean sans-serif font for input
  },
  mineralSelector: {
    width: '100%',
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    fontFamily: 'Arial', // Sans-serif font for labels
  },
  propertySelector: {
    width: '100%',
    marginVertical: 20,
  },
});
