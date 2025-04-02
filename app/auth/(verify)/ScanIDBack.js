import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Image,
  Alert
} from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

export default function ScanIDBack({ route, navigation }) {
  const { frontImage } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current && isCameraReady) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
        });
        
        // Here you would typically upload both images to your server
        // For now, we'll just navigate back to the home screen
        navigation.navigate('VerificationHome', { 
          completedStep: 'idScan',
          frontImage,
          backImage: photo.uri
        });
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
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onCameraReady={() => setIsCameraReady(true)}
        ratio="16:9"
      >
        <View style={styles.overlay}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={28} color="white" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.contentContainer}>
            <Text style={styles.instructionText}>
              Put the back side of your national ID in the box, then take a picture
            </Text>
            
            <View style={styles.idFrame}>
              {/* ID card frame overlay */}
              {/*<Image 
                source={require('../assets/fingerprint.png')} 
                style={styles.fingerprintOverlay}
                defaultSource={require('../assets/fingerprint.png')}
              />*/}
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
      </Camera>
    </View>
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
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fingerprintOverlay: {
    width: 60,
    height: 60,
    position: 'absolute',
    right: 20,
    top: 20,
    opacity: 0.7,
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