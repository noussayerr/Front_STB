import * as React from "react"
import { View, Text, TouchableOpacity, ScrollView, StatusBar, RefreshControl } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { AntDesign, MaterialIcons, Feather } from "@expo/vector-icons"
import Animated, { FadeInDown } from "react-native-reanimated"
import { router } from 'expo-router'
import { useTheme } from "@/app/providers/ThemeProvider"

export default function AccountsScreen() {
  const insets = useSafeAreaInsets()
  const [refreshing, setRefreshing] = React.useState(false)
  const { theme } = useTheme()

  const accounts = [
    {
      id: "1",
      name: "Current Account",
      number: "TN59 1234 5678 9012 3456 7890",
      balance: "3,240.50",
      currency: "DT",
      type: "current",
    },
    {
      id: "2",
      name: "Savings Account",
      number: "TN59 8765 4321 0987 6543 2109",
      balance: "2,039.50",
      currency: "DT",
      type: "savings",
    },
    {
      id: "3",
      name: "Business Account",
      number: "TN59 2468 1357 9080 7060 5040",
      balance: "0.00",
      currency: "DT",
      type: "business",
    },
  ]

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  return (
    <View className={`flex h-full ${theme === "dark" ? "bg-[#121212]" : "bg-white"}`}>
      <StatusBar 
        barStyle={theme === "dark" ? "light-content" : "dark-content"} 
        backgroundColor={theme === "dark" ? "#121212" : "#ffffff"} 
      />
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            colors={["#2563eb"]} 
            tintColor={theme === "dark" ? "#f1f5f9" : "#2563eb"}
          />
        }
      >
        <View className="p-5">
          <Text className={`font-bold text-xl mb-3 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            All Accounts
          </Text>

          {accounts.map((account, index) => (
            <View 
              className={`rounded-2xl p-5 mt-5 ${theme === "dark" ? "bg-gray-800" : "bg-white border border-gray-100"}`} 
              key={account.id}
              style={{
                shadowColor: theme === "dark" ? "transparent" : "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: theme === "dark" ? 0 : 0.05,
                shadowRadius: 5,
                elevation: theme === "dark" ? 0 : 2,
              }}
            >
              <Animated.View
                entering={FadeInDown.delay(index * 100).duration(400)}
              >
                <TouchableOpacity
                  className="flex-row justify-between items-center"
                  onPress={() => router.push({
                    pathname: '/(tabs)/(account)/AccountDetails',
                    params: { account: JSON.stringify(account) }
                  })}
                >
                  <View className="flex-row items-center">
                    <View
                      className={`w-12 h-12 rounded-full items-center justify-center ${
                        account.type === "current"
                          ? theme === "dark" ? "bg-blue-900/30" : "bg-blue-100"
                          : account.type === "savings"
                            ? theme === "dark" ? "bg-green-900/30" : "bg-green-100"
                            : theme === "dark" ? "bg-purple-900/30" : "bg-purple-100"
                      }`}
                    >
                      <MaterialIcons
                        name={
                          account.type === "current"
                            ? "account-balance"
                            : account.type === "savings"
                              ? "savings"
                              : "business"
                        }
                        size={24}
                        color={
                          account.type === "current" 
                            ? theme === "dark" ? "#93c5fd" : "#2563eb" 
                            : account.type === "savings" 
                              ? theme === "dark" ? "#86efac" : "#16a34a" 
                              : theme === "dark" ? "#c4b5fd" : "#9333ea"
                        }
                      />
                    </View>
                    <View className="ml-3">
                      <Text className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                        {account.name}
                      </Text>
                      <Text className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>
                        {account.number.substring(0, 10)}...
                      </Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                      {account.balance} {account.currency}
                    </Text>
                    <View className="flex-row items-center mt-1">
                      <Text className={`text-xs mr-1 ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>
                        View details
                      </Text>
                      <AntDesign 
                        name="right" 
                        size={12} 
                        color={theme === "dark" ? "#9ca3af" : "#64748b"} 
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            </View>
          ))}
        </View>

        <View className="p-5">
          <Text className={`font-bold text-xl mb-3 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            Quick Actions
          </Text>

          <View className="flex-row flex-wrap justify-between">
            <TouchableOpacity
              className={`rounded-xl p-4 mb-4 w-[48%] ${theme === "dark" ? "bg-gray-800" : "bg-white border border-gray-100"} items-center`}
              style={{
                shadowColor: theme === "dark" ? "transparent" : "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: theme === "dark" ? 0 : 0.05,
                shadowRadius: 5,
                elevation: theme === "dark" ? 0 : 2,
              }}
              onPress={() => router.push('/(tabs)/(account)/StatementDownload')}
            >
              <View className={`w-12 h-12 rounded-full ${theme === "dark" ? "bg-blue-900/30" : "bg-blue-100"} items-center justify-center mb-2`}>
                <Feather 
                  name="download" 
                  size={22} 
                  color={theme === "dark" ? "#93c5fd" : "#2563eb"} 
                />
              </View>
              <Text className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"} text-center`}>
                Download Statement
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`rounded-xl p-4 mb-4 w-[48%] ${theme === "dark" ? "bg-gray-800" : "bg-white border border-gray-100"} items-center`}
              style={{
                shadowColor: theme === "dark" ? "transparent" : "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: theme === "dark" ? 0 : 0.05,
                shadowRadius: 5,
                elevation: theme === "dark" ? 0 : 2,
              }}
              onPress={() => router.push('/(tabs)/(account)/openaccount')}
            >
              <View className={`w-12 h-12 rounded-full ${theme === "dark" ? "bg-green-900/30" : "bg-green-100"} items-center justify-center mb-2`}>
                <MaterialIcons 
                  name="swap-horiz" 
                  size={22} 
                  color={theme === "dark" ? "#86efac" : "#16a34a"} 
                />
              </View>
              <Text className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"} text-center`}>
                Transfer Funds
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`rounded-xl p-4 mb-4 w-[48%] ${theme === "dark" ? "bg-gray-800" : "bg-white border border-gray-100"} items-center`}
              style={{
                shadowColor: theme === "dark" ? "transparent" : "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: theme === "dark" ? 0 : 0.05,
                shadowRadius: 5,
                elevation: theme === "dark" ? 0 : 2,
              }}
              onPress={() => router.push('/(tabs)/(account)/CreditDashboard')}
            >
              <View className={`w-12 h-12 rounded-full ${theme === "dark" ? "bg-purple-900/30" : "bg-purple-100"} items-center justify-center mb-2`}>
                <MaterialIcons 
                  name="credit-card" 
                  size={22} 
                  color={theme === "dark" ? "#c4b5fd" : "#9333ea"} 
                />
              </View>
              <Text className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"} text-center`}>
                Credit Dashboard
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`rounded-xl p-4 mb-4 w-[48%] ${theme === "dark" ? "bg-gray-800" : "bg-white border border-gray-100"} items-center`}
              style={{
                shadowColor: theme === "dark" ? "transparent" : "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: theme === "dark" ? 0 : 0.05,
                shadowRadius: 5,
                elevation: theme === "dark" ? 0 : 2,
              }}
              onPress={() => router.push('/(tabs)/(account)/CreditSimulator')}
            >
              <View className={`w-12 h-12 rounded-full ${theme === "dark" ? "bg-amber-900/30" : "bg-amber-100"} items-center justify-center mb-2`}>
                <MaterialIcons 
                  name="calculate" 
                  size={22} 
                  color={theme === "dark" ? "#fcd34d" : "#d97706"} 
                />
              </View>
              <Text className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"} text-center`}>
                Credit Simulator
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}