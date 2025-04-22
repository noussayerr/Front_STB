import { Tabs, useRouter, usePathname } from 'expo-router';
import React from 'react';
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Fontisto } from '@expo/vector-icons';
import { useTheme } from "../providers/ThemeProvider"; 
import Feather from '@expo/vector-icons/Feather';

export default function TabLayout() {
  const { height } = Dimensions.get('window');
  const headerHeight = height * 0.12;
  const { theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname(); // Get current route

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          height: 70,
          backgroundColor: theme === "dark" ? "#121212" : "white",
          borderTopWidth: 0,
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTitle: '',
        headerStyle: {
          backgroundColor: theme === "dark" ? "#121212" : "white",
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          height: headerHeight,
        },
        headerLeft: () => (
          <Image
            source={require('@/assets/STBlogo.png')}
            style={{ width: 45, height: 45, marginLeft: 10 }}
          />
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => router.push("/View/settings")}>
            <Feather 
              name="settings" 
              size={24} 
              color={
                pathname === "/settings" 
                  ? "#2563eb" // Blue when active
                  : theme === "dark" 
                    ? "#e5e5e5" // Light gray in dark mode
                    : "#1f2937" // Dark gray in light mode
              }
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="(Carts)"
        options={{
          title: 'Carts',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="wallet" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(account)"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="bank" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(send)"
        options={{
          title: 'Send',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="send" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(notification)"
        options={{
          headerShown: false,
          title: 'Notifications',
          tabBarIcon: ({ color }) => <Fontisto size={28} name="bell" color={color} />,
        }}
      />
      
      
    </Tabs>
  );
}
