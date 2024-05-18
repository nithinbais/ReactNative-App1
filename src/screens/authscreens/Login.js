import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import TextInputComponent from '../../components/TextInputComponent';
import mail from '../../assest/mail.png';
import lock from '../../assest/lock.png';
import ButtonComponent from '../../components/ButtonComponent';
import {useNavigation} from '@react-navigation/native';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {AuthContext} from '../../utils/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useContext(AuthContext);

  console.log('-------email------', email);
  console.log('-------password------', password);

  const validateEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    const message = !email
      ? 'Email is required'
      : !validateEmail(email)
      ? 'Please enter a valid email address'
      : !password
      ? 'Password is required'
      : null;

    if (message) {
      showMessage({message, type: 'danger'});
      return;
    }

    try {
      const storedUser = await AsyncStorage.getItem('userData');
      console.log('-----storedUser-------------', storedUser);
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        if (userData.email === email && userData.password === password) {
          showMessage({message: 'Login successful', type: 'success'});
          login(userData.email); // Log in the user by setting the userToken to email
        } else {
          showMessage({message: 'Invalid email or password', type: 'danger'});
        }
      } else {
        showMessage({message: 'No user found', type: 'danger'});
      }
    } catch (error) {
      showMessage({message: 'Failed to retrieve data', type: 'danger'});
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
        <Text style={styles.loginText}>Login</Text>
        <Text style={styles.loginText2}>Welcome Back !</Text>

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
        <ButtonComponent text={'Login'} onPress={() => handleLogin()} />

        <View style={styles.bottomView}>
          <Text style={styles.text1}>{"Don't have an account?" + ' '}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.buttonText}>sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

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
