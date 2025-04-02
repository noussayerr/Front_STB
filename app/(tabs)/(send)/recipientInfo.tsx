import { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTheme } from "@/app/providers/ThemeProvider"

type Recipient = {
  name: string;
  accountNumber: string;
  avatar?: string;
};

export default function RecipientInfo() {
  const router = useRouter();
  const { theme } = useTheme();
  const { method } = useLocalSearchParams<{ method: "card" | "bank" }>();

  const [name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const handleContinue = () => {
    if (name && accountNumber) {
      const recipient: Recipient = {
        name,
        accountNumber,
        avatar: undefined,
      };

      router.push({
        pathname: "/(tabs)/(send)/transferAmount",
        params: {
          method,
          recipient: JSON.stringify(recipient),
        },
      });
    }
  };

  return (
    <SafeAreaView className={`flex-1 ${theme === "dark" ? "bg-[#121212]" : "bg-blue-600"}`}>
      
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        <View className="px-4 py-4 flex-row items-start mt-4 h-14 sm:h-28">
          <TouchableOpacity
            onPress={() => router.back()}
            className={`sm:w-10 sm:h-10 rounded-full items-center justify-center ${theme === "dark" ? "bg-gray-800" : "bg-blue-700"}`}
          >
            <ChevronLeft size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg sm:text-xl font-bold ml-4">
            {method === "card" ? "Card Transfer" : "Bank Transfer"}
          </Text>
        </View>

        <ScrollView className={`flex-1 ${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-t-3xl px-4 pt-4 sm:pt-6`}>
          <Text className={`text-md sm:text-xl font-semibold mb-4 sm:mb-6 ${theme === "dark" ? "text-white" : "text-black"}`}>
            Recipient Information
          </Text>

          <View className="mb-2 sm:mb-6">
            <Text className={`mb-2 text-sm sm:text-lg ${theme === "dark" ? "text-gray-300" : "text-black"}`}>
              Recipient Name
            </Text>
            <TextInput
              className={`rounded-xl p-2 sm:p-4 ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-50 border-gray-200 text-gray-800"} border`}
              placeholder="Enter recipient name"
              placeholderTextColor={theme === "dark" ? "#9ca3af" : "#9ca3af"}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View className="mb-4 sm:mb-8">
            <Text className={`mb-2 text-sm sm:text-lg ${theme === "dark" ? "text-gray-300" : "text-black"}`}>
              {method === "card" ? "Card Number" : "Bank Account Number"}
            </Text>
            <TextInput
              className={`rounded-xl p-2 sm:p-4 ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-50 border-gray-200 text-gray-800"} border`}
              placeholder={method === "card" ? "Enter card number" : "Enter account number"}
              placeholderTextColor={theme === "dark" ? "#9ca3af" : "#9ca3af"}
              value={accountNumber}
              onChangeText={setAccountNumber}
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity
            className={`p-2 sm:p-4 rounded-xl items-center ${name && accountNumber ? "bg-blue-600" : "bg-blue-300"}`}
            onPress={handleContinue}
            disabled={!name || !accountNumber}
          >
            <Text className="text-white font-semibold text-lg">Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}