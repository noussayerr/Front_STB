import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../../zustand/store';
import { useTheme } from '@/app/providers/ThemeProvider';
import useThemeStore from '../../zustand/themeStore';

// EyeIcon component
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

// Login component
const Login = () => {
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();
  const { theme } = useTheme();

  const handleSubmit = () => {
    router.push('/(tabs)');
  };

  // Check if the language is RTL (Arabic)
  const isRTL = language === 'ar';

  return (
    <View className={`flex h-full ${theme === "dark" ? "bg-[#121212]" : "bg-white"}`}>
      <ScrollView className="flex px-4">
        <View className="mt-24 mb-8">
          <Text className={`text-4xl font-bold text-center ${theme === "dark" ? "text-[#3b82f6]" : "text-blue-600"}`} style={{ textAlign: isRTL ? 'right' : 'left' }}>
            {t('login')}
          </Text>
        </View>
        <View className="space-y-4 mb-12 flex gap-10">
          <View>
            <Text className={`font-semibold mb-2 text-lg ${theme === "dark" ? "text-[#e5e5e5]" : "text-black"}`} style={{ textAlign: isRTL ? 'right' : 'left' }}>
              {t('email')}
            </Text>
            <TextInput
              placeholder={t('enterEmail')}
              className={`bg-[#F5F9FE] rounded-lg px-4 py-5 placeholder:text-[#A0ACBB] ${theme === "dark" ? "bg-[#1e1e1e]" : "bg-[#F5F9FE]"}`}
              value={email}
              onChangeText={setEmail}
              textAlign={isRTL ? 'right' : 'left'}
            />
          </View>
          <View className="relative">
            <Text className={`font-semibold mb-2 text-lg ${theme === "dark" ? "text-[#e5e5e5]" : "text-black"}`} style={{ textAlign: isRTL ? 'right' : 'left' }}>
              {t('password')}
            </Text>
            <TextInput
              placeholder={t('enterPassword')}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
              className={`bg-[#F5F9FE] rounded-lg px-4 py-5 placeholder:text-[#A0ACBB] ${theme === "dark" ? "bg-[#1e1e1e]" : "bg-[#F5F9FE]"}`}
              textAlign={isRTL ? 'right' : 'left'}
            />
            {/* Dynamically position the eye icon based on RTL/LTR */}
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-14`}
            >
              <EyeIcon visible={passwordVisible} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text className={`text-right text-sm font-light mt-2 ${theme === "dark" ? "text-[#e5e5e5]" : "text-black"}`} style={{ textAlign: isRTL ? 'right' : 'left' }}>
                {t('forgotPassword')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={handleSubmit} className={`rounded-2xl py-4 mb-6 ${theme === "dark" ? "bg-[#3b82f6]" : "bg-blue-600"}`}>
          <Text className="text-white text-center font-semibold text-lg">
            {t('login')}
          </Text>
        </TouchableOpacity>
        <View className="flex flex-row justify-center">
          <Text className={`pr-2 ${theme === "dark" ? "text-[#e5e5e5]" : "text-black"}`} style={{ textAlign: isRTL ? 'right' : 'left' }}>
            {t('noAccount')}
          </Text>
          <TouchableOpacity onPress={() => router.push('/auth/register')}>
            <Text className={`text-blue-600 ${theme === "dark" ? "text-[#3b82f6]" : "text-blue-600"}`}>
              {t('signUp')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
