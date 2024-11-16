import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, StatusBar, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Cyprob = () => {
  const [expanded, setExpanded] = useState(Array(5).fill(false));

  const toggleExpand = (index) => {
    setExpanded(expanded.map((item, i) => (i === index ? !item : item)));
  };

  const cards = [
    {
      title: "Cyberbullying",
      image: "https://blog.securly.com/wp-content/uploads/2023/10/Blog-1-_Hero.png",
      description: `1. Identify the Platform
Determine where the cyberbullying is occurring (e.g., social media platform, messaging app, online forum).

2. Locate the Reporting Mechanism
Look for the "Report" or "Flag" option: Most platforms have a way to report abusive behavior. This is often found in settings, on the post or message itself, or in the platform's help or support section.
Check the platform’s guidelines: Understand what constitutes cyberbullying according to the platform’s policies. This will help you provide specific details in your report.

3. Gather Evidence
Document the bullying: Save screenshots, messages, or any other evidence of the cyberbullying. This documentation will strengthen your report.

4. Initiate the Report
Follow the platform’s instructions: Typically, you’ll need to:
- Navigate to the content or profile involved in the bullying.
- Look for the "Report" or "Flag" option.
- Describe the issue: Provide a clear and concise explanation of why you are reporting the content or user. Include details like specific messages, posts, or actions that violate the platform’s guidelines.

5. Attach Evidence
Upload screenshots: Use the option to upload screenshots or files that demonstrate the cyberbullying. This substantiates your report.`,
    },
    {
      title: "Identity Theft",
      image: "https://www.terranovasecurity.com/sites/default/files/2024-02/identity-theft-image.png",
      description: `1. Obtain a copy of the FIR for your records.

2. Report to the Cyber Crime Cell:
Cyber Crime Cell: Contact the Cyber Crime Cell of your city or state. You can also file a complaint online through the National Cyber Crime Reporting Portal: `,
      link: 'https://cybercrime.gov.in/',
      extraDescription: `Provide all necessary details and documentation to support your complaint.

3. Notify Financial Institutions:
Banks and Credit Card Companies: Inform your bank and credit card companies about the identity theft. They can help you take necessary actions to protect your accounts.`,
    },
    { title: "Helpline 3", image: "https://via.placeholder.com/150", description: "Description for helpline 3" },
    { title: "Helpline 4", image: "https://via.placeholder.com/150", description: "Description for helpline 4" },
    { title: "Helpline 5", image: "https://via.placeholder.com/150", description: "Description for helpline 5" },
  ];

  return (
    <View style={styles.outerContainer}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.header}>Cyber Problems</Text>
      <ScrollView contentContainerStyle={styles.container}>
        {cards.map((card, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <TouchableOpacity onPress={() => toggleExpand(index)}>
                <Icon name={expanded[index] ? "eye-slash" : "eye"} size={24} color="black" />
              </TouchableOpacity>
            </View>
            {expanded[index] && (
              <View style={styles.cardContent}>
                <Image source={{ uri: card.image }} style={styles.cardImage} />
                <Text style={styles.cardDescription}>{card.description}</Text>
                {card.link && (
                  <Text style={styles.cardLink} onPress={() => Linking.openURL(card.link)}>
                    Cyber Crime Reporting Portal
                  </Text>
                )}
                {card.extraDescription && (
                  <Text style={styles.cardDescription}>{card.extraDescription}</Text>
                )}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Cyprob;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 10,
    padding: 15,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  cardContent: {
    marginTop: 10,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  cardDescription: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
    textAlign: 'justify',
  },
  cardLink: {
    marginTop: 10,
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
