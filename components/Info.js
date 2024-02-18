import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

import Back from "react-native-vector-icons/AntDesign";
import Ball from "react-native-vector-icons/MaterialCommunityIcons";
import Heart from "react-native-vector-icons/Ionicons";
import Hat from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";

const Info = ({ setSelectedComponent }) => {
  const [isPressed, setIsPressed] = useState(false);
  const { t } = useTranslation();

  const openInfo = () => {
    setSelectedComponent("mainmenu");
  };

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable
        underlayColor="#7b4c52"
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.button}
        onPress={openInfo}
      >
        <Text style={[styles.buttonText, isPressed && styles.buttonActiveText]}>
          <Back name="back" size={40} />
        </Text>
      </Pressable>

      <View style={styles.userInfo}>
        <Text style={styles.text}>
          "Mystic Orb" - your personal guide in the world of predictions!
          Receive unique forecasts for each day!
          {/* {t("info_1")} */}
        </Text>
        <Text style={styles.text}>
          <Ball name="crystal-ball" size={50} />
        </Text>

        <Text style={styles.text}>
          The built-in feature for saving predictions will allow you not only to
          recall them at any time but also to track their fulfillment
          {/* {t('info_2')} */}
        </Text>

        <Text style={styles.text}>
          <Heart name="heart" size={50} color="#7b4c52" />
        </Text>

        <Text style={styles.text}>
          Don't miss the opportunity to immerse yourself in the amazing world of
          divinations with "Mystic Orb"!
          {/* {t("info_3")} */}
        </Text>

        <Text style={styles.text}>
          <Hat name="wizard-hat" size={50} />
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  userInfo: {
    margin: 10,
    marginTop: 70,
    textAlign: "center",
  },
  text: {
    fontSize: 18,
    color: "#cac3be",
    fontFamily: "third",
    margin: 5,
    textAlign: "justify",
    textAlign: "center",
  },
  textFlower: {
    color: "#6c526f",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#526466",
    borderRadius: 15,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 13,
    paddingLeft: 13,
    margin: 10,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#778284",
  },
  buttonActiveText: {
    color: "#7b4c52",
  },
});

export default Info;
