import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { router } from 'expo-router';
export default function Layout() {
  const navigation = useNavigation();

  return (
    <Stack>

      <Stack.Screen
        name="index"
        options={({ navigation }) =>({ 

            title: "STB Cards", 
            headerLeft: () => (
              <Ionicons name="arrow-back" size={35} color="#2563eb" className="px-2" onPress={() => navigation.goBack()}  />
            )})}
      />
      <Stack.Screen
        name="[id]"
        options={({ navigation }) =>({ 
          title: "Card Details",
          headerShown: true,
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={35}
              color="#2563eb"
              style={{ marginLeft: 10 }}
              onPress={() => navigation.goBack()}
            />
        )})}
      />
      <Stack.Screen
        name="getmycard"
        options={({ navigation }) =>({ 
          title: "Get Your Card",
          headerShown: true,
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={35}
              color="#2563eb"
              style={{ marginLeft: 10 }}
              onPress={() => navigation.goBack()}
            />
        )})}
      />
    </Stack>
  );
}
