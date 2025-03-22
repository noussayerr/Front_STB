import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';

const GetMyCard = () => {
  const [formData, setFormData] = useState({
    accountEmail: '',
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    cardHolderName: '',
    city: '',
    postalCode: '',
    cardHolderPhone: '',
    issuedOn: '',
  });

  const handleSubmit = () => {
    console.log('User Info:', formData);
    Alert.alert('Info Submitted', 'Check the console for details');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='flex-1'
    >
      <ScrollView className='flex bg-white p-4 h-full'>
        <View className='mt-4'>
          <Text className='text-xl font-bold text-blue-600'>The Account Holder</Text>
          <View className='space-y-4 mt-4'>
            <View className='space-y-2'>
              <Text className='text-sm text-gray-600'>Account Email Address</Text>
              <TextInput placeholder='Account Email Address' className='bg-[#F5F9FE] rounded-lg px-4 py-3' 
                keyboardType='email-address'
                autoCapitalize='none'
                onChangeText={(text) => setFormData({ ...formData, accountEmail: text })} />
            </View>
            <View className='space-y-2'>
              <Text className='text-sm text-gray-600'>First Name</Text>
              <TextInput placeholder='First Name' className='bg-[#F5F9FE] rounded-lg px-4 py-3'
                autoCapitalize='words'
                onChangeText={(text) => setFormData({ ...formData, firstName: text })} />
            </View>
            <View className='space-y-2'>
              <Text className='text-sm text-gray-600'>Last Name</Text>
              <TextInput placeholder='Last Name' className='bg-[#F5F9FE] rounded-lg px-4 py-3'
                autoCapitalize='words'
                onChangeText={(text) => setFormData({ ...formData, lastName: text })} />
            </View>
            <View className='space-y-2'>
              <Text className='text-sm text-gray-600'>Address</Text>
              <TextInput placeholder='Address' className='bg-[#F5F9FE] rounded-lg px-4 py-3'
                onChangeText={(text) => setFormData({ ...formData, address: text })} />
            </View>
            <View className='space-y-2'>
              <Text className='text-sm text-gray-600'>GSM Phone Number</Text>
              <TextInput placeholder='GSM Phone Number' className='bg-[#F5F9FE] rounded-lg px-4 py-3'
                keyboardType='phone-pad'
                onChangeText={(text) => setFormData({ ...formData, phone: text })} />
            </View>
          </View>
        </View>

        <View className='mt-6'>
          <Text className='text-xl font-bold text-blue-600'>The Card Holder</Text>
          <View className='space-y-4 mt-4'>
            <View className='space-y-2'>
              <Text className='text-sm text-gray-600'>Name and Surname or Company Name</Text>
              <TextInput placeholder='Name and Surname or Company Name' className='bg-[#F5F9FE] rounded-lg px-4 py-3'
                onChangeText={(text) => setFormData({ ...formData, cardHolderName: text })} />
            </View>
            <View className='space-y-2'>
              <Text className='text-sm text-gray-600'>City</Text>
              <TextInput placeholder='City' className='bg-[#F5F9FE] rounded-lg px-4 py-3'
                onChangeText={(text) => setFormData({ ...formData, city: text })} />
            </View>
            <View className='space-y-2'>
              <Text className='text-sm text-gray-600'>Postal Code</Text>
              <TextInput placeholder='Postal Code' className='bg-[#F5F9FE] rounded-lg px-4 py-3'
                keyboardType='numeric'
                onChangeText={(text) => setFormData({ ...formData, postalCode: text })} />
            </View>
            <View className='space-y-2'>
              <Text className='text-sm text-gray-600'>Phone (Optional)</Text>
              <TextInput placeholder='Phone (Optional)' className='bg-[#F5F9FE] rounded-lg px-4 py-3'
                keyboardType='phone-pad'
                onChangeText={(text) => setFormData({ ...formData, cardHolderPhone: text })} />
            </View>
            <View className='space-y-2'>
              <Text className='text-sm text-gray-600'>Issued On (YYYY-MM-DD)</Text>
              <TextInput placeholder='Issued On (YYYY-MM-DD)' className='bg-[#F5F9FE] rounded-lg px-4 py-3'
                keyboardType='numeric'
                onChangeText={(text) => setFormData({ ...formData, issuedOn: text })} />
            </View>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity className='mt-6 bg-blue-600 rounded-lg p-4 mb-8' onPress={handleSubmit}>
          <Text className='text-white text-center font-bold'>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default GetMyCard;