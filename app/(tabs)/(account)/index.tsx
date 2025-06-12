import * as React from "react";
import { View, Text, TouchableOpacity, ScrollView, StatusBar, RefreshControl, FlatList, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { router } from 'expo-router';
import { useTheme } from "@/app/providers/ThemeProvider";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import { useAccountStore } from "@/app/zustand/useAccountStore";

type QuickAction = {
  id: string;
  title: string;
  icon: React.ReactNode;
  route: string;
  bgColorLight: string;
  bgColorDark: string;
  iconColorLight: string;
  iconColorDark: string;
};

export default function AccountsScreen() {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = React.useState(false);
  const { theme } = useTheme();
  const { accounts, isLoading, error, fetchUserAccounts } = useAccountStore();
  
  React.useEffect(() => {
    fetchUserAccounts();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchUserAccounts().finally(() => setRefreshing(false));
  }, []);

  const quickActions: QuickAction[] = [
    {
      id: "1",
      title: "Download Statement",
      icon: <Feather name="download" size={22} />,
      route: '/(tabs)/(account)/StatementDownload',
      bgColorLight: "bg-blue-100",
      bgColorDark: "bg-blue-900/30",
      iconColorLight: "#2563eb",
      iconColorDark: "#93c5fd",
    },
    {
      id: "2",
      title: "Explore Accounts",
      icon: <FontAwesome name="bank" size={22} />,
      route: '/(tabs)/(account)/accountsscreen',
      bgColorLight: "bg-green-100",
      bgColorDark: "bg-green-900/30",
      iconColorLight: "#16a34a",
      iconColorDark: "#86efac",
    },
    {
      id: "3",
      title: "Credit Dashboard",
      icon: <MaterialIcons name="credit-card" size={22} />,
      route: '/(tabs)/(account)/CreditDashboard',
      bgColorLight: "bg-purple-100",
      bgColorDark: "bg-purple-900/30",
      iconColorLight: "#9333ea",
      iconColorDark: "#c4b5fd",
    },
    {
      id: "4",
      title: "Credit Simulator",
      icon: <MaterialIcons name="calculate" size={22} />,
      route: '/(tabs)/(account)/CreditSimulator',
      bgColorLight: "bg-amber-100",
      bgColorDark: "bg-amber-900/30",
      iconColorLight: "#d97706",
      iconColorDark: "#fcd34d",
    },
  ];

  const getAccountIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "current":
        return "account-balance";
      case "savings":
        return "savings";
      case "business":
        return "business";
      default:
        return "account-balance";
    }
  };

  const getAccountIconColor = (type: string) => {
    if (theme === "dark") {
      return type === "current" 
        ? "#93c5fd" 
        : type === "savings" 
          ? "#86efac" 
          : "#c4b5fd";
    }
    return type === "current" 
      ? "#2563eb" 
      : type === "savings" 
        ? "#16a34a" 
        : "#9333ea";
  };

  const getAccountBgColor = (type: string) => {
    return type === "current"
      ? theme === "dark" 
        ? "bg-blue-900/30" 
        : "bg-blue-100"
      : type === "savings"
        ? theme === "dark" 
          ? "bg-green-900/30" 
          : "bg-green-100"
        : theme === "dark" 
          ? "bg-purple-900/30" 
          : "bg-purple-100";
  };

  const renderAccountItem = ({ item, index }: { item: Account; index: number }) => (
    <View>
      <TouchableOpacity
        className="flex-row justify-between items-center m-4 rounded-xl "
        onPress={() =>
          router.push({
            pathname: "/(tabs)/(account)/AccountDetails",
            params: { account: JSON.stringify(item) },
          })
        }
      >
        <View className="flex-row items-center">
          <View className={`w-12 h-12 rounded-full items-center justify-center ${getAccountBgColor(item.type)}`}>
            <MaterialIcons
              name={getAccountIcon(item.type)}
              size={24}
              color={getAccountIconColor(item.type)}
            />
          </View>
          <View className="ml-3">
            <Text className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              {item.accountType.name}
            </Text>
            <Text className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>
              {item.accountNumber.substring(0, 10)}...
            </Text>
          </View>
        </View>
        <View className="items-end">
          <Text className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            {item.balance.toFixed(2)} {item.currency}
          </Text>
          <View className="flex-row items-center mt-1">
            <Text className={`text-xs mr-1 ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>
              View details
            </Text>
            <AntDesign
              name="right"
              size={12}
              color={theme === "dark" ? "#9ca3af" : "#64748b"}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderQuickAction = ({ item }: { item: QuickAction }) => (
    <TouchableOpacity
      key={item.id}
      className={`rounded-xl p-4 mb-4 w-[48%] ${theme === "dark" ? "bg-gray-800" : "bg-white border border-gray-100"} items-center`}
      style={{
        shadowColor: theme === "dark" ? "transparent" : "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: theme === "dark" ? 0 : 0.05,
        shadowRadius: 5,
        elevation: theme === "dark" ? 0 : 2,
      }}
      onPress={() => router.push(item.route)}
    >
      <View className={`w-12 h-12 rounded-full ${theme === "dark" ? item.bgColorDark : item.bgColorLight} items-center justify-center mb-2`}>
        {React.cloneElement(item.icon, {
          color: theme === "dark" ? item.iconColorDark : item.iconColorLight
        })}
      </View>
      <Text className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"} text-center`}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  if (isLoading && !refreshing) {
    return (
      <View className={`flex-1 justify-center items-center ${theme === "dark" ? "bg-[#121212]" : "bg-white"}`}>
        <ActivityIndicator size="large" color={theme === "dark" ? "#fff" : "#000"} />
      </View>
    );
  }

  if (error) {
    return (
      <View className={`flex-1 justify-center items-center p-4 ${theme === "dark" ? "bg-[#121212]" : "bg-white"}`}>
        <Text className={theme === "dark" ? "text-red-400" : "text-red-600"}>{error}</Text>
        <TouchableOpacity 
          className={`mt-4 px-4 py-2 rounded-lg ${theme === "dark" ? "bg-blue-800" : "bg-blue-100"}`}
          onPress={fetchUserAccounts}
        >
          <Text className={theme === "dark" ? "text-white" : "text-blue-800"}>Retry</Text>
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
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            colors={["#2563eb"]} 
            tintColor={theme === "dark" ? "#f1f5f9" : "#2563eb"}
          />
        }
        contentContainerStyle={{ paddingBottom: insets.bottom }}
      >
        <View className="p-5 pb-0">
          <Text className={`font-bold text-xl mb-3 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            My Accounts
          </Text>

          <FlatList
            data={accounts}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={renderAccountItem}
            ListEmptyComponent={
              <View className="items-center justify-center py-10">
                <Text className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                  No accounts found
                </Text>
              </View>
            }
          />
        </View>

        <View className="p-5">
          <Text className={`font-bold text-xl mb-3 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            Quick Actions
          </Text>

          <View className="flex-row flex-wrap justify-between">
            {quickActions.map((action) => renderQuickAction({ item: action }))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}