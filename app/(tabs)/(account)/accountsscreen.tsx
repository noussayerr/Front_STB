import { useState } from "react"
import { View, Text, FlatList, TouchableOpacity, StatusBar, TextInput } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons"
import Animated from "react-native-reanimated"
import { useRouter } from "expo-router"

type AccountType = {
  id: string;
  name: string;
  description: string;
  features: string[];
  minDeposit: string;
  monthlyFee: string;
  icon: string;
};

export default function AccountTypesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");

  const accountTypes: AccountType[] = [
    {
      id: "1",
      name: "Current Account",
      description: "A flexible account for your daily banking needs with easy access to your money.",
      features: ["Debit card", "Checkbook", "Online banking", "Mobile app access"],
      minDeposit: "50 DT",
      monthlyFee: "5 DT",
      icon: "account-balance",
    },
    {
      id: "2",
      name: "Savings Account",
      description: "Earn interest on your money while keeping it accessible for future needs.",
      features: ["Competitive interest rates", "ATM access", "No minimum balance", "Automatic transfers"],
      minDeposit: "100 DT",
      monthlyFee: "Free",
      icon: "savings",
    },
    {
      id: "3",
      name: "Student Account",
      description: "Designed for students with special benefits and lower fees.",
      features: ["No monthly fees", "Student discounts", "Free debit card", "Overdraft protection"],
      minDeposit: "10 DT",
      monthlyFee: "Free",
      icon: "school",
    },
    {
      id: "4",
      name: "Business Account",
      description: "Manage your business finances with specialized tools and services.",
      features: ["Multiple users", "Business loans", "Payroll services", "Merchant services"],
      minDeposit: "500 DT",
      monthlyFee: "15 DT",
      icon: "business",
    },
    {
      id: "5",
      name: "Joint Account",
      description: "Share account access and management with a partner or family member.",
      features: ["Multiple debit cards", "Shared access", "Transparent transactions", "Bill splitting"],
      minDeposit: "100 DT",
      monthlyFee: "7 DT",
      icon: "people",
    },
    {
      id: "6",
      name: "Foreign Currency Account",
      description: "Hold and manage multiple currencies for international transactions.",
      features: ["Multiple currencies", "Exchange services", "International transfers", "Travel benefits"],
      minDeposit: "200 EUR/USD",
      monthlyFee: "10 DT",
      icon: "language",
    },
  ]

  const filteredAccounts = searchQuery
  ? accountTypes.filter(
      (account) =>
        account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : accountTypes;
  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Search and header */}
      <View className="p-5">
        <Text className="text-base text-slate-600">
          Explore our range of accounts designed to meet your financial needs.
        </Text>

        <View className="mt-4 mb-2 flex-row items-center bg-gray-100 rounded-lg px-4 py-2">
          <Feather name="search" size={20} color="#64748b" />
          <TextInput
            className="flex-1 ml-2 text-base text-slate-900"
            placeholder="Search accounts..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Account list */}
      <FlatList
        data={filteredAccounts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        renderItem={({ item }) => (
          <Animated.View
            className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 5,
              elevation: 2,
            }}
          >
            <View className="p-5">
              {/* Account details */}
              <View className="flex-row items-center mb-3">
                <View className="w-12 h-12 rounded-full bg-blue-100 items-center justify-center">
                  <MaterialIcons name={item.icon as any} size={24} color="#2563eb" />
                </View>
                <View className="ml-3">
                  <Text className="text-lg font-bold text-slate-900">{item.name}</Text>
                  <View className="flex-row items-center">
                    <Text className="text-sm text-slate-500 mr-2">Min. Deposit: {item.minDeposit}</Text>
                    <Text className="text-sm text-slate-500">Monthly Fee: {item.monthlyFee}</Text>
                  </View>
                </View>
              </View>

              <Text className="text-base text-slate-700 mb-3">{item.description}</Text>

              <Text className="text-sm font-medium text-slate-700 mb-2">Key Features:</Text>
              <View className="mb-4">
                {item.features.map((feature, index) => (
                  <View key={index} className="flex-row items-center mb-1">
                    <View className="w-5 h-5 rounded-full bg-green-100 items-center justify-center mr-2">
                      <AntDesign name="check" size={12} color="#16a34a" />
                    </View>
                    <Text className="text-sm text-slate-600">{feature}</Text>
                  </View>
                ))}
              </View>

              <View className="flex-row justify-between">
                <TouchableOpacity className="flex-row items-center">
                  <Text className="text-sm font-medium text-blue-600 mr-1">Learn more</Text>
                  <AntDesign name="right" size={12} color="#2563eb" />
                </TouchableOpacity>

                <TouchableOpacity
                  className="px-4 py-2 bg-blue-600 rounded-lg"
                  onPress={() => router.push({
                    pathname: "/(tabs)/(account)/openaccount",
                    params:  {accoutid:item.id }
                  })}
                >
                  <Text className="text-sm font-medium text-white">Open Account</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        )}
      />
    </View>
  )
}

