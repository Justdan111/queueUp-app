import { Tabs, useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { Pressable } from "react-native"
import { useQueue } from "@/context/QueueContext"

export default function AdminLayout() {
  const { adminLogout } = useQueue()
  const router = useRouter()

  const handleLogout = async () => {
    await adminLogout()
    router.push("/admin/login")
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopColor: "#e5e7eb",
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="control"
        options={{
          title: "Queue",
          tabBarIcon: ({ color, size }) => <Ionicons name="list" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, size }) => <Ionicons name="time" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        options={{
          title: "Logout",
          tabBarIcon: ({ color, size }) => <Ionicons name="log-out" size={size} color={color} />,
          tabBarButton: (props) => (
            <Pressable
              style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
              onPress={() => {
                handleLogout()
              }}
            >
              <Ionicons name="log-out" size={24} color="#9ca3af" />
            </Pressable>
          ),
        }}
      />
       <Tabs.Screen
        name="login"
        options={{
           href: null,
        }}
      />
    </Tabs>
  )
}
