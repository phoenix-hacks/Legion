import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { Ionicons } from "@expo/vector-icons";
import { Linking } from 'expo';
import { WebView } from 'react-native-webview';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const resources = [
  { id: '1', title: 'Introduction to Cybersecurity', links: [
      { heading: 'Chapter 1', url: 'https://example.com/book1/chapter1' },
      { heading: 'Chapter 2', url: 'https://example.com/book1/chapter2' },
    ], description: 'A comprehensive guide to the basics of cybersecurity.' },
  { id: '2', title: 'Advanced Cybersecurity Techniques', links: [
      { heading: 'Module 1', url: 'https://example.com/book2/module1' },
      { heading: 'Module 2', url: 'https://example.com/book2/module2' },
    ], description: 'Dive deep into advanced cybersecurity strategies and methods.' },
  { id: '3', title: 'Cybersecurity Threats and Mitigation', links: [
      { heading: 'Section 1', url: 'https://example.com/book3/section1' },
      { heading: 'Section 2', url: 'https://example.com/book3/section2' },
    ], description: 'Learn about various threats and how to mitigate them.' },
  { id: '4', title: 'The Hacker Playbook', links: [
      { heading: 'Part 1', url: 'https://example.com/book4/part1' },
      { heading: 'Part 2', url: 'https://example.com/book4/part2' },
    ], description: 'Understand the mindset and methods of hackers.' },
  { id: '5', title: 'Network Security Essentials', links: [
      { heading: 'Unit 1', url: 'https://example.com/book5/unit1' },
      { heading: 'Unit 2', url: 'https://example.com/book5/unit2' },
    ], description: 'Essential knowledge for securing networks effectively.' },
];

const videos = [
  { id: '1', title: 'Cybersecurity Basics', link: 'https://www.youtube.com/embed/inWWhr5tnEA' },
  { id: '2', title: 'Advanced Threat Protection', link: 'https://www.youtube.com/embed/fhoz0R2jnp0' },
];

const Education = ({ navigation }) => {
  const [expandedVideoId, setExpandedVideoId] = useState(null);
  const [expandedResourceId, setExpandedResourceId] = useState(null);

  const renderResourceItem = ({ item }) => {
    const isExpanded = expandedResourceId === item.id;
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>{item.title}</Title>
          <Paragraph>{item.description}</Paragraph>
          {isExpanded && item.links.map((link, index) => (
            <View key={index} style={styles.linkContainer}>
              <Text style={styles.linkHeading}>{`${index + 1}. ${link.heading}`}</Text>
              <Button mode="contained" onPress={() => Linking.openURL(link.url)} style={styles.resourceButton}>
                Resource {index + 1}
              </Button>
            </View>
          ))}
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => setExpandedResourceId(isExpanded ? null : item.id)}>
            {isExpanded ? (
              <Ionicons name="close" size={24} color="white" />
            ) : (
              <Text style={styles.viewResourcesText}>View Resources</Text>
            )}
          </Button>
        </Card.Actions>
      </Card>
    );
  };

  const renderVideoItem = ({ item }) => {
    const isExpanded = expandedVideoId === item.id;
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>{item.title}</Title>
          {isExpanded && (
            <View style={styles.videoContainer}>
              <WebView
                style={styles.video}
                source={{ uri: item.link }}
              />
              <Button mode="contained" onPress={() => setExpandedVideoId(null)} style={styles.closeButton}>
                Close Video
              </Button>
            </View>
          )}
        </Card.Content>
        <Card.Actions>
          {!isExpanded && (
            <Button mode="contained" onPress={() => setExpandedVideoId(item.id)}>
              Watch Video
            </Button>
          )}
        </Card.Actions>
      </Card>
    );
  };

  return (
    <ScrollView style={styles.container}>
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
              EDUCATION
            </Text>
          }
        >
          <LinearGradient
            colors={["red", "black"]}
            start={[0.5, 0]}
            end={[1, 1]}
            style={styles.yellowHeader}
          >
            <Text style={[styles.headerTitle, { opacity: 0 }]}>EDUCATION</Text>
          </LinearGradient>
        </MaskedView>
      </View>
      {/* <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={24} style={styles.headerMenuIcon} />
        </TouchableOpacity>
        <Text style={styles.header}>Cybersecurity Resources</Text>
      </View> */}
      <FlatList
        data={resources}
        renderItem={renderResourceItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
      <Text style={styles.header}>Cybersecurity Videos</Text>
      <FlatList
        data={videos}
        renderItem={renderVideoItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
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
    paddingRight:100
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
  list: {
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
  },  
  card: {
    marginVertical: 8,
    backgroundColor: '#ffffff',
  },
  cardTitle: {
    fontSize: 18,
    color: '#007bff',
  },
  videoContainer: {
    marginTop: 10,
  },
  video: {
    width: '100%',
    height: 200,
  },
  closeButton: {
    marginTop: 10,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  linkHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  resourceButton: {
    marginLeft: 10,
  },
  viewResourcesText: {
    color: 'white',
  },
});

export default Education;
