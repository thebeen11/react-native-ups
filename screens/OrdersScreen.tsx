import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { TabStackParamsList } from '../navigator/TabNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamsList } from '../navigator/RootNavigator'
import { useTailwind } from 'tailwind-rn'
import useOrders from '../hooks/useOrders'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from '@rneui/themed'
import { Button } from '@rneui/base'
import OrderCard from '../components/OrderCard'

export type OrdersScreenScreennavigationProp = CompositeNavigationProp<
BottomTabNavigationProp<TabStackParamsList, "Orders">, NativeStackNavigationProp<RootStackParamsList>>

const OrdersScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<OrdersScreenScreennavigationProp>()

  const [input, setInput] = useState<string>("")
  const { loading, error, orders } = useOrders()
  const [ascending, setAscending] = useState<boolean>(false)

  useLayoutEffect(() => {
    navigation.setOptions({
       headerShown: false,
       tabBarLabel: ({focused, color}) => (
        <Text style={{color: focused ? "#EACE9C" : color, fontSize: 10}}>Orders</Text>
       )
    })
   }, [])

  return (
    
    <ScrollView  style={{backgroundColor: "#FCEDD0"}}>
      <Image source={{uri: "https://img.freepik.com/free-vector/man-delivering-food-while-wearing-medical-mask_52683-39764.jpg?w=1800&t=st=1694093555~exp=1694094155~hmac=437c732f5621c00907e95da691836e8f5149d74d9206fd8ef1f387e681415a80"}}
      containerStyle={tw("w-full h-64")}
      PlaceholderContent={<ActivityIndicator/>}/>

      <View  style={tw("py-2 px-5")}>
        <Button color="#EACE9C"
        style={tw("py-2 px-5")}
        titleStyle={{color: "gray", fontWeight: "400"}}
        onPress={() => setAscending(!ascending)}>
          {ascending ? "Showing: Oldest First" : "Showing: Most Recent First" }
        </Button>

        
        </View>
        {orders?.sort((a, b) => {
          if (ascending) {
            return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1
          } else {
            return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1
          }
        }).map(order => (
          <OrderCard key={order.trackingId} item={order}/>
        ))
        }
    </ScrollView>
   
  )
}

export default OrdersScreen