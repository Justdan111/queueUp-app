"use client"

import { View, Text, Pressable, Animated } from "react-native"
import { useRef, useEffect } from "react"
import Svg, { Circle } from "react-native-svg"
import { useQueue } from "../../context/QueueContext"
import { COLORS } from "../../constants/color"
import { SafeAreaView } from "react-native-safe-area-context"

export default function QueueScreen() {
  const { userTicket, leaveQueue } = useQueue()
  const pulseAnim = useRef(new Animated.Value(1)).current
  const slideAnim = useRef(new Animated.Value(-50)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start()

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start()
  }, [])

  if (!userTicket) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 justify-center items-center py-25">
          <Text className="text-6xl mb-4">🎫</Text>
          <Text 
            className="text-xl font-bold mb-2"
            style={{ color: COLORS.dark }}
          >
            No Active Queue
          </Text>
          <Text 
            className="text-sm text-center"
            style={{ color: COLORS.gray }}
          >
            Join a queue from the Home tab to get started
          </Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-4 py-5">
        <View className="flex-row justify-between items-center mb-5">
          <Text 
            className="text-xl font-bold"
            style={{ color: COLORS.dark }}
          >
            City Dental Clinic
          </Text>
          <View className="flex-row items-center bg-green-100 px-3 py-1.5 rounded-full">
            <View 
              className="w-2 h-2 rounded mr-1.5"
              style={{ backgroundColor: COLORS.success }}
            />
            <Text className="text-xs font-bold text-green-600">
              LIVE
            </Text>
          </View>
        </View>

        <View 
          className="rounded-2xl p-6 mb-5"
          style={{ 
            backgroundColor: COLORS.lighter,
            shadowColor: COLORS.dark,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 2,
          }}
        >
          <Text 
            className="text-xs font-semibold text-center mb-5"
            style={{ 
              color: COLORS.gray,
              letterSpacing: 1,
            }}
          >
            YOUR TICKET NUMBER
          </Text>

          <Animated.View
            style={{
              opacity: slideAnim.interpolate({ inputRange: [-50, 0], outputRange: [0, 1] }),
            }}
            className="items-center justify-center mb-6 h-[200px]"
          >
            <Svg width={200} height={200} viewBox="0 0 200 200">
              <Circle cx="100" cy="100" r="80" fill="none" stroke="#e5e7eb" strokeWidth="12" />
              <Circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke={COLORS.primary}
                strokeWidth="12"
                strokeDasharray={`${(75 / 100) * 502.65} 502.65`}
                strokeLinecap="round"
                rotation="-90"
                originX="100"
                originY="100"
              />
            </Svg>
            <View className="absolute items-center justify-center">
              <Text 
                className="text-5xl font-bold"
                style={{ color: COLORS.dark }}
              >
                #{userTicket.ticketNumber.split("-")[1]}
              </Text>
              <Animated.Text
                className="text-sm mt-1"
                style={{
                  color: COLORS.primary,
                  transform: [{ scale: pulseAnim }],
                }}
              >
                It&apos;s almost time
              </Animated.Text>
            </View>
          </Animated.View>

          <View className="flex-row mb-5 bg-gray-100 rounded-xl overflow-hidden">
            <View className="flex-1 py-4 items-center">
              <Text 
                className="text-xs mb-1"
                style={{ color: COLORS.grayLight }}
              >
                Now Serving
              </Text>
              <Text 
                className="text-base font-bold"
                style={{ color: COLORS.dark }}
              >
                Ticket #38
              </Text>
            </View>
            <View 
              className="flex-1 py-4 items-center"
              style={{ 
                borderLeftWidth: 1,
                borderLeftColor: "#e5e7eb",
              }}
            >
              <Text 
                className="text-xs mb-1"
                style={{ color: COLORS.grayLight }}
              >
                Counter
              </Text>
              <Text 
                className="text-base font-bold"
                style={{ color: COLORS.dark }}
              >
                Desk 03
              </Text>
            </View>
          </View>

          

          <View className="flex-row gap-3">
            <View className="flex-1 bg-gray-100 rounded-xl p-4 items-center">
              <View className="mb-2">
                <Text className="text-2xl">👥</Text>
              </View>
              <Text 
                className="text-xs mb-1"
                style={{ color: COLORS.gray }}
              >
                People Ahead
              </Text>
              <Text 
                className="text-lg font-bold"
                style={{ color: COLORS.dark }}
              >
                {userTicket.peopleAhead}
              </Text>
            </View>
            <View className="flex-1 bg-gray-100 rounded-xl p-4 items-center">
              <View className="mb-2">
                <Text className="text-2xl">🕐</Text>
              </View>
              <Text 
                className="text-xs mb-1"
                style={{ color: COLORS.gray }}
              >
                Est. Wait
              </Text>
              <Text 
                className="text-lg font-bold"
                style={{ color: COLORS.dark }}
              >
                ~{userTicket.estimatedWait}m
              </Text>
            </View>
          </View>
        </View>

        <Text 
          className="text-sm text-center my-5"
          style={{ 
            color: COLORS.gray,
            lineHeight: 22,
          }}
        >
          Please stay close to the waiting area. We will send you a notification when it&apos;s your turn.
        </Text>

        <Pressable 
          className="flex-row py-3.5 rounded-xl items-center justify-center gap-2 border"
          style={{ 
            backgroundColor: COLORS.lighter,
            borderColor: "#fee2e2",
          }}
          onPress={leaveQueue}
        >
          <Text className="text-lg">↩️</Text>
          <Text 
            className="text-base font-semibold"
            style={{ color: COLORS.danger }}
          >
            Leave Queue
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}