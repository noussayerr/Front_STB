import * as React from "react"
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Switch } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { AntDesign, MaterialIcons, Feather, Ionicons } from "@expo/vector-icons"
import Animated from "react-native-reanimated"
import { router } from "expo-router"
import { useTheme } from "@/app/providers/ThemeProvider"

type NotificationType = "deposit" | "transaction" | "security" | "credit"

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  amount?: string
  date: string
  time: string
  read: boolean
  account?: string
}

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets()
  const { theme } = useTheme()
  const [refreshing, setRefreshing] = React.useState<boolean>(false)
  const [filter, setFilter] = React.useState<NotificationType | "all">("all")
  const [notificationsEnabled, setNotificationsEnabled] = React.useState<boolean>(true)

  const notifications: Notification[] = [
    {
      id: "1",
      type: "deposit",
      title: "Salary Deposit Received",
      message: "Your salary of 2,500.00 DT has been credited to your account.",
      amount: "+2,500.00 DT",
      date: "Today",
      time: "09:45 AM",
      read: false,
      account: "Current Account",
    },
    {
      id: "2",
      type: "transaction",
      title: "Card Transaction",
      message: "Your card was used for a purchase at Grocery Store.",
      amount: "-120.50 DT",
      date: "Today",
      time: "08:30 AM",
      read: false,
      account: "Current Account",
    },
    {
      id: "3",
      type: "security",
      title: "New Device Login",
      message: "Your account was accessed from a new device. If this wasn't you, please contact us immediately.",
      date: "Yesterday",
      time: "03:15 PM",
      read: true,
    },
    {
      id: "4",
      type: "transaction",
      title: "Bill Payment Successful",
      message: "Your electricity bill payment was successful.",
      amount: "-150.00 DT",
      date: "Yesterday",
      time: "11:20 AM",
      read: true,
      account: "Current Account",
    },
    {
      id: "5",
      type: "credit",
      title: "Loan Payment Due",
      message: "Your home loan payment of 1,250.00 DT is due in 3 days.",
      amount: "1,250.00 DT",
      date: "Yesterday",
      time: "09:00 AM",
      read: true,
    },
  ]

  const filteredNotifications = React.useMemo(() => {
    return filter === "all" 
      ? notifications 
      : notifications.filter(n => n.type === filter)
  }, [filter, notifications])

  const groupedNotifications = React.useMemo(() => {
    const groups: Record<string, Notification[]> = {}
    filteredNotifications.forEach(notification => {
      if (!groups[notification.date]) {
        groups[notification.date] = []
      }
      groups[notification.date].push(notification)
    })
    return groups
  }, [filteredNotifications])

  const unreadCount = React.useMemo(() => {
    return notifications.filter(n => !n.read).length
  }, [notifications])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 2000)
  }, [])

  const getNotificationIcon = (type: NotificationType) => {
    const icons = {
      deposit: <Ionicons name="arrow-down-circle" size={22} color={theme === "dark" ? "#86efac" : "#16a34a"} />,
      transaction: <MaterialIcons name="payment" size={22} color={theme === "dark" ? "#93c5fd" : "#2563eb"} />,
      security: <MaterialIcons name="security" size={22} color={theme === "dark" ? "#c4b5fd" : "#9333ea"} />,
      credit: <MaterialIcons name="credit-card" size={22} color={theme === "dark" ? "#fcd34d" : "#d97706"} />
    }
    return icons[type] || <Feather name="bell" size={22} color={theme === "dark" ? "#9ca3af" : "#64748b"} />
  }

  const getNotificationBgColor = (type: NotificationType) => {
    const colors = {
      deposit: theme === "dark" ? "bg-green-900/30" : "bg-green-100",
      transaction: theme === "dark" ? "bg-blue-900/30" : "bg-blue-100",
      security: theme === "dark" ? "bg-purple-900/30" : "bg-purple-100",
      credit: theme === "dark" ? "bg-amber-900/30" : "bg-amber-100"
    }
    return colors[type] || (theme === "dark" ? "bg-gray-700" : "bg-gray-100")
  }

  const handleNotificationPress = (notification: Notification) => {
    if (notification.type === "transaction") {
      //router.push({ 
        //pathname: "/transaction-details", 
        //params: { transactionId: notification.id } 
      //})
    } else if (notification.type === "credit") {
      //router.push("/credit-dashboard")
    }
  }

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
        <Text className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>Notifications</Text>
        <TouchableOpacity onPress={() => router.push("/(tabs)/(notification)/notificationsettings")}>
          <Feather name="settings" size={22} color={theme === "dark" ? "#f8fafc" : "#0f172a"} />
        </TouchableOpacity>
      </View>

      <View className={`px-5 py-3 flex-row items-center justify-between ${theme === "dark" ? "bg-gray-800" : "bg-gray-50"}`}>
        <View className="flex-row items-center">
          <Feather name="bell" size={18} color={notificationsEnabled ? (theme === "dark" ? "#93c5fd" : "#2563eb") : (theme === "dark" ? "#6b7280" : "#94a3b8")} />
          <Text className={`ml-2 text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>Push Notifications</Text>
        </View>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: theme === "dark" ? "#374151" : "#e2e8f0", true: theme === "dark" ? "#1e40af" : "#bfdbfe" }}
          thumbColor={notificationsEnabled ? (theme === "dark" ? "#93c5fd" : "#2563eb") : (theme === "dark" ? "#9ca3af" : "#94a3b8")}
        />
      </View>

      <View className={`px-5 py-3 flex-row items-center border-b ${theme === "dark" ? "border-gray-800" : "border-gray-100"}`}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mb-20">
          {(["all", "deposit", "transaction", "security", "credit"] as const).map((filterType) => (
            <TouchableOpacity
              key={filterType}
              className={`mr-2 px-4 py-2 rounded-full ${filter === filterType ? 
                filterType === "all" ? theme === "dark" ? "bg-blue-900/30" : "bg-blue-100" :
                filterType === "deposit" ? theme === "dark" ? "bg-green-900/30" : "bg-green-100" :
                filterType === "transaction" ? theme === "dark" ? "bg-blue-900/30" : "bg-blue-100" :
                filterType === "security" ? theme === "dark" ? "bg-purple-900/30" : "bg-purple-100" : 
                theme === "dark" ? "bg-amber-900/30" : "bg-amber-100" 
                : theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}
              onPress={() => setFilter(filterType)}
            >
              <Text className={`text-sm font-medium ${
                filter === filterType ? 
                  filterType === "all" ? theme === "dark" ? "text-blue-400" : "text-blue-700" :
                  filterType === "deposit" ? theme === "dark" ? "text-green-400" : "text-green-700" :
                  filterType === "transaction" ? theme === "dark" ? "text-blue-400" : "text-blue-700" :
                  filterType === "security" ? theme === "dark" ? "text-purple-400" : "text-purple-700" : 
                  theme === "dark" ? "text-amber-400" : "text-amber-700" 
                  : theme === "dark" ? "text-gray-400" : "text-slate-600"}`}
              >
                {filterType === "all" ? `All (${notifications.length})` : 
                 filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {unreadCount > 0 && (
        <View className={`px-5 py-3 flex-row justify-between items-center ${theme === "dark" ? "bg-blue-900/30" : "bg-blue-50"}`}>
          <Text className={`text-sm ${theme === "dark" ? "text-blue-300" : "text-blue-700"}`}>
            You have {unreadCount} unread notification{unreadCount > 1 ? "s" : ""}
          </Text>
          <TouchableOpacity
            className={`px-3 py-1 rounded-md ${theme === "dark" ? "bg-blue-800" : "bg-blue-100"}`}
            onPress={() => {/* Mark all as read logic */}}
          >
            <Text className={`text-xs font-medium ${theme === "dark" ? "text-blue-200" : "text-blue-700"}`}>Mark all as read</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView 
        className="flex mb-20" 
        showsVerticalScrollIndicator={false}
      >
        {Object.keys(groupedNotifications).length > 0 ? (
          Object.entries(groupedNotifications).map(([date, notifications]) => (
            <View key={date}>
              <View className={`px-5 py-2 ${theme === "dark" ? "bg-gray-800" : "bg-gray-50"}`}>
                <Text className={`text-xs font-medium ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>{date.toUpperCase()}</Text>
              </View>

              {notifications.map((notification) => (
                <Animated.View key={notification.id}>
                  <TouchableOpacity
                    className={`px-5 py-4 border-b ${theme === "dark" ? "border-gray-800" : "border-gray-100"} ${!notification.read ? theme === "dark" ? "bg-blue-900/10" : "bg-blue-50/30" : ""}`}
                    onPress={() => handleNotificationPress(notification)}
                  >
                    <View className="flex-row">
                      <View className={`w-10 h-10 rounded-full items-center justify-center ${getNotificationBgColor(notification.type)}`}>
                        {getNotificationIcon(notification.type)}
                      </View>

                      <View className="flex-1 ml-3">
                        <View className="flex-row justify-between items-start">
                          <Text className={`text-base ${!notification.read ? "font-bold" : "font-medium"} ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                            {notification.title}
                          </Text>
                          <Text className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-slate-500"}`}>{notification.time}</Text>
                        </View>

                        <Text className={`text-sm mt-1 mb-1 ${theme === "dark" ? "text-gray-300" : "text-slate-600"}`}>{notification.message}</Text>

                        {notification.account && (
                          <Text className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-slate-500"}`}>{notification.account}</Text>
                        )}

                        {notification.amount && (
                          <Text className={`text-sm font-semibold mt-1 ${
                            notification.amount.startsWith("+") ? theme === "dark" ? "text-green-400" : "text-green-600" :
                            notification.amount.startsWith("-") ? theme === "dark" ? "text-red-400" : "text-red-600" : 
                            theme === "dark" ? "text-gray-300" : "text-slate-700"
                          }`}>
                            {notification.amount}
                          </Text>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          ))
        ) : (
          <View className="flex-1 items-center justify-center py-20">
            <View className={`w-16 h-16 rounded-full items-center justify-center ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
              <Feather name="bell-off" size={28} color={theme === "dark" ? "#9ca3af" : "#94a3b8"} />
            </View>
            <Text className={`text-lg font-medium mb-1 ${theme === "dark" ? "text-white" : "text-slate-700"}`}>No notifications</Text>
            <Text className={`text-sm text-center px-10 ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>
              You don't have any notifications in this category at the moment.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  )
}