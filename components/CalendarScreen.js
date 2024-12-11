import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { supabase } from '../supabase'; 
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "./ThemeProvider.js";

  const CalendarScreen = ({ user_id }) => { // Accept user_id as a prop
    const { colorScheme } = useTheme();

  // Get the current date in the format 'YYYY-MM-DD'
  const currentDate = '2024-04-11'

  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [events, setEvents] = useState([]);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [newEventTime, setNewEventTime] = useState("")
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventDotColor, setNewEventDotColor] = useState(
    colorScheme.primaryRich,
  );
  const [markedDates, setMarkedDates] = useState({});

  const colorOptions = [ '#FFD6A5',
  '#C9E4DE', 
  '#C6DEF1', 
  '#DBCDF0', 
  '#F2C6DE', 
  '#FFADAD'];

  // Event details for different fixed dates
  const eventDetailsJSON = [
    {
      title: "Today",
      dateString: [currentDate],
      description: "Have a wonderful day!!",
      time: "12:00 AM",
    },
    {
      title: "Special Event",
      dateString: "2024-05-04",
      description: "This is a special event on February 4th.",
      time: "11:00 AM",
    },
    {
      title: "Sister's Birthday",
      dateString: "2024-02-06",
      description: "Bring cake and flowers",
      time: "4:00 PM",
    },
  ];

  const [user, setUser] = useState(null);

  // gets user info
  useEffect(() => {
    const fetchUser = async () => {

      const { data: { user } } = await supabase.auth.getUser()

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('name')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching user profile:', profileError.message);
        return;
      }

      setUser(profile);
    };
    
    fetchUser();
  })

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const currentID = user.id
      const { data, error } = await supabase.from('events').select('*').eq('user_id', currentID);
      if (error) {
        throw error;
      }
      setEvents(data);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  };


  
    // Marked dates with event details
    
      const setMarkedDatesAndEvents = async () => {
        const markedDatesObj = {};
        events.forEach(event => {
          markedDatesObj[event.dateString] = {
            marked: true,
            dotColor: colorScheme.primaryRich,
            details: event,
          };
        });
        setMarkedDates(markedDatesObj);
        setEvents(events);
      };
      useEffect(() => {
      if (events.length > 0) {
        setMarkedDatesAndEvents();
      }
    }, [events]);

  const addEventToDatabase = async (event) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([{ 
          title: newEventTitle,
          description: newEventDescription,
          dateString: newEventDate,
          time: newEventTime,
          dotColor: newEventDotColor,
        // Link event to the user's UUID
        }]);
      
      if (error) {
        throw error;
      }
      fetchEvents();
      const newEvent = data[0];
      console.log(newEvent)
      setEvents(...events, newEvent);
      // Update marked dates immediately after adding the event
    setMarkedDatesAndEvents();
    setNewEventTitle("");
    setNewEventDescription("");
    setNewEventDate("");
    setNewEventTime("");
    setShowAddEvent(false);
    
      console.log('Event added to Supabase:', events);
      // Optionally, update the local state or perform any other action after adding the event
    } catch (error) {
      console.error('Error adding event to Supabase:', error.message);
    }
  };
  



// Helper function to format date as MM/DD/YYYY
const formatDate = (dateString) => {
  if (!dateString) return ''; // Handle null or undefined dateString
  const [month, year, day] = dateString.split('/'); // Adjusted splitting logic
  return `${month.padStart(2, '0')}/${day.padStart(2, '0')}/${year}`;
};


// Helper function to format time as HH:MM
const formatTime = (timeString) => {
  if (!timeString) return ''; // Handle null or undefined timeString
  const [hour, minute] = timeString.split(':');
  return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
};



  return (
    <View
      style={[styles.container, { backgroundColor: colorScheme.background }]}
    >
      <View style={[styles.header, { backgroundColor: colorScheme.secondary }]}>
        <Text
          style={[styles.heading, { color: colorScheme.text }]}
          marginLeft={10}
        >
          Calendar
        </Text>
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => setShowAddEvent(!showAddEvent)}
        >
          <View
            style={[
              styles.hexagonInner,
              { backgroundColor: colorScheme.tertiary },
            ]}
          />
          <View
            style={[
              styles.hexagonBefore,
              { borderBottomColor: colorScheme.tertiary },
            ]}
          />
          <View
            style={[
              styles.hexagonAfter,
              { borderTopColor: colorScheme.tertiary },
            ]}
          />
          <AntDesign
            name="plus"
            size={24}
            color={colorScheme.text}
            style={styles.plusIcon}
          />
        </TouchableOpacity>
      </View>
      {/* Calendar component with marked dates and onDayPress handler */}
      <View></View>
      <Calendar
  markedDates={markedDates}
  style={styles.Calendar}
  onDayPress={(day) => {
    const selectedDateDetails = markedDates[day.dateString];
    if (selectedDateDetails && selectedDateDetails.details) {
      console.log("Selected date details:", events);
      setSelectedDate(day.dateString); // Set the selected date
      setShowModal(true);
    }
  }}
/>

      {/* Add event */}
      {showAddEvent && (
        <Modal>
          <View
            style={[
              styles.addEventSection,
              { backgroundColor: colorScheme.background },
            ]}
          >
            <Text
              style={[
                styles.heading,
                { backgroundColor: colorScheme.tertiaryRich },
                { marginBottom: 10 },
              ]}
            >
              {" "}
              Create Event
            </Text>
            <Text> Event Title</Text>
            <TextInput
              style={styles.textInput}
              padding={5}
              placeholder="Enter Title"
              value={newEventTitle}
              onChangeText={setNewEventTitle}
            />
            <Text>Notes</Text>
            <TextInput
              style={styles.textInput}
              paddingLeft={5}
              paddingTop={5}
              paddingBottom={40}
              placeholder="Enter Notes"
              value={newEventDescription}
              onChangeText={setNewEventDescription}
            />
            <Text>Date</Text>
            <TextInput
              style={styles.textInput}
              placeholder="YYYY-MM-DD"
              value={newEventDate}
              onChangeText={(text) => setNewEventDate(text)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="HH:mm"
              value={newEventTime}
              onChangeText={(text) => setNewEventTime(text)}
            />

            <Text>Banner Color</Text>
            <View style={styles.colorOptionsContainer}>
              {colorOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorOption,
                    {
                      backgroundColor: option,
                      borderColor:
                        option === newEventDotColor ? "black" : "transparent",
                    },
                  ]}
                  onPress={() => setNewEventDotColor(option)}
                />
              ))}
            </View>

            <View style={styles.eventButtons}>
              <TouchableOpacity
                onPress={() => setShowAddEvent(false)}
                style={[
                  styles.backButton,
                  { backgroundColor: colorScheme.tertiary },
                  { borderBottomWidth: 5 },
                  { borderRightWidth: 5 },
                  { borderColor: colorScheme.tertiaryRich },
                ]}
              >
                <Text>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={addEventToDatabase}
                style={[
                  styles.addButton,
                  { backgroundColor: colorScheme.tertiary },
                  { borderBottomWidth: 5 },
                  { borderRightWidth: 5 },
                  { borderColor: colorScheme.tertiaryRich },
                ]}
              >
                <Text>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Modal component for displaying event details */}
      <Modal
        animationType="none"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}
      >
        <View style={[styles.eventDetails]}>
          <Text
            style={[
              styles.eventHeading,
              { backgroundColor: colorScheme.primary },
            ]}
          >
            {markedDates[selectedDate]?.details?.title}
          </Text>
          <Text style={styles.subheading}>Notes</Text>
          <Text>{markedDates[selectedDate]?.details?.description}</Text>
          <Text style={styles.subheading}>Date</Text>
          <Text> {markedDates[selectedDate]?.details?.dateString}</Text>
          <Text style={styles.subheading}>Time</Text>
          <Text> {markedDates[selectedDate]?.details?.time}</Text>

          <View style={styles.eventButtons}>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={[
                styles.backButton,
                { backgroundColor: colorScheme.tertiary },
                { borderBottomWidth: 5 },
                { borderRightWidth: 5 },
                { borderColor: colorScheme.tertiaryRich },
                { marginRight: "50%" },
              ]}
            >
              <Text>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.addButton,
                { backgroundColor: colorScheme.tertiary },
                { borderBottomWidth: 5 },
                { borderRightWidth: 5 },
                { borderColor: colorScheme.tertiaryRich },
              ]}
            >
              <Text>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    width: "100%",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 30,
    paddingBottom: 10,
  },
  subheading: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 5,
  },
  plusButton: {
    width: 50,
    height: 29,
    position: "relative",
  },
  hexagonInner: {
    width: "100%",
    height: "100%",
  },
  hexagonAfter: {
    position: "absolute",
    bottom: -13,
    left: 0,
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderLeftWidth: 25,
    borderLeftColor: "transparent",
    borderRightWidth: 25,
    borderRightColor: "transparent",
    borderTopWidth: 13,
  },
  hexagonBefore: {
    position: "absolute",
    top: -13,
    left: 0,
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderLeftWidth: 25,
    borderLeftColor: "transparent",
    borderRightWidth: 25,
    borderRightColor: "transparent",
    borderBottomWidth: 13,
  },
  plusIcon: {
    position: "absolute",
    top: 3,
    left: 14,
  },
  Calendar: {
    borderStyle: "solid",
    borderWidth: 1,
    marginTop: -15,
    width: 370,
    height: '90%', // 90% of the window width
    aspectRatio: 1, // To maintain aspect ratio
    borderRadius: 20, // To round the corners
    overflow: 'hidden', // Clip the content to the rounded corners
  },
  addEventSection: {
    padding: 200, 
    paddingHorizontal: 50,
    
    align: "center",
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,
    backgroundColor: "white",
    color: "black",
  },
  addButton: {
    fontSize: 18,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  backButton: {
    fontSize: 18,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  eventButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  eventDetails: {
    flex: 1,
    marginTop: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 1,
  },
  eventHeading: {
    marginTop: 10, 
    marginBottom: 10,
    padding: 15,
    fontSize: 30,
  },
  colorOptionsContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 20,
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
    borderWidth: 2,
  },
});

export default CalendarScreen;
