
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { QueueProvider, useQueue } from "../context/QueueContext"
import YourTurnScreen from "./(tab)/your-turn"
import "../global.css"

function RootLayoutContent() {
  const { ticketCalled } = useQueue()

  return (
    <>
      <StatusBar style="dark" />
      {/* Your Turn Modal - Only shown when ticketCalled is true */}
      {ticketCalled && <YourTurnScreen />}
      {/* Main Navigation Stack */}
      <Stack>
        <Stack.Screen
          name="(tab)"
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="admin"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  )
}

export default function RootLayout() {
  return (
    <QueueProvider>
      <RootLayoutContent />
    </QueueProvider>
  )
}
