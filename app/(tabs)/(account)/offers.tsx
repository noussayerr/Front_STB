import { View, Text, TouchableOpacity, ScrollView, StatusBar, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "@/app/providers/ThemeProvider";
import { useCreditStore } from "@/app/zustand/useCreditStore";
import { useEffect } from "react";

export default function OffersScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const { credits = [], isLoading, error, fetchCredits } = useCreditStore();

  useEffect(() => {
    fetchCredits();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center" style={{ backgroundColor: theme === "dark" ? "#121212" : "white" }}>
        <ActivityIndicator size="large" color={theme === "dark" ? "#ffffff" : "#000000"} />
        <Text className={`mt-2 ${theme === "dark" ? "text-white" : "text-black"}`}>Loading offers...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center" style={{ backgroundColor: theme === "dark" ? "#121212" : "white" }}>
        <Text className={`text-lg ${theme === "dark" ? "text-white" : "text-black"}`}>Error loading offers</Text>
        <Text className={`text-red-500 mt-2`}>{error}</Text>
        <TouchableOpacity 
          className="mt-4 bg-blue-600 px-4 py-2 rounded-lg"
          onPress={fetchCredits}
        >
          <Text className="text-white">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme === "dark" ? "#121212" : "white" }}>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={theme === "dark" ? "#121212" : "white"}
      />

      <View className="px-4 py-4 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="left" size={24} color={theme === "dark" ? "white" : "black"} />
        </TouchableOpacity>
        <Text className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-black"}`}>Available Offers</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView className="flex-1 px-4 pb-4">
        <Text className={`text-lg mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          Exclusive offers tailored just for you
        </Text>

        {credits.length === 0 ? (
          <View className="flex-1 justify-center items-center py-10">
            <Text className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              No offers available at this time
            </Text>
          </View>
        ) : (
          credits.map((offer) => (
            <TouchableOpacity
              key={offer?.id || Math.random().toString()}
              className={`mb-4 rounded-xl overflow-hidden border ${
                theme === "dark" ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"
              }`}
              onPress={() => {
                router.push({
                  pathname: "/(tabs)/(account)",
                  params: { creditId: offer?.id }
                });
              }}
              style={{
                shadowColor: theme === "dark" ? "#000" : "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: theme === "dark" ? 0.3 : 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <View className="p-4">
                <View className="flex-row items-center mb-3">
                  <View
                    style={{ backgroundColor: offer?.color || "#2563eb" }}
                    className="w-12 h-12 rounded-full items-center justify-center mr-3"
                  >
                    <Ionicons 
                      name={offer?.icon as any || "card"} 
                      size={24} 
                      color="white" 
                    />
                  </View>
                  <View className="flex-1">
                    <Text className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-black"}`}>
                      {offer?.title || "Credit Offer"}
                    </Text>
                    <Text className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      {offer?.description || "No description available"}
                    </Text>
                  </View>
                </View>

                <View
                  className="border-t border-b py-3 my-2 flex-row justify-between items-center"
                  style={{
                    borderColor: theme === "dark" ? "#333" : "#f0f0f0",
                  }}
                >
                  <View>
                    <Text className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                      Interest Rate
                    </Text>
                    <Text className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>
                      {offer?.interestRate || "N/A"}
                    </Text>
                  </View>
                  <View>
                    <Text className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Duration</Text>
                    <Text className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>
                      {offer?.duration || "N/A"}
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-center mt-2">
                  <MaterialIcons name="verified-user" size={16} color={theme === "dark" ? "#64748b" : "#94a3b8"} />
                  <Text className={`ml-1 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    {offer?.eligibility || "Eligibility requirements apply"}
                  </Text>
                </View>

                <TouchableOpacity 
                  className="mt-4 bg-blue-600 py-3 rounded-lg items-center"
                  onPress={() => {
                    router.push({
                      pathname: "/(tabs)/(account)",
                      params: { creditId: offer?.id }
                    });
                  }}
                >
                  <Text className="text-white font-semibold">Apply Now</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}