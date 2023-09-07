import { ActivityIndicator,  ScrollView, Text } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useTailwind } from 'tailwind-rn';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { TabStackParamsList } from '../navigator/TabNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../navigator/RootNavigator';
import { Image, Input } from '@rneui/themed';
import { useQuery } from '@apollo/client';
import { GET_CUSTOMERS } from '../graphql/queries';
import CustomerCard from '../components/CustomerCard';
import { SafeAreaView } from 'react-native-safe-area-context';

export type CustomerScreennavigationProp = CompositeNavigationProp<
BottomTabNavigationProp<TabStackParamsList, "Customers">, NativeStackNavigationProp<RootStackParamsList>>

const CustomerScreen = () => {
    const tw = useTailwind();
    const navigation = useNavigation<CustomerScreennavigationProp>()

    const [input, setInput] = useState<string>("")
    const { loading, error, data } = useQuery(GET_CUSTOMERS)


    useLayoutEffect(() => {
     navigation.setOptions({
        headerShown: false
     })
    }, [])

  return (
   <SafeAreaView>
     <ScrollView style={{ backgroundColor: '#AAF1F5'}}>
      <Image 
      source={{uri: "https://img.freepik.com/free-vector/delivery-staff-ride-motorcycles-shopping-concept_1150-34879.jpg?w=1480&t=st=1693933299~exp=1693933899~hmac=f62af2e631380ace82717b7a8cc1e1ca8147e77154e36da153f8b17672276aa2"}}
      containerStyle={tw("w-full h-64")}
      PlaceholderContent={<ActivityIndicator/>}
      />

      <Input placeholder='Search by Customer' value={input} onChangeText={setInput} containerStyle={tw(" bg-white pt-5 pb-0 px-10")}/>

      {data?.getCustomers?.filter((customer: CustomerList) => customer.value.name.includes(input))
      .map(({name: ID, value: {email, name}}: CustomerResponse) => (
        <CustomerCard key={ID} email={email} name={name} userId={ID}/>
      ))}

    </ScrollView>
   </SafeAreaView>
  )
}

export default CustomerScreen