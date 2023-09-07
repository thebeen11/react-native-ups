import { View, FlatList } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useTailwind } from 'tailwind-rn'
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { TabStackParamsList } from '../navigator/TabNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamsList } from '../navigator/RootNavigator'
import useCustomerOrders from '../hooks/useCustomerOrders'
import DeliveryCard from '../components/DeliveryCard'

export type ModalScreennavigationProp = CompositeNavigationProp<
BottomTabNavigationProp<TabStackParamsList>, NativeStackNavigationProp<RootStackParamsList, "MyModal">>

type ModalScreenRouteProp = RouteProp<RootStackParamsList, "MyModal">

const ModalScreen = () => {
    const tw = useTailwind()

    const navigation = useNavigation<ModalScreennavigationProp>()
    const {params: {name, userId}} = useRoute<ModalScreenRouteProp>()

    const { loading, error, orders } = useCustomerOrders(userId)

    useLayoutEffect(() => {
        navigation.setOptions({
         headerTitle: name,
         headerTitleStyle: {color: "black"},
         headerTintColor: "#AAF1F5",
         headerBackTitle: "Orders"
        })
       }, [name])
  return (
    
        <View>
      <FlatList 
      data={orders} 
      keyExtractor={(order) => order.trackingId} 
      renderItem={({item: order}) => <DeliveryCard order={order}/>}/>
    </View>
   
  )
}

export default ModalScreen