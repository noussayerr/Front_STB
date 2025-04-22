import { Stack } from "expo-router";

export default function accountLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Your account", headerShown: false }}
      />
      <Stack.Screen
        name="AccountDetails"
        options={{ title: "Account Details", headerShown: false }}
      />
      <Stack.Screen
        name="StatementDownload"
        options={{ title: "Statement Download", headerShown: false }}
      />
      <Stack.Screen
        name="CreditDashboard"
        options={{ title: "Credit Dashboard", headerShown: false }}
      />
      <Stack.Screen
        name="CreditSimulator"
        options={{ title: "Credit Simulator", headerShown: false }}
      />
      <Stack.Screen
          name="openaccount"
          options={{ title: "Open account", headerShown: false }}
        />
      <Stack.Screen
        name="accountsscreen"
        options={{ title: "Accounts", headerShown: false }}
      />
      <Stack.Screen
        name="offers"
        options={{ title: "offers", headerShown: false }}
      />
      
      
    </Stack>
  );
}