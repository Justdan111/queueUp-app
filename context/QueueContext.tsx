"use client"

import { createContext, useState, useContext, type ReactNode } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface QueueUser {
  ticketNumber: string
  name: string
  joinedAt: number
  peopleAhead: number
  estimatedWait: number
  status: "waiting" | "called" | "served"
}

interface AdminUser {
  currentTicket: string
  counter: string
  nextTickets: { ticket: string; name: string; status: string; time: string }[]
  peopleWaiting: number
  avgServiceTime: number
}

interface QueueContextType {
  // User side
  userTicket: QueueUser | null
  joinQueue: (name: string, estimatedWait: number) => Promise<void>
  leaveQueue: () => Promise<void>

  // Admin side
  adminData: AdminUser | null
  isAdminLoggedIn: boolean
  adminLogin: (pin: string) => Promise<boolean>
  adminLogout: () => Promise<void>
  callNext: () => Promise<void>
  skipCurrent: () => Promise<void>
  endRemove: () => Promise<void>

  // Clinic info
  clinicName: string
  estimatedWait: number
}

const QueueContext = createContext<QueueContextType | undefined>(undefined)

export function QueueProvider({ children }: { children: ReactNode }) {
  const [userTicket, setUserTicket] = useState<QueueUser | null>(null)
  const [adminData, setAdminData] = useState<AdminUser | null>(null)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [clinicName] = useState("Dr. Smith's Dental Clinic")
  const [estimatedWait] = useState(15)

  const joinQueue = async (name: string, estimatedWait: number) => {
    const ticketNumber = `A-${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`
    const newUser: QueueUser = {
      ticketNumber,
      name: name || "Guest",
      joinedAt: Date.now(),
      peopleAhead: Math.floor(Math.random() * 5),
      estimatedWait,
      status: "waiting",
    }
    setUserTicket(newUser)
    await AsyncStorage.setItem("userTicket", JSON.stringify(newUser))
  }

  const leaveQueue = async () => {
    setUserTicket(null)
    await AsyncStorage.removeItem("userTicket")
  }

  const adminLogin = async (pin: string): Promise<boolean> => {
    // Simple PIN validation (1234 is the correct PIN for demo)
    if (pin === "1234") {
      setIsAdminLoggedIn(true)
      setAdminData({
        currentTicket: "A-042",
        counter: "Desk 03",
        nextTickets: [
          { ticket: "A-043", name: "John", status: "Waiting", time: "Est. 10:45 AM" },
          { ticket: "B-012", name: "Sarah", status: "Waiting", time: "Est. 10:55 AM" },
          { ticket: "A-044", name: "Mike", status: "Checked In", time: "Est. 11:05 AM" },
        ],
        peopleWaiting: 4,
        avgServiceTime: 12,
      })
      await AsyncStorage.setItem("adminLoggedIn", "true")
      return true
    }
    return false
  }

  const adminLogout = async () => {
    setIsAdminLoggedIn(false)
    setAdminData(null)
    await AsyncStorage.removeItem("adminLoggedIn")
  }

  const callNext = async () => {
    if (adminData && adminData.nextTickets.length > 0) {
      const nextTicket = adminData.nextTickets[0]
      setAdminData({
        ...adminData,
        currentTicket: nextTicket.ticket,
        nextTickets: adminData.nextTickets.slice(1),
        peopleWaiting: Math.max(0, adminData.peopleWaiting - 1),
      })
    }
  }

  const skipCurrent = async () => {
    if (adminData) {
      setAdminData({
        ...adminData,
        nextTickets: [
          ...adminData.nextTickets.slice(1),
          {
            ...adminData.nextTickets[0],
            status: "Skipped",
          },
        ],
      })
    }
  }

  const endRemove = async () => {
    if (adminData) {
      setAdminData({
        ...adminData,
        currentTicket: adminData.nextTickets.length > 0 ? adminData.nextTickets[0].ticket : "",
        nextTickets: adminData.nextTickets.slice(1),
        peopleWaiting: Math.max(0, adminData.peopleWaiting - 1),
      })
    }
  }

  return (
    <QueueContext.Provider
      value={{
        userTicket,
        joinQueue,
        leaveQueue,
        adminData,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        callNext,
        skipCurrent,
        endRemove,
        clinicName,
        estimatedWait,
      }}
    >
      {children}
    </QueueContext.Provider>
  )
}

export function useQueue() {
  const context = useContext(QueueContext)
  if (!context) {
    throw new Error("useQueue must be used within QueueProvider")
  }
  return context
}
