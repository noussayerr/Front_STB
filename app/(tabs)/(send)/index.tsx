import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from "react-native"
import { useRouter } from 'expo-router';
import { CreditCard, Building2 } from "lucide-react-native"
import { useTheme } from "@/app/providers/ThemeProvider"

export default function SelectTransferMethod() {
  const router = useRouter();
  const { theme } = useTheme();
  
  return (
    <View className={`flex ${theme === "dark" ? "bg-[#121212]" : "bg-blue-600"} gap-10 items-center h-full`}>
      <StatusBar 
        barStyle={theme === "dark" ? "light-content" : "light-content"} 
        backgroundColor={theme === "dark" ? "#121212" : "#2563eb"} 
      />
      
      <View className="px-4 mt-10">
        <Text className="text-white text-2xl font-bold text-center">Transfer Money</Text>
        <Text className="text-white text-center mt-2 opacity-80">Choose your transfer method</Text>
      </View>
      
      <ScrollView className={`flex ${theme === "dark" ? "bg-gray-800" : "bg-white"} h-full rounded-3xl w-full px-4 p-14`}>
        <Text className={`text-xl font-semibold mb-6 ${theme === "dark" ? "text-white" : "text-blue-600"}`}>
          Select Transfer Method
        </Text>

        <TouchableOpacity
          className={`flex-row items-center p-4 ${theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"} border rounded-xl mb-4`}
          onPress={() => router.push(`/(tabs)/(send)/recipientInfo?method=card`)}
        >
          <View className={`w-12 h-12 rounded-full items-center justify-center ${theme === "dark" ? "bg-blue-900/30" : "bg-blue-100"}`}>
            <CreditCard size={24} color={theme === "dark" ? "#93c5fd" : "#2563eb"} />
          </View>
          <View className="ml-4">
            <Text className={`font-semibold text-lg ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
              Card Transfer
            </Text>
            <Text className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
              Transfer money using card details
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-row items-center p-4 ${theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"} border rounded-xl`}
          onPress={() => router.push(`/(tabs)/(send)/recipientInfo?method=bank`)}
        >
          <View className={`w-12 h-12 rounded-full items-center justify-center ${theme === "dark" ? "bg-blue-900/30" : "bg-blue-100"}`}>
            <Building2 size={24} color={theme === "dark" ? "#93c5fd" : "#2563eb"} />
          </View>
          <View className="ml-4">
            <Text className={`font-semibold text-lg ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
              Bank Transfer
            </Text>
            <Text className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
              Transfer using bank account details
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}