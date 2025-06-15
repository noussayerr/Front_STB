import { Stack } from "expo-router";

export default function SendLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Send", headerShown: false }}
      />
      <Stack.Screen
        name="selectAccount"
        options={{ title: "selectAccount", headerShown: false }}
      />
      <Stack.Screen
        name="recipientInfo"
        options={{ title: "Recipient Info", headerShown: false }}
      />
      <Stack.Screen
        name="transferAmount"
        options={{ title: "Transfer Amount", headerShown: false }}
      />
      <Stack.Screen
        name="transferSuccess"
        options={{ title: "Transfer Success", headerShown: false }}
      />
    </Stack>
  );
}