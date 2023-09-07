import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { TabStackParamsList } from '../navigator/TabNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamsList } from '../navigator/RootNavigator'
import { useTailwind } from 'tailwind-rn'
import DeliveryCard from '../components/DeliveryCard'

export type OrderScreenScreennavigationProp = CompositeNavigationProp<
BottomTabNavigationProp<TabStackParamsList, "Orders">, NativeStackNavigationProp<RootStackParamsList>>

type OrderScreenRouteProp = RouteProp<RootStackParamsList, "Order">


const OrderScreen = () => {
    const tw = useTailwind()
    const {params:{order}} = useRoute<OrderScreenRouteProp>()
  const navigation = useNavigation<OrderScreenScreennavigationProp>()

  useLayoutEffect(() => {
   navigation.setOptions({
    headerTitle: order.trackingItems.customer.name,
    headerTitleStyle: {color: "black"},
    headerTintColor: "#EACE9C",
    headerBackTitle: "Deliveries"
   })
  }, [order])
  return (
    <View style={tw("-mt-2")}>
      <DeliveryCard order={order} fullwidth/>
    </View>
  )
}

export default OrderScreen