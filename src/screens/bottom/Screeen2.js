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
import { uri } from "../../../globalvariable/globalvariable";
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

const Scanner = ({ navigation }) => {
  const [url, setUrl] = useState("");
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(3); // 5 minutes
  const [timerRunning, setTimerRunning] = useState(false);

  // Countdown Timer
  useEffect(() => {
    let interval;
    if (timerRunning && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, countdown]);

  // Handling URL input
  const handleUrlChange = (text) => {
    setUrl(text);
  };

  // Handle Scan button
  const handleScanClick = () => {
    getVulnerability();
  };

  // Fetching vulnerabilities
  const getVulnerability = async () => {
    setTimerRunning(true);
    setLoading(true);
    try {
      const resp = await axios.post(`${uri}/check_url/`, { url });
      const response = resp.data;

      if (Array.isArray(response)) {
        const formattedVulnerabilities = response.map((vul) => ({
          heading: vul.heading,
          description: vul.description,
        }));
        setVulnerabilities(formattedVulnerabilities.slice(0, 3));
      } else {
        setVulnerabilities([{ heading: response.heading, description: response.description }]);
      }
    } catch (error) {
      Alert.alert("Error", "Error fetching vulnerabilities.");
    } finally {
      setLoading(false);
    }
  };

  // Show Vulnerability Details
  const handleVulnerabilityPress = (vulnerability) => {
    Alert.alert(
      "Vulnerability Details",
      `${vulnerability.heading}\n${vulnerability.description}`,
      [
        { text: "OK" },
        {
          text: "Details",
          onPress: () => navigation.navigate("Details", { vulnerabilityName: vulnerability.heading }), // passing heading properly
        },
      ]
    );
  };

  // Handle Clear button
  const handleClear = () => {
    setUrl("");
    setVulnerabilities([]);
    setCountdown(300);
    setTimerRunning(false);
  };

  // Generate and Share PDF Report
  const generatePdf = async () => {
    const html = `
      <html>
      <head><title>Scan Report</title></head>
      <body>
        <h1 style="color:red;text-align:center;">Scan Report</h1>
        <p>Generated on: ${new Date().toLocaleString()}</p>
        <p>Scanner: Raghav Kumar Jha</p>
        <p>Total Vulnerabilities Found: ${vulnerabilities.length}</p>
        <ul>
          ${vulnerabilities.map(vul => `<li><b>${vul.heading}:</b> ${vul.description}</li>`).join('')}
        </ul>
      </body>
      </html>
    `;

    const file = await printToFileAsync({ html });
    await shareAsync(file.uri);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={24} style={styles.headerMenuIcon} />
        </TouchableOpacity>
        <MaskedView
          maskElement={<Text style={[styles.headerTitle, { backgroundColor: "transparent" }]}>Scanner</Text>}
        >
          <LinearGradient colors={["red", "black"]} start={[0.5, 0]} end={[1, 1]}>
            <Text style={[styles.headerTitle, { opacity: 0 }]}>Scanner</Text>
          </LinearGradient>
        </MaskedView>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter website URL"
        onChangeText={handleUrlChange}
        value={url}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleScanClick} style={styles.button}>
          <Text style={styles.buttonText}>Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClear} style={styles.button}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
  {timerRunning ? (
    <Text style={styles.timerText}>
      Scanning... {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')} Min
    </Text>
  ) : loading ? (
    <ActivityIndicator size="large" color="blue" />
  ) : vulnerabilities.length > 0 ? (
    vulnerabilities.map((vul, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => handleVulnerabilityPress(vul)}
        style={styles.vulnerabilityBlock}
      >
        <Text style={styles.vulnerabilityHeading}>{vul.heading}</Text>
        <Text style={styles.vulnerabilityDescription}>{vul.description}</Text>
      </TouchableOpacity>
    ))
  ) : (
    <Text style={styles.noVulnerabilityText}>No vulnerabilities found</Text>
  )}



  {vulnerabilities.length > 0 && (
    <TouchableOpacity onPress={generatePdf} style={styles.button}>
      <Text style={styles.buttonText}>Generate Report</Text>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 70,
    backgroundColor: "#fff",
    paddingTop: 10,
    elevation: 50,
  },
  headerTitle: {
    fontSize: 30,
    color: "#000",
    marginTop: 18,
    paddingRight:130
   // paddingLeft: 120,
  },
  headerMenuIcon: {
    color: "#000",
    marginLeft: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 25,
    marginHorizontal: 20,
    padding: 5,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "black",
    borderRadius: 20,
    padding: 10,
    width: 150,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  scrollContainer: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  timerText: {
    textAlign: "center",
    fontSize: 16,
    color: "red",
    marginBottom: 20,
  },
  vulnerabilityBlock: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  vulnerabilityHeading: {
    fontSize: 16,
    fontWeight: "bold",
  },
  vulnerabilityDescription: {
    fontSize: 14,
    color: "#333",
  },
  noVulnerabilityText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
});

export default Scanner;
