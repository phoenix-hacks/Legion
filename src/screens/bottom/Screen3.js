import { StyleSheet, Text, View, FlatList, Image, RefreshControl, TouchableOpacity, Linking } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { uri } from '../../../globalvariable/globalvariable';

const Screen3 = ({ navigation }) => {
  const [allNews, setAllNews] = useState([])
  const [refreshing, setRefreshing] = useState(false);

  const get_news = () => {
    axios.get(`${uri}/news/data-breach`)
      .then(resp => {
        const response = resp.data
        if (Array.isArray(response)) {
          setAllNews(response)
        } else {
          const result = [resp.data];
          setAllNews(result)
        }
      }).catch(e => {
        console.error(e)
      })
  }

  useEffect(() => {
    get_news()
  }, [])

  const News = ({ news }) => {
    return (
      <View style={styles.card}>
        <Image
          source={{ uri: news.urlToImage }}
          style={styles.newsImage}
        />
        <Text style={styles.title}>{news.title}</Text>
        <Text style={styles.author}>Author: {news.author}</Text>
        {/* <Text style={styles.source}>Source: {news.source.name}</Text> */}
        <Text style={styles.description}>{news.description}</Text>
        <Text style={styles.content}>{news.content}</Text>
       {/* <Text style={styles.publishedAt}>Published At: {news.publishedAt}</Text> */}
        <TouchableOpacity onPress={() => Linking.openURL(news.url)}>
          <Text style={styles.readMore}>Read More</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderNews = ({ item }) => {
    return <News news={item} />;
  };

  const handleRefresh = () => {
    setRefreshing(true);
    get_news();
    setRefreshing(false);
  };

  return (
    <View style={{ backgroundColor: "#CF424B", flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} style={styles.headerMenuIcon} />
        </TouchableOpacity>
        <MaskedView
          maskElement={
            <Text style={[styles.headerTitle, { backgroundColor: "transparent" }]}>
              NEWS
            </Text>
          }
        >
          <LinearGradient
            colors={["white", "white"]}
            start={[0.2, 0]}
            end={[1, 1]}
            style={styles.yellowHeader}
          >
            <Text style={[styles.headerTitle, { opacity: 0 }]}> NEWS</Text>
          </LinearGradient>
        </MaskedView>
      </View>
      <View style={styles.container}>
        <FlatList
          data={allNews}
          renderItem={renderNews}
          keyExtractor={(item) => item.url}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
        />
      </View>
    </View>
  )
}

export default Screen3

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#CF424B",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    height: 70,
    backgroundColor: "#010220",
    elevation: 50,
  },
  headerTitle: {
    fontSize: 30,
    color: "#000",
    marginTop: 18,
    paddingLeft: 40,
  },
  headerMenuIcon: {
    color: "white",
    top: 10,
    marginLeft: 20,
  },
  yellowHeader: {
    textAlign: "center",
    marginTop: -5,
    marginRight: 150,
  },
  card: {
    backgroundColor: "#010220",
    borderRadius: 20,
    borderWidth: 3,
    elevation: 10,
    borderColor: "white",
    padding: 16,
    marginBottom: 16,
    width: "100%",
  },
  newsImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
    marginBottom: 8,
  },
  author: {
    color: "#ddd",
    marginBottom: 5,
  },
  source: {
    color: "#aaa",
    marginBottom: 8,
  },
  description: {
    color: "white",
    fontSize: 15,
    marginBottom: 10,
    textAlign: "justify",
  },
  content: {
    color: "#ccc",
    marginBottom: 8,
    textAlign: "justify",
  },
  publishedAt: {
    color: "#999",
    marginBottom: 10,
  },
  readMore: {
    color: "#4DA7F7",
    textDecorationLine: "underline",
    marginTop: 8,
  },
});
