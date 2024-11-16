import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { uri } from '../../globalvariable/globalvariable';

// Function to store the access token securely
export const storeAccessToken = async (accessToken) => {
  try {
    if (accessToken) {
      await AsyncStorage.setItem('accessToken', accessToken);
      console.log('Access token stored successfully:', accessToken);
    } else {
      console.error('Access token is null or undefined');
    }
  } catch (error) {
    console.error('Error storing access token:', error);
  }
};


// Function to retrieve the access token
export const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      console.log('Access token retrieved successfully:', accessToken);
    } else {
      console.log('Access token not found in AsyncStorage');
    }
    return accessToken;
  } catch (error) {
    console.error('Error retrieving access token:', error);
    return null;
  }
};

// Function to fetch user info using the access token
export const userInfo = async () => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      console.error('Access token not found');
      return null;
    }

    const response = await axios.get(`${uri}/auth/user_details`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('User info fetched successfully:', response.data); // Add this line
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    return null;
  }
};
// Monitor AsyncStorage for clearing operations
const monitorAsyncStorage = async () => {
  let previousToken = await AsyncStorage.getItem('accessToken');
  console.log('Initial access token:', previousToken);

  setInterval(async () => {
    const currentToken = await AsyncStorage.getItem('accessToken');
    if (previousToken && !currentToken) {
      console.error('Access token was cleared!');
    }
    previousToken = currentToken;
  }, 1000); // Check every second
};

// Call this function to start monitoring AsyncStorage
monitorAsyncStorage();


//function to test
const testAsyncStorage = async () => {
  const testToken = 'testToken123';
  try {
    await AsyncStorage.setItem('testToken', testToken);
    console.log('Test token stored successfully:', testToken);

    const retrievedTestToken = await AsyncStorage.getItem('testToken');
    if (retrievedTestToken === testToken) {
      console.log('Test token retrieved successfully:', retrievedTestToken);
    } else {
      console.error('Test token mismatch:', retrievedTestToken);
    }
  } catch (error) {
    console.error('Error with AsyncStorage test:', error);
  }
};

// Call this function to test
testAsyncStorage();

