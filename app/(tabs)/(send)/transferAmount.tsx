import { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, Image, StyleSheet } from "react-native";
import { ChevronLeft, ChevronDown, Delete } from "lucide-react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

type Recipient = {
  name: string;
  accountNumber: string;
  avatar?: string;
};

export default function TransferAmount() {
  const router = useRouter();
  const { recipient, method } = useLocalSearchParams<{
    recipient: string;
    method: "card" | "bank";
  }>();

  const parsedRecipient: Recipient = JSON.parse(recipient);
  const [amount, setAmount] = useState("0");

  const handleNumberPress = (num: string) => {
    if (amount === "0") {
      setAmount(num);
    } else {
      setAmount(amount + num);
    }
  };

  const handleDelete = () => {
    if (amount.length > 1) {
      setAmount(amount.slice(0, -1));
    } else {
      setAmount("0");
    }
  };

  const handleDot = () => {
    if (!amount.includes(".")) {
      setAmount(amount + ".");
    }
  };

  const handleContinue = () => {
    router.push({
      pathname: "/(tabs)/(send)/transferSuccess",
      params: {
        amount,
        recipient: JSON.stringify(parsedRecipient),
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-600 rounded-2xl">
      <View className="px-4 py-4 flex-row items-start mt-4 h-28">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 bg-blue-700 rounded-full items-center justify-center"
        >
          <ChevronLeft size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-4">Send Money</Text>
      </View>

      <View className="flex-1 bg-white rounded-t-3xl px-4 pt-6 items-center ">
        <View className="w-full bg-gray-50 rounded-xl p-4  flex-row items-center justify-between mb-4">
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
              <Text className="text-gray-500 text-sm">
                {method === "bank" ? "Bank" : "Card"} - {parsedRecipient.accountNumber}
              </Text>
            </View>
          </View>
          
        </View>

        <Text className="text-4xl font-bold mb-4">${amount}</Text>

        {/* Replace grid with Flexbox */}
        <View style={styles.numberPad}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <TouchableOpacity
              key={num}
              style={styles.numberButton}
              onPress={() => handleNumberPress(num.toString())}
            >
              <Text className="text-2xl text-gray-800">{num}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.numberButton} onPress={handleDot}>
            <Text className="text-2xl text-gray-800">.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberPress("0")}>
            <Text className="text-2xl text-gray-800">0</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.numberButton} onPress={handleDelete}>
            <Delete size={24} color="#4B5563" />
          </TouchableOpacity>
        </View>

        <View className="w-full absolute bottom-20">
          <TouchableOpacity className="w-full py-4 bg-blue-600 rounded-xl items-center" onPress={handleContinue}>
            <Text className="text-white font-semibold text-lg">Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Add styles for the number pad
const styles = StyleSheet.create({
  numberPad: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
  },
  numberButton: {
    width: "30%", // Adjust based on your design
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
});