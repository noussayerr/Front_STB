import { Stack } from "expo-router";

export default function SendLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "forgotpassword", headerShown: false }}
      />
      <Stack.Screen
        name="resetpassword"
        options={{ title: "resetpassword", headerShown: false }}
      />
    </Stack>
  );
}