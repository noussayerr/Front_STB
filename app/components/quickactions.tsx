import { View, Text ,TouchableOpacity} from 'react-native'
import React from 'react'
import { FontAwesome6, MaterialCommunityIcons, Feather } from "@expo/vector-icons"
import { router } from 'expo-router'
const Quickactions = () => {
  return (
    <View className="flex-row justify-between px-5 mb-7">
          <TouchableOpacity className="items-center w-[30%]" onPress={() => router.push('/View/(Carts)')}>
            <View className="w-[50px] h-[50px] rounded-2xl bg-indigo-100 justify-center items-center mb-2">
              <FontAwesome6 name="credit-card" size={20} color="#2563eb" />
            </View>
            <Text className="text-xs text-slate-600 text-center">Card Details</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center w-[30%]">
            <View className="w-[50px] h-[50px] rounded-2xl bg-indigo-100 justify-center items-center mb-2">
              <Feather name="lock" size={20} color="#2563eb" />
            </View>
            <Text className="text-xs text-slate-600 text-center">Block Card</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center w-[30%]">
            <View className="w-[50px] h-[50px] rounded-2xl bg-indigo-100 justify-center items-center mb-2">
              <MaterialCommunityIcons name="contactless-payment" size={20} color="#2563eb" />
            </View>
            <Text className="text-xs text-slate-600 text-center">Contactless</Text>
          </TouchableOpacity>
        </View>
  )
}

export default Quickactions