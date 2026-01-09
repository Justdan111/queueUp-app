
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { QueueProvider } from "../context/QueueContext"
import YourTurnScreen from "./(tab)/your-turn"


export default function RootLayout() {
  return (
    <QueueProvider>
      <StatusBar style="dark" />
      <YourTurnScreen />
      <Stack>
        <Stack.Screen
          name="(tab)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="admin"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </QueueProvider>
  )
}
