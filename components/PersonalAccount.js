import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
  Image,
} from "react-native";
import { Dimensions } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import autoawesome from "react-native-vector-icons/MaterialIcons";
import appshortcut from "react-native-vector-icons/MaterialIcons";
import shimmer from "react-native-vector-icons/MaterialCommunityIcons";

import Info from "react-native-vector-icons/FontAwesome5";
import { useTranslation } from 'react-i18next';

const { width: screenWidth } = Dimensions.get("window");
const isSmallScreen = screenWidth < 375;

const PersonalAccount = ({isEnabled}) => {
  const [savedWords, setSavedWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  const loadSavedWords = async () => {
    try {
      const existingWords = await AsyncStorage.getItem("savedWords");
      if (existingWords) {
        const parsedWords = JSON.parse(existingWords);
        const validWords = [];
        parsedWords.forEach((word) => {
          try {
            const date = new Date(word.date);
            if (!isNaN(date.getTime())) {
              validWords.push(word);
            }
          } catch (error) {
            console.error("Error parsing date:", error);
          }
        });
        setSavedWords(validWords);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading saved words:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(2);
    return `${day}.${month}.${year}`;
  };

  useEffect(() => {
    loadSavedWords();
  }, []);

  const removeWord = async (index) => {
    try {
      const updatedWords = [...savedWords];
      updatedWords.splice(index, 1);
      setSavedWords(updatedWords);
      await AsyncStorage.setItem("savedWords", JSON.stringify(updatedWords));
    } catch (error) {
      console.error("Error removing word:", error);
    }
  };

  const toggleTag = async (index) => {
    try {
      const updatedWords = [...savedWords];
      updatedWords[index].tag = updatedWords[index].tag === 0 ? 1 : 0;

      setSavedWords(updatedWords);

      await AsyncStorage.setItem("savedWords", JSON.stringify(updatedWords));
    } catch (error) {
      console.error("Error toggling tag:", error);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      <View style={styles.loadingContainer}>
      <Image
        source={require("../assets/eclipse.gif")}
        style={{
          width: 100,
          height: 200,
          resizeMode: "contain",
          alignItems: "center",
        }}
      />
    </View>
    } else if (savedWords.length === 0) {
      return (
        <Text style={styles.wordText}>
          Here will be your saved predictions
          {/* {t("personalAccount")} */}
        </Text>
      );
    } else {
      // const totalRecords = savedWords.length;
      const wordsWithTag1 = savedWords.filter((word) => word.tag === 1).length;

      return (
        <>
          <Text style={styles.wordTitle}>
            List of your predictions:
            {/* {t('list')} */}
            </Text>
          <ScrollView style={styles.wordList}>
            {savedWords.map((word, index) => (
              <Pressable
                key={index}
                style={styles.wordItem}
                onPress={() => toggleTag(index)}
              >
                <Text
                  style={[
                    styles.wordTextDate,

                    word.tag === 1 ? styles.selectedItem : null,
                  ]}
                >
                  {formatDate(word.date)}
                </Text>
                {/* <Text style={[styles.wordTextDate,  word.tag === 1 ? styles.selectedItem : null]}>{word.tag}</Text> */}

                <Text
                  style={[
                    styles.wordText,
                    word.tag === 1 ? styles.selectedItem : null,
                  ]}
                >
                  {word.text}{" "}
                </Text>
                <Pressable onPress={() => removeWord(index)}>
                  <Info
                    name="broom"
                    size={25}
                    color="#cec5c0"
                    style={[word.tag === 1 ? styles.selectedItem : null]}
                  />
                </Pressable>
              </Pressable>
            ))}
          </ScrollView>
          <View style={styles.footer}>
            {/* <Text style={styles.wordTitle}>saved predictions: {totalRecords}</Text> */}
            <Text style={styles.wordTitle}>
              predictions that came true:{" "}
              {/* {t("predictions")}{" "} */}
           {wordsWithTag1}
            </Text>
          </View>
        </>
      );
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.wrapperInfo}>
        <Animatable.Image
          source={require("../assets/textlogo.png")}
          style={{
            width: 150,
            height: 150,
            resizeMode: "contain",
            alignItems: "center",
          }}
        />
        {renderContent()}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    color: "#c4661f",
  },
  button: {
    backgroundColor: "#526466",
    borderRadius: 15,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 1,
    paddingLeft: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonInfo: {
    backgroundColor: "#526466",
    borderRadius: 15,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 9,
    paddingLeft: 18,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    textAlign: "center",
  },
  userInfo: {
    position: "relative]",
    marginBottom: 20,
  },
  iconsRow: {
    flexDirection: "row",
    textAlign: "center",
    marginTop: isSmallScreen ? heightPercentageToDP("5%") : 50,
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  iconText: {
    marginRight: 10,
    color: "#cec5c0",
  },
  wrapperInfo: {
    display: "flex",
    alignItems: "center",
  },
  wordItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    width: screenWidth - 10,
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
  wordText: {
    fontFamily: "thirdru",
    fontSize: 18,
    color: "#cec5c0",
    flexWrap: "wrap",
    flexShrink: 1,
    textAlign: "center",
  },
  wordTitle: {
    marginBottom: 10,
    marginTop: 10,
    fontFamily: "second",
    fontSize: 35,
    color: "#cec5c0",
    textAlign: "center",
    textShadowColor: "#fff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  wordTextDate: {
    fontFamily: "thirdru",
    fontSize: 18,
    color: "#cec5c0",
  },
  selectedItem: {
    color: "#836e4b",
  },
});

export default PersonalAccount;
