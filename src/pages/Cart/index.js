import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'

import AsyncStorage from '@react-native-async-storage/async-storage';
import CartItem from '../../pages-components/Cart/cartItem';


export default function Cart({ navigation }) {
    const [cartItems, setCartItems] = useState();
    const [isLoaded, setIsLoaded] = useState(true);
    const [clearCart, setClearCart] = useState(false);
    const [finalValue, setFinalValue] = useState('');
    const isFocused = useIsFocused();

    async function setAsyncStorage() {
        const items = JSON.parse(await AsyncStorage.getItem('cart'));
        setCartItems(items)
        const valorTotal = cartItems.reduce(function (total, item) {
            const individualValue = Number(item.totalValue);
            return total + individualValue;
        }, 0);
        setFinalValue(valorTotal)
        setTimeout(() => {
            setIsLoaded(true);

        }, 1 * 10)
    }

    async function clearAsync() {
        await AsyncStorage.setItem('cart', JSON.stringify([]))
        setFinalValue(0)
        setClearCart(!clearCart);
    }

    function endBuy() {
        Alert.alert("Compra finalizada com sucesso!!")
        setFinalValue(0)
        clearAsync();
    }

    useEffect(() => {
        if (isFocused) {
            setIsLoaded(false);
            setAsyncStorage();
        }
    }, [isFocused, clearCart])


    if (isLoaded) {
        return (
            <View className="flex-1 pt-14 px-5">
                <View className="w-full flex items-center">
                    <Text className="text-3xl font-semibold">
                        Meu Carrinho
                    </Text>
                </View>
                <View className="flex justify-end w-full items-end">
                    <TouchableOpacity onPress={clearAsync} className="py-2 px-4 flex bg-red-700 items-center rounded-xl">
                        <Text className="text-white">Limpar <Ionicons name='trash' /></Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {cartItems ? (
                        <>
                            {
                                cartItems.map((item) => (
                                    <CartItem key={item.item.id} item={item.item} quantity={item.productQuantity} totalValue={item.totalValue} size={item.size} color={item.color} />
                                ))
                            }
                        </>
                    ) : (
                        <Text>oi</Text>
                    )}
                </ScrollView>

                {cartItems && (
                    <View className="bg-blue-500 h-12 mb-2 flex w-full rounded-lg p-2 justify-between items-center flex-row">
                        <Text className="text-white text-lg">Valor total: R$ {finalValue}</Text>
                        <TouchableOpacity className="bg-blue-950 px-4 py-2 rounded-lg" onPress={endBuy}>
                            <Text className="text-white">Finalizar</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        )
    }
    else {
        return (
            <View className="flex items-center justify-center">
                <Text>
                    Carregando
                </Text>
            </View>
        )
    }
}