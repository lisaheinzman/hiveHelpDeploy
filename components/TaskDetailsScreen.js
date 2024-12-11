import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import { useTheme } from "./ThemeProvider.js";
import { supabase } from "../supabase"; // Ensure you import supabase correctly

const TaskDetailsScreen = ({ route, navigation }) => {
  const { task } = route.params;
  const { colorScheme } = useTheme();
  const [updatedTask, setUpdatedTask] = useState(task);

  const navigateToEditScreen = () => {
    navigation.navigate("EditTask", { task: updatedTask });
  };

  const confirmDeleteTask = () => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Deletion cancelled"),
          style: "cancel",
        },
        { text: "Delete", onPress: handleDeleteTask },
      ],
      { cancelable: false }
    );
  };

  const handleDeleteTask = async () => {
    try {
      const { error } = await supabase
        .from("tasks")
        .delete()
        .match({ id: updatedTask.id });

      if (error) throw error;

      Alert.alert("Task Deleted", "The task has been successfully deleted.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert("Deletion Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background views */}
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
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
        <View>
          <Text style={[styles.taskTitle, { color: colorScheme.text }]}>
            {updatedTask.name}
          </Text>
        </View>
        <View style={[styles.header, { borderBottomColor: colorScheme.text }]}>
          <Text style={[styles.label, { color: colorScheme.text }]}>
            Task Description:
          </Text>
        </View>
        <View>
          <Text style={[styles.detailText, { color: colorScheme.text }]}>
            {updatedTask.description}
          </Text>
        </View>
        <View
          style={[
            styles.centerDivider,
            { borderBottomColor: colorScheme.text },
          ]}
        ></View>
        <View style={[styles.header, { borderBottomColor: colorScheme.text }]}>
          <Text style={[styles.label, { color: colorScheme.text }]}>
            Due Date:
          </Text>
        </View>
        <Text style={[styles.detailText, { color: colorScheme.text }]}>
          {updatedTask.dueDate}
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colorScheme.primary }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              styles.editButton,
              { backgroundColor: colorScheme.secondary },
            ]}
            onPress={navigateToEditScreen}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          {/* Delete Button */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "red" }]}
            onPress={confirmDeleteTask}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    paddingVertical: 20, // Adding some padding to avoid content being too close to the edges
  },
  background: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1, // Push the background views behind the content
  },
  header: {
    borderBottomWidth: 1,
    marginLeft: 30,
    marginRight: 30,
    alignItems: "center",
  },
  centerDivider: {
    borderBottomWidth: 1,
    marginBottom: "7%",
    alignItems: "center",
  },
  taskTitle: {
    paddingTop: 20,
    alignSelf: "flex-start",
    paddingLeft: "5%",
    fontSize: 40,
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 4,
    fontSize: 20,
  },
  detailText: {
    alignSelf: "flex-start",
    paddingLeft: "9%",
    marginBottom: "30%",
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 80,
    alignSelf: "center",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 80,
  },
  buttonText: {
    color: "white", // Updated to ensure text is visible on all button backgrounds
    fontWeight: "bold",
    textAlign: "center",
  },
  bottomBackground: {
    position: "absolute",
    top: height * 0.14, // Align the top of the bottom background with the bottom of the top background
    left: 0,
    right: 0,
    bottom: 0, // Apply border radius to top right corner
  },
});

export default TaskDetailsScreen;
