"use client"

import { View, Text, ScrollView, Pressable, StyleSheet, Animated } from "react-native"
import { useState, useRef, useEffect } from "react"
import Svg, { Circle } from "react-native-svg"

export default function QueueScreen() {
  const [inQueue, setInQueue] = useState(true)
  const ticketNumber = 42
  const nowServing = 38
  const peopleAhead = 4
  const estimatedWait = 15

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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>City Dental Clinic</Text>
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>

        {/* Main Ticket Card */}
        <View style={styles.ticketCard}>
          <Text style={styles.ticketLabel}>YOUR TICKET NUMBER</Text>

          <Animated.View
            style={{
              opacity: slideAnim.interpolate({ inputRange: [-50, 0], outputRange: [0, 1] }),
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
              height: 200,
            }}
          >
            <Svg width={200} height={200} viewBox="0 0 200 200">
              {/* Background circle */}
              <Circle cx="100" cy="100" r="80" fill="none" stroke="#e5e7eb" strokeWidth="12" />
              {/* Progress circle */}
              <Circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#2563eb"
                strokeWidth="12"
                strokeDasharray={`${(75 / 100) * 502.65} 502.65`}
                strokeLinecap="round"
                rotation="-90"
                originX="100"
                originY="100"
              />
            </Svg>
            <View style={styles.ticketNumberContainer}>
              <Text style={styles.ticketNumber}>#{ticketNumber}</Text>
              <Animated.Text
                style={[
                  styles.ticketSubtext,
                  {
                    transform: [{ scale: pulseAnim }],
                  },
                ]}
              >
                It's almost time
              </Animated.Text>
            </View>
          </Animated.View>

          {/* Status Bars */}
          <View style={styles.statusRow}>
            <View style={styles.statusItem}>
              <Text style={styles.statusLabel}>Now Serving</Text>
              <Text style={styles.statusValue}>Ticket #{nowServing}</Text>
            </View>
            <View style={[styles.statusItem, styles.rightBorder]}>
              <Text style={styles.statusLabel}>Counter</Text>
              <Text style={styles.statusValue}>Desk 03</Text>
            </View>
          </View>

          {/* Info Cards */}
          <View style={styles.infoRow}>
            <View style={styles.infoCard}>
              <View style={styles.infoIconContainer}>
                <Text style={styles.infoIcon}>👥</Text>
              </View>
              <Text style={styles.infoLabel}>People Ahead</Text>
              <Text style={styles.infoValue}>{peopleAhead}</Text>
            </View>
            <View style={styles.infoCard}>
              <View style={styles.infoIconContainer}>
                <Text style={styles.infoIcon}>🕐</Text>
              </View>
              <Text style={styles.infoLabel}>Est. Wait</Text>
              <Text style={styles.infoValue}>~{estimatedWait} min</Text>
            </View>
          </View>
        </View>

        {/* Message */}
        <Text style={styles.message}>
          Please stay close to the waiting area. We will send you a notification when it's your turn.
        </Text>

        {/* Leave Queue Button */}
        <Pressable style={styles.leaveButton} onPress={() => setInQueue(false)}>
          <Text style={styles.leaveButtonIcon}>↩️</Text>
          <Text style={styles.leaveButtonText}>Leave Queue</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  liveIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dcfce7",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22c55e",
    marginRight: 6,
  },
  liveText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#16a34a",
  },
  ticketCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  ticketLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b7280",
    letterSpacing: 1,
    textAlign: "center",
    marginBottom: 20,
  },
  ticketNumberContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  ticketNumber: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#1f2937",
  },
  ticketSubtext: {
    fontSize: 14,
    color: "#2563eb",
    marginTop: 4,
  },
  statusRow: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    overflow: "hidden",
  },
  statusItem: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
  },
  rightBorder: {
    borderLeftWidth: 1,
    borderLeftColor: "#e5e7eb",
  },
  statusLabel: {
    fontSize: 12,
    color: "#9ca3af",
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
  },
  infoRow: {
    flexDirection: "row",
    gap: 12,
  },
  infoCard: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  infoIconContainer: {
    marginBottom: 8,
  },
  infoIcon: {
    fontSize: 24,
  },
  infoLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  message: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginVertical: 20,
    lineHeight: 22,
  },
  leaveButton: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#fee2e2",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  leaveButtonIcon: {
    fontSize: 18,
  },
  leaveButtonText: {
    color: "#dc2626",
    fontSize: 16,
    fontWeight: "600",
  },
})
