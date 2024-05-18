import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import TextInputComponent from '../../components/TextInputComponent';
import mail from '../../assest/mail.png';
import lock from '../../assest/lock.png';
import personicon from '../../assest/person.png';
import ButtonComponent from '../../components/ButtonComponent';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';

const Signup = () => {
  const navigation = useNavigation();
  const [person, setPerson] = useState('nitin');
  const [email, setEmail] = useState('nitin@gmail.com');
  const [password, setPassword] = useState('12345');

  console.log('-------person------', person);
  console.log('-------email------', email);
  console.log('-------password------', password);

  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const saveSignup = async () => {
    if (!email) {
      showMessage({message: 'Email is required', type: 'danger'});
      return;
    }
    if (!validateEmail(email)) {
      showMessage({
        message: 'Please enter a valid email address',
        type: 'danger',
      });
      return;
    }
    if (!password) {
      showMessage({message: 'Password is required', type: 'danger'});
      return;
    }
    if (!person) {
      showMessage({message: 'Name is required', type: 'danger'});
      return;
    }
    if (email != '' && password != '' && person != '') {
      saveData();
    }
  };

  // Save data to local storage
  const saveData = async () => {
    try {
      const userData = {person, email, password};
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      showMessage({message: 'Signup successful', type: 'success'});
      navigation.navigate('Login');
    } catch (error) {
      showMessage({message: 'Failed to save data', type: 'danger'});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.loginText}>SignUp</Text>
        <Text style={styles.loginText2}>create your account</Text>

        <TextInputComponent
          value={person}
          placeHolder={'Enter your Name'}
          label={'Name'}
          Icon={personicon}
          onChangeText={text => setPerson(text)}
        />

        <TextInputComponent
          value={email}
          placeHolder={'Enter your email address'}
          label={'Email'}
          Icon={mail}
          onChangeText={text => setEmail(text)}
        />

        <TextInputComponent
          value={password}
          placeHolder={'Enter your Password'}
          label={'Password'}
          Icon={lock}
          onChangeText={text => setPassword(text)}
        />

        <ButtonComponent text={'Signup'} onPress={() => saveSignup()} />

        <View style={styles.bottomView}>
          <Text style={styles.text1}>{'Already have an account?' + ' '}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loginText: {
    fontSize: responsiveFontSize(4),
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 10,
  },
  loginText2: {
    fontSize: responsiveFontSize(2),
    marginLeft: 10,
    color: 'green',
    marginTop: 10,
  },
  bottomView: {
    marginTop: 10,
    flexDirection: 'row',
  },
  text1: {
    fontSize: responsiveFontSize(2),
    color: '#000',
  },
  buttonText: {
    fontSize: responsiveFontSize(2),
    color: 'red',
    fontWeight: '500',
  },
});
