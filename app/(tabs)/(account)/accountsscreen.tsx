import { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StatusBar, TextInput, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { useRouter } from "expo-router";
import { useTheme } from "@/app/providers/ThemeProvider";
import { useAccountStore } from "@/app/zustand/useAccountStore";

export default function AccountTypesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const { theme } = useTheme();
  const { accountTypes = [], isLoading, error, fetchAccountTypes } = useAccountStore();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch accounts with async/await
  const loadAccounts = async () => {
    try {
      await fetchAccountTypes();
    } catch (err) {
      console.error("Failed to load accounts:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadAccounts();
  }, []);

  // Pull-to-refresh handler
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadAccounts();
  };

  const filteredAccounts = searchQuery
    ? (accountTypes || []).filter(
        (account) =>
          account?.name?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
          account?.description?.toLowerCase()?.includes(searchQuery.toLowerCase())
      )
    : accountTypes || [];

  if (isLoading && !isRefreshing) {
    return (
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: theme === "dark" ? "#121212" : "#ffffff" }}>
        <ActivityIndicator size="large" color={theme === "dark" ? "#ffffff" : "#000000"} />
        <Text className={`mt-2 ${theme === "dark" ? "text-white" : "text-black"}`}>Loading accounts...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4" style={{ backgroundColor: theme === "dark" ? "#121212" : "#ffffff" }}>
        <Text className={theme === "dark" ? "text-red-400" : "text-red-600"}>Error: {error}</Text>
        <TouchableOpacity 
          className="mt-4 bg-blue-600 px-4 py-2 rounded-lg"
          onPress={loadAccounts}
        >
          <Text className="text-white">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className={`flex-1 ${theme === "dark" ? "bg-[#121212]" : "bg-white"}`}>
      <StatusBar 
        barStyle={theme === "dark" ? "light-content" : "dark-content"} 
        backgroundColor={theme === "dark" ? "#121212" : "#ffffff"} 
      />
     
      <View className="p-5">
        <Text className={`text-base ${theme === "dark" ? "text-gray-300" : "text-slate-600"}`}>
          Explore our range of accounts designed to meet your financial needs.
        </Text>

        <View className={`mt-4 mb-2 flex-row items-center ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} rounded-lg px-4 py-2`}>
          <Feather name="search" size={20} color={theme === "dark" ? "#9ca3af" : "#64748b"} />
          <TextInput
            className={`flex-1 ml-2 text-base ${theme === "dark" ? "text-white" : "text-slate-900"}`}
            placeholder="Search accounts..."
            placeholderTextColor={theme === "dark" ? "#9ca3af" : "#64748b"}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Account list with refresh control */}
      <FlatList
        data={filteredAccounts}
        keyExtractor={(item) => item?.id || Math.random().toString()}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center py-10">
            <Text className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              {isRefreshing ? "Refreshing..." : "No accounts found"}
            </Text>
          </View>
        }
        
        renderItem={({ item }) => (
          <Animated.View
            className={`rounded-2xl overflow-hidden border ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"} shadow-sm`}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: theme === "dark" ? 0.1 : 0.05,
              shadowRadius: 5,
              elevation: 2,
            }}
          >
            <View className="p-5">
              {/* Account details */}
              <View className="flex-row items-center mb-3">
                <View className={`w-12 h-12 rounded-full ${theme === "dark" ? "bg-blue-900" : "bg-blue-100"} items-center justify-center`}>
                  <MaterialIcons 
                    name={item?.icon as any || "account-balance"} 
                    size={24} 
                    color={theme === "dark" ? "#93c5fd" : "#2563eb"} 
                  />
                </View>
                <View className="ml-3">
                  <Text className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {item?.name || "Account"}
                  </Text>
                  <View className="flex-row items-center">
                    <Text className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-slate-500"} mr-2`}>
                      Min. Deposit: {item?.minDeposit || "N/A"}
                    </Text>
                    <Text className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>
                      Monthly Fee: {item?.monthlyFee || "N/A"}
                    </Text>
                  </View>
                </View>
              </View>

              <Text className={`text-base ${theme === "dark" ? "text-gray-300" : "text-slate-700"} mb-3`}>
                {item?.description || "No description available"}
              </Text>

              {item?.features?.length > 0 && (
                <>
                  <Text className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-slate-700"} mb-2`}>
                    Key Features:
                  </Text>
                  <View className="mb-4">
                    {item.features.map((feature, index) => (
                      <View key={index} className="flex-row items-center mb-1">
                        <View className={`w-5 h-5 rounded-full ${theme === "dark" ? "bg-green-900" : "bg-green-100"} items-center justify-center mr-2`}>
                          <AntDesign name="check" size={12} color={theme === "dark" ? "#86efac" : "#16a34a"} />
                        </View>
                        <Text className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-slate-600"}`}>
                          {feature}
                        </Text>
                      </View>
                    ))}
                  </View>
                </>
              )}

              <View className="flex-row justify-between">
                <TouchableOpacity 
                  className="flex-row items-center"
                  onPress={() => router.push(`/(tabs)/(account)/accountdetails/${item?.id}`)}
                >
                  <Text className={`text-sm font-medium ${theme === "dark" ? "text-blue-400" : "text-blue-600"} mr-1`}>
                    Learn more
                  </Text>
                  <AntDesign name="right" size={12} color={theme === "dark" ? "#60a5fa" : "#2563eb"} />
                </TouchableOpacity>

                <TouchableOpacity
                  className="px-4 py-2 bg-blue-600 rounded-lg"
                  onPress={() => router.push({
                    pathname: "/(tabs)/(account)/openaccount",
                    params: { accountid: item?.id }
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
  );
}