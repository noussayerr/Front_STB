import * as React from "react"
import { View, TouchableOpacity, Text, Image, Dimensions, StatusBar, ScrollView } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Animated, { useSharedValue, useAnimatedStyle, interpolate, Extrapolate } from "react-native-reanimated"
import Carousel, { type ICarouselInstance, Pagination } from "react-native-reanimated-carousel"
import { AntDesign } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import Transaction from "@/app/components/transaction"
import Quickactions from "@/app/components/quickactions"
import { useTranslation } from "react-i18next"
import { useLanguageStore } from "@/app/zustand/store"
import { useTheme } from "@/app/providers/ThemeProvider"

export default function HomeScreen() {
  const { width } = Dimensions.get("window")
  const insets = useSafeAreaInsets()
  const progress = useSharedValue<number>(0)
  const ref = React.useRef<ICarouselInstance>(null)
  const scrollY = useSharedValue(0)
  const { t } = useTranslation()
  const { language } = useLanguageStore()
  const { theme } = useTheme()
  const router = useRouter()

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
  const CARDS = [
    { 
      id: "1",
      image: require("@/assets/carts/CARTESTBTRAVEL.png"),
      name: "Carte STB Travel",
      description: "Voyagez serein….",
      tag: "International",
      balance: "3,240.50",
      currency: "DT",
      expiryDate: "09/26",
      status: "Active",
      type: "Debit"
    },
    { 
      id: "2",
      image: require("@/assets/carts/CarteSTBEpargne.png"), 
      name: "Carte STB Epargne", 
      description: "La carte Epargne vous évite le déplacement à l'agence et vous permet de faire face à des dépenses urgentes.",
      tag: "Savings",
      balance: "1,890.75",
      currency: "DT",
      expiryDate: "05/25",
      status: "Active",
      type: "Debit"
    },
    { 
      id: "3", 
      image: require("@/assets/carts/CARTEVISAELECTRONNATIONALE.png"), 
      name: "Carte Visa Electron Nationale", 
      description: "Vous êtes résidents en Tunisie et vous cherchez un moyen de paiement et de retrait qui vous convient ?….",
      tag: "National",
      balance: "5,120.00",
      currency: "DT",
      expiryDate: "12/24",
      status: "Active",
      type: "Debit"
    },
    { 
      id: "4", 
      image: require("@/assets/carts/CARTECIB3.png"),
      name: "Carte CIB3", 
      description: "Vous souhaitez une solution de paiement et de retrait pratique et moderne ?",
      tag: "Premium",
      balance: "8,750.30",
      currency: "DT",
      expiryDate: "03/27",
      status: "Active",
      type: "Credit"
    },
    { 
      id: "5",
      image: require("@/assets/carts/CarteCCash.png"), 
      name: "Carte C Cash", 
      description: "Plus besoin d'un compte bancaire pour avoir une carte",
      tag: "Prepaid",
      balance: "1,200.00",
      currency: "DT",
      expiryDate: "08/25",
      status: "Active",
      type: "Prepaid"
    },
    { 
      id: "6", 
      image: require("@/assets/carts/CarteCPay.png"), 
      name: "Carte C Pay", 
      description: "A convenient payment card for online transactions.",
      tag: "Business",
      balance: "15,000.00",
      currency: "DT",
      expiryDate: "11/26",
      status: "Active",
      type: "Business"
    },
  ];
  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({ count: index, animated: true })
  }

  const handleScroll = (event: any) => {
    scrollY.value = event.nativeEvent.contentOffset.y
  }

  const handleCardPress = (cardId: string) => {
    const selectedCard = CARDS.find(card => card.id === cardId);
    if (selectedCard) {
      router.push({
        pathname: '/(tabs)/(Carts)/carddetails',
        params: { 
          cardId: selectedCard.id,
          cardData: JSON.stringify(selectedCard) 
        }
      });
    }
  }

  return (
    <View className={`flex h-full ${theme === "dark" ? "bg-[#121212]" : "bg-white"}`}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
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
            <Text className={`font-bold mb-2 text-2xl ${theme === "dark" ? "text-white" : "text-white"}`}>
              {t("balance")}
            </Text>
            <Text className={`font-semibold mb-2 text-lg ${theme === "dark" ? "text-white" : "text-white"}`}>
              5,280.00 DT
            </Text>
          </View>
        </Animated.View>

        {/* My Cards Section */}
        <View className="flex-row justify-between items-center px-5 mb-2.5 mt-5">
          <Text className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            {t("My Cards")}
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
            data={CARDS}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => handleCardPress(item.id)}
                >
                <Image
                  source={item.image}
                  style={{
                    width: "95%",
                    height: 200,
                    borderRadius: 16,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          />
          <Pagination.Basic
            progress={progress}
            data={CARDS}
            dotStyle={{
              width: 25,
              height: 4,
              backgroundColor: theme === "dark" ? "#1e1e1e" : "#cbd5e1",
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

        {/* Special Offers Banner */}
        <TouchableOpacity className="mx-5 mb-5 rounded-xl overflow-hidden" onPress={() => router.push("/View/pack")}>
          <View className={`p-4 ${theme === "dark" ? "bg-gray-900" : "bg-blue-50"}`}>
            <View className="flex-row justify-between items-center">
              <View className="flex-1">
                <Text className={`text-lg font-bold mb-1 ${theme === "dark" ? "text-white" : "text-blue-800"}`}>
                  Special Offers
                </Text>
                <Text className={`${theme === "dark" ? "text-gray-400" : "text-blue-700"}`}>
                  Check out our exclusive offers tailored for you
                </Text>
              </View>
              <View
                className={`w-10 h-10 rounded-full items-center justify-center ${
                  theme === "dark" ? "bg-blue-900" : "bg-blue-100"
                }`}
              >
                <AntDesign name="right" size={20} color={theme === "dark" ? "#60a5fa" : "#2563eb"} />
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <Quickactions />

        <Transaction />
      </ScrollView>
    </View>
  )
}
