import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import logoImage from '../../assest/logo.jpg';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const Splash = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.imageStyle} source={logoImage} />
      <Text style={styles.textStyle}>Splash screen</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    height: responsiveHeight(30),
    width: responsiveWidth(30),
  },
  textStyle: {
    color: '#000',
    fontSize: responsiveFontSize(3),
    marginTop: 10,
  },
});
