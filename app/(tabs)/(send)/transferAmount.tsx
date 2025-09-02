import { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, Image, StyleSheet, Modal, Alert } from "react-native";
import { ChevronLeft, Delete, X } from "lucide-react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTheme } from "@/app/providers/ThemeProvider";
import axios from "axios";

type Recipient = {
  name: string;
  accountNumber: string;
};

type SenderAccount = {
  id: string;
  accountNumber: string;
  balance: number;
  accountType: {
    name: string;
  };
};

export default function TransferAmount() {
  const router = useRouter();
  const { theme } = useTheme();
  const { recipient, senderAccount } = useLocalSearchParams<{
    recipient: string;
    senderAccount: string;
  }>();

  const parsedRecipient: Recipient = JSON.parse(recipient);
  const parsedSenderAccount: SenderAccount = JSON.parse(senderAccount);
  const [amount, setAmount] = useState("0");
  const [pinModalVisible, setPinModalVisible] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

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
    const amountNum = parseFloat(amount);
    if (amountNum > parsedSenderAccount.balance) {
      Alert.alert("Insufficient Funds", "You don't have enough balance for this transfer");
      return;
    }
    setPinModalVisible(true);
  };

  const handlePinNumberPress = (num: string) => {
    if (pin.length < 4) {
      setPin(pin + num);
    }
  };

  const handlePinDelete = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
    }
  };

  const handlePinSubmit = async () => {
    if (pin.length !== 4) {
      setPinError("PIN must be 4 digits");
      return;
    }

    setIsProcessing(true);
    
    try {
      const response = await axios.post("https://backend-stb.onrender.com/api/transactions/transfer", {
        senderAccountId: parsedSenderAccount.id,
        recipientAccountNumber: parsedRecipient.accountNumber,
        amount: parseFloat(amount),
        description: `Transfer to ${parsedRecipient.name}`
      });

      if (response.data.message === "Transfer successful") {
        router.push({
          pathname: "/(tabs)/(send)/transferSuccess",
          params: {
            amount,
            recipient: JSON.stringify(parsedRecipient),
            reference: response.data.transaction.reference
          },
        });
      }
    } catch (error: any) {
      console.error("Transfer error:", error);
      setPinError(error?.response?.data?.message || "Transfer failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <SafeAreaView className={`flex-1 ${theme === "dark" ? "bg-[#121212]" : "bg-blue-600"}`}>
      <View className="px-4 py-4 flex-row items-start mt-4 h-28">
        <TouchableOpacity
          onPress={() => router.back()}
          className={`w-10 h-10 rounded-full items-center justify-center ${theme === "dark" ? "bg-gray-800" : "bg-blue-700"}`}
        >
          <ChevronLeft size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-4">Transfer Amount</Text>
      </View>

      <View className={`flex-1 ${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-t-3xl px-4 pt-6 items-center`}>
        <View className={`w-full rounded-xl p-4 flex-row items-center justify-between mb-4 ${theme === "dark" ? "bg-gray-700" : "bg-gray-50"}`}>
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

        <Text className={`text-4xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
          {amount} DT
        </Text>

        <View style={styles.numberPad}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <TouchableOpacity
              key={num}
              style={styles.numberButton}
              onPress={() => handleNumberPress(num.toString())}
            >
              <Text className={`text-2xl ${theme === "dark" ? "text-white" : "text-gray-800"}`}>{num}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.numberButton} onPress={handleDot}>
            <Text className={`text-2xl ${theme === "dark" ? "text-white" : "text-gray-800"}`}>.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberPress("0")}>
            <Text className={`text-2xl ${theme === "dark" ? "text-white" : "text-gray-800"}`}>0</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.numberButton} onPress={handleDelete}>
            <Delete size={24} color={theme === "dark" ? "#9ca3af" : "#4B5563"} />
          </TouchableOpacity>
        </View>

        <View className="w-full absolute bottom-20">
          <TouchableOpacity 
            className={`w-full py-4 rounded-xl items-center ${amount === "0" ? "bg-blue-300" : "bg-blue-600"}`} 
            onPress={handleContinue}
            disabled={amount === "0"}
          >
            <Text className="text-white font-semibold text-lg">
              {isProcessing ? "Processing..." : "Continue"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* PIN Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={pinModalVisible}
        onRequestClose={() => {
          setPinModalVisible(false);
          setPin("");
          setPinError("");
        }}
      >
        <View className="flex-1 justify-end">
          <View className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-t-3xl p-6 h-2/3`}>
            <View className="flex-row justify-between items-center mb-6">
              <Text className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Enter PIN
              </Text>
              <TouchableOpacity 
                onPress={() => {
                  setPinModalVisible(false);
                  setPin("");
                  setPinError("");
                }}
                className={`w-8 h-8 rounded-full items-center justify-center ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}
              >
                <X size={20} color={theme === "dark" ? "#fff" : "#000"} />
              </TouchableOpacity>
            </View>
            
            <Text className={`text-center mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              Please enter your PIN to confirm the transfer of {amount} DT
            </Text>
            
            {pinError ? (
              <Text className="text-red-500 text-center mb-4">{pinError}</Text>
            ) : null}
            
            <View className="flex-row justify-center space-x-4 mb-8">
              {[0, 1, 2, 3].map((index) => (
                <View 
                  key={index} 
                  className={`w-4 h-4 rounded-full ${
                    pin.length > index 
                      ? "bg-blue-600" 
                      : theme === "dark" 
                        ? "border border-gray-500" 
                        : "border border-gray-300"
                  }`} 
                />
              ))}
            </View>
            
            <View style={styles.pinPad}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <TouchableOpacity
                  key={num}
                  style={styles.pinButton}
                  onPress={() => handlePinNumberPress(num.toString())}
                >
                  <Text className={`text-2xl ${theme === "dark" ? "text-white" : "text-gray-800"}`}>{num}</Text>
                </TouchableOpacity>
              ))}
              
              <View style={styles.pinButton} />
              
              <TouchableOpacity
                style={styles.pinButton}
                onPress={() => handlePinNumberPress("0")}
              >
                <Text className={`text-2xl ${theme === "dark" ? "text-white" : "text-gray-800"}`}>0</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.pinButton}
                onPress={handlePinDelete}
              >
                <Delete size={24} color={theme === "dark" ? "#9ca3af" : "#4B5563"} />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              className={`w-full py-4 rounded-xl items-center mt-6 ${
                pin.length === 4 ? "bg-blue-600" : theme === "dark" ? "bg-gray-700" : "bg-gray-200"
              }`} 
              onPress={handlePinSubmit}
              disabled={pin.length !== 4 || isProcessing}
            >
              <Text className={`font-semibold text-lg ${
                pin.length === 4 ? "text-white" : theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}>
                {isProcessing ? "Processing..." : "Confirm Transfer"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  numberPad: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
  },
  numberButton: {
    width: "30%",
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  pinPad: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  pinButton: {
    width: "33%",
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
});