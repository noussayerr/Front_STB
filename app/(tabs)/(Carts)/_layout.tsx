import { Stack } from "expo-router";
import { useNavigation } from "expo-router";
import {  Dimensions,Text,TouchableOpacity } from 'react-native';
import { useTheme } from "@/app/providers/ThemeProvider";
import { AntDesign } from "@expo/vector-icons";
export default function Layout() {
  const navigation = useNavigation();
  const { height } = Dimensions.get('window');
  const headerHeight = height * 0.12;
const { theme } = useTheme();
  return (
    <Stack>
      <Stack.Screen
        name="index" options={{headerShown:false}} />

      <Stack.Screen
        name="carts"
        options={({ navigation }) => ({
          headerTitle: () => (
             <Text className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              STB Cards
            </Text>
          ),

        })}
      />
      
      <Stack.Screen
        name="[id]"
        options={({ navigation }) =>({ 
          headerTitle: () => (
             <Text className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              Card Details
            </Text>
          ),})}
      />
      
      <Stack.Screen
        name="getmycard"
        options={({ navigation }) =>({ 
          headerTitle: () => (
             <Text className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              Get Your Card
            </Text>
          ),
          
        })}
      />
      <Stack.Screen
        name="carddetails"
        options={{headerShown:false}}
      />
    </Stack>
  );
}
