import * as React from "react"
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StatusBar, 
  Image, 
  Linking,
  Modal,
  TextInput,
  ActivityIndicator,
  Alert 
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { AntDesign, Feather, Ionicons, MaterialIcons } from "@expo/vector-icons"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useTheme } from '@/app/providers/ThemeProvider';
import Transaction from "@/app/components/transaction"
import { useCardStore } from "@/app/zustand/useCardStore"

export default function CardDetailsScreen() {
  const router = useRouter()
  const { cardId } = useLocalSearchParams<{ cardId: string }>()
  const insets = useSafeAreaInsets()
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = React.useState("transactions")
  const [pinModalVisible, setPinModalVisible] = React.useState(false)
  const [currentPin, setCurrentPin] = React.useState('')
  const [newPin, setNewPin] = React.useState('')
  const [confirmPin, setConfirmPin] = React.useState('')
  const [isChangingPin, setIsChangingPin] = React.useState(false)

  const { 
    currentCard, 
    isLoading, 
    error, 
    fetchCardDetails, 
    clearCurrentCard,
    toggleBlockCard,
    changeCardPin
  } = useCardStore()

  React.useEffect(() => {
    if (cardId) fetchCardDetails(cardId)
    return () => clearCurrentCard()
  }, [cardId])

  const handleBlockCard = async () => {
    if (!currentCard) return
    
    const { success, message } = await toggleBlockCard(currentCard._id)
    if (success) {
      Alert.alert(
        'Success', 
        `Card has been ${currentCard.status === 'active' ? 'blocked' : 'unblocked'}`
      )
    } else {
      Alert.alert('Error', message)
    }
  }

  const handleChangePin = async () => {
    if (!currentCard) return
    
    if (newPin.length !== 6 || confirmPin.length !== 6) {
      Alert.alert('Error', 'PIN must be 6 digits')
      return
    }
    
    if (newPin !== confirmPin) {
      Alert.alert('Error', 'New PIN and confirmation do not match')
      return
    }
    
    setIsChangingPin(true)
    const { success, message } = await changeCardPin(currentCard._id, newPin)
    setIsChangingPin(false)
    
    if (success) {
      Alert.alert('Success', 'PIN changed successfully')
      setPinModalVisible(false)
      setCurrentPin('')
      setNewPin('')
      setConfirmPin('')
    } else {
      Alert.alert('Error', message)
    }
  }

  const handleCallSupport = () => {
    Linking.openURL("tel:+21670555123")
  }


  const formatCardNumber = (number: string) => {
    if (!number) return '•••• •••• •••• ••••'
    const last4 = number.slice(-4)
    return `•••• •••• •••• ${last4}`
  }

  const formatExpiryDate = (date: string | Date) => {
    if (!date) return '••/••'
    const d = new Date(date)
    return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getFullYear()).slice(-2)}`
  }

  if (isLoading) {
    return (
      <View className={`flex-1 justify-center items-center ${theme === "dark" ? "bg-[#121212]" : "bg-white"}`}>
        <ActivityIndicator size="large" color={theme === "dark" ? "#fff" : "#000"} />
      </View>
    )
  }

  if (error) {
    return (
      <View className={`flex-1 justify-center items-center p-4 ${theme === "dark" ? "bg-[#121212]" : "bg-white"}`}>
        <Text className={theme === "dark" ? "text-red-400" : "text-red-600"}>Error: {error}</Text>
        <TouchableOpacity 
          className={`mt-4 px-4 py-2 rounded-lg ${theme === "dark" ? "bg-blue-800" : "bg-blue-100"}`}
          onPress={() => fetchCardDetails(cardId!)}
        >
          <Text className={theme === "dark" ? "text-white" : "text-blue-800"}>Retry</Text>
        </TouchableOpacity>
      </View>
    )
  }

  if (!currentCard) {
    return (
      <View className={`flex-1 justify-center items-center ${theme === "dark" ? "bg-[#121212]" : "bg-white"}`}>
        <Text className={theme === "dark" ? "text-red-400" : "text-red-500"}>Card not found!</Text>
      </View>
    )
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
          {currentCard.cardType?.name || 'Bank Card'}
        </Text>
      </View>

      <ScrollView className="flex mb-20">
        {/* Card Display */}
        <View className="px-4 items-center mb-6">
          <Image
            source={{ uri: currentCard.cardType.imageUrl }}
            style={{
              width: "100%",
              height: 220,
              borderRadius: 16,
              marginBottom: 16,
              opacity: currentCard.status === 'blocked' ? 0.6 : 1
            }}
            resizeMode="contain"
          />

          {currentCard.status === 'blocked' && (
            <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center">
              <View className="bg-black/50 px-4 py-2 rounded-full">
                <Text className="text-white font-bold">BLOCKED</Text>
              </View>
            </View>
          )}

          {/* Card Info Section */}
          <View className={`w-full rounded-xl p-4 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
            <View className="flex-row justify-between items-center mb-3">
              <Text className={`text-base ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                Available Balance
              </Text>
              <View className={`px-3 py-1 rounded-full ${
                currentCard.status === 'active' ? 
                  (theme === "dark" ? "bg-green-900/30" : "bg-green-100") : 
                  (theme === "dark" ? "bg-red-900/30" : "bg-red-100")
              }`}>
                <Text className={`text-xs font-medium ${
                  currentCard.status === 'active' ? 
                    (theme === "dark" ? "text-green-400" : "text-green-600") : 
                    (theme === "dark" ? "text-red-400" : "text-red-600")
                }`}>
                  {currentCard.status?.toUpperCase()}
                </Text>
              </View>
            </View>

            <Text className={`text-3xl font-bold mb-1 ${theme === "dark" ? "text-white" : "text-black"}`}>
              {currentCard.currentBalance?.toFixed(2) || '0.00'} DT
            </Text>

            <Text className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} mb-4`}>
              {formatCardNumber(currentCard.cardNumber)}
            </Text>

            <View className="flex-row justify-between mt-4">
              <View>
                <Text className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>CARD TYPE</Text>
                <Text className={`font-medium ${theme === "dark" ? "text-white" : "text-black"}`}>
                  {currentCard.cardType?.type || 'Debit'}
                </Text>
              </View>
              <View>
                <Text className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>EXPIRES</Text>
                <Text className={`font-medium ${theme === "dark" ? "text-white" : "text-black"}`}>
                  {formatExpiryDate(currentCard.expiryDate)}
                </Text>
              </View>
              <View>
                <Text className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>CATEGORY</Text>
                <Text className={`font-medium ${theme === "dark" ? "text-white" : "text-black"}`}>
                  {currentCard.cardType?.tag || 'Card'}
                </Text>
              </View>
            </View>
          </View>

          {/* Card Description */}
          {currentCard.cardType?.description && (
            <View className={`w-full mt-4 p-4 rounded-xl ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
              <Text className={`font-medium mb-2 ${theme === "dark" ? "text-white" : "text-black"}`}>
                About this card
              </Text>
              <Text className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                {currentCard.cardType.description}
              </Text>
            </View>
          )}

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
            <Transaction />
          </View>
        )}

        {activeTab === "details" && (
          <View className="px-4 pb-8">
            <View className="space-y-4">
              {/* Card Management Options */}
              <TouchableOpacity
                className={`flex-row items-center p-4 rounded-xl ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}
                onPress={() => setPinModalVisible(true)}
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
                onPress={() => router.push(`/(tabs)/(Carts)/limits?cardId=${currentCard._id}`)}
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
                  className={`flex-row items-center p-4 rounded-xl ${
                    theme === "dark" ? 
                      (currentCard.status === 'active' ? "bg-red-900/20" : "bg-green-900/20") : 
                      (currentCard.status === 'active' ? "bg-red-50" : "bg-green-50")
                  }`}
                  onPress={handleBlockCard}
                >
                  <Ionicons
                    name={currentCard.status === 'active' ? "close-circle" : "checkmark-circle"}
                    size={24}
                    color={
                      theme === "dark" ? 
                        (currentCard.status === 'active' ? "#f87171" : "#4ade80") : 
                        (currentCard.status === 'active' ? "#dc2626" : "#16a34a")
                    }
                    style={{ marginRight: 12 }}
                  />
                  <View className="flex-1">
                    <Text className={`font-medium ${
                      theme === "dark" ? 
                        (currentCard.status === 'active' ? "text-red-400" : "text-green-400") : 
                        (currentCard.status === 'active' ? "text-red-600" : "text-green-600")
                    }`}>
                      {currentCard.status === 'active' ? 'Block Card' : 'Unblock Card'}
                    </Text>
                    <Text className={`text-sm ${
                      theme === "dark" ? 
                        (currentCard.status === 'active' ? "text-red-400/70" : "text-green-400/70") : 
                        (currentCard.status === 'active' ? "text-red-500/70" : "text-green-500/70")
                    }`}>
                      {currentCard.status === 'active' ? 
                        'Prevent new transactions with this card' : 
                        'Reactivate this card for transactions'}
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

      {/* PIN Change Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={pinModalVisible}
        onRequestClose={() => setPinModalVisible(false)}
      >
        <View className={`flex-1 justify-center items-center ${theme === "dark" ? "bg-black/70" : "bg-black/50"}`}>
          <View className={`w-11/12 p-6 rounded-xl ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
            <Text className={`text-xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-black"}`}>
              Change PIN
            </Text>
            
            <Text className={`mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Current PIN</Text>
            <TextInput
              className={`p-3 mb-4 rounded-lg border ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`}
              placeholder="Enter current PIN"
              placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
              secureTextEntry
              keyboardType="numeric"
              maxLength={6}
              value={currentPin}
              onChangeText={setCurrentPin}
            />
            
            <Text className={`mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>New PIN (6 digits)</Text>
            <TextInput
              className={`p-3 mb-4 rounded-lg border ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`}
              placeholder="Enter new PIN"
              placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
              secureTextEntry
              keyboardType="numeric"
              maxLength={6}
              value={newPin}
              onChangeText={setNewPin}
            />
            
            <Text className={`mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Confirm New PIN</Text>
            <TextInput
              className={`p-3 mb-6 rounded-lg border ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`}
              placeholder="Confirm new PIN"
              placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
              secureTextEntry
              keyboardType="numeric"
              maxLength={6}
              value={confirmPin}
              onChangeText={setConfirmPin}
            />
            
            <View className="flex-row justify-between">
              <TouchableOpacity
                className={`px-4 py-2 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}
                onPress={() => setPinModalVisible(false)}
                disabled={isChangingPin}
              >
                <Text className={theme === "dark" ? "text-white" : "text-black"}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                className={`px-4 py-2 rounded-lg bg-blue-600`}
                onPress={handleChangePin}
                disabled={isChangingPin || !currentPin || !newPin || !confirmPin}
              >
                {isChangingPin ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white">Change PIN</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}