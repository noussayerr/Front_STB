import { View, Text,TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { AntDesign, FontAwesome6} from "@expo/vector-icons"
const Transaction = () => {
    const transactions = [
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
        
      ]
    
  return (
    <ScrollView>
      
      <View className="flex-row justify-between items-center px-5">
          <Text className="text-lg font-semibold text-slate-900">Transactions</Text>
          <TouchableOpacity className="flex-row items-center gap-1">
            <Text className="text-blue-600 font-medium">ALL</Text>
            <AntDesign name="down" size={12} color="#2563eb" />
          </TouchableOpacity>
        </View>

        <View className="px-5">
          {transactions.map((transaction) => (
            <View key={transaction.id} className="flex-row items-center bg-white p-4 rounded-2xl mb-2.5 shadow-sm">
              <View className="w-[45px] h-[45px] rounded-xl bg-indigo-100 justify-center items-center mr-3.5">
                <FontAwesome6 name={transaction.icon as any} size={20} color="#2563eb" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium text-slate-900 mb-1">{transaction.title}</Text>
                <Text className="text-xs text-slate-500">{transaction.date}</Text>
              </View>
              <Text
                className={`text-base font-semibold ${transaction.isIncoming ? "text-emerald-500" : "text-red-500"}`}
              >
                {transaction.isIncoming ? "+" : "-"}
                {transaction.amount}
              </Text>
            </View>
          ))}
        </View>
    </ScrollView>
  )
}

export default Transaction