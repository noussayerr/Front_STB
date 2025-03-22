import { View, Text, TouchableOpacity, SafeAreaView, Image, Share } from "react-native";
import { ChevronLeft, Share2, ChevronDown, Check } from "lucide-react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

type Recipient = {
  name: string;
  accountNumber: string;
  avatar?: string;
};

export default function TransferSuccess() {
  const router = useRouter();
  const { amount, recipient } = useLocalSearchParams<{
    amount: string;
    recipient: string;
  }>();

  const parsedRecipient: Recipient = JSON.parse(recipient);
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString("default", { month: "short" })} ${currentDate.getFullYear()}, ${currentDate.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}`;

  const referenceNumber = Math.floor(Math.random() * 10000000000000).toString();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `I've sent $${amount} to ${parsedRecipient.name}. Reference: ${referenceNumber}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDone = () => {
    router.push("/");
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-600 rounded-2xl">
      <View className="px-4 py-4 flex-row gap-2 items-start h-28">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 bg-blue-700 rounded-full items-center justify-center"
        >
          <ChevronLeft size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">Receipt</Text>
        
      </View>

      <View className="flex-1 bg-white rounded-t-3xl px-4 pt-6">
        <View className="items-center mb-6">
          <View className="w-16 h-16 bg-green-100 rounded-full items-center justify-center mb-4">
            <Check size={32} color="#10B981" />
          </View>
          <Text className="text-xl font-bold mb-1">Transfer Successful!</Text>
          <Text className="text-gray-500 text-center">Your money has been transferred successfully!</Text>
        </View>

        <View className="border-t border-gray-100 py-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-500">Transfer Amount</Text>
            <Text className="text-gray-900 font-bold">${amount}</Text>
          </View>
        </View>

        <View className="border border-gray-100 rounded-xl p-4 mb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              {parsedRecipient.avatar ? (
                <Image source={{ uri: parsedRecipient.avatar }} className="w-10 h-10 rounded-full" />
              ) : (
                <View className="w-10 h-10 bg-gray-200 rounded-full items-center justify-center">
                  <Text className="text-gray-500 font-bold">{parsedRecipient.name.charAt(0)}</Text>
                </View>
              )}
              <View className="ml-3">
                <Text className="text-gray-800 font-semibold">{parsedRecipient.name}</Text>
                <Text className="text-gray-500 text-sm">Bank - {parsedRecipient.accountNumber}</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="border-t border-gray-100 py-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-gray-500">Date & time</Text>
            <Text className="text-gray-900">{formattedDate}</Text>
          </View>

          <View className="flex-row justify-between items-center">
            <Text className="text-gray-500">No. Ref</Text>
            <Text className="text-gray-900">{referenceNumber}</Text>
          </View>
        </View>
        <View className="absolute bottom-20 left-0 right-0">
          <TouchableOpacity className="w-full py-4 bg-blue-600 rounded-xl items-center" onPress={handleDone}>
            <Text className="text-white font-semibold text-lg">Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}