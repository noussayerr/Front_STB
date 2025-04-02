import * as React from "react"
import { View, TouchableOpacity, Text, Image, Dimensions, StatusBar, ScrollView } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Animated, { useSharedValue, useAnimatedStyle, interpolate, Extrapolate } from "react-native-reanimated"
import Carousel, { type ICarouselInstance, Pagination } from "react-native-reanimated-carousel"
import { AntDesign } from "@expo/vector-icons"
import Transaction from "../components/transaction"
import Quickactions from "../components/quickactions"
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../zustand/store';
import { useTheme } from "../providers/ThemeProvider"; 
import useThemeStore from '../zustand/themeStore'; 

export default function HomeScreen() {
  const { width } = Dimensions.get("window")
  const insets = useSafeAreaInsets()
  const progress = useSharedValue<number>(0)
  const ref = React.useRef<ICarouselInstance>(null)
  const scrollY = useSharedValue(0)
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const { theme } = useTheme();

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
    <View className={`flex h-full ${theme === "dark" ? "bg-[#121212]" : "bg-white"}`}>
      <StatusBar translucent backgroundColor="transparent" barStyle={theme === "dark" ? "light-content" : "dark-content"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="mb-20 pt-4"
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <Animated.View
            style={[
              balanceCardStyle,
              {
                marginHorizontal: 20,
                padding: 20,
                borderRadius: 20,
                backgroundColor: theme === "dark" ? "#1F2937" : "#2563eb",
                shadowColor: theme === "dark" ? "transparent" : "#2563eb",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.3,
                shadowRadius: 20,
                elevation: 5,
              },
            ]}
          >
            <View className="mb-5">
              <Text
                className={`font-bold mb-2 text-2xl ${theme === "dark" ? "text-white" : "text-white"}`} // Text color for the balance label
              >
                {t('balance')}
              </Text>
              <Text
                className={`font-semibold mb-2 text-lg ${theme === "dark" ? "text-white" : "text-white"}`} // Text color for the balance amount
              >
                5,280.00 DT
              </Text>
            </View>
        </Animated.View>


        {/* My Cards Section */}
        <View className="flex-row justify-between items-center px-5 mb-2.5 mt-5">
          <Text
            className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}
          >
            {t('My Cards')}
          </Text>
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
              backgroundColor:theme === "dark" ? "#1e1e1e" : "#cbd5e1",
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

