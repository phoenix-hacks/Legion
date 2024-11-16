import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { TouchableOpacity } from "react-native-gesture-handler";
  import { Ionicons } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
  import { userInfo } from '../auth';
  import AsyncStorage from '@react-native-async-storage/async-storage';


  // Function to remove the access token
export const removeAccessToken = async () => {
  try {
    await AsyncStorage.removeItem('accessToken');
  } catch (error) {
    console.error('Error removing access token:', error);
  }
};
  
  const CustomDrawer = () => {
    const [userData, setUserData] = useState([])
    
    // handeling logout
    const handleLogout = async () => {
      try {
        // Remove the access token
        await removeAccessToken();
        // Navigate to the login screen or any other initial screen
        navigation.navigate('Login');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    //user information 
  useEffect(() => {
    const fetchUserInfo = async () => {
      const userData = await userInfo();
      if (userData) {
        setUserData(userData);
      }
    };
  
    fetchUserInfo();
  }, []);
  
  
    const navigation = useNavigation();
    return (
      <View style={[styles.container]}>
        <View>
          <View style={[styles.backgroundColor]}>
            <TouchableOpacity>
              <Image
                source={require("../../Images/Login2.webp")}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 60,
                  left: 80,
                  marginTop: 40,
                  borderColor:"white",
                  borderWidth:1
                }}
              />
            </TouchableOpacity>
  
            <Text style={[styles.headerText]}>{userData.name}</Text>
            <Text style={[styles.headerText2]}>{userData.email}</Text>
          </View>
          <ScrollView>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <View style={[styles.option]}>
                <Ionicons
                  name="person-circle"
                  size={30}
                  color="black"
                  style={styles.icon}
                />
                <Text style={[styles.optiontext]}>Profile</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Main")}>
              <View style={[styles.option]}>
                <Ionicons
                  name="home"
                  size={30}
                  color="black"
                  style={styles.icon}
                />
                <Text style={[styles.optiontext]}>Home</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("About")}>
              <View style={[styles.option]}>
                <Ionicons
                  name="information-circle"
                  size={30}
                  color="black"
                  style={styles.icon}
                />
                <Text style={[styles.optiontext]}>About us </Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => navigation.navigate("Education")}>
              <View style={[styles.option]}>
                <Ionicons
                  name="book"
                  size={30}
                  color="black"
                  style={styles.icon}
                />
                <Text style={[styles.optiontext]}>Education</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("")}>
              <View style={[styles.option]}>
                <Ionicons
                  name="help-circle"
                  size={30}
                  color="black"
                  style={styles.icon}
                />
                <Text style={[styles.optiontext]}>FAQ</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("")}>
              <View style={[styles.option]}>
                <Ionicons
                  name="shield"
                  size={30}
                  color="black"
                  style={styles.icon}
                />
                <Text style={[styles.optiontext]}>Policy</Text>
              </View>
            </TouchableOpacity>
           
  
  
            <TouchableOpacity onPress={handleLogout}>
              <View
                style={[styles.option ]}
              >
                <Ionicons
                  name="log-out"
                  size={30}
                  color="black"
                  style={styles.icon}
                />
                <Text
                  style={[
                    styles.optiontext,
                  ]}
                >
                  LOGOUT
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#441159",
      flex: 1,
      opacity: 1,
      borderWidth: 1,
    },
    backgroundColor: {
      backgroundColor: "#441159",
     
    },
    headerText: {
      fontSize: 14,
      color: "white",
      textDecorationLine: "underline",

      marginTop: 20,
      textAlign:"center"
    },
    headerText2: {
      fontSize: 14,
      color: "white",
      textDecorationLine: "underline",
      bottom: 5,
      textAlign:"center"
    },
    option: {
      marginTop: 20,
      height: 45,
      width:"95%",
      flexDirection: "row",
      textAlign:'center',
      alignContent:'center',
      backgroundColor: "lightgrey",
      borderRadius:20,
      alignSelf:"center"
    },
    optiontext: {
      left: 20,
      fontSize: 17,
      top: 8,
    },
    icon: {
      textAlign: "right",
      left: 10,
      top: 5,
    },
  });
  
  export default CustomDrawer;
  