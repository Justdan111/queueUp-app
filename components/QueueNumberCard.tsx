import { View, Text } from "react-native";

type Props = {
  number: number;
  current: number;
};

export default function QueueNumberCard({ number, current }: Props) {
  return (
    <View className="bg-gray-100 p-6 rounded-xl items-center">
      <Text className="text-gray-500 text-sm">
        Your Number
      </Text>

      <Text className="text-6xl font-bold text-gray-900 my-2">
        #{number}
      </Text>

      <Text className="text-gray-500">
        Currently serving: #{current}
      </Text>
    </View>
  );
}
