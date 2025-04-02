import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VerificationHome from './VerificationHome';
import ScanIDFront from './ScanIDFront';
import ScanIDBack from './ScanIDBack';
import VideoSelfie from './VideoSelfie';
import Signature from './Signature';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <Stack.Navigator 
        initialRouteName="VerificationHome" 
      >
        <Stack.Screen 
          name="VerificationHome" 
          component={VerificationHome} 
          options={{ 
            title: 'Verification'
          }} 
          

        />
        <Stack.Screen 
          name="ScanIDFront" 
          component={ScanIDFront} 
          options={{ title: 'Scan ID Front' }} 
        />
        <Stack.Screen 
          name="ScanIDBack" 
          component={ScanIDBack} 
          options={{ title: 'Scan ID Back' }} 
        />
        <Stack.Screen 
          name="VideoSelfie" 
          component={VideoSelfie} 
          options={{ title: 'Video Selfie' }} 
        />
        <Stack.Screen 
          name="Signature" 
          component={Signature} 
          options={{ title: 'Signature' }} 
        />
      </Stack.Navigator>

  );
}