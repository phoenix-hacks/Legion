import React ,{useState,useEffect} from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity,Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { userInfo } from '../auth';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;



const Profile = ({ navigation }) => {
  // const navigateToScreen = (screenName) => {
  //   navigation.navigate(screenName);
  // };

  const [userData, setUserData] = useState([])

  const renderIcon = (text, iconName, color, index) => {
    let IconComponent = FontAwesome;
    let processedIconName = iconName;
  
    switch (iconName.split('-')[0]) {
      case "md":
        IconComponent = MaterialIcons;
        processedIconName = iconName.slice(3);
        break;
      case "mcm":
        IconComponent = MaterialCommunityIcons;
        processedIconName = iconName.slice(4);
        break;
      default:
        break;
    }
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

    
    return (
      <TouchableOpacity
        key={index}
        style={styles.iconContainer}
        //onPress={navigateTo}
      >
        <IconComponent name={processedIconName} size={50} color={color} />
        <Text style={styles.iconText}>{text}</Text>
      </TouchableOpacity>
    );
  };

  return (
   
      <View style={styles.background}>
        <LinearGradient
          colors={["#B86766", "#B86766"]}
          start={[0, 0]}
          end={[1.2, 1]}
          style={styles.yellowHeader}
        >
          <View style={{ height: 20, right: 59, left: 75 }}>
            <View>
              <TouchableOpacity>
                <Image
                  source={require("../../Images/homescreen2.jpeg")}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
              <Text style={styles.headerText}>{userData.name}</Text>
              {/* <Text style={styles.headerText2}>{userData.email}</Text> */}
            </View>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={["white", "#b8b8b8"]}
          start={[0, 0]}
          end={[1, 1]}
          style={styles.whiteContainer}
        >
          <ScrollView contentContainerStyle={styles.grid}>
            <View style={styles.iconRow}>
              
              {renderIcon("Analysis", "lightbulb-o", "#000", 0)}
              {renderIcon("Reports", "book", "#9C27B0",1)}
            </View>
            <View style={styles.iconRow}>
              {renderIcon("Domain", "mcm-calendar-check-outline", "#4CAF50", 2)}
              {renderIcon("Calendar", "mcm-calendar-clock", "#F44336", 3)}
            </View>
            <View style={styles.iconRow}>
              {renderIcon("History", "history", "#2196F3",4)}
              {renderIcon("Settings", "gear", "#000", 5)}
              
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
  },
  yellowHeader: {
    flexDirection: "row",
    height: screenHeight / 4,
  },
  headerText: {
    fontSize: 24,
    color: "black",
    textDecorationLine: "underline",
    //fontFamily: "Rajdhani",
    marginTop: 3,
    marginLeft:70,
    alignSelf:"center"
  },
  headerText2: {
    fontSize: 24,
    color: "black",
    textDecorationLine: "underline",
    //fontFamily: "Rajdhani",
    bottom: 5,
    marginLeft:60,
     alignSelf:"center"
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "black",
    alignSelf: "center",
    marginTop: 40,
    marginLeft:70
  },
  whiteContainer: {
    position: "absolute",
    top: screenHeight / 3.3,
    marginBottom: 20,
    left: 18,
    right: 18,
    width: screenWidth - 36,
    borderColor: "black",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    transform: [{ translateY: -20 }],
    zIndex: 1,
    borderWidth: 1,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 30,
    marginTop: 20,
  },
  iconContainer: {
    height: screenHeight * 0.15,
    width: screenWidth * 0.3,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    elevation: 20,
    padding: 5,
    margin: 12,
    width: 120,
  },
  iconText: {
    fontSize: 18,
    color: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  grid: {
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default Profile;
