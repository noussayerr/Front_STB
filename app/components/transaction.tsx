import { View, Text, TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native';
import React, { useState } from 'react';
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { useTheme } from '../providers/ThemeProvider';

// Define types for the transaction data
type TransactionType = {
  id: string;
  title: string;
  date: string;
  amount: string;
  isIncoming: boolean;
  icon: keyof typeof FontAwesome6.glyphMap;
};

const Transaction = () => {
  const { theme } = useTheme();
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionType | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const transactions: TransactionType[] = [
    {
      id: "1",
      title: "Receive Transfer from Ahmed",
      date: "10 Jan 2025",
      amount: "100 DT",
      isIncoming: true,
      icon: "money-bill-transfer",
    },
    {
      id: "2",
      title: "Transfer to Sarah",
      date: "10 Jan 2025",
      amount: "100 DT",
      isIncoming: false,
      icon: "money-bill-transfer",
    },
    {
      id: "3",
      title: "Coffee Shop",
      date: "9 Jan 2025",
      amount: "15 DT",
      isIncoming: false,
      icon: "mug-hot",
    },
    {
      id: "4",
      title: "Salary Deposit",
      date: "1 Jan 2025",
      amount: "2,500 DT",
      isIncoming: true,
      icon: "building-columns",
    },
  ];

  const handleTransactionPress = (transaction: TransactionType) => {
    setSelectedTransaction(transaction);
    setModalVisible(true);
  };

  return (
    <ScrollView style={{ backgroundColor: theme === "dark" ? "#121212" : "white" }}>
      <View className="flex-row justify-between items-center px-5 py-3">
        <Text className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
          Transactions
        </Text>
        <TouchableOpacity className="flex-row items-center gap-1">
          <Text className={`text-blue-600 font-medium ${theme === "dark" ? "text-white" : "text-blue-600"}`}>
            ALL
          </Text>
          <AntDesign name="down" size={12} color={theme === "dark" ? "white" : "#2563eb"} />
        </TouchableOpacity>
      </View>

      <View className="px-5">
        {transactions.map((transaction) => (
          <TouchableOpacity 
            key={transaction.id}
            onPress={() => handleTransactionPress(transaction)}
            activeOpacity={0.7}
          >
            <View
              className={`flex-row items-center p-4 rounded-2xl mb-2.5 shadow-sm ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
            >
              <View
                className="w-[45px] h-[45px] rounded-xl justify-center items-center mr-3.5"
                style={{ backgroundColor: theme === "dark" ? "#3e3e3e" : "#e0e7ff" }}
              >
                <FontAwesome6 
                  name={transaction.icon} 
                  size={20} 
                  color={theme === "dark" ? "white" : "#2563eb"} 
                />
              </View>
              <View className="flex-1">
                <Text className={`text-base font-medium ${theme === "dark" ? "text-white" : "text-slate-900"} mb-1`}>
                  {transaction.title}
                </Text>
                <Text className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>
                  {transaction.date}
                </Text>
              </View>
              <Text
                className={`text-base font-semibold ${
                  transaction.isIncoming 
                    ? (theme === "dark" ? "text-emerald-400" : "text-emerald-500") 
                    : (theme === "dark" ? "text-red-400" : "text-red-500")
                }`}
              >
                {transaction.isIncoming ? "+" : "-"}
                {transaction.amount}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Transaction Detail Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className={`m-5 rounded-2xl p-5 w-[90%] ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
            {selectedTransaction && (
              <>
                <View className="flex-row justify-between items-center mb-5">
                  <Text className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    Transaction Details
                  </Text>
                  <Pressable
                    onPress={() => setModalVisible(false)}
                    hitSlop={10}
                  >
                    <AntDesign name="close" size={24} color={theme === "dark" ? "white" : "gray"} />
                  </Pressable>
                </View>

                <View className="items-center mb-6">
                  <View
                    className="w-[60px] h-[60px] rounded-xl justify-center items-center mb-4"
                    style={{ backgroundColor: theme === "dark" ? "#3e3e3e" : "#e0e7ff" }}
                  >
                    <FontAwesome6 
                      name={selectedTransaction.icon} 
                      size={28} 
                      color={theme === "dark" ? "white" : "#2563eb"} 
                    />
                  </View>
                  <Text className={`text-2xl font-bold mb-1 ${
                    selectedTransaction.isIncoming 
                      ? (theme === "dark" ? "text-emerald-400" : "text-emerald-500") 
                      : (theme === "dark" ? "text-red-400" : "text-red-500")
                  }`}>
                    {selectedTransaction.isIncoming ? "+" : "-"}
                    {selectedTransaction.amount}
                  </Text>
                  <Text className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-slate-600"}`}>
                    {selectedTransaction.title}
                  </Text>
                </View>

                <View className="border-t border-gray-300 pt-4">
                  <View className="flex-row justify-between mb-3">
                    <Text className={`${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>Date</Text>
                    <Text className={`${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                      {selectedTransaction.date}
                    </Text>
                  </View>
                  <View className="flex-row justify-between mb-3">
                    <Text className={`${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>Type</Text>
                    <Text className={`${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                      {selectedTransaction.isIncoming ? "Incoming" : "Outgoing"}
                    </Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className={`${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>Status</Text>
                    <Text className="text-green-500">Completed</Text>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Transaction;