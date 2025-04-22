import * as React from "react"
import { View, Text, TouchableOpacity, ScrollView, StatusBar, TextInput, Modal, Pressable } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { AntDesign } from "@expo/vector-icons"
import Animated, { FadeInDown } from "react-native-reanimated"
import Slider from "@react-native-community/slider"
import { useTheme } from "@/app/providers/ThemeProvider"
import { useRouter } from "expo-router";

export default function CreditSimulatorScreen({ navigation }: any) {
  const router = useRouter();
  const insets = useSafeAreaInsets()
  const { theme } = useTheme()
  const [loanAmount, setLoanAmount] = React.useState("100000")
  const [interestRate, setInterestRate] = React.useState(5.5)
  const [loanTerm, setLoanTerm] = React.useState(20)
  const [showResults, setShowResults] = React.useState(false)

  const calculateMonthlyPayment = () => {
    const principal = Number.parseFloat(loanAmount.replace(/,/g, ""))
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm * 12

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    return isNaN(monthlyPayment) ? 0 : monthlyPayment
  }

  const totalPayment = calculateMonthlyPayment() * loanTerm * 12
  const totalInterest = totalPayment - Number.parseFloat(loanAmount.replace(/,/g, ""))

  const formatCurrency = (value: number) => {
    return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
  }

  const handleSimulate = () => {
    setShowResults(true)
  }

  return (
    <View className={`flex-1 ${theme === "dark" ? "bg-[#121212]" : "bg-white"}`}>
      <StatusBar 
        barStyle={theme === "dark" ? "light-content" : "dark-content"} 
        backgroundColor={theme === "dark" ? "#121212" : "#ffffff"} 
      />

      <View className={`px-5 py-4 flex-row items-center gap-2 border-b ${theme === "dark" ? "border-gray-800" : "border-gray-100"}`}>
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color={theme === "dark" ? "#f8fafc" : "#0f172a"} />
        </TouchableOpacity>
        <Text className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
          Credit Simulator
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView className="flex mb-20" showsVerticalScrollIndicator={false}>
        <View className="p-5">
          <Animated.View 
            entering={FadeInDown.duration(400)} 
            className={`p-5 rounded-xl mb-6 ${theme === "dark" ? "bg-gray-800" : "bg-blue-50"}`}
          >
            <Text className={`text-center mb-2 ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>
              Simulate your loan to see monthly payments, total interest, and more.
            </Text>
            <Text className={`text-sm text-center ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>
              Adjust the sliders below to customize your loan parameters.
            </Text>
          </Animated.View>

          <View className="mb-6">
            <Text className={`text-base font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>
              Loan Amount
            </Text>
            <View className={`flex-row items-center rounded-lg px-4 py-3 mb-2 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
              <Text className={`mr-2 ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>DT</Text>
              <TextInput
                className={`flex-1 text-lg font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                value={loanAmount}
                onChangeText={(text) => {
                  const numericValue = text.replace(/[^0-9]/g, "")
                  const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  setLoanAmount(formattedValue)
                }}
                keyboardType="numeric"
                placeholderTextColor={theme === "dark" ? "#9ca3af" : "#94a3b8"}
              />
            </View>
            <Slider
              minimumValue={10000}
              maximumValue={500000}
              step={5000}
              value={Number.parseFloat(loanAmount.replace(/,/g, ""))}
              onValueChange={(value) => {
                setLoanAmount(value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
              }}
              minimumTrackTintColor="#2563eb"
              maximumTrackTintColor={theme === "dark" ? "#374151" : "#e2e8f0"}
              thumbTintColor="#2563eb"
            />
            <View className="flex-row justify-between">
              <Text className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>10,000 DT</Text>
              <Text className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>500,000 DT</Text>
            </View>
          </View>

          <View className="mb-6">
            <Text className={`text-base font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>
              Interest Rate: {interestRate.toFixed(2)}%
            </Text>
            <Slider
              minimumValue={1}
              maximumValue={15}
              step={0.1}
              value={interestRate}
              onValueChange={(value) => setInterestRate(value)}
              minimumTrackTintColor="#2563eb"
              maximumTrackTintColor={theme === "dark" ? "#374151" : "#e2e8f0"}
              thumbTintColor="#2563eb"
            />
            <View className="flex-row justify-between">
              <Text className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>1%</Text>
              <Text className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>15%</Text>
            </View>
          </View>

          <View className="mb-6">
            <Text className={`text-base font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>
              Loan Term: {loanTerm} years
            </Text>
            <Slider
              minimumValue={1}
              maximumValue={30}
              step={1}
              value={loanTerm}
              onValueChange={(value) => setLoanTerm(value)}
              minimumTrackTintColor="#2563eb"
              maximumTrackTintColor={theme === "dark" ? "#374151" : "#e2e8f0"}
              thumbTintColor="#2563eb"
            />
            <View className="flex-row justify-between">
              <Text className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>1 year</Text>
              <Text className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>30 years</Text>
            </View>
          </View>

          <TouchableOpacity 
            className="bg-blue-600 py-4 rounded-lg items-center mb-6" 
            onPress={handleSimulate}
          >
            <Text className="text-white font-bold text-base">Simulate Loan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Results Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showResults}
        onRequestClose={() => {
          setShowResults(false)
        }}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <Animated.View 
            entering={FadeInDown.duration(400)}
            className={`rounded-2xl p-5 mx-5 w-[90%] ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <View className="flex-row justify-between items-center mb-4">
              <Text className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                Simulation Results
              </Text>
              <Pressable onPress={() => setShowResults(false)}>
                <AntDesign name="close" size={20} color={theme === "dark" ? "#9ca3af" : "#64748b"} />
              </Pressable>
            </View>

            <View className="space-y-4 mb-6">
              <View className={`flex-row justify-between items-center py-2 border-b ${theme === "dark" ? "border-gray-700" : "border-gray-100"}`}>
                <Text className={`text-base ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>Loan Amount</Text>
                <Text className={`text-base font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  {loanAmount} DT
                </Text>
              </View>

              <View className={`flex-row justify-between items-center py-2 border-b ${theme === "dark" ? "border-gray-700" : "border-gray-100"}`}>
                <Text className={`text-base ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>Interest Rate</Text>
                <Text className={`text-base font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  {interestRate.toFixed(2)}%
                </Text>
              </View>

              <View className={`flex-row justify-between items-center py-2 border-b ${theme === "dark" ? "border-gray-700" : "border-gray-100"}`}>
                <Text className={`text-base ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>Loan Term</Text>
                <Text className={`text-base font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  {loanTerm} years
                </Text>
              </View>

              <View className={`flex-row justify-between items-center py-2 border-b ${theme === "dark" ? "border-gray-700" : "border-gray-100"}`}>
                <Text className={`text-base ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>Monthly Payment</Text>
                <Text className="text-lg font-bold text-blue-600">
                  {formatCurrency(calculateMonthlyPayment())} DT
                </Text>
              </View>

              <View className={`flex-row justify-between items-center py-2 border-b ${theme === "dark" ? "border-gray-700" : "border-gray-100"}`}>
                <Text className={`text-base ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>Total Interest</Text>
                <Text className={`text-base font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  {formatCurrency(totalInterest)} DT
                </Text>
              </View>

              <View className="flex-row justify-between items-center py-2">
                <Text className={`text-base ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>Total Payment</Text>
                <Text className={`text-base font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  {formatCurrency(totalPayment)} DT
                </Text>
              </View>
            </View>

            <View className="flex-row">
              <TouchableOpacity
                className="flex-1 bg-blue-600 py-3 rounded-lg items-center mr-2"
                onPress={() => {
                  setShowResults(false)
                  navigation.navigate("RequestCredit", {
                    amount: loanAmount,
                    interestRate: interestRate,
                    term: loanTerm,
                    monthlyPayment: calculateMonthlyPayment(),
                  })
                }}
              >
                <Text className="text-white font-medium">Apply for This Loan</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`flex-1 py-3 rounded-lg items-center ml-2 ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}
                onPress={() => setShowResults(false)}
              >
                <Text className={`font-medium ${theme === "dark" ? "text-white" : "text-slate-700"}`}>Close</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  )
}