import * as React from "react"
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons"
import Animated, { FadeInDown } from "react-native-reanimated"
import { Picker } from "@react-native-picker/picker"
import { useTheme } from "@/app/providers/ThemeProvider"
import { useRouter } from "expo-router";
export default function StatementDownloadScreen({ navigation }: any) {
  const router = useRouter();
  const insets = useSafeAreaInsets()
  const { theme } = useTheme()
  const [selectedAccount, setSelectedAccount] = React.useState("1")
  const [selectedYear, setSelectedYear] = React.useState("2023")
  const [selectedMonth, setSelectedMonth] = React.useState("3") // March
  const [isDownloading, setIsDownloading] = React.useState(false)

  const accounts = [
    { id: "1", name: "Current Account", number: "TN59 1234 5678 9012 3456 7890" },
    { id: "2", name: "Savings Account", number: "TN59 8765 4321 0987 6543 2109" },
    { id: "3", name: "Business Account", number: "TN59 2468 1357 9080 7060 5040" },
  ]

  const years = ["2023", "2022", "2021", "2020", "2019"]

  const months = [
    { id: "1", name: "January" },
    { id: "2", name: "February" },
    { id: "3", name: "March" },
    { id: "4", name: "April" },
    { id: "5", name: "May" },
    { id: "6", name: "June" },
    { id: "7", name: "July" },
    { id: "8", name: "August" },
    { id: "9", name: "September" },
    { id: "10", name: "October" },
    { id: "11", name: "November" },
    { id: "12", name: "December" },
  ]

  const handleDownload = () => {
    setIsDownloading(true)
    setTimeout(() => {
      setIsDownloading(false)
    }, 2000)
  }

  return (
    <View className={`flex-1 ${theme === "dark" ? "bg-[#121212]" : "bg-white"}`}>
      <StatusBar 
        barStyle={theme === "dark" ? "light-content" : "dark-content"} 
        backgroundColor={theme === "dark" ? "#121212" : "#ffffff"} 
      />

      <View className={`px-5 py-4 flex-row items-center justify-between border-b ${theme === "dark" ? "border-gray-800" : "border-gray-100"}`}>
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color={theme === "dark" ? "#f8fafc" : "#0f172a"} />
        </TouchableOpacity>
        <Text className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
          Download Statement
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView className="flex mb-20" showsVerticalScrollIndicator={false}>
        <View className="p-5">
          <View 
            className={`p-5 rounded-xl mb-6 ${theme === "dark" ? "bg-gray-800" : "bg-blue-50"}`}
          >
            <Text className={`text-center mb-2 ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>
              Download your account statements for any month
            </Text>
            <Text className={`text-sm text-center ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>
              Statements are available in PDF format and can be downloaded for the past 5 years
            </Text>
          </View>

          <View className="mb-6">
            <Text className={`text-base font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>
              Select Account
            </Text>
            <View className={`border rounded-lg overflow-hidden ${theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-200"}`}>
              <Picker
                selectedValue={selectedAccount}
                onValueChange={(itemValue) => setSelectedAccount(itemValue)}
                style={{ 
                  height: 50,
                  color: theme === "dark" ? "white" : "black"
                }}
                dropdownIconColor={theme === "dark" ? "#9ca3af" : "#64748b"}
              >
                {accounts.map((account) => (
                  <Picker.Item
                    key={account.id}
                    label={`${account.name} (${account.number.substring(0, 10)}...)`}
                    value={account.id}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View className="mb-6">
            <Text className={`text-base font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>
              Select Year
            </Text>
            <View className={`border rounded-lg overflow-hidden ${theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-200"}`}>
              <Picker
                selectedValue={selectedYear}
                onValueChange={(itemValue) => setSelectedYear(itemValue)}
                style={{ 
                  height: 50,
                  color: theme === "dark" ? "white" : "black"
                }}
                dropdownIconColor={theme === "dark" ? "#9ca3af" : "#64748b"}
              >
                {years.map((year) => (
                  <Picker.Item key={year} label={year} value={year} />
                ))}
              </Picker>
            </View>
          </View>

          <View className="mb-6">
            <Text className={`text-base font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>
              Select Month
            </Text>
            <View className={`border rounded-lg overflow-hidden ${theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-200"}`}>
              <Picker
                selectedValue={selectedMonth}
                onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                style={{ 
                  height: 50,
                  color: theme === "dark" ? "white" : "black"
                }}
                dropdownIconColor={theme === "dark" ? "#9ca3af" : "#64748b"}
              >
                {months.map((month) => (
                  <Picker.Item key={month.id} label={month.name} value={month.id} />
                ))}
              </Picker>
            </View>
          </View>

          <View className="mb-6">
            <Text className={`text-base font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>
              Format
            </Text>
            <View className="flex-row">
              <TouchableOpacity className={`flex-row items-center py-3 px-4 rounded-lg mr-3 ${theme === "dark" ? "bg-blue-900/30" : "bg-blue-100"}`}>
                <MaterialIcons name="picture-as-pdf" size={20} color={theme === "dark" ? "#93c5fd" : "#2563eb"} />
                <Text className={`font-medium ml-2 ${theme === "dark" ? "text-blue-300" : "text-blue-700"}`}>PDF</Text>
              </TouchableOpacity>

              <TouchableOpacity className={`flex-row items-center py-3 px-4 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
                <MaterialIcons name="table-chart" size={20} color={theme === "dark" ? "#9ca3af" : "#64748b"} />
                <Text className={`font-medium ml-2 ${theme === "dark" ? "text-gray-300" : "text-slate-500"}`}>CSV</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            className={`py-4 rounded-lg items-center mb-6 flex-row justify-center ${
              isDownloading ? "bg-blue-400" : "bg-blue-600"
            }`}
            onPress={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <>
                <MaterialIcons name="hourglass-top" size={20} color="white" />
                <Text className="text-white font-bold text-base ml-2">Downloading...</Text>
              </>
            ) : (
              <>
                <Feather name="download" size={20} color="white" />
                <Text className="text-white font-bold text-base ml-2">Download Statement</Text>
              </>
            )}
          </TouchableOpacity>

          <View className={`rounded-2xl p-5 mb-4 ${theme === "dark" ? "bg-gray-800" : "bg-white border border-gray-100"}`}>
            <Text className={`text-lg font-bold mb-4 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              Recent Downloads
            </Text>

            <View className={`flex-row justify-between items-center py-3 border-b ${theme === "dark" ? "border-gray-700" : "border-gray-100"}`}>
              <View className="flex-row items-center">
                <MaterialIcons name="picture-as-pdf" size={20} color="#ef4444" />
                <View className="ml-3">
                  <Text className={`text-base font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    March 2023 Statement
                  </Text>
                  <Text className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>
                    Current Account • 1.2 MB
                  </Text>
                </View>
              </View>
              <Text className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>Apr 1, 2023</Text>
            </View>

            <View className={`flex-row justify-between items-center py-3 border-b ${theme === "dark" ? "border-gray-700" : "border-gray-100"}`}>
              <View className="flex-row items-center">
                <MaterialIcons name="picture-as-pdf" size={20} color="#ef4444" />
                <View className="ml-3">
                  <Text className={`text-base font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    February 2023 Statement
                  </Text>
                  <Text className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>
                    Savings Account • 0.9 MB
                  </Text>
                </View>
              </View>
              <Text className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>Mar 5, 2023</Text>
            </View>

            <View className="flex-row justify-between items-center py-3">
              <View className="flex-row items-center">
                <MaterialIcons name="picture-as-pdf" size={20} color="#ef4444" />
                <View className="ml-3">
                  <Text className={`text-base font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    January 2023 Statement
                  </Text>
                  <Text className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>
                    Current Account • 1.1 MB
                  </Text>
                </View>
              </View>
              <Text className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>Feb 3, 2023</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}