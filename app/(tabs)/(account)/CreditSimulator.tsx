import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, StatusBar, TextInput, Modal, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "@/app/providers/ThemeProvider";
import { useRouter, useLocalSearchParams } from "expo-router";
import Slider from "@react-native-community/slider";

export default function CreditSimulatorScreen() {
  const router = useRouter();
  const { 
    creditid, 
    interestRate: initialInterestRate = "5.5", 
    duration: initialDuration = "12",
    title: creditTitle = "Credit Simulator",
    maxTerm: creditMaxTerm = "5"
  } = useLocalSearchParams<{ 
    creditid?: string,
    interestRate?: string,
    duration?: string,
    title?: string,
    maxTerm?: string
  }>();
  
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  
  // Convert passed parameters to numbers
  const initialInterest = parseFloat(initialInterestRate);
  const initialDurationMonths = parseInt(initialDuration);
  const maxTermYears = parseInt(creditMaxTerm);
  
  // Form state with defaults from route params
  const [loanAmount, setLoanAmount] = useState("10000");
  const [interestRate, setInterestRate] = useState(initialInterest);
  const [loanTerm, setLoanTerm] = useState(
    Math.min(Math.ceil(initialDurationMonths / 12), maxTermYears)
  );
  const [showResults, setShowResults] = useState(false);

  // Calculate loan details
  const calculateMonthlyPayment = () => {
    const principal = parseFloat(loanAmount.replace(/,/g, "")) || 0;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (monthlyRate === 0) { // Handle 0% interest case
      return principal / numberOfPayments;
    }

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return isNaN(monthlyPayment) ? 0 : monthlyPayment;
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalPayment = monthlyPayment * loanTerm * 12;
  const totalInterest = totalPayment - (parseFloat(loanAmount.replace(/,/g, "")) || 0);

  const formatCurrency = (value: number) => {
    return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  const handleSimulate = () => {
    setShowResults(true);
  };

  const handleApply = () => {
  setShowResults(false);
  router.push({
    pathname: "/(tabs)/(account)/applycredit",
    params: { 
      creditId: creditid,
      amount: loanAmount.replace(/,/g, ""),
      duration: loanTerm.toString(),
      monthlyPayment: monthlyPayment.toFixed(2), // This ensures 2 decimal places
      interestRate: interestRate.toString(),
      title: creditTitle
    }
  });
};

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
          {creditTitle}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView className="flex mb-20" showsVerticalScrollIndicator={false}>
        <View className="p-5">
          <View className={`p-5 rounded-xl mb-6 ${theme === "dark" ? "bg-gray-800" : "bg-blue-50"}`}>
            <Text className={`text-center mb-2 ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>
              Simulate your loan to see monthly payments, total interest, and more.
            </Text>
          </View>

          {/* Loan Amount Section */}
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
                  const numericValue = text.replace(/[^0-9]/g, "");
                  const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  setLoanAmount(formattedValue);
                }}
                keyboardType="numeric"
                placeholder="10,000"
                placeholderTextColor={theme === "dark" ? "#9ca3af" : "#94a3b8"}
              />
            </View>
            <Slider
              minimumValue={1000}
              maximumValue={100000}
              step={1000}
              value={parseFloat(loanAmount.replace(/,/g, "")) || 1000}
              onValueChange={(value) => {
                setLoanAmount(value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
              }}
              minimumTrackTintColor="#2563eb"
              maximumTrackTintColor={theme === "dark" ? "#374151" : "#e2e8f0"}
              thumbTintColor="#2563eb"
            />
            <View className="flex-row justify-between">
              <Text className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>1,000 DT</Text>
              <Text className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>100,000 DT</Text>
            </View>
          </View>

          {/* Fixed Interest Rate Section */}
          <View className="mb-6">
            <Text className={`text-base font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>
              Interest Rate
            </Text>
            <View className={`rounded-lg px-4 py-3 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
              <Text className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                {interestRate.toFixed(2)}% (Fixed)
              </Text>
            </View>
          </View>

          {/* Loan Term Section */}
          <View className="mb-6">
            <Text className={`text-base font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>
              Loan Term: {loanTerm} years
            </Text>
            <Slider
              minimumValue={1}
              maximumValue={maxTermYears}
              step={1}
              value={loanTerm}
              onValueChange={(value) => setLoanTerm(value)}
              minimumTrackTintColor="#2563eb"
              maximumTrackTintColor={theme === "dark" ? "#374151" : "#e2e8f0"}
              thumbTintColor="#2563eb"
            />
            <View className="flex-row justify-between">
              <Text className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>1 year</Text>
              <Text className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>
                {maxTermYears} years
              </Text>
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
        onRequestClose={() => setShowResults(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View 
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
                  {formatCurrency(monthlyPayment)} DT
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
                onPress={handleApply}
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
          </View>
        </View>
      </Modal>
    </View>
  );
}