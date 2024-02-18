import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Switch,
  TouchableOpacity,
  Animated,
  Text,
  Dimensions,
} from "react-native";

import Star from "react-native-vector-icons/SimpleLineIcons";
import { useTranslation } from "react-i18next";

const MainMenu = ({ isEnabled, setIsEnabled, setSelectedComponent }) => {
  const toggleSwitch = () => {
    console.log("Toggle switch function called");
    setIsEnabled((previousState) => !previousState);
    console.log("New isEnabled value:", !isEnabled);
  };

  const [animations] = useState(() => {
    return [...Array(50)].map(() => ({
      anim: new Animated.Value(0),
      duration: Math.random() * 10000 + 10000,
    }));
  });
  const screenHeight = Dimensions.get("window").height;
  const { t } = useTranslation();

  const openDasboard = () => {
    setSelectedComponent("dashboard");
  };
  useEffect(() => {
    startAnimations();
  }, []);

  const startAnimations = () => {
    animations.forEach(({ anim, duration }, index) => {
      Animated.loop(
        Animated.parallel([
          Animated.timing(anim, {
            toValue: 1,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 1,
            duration: duration * 2,
            useNativeDriver: true,
            easing: (t) => Math.sin(t * Math.PI),
          }),
        ])
      ).start();
    });
  };

  return (
    <View style={styles.container}>
      {animations.map(({ anim, duration }, index) => {
        const initialTranslateY = -Math.random() * screenHeight;
        const initialTranslateX = (Math.random() - 0.5) * 2 * 150;

        return (
          <Animated.View
            key={index}
            style={[
              styles.star,
              {
                transform: [
                  {
                    translateY: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [initialTranslateY, screenHeight],
                    }),
                  },
                  {
                    translateX: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [initialTranslateX, initialTranslateX],
                    }),
                  },
                  {
                    rotate: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "360deg"],
                    }),
                  },
                ],
              },
            ]}
          >
            <Star name="star" size={20} color="#526466" />
          </Animated.View>
        );
      })}
      <Text style={styles.titleText}>
        Welcome to the Mystic Orb, where you can get predictions
        {/* {t('welcome')} */}
      </Text>
      <Pressable
        underlayColor="#c4661f"
        style={[styles.button, styles.shadow]}
        onPress={openDasboard}
      >
        <Text style={styles.text}>
          get prediction
          {/* {t('getPrediction')} */}
        </Text>
      </Pressable>

      <View style={styles.switchContainer}>
        <Text style={styles.titleTextAd}>choose prediction language:</Text>
        <Text style={styles.titleTextAd}>
          {isEnabled ? "russian" : "english"}
        </Text>

        <Switch
          trackColor={{ false: "№836e4b", true: "#7b4c52" }}
          thumbColor={isEnabled ? "#cec5c0" : "#778284"}
          ios_backgroundColor="#cec5c0"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    padding: 20,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "#778284",
    borderRadius: 25,
    alignItems: "center",
    margin: 20,
  },
  titleText: {
    fontFamily: "third",
    fontSize: 35,
    textAlign: "center",
    color: "#cec5c0",
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleTextAd: {
    marginBottom: 10,

    fontFamily: "third",
    fontSize: 20,
    textAlign: "center",
    color: "#cec5c0",
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontFamily: "second",
    fontSize: 40,
    textAlign: "center",
    color: "#cec5c0",
    textShadowColor: "#fff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  star: {
    position: "absolute",
    top: 0,
    left: "50%",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  shadow: {
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  switchContainer: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
});

export default MainMenu;
