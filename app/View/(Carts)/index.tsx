

import React, { useState } from "react"
import { View, Text, Image, FlatList, TouchableOpacity, Dimensions, StatusBar, TextInput } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { AntDesign, Feather } from "@expo/vector-icons"
import Animated from "react-native-reanimated"
import { useRouter } from 'expo-router';
export default function CardTypesScreen() {
  const router=useRouter()
  const insets = useSafeAreaInsets()
  const [searchQuery, setSearchQuery] = useState("")
  
  // Card data
  const cards = [
    { 
      id: "1",
      image: require("@/assets/carts/CARTESTBTRAVEL.png"),
      name: "Carte STB Travel",
      description: "Voyagez serein….",
      tag: "International"
    },
    { 
      id: "2",
      image: require("@/assets/carts/CarteSTBEpargne.png"), 
      name: "Carte STB Epargne", 
      description: "La carte Epargne vous évite le déplacement à l'agence et vous permet de faire face à des dépenses urgentes.",
      tag: "Savings"
    },
    { 
      id: "3", 
      image: require("@/assets/carts/CARTEVISAELECTRONNATIONALE.png"), 
      name: "Carte Visa Electron Nationale", 
      description: "Vous êtes résidents en Tunisie et vous cherchez un moyen de paiement et de retrait qui vous convient ?….",
      tag: "National"
    },
    { 
      id: "4", 
      image: require("@/assets/carts/CARTECIB3.png"),
      name: "Carte CIB3", 
      description: "Vous souhaitez une solution de paiement et de retrait pratique et moderne ?",
      tag: "Premium"
    },
    { 
      id: "5",
      image: require("@/assets/carts/CarteCCash.png"), 
      name: "Carte C Cash", 
      description: "Plus besoin d'un compte bancaire pour avoir une carte",
      tag: "Prepaid"
    },
    { 
      id: "6", 
      image: require("@/assets/carts/CarteCPay.png"), 
      name: "Carte C Pay", 
      description: "A convenient payment card for online transactions.",
      tag: "Business"
    },
  ]

  const screenWidth = Dimensions.get("window").width
  const numColumns = screenWidth > 768 ? 2 : 1

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      

      <View className="p-5">
        <Text className="text-base text-slate-600">
          Choose from our range of cards designed to meet your specific needs.
        </Text>
        
        <View className="mt-4 mb-2 flex-row items-center bg-gray-100 rounded-lg px-4 py-2">
          <Feather name="search" size={20} color="#64748b" />
          <TextInput
            className="flex-1 ml-2 text-base text-slate-900"
            placeholder="Search cards..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        columnWrapperStyle={numColumns > 1 ? { gap: 16 } : null}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        renderItem={({ item }) => (
          <Animated.View 
            className={`flex-1 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm ${numColumns > 1 ? "" : "mb-4"}`}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 5,
              elevation: 2
            }}
          >
            <TouchableOpacity 
              className="flex-1"
              onPress={() => router.push(`/View/(Carts)/${item.id}`)}
            >
              <View className="p-3 items-center justify-center bg-blue-50">
                <Image 
                  source={item.image} 
                  style={{ width: "100%", height: 140 }}
                  resizeMode="contain"
                />
              </View>
              
              <View className="p-4">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-lg font-bold text-slate-900">{item.name}</Text>
                  <View className="px-2 py-1 bg-blue-100 rounded-full">
                    <Text className="text-xs font-medium text-blue-700">{item.tag}</Text>
                  </View>
                </View>
                
                <Text className="text-sm text-slate-600 mb-3" numberOfLines={2}>
                  {item.description}
                </Text>
                
                <View className="flex-row justify-between items-center">
                  <TouchableOpacity 
                    className="flex-row items-center"
                    onPress={() => router.push(`/View/(Carts)`)}
                  >
                    <Text className="text-sm font-medium text-blue-600 mr-1" >Learn more</Text>
                    <AntDesign name="right" size={12} color="#2563eb" />
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    className="p-2 bg-blue-600 rounded-lg"
                    
                  >
                    <Text className="text-md font-medium text-white">Apply Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}
      />
    </View>
  )
}
