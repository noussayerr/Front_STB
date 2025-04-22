import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../../zustand/store';
import { useTheme } from '@/app/providers/ThemeProvider';
import { AntDesign } from "@expo/vector-icons"

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

const ResetPassword = () => {
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();
  const { theme } = useTheme();
  const { email } = useLocalSearchParams<{ email: string }>();

  const isRTL = language === 'ar';

  const handleSubmit = async () => {
    setError(null);
    
    if (!password.trim()) {
      setError(t('passwordRequired'));
      return;
    }
    
    if (password.length < 8) {
      setError(t('passwordTooShort') || "Password must be at least 8 characters");
      return;
    }
    
    if (password !== confirmPassword) {
      setError(t('passwordsDoNotMatch') || "Passwords do not match");
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would call your API here
      // await resetPasswordAPI(email, password);
      
      setSuccess(true);
      
      // Navigate to login page after a delay
      setTimeout(() => {
        router.push('/auth/login/Login');
      }, 2000);
      
    } catch (err) {
      setError(t('resetPasswordError') || "Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className={`flex h-full ${theme === "dark" ? "bg-[#121212]" : "bg-white"}`}>
      <ScrollView className="flex px-4">
        <View className="mt-12 mb-2 flex-row items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign name="arrowleft" size={30} color={theme === "dark" ? "#f8fafc" : "#0f172a"} />
          </TouchableOpacity>
        </View>
        
        <View className="mt-8 mb-8">
          <Text className={`text-4xl font-bold ${theme === "dark" ? "text-[#3b82f6]" : "text-blue-600"}`} style={{ textAlign: isRTL ? 'right' : 'left' }}>
            {t('resetPassword') || "Reset Password"}
          </Text>
          <Text className={`mt-2 text-base ${theme === "dark" ? "text-[#e5e5e5]" : "text-gray-600"}`} style={{ textAlign: isRTL ? 'right' : 'left' }}>
            {t('resetPasswordDescription') || "Create a new password for your account"}
          </Text>
        </View>

        {error && (
          <View className="mb-4 p-3 bg-red-100 rounded-lg">
            <Text className="text-red-600" style={{ textAlign: isRTL ? 'right' : 'left' }}>
              {error}
            </Text>
          </View>
        )}

        {success && (
          <View className="mb-4 p-3 bg-green-100 rounded-lg">
            <Text className="text-green-600" style={{ textAlign: isRTL ? 'right' : 'left' }}>
              {t('passwordResetSuccess') || "Password reset successfully!"}
            </Text>
          </View>
        )}

        <View className="space-y-4 mb-12">
          <View>
            <Text className={`font-semibold mb-2 text-lg ${theme === "dark" ? "text-[#e5e5e5]" : "text-black"}`} style={{ textAlign: isRTL ? 'right' : 'left' }}>
              {t('email')}
            </Text>
            <TextInput
              value={email}
              className={`rounded-lg px-4 py-5 ${theme === "dark" ? "bg-[#1e1e1e] text-gray-400" : "bg-[#F5F9FE] text-gray-500"}`}
              editable={false}
              textAlign={isRTL ? 'right' : 'left'}
            />
          </View>
          
          <View className="relative">
            <Text className={`font-semibold mb-2 text-lg ${theme === "dark" ? "text-[#e5e5e5]" : "text-black"}`} style={{ textAlign: isRTL ? 'right' : 'left' }}>
              {t('newPassword') || "New Password"}
            </Text>
            <TextInput
              placeholder={t('enterNewPassword') || "Enter new password"}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
              className={`rounded-lg px-4 py-5 placeholder:text-[#A0ACBB] ${theme === "dark" ? "bg-[#1e1e1e]" : "bg-[#F5F9FE]"}`}
              textAlign={isRTL ? 'right' : 'left'}
              editable={!isLoading && !success}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-14`}
            >
              <EyeIcon visible={passwordVisible} />
            </TouchableOpacity>
          </View>
          
          <View className="relative">
            <Text className={`font-semibold mb-2 text-lg ${theme === "dark" ? "text-[#e5e5e5]" : "text-black"}`} style={{ textAlign: isRTL ? 'right' : 'left' }}>
              {t('confirmPassword') || "Confirm Password"}
            </Text>
            <TextInput
              placeholder={t('confirmNewPassword') || "Confirm new password"}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!confirmPasswordVisible}
              className={`rounded-lg px-4 py-5 placeholder:text-[#A0ACBB] ${theme === "dark" ? "bg-[#1e1e1e]" : "bg-[#F5F9FE]"}`}
              textAlign={isRTL ? 'right' : 'left'}
              editable={!isLoading && !success}
            />
            <TouchableOpacity
              onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-14`}
            >
              <EyeIcon visible={confirmPasswordVisible} />
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity 
          onPress={handleSubmit} 
          className={`rounded-2xl py-4 mb-6 ${
            isLoading || success 
              ? theme === "dark" ? "bg-[#2563eb]" : "bg-blue-400" 
              : theme === "dark" ? "bg-[#3b82f6]" : "bg-blue-600"
          }`}
          disabled={isLoading || success}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center font-semibold text-lg">
              {success ? t('passwordReset') || "Password Reset" : t('resetPassword') || "Reset Password"}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ResetPassword;