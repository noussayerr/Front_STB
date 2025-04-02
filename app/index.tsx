import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View, TouchableOpacity, Image } from "react-native";
import { Svg, Path } from "react-native-svg";
import { useRouter } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { useLanguageStore } from "./zustand/store";

export default function App() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { language, setLanguage } = useLanguageStore();

  // Change language and update i18n
  const handleLanguageChange = async (lang: string) => {
    await setLanguage(lang);
    i18n.changeLanguage(lang);
    router.push("/auth/login_signup")
  };

  return (
    <View className="flex bg-white h-full">
      <StatusBar translucent backgroundColor="transparent" style="light" />
      {/* Topography pattern background */}
      <View className="top-0 left-0 right-0 h-[50%] flex justify-center items-center">
        <Svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <Path d="M0 80 Q 25 90, 50 80 T 100 80 L 100 0 L 0 0 Z" fill="#2563eb" />
          <Path d="M0 82 Q 25 92, 50 82 T 100 82 L 100 0 L 0 0 Z" fill="#2563eb" fillOpacity="0.5" />
          <Path d="M0 84 Q 25 94, 50 84 T 100 84 L 100 0 L 0 0 Z" fill="#2563eb" fillOpacity="0.5" />
          <Path d="M0 86 Q 25 96, 50 86 T 100 86 L 100 0 L 0 0 Z" fill="#2563eb" fillOpacity="0.5" />
          <Path d="M0 88 Q 25 98, 50 88 T 100 88 L 100 0 L 0 0 Z" fill="#2563eb" fillOpacity="0.4" />
          <Path d="M0 90 Q 25 100, 50 90 T 100 90 L 100 0 L 0 0 Z" fill="#2563eb" fillOpacity="0.3" />
        </Svg>
        <Image source={require("../assets/STBlogo.png")} className="absolute" style={{ width: 150, height: 150 }} />
      </View>

      <View className="flex-1 relative bg-white rounded-t-[40px] px-6 pt-12">
        <View className="">
          <Text className="text-xl text-center font-bold mb-4">Select Language </Text>
          <TouchableOpacity
            onPress={() => handleLanguageChange('en')}
            className="rounded-lg p-4 mb-4"
          >
            <Text className="text-black text-center text-lg">English</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleLanguageChange('ar')}
            className="rounded-lg p-4 mb-4"
          >
            <Text className="text-black text-center text-lg">العربية</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleLanguageChange('fr')}
            className= "rounded-lg p-3 mb-2"
          >
            <Text className="text-black text-center">Français</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}