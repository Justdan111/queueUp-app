"use client"

import { useRef, useEffect } from "react"
import { View, Text, Animated } from "react-native"
import { COLORS } from "../constants/color"

interface QueueNumberCardProps {
  ticketNumber: string
  status: string
  peopleAhead: number
  estimatedWait: number
  nowServing?: string
  counter?: string
}

export function QueueNumberCard({
  ticketNumber,
  status,
  peopleAhead,
  estimatedWait,
  nowServing,
  counter,
}: QueueNumberCardProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
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
  }, [pulseAnim])

  return (
    <View className="bg-white rounded-2xl p-5 my-3">
      <View className="flex-row items-center self-center bg-orange-200 px-3 py-2 rounded-2xl mb-5">
        <View 
          className="w-2 h-2 rounded mr-1.5"
          style={{ backgroundColor: "#d97706" }}
        />
        <Text 
          className="text-xs font-semibold"
          style={{ color: "#b45309" }}
        >
          {status}
        </Text>
      </View>

      <Text 
        className="text-xs font-semibold text-center mb-2"
        style={{ color: COLORS.grayLight, letterSpacing: 0.5 }}
      >
        YOUR TICKET NUMBER
      </Text>

      <Animated.View
        className="items-center my-4"
        style={{
          transform: [{ scale: pulseAnim }],
        }}
      >
        <Text 
          className="text-5xl font-bold mb-1"
          style={{ color: COLORS.primary, fontSize: 52 }}
        >
          {ticketNumber}
        </Text>
        <Text 
          className="text-sm"
          style={{ color: COLORS.secondary }}
        >
          It&apos;s almost time
        </Text>
      </Animated.View>

      {nowServing && (
        <View className="flex-row bg-blue-50 rounded-xl overflow-hidden mb-4">
          <View 
            className="flex-1 py-3 px-3 justify-center items-center"
            style={{ borderRightWidth: 1, borderRightColor: "#e0f2fe" }}
          >
            <Text 
              className="text-[11px] font-semibold mb-1"
              style={{ color: COLORS.grayLight, letterSpacing: 0.5 }}
            >
              NOW SERVING
            </Text>
            <Text 
              className="text-lg font-bold"
              style={{ color: COLORS.dark }}
            >
              {nowServing}
            </Text>
          </View>
          {counter && (
            <View className="flex-1 py-3 px-3 justify-center items-center">
              <Text 
                className="text-[11px] font-semibold mb-1"
                style={{ color: COLORS.grayLight, letterSpacing: 0.5 }}
              >
                COUNTER
              </Text>
              <Text 
                className="text-lg font-bold"
                style={{ color: COLORS.dark }}
              >
                {counter}
              </Text>
            </View>
          )}
        </View>
      )}

      <View className="flex-row justify-between">
        <View className="flex-1 bg-gray-50 rounded-xl p-3 items-center mx-1">
          <Text className="text-2xl mb-2">👥</Text>
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
            {peopleAhead}
          </Text>
        </View>
        <View className="flex-1 bg-gray-50 rounded-xl p-3 items-center mx-1">
          <Text className="text-2xl mb-2">🕐</Text>
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
            ~{estimatedWait}m
          </Text>
        </View>
      </View>
    </View>
  )
}