import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';
import imageicon from '../../assest/profile.png';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import presonIcon from '../../assest/person.png';
import mail from '../../assest/mail.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../utils/AuthContext';

const Profile = () => {
  const {logout} = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      logout();
      showMessage({
        message: 'Logout successful',
        type: 'success',
      });
      navigation.navigate('Login');
    } catch (error) {
      showMessage({
        message: 'Failed to log out',
        type: 'danger',
      });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageView}>
        <Image
          style={styles.imageStyle}
          source={imageicon}
          resizeMode="center"
        />
      </View>
      <View style={styles.userContainer}>
        <View style={styles.container2}>
          <Image style={{height: 24, width: 24}} source={presonIcon} />
          <Text style={{color: '#000', marginLeft: 20}}>{'Name'}</Text>
        </View>
        <View style={[styles.container2, {marginTop: 15}]}>
          <Image style={{height: 24, width: 24}} source={mail} />
          <Text style={{color: '#000', marginLeft: 20}}>{'mail'}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          handleLogout();
        }}>
        <Text style={{fontSize: 15, color: '#fff', fontWeight: '500'}}>
          Logout
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  imageView: {
    height: responsiveHeight(25),
    width: responsiveWidth(25),
    alignSelf: 'center',
  },
  imageStyle: {
    height: '100%',
    width: '100%',
  },
  userContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  container2: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    backgroundColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 20,
    elevation: 2,
  },
  buttonStyle: {
    height: 60,
    width: '100%',
    backgroundColor: 'green',
    marginTop: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
