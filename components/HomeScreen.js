import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import TaskList from "./TaskList.json";
import { useTheme } from "./ThemeProvider";
import { eventDetailsJSON } from "./eventDetailsJSON";
import { TasksScreen } from "./TasksScreen";
import { Calendar } from "react-native-calendars";
import { supabase } from "../supabase";

const HomeScreen = () => {
  const { colorScheme } = useTheme();
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);

  // Sets current user
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.error("Error fetching user profile:", profileError.message);
        return;
      }

      setUser(profile);
    };

    fetchUser();
  });

  const [tasks, setTasks] = useState([]);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const currentID = user.id;
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", currentID);
      if (error) {
        throw error;
      }
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  };

  const toggleCompletion = async (index) => {
    try {
      const updatedTasks = [...tasks];
      updatedTasks[index].completed = !updatedTasks[index].completed;
      setTasks(updatedTasks);

      const { error } = await supabase
        .from("tasks")
        .update({ completed: updatedTasks[index].completed })
        .eq("id", updatedTasks[index].id);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error updating task:", error.message);
    }
  };

  const completedTasks = tasks.filter((task) => task.completed);

  const fetchEvents = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const currentID = user.id;
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("user_id", currentID);
      if (error) {
        throw error;
      }
      setEvents(data);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  };

  fetchEvents();

  // Sets today's date to currentDate
  const currentDate = new Date().toISOString().split("T")[0];
  const todaysEvents = events.filter(
    (events) => events.dateString.replace(/\//g, "-") === currentDate
  );

  // Set default display text
  const [displayText, setDisplayText] = useState(
    "Remember to always do what you love!"
  );
  // Sets display text Left
  const changeTextL = () => {
    setDisplayText("Remember to always do what you love!");
  };
  // Sets display text Right
  const changeTextR = () => {
    setDisplayText("It's okay to make mistakes! ");
  };

  // Navigates to Work Guides
  const goToGuidePage = () => {
    navigation.navigate("Work Guides");
  };
  // Navigates to TaskScreen
  const goToTasks = () => {
    navigation.navigate("Tasks");
  };
  // Navigates to Calendar
  const goToCalendar = () => {
    navigation.navigate("Calendar");
  };

  return (
    <View
      style={[
        styles.pageContainer,
        { backgroundColor: colorScheme.homeBackground },
      ]}
    >
      <Text style={[styles.titleText, { color: colorScheme.text }]}>
        Welcome: {user ? user.name : "Guest"}
      </Text>
      <View
        style={[
          styles.backgroundBox,
          { backgroundColor: colorScheme.background },
        ]}
      ></View>
      <View
        style={[
          styles.yellowBox,
          {
            backgroundColor: colorScheme.tertiary,
            borderColor: colorScheme.tertiaryRich,
          },
        ]}
      >
        <TouchableOpacity style={styles.button} onPress={changeTextL}>
          <Text style={[styles.buttonText, { color: colorScheme.text }]}>
            {"<"}
          </Text>
        </TouchableOpacity>
        <Text style={[styles.text, { color: colorScheme.text }]}>
          {displayText}
        </Text>
        {/* Button on the right side */}
        <TouchableOpacity style={styles.button} onPress={changeTextR}>
          <Text style={[styles.buttonText, { color: colorScheme.text }]}>
            {">"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.container, { marginTop: 150 }]}>
        <View style={styles.column}>
          {/* Suggested Guide */}
          <TouchableOpacity
            style={[
              styles.box,
              { backgroundColor: colorScheme.primary },
              { borderColor: colorScheme.primaryRich },
              { justifyContent: "center" },
              { paddingRight: 10 },
            ]}
            onPress={goToGuidePage}
          >
            <Text
              style={[
                styles.buttonText,
                { paddingTop: 10 },
                { color: colorScheme.text },
                { alignSelf: "center" },
              ]}
            >
              Suggested
            </Text>
            <Text
              style={[
                styles.buttonText,
                { color: colorScheme.text },
                { alignSelf: "center" },
              ]}
            >
              Guide
            </Text>
            <Text
              style={[
                styles.buttonText,
                { color: colorScheme.text },
                { alignSelf: "center" },
              ]}
            >
              Page
            </Text>
          </TouchableOpacity>
        </View>
        {/* Tasks */}
        <View style={[styles.column]}>
          <TouchableOpacity
            style={[
              styles.box,
              { backgroundColor: colorScheme.secondaryLite },
              { borderColor: colorScheme.secondaryRich },
            ]}
            onPress={goToTasks}
          >
            <View
              style={[
                styles.boxHeader,
                { backgroundColor: colorScheme.secondary },
                { borderBottomEndRadius: 0 },
                { height: "20%" },
              ]}
            >
              <Text style={[styles.buttonText, { color: colorScheme.text }]}>
                Tasks
              </Text>
            </View>
            <FlatList
              data={
                showCompletedTasks
                  ? completedTasks
                  : tasks.filter((task) => !task.completed)
              }
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity>
                  <View>
                    <View style={styles.taskContainer}>
                      <TouchableOpacity style={styles.hexagonContainer}>
                        <View
                          style={[
                            styles.hexagonInner,
                            { backgroundColor: colorScheme.secondaryRich },
                          ]}
                        />
                        <View
                          style={[
                            styles.hexagonBefore,
                            { borderBottomColor: colorScheme.secondaryRich },
                          ]}
                        />
                        <View
                          style={[
                            styles.hexagonAfter,
                            { borderTopColor: colorScheme.secondaryRich },
                          ]}
                        />
                      </TouchableOpacity>
                      <Text>{item.name}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
            {/* Display tasks with hexagons */}
          </TouchableOpacity>
        </View>
      </View>
      {/* Calendar */}
      <View style={styles.container}>
        <TouchableOpacity
          style={[
            styles.box,
            { backgroundColor: colorScheme.tertiaryLite },
            { borderColor: colorScheme.tertiaryRich },
            { height: "60%" },
          ]}
          onPress={goToCalendar}
        >
          <View
            style={[
              styles.boxHeader,
              { backgroundColor: colorScheme.tertiary },
              { borderBottomEndRadius: 0 },
              { height: "30%" },
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                { color: colorScheme.text },
                { alignSelf: "center" },
              ]}
            >
              Today
            </Text>
            {todaysEvents[0] ? (
              <View style={[{ paddingLeft: 10 }, { paddingTop: 20 }]}>
                <Text style={[{ color: colorScheme.text }]}>
                  Date: {todaysEvents[0].dateString}
                </Text>
                <Text style={[{ color: colorScheme.text }]}>
                  Event Title: {todaysEvents[0].title}
                </Text>
                <Text style={[{ color: colorScheme.text }]}>
                  Description: {todaysEvents[0].description}
                </Text>
              </View>
            ) : (
              <Text style={[{ color: colorScheme.text }, { paddingTop: 20 }]}>
                Nothing Today!
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    width: "100vw",
    justifyContent: "center",
    alignItems: "flex-start", // Align to the left
    paddingTop: 170,
  },
  container: {
    height: "50%",
    width: "100vw",
    flexDirection: "row",
    justifyContent: "center",
    padding: 2,
    borderRadius: 30,
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 9,
    borderRadius: 30,
  },
  column: {
    flex: 1,
    justifyContent: "space-between",
    margin: 8,
  },
  box: {
    flex: 1,
    borderRadius: 20,
    margin: 8,
    borderBottomWidth: 5,
    borderRightWidth: 5,
  },
  boxHeader: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  backgroundBox: {
    borderRadius: 20,
    width: "100%",
    paddingVertical: 500,
    position: "absolute",
    top: 200,
    left: 0,
  },
  hexagonInner: {
    width: "100%",
    height: "100%",
  },
  hexagonAfter: {
    position: "absolute",
    bottom: -6.5,
    left: 0,
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderLeftWidth: 12.5,
    borderLeftColor: "transparent",
    borderRightWidth: 12.5,
    borderRightColor: "transparent",
    borderTopWidth: 6.5,
  },
  hexagonBefore: {
    position: "absolute",
    top: -6.5,
    left: 0,
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderLeftWidth: 12.5,
    borderLeftColor: "transparent",
    borderRightWidth: 12.5,
    borderRightColor: "transparent",
    borderBottomWidth: 6.5,
  },
  hexagonContainer: {
    width: 25,
    height: 14.5,
    position: "relative",
  },
  titleText: {
    fontSize: 40,
    position: "absolute",
    top: 90,
    left: 20,
  },
  yellowBox: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    position: "absolute",
    top: 150,
    left: 20,
  },
  buttonText: {
    fontSize: 25,
    paddingLeft: 12,
    paddingTop: 10,
  },
});

export default HomeScreen;
