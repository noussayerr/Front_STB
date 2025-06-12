import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Animated from 'react-native-reanimated';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/app/providers/ThemeProvider';
import { useCardStore } from '@/app/zustand/useCardStore';

export default function CartDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { theme } = useTheme();
  const { selectedCardType, isLoading, error, fetchCardTypeById, clearSelectedCardType } = useCardStore();
  console.log('Selected Card Type:', selectedCardType);
  useEffect(() => {
    if (id) fetchCardTypeById(id);
    return () => clearSelectedCardType();
  }, [id]);

  // Early returns after all hooks
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={theme === 'dark' ? '#fff' : '#000'} />
        <Text className={theme === 'dark' ? 'text-white' : 'text-black'}>Loading card details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className={theme === 'dark' ? 'text-red-400' : 'text-red-600'}>Error: {error}</Text>
      </View>
    );
  }

  if (!selectedCardType) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className={theme === 'dark' ? 'text-red-400' : 'text-red-500'}>Card not found!</Text>
      </View>
    );
  }

  // Safely destructure with fallbacks
  const { 
    name = '', 
    tag = '', 
    imageUrl = '', 
    description = '', 
    benefits = [], 
    features = [], 
    fees = {} 
  } = selectedCardType || {};

  return (
    <SafeAreaView className={`flex-1 ${theme === 'dark' ? 'bg-[#121212]' : 'bg-white'}`}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme === 'dark' ? '#121212' : '#ffffff'}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <View className="p-5 items-center">
          {/* Title & Tag */}
          <Text className={`text-2xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} mb-1`}>{name}</Text>
          <View className={`px-3 py-1 rounded-full mb-4 ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'}`}>
            <Text className={`text-sm font-medium ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>{tag}</Text>
          </View>

          {/* Image */}
          <View className={`w-full rounded-2xl p-6 items-center mb-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'}`}>
            <Image 
              source={{ uri: imageUrl }} 
              style={{ width: 280, height: 180 }} 
              resizeMode="contain" 
              defaultSource={require('@/assets/carts/CarteCCash.png')} // Add fallback image
            />
          </View>

          {/* About */}
          <View className="w-full mb-6">
            <Text className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>About This Card</Text>
            <Text className={`text-base leading-6 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>{description}</Text>
          </View>

          {/* Key Benefits - Add null check */}
          {benefits?.length > 0 && (
            <View className="w-full mb-6">
              <Text className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Key Benefits</Text>
              {benefits.map((benefit, idx) => (
                <Animated.View
                  key={idx}
                  className={`flex-row items-start rounded-xl p-4 mb-3 border shadow-sm ${
                    theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}
                  `}
                >
                  <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'}`}>
                    <MaterialIcons 
                      name={benefit?.icon || 'info'} // Fallback icon
                      size={20} 
                      color={theme === 'dark' ? '#93c5fd' : '#2563eb'} 
                    />
                  </View>
                  <Text className={`flex-1 text-base ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                    {benefit?.text || ''}
                  </Text>
                </Animated.View>
              ))}
            </View>
          )}

          {/* Features - Add null check */}
          {features?.length > 0 && (
            <View className="w-full mb-6">
              <Text className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Features</Text>
              <View className={`rounded-xl border overflow-hidden shadow-screen-sm ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                {features.map((feat, idx) => (
                  <View key={idx} className={`flex-row items-center px-4 py-3 ${idx < features.length - 1 ? (theme === 'dark' ? 'border-b border-gray-700' : 'border-b border-gray-100') : ''}`}>
                    <View className={`w-6 h-6 rounded-full items-center justify-center mr-3 ${theme === 'dark' ? 'bg-green-900' : 'bg-green-100'}`}>
                      <AntDesign name="check" size={14} color={theme === 'dark' ? '#86efac' : '#16a34a'} />
                    </View>
                    <Text className={`text-base ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>{feat}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Fees & Charges - Add null check */}
          {fees && Object.keys(fees).length > 0 && (
            <View className="w-full mb-6">
              <Text className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Fees & Charges</Text>
              <View className={`rounded-xl border overflow-hidden shadow-sm ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                {Object.entries(fees).map(([label, value], idx, arr) => (
                  <View key={label} className={`flex-row justify-between items-center px-4 py-3 ${idx < arr.length - 1 ? (theme === 'dark' ? 'border-b border-gray-700' : 'border-b border-gray-100') : ''}`}>
                    <Text className={`text-base ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                      {label.charAt(0).toUpperCase() + label.slice(1)}
                    </Text>
                    <Text className={`text-base font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{`${value} DT`}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Loss or Theft Info */}
          <View className={`w-full mb-6 p-4 rounded-xl ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-50'}`}>
            <View className="flex-row items-center mb-3">
              <MaterialIcons name="info" size={20} color={theme === 'dark' ? '#93c5fd' : '#2563eb'} />
              <Text className={`ml-2 text-lg font-bold ${theme === 'dark' ? 'text-blue-200' : 'text-blue-700'}`}>In Case of Loss or Theft</Text>
            </View>
            <Text className={`text-base mb-2 ${theme === 'dark' ? 'text-blue-200' : 'text-blue-700'}`}>Block your card instantly using:</Text>
            <View className="ml-4">
              <Text className={`text-base ${theme === 'dark' ? 'text-blue-200' : 'text-blue-700'}`}>• STB Direct app</Text>
              <Text className={`text-base ${theme === 'dark' ? 'text-blue-200' : 'text-blue-700'}`}>• Call: +216 71 140 400 (24/7)</Text>
              <Text className={`text-base ${theme === 'dark' ? 'text-blue-200' : 'text-blue-700'}`}>• Visit nearest STB branch</Text>
            </View>
          </View>
        </View>

        {/* Apply Button */}
        <TouchableOpacity
          className="bg-blue-600 py-4 rounded-xl items-center mx-5"
          onPress={() => router.push({ pathname: '/(tabs)/(Carts)/getmycard', params: { cardId: selectedCardType._id } })}
        >
          <Text className="text-white font-bold text-lg">Apply for This Card</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}