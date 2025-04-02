import { Stack } from "expo-router";

export default function notificationLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Notifications", headerShown: false }}
      />
      <Stack.Screen
        name="notificationsettings"
        options={{ title: "notification settings", headerShown: false }}
      />
    </Stack>
  );
}