import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  Pressable 
} from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../zustand/store';
import Slider from '../components/slider';
import { useTheme } from "../providers/ThemeProvider";

// Main component
const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <View className={`flex h-full  ${theme === "dark" ? "bg-[#121212]" : "bg-white"}`}>
     <StatusBar translucent backgroundColor="transparent" barStyle={theme === "dark" ? "light-content" : "dark-content"} />


      <View className="flex mt-36">
        <Slider />
      </View>
      <View className="absolute bottom-10 left-0 right-0 px-4">
        <TouchableOpacity
          onPress={() => router.push('/auth/login/Login')}
          className="bg-blue-600 rounded-2xl w-full py-5"
          activeOpacity={0.8}
        >
          {/* Use translation for the "Login" button */}
          <Text className="text-white text-center font-medium text-xl">{t('login')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/auth/register/register')}
          className={`rounded-2xl border-2  w-full py-5 mt-4 ${theme === "dark" ? "bg-[#1e1e1e] border-[#ffffff]" : "text-black "}`}
          activeOpacity={0.8}
        >
          {/* Use translation for the "Create Account" button */}
          <Text className={`text-center font-medium text-xl ${theme === "dark" ? "text-[#e5e5e5]" : "text-black "}`}>{t('createAccount')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;