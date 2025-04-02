import * as React from "react";
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Switch } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign, MaterialIcons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTheme } from "@/app/providers/ThemeProvider";

interface NotificationSettings {
  pushNotifications: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  deposits: boolean;
  withdrawals: boolean;
  transactions: boolean;
  bills: boolean;
  security: boolean;
  marketing: boolean;
  creditAlerts: boolean;
}

export default function NotificationSettingsScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  const [settings, setSettings] = React.useState<NotificationSettings>({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    deposits: true,
    withdrawals: true,
    transactions: true,
    bills: true,
    security: true,
    marketing: false,
    creditAlerts: true,
  });

  const toggleSetting = (setting: keyof NotificationSettings) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const getIconColor = (color: string) => {
    return theme === "dark" ? 
      color === "#2563eb" ? "#93c5fd" :
      color === "#16a34a" ? "#86efac" :
      color === "#ef4444" ? "#fca5a5" :
      color === "#9333ea" ? "#c4b5fd" :
      color === "#d97706" ? "#fcd34d" :
      "#9ca3af" : color;
  };

  return (
    <View className={`flex-1 ${theme === "dark" ? "bg-[#121212]" : "bg-white"}`} style={{ paddingTop: insets.top }}>
      <StatusBar 
        barStyle={theme === "dark" ? "light-content" : "dark-content"} 
        backgroundColor={theme === "dark" ? "#121212" : "#ffffff"} 
      />

      <View className={`px-5 py-4 flex-row items-center justify-between border-b ${theme === "dark" ? "border-gray-800" : "border-gray-100"}`}>
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color={theme === "dark" ? "#f8fafc" : "#0f172a"} />
        </TouchableOpacity>
        <Text className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>Notification Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView className="flex mb-20" showsVerticalScrollIndicator={false}>
        <View className="p-5">
          <Text className={`text-base font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>Notification Channels</Text>

          <View className={`rounded-xl overflow-hidden mb-6 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"} border`}>
            <View className={`px-4 py-4 flex-row justify-between items-center border-b ${theme === "dark" ? "border-gray-700" : "border-gray-100"}`}>
              <View className="flex-row items-center">
                <Feather name="bell" size={20} color={getIconColor("#2563eb")} />
                <Text className={`ml-3 text-base ${theme === "dark" ? "text-white" : "text-slate-800"}`}>Push Notifications</Text>
              </View>
              <Switch
                value={settings.pushNotifications}
                onValueChange={() => toggleSetting("pushNotifications")}
                trackColor={{ false: theme === "dark" ? "#374151" : "#e2e8f0", true: theme === "dark" ? "#1e40af" : "#bfdbfe" }}
                thumbColor={settings.pushNotifications ? getIconColor("#2563eb") : (theme === "dark" ? "#9ca3af" : "#94a3b8")}
              />
            </View>

            <View className={`px-4 py-4 flex-row justify-between items-center border-b ${theme === "dark" ? "border-gray-700" : "border-gray-100"}`}>
              <View className="flex-row items-center">
                <Feather name="mail" size={20} color={getIconColor("#2563eb")} />
                <Text className={`ml-3 text-base ${theme === "dark" ? "text-white" : "text-slate-800"}`}>Email Notifications</Text>
              </View>
              <Switch
                value={settings.emailNotifications}
                onValueChange={() => toggleSetting("emailNotifications")}
                trackColor={{ false: theme === "dark" ? "#374151" : "#e2e8f0", true: theme === "dark" ? "#1e40af" : "#bfdbfe" }}
                thumbColor={settings.emailNotifications ? getIconColor("#2563eb") : (theme === "dark" ? "#9ca3af" : "#94a3b8")}
              />
            </View>

            <View className="px-4 py-4 flex-row justify-between items-center">
              <View className="flex-row items-center">
                <Feather name="message-square" size={20} color={getIconColor("#2563eb")} />
                <Text className={`ml-3 text-base ${theme === "dark" ? "text-white" : "text-slate-800"}`}>SMS Notifications</Text>
              </View>
              <Switch
                value={settings.smsNotifications}
                onValueChange={() => toggleSetting("smsNotifications")}
                trackColor={{ false: theme === "dark" ? "#374151" : "#e2e8f0", true: theme === "dark" ? "#1e40af" : "#bfdbfe" }}
                thumbColor={settings.smsNotifications ? getIconColor("#2563eb") : (theme === "dark" ? "#9ca3af" : "#94a3b8")}
              />
            </View>
          </View>

          <Text className={`text-base font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>Transaction Alerts</Text>

          <View className={`rounded-xl overflow-hidden mb-6 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"} border`}>
            <View className={`px-4 py-4 flex-row justify-between items-center border-b ${theme === "dark" ? "border-gray-700" : "border-gray-100"}`}>
              <View className="flex-row items-center">
                <MaterialIcons name="arrow-downward" size={20} color={getIconColor("#16a34a")} />
                <Text className={`ml-3 text-base ${theme === "dark" ? "text-white" : "text-slate-800"}`}>Deposits</Text>
              </View>
              <Switch
                value={settings.deposits}
                onValueChange={() => toggleSetting("deposits")}
                trackColor={{ false: theme === "dark" ? "#374151" : "#e2e8f0", true: theme === "dark" ? "#1e40af" : "#bfdbfe" }}
                thumbColor={settings.deposits ? getIconColor("#2563eb") : (theme === "dark" ? "#9ca3af" : "#94a3b8")}
              />
            </View>

            <View className={`px-4 py-4 flex-row justify-between items-center border-b ${theme === "dark" ? "border-gray-700" : "border-gray-100"}`}>
              <View className="flex-row items-center">
                <MaterialIcons name="arrow-upward" size={20} color={getIconColor("#ef4444")} />
                <Text className={`ml-3 text-base ${theme === "dark" ? "text-white" : "text-slate-800"}`}>Withdrawals</Text>
              </View>
              <Switch
                value={settings.withdrawals}
                onValueChange={() => toggleSetting("withdrawals")}
                trackColor={{ false: theme === "dark" ? "#374151" : "#e2e8f0", true: theme === "dark" ? "#1e40af" : "#bfdbfe" }}
                thumbColor={settings.withdrawals ? getIconColor("#2563eb") : (theme === "dark" ? "#9ca3af" : "#94a3b8")}
              />
            </View>

            <View className={`px-4 py-4 flex-row justify-between items-center border-b ${theme === "dark" ? "border-gray-700" : "border-gray-100"}`}>
              <View className="flex-row items-center">
                <MaterialIcons name="payment" size={20} color={getIconColor("#2563eb")} />
                <Text className={`ml-3 text-base ${theme === "dark" ? "text-white" : "text-slate-800"}`}>Card Transactions</Text>
              </View>
              <Switch
                value={settings.transactions}
                onValueChange={() => toggleSetting("transactions")}
                trackColor={{ false: theme === "dark" ? "#374151" : "#e2e8f0", true: theme === "dark" ? "#1e40af" : "#bfdbfe" }}
                thumbColor={settings.transactions ? getIconColor("#2563eb") : (theme === "dark" ? "#9ca3af" : "#94a3b8")}
              />
            </View>

            <View className="px-4 py-4 flex-row justify-between items-center">
              <View className="flex-row items-center">
                <MaterialIcons name="receipt" size={20} color={getIconColor("#2563eb")} />
                <Text className={`ml-3 text-base ${theme === "dark" ? "text-white" : "text-slate-800"}`}>Bill Payments</Text>
              </View>
              <Switch
                value={settings.bills}
                onValueChange={() => toggleSetting("bills")}
                trackColor={{ false: theme === "dark" ? "#374151" : "#e2e8f0", true: theme === "dark" ? "#1e40af" : "#bfdbfe" }}
                thumbColor={settings.bills ? getIconColor("#2563eb") : (theme === "dark" ? "#9ca3af" : "#94a3b8")}
              />
            </View>
          </View>

          <Text className={`text-base font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>Other Notifications</Text>

          <View className={`rounded-xl overflow-hidden mb-6 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"} border`}>
            <View className={`px-4 py-4 flex-row justify-between items-center border-b ${theme === "dark" ? "border-gray-700" : "border-gray-100"}`}>
              <View className="flex-row items-center">
                <MaterialIcons name="security" size={20} color={getIconColor("#9333ea")} />
                <Text className={`ml-3 text-base ${theme === "dark" ? "text-white" : "text-slate-800"}`}>Security Alerts</Text>
              </View>
              <Switch
                value={settings.security}
                onValueChange={() => toggleSetting("security")}
                trackColor={{ false: theme === "dark" ? "#374151" : "#e2e8f0", true: theme === "dark" ? "#1e40af" : "#bfdbfe" }}
                thumbColor={settings.security ? getIconColor("#2563eb") : (theme === "dark" ? "#9ca3af" : "#94a3b8")}
              />
            </View>

            <View className={`px-4 py-4 flex-row justify-between items-center border-b ${theme === "dark" ? "border-gray-700" : "border-gray-100"}`}>
              <View className="flex-row items-center">
                <MaterialIcons name="credit-card" size={20} color={getIconColor("#d97706")} />
                <Text className={`ml-3 text-base ${theme === "dark" ? "text-white" : "text-slate-800"}`}>Credit Alerts</Text>
              </View>
              <Switch
                value={settings.creditAlerts}
                onValueChange={() => toggleSetting("creditAlerts")}
                trackColor={{ false: theme === "dark" ? "#374151" : "#e2e8f0", true: theme === "dark" ? "#1e40af" : "#bfdbfe" }}
                thumbColor={settings.creditAlerts ? getIconColor("#2563eb") : (theme === "dark" ? "#9ca3af" : "#94a3b8")}
              />
            </View>

            <View className="px-4 py-4 flex-row justify-between items-center">
              <View className="flex-row items-center">
                <MaterialIcons name="campaign" size={20} color={getIconColor("#64748b")} />
                <Text className={`ml-3 text-base ${theme === "dark" ? "text-white" : "text-slate-800"}`}>Marketing & Offers</Text>
              </View>
              <Switch
                value={settings.marketing}
                onValueChange={() => toggleSetting("marketing")}
                trackColor={{ false: theme === "dark" ? "#374151" : "#e2e8f0", true: theme === "dark" ? "#1e40af" : "#bfdbfe" }}
                thumbColor={settings.marketing ? getIconColor("#2563eb") : (theme === "dark" ? "#9ca3af" : "#94a3b8")}
              />
            </View>
          </View>

          <TouchableOpacity
            className="bg-blue-600 py-4 rounded-lg items-center mb-4"
            onPress={() => {
              // Save settings logic would go here
              router.back();
            }}
          >
            <Text className="text-white font-bold text-base">Save Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="py-4 rounded-lg items-center"
            onPress={() => {
              setSettings({
                pushNotifications: true,
                emailNotifications: true,
                smsNotifications: false,
                deposits: true,
                withdrawals: true,
                transactions: true,
                bills: true,
                security: true,
                marketing: false,
                creditAlerts: true,
              });
            }}
          >
            <Text className={`font-medium text-base ${theme === "dark" ? "text-gray-300" : "text-slate-600"}`}>Reset to Default</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}