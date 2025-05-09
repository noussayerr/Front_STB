import React, { useState, useContext } from 'react';
import { View, Text, TextInput, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { Dropdown } from 'react-native-element-dropdown';
import Rib from '@/app/components/rib';
import { useAuthStore } from "@/app/zustand/authStore";
import  AppContext  from './AppContext';


interface DropdownOption {
  value: string;
  label: string;
}

const ageOptions: DropdownOption[] = Array.from({ length: 83 }, (_, i) => ({
  value: (i + 18).toString(),
  label: (i + 18).toString(),
}));

const SignUpScreen: React.FC = () => {
  const { setCurrentStep, setFormData, formData } = useContext(AppContext)!;
  const [current, setCurrent] = useState<string>('Male');
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [age, setAge] = useState<string>(formData.age || '');
  const [firstName, setFirstName] = useState<string>(formData.firstName || '');
  const [lastName, setLastName] = useState<string>(formData.lastName || '');
  const [ribError, setRibError] = useState<string>('');
  const [isCheckingRib, setIsCheckingRib] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ 
    firstName?: string; 
    lastName?: string; 
    age?: string; 
    gender?: string;
    rib?: string;
  }>({});

  const { findrrib, error } = useAuthStore();
  console.log(error)
  const validateRIB = async () => {
    if (!formData.rib || formData.rib.trim() === '') {
      setRibError('RIB is required');
      return false;
    }
  
    setIsCheckingRib(true);
    setRibError(''); // Clear previous errors
    
    try {
      await findrrib(formData.rib);
      return true; // RIB is valid
    } catch (err) {
      setRibError(error || 'Invalid RIB');
      return false;
    } finally {
      setIsCheckingRib(false);
    }
  };
  
  const handleNext = async () => {
    // First validate all basic fields
    let newErrors: typeof errors = {};
    
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!age) newErrors.age = 'Age is required';
    if (!current) newErrors.gender = 'Gender is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    // Then validate RIB
    const isRibValid = await validateRIB();
    
    // Only proceed if RIB is valid OR if there's an error but we want to allow continuation
    if (isRibValid ) { // Modified this line to your requirements
      setFormData({ 
        ...formData, 
        gender: current, 
        age, 
        firstName, 
        lastName 
      });
      setCurrentStep(1);
    }
  };
  return (
    <View className="flex-1 bg-white">
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <ScrollView>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          <View className="px-6">
            <View className="space-y-6 mt-10 flex gap-10">
              {/* RIB Component with validation */}
              <View>
                <Rib />
                {isCheckingRib ? (
                  <ActivityIndicator size="small" color="#2563eb" style={styles.loading} />
                ) : (
                  ribError ? <Text style={styles.errorText}>{ribError}</Text> : null
                )}
              </View>

              {/* First Name */}
              <View>
                <Text className="font-semibold mb-2 text-lg">First Name</Text>
                <TextInput
                  placeholder="Enter your first name"
                  className="bg-[#F5F9FE] rounded-lg px-4 py-5 placeholder:text-[#A0ACBB]"
                  autoCapitalize="words"
                  value={firstName}
                  onChangeText={(text) => {
                    setFirstName(text);
                    setErrors((prev) => ({ ...prev, firstName: undefined }));
                  }}
                />
                {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
              </View>

              {/* Last Name */}
              <View>
                <Text className="font-semibold mb-2 text-lg">Last Name</Text>
                <TextInput
                  placeholder="Enter your last name"
                  className="bg-[#F5F9FE] rounded-lg px-4 py-5 placeholder:text-[#A0ACBB]"
                  value={lastName}
                  autoCapitalize="words"
                  onChangeText={(text) => {
                    setLastName(text);
                    setErrors((prev) => ({ ...prev, lastName: undefined }));
                  }}
                />
                {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
              </View>

              {/* Age Dropdown */}
              <View>
                <Text className="text-lg font-semibold">Select your age</Text>
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                  data={ageOptions}
                  labelField="label"
                  valueField="value"
                  placeholder="Age"
                  value={age}
                  onChange={(item) => {
                    setAge(item.value);
                    setErrors((prev) => ({ ...prev, age: undefined }));
                  }}
                />
                {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}
              </View>

              {/* Gender Selection */}
              <View>
                <Text className="font-semibold mb-2 text-lg">You are ...</Text>
                <RadioButtonGroup
                  selected={current}
                  onSelected={(value: string) => {
                    setCurrent(value);
                    setErrors((prev) => ({ ...prev, gender: undefined }));
                  }}
                  radioBackground="#2563eb"
                >
                  <RadioButtonItem value="Male" label={<Text className="text-lg">Male</Text>} style={{ margin: 10 }} />
                  <RadioButtonItem value="Female" label={<Text className="text-lg">Female</Text>} style={{ margin: 10 }} />
                </RadioButtonGroup>
                {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
              </View>

              {/* Submit Button */}
              <TouchableOpacity 
                onPress={handleNext} 
                className="bg-[#2563eb] rounded-2xl py-4 flex-row justify-center" 
                activeOpacity={0.8}
                disabled={isCheckingRib}
              >
                {isCheckingRib ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white font-bold text-xl">Get started</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};export default SignUpScreen;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
  },
  loading: {
    marginTop: 8,
  },
});