import { View, FlatList } from 'react-native'

import ProductComponent from '../../pages-components/Home/product';
import Header from '../../pages-components/Home/header'

import ProductsItems from '../../mock/products';

export default function Home({ navigation }) {
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