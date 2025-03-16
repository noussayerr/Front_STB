// auth/register/index.tsx
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Stepper from '@/components/Stepper';
import SignUpScreen from './Getstarted';
import Moreinfo from './moreinfo';
import Email from './email';
import AppContext from './AppContext';

const Index: React.FC = () => {
  const navigation = useNavigation();
  const {setCurrentStep, currentStep } = useContext(AppContext)!; 
    
  return (
    <View className="flex bg-white h-full">
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <ScrollView className="mt-12">
      <TouchableOpacity 
  onPress={() => currentStep > 0 ? setCurrentStep(currentStep - 1) : navigation.goBack()} 
  style={{ marginBottom: 20 }}
>
          <Ionicons name="arrow-back" size={40} color="#2563eb" className="px-2" />
        </TouchableOpacity>
        {currentStep === 0 && <SignUpScreen />}
        {currentStep === 1 && <Moreinfo />}
        {currentStep === 2 && <Email />}
      </ScrollView>
      <View className="h-12 mt-4">
        <Stepper />
      </View>
    </View>
  );
};

export default Index;