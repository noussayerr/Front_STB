import * as React from "react"
import { View, Text, TouchableOpacity, ScrollView, StatusBar, ActivityIndicator } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { AntDesign, MaterialIcons, Feather, Ionicons } from "@expo/vector-icons"
import Animated, { FadeInDown } from "react-native-reanimated"
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useTheme } from "@/app/providers/ThemeProvider"
import { useAccountStore } from "@/app/zustand/useAccountStore"

export default function AccountDetailsScreen() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = React.useState("transactions")
  const insets = useSafeAreaInsets()
  const { accounts, isLoading } = useAccountStore()

  // Parse the account from params or find it in the store
  const accountFromParams = params.account ? JSON.parse(params.account as string) : null;
  const account = accountFromParams || accounts.find(acc => acc.id === params.id);

  const transactions = [
    {
      id: "1",
      title: "Grocery Store",
      date: "Today, 10:45 AM",
      amount: "-120.50",
      type: "expense",
      category: "Shopping",
      icon: "cart",
    },
    {
      id: "2",
      title: "Salary Deposit",
      date: "Yesterday, 09:30 AM",
      amount: "+2,500.00",
      type: "income",
      category: "Salary",
      icon: "cash",
    },
    {
      id: "3",
      title: "Restaurant Payment",
      date: "Mar 15, 2023, 08:15 PM",
      amount: "-85.75",
      type: "expense",
      category: "Food",
      icon: "restaurant",
    },
  ]

  const statements = [
    {
      id: "1",
      month: "March 2023",
      date: "01/03/2023 - 31/03/2023",
      size: "1.2 MB",
    },
    {
      id: "2",
      month: "February 2023",
      date: "01/02/2023 - 28/02/2023",
      size: "1.1 MB",
    },
  ]

  const getAccountColor = () => {
    if (!account) return "#2563eb";
    if (account.type === "current") return "#2563eb"
    if (account.type === "savings") return "#16a34a"
    return "#9333ea"
  }

  if (isLoading || !account) {
    return (
      <View className={`flex-1 justify-center items-center ${theme === "dark" ? "bg-[#121212]" : "bg-white"}`}>
        <ActivityIndicator size="large" color={theme === "dark" ? "#fff" : "#000"} />
      </View>
    );
  }

  return (
    <View className={`flex-1 ${theme === "dark" ? "bg-[#121212]" : "bg-white"}`}>
      <StatusBar 
        barStyle={theme === "dark" ? "light-content" : "dark-content"} 
        backgroundColor={theme === "dark" ? "#121212" : "#ffffff"} 
      />

      <View className={`px-5 py-4 flex-row items-center justify-between border-b ${theme === "dark" ? "border-gray-800" : "border-gray-100"}`}>
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color={theme === "dark" ? "#f8fafc" : "#0f172a"} />
        </TouchableOpacity>
        <Text className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
          Account Details
        </Text>
        <TouchableOpacity>
          <Feather name="more-vertical" size={24} color={theme === "dark" ? "#f8fafc" : "#0f172a"} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-5">
          <View
            className={`p-5 rounded-2xl mb-5 ${
              account.type === "current" ? "bg-blue-600" : account.type === "savings" ? "bg-green-600" : "bg-purple-600"
            }`}
            style={{
              shadowColor: getAccountColor(),
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: theme === "dark" ? 0 : 0.3,
              shadowRadius: 20,
              elevation: theme === "dark" ? 0 : 5,
            }}
          >
            <View className="flex-row justify-between items-center mb-4">
              <View>
                <Text className="text-white text-lg font-bold">{account.accountType.name}</Text>
                <Text className="text-white/80 text-sm">{account.accountNumber}</Text>
              </View>
              <MaterialIcons
                name={
                  account.type === "current" ? "account-balance" : account.type === "savings" ? "savings" : "business"
                }
                size={28}
                color="white"
              />
            </View>

            <View>
              <Text className="text-white/80 text-sm">Available Balance</Text>
              <Text className="text-white text-3xl font-bold mt-1">
                {account.balance.toFixed(2)} {account.currency}
              </Text>
            </View>
          </View>

          <View className={`flex-row border-b ${theme === "dark" ? "border-gray-800" : "border-gray-200"} mb-4`}>
            <TouchableOpacity
              className={`flex-1 py-3 ${activeTab === "transactions" ? "border-b-2" : ""}`}
              style={activeTab === "transactions" ? { borderColor: getAccountColor() } : {}}
              onPress={() => setActiveTab("transactions")}
            >
              <Text
                className={`text-center font-medium ${
                  activeTab === "transactions" 
                    ? theme === "dark" ? "text-blue-400" : "text-blue-600" 
                    : theme === "dark" ? "text-gray-400" : "text-slate-500"
                }`}
              >
                Transactions
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 py-3 ${activeTab === "statements" ? "border-b-2" : ""}`}
              style={activeTab === "statements" ? { borderColor: getAccountColor() } : {}}
              onPress={() => setActiveTab("statements")}
            >
              <Text
                className={`text-center font-medium ${
                  activeTab === "statements" 
                    ? theme === "dark" ? "text-blue-400" : "text-blue-600" 
                    : theme === "dark" ? "text-gray-400" : "text-slate-500"
                }`}
              >
                Statements
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === "transactions" ? (
            <View>
              <Text className={`text-base font-medium mb-3 ${theme === "dark" ? "text-gray-300" : "text-slate-500"}`}>
                Recent Transactions
              </Text>

              {transactions?.map((transaction, index) => (
                <Animated.View key={transaction.id} >
                  <TouchableOpacity
                    className={`flex-row justify-between items-center py-3 border-b ${theme === "dark" ? "border-gray-800" : "border-gray-100"}`}
                  >
                    <View className="flex-row items-center">
                      <View
                        className={`w-10 h-10 rounded-full items-center justify-center ${
                          transaction.type === "expense" 
                            ? theme === "dark" ? "bg-red-900/30" : "bg-red-100" 
                            : theme === "dark" ? "bg-green-900/30" : "bg-green-100"
                        }`}
                      >
                        <Ionicons
                          name={transaction.icon as any}
                          size={18}
                          color={transaction.type === "expense" 
                            ? theme === "dark" ? "#fca5a5" : "#ef4444" 
                            : theme === "dark" ? "#86efac" : "#16a34a"
                          }
                        />
                      </View>
                      <View className="ml-3">
                        <Text className={`text-base font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                          {transaction.title}
                        </Text>
                        <Text className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>
                          {transaction.date}
                        </Text>
                      </View>
                    </View>
                    <Text
                      className={`text-base font-bold ${
                        transaction.type === "expense" 
                          ? theme === "dark" ? "text-red-400" : "text-red-500" 
                          : theme === "dark" ? "text-green-400" : "text-green-500"
                      }`}
                    >
                      {transaction.amount} {account.currency}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          ) : (
            <View>
              <Text className={`text-base font-medium mb-3 ${theme === "dark" ? "text-gray-300" : "text-slate-500"}`}>
                Account Statements
              </Text>

              {statements.map((statement, index) => (
                <Animated.View key={statement.id} entering={FadeInDown.delay(index * 100).duration(400)}>
                  <TouchableOpacity
                    className={`flex-row justify-between items-center py-4 border-b ${theme === "dark" ? "border-gray-800" : "border-gray-100"}`}
                  >
                    <View className="flex-row items-center">
                      <View className={`w-10 h-10 rounded-full items-center justify-center ${theme === "dark" ? "bg-blue-900/30" : "bg-blue-100"}`}>
                        <Feather name="file-text" size={18} color={theme === "dark" ? "#93c5fd" : "#2563eb"} />
                      </View>
                      <View className="ml-3">
                        <Text className={`text-base font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                          {statement.month}
                        </Text>
                        <Text className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>
                          {statement.date}
                        </Text>
                      </View>
                    </View>
                    <View className="flex-row items-center">
                      <Text className={`text-xs mr-2 ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>
                        {statement.size}
                      </Text>
                      <TouchableOpacity
                        className={`w-8 h-8 rounded-full items-center justify-center ${theme === "dark" ? "bg-blue-900/30" : "bg-blue-100"}`}
                      >
                        <Feather name="download" size={16} color={theme === "dark" ? "#93c5fd" : "#2563eb"} />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}