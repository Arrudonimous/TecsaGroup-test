import { Image, Text, View } from "react-native"

export default function CartItem({ item, quantity, color, size, totalValue }) {
    return (
        <View className="bg-blue-100 my-2 px-2 py-4 h-32 rounded-lg flex flex-row justify-between items-center">
            <View className="w-[30%]">
                <Image source={item.image} className="w-full h-full bg-contain" />
            </View>

            <View>
                <Text className="text-gray-500 text-lg ">{item.name}</Text>
                <Text className="font-bold text-xl mt-2">R$ {totalValue}</Text>
            </View>

            <View className="flex h-full justify-center items-end">

                <Text className="mb-2">{quantity} und</Text>
                {size.trim() && (
                    <Text>Tam {size}</Text>
                )}
                {color === 'red' && (
                    <View className="bg-red-500 p-3 rounded-full border" />
                )}
                {color === 'black' && (
                    <View className="bg-black p-3 rounded-full border" />
                )}
                {color === 'white' && (
                    <View className="bg-white p-3 rounded-full border" />
                )}
                {color === 'gold' && (
                    <View className="bg-yellow-500 p-3 rounded-full border" />
                )}
            </View>
        </View>
    )
}