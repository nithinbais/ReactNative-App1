import {StyleSheet, Text, View, TextInput, Image} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const TextInputComponent = ({
  label,
  value,
  placeHolder,
  isSecure,
  onChangeText,
  Icon,
  ...props
}) => {
  return (
    <View style={{marginTop: 15}}>
      <Text style={styles.labelText}>{label}</Text>
      <View style={styles.inputView}>
        <Image source={Icon} style={styles.iconStyle} />
        <TextInput
          value={value}
          placeholder={placeHolder}
          placeholderTextColor={'#000'}
          onChangeText={onChangeText}
          style={styles.inputStyle}
          {...props}
        />
      </View>
    </View>
  );
};

export default TextInputComponent;

const styles = StyleSheet.create({
  labelText: {
    fontSize: responsiveFontSize(2),
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  inputView: {
    width: responsiveWidth(90),
    height: responsiveHeight(6),
    flexDirection: 'row',
    borderRadius: 4,
    borderWidth: 0.7,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  inputStyle: {
    width: responsiveWidth(80),
    borderColor: '#000',
    color: '#000',
  },
  iconStyle: {
    height: responsiveHeight(3),
    width: responsiveWidth(4),
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
});
