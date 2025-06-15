import { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTheme } from "@/app/providers/ThemeProvider"

type RecipientInfoParams = {
  senderAccount: string;
};

export default function RecipientInfo() {
  const router = useRouter();
  const { theme } = useTheme();
  const params = useLocalSearchParams<RecipientInfoParams>();
  const senderAccount = JSON.parse(params.senderAccount);

  const [name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const handleContinue = () => {
    if (name && accountNumber) {
      router.push({
        pathname: "/(tabs)/(send)/transferAmount",
        params: {
          senderAccount: JSON.stringify(senderAccount),
          recipient: JSON.stringify({
            name,
            accountNumber
          }),
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
            Recipient Information
          </Text>
        </View>

        <ScrollView className={`flex-1 ${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-t-3xl px-4 pt-4 sm:pt-6`}>
          <View className="mb-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
            <Text className="text-blue-800 font-semibold">From Account</Text>
            <Text className="text-blue-900">{senderAccount.accountNumber}</Text>
            <Text className="text-blue-800">Balance: {senderAccount.balance} DT</Text>
          </View>

          <Text className={`text-md sm:text-xl font-semibold mb-4 sm:mb-6 ${theme === "dark" ? "text-white" : "text-black"}`}>
            Recipient Details
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
              Bank Account Number
            </Text>
            <TextInput
              className={`rounded-xl p-2 sm:p-4 ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-50 border-gray-200 text-gray-800"} border`}
              placeholder="Enter account number"
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