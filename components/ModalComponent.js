import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableHighlight,
  Linking,
} from "react-native";
import Close from "react-native-vector-icons/AntDesign";
import Mail from "react-native-vector-icons/Entypo";
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ModalComponent = ({
  visible,
  closeModal,
  setSelectedComponent,
  selectedLanguage,
  setSelectedLanguage,
}) => {

  const { t, i18n } = useTranslation();

  const changeLanguage = async (lng) => {
    try {
      await AsyncStorage.setItem('selectedLanguage', lng);
      i18n.changeLanguage(lng);
    } catch (error) {
      console.error('Error saving language to AsyncStorage:', error);
    }
  };
  

  const sendEmail = () => {
    const email = "frankkat377@gmail.com";
    const subject = "Question from the app";
    const body = "Hello, developer!";
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    Linking.openURL(mailtoLink);
  };

  const handleButton = () => {
    setSelectedComponent("info");
  };


 

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={closeModal}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            {/* Write to us or open the app description */}
            {t("modalText")}
          </Text>
          <View style={styles.iconContainer}>
            <TouchableHighlight
              underlayColor="#7b4c52"
              style={styles.button}
              onPress={sendEmail}
            >
              <Text style={styles.iconText}>
                <Mail name="mail" size={30} color="#493b48" />
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="#7b4c52"
              style={styles.button}
              onPress={handleButton}
            >
              <Text style={styles.iconText}>
                <Mail name="open-book" size={30} color="#493b48" />
              </Text>
            </TouchableHighlight>
          </View>
          {/* <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedLanguage}
              style={[styles.languagePicker, { color: '#cac3be' }]}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedLanguage(itemValue);
                console.log('Выбранный язык:', itemValue);
                if (itemValue === 'english') {
                  changeLanguage('en');
                } else if (itemValue === 'russian') {
                  changeLanguage('ru');
                }
              }}
            >
              <Picker.Item label="english" value="english" color="#493b48" />
              <Picker.Item label="russian" value="russian" color="#493b48" />
            </Picker>
          </View> */}
          <Pressable onPress={closeModal}>
            <Text style={styles.closeButton}>
              <Close name="close" size={30} color="#cac3be" />
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#526466",
    padding: 20,
    borderRadius: 25,
    alignItems: "center",
    width: "80%",
  },
  modalText: {
    fontSize: 35,
    marginBottom: 10,
    color: "#cac3be",
    fontFamily: "second",
    textAlign: "center",
    textShadowColor: "#fff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  closeButton: {
    marginTop: 10,
  },
  button: {
    backgroundColor: "#7a8183",
    padding: 20,
    borderRadius: 10,
    margin: 20,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  pickerContainer: {
    backgroundColor: "#7a8183",
    borderRadius: 10,
    margin: 20,
    height: 50,
    width: 150,
    justifyContent: "center",
  },
  languagePicker: {
    fontFamily:"second",
     color:"red",
  },
});

export default ModalComponent;
