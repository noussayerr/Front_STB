import { StatusBar } from "expo-status-bar"
import { SafeAreaView, Text, View, TouchableOpacity,ImageBackground, Image  } from "react-native"
import { Svg, Path } from "react-native-svg"
import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { useRouter } from "expo-router";
import { ArrowRight } from "lucide-react-native"

export default function App() {
  const router = useRouter();
  return (
    <View className="flex bg-white h-full  ">
      <StatusBar translucent backgroundColor="transparent" style="light" />
      {/* Topography pattern background */}
      <View className=" top-0 left-0 right-0 h-[50%] flex justify-center items-center ">
      <Svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <Path d="M0 80 Q 25 90, 50 80 T 100 80 L 100 0 L 0 0 Z" fill="#0080C6" />
          <Path d="M0 82 Q 25 92, 50 82 T 100 82 L 100 0 L 0 0 Z" fill="#0080C6" fillOpacity="0.5" />
          <Path d="M0 84 Q 25 94, 50 84 T 100 84 L 100 0 L 0 0 Z" fill="#0080C6" fillOpacity="0.5" />
          <Path d="M0 86 Q 25 96, 50 86 T 100 86 L 100 0 L 0 0 Z" fill="#0080C6" fillOpacity="0.5" />
          <Path d="M0 88 Q 25 98, 50 88 T 100 88 L 100 0 L 0 0 Z" fill="#0080C6" fillOpacity="0.4" />
          <Path d="M0 90 Q 25 100, 50 90 T 100 90 L 100 0 L 0 0 Z" fill="#0080C6" fillOpacity="0.3" />
        </Svg>
        <Image source={require("../assets/STBlogo.png")} className="absolute " style={{width:150 ,height:150}} />  
        
      </View>

      {/* Curved white section */}
      <View className="flex-1 relative bg-white rounded-t-[40px]  px-6 pt-12">
        <Text className="text-4xl font-bold text-gray-800 mb-4">Welcome</Text>
        <Text className="text-gray-500 text-lg">Your secure and easy banking, anytime, anywhere.</Text>

        <View className="flex items-end absolute bottom-12 left-0 right-0 px-4 ">
          <TouchableOpacity onPress={() => router.push("/auth/login_signup")} className="bg-[#0072BC] rounded-full p-4 flex-row items-center" activeOpacity={0.8}>
            <Text className="text-white font-medium text-xl" >Continue</Text>
            <ArrowRight size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

