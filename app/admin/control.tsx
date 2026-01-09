
import { View, Text, Pressable, Animated, FlatList } from "react-native"
import { useRef, useEffect } from "react"
import { useRouter } from "expo-router"
import { useQueue } from "../../context/QueueContext"
import { COLORS } from "../../constants/color"
import { AdminActionButton } from "../../components/AdminActionButton"
import { SafeAreaView } from "react-native-safe-area-context"
import Ionicons from "@expo/vector-icons/build/Ionicons"

export default function AdminControlScreen() {
  const { adminData, callNext, skipCurrent, endRemove, adminLogout, isAdminLoggedIn } = useQueue()
  const router = useRouter()
  const slideAnim = useRef(new Animated.Value(-100)).current
  const pulseAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    if (!isAdminLoggedIn) {
      router.push("/admin/login")
    }
  }, [isAdminLoggedIn])

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start()

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }, [])

  const handleLogout = async () => {
    await adminLogout()
    router.push("/admin/login")
  }

  if (!adminData) {
    return (
      <View className="flex-1 bg-gray-50">
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Animated.View
        className="pb-25"
        style={{
          transform: [{ translateX: slideAnim }],
        }}
      >
        {/* Header */}
        <View 
          className="flex-row justify-between items-center px-4 py-4"
          style={{ backgroundColor: COLORS.lighter }}
        >
          <View>
            <Text 
              className="text-lg font-bold"
              style={{ color: COLORS.dark }}
            >
              Wellness Clinic
            </Text>
            <Text 
              className="text-xs mt-0.5"
              style={{ color: COLORS.gray }}
            >
              Queue Admin
            </Text>
          </View>
          <Ionicons name="settings" size={24} color={COLORS.gray} />
        </View>

        {/* Blue Top Bar */}
        <View 
          className="h-1"
          style={{ backgroundColor: COLORS.primary }}
        />

        {/* Current Ticket Card */}
        <Animated.View
          className="m-4 rounded-2xl p-5"
          style={{
            backgroundColor: COLORS.lighter,
            shadowColor: COLORS.dark,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 2,
            transform: [{ scale: pulseAnim }],
          }}
        >
          <View className="flex-row items-center self-center bg-green-100 px-3 py-1.5 rounded-2xl mb-4">
            <View 
              className="w-2 h-2 rounded mr-1.5"
              style={{ backgroundColor: COLORS.success }}
            />
            <Text className="text-xs font-semibold text-green-600">
              NOW SERVING
            </Text>
          </View>

          <Text 
            className="text-5xl font-bold text-center mb-1"
            style={{ color: COLORS.dark }}
          >
            {adminData.currentTicket}
          </Text>
          <Text 
            className="text-base text-center mb-4"
            style={{ color: COLORS.gray }}
          >
            {adminData.counter}
          </Text>

          <View className="flex-row justify-around pt-3 border-t border-gray-200">
            <View className="flex-1 items-center">
              <Text 
                className="text-xs mb-1"
                style={{ color: COLORS.gray }}
              >
                WAITING
              </Text>
              <Text 
                className="text-lg font-bold"
                style={{ color: COLORS.dark }}
              >
                {adminData.peopleWaiting}
              </Text>
            </View>
            <View className="flex-1 items-center">
              <Text 
                className="text-xs mb-1"
                style={{ color: COLORS.gray }}
              >
                AVG TIME
              </Text>
              <Text 
                className="text-lg font-bold"
                style={{ color: COLORS.dark }}
              >
                {adminData.avgServiceTime}m
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Action Buttons */}
        <AdminActionButton
          title="Call Next"
          icon="arrow-forward"
          onPress={callNext}
          variant="primary"
          style={{ marginHorizontal: 16, marginBottom: 12 }}
        />

        <View className="flex-row gap-3 px-4 mb-6">
          <AdminActionButton
            title="Skip Current"
            icon="play-skip-forward"
            onPress={skipCurrent}
            variant="secondary"
            style={{ flex: 1 }}
          />
          <AdminActionButton 
            title="End / Remove" 
            onPress={endRemove} 
            variant="danger" 
            style={{ flex: 1 }}
          />
        </View>

        {/* Up Next Section */}
        <View className="px-4 mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text 
              className="text-lg font-bold"
              style={{ color: COLORS.dark }}
            >
              Up Next
            </Text>
            <Text 
              className="text-sm font-semibold"
              style={{ color: COLORS.primary }}
            >
              View All
            </Text>
          </View>

          <FlatList
            data={adminData.nextTickets}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <View 
                className="flex-row justify-between items-center px-3 py-3 rounded-xl mb-2"
                style={{ backgroundColor: COLORS.lighter }}
              >
                <View className="flex-row items-center gap-3 mr-2 bg-gray-200 px-2 py-1.5 rounded-lg">
                <Ionicons name="person" size={16} color={COLORS.gray} />
                </View>
                <View className="flex-1">
                  <Text 
                    className="text-base font-bold mb-0.5"
                    style={{ color: COLORS.dark }}
                  >
                    {item.ticket}
                  </Text>
                  <Text 
                    className="text-xs"
                    style={{ color: COLORS.gray }}
                  >
                    {item.time}
                  </Text>
                </View>
                <View
                  className={`flex-row items-center px-2 py-1 rounded-lg ${
                    item.status === "Waiting" ? "bg-orange-200" : "bg-gray-300"
                  }`}
                >
                  <View
                    className="w-1.5 h-1.5 rounded-full mr-1.5"
                    style={{
                      backgroundColor: item.status === "Waiting" ? "#d97706" : "#6b7280",
                    }}
                  />
                  <Text
                    className={`text-[11px] font-semibold ${
                      item.status === "Waiting" ? "text-orange-800" : "text-gray-700"
                    }`}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(_, idx) => idx.toString()}
          />
        </View>

       
        
      </Animated.View>
    </SafeAreaView>
  )
}