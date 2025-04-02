import { View, Text,TextInput } from 'react-native'
import React from 'react'

const Rib = () => {
  return (
    <View>
      <Text className='text-lg font-semibold '>Your Rib </Text>
      <TextInput className='bg-[#F5F9FE] rounded-lg px-4 py-5 placeholder:text-[#000000]' placeholder='Enter Your Rib' />
    </View>
  )
}

export default Rib