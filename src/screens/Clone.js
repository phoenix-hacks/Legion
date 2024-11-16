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
import { Feather } from "@expo/vector-icons";

const Clone = ({ navigation }) => {
  const [url, setUrl] = useState("");
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(300); // 300 seconds = 5 minutes
  const [timerRunning, setTimerRunning] = useState(false);

  const handleUrlChange = (text) => {
    setUrl(text);
  };

  const handleButtonClick = () => {
    getVulnerability();
  };

  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        if (countdown > 0) {
          setCountdown((prevCountdown) => prevCountdown - 1);
        } else {
          setTimerRunning(false);
          clearInterval(interval);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [countdown, timerRunning]);

  const getVulnerability = async () => {
    setTimerRunning(true);
    setLoading(true);
    try {
      const resp = await axios.post("http://10.250.3.34:5000/scan_domain", { domain: url });
      const response = resp.data;
      console.log(response);
      setVulnerabilities(Array.isArray(response) ? response : [response]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVulnerabilityPress = (vulnerability) => {
    if (!vulnerability) return;

    Alert.alert(
      "Vulnerability Details",
      `Domain: ${vulnerability.domain}\nDNS A Records: ${vulnerability.dns_a.join(", ")}\nFuzzer: ${vulnerability.fuzzer}`,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") },
        {
          text: "Details",
          onPress: () =>
            navigation.navigate("Details", {
              vulnerabilityName: vulnerability.domain,
            }),
        },
      ],
      { cancelable: false }
    );
  };

  const handleClear = () => {
    navigation.navigate('Duplicate')
  };

  const handleSubdomain = () => {
    navigation.navigate("SubDomain")
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity
           onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={24} style={{top: 10,left:10,
    color: "black"}} />
        </TouchableOpacity>
        <MaskedView
          maskElement={
            <Text
              style={[styles.headerTitle, { backgroundColor: "transparent" }]}
            >
              Dns Twist
            </Text>
          }
        >
          <LinearGradient
            colors={["red", "black"]}
            start={[0.5, 0]}
            end={[1, 1]}
            style={styles.yellowHeader}
          >
            <Text style={[styles.headerTitle, { opacity: 0 }]}>Dns Twist</Text>
          </LinearGradient>
        </MaskedView>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter website URL"
        onChangeText={handleUrlChange}
        value={url}
      />

      <View style={{ flexDirection: "", justifyContent: "space-around" }}>
        <TouchableOpacity onPress={handleButtonClick} style={styles.scan}>
          <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
            Check
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          vulnerabilities.map((vulnerability, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleVulnerabilityPress(vulnerability)}
              style={styles.vulnerabilityBlock}
            >
              <View style={styles.vulnerabilityContainer}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.vulnerabilityText}
                >
                  {vulnerability.domain}
                </Text>
                <Feather
                  name="eye"
                  size={20}
                  color="black"
                  onPress={() =>
                    navigation.navigate("Details", {
                      vulnerabilityName: vulnerability.domain,
                    })
                  }
                />
              </View>
              <Text style={styles.vulnerabilityDetail}>
                DNS A: {vulnerability.dns_a.join(", ")}
              </Text>
              <Text style={styles.vulnerabilityDetail}>
                Fuzzer: {vulnerability.fuzzer}
              </Text>
            </TouchableOpacity>
          ))
        )}

        {vulnerabilities.length > 0 && !loading && (
            <TouchableOpacity onPress={handleClear} style={styles.clear}>
              <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
                Match
              </Text>
            </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "",
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
    paddingLeft: 120,
  },
  headerMenuIcon: {
    color: "#000",
    top: 10,
    marginLeft: 20,
  },
  yellowHeader: {
    textAlign: "center",
    marginTop: -5,
    marginRight: 130,
  },

  input: {
    height: 40,
    marginBottom: 10,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 25,
    width: 300,
    alignSelf: "center",
    padding: 5,
    borderRadius: 10,
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
  clone: {
    backgroundColor: "black",
    width: 200,
    borderRadius: 20,
    alignSelf: "center",
    padding: 5,
    height: 40,
    marginBottom: 10,
  },
  vulnerabilitiesContainer: {
    marginTop: 20,
    marginLeft: 10,
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
  vulnerabilityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
    // Add any other common styles for each vulnerability container
  },
  clear: {
    backgroundColor: "black",
    width: 150,
    borderRadius: 20,
    alignSelf: "center",
    padding: 5,
    height: 40,
    marginBottom: 20,
    margin: 20,
    marginLeft:40
  },
  vulnerabilityBlock: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  vulnerabilityText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  vulnerabilityDetail: {
    fontSize: 14,
    color: "#555",
  },
  timerContainer: {
    flex: 1,
    alignSelf: "center",
  },
  timerText: {
    fontSize: 26,
    color: "green",
  },
});

export default Clone;
