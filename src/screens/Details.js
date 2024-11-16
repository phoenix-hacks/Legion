import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Details = ({ route, navigation }) => {
  const { vulnerabilityName } = route.params;
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnswerFromStorage = async () => {
      try {
        // Check if the answer is already stored in AsyncStorage
        const storedAnswer = await AsyncStorage.getItem(vulnerabilityName);
        if (storedAnswer !== null) {
          setAnswer(storedAnswer);
          setLoading(false);
        } else {
          fetchAnswerFromGemini();
        }
      } catch (error) {
        console.error("Error fetching answer from AsyncStorage:", error);
        // Handle error fetching from AsyncStorage
      }
    };

    fetchAnswerFromStorage();
  }, [vulnerabilityName]);

  const fetchAnswerFromGemini = async () => {
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBmp_1372mUBilPZA9MnvjTK-GoeICYXIs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `how we can prevent ourself from  ${vulnerabilityName}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (
        !data ||
        !data.candidates ||
        !data.candidates[0] ||
        !data.candidates[0].content ||
        !data.candidates[0].content.parts
      ) {
        throw new Error(
          "Empty response or missing answer field. Response: " +
            JSON.stringify(data)
        );
      }

      const answerParts = data.candidates[0].content.parts;
      const answerText = answerParts.map((part) => part.text).join("");

      // Store the answer in AsyncStorage for future use
      await AsyncStorage.setItem(vulnerabilityName, answerText);
      setAnswer(answerText);
    } catch (error) {
      console.error("Error fetching answer from Gemini:", error);
      // Handle error fetching from Gemini
    } finally {
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
        >
          <Ionicons name="arrow-back" size={24} style={styles.headerMenuIcon} />
        </TouchableOpacity>
        <MaskedView
          maskElement={
            <Text
              style={[styles.headerTitle, { backgroundColor: "transparent" }]}
            >
              DETAIL
            </Text>
          }
        >
          <LinearGradient
            colors={["red", "black"]}
            start={[0.5, 0]}
            end={[1, 1]}
            style={styles.yellowHeader}
          >
            <Text style={[styles.headerTitle, { opacity: 0 }]}>DETAIL</Text>
          </LinearGradient>
        </MaskedView>
      </View>
      <ScrollView>
        <View
          style={{
            backgroundColor: "white",
            marginTop: 10,
            borderRadius: 20,
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <Text style={{ marginLeft: 15, fontSize: 15, margin: 10 }}>
            What is{" "}
            <Text style={{ fontWeight: "bold", color: "red" }}>
              {vulnerabilityName}
            </Text>
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "white",
            marginTop: 10,
            borderRadius: 20,
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 20,
          }}
        >
          {loading ? (
            <ActivityIndicator size="large" color="blue" />
          ) : (
            <Text
              style={{
                marginLeft: 15,
                fontSize: 15,
                margin: 10,
                textAlign: "justify",
              }}
            >
              {answer}
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingLeft: 70,
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
});
