import * as React from "react"
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Image, Linking } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { AntDesign, Feather, Ionicons, MaterialIcons } from "@expo/vector-icons"
import { useLocalSearchParams, useRouter } from "expo-router"

import { useTheme } from '@/app/providers/ThemeProvider';
import Transaction from "@/app/components/transaction"
const ALL_CARDS = [
  { 
    id: "1",
    image: require("@/assets/carts/CARTESTBTRAVEL.png"),
    name: "Carte STB Travel",
    description: "Voyagez serein….",
    tag: "International",
    balance: "3,240.50",
    currency: "DT",
    expiryDate: "09/26",
    status: "Active",
    type: "Debit",
    cardNumber: "•••• •••• •••• 7890"
  },
  {id: "2",
  image: require("@/assets/carts/CarteSTBEpargne.png"), 
  name: "Carte STB Epargne", 
  description: "La carte Epargne vous évite le déplacement à l'agence et vous permet de faire face à des dépenses urgentes.",
  tag: "Savings",
  balance: "1,890.75",
  currency: "DT",
  expiryDate: "05/25",
  status: "Active",
  type: "Debit",
  cardNumber: "•••• •••• •••• 4567"
},
{ 
  id: "3", 
  image: require("@/assets/carts/CARTEVISAELECTRONNATIONALE.png"), 
  name: "Carte Visa Electron Nationale", 
  description: "Vous êtes résidents en Tunisie et vous cherchez un moyen de paiement et de retrait qui vous convient ?….",
  tag: "National",
  balance: "5,120.00",
  currency: "DT",
  expiryDate: "12/24",
  status: "Active",
  type: "Debit",
  cardNumber: "•••• •••• •••• 1234"
},
{ 
  id: "4", 
  image: require("@/assets/carts/CARTECIB3.png"),
  name: "Carte CIB3", 
  description: "Vous souhaitez une solution de paiement et de retrait pratique et moderne ?",
  tag: "Premium",
  balance: "8,750.30",
  currency: "DT",
  expiryDate: "03/27",
  status: "Active",
  type: "Credit",
  cardNumber: "•••• •••• •••• 5678"
},
{ 
  id: "5",
  image: require("@/assets/carts/CarteCCash.png"), 
  name: "Carte C Cash", 
  description: "Plus besoin d'un compte bancaire pour avoir une carte",
  tag: "Prepaid",
  balance: "1,200.00",
  currency: "DT",
  expiryDate: "08/25",
  status: "Active",
  type: "Prepaid",
  cardNumber: "•••• •••• •••• 3456"
},
{ 
  id: "6", 
  image: require("@/assets/carts/CarteCPay.png"), 
  name: "Carte C Pay", 
  description: "A convenient payment card for online transactions.",
  tag: "Business",
  balance: "15,000.00",
  currency: "DT",
  expiryDate: "11/26",
  status: "Active",
  type: "Business",
  cardNumber: "•••• •••• •••• 9012"
}
]

export default function CardDetailsScreen() {
  const router = useRouter()
  const { cardId, cardData } = useLocalSearchParams<{ cardId: string, cardData: string }>()
  const insets = useSafeAreaInsets()
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = React.useState("transactions")
  
  // Find the card either from params or from ALL_CARDS
  const currentCard = cardData 
    ? JSON.parse(cardData) 
    : ALL_CARDS.find(card => card.id === cardId) || ALL_CARDS[0]

  const handleBlockCard = () => {
    console.log("Blocking card:", currentCard.id)
  }

  const handleCallSupport = () => {
    Linking.openURL("tel:+21670555123")
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: theme === "dark" ? "#121212" : "white",

    }}>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={theme === "dark" ? "#121212" : "white"}
      />

      {/* Header */}
      <View className="px-4 py-4 flex-row items-center ">
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="left" size={24} color={theme === "dark" ? "white" : "black"} />
        </TouchableOpacity>
        <Text className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-black"}`}>
          {currentCard.name}
        </Text>
      </View>

      <ScrollView className="flex mb-20">
        {/* Card Display */}
        <View className="px-4 items-center mb-6">
          <Image
            source={currentCard.image}
            style={{
              width: "100%",
              height: 220,
              borderRadius: 16,
              marginBottom: 16,
            }}
            resizeMode="contain"
          />

          {/* Card Info Section */}
          <View className={`w-full rounded-xl p-4 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
            <View className="flex-row justify-between items-center mb-3">
              <Text className={`text-base ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                Available Balance
              </Text>
              <View className={`px-3 py-1 rounded-full ${theme === "dark" ? "bg-green-900/30" : "bg-green-100"}`}>
                <Text className={`text-xs font-medium ${theme === "dark" ? "text-green-400" : "text-green-600"}`}>
                  {currentCard.status}
                </Text>
              </View>
            </View>

            <Text className={`text-3xl font-bold mb-1 ${theme === "dark" ? "text-white" : "text-black"}`}>
              {currentCard.balance} {currentCard.currency}
            </Text>

            <Text className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} mb-4`}>
              {currentCard.cardNumber}
            </Text>

            <View className="flex-row justify-between mt-4">
              <View>
                <Text className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>CARD TYPE</Text>
                <Text className={`font-medium ${theme === "dark" ? "text-white" : "text-black"}`}>
                  {currentCard.type}
                </Text>
              </View>
              <View>
                <Text className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>EXPIRES</Text>
                <Text className={`font-medium ${theme === "dark" ? "text-white" : "text-black"}`}>
                  {currentCard.expiryDate}
                </Text>
              </View>
              <View>
                <Text className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>CATEGORY</Text>
                <Text className={`font-medium ${theme === "dark" ? "text-white" : "text-black"}`}>
                  {currentCard.tag}
                </Text>
              </View>
            </View>
          </View>

          {/* Card Description */}
          <View className={`w-full mt-4 p-4 rounded-xl ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
            <Text className={`font-medium mb-2 ${theme === "dark" ? "text-white" : "text-black"}`}>
              About this card
            </Text>
            <Text className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              {currentCard.description}
            </Text>
          </View>

          {/* Tabs Navigation */}
          <View className="flex-row w-full mt-6 mb-4">
            <TouchableOpacity
              className={`flex-1 py-3 items-center border-b-2 ${
                activeTab === "transactions"
                  ? theme === "dark"
                    ? "border-blue-500"
                    : "border-blue-600"
                  : theme === "dark"
                    ? "border-gray-800"
                    : "border-gray-200"
              }`}
              onPress={() => setActiveTab("transactions")}
            >
              <Text
                className={`font-medium ${
                  activeTab === "transactions"
                    ? theme === "dark"
                      ? "text-blue-500"
                      : "text-blue-600"
                    : theme === "dark"
                      ? "text-gray-400"
                      : "text-gray-500"
                }`}
              >
                Transactions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 py-3 items-center border-b-2 ${
                activeTab === "details"
                  ? theme === "dark"
                    ? "border-blue-500"
                    : "border-blue-600"
                  : theme === "dark"
                    ? "border-gray-800"
                    : "border-gray-200"
              }`}
              onPress={() => setActiveTab("details")}
            >
              <Text
                className={`font-medium ${
                  activeTab === "details"
                    ? theme === "dark"
                      ? "text-blue-500"
                      : "text-blue-600"
                    : theme === "dark"
                      ? "text-gray-400"
                      : "text-gray-500"
                }`}
              >
                Card Details
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tab Content */}
        {activeTab === "transactions" && (
          <View className="pb-8 px-4">
            <Transaction  />
          </View>
        )}

        {activeTab === "details" && (
          <View className="px-4 pb-8">
            <View className="space-y-4">
              {/* Card Management Options */}
              <TouchableOpacity
                className={`flex-row items-center p-4 rounded-xl ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}
                //onPress={() => router.push(`/(tabs)/carddetails/pin?cardId=${currentCard.id}`)}
              >
                <Ionicons
                  name="lock-closed"
                  size={24}
                  color={theme === "dark" ? "#60a5fa" : "#2563eb"}
                  style={{ marginRight: 12 }}
                />
                <View className="flex-1">
                  <Text className={`font-medium ${theme === "dark" ? "text-white" : "text-black"}`}>
                    Change PIN Code
                  </Text>
                  <Text className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    Update your card security PIN
                  </Text>
                </View>
                <AntDesign name="right" size={16} color={theme === "dark" ? "#9ca3af" : "#6b7280"} />
              </TouchableOpacity>

              <TouchableOpacity
                className={`flex-row items-center p-4 rounded-xl ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}
                //onPress={() => router.push(`/(tabs)/carddetails/limits?cardId=${currentCard.id}`)}
              >
                <MaterialIcons
                  name="speed"
                  size={24}
                  color={theme === "dark" ? "#60a5fa" : "#2563eb"}
                  style={{ marginRight: 12 }}
                />
                <View className="flex-1">
                  <Text className={`font-medium ${theme === "dark" ? "text-white" : "text-black"}`}>
                    Manage Spending Limits
                  </Text>
                  <Text className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    Set daily/weekly transaction limits
                  </Text>
                </View>
                <AntDesign name="right" size={16} color={theme === "dark" ? "#9ca3af" : "#6b7280"} />
              </TouchableOpacity>

              <TouchableOpacity
                className={`flex-row items-center p-4 rounded-xl ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}
                onPress={() => Linking.openURL("https://www.stb.com.tn")}
              >
                <Feather
                  name="globe"
                  size={24}
                  color={theme === "dark" ? "#60a5fa" : "#2563eb"}
                  style={{ marginRight: 12 }}
                />
                <View className="flex-1">
                  <Text className={`font-medium ${theme === "dark" ? "text-white" : "text-black"}`}>
                    View Card Benefits
                  </Text>
                  <Text className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    Discover your card's features and benefits
                  </Text>
                </View>
                <AntDesign name="right" size={16} color={theme === "dark" ? "#9ca3af" : "#6b7280"} />
              </TouchableOpacity>

              {/* Danger Zone */}
              <View className="mt-6">
                <Text className={`text-xs font-medium mb-3 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
                  CARD MANAGEMENT
                </Text>
                
                <TouchableOpacity
                  className={`flex-row items-center p-4 rounded-xl ${theme === "dark" ? "bg-red-900/20" : "bg-red-50"}`}
                  onPress={handleBlockCard}
                >
                  <Ionicons
                    name="close-circle"
                    size={24}
                    color={theme === "dark" ? "#f87171" : "#dc2626"}
                    style={{ marginRight: 12 }}
                  />
                  <View className="flex-1">
                    <Text className={`font-medium ${theme === "dark" ? "text-red-400" : "text-red-600"}`}>
                      Block Card Temporarily
                    </Text>
                    <Text className={`text-sm ${theme === "dark" ? "text-red-400/70" : "text-red-500/70"}`}>
                      Prevent new transactions with this card
                    </Text>
                  </View>
                  <View
                    className={`w-12 h-6 rounded-full ${
                      theme === "dark" ? "bg-gray-800" : "bg-gray-200"
                    } flex-row items-center px-1`}
                  >
                    <View
                      className={`w-4 h-4 rounded-full ${
                        theme === "dark" ? "bg-gray-600" : "bg-gray-500"
                      }`}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  )
}