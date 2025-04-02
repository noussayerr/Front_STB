import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Alert,
  SafeAreaView
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

export default function ScanIDFront({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    (async () => {
      const { status } = await requestPermission();
      setHasPermission(status === 'granted');
      if (status !== 'granted') {
        Alert.alert(
          'Camera Permission',
          'Camera permission is required to scan your ID',
          [{ text: 'OK' }]
        );
      }
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current && isCameraReady) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
        });
        // Navigate to back side scanning after capturing front
        navigation.navigate('ScanIDBack', { frontImage: photo.uri });
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('Error', 'Failed to capture image');
      }
    }
  };

  if (hasPermission === null) {
    return <View style={styles.container}><Text style={styles.text}>Requesting camera permission...</Text></View>;
  }
  
  if (hasPermission === false) {
    return <View style={styles.container}><Text style={styles.text}>No access to camera</Text></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back" // Ensure this is correct
        onCameraReady={() => setIsCameraReady(true)}
      >
        <View style={styles.overlay}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={28} color="white" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.contentContainer}>
            <Text style={styles.instructionText}>
              Put the front side of your national ID in the box, then take a picture
            </Text>
            
            <View style={styles.idFrame}>
              {/* ID card frame overlay */}
            </View>
            
            <TouchableOpacity 
              style={styles.captureButton}
              onPress={takePicture}
              disabled={!isCameraReady}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  header: {
    padding: 16,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 40,
  },
  instructionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 20,
  },
  idFrame: {
    width: '80%',
    height: 220,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 8,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});