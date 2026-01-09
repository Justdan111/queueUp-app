import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

type Props = {
    title: string;
    onPress?: () => void;
}

export default function AdminActionButton({ title, onPress }: Props) {
  return (
    <TouchableOpacity
     onPress={onPress}
      className="border border-blue-600 py-3 rounded-md mb-3" 
      activeOpacity={0.8}>
      <Text
       className="text-center text-blue-600 font-medium">
        {title}
        </Text>
    </TouchableOpacity>
  )
}