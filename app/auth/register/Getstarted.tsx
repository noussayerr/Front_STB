import React, { useState, useContext } from 'react';
import { View, Text, TextInput, ScrollView, SafeAreaView, StatusBar, TouchableOpacity,StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { RadioButtonGroup, RadioButtonItem } from 'expo-radio-button';
import  AppContext  from './AppContext';  
import { Dropdown } from 'react-native-element-dropdown';
interface DropdownOption {
  value: string;
  label: string;
}
const ageOptions: DropdownOption[] = Array.from({ length: 100 }, (_, i) => ({
  value: (i + 1).toString(),
  label: (i + 1).toString(),
}));
const SignUpScreen: React.FC = () => {
  const [current, setCurrent] = useState<string>('option1');
  const { setCurrentStep, setFormData, formData } = useContext(AppContext)!;
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [age, setAge] = useState<string | null>(null);
  const handleNext = () => {
    setFormData({ ...formData, gender: current , age });
    setCurrentStep(1);
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >

      <View className="px-6">
        <View className="mb-8">
                              
        </View>
        <View className="space-y-6 mt-10 flex gap-10">
          <View>
            <Text className="font-semibold mb-2 text-lg">First Name</Text>
            <TextInput
              placeholder="Enter your first name"
              className="bg-[#F5F9FE] rounded-lg px-4 py-5 placeholder:text-[#A0ACBB]"
              autoCapitalize="words"
              onChangeText={(text) => setFormData({ ...formData, firstName: text })}
              />
          </View>
          <View>
            <Text className="font-semibold mb-2 text-lg">Last Name</Text>
            <TextInput
              placeholder="Enter your last name"
              className="bg-[#F5F9FE] rounded-lg px-4 py-5 placeholder:text-[#A0ACBB]"
              autoCapitalize="words"
              onChangeText={(text) => setFormData({ ...formData, lastName: text })}
              />
          </View>
          <View>
        <Text className='text-lg font-semibold '>Select your age</Text>
        <Dropdown 
         style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
         data={ageOptions} 
         labelField="label" 
         valueField="value" 
         placeholder="Age" 
         value={age} 
         onChange={item => setAge(item.value)} 
         
         />
        </View>
          <View className="">
            <Text className="font-semibold mb-2 text-lg">You are ...</Text>
            <RadioButtonGroup
              selected={current}
              onSelected={(value: string) => setCurrent(value)}
              radioBackground="#2563eb"
              >
              <RadioButtonItem value="option1" label={<Text className="text-lg">Male</Text>} style={{ margin: 10 }} />
              <RadioButtonItem value="option2" label={<Text className="text-lg">Female</Text>} style={{ margin: 10 }} />
            </RadioButtonGroup>
          </View>
            <TouchableOpacity onPress={handleNext} className="bg-[#2563eb] rounded-2xl py-4 flex-row justify-center" activeOpacity={0.8}>
              <Text className="text-white font-bold text-xl">Get started</Text>
            </TouchableOpacity> 
        </View>
      </View>
      </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  
  dropdownContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
  },

});