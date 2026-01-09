import AsyncStorage from "@react-native-async-storage/async-storage"

const QUEUE_KEY = "queue_"
const ADMIN_KEY = "admin_"

export const queueStorage = {
  // User queue data
  async saveUserQueue(userId: string, queueData: any) {
    try {
      await AsyncStorage.setItem(QUEUE_KEY + userId, JSON.stringify(queueData))
    } catch (error) {
      console.error("Error saving user queue:", error)
    }
  },

  async getUserQueue(userId: string) {
    try {
      const data = await AsyncStorage.getItem(QUEUE_KEY + userId)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error("Error getting user queue:", error)
      return null
    }
  },

  async clearUserQueue(userId: string) {
    try {
      await AsyncStorage.removeItem(QUEUE_KEY + userId)
    } catch (error) {
      console.error("Error clearing user queue:", error)
    }
  },

  // Admin data
  async saveAdminData(adminData: any) {
    try {
      await AsyncStorage.setItem(ADMIN_KEY + "data", JSON.stringify(adminData))
    } catch (error) {
      console.error("Error saving admin data:", error)
    }
  },

  async getAdminData() {
    try {
      const data = await AsyncStorage.getItem(ADMIN_KEY + "data")
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error("Error getting admin data:", error)
      return null
    }
  },

  async clearAdminData() {
    try {
      await AsyncStorage.removeItem(ADMIN_KEY + "data")
    } catch (error) {
      console.error("Error clearing admin data:", error)
    }
  },
}
