import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Text,
} from "react-native";
import { Audio } from "expo-av";
import * as Animatable from "react-native-animatable";
import Heart from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import * as SQLite from "expo-sqlite";
import axios from "axios"; 

const db = SQLite.openDatabase("predictions.db"); 

const Dashboard = ({ isEnabled, setIsEnabled, setSelectedText }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [shuffledTexts, setShuffledTexts] = useState([]);
  const soundObject = new Audio.Sound();
  const [buttonText, setButtonText] = useState("heart-outline");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const textRef = useRef(null); 

  const { t } = useTranslation();

  useEffect(() => {
    fetchWordsFromAPI(); 
  }, []);

  useEffect(() => {
    return () => {
      soundObject.unloadAsync();
    };
  }, []);

  useEffect(() => {
    fetchWordsFromAPI(); 
  }, [isEnabled]); 

  const fetchWordsFromAPI = async () => {
    try {
      const response = await axios.get(
        "https://eb-api.una.rest/words/predictions"
      );

      const fetchedData = response.data.map((item) => ({
        word: item.word,
        translation: item.translation,
      }));

      const shuffledData = fetchedData.sort(() => Math.random() - 0.5);

      db.transaction((tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS Words (id INTEGER PRIMARY KEY AUTOINCREMENT, word TEXT, translation TEXT);"
        );
        shuffledData.forEach((item) => {
          tx.executeSql(
            "INSERT INTO Words (word, translation) VALUES (?, ?);",
            [item.word, item.translation]
          );
        });
      });

      db.transaction((tx) => {
        tx.executeSql("SELECT * FROM Words;", [], (_, { rows: { _array } }) => {
          const retrievedData = isEnabled
            ? _array.map((item) => item.word)
            : _array.map((item) => item.translation);

          const shuffledRetrievedData = retrievedData.sort(
            () => Math.random() - 0.5
          );

          setShuffledTexts(shuffledRetrievedData);
        });
      });
    } catch (error) {
      console.error("Error fetching words from API:", error);
    }
  };

  const rotationAnimation = useRef(new Animated.Value(0)).current;

  const startRotationAnimation = () => {
    setButtonText("heart-outline");

    Animated.timing(rotationAnimation, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      rotationAnimation.setValue(0);
    });
  };

  const handlePress = async () => {
    setIsButtonEnabled(true);
    try {
      await startRotationAnimation();
      textRef.current.fadeIn(9000);
      await setCurrentTextIndex(
        (prevIndex) => (prevIndex + 1) % shuffledTexts.length
      );
      await soundObject.loadAsync(require("../assets/sound3.mp3"));
      await soundObject.playAsync();
      setIsButtonEnabled(true);
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const handlePressMenu = async () => {
    if (buttonText === "heart") {
      setButtonText("heart-outline");
    } else {
      setButtonText("heart");

      const displayedText = shuffledTexts[currentTextIndex];
      setSelectedText(displayedText);

      try {
        const existingTranslations = await AsyncStorage.getItem("savedWords");
        const translations = existingTranslations
          ? JSON.parse(existingTranslations)
          : [];
        const newWord = {
          text: displayedText,
          date: new Date().toISOString(),
          tag: 0,
        };
        translations.push(newWord);
        await AsyncStorage.setItem("savedWords", JSON.stringify(translations));
        console.log(translations);
      } catch (error) {
        console.error("Error saving word:", error);
      }
    }
    setIsButtonEnabled(false);
  };

  const spin = rotationAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const zoomOut = {
    0: {
      opacity: 0,
      scale: 0.5,
      translateX: 0,
    },
    0.5: {
      opacity: 0.7,
      scale: 0.7,
      translateX: 0,
    },
    1: {
      opacity: 1,
      scale: 1,
      translateX: 0,
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        Click on the screen and get a prediction
        {/* {t("dashboard")} */}
      </Text>

      <Animatable.Text
        ref={textRef}
        style={[
          styles.containerText,
          isEnabled ? styles.fontFirst : styles.fontFirstru,
        ]}
      >
        {shuffledTexts[currentTextIndex]}
      </Animatable.Text>

      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        <Animated.View
          style={[styles.imageContainer, { transform: [{ rotate: spin }] }]}
        >
          <Animatable.Image
            animation={zoomOut}
            source={require("../assets/ball.png")}
            style={styles.image}
          />
        </Animated.View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handlePressMenu}
        style={[styles.button, { opacity: isButtonEnabled ? 1 : 0.5 }]}
        disabled={!isButtonEnabled}
      >
        <Text>
          <Heart name={buttonText} size={50} color="#7b4c52" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontFamily: "second",
    fontSize: 35,
    textAlign: "center",
    color: "#cec5c0",
    position: "absolute",
    top: 50,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    textShadowColor: "#fff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  image: {
    width: 380,
    resizeMode: "contain",
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  containerText: {
    color: "#cec5c0",
    position: "absolute",
    opacity: 0,
    fontSize: 20,
    width: 260,
    lineHeight: 30,
    textAlign: "center",
  },
  fontFirst: {
    fontFamily: "firstru",
  },
  fontFirstru: {
    fontFamily: "first",
  },
  button: {
    padding: 20,
    position: "absolute",
    bottom: 70,
    borderRadius: 20,
  },
  buttonHeart: {
    bottom: 20,
  },
});

export default Dashboard;
