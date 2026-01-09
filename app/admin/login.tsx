
import { View, Text, Pressable, Animated } from "react-native"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "expo-router"
import { useQueue } from "../../context/QueueContext"
import { COLORS } from "../../constants/color"

export default function AdminLoginScreen() {
  const [pin, setPin] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const { adminLogin } = useQueue()
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const handleNumberPress = (num: string) => {
    if (pin.length < 4) {
      setPin(pin + num)
      setError("")
    }
  }

  const handleBackspace = () => {
    setPin(pin.slice(0, -1))
  }

  const handleSubmit = async () => {
    if (pin.length !== 4) {
      setError("Please enter a 4-digit PIN")
      return
    }

    const success = await adminLogin(pin)
    if (success) {
      router.push("/admin/control")
    } else {
      setError("Invalid PIN")
      setPin("")
    }
  }

  const numbers = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["", "0", ""],
  ]

  return (
    <View 
      className="flex-1 justify-center items-center px-5"
      style={{ backgroundColor: COLORS.light }}
    >
      <Animated.View
        className="w-full items-center"
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <View className="w-20 h-20 bg-blue-100 rounded-full justify-center items-center mb-6">
          <Text className="text-4xl">🔐</Text>
        </View>

        <Text 
          className="text-3xl font-bold mb-2"
          style={{ color: COLORS.dark }}
        >
          Admin Access
        </Text>
        <Text 
          className="text-sm text-center mb-8"
          style={{ color: COLORS.gray }}
        >
          Please enter your 4-digit security PIN.
        </Text>

        <View className="flex-row justify-center gap-3 mb-10">
          {[0, 1, 2, 3].map((i) => (
            <View
              key={i}
              className={`w-15 h-15 border-2 rounded-xl justify-center items-center ${
                i < pin.length ? "" : ""
              }`}
              style={{
                borderColor: COLORS.primary,
                backgroundColor: i < pin.length ? COLORS.primary : COLORS.lighter,
              }}
            >
              {i < pin.length && (
                <View 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS.lighter }}
                />
              )}
            </View>
          ))}
        </View>

        {error && (
          <Text 
            className="text-sm mb-4 text-center"
            style={{ color: COLORS.danger }}
          >
            {error}
          </Text>
        )}

        <View className="mb-8">
          {numbers.map((row, rowIdx) => (
            <View key={rowIdx} className="flex-row justify-center gap-3 mb-3">
              {row.map((num, idx) => (
                <Pressable
                  key={idx}
                  className={`w-[70px] h-[70px] rounded-xl justify-center items-center border ${
                    !num ? "bg-transparent border-transparent" : "border-gray-200"
                  }`}
                  style={num ? { backgroundColor: COLORS.lighter } : {}}
                  onPress={() => num && handleNumberPress(num)}
                >
                  <Text 
                    className="text-2xl font-bold"
                    style={{ color: COLORS.dark }}
                  >
                    {num}
                  </Text>
                </Pressable>
              ))}
            </View>
          ))}
        </View>

        <View className="flex-row gap-3 w-full">
          <Pressable 
            className="flex-1 py-3.5 rounded-xl items-center border border-gray-200"
            style={{ backgroundColor: COLORS.lighter }}
            onPress={handleBackspace}
          >
            <Text 
              className="text-base font-semibold"
              style={{ color: COLORS.dark }}
            >
              Delete
            </Text>
          </Pressable>
          <Pressable
            className={`flex-1 py-3.5 rounded-xl items-center ${
              pin.length !== 4 ? "opacity-50" : "opacity-100"
            }`}
            style={{ backgroundColor: COLORS.primary }}
            onPress={handleSubmit}
            disabled={pin.length !== 4}
          >
            <Text 
              className="text-base font-semibold"
              style={{ color: COLORS.lighter }}
            >
              Submit
            </Text>
          </Pressable>
        </View>

        <Text 
          className="mt-6 text-xs text-center"
          style={{ color: COLORS.grayLight }}
        >
          Need help? Contact Support
        </Text>
      </Animated.View>
    </View>
  )
}