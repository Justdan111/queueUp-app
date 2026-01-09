import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

type Props = {
  title: string;
  onPress: () => void;
} 

export default function PrimaryButton({ title, onPress }: Props) {
  return (
    <TouchableOpacity 
    onPress={onPress}
    className="bg-blue-600 py-3.5 rounded-xl items-center mb-8"
    activeOpacity={0.8}
    >
      <Text className="text-white text-base font-semibold">
        {title}
        </Text>
    </TouchableOpacity>
  )
}