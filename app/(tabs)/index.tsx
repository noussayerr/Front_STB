"use client"

import * as React from "react"
import { View, TouchableOpacity, Text, Image, Dimensions, StatusBar, ScrollView } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Animated, { useSharedValue, useAnimatedStyle, interpolate, Extrapolate } from "react-native-reanimated"
import Carousel, { type ICarouselInstance, Pagination } from "react-native-reanimated-carousel"
import { AntDesign, FontAwesome6, Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons"
import { router } from 'expo-router';

export default function HomeScreen() {
  const { width } = Dimensions.get("window")
  const insets = useSafeAreaInsets()
  const progress = useSharedValue<number>(0)
  const ref = React.useRef<ICarouselInstance>(null)
  const scrollY = useSharedValue(0)

  // Animation for the balance card
  const balanceCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(scrollY.value, [0, 100], [1, 0.95], Extrapolate.CLAMP),
        },
      ],
      opacity: interpolate(scrollY.value, [0, 100], [1, 0.9], Extrapolate.CLAMP),
    }
  })

  const Carts = [
    require("../../assets/carts/CARTESTBTRAVEL.png"),
    require("../../assets/carts/CarteSTBEpargne.png"),
    require("../../assets/carts/CARTEVISAELECTRONNATIONALE.png"),
  ]

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index,
      animated: true,
    })
  }

  const transactions = [
    {
      id: "1",
      title: "Receive Transfer from Ahmed",
      date: "10 Jan 2025",
      amount: "100 DT",
      isIncoming: true,
      icon: "money-bill-transfer",
    },
    {
      id: "2",
      title: "Transfer to Sarah",
      date: "10 Jan 2025",
      amount: "100 DT",
      isIncoming: false,
      icon: "money-bill-transfer",
    },
    {
      id: "3",
      title: "Coffee Shop",
      date: "9 Jan 2025",
      amount: "15 DT",
      isIncoming: false,
      icon: "mug-hot",
    },
    {
      id: "4",
      title: "Salary Deposit",
      date: "1 Jan 2025",
      amount: "2,500 DT",
      isIncoming: true,
      icon: "building-columns",
    },
  ]

  const handleScroll = (event: any) => {
    scrollY.value = event.nativeEvent.contentOffset.y
  }

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="pb-20"
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        
        <Animated.View
          
          style={[
            balanceCardStyle,
            {
              marginTop:10,
              marginHorizontal:20,
              padding:20,
              borderRadius:20,
              backgroundColor:"#2563eb",
              shadowColor: "#2563eb",
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.3,
              shadowRadius: 20,
              elevation: 5,
            },
          ]}
        >
          <View className="mb-5">
            <Text className="text-sm text-indigo-100 mb-1">Total Balance</Text>
            <Text className="text-3xl font-bold text-white">5,280.00 DT</Text>
          </View>
          {/*
          
          <View className="flex-row justify-between">
            <TouchableOpacity className="flex-row items-center bg-white/20 py-2 px-3 rounded-xl gap-1.5">
              <Ionicons name="arrow-down" size={20} color="#ffffff" />
              <Text className="text-white font-medium">Receive</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center bg-white/20 py-2 px-3 rounded-xl gap-1.5">
              <Ionicons name="arrow-up" size={20} color="#ffffff" />
              <Text className="text-white font-medium">Send</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center bg-white/20 py-2 px-3 rounded-xl gap-1.5">
              <MaterialCommunityIcons name="qrcode-scan" size={20} color="#ffffff" />
              <Text className="text-white font-medium">Scan</Text>
            </TouchableOpacity>
          </View>
          */}
        </Animated.View>

        {/* My Cards Section */}
        <View className="flex-row justify-between items-center px-5 mb-2.5 mt-5">
          <Text className="text-lg font-semibold text-slate-900">My Cards</Text>
          <TouchableOpacity className="flex-row items-center gap-1">
            <Text className="text-blue-600 font-medium">Add Card</Text>
            <AntDesign name="plus" size={16} color="#2563eb" />
          </TouchableOpacity>
        </View>

        {/* Cards Carousel */}
        <View className="items-center mb-5">
          <Carousel
            ref={ref}
            width={width - 40}
            height={200}
            loop
            onProgressChange={progress}
            data={Carts}
            renderItem={({ item }) => (
              <View className="items-center justify-center">
                <Image
                  source={item}
                  style={{
                    width: "95%",
                    height: 200,
                    borderRadius: 16,
                  }}
                  resizeMode="contain"
                />
              </View>
            )}
          />
          <Pagination.Basic
            progress={progress}
            data={Carts}
            dotStyle={{
              width: 25,
              height: 4,
              backgroundColor: "#cbd5e1",
              borderRadius: 2,
            }}
            activeDotStyle={{
              width: 25,
              height: 4,
              backgroundColor: "#2563eb",
              borderRadius: 2,
            }}
            containerStyle={{
              gap: 5,
              marginTop: 10,
            }}
            horizontal
            onPress={onPressPagination}
          />
        </View>

        {/* Quick Actions */}
        <View className="flex-row justify-between px-5 mb-7">
          <TouchableOpacity className="items-center w-[30%]" onPress={() => router.push('/View/cards_details')}>
            <View className="w-[50px] h-[50px] rounded-2xl bg-indigo-100 justify-center items-center mb-2">
              <FontAwesome6 name="credit-card" size={20} color="#2563eb" />
            </View>
            <Text className="text-xs text-slate-600 text-center">Card Details</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center w-[30%]">
            <View className="w-[50px] h-[50px] rounded-2xl bg-indigo-100 justify-center items-center mb-2">
              <Feather name="lock" size={20} color="#2563eb" />
            </View>
            <Text className="text-xs text-slate-600 text-center">Block Card</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center w-[30%]">
            <View className="w-[50px] h-[50px] rounded-2xl bg-indigo-100 justify-center items-center mb-2">
              <MaterialCommunityIcons name="contactless-payment" size={20} color="#2563eb" />
            </View>
            <Text className="text-xs text-slate-600 text-center">Contactless</Text>
          </TouchableOpacity>
        </View>

        {/* Transaction Section */}
        <View className="flex-row justify-between items-center px-5 mb-3.5">
          <Text className="text-lg font-semibold text-slate-900">Transactions</Text>
          <TouchableOpacity className="flex-row items-center gap-1">
            <Text className="text-blue-600 font-medium">ALL</Text>
            <AntDesign name="down" size={12} color="#2563eb" />
          </TouchableOpacity>
        </View>

        {/* Transaction List */}
        <View className="px-5">
          {transactions.map((transaction) => (
            <View key={transaction.id} className="flex-row items-center bg-white p-4 rounded-2xl mb-2.5 shadow-sm">
              <View className="w-[45px] h-[45px] rounded-xl bg-indigo-100 justify-center items-center mr-3.5">
                <FontAwesome6 name={transaction.icon as any} size={20} color="#2563eb" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium text-slate-900 mb-1">{transaction.title}</Text>
                <Text className="text-xs text-slate-500">{transaction.date}</Text>
              </View>
              <Text
                className={`text-base font-semibold ${transaction.isIncoming ? "text-emerald-500" : "text-red-500"}`}
              >
                {transaction.isIncoming ? "+" : "-"}
                {transaction.amount}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="flex-row justify-between py-2.5 px-5 bg-white border-t border-slate-100 absolute bottom-0 left-0 right-0">
        <TouchableOpacity className="items-center">
          <Ionicons name="home" size={24} color="#2563eb" />
          <Text className="text-xs text-blue-600 font-medium mt-1">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Ionicons name="stats-chart-outline" size={24} color="#94a3b8" />
          <Text className="text-xs text-slate-400 mt-1">Statistics</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Ionicons name="notifications-outline" size={24} color="#94a3b8" />
          <Text className="text-xs text-slate-400 mt-1">Alerts</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Ionicons name="settings-outline" size={24} color="#94a3b8" />
          <Text className="text-xs text-slate-400 mt-1">Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

