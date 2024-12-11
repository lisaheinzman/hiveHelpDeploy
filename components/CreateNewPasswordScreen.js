import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet, Dimensions, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import backgroundImage from '../assets/greenBackground.png';
import beeIcon from '../assets/icons/bee-fly-icon.png';

const CreateNewPasswordScreen = () => {
  const navigation = useNavigation();
  // Navigation
  const goToVerifyEmail = () => {
    navigation.navigate('VerifyEmail');
  }
  const goToSignInPage = () => {
    navigation.navigate('SignIn');
  }

  return (
    <View style={styles.imageContainer}>
    <View style={styles.pageContainer}>
        {/* Background Image */}
        <Image source={backgroundImage} style={styles.image} />
        <View style={styles.container}>
                {/* Title */}
                <Text style={[styles.title, { fontSize: 40 }, { color: '#F6BD60' }]}>Create New</Text>
                <Text style={[styles.title, { fontSize: 40 }, { color: '#F6BD60' }, { paddingBottom: 30 }]}>Password</Text>
          <Image source={beeIcon} style={styles.bee}/>
          {/* Block Text */}
          <View style={[styles.title, {paddingTop: 30}]}>
            <Text>Your new password must be different </Text> 
            <Text>from previous passwords.</Text> 
          </View>
          <Text style={[{ paddingTop: 30 }]}>New Password*</Text>
          <TextInput style={styles.input} placeholder="Enter Password"/>
          <Text style={[{ paddingTop: 10 }]}>Confirm New Password*</Text>
          <TextInput style={styles.input} placeholder="Confirm Password"/>
          <View style={[styles.textContainer, { paddingTop: 15 }]}>
              <View style={[styles.column]}>
                {/* Back Button */}
                    <TouchableOpacity style ={styles.button} onPress={goToVerifyEmail}>
                            <Text>     Back</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.column]}>
                    {/* Send Button */}
                    <TouchableOpacity style ={styles.button} onPress={goToSignInPage}>
                        <Text>     Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
  </View>

  </View>
  )
}
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 170
  },
  bee: {
    height: 140,
    width: 180,
    padding: 30,
    alignSelf: 'center'
  },
  image: {
    flex: 1,
    width: width, // Set the width to the width of the screen
    height: height + 20, // Set the height to the height of the screen
    resizeMode: 'cover',
    position: 'absolute'
  },
  title: {
    alignSelf: 'center'
  },
  button: {
    height: 40,
    width: 100,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 10
  },
  input: {
    height: 40,
    width: 250,
    margin: 12,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10
  },
  textContainer: {
    height: '40%',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 2,
    borderRadius: 30
  },
  column: {
    flex: 1,
    justifyContent: 'space-between',
    margin: 1
  }
})

export default CreateNewPasswordScreen;