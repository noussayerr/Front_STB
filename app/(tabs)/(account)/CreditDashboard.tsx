import { View, Text, TouchableOpacity, ScrollView, StatusBar } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { AntDesign, MaterialIcons, Feather } from "@expo/vector-icons"
import Animated, { FadeInDown } from "react-native-reanimated"
import * as Progress from "react-native-progress"
import { useTheme } from "@/app/providers/ThemeProvider"
import { useRouter } from "expo-router";
export default function CreditDashboardScreen({ navigation }: any) {
  const insets = useSafeAreaInsets()
  const { theme } = useTheme()
  const router = useRouter();
  const credits = [
    {
      id: "1",
      name: "Home Loan",
      totalAmount: "250,000.00",
      remainingAmount: "180,500.00",
      currency: "DT",
      progress: 0.28,
      nextPayment: "1,250.00",
      nextPaymentDate: "Apr 15, 2023",
      interestRate: "5.2%",
      term: "25 years",
    },
    {
      id: "2",
      name: "Car Loan",
      totalAmount: "45,000.00",
      remainingAmount: "12,800.00",
      currency: "DT",
      progress: 0.72,
      nextPayment: "650.00",
      nextPaymentDate: "Apr 10, 2023",
      interestRate: "4.8%",
      term: "5 years",
    },
  ]

  return (
    <View className={`flex-1 ${theme === "dark" ? "bg-[#121212]" : "bg-white"}`}>
      <StatusBar 
        barStyle={theme === "dark" ? "light-content" : "dark-content"} 
        backgroundColor={theme === "dark" ? "#121212" : "#ffffff"} 
      />

      <View className={`px-5 py-4 flex-row items-center border-b ${theme === "dark" ? "border-gray-800" : "border-gray-100"}`}>
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color={theme === "dark" ? "#f8fafc" : "#0f172a"} />
        </TouchableOpacity>
        <Text className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
          Credit Dashboard
        </Text>
      </View>

      <ScrollView className="flex mb-20" showsVerticalScrollIndicator={false}>
        <View className="p-5">
          <View className="bg-blue-600 p-5 rounded-2xl mb-6">
            <Text className="text-white/80 text-sm mb-1">Total Credit Balance</Text>
            <Text className="text-white text-3xl font-bold">193,300.00 DT</Text>

            <View className="flex-row justify-between mt-4">
              <View>
                <Text className="text-white/80 text-xs">Monthly Payment</Text>
                <Text className="text-white text-base font-semibold">1,900.00 DT</Text>
              </View>
              <View>
                <Text className="text-white/80 text-xs">Next Payment</Text>
                <Text className="text-white text-base font-semibold">Apr 10, 2023</Text>
              </View>
              <View>
                <Text className="text-white/80 text-xs">Active Credits</Text>
                <Text className="text-white text-base font-semibold">2</Text>
              </View>
            </View>
          </View>

          <View className="flex-row justify-between mb-5">
            <TouchableOpacity
              className={`rounded-xl p-4 w-[48%] items-center ${theme === "dark" ? "bg-gray-800" : "bg-white border border-gray-100"}`}
              style={{
                shadowColor: theme === "dark" ? "transparent" : "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: theme === "dark" ? 0 : 0.05,
                shadowRadius: 5,
                elevation: theme === "dark" ? 0 : 2,
              }}
              onPress={() => router.push("/(tabs)/(account)/CreditSimulator")}
            >
              <View className={`w-12 h-12 rounded-full items-center justify-center mb-2 ${theme === "dark" ? "bg-purple-900/30" : "bg-purple-100"}`}>
                <MaterialIcons name="calculate" size={22} color={theme === "dark" ? "#c4b5fd" : "#9333ea"} />
              </View>
              <Text className={`text-sm font-medium text-center ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                Credit Simulator
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`rounded-xl p-4 w-[48%] items-center ${theme === "dark" ? "bg-gray-800" : "bg-white border border-gray-100"}`}
              style={{
                shadowColor: theme === "dark" ? "transparent" : "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: theme === "dark" ? 0 : 0.05,
                shadowRadius: 5,
                elevation: theme === "dark" ? 0 : 2,
              }}
              onPress={() => router.push("/(tabs)/(account)/offers")}
            >
              <View className={`w-12 h-12 rounded-full items-center justify-center mb-2 ${theme === "dark" ? "bg-green-900/30" : "bg-green-100"}`}>
                <MaterialIcons name="add-circle-outline" size={22} color={theme === "dark" ? "#86efac" : "#16a34a"} />
              </View>
              <Text className={`text-sm font-medium text-center ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                Request Credit
              </Text>
            </TouchableOpacity>
          </View>

          <Text className={`text-base font-medium mb-3 ${theme === "dark" ? "text-gray-300" : "text-slate-500"}`}>
            Active Credits
          </Text>

          {credits.map((credit, index) => (
            <View
              key={credit.id}
              
              className={`rounded-2xl p-5 mb-4 ${theme === "dark" ? "bg-gray-800" : "bg-white border border-gray-100"}`}
              style={{
                shadowColor: theme === "dark" ? "transparent" : "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: theme === "dark" ? 0 : 0.05,
                shadowRadius: 5,
                elevation: theme === "dark" ? 0 : 2,
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("CreditDetails", { credit })}>
                <View className="flex-row justify-between items-center mb-3">
                  <View className="flex-row items-center">
                    <View className={`w-10 h-10 rounded-full items-center justify-center ${theme === "dark" ? "bg-blue-900/30" : "bg-blue-100"}`}>
                      <MaterialIcons
                        name={credit.name.includes("Home") ? "home" : "directions-car"}
                        size={20}
                        color={theme === "dark" ? "#93c5fd" : "#2563eb"}
                      />
                    </View>
                    <View className="ml-3">
                      <Text className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                        {credit.name}
                      </Text>
                      <Text className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>
                        {credit.interestRate} • {credit.term}
                      </Text>
                    </View>
                  </View>
                  <AntDesign name="right" size={16} color={theme === "dark" ? "#9ca3af" : "#64748b"} />
                </View>

                <View className="mb-3">
                  <View className="flex-row justify-between mb-1">
                    <Text className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>Progress</Text>
                    <Text className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>
                      {Math.round(credit.progress * 100)}%
                    </Text>
                  </View>
                  <Progress.Bar
                    progress={credit.progress}
                    width={null}
                    height={8}
                    color="#2563eb"
                    unfilledColor={theme === "dark" ? "#374151" : "#e2e8f0"}
                    borderWidth={0}
                    borderRadius={4}
                  />
                </View>

                <View className="flex-row justify-between mt-3">
                  <View>
                    <Text className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>Remaining</Text>
                    <Text className={`text-base font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                      {credit.remainingAmount} {credit.currency}
                    </Text>
                  </View>
                  <View>
                    <Text className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>Next Payment</Text>
                    <Text className={`text-base font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                      {credit.nextPayment} {credit.currency}
                    </Text>
                  </View>
                  <View>
                    <Text className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>Due Date</Text>
                    <Text className={`text-base font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                      {credit.nextPaymentDate}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}