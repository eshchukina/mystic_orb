import React, { useState, useEffect } from "react";
import { StyleSheet, View, StatusBar, Image } from "react-native";
import * as Font from "expo-font";

import Dashboard from "./components/Dashboard";
import MainMenu from "./components/MainMenu";
import PersonalAccount from "./components/PersonalAccount";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Info from "./components/Info";

import i18n from "./components/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("mainmenu");
  const [selectedText, setSelectedText] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    async function loadLanguage() {
      try {
        const savedLanguage = await AsyncStorage.getItem("selectedLanguage");
        if (savedLanguage) {
          setSelectedLanguage(savedLanguage);
          changeLanguage(savedLanguage);
        } else {
          setSelectedLanguage("english");
          changeLanguage("en");
          await AsyncStorage.setItem("selectedLanguage", "english");
        }
      } catch (error) {
        console.error("Error loading language from AsyncStorage:", error);
      }
    }

    async function loadFonts() {
      try {
        await Font.loadAsync({
          first: require("./assets/Aclonica-Regular.ttf"),
          second: require("./assets/ClickerScript-Regular.ttf"),
          third: require("./assets/Buenard-Regular.ttf"),
          firstru: require("./assets/Underdog-Regular.ttf"),
          secondru: require("./assets/ClickerScript-Regular.ttf"),
          thirdru: require("./assets/ViaodaLibre-Regular.ttf"),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error("Error loading fonts:", error);
      }
    }

    loadLanguage();
    loadFonts();
  }, []);

  const changeLanguage = async (lng) => {
    try {
      await AsyncStorage.setItem("selectedLanguage", lng);
      i18n.changeLanguage(lng);
    } catch (error) {
      console.error("Error saving language to AsyncStorage:", error);
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Image
          source={require("./assets/eclipse.gif")}
          style={{
            width: 100,
            height: 200,
            resizeMode: "contain",
            alignItems: "center",
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {selectedComponent === "mainmenu" && (
        <>
          <Header
            setSelectedLanguage={setSelectedLanguage}
            setSelectedComponent={setSelectedComponent}
            setSelectedText={setSelectedText}
            selectedLanguage={selectedLanguage}
          />
          <MainMenu
            setSelectedComponent={setSelectedComponent}
            selectedLanguage={selectedLanguage}
            setIsEnabled={setIsEnabled}
            isEnabled={isEnabled}
          />
        </>
      )}
      {selectedComponent === "dashboard" && (
        <Dashboard
          setSelectedComponent={setSelectedComponent}
          setSelectedText={setSelectedText}
          setIsEnabled={setIsEnabled}
          isEnabled={isEnabled}
        />
      )}
      {selectedComponent === "info" && (
        <Info
          setSelectedComponent={setSelectedComponent}
          setSelectedText={setSelectedText}
        />
      )}
      {selectedComponent === "personalaccount" && (
        <PersonalAccount selectedText={selectedText} />
      )}
      <Footer
        selectedComponent={selectedComponent}
        setSelectedComponent={setSelectedComponent}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#493b48",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#493b48",
    alignItems: "center",
    justifyContent: "center",
  },
});
