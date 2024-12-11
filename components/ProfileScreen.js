import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import profilePicture from '../assets/bee_icon.jpg';
import { useTheme } from './ThemeProvider';

import { supabase } from '../supabase';

const ProfileScreen = () => {
  const { colorScheme } = useTheme();
  const navigation = useNavigation();

  const [user, setUser] = useState(null);

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
  
  

  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState('Guest'); // Default name

  const navigateToFavoritedGuides = () => {
    console.log('Navigate to Favorited Guides');
    navigation.navigate('FavoriteGuides');
  };

  // const navigateToRecentlyViewedGuides = () => {
  //   console.log('Navigate to Recently Viewed Guides');
  //   navigation.navigate('RecentGuides');
  // };

  const navigateToSettings = () => {
    console.log('Go to settings');
    navigation.navigate('Settings');
  };

  const handleLogout = () => {
    console.log('Logout');
    navigation.navigate('SignIn');
  };

  const handleEditPress = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    // Reset the name to the original value if needed
    setNewName('New User');
  };

  const handleSaveEdit = async () => {
    try {
      if (!user || !user.id) {
        console.error('User ID is missing');
        return;
      }
  
      const { data, error } = await supabase
        .from('profiles')
        .update({ name: newName })
        .eq('id', user.id);
    
      if (error) {
        console.error('Error updating user profile:', error.message);
        return;
      }
    
      console.log('Profile updated successfully:', data);
    
      // Update the user state with the new name
      setUser({ ...user, name: newName });
    
      setEditing(false);
    } catch (error) {
      console.error('Error updating user profile:', error.message);
    }
  };
  
  

  return (
    <View style={[styles.container, { backgroundColor: colorScheme.background }]}>
      <View style={[styles.profileSection, { backgroundColor: colorScheme.tertiaryLite }]}>
        <View style={[styles.imageBox, { borderColor: colorScheme.tertiary }]}>
          <Image source={profilePicture} style={styles.image} />
        </View>
        {editing ? (
          <View>
            <TextInput
              placeholder="Enter new name"
              style={styles.editingName}
              value={newName}
              onChangeText={(text) => setNewName(text)}
            />
            <View style={styles.editButtonsContainer}>
              <Button title="Cancel" onPress={handleCancelEdit} />
              <Button title="Save" onPress={handleSaveEdit} />
            </View>
          </View>
        ) : (
          <Text style={[styles.userName, { color: colorScheme.text }]}>{user ? user.name : 'Guest'}</Text>
        )}
        {!editing && (
          <TouchableOpacity onPress={handleEditPress} style={styles.editButton}>
            <Ionicons name="create-outline" size={30} color={colorScheme.text} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.buttonContainer} onPress={navigateToFavoritedGuides}>
          <Ionicons name="star-outline" size={30} color={colorScheme.text} />
          <Text style={[styles.buttonText, { color: colorScheme.text }]}>Favorited Guides</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.buttonContainer} onPress={navigateToRecentlyViewedGuides}>
          <Ionicons name="time-outline" size={30} color={colorScheme.text} />
          <Text style={[styles.buttonText, {color: colorScheme.text}]}>Recently Viewed</Text>
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.buttonContainer} onPress={navigateToSettings}>
          <Ionicons name="settings-outline" size={30} color={colorScheme.text} />
          <Text style={[styles.buttonText, { color: colorScheme.text }]}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={30} color={colorScheme.text} />
          <Text style={[styles.buttonText, { color: colorScheme.text }]}>Logout</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
    padding: 40,
    position: 'relative',
  },
  userName: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  editingName: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    width: '100%',
  },
  buttonSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    paddingLeft: 20,
    padding: 10,
    borderBottomWidth: 1,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 20,
  },
  editButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  editButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    position: 'relative',
    borderRadius: 50,
  },
  imageBox: {
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderRadius: 50,
    right: 10
  }
});

export default ProfileScreen;
