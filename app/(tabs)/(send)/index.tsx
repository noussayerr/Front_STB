// app/(tabs)/(send)/index.tsx
import { useTheme } from "@/app/providers/ThemeProvider";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { useCardStore } from "@/app/zustand/useCardStore";
import { useEffect, useState } from "react";
import { CARTE_C_CASH_ID } from "@/app/constants";

export default function SelectTransferMethod() {
  const router = useRouter();
  const { theme } = useTheme();
  const { fetchUserCards, userCards } = useCardStore();
  const [hasCarteCCash, setHasCarteCCash] = useState(false);
  
  useEffect(() => {
    fetchUserCards();
  }, []);

  useEffect(() => {
    if (userCards.length > 0) {
      const hasCard = userCards.some(card => 
        card.cardType._id === CARTE_C_CASH_ID
      );
      setHasCarteCCash(hasCard);
    }
  }, [userCards]);

  return (
    <View className={`flex ${theme === "dark" ? "bg-[#121212]" : "bg-blue-600"} gap-10 items-center h-full`}>
      
    </View>
  )
}