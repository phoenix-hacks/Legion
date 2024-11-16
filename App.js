import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppNavigator from './src/Screens/AppNavigator'
import registerNNPushToken from 'native-notify'

export default function App ()  {
  registerNNPushToken(23880, '6GTPj6xHrCXecjpZsisA1N');

  return (
    <AppNavigator/>
  )
}

