import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet, Dimensions, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackgroundImage from '../assets/CreateAccountBackground.png';
import { useState } from 'react';

import { Alert } from 'react-native';

import { supabase } from '../supabase';

// Navigation
const CreateAccountScreen = () => {
  const navigation = useNavigation();
  const goToHomePage = () => {
    navigation.navigate('SignIn')
  }

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [confirmEmailError, setConfirmEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  let isValid = true;

  const validateEmail = (email) => {
    // Perform email validation here
    // For example, check if it's a valid email format
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password) => {
    // Perform password validation here
    // For example, check if it meets certain criteria
    return password.length >= 8;
  };

  const handleBlurEmail = () => {
    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const handleBlurConfirmEmail = () => {
    if (email !== confirmEmail) {
      setConfirmEmailError('Emails do not match');
    } else {
      setConfirmEmailError('');
    }
  };

  const handleBlurPassword = () => {
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleBlurConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };
  
  async function handleSubmit() {
    setLoading(true)

    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }
  
    if (email !== confirmEmail) {
      setConfirmEmailError('Emails do not match');
      isValid = false;
    } else {
      setConfirmEmailError('');
    }
  
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }
  
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }
  

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name
        },
      },
    })

    if (error){
      alert(error.message, error.status)
      console.log(error.message, error.status)
    } if (isValid){
      alert("Account created! Please check your email for a verification email.")
    } else {
      alert("Please correct the form mistakes.")
    }
    setLoading(false)
  // if (!error && isValid){
  //   goToHomePage();
  // }
  }




  return (
    <View style={styles.ultimatecontainer}>
      <View style={styles.pageContainer}>
        <Image source={BackgroundImage} style={styles.image} />
        <View style={styles.container}>
          <Text style={styles.text}>Name*</Text>
          <View style={styles.textContainer}>
            <View style={[styles.column, { alignItems: 'center' }]}>
              <TextInput style={styles.input}
                value={name}
                onChangeText={setName} 
                placeholder='Enter Name'
                placeholderTextColor='grey'/>

            </View>
          </View>
          <Text style={styles.text}>Email*</Text>
          <TextInput style={styles.input} onChangeText={setEmail} onBlur={handleBlurEmail} placeholder="Enter Email"
          autoCapitalize={'none'} placeholderTextColor='grey'/>
          {emailError ? <Text style={{ color: 'red' }}>{emailError}</Text> : null}
          <Text style={styles.text}>Confirm Email*</Text>
          <TextInput style={styles.input} onChangeText={setConfirmEmail} onBlur={handleBlurConfirmEmail} placeholder="Confirm Email"
          autoCapitalize={'none'} placeholderTextColor='grey'/>
          {confirmEmailError ? <Text style={{ color: 'red' }}>{confirmEmailError}</Text> : null}
          <Text style={styles.text}>Create Password*</Text>
          <TextInput style={styles.input} onChangeText={setPassword} onBlur={handleBlurPassword} secureTextEntry={true}
          placeholder="Enter Password"
          autoCapitalize={'none'} placeholderTextColor='grey'/>
          {passwordError ? <Text style={{ color: 'red' }}>{passwordError}</Text> : null}
          <Text style={styles.text}>Confirm Password*</Text>
          <TextInput style={styles.input} onChangeText={setConfirmPassword} onBlur={handleBlurConfirmPassword} secureTextEntry={true}
          placeholder="Confirm Password"
          autoCapitalize={'none'} placeholderTextColor='grey'/>
          {confirmPasswordError ? <Text style={{ color: 'red' }}>{confirmPasswordError}</Text> : null}
          <TouchableOpacity style={[styles.button, { alignSelf: 'center' }, { paddingTop: 10 }]} disabled={loading} onPress={handleSubmit}>
            <Text>    Sign In</Text>
          </TouchableOpacity>
        </View>
        <View style={[{ alignSelf: 'flex-start' }, { paddingBottom: 8 }, { paddingLeft: 70 }]}>
          <TouchableOpacity style={styles.button} onPress={goToHomePage}>
            <Text>Existing Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

// Gets size of current device's scren
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  ultimatecontainer: {
    flex: 1
  },
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 80
  },
  image: {
    width: width, // Set the width to the width of the screen
    height: height, // Set the height to the height of the screen
    resizeMode: 'cover',// Adjust the resizeMode as needed
    position: 'absolute'
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10
  },
  textContainer: {
    // height: '40%',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 2,
    borderRadius: 30
  },
  button: {
    height: 40,
    width: '80%',
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 10
  },
  text: {
    alignItems: 'flex-start' // Align text to the left
    // Add any other text styles as needed (font size, color, etc.)
  },
  column: {
    flex: 1,
    justifyContent: 'space-between',
    margin: 1
  }
})

export default CreateAccountScreen;