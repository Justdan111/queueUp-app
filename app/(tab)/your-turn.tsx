
import { View, Text, Animated, Easing, Modal } from "react-native"
import { useEffect, useRef } from "react"
import { useQueue } from "@/context/QueueContext"
import { PrimaryButton } from "@/components/PrimaryButton"
import { Ionicons } from "@expo/vector-icons"

export default function YourTurnScreen() {
  const { ticketCalled, setTicketCalled, userTicket } = useQueue()

  const pulseAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(500)).current

  useEffect(() => {
    if (ticketCalled) {
      // Pulse animation for the alert icon
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
      ).start()

      // Scale animation for the card entrance
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start()

      // Slide animation
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start()
    }
  }, [ticketCalled])

  const pulseScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.2],
  })

  const handleAcknowledge = () => {
    setTicketCalled(false)
    scaleAnim.setValue(0)
    slideAnim.setValue(500)
    pulseAnim.setValue(0)
  }

  return (
    <Modal visible={ticketCalled} transparent={true} animationType="none" onRequestClose={handleAcknowledge}>
      <View className="flex-1 bg-black/50 justify-center items-center">
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
          }}
          className="w-5/6 bg-white rounded-3xl p-8 shadow-lg"
        >
          {/* Pulsing Alert Icon */}
          <View className="items-center mb-8">
            <Animated.View
              style={{
                transform: [{ scale: pulseScale }],
              }}
            >
              <View className="w-24 h-24 bg-red-100 rounded-full justify-center items-center">
                <Ionicons name="megaphone" size={48} color="#dc2626" />
              </View>
            </Animated.View>
          </View>

          {/* Main Message */}
          <Text className="text-4xl font-bold text-center text-gray-900 mb-2">
            It&apos;s Your Turn!
          </Text>
          <Text className="text-xl text-center text-gray-600 mb-8">
            Your ticket has been called
          </Text>

          {/* Ticket Information */}
          <View className="bg-blue-50 rounded-2xl p-6 mb-8">
            <Text className="text-sm font-semibold text-blue-600 mb-3">
              YOUR TICKET NUMBER
            </Text>
            <Text className="text-5xl font-bold text-blue-600 mb-6">
              {userTicket?.ticketNumber || "A-00"}
            </Text>

            <View className="flex-row justify-between mb-4">
              <View>
                <Text className="text-xs text-gray-600 font-semibold mb-1">
                  COUNTER
                </Text>
                <Text className="text-2xl font-bold text-gray-900">
                  Desk 03
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-xs text-gray-600 font-semibold mb-1">
                  WINDOW
                </Text>
                <Text className="text-2xl font-bold text-gray-900">
                  Window 2
                </Text>
              </View>
            </View>
          </View>

          {/* Instructions */}
          <View className="bg-orange-50 rounded-2xl p-4 mb-8 flex-row items-start">
            <Ionicons 
              name="information-circle" 
              size={20} 
              color="#ea580c" 
              className="mr-3 mt-0.5"
            />
            <Text className="text-sm text-gray-700 flex-1">
              Please proceed to your assigned counter immediately. Keep your ticket with you.
            </Text>
          </View>

          {/* Action Button */}
          <PrimaryButton 
            title="I'm On My Way" 
            onPress={handleAcknowledge} 
            style={{ marginBottom: 12 }} 
          />

          <Text className="text-center text-xs text-gray-500">
            You can dismiss this alert anytime
          </Text>
        </Animated.View>
      </View>
    </Modal>
  )
}