
import { View, Text, Switch, Animated } from "react-native"
import { useState, useRef, useEffect } from "react"
import { COLORS } from "@/constants/color"
import { SafeAreaView } from "react-native-safe-area-context"

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true)
  const [sound, setSound] = useState(true)
  const slideInAnim = useRef(new Animated.Value(-100)).current

  useEffect(() => {
    Animated.timing(slideInAnim, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start()
  }, [])

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: COLORS.light }}
    >
      <Animated.View
        style={{
          transform: [{ translateX: slideInAnim }],
        }}
      >
        <View className="px-4 py-5">
          <Text 
            className="text-3xl font-bold mb-6"
            style={{ color: COLORS.dark }}
          >
            Settings
          </Text>

          <View 
            className="mb-6 rounded-xl overflow-hidden"
            style={{ backgroundColor: COLORS.lighter }}
          >
            <Text 
              className="text-sm font-semibold px-4 pt-4 pb-2 bg-gray-50"
              style={{ color: COLORS.gray }}
            >
              Notifications
            </Text>

            <View 
              className="flex-row justify-between items-center px-4 py-3.5 border-t"
              style={{ borderTopColor: COLORS.light }}
            >
              <Text className="text-base text-gray-800">
                Push Notifications
              </Text>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: "#e5e7eb", true: "#a5f3fc" }}
                thumbColor={notifications ? COLORS.primary : COLORS.grayLight}
              />
            </View>

            <View 
              className="flex-row justify-between items-center px-4 py-3.5 border-t"
              style={{ borderTopColor: COLORS.light }}
            >
              <Text className="text-base text-gray-800">
                Sound
              </Text>
              <Switch
                value={sound}
                onValueChange={setSound}
                trackColor={{ false: "#e5e7eb", true: "#a5f3fc" }}
                thumbColor={sound ? COLORS.primary : COLORS.grayLight}
              />
            </View>
          </View>

          <View 
            className="mb-6 rounded-xl overflow-hidden"
            style={{ backgroundColor: COLORS.lighter }}
          >
            <Text 
              className="text-sm font-semibold px-4 pt-4 pb-2 bg-gray-50"
              style={{ color: COLORS.gray }}
            >
              About
            </Text>

            <View 
              className="px-4 py-3.5 border-t"
              style={{ borderTopColor: COLORS.light }}
            >
              <Text 
                className="text-sm mb-1"
                style={{ color: COLORS.gray }}
              >
                Version
              </Text>
              <Text className="text-base font-medium text-gray-800">
                1.0.0
              </Text>
            </View>

            <View 
              className="px-4 py-3.5 border-t"
              style={{ borderTopColor: COLORS.light }}
            >
              <Text 
                className="text-sm mb-1"
                style={{ color: COLORS.gray }}
              >
                Support Email
              </Text>
              <Text className="text-base font-medium text-gray-800">
                support@queueup.com
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  )
}