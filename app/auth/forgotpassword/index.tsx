import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../../zustand/store';
import { useTheme } from '@/app/providers/ThemeProvider';
import { AntDesign } from "@expo/vector-icons"

const ForgotPassword = () => {
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();
  const { theme } = useTheme();

  const isRTL = language === 'ar';

  const handleSubmit = async () => {
    setError(null);
    
    if (!email.trim()) {
      setError(t('emailRequired'));
      return;
    }
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(t('invalidEmail'));
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would call your API here
      // await forgotPasswordAPI(email);
      
      setSuccess(true);
      
      // Navigate to reset password page after a delay
      setTimeout(() => {
        router.push({
          pathname: '/auth/forgotpassword/resetpassword',
          params: { email }
        });
      }, 1500);
      
    } catch (err) {
      setError(t('forgotPasswordError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className={`flex h-full ${theme === "dark" ? "bg-[#121212]" : "bg-white"}`}>
      <ScrollView className="flex px-4">
        <View className="mt-16 mb-2 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={30} color={theme === "dark" ? "#f8fafc" : "#0f172a"} />
        </TouchableOpacity>
        </View>
        
        <View className="mt-8 mb-8">
          <Text className={`text-4xl text-center font-bold ${theme === "dark" ? "text-[#3b82f6]" : "text-blue-600"} `}>
            {t('forgotPassword')}
          </Text>
          <Text className={`mt-2 text-base ${theme === "dark" ? "text-[#e5e5e5]" : "text-gray-600"}`} style={{ textAlign: isRTL ? 'right' : 'left' }}>
            {t('forgotPasswordDescription') || "Enter your email address and we'll send you a link to reset your password."}
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
              {t('resetLinkSent') || "Reset link sent! Check your email."}
            </Text>
          </View>
        )}

        <View className="space-y-4 mb-12">
          <View>
            <Text className={`font-semibold mb-2 text-lg ${theme === "dark" ? "text-[#e5e5e5]" : "text-black"}`} style={{ textAlign: isRTL ? 'right' : 'left' }}>
              {t('email')}
            </Text>
            <TextInput
              placeholder={t('enterEmail')}
              className={`rounded-lg px-4 py-5 placeholder:text-[#A0ACBB] ${theme === "dark" ? "bg-[#1e1e1e]" : "bg-[#F5F9FE]"}`}
              value={email}
              onChangeText={setEmail}
              textAlign={isRTL ? 'right' : 'left'}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isLoading && !success}
            />
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
              {success ? t('resetLinkSent') || "Reset Link Sent" : t('sendResetLink') || "Send Reset Link"}
            </Text>
          )}
        </TouchableOpacity>
        
        <View className="flex flex-row justify-center mb-8">
          <Text className={`pr-2 ${theme === "dark" ? "text-[#e5e5e5]" : "text-black"}`} style={{ textAlign: isRTL ? 'right' : 'left' }}>
            {t('rememberPassword') || "Remember your password?"}
          </Text>
          <TouchableOpacity onPress={() => router.push('/auth/login/Login')}>
            <Text className={`${theme === "dark" ? "text-[#3b82f6]" : "text-blue-600"}`}>
              {t('login')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ForgotPassword;