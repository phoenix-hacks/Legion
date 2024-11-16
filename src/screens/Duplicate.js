import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { uri } from '../../globalvariable/globalvariable';

const Duplicate = ({navigation}) => {
  const [url1, setUrl1] = useState('');
  const [url2, setUrl2] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCompare = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${uri}/api/compare`, {
        url1,
        url2,
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error comparing URLs:', error);
      setResult(null);
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
          <Ionicons name="arrow-back" size={24} style={{top: 10,left:5,
    color: "black"}} />
        </TouchableOpacity>
        <MaskedView
          maskElement={
            <Text
              style={[styles.headerTitle, { backgroundColor: "transparent" }]}
            >
              CLONE WEBSITES
            </Text>
          }
        >
          <LinearGradient
            colors={["red", "black"]}
            start={[0.5, 0]}
            end={[1, 1]}
            style={styles.yellowHeader}
          >
            <Text style={[styles.headerTitle, { opacity: 0 }]}>CLONE WEBSITES</Text>
          </LinearGradient>
        </MaskedView>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter URL 1"
        value={url1}
        onChangeText={setUrl1}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter URL 2"
        value={url2}
        onChangeText={setUrl2}
      />
      <TouchableOpacity style={styles.button} onPress={handleCompare}>
        <Text style={styles.buttonText}>Compare</Text>
      </TouchableOpacity>

      {loading && <Text style={styles.loadingText}>Loading...</Text>}

      {result && (
        <ScrollView style={styles.resultContainer}>
          <Text style={styles.resultText}>
            Combined Similarity: {result.combined_similarity}
          </Text>
          <Text style={styles.resultText}>
            Interpretation: <Text style={{color:"red"}}>{result.interpretation}</Text>
          </Text>
          <Text style={styles.resultText}>
            Structure Similarity: {result.structure_similarity}
          </Text>
          <Text style={styles.resultText}>
            Text Similarity: {result.text_similarity}
          </Text>
        </ScrollView>
      )}
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
    paddingTop: 10,
    height: 70,
    backgroundColor: "#fff",
    elevation: 50,
  },
  headerTitle: {
    fontSize: 30,
    color: "#000",
    marginTop: 18,
    paddingRight:60
  },
  headerMenuIcon: {
    color: "#000",
    top: 10,
    marginLeft: 20,
  },
  yellowHeader: {
    textAlign: "center",
    marginTop: -5,
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
    margin:20,
    borderWidth:2
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
  button: {
    width: '50%',
    height: 40,
    backgroundColor: 'black',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:"center",
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
   // width: '100%',
    margin:20
  },
  resultText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight:"bold"
  },
  
});

export default Duplicate;
