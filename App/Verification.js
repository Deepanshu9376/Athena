import { View, Text } from 'react-native'
import React from 'react'

export default function Verification({navigation,route}) {
    const  {userdata}=route.params;
    console.log('from verification page', userdata[0]?.VerificationCode)
  return (
    <View>
      <Text>Verification</Text>
    </View>
  )
}