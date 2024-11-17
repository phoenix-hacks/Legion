import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view"
import axios from 'axios';
import { uri } from "../../globalvariable/globalvariable";

const Spam = ({navigation}) => {
  const [message, setMessage] = useState('');
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${uri}/spam/predict`, {text: message });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={24} style={styles.headerMenuIcon} />
        </TouchableOpacity>
        <MaskedView
          maskElement={
            <Text
              style={[styles.headerTitle, { backgroundColor: "transparent" }]}
            >
              SPAM CLASSIFIER
            </Text>
          }
        >
          <LinearGradient
            colors={["red", "black"]}
            start={[0.5, 0]}
            end={[1, 1]}
            style={styles.yellowHeader}
          >
            <Text style={[styles.headerTitle, { opacity: 0 }]}>SPAM CLASSIFIER</Text>
          </LinearGradient>
        </MaskedView>
      </View>
      <View style={{margin:20}}>
        <TextInput
          style={styles.input}
          placeholder="Enter message"
          onChangeText={text => setMessage(text)}
          value={message}
        />
      </View>
      <View style={{margin:20}}>


      <TouchableOpacity onPress={handlePredict} style={styles.scan}>
        <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
          Predict
        </Text>
      </TouchableOpacity>
      </View>
      <View style={{flex:1,alignSelf:"center"}}>
  {loading && <Text>Loading...</Text>}
  {prediction !== '' && 
    <Text style={[styles.prediction, {color: prediction === 'Spam' ? 'red' : 'green'}]}>
      {prediction}
    </Text>
  }
</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  prediction: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    height: 70,
    backgroundColor: "#fff",
    elevation: 50,
  },
  headerTitle: {
    fontSize: 30,
    color: "#000",
    marginTop: 18,
  },
  headerMenuIcon: {
    color: "#000",
    top: 10,
    marginLeft: 20,
  },
  yellowHeader: {
    marginTop: -5,
    marginRight:60
  },
  imput:{
    borderRadius:20
  },
  scan: {
    backgroundColor: "black",
    width: 100,
    borderRadius: 20,
    alignSelf: "center",
    padding: 5,
    height: 40,
    marginBottom: 10,
  },
});

export default Spam;
