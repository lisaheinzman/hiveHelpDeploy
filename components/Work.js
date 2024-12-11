import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Button,
  ScrollView,
  Dimensions,
} from "react-native";
import Hexagon from "./Hex";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import { workData } from "./WorkGuidesData";
import { Theme } from "./Theme";
import { useTheme } from "./ThemeProvider";
import { supabase } from "../supabase";

const WorkGuides = () => {
  const { colorScheme } = useTheme();

  const [data, setSelf] = useState(workData);
  const navigation = useNavigation(); // Get navigation object using useNavigation hook
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [bottomBackground, setBottomBackground] = useState(null);
  const [topBackground, setTopBackground] = useState(null);

  const handlePress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
    setTopBackground(item.topColor);
    setBottomBackground(item.bottomColor);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };
  const user = supabase.auth.getUser();

  // returns list content os selected title
  const renderSections = (sections) => {
    return (
      <View style={styles.sectionContainer}>
        {sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={[styles.sectionHeading, { color: colorScheme.text }]}>
              {section.heading}
            </Text>
            <Text style={[styles.sectionContent, { color: colorScheme.text }]}>
              {section.content}
            </Text>
          </View>
        ))}
      </View>
    );
  };
  // Calculate the split point
  const splitIndex = Math.ceil(data.length / 2);
  const firstColumnData = data.slice(0, splitIndex);
  const secondColumnData = data.slice(splitIndex);

  // Returns list of titles
  return (
    <View
      style={[styles.container, { backgroundColor: colorScheme.background }]}
    >
      <View style={{ alignSelf: "flex-start" }}>
        <Button
          color={colorScheme.text}
          title="<"
          onPress={() => navigation.goBack()}
        ></Button>
      </View>
      <ScrollView style={styles.scrollContent}>
        <Text style={[styles.heading, { color: colorScheme.text }]}>
          Work Guides
        </Text>
        <Text style={{ color: colorScheme.text }}>
          Explore a wealth of professional resources designed to empower your
          career growth. Our work and professional category provides insightful
          guidance, tools, and strategies to help you excel in your field and
          achieve your goals.
        </Text>
        <View style={styles.container}>
          <View style={styles.column}>
            {firstColumnData.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => handlePress(item)}>
                <Hexagon
                  width={200}
                  height={200}
                  title={item.title}
                  colors={colorScheme[item.bottomColor]}
                  textColor={colorScheme.text}
                  style={styles.itemContainer}
                ></Hexagon>
              </TouchableOpacity>
            ))}
          </View>
          <View style={[styles.column, styles.secondColumn]}>
            {secondColumnData.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => handlePress(item)}>
                <Hexagon
                  width={200}
                  height={200}
                  title={item.title}
                  colors={colorScheme[item.bottomColor]}
                  textColor={colorScheme.text}
                  style={styles.itemContainer}
                ></Hexagon>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      {/* Modal */}
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.background,
              { backgroundColor: colorScheme[bottomBackground] },
            ]}
          >
            <View
              style={[
                styles.bottomBackground,
                { backgroundColor: colorScheme[topBackground] },
              ]}
            />
          </View>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                {/* Close Button */}
                <View style={{ alignSelf: "flex-end" }}>
                  <Button
                    color={colorScheme.text}
                    title="X"
                    onPress={closeModal}
                  />
                </View>
                <ScrollView styles={styles.scrollContent}>
                  <Text style={[styles.title, { color: colorScheme.text }]}>
                    {selectedItem.title}
                  </Text>
                  {renderSections(selectedItem.sections)}
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  column: {
    flex: 1,
  },
  secondColumn: {
    paddingTop: "20%", // Padded at the top by 20%
  },
  itemContainer: {
    marginVertical: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionContainer: {
    backgroundColor: "white", // White background for the entire section
    padding: 10, // Add padding around the sections if needed
    borderRadius: 20,
    marginBottom: 30,
  },
  section: {
    marginBottom: 20, // Adjust as needed
  },

  background: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1, // Push the background views behind the content
  },
  backgroundBox: {
    height: "20%",
  },
  bottomBackground: {
    height: "20%",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 40,
  },
  /* Modal Styles */
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    width: "100%",
    maxHeight: "100%",
  },
  scrollContainer: {
    flex: 1,
    width: "100%",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  expandedContent: {
    marginLeft: 10,
  },
  sectionHeading: {
    fontWeight: "bold",
    marginBottom: 3,
    fontSize: 20,
  },
  sectionContent: {
    marginBottom: 10,
  },
  backButton: {
    justifyConten: "center",
    marginBottom: 80,
    padding: 10,
    padding: 10,
    borderRadius: 10, // Back button background color
  },
  backButtonText: {
    textAlign: "center",
  },
  xButton: {
    alignSelf: "flex-end",
  },
});

export default WorkGuides;
