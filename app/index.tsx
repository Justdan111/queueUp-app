
import { View, Text, TextInput, Animated } from "react-native"
import React , { useRef, useEffect } from "react"
import { useQueue } from "../context/QueueContext"
import { COLORS } from "../constants/color"
import { SafeAreaView } from "react-native-safe-area-context"
import { PrimaryButton } from "@/components/PrimaryButton"
import { router } from "expo-router"

export default function HomeScreen() {
  const [name, setName] = React.useState("")
  const { joinQueue, estimatedWait, clinicName } = useQueue()


  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.8)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start()
  }, [fadeAnim, scaleAnim])

  const handleJoinQueue = async () => {
    await joinQueue(name, estimatedWait)
    router.push("/(tab)/home")
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: COLORS.light }}>
  <View className="flex-1 px-5 py-10">
        <Text 
          className="text-3xl font-bold text-center mb-10"
          style={{ color: COLORS.dark }}
        >
          {clinicName}
        </Text>

        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
          className="items-center mb-8"
        >
          <View 
            className="w-[180px] h-[180px] rounded-full justify-center items-center"
            style={{ 
              backgroundColor: COLORS.accent,
              shadowColor: COLORS.primary,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.15,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            <Text className="text-6xl mb-2">🦷</Text>
            <Text 
              className="text-xs font-bold"
              style={{ 
                color: COLORS.success,
                letterSpacing: 1,
              }}
            >
              DENTAL CLINIC
            </Text>
            <Text 
              className="text-[10px] mt-1"
              style={{ color: COLORS.gray }}
            >
              Your Dental Care
            </Text>
          </View>
        </Animated.View>

        {/* Description */}
        <Text 
          className="text-base text-center mb-6"
          style={{ 
            color: COLORS.gray,
            lineHeight: 24,
          }}
        >
          Join the queue and get notified when it&apos;s your turn
        </Text>

        {/* Wait Time Badge */}
        <View 
          className="flex-row items-center justify-center px-4 py-3 rounded-3xl mb-8 self-center"
          style={{ backgroundColor: COLORS.lighter }}
        >
          <Text className="text-lg mr-2">🕐</Text>
          <Text 
            className="text-base font-semibold"
            style={{ color: COLORS.primary }}
          >
            Est. Wait: ~{estimatedWait} mins
          </Text>
        </View>

        {/* Name Input */}
        <TextInput
          className="border rounded-xl px-4 py-3.5 text-base mb-4"
          style={{ 
            backgroundColor: COLORS.lighter,
            borderColor: "#e5e7eb",
            color: COLORS.dark,
          }}
          placeholder="Enter your name (optional)"
          placeholderTextColor="#9ca3af"
          value={name}
          onChangeText={setName}
        />

        {/* Join Queue Button */}
        <PrimaryButton title="Join Queue" onPress={handleJoinQueue}/>

        <View className="flex-1" />

       {/* Footer */}
                <Text 
                className="text-center text-sm mt-5"
                style={{ color: COLORS.grayLight }}
                >
                Powered by QueueUp
                </Text>
      </View> 
    </SafeAreaView>
  )
}