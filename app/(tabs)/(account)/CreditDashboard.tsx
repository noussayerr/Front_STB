import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { useTheme } from "@/app/providers/ThemeProvider";
import { useRouter } from "expo-router";
import { useCreditStore } from "@/app/zustand/useCreditStore";
import { format } from "date-fns";

export default function CreditDashboardScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const router = useRouter();
  const {
    userCredits,
    creditSummary,
    currentCreditDetails,
    fetchUserCredits,
    fetchCreditDetails,
    isLoading
  } = useCreditStore();
  const [selectedCreditId, setSelectedCreditId] = useState<string | null>(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);

  useEffect(() => {
    fetchUserCredits();
  }, []);

  const handleCreditPress = async (creditId: string) => {
    setSelectedCreditId(creditId);
    await fetchCreditDetails(creditId);
    setDetailsModalVisible(true);
  };

  const formatCurrency = (value: number) => {
    return value?.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }) || '0.00';
  };

  const formatDate = (dateString: string | Date | null | undefined) => {
    if (!dateString) return 'N/A';
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return format(date, 'MMM d, yyyy');
  };

  if (isLoading && userCredits.length === 0) {
    return (
      <View className={`flex-1 items-center justify-center ${theme === "dark" ? "bg-[#121212]" : "bg-white"}`}>
        <Text className={theme === "dark" ? "text-white" : "text-slate-900"}>Loading...</Text>
      </View>
    );
  }

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
            <Text className="text-white text-3xl font-bold">
              {formatCurrency(creditSummary?.totalBalance || 0)} DT
            </Text>

            <View className="flex-row justify-between mt-4">
              <View>
                <Text className="text-white/80 text-xs">Monthly Payment</Text>
                <Text className="text-white text-base font-semibold">
                  {formatCurrency(creditSummary?.totalMonthlyPayment || 0)} DT
                </Text>
              </View>
              <View>
                <Text className="text-white/80 text-xs">Next Payment</Text>
                <Text className="text-white text-base font-semibold">
                  {formatCurrency(creditSummary?.nextPayment || 0)} DT
                </Text>
              </View>
              <View>
                <Text className="text-white/80 text-xs">Due Date</Text>
                <Text className="text-white text-base font-semibold">
                  {creditSummary?.nextPaymentDate ? formatDate(creditSummary.nextPaymentDate) : 'N/A'}
                </Text>
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

          {userCredits.length === 0 ? (
            <View className={`p-5 rounded-2xl ${theme === "dark" ? "bg-gray-800" : "bg-white border border-gray-100"}`}>
              <Text className={`text-center ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>
                You don't have any active credits
              </Text>
            </View>
          ) : (
            userCredits.map((credit) => (
              <View
                key={credit._id}
                className={`rounded-2xl p-5 mb-4 ${theme === "dark" ? "bg-gray-800" : "bg-white border border-gray-100"}`}
                style={{
                  shadowColor: theme === "dark" ? "transparent" : "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: theme === "dark" ? 0 : 0.05,
                  shadowRadius: 5,
                  elevation: theme === "dark" ? 0 : 2,
                }}
              >
                <TouchableOpacity onPress={() => handleCreditPress(credit._id)}>
                  <View className="flex-row justify-between items-center mb-3">
                    <View className="flex-row items-center">
                      <View className={`w-10 h-10 rounded-full items-center justify-center ${theme === "dark" ? "bg-blue-900/30" : "bg-blue-100"}`}>
                        <MaterialIcons
                          name={credit.creditType?.title?.includes("Home") ? "home" : "directions-car"}
                          size={20}
                          color={theme === "dark" ? "#93c5fd" : "#2563eb"}
                        />
                      </View>
                      <View className="ml-3">
                        <Text className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                          {credit.creditType?.title || 'Credit'}
                        </Text>
                        <Text className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>
                          {credit.interestRate}% • {credit.term} years
                        </Text>
                      </View>
                    </View>
                    <AntDesign name="right" size={16} color={theme === "dark" ? "#9ca3af" : "#64748b"} />
                  </View>

                  <View className="mb-3">
                    <View className="flex-row justify-between mb-1">
                      <Text className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>Progress</Text>
                      <Text className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>
                        {Math.round(((credit.amount - (credit.remainingBalance || 0)) / credit.amount) * 100)}%
                      </Text>
                    </View>
                    <Progress.Bar
                      progress={(credit.amount - (credit.remainingBalance || 0)) / credit.amount}
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
                        {formatCurrency(credit.remainingBalance)} DT
                      </Text>
                    </View>
                    <View>
                      <Text className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>Next Payment</Text>
                      <Text className={`text-base font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                        {formatCurrency(credit.monthlyPayment)} DT
                      </Text>
                    </View>
                    <View>
                      <Text className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>Due Date</Text>
                      <Text className={`text-base font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                        {creditSummary?.nextPaymentDate ? formatDate(creditSummary.nextPaymentDate) : 'N/A'}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Credit Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={detailsModalVisible}
        onRequestClose={() => setDetailsModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className={`rounded-2xl p-5 mx-5 w-[90%] max-h-[80%] ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
            <View className="flex-row justify-between items-center mb-4">
              <Text className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                Credit Details
              </Text>
              <TouchableOpacity onPress={() => setDetailsModalVisible(false)}>
                <AntDesign name="close" size={20} color={theme === "dark" ? "#9ca3af" : "#64748b"} />
              </TouchableOpacity>
            </View>

            <ScrollView>
              {currentCreditDetails && (
                <View className="space-y-4">
                  <View className={`p-4 rounded-xl ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
                    <Text className={`font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                      {currentCreditDetails.creditType?.title || 'Credit'}
                    </Text>
                    <Text className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-slate-600"}`}>
                      Account: ****{currentCreditDetails.bankingAccount?.accountNumber?.slice(-4) || '****'}
                    </Text>
                  </View>

                  <View className="space-y-3">
                    <View className="flex-row justify-between">
                      <Text className={`${theme === "dark" ? "text-gray-300" : "text-slate-600"}`}>Original Amount</Text>
                      <Text className={`font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                        {formatCurrency(currentCreditDetails.amount)} DT
                      </Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className={`${theme === "dark" ? "text-gray-300" : "text-slate-600"}`}>Remaining Balance</Text>
                      <Text className={`font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                        {formatCurrency(currentCreditDetails.remainingBalance)} DT
                      </Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className={`${theme === "dark" ? "text-gray-300" : "text-slate-600"}`}>Interest Rate</Text>
                      <Text className={`font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                        {currentCreditDetails.interestRate}%
                      </Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className={`${theme === "dark" ? "text-gray-300" : "text-slate-600"}`}>Monthly Payment</Text>
                      <Text className={`font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                        {formatCurrency(currentCreditDetails.monthlyPayment)} DT
                      </Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className={`${theme === "dark" ? "text-gray-300" : "text-slate-600"}`}>Term</Text>
                      <Text className={`font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                        {currentCreditDetails.term} years
                      </Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className={`${theme === "dark" ? "text-gray-300" : "text-slate-600"}`}>Start Date</Text>
                      <Text className={`font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                        {formatDate(currentCreditDetails.startDate)}
                      </Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className={`${theme === "dark" ? "text-gray-300" : "text-slate-600"}`}>End Date</Text>
                      <Text className={`font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                        {formatDate(currentCreditDetails.endDate)}
                      </Text>
                    </View>
                  </View>

                  <View className="mt-4">
                    <Text className={`font-bold mb-2 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                      Payment History
                    </Text>
                    {currentCreditDetails.paymentHistory?.length > 0 ? (
                      currentCreditDetails.paymentHistory.slice(0, 5).map((payment, index) => (
                        <View 
                          key={index} 
                          className={`flex-row justify-between items-center py-2 ${index !== 0 ? 'border-t' : ''} ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
                        >
                          <View>
                            <Text className={`${theme === "dark" ? "text-gray-300" : "text-slate-600"}`}>
                              {formatDate(payment.paymentDate)}
                            </Text>
                            <Text className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>
                              {payment.status}
                            </Text>
                          </View>
                          <Text className={`font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                            {formatCurrency(payment.amount)} DT
                          </Text>
                        </View>
                      ))
                    ) : (
                      <Text className={`text-center ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>
                        No payment history available
                      </Text>
                    )}
                  </View>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}