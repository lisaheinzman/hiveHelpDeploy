import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Theme } from "./Theme.js";
import { useTheme } from "./ThemeProvider.js";

const GuidesScreen = () => {
  const { colorScheme } = useTheme();

  const navigation = useNavigation();

  const guideCards = [
    {
      title: "School Guides",
      info: "Academic Success: Ace your studies and beyond",
      screen: "School Guides",
      backgroundColor: "tertiary",
      backgroundColorRich: "tertiaryRich",
      backgroundColorLite: "tertiaryLite",
    },
    {
      title: "Work Guides",
      info: "Career Excellence: Elevate your professional journey",
      screen: "Work Guides",
      backgroundColor: "primary",
      backgroundColorRich: "primaryRich",
      backgroundColorLite: "primary",
    },
    {
      title: "Personal Guides",
      info: "Self Improvement: Nurture your personal growth",
      screen: "Personal Guides",
      backgroundColor: "secondary",
      backgroundColorRich: "secondaryRich",
      backgroundColorLite: "secondaryLite",
    },
  ];

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      {/* Background views */}
      <ScrollView>
        <View
          style={[
            styles.background,
            { backgroundColor: colorScheme.homeBackground },
          ]}
        >
          <View
            style={[
              styles.bottomBackground,
              { backgroundColor: colorScheme.background },
            ]}
          />
        </View>
        <View style={[styles.heading, { borderRadius: 8 }]}>
          <Text style={[styles.title, { color: colorScheme.text }]}>
            Guide Topics
          </Text>
          <Text style={[styles.text, { color: colorScheme.text }]}>
            Discover an array of guides covering everything you need. From work
            to school and personal life, find guidance to navigate it all.
          </Text>
        </View>
        {guideCards.map((card, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.card,
              { backgroundColor: colorScheme[card.backgroundColorLite] },
              { borderColor: colorScheme[card.backgroundColorRich] },
            ]}
            onPress={() => navigateToScreen(card.screen)}
          >
            <Text style={[styles.guideTitle, { color: colorScheme.text }]}>
              {card.title}
            </Text>
            <Text style={{ color: colorScheme.text }}>{card.info}</Text>
            <TouchableOpacity
              style={[
                styles.goButtons,
                { backgroundColor: colorScheme[card.backgroundColor] },
                { borderColor: colorScheme[card.backgroundColorRich] },
              ]}
              onPress={() => navigateToScreen(card.screen)}
            >
              <Text style={[styles.buttonText, { color: colorScheme.text }]}>
                Go
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1, // Push the background views behind the content
  },
  container: {
    flex: 1,
  },
  heading: {
    paddingVertical: 10,
    marginBottom: 5,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
  },
  text: {
    marginBottom: 20,
  },
  card: {
    padding: 10,
    marginBottom: 20,
    borderRadius: 15,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    textAlign: "center",
    width: "70%",
    alignSelf: "center",
  },
  guideTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "left",
  },
  buttons: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "30%",
  },
  goButtons: {
    padding: 10,
    borderRadius: 10,
    borderBottomWidth: 2.5,
    borderRightWidth: 2.5,
    marginTop: 10,
    width: "25%",
    alignSelf: "flex-end",
  },
  buttonText: {
    textAlign: "center",
  },
  bottomBackground: {
    position: "absolute",
    top: height * 0.275, // Align the top of the bottom background with the bottom of the top background
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 20, // Apply border radius to top left corner
    borderTopRightRadius: 20, // Apply border radius to top right corner
  },
});

export default GuidesScreen;
