import React, {useState} from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet, Dimensions, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackgroundImage from '../assets/greenBackground.png';
import beeIcon from '../assets/icons/mail-icon.png';

const VerifyEmailScreen = () => {
  const navigation = useNavigation();
  // Navigate to home page
  const goToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  }
  // Navigate to sign in page
  const goToCreateNewPassword = () => {
    navigation.navigate('CreateNewPassword');
  }

  return (
    <View style={styles.imageContainer}>
    <View style={styles.pageContainer}>
        {/* Background Image */}
        <Image source={BackgroundImage} style={styles.image} />
        <View style={styles.container}>
                {/* Title */}
                <Text style={[styles.title, { fontSize: 40 }, { color: '#F6BD60' }]}>Verify Your</Text>
                <Text style={[styles.title, { fontSize: 40 }, { color: '#F6BD60' }, { paddingBottom: 30 }]}>Email</Text>
          <Image source={beeIcon} style={styles.bee}/>
          {/* Block Text */}
          <View style={[styles.title, {paddingTop: 30}]}>
            <Text>Please enter the 4-digit</Text> 
            <Text>code sent to</Text> 
            <Text styles={[{ fontWeight: 'bold' }]}>email@address.com</Text>
          </View>
          {/* 4 Boxes */}
          <View style={[styles.textContainer, { paddingTop: 15 }]}>
          <View style={[styles.column]}>
              <View>
                <Text>7</Text>
              </View>
          </View>
          <View style={[styles.column]}>
              <View>
                <Text>5</Text>
              </View>
          </View>
          <View style={[styles.column]}>
              <View>
                <Text>9</Text>
              </View>
          </View>
          <View style={[styles.column]}>
              <View>
                <Text>1</Text>
              </View>
          </View>
            </View>
          <View style={[styles.textContainer, { paddingTop: 15 }]}>
              <View style={[styles.column]}>
                {/* Back Button */}
                    <TouchableOpacity style ={styles.button} onPress={goToForgotPassword}>
                            <Text> Back</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.column]}>
                    {/* Send Button */}
                    <TouchableOpacity style ={styles.button} onPress={goToCreateNewPassword}>
                        <Text> Verify</Text>
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
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  box: {
    height: 40,
    width: 80,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 10
  },
  bee: {
    height: 140,
    width: 120,
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
    width: 70,
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
   // height: '40%',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 2
  },
  column: {
    flex: 1,
    justifyContent: 'space-between',
    margin: 1
  }
})

export default VerifyEmailScreen;