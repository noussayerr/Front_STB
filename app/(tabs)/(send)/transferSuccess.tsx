import { View, Text, TouchableOpacity, SafeAreaView, Image, Share } from "react-native";
import { ChevronLeft, Share2, Check } from "lucide-react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTheme } from "@/app/providers/ThemeProvider"

type Recipient = {
  name: string;
  accountNumber: string;
};

export default function TransferSuccess() {
  const router = useRouter();
  const { theme } = useTheme();
  const { amount, recipient, reference } = useLocalSearchParams<{
    amount: string;
    recipient: string;
    reference: string;
  }>();

  const parsedRecipient: Recipient = JSON.parse(recipient);
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString("default", { month: "short" })} ${currentDate.getFullYear()}, ${currentDate.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}`;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `I've sent ${amount} DT to ${parsedRecipient.name}. Reference: ${reference}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDone = () => {
    router.push("/(tabs)/home");
  };

  return (
    <SafeAreaView className={`flex-1 ${theme === "dark" ? "bg-[#121212]" : "bg-blue-600"}`}>
      <View className="px-4 py-4 flex-row gap-2 items-start h-28">
        <TouchableOpacity
          onPress={() => router.back()}
          className={`w-10 h-10 rounded-full items-center justify-center ${theme === "dark" ? "bg-gray-800" : "bg-blue-700"}`}
        >
          <ChevronLeft size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">Receipt</Text>
      </View>

      <View className={`flex-1 ${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-t-3xl px-4 pt-6`}>
        <View className="items-center mb-6">
          <View className="w-16 h-16 bg-green-100 rounded-full items-center justify-center mb-4">
            <Check size={32} color="#10B981" />
          </View>
          <Text className={`text-xl font-bold mb-1 ${theme === "dark" ? "text-white" : "text-black"}`}>
            Transfer Successful!
          </Text>
          <Text className={`text-center ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
            Your money has been transferred successfully!
          </Text>
        </View>

        <View className={`border-t ${theme === "dark" ? "border-gray-700" : "border-gray-100"} py-4`}>
          <View className="flex-row justify-between items-center">
            <Text className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>Transfer Amount</Text>
            <Text className={theme === "dark" ? "text-white font-bold" : "text-gray-900 font-bold"}>
              {amount} DT
            </Text>
          </View>
        </View>

        <View className={`border ${theme === "dark" ? "border-gray-700" : "border-gray-100"} rounded-xl p-4 mb-4`}>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className={`w-10 h-10 rounded-full items-center justify-center ${theme === "dark" ? "bg-gray-600" : "bg-gray-200"}`}>
                <Text className={theme === "dark" ? "text-gray-300 font-bold" : "text-gray-500 font-bold"}>
                  {parsedRecipient.name.charAt(0)}
                </Text>
              </View>
              <View className="ml-3">
                <Text className={theme === "dark" ? "text-white font-semibold" : "text-gray-800 font-semibold"}>
                  {parsedRecipient.name}
                </Text>
                <Text className={theme === "dark" ? "text-gray-400 text-sm" : "text-gray-500 text-sm"}>
                  Account - {parsedRecipient.accountNumber}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className={`border-t ${theme === "dark" ? "border-gray-700" : "border-gray-100"} py-4`}>
          <View className="flex-row justify-between items-center mb-4">
            <Text className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>Date & time</Text>
            <Text className={theme === "dark" ? "text-white" : "text-gray-900"}>{formattedDate}</Text>
          </View>

          <View className="flex-row justify-between items-center">
            <Text className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>Reference Number</Text>
            <Text className={theme === "dark" ? "text-white" : "text-gray-900"}>{reference}</Text>
          </View>
        </View>
        
        <View className="flex-row justify-center my-6">
          <TouchableOpacity 
            className="flex-row items-center p-3 rounded-full bg-blue-50"
            onPress={handleShare}
          >
            <Share2 size={20} color="#2563eb" />
            <Text className="text-blue-600 ml-2 font-medium">Share Receipt</Text>
          </TouchableOpacity>
        </View>
        
        <View className="absolute bottom-20 left-0 right-0">
          <TouchableOpacity 
            className="w-full py-4 bg-blue-600 rounded-xl items-center" 
            onPress={handleDone}
          >
            <Text className="text-white font-semibold text-lg">Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}