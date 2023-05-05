import { useEffect, useState } from 'react'

import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import { Ionicons } from "@expo/vector-icons";

import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';

export default function Items({ item }) {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [productQuantity, setProductQuantity] = useState(1)
    const [size, setSize] = useState('')
    const [color, setColor] = useState('')
    const [cartItens, setCartItens] = useState('')


    const handleModal = () => setIsModalVisible(() => !isModalVisible);

    //Função para aumentar quantidade do produto
    function incrementValue() {
        setProductQuantity(Number(productQuantity) + 1)
    }

    //Função para diminuir quantidade do produto
    function decreaseValue() {
        if (productQuantity > 0) {
            setProductQuantity(Number(productQuantity) - 1)
        }
    }

    //Função para adicionar produto ao carrinho
    async function handleAddToCart({ item, size, productQuantity, color }) {
        //Verificando se foi adicionado um tamanho ou cor para os respectivos itens
        if (item.id === 1 || item.id === 3 || item.id === 4 || item.id === 5 || item.id === 7 || item.id === 8) {
            if (!size.trim()) {
                return Alert.alert("Selecione um tamanho para adicionar o item ao carrinho")
            }
        }

        if (item.id === 2 || item.id === 6) {
            if (!color.trim()) {
                return Alert.alert("Selecione uma cor para adicionar o item ao carrinho")
            }
        }

        //Calculando o valor total do carrinho
        const totalValue = Number(productQuantity) * Number(item.price);

        //Adicionando o item escolhido ao array de items do carrinho
        cartItens.push({ item, size, productQuantity, color, totalValue })
        await AsyncStorage.setItem('cart', JSON.stringify(cartItens))

        setIsModalVisible(false);
        return Alert.alert("Item adicionado ao carrinho!");
    }

    //Função para receber itens do carrinho
    async function getCartItens() {
        //Pegando itens do carrinho de comprar, no caso de nao haver nenhum
        //Reinicia o array de itens
        const items = await AsyncStorage.getItem("cart")
        if (items === null) {
            await AsyncStorage.setItem('cart', JSON.stringify([]))
        }
        setCartItens(JSON.parse(items));
    }

    //Função calcular valor final dos itens do carrinho e salvando
    async function handleChangeFinalValue() {
        const valorTotal = cartItens.reduce(function (total, item) {
            const individualValue = Number(item.totalValue);
            return total + individualValue;
        }, 0);
        await AsyncStorage.setItem('totalValue', valorTotal.toString())
    }

    useEffect(() => {
        getCartItens();
        handleChangeFinalValue();
    }, [cartItens])

    return (
        <TouchableOpacity className="flex flex-1 my-4 mx-2 bg-blue-200 rounded-lg h-52 flex-col justify-between p-2" onPress={handleModal}>
            <View className="flex flex-1">
                <Image
                    className="w-full h-full"
                    source={item.image}
                />
            </View>

            <View>
                <Text className="font-semibold mb-2 text-base">
                    {item.name}
                </Text>
                <Text className="font-semibold mb-2 text-base text-gray-500">
                    R$ {item.price}
                </Text>
            </View>

            <Modal isVisible={isModalVisible}>
                <View className="w-full h-[95%] bg-blue-100 pt-8 px-4 pb-32 rounded-xl">
                    <View>
                        <TouchableOpacity onPress={handleModal}>
                            <Ionicons name='arrow-back' size={34} />
                        </TouchableOpacity>
                    </View>
                    <View className="w-full h-[60%] mb-5">
                        <Image source={item.image} className="w-full h-full" />
                    </View>
                    <Text className="font-bold text-3xl mb-2">
                        {item.name}
                    </Text>
                    <Text className="text-lg text-gray-500 mb-4">
                        {item.description}
                    </Text>
                    <Text className="text-3xl font-bold mb-6">
                        R$ {item.price}
                    </Text>

                    <View className="flex flex-row justify-between items-center mb-8">
                        {item.id === 4 || item.id === 8 ? (
                            <>
                                {size === 'P' ? (
                                    <TouchableOpacity onPress={() => setSize('P')} className="border px-2 bg-gray-300">
                                        <Text className="text-lg">P</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => setSize('P')} className="border px-2">
                                        <Text className="text-lg">P</Text>
                                    </TouchableOpacity>)
                                }
                                {size === 'M' ? (
                                    <TouchableOpacity onPress={() => setSize('M')} className="border px-2 bg-gray-300">
                                        <Text className="text-lg">M</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => setSize('M')} className="border px-2">
                                        <Text className="text-lg">M</Text>
                                    </TouchableOpacity>)
                                }
                                {size === 'G' ? (
                                    <TouchableOpacity onPress={() => setSize('G')} className="border px-2 bg-gray-300">
                                        <Text className="text-lg">G</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => setSize('G')} className="border px-2">
                                        <Text className="text-lg">G</Text>
                                    </TouchableOpacity>)
                                }
                                {size === 'GG' ? (
                                    <TouchableOpacity onPress={() => setSize('GG')} className="border px-2 bg-gray-300">
                                        <Text className="text-lg">GG</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => setSize('GG')} className="border px-2">
                                        <Text className="text-lg">GG</Text>
                                    </TouchableOpacity>)
                                }
                            </>
                        ) : ''}
                        {item.id === 1 || item.id === 3 || item.id === 5 || item.id === 7 ? (
                            <>
                                {size === '36' ? (
                                    <TouchableOpacity onPress={() => setSize('36')} className="border px-2 bg-gray-300">
                                        <Text className="text-lg">36</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => setSize('36')} className="border px-2">
                                        <Text className="text-lg">36</Text>
                                    </TouchableOpacity>)
                                }
                                {size === '37' ? (
                                    <TouchableOpacity onPress={() => setSize('37')} className="border px-2 bg-gray-300">
                                        <Text className="text-lg">37</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => setSize('37')} className="border px-2">
                                        <Text className="text-lg">37</Text>
                                    </TouchableOpacity>)
                                }
                                {size === '38' ? (
                                    <TouchableOpacity onPress={() => setSize('38')} className="border px-2 bg-gray-300">
                                        <Text className="text-lg">38</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => setSize('38')} className="border px-2">
                                        <Text className="text-lg">38</Text>
                                    </TouchableOpacity>)
                                }
                                {size === '39' ? (
                                    <TouchableOpacity onPress={() => setSize('39')} className="border px-2 bg-gray-300">
                                        <Text className="text-lg">39</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => setSize('39')} className="border px-2">
                                        <Text className="text-lg">39</Text>
                                    </TouchableOpacity>)
                                }
                            </>
                        ) : ''}
                        {item.id === 2 || item.id === 6 ? (
                            <>
                                <Text>Cores:</Text>
                                {color === 'red' ? (
                                    <TouchableOpacity onPress={() => setColor('red')} className="border-2 p-3 bg-red-500 rounded-full" />
                                ) : (
                                    <TouchableOpacity onPress={() => setColor('red')} className=" border  p-3 bg-red-500 rounded-full" />)
                                }
                                {color === 'black' ? (
                                    <TouchableOpacity onPress={() => setColor('black')} className="border-2 p-3 bg-black rounded-full" />
                                ) : (
                                    <TouchableOpacity onPress={() => setColor('black')} className="border p-3 bg-black rounded-full" />)
                                }
                                {color === 'gold' ? (
                                    <TouchableOpacity onPress={() => setColor('gold')} className="border-2 p-3 bg-yellow-500 rounded-full" />
                                ) : (
                                    <TouchableOpacity onPress={() => setColor('gold')} className="border p-3 bg-yellow-500 rounded-full" />)
                                }
                                {color === 'white' ? (
                                    <TouchableOpacity onPress={() => setColor('white')} className="border-2 p-3 bg-white rounded-full" />
                                ) : (
                                    <TouchableOpacity onPress={() => setColor('white')} className="border p-3 bg-white rounded-full" />)
                                }
                            </>
                        ) : ''}

                        <View className="flex flex-row border rounded-xl px-2">
                            <TouchableOpacity onPress={decreaseValue}>
                                <Text className="text-2xl font-bold">-</Text>
                            </TouchableOpacity>
                            <Text className="mx-4 text-2xl font-bold">
                                {productQuantity}
                            </Text>
                            <TouchableOpacity onPress={incrementValue}>
                                <Text className="text-2xl font-bold">+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity className="w-full bg-blue-800 py-4 rounded-xl flex items-center justify-center" onPress={() => handleAddToCart({ item, size, productQuantity, color })}>
                        <Text className="text-white text-lg font-semibold">Add to cart</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </TouchableOpacity>
    )
}