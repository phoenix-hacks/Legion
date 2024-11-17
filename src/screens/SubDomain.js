import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import axios from "axios";
import { uri } from "../../globalvariable/globalvariable";

const Subdomain = ({ navigation }) => {
  const [domain, setDomain] = useState("");
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUrlChange = (text) => {
    setDomain(text);
  };

  const handleButtonClick = () => {
    if (domain.trim() !== "") {
      getVulnerability();
    } else {
      Alert.alert("Error", "Please enter a website URL");
    }
  };

  const getVulnerability = async () => {
    <ActivityIndicator size="large" color="blue" />
    setLoading(true);
    try {
      const resp = await axios.post(`${uri}/subdomain`, {
        domain: domain,
      });
      const response = resp.data;
      const vulnerabilities = response.subdomains.map(subdomain => ({ subdomain }));
      console.log(vulnerabilities);
      setVulnerabilities(vulnerabilities);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("An error occurred while scanning the domain.");
    } finally{
      setLoading(false);
    }
};


  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        ><Ionicons name="arrow-back" size={24} style={styles.headerMenuIcon} />
        </TouchableOpacity>
        <MaskedView
          maskElement={
            <Text style={[styles.headerTitle, { backgroundColor: "transparent" }]}>
              Subdomain
            </Text>
          }
        >
          <LinearGradient
            colors={["red", "black"]}
            start={[0.5, 0]}
            end={[1, 1]}
            style={styles.yellowHeader}
          >
            <Text style={[styles.headerTitle, { opacity: 0 }]}>Subdomain</Text>
          </LinearGradient>
        </MaskedView>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter website URL"
        onChangeText={handleUrlChange}
        value={domain}
      />

      <TouchableOpacity onPress={handleButtonClick} style={styles.scan}>
        <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>Scan</Text>
      </TouchableOpacity>

      <ScrollView>
        {loading && <ActivityIndicator size="large" color="blue" />}
        {error && <Text style={styles.error}>{error}</Text>}
        {vulnerabilities.map((item, index) => (
          <View key={index} style={styles.item}>
            {Object.entries(item).map(([key, value]) => (
              <View key={key} style={styles.row}>
                <Text style={styles.key}>{key}: </Text>
                <Text style={styles.value}>{JSON.stringify(value)}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    backgroundColor: "#fff",
    elevation: 50,
  },
  headerTitle: {
    fontSize: 30,
    color: "#000",
    marginLeft:70,
    marginTop:30,
    alignSelf:"center"
  },
  headerMenuIcon: {
    color: "#000",
    top: 10,
    marginLeft: 20,
  },
  yellowHeader: {
    textAlign: "center",
    textAlign:"center"
  },

  input: {
    height: 40,
    marginBottom: 10,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 25,
    width: 300,
    alignSelf: "center",
    padding:5,
    borderRadius:10
  },
  scan: {
    backgroundColor: "black",
    width: 100,
    borderRadius: 20,
    alignSelf: "center",
    padding: 5,
    height: 40,
  },
  vulnerabilitiesContainer: {
    marginTop: 20,
    marginLeft:10
  },
  vulnerabilitiesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  vulnerabilityItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  vulnerabilityTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  clear:{
    backgroundColor: "black",
    width: 200,
    borderRadius: 20,
    alignSelf: "center",
    padding: 5,
    height: 40,
  },
  item: {
    marginBottom: 20,
    backgroundColor: '#eee',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  key: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  value: {},
});

export default Subdomain;