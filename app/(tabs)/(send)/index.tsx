import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from "react-native"
import  { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useRouter } from 'expo-router';
import { CreditCard, Building2 } from "lucide-react-native"

export default function SelectTransferMethod() {
  const router = useRouter();
  return (
    <View className="flex bg-blue-600 gap-10 items-center h-full">
      <View className="px-4 mt-10">
        <Text className="text-white text-2xl font-bold text-center">Transfer Money</Text>
        <Text className="text-white text-center mt-2 opacity-80">Choose your transfer method</Text>
      </View>
      
      <ScrollView className="flex  bg-white h-full rounded-3xl w-full px-4 p-14">
        <Text className="text-blue-600 text-xl font-semibold mb-6">Select Transfer Method</Text>

        <TouchableOpacity
          className="flex-row items-center p-4 bg-white border border-gray-200 rounded-xl mb-4 shadow-sm"
          onPress={() => router.push(`/(tabs)/(send)/recipientInfo?method=card`)}
        >
          <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center">
            <CreditCard size={24} color="#2563eb" />
          </View>
          <View className="ml-4">
            <Text className="text-gray-800 font-semibold text-lg">Card Transfer</Text>
            <Text className="text-gray-500">Transfer money using card details</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center p-4 bg-white border border-gray-200 rounded-xl shadow-sm"
          onPress={() => router.push(`/(tabs)/(send)/recipientInfo?method=bank`)}
        >
          <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center">
            <Building2 size={24} color="#2563eb" />
          </View>
          <View className="ml-4">
            <Text className="text-gray-800 font-semibold text-lg">Bank Transfer</Text>
            <Text className="text-gray-500">Transfer using bank account details</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

