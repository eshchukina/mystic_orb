import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import Menu from "react-native-vector-icons/SimpleLineIcons";
import Ball from "react-native-vector-icons/MaterialCommunityIcons";
import Hat from "react-native-vector-icons/MaterialCommunityIcons";

const Footer = ({ selectedComponent, setSelectedComponent }) => {
  const handleButton1Press = () => {
    setSelectedComponent("dashboard");
  };

  const handleButton2Press = () => {
    setSelectedComponent("personalaccount");
  };

  const handleButton3Press = () => {
    setSelectedComponent("mainmenu");
  };

  return (
    <View style={styles.container}>
      <Pressable
        underlayColor="#c4661f"
        style={[styles.button]}
        onPress={handleButton1Press}
      >
        <Text
          style={[
            styles.buttonText,
            selectedComponent === "dashboard" && styles.selectedButton,
          ]}
        >
          <Ball name="crystal-ball" size={50} />
        </Text>
      </Pressable>

      <Pressable
        underlayColor="#526466"
        style={[styles.button]}
        onPress={handleButton3Press}
      >
        <Text
          style={[
            styles.buttonText,
            selectedComponent === "mainmenu" && styles.selectedButton,
          ]}
        >
          <Menu name="magic-wand" size={50} />
        </Text>
      </Pressable>

      <Pressable
        underlayColor="#526466"
        style={[styles.button]}
        onPress={handleButton2Press}
      >
        <Text
          style={[
            styles.buttonText,
            selectedComponent === "personalaccount" && styles.selectedButton,
          ]}
        >
          <Hat name="wizard-hat" size={50} />
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 5,
    backgroundColor: "#778284",
    borderRadius: 25,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 30,
  },
  button: {
    borderRadius: 15,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 13,
    paddingLeft: 13,
  },
  selectedButton: {
    color: "#526466",
  },
  buttonText: {
    color: "#cec5c0",
  },
});

export default Footer;
