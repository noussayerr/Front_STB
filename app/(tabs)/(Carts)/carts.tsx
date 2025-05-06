import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign, Feather } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useTheme } from '@/app/providers/ThemeProvider';
import { useCardStore } from '@/app/zustand/useCardStore';
import type { CardType } from '@/app/zustand/useCardStore';

export default function CardTypesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const { cardTypes, isLoading, error, fetchCardTypes } = useCardStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCardTypes();
  }, []);
  const filteredCards = (cardTypes || []).filter((card) =>
    card?.name?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
    card?.description?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
    card?.tag?.toLowerCase()?.includes(searchQuery.toLowerCase())
  );

  const screenWidth = Dimensions.get('window').width;
  const numColumns = screenWidth > 768 ? 2 : 1;

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={theme === 'dark' ? '#fff' : '#000'} />
        <Text className={theme === 'dark' ? 'text-white' : 'text-black'}>Loading card types...</Text>
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

  return (
    <View className={`flex-1 ${theme === 'dark' ? 'bg-[#121212]' : 'bg-white'}`}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme === 'dark' ? '#121212' : '#ffffff'}
      />

      <View className="p-5">
        <Text className={`text-base ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>
          Choose from our range of cards designed to meet your specific needs.
        </Text>

        <View
          className={`mt-4 mb-2 flex-row items-center ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
          } rounded-lg px-4 py-2`}
        >
          <Feather name="search" size={20} color={theme === 'dark' ? '#9ca3af' : '#64748b'} />
          <TextInput
            className={`flex-1 ml-2 text-base ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
            placeholder="Search cards..."
            placeholderTextColor={theme === 'dark' ? '#9ca3af' : '#64748b'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {filteredCards.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            No cards found matching your search
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredCards}
          keyExtractor={(item) => item?._id || Math.random().toString()}
          numColumns={numColumns}
          contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
          columnWrapperStyle={numColumns > 1 ? { gap: 16 } : undefined}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          renderItem={({ item }) => (
            <Animated.View
              className={`flex-1 ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
              } rounded-2xl overflow-hidden border shadow-sm ${
                numColumns > 1 ? '' : 'mb-4'
              }`} 
            >
              <TouchableOpacity
                className="flex-1"
                onPress={() => router.push(`/(tabs)/(Carts)/${item?._id}`)}
              >
                <View className={`p-3 items-center justify-center ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'
                }`}>
                  <Image
                    source={{ uri: item?.imageUrl }}
                    style={{ width: '100%', height: 140 }}
                    resizeMode="contain"
                    defaultSource={require('@/assets/carts/CarteCCash.png')}
                  />
                </View>

                <View className="p-4">
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {item?.name || 'Unnamed Card'}
                    </Text>
                    {item?.tag && (
                      <View className={`px-2 py-1 ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'} rounded-full`}>
                        <Text className={`text-xs font-medium ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                          {item.tag}
                        </Text>
                      </View>
                    )}
                  </View>

                  <Text className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'} mb-3`} numberOfLines={2}>
                    {item?.description || 'No description available'}
                  </Text>

                  <View className="flex-row justify-between items-center">
                    <TouchableOpacity 
                      className="flex-row items-center" 
                      onPress={() => router.push(`/(tabs)/(Carts)/${item?._id}`)}
                    >
                      <Text className={`text-sm font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} mr-1`}>
                        Learn more
                      </Text>
                      <AntDesign name="right" size={12} color={theme === 'dark' ? '#60a5fa' : '#2563eb'} />
                    </TouchableOpacity>

                    <TouchableOpacity 
                      className="p-2 bg-blue-600 rounded-lg" 
                      onPress={() => router.push(`/(tabs)/(Carts)/apply/${item?._id}`)}
                    >
                      <Text className="text-md font-medium text-white">Apply Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}
        />
      )}
    </View>
  );
}