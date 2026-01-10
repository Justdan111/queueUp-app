
import { View, Text, ScrollView, Pressable, Animated } from "react-native"
import { useRef, useEffect } from "react"
import { useQueue } from "../../context/QueueContext"
import { COLORS } from "../../constants/color"

export default function MyNumberScreen() {
  const { userTicket, leaveQueue } = useQueue()
  const slideAnim = useRef(new Animated.Value(-50)).current
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  if (!userTicket) {
    return (
      <ScrollView className="flex-1 bg-gray-50">
        <View className="flex-1 justify-center items-center py-24">
          <Text className="text-6xl mb-4">🎫</Text>
          <Text className="text-xl font-bold mb-2" style={{ color: COLORS.dark }}>No Active Queue</Text>
          <Text className="text-sm text-center" style={{ color: COLORS.gray }}>Join a queue from the Home tab to get started</Text>
        </View>
      </ScrollView>
    )
  }

  return (
    <ScrollView className="flex-1" style={{ backgroundColor: COLORS.lighter }}>
      <View className="px-5 py-10 items-center">
        <Text className="text-2xl font-bold mb-6 text-center" style={{ color: COLORS.dark }}>
          {userTicket.name ? `${userTicket.name}'s Ticket` : "Dr. Smith's Clinic"}
        </Text>

        <View className="flex-row items-center bg-red-50 px-4 py-2 rounded-full mb-8">
          <View className="w-2.5 h-2.5 rounded-full bg-red-400 mr-2" />
          <Text className="text-sm font-semibold text-red-600">Waiting in Queue</Text>
        </View>

        <Text className="text-xs font-semibold tracking-wider mb-6" style={{ color: COLORS.gray }}>
          YOUR TICKET NUMBER
        </Text>

        <Animated.View
          className="items-center justify-center mb-12"
          style={{
            opacity: fadeAnim,
            transform: [{ translateX: slideAnim }],
          }}
        >
          <Text className="text-7xl font-bold tracking-wider" style={{ color: COLORS.primary }}>
            {userTicket.ticketNumber}
          </Text>
        </Animated.View>

        <View className="flex-row gap-4 mb-8 w-full">
          <View className="flex-1 bg-white rounded-xl py-4 px-3 items-center shadow-sm">
            <View className="mb-2">
              <Text className="text-xl">✓</Text>
            </View>
            <Text className="text-xs font-semibold mb-1" style={{ color: COLORS.gray }}>NOW SERVING</Text>
            <Text className="text-lg font-bold" style={{ color: COLORS.dark }}>38</Text>
          </View>
          <View className="flex-1 bg-white rounded-xl py-4 px-3 items-center shadow-sm">
            <View className="mb-2">
              <Text className="text-xl">⏱</Text>
            </View>
            <Text className="text-xs font-semibold mb-1" style={{ color: COLORS.gray }}>EST. WAIT</Text>
            <Text className="text-lg font-bold" style={{ color: COLORS.dark }}>~{userTicket.estimatedWait}m</Text>
          </View>
        </View>

        <Pressable 
          className="flex-row items-center justify-center bg-white border-2 py-3.5 px-6 rounded-xl gap-2 w-full"
          style={{ borderColor: COLORS.danger }}
          onPress={leaveQueue}
        >
          <Text className="text-lg font-bold" style={{ color: COLORS.danger }}>✕</Text>
          <Text className="text-base font-semibold" style={{ color: COLORS.danger }}>Leave Queue</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}