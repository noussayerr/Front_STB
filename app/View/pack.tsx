import { useState } from "react"
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { AntDesign, MaterialIcons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useTheme } from "../providers/ThemeProvider"

export default function SelectPackScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { theme } = useTheme()
  const [selectedPack, setSelectedPack] = useState<string | null>(null)

  const packs = [
    {
      id: "premium",
      name: "Premium",
      tagline: "All the best features we have to offer. So far.",
      price: "12.990",
      tag: "Best value",
      tagColor: theme === "dark" ? "#0369a1" : "#0284c7",
      features: [
        { name: "Unlimited wire transfers: 5000 DT / week", available: true },
        { name: "Send Money : 5000 DT/day", available: true },
        { name: "Cash-out ATM without card: 3000 DT /week", available: true },
        { name: "Unlimited scheduled transfers", available: true },
        { name: "Merchant payment: 5000 DT /week", available: true },
      ],
    },
    {
      id: "plus",
      name: "Plus",
      tagline: "Don't live life with limitations, get the Plus.",
      price: "4.990",
      tag: "Most popular",
      tagColor: theme === "dark" ? "#a16207" : "#ca8a04",
      features: [
        { name: "Unlimited wire transfers: 3000 DT / week", available: true },
        { name: "Send Money: 3000 DT/day", available: true },
        { name: "Cash-out ATM without card: 1000 DT /week", available: true },
        { name: "Merchant payment: 3000 DT /week", available: true },
        { name: "Unlimited scheduled transfers", available: false },
      ],
    },
    {
      id: "starter",
      name: "Starter",
      tagline: "Enjoy some of our favorite basic features, for free",
      price: "0.000",
      tag: "Free Forever",
      tagColor: theme === "dark" ? "#404040" : "#a3a3a3",
      features: [
        { name: "Virtual Card", available: true },
        { name: "Cash-out ATM without card: 500 DT /week", available: true },
        { name: "Send Money: 800 DT/day", available: true },
        { name: "Merchant payment: 1000 DT /week", available: true },
        { name: "Unlimited wire transfers", available: false },
      ],
    },
  ]

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme === "dark" ? "#121212" : "#ffffff",
        paddingTop: insets.top,
      }}
    >
      <StatusBar barStyle={theme === "dark" ? "light-content" : "dark-content"} />

      <View className="px-4 py-4 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign 
            name="left" 
            size={24} 
            color={theme === "dark" ? "#ffffff" : "#000000"} 
          />
        </TouchableOpacity>
      </View>

      <View className="px-4 pb-4">
        <Text className={`text-5xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
          Select your pack
        </Text>
        <Text className={`text-lg mt-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          Pick the pack of services that works best for you. Don't worry, you can change it later.
        </Text>
      </View>

      <ScrollView className="flex-1 px-4 pb-4">
        {packs.map((pack) => (
          <TouchableOpacity
            key={pack.id}
            className={`mb-4 rounded-3xl overflow-hidden border ${
              selectedPack === pack.id 
                ? theme === "dark" 
                  ? "border-blue-500" 
                  : "border-blue-600"
                : theme === "dark" 
                  ? "border-gray-800" 
                  : "border-gray-200"
            }`}
            onPress={() => setSelectedPack(pack.id)}
          >
            <View className={`p-4 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
              {pack.tag && (
                <View 
                  style={{ backgroundColor: pack.tagColor }} 
                  className="self-start px-4 py-2 rounded-full mb-2"
                >
                  <Text className="text-white font-medium">{pack.tag}</Text>
                </View>
              )}

              <Text className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                {pack.name}
              </Text>
              <Text className={`text-base mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                {pack.tagline}
              </Text>

              <View className="space-y-3">
                {pack.features.map((feature, index) => (
                  <View key={index} className="flex-row items-center">
                    {feature.available ? (
                      <MaterialIcons 
                        name="check-circle" 
                        size={20} 
                        color={theme === "dark" ? "#10b981" : "#059669"} 
                      />
                    ) : (
                      <MaterialIcons 
                        name="cancel" 
                        size={20} 
                        color={theme === "dark" ? "#ef4444" : "#dc2626"} 
                      />
                    )}
                    <Text className={`text-base ml-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {feature.name}
                    </Text>
                  </View>
                ))}
              </View>

              <View className="flex-row items-center justify-end mt-4">
                
                <Text className={`text-3xl font-bold ml-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  DT {pack.price}
                </Text>
                <Text className={`text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  /month
                </Text>
              </View>
            </View>

            <View className="absolute right-4 top-4">
              <View
                className={`h-6 w-6 rounded-full border-2 ${
                  selectedPack === pack.id 
                    ? theme === "dark" 
                      ? "border-blue-500 bg-blue-500" 
                      : "border-blue-600 bg-blue-600"
                    : theme === "dark" 
                      ? "border-gray-600" 
                      : "border-gray-300"
                }`}
              >
                {selectedPack === pack.id && (
                  <MaterialIcons name="check" size={18} color="white" />
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View className="px-4 pb-8 pt-2">
        <TouchableOpacity
          className={`rounded-full py-4 items-center ${
            theme === "dark" 
              ? selectedPack ? "bg-blue-600" : "bg-blue-600/50" 
              : selectedPack ? "bg-blue-600" : "bg-blue-600/50"
          }`}
          onPress={() => {
            if (selectedPack) {
              router.push("/")
            }
          }}
          disabled={!selectedPack}
        >
          <Text className="text-white text-xl font-semibold">Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}