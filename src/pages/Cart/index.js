import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'

import AsyncStorage from '@react-native-async-storage/async-storage';
import CartItem from '../../pages-components/Cart/cartItem';

export default function Cart() {
    const [cartItems, setCartItems] = useState();
    const [isLoaded, setIsLoaded] = useState(true);
    const [clearCart, setClearCart] = useState(false);
    const [finalValue, setFinalValue] = useState(0);

    const isFocused = useIsFocused();

    //Função para finalizar compra
    function endBuy() {
        Alert.alert("Compra finalizada com sucesso!!")
        setFinalValue(0)
        clearAsync();
    }

    //Função para receber dados do carrinho e valor final da compra
    async function setAsyncStorage() {
        const items = JSON.parse(await AsyncStorage.getItem('cart'));
        setCartItems(items)

        const finalValue = await AsyncStorage.getItem('totalValue')
        setFinalValue(finalValue);
        setTimeout(() => {
            setIsLoaded(true);
        }, 1 * 10)
    }

    //Função para limpar carrinho
    async function clearAsync() {
        await AsyncStorage.setItem('cart', JSON.stringify([]))
        setFinalValue(0)
        setClearCart(!clearCart);
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

                <View className="bg-blue-500 h-12 mb-2 flex w-full rounded-lg p-2 justify-between items-center flex-row">
                    <Text className="text-white text-lg">Valor total: R$ {finalValue}</Text>
                    <TouchableOpacity className="bg-blue-950 px-4 py-2 rounded-lg" onPress={endBuy}>
                        <Text className="text-white">Finalizar</Text>
                    </TouchableOpacity>
                </View>
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