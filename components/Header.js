import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import Feather from "react-native-vector-icons/FontAwesome5";
import ModalComponent from "./ModalComponent";

const Header = ({ setSelectedLanguage, selectedLanguage, setSelectedComponent, setSelectedText }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={openModal} style={styles.button}>
        <Text style={styles.buttonText}>
          <Feather name="feather-alt" size={30} />
        </Text>
      </Pressable>
      <ModalComponent
      selectedLanguage={selectedLanguage}
      setSelectedLanguage={setSelectedLanguage}
        visible={modalVisible}
        closeModal={closeModal}
        setSelectedComponent={setSelectedComponent}
        setSelectedText={setSelectedText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 80,
    left: "30%",
    zIndex: 10,
  },
  button: {
    borderRadius: 25,
    padding: 20,
    backgroundColor: "#7b4c52",
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
    color: "#cec5c0",
  },
});

export default Header;
