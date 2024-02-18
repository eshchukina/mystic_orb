import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome: "Welcome to the Mystic Orb, where you can get predictions",
      getPrediction: "get prediction",
      modalText: "Write to us or open the app description",
      info_1:
        "Mystic Orb - your personal guide in the world of predictions! Receive unique forecasts for each day!",
      info_2:
        "The built-in feature for saving predictions will allow you not only to recall them at any time but also to track their fulfillment.",
      info_3:
        "Don't miss the opportunity to immerse yourself in the amazing world of divinations with Mystic Orb!",
      dashboard: "Click on the screen and get a prediction",
      personalAccount: "Here will be your saved predictions",
      list: "List of your predictions:",
      predictions: "predictions that came true:",
    },
  },
  ru: {
    translation: {
      welcome:
        "Добро пожаловать в Mystic Orb, где вы можете получить предсказания",
      getPrediction: "ваши предсказания",
      modalText: "Напишите нам или откройте описание приложения",
      info_1:
        "Mystic Orb - ваш персональный гид в мире предсказаний! Получайте уникальные прогнозы на каждый день!",
      info_2:
        "Встроенная функция сохранения предсказаний позволит вам не только вспомнить их в любое время, но и отслеживать их исполнение.",
      info_3:
        "Не упустите возможность погрузиться в удивительный мир с Mystic Orb!",
      personalAccount: "Here will be your saved predictions",
      dashboard: "Нажмите на экран и получите предсказание",
      personalAccount: "Здесь будут ваши сохраненные предсказания",
      list: "Список ваших предсказаний:",
      predictions: "предсказания, которые сбылись:",
    },
  },
};

i18n
  .use(initReactI18next)

  .init({
    resources,
    lng: "en",
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
