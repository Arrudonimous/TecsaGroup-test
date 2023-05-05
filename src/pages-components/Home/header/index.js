import { View, Text, TouchableOpacity } from 'react-native'

export default function HeaderComponent() {
    return (
        <View className="w-full h-9 flex justify-between flex-row items-center border-b pb-2 border-blue-950 mb-10">
            <View className="flex">
                <Text className="font-semibold text-2xl text-blue-900">
                    E-shop
                </Text>
            </View>
        </View>
    )
}