import { Pressable, Text, type ViewStyle, type TextStyle } from "react-native"
import { COLORS } from "@/constants/color"

interface PrimaryButtonProps {
  title: string
  onPress: () => void
  style?: ViewStyle
  textStyle?: TextStyle
  variant?: "primary" | "danger" | "secondary"
  disabled?: boolean
}

export function PrimaryButton({
  title,
  onPress,
  style,
  textStyle,
  variant = "primary",
  disabled = false,
}: PrimaryButtonProps) {
  const backgroundColor = 
    variant === "danger" ? COLORS.danger : 
    variant === "secondary" ? "#f5f5f5" : 
    COLORS.primary
  
  const textColor = variant === "secondary" ? COLORS.dark : COLORS.lighter
  
  return (
    <Pressable
      className={`py-3.5 px-4 rounded-xl items-center justify-center ${disabled ? 'opacity-60' : 'opacity-100'}`}
      style={[{ backgroundColor }, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text 
        className="text-base font-semibold"
        style={[{ color: textColor }, textStyle]}
      >
        {title}
      </Text>
    </Pressable>
  )
}