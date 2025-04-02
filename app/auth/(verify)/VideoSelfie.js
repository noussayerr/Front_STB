import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Alert,
  SafeAreaView
} from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

export default function VideoSelfie({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0);
  const cameraRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const audioStatus = await Audio.requestPermissionsAsync();
      setHasPermission(
        cameraStatus.status === 'granted' && 
        audioStatus.status === 'granted'
      );
      
      if (cameraStatus.status !== 'granted' || audioStatus.status !== 'granted') {
        Alert.alert(
          'Permissions Required',
          'Camera and microphone permissions are required for video selfie',
          [{ text: 'OK' }]
        );
      }
    })();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
    if (cameraRef.current) {
      setCountdown(3);
      
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            beginRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const beginRecording = async () => {
    try {
      setIsRecording(true);
      setRecordingTime(0);
      
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          // Auto-stop after 10 seconds
          if (prev >= 10) {
            stopRecording();
            return 10;
          }
          return prev + 1;
        });
      }, 1000);
      
      const video = await cameraRef.current.recordAsync({
        maxDuration: 10,
        quality: '720p', // Use string directly instead of Camera.Constants.VideoQuality
        mute: false,
      });
      
      // Handle the recorded video
      navigation.navigate('VerificationHome', { 
        completedStep: 'videoSelfie',
        videoUri: video.uri 
      });
    } catch (error) {
      console.error('Error recording video:', error);
      setIsRecording(false);
      Alert.alert('Error', 'Failed to record video');
    }
  };

  const stopRecording = async () => {
    if (isRecording && cameraRef.current) {
      clearInterval(timerRef.current);
      setIsRecording(false);
      await cameraRef.current.stopRecording();
    }
  };

  if (hasPermission === null) {
    return <View style={styles.container}><Text style={styles.text}>Requesting permissions...</Text></View>;
  }
  
  if (hasPermission === false) {
    return <View style={styles.container}><Text style={styles.text}>No access to camera or microphone</Text></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type="front" // Use string directly instead of Camera.Constants.Type.front
      >
        <View style={styles.overlay}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={28} color="white" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.contentContainer}>
            {countdown > 0 ? (
              <View style={styles.countdownContainer}>
                <Text style={styles.countdownText}>{countdown}</Text>
              </View>
            ) : (
              <Text style={styles.instructionText}>
                {isRecording 
                  ? `Recording... ${recordingTime}s / 10s`
                  : 'Take a short video selfie for identity verification'}
              </Text>
            )}
            
            {isRecording ? (
              <TouchableOpacity 
                style={[styles.recordButton, styles.recordingButton]}
                onPress={stopRecording}
              >
                <View style={styles.stopRecordingIcon} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={styles.recordButton}
                onPress={startRecording}
                disabled={countdown > 0}
              >
                <View style={styles.recordButtonInner} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Camera>
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
    backgroundColor: 'rgba(0,0,0,0.3)',
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
    marginTop: 20,
  },
  countdownContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  countdownText: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButtonInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FF4136',
  },
  recordingButton: {
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
  },
  stopRecordingIcon: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});