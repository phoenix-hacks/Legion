import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, TextInput} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { uri } from '../../globalvariable/globalvariable';
import { Ionicons } from "@expo/vector-icons";

const Decrypt = ({navigation}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [encryptedWords, setEncryptedWords] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [url, setUrl] = useState('');   
  const [d, sd] = useState("")
  const handleUrlChange = (text) => {
    setUrl(text);
  };

  
  const decrypt_data = (()=>{
    axios.post(`${uri}/decrypt/image`,{
        url
    }).then(resp=>{
        console.log(resp.data)
        sd(resp.data.decoded_text)
        console.log(d) // <-- Problematic line
    }).catch(e=>{
        console.error(e)
    })
})
  const handleButton1Press = () => {
    console.log('Button 1 pressed');
    // Add your logic for button 1 functionality here
  };

  const handleButton2Press = () => {
    console.log('Button 2 pressed');
    // Add your logic for button 2 functionality here
    setSelectedImage(null); // Reset the selected image
  setEncryptedWords('');
  setDecryptedMessage(''); 
  
  };
  const handleEncrypt = () => {
    // Implement encryption logic for hiddenText and update the encryptedText state
    // Example implementation using a simple Caesar cipher:
    decrypt_data()
}
  const handleButton3Press = () => {
    console.log('Button 3 pressed');
    // Add your logic for button 3 functionality here
    const decryptedMessage = decryptFunction(); // Replace decryptFunction() with your actual decryption logic
    setDecryptedMessage(decryptedMessage);
  };
  const decryptFunction = () => {
    // Replace this with your actual decryption logic
    // This is just a placeholder example
    return "Decrypted message";
  };

  const handleImageSelect = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission denied.");
      return;
    }
  
    try {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        setSelectedImage(selectedAsset.uri);
      }
    } catch (error) {
      console.log("Error selecting image:", error);
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
          <Ionicons name="arrow-back" size={24} style={{top: 30,left:5,
    color: "white"}} />
        </TouchableOpacity>
          <Text style={styles.headerText}>DECODE</Text>
        </View>
      {selectedImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage}} style={styles.image} />
          <Text style={styles.encryptedText}>{encryptedWords}</Text>
        </View>
      )}
       <TouchableOpacity style={styles.uploadButton} onPress={handleImageSelect}>
        <Text style={styles.buttonText}>Upload File or Photos</Text>
      </TouchableOpacity>
      {decryptedMessage ? (
            <Text style={styles.decryptedText}>{decryptedMessage}</Text>
          ) : null}
    <View style={{margin:20}}>
      <Text style={styles.text}>
          Enter the URL:
        </Text>
        <TextInput
        style={styles.textInput}
          value={url}
          onChangeText={handleUrlChange}
          placeholder="Enter Here"
          placeholderTextColor="white"
        />
    </View>
      <View>
        
      <Text style={{color:"white",fontSize:30}}>{d}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {/* <Button title="Download" onPress={handleButton1Press} />
        <Button title="Reset" onPress={handleButton2Press}/>
        <Button title="Decrypt" onPress={handleEncrypt } /> */}
        <TouchableOpacity style={styles.button} onPress={handleButton1Press}>
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button,{left:5}]} onPress={handleButton2Press}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button,{left:9,}]} onPress={handleEncrypt }>
          <Text style={styles.buttonText}>Decode</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010220',
  },
  header: {
    backgroundColor: "#010220",
    padding: 10,
    marginTop: 0,
    height: 80,
    paddingTop: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    color: "white",
    marginBottom:10
  },
  uploadButton: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: '#CC4E59',
    padding: 10,
    alignItems: 'center',

  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  },
  imageContainer: {
    width: '100%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  image: {
    width: 400,
    height: 200,
  },
  encryptedText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 200,
    marginRight:20,
    marginLeft:10
  },
  decryptedText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },text:{
    marginBottom:20,
    fontSize:16,

},
textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
   // width:400,
   color:"white"
  },
  button: {
    flex: 1,
    alignSelf: "center",
    backgroundColor: "#CC4E59",
    width: 120,
    borderRadius: 20,
    height: 30,
  },
  buttontext: {
    color: "white",
    fontSize:18,
    alignSelf:"center",
    justifyContent:"center"
  },
});

export default Decrypt;