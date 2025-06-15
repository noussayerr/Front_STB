import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/app/providers/ThemeProvider";
import { useAccountStore } from "@/app/zustand/useAccountStore";

export default function SelectAccount() {
  const router = useRouter();
  const { theme } = useTheme();
  const { accounts, fetchUserAccounts, isLoading } = useAccountStore();
  const [selectedAccount , setSelectedAccount] = useState<any>(null);

  useEffect(() => {
    fetchUserAccounts();
  }, []);

  const handleContinue = () => {
    if (selectedAccount) {
      router.push({
        pathname: "/(tabs)/(send)/recipientInfo",
        params: {
          senderAccount: JSON.stringify(selectedAccount)
        }
      });
    }
  };

  return (
    <SafeAreaView className={`flex-1 ${theme === "dark" ? "bg-[#121212]" : "bg-blue-600"}`}>
      <View className="px-4 py-4 flex-row items-start mt-4 h-14 sm:h-28">
        <TouchableOpacity
          onPress={() => router.back()}
          className={`sm:w-10 sm:h-10 rounded-full items-center justify-center ${theme === "dark" ? "bg-gray-800" : "bg-blue-700"}`}
        >
          <ChevronLeft size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-lg sm:text-xl font-bold ml-4">
          Select Your Account
        </Text>
      </View>

      <ScrollView className={`flex-1 ${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-t-3xl px-4 pt-4 sm:pt-6`}>
        <Text className={`text-md sm:text-xl font-semibold mb-4 sm:mb-6 ${theme === "dark" ? "text-white" : "text-black"}`}>
          Your Accounts
        </Text>

        {isLoading ? (
          <ActivityIndicator size="large" color={theme === "dark" ? "#fff" : "#2563eb"} />
        ) : (
          accounts.map((account :any) => (
            <TouchableOpacity
              key={account.id}
              className={`p-4 mb-4 rounded-xl ${theme === "dark" ? "bg-gray-700" : "bg-gray-50"} ${
                selectedAccount?.id === account.id ? "border-2 border-blue-500" : "border border-gray-300"
              }`}
              onPress={() => setSelectedAccount(account)}
            >
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className={`font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>
                    {account.accountType.name}
                  </Text>
                  <Text className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                    {account.accountNumber}
                  </Text>
                </View>
                <Text className={`font-bold ${theme === "dark" ? "text-white" : "text-black"}`}>
                  {account.balance} DT
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}

        <TouchableOpacity
          className={`p-4 rounded-xl items-center ${selectedAccount ? "bg-blue-600" : "bg-blue-300"} mb-8`}
          onPress={handleContinue}
          disabled={!selectedAccount}
        >
          <Text className="text-white font-semibold text-lg">Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}