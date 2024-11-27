import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TextInput, Pressable, Image, ScrollView, View, Text, Alert, PermissionsAndroid } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

export default function TabOneScreen() {
  const [mineralType, setMineralType] = useState(''); // Mineral tipini tutmak için state
  const [hasPermission, setHasPermission] = useState<boolean | null>(null); // Kamera iznini tutmak için state
  const [cameraActive, setCameraActive] = useState(false); // Kamera aktiflik durumu
  const cameraRef = useRef<Camera | null>(null); // Kamera referansı
  const devices = useCameraDevices();
  const device = devices.find((d) => d.position === 'back');
  // Kamera iznini kontrol etme
  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'We need access to your camera to take photos',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } catch (err) {
        console.warn(err);
        setHasPermission(false);
      }
    };
    requestCameraPermission();
  }, []);

  // Kamera hazır mı?
  if (hasPermission === null) {
    return <Text>Permission is loading...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  // Fotoğraf çekme işlemi
  const handleTakePhoto = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePhoto({
        flash: 'auto', // Flash ayarı
      });
      Alert.alert('Fotoğraf Çekildi', `Fotoğraf yolu: ${photo.path}`);
      console.log('Fotoğraf:', photo);
    } catch (error) {
      Alert.alert('Hata', 'Fotoğraf çekilemedi.');
      console.error('Fotoğraf çekme hatası:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Image Section */}
      <Image
        source={require('../../assets/images/myimages/mainimage.webp')}
        style={styles.image}
      />

      <Text style={styles.title}>Discover Minerals</Text>

      {/* Separator */}
      <View style={styles.separator} />

      {/* Mineral Type Selection */}
      <View style={styles.mineralSelector}>
        <Text style={styles.label}>Select Mineral Type</Text>
        <TextInput
          value={mineralType}
          onChangeText={(text) => setMineralType(text)}
          placeholder="Enter mineral type"
          style={styles.input}
        />
      </View>

      {/* Camera Preview */}
      {device && (
        <View style={styles.cameraContainer}>
          <Camera
            ref={cameraRef}
            style={styles.camera}
            device={device}
            isActive={cameraActive}
            photo={true}
          />
          <Pressable style={styles.captureButton} onPress={handleTakePhoto}>
            <Text style={styles.buttonText}>Take a Photo</Text>
          </Pressable>
        </View>
      )}

      {/* Upload and Add Photo Buttons */}
      <Pressable
        style={styles.uploadButton}
        onPress={() => Alert.alert('Upload Photo', 'Upload functionality not implemented')}
      >
        <Text style={styles.buttonText}>Upload Photo</Text>
      </Pressable>

      <Pressable
        style={styles.addButton}
        onPress={() => Alert.alert('Add Photo', 'Add functionality not implemented')}
      >
        <Text style={styles.buttonText}>Add Photo</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2F4F4F',
    marginBottom: 20,
    textAlign: 'center',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#DDD',
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
    backgroundColor: '#A0D6B4',
    borderWidth: 2,
    borderColor: '#8CCFBA',
  },
  addButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#FF6F61',
    borderWidth: 2,
    borderColor: '#FF8DAA',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 16,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  mineralSelector: {
    width: '100%',
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  cameraContainer: {
    width: '100%',
    height: 300,
    marginVertical: 20,
    position: 'relative',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  captureButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#FF6F61',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
