import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome6, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { router } from 'expo-router';
import { useTheme } from "../providers/ThemeProvider"; // Assuming useTheme provides the current theme

const Quickactions = () => {
  const { theme } = useTheme(); // Accessing the theme (light/dark)

  return (
    <View className={`flex-row justify-between px-5 mb-7`}>
      <TouchableOpacity
        className="items-center w-[30%]"
        onPress={() => router.push('/View/(Carts)')}
      >
        <View
          className="w-[50px] h-[50px] rounded-2xl justify-center items-center mb-2"
          style={{ backgroundColor: theme === "dark" ? "#3e3e3e" : "#e0e7ff" }}
        >
          <FontAwesome6 name="credit-card" size={20} color={theme === "dark" ? "white" : "#2563eb"} />
        </View>
        <Text className={`text-xs ${theme === "dark" ? "text-white" : "text-slate-600"} text-center`}>
          Card Details
        </Text>
      </TouchableOpacity>

      <TouchableOpacity className="items-center w-[30%]">
        <View
          className="w-[50px] h-[50px] rounded-2xl justify-center items-center mb-2"
          style={{ backgroundColor: theme === "dark" ? "#3e3e3e" : "#e0e7ff" }}
        >
          <Feather name="lock" size={20} color={theme === "dark" ? "white" : "#2563eb"} />
        </View>
        <Text className={`text-xs ${theme === "dark" ? "text-white" : "text-slate-600"} text-center`}>
          Block Card
        </Text>
      </TouchableOpacity>

      <TouchableOpacity className="items-center w-[30%]">
        <View
          className="w-[50px] h-[50px] rounded-2xl justify-center items-center mb-2"
          style={{ backgroundColor: theme === "dark" ? "#3e3e3e" : "#e0e7ff" }}
        >
          <MaterialCommunityIcons name="contactless-payment" size={20} color={theme === "dark" ? "white" : "#2563eb"} />
        </View>
        <Text className={`text-xs ${theme === "dark" ? "text-white" : "text-slate-600"} text-center`}>
          Contactless
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Quickactions;
