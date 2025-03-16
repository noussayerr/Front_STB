import React, { useContext } from 'react';
import { View } from 'react-native';
import  AppContext  from '@/app/auth/register/AppContext';

const Stepper: React.FC = () => {
  const { currentStep } = useContext(AppContext)!;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          width: 40,
          height: 8,
          backgroundColor: currentStep === 0 ? '#2563eb' : '#D1D5DB',
          marginHorizontal: 5,
        }}
        className="rounded-full"
      />
      <View
        style={{
          width: 40,
          height: 8,
          backgroundColor: currentStep === 1 ? '#2563eb' : '#D1D5DB',
          marginHorizontal: 5,
        }}
        className="rounded-full"
      />
      <View
        style={{
          width: 40,
          height: 8,
          backgroundColor: currentStep === 2 ? '#2563eb' : '#D1D5DB',
          marginHorizontal: 5,
        }}
        className="rounded-full"
      />
    </View>
  );
};

export default Stepper;