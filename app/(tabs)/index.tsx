"use client"

import * as React from "react"
import { View, TouchableOpacity, Text, Image, Dimensions, StatusBar, ScrollView } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Animated, { useSharedValue, useAnimatedStyle, interpolate, Extrapolate } from "react-native-reanimated"
import Carousel, { type ICarouselInstance, Pagination } from "react-native-reanimated-carousel"
import { AntDesign } from "@expo/vector-icons"
import Transaction from "../components/transaction"
import Quickactions from "../components/quickactions"

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

  
  const handleScroll = (event: any) => {
    scrollY.value = event.nativeEvent.contentOffset.y
  }

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="mb-20"
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

        <Quickactions />

        <Transaction />
      </ScrollView>
    </View>
  )
}

