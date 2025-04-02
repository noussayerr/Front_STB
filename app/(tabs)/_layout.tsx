import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Fontisto } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from "../providers/ThemeProvider"; 
import Feather from '@expo/vector-icons/Feather';
export default function TabLayout() {
  const { height } = Dimensions.get('window');
  const headerHeight = height * 0.12;
  const [isNotificationPressed, setIsNotificationPressed] = useState(false);
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          height: 70,
          backgroundColor: theme === "dark" ? "#121212" : "white", // Adjust tabBar color based on theme
          borderColor: 'white',
          borderTopWidth: 0,
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTitle: '',
        headerStyle: {
          backgroundColor: theme === "dark" ? "#121212" : "white", // Header background color
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
          <View style={{ flexDirection: 'row', alignItems: 'center',  marginRight: 10 }}>
             <Feather name="settings" size={24} color="white" />
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color }) => <Fontisto size={28} name="wallet" color={color} />,
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
