import { Pressable, Text, type ViewStyle } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { COLORS } from "@/constants/color"


interface AdminActionButtonProps {
  title: string
  icon?: string
  onPress: () => void
  style?: ViewStyle
  variant?: "primary" | "secondary" | "danger"
}

export function AdminActionButton({ 
  title, 
  icon, 
  onPress, 
  style, 
  variant = "secondary" 
}: AdminActionButtonProps) {
  const variantStyles = {
    primary: "bg-primary",
    secondary: "bg-gray-100",
    danger: "bg-red-100"
  }
  
  const textColorStyles = {
    primary: "text-gray-900",
    secondary: "text-gray-900",
    danger: "text-red-600"
  }
  
  const iconColor = variant === "danger" ? COLORS.danger : COLORS.dark
  
  return (
    <Pressable 
      className={`flex-row py-3 px-4 rounded-xl items-center justify-center my-1.5 ${variantStyles[variant]}`}
      style={style}
      onPress={onPress}
    >
      {icon && (
        <Ionicons 
          name={icon as any} 
          size={20} 
          color={iconColor} 
          className="mr-2"
        />
      )}
      <Text className={`text-base font-semibold ${textColorStyles[variant]}`}>
        {title}
      </Text>
    </Pressable>
  )
}