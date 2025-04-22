import * as React from "react"
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Switch } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { AntDesign, MaterialIcons, Feather, Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import useThemeStore  from '../zustand/themeStore';
import { useTheme } from "../providers/ThemeProvider"

// Assume we have a language provider similar to theme provider
const useLanguage = () => {
  const [language, setLanguage] = React.useState("english")
  return { language, setLanguage }
}

export default function SettingsScreen() {
  const insets = useSafeAreaInsets()
  const { theme } = useTheme()
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const { language } = useLanguage()

  // Settings options with their respective icons and colors
  const settingsOptions = [
    {
      title: "Notification Settings",
      icon: <Feather name="bell" size={22} color={theme === "dark" ? "#93c5fd" : "#2563eb"} />,
      onPress: () => router.push("/"),
      showArrow: true,
    },
    {
      title: "Security & Privacy",
      icon: <MaterialIcons name="security" size={22} color={theme === "dark" ? "#c4b5fd" : "#9333ea"} />,
      onPress: () => router.push("/"),
      showArrow: true,
    },
    {
      title: "Account Details",
      icon: <Feather name="user" size={22} color={theme === "dark" ? "#a5b4fc" : "#4f46e5"} />,
      onPress: () => router.push("/"),
      showArrow: true,
    },
    {
      title: "Card Management",
      icon: <AntDesign name="creditcard" size={22} color={theme === "dark" ? "#fcd34d" : "#d97706"} />,
      onPress: () => router.push("/"),
      showArrow: true,
    },
    {
      title: "Help & Support",
      icon: <Feather name="help-circle" size={22} color={theme === "dark" ? "#a5b4fc" : "#4f46e5"} />,
      onPress: () => router.push("/"),
      showArrow: true,
    },
    {
      title: "About App",
      icon: <Ionicons name="information-circle-outline" size={22} color={theme === "dark" ? "#94a3b8" : "#64748b"} />,
      onPress: () => router.push("/"),
      showArrow: true,
    },
  ]

  // Language options
  const languages = [
    { id: "english", name: "English" },
    { id: "french", name: "Français" },
    { id: "spanish", name: "Español" },
    { id: "arabic", name: "العربية" },
  ]

  const [selectedLanguage, setSelectedLanguage] = React.useState(language)

  const handleLanguageChange = (langId: string) => {
    setSelectedLanguage(langId)
    // In a real app, you would update the language context/state here
  }

  return (
    <View className={`flex ${theme === "dark" ? "bg-[#121212]" : "bg-white"}`} style={{ paddingTop: insets.top }}>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={theme === "dark" ? "#121212" : "#ffffff"}
      />

      <View
        className={`px-5 py-4 flex-row items-center justify-between border-b ${theme === "dark" ? "border-gray-800" : "border-gray-100"}`}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color={theme === "dark" ? "#f8fafc" : "#0f172a"} />
        </TouchableOpacity>
        <Text className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView className="flex mb-20" showsVerticalScrollIndicator={false}>
        <View className="p-5">
          {/* App Preferences Section */}
          <Text className={`text-base font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            App Preferences
          </Text>

          <View
            className={`rounded-xl overflow-hidden mb-6 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"} border`}
          >
            {/* Theme Toggle */}
            <View
              className={`px-4 py-4 flex-row justify-between items-center border-b ${theme === "dark" ? "border-gray-700" : "border-gray-100"}`}
            >
              <View className="flex-row items-center">
                <Ionicons
                  name={theme === "dark" ? "moon" : "sunny"}
                  size={22}
                  color={theme === "dark" ? "#93c5fd" : "#2563eb"}
                />
                <Text className={`ml-3 text-base ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
                  Dark Mode
                </Text>
              </View>
              <Switch
                value={theme === "dark"}
                onValueChange={toggleTheme}
                trackColor={{
                  false: theme === "dark" ? "#374151" : "#e2e8f0",
                  true: theme === "dark" ? "#1e40af" : "#bfdbfe",
                }}
                thumbColor={theme === "dark" ? "#93c5fd" : "#2563eb"}
              />
            </View>

            {/* Language Selector */}
            <TouchableOpacity
              className={`px-4 py-4 flex-row justify-between items-center ${theme === "dark" ? "border-gray-700" : "border-gray-100"}`}
              onPress={() => {
                // In a real app, this would open a modal or navigate to a language selection screen
                // For this example, we'll just cycle through languages
                const currentIndex = languages.findIndex((l) => l.id === selectedLanguage)
                const nextIndex = (currentIndex + 1) % languages.length
                handleLanguageChange(languages[nextIndex].id)
              }}
            >
              <View className="flex-row items-center">
                <Ionicons name="globe-outline" size={22} color={theme === "dark" ? "#93c5fd" : "#2563eb"} />
                <Text className={`ml-3 text-base ${theme === "dark" ? "text-white" : "text-slate-800"}`}>Language</Text>
              </View>
              <View className="flex-row items-center">
                <Text className={`mr-2 ${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}>
                  {languages.find((l) => l.id === selectedLanguage)?.name}
                </Text>
                <AntDesign name="right" size={16} color={theme === "dark" ? "#93c5fd" : "#2563eb"} />
              </View>
            </TouchableOpacity>
          </View>

          {/* Settings Options */}
          <Text className={`text-base font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            App Settings
          </Text>

          <View
            className={`rounded-xl overflow-hidden mb-6 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"} border`}
          >
            {settingsOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={option.onPress}
                className={`px-4 py-4 flex-row justify-between items-center ${
                  index !== settingsOptions.length - 1
                    ? `border-b ${theme === "dark" ? "border-gray-700" : "border-gray-100"}`
                    : ""
                }`}
              >
                <View className="flex-row items-center">
                  {option.icon}
                  <Text className={`ml-3 text-base ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
                    {option.title}
                  </Text>
                </View>
                {option.showArrow && (
                  <AntDesign name="right" size={16} color={theme === "dark" ? "#93c5fd" : "#2563eb"} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Account Actions */}
          <Text className={`text-base font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            Account
          </Text>

          <View
            className={`rounded-xl overflow-hidden mb-6 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"} border`}
          >
            <TouchableOpacity
              className={`px-4 py-4 flex-row justify-between items-center border-b ${theme === "dark" ? "border-gray-700" : "border-gray-100"}`}
              onPress={() => {
                /* Handle logout */
              }}
            >
              <View className="flex-row items-center">
                <Feather name="log-out" size={22} color={theme === "dark" ? "#fca5a5" : "#ef4444"} />
                <Text className={`ml-3 text-base ${theme === "dark" ? "text-white" : "text-slate-800"}`}>Log Out</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              className="px-4 py-4 flex-row justify-between items-center"
              onPress={() => {
                /* Handle delete account */
              }}
            >
              <View className="flex-row items-center">
                <Feather name="trash-2" size={22} color={theme === "dark" ? "#fca5a5" : "#ef4444"} />
                <Text className={`ml-3 text-base ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
                  Delete Account
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text className={`text-center text-sm px-6 mb-5 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

