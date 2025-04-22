import React, { useContext } from 'react';
import { View, Text, TextInput, ActivityIndicator } from 'react-native';
import AppContext from '../auth/register/AppContext';

interface RibProps {
  error?: string;
  isLoading?: boolean;
}

const Rib: React.FC<RibProps> = ({ error, isLoading }) => {
  const { setFormData, formData } = useContext(AppContext)!;
  
  return (
    <View>
      <Text className='text-lg font-semibold'>Your RIB</Text>
      <TextInput 
        className='bg-[#F5F9FE] rounded-lg px-4 py-5 placeholder:text-[#A0ACBB]' 
        placeholder='Enter Your RIB'
        value={formData.rib || ''}
        onChangeText={(text) => setFormData({ ...formData, rib: text })}
        keyboardType="numeric"
      />
      {isLoading ? (
        <ActivityIndicator size="small" color="#2563eb" style={{ marginTop: 8 }} />
      ) : error ? (
        <Text style={{ color: 'red', fontSize: 14, marginTop: 4 }}>{error}</Text>
      ) : null}
    </View>
  );
};

export default Rib;