import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Screen1 from './Screen1';
import Screen2 from './Screeen2';
import Screen3 from './Screen3';
import Screen4 from './Screen4';
import Screen1a from './Screen1a';
import { userInfo } from '../auth';

const Tab = createBottomTabNavigator();


const BottomNavigator = () => {
  const [userData,setUserData]=useState([])

//user information 
useEffect(() => {
  const fetchUserInfo = async () => {
    const userData = await userInfo();
    if (userData) {
      setUserData(userData)
    }
  };

  fetchUserInfo();
  }, []);


  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Scan') {
            iconName = 'qr-code-scanner';
          } else if (route.name === 'News') {
            iconName = 'library-books';
          }else if (route.name === 'Chat') {
            iconName = 'chat';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'red', // Set the active tab color to black
        tabBarInactiveTintColor: 'white', // Set the inactive tab color to black
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#010220', // Set the tab bar background color to black
          
        },
      })}
    >
     <Tab.Screen 
        name="Home" 
        component={userData.admin === 0 ? Screen1a : Screen1} 
      />
      {userData.admin !== 0 && (
        <Tab.Screen name="Scan" component={Screen2} />
      )}
      <Tab.Screen name="Chat" component={Screen4} />
      <Tab.Screen name="News" component={Screen3} />
    </Tab.Navigator>
  )
}

export default BottomNavigator

const styles = StyleSheet.create({})
