import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios';
import Svg, { Path } from 'react-native-svg';
import  AppContext  from './AppContext';
import { useRouter } from "expo-router";
interface EyeIconProps {
  visible: boolean;
}

const EyeIcon: React.FC<EyeIconProps> = ({ visible }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af">
    {visible ? (
      <>
        <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <Path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </>
    ) : (
      <>
        <Path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <Path d="M1 1l22 22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <Path d="M1 12s4-8 11-8c1.73 0 3.3.37 4.67 1.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </>
    )}
  </Svg>
);

const Email: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const { setCurrentStep, setFormData, formData } = useContext(AppContext)!;
  const router = useRouter();

  const handleSubmit =async () => {
    setFormData({ ...formData, email, password, confirmPassword });
    
    try {
       await axios.post('http://localhost:5000/api/authroutes/signup', formData);
       router.push("/auth/register/verify")
    } catch (error) {
     
    }
   
    
  };

  return (
    <View className="flex bg-white px-4">
      <ScrollView className="flex px-2">
        <View className="mt-16 mb-8">
          <Text className="text-4xl font-bold text-center text-blue-600">Let's create your account</Text>
        </View>
          <Text className="font-semibold text-lg mb-2">Email</Text>
        <View className="space-y-4 mb-6 flex gap-10 ">
          <TextInput
            placeholder="Enter your Email"
            className="bg-[#F5F9FE] rounded-lg px-4 py-5 placeholder:text-[#A0ACBB]"
            value={email}
            onChangeText={setEmail}
          />
          <View className="relative">
            <Text className="font-semibold mb-2 text-lg">Password</Text>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
              className="bg-[#F5F9FE] rounded-lg px-4 py-5 placeholder:text-[#A0ACBB]"
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} className="absolute right-4 top-14">
              <EyeIcon visible={passwordVisible} />
            </TouchableOpacity>
          </View>
          <View>
          <Text className="font-semibold mb-2 text-lg">Confirm Password</Text>
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!passwordVisible}
            className="bg-[#F5F9FE] rounded-lg px-4 py-5 placeholder:text-[#A0ACBB]"
          />
          </View>
        </View>
        <TouchableOpacity onPress={handleSubmit} className="bg-blue-600 rounded-2xl mt-8 py-4 mb-6">
          <Text className="text-white text-center font-semibold text-lg" >Create Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Email;