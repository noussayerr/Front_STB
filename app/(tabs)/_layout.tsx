import { Tabs } from 'expo-router';
import React from 'react';
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Fontisto } from '@expo/vector-icons';

export default function TabLayout() {
  const { height } = Dimensions.get('window');
  const headerHeight = height * 0.12; // Adjust the multiplier to get the desired height

  return (
    <Tabs
      screenOptions={{
        headerTitle: '',
        headerStyle: {
          backgroundColor: "white",
          elevation: 0, 
          shadowOpacity: 0, 
          borderBottomWidth: 0, 
          height: headerHeight, // Use the calculated height
        },
        tabBarStyle: {
          position: 'absolute',
          height: 70,
          backgroundColor: 'white',
          borderColor: 'white',
          borderTopWidth: 0, 
          shadowOpacity: 0, 
          elevation: 0, 
        },
        headerLeft: () => (
          <Image
            source={require('@/assets/STBlogo.png')}
            style={{ width: 45, height: 45, marginLeft: 10  }}
            className=''
          />
        ),
        headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={{ marginRight: 10 }}>
              <Fontisto name="bell" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              {/* Add another icon or component here if needed */}
            </TouchableOpacity>
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
        name="account"
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
    </Tabs>
  );
}