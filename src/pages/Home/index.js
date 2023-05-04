import { View, Text, ScrollView, FlatList } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';


import Header from '../../pages-components/Home/header'
import ProductComponent from '../../pages-components/Home/product';

import ProductsItems from '../../mock/products';
import { useEffect } from 'react';

export default function Home({ navigation }) {
    async function setAsyncStorage() {
        await AsyncStorage.getItem('cart');
    }

    useEffect(() => {
        setAsyncStorage();
    }, [])
    return (
        <View className="flex-1 pt-14 px-5 bg-blue-100">
            <Header navigation={navigation} />
            <FlatList
                className="flex"
                data={ProductsItems}
                renderItem={({ item }) => <ProductComponent item={item} />}
                keyExtractor={item => item.id}
                numColumns={2}
            />
        </View>
    )
}