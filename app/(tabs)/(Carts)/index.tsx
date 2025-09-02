import * as React from "react";
import { View, TouchableOpacity, Text, Image, Dimensions, StatusBar, ScrollView, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { useSharedValue, useAnimatedStyle, interpolate, Extrapolate } from "react-native-reanimated";
import Carousel, { type ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Transaction from "@/app/components/transaction";
import Quickactions from "@/app/components/quickactions";
import { useTranslation } from "react-i18next";
import { useLanguageStore } from "@/app/zustand/store";
import { useTheme } from "@/app/providers/ThemeProvider";
import { useCardStore } from "@/app/zustand/useCardStore";

export default function HomeScreen() {
  const { width } = Dimensions.get("window");
  const insets = useSafeAreaInsets();
  const progress = useSharedValue<number>(0);
  const ref = React.useRef<ICarouselInstance>(null);
  const scrollY = useSharedValue(0);
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const { theme } = useTheme();
  const router = useRouter();
  const { userCards, fetchUserCards, cardsLoading, cardsError } = useCardStore();

  React.useEffect(() => {
    fetchUserCards();
  }, []);

  const balanceCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(scrollY.value, [0, 100], [1, 0.95], Extrapolate.CLAMP),
        },
      ],
      opacity: interpolate(scrollY.value, [0, 100], [1, 0.9], Extrapolate.CLAMP),
    };
  });

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({ count: index, animated: true });
  };

  const handleScroll = (event: any) => {
    scrollY.value = event.nativeEvent.contentOffset.y;
  };

  const handleCardPress = (cardId: string) => {
    router.push({
      pathname: "/(tabs)/(Carts)/carddetails",
      params: { cardId },
    });
  };

  const getCardImage = (cardTypeName: string) => {
    switch (cardTypeName.toLowerCase()) {
      case "travel":
        return require("@/assets/carts/CARTESTBTRAVEL.png");
      case "epargne":
        return require("@/assets/carts/CarteSTBEpargne.png");
      case "visa electron":
        return require("@/assets/carts/CARTEVISAELECTRONNATIONALE.png");
      case "cib3":
        return require("@/assets/carts/CARTECIB3.png");
      case "c cash":
        return require("@/assets/carts/CarteCCash.png");
      case "c pay":
        return require("@/assets/carts/CarteCPay.png");
      default:
        return require("@/assets/carts/CarteCCash.png");
    }
  };

  if (cardsLoading) {
    return (
      <View className={`flex-1 justify-center items-center ${theme === "dark" ? "bg-[#121212]" : "bg-white"}`}>
        <ActivityIndicator size="large" color={theme === "dark" ? "#fff" : "#000"} />
      </View>
    );
  }

  if (cardsError) {
    return (
      <View className={`flex-1 justify-center items-center p-4 ${theme === "dark" ? "bg-[#121212]" : "bg-white"}`}>
        <Text className={theme === "dark" ? "text-red-400" : "text-red-600"}>Error: {cardsError}</Text>
        <TouchableOpacity
          className={`mt-4 px-4 py-2 rounded-lg ${theme === "dark" ? "bg-blue-800" : "bg-blue-100"}`}
          onPress={fetchUserCards}
        >
          <Text className={theme === "dark" ? "text-white" : "text-blue-800"}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!userCards || userCards.length === 0) {
    return (
      <View className={`flex-1 justify-center items-center p-4 ${theme === "dark" ? "bg-[#121212]" : "bg-white"}`}>
        <Text className={`text-lg mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          You don't have any cards yet
        </Text>
        <TouchableOpacity
          className={`px-4 py-2 rounded-lg ${theme === "dark" ? "bg-blue-800" : "bg-blue-600"}`}
          onPress={() => router.push("/(tabs)/(Carts)/getmycard")}
        >
          <Text className="text-white">Apply for a card</Text>
        </TouchableOpacity>
      </View>
    );
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
              {userCards.reduce((total, card) => total + (card.currentBalance || 0), 0).toFixed(2)} DT
            </Text>
          </View>
        </Animated.View>

        <View className="flex-row justify-between items-center px-5 mb-2.5 mt-5">
          <Text className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            {t("My Cards")} ({userCards.length})
          </Text>
        </View>

        <View className="items-center mb-5">
          <Carousel
            ref={ref}
            width={width - 40}
            height={200}
            loop={false}
            onProgressChange={progress}
            data={userCards}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => handleCardPress(item._id)}
              >
                <View className="relative">
                  <Image
                    source={{uri: item.cardType?.imageUrl}}
                    style={{
                      width: "95%",
                      height: 200,
                      borderRadius: 16,
                      opacity: item.status === "blocked" ? 0.6 : 1,
                    }}
                    resizeMode="contain"
                  />
                  {item.status === "blocked" && (
                    <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center">
                      <View className="bg-black/50 px-3 py-1 rounded-full">
                        <Text className="text-white font-bold">BLOCKED</Text>
                      </View>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            )}
          />
          <Pagination.Basic
            progress={progress}
            data={userCards ?? []} // Fallback to empty array
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
  );
}