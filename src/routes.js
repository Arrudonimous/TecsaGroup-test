import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from './pages/Home';
import CartScreen from './pages/Cart';

import { Entypo } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();

export default function Routes() {
    return (
        <Tab.Navigator
            screenOptions={(route) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: 'darkblue',
                    borderTopColor: 'transparent',
                    height: "9%",
                },

            })}
        >
            <Tab.Screen component={HomeScreen} name="Home" options={{
                tabBarIcon: () => (
                    <Entypo name="home" size={24} color={'#ffff'} />
                ),
                tabBarLabelStyle: {
                    color: 'white',
                },
            }} />
            <Tab.Screen component={CartScreen} name="Carrinho" options={{
                tabBarIcon: () => (
                    <Entypo name="shopping-cart" size={24} color={'#ffffff'} />
                ),
                tabBarLabelStyle: {
                    color: 'white',
                },
            }} />
        </Tab.Navigator >
    )
}